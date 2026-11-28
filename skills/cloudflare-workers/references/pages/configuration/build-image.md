---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Review supported languages, tools, and environment variables in the Cloudflare Pages build image.
title: Build image
image: https://developers.cloudflare.com/pages/configuration/build-image/og.png?v=db3d0aa29a32719e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Build image

The Cloudflare Pages build environment supports a variety of languages, including Go, Node.js, Bun, Python, and Ruby. For the build image used by Cloudflare Workers, refer to [Workers Builds build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/).

If you need to use a [specific version](#override-default-versions) of a language (for example, Node.js or Ruby), specify it by setting the associated environment variable in your build configuration or adding the corresponding version file to your source code.

## Supported languages and tools

In the following tables, review the preinstalled versions for languages and tools included in the Cloudflare Pages' build image, and the environment variables and/or files available for [overriding the preinstalled version](#override-default-versions):

### Languages and runtime

Tool | Default version | Supported versions | Environment variable | File
| **Go** | 1.24.3 | Any version | `GO_VERSION` | |
| --- | --- | --- | --- | --- |
| **Node.js** | 22.23.4 | Any version | `NODE_VERSION` | .nvmrc, .node-version |
| **Bun** | 1.4.4 | Any version | `BUN_VERSION` | |
| **Python** | 3.13.3 | Any version | `PYTHON_VERSION` | .python-version, runtime.txt |
| **Ruby** | 3.4.4 | Any version | `RUBY_VERSION` | .ruby-version |

Tool | Default version | Supported versions | Environment variable | File
| **Go** | 1.21.0 | Any version | `GO_VERSION` | |
| --- | --- | --- | --- | --- |
| **Node.js** | 18.17.1 | Any version | `NODE_VERSION` | .nvmrc, .node-version |
| **Bun** | 1.4.4 | Any version | `BUN_VERSION` | |
| **Python** | 3.11.5 | Any version | `PYTHON_VERSION` | .python-version, runtime.txt |
| **Ruby** | 3.2.2 | Any version | `RUBY_VERSION` | .ruby-version |

Tool | Default version | Supported versions | Environment variable | File
| **Clojure** |  |  |  | |
| --- | --- | --- | --- | --- |
| **Elixir** | 1.7 | 1.7 only |  | |
| **Erlang** | 21 | 21 only |  | |
| **Go** | 1.14.4 | Any version | `GO_VERSION` | |
| **Java** | 8 | 8 only |  | |
| **Node.js** | 12.18.0 | Any version | `NODE_VERSION` | .nvmrc, .node-version |
| **PHP** | 5.6 | 5.6, 7.2, 7.4 only | `PHP_VERSION` | |
| **Python** | 2.7 | 2.7, 3.5, 3.7 only | `PYTHON_VERSION` | runtime.txt, Pipfile |
| **Ruby** | 2.7.1 | Any version between 2.6.2 and 2.7.5 | `RUBY_VERSION` | .ruby-version |
| **Swift** | 5.2.5 | Any 5.x version | `SWIFT_VERSION` | .swift-version |
| **.NET** | 3.1.302 |  |  | |

Any version

Under Supported versions, "Any version" refers to support for all versions of the language or tool including versions newer than the Default version.

### Tools

Tool | Default version | Supported versions | Environment variable
| **Bundler** | 2.6.9 | Corresponds with Ruby version | |
| --- | --- | --- | --- |
| **Embedded Dart Sass** | 1.62.1 | Up to 1.62.1 | `EMBEDDED_DART_SASS_VERSION` |
| **gem** | 3.6.9 | Corresponds with Ruby version | |
| **Hugo** | 0.147.7 | Any version | `HUGO_VERSION` |
| **npm** | 10.9.9 | Corresponds with Node.js version | |
| **pip** | 26.2.2 | Corresponds with Python version | |
| **pipx** | 1.7.1 |  | |
| **pnpm** | 10.11.1 | Any version | `PNPM_VERSION` |
| **Poetry** | 2.1.3 |  | |
| **Yarn** | 4.9.1 | Any version | `YARN_VERSION` |
| **Zola** | 0.22.1 | Any version | `ZOLA_VERSION` |

Tool | Default version | Supported versions | Environment variable
| **Bundler** | 2.4.10 | Corresponds with Ruby version | |
| --- | --- | --- | --- |
| **Embedded Dart Sass** | 1.62.1 | Up to 1.62.1 | `EMBEDDED_DART_SASS_VERSION` |
| **gem** | 3.4.10 | Corresponds with Ruby version | |
| **Hugo** | 0.118.2 | Any version | `HUGO_VERSION` |
| **npm** | 9.6.7 | Corresponds with Node.js version | |
| **pip** | 26.2.2 | Corresponds with Python version | |
| **pipx** | 1.2.0 |  | |
| **pnpm** | 8.7.1 | Any version | `PNPM_VERSION` |
| **Poetry** | 1.6.1 |  | |
| **Yarn** | 3.6.3 | Any version | `YARN_VERSION` |
| **Zola** | 0.22.1 | Any version | `ZOLA_VERSION` |

Tool | Default version | Supported versions | Environment variable
| **Boot** | 2.5.2 | 2.5.2 | |
| --- | --- | --- | --- |
| **Bower** |  |  | |
| **Cask** |  |  | |
| **Composer** |  |  | |
| **Doxygen** | 1.8.6 |  | |
| **Emacs** | 25 |  | |
| **Gutenberg** | (requires environment variable) | Any version | `GUTENBERG_VERSION` |
| **Hugo** | 0.54.0 | Any version | `HUGO_VERSION` |
| **GNU Make** | 3.8.1 |  | |
| **ImageMagick** | 6.7.7 |  | |
| **jq** | 1.5 |  | |
| **Leiningen** |  |  | |
| **OptiPNG** | 0.6.4 |  | |
| **npm** | Corresponds with Node.js version | Any version | `NPM_VERSION` |
| **pip** | Corresponds with Python version |  | |
| **Pipenv** | Latest version |  | |
| **sqlite3** | 3.11.0 |  | |
| **Yarn** | 1.22.4 | Any version from 0.2.0 to 1.22.19 | `YARN_VERSION` |
| **Zola** | (requires environment variable) | Any version from 0.5.0 and up | `ZOLA_VERSION` |

Any version

Under Supported versions, "Any version" refers to support for all versions of the language or tool including versions newer than the Default version.

### Frameworks

To use a specific version of a framework, specify it in the project's package manager configuration file. For example, your `package.json` might include:

```json
{
	"dependencies": {
		"vite": "^6.0.0"
	}
}
```

When your build starts, if not already [cached](https://developers.cloudflare.com/pages/configuration/build-caching/), the declared version is installed using your package manager.

## Advanced settings

### Override default versions

To override default versions of languages and tools in the build system, set the desired version through environment variables in the Cloudflare dashboard or by adding version files to your project.

To set the version using environment variables:

1. Find the environment variable name for the language or tool in the [Supported languages and tools](#supported-languages-and-tools) tables.
2. In your Pages project in the Cloudflare dashboard, go to **Settings** > **Variables and Secrets** and add the build environment variable (for example, `NODE_VERSION`).

Or, to set the version by adding a file to your project:

1. Find the file name for the language or tool in the [Supported languages and tools](#supported-languages-and-tools) tables.
2. Add the specified file name to the root directory of your project, and add the desired version number as the contents of the file.

For example, to pin Node.js `20.19.0`, set a `NODE_VERSION` environment variable to `20.19.0` or add a `.node-version` or `.nvmrc` file to your project containing `20.19.0`.

### Skip dependency install

You can add the following environment variable to disable automatic dependency installation, and run a custom install command instead.

| Build variable | Value |
| --- | --- |
| `SKIP_DEPENDENCY_INSTALL` | `1` or `true` |

## v3 build system

The v3 build system updates the default tools, libraries, and languages to current LTS versions and receives rolling updates.

### v2 to v3 migration

To migrate from the v2 build system to v3, configure your Pages project settings in the dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page. [Go to **Workers & Pages** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** > **Build** > **Build system version** and select **Version 3 (latest)**.

If you were previously relying on the default versions of any languages or tools in the build system, your build may fail when migrating to v3. To fix this, specify the version you want to use by [overriding the default versions](#override-default-versions).

### Limitations

The following features are not supported when using the v3 build system:

- Specifying Node.js versions as codenames (for example, `hydrogen` or `lts/hydrogen`).
- Detecting Yarn version from `yarn.lock` file version.
- Detecting pnpm version from `pnpm-lock.yaml` file version.
- Detecting Node.js and package managers from `package.json` -> `"engines"`.
- `pipenv` and `Pipfile` support.

## Build environment

Cloudflare Pages builds are run in a [gVisor ↗︎](https://gvisor.dev/docs/) container.

| **Build environment** | Ubuntu `22.04.2` |
| --- | --- |
| **Architecture** | x86\_64 |

| **Build environment** | Ubuntu `22.04.2` |
| --- | --- |
| **Architecture** | x86\_64 |

| **Build environment** | Ubuntu `20.04.5` |
| --- | --- |
| **Architecture** | x86\_64 |

### Trusted certificates

Build commands use the CA certificates installed in the build image at `/etc/ssl/certs/ca-certificates.crt`. Pages sets the following environment variables so that runtimes with their own bundled CA certificates use them as well, including older versions you select with a [version override](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions):

| Environment variable | Value |
| --- | --- |
| `SSL_CERT_FILE` | `/etc/ssl/certs/ca-certificates.crt` |
| `PIP_CERT` | `/etc/ssl/certs/ca-certificates.crt` |
| `REQUESTS_CA_BUNDLE` | `/etc/ssl/certs/ca-certificates.crt` |
| `NODE_OPTIONS` | `--use-openssl-ca` |

If you set any of these variables as an [environment variable](https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables) in your project, your value replaces the default. `--use-openssl-ca` is added to your own `NODE_OPTIONS`, unless it already contains `--use-openssl-ca` or `--use-bundled-ca`.

## Build image policy

### Build image version deprecation

Projects using older build image versions migrate to v3 on the following schedule:

- **v1 build image**: Projects on the Pages v1 build image were automatically moved to v3 on 2026-09-15.
- **v2 build image**: Projects on the Pages v2 build image will be automatically moved to v3 on 2027-02-23.

Cloudflare provides six months' notice before a deprecation date via the [Cloudflare Changelog](https://developers.cloudflare.com/changelog/product/pages/), dashboard notifications, and email.

The v3 build image receives rolling updates to preinstalled software under the following policy, with no further major build image version changes.

### Preinstalled software updates

Preinstalled software (languages and tools) is updated before reaching end-of-life (EOL). These updates apply only if you have not [overridden the default version](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions).

- **Minor version updates**: May be updated to the latest available minor version without notice. For tools that do not follow semantic versioning (for example, Bun or Hugo), updates that may contain breaking changes receive three months' notice.
- **Major version updates**: Updated to the next stable long-term support (LTS) version with three months' notice.

**How you will be notified (for changes requiring notice):**

- [Cloudflare Changelog](https://developers.cloudflare.com/changelog/product/pages/)
- Dashboard notifications for projects that will receive the update
- Email notifications to project owners

To maintain a specific version and avoid automatic updates, [override the default version](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions).

### Best practices

To avoid unexpected build failures:

- **Monitor announcements** via the [Cloudflare Changelog](https://developers.cloudflare.com/changelog/product/pages/), dashboard notifications, and email.
- **Plan for migration** when you receive update notices.
- **Pin specific versions** of critical preinstalled software by [overriding default versions](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/build-image/#page","headline":"Build image","description":"Review supported languages, tools, and environment variables in the Cloudflare Pages build image.","url":"https://developers.cloudflare.com/pages/configuration/build-image/","inLanguage":"en","image":"https://developers.cloudflare.com/pages/configuration/build-image/og.png?v=db3d0aa29a32719e","dateModified":"2026-11-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
