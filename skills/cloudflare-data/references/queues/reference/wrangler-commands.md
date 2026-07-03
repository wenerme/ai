---
title: Wrangler commands
description: Wrangler CLI commands for creating, managing, and interacting with Cloudflare Queues.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Wrangler commands

Queues Wrangler commands use REST APIs to interact with the control plane. This page lists the Wrangler commands for Queues.

## `queues list`

List queues

* [  npm ](#tab-panel-10083)
* [  pnpm ](#tab-panel-10084)
* [  yarn ](#tab-panel-10085)

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

* [  npm ](#tab-panel-10086)
* [  pnpm ](#tab-panel-10087)
* [  yarn ](#tab-panel-10088)

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

* [  npm ](#tab-panel-10089)
* [  pnpm ](#tab-panel-10090)
* [  yarn ](#tab-panel-10091)

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

* [  npm ](#tab-panel-10092)
* [  pnpm ](#tab-panel-10093)
* [  yarn ](#tab-panel-10094)

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

* [  npm ](#tab-panel-10095)
* [  pnpm ](#tab-panel-10096)
* [  yarn ](#tab-panel-10097)

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

* [  npm ](#tab-panel-10098)
* [  pnpm ](#tab-panel-10099)
* [  yarn ](#tab-panel-10100)

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

* [  npm ](#tab-panel-10101)
* [  pnpm ](#tab-panel-10102)
* [  yarn ](#tab-panel-10103)

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

* [  npm ](#tab-panel-10104)
* [  pnpm ](#tab-panel-10105)
* [  yarn ](#tab-panel-10106)

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

* [  npm ](#tab-panel-10107)
* [  pnpm ](#tab-panel-10108)
* [  yarn ](#tab-panel-10109)

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

* [  npm ](#tab-panel-10110)
* [  pnpm ](#tab-panel-10111)
* [  yarn ](#tab-panel-10112)

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

* [  npm ](#tab-panel-10113)
* [  pnpm ](#tab-panel-10114)
* [  yarn ](#tab-panel-10115)

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

* [  npm ](#tab-panel-10116)
* [  pnpm ](#tab-panel-10117)
* [  yarn ](#tab-panel-10118)

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

* [  npm ](#tab-panel-10119)
* [  pnpm ](#tab-panel-10120)
* [  yarn ](#tab-panel-10121)

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

* [  npm ](#tab-panel-10122)
* [  pnpm ](#tab-panel-10123)
* [  yarn ](#tab-panel-10124)

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

* [  npm ](#tab-panel-10125)
* [  pnpm ](#tab-panel-10126)
* [  yarn ](#tab-panel-10127)

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

* [  npm ](#tab-panel-10128)
* [  pnpm ](#tab-panel-10129)
* [  yarn ](#tab-panel-10130)

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

* [  npm ](#tab-panel-10131)
* [  pnpm ](#tab-panel-10132)
* [  yarn ](#tab-panel-10133)

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

* [  npm ](#tab-panel-10134)
* [  pnpm ](#tab-panel-10135)
* [  yarn ](#tab-panel-10136)

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

* [  npm ](#tab-panel-10137)
* [  pnpm ](#tab-panel-10138)
* [  yarn ](#tab-panel-10139)

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

* [  npm ](#tab-panel-10140)
* [  pnpm ](#tab-panel-10141)
* [  yarn ](#tab-panel-10142)

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

* [  npm ](#tab-panel-10143)
* [  pnpm ](#tab-panel-10144)
* [  yarn ](#tab-panel-10145)

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

* [  npm ](#tab-panel-10146)
* [  pnpm ](#tab-panel-10147)
* [  yarn ](#tab-panel-10148)

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
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/queues/reference/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare Queues docs","description":"Wrangler CLI commands for creating, managing, and interacting with Cloudflare Queues.","url":"https://developers.cloudflare.com/queues/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
