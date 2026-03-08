---
name: alpine-aports-docs
description: "USE THIS SKILL WHEN maintaining Alpine Linux packages (aports): writing APKBUILDs, abuild workflow, apk package management, APKINDEX format, commit/coding style, contributing to aports, package upgrade/rebuild/move/rename, subpackages, cross-compilation, secfixes, checksum handling, testing packages, or Alpine Linux packaging best practices. Triggers on: APKBUILD, abuild, apk add, apk del, aports, Alpine package, pkgname, pkgver, pkgrel."
---

# Alpine Linux Aports — Package Maintainer Guide

Reference for Alpine Linux package maintainers. Covers APKBUILD format, abuild workflow, apk commands, aports contribution guidelines, and packaging best practices.

- [aports repo](https://gitlab.alpinelinux.org/alpine/aports) | [GitHub mirror](https://github.com/alpinelinux/aports)
- [Alpine Wiki: Creating APKBUILD](https://wiki.alpinelinux.org/wiki/Creating_an_Alpine_package)
- [Alpine Wiki: APKBUILD Reference](https://wiki.alpinelinux.org/wiki/APKBUILD_Reference)

CRITICAL: grep `references/` for detailed rules before answering.

## Repository Structure

| Repository | Branch | Policy |
|------------|--------|--------|
| `testing/` | edge only | New packages land here first. No release support. Removed after 9 months if not promoted. |
| `community/` | edge + stable | Must have maintainer and pass tests. Workflow: `testing → community`. |
| `main/` | edge + stable | Core system packages. Assigned developer required. Workflow: `testing → community → main`. |

## APKBUILD Quick Reference

```sh
# Contributor: Name <email>
# Maintainer: Name <email>
maintainer="Name <email>"
pkgname=example
pkgver=1.0.0
pkgrel=0
pkgdesc="Short description"
url="https://example.com"
arch="all"
license="MIT"
depends=""
makedepends=""
subpackages="$pkgname-doc $pkgname-dev"
source="$pkgname-$pkgver.tar.gz::https://example.com/archive/v$pkgver.tar.gz"

build() {
	./configure --prefix=/usr
	make
}

check() {
	make test
}

package() {
	make DESTDIR="$pkgdir" install
}

sha512sums="..."
```

### Key Variables

| Variable | Required | Notes |
|----------|----------|-------|
| `pkgname` | Yes | Lowercase only, must match directory name |
| `pkgver` | Yes | Upstream version, no quotes |
| `pkgrel` | Yes | Alpine revision, starts at 0 |
| `pkgdesc` | Yes | Short description |
| `url` | Yes | Upstream homepage |
| `arch` | Yes | `all`, `noarch`, or space-separated arch list |
| `license` | Yes | SPDX identifier |
| `depends` | No | Runtime dependencies |
| `makedepends` | No | Build-time dependencies |
| `checkdepends` | No | Test-time dependencies |
| `subpackages` | No | e.g. `$pkgname-doc $pkgname-dev $pkgname-openrc` |
| `source` | Yes | Source URLs and local files |
| `options` | No | e.g. `!check` `!strip` `net` `chmod-clean` |
| `builddir` | No | Defaults to `$srcdir/$pkgname-$pkgver` |
| `install` | No | Pre/post install scripts |

### Build Functions (in order)

1. `fetch` — Download sources (automatic)
2. `unpack` — Extract sources (automatic)
3. `prepare` — Apply patches. If overridden, MUST call `default_prepare`
4. `build` — Compile
5. `check` — Run tests
6. `package` — Install to `$pkgdir`

### Common abuild Commands

```sh
abuild -r              # Build package (fetch, build, check, package)
abuild checksum        # Update checksums in APKBUILD
abuild -r -K           # Keep builddir after build (for debugging)
abuild clean           # Clean build artifacts
abuild undeps          # Remove installed makedepends
newapkbuild -n pkgname # Generate new APKBUILD template
abuild rootbld         # Build in clean chroot
```

## Commit Message Format

```
$repository/$pkgname: action
```

| Type | Template | Example |
|------|----------|---------|
| New | `testing/foo: new aport` | |
| Upgrade | `main/foo: upgrade to 2.0.0` | Sets pkgrel=0 |
| Rebuild | `community/foo: rebuild for so:libfoo.so.2` | Bumps pkgrel |
| Move | `community/foo: move from testing` | |
| Rename | `community/bar: rename from foo` | |
| Remove | `community/foo: remove` | |
| Fix | `main/foo: fix build on aarch64` | |
| Maintainer | `community/foo: take over maintainership` | |

Rules: lowercase after colon, no trailing dot, imperative present tense, one commit per aport.

## References

- `references/abuild-workflow.md` — Full abuild workflow: new package, upgrade (abump), build debug, patch creation, MR submission, glab commands, secfixes, subpackages, rebuild, move
- `references/codingstyle.md` — APKBUILD coding style (formatting, quoting, naming, metadata order)
- `references/commitstyle.md` — Full commit message policy with all types and exceptions
- `references/contributing.md` — How to submit MRs/PRs, CI requirements
- `references/apk-commands.md` — apk package manager command reference
- `references/apk-internals.md` — APKINDEX format, package structure, signing, cache
