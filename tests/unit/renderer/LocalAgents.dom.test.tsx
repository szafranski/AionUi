/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 *
 * Render test for the LocalAgents settings surface. Its purpose is to lock in
 * that LocalAgents reads the management view (`useManagedAgents`) — the
 * include_disabled data path that keeps user-disabled agents listed — and
 * derives the detected/custom sections from it.
 */

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

// t() echoes the key so section labels/buttons are assertable.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: 'en' } }),
}));

const navigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

// Controlled management-view data; assert LocalAgents consumes THIS hook.
const useManagedAgents = vi.fn();
vi.mock('@renderer/hooks/agent/useAgents', () => ({
  useManagedAgents: () => useManagedAgents(),
}));

// Hoisted so individual tests can drive/assert the enable toggle bridge call.
const setAgentEnabled = vi.hoisted(() => vi.fn());

// Bridge is only touched by user-action handlers, not on render — stub the
// shape the handlers reference so the import resolves.
vi.mock('@/common', () => ({
  ipcBridge: {
    acpConversation: {
      createCustomAgent: { invoke: vi.fn() },
      updateCustomAgent: { invoke: vi.fn() },
      deleteCustomAgent: { invoke: vi.fn() },
      setAgentEnabled: { invoke: setAgentEnabled },
    },
  },
}));

// Keep the test focused on LocalAgents' own logic — stub heavy children.
vi.mock('@/renderer/components/base/AionModal', () => ({ default: () => null }));
vi.mock('@renderer/pages/settings/AgentSettings/InlineAgentEditor', () => ({ default: () => null }));
vi.mock('@renderer/pages/settings/AgentSettings/AgentHubModal', () => ({ AgentHubModal: () => null }));

import LocalAgents from '@renderer/pages/settings/AgentSettings/LocalAgents';

const makeAgents = () => [
  { id: 'aionrs', name: 'Aion CLI', agent_type: 'aionrs', agent_source: 'internal', backend: 'aionrs' },
  { id: 'acp-claude', name: 'Claude Code', agent_type: 'acp', agent_source: 'builtin', backend: 'claude' },
  { id: 'custom-1', name: 'My Agent', agent_type: 'acp', agent_source: 'custom', command: 'sh', enabled: true },
];

describe('LocalAgents', () => {
  beforeEach(() => {
    setAgentEnabled.mockReset();
    setAgentEnabled.mockResolvedValue(undefined);
    navigate.mockReset();
  });

  it('reads the managed-agents view and renders detected + custom sections', () => {
    useManagedAgents.mockReturnValue({ agents: makeAgents(), revalidate: vi.fn() });

    render(<LocalAgents />);

    // Proves L30 (useManagedAgents) ran and fed the derived lists.
    expect(useManagedAgents).toHaveBeenCalled();
    expect(screen.getByText('Aion CLI')).toBeTruthy();
    expect(screen.getByText('Claude Code')).toBeTruthy();
    expect(screen.getByText('My Agent')).toBeTruthy();
  });

  it('shows the empty state when no detected agents are present', () => {
    useManagedAgents.mockReturnValue({ agents: [], revalidate: vi.fn() });

    render(<LocalAgents />);

    expect(screen.getByText('settings.agentManagement.localAgentsEmpty')).toBeTruthy();
  });

  it('toggles a detected ACP agent off and revalidates the view', async () => {
    const revalidate = vi.fn().mockResolvedValue(undefined);
    // aionrs (no switch) + one detected ACP agent (gets the switch).
    useManagedAgents.mockReturnValue({
      agents: [
        { id: 'aionrs', name: 'Aion CLI', agent_type: 'aionrs', agent_source: 'internal', backend: 'aionrs' },
        { id: 'acp-claude', name: 'Claude Code', agent_type: 'acp', agent_source: 'builtin', backend: 'claude' },
      ],
      revalidate,
    });

    const { container } = render(<LocalAgents />);

    // Only the detected ACP card carries a switch; Aion CLI has none.
    const switches = container.querySelectorAll('[role="switch"]');
    expect(switches.length).toBe(1);

    fireEvent.click(switches[0]);

    await waitFor(() => expect(setAgentEnabled).toHaveBeenCalledWith({ id: 'acp-claude', enabled: false }));
    await waitFor(() => expect(revalidate).toHaveBeenCalled());
  });

  it('toggles a custom agent off through the shared handler', async () => {
    const revalidate = vi.fn().mockResolvedValue(undefined);
    useManagedAgents.mockReturnValue({
      agents: [
        { id: 'custom-1', name: 'My Agent', agent_type: 'acp', agent_source: 'custom', command: 'sh', enabled: true },
      ],
      revalidate,
    });

    const { container } = render(<LocalAgents />);

    const toggle = container.querySelector('[role="switch"]') as HTMLElement;
    fireEvent.click(toggle);

    await waitFor(() => expect(setAgentEnabled).toHaveBeenCalledWith({ id: 'custom-1', enabled: false }));
  });

  it('swallows a failed toggle without crashing', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    setAgentEnabled.mockRejectedValueOnce(new Error('backend down'));
    useManagedAgents.mockReturnValue({
      agents: [
        { id: 'acp-claude', name: 'Claude Code', agent_type: 'acp', agent_source: 'builtin', backend: 'claude' },
      ],
      revalidate: vi.fn(),
    });

    const { container } = render(<LocalAgents />);
    fireEvent.click(container.querySelector('[role="switch"]') as HTMLElement);

    await waitFor(() => expect(errorSpy).toHaveBeenCalledWith('toggle agent failed:', expect.any(Error)));
    errorSpy.mockRestore();
  });
});
