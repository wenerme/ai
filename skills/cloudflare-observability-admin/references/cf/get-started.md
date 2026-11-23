---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Install the Cloudflare CLI, sign in, and run your first command.
title: Get started
image: https://developers.cloudflare.com/cf/get-started/og.png?v=cd76c898b43a26f7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cf/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Every `cf` workflow starts the same way: install the CLI, sign in, and run a command. The reference sections at the end of this page explain how `cf` chooses credentials, accounts, and zones.

## Requirements

- A Cloudflare account. If you do not have one, [sign up ↗︎](https://dash.cloudflare.com/sign-up).
- Node.js. `cf` supports the latest versions of the Node.js [LTS releases ↗︎](https://nodejs.org/en/about/previous-releases) and the latest active release of Node.js. Bun is not supported. When `cf` runs on Bun, commands that load `cloudflare.config.ts` fail.

## Install `cf`

Install `cf` globally so the command is available in every directory:

npmyarnpnpmbun

```
npm install --global cf
```

```
yarn global add cf
```

```
pnpm add --global cf
```

```
bun add --global cf
```

The package installs two commands that run the same CLI: `cf` and `cloudflare`. Use `cloudflare` if another tool named `cf` is already on your `PATH`.

Confirm the installation:

```sh
cf --version
```

To update `cf` later, install the latest release:

npmyarnpnpmbun

```
npm install --global cf@latest
```

```
yarn global add cf@latest
```

```
pnpm add --global cf@latest
```

```
bun add --global cf@latest
```

A project can also add `cf` as a development dependency. Inside that project, the global `cf` command runs the version installed in the project, so collaborators, coding agents, and continuous integration (CI) use the same release. Projects created with `cf init` already include it.

## Sign in

1. Start the sign-in flow:

   ```sh
   cf auth login
   ```

   `cf` prints a link and a one-time code, and opens the link in your browser. Approve the request to give `cf` access to your Cloudflare account.
2. Confirm that you are signed in:

   ```sh
   cf auth whoami
   ```

On a remote machine, over SSH, or in a container, add `--no-browser`. `cf` prints the link without opening it, and you can approve the request from a browser on another device. To sign in again, add `--force`.

`cf` keeps its own credentials and does not reuse a Wrangler login. Sign in once, even if you already use Wrangler.

## Run your first command

List the zones you can access:

```sh
cf zones list
```

Results are JSON on standard output. Progress and status messages go to standard error, so you can redirect or pipe results without extra flags:

```sh
cf zones list > zones.json
```

### Find commands

To find the command for a task, describe the task to `cf cli search`:

```sh
cf cli search "create a DNS record"
```

`cf cli search` prints up to five matching commands as JSON. It runs locally and does not need credentials. To browse instead, add `--help` to `cf`, to a product such as `cf dns`, or to any command.

For a walkthrough that finds, creates, and deletes a resource, refer to [Manage resources from the command line](https://developers.cloudflare.com/cf/get-started/resources/).

## Set up shell completion

Add completion to your shell profile, then restart your shell:

```sh
cf complete zsh >> ~/.zshrc
```

`cf complete` also supports `bash`, `fish`, and `powershell`. Run `cf complete --help` for the bash and fish equivalents.

## Credential order

`cf` uses the first credential it finds:

1. The `CLOUDFLARE_API_TOKEN` environment variable, including a value loaded from a [`.env` file](#load-credentials-from-a-env-file).
2. The profile selected with `--profile <NAME>`.
3. The profile named by the `CLOUDFLARE_AUTH_PROFILE` environment variable.
4. The profile bound to the current directory, or to its nearest parent, with `cf auth activate`.
5. The default profile, which `cf auth login` signs in to.

`cf` does not support the Global API Key.

## Select an account

When a command needs an account, `cf` selects one in this order:

1. The `CLOUDFLARE_ACCOUNT_ID` environment variable.
2. The `accountId` field in the default export of `cloudflare.config.ts`.
3. The only account your credentials can access. If there are several, `cf` asks you to choose one.

When your credentials can access several accounts and neither the environment nor `cloudflare.config.ts` sets one, `cf` asks each time it runs.

To use the same account across several projects, or across your whole machine, use a [named profile](#use-named-profiles). Sign in to the profile with credentials that can access only that account, so `cf` selects it automatically. Then bind the profile with `cf auth activate` to the directory that contains those projects, or to your home directory to use it everywhere. Your other profiles keep their own sign-in, so you can stay signed in to other accounts at the same time.

In a non-interactive session, such as a script or CI job, a command fails if your credentials can access more than one account and no account is set.

To set a default account for a project, refer to [Set account defaults](https://developers.cloudflare.com/cf/projects/cloudflare-config/#set-account-defaults).

## Select a zone

Zone-scoped commands accept `--zone` or `-z`. The value can be a zone ID or a domain name:

```sh
cf dns records list --zone example.com
```

For a domain name, `cf` looks up the matching zone in the [selected account](#select-an-account). The `--zone` option takes priority over the `CLOUDFLARE_ZONE_ID` environment variable.

## Use named profiles

Profiles keep separate credentials, for example for work and personal accounts. Create a profile:

```sh
cf auth create work
```

`cf auth create` creates the profile and starts a sign-in for it. To use the profile in a project, bind it to the project directory:

```sh
cf auth activate work
```

`cf auth activate` binds the profile to the current directory and its subdirectories. To bind a different directory, pass it after the profile name. To remove the binding, run `cf auth deactivate`. To use a profile for a single command, pass `--profile <NAME>`. To see your profiles, run `cf auth list`.

`cf auth create`, `cf auth activate`, `cf auth deactivate`, and `cf auth delete` do not run while `CLOUDFLARE_API_TOKEN` is set, because the token takes priority over every profile.

## Authenticate automation

In CI and other non-interactive environments, set an API token instead of running `cf auth login`:

```sh
export CLOUDFLARE_API_TOKEN=<API_TOKEN>
export CLOUDFLARE_ACCOUNT_ID=<ACCOUNT_ID>
```

Give the token only the permissions the job needs. To create one, refer to [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/). For a complete pipeline setup, refer to [Use `cf` in CI](https://developers.cloudflare.com/cf/ci/).

## Load credentials from a `.env` file

API commands read these variables from `.env` files in the current directory:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_ZONE_ID`
- `CLOUDFLARE_COMPLIANCE_REGION`
- `CLOUDFLARE_ACCESS_CLIENT_ID`
- `CLOUDFLARE_ACCESS_CLIENT_SECRET`
- `CLOUDFLARE_DEPENDENCIES_INSTRUMENTATION`

For example:

*.envtxt*

```txt
CLOUDFLARE_API_TOKEN=<API_TOKEN>
CLOUDFLARE_ACCOUNT_ID=<ACCOUNT_ID>
```

`cf` reads `.env`, then `.env.local`. When you pass `--mode`, it also reads `.env.<MODE>` and then `.env.<MODE>.local`. A value in a later file overrides the same variable in an earlier one. Variables already set in your environment override every file.

Commands run with `--local` do not read the file. `cf deploy`, `cf previews deploy`, `cf workers versions create`, and `cf workers triggers deploy` read it only after the build finishes.

Caution

Do not commit API tokens to version control. Check that `.gitignore` excludes `.env`. Projects created with `cf init` ignore `.env*` files.

## Next steps

- To review CLI settings, [see the environment variables](https://developers.cloudflare.com/cf/environment-variables/).
- If you are new to Workers, [deploy your first Worker](https://developers.cloudflare.com/cf/get-started/first-worker/).
- If you manage zones and DNS, [manage resources from the command line](https://developers.cloudflare.com/cf/get-started/resources/).
- If you use Wrangler today, read [`cf` for Wrangler users](https://developers.cloudflare.com/cf/wrangler/).
- If you work with a coding agent, [set up `cf` for agents](https://developers.cloudflare.com/cf/agents/).
- If you deploy from a pipeline, [use `cf` in CI](https://developers.cloudflare.com/cf/ci/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cf/get-started/#page","headline":"Get started","description":"Install the Cloudflare CLI, sign in, and run your first command.","url":"https://developers.cloudflare.com/cf/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/cf/get-started/og.png?v=cd76c898b43a26f7","dateModified":"2026-11-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
