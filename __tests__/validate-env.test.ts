/**
 * @jest-environment node
 */
import { spawnSync } from 'child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import path from 'path';
import os from 'os';

const scriptPath = path.resolve(__dirname, '../scripts/validate-env.js');

function runScript(dir: string) {
  return spawnSync('node', [scriptPath], {
    cwd: dir,
    encoding: 'utf-8',
    env: { PATH: process.env.PATH },
  });
}

function createEnvFile(dir: string, content: string) {
  writeFileSync(path.join(dir, '.env.local'), content);
}

describe('validate-env script', () => {
  test('exits with code 1 if .env.local is missing', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'envtest-'));
    const result = runScript(dir);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(1);
  });

  test('succeeds when all required variables are present', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'envtest-'));
    createEnvFile(
      dir,
      `NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon
SUPABASE_SERVICE_ROLE_KEY=service
OPENAI_API_KEY=openai
JWT_SECRET=abcdefghijklmnopqrstuvwxyz123456
NEXTAUTH_SECRET=abcdefghijklmnopqrstuvwxyz654321
`
    );
    const result = runScript(dir);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(0);
    expect(result.stdout + result.stderr).toMatch(/Validation/);
  });

  test('exits with code 1 when a required variable is missing', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'envtest-'));
    createEnvFile(
      dir,
      `NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon
SUPABASE_SERVICE_ROLE_KEY=service
OPENAI_API_KEY=openai
JWT_SECRET=abcdefghijklmnopqrstuvwxyz123456
`
    );
    const result = runScript(dir);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(1);
  });

  test('succeeds with warnings on default values', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'envtest-'));
    createEnvFile(
      dir,
      `NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon
SUPABASE_SERVICE_ROLE_KEY=service
OPENAI_API_KEY=openai
JWT_SECRET=abcdefghijklmnopqrstuvwxyz123456
NEXTAUTH_SECRET=abcdefghijklmnopqrstuvwxyz654321
`
    );
    const result = runScript(dir);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(0);
    expect(result.stdout + result.stderr).toMatch(/avertissements/i);
  });

  test('warns when a .env file exists', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'envtest-'));
    createEnvFile(
      dir,
      `NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon
SUPABASE_SERVICE_ROLE_KEY=service
OPENAI_API_KEY=openai
JWT_SECRET=abcdefghijklmnopqrstuvwxyz123456
NEXTAUTH_SECRET=abcdefghijklmnopqrstuvwxyz654321
`
    );
    // create a .env file to trigger warning
    writeFileSync(path.join(dir, '.env'), 'DUMMY=1');
    const result = runScript(dir);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(0);
    expect(result.stdout + result.stderr).toMatch(/Un fichier \.env existe/);
  });

  test('warns on invalid Supabase URL', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'envtest-'));
    createEnvFile(
      dir,
      `NEXT_PUBLIC_SUPABASE_URL=https://example.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon
SUPABASE_SERVICE_ROLE_KEY=service
OPENAI_API_KEY=openai
JWT_SECRET=abcdefghijklmnopqrstuvwxyz123456
NEXTAUTH_SECRET=abcdefghijklmnopqrstuvwxyz654321
`
    );
    const result = runScript(dir);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(0);
    expect(result.stdout + result.stderr).toMatch(/ne semble pas être une URL Supabase valide/);
  });

  test('warns when secrets are too short', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'envtest-'));
    createEnvFile(
      dir,
      `NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon
SUPABASE_SERVICE_ROLE_KEY=service
OPENAI_API_KEY=openai
JWT_SECRET=short
NEXTAUTH_SECRET=shorter
`
    );
    const result = runScript(dir);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(0);
    expect(result.stdout + result.stderr).toMatch(/au moins 32 caractères/);
  });
});
