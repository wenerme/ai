# apk — Alpine Package Keeper

Command reference for apk package manager.

- [apk-tools source](https://gitlab.alpinelinux.org/alpine/apk-tools)
- [Wiki: Package Management](https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management)

## Commands

### Package Management

| Command | Description |
|---------|-------------|
| `apk add` | Install packages (adds to world) |
| `apk del` | Remove packages (removes from world) |
| `apk fix` | Reinstall/upgrade without modifying world |
| `apk update` | Update repository index |
| `apk upgrade` | Upgrade installed packages |
| `apk cache` | Cache management |

### Query

| Command | Description |
|---------|-------------|
| `apk info` | Package information |
| `apk list` | List packages |
| `apk search` | Search packages |
| `apk dot` | Dependency graph (graphviz) |
| `apk policy` | Show repository policy for package |

### Repository Management

| Command | Description |
|---------|-------------|
| `apk index` | Create APKINDEX from .apk files |
| `apk fetch` | Download package to local directory |
| `apk manifest` | Show content checksums |
| `apk verify` | Verify package signature |

### Other

| Command | Description |
|---------|-------------|
| `apk audit` | Audit system for changes |
| `apk stats` | Show statistics |
| `apk version` | Compare versions |

## Global Flags

| Flag | Description |
|------|-------------|
| `-p, --root ROOTFS` | Root filesystem (default: /) |
| `-X, --repository REPO` | Use specific repository |
| `--allow-untrusted` | Allow unsigned packages |
| `--arch ARCH` | Specify architecture |
| `--cache-dir CACHEDIR` | Cache directory (default: /etc/apk/cache) |
| `-U, --update-cache` | Force cache update (--cache-max-age 1) |
| `--keys-dir KEYSDIR` | Key directory (default: /etc/apk/keys/) |
| `--no-cache` | Don't use cache |
| `--no-network` | Don't use network |
| `--print-arch` | Print system architecture |
| `--purge` | Delete config files on removal |
| `--repositories-file` | Custom repositories file |

## apk add Flags

| Flag | Description |
|------|-------------|
| `--initdb` | Initialize package database |
| `-l, --latest` | Prefer latest version |
| `-u, --upgrade` | Upgrade if already installed |
| `-t, --virtual NAME` | Create virtual package for easy cleanup |
| `--no-chown` | Don't change file ownership |
| `-s, --simulate` | Dry run |
| `--no-scripts` | Skip install scripts |

## apk info Flags

| Flag | Description |
|------|-------------|
| `-a, --all` | All information |
| `-d, --description` | Description |
| `-e, --installed` | Check if installed |
| `-L, --contents` | List files |
| `-P, --provides` | Provided packages |
| `-r, --rdepends` | Reverse dependencies |
| `-R, --depends` | Dependencies |
| `-s, --size` | Installed size |
| `-w, --webpage` | Homepage URL |
| `-W, --who-owns` | Find which package owns a file |
| `--license` | Show license |

## Common Patterns

```sh
# Find package owning a file
apk info -W /usr/bin/curl

# Find reverse dependencies (who depends on this)
apk info -r so:libgnutls.so.30

# Search by command name
apk search cmd:blkid

# List packages with available upgrades
apk version -l '<'

# Show packages with held versions
apk version -l '!'

# Get current version of a package
apk policy musl | sed '2!d' | sed 's/[^0-9a-z.-]//g'

# Install build dependencies temporarily
apk add --virtual .build-deps gcc musl-dev
# ... build ...
apk del .build-deps

# Audit system for modified files
apk audit --system

# Fix packages with modified files
apk audit --packages -q | xargs apk fix

# Inspect package contents without installing
tar -tvf package.apk
```

## Configuration Files

| Path | Purpose |
|------|---------|
| `/etc/apk/repositories` | Repository URLs (one per line) |
| `/etc/apk/world` | Explicitly installed packages |
| `/etc/apk/keys/` | Trusted signing keys |
| `/etc/apk/arch` | System architecture |
| `/etc/apk/cache` | Symlink to cache dir |

### Repository URL Format

```
https://dl-cdn.alpinelinux.org/alpine/v3.21/main
https://dl-cdn.alpinelinux.org/alpine/v3.21/community
https://dl-cdn.alpinelinux.org/alpine/edge/testing
```

Structure: `$repository/$arch/APKINDEX.tar.gz` and `$repository/$arch/$pkgname-$pkgver-r$pkgrel.apk`

## Cache Setup

```sh
# Enable persistent cache
mkdir -p /var/cache/apk
ln -s /var/cache/apk /etc/apk/cache

# Cache commands
apk cache clean              # Remove packages not in index
apk cache download           # Download world packages to cache
apk cache sync               # Clean + download
```
