import type { AppMetadata, WebUIConfig } from '../types.js';

/**
 * Reset password (for CLI --resetpass / desktop GUI reset button)
 * M5: implementation will generate new password + bcrypt hash + save to config
 */
export async function resetPassword(opts: { app: AppMetadata }): Promise<string> {
  throw new Error('M5: resetPassword not implemented yet');
}

/**
 * Change password (for desktop GUI webuiChangePassword IPC)
 * M5: implementation will verify old password + hash new password + save to config
 */
export async function changePassword(opts: {
  app: AppMetadata;
  oldPassword: string;
  newPassword: string;
}): Promise<void> {
  throw new Error('M5: changePassword not implemented yet');
}

/**
 * Verify password (for /api/auth/login internal use)
 * M5: implementation will compare bcrypt hash
 */
export async function verifyPassword(opts: {
  app: AppMetadata;
  password: string;
}): Promise<boolean> {
  throw new Error('M5: verifyPassword not implemented yet');
}

/**
 * Load WebUI config (password hash, rate limit state, etc.)
 * M5: implementation will read from userDataPath/webui.config.json
 */
export async function loadConfig(opts: { app: AppMetadata }): Promise<WebUIConfig> {
  throw new Error('M5: loadConfig not implemented yet');
}

/**
 * Save WebUI config
 * M5: implementation will write to userDataPath/webui.config.json
 */
export async function saveConfig(opts: { app: AppMetadata; config: WebUIConfig }): Promise<void> {
  throw new Error('M5: saveConfig not implemented yet');
}
