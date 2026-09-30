---
description: Find a zone, list, create, and delete DNS records, and find other commands with the Cloudflare CLI.
title: Manage resources from the command line
image: https://developers.cloudflare.com/cf/get-started/resources/og.png?v=bacce884889204ff
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cf/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage resources from the command line

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cf/get-started/resources/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`cf` manages Cloudflare resources directly, without a Workers project. This guide uses DNS records to show a pattern that most resource commands follow: find a resource, list what it contains, preview a change, make the change, and clean up.

## Before you begin

- [Install `cf` and sign in](https://developers.cloudflare.com/cf/get-started/#sign-in). If you use an API token, it needs permission to edit DNS records in the zone.
- Add a domain to your Cloudflare account. This guide uses `example.com`.
- (Optional) Install [`jq` ↗︎](https://jqlang.org/) to filter JSON output.

## 1. Find a zone

List the zones you can access:

```sh
cf zones list
```

The result is a JSON array. To look up one domain, filter by name:

```sh
cf zones list --name example.com
```

Note the `id` of the zone. Zone-scoped commands accept the zone ID or the domain name. For details, refer to [Select a zone](https://developers.cloudflare.com/cf/get-started/#select-a-zone).

## 2. List DNS records

List the DNS records in the zone:

```sh
cf dns records list --zone example.com
```

Options narrow the results. For example, list only `A` records:

```sh
cf dns records list --zone example.com --type A
```

`cf dns records list` returns one page of results. To get more, use `--page` and `--per-page`.

## 3. Preview a change

Add `--dry-run` to see the request a command would send. A dry run prints the method, URL, and body as JSON, and exits without sending anything. It does not need credentials.

```sh
cf dns records create --zone <ZONE_ID> --body '{"type":"A","name":"test","content":"192.0.2.1","proxied":true}' --dry-run
```

```json
{
	"command": "cf dns records create",
	"method": "POST",
	"url": "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_records",
	"pathParams": {
		"zone-id": "<ZONE_ID>"
	},
	"query": {},
	"bodyKind": "json",
	"body": {
		"type": "A",
		"name": "test",
		"content": "192.0.2.1",
		"proxied": true
	}
}
```

Use the zone ID in a dry run. A dry run does not look up domain names, so the preview would show the domain name where the ID belongs.

`--body` takes the JSON request body. Some operations, including this one, accept their input only through `--body`. For the fields the body accepts, refer to the [Create DNS Record API reference](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/).

## 4. Create the record

Run the same command without `--dry-run`:

```sh
cf dns records create --zone example.com --body '{"type":"A","name":"test","content":"192.0.2.1","proxied":true}'
```

`cf` prints the new record as JSON, including its `id`.

## 5. Filter the output

Because results are JSON on standard output, you can pipe them to `jq`. Print the name and content of each `A` record:

```sh
cf dns records list --zone example.com --type A | jq -r '.[] | "\(.name) \(.content)"'
```

Get the ID of the record you created:

```sh
cf dns records list --zone example.com --name test.example.com | jq -r '.[0].id'
```

## 6. Delete the record

Delete the record by its ID:

```sh
cf dns records delete <RECORD_ID> --zone example.com
```

`cf` asks you to confirm before it deletes anything. The default answer is no.

In a non-interactive session, such as a script or CI job, `cf` cannot ask. It prints the question and `Aborted.`, makes no change, and exits with status `0`. To delete without confirmation, pass `--force`:

```sh
cf dns records delete <RECORD_ID> --zone example.com --force
```

Caution

Because a skipped deletion exits with status `0`, a script cannot tell from the exit status that nothing was deleted. On some commands, `--force` also changes what the API operation does. Read the `--help` output of a command before you pass `--force` in a script.

## 7. Find other commands

Describe a task to find the command for it:

```sh
cf cli search "purge cached files for a URL"
```

`cf cli search` prints up to five matching commands as JSON, best match first. Each match includes the command and a short summary. It runs locally and does not need credentials.

To see the arguments and options a command accepts, add `--help`:

```sh
cf cache purge --help
```

To see the API request a generated command sends, including its method, path, parameters, and body fields, pass it to `cf schema`:

```sh
cf schema zones create
```

To browse commands by product, add `--help` to `cf`, to a product such as `cf dns`, or to any command.

## Next steps

- Run `cf` from scripts and pipelines with [Use `cf` in CI](https://developers.cloudflare.com/cf/ci/).
- Give a coding agent access to the same commands with [Use `cf` with coding agents](https://developers.cloudflare.com/cf/agents/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cf/get-started/resources/#page","headline":"Manage resources from the command line","description":"Find a zone, list, create, and delete DNS records, and find other commands with the Cloudflare CLI.","url":"https://developers.cloudflare.com/cf/get-started/resources/","inLanguage":"en","image":"https://developers.cloudflare.com/cf/get-started/resources/og.png?v=bacce884889204ff","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
