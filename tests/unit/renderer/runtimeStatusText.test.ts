import { describe, expect, it } from 'vitest';

import { formatRuntimeStatusText } from '@/renderer/runtime/runtimeStatusText';

const t = (key: string, options?: Record<string, unknown>) => {
  const resource = String(options?.resource ?? '');
  switch (key) {
    case 'settings.runtimeStatus.downloading':
    case 'settings.runtimeStatus.extracting':
      return `Preparing ${resource}.`;
    case 'settings.runtimeStatus.validating':
      return `Validating ${resource}.`;
    case 'settings.runtimeStatus.failedBundled':
      return `Bundled ${resource} is invalid.`;
    case 'settings.runtimeResource.codexAcp':
      return 'Codex runtime component';
    case 'settings.runtimeResource.node':
      return 'Managed Node runtime';
    default:
      return key;
  }
};

describe('formatRuntimeStatusText', () => {
  it('uses generic preparing copy for local ACP activation', () => {
    const text = formatRuntimeStatusText(t as never, {
      scope: { kind: 'conversation', id: 'conv-1' },
      resource: 'acp_tool',
      resource_id: 'codex-acp',
      phase: 'extracting',
      message: 'activating managed Codex ACP artifact from /tmp/resource',
      failure_kind: null,
      status_code: null,
    });

    expect(text).toBe('Preparing Codex runtime component.');
  });

  it('uses generic preparing copy for download phase', () => {
    const text = formatRuntimeStatusText(t as never, {
      scope: { kind: 'conversation', id: 'conv-1' },
      resource: 'node',
      resource_id: null,
      phase: 'downloading',
      message: 'downloading (12MB / 51MB)',
      failure_kind: null,
      status_code: null,
    });

    expect(text).toBe('Preparing Managed Node runtime (12MB / 51MB)');
  });

  it('uses reinstall guidance for bundled resource failures', () => {
    const text = formatRuntimeStatusText(t as never, {
      scope: { kind: 'conversation', id: 'conv-1' },
      resource: 'node',
      resource_id: null,
      phase: 'failed',
      message: 'bundled Node runtime failed validation under /Applications/AionUi.app/Contents/Resources',
      failure_kind: 'validation_failed',
      status_code: null,
    });

    expect(text).toBe('Bundled Managed Node runtime is invalid.');
  });
});
