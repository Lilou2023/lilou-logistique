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
      `NEXT_PUBLIC_SUPABASE_URL= https://mvhogfelpbufnrklxpxq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjQ0MDksImV4cCI6MjA2NDMwMDQwOX0.FrVdKelHzLgJFGFwnYfA23XsbzgrK6PCsSV01a1qM5I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODcyNDQwOSwiZXhwIjoyMDY0MzAwNDA5fQ.keTkB1muKnhNK3TkDrOcdG6vjQJKA_OYDIUSIUPDfSM
OPENAI_API_KEY=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 
JWT_SECRET=UiuSVGy6+Tzn93GwXa/dcyPBeD+Y9q7f18fwUPL/D1cdYmQQI5K8OjMZh/RlbCErVbgCSL9NqNAPAYVVxzAzPA== 
NEXTAUTH_SECRET=ytvqKJNF+DHMZXHeipda6n+DGVOKYWz2+5MoUiN/I6ED7v65kwboamNyN1Q=
    );
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
      `NEXT_PUBLIC_SUPABASE_URL= https://mvhogfelpbufnrklxpxq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjQ0MDksImV4cCI6MjA2NDMwMDQwOX0.FrVdKelHzLgJFGFwnYfA23XsbzgrK6PCsSV01a1qM5I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODcyNDQwOSwiZXhwIjoyMDY0MzAwNDA5fQ.keTkB1muKnhNK3TkDrOcdG6vjQJKA_OYDIUSIUPDfSM
OPENAI_API_KEY=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 
JWT_SECRET=UiuSVGy6+Tzn93GwXa/dcyPBeD+Y9q7f18fwUPL/D1cdYmQQI5K8OjMZh/RlbCErVbgCSL9NqNAPAYVVxzAzPA== 
NEXTAUTH_SECRET=ytvqKJNF+DHMZXHeipda6n+DGVOKYWz2+5MoUiN/I6ED7v65kwboamNyN1Q=
    );
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
      `NEXT_PUBLIC_SUPABASE_URL= https://mvhogfelpbufnrklxpxq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjQ0MDksImV4cCI6MjA2NDMwMDQwOX0.FrVdKelHzLgJFGFwnYfA23XsbzgrK6PCsSV01a1qM5I
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aG9nZmVscGJ1Zm5ya2x4cHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODcyNDQwOSwiZXhwIjoyMDY0MzAwNDA5fQ.keTkB1muKnhNK3TkDrOcdG6vjQJKA_OYDIUSIUPDfSM
OPENAI_API_KEY=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 
JWT_SECRET=UiuSVGy6+Tzn93GwXa/dcyPBeD+Y9q7f18fwUPL/D1cdYmQQI5K8OjMZh/RlbCErVbgCSL9NqNAPAYVVxzAzPA== 
NEXTAUTH_SECRET=ytvqKJNF+DHMZXHeipda6n+DGVOKYWz2+5MoUiN/I6ED7v65kwboamNyN1Q=
    );
    const result = runScript(dir);
    rmSync(dir, { recursive: true, force: true });
    expect(result.status).toBe(0);
    expect(result.stdout + result.stderr).toMatch(/avertissements/i);
  });
});
