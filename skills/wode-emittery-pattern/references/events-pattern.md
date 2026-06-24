# Emittery Events Pattern — Full Reference

Type-safe event-driven architecture using `emittery` for inter-component decoupling and side-effect handling.

## Core Concepts

- **Sidecar Pattern**: Event handlers as companion components, separated from main UI
- **Type Safety**: TypeScript-defined event types and data structures
- **Decoupling**: Store only emits events, handlers are external and replaceable

## Complete Event Type Definition

```typescript
// NEVER use enum — MUST use as const
export const FileSystemEventType = {
  Open: 'FileSystem:Open',
  Goto: 'FileSystem:Goto',
  Refresh: 'FileSystem:Refresh',
  Download: 'FileSystem:Download',
  Delete: 'FileSystem:Delete',
  Rename: 'FileSystem:Rename',
  Upload: 'FileSystem:Upload',
  Mkdir: 'FileSystem:Mkdir',
  Move: 'FileSystem:Move',
} as const;

type FileSystemEventData = {
  [FileSystemEventType.Open]: { fs: IFileSystem; file: IFileStat; event?: any };
  [FileSystemEventType.Goto]: { path: string };
  [FileSystemEventType.Refresh]: {};
  [FileSystemEventType.Download]: { fs: IFileSystem; files: IFileStat[] };
  [FileSystemEventType.Delete]: { fs: IFileSystem; files: IFileStat[] | string[] };
  [FileSystemEventType.Rename]: { fs: IFileSystem; file: IFileStat | string; name?: string };
  [FileSystemEventType.Upload]: { fs: IFileSystem; directory: string; files?: File[] };
  [FileSystemEventType.Mkdir]: { fs: IFileSystem; directory: string; name?: string };
  [FileSystemEventType.Move]: { fs: IFileSystem; files: IFileStat[]; directory: string };
};

export type FileSystemEmitter = Emittery<FileSystemEventData>;
```

## Emitter Factory

```typescript
import Emittery from 'emittery';

export function createEmitter<EventData = Record<string, any>>(name: string) {
  return new Emittery<EventData>({
    debug: { name },
  });
}
```

## Store Integration

```typescript
export function createFileManagerStore(options = {}) {
  return createStore(
    mutative<FileManagerStoreState>((setState, getState) => {
      const events: FileSystemEmitter = createEmitter('FileSystemEmitter');

      return {
        events,
        // ...other state

        actions: {
          open: async (item) => {
            return events.emit(FileSystemEventType.Open, { fs: getState().fs, file: item });
          },
          refresh: () => events.emit(FileSystemEventType.Refresh, {}),
          download: async ({ files }) => {
            return events.emit(FileSystemEventType.Download, { fs: getState().fs, files });
          },
        },
      };
    }),
  );
}
```

## useEmitteryListen Hook

```typescript
import { useEffect, useRef } from 'react';
import type Emittery from 'emittery';

export function useEmitteryListen<E>(
  e: Emittery<E>,
  handle: { [K in keyof E]?: (data: E[K]) => void },
) {
  const ref = useRef<any>(handle);
  ref.current = handle;

  useEffect(() => {
    const unsub = Object.keys(ref.current).map((event) => {
      return e.on(event as any, (data) => ref.current[event]?.(data));
    });
    return () => unsub.forEach((fn) => fn());
  }, [e, ...Object.keys(handle).sort()]);
}
```

## Complete Sidecar Example

```tsx
export const FileManagerSidecar = () => {
  const store = useFileManagerStore();
  const { path, fs, events, actions } = useStore(
    store,
    useShallow(({ path, fs, events, actions }) => ({ path, fs, events, actions })),
  );

  // Load data on path change
  useAsyncEffect(async () => {
    await load(path);
  }, [fs, path]);

  useEmitteryListen(events, {
    [FileSystemEventType.Refresh]: async () => {
      await load(store.getState().path);
    },

    [FileSystemEventType.Open]: async ({ fs, file }) => {
      await doOpenFile({ fs, file });
    },

    [FileSystemEventType.Download]: async ({ fs, files }) => {
      await doDownload({ fs, files });
    },

    [FileSystemEventType.Delete]: async ({ fs, files }) => {
      if (!files.length) return;
      const ok = await showConfirm({
        title: '删除确认',
        content: <div>确认删除 {files.length} 项？</div>,
      });
      if (!ok) return;
      await showPromiseToast(async () => {
        for (const file of files) {
          const path = typeof file === 'string' ? file : file.path;
          await fs.rm(path, { force: true, recursive: true });
        }
      }, { action: '删除文件' });
      actions.refresh();
    },

    [FileSystemEventType.Upload]: async ({ fs, files, directory }) => {
      if (!files?.length) return;
      const ok = await showConfirm({
        title: '上传确认',
        content: <div>确认上传 {files.length} 文件到 {directory}？</div>,
      });
      if (!ok) return;
      await showPromiseToast(async () => {
        for (const file of files) {
          await fs.writeFile(pathe.join(directory, file.name), await file.arrayBuffer());
        }
      });
      actions.refresh();
    },

    [FileSystemEventType.Mkdir]: async ({ directory, fs, name = '新建文件夹' }) => {
      const newName = await showPrompt({ title: '新建目录', defaultValue: name });
      if (!newName) return;
      await fs.mkdir(pathe.join(directory, newName));
      actions.refresh();
    },

    [FileSystemEventType.Rename]: async ({ fs, file, name }) => {
      const res = await doRenameFile({ fs, file, name });
      if (res) actions.refresh();
    },

    [FileSystemEventType.Move]: async ({ fs, files, directory }) => {
      const res = await doMoveFile({ fs, files, directory });
      if (res) actions.refresh();
    },
  });

  return null;
};
```

## Provider Usage

```tsx
function FileManagerProvider({ children }) {
  return (
    <FileManagerStoreProvider>
      <FileManagerSidecar />
      {children}
    </FileManagerStoreProvider>
  );
}
```

## Best Practices

### Event Data
- Pass necessary context (`fs`, `file`), keep minimal
- Use `?` for optional fields

### Error Handling

```typescript
events.on(FileSystemEventType.Upload, async ({ files }) => {
  try {
    await uploadFiles(files);
    toast.success('上传成功');
  } catch (e) {
    toast.error('上传失败');
    events.emit(FileSystemEventType.Error, { error: e });
  }
});
```

### Integration with Zustand
Events Pattern pairs with Zustand Store: Store manages state, Events handle side-effects. This separation enables easy testing and handler replacement.
