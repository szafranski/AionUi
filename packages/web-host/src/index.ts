import type { WebHostOptions, WebHostHandle } from './types.js';

export type { AppMetadata, BackendBinaryResolver, WebHostOptions, WebHostHandle, WebUIConfig } from './types.js';
export { resetPassword, changePassword, verifyPassword, loadConfig, saveConfig } from './auth/index.js';

/**
 * Start WebHost (main entry point)
 * M4-M5: implementation will orchestrate backend-launcher + static-server
 */
export async function startWebHost(opts: WebHostOptions): Promise<WebHostHandle> {
  throw new Error('M4: startWebHost not implemented yet');
}
