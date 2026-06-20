/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AcpConfigSetStatus, AcpDerivedOption } from '@/renderer/hooks/agent/useAcpConfigOptions';
import { modelSummaryFromDescription, splitModelLabel } from '@/renderer/utils/model/agentLogo';
import { Menu, Tooltip } from '@arco-design/web-react';
import React from 'react';

export const getCurrentThoughtLevelLabel = (thoughtLevel: AcpDerivedOption | null | undefined): string => {
  if (!thoughtLevel) return '';
  return (
    thoughtLevel.options.find((item) => item.value === thoughtLevel.currentValue)?.label ||
    thoughtLevel.currentValue ||
    ''
  );
};

export const composeRuntimeSelectorLabel = ({
  modelLabel,
  thoughtLevel,
}: {
  modelLabel: string;
  thoughtLevel?: AcpDerivedOption | null;
}): string => {
  const thoughtLevelLabel = getCurrentThoughtLevelLabel(thoughtLevel);
  if (!thoughtLevelLabel) return modelLabel;
  return `${modelLabel} · ${thoughtLevelLabel}`;
};

export const isConfigSetting = (setStatus?: AcpConfigSetStatus): boolean => setStatus?.state === 'setting';

export const RuntimeSelectorMenuDivider: React.FC = () => (
  <div role='separator' data-testid='runtime-selector-menu-divider' className='h-1px my-4px bg-[var(--color-fill-3)]' />
);

export const RuntimeSelectorCheckedItem: React.FC<{
  selected: boolean;
  children: React.ReactNode;
}> = ({ selected, children }) => (
  <div className='flex items-center gap-8px w-full'>
    <span aria-hidden='true' className='w-16px shrink-0 text-primary'>
      {selected ? '\u2713' : ''}
    </span>
    <span className='min-w-0 truncate'>{children}</span>
  </div>
);

/** Render ACP model names with qualifiers and description summaries separated. */
export const RuntimeSelectorModelLabel: React.FC<{ label: string; description?: string | null }> = ({
  label,
  description,
}) => {
  const { base, qualifier } = splitModelLabel(label);
  const summary = modelSummaryFromDescription(description);
  const content = (
    <span className='flex flex-col min-w-0'>
      <span className='inline-flex items-baseline gap-6px min-w-0'>
        <span className='truncate'>{base}</span>
        {qualifier && <span className='shrink-0 text-12px text-t-secondary'>{qualifier}</span>}
      </span>
      {summary && <span className='truncate text-12px text-t-secondary'>{summary}</span>}
    </span>
  );
  if (!description) return content;
  return (
    <Tooltip mini position='right' content={description}>
      {content}
    </Tooltip>
  );
};

export const renderThoughtLevelMenuGroup = ({
  thoughtLevel,
  setStatus,
  title,
  onSelect,
}: {
  thoughtLevel: AcpDerivedOption | null | undefined;
  setStatus?: AcpConfigSetStatus;
  title: string;
  onSelect: (value: string) => void;
}): React.ReactNode => {
  if (!thoughtLevel) return null;
  const setting = isConfigSetting(setStatus);
  return (
    <Menu.ItemGroup title={title}>
      {thoughtLevel.options.map((item) => (
        <Menu.Item
          key={item.value}
          className={item.value === thoughtLevel.currentValue ? 'bg-2!' : ''}
          onClick={() => {
            if (!setting) onSelect(item.value);
          }}
        >
          <RuntimeSelectorCheckedItem selected={item.value === thoughtLevel.currentValue}>
            {item.label}
          </RuntimeSelectorCheckedItem>
        </Menu.Item>
      ))}
    </Menu.ItemGroup>
  );
};
