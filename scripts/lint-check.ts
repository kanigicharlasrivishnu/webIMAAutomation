import { execSync } from 'child_process';

function runLint(): void {
  console.log('[Lint] Running static typecheck and code inspection...');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('[Lint] Static analysis passed with 0 errors.');
  } catch (err: any) {
    console.error('[Lint] Static analysis found type errors.');
    process.exit(1);
  }
}

runLint();
