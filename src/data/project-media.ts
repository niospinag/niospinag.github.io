import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export interface ProjectPhoto {
  src: string;
  name: string;
  alt: string;
}

export interface ProjectVideo {
  src: string;
  name: string;
  type: 'video/mp4' | 'video/webm' | 'video/quicktime';
  poster?: string;
}

export interface ProjectDocument {
  src: string;
  name: string;
  label: string;
}

export interface ProjectMedia {
  photos: ProjectPhoto[];
  videos: ProjectVideo[];
  documents: ProjectDocument[];
}

const mediaRoot = join(process.cwd(), 'public', 'projects');
const baseUrl = import.meta.env.BASE_URL;

const extensions = {
  photos: new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']),
  videos: new Map([
    ['.mp4', 'video/mp4'],
    ['.webm', 'video/webm'],
    ['.mov', 'video/quicktime'],
  ] as const),
  documents: new Set(['.pdf']),
};

const cleanLabel = (name: string) =>
  name
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const publicUrl = (slug: string, folder: string, name: string) =>
  `${baseUrl}projects/${slug}/${folder}/${encodeURIComponent(name)}`;

const listFiles = (slug: string, folder: string) => {
  const directory = join(mediaRoot, slug, folder);
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
};

export function getProjectMedia(slug: string): ProjectMedia {
  const photos = listFiles(slug, 'photos').filter((name) =>
    extensions.photos.has(name.slice(name.lastIndexOf('.')).toLowerCase()),
  );
  const videos = listFiles(slug, 'videos').filter((name) =>
    extensions.videos.has(name.slice(name.lastIndexOf('.')).toLowerCase()),
  );
  const documents = listFiles(slug, 'docs').filter((name) =>
    extensions.documents.has(name.slice(name.lastIndexOf('.')).toLowerCase()),
  );

  return {
    photos: photos.map((name, index) => ({
      src: publicUrl(slug, 'photos', name),
      name,
      alt: `${cleanLabel(slug)} · fotografía ${index + 1}`,
    })),
    videos: videos.map((name) => {
      const extension = name.slice(name.lastIndexOf('.')).toLowerCase() as '.mp4' | '.webm' | '.mov';
      const posterName = photos.find((photo) => photo.replace(/\.[^.]+$/, '') === name.replace(/\.[^.]+$/, ''));
      return {
        src: publicUrl(slug, 'videos', name),
        name,
        type: extensions.videos.get(extension)!,
        poster: posterName ? publicUrl(slug, 'photos', posterName) : undefined,
      };
    }),
    documents: documents.map((name) => ({
      src: publicUrl(slug, 'docs', name),
      name,
      label: cleanLabel(name),
    })),
  };
}
