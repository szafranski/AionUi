import { describe, it, expect, vi } from 'vitest';
import type { BackendLaunchOptions } from './backend-launcher.js';

// M3: minimal test skeleton to verify test infrastructure works
// M4: replace with real mock spawn + /health fetch tests

describe('backend-launcher (M3 placeholder)', () => {
  it('startBackend should throw not implemented yet', async () => {
    const { startBackend } = await import('./backend-launcher.js');

    const opts: BackendLaunchOptions = {
      app: {
        version: '1.0.0',
        isPackaged: false,
        resourcesPath: '/mock/resources',
        userDataPath: '/mock/userData',
      },
      resolveBackend: () => '/mock/backend',
    };

    await expect(startBackend(opts)).rejects.toThrow('M4: startBackend not implemented yet');
  });

  it('stopBackend should throw not implemented yet', async () => {
    const { stopBackend } = await import('./backend-launcher.js');

    const handle = {
      port: 8080,
      stop: vi.fn(),
    };

    await expect(stopBackend(handle)).rejects.toThrow('M4: stopBackend not implemented yet');
  });
});
