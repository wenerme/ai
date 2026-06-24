# ArgoCD CLI Configuration

Config file: `~/.config/argocd/config`

This YAML file persists server connections, auth tokens, and per-server flags so you don't need to pass them on every command.

## Config Structure

```yaml
# Active context — the server commands target by default
current-context: argocd.example.com

# Context list — maps names to servers
contexts:
  - name: argocd.example.com
    server: argocd.example.com
    user: argocd.example.com

# Per-server settings
servers:
  - server: argocd.example.com
    grpc-web: true            # Persist --grpc-web so you never need the flag
    grpc-web-root-path: ""    # Set if behind a subpath proxy
  - server: argocd.other.com
    grpc-web: true

# Auth tokens (managed by `argocd login`)
users:
  - name: argocd.example.com
    auth-token: "<JWT>"
    refresh-token: "<token>"
```

## Key Fields

| Field | Description |
|-------|-------------|
| `current-context` | Default server for all commands. Changed by `argocd context <name>` |
| `contexts[].server` | ArgoCD server address |
| `servers[].grpc-web` | Set `true` to always use gRPC-web (no need for `--grpc-web` flag) |
| `servers[].grpc-web-root-path` | Subpath if ArgoCD is behind a reverse proxy |
| `users[].auth-token` | JWT token, auto-managed by `argocd login` |
| `users[].refresh-token` | Used to auto-refresh expired tokens via `argocd relogin` |

## Common Setup

### Initial login (creates config entries automatically)

```bash
# SSO login (opens browser)
argocd login argocd.example.com --grpc-web --sso

# After login, grpc-web is persisted in config — future commands don't need the flag
argocd app list  # Just works
```

### Adding multiple servers

```bash
argocd login argocd.server-a.com --grpc-web --sso
argocd login argocd.server-b.com --grpc-web --sso

# Switch between them
argocd context argocd.server-a.com
argocd app list  # Shows server-a apps
argocd context argocd.server-b.com
argocd app list  # Shows server-b apps
```

### Token expiry

When you get auth errors on a previously working server:

```bash
# Try relogin first (uses refresh token)
argocd relogin

# If that fails, full login again
argocd login <SERVER_ADDRESS> --grpc-web --sso
```

## Disable Interactive Prompts

For scripting / agent use, set in config:

```yaml
prompts-enabled: false
```

Or pass `--assumeYes` on destructive commands.
