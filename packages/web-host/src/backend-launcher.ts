import type { AppMetadata, BackendBinaryResolver } from './types.js';

export type BackendLaunchOptions = {
  app: AppMetadata;
  resolveBackend: BackendBinaryResolver;
  port?: number;
  dataDir?: string;
  logDir?: string;
};

export type BackendHandle = {
  port: number;
  stop: () => Promise<void>;
};

/**
 * Start aionui-backend process
 * M4: implementation will spawn backend + health check
 */
export async function startBackend(opts: BackendLaunchOptions): Promise<BackendHandle> {
  throw new Error('M4: startBackend not implemented yet');
}

/**
 * Stop backend process
 * M4: implementation will terminate spawned process
 */
export async function stopBackend(handle: BackendHandle): Promise<void> {
  throw new Error('M4: stopBackend not implemented yet');
}
