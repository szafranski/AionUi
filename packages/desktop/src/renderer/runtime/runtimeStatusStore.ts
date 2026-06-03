import { ipcBridge } from '@/common';
import { useSyncExternalStore } from 'react';

import type { IRuntimeStatusEvent, IRuntimeStatusScope, RuntimeStatusPhase } from '@/common/adapter/ipcBridge';

type RuntimeSnapshot = IRuntimeStatusEvent | null;

const listeners = new Set<() => void>();
const snapshots = new Map<string, IRuntimeStatusEvent>();
let initialized = false;

function scopeKey(scope: IRuntimeStatusScope): string {
  return `${scope.kind}:${scope.id}`;
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function ensureInitialized() {
  if (initialized) {
    return;
  }
  initialized = true;
  ipcBridge.runtime.statusChanged.on((event) => {
    snapshots.set(scopeKey(event.scope), event);
    emitChange();
  });
}

export function getRuntimeStatus(scope?: IRuntimeStatusScope): RuntimeSnapshot {
  if (!scope) {
    return null;
  }
  ensureInitialized();
  return snapshots.get(scopeKey(scope)) ?? null;
}

export function clearRuntimeStatus(scope: IRuntimeStatusScope) {
  ensureInitialized();
  if (snapshots.delete(scopeKey(scope))) {
    emitChange();
  }
}

export function useRuntimeStatus(scope?: IRuntimeStatusScope): RuntimeSnapshot {
  return useSyncExternalStore(
    (listener) => {
      ensureInitialized();
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    (): RuntimeSnapshot => getRuntimeStatus(scope),
    (): RuntimeSnapshot => null
  );
}

export function isRuntimeActivePhase(phase: RuntimeStatusPhase): boolean {
  return phase === 'waiting_for_lock' || phase === 'downloading' || phase === 'extracting' || phase === 'validating';
}
