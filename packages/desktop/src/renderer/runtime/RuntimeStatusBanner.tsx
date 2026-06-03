import { Button } from '@arco-design/web-react';
import { CloseSmall, LoadingOne, Refresh } from '@icon-park/react';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { IRuntimeStatusEvent } from '@/common/adapter/ipcBridge';
import { isRuntimeActivePhase } from './runtimeStatusStore';
import { formatRuntimeStatusText } from './runtimeStatusText';

interface RuntimeStatusBannerProps {
  status: IRuntimeStatusEvent;
  className?: string;
  onRetry?: () => void;
}

const RuntimeStatusBanner: React.FC<RuntimeStatusBannerProps> = ({ status, className, onRetry }) => {
  const { t } = useTranslation();
  const active = isRuntimeActivePhase(status.phase);
  const text = formatRuntimeStatusText(t, status);

  return (
    <div
      className={classNames(
        'flex items-center justify-between gap-12px px-16px py-10px border-b',
        active ? 'bg-primary-1 border-primary-3 text-primary-7' : 'bg-danger-1 border-danger-3 text-danger-7',
        className
      )}
    >
      <div className='flex min-w-0 items-center gap-8px text-13px leading-20px'>
        {active ? <LoadingOne className='shrink-0 animate-spin' /> : <CloseSmall className='shrink-0' />}
        <span className='min-w-0 break-all'>{text}</span>
      </div>
      {!active && onRetry ? (
        <Button size='mini' type='text' icon={<Refresh size={14} />} onClick={onRetry}>
          {t('settings.retry', { defaultValue: 'Retry' })}
        </Button>
      ) : null}
    </div>
  );
};

export default RuntimeStatusBanner;
