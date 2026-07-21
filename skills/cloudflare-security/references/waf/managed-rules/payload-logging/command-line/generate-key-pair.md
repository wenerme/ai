---
description: Generate a public/private key pair for payload logging encryption.
title: Generate a key pair
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

#  Generate a key pair

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/waf/managed-rules/payload-logging/command-line/generate-key-pair/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Generate a public/private key pair using the Cloudflare [matched-data-cli ↗](https://github.com/cloudflare/matched-data-cli) command-line tool. After generating a key pair, enter the generated public key in the payload logging configuration.

Do the following:

1. [Download ↗](https://github.com/cloudflare/matched-data-cli/releases) the `matched-data-cli` tool for your platform from the **Releases** page on GitHub, under **Assets**.
2. Extract the content of the downloaded `.tar.gz` file to a local folder.
3. Open a terminal and go to the local folder containing the `matched-data-cli` tool.
```sh
cd matched-data-cli
```
4. Run the following command:
```sh
./matched-data-cli generate-key-pair
```
```json
{
	"private_key": "uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=",
	"public_key": "Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8="
}
```

After generating the key pair, copy the public key value and enter it in the payload logging configuration.

## Troubleshooting macOS errors

If you are using macOS, the operating system may block the `matched-data-cli` tool, depending on your security settings.

For instructions on how to execute unsigned binaries like the `matched-data-cli` tool in macOS, refer to the [Safely open apps on your Mac ↗](https://support.apple.com/en-us/102445#openanyway) page in Apple Support.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/command-line/generate-key-pair/#page","headline":"Generate a key pair in the command line · Cloudflare Web Application Firewall (WAF) docs","description":"Generate a public/private key pair for payload logging encryption.","url":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/command-line/generate-key-pair/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CLI"]}
```
