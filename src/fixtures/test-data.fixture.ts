import { test as base } from '@playwright/test';
import {
  TestDataLoader,
  TestPatientData,
  TestCardData,
  TestPlanData
} from '../utils/test-data-loader';

export interface TestDataFixtures {
  defaultPatient: TestPatientData;
  defaultCard: TestCardData;
  expiredCard: TestCardData;
  defaultPlanTemplate: TestPlanData;
}

export const testDataFixture = base.extend<TestDataFixtures>({
  defaultPatient: async ({}, use) => {
    await use(TestDataLoader.getDefaultPatient());
  },
  defaultCard: async ({}, use) => {
    await use(TestDataLoader.getDefaultCard());
  },
  expiredCard: async ({}, use) => {
    await use(TestDataLoader.getExpiredCard());
  },
  defaultPlanTemplate: async ({}, use) => {
    await use(TestDataLoader.getDefaultPlanTemplate());
  }
});
