import type { TFunction } from 'i18next';

import type { IRuntimeStatusEvent, IRuntimeStatusScope } from '@/common/adapter/ipcBridge';

function extractDownloadProgress(message?: string | null): string | null {
  if (!message) {
    return null;
  }

  const match = message.match(/\((\d+)MB(?:\s*\/\s*(\d+)MB)?\)/i);
  if (!match) {
    return null;
  }

  const downloaded = `${match[1]}MB`;
  const total = match[2] ? `${match[2]}MB` : null;
  return total ? `${downloaded} / ${total}` : downloaded;
}

function appendProgressSuffix(text: string, progress: string): string {
  const trimmed = text.trim().replace(/[。.]$/, '');
  return `${trimmed} (${progress})`;
}

type DownloadFailureDetail = 'certificate' | 'dns' | 'proxy' | 'connection_reset' | null;

function detectDownloadFailureDetail(message?: string | null): DownloadFailureDetail {
  if (!message) {
    return null;
  }

  const normalized = message.toLowerCase();
  if (
    normalized.includes('certificate verify failed') ||
    normalized.includes('self-signed certificate') ||
    normalized.includes('invalid peer certificate') ||
    normalized.includes('unknownissuer') ||
    normalized.includes('certificate has expired')
  ) {
    return 'certificate';
  }
  if (
    normalized.includes('dns error') ||
    normalized.includes('failed to lookup address information') ||
    normalized.includes('temporary failure in name resolution') ||
    normalized.includes('name or service not known') ||
    normalized.includes('nodename nor servname provided')
  ) {
    return 'dns';
  }
  if (normalized.includes('proxy') || normalized.includes('proxy connect') || normalized.includes('tunnel')) {
    return 'proxy';
  }
  if (
    normalized.includes('connection reset') ||
    normalized.includes('connection closed') ||
    normalized.includes('broken pipe') ||
    normalized.includes('unexpected eof') ||
    normalized.includes('connection aborted')
  ) {
    return 'connection_reset';
  }
  return null;
}

export function formatRuntimeScopeLabel(t: TFunction, scope: IRuntimeStatusScope): string {
  switch (scope.kind) {
    case 'conversation':
      return t('settings.runtimeScope.conversation', { defaultValue: 'Conversation' });
    case 'mcp':
      return t('settings.runtimeScope.mcp', { defaultValue: 'MCP' });
    case 'custom_agent':
      return t('settings.runtimeScope.customAgent', { defaultValue: 'Custom Agent' });
  }
}

function formatRuntimeResourceLabel(t: TFunction, status: IRuntimeStatusEvent): string {
  if (status.resource === 'acp_tool') {
    if (status.resource_id === 'codex-acp') {
      return t('settings.runtimeResource.codexAcp');
    }
    if (status.resource_id === 'claude-agent-acp') {
      return t('settings.runtimeResource.claudeAgentAcp');
    }
    return t('settings.runtimeResource.acpTool');
  }
  return t('settings.runtimeResource.node');
}

export function formatRuntimeStatusText(t: TFunction, status: IRuntimeStatusEvent): string {
  const resource = formatRuntimeResourceLabel(t, status);

  switch (status.phase) {
    case 'waiting_for_lock': {
      return t('settings.runtimeStatus.waitingForLock', {
        resource,
        defaultValue: 'Waiting for another task to finish preparing {{resource}}.',
      });
    }
    case 'downloading': {
      const base = t('settings.runtimeStatus.downloading', {
        resource,
        defaultValue: 'Downloading {{resource}}.',
      });
      const progress = extractDownloadProgress(status.message);
      return progress ? appendProgressSuffix(base, progress) : base;
    }
    case 'extracting':
      return t('settings.runtimeStatus.extracting', {
        resource,
        defaultValue: 'Extracting {{resource}}.',
      });
    case 'validating':
      return t('settings.runtimeStatus.validating', {
        resource,
        defaultValue: 'Validating {{resource}}.',
      });
    case 'ready':
      return t('settings.runtimeStatus.ready', {
        resource,
        defaultValue: '{{resource}} is ready.',
      });
    case 'failed':
      switch (status.failure_kind) {
        case 'timeout':
          return t('settings.runtimeStatus.failedTimeout', {
            resource,
            defaultValue: 'Preparing {{resource}} timed out. Try again.',
          });
        case 'download_failed':
          switch (detectDownloadFailureDetail(status.message)) {
            case 'certificate':
              return t('settings.runtimeStatus.failedDownloadCertificate', {
                resource,
                defaultValue:
                  'Downloading {{resource}} failed because the TLS certificate could not be verified. Check your proxy or system certificate settings and try again.',
              });
            case 'dns':
              return t('settings.runtimeStatus.failedDownloadDns', {
                resource,
                defaultValue:
                  'Downloading {{resource}} failed because the download host could not be resolved. Check your DNS or network settings and try again.',
              });
            case 'proxy':
              return t('settings.runtimeStatus.failedDownloadProxy', {
                resource,
                defaultValue:
                  'Downloading {{resource}} failed because the proxy connection could not be established. Check your proxy settings and try again.',
              });
            case 'connection_reset':
              return t('settings.runtimeStatus.failedDownloadReset', {
                resource,
                defaultValue:
                  'Downloading {{resource}} was interrupted because the connection was reset. Check your network and try again.',
              });
            default:
              return t('settings.runtimeStatus.failedDownload', {
                resource,
                defaultValue: 'Downloading {{resource}} failed. Check your network and try again.',
              });
          }
        case 'http_status':
          return t('settings.runtimeStatus.failedHttp', {
            resource,
            status: status.status_code ?? 'unknown',
            defaultValue: 'Downloading {{resource}} failed (HTTP {{status}}).',
          });
        case 'checksum_mismatch':
          return t('settings.runtimeStatus.failedChecksum', {
            resource,
            defaultValue: 'Verifying {{resource}} failed because the downloaded file was corrupted. Try again.',
          });
        case 'validation_failed':
          return t('settings.runtimeStatus.failedValidation', {
            resource,
            defaultValue: 'Validating {{resource}} failed. Try again.',
          });
        case 'unsupported_platform':
          return t('settings.runtimeStatus.failedUnsupported', {
            resource,
            defaultValue: '{{resource}} is not supported on this platform.',
          });
        default:
          return t('settings.runtimeStatus.failedUnknown', {
            resource,
            defaultValue: 'Preparing {{resource}} failed. Try again.',
          });
      }
  }
}
