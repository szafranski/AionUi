/**
 * Session cookie management for WebUI login
 * M5: implementation will handle session token generation + cookie setting
 */

export type SessionOptions = {
  maxAge?: number;
};

export type SessionHandle = {
  token: string;
  destroy: () => void;
};

/**
 * Create session
 * M5: implementation will generate secure session token
 */
export function createSession(opts?: SessionOptions): SessionHandle {
  throw new Error('M5: createSession not implemented yet');
}

/**
 * Verify session
 * M5: implementation will validate session token
 */
export function verifySession(token: string): boolean {
  throw new Error('M5: verifySession not implemented yet');
}
