/**
 * generate-assets.mjs
 * ---------------------------------------------------------------------------
 * Produces the binary/placeholder assets the site ships with, so a fresh clone
 * builds and renders out of the box (no LFS, no external downloads):
 *
 *   public/models/*.glb        -> valid glTF 2.0 binary CAD placeholders
 *   public/cv/*-cv.pdf         -> valid, text-selectable CV (replace with yours)
 *   public/og-cover.png        -> 1200x630 social preview card
 *
 * Usage:
 *   node scripts/generate-assets.mjs              # (re)generate everything
 *   node scripts/generate-assets.mjs --if-missing # only create missing files
 *                                                   (wired to `npm run prebuild`
 *                                                    so your real assets win)
 */

import { deflateSync } from 'node:zlib';
import { mkdirSync, existsSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const IF_MISSING = process.argv.includes('--if-missing');

/* ==========================================================================
 * 0. UTILITIES
 * ========================================================================== */

function out(rel, buf) {
  const file = join(PUBLIC, rel);
  if (IF_MISSING && existsSync(file)) {
    const kb = (statSync(file).size / 1024).toFixed(1);
    console.log(`  = skip  ${rel}  (exists, ${kb} KB)`);
    return false;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, buf);
  console.log(`  + write ${rel}  (${(buf.length / 1024).toFixed(1)} KB)`);
  return true;
}

/* --------------------------------------------------------------------------
 * glTF Binary (.glb) writer
 * -------------------------------------------------------------------------- */

const GLB_MAGIC = 0x46546c67; // 'glTF'
const CHUNK_JSON = 0x4e4f534a; // 'JSON'
const CHUNK_BIN = 0x004e4942; // 'BIN\0'

/** Axis-aligned box, 24 verts (per-face normals) + 36 indices, CCW winding. */
function box(cx, cy, cz, sx, sy, sz) {
  const hx = sx / 2, hy = sy / 2, hz = sz / 2;
  const F = [
    { n: [0, 0, 1], v: [[-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz]] },
    { n: [0, 0, -1], v: [[hx, -hy, -hz], [-hx, -hy, -hz], [-hx, hy, -hz], [hx, hy, -hz]] },
    { n: [1, 0, 0], v: [[hx, -hy, hz], [hx, -hy, -hz], [hx, hy, -hz], [hx, hy, hz]] },
    { n: [-1, 0, 0], v: [[-hx, -hy, -hz], [-hx, -hy, hz], [-hx, hy, hz], [-hx, hy, -hz]] },
    { n: [0, 1, 0], v: [[-hx, hy, hz], [hx, hy, hz], [hx, hy, -hz], [-hx, hy, -hz]] },
    { n: [0, -1, 0], v: [[-hx, -hy, -hz], [hx, -hy, -hz], [hx, -hy, hz], [-hx, -hy, hz]] },
  ];
  const pos = [], nor = [], idx = [];
  for (const f of F) {
    const base = pos.length / 3;
    for (const p of f.v) {
      pos.push(p[0] + cx, p[1] + cy, p[2] + cz);
      nor.push(f.n[0], f.n[1], f.n[2]);
    }
    idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
  return { pos, nor, idx };
}

/** Cylinder along `axis` ('y' | 'z' | 'x'), with capped ends. */
function cylinder(cx, cy, cz, r, h, seg = 24, axis = 'y') {
  const pos = [], nor = [], idx = [];
  const hh = h / 2;
  const map = (a, b, c) =>
    axis === 'y' ? [a, b, c] : axis === 'z' ? [a, c, b] : [c, b, a];
  const nrm = (a, b, c) =>
    axis === 'y' ? [a, b, c] : axis === 'z' ? [a, c, b] : [c, b, a];

  // side
  for (let i = 0; i <= seg; i++) {
    const t = (i / seg) * Math.PI * 2;
    const ux = Math.cos(t), uz = Math.sin(t);
    const p0 = map(ux * r, -hh, uz * r);
    const p1 = map(ux * r, hh, uz * r);
    const n = nrm(ux, 0, uz);
    const base = pos.length / 3;
    pos.push(cx + p0[0], cy + p0[1], cz + p0[2]);
    nor.push(n[0], n[1], n[2]);
    pos.push(cx + p1[0], cy + p1[1], cz + p1[2]);
    nor.push(n[0], n[1], n[2]);
    if (i < seg) idx.push(base, base + 1, base + 3, base, base + 3, base + 2);
  }
  // caps
  for (const dir of [-1, 1]) {
    const cBase = pos.length / 3;
    const cap = map(0, dir * hh, 0);
    pos.push(cx + cap[0], cy + cap[1], cz + cap[2]);
    const cn = nrm(0, dir, 0);
    nor.push(cn[0], cn[1], cn[2]);
    const ringBase = pos.length / 3;
    for (let i = 0; i <= seg; i++) {
      const t = (i / seg) * Math.PI * 2;
      const ux = Math.cos(t), uz = Math.sin(t);
      const p = map(ux * r, dir * hh, uz * r);
      pos.push(cx + p[0], cy + p[1], cz + p[2]);
      nor.push(cn[0], cn[1], cn[2]);
    }
    for (let i = 0; i < seg; i++) {
      if (dir === 1) idx.push(cBase, ringBase + i, ringBase + i + 1);
      else idx.push(cBase, ringBase + i + 1, ringBase + i);
    }
  }
  return { pos, nor, idx };
}

const MATERIALS = {
  shell:   { name: 'ShellDark',  base: [0.055, 0.075, 0.095], metal: 0.85, rough: 0.42 },
  plate:   { name: 'Plate',      base: [0.145, 0.175, 0.205], metal: 0.9,  rough: 0.32 },
  alloy:   { name: 'Alloy',      base: [0.62, 0.66, 0.70],    metal: 1.0,  rough: 0.24 },
  rubber:  { name: 'Rubber',     base: [0.028, 0.030, 0.035], metal: 0.0,  rough: 0.92 },
  pcb:     { name: 'PCB',        base: [0.03, 0.10, 0.07],    metal: 0.25, rough: 0.6 },
  neon:    { name: 'EmissiveNeon',  base: [0.02, 0.08, 0.05], metal: 0.0, rough: 0.4, emissive: [0.24, 1.0, 0.62] },
  cyan:    { name: 'EmissiveCyan',  base: [0.02, 0.06, 0.08], metal: 0.0, rough: 0.4, emissive: [0.16, 0.88, 1.0] },
  amber:   { name: 'EmissiveAmber', base: [0.08, 0.05, 0.01], metal: 0.0, rough: 0.4, emissive: [1.0, 0.71, 0.27] },
  uvc:     { name: 'EmissiveUVC',   base: [0.05, 0.02, 0.09], metal: 0.0, rough: 0.3, emissive: [0.62, 0.35, 1.0] },
};

/** Assemble parts into a .glb buffer. parts: [{ name, geo, mat }] */
function buildGlb(parts) {
  const binChunks = [];
  let byteLength = 0;
  const bufferViews = [];
  const accessors = [];
  const meshes = [];
  const nodes = [];
  const usedMats = [];
  const materials = [];

  const pushView = (bytes, target) => {
    const pad = (4 - (byteLength % 4)) % 4;
    if (pad) { binChunks.push(Buffer.alloc(pad)); byteLength += pad; }
    bufferViews.push({ buffer: 0, byteOffset: byteLength, byteLength: bytes.length, ...(target ? { target } : {}) });
    binChunks.push(bytes);
    byteLength += bytes.length;
    return bufferViews.length - 1;
  };

  for (const part of parts) {
    const { pos, nor, idx } = part.geo;
    const posArr = new Float32Array(pos);
    const norArr = new Float32Array(nor);
    const useShort = pos.length / 3 <= 65535;
    const idxArr = useShort ? new Uint16Array(idx) : new Uint32Array(idx);

    let min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < posArr.length; i += 3) {
      for (let k = 0; k < 3; k++) {
        const v = posArr[i + k];
        if (v < min[k]) min[k] = v;
        if (v > max[k]) max[k] = v;
      }
    }

    const vPos = pushView(Buffer.from(posArr.buffer, posArr.byteOffset, posArr.byteLength), 34962);
    const vNor = pushView(Buffer.from(norArr.buffer, norArr.byteOffset, norArr.byteLength), 34962);
    const vIdx = pushView(Buffer.from(idxArr.buffer, idxArr.byteOffset, idxArr.byteLength), 34963);

    accessors.push({ bufferView: vPos, componentType: 5126, count: posArr.length / 3, type: 'VEC3', min, max });
    accessors.push({ bufferView: vNor, componentType: 5126, count: norArr.length / 3, type: 'VEC3' });
    accessors.push({ bufferView: vIdx, componentType: useShort ? 5123 : 5125, count: idxArr.length, type: 'SCALAR' });
    const aBase = accessors.length - 3;

    const mDef = MATERIALS[part.mat] ?? MATERIALS.plate;
    let mIdx = usedMats.indexOf(part.mat);
    if (mIdx === -1) {
      usedMats.push(part.mat);
      mIdx = usedMats.length - 1;
      materials.push({
        name: mDef.name,
        doubleSided: false,
        pbrMetallicRoughness: {
          baseColorFactor: [...mDef.base, 1],
          metallicFactor: mDef.metal,
          roughnessFactor: mDef.rough,
        },
        ...(mDef.emissive
          ? { emissiveFactor: mDef.emissive, extensions: { KHR_materials_emissive_strength: { emissiveStrength: 1.6 } } }
          : {}),
      });
    }

    meshes.push({
      name: part.name,
      primitives: [{ attributes: { POSITION: aBase, NORMAL: aBase + 1 }, indices: aBase + 2, material: mIdx }],
    });
    nodes.push({ name: part.name, mesh: meshes.length - 1 });
  }

  // final padding of BIN chunk to 4 bytes
  const tailPad = (4 - (byteLength % 4)) % 4;
  if (tailPad) { binChunks.push(Buffer.alloc(tailPad)); byteLength += tailPad; }

  const usedExt = materials.some((m) => m.extensions);
  const json = {
    asset: {
      version: '2.0',
      generator: 'nestor-ospina/portfolio :: generate-assets.mjs (CAD placeholder)',
      copyright: 'Placeholder geometry — replace with real CAD exports.',
    },
    ...(usedExt ? { extensionsUsed: ['KHR_materials_emissive_strength'] } : {}),
    scene: 0,
    scenes: [{ name: 'Scene', nodes: nodes.map((_, i) => i) }],
    nodes,
    meshes,
    materials,
    accessors,
    bufferViews,
    buffers: [{ byteLength }],
  };

  let jsonBuf = Buffer.from(JSON.stringify(json), 'utf8');
  const jsonPad = (4 - (jsonBuf.length % 4)) % 4;
  if (jsonPad) jsonBuf = Buffer.concat([jsonBuf, Buffer.alloc(jsonPad, 0x20)]);
  const binBuf = Buffer.concat(binChunks);

  const total = 12 + 8 + jsonBuf.length + 8 + binBuf.length;
  const header = Buffer.alloc(12);
  header.writeUInt32LE(GLB_MAGIC, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(total, 8);
  const jHead = Buffer.alloc(8);
  jHead.writeUInt32LE(jsonBuf.length, 0);
  jHead.writeUInt32LE(CHUNK_JSON, 4);
  const bHead = Buffer.alloc(8);
  bHead.writeUInt32LE(binBuf.length, 0);
  bHead.writeUInt32LE(CHUNK_BIN, 4);

  return Buffer.concat([header, jHead, jsonBuf, bHead, binBuf]);
}

/* ==========================================================================
 * 1. CAD PLACEHOLDER MODELS
 * ========================================================================== */

/** Generic mobile robot platform — the requested `sample-robot.glb`. */
function sampleRobot() {
  const p = [];
  // drive base
  p.push({ name: 'BasePlate', geo: box(0, 0.05, 0, 0.72, 0.05, 0.56), mat: 'plate' });
  p.push({ name: 'Chassis', geo: box(0, 0.17, 0, 0.62, 0.2, 0.46), mat: 'shell' });
  p.push({ name: 'ChassisTrim', geo: box(0, 0.17, 0.235, 0.5, 0.06, 0.01), mat: 'alloy' });
  p.push({ name: 'ChassisTrimR', geo: box(0, 0.17, -0.235, 0.5, 0.06, 0.01), mat: 'alloy' });
  // wheels
  for (const [i, x] of [-0.26, 0.26].entries()) {
    for (const z of [-0.25, 0.25]) {
      p.push({ name: `Wheel_${i}${z > 0 ? 'F' : 'R'}`, geo: cylinder(x, 0.09, z, 0.09, 0.05, 20, 'x'), mat: 'rubber' });
      p.push({ name: `Hub_${i}${z > 0 ? 'F' : 'R'}`, geo: cylinder(x, 0.09, z, 0.045, 0.056, 12, 'x'), mat: 'alloy' });
    }
  }
  // caster
  p.push({ name: 'Caster', geo: cylinder(0, 0.05, -0.3, 0.04, 0.03, 16, 'y'), mat: 'alloy' });
  // torso
  p.push({ name: 'TorsoColumn', geo: box(0, 0.46, -0.06, 0.26, 0.42, 0.2), mat: 'shell' });
  p.push({ name: 'TorsoRib', geo: box(0, 0.46, 0.045, 0.2, 0.36, 0.012), mat: 'plate' });
  // compute tray (Jetson / RPi / Arduino)
  p.push({ name: 'ComputeTray', geo: box(0.0, 0.3, 0.12, 0.34, 0.03, 0.16), mat: 'alloy' });
  p.push({ name: 'JetsonBoard', geo: box(-0.08, 0.335, 0.12, 0.14, 0.02, 0.11), mat: 'pcb' });
  p.push({ name: 'Heatsink', geo: box(-0.08, 0.36, 0.12, 0.1, 0.03, 0.08), mat: 'alloy' });
  p.push({ name: 'RPiBoard', geo: box(0.08, 0.335, 0.14, 0.09, 0.016, 0.06), mat: 'pcb' });
  p.push({ name: 'DriverBoard', geo: box(0.08, 0.335, 0.05, 0.07, 0.016, 0.05), mat: 'pcb' });
  // head / sensor mast
  p.push({ name: 'HeadBase', geo: box(0, 0.7, -0.06, 0.2, 0.06, 0.16), mat: 'plate' });
  p.push({ name: 'HeadShell', geo: box(0, 0.79, -0.06, 0.24, 0.13, 0.2), mat: 'shell' });
  p.push({ name: 'Visor', geo: box(0, 0.795, 0.045, 0.19, 0.05, 0.012), mat: 'cyan' });
  p.push({ name: 'StatusLED', geo: box(0, 0.735, 0.045, 0.05, 0.012, 0.01), mat: 'neon' });
  p.push({ name: 'LidarMast', geo: cylinder(0, 0.9, -0.06, 0.014, 0.1, 12, 'y'), mat: 'alloy' });
  p.push({ name: 'Lidar', geo: cylinder(0, 0.97, -0.06, 0.05, 0.045, 20, 'y'), mat: 'shell' });
  p.push({ name: 'LidarLens', geo: cylinder(0, 0.97, -0.06, 0.051, 0.014, 20, 'y'), mat: 'amber' });
  // arms
  for (const s of [-1, 1]) {
    p.push({ name: `Shoulder_${s < 0 ? 'L' : 'R'}`, geo: cylinder(s * 0.17, 0.6, -0.06, 0.045, 0.07, 16, 'x'), mat: 'alloy' });
    p.push({ name: `UpperArm_${s < 0 ? 'L' : 'R'}`, geo: box(s * 0.21, 0.5, -0.06, 0.05, 0.24, 0.06), mat: 'plate' });
    p.push({ name: `Elbow_${s < 0 ? 'L' : 'R'}`, geo: cylinder(s * 0.21, 0.38, -0.06, 0.036, 0.06, 16, 'x'), mat: 'alloy' });
    p.push({ name: `ForeArm_${s < 0 ? 'L' : 'R'}`, geo: box(s * 0.21, 0.3, -0.06, 0.042, 0.18, 0.042), mat: 'shell' });
    p.push({ name: `Gripper_${s < 0 ? 'L' : 'R'}`, geo: box(s * 0.21, 0.19, -0.06, 0.06, 0.05, 0.06), mat: 'neon' });
  }
  return p;
}

/** Drive chassis / powertrain sub-assembly. */
function driveChassis() {
  const p = [];
  p.push({ name: 'FloorPan', geo: box(0, 0.02, 0, 0.8, 0.04, 0.6), mat: 'plate' });
  p.push({ name: 'RailL', geo: box(-0.36, 0.09, 0, 0.06, 0.12, 0.6), mat: 'shell' });
  p.push({ name: 'RailR', geo: box(0.36, 0.09, 0, 0.06, 0.12, 0.6), mat: 'shell' });
  p.push({ name: 'CrossMemberF', geo: box(0, 0.09, 0.24, 0.66, 0.08, 0.05), mat: 'shell' });
  p.push({ name: 'CrossMemberR', geo: box(0, 0.09, -0.24, 0.66, 0.08, 0.05), mat: 'shell' });
  p.push({ name: 'BatteryPack', geo: box(0, 0.13, -0.02, 0.42, 0.14, 0.3), mat: 'shell' });
  p.push({ name: 'BatteryTrim', geo: box(0, 0.205, -0.02, 0.38, 0.008, 0.26), mat: 'neon' });
  p.push({ name: 'BMS', geo: box(0.13, 0.215, -0.02, 0.1, 0.02, 0.14), mat: 'pcb' });
  p.push({ name: 'MotorMountL', geo: box(-0.28, 0.16, 0, 0.08, 0.1, 0.14), mat: 'alloy' });
  p.push({ name: 'MotorMountR', geo: box(0.28, 0.16, 0, 0.08, 0.1, 0.14), mat: 'alloy' });
  for (const x of [-0.3, 0.3]) {
    p.push({ name: `DriveMotor_${x < 0 ? 'L' : 'R'}`, geo: cylinder(x, 0.16, 0, 0.055, 0.11, 20, 'x'), mat: 'alloy' });
  }
  for (const x of [-0.34, 0.34]) {
    for (const z of [-0.22, 0.22]) {
      p.push({ name: `Wheel_${x}_${z}`, geo: cylinder(x, 0.1, z, 0.1, 0.06, 22, 'x'), mat: 'rubber' });
      p.push({ name: `Hub_${x}_${z}`, geo: cylinder(x, 0.1, z, 0.05, 0.066, 14, 'x'), mat: 'plate' });
    }
  }
  p.push({ name: 'EStop', geo: cylinder(0, 0.22, 0.2, 0.035, 0.03, 18, 'y'), mat: 'amber' });
  p.push({ name: 'CableTray', geo: box(0, 0.06, 0.14, 0.5, 0.02, 0.06), mat: 'plate' });
  return p;
}

/** UV-C disinfection head assembly (COVID Bot). */
function uvcHead() {
  const p = [];
  p.push({ name: 'MountPlate', geo: box(0, 0.02, 0, 0.34, 0.04, 0.3), mat: 'plate' });
  p.push({ name: 'Column', geo: cylinder(0, 0.28, -0.08, 0.045, 0.52, 22, 'y'), mat: 'alloy' });
  p.push({ name: 'Collar', geo: cylinder(0, 0.55, -0.08, 0.062, 0.05, 22, 'y'), mat: 'shell' });
  p.push({ name: 'Housing', geo: box(0, 0.72, 0, 0.4, 0.34, 0.16), mat: 'shell' });
  p.push({ name: 'HousingRim', geo: box(0, 0.72, 0.085, 0.36, 0.3, 0.012), mat: 'plate' });
  // UV-C emitter array
  for (let i = 0; i < 3; i++) {
    p.push({ name: `UVCTube_${i}`, geo: cylinder(0, 0.62 + i * 0.1, 0.06, 0.026, 0.3, 18, 'x'), mat: 'uvc' });
  }
  p.push({ name: 'ReflectorTop', geo: box(0, 0.885, 0.02, 0.34, 0.02, 0.1), mat: 'alloy' });
  p.push({ name: 'ReflectorBot', geo: box(0, 0.555, 0.02, 0.34, 0.02, 0.1), mat: 'alloy' });
  p.push({ name: 'PresenceSensor', geo: box(0, 0.94, 0.02, 0.1, 0.04, 0.05), mat: 'cyan' });
  p.push({ name: 'SafetyLED_L', geo: box(-0.16, 0.93, 0.06, 0.03, 0.02, 0.02), mat: 'neon' });
  p.push({ name: 'SafetyLED_R', geo: box(0.16, 0.93, 0.06, 0.03, 0.02, 0.02), mat: 'neon' });
  p.push({ name: 'DriverBox', geo: box(0, 0.16, 0.02, 0.18, 0.16, 0.12), mat: 'shell' });
  p.push({ name: 'DriverBoard', geo: box(0, 0.2, 0.085, 0.13, 0.08, 0.01), mat: 'pcb' });
  p.push({ name: 'VentGrill', geo: box(0, 0.72, -0.085, 0.24, 0.22, 0.01), mat: 'plate' });
  p.push({ name: 'HandleBar', geo: box(0, 1.02, -0.02, 0.26, 0.03, 0.03), mat: 'alloy' });
  return p;
}

/** Multi-agent test arena: floor, walls, obstacles and two agents. */
function testArena() {
  const p = [];
  p.push({ name: 'Floor', geo: box(0, -0.01, 0, 2.0, 0.02, 2.0), mat: 'shell' });
  p.push({ name: 'GridLineA', geo: box(0, 0.002, 0.5, 2.0, 0.004, 0.012), mat: 'cyan' });
  p.push({ name: 'GridLineB', geo: box(0, 0.002, -0.5, 2.0, 0.004, 0.012), mat: 'cyan' });
  p.push({ name: 'GridLineC', geo: box(0.5, 0.002, 0, 0.012, 0.004, 2.0), mat: 'cyan' });
  p.push({ name: 'GridLineD', geo: box(-0.5, 0.002, 0, 0.012, 0.004, 2.0), mat: 'cyan' });
  // perimeter walls
  p.push({ name: 'Wall_N', geo: box(0, 0.08, 1.0, 2.06, 0.16, 0.06), mat: 'plate' });
  p.push({ name: 'Wall_S', geo: box(0, 0.08, -1.0, 2.06, 0.16, 0.06), mat: 'plate' });
  p.push({ name: 'Wall_E', geo: box(1.0, 0.08, 0, 0.06, 0.16, 2.06), mat: 'plate' });
  p.push({ name: 'Wall_W', geo: box(-1.0, 0.08, 0, 0.06, 0.16, 2.06), mat: 'plate' });
  for (const [cx, cz] of [[1.0, 1.0], [-1.0, 1.0], [1.0, -1.0], [-1.0, -1.0]]) {
    p.push({ name: `CornerBeacon_${cx}_${cz}`, geo: box(cx, 0.19, cz, 0.05, 0.06, 0.05), mat: 'neon' });
  }
  p.push({ name: 'Obstacle_1', geo: box(0.42, 0.09, 0.28, 0.22, 0.18, 0.22), mat: 'alloy' });
  p.push({ name: 'Obstacle_2', geo: cylinder(-0.36, 0.09, -0.3, 0.13, 0.18, 20, 'y'), mat: 'alloy' });
  p.push({ name: 'Obstacle_3', geo: box(-0.28, 0.05, 0.52, 0.34, 0.1, 0.1), mat: 'plate' });
  const agents = [
    { x: -0.55, z: -0.05, m: 'neon', n: 'Agent_A' },
    { x: 0.6, z: 0.5, m: 'amber', n: 'Agent_B' },
    { x: 0.05, z: -0.62, m: 'cyan', n: 'Agent_C' },
  ];
  for (const a of agents) {
    p.push({ name: `${a.n}_Body`, geo: box(a.x, 0.075, a.z, 0.2, 0.11, 0.16), mat: 'shell' });
    p.push({ name: `${a.n}_Top`, geo: box(a.x, 0.14, a.z, 0.15, 0.012, 0.12), mat: a.m });
    p.push({ name: `${a.n}_Lidar`, geo: cylinder(a.x, 0.165, a.z, 0.032, 0.035, 16, 'y'), mat: 'plate' });
    for (const dx of [-0.08, 0.08]) {
      p.push({ name: `${a.n}_Wheel_${dx}`, geo: cylinder(a.x + dx, 0.035, a.z + 0.09, 0.035, 0.022, 14, 'x'), mat: 'rubber' });
      p.push({ name: `${a.n}_Wheel2_${dx}`, geo: cylinder(a.x + dx, 0.035, a.z - 0.09, 0.035, 0.022, 14, 'x'), mat: 'rubber' });
    }
  }
  return p;
}

/* ==========================================================================
 * 2. PDF WRITER (CV placeholder — replace public/cv/*.pdf with your own)
 * ========================================================================== */

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

/**
 * Tiny PDF 1.4 writer: A4 page, Helvetica / Helvetica-Bold, WinAnsi encoding.
 * `items` = [{ t:'text', x, y, size, font:'F1'|'F2', color:[r,g,b], rule?:width }]
 */
function buildPdf(items) {
  const W = 595.28, H = 841.89;
  let content = '';
  for (const it of items) {
    if (it.rule) {
      content += `${it.color?.[0] ?? 0.2} ${it.color?.[1] ?? 0.2} ${it.color?.[2] ?? 0.2} RG\n1 w\n${it.x} ${it.y} m ${(it.x + it.rule)} ${it.y} l S\n`;
      continue;
    }
    if (it.rect) {
      content += `${it.color[0]} ${it.color[1]} ${it.color[2]} rg\n${it.x} ${it.y} ${it.rect[0]} ${it.rect[1]} re f\n`;
      continue;
    }
    const [r, g, b] = it.color ?? [0.1, 0.1, 0.1];
    content += `BT\n/${it.font ?? 'F1'} ${it.size} Tf\n${r} ${g} ${b} rg\n1 0 0 1 ${it.x} ${it.y} Tm\n(${esc(it.t)}) Tj\nET\n`;
  }

  const objs = [];
  objs[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objs[2] = `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`;
  objs[3] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`;
  const stream = Buffer.from(content, 'latin1');
  objs[4] = `<< /Length ${stream.length} >>\nstream\n`;
  objs[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  objs[6] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';

  const parts = [Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'latin1')];
  const offsets = [0];
  for (let i = 1; i < objs.length; i++) {
    offsets[i] = parts.reduce((a, b) => a + b.length, 0);
    if (i === 4) {
      parts.push(Buffer.from(`${i} 0 obj\n${objs[i]}`, 'latin1'));
      parts.push(stream);
      parts.push(Buffer.from('\nendstream\nendobj\n', 'latin1'));
    } else {
      parts.push(Buffer.from(`${i} 0 obj\n${objs[i]}\nendobj\n`, 'latin1'));
    }
  }
  const xrefPos = parts.reduce((a, b) => a + b.length, 0);
  let xref = `xref\n0 ${objs.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objs.length; i++) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
  parts.push(Buffer.from(xref, 'latin1'));
  return Buffer.concat(parts);
}

function buildCv() {
  const NEON = [0.16, 0.62, 0.4];
  const DARK = [0.08, 0.1, 0.13];
  const GREY = [0.35, 0.4, 0.45];
  const it = [];
  let y = 800;
  const L = 56;

  it.push({ rect: [483, 108], x: L, y: y - 18, color: [0.05, 0.07, 0.09] });
  it.push({ rect: [4, 108], x: L, y: y - 18, color: NEON });
  it.push({ t: 'NESTOR IVAN OSPINA GAITAN', x: L + 18, y: y + 58, size: 22, font: 'F2', color: [1, 1, 1] });
  it.push({ t: 'Robotics Software Engineer  |  Robotics, Control & Design', x: L + 18, y: y + 34, size: 11, font: 'F1', color: NEON });
  it.push({ t: 'Bogotá, Colombia   ·   niospinag@unal.edu.co   ·   +57 300 292 4631', x: L + 18, y: y + 14, size: 9, font: 'F1', color: [0.75, 0.8, 0.85] });
  it.push({ t: 'github.com/niospinag   ·   linkedin.com/in/niospinag', x: L + 18, y: y - 2, size: 9, font: 'F1', color: [0.75, 0.8, 0.85] });
  y -= 150;

  const section = (title) => {
    it.push({ t: title.toUpperCase(), x: L, y, size: 11, font: 'F2', color: DARK });
    it.push({ rule: 483, x: L, y: y - 7, color: NEON });
    y -= 26;
  };
  const body = (text, size = 9.5, color = [0.16, 0.19, 0.22], font = 'F1', step = 14) => {
    for (const line of text) {
      it.push({ t: line, x: L, y, size, font, color });
      y -= step;
    }
    y -= 6;
  };

  section('Perfil profesional');
  body([
    'Magíster en Ingeniería - Automatización Industrial con más de 5 años de experiencia',
    'liderando el desarrollo de plataformas robóticas, algoritmos de control y diseño mecánico CAD.',
    'Especialista en integración hardware-software, navegación autónoma y analítica de flotas.',
    'Certificación PMP. Español nativo, inglés con competencia profesional completa.',
  ]);

  section('Métricas de impacto');
  body([
    '+50%  Eficiencia en implementación mediante automatización de procesos.',
    '+25%  Precisión en navegación y control de robots móviles.',
    '-60%  Tiempo de validación de algoritmos con plataforma de pruebas dedicada.',
    '99%   Precisión en evasión de colisiones para sistemas multi-agente.',
  ], 9.5, GREY, 'F1', 14);

  section('Experiencia profesional');
  body(['Software Engineer  ·  Unlimited Robotics  ·  Bogotá, Colombia', 'May 2024 — Presente'], 10, DARK, 'F2', 13);
  body([
    '·  Desarrollo de soluciones robóticas 3D y algoritmos de control de movimiento y navegación.',
    '·  Diseño de plataforma de pruebas para validación de algoritmos (-60% tiempo de testeo).',
    '·  Modernización de flota robótica y diseño de entornos de manufactura aditiva y de pruebas.',
  ], 9, [0.18, 0.21, 0.24], 'F1', 12.5);
  y -= 4;

  body(['Junior Maintenance Engineer  ·  Kiwicampus S.A.S. (Kiwibot)  ·  Orono, Maine', 'Dic 2023 — May 2024'], 10, DARK, 'F2', 13);
  body([
    '·  Análisis de datos y tracking de flotas de entrega autónoma (+28% eficiencia de pedidos).',
    '·  Mantenimiento, diagnóstico y reparación del 95% de la flota robótica activa.',
    '·  Estrategias de mantenimiento predictivo reduciendo fallas operativas en 30%.',
  ], 9, [0.18, 0.21, 0.24], 'F1', 12.5);
  y -= 4;

  body(['Assistant Professor  ·  Universidad Nacional de Colombia  ·  Bogotá', 'Jul 2018 — Nov 2022'], 10, DARK, 'F2', 13);
  body([
    '·  Instructor de laboratorio para más de 200 estudiantes.',
    '·  Gestión y disponibilidad de equipos de laboratorio para más de 15 cursos.',
  ], 9, [0.18, 0.21, 0.24], 'F1', 12.5);

  section('Proyectos destacados');
  body([
    'COVID Bot — Robot autónomo de desinfección UV-C: diseño mecánico a medida, sensórica',
    'integrada y navegación autónoma (Python, C++, ROS, Jetson, Raspberry Pi, Arduino, Impresión 3D).',
    'Multi-Agent Collision Avoidance — navegación independiente multi-robot con 99% de precisión',
    'en prevención de colisiones en entornos dinámicos (Python, control por visión, multi-agente).',
    'Data-Driven Robot Tracking & Fleet Analytics — modelos predictivos y telemetría en tiempo real',
    'para optimización logística de flotas autónomas (Python, Data Analytics, Fleet Management).',
    'Artificial Testing Environment Design — infraestructura física y digital de entorno hospitalario',
    'para validación sistemática de robots (SolidWorks, diseño 3D, optimización de costos).',
  ], 9, [0.18, 0.21, 0.24], 'F1', 12);

  section('Stack tecnológico');
  body([
    'Robótica & Control:  ROS · Algoritmos de Control · Navegación Autónoma · Sensor Integration',
    'Programación & Datos:  Python · C++ · MATLAB · Data Analytics · Control de Flotas',
    'Diseño CAD:  SolidWorks · Fusion 360 · AutoCAD · Inventor · Manufactura Aditiva (Impresión 3D)',
    'Hardware Embebido:  Jetson · Raspberry Pi · Arduino · Sensores y Actuadores',
  ], 9, [0.18, 0.21, 0.24], 'F1', 12.5);

  section('Educación y certificaciones');
  body([
    'Magíster en Ingeniería — Automatización Industrial · Universidad Nacional de Colombia · Dic 2022',
    'Ingeniero Eléctrico · Universidad Nacional de Colombia · Jun 2018',
    'PMP® — Project Management Professional (Project Management Institute)',
  ], 9.5, [0.18, 0.21, 0.24], 'F1', 13);

  it.push({ t: 'Documento generado automáticamente como placeholder — reemplázalo con tu CV definitivo.', x: L, y: 40, size: 7.5, font: 'F1', color: [0.6, 0.62, 0.65] });
  return buildPdf(it);
}

/* ==========================================================================
 * 3. PNG WRITER (OG social card, 1200x630)
 * ========================================================================== */

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td), 0);
  return Buffer.concat([len, td, crc]);
}

function encodePng(w, h, rgba) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0; // filter: none
    rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

/* 5x7 bitmap font (uppercase + digits + a few symbols) for the OG card */
const FONT = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  C: ['.####', '#....', '#....', '#....', '#....', '#....', '.####'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  G: ['.####', '#....', '#....', '#..##', '#...#', '#...#', '.####'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
  J: ['..###', '...#.', '...#.', '...#.', '...#.', '#..#.', '.##..'],
  K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  M: ['#...#', '##.##', '#.#.#', '#...#', '#...#', '#...#', '#...#'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '##.##', '#...#'],
  X: ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
  0: ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
  1: ['..#..', '.##..', '..#..', '..#..', '..#..', '..#..', '.###.'],
  2: ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  3: ['####.', '....#', '....#', '.###.', '....#', '....#', '####.'],
  4: ['#..#.', '#..#.', '#..#.', '#####', '...#.', '...#.', '...#.'],
  5: ['#####', '#....', '####.', '....#', '....#', '#...#', '.###.'],
  6: ['..##.', '.#...', '#....', '####.', '#...#', '#...#', '.###.'],
  7: ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  8: ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
  9: ['.###.', '#...#', '#...#', '.####', '....#', '...#.', '.##..'],
  ' ': ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
  '.': ['.....', '.....', '.....', '.....', '.....', '.##..', '.##..'],
  ',': ['.....', '.....', '.....', '.....', '.##..', '.##..', '.#...'],
  '-': ['.....', '.....', '.....', '#####', '.....', '.....', '.....'],
  '+': ['.....', '..#..', '..#..', '#####', '..#..', '..#..', '.....'],
  '/': ['....#', '....#', '...#.', '..#..', '.#...', '#....', '#....'],
  '|': ['..#..', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  ':': ['.....', '.##..', '.##..', '.....', '.##..', '.##..', '.....'],
  '@': ['.###.', '#...#', '#.###', '#.#.#', '#.###', '#....', '.###.'],
  '%': ['##..#', '##.#.', '..#..', '.#...', '.####', '....#', '....#'],
  '·': ['.....', '.....', '.....', '.##..', '.##..', '.....', '.....'],
};

function drawText(rgba, w, text, x, y, scale, color) {
  let cx = x;
  for (const chRaw of text.toUpperCase()) {
    const ch = FONT[chRaw] ? chRaw : ' ';
    const g = FONT[ch];
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 5; c++) {
        if (g[r][c] !== '#') continue;
        for (let dy = 0; dy < scale; dy++) {
          for (let dx = 0; dx < scale; dx++) {
            const px = cx + c * scale + dx;
            const py = y + r * scale + dy;
            if (px < 0 || px >= w || py < 0) continue;
            const i = (py * w + px) * 4;
            rgba[i] = color[0]; rgba[i + 1] = color[1]; rgba[i + 2] = color[2]; rgba[i + 3] = 255;
          }
        }
      }
    }
    cx += 6 * scale;
  }
  return cx;
}

function textWidth(text, scale) { return text.length * 6 * scale - scale; }

function buildOgImage() {
  const W = 1200, H = 630;
  const rgba = Buffer.alloc(W * H * 4);
  const set = (x, y, r, g, b, a = 255) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const i = (y * W + x) * 4;
    const na = a / 255, ia = 1 - na;
    rgba[i] = rgba[i] * ia + r * na;
    rgba[i + 1] = rgba[i + 1] * ia + g * na;
    rgba[i + 2] = rgba[i + 2] * ia + b * na;
    rgba[i + 3] = 255;
  };
  const NEON = [61, 255, 158], CYAN = [41, 224, 255];

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const t = y / H;
      const radial = Math.exp(-(((x - W * 0.72) ** 2) / (2 * 260 ** 2) + ((y - H * 0.45) ** 2) / (2 * 240 ** 2)));
      const r = 4 + t * 6 + radial * 16;
      const g = 8 + t * 10 + radial * 46;
      const b = 13 + t * 12 + radial * 36;
      const i = (y * W + x) * 4;
      rgba[i] = r; rgba[i + 1] = g; rgba[i + 2] = b; rgba[i + 3] = 255;
    }
  }

  // HUD grid
  for (let x = 0; x <= W; x += 40) for (let y = 0; y < H; y++) set(x, y, 29, 48, 64, 90);
  for (let y = 0; y <= H; y += 40) for (let x = 0; x < W; x++) set(x, y, 29, 48, 64, 90);

  // corner brackets
  const bracket = (x, y, sx, sy) => {
    for (let i = 0; i < 54; i++) { set(x + sx * i, y, ...NEON, 220); set(x + sx * i, y + 1, ...NEON, 110); }
    for (let i = 0; i < 54; i++) { set(x, y + sy * i, ...NEON, 220); set(x + 1, y + sy * i, ...NEON, 110); }
  };
  bracket(28, 28, 1, 1); bracket(W - 29, 28, -1, 1);
  bracket(28, H - 29, 1, -1); bracket(W - 29, H - 29, -1, -1);

  // radar rings + crosshair (right side)
  const rcx = 900, rcy = 315;
  for (const rad of [86, 138, 190, 242]) {
    for (let a = 0; a < 360; a += 0.4) {
      const t = (a * Math.PI) / 180;
      const x = Math.round(rcx + Math.cos(t) * rad);
      const y = Math.round(rcy + Math.sin(t) * rad);
      const alpha = rad === 242 ? 70 : 110;
      set(x, y, ...CYAN, alpha);
    }
  }
  for (let i = -268; i <= 268; i++) { set(rcx + i, rcy, ...CYAN, 55); set(rcx, rcy + i, ...CYAN, 55); }
  for (let a = 0; a < 360; a += 3) {
    const t = (a * Math.PI) / 180;
    for (let r = 0; r < 242; r += 2) {
      const x = Math.round(rcx + Math.cos(t) * r);
      const y = Math.round(rcy + Math.sin(t) * r);
      const fade = Math.max(0, 46 - (a % 60) * 0.9) * (1 - r / 300);
      if (fade > 1) set(x, y, ...NEON, fade);
    }
  }
  for (const [bx, by] of [[0.18, 0.22], [0.62, -0.4], [-0.5, 0.55]]) {
    const x = Math.round(rcx + bx * 200), y = Math.round(rcy + by * 200);
    for (let dx = -4; dx <= 4; dx++) for (let dy = -4; dy <= 4; dy++) {
      const d = Math.max(Math.abs(dx), Math.abs(dy));
      set(x + dx, y + dy, ...NEON, d === 4 ? 255 : 90);
    }
  }

  // left column type
  const LX = 84;
  drawText(rgba, W, '// ROBOTICS PORTFOLIO', LX, 96, 3, [94, 116, 136]);
  for (let i = 0; i < textWidth('// ROBOTICS PORTFOLIO', 3) + 16; i++) set(LX + i, 90, ...NEON, 120);

  drawText(rgba, W, 'NESTOR IVAN', LX, 158, 9, [232, 244, 250]);
  drawText(rgba, W, 'OSPINA GAITAN', LX, 232, 9, NEON);

  drawText(rgba, W, 'ROBOTICS SOFTWARE ENGINEER', LX, 330, 4, [146, 169, 187]);
  drawText(rgba, W, 'CONTROL · NAVIGATION · CAD DESIGN', LX, 372, 3, [94, 116, 136]);

  // metric strip
  const stats = [['+50%', 'EFICIENCIA'], ['+25%', 'PRECISION'], ['-60%', 'VALIDACION'], ['99%', 'ANTI-COLISION']];
  let sx = LX;
  for (const [v, k] of stats) {
    for (let i = 0; i < 44; i++) set(sx + i, 436, ...CYAN, 180);
    drawText(rgba, W, v, sx, 452, 5, NEON);
    drawText(rgba, W, k, sx, 496, 2, [94, 116, 136]);
    sx += Math.max(textWidth(v, 5), textWidth(k, 2)) + 58;
  }

  drawText(rgba, W, 'ROS  ·  PYTHON  ·  C++  ·  MATLAB  ·  SOLIDWORKS  ·  JETSON', LX, 552, 2, [146, 169, 187]);
  for (let x = LX; x < W - LX; x++) set(x, 540, 29, 48, 64, 200);

  return encodePng(W, H, rgba);
}

/* ==========================================================================
 * 4. RUN
 * ========================================================================== */

console.log('\n[generate-assets] building placeholder assets…');

const models = [
  ['models/sample-robot.glb', sampleRobot()],
  ['models/drive-chassis.glb', driveChassis()],
  ['models/uvc-head-assembly.glb', uvcHead()],
  ['models/multi-agent-arena.glb', testArena()],
];
for (const [rel, parts] of models) out(rel, buildGlb(parts));

out('cv/nestor-ospina-cv.pdf', buildCv());
out('og-cover.png', buildOgImage());

console.log('[generate-assets] done.\n');
