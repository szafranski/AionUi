import { describe, it, expect, vi } from 'vitest';
import type { StaticServerOptions } from './static-server.js';

// M3: minimal test skeleton to verify test infrastructure works
// M5: replace with real mock HTTP server + proxy tests

describe('static-server (M3 placeholder)', () => {
  it('startStaticServer should throw not implemented yet', async () => {
    const { startStaticServer } = await import('./static-server.js');

    const opts: StaticServerOptions = {
      staticDir: '/mock/renderer',
      backendPort: 8080,
      port: 25808,
    };

    await expect(startStaticServer(opts)).rejects.toThrow('M5: startStaticServer not implemented yet');
  });

  it('stopStaticServer should throw not implemented yet', async () => {
    const { stopStaticServer } = await import('./static-server.js');

    const handle = {
      port: 25808,
      url: 'http://localhost:25808',
      localUrl: 'http://localhost:25808',
      stop: vi.fn(),
    };

    await expect(stopStaticServer(handle)).rejects.toThrow('M5: stopStaticServer not implemented yet');
  });
});
