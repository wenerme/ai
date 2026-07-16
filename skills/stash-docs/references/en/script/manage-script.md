# Manage Scripts

Similar to remote proxy providers and rule providers, you need `script-providers`
to manage scripts. After declaring a script, you can use it in rewrites, panels,
and scheduled tasks.

The simplest example:

```yaml
script-providers:
  your-fancy-script:
    url: https://your-fancy-script.com/your-fancy-script.js
    interval: 86400
```

If a remote script requires authentication, or if the server expects specific
request headers such as `Accept` or `User-Agent`, configure `headers` on the
script provider. Stash sends these headers when updating the remote script.

```yaml
script-providers:
  your-fancy-script:
    url: https://example.com/your-fancy-script.js
    interval: 86400
    headers:
      Authorization: Bearer your-token
      Accept: application/javascript
      User-Agent: Stash
```

Values under `headers` can be either a single string or an array of strings for
multi-value request headers:

```yaml
script-providers:
  your-fancy-script:
    url: https://example.com/your-fancy-script.js
    interval: 86400
    headers:
      Accept:
        - application/javascript
        - text/plain
```

If the URL already contains a username and password, such as
`https://user:password@example.com/your-fancy-script.js`, Stash uses the URL
credentials to generate Basic Auth. In that case, it overrides `Authorization`
configured in `headers`.

Stash periodically downloads the script from the specified URL (based on
`interval`) and caches it on disk. During downloads, Stash honors `Etag` and
`Last-Modified` headers to avoid unnecessary updates.

---

> [!NOTE]
> Available only in Stash 3.2.5 and later.

For temporary debugging and testing, you can use the `payload` field to embed a
script directly in the configuration file. For example:

```yaml
script-providers:
  your-fancy-script:
    interval: 86400
    payload: |
      console.log("This is a test script");
      $done();
```

When both `url` and `payload` are present, Stash writes the `payload` content to
the local cache at startup and then attempts to download the script from `url`
to overwrite the cache during subsequent updates.

> [!WARNING]
> Using `payload` for complex scripts is not recommended because it
> significantly slows down config parsing.

To make local cache management easier, you can use the `path` field to specify
the cache location. For example:

```yaml
script-providers:
  your-fancy-script:
    url: https://your-fancy-script.com/your-fancy-script.js
    path: ./fancy/script.js
    interval: 86400
    payload: |
      console.log("This is a test script");
      $done();
```

On startup, Stash checks whether `./fancy/script.js` exists. If it does, Stash
uses that file as the script; otherwise it writes the `payload` content. During
subsequent updates, Stash downloads the script from `url` to overwrite the local
cache.

> [!WARNING]
> To avoid path traversal, Stash limits `path` to the directory containing the
> configuration file and its subdirectories.

---

You can declare a `script-providers` entry with only `path` and no `url` to
disable scheduled updates. For example:

```yaml
script-providers:
  local-debug-script:
    path: ./fancy/script.js
```

With iCloud enabled, you can edit the script on Mac and let iCloud sync it to
iPhone. Once synced, the script takes effect immediately, which is very
efficient for local debugging.
