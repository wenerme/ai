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

* [  npm ](#tab-panel-10013)
* [  pnpm ](#tab-panel-10014)
* [  yarn ](#tab-panel-10015)

Terminal window

```
npx wrangler queues list
```

Terminal window

```
pnpm wrangler queues list
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues create`

Create a queue

* [  npm ](#tab-panel-10016)
* [  pnpm ](#tab-panel-10017)
* [  yarn ](#tab-panel-10018)

Terminal window

```
npx wrangler queues create [NAME]
```

Terminal window

```
pnpm wrangler queues create [NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues update`

Update a queue

* [  npm ](#tab-panel-10019)
* [  pnpm ](#tab-panel-10020)
* [  yarn ](#tab-panel-10021)

Terminal window

```
npx wrangler queues update [NAME]
```

Terminal window

```
pnpm wrangler queues update [NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues delete`

Delete a queue

* [  npm ](#tab-panel-10022)
* [  pnpm ](#tab-panel-10023)
* [  yarn ](#tab-panel-10024)

Terminal window

```
npx wrangler queues delete [NAME]
```

Terminal window

```
pnpm wrangler queues delete [NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues info`

Get queue information

* [  npm ](#tab-panel-10025)
* [  pnpm ](#tab-panel-10026)
* [  yarn ](#tab-panel-10027)

Terminal window

```
npx wrangler queues info [NAME]
```

Terminal window

```
pnpm wrangler queues info [NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues consumer add`

Add a Queue Worker Consumer

* [  npm ](#tab-panel-10028)
* [  pnpm ](#tab-panel-10029)
* [  yarn ](#tab-panel-10030)

Terminal window

```
npx wrangler queues consumer add [QUEUE-NAME] [SCRIPT-NAME]
```

Terminal window

```
pnpm wrangler queues consumer add [QUEUE-NAME] [SCRIPT-NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues consumer remove`

Remove a Queue Worker Consumer

* [  npm ](#tab-panel-10031)
* [  pnpm ](#tab-panel-10032)
* [  yarn ](#tab-panel-10033)

Terminal window

```
npx wrangler queues consumer remove [QUEUE-NAME] [SCRIPT-NAME]
```

Terminal window

```
pnpm wrangler queues consumer remove [QUEUE-NAME] [SCRIPT-NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues consumer list`

List consumers for a queue

* [  npm ](#tab-panel-10034)
* [  pnpm ](#tab-panel-10035)
* [  yarn ](#tab-panel-10036)

Terminal window

```
npx wrangler queues consumer list [QUEUE-NAME]
```

Terminal window

```
pnpm wrangler queues consumer list [QUEUE-NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues consumer http add`

Add a Queue HTTP Pull Consumer

* [  npm ](#tab-panel-10037)
* [  pnpm ](#tab-panel-10038)
* [  yarn ](#tab-panel-10039)

Terminal window

```
npx wrangler queues consumer http add [QUEUE-NAME]
```

Terminal window

```
pnpm wrangler queues consumer http add [QUEUE-NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues consumer http remove`

Remove a Queue HTTP Pull Consumer

* [  npm ](#tab-panel-10040)
* [  pnpm ](#tab-panel-10041)
* [  yarn ](#tab-panel-10042)

Terminal window

```
npx wrangler queues consumer http remove [QUEUE-NAME]
```

Terminal window

```
pnpm wrangler queues consumer http remove [QUEUE-NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues consumer http list`

List HTTP pull consumers for a queue

* [  npm ](#tab-panel-10043)
* [  pnpm ](#tab-panel-10044)
* [  yarn ](#tab-panel-10045)

Terminal window

```
npx wrangler queues consumer http list [QUEUE-NAME]
```

Terminal window

```
pnpm wrangler queues consumer http list [QUEUE-NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues consumer worker add`

Add a Queue Worker Consumer

* [  npm ](#tab-panel-10046)
* [  pnpm ](#tab-panel-10047)
* [  yarn ](#tab-panel-10048)

Terminal window

```
npx wrangler queues consumer worker add [QUEUE-NAME] [SCRIPT-NAME]
```

Terminal window

```
pnpm wrangler queues consumer worker add [QUEUE-NAME] [SCRIPT-NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues consumer worker remove`

Remove a Queue Worker Consumer

* [  npm ](#tab-panel-10049)
* [  pnpm ](#tab-panel-10050)
* [  yarn ](#tab-panel-10051)

Terminal window

```
npx wrangler queues consumer worker remove [QUEUE-NAME] [SCRIPT-NAME]
```

Terminal window

```
pnpm wrangler queues consumer worker remove [QUEUE-NAME] [SCRIPT-NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues consumer worker list`

List worker consumers for a queue

* [  npm ](#tab-panel-10052)
* [  pnpm ](#tab-panel-10053)
* [  yarn ](#tab-panel-10054)

Terminal window

```
npx wrangler queues consumer worker list [QUEUE-NAME]
```

Terminal window

```
pnpm wrangler queues consumer worker list [QUEUE-NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues pause-delivery`

Pause message delivery for a queue

* [  npm ](#tab-panel-10055)
* [  pnpm ](#tab-panel-10056)
* [  yarn ](#tab-panel-10057)

Terminal window

```
npx wrangler queues pause-delivery [NAME]
```

Terminal window

```
pnpm wrangler queues pause-delivery [NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues resume-delivery`

Resume message delivery for a queue

* [  npm ](#tab-panel-10058)
* [  pnpm ](#tab-panel-10059)
* [  yarn ](#tab-panel-10060)

Terminal window

```
npx wrangler queues resume-delivery [NAME]
```

Terminal window

```
pnpm wrangler queues resume-delivery [NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues purge`

Purge messages from a queue

* [  npm ](#tab-panel-10061)
* [  pnpm ](#tab-panel-10062)
* [  yarn ](#tab-panel-10063)

Terminal window

```
npx wrangler queues purge [NAME]
```

Terminal window

```
pnpm wrangler queues purge [NAME]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues subscription create`

Create a new event subscription for a queue

* [  npm ](#tab-panel-10064)
* [  pnpm ](#tab-panel-10065)
* [  yarn ](#tab-panel-10066)

Terminal window

```
npx wrangler queues subscription create [QUEUE]
```

Terminal window

```
pnpm wrangler queues subscription create [QUEUE]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues subscription list`

List event subscriptions for a queue

* [  npm ](#tab-panel-10067)
* [  pnpm ](#tab-panel-10068)
* [  yarn ](#tab-panel-10069)

Terminal window

```
npx wrangler queues subscription list [QUEUE]
```

Terminal window

```
pnpm wrangler queues subscription list [QUEUE]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues subscription get`

Get details about a specific event subscription

* [  npm ](#tab-panel-10070)
* [  pnpm ](#tab-panel-10071)
* [  yarn ](#tab-panel-10072)

Terminal window

```
npx wrangler queues subscription get [QUEUE]
```

Terminal window

```
pnpm wrangler queues subscription get [QUEUE]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues subscription delete`

Delete an event subscription from a queue

* [  npm ](#tab-panel-10073)
* [  pnpm ](#tab-panel-10074)
* [  yarn ](#tab-panel-10075)

Terminal window

```
npx wrangler queues subscription delete [QUEUE]
```

Terminal window

```
pnpm wrangler queues subscription delete [QUEUE]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `queues subscription update`

Update an existing event subscription

* [  npm ](#tab-panel-10076)
* [  pnpm ](#tab-panel-10077)
* [  yarn ](#tab-panel-10078)

Terminal window

```
npx wrangler queues subscription update [QUEUE]
```

Terminal window

```
pnpm wrangler queues subscription update [QUEUE]
```

Terminal window

```
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/queues/reference/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare Queues docs","description":"Wrangler CLI commands for creating, managing, and interacting with Cloudflare Queues.","url":"https://developers.cloudflare.com/queues/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
