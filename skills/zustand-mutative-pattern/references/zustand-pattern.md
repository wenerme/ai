# Zustand Context-Mutative Pattern — Full Reference

## Core Concepts

Per-Provider store instances (not global singletons), suitable for:
- Reusable components (multiple instances of the same component)
- SSR safety (no state leaks between requests)
- Testing (easily mount isolated stores)

## Project Dependencies

- `zustand` + `zustand-mutative` — Store creation with mutable update syntax
- `@wener/reaction/zustand` — `createBoundedUseStore` helper
- `@wener/reaction` — `createReactContext` helper
- `emittery` — Typed event emitter for side-effect decoupling

## Complete Example: FileManager

### 1. State Type Definition

```typescript
import type { ReactNode } from 'react';
import type Emittery from 'emittery';
import { mutative } from 'zustand-mutative';
import { createStore } from 'zustand/vanilla';

export type FileManagerStoreState = {
  // Data state
  fs: IFileSystem;
  loading: boolean;
  error?: any;
  items: IFileStat[];
  selected: string[];
  path: string;

  // History
  history: string[];
  historyIndex: number;

  // UI state — grouped
  explorer: { mode: string };
  sidebar: { open: boolean };
  contextMenu: {
    open: boolean;
    x?: number;
    y?: number;
    items?: IFileStat[];
  };

  // Actions namespace
  actions: {
    goto: (path: string) => Promise<void>;
    open: (item: IFileStat | string) => Promise<void>;
    backward: () => void;
    forward: () => void;
    refresh: () => void;
    download: (props: { files: IFileStat[] }) => Promise<void>;
    rm: (props: { files: IFileStat[] | string[] }) => Promise<void>;
    select: (props: { file: IFileStat; event?: any }) => void;
    clearSelected: () => void;
  };

  // Event emitter
  events: FileSystemEmitter;
};

type CreateFileManagerStoreOptions = Partial<Omit<FileManagerStoreState, 'actions'>> & {
  actions?: Partial<FileManagerStoreState['actions']>;
};
```

### 2. Event Definitions

```typescript
export const FileSystemEvents = {
  Open: 'FileSystem:Open',
  Goto: 'FileSystem:Goto',
  Refresh: 'FileSystem:Refresh',
  Download: 'FileSystem:Download',
  Delete: 'FileSystem:Delete',
} as const;

type FileSystemEventData = {
  [FileSystemEvents.Open]: { fs: IFileSystem; file: IFileStat };
  [FileSystemEvents.Goto]: { path: string };
  // ...
};

export type FileSystemEmitter = Emittery<FileSystemEventData>;
```

### 3. Store Factory

```typescript
import { createEmitter } from '@/events/createEmitter';
import { omitBy } from 'es-toolkit';

export type FileManagerStore = ReturnType<typeof createFileManagerStore>;

export function createFileManagerStore(partial: CreateFileManagerStoreOptions = {}) {
  return createStore(
    mutative<FileManagerStoreState>((setState, getState) => {
      const events: FileSystemEmitter = createEmitter('FileSystemEmitter');

      return {
        loading: false,
        events,
        history: [],
        historyIndex: -1,
        path: '/',
        selected: [],
        items: [],
        explorer: { mode: 'grid' },
        sidebar: { open: false },
        contextMenu: { open: false },
        ...omitBy(partial, (v) => v === undefined || v === null),
        fs: partial.fs || createMemoryFileSystem(),

        actions: {
          backward: () => {
            setState((s) => {
              if (s.historyIndex > 0) {
                s.historyIndex--;
                s.path = s.history[s.historyIndex];
              }
            });
            events.emit(FileSystemEvents.Backward, {});
          },

          goto: async (path) => {
            const { path: lastPath } = getState();
            if (lastPath === path || !path) return;
            setState((s) => {
              s.history = s.history.slice(0, s.historyIndex + 1);
              s.history.push(path);
              s.historyIndex = s.history.length - 1;
              s.path = path;
            });
            return events.emit(FileSystemEvents.Goto, { path });
          },

          open: async (item) => {
            const { fs, actions } = getState();
            if (typeof item === 'string') {
              item = await fs.stat(item);
            }
            if (item.kind === 'directory') {
              return actions.goto(item.path);
            }
            return events.emit(FileSystemEvents.Open, { fs, file: item });
          },

          refresh: () => events.emit(FileSystemEvents.Refresh, {}),

          download: async ({ files }) => {
            const { fs } = getState();
            return events.emit(FileSystemEvents.Download, { fs, files });
          },

          rm: ({ files }) => {
            const { fs } = getState();
            return events.emit(FileSystemEvents.Delete, { fs, files });
          },

          select: ({ file, event }) => {
            setState((s) => {
              const path = file.path;
              if (event?.metaKey) {
                const index = s.selected.indexOf(path);
                if (index >= 0) {
                  s.selected.splice(index, 1);
                } else {
                  s.selected.push(path);
                }
              } else {
                s.selected = [path];
              }
            });
          },

          clearSelected: () => setState((s) => { s.selected = []; }),
          ...partial.actions,
        },
      };
    }),
  );
}
```

### 4. Context & Provider

```typescript
import { type ReactNode, use, useState } from 'react';
import { createReactContext } from '@wener/reaction';
import { maybeFunction, type MaybeFunction } from '@wener/utils';

const FileManagerContext = createReactContext<FileManagerStore | undefined>(
  'FileManagerContext',
  undefined
);

export const FileManagerProvider = ({
  children,
  store,
  initialState,
}: {
  children: ReactNode;
  store?: FileManagerStore;
  initialState?: MaybeFunction<CreateFileManagerStoreOptions>;
}) => {
  const parentStore = use(FileManagerContext);
  const [value] = useState(() => {
    if (store) return store;
    const initial = maybeFunction(initialState);
    const parent = parentStore?.getState();
    return createFileManagerStore({
      ...initial,
      fs: initial?.fs || parent?.fs,
    });
  });
  return <FileManagerContext value={value}>{children}</FileManagerContext>;
};
```

### 5. Hooks

```typescript
import { createBoundedUseStore } from '@wener/reaction/zustand';

export function useFileManagerStoreContext(): FileManagerStore {
  const store = use(FileManagerContext);
  if (!store) {
    throw new Error('FileManagerStore not found, wrap with FileManagerProvider');
  }
  return store;
}

export const useFileManagerStore = createBoundedUseStore(useFileManagerStoreContext);

export function useFileManagerActions() {
  return useFileManagerStore((s) => s.actions);
}
```

### 6. Performance: State Selection

```typescript
import { useShallow } from 'zustand/react/shallow';

// MUST use useShallow when selecting multiple properties as object
const { path, items, loading } = useFileManagerStore(
  useShallow((s) => ({
    path: s.path,
    items: s.items,
    loading: s.loading,
  }))
);

// Also works with pick
const { path, items } = useFileManagerStore(
  useShallow((s) => pick(s, ['path', 'items']))
);
```

## Usage Example

```tsx
function FileManagerApp() {
  return (
    <FileManagerProvider
      initialState={{
        fs: createS3FileSystem({ bucket: 'my-bucket' }),
        path: '/documents',
      }}
    >
      <FileManagerEventHandler /> {/* Sidecar for side-effects */}
      <FileManagerToolbar />
      <FileExplorer />
      <FileManagerSidebar />
    </FileManagerProvider>
  );
}
```

## Best Practices

### Store Inheritance

Provider can inherit from parent or accept external store:

```typescript
const parent = use(FileManagerContext);
const fs = initial?.fs || parent?.getState().fs;
```

### Actions Override

Override default actions at creation time:

```typescript
createFileManagerStore({
  actions: {
    open: customOpenHandler,
  },
});
```
