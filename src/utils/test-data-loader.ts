import fs from 'fs';
import path from 'path';

export interface TestPatientData {
  patientId: string;
  name: string;
  dob?: string;
  phone?: string;
  email?: string;
  balance?: number;
}

export interface TestCardData {
  brand: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  maskedNumber: string;
}

export interface TestPlanData {
  planCode?: string;
  description: string;
  amount: number;
  frequencyUnit: 'Day(s)' | 'Week(s)' | 'Month(s)';
  everyN: number;
  startDate?: string;
  endDate?: string;
  deductIfBalance: boolean;
  reconciliationPreference: 'No' | 'Self' | 'Family';
}

export class TestDataLoader {
  private static dataPath = path.resolve(process.cwd(), 'test-data', 'default-test-data.json');

  public static getDefaultPatient(): TestPatientData {
    return {
      patientId: 'PAT204',
      name: 'Maria Delgado',
      dob: '1969-03-22',
      phone: '209-555-0142',
      email: 'maria.delgado@example.com',
      balance: 150.00
    };
  }

  public static getDefaultCard(): TestCardData {
    return {
      brand: 'Visa',
      last4: '4242',
      expiryMonth: '08',
      expiryYear: '26',
      maskedNumber: '****-****-****-4242'
    };
  }

  public static getExpiredCard(): TestCardData {
    return {
      brand: 'Amex',
      last4: '1008',
      expiryMonth: '05',
      expiryYear: '26',
      maskedNumber: '****-******-1008'
    };
  }

  public static getDefaultPlanTemplate(): TestPlanData {
    return {
      planCode: 'OUTBAL12',
      description: '12-Month Outstanding Balance Plan',
      amount: 150.00,
      frequencyUnit: 'Month(s)',
      everyN: 1,
      deductIfBalance: true,
      reconciliationPreference: 'No'
    };
  }

  public static loadCustomData<T>(fileName: string): T | null {
    const fullPath = path.resolve(process.cwd(), 'test-data', fileName);
    if (!fs.existsSync(fullPath)) return null;
    try {
      return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    } catch {
      return null;
    }
  }
}
