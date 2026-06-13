/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 *
 * Unit tests for the 'custom' variant of AgentCard — specifically the
 * disabled-agent treatment introduced so that toggling a custom agent off
 * keeps its card visible (greyed) in settings instead of removing it.
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// Project convention: t() echoes the key so labels are assertable.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: 'en' } }),
}));

import AgentCard from '@renderer/pages/settings/AgentSettings/AgentCard';

const baseAgent = {
  id: 'agent-1',
  name: 'Hermes',
  command: '/usr/local/bin/hermes-acp',
  args: ['--remote'],
};

const renderCustom = (enabled: boolean, handlers: Partial<{ onToggle: (v: boolean) => void }> = {}) =>
  render(
    <AgentCard
      type='custom'
      agent={{ ...baseAgent, enabled }}
      onGoToChat={vi.fn()}
      onEdit={vi.fn()}
      onDelete={vi.fn()}
      onToggle={handlers.onToggle ?? vi.fn()}
    />
  );

describe('AgentCard (custom variant)', () => {
  it('greys the identity block and disables Go-to-chat when the agent is disabled', () => {
    const { container } = renderCustom(false);

    // Disabled => identity block carries the opacity treatment.
    expect(container.querySelector('.opacity-50')).toBeTruthy();
    // Start-chat is blocked while disabled.
    const goToChat = screen.getByText('settings.agentManagement.goToChat').closest('button') as HTMLButtonElement;
    expect(goToChat.disabled).toBe(true);
  });

  it('renders at full opacity with Go-to-chat enabled when the agent is enabled', () => {
    const { container } = renderCustom(true);

    expect(container.querySelector('.opacity-50')).toBeNull();
    const goToChat = screen.getByText('settings.agentManagement.goToChat').closest('button') as HTMLButtonElement;
    expect(goToChat.disabled).toBe(false);
  });

  it('fires onToggle when the switch is clicked', () => {
    const onToggle = vi.fn();
    const { container } = renderCustom(false, { onToggle });

    const toggle = container.querySelector('[role="switch"]') as HTMLElement;
    expect(toggle).toBeTruthy();
    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenCalled();
  });
});

const renderDetected = (opts: { enabled?: boolean; withToggle?: boolean; onToggle?: (v: boolean) => void } = {}) => {
  const { enabled, withToggle = true, onToggle } = opts;
  return render(
    <AgentCard
      type='detected'
      agent={{ agent_type: 'acp', backend: 'claude', name: 'Claude', enabled }}
      onGoToChat={vi.fn()}
      {...(withToggle ? { onToggle: onToggle ?? vi.fn() } : {})}
    />
  );
};

describe('AgentCard (detected variant)', () => {
  it('renders a checked switch when onToggle is provided and the agent is enabled', () => {
    const { container } = renderDetected({ enabled: true });

    const toggle = container.querySelector('[role="switch"]') as HTMLElement | null;
    expect(toggle).toBeTruthy();
    // Arco marks a checked switch with aria-checked="true".
    expect(toggle?.getAttribute('aria-checked')).toBe('true');
  });

  it('treats a missing enabled flag as enabled (checked switch)', () => {
    const { container } = renderDetected({});

    const toggle = container.querySelector('[role="switch"]') as HTMLElement | null;
    expect(toggle?.getAttribute('aria-checked')).toBe('true');
  });

  it('fires onToggle when the switch is clicked', () => {
    const onToggle = vi.fn();
    const { container } = renderDetected({ enabled: true, onToggle });

    const toggle = container.querySelector('[role="switch"]') as HTMLElement;
    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenCalled();
  });

  it('greys the card content and disables Go-to-chat when disabled', () => {
    const { container } = renderDetected({ enabled: false });

    expect(container.querySelector('.opacity-50')).toBeTruthy();
    const goToChat = screen.getByText('settings.agentManagement.goToChat').closest('button') as HTMLButtonElement;
    expect(goToChat.disabled).toBe(true);
  });

  it('renders no switch when onToggle is absent (Aion CLI case)', () => {
    const { container } = renderDetected({ enabled: true, withToggle: false });

    expect(container.querySelector('[role="switch"]')).toBeNull();
    // The card is still usable: Go-to-chat is enabled.
    const goToChat = screen.getByText('settings.agentManagement.goToChat').closest('button') as HTMLButtonElement;
    expect(goToChat.disabled).toBe(false);
  });

  it('falls back to the robot glyph when the agent resolves no logo', () => {
    // An unknown backend with no icon yields a null logo → the 🤖 fallback renders.
    const { container } = render(
      <AgentCard
        type='detected'
        agent={{ agent_type: 'acp', backend: 'no-logo-vendor', name: 'Nameless' }}
        onGoToChat={vi.fn()}
        onToggle={vi.fn()}
      />
    );

    expect(container.querySelector('img')).toBeNull();
    expect(container.textContent).toContain('🤖');
  });
});
