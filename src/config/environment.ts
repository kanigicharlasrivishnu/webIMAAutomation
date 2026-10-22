import * as dotenv from 'dotenv';
import * as path from 'path';

// Force dotenv to override system environment variables (such as Windows OS USERNAME)
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

export interface EnvironmentConfig {
  BASE_URL: string;
  CLINIC: string;
  USERNAME: string;
  PASSWORD: string;
  STORAGE_STATE_PATH: string;
  BROWSER: 'chromium' | 'firefox' | 'webkit' | 'chrome' | 'msedge';
  HEADLESS: boolean;
  VIEWPORT_WIDTH: number;
  VIEWPORT_HEIGHT: number;
  DEFAULT_TIMEOUT: number;
  EXPECT_TIMEOUT: number;
  ACTION_TIMEOUT: number;
  NAVIGATION_TIMEOUT: number;
  WORKERS: number;
  RETRIES: number;
  HEALING_MODE: 'off' | 'suggest' | 'approved';
  TEST_CASE_DIR: string;
  LOG_LEVEL: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  REDACT_SECRETS: boolean;
}

function getEnvString(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

function getEnvNumber(key: string, defaultValue: number): number {
  const val = process.env[key];
  if (!val) return defaultValue;
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

function getEnvBoolean(key: string, defaultValue: boolean): boolean {
  const val = process.env[key];
  if (val === undefined) return defaultValue;
  return val.toLowerCase() === 'true' || val === '1';
}

export const env: EnvironmentConfig = {
  BASE_URL: getEnvString('BASE_URL', 'https://webims.meditab.local/#/login'),
  CLINIC: getEnvString('CLINIC', ''),
  // Prioritize APP_USERNAME to avoid Windows OS USERNAME collisions
  USERNAME: getEnvString('APP_USERNAME', getEnvString('USERNAME', '')),
  PASSWORD: getEnvString('PASSWORD', ''),
  STORAGE_STATE_PATH: getEnvString('STORAGE_STATE_PATH', path.resolve(process.cwd(), 'auth', 'user-state.json')),
  BROWSER: (getEnvString('BROWSER', 'chromium') as EnvironmentConfig['BROWSER']),
  HEADLESS: getEnvBoolean('HEADLESS', true),
  VIEWPORT_WIDTH: getEnvNumber('VIEWPORT_WIDTH', 1920),
  VIEWPORT_HEIGHT: getEnvNumber('VIEWPORT_HEIGHT', 1080),
  DEFAULT_TIMEOUT: getEnvNumber('DEFAULT_TIMEOUT', 45000),
  EXPECT_TIMEOUT: getEnvNumber('EXPECT_TIMEOUT', 10000),
  ACTION_TIMEOUT: getEnvNumber('ACTION_TIMEOUT', 15000),
  NAVIGATION_TIMEOUT: getEnvNumber('NAVIGATION_TIMEOUT', 45000),
  WORKERS: getEnvNumber('WORKERS', 2),
  RETRIES: getEnvNumber('RETRIES', 5),
  HEALING_MODE: (getEnvString('HEALING_MODE', 'suggest') as EnvironmentConfig['HEALING_MODE']),
  TEST_CASE_DIR: getEnvString('TEST_CASE_DIR', path.resolve(process.cwd(), 'test-cases', 'original')),
  LOG_LEVEL: (getEnvString('LOG_LEVEL', 'INFO') as EnvironmentConfig['LOG_LEVEL']),
  REDACT_SECRETS: getEnvBoolean('REDACT_SECRETS', true)
};

export function validateRequiredEnv(): { valid: boolean; missing: string[] } {
  const requiredKeys: (keyof EnvironmentConfig)[] = ['BASE_URL', 'CLINIC', 'USERNAME', 'PASSWORD'];
  const missing: string[] = [];

  for (const k of requiredKeys) {
    if (!env[k]) {
      missing.push(k);
    }
  }

  return {
    valid: missing.length === 0,
    missing
  };
}
