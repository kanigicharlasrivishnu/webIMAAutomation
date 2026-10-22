import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { frameworkConfig } from '../src/config/framework.config';
import { env } from '../src/config/environment';

function resolveJavaEnvironment(): void {
  // If JAVA_HOME is already set and working, keep it
  try {
    execSync('java -version', { stdio: 'ignore' });
    return;
  } catch {
    // Check known local JRE locations
    const knownLocations = [
      'C:\\Users\\srivishnuk\\AppData\\Local\\DBeaver\\jre',
      'C:\\Program Files\\SQL Anywhere 17\\Bin64\\jre180',
      'C:\\Program Files\\Java\\jdk-21',
      'C:\\Program Files\\Java\\jre-1.8'
    ];

    for (const loc of knownLocations) {
      const javaBin = path.join(loc, 'bin', 'java.exe');
      if (fs.existsSync(javaBin)) {
        process.env.JAVA_HOME = loc;
        process.env.PATH = `${path.join(loc, 'bin')};${process.env.PATH}`;
        console.log(`[Allure] Detected and configured local Java runtime at: ${loc}`);
        return;
      }
    }
  }
}

function generateAllureReport(): void {
  const resultsDir = frameworkConfig.paths.allureResultsDir;
  const reportDir = frameworkConfig.paths.allureReportDir;

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  // Ensure environment.properties is written for Allure dashboard
  const envProperties = `
BASE_URL=${env.BASE_URL}
CLINIC=${env.CLINIC}
BROWSER=${env.BROWSER}
RETRIES=${env.RETRIES}
HEALING_MODE=${env.HEALING_MODE}
NODE_VERSION=${process.version}
PLATFORM=${process.platform}
`;
  fs.writeFileSync(path.join(resultsDir, 'environment.properties'), envProperties.trim(), 'utf-8');

  resolveJavaEnvironment();

  console.log(`[Allure] Generating HTML report from ${resultsDir} into ${reportDir}...`);

  try {
    execSync(`npx allure generate "${resultsDir}" --clean -o "${reportDir}"`, {
      stdio: 'inherit'
    });
    console.log(`[Allure] Report successfully generated at ${reportDir}`);
    console.log(`[Allure] To view report in browser run: npm run test:allure:open`);
  } catch (err: any) {
    console.error(`[Allure] Failed to generate report: ${err.message}`);
    process.exit(1);
  }
}

generateAllureReport();
