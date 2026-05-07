import { describe, it, expect } from 'vitest';
import type { AppMetadata, WebUIConfig } from '../types.js';

// M3: minimal test skeleton to verify test infrastructure works
// M5: replace with real fs mock tests

describe('auth/config (M3 placeholder)', () => {
  const mockApp: AppMetadata = {
    version: '1.0.0',
    isPackaged: false,
    resourcesPath: '/mock/resources',
    userDataPath: '/mock/userData',
  };

  it('readConfig should throw not implemented yet', async () => {
    const { readConfig } = await import('./config.js');
    await expect(readConfig(mockApp)).rejects.toThrow('M5: readConfig not implemented yet');
  });

  it('writeConfig should throw not implemented yet', async () => {
    const { writeConfig } = await import('./config.js');

    const config: WebUIConfig = {
      passwordHash: 'mock-hash',
      adminUsername: 'admin',
    };

    await expect(writeConfig(mockApp, config)).rejects.toThrow('M5: writeConfig not implemented yet');
  });
});
