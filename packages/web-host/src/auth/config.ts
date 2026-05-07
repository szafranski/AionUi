import type { AppMetadata, WebUIConfig } from '../types.js';

/**
 * Read webui.config.json from userDataPath
 * M5: implementation will handle file I/O + JSON parse
 */
export async function readConfig(app: AppMetadata): Promise<WebUIConfig> {
  throw new Error('M5: readConfig not implemented yet');
}

/**
 * Write webui.config.json to userDataPath
 * M5: implementation will handle JSON stringify + file I/O
 */
export async function writeConfig(app: AppMetadata, config: WebUIConfig): Promise<void> {
  throw new Error('M5: writeConfig not implemented yet');
}
