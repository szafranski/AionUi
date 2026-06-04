import { describe, expect, it } from 'vitest';

import type { TFunction } from 'i18next';

import type { IRuntimeStatusEvent } from '@/common/adapter/ipcBridge';

import { formatRuntimeStatusText } from '@/renderer/runtime/runtimeStatusText';

const t = ((key: string, options?: Record<string, string>) => {
  let text = options?.defaultValue ?? key;
  if (options?.resource) {
    text = text.replaceAll('{{resource}}', options.resource);
  }
  if (options?.status) {
    text = text.replaceAll('{{status}}', options.status);
  }
  return text;
}) as unknown as TFunction;

function failedStatus(message?: string): IRuntimeStatusEvent {
  return {
    resource: 'acp_tool',
    resource_id: 'codex-acp',
    scope: { kind: 'conversation', id: 'conv-1' },
    phase: 'failed',
    failure_kind: 'download_failed',
    message,
  };
}

describe('formatRuntimeStatusText', () => {
  it('formats certificate verification failures', () => {
    const text = formatRuntimeStatusText(
      t,
      failedStatus('fetch managed ACP manifest connect failed: invalid peer certificate: UnknownIssuer')
    );

    expect(text).toContain('TLS certificate could not be verified');
  });

  it('formats dns failures', () => {
    const text = formatRuntimeStatusText(
      t,
      failedStatus('download ACP tool archive connect failed: dns error: failed to lookup address information')
    );

    expect(text).toContain('download host could not be resolved');
  });

  it('formats connection reset failures', () => {
    const text = formatRuntimeStatusText(
      t,
      failedStatus('download ACP tool archive failed: connection reset by peer')
    );

    expect(text).toContain('connection was reset');
  });
});
