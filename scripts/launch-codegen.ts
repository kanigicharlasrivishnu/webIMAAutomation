import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { env } from '../src/config/environment';

/**
 * Launch Playwright Codegen with optional storage state and configured Base URL
 */
function launchCodegen(): void {
  const targetUrl = process.argv[2] || env.BASE_URL;
  const storageState = env.STORAGE_STATE_PATH;

  const args = ['playwright', 'codegen', targetUrl];

  if (fs.existsSync(storageState)) {
    console.log(`[Codegen] Loading authenticated storage state from ${storageState}`);
    args.push(`--load-storage=${storageState}`);
  } else {
    console.log(`[Codegen] No storage state found. Launching clean browser session at ${targetUrl}`);
  }

  console.log(`[Codegen] Running: npx ${args.join(' ')}`);

  const proc = spawn('npx', args, {
    stdio: 'inherit',
    shell: true
  });

  proc.on('close', code => {
    console.log(`[Codegen] Exited with code ${code}`);
  });
}

launchCodegen();
