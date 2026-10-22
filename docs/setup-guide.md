# Setup & Installation Guide

## 1. Prerequisites

- **Node.js**: v18.0.0 or higher (v24.15.0+ recommended)
- **npm**: v9.0.0 or higher (v11.12.1+ recommended)
- **Java JRE / JDK**: Java 8+ or 21+ LTS (automatically discovered from DBeaver JRE or system PATH for Allure static reporting)
- **Operating System**: Windows, macOS, or Linux

## 2. Quickstart Installation

1. Navigate to the framework directory:
   ```bash
   cd enterprise-playwright-framework
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browser binaries:
   ```bash
   npx playwright install chromium
   ```
   > [!NOTE]
   > In corporate proxy environments with self-signed SSL certificates, run:
   > `$env:NODE_TLS_REJECT_UNAUTHORIZED="0"; npx playwright install chromium`

4. Configure environment settings:
   Copy `.env.example` to `.env` and configure target application credentials:
   ```env
   BASE_URL=https://webims.meditab.local/#/login
   CLINIC=your-clinic-code
   APP_USERNAME=your-app-username
   PASSWORD=your-app-password
   BROWSER=chromium
   HEADLESS=true
   RETRIES=5
   HEALING_MODE=suggest
   ```

## 3. Verifying Installation

Run the static validation and typecheck:
```bash
npm run lint
npm run format
```

List discovered test cases:
```bash
npx playwright test --list
```
