/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

vi.mock('@/common', () => ({
  ipcBridge: {
    pptPreview: {
      start: { invoke: vi.fn() },
      stop: { invoke: vi.fn() },
      status: { on: vi.fn(() => vi.fn()) },
    },
    wordPreview: {
      start: { invoke: vi.fn() },
      stop: { invoke: vi.fn() },
      status: { on: vi.fn(() => vi.fn()) },
    },
    excelPreview: {
      start: { invoke: vi.fn() },
      stop: { invoke: vi.fn() },
      status: { on: vi.fn(() => vi.fn()) },
    },
  },
}));

vi.mock('@/common/adapter/httpBridge', () => ({
  getBaseUrl: () => 'http://localhost:3000',
  isBackendHttpError: vi.fn(() => false),
}));

vi.mock('@/renderer/components/media/WebviewHost', () => ({
  default: ({ url }: { url: string }) => <div data-testid="webview-host">{url}</div>,
}));

vi.mock('@/renderer/utils/platform', () => ({
  openExternalUrl: vi.fn(),
  isElectronDesktop: () => true,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

import OfficeWatchViewer from '@/renderer/pages/conversation/Preview/components/viewers/OfficeWatchViewer';
import { ipcBridge } from '@/common';

describe('OfficeWatchViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (ipcBridge.pptPreview.start.invoke as any).mockImplementation(() => new Promise(() => {}));
    render(<OfficeWatchViewer docType="ppt" file_path="/test.pptx" />);
    expect(screen.getByText('preview.ppt.loading')).toBeInTheDocument();
  });

  it('renders WebviewHost when watch URL is ready', async () => {
    (ipcBridge.pptPreview.start.invoke as any).mockResolvedValue({
      url: 'http://127.0.0.1:8080/',
    });
    render(<OfficeWatchViewer docType="ppt" file_path="/test.pptx" />);
    await waitFor(() => {
      expect(screen.getByTestId('webview-host')).toBeInTheDocument();
    });
  });

  it('shows error when file_path is missing', async () => {
    render(<OfficeWatchViewer docType="word" />);
    await waitFor(() => {
      expect(screen.getByText('preview.errors.missingFilePath')).toBeInTheDocument();
    });
  });
});
