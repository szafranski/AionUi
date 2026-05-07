export type StaticServerOptions = {
  staticDir: string;
  backendPort: number;
  port?: number;
  allowRemote?: boolean;
};

export type StaticServerHandle = {
  port: number;
  url: string;
  localUrl: string;
  networkUrl?: string;
  lanIP?: string;
  stop: () => Promise<void>;
};

/**
 * Start static server with backend proxy
 * M5: implementation will use Node http + serve-handler + /api /ws reverse proxy
 */
export async function startStaticServer(opts: StaticServerOptions): Promise<StaticServerHandle> {
  throw new Error('M5: startStaticServer not implemented yet');
}

/**
 * Stop static server
 * M5: implementation will close HTTP server
 */
export async function stopStaticServer(handle: StaticServerHandle): Promise<void> {
  throw new Error('M5: stopStaticServer not implemented yet');
}
