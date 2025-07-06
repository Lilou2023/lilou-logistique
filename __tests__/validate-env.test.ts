/**
 * @jest-environment node
 */
import { spawnSync } from 'child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'fs';
import path from 'path';
import os from 'os';

const scriptPath = path.resolve(__dirname, '../scripts/validate-env.js');

function runScript(dir: string, envOverrides: NodeJS.ProcessEnv = {}) {
  const env = { PATH: process.env.PATH, ...envOverrides };
  return spawnSync('node', [scriptPath], { cwd: dir, encoding: 'utf-8', env });
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

  test('warns when .env file is present', () => {
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
    writeFileSync(path.join(dir, '.env'), 'DUMMY=1');
    const result = runScript(dir);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Un fichier .env existe');
  });

  test('warns for default values and invalid URL', () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), 'envtest-'));
    createEnvFile(
      dir,
      `NEXT_PUBLIC_SUPABASE_URL=https://example.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=service
OPENAI_API_KEY=openai
JWT_SECRET=short
NEXTAUTH_SECRET=short
`
    );
    const result = runScript(dir);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(0);
    const output = result.stdout;
    expect(output).toContain('Valeur par d\u00e9faut d\u00e9tect\u00e9e');
    expect(output).toContain('ne semble pas \u00eatre une URL Supabase valide');
    expect(output).toContain('devrait contenir au moins 32 caract\u00e8res');
  });
});
