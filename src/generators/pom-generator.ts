import fs from 'fs';
import path from 'path';
import { defaultLogger } from '../utils/logger';

export interface PageMethodBlueprint {
  name: string;
  description: string;
  parameters: Array<{ name: string; type: string }>;
  actionType: 'click' | 'fill' | 'select' | 'navigate' | 'verify';
  targetLocator: string;
}

export interface POMBlueprint {
  className: string;
  pageRoute?: string;
  locators: Array<{ name: string; selector: string; description: string }>;
  methods: PageMethodBlueprint[];
}

export class POMGenerator {
  private outputDir: string;

  constructor(outputDir = path.resolve(process.cwd(), 'src', 'pages')) {
    this.outputDir = outputDir;
  }

  public generatePOM(blueprint: POMBlueprint): string {
    const filePath = path.join(this.outputDir, `${blueprint.className}.ts`);

    let code = `import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ${blueprint.className} extends BasePage {
`;

    // Declare Locators
    for (const loc of blueprint.locators) {
      code += `  public ${loc.name}: Locator; // ${loc.description}\n`;
    }

    // Constructor
    code += `
  constructor(page: Page, testCaseId?: string) {
    super(page, testCaseId);
`;

    for (const loc of blueprint.locators) {
      code += `    this.${loc.name} = page.locator('${loc.selector}');\n`;
    }

    code += `  }\n`;

    // Methods
    if (blueprint.pageRoute) {
      code += `
  public async open(): Promise<void> {
    await this.navigateTo('${blueprint.pageRoute}');
  }
`;
    }

    for (const m of blueprint.methods) {
      const paramsList = m.parameters.map(p => `${p.name}: ${p.type}`).join(', ');
      code += `
  /**
   * ${m.description}
   */
  public async ${m.name}(${paramsList}): Promise<void> {
    this.logger.info(\`Executing ${m.name}\`);
`;

      if (m.actionType === 'click') {
        code += `    await this.locatorHelper.safeClick(this.${m.targetLocator}, '${m.name}');\n`;
      } else if (m.actionType === 'fill') {
        code += `    await this.locatorHelper.safeFill(this.${m.targetLocator}, ${m.parameters[0]?.name || "''"}, '${m.name}');\n`;
      }
      code += `  }\n`;
    }

    code += `}\n`;

    fs.writeFileSync(filePath, code, 'utf-8');
    defaultLogger.info(`Generated POM class at ${filePath}`);
    return filePath;
  }
}
