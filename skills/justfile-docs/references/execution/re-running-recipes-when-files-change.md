### Re-running recipes when files change

[`watchexec`](https://github.com/mattgreen/watchexec) can re-run any command
when files change.

To re-run the recipe `foo` when any file changes:

```console
watchexec just foo
```

See `watchexec --help` for more info, including how to specify which files
should be watched for changes.
