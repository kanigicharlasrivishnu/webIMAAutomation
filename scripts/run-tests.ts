import { execSync } from 'child_process';
import { env } from '../src/config/environment';

function runExecutionEngine(): void {
  const args = process.argv.slice(2);
  let grepFilter = '';
  let headedFlag = env.HEADLESS ? '' : '--headed';
  let project = 'chromium';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--smoke') {
      grepFilter = '@smoke';
    } else if (arg === '--regression') {
      grepFilter = '@regression';
    } else if (arg === '--id' && args[i + 1]) {
      grepFilter = args[i + 1];
      i++;
    } else if (arg === '--headed') {
      headedFlag = '--headed';
    } else if (arg === '--headless') {
      headedFlag = '';
    } else if (arg === '--project' && args[i + 1]) {
      project = args[i + 1];
      i++;
    }
  }

  let cmd = `npx playwright test --project=${project} ${headedFlag}`;
  if (grepFilter) {
    cmd += ` --grep="${grepFilter}"`;
  }

  console.log(`[Execution Engine] Running command: ${cmd}`);

  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log('[Execution Engine] Test execution completed successfully.');
  } catch (err: any) {
    console.error(`[Execution Engine] Tests completed with failure status.`);
    process.exit(err.status || 1);
  }
}

runExecutionEngine();
