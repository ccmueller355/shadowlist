// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import fs from 'fs';
import path from 'path';

/**
 * Guardrail: All version-bearing files must stay in sync with the
 * canonical VERSION file at project root.
 *
 * The app displays its version from Constants.expoConfig.version, which
 * reads from app.json at build time. npm run sync-version propagates
 * VERSION to app.json, app.json.apk, app.json.expo, and package.json.
 *
 * If this test fails, run: npm run sync-version
 */

const projectRoot = path.resolve(__dirname, '..', '..');
const versionPath = path.join(projectRoot, 'VERSION');

function readVersion(): string {
  return fs.readFileSync(versionPath, 'utf8').trim();
}

function readJsonVersion(filePath: string): string {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')).expo.version;
}

test('VERSION file is readable and non-empty', () => {
  const v = readVersion();
  expect(v).toMatch(/^\d+\.\d+\.\d+$/);
});

test('app.json version matches VERSION', () => {
  expect(readJsonVersion(path.join(projectRoot, 'app.json'))).toBe(readVersion());
});

test('app.json.apk version matches VERSION', () => {
  expect(readJsonVersion(path.join(projectRoot, 'app.json.apk'))).toBe(readVersion());
});

test('app.json.expo version matches VERSION', () => {
  expect(readJsonVersion(path.join(projectRoot, 'app.json.expo'))).toBe(readVersion());
});

test('package.json version matches VERSION', () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'),
  );
  expect(pkg.version).toBe(readVersion());
});
