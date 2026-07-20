---
title: Wrangler commands
description: Wrangler CLI commands for creating, managing, and interacting with Cloudflare Queues.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Wrangler commands

Queues Wrangler commands use REST APIs to interact with the control plane. This page lists the Wrangler commands for Queues.

## `queues list`

List queues

* [  npm ](#tab-panel-10489)
* [  pnpm ](#tab-panel-10490)
* [  yarn ](#tab-panel-10491)

```sh
npx wrangler queues list
```

```sh
pnpm wrangler queues list
```

```sh
yarn wrangler queues list
```

* `--page` ` number `
Page number for pagination

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues create`

Create a queue

* [  npm ](#tab-panel-10492)
* [  pnpm ](#tab-panel-10493)
* [  yarn ](#tab-panel-10494)

```sh
npx wrangler queues create [NAME]
```

```sh
pnpm wrangler queues create [NAME]
```

```sh
yarn wrangler queues create [NAME]
```

* `[NAME]` ` string ` required
The name of the queue
* `--delivery-delay-secs` ` number `
How long a published message should be delayed for, in seconds. Must be between 0 and 86400
* `--message-retention-period-secs` ` number `
How long to retain a message in the queue, in seconds. Must be between 60 and 86400 if on free tier, otherwise must be between 60 and 1209600

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues update`

Update a queue

* [  npm ](#tab-panel-10495)
* [  pnpm ](#tab-panel-10496)
* [  yarn ](#tab-panel-10497)

```sh
npx wrangler queues update [NAME]
```

```sh
pnpm wrangler queues update [NAME]
```

```sh
yarn wrangler queues update [NAME]
```

* `[NAME]` ` string ` required
The name of the queue
* `--delivery-delay-secs` ` number `
How long a published message should be delayed for, in seconds. Must be between 0 and 86400
* `--message-retention-period-secs` ` number `
How long to retain a message in the queue, in seconds. Must be between 60 and 86400 if on free tier, otherwise must be between 60 and 1209600

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues delete`

Delete a queue

* [  npm ](#tab-panel-10498)
* [  pnpm ](#tab-panel-10499)
* [  yarn ](#tab-panel-10500)

```sh
npx wrangler queues delete [NAME]
```

```sh
pnpm wrangler queues delete [NAME]
```

```sh
yarn wrangler queues delete [NAME]
```

* `[NAME]` ` string ` required
The name of the queue

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues info`

Get queue information

* [  npm ](#tab-panel-10501)
* [  pnpm ](#tab-panel-10502)
* [  yarn ](#tab-panel-10503)

```sh
npx wrangler queues info [NAME]
```

```sh
pnpm wrangler queues info [NAME]
```

```sh
yarn wrangler queues info [NAME]
```

* `[NAME]` ` string ` required
The name of the queue

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues consumer add`

Add a Queue Worker Consumer

* [  npm ](#tab-panel-10504)
* [  pnpm ](#tab-panel-10505)
* [  yarn ](#tab-panel-10506)

```sh
npx wrangler queues consumer add [QUEUE-NAME] [SCRIPT-NAME]
```

```sh
pnpm wrangler queues consumer add [QUEUE-NAME] [SCRIPT-NAME]
```

```sh
yarn wrangler queues consumer add [QUEUE-NAME] [SCRIPT-NAME]
```

* `[QUEUE-NAME]` ` string ` required
Name of the queue to configure
* `[SCRIPT-NAME]` ` string ` required
Name of the consumer script
* `--batch-size` ` number `
Maximum number of messages per batch
* `--batch-timeout` ` number `
Maximum number of seconds to wait to fill a batch with messages
* `--message-retries` ` number `
Maximum number of retries for each message
* `--dead-letter-queue` ` string `
Queue to send messages that failed to be consumed
* `--max-concurrency` ` number `
The maximum number of concurrent consumer Worker invocations. Must be a positive integer
* `--retry-delay-secs` ` number `
The number of seconds to wait before retrying a message

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues consumer remove`

Remove a Queue Worker Consumer

* [  npm ](#tab-panel-10507)
* [  pnpm ](#tab-panel-10508)
* [  yarn ](#tab-panel-10509)

```sh
npx wrangler queues consumer remove [QUEUE-NAME] [SCRIPT-NAME]
```

```sh
pnpm wrangler queues consumer remove [QUEUE-NAME] [SCRIPT-NAME]
```

```sh
yarn wrangler queues consumer remove [QUEUE-NAME] [SCRIPT-NAME]
```

* `[QUEUE-NAME]` ` string ` required
Name of the queue to configure
* `[SCRIPT-NAME]` ` string ` required
Name of the consumer script

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues consumer list`

List consumers for a queue

* [  npm ](#tab-panel-10510)
* [  pnpm ](#tab-panel-10511)
* [  yarn ](#tab-panel-10512)

```sh
npx wrangler queues consumer list [QUEUE-NAME]
```

```sh
pnpm wrangler queues consumer list [QUEUE-NAME]
```

```sh
yarn wrangler queues consumer list [QUEUE-NAME]
```

* `[QUEUE-NAME]` ` string ` required
Name of the queue
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues consumer http add`

Add a Queue HTTP Pull Consumer

* [  npm ](#tab-panel-10513)
* [  pnpm ](#tab-panel-10514)
* [  yarn ](#tab-panel-10515)

```sh
npx wrangler queues consumer http add [QUEUE-NAME]
```

```sh
pnpm wrangler queues consumer http add [QUEUE-NAME]
```

```sh
yarn wrangler queues consumer http add [QUEUE-NAME]
```

* `[QUEUE-NAME]` ` string ` required
Name of the queue for the consumer
* `--batch-size` ` number `
Maximum number of messages per batch
* `--message-retries` ` number `
Maximum number of retries for each message
* `--dead-letter-queue` ` string `
Queue to send messages that failed to be consumed
* `--visibility-timeout-secs` ` number `
The number of seconds a message will wait for an acknowledgement before being returned to the queue.
* `--retry-delay-secs` ` number `
The number of seconds to wait before retrying a message

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues consumer http remove`

Remove a Queue HTTP Pull Consumer

* [  npm ](#tab-panel-10516)
* [  pnpm ](#tab-panel-10517)
* [  yarn ](#tab-panel-10518)

```sh
npx wrangler queues consumer http remove [QUEUE-NAME]
```

```sh
pnpm wrangler queues consumer http remove [QUEUE-NAME]
```

```sh
yarn wrangler queues consumer http remove [QUEUE-NAME]
```

* `[QUEUE-NAME]` ` string ` required
Name of the queue for the consumer

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues consumer http list`

List HTTP pull consumers for a queue

* [  npm ](#tab-panel-10519)
* [  pnpm ](#tab-panel-10520)
* [  yarn ](#tab-panel-10521)

```sh
npx wrangler queues consumer http list [QUEUE-NAME]
```

```sh
pnpm wrangler queues consumer http list [QUEUE-NAME]
```

```sh
yarn wrangler queues consumer http list [QUEUE-NAME]
```

* `[QUEUE-NAME]` ` string ` required
Name of the queue
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues consumer worker add`

Add a Queue Worker Consumer

* [  npm ](#tab-panel-10522)
* [  pnpm ](#tab-panel-10523)
* [  yarn ](#tab-panel-10524)

```sh
npx wrangler queues consumer worker add [QUEUE-NAME] [SCRIPT-NAME]
```

```sh
pnpm wrangler queues consumer worker add [QUEUE-NAME] [SCRIPT-NAME]
```

```sh
yarn wrangler queues consumer worker add [QUEUE-NAME] [SCRIPT-NAME]
```

* `[QUEUE-NAME]` ` string ` required
Name of the queue to configure
* `[SCRIPT-NAME]` ` string ` required
Name of the consumer script
* `--batch-size` ` number `
Maximum number of messages per batch
* `--batch-timeout` ` number `
Maximum number of seconds to wait to fill a batch with messages
* `--message-retries` ` number `
Maximum number of retries for each message
* `--dead-letter-queue` ` string `
Queue to send messages that failed to be consumed
* `--max-concurrency` ` number `
The maximum number of concurrent consumer Worker invocations. Must be a positive integer
* `--retry-delay-secs` ` number `
The number of seconds to wait before retrying a message

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues consumer worker remove`

Remove a Queue Worker Consumer

* [  npm ](#tab-panel-10525)
* [  pnpm ](#tab-panel-10526)
* [  yarn ](#tab-panel-10527)

```sh
npx wrangler queues consumer worker remove [QUEUE-NAME] [SCRIPT-NAME]
```

```sh
pnpm wrangler queues consumer worker remove [QUEUE-NAME] [SCRIPT-NAME]
```

```sh
yarn wrangler queues consumer worker remove [QUEUE-NAME] [SCRIPT-NAME]
```

* `[QUEUE-NAME]` ` string ` required
Name of the queue to configure
* `[SCRIPT-NAME]` ` string ` required
Name of the consumer script

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues consumer worker list`

List worker consumers for a queue

* [  npm ](#tab-panel-10528)
* [  pnpm ](#tab-panel-10529)
* [  yarn ](#tab-panel-10530)

```sh
npx wrangler queues consumer worker list [QUEUE-NAME]
```

```sh
pnpm wrangler queues consumer worker list [QUEUE-NAME]
```

```sh
yarn wrangler queues consumer worker list [QUEUE-NAME]
```

* `[QUEUE-NAME]` ` string ` required
Name of the queue
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues pause-delivery`

Pause message delivery for a queue

* [  npm ](#tab-panel-10531)
* [  pnpm ](#tab-panel-10532)
* [  yarn ](#tab-panel-10533)

```sh
npx wrangler queues pause-delivery [NAME]
```

```sh
pnpm wrangler queues pause-delivery [NAME]
```

```sh
yarn wrangler queues pause-delivery [NAME]
```

* `[NAME]` ` string ` required
The name of the queue

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues resume-delivery`

Resume message delivery for a queue

* [  npm ](#tab-panel-10534)
* [  pnpm ](#tab-panel-10535)
* [  yarn ](#tab-panel-10536)

```sh
npx wrangler queues resume-delivery [NAME]
```

```sh
pnpm wrangler queues resume-delivery [NAME]
```

```sh
yarn wrangler queues resume-delivery [NAME]
```

* `[NAME]` ` string ` required
The name of the queue

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues purge`

Purge messages from a queue

* [  npm ](#tab-panel-10537)
* [  pnpm ](#tab-panel-10538)
* [  yarn ](#tab-panel-10539)

```sh
npx wrangler queues purge [NAME]
```

```sh
pnpm wrangler queues purge [NAME]
```

```sh
yarn wrangler queues purge [NAME]
```

* `[NAME]` ` string ` required
The name of the queue
* `--force` ` boolean `
Skip the confirmation dialog and forcefully purge the Queue

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues subscription create`

Create a new event subscription for a queue

* [  npm ](#tab-panel-10540)
* [  pnpm ](#tab-panel-10541)
* [  yarn ](#tab-panel-10542)

```sh
npx wrangler queues subscription create [QUEUE]
```

```sh
pnpm wrangler queues subscription create [QUEUE]
```

```sh
yarn wrangler queues subscription create [QUEUE]
```

* `[QUEUE]` ` string ` required
The name of the queue to create the subscription for
* `--source` ` string ` required
The event source type
* `--events` ` string ` required
Comma-separated list of event types to subscribe to
* `--name` ` string `
Name for the subscription (auto-generated if not provided)
* `--enabled` ` boolean ` default: true
Whether the subscription should be active
* `--model-name` ` string `
Workers AI model name (required for workersAi.model source)
* `--worker-name` ` string `
Worker name (required for workersBuilds.worker source)
* `--workflow-name` ` string `
Workflow name (required for workflows.workflow source)

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues subscription list`

List event subscriptions for a queue

* [  npm ](#tab-panel-10543)
* [  pnpm ](#tab-panel-10544)
* [  yarn ](#tab-panel-10545)

```sh
npx wrangler queues subscription list [QUEUE]
```

```sh
pnpm wrangler queues subscription list [QUEUE]
```

```sh
yarn wrangler queues subscription list [QUEUE]
```

* `[QUEUE]` ` string ` required
The name of the queue to list subscriptions for
* `--page` ` number ` default: 1
Page number for pagination
* `--per-page` ` number ` default: 20
Number of subscriptions per page
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues subscription get`

Get details about a specific event subscription

* [  npm ](#tab-panel-10546)
* [  pnpm ](#tab-panel-10547)
* [  yarn ](#tab-panel-10548)

```sh
npx wrangler queues subscription get [QUEUE]
```

```sh
pnpm wrangler queues subscription get [QUEUE]
```

```sh
yarn wrangler queues subscription get [QUEUE]
```

* `[QUEUE]` ` string ` required
The name of the queue
* `--id` ` string ` required
The ID of the subscription to retrieve
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues subscription delete`

Delete an event subscription from a queue

* [  npm ](#tab-panel-10549)
* [  pnpm ](#tab-panel-10550)
* [  yarn ](#tab-panel-10551)

```sh
npx wrangler queues subscription delete [QUEUE]
```

```sh
pnpm wrangler queues subscription delete [QUEUE]
```

```sh
yarn wrangler queues subscription delete [QUEUE]
```

* `[QUEUE]` ` string ` required
The name of the queue
* `--id` ` string ` required
The ID of the subscription to delete
* `--force` ` boolean ` alias: --y default: false
Skip confirmation

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `queues subscription update`

Update an existing event subscription

* [  npm ](#tab-panel-10552)
* [  pnpm ](#tab-panel-10553)
* [  yarn ](#tab-panel-10554)

```sh
npx wrangler queues subscription update [QUEUE]
```

```sh
pnpm wrangler queues subscription update [QUEUE]
```

```sh
yarn wrangler queues subscription update [QUEUE]
```

* `[QUEUE]` ` string ` required
The name of the queue
* `--id` ` string ` required
The ID of the subscription to update
* `--name` ` string `
New name for the subscription
* `--events` ` string `
Comma-separated list of event types to subscribe to
* `--enabled` ` boolean `
Whether the subscription should be active
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/queues/reference/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare Queues docs","description":"Wrangler CLI commands for creating, managing, and interacting with Cloudflare Queues.","url":"https://developers.cloudflare.com/queues/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
