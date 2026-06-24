# APK Package Internals

Low-level details of Alpine package format, APKINDEX structure, and signing.

- [Wiki: APK spec](https://wiki.alpinelinux.org/wiki/Apk_spec)
- [Wiki: APKINDEX format](https://wiki.alpinelinux.org/wiki/Apkindex_format)
- [Wiki: Package format](https://wiki.alpinelinux.org/wiki/Alpine_package_format)

## Package Structure (.apk)

An `.apk` file is a concatenation of two gzipped tarballs:

```
package.apk = control.tar.gz + data.tar.gz
```

### control.tar.gz

Contains package metadata and install scripts:

| File | Purpose |
|------|---------|
| `.PKGINFO` | Package metadata (name, version, depends, etc.) |
| `.pre-install` | Script run before installation |
| `.post-install` | Script run after installation |
| `.pre-upgrade` | Script run before upgrade |
| `.post-upgrade` | Script run after upgrade |
| `.pre-deinstall` | Script run before removal |
| `.post-deinstall` | Script run after removal |

### data.tar.gz

Contains the actual package files with hash metadata:

```sh
cd $pkgdir
tar -c * | abuild-tar --hash | gzip -9 > $controldir/data.tar.gz
```

## APKINDEX Format

`APKINDEX.tar.gz` is a signed index of all packages in a repository.

### Structure

```
APKINDEX.tar.gz = signature.tar.gz + APKINDEX.unsigned.tar.gz
```

Contents:
- `.SIGN.RSA.<keyname>` — Detached signature
- `DESCRIPTION` — Repository description
- `APKINDEX` — Package index entries

### Building APKINDEX

```sh
# Create unsigned index from .apk files
apk index -o APKINDEX.unsigned.tar.gz *.apk

# Create signature
openssl dgst -sha1 -sign privatekeyfile \
  -out .SIGN.RSA.nameofpublickey \
  APKINDEX.unsigned.tar.gz

tar -c .SIGN.RSA.nameofpublickey | abuild-tar --cut | gzip -9 > signature.tar.gz

# Combine
cat signature.tar.gz APKINDEX.unsigned.tar.gz > APKINDEX.tar.gz
```

### APKINDEX Entry Fields

Each package entry in APKINDEX contains (one field per line, entries separated by blank line):

| Field | Description | Example |
|-------|-------------|---------|
| `C:` | Checksum (SHA1) | `C:Q1...` |
| `P:` | Package name | `P:curl` |
| `V:` | Version | `V:8.5.0-r0` |
| `A:` | Architecture | `A:x86_64` |
| `S:` | Package size (bytes) | `S:245760` |
| `I:` | Installed size | `I:524288` |
| `T:` | Description | `T:URL retrieval utility` |
| `U:` | URL | `U:https://curl.se/` |
| `L:` | License | `L:MIT` |
| `o:` | Origin (source package) | `o:curl` |
| `m:` | Maintainer | `m:Name <email>` |
| `t:` | Build timestamp | `t:1700000000` |
| `c:` | Git commit | `c:abc123...` |
| `D:` | Dependencies | `D:so:libcurl.so.4 so:libc.musl-x86_64.so.1` |
| `p:` | Provides | `p:cmd:curl` |
| `i:` | Install-if (auto-install) | `i:docs curl` |

## .apk-new Files

When upgrading, if apk detects a locally modified config file, it saves the new version as `<filename>.apk-new` instead of overwriting. The user must manually merge changes.

## Signing Keys

- Repository keys stored in `/etc/apk/keys/`
- Key naming convention: `<email>-<id>.rsa.pub`
- `--allow-untrusted` bypasses signature verification
- `abuild-keygen` generates new keypairs for signing

## Dependency Types

| Prefix | Type | Example |
|--------|------|---------|
| (none) | Package name | `curl` |
| `so:` | Shared library | `so:libcurl.so.4` |
| `cmd:` | Command/binary | `cmd:curl` |
| `pc:` | pkg-config | `pc:libcurl` |
