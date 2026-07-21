---
description: Wrangler commands for managing Workers Queues configurations.
title: Queues
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Queues

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/wrangler/commands/queues/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Manage your Workers [Queues](https://developers.cloudflare.com/queues/) configurations using Wrangler.

## `queues list`

List queues

 npm  yarn  pnpm

```
npx wrangler queues list
```

```
yarn wrangler queues list
```

```
pnpm wrangler queues list
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

 npm  yarn  pnpm

```
npx wrangler queues create [NAME]
```

```
yarn wrangler queues create [NAME]
```

```
pnpm wrangler queues create [NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues update [NAME]
```

```
yarn wrangler queues update [NAME]
```

```
pnpm wrangler queues update [NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues delete [NAME]
```

```
yarn wrangler queues delete [NAME]
```

```
pnpm wrangler queues delete [NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues info [NAME]
```

```
yarn wrangler queues info [NAME]
```

```
pnpm wrangler queues info [NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues consumer add [QUEUE-NAME] [SCRIPT-NAME]
```

```
yarn wrangler queues consumer add [QUEUE-NAME] [SCRIPT-NAME]
```

```
pnpm wrangler queues consumer add [QUEUE-NAME] [SCRIPT-NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues consumer remove [QUEUE-NAME] [SCRIPT-NAME]
```

```
yarn wrangler queues consumer remove [QUEUE-NAME] [SCRIPT-NAME]
```

```
pnpm wrangler queues consumer remove [QUEUE-NAME] [SCRIPT-NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues consumer list [QUEUE-NAME]
```

```
yarn wrangler queues consumer list [QUEUE-NAME]
```

```
pnpm wrangler queues consumer list [QUEUE-NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues consumer http add [QUEUE-NAME]
```

```
yarn wrangler queues consumer http add [QUEUE-NAME]
```

```
pnpm wrangler queues consumer http add [QUEUE-NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues consumer http remove [QUEUE-NAME]
```

```
yarn wrangler queues consumer http remove [QUEUE-NAME]
```

```
pnpm wrangler queues consumer http remove [QUEUE-NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues consumer http list [QUEUE-NAME]
```

```
yarn wrangler queues consumer http list [QUEUE-NAME]
```

```
pnpm wrangler queues consumer http list [QUEUE-NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues consumer worker add [QUEUE-NAME] [SCRIPT-NAME]
```

```
yarn wrangler queues consumer worker add [QUEUE-NAME] [SCRIPT-NAME]
```

```
pnpm wrangler queues consumer worker add [QUEUE-NAME] [SCRIPT-NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues consumer worker remove [QUEUE-NAME] [SCRIPT-NAME]
```

```
yarn wrangler queues consumer worker remove [QUEUE-NAME] [SCRIPT-NAME]
```

```
pnpm wrangler queues consumer worker remove [QUEUE-NAME] [SCRIPT-NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues consumer worker list [QUEUE-NAME]
```

```
yarn wrangler queues consumer worker list [QUEUE-NAME]
```

```
pnpm wrangler queues consumer worker list [QUEUE-NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues pause-delivery [NAME]
```

```
yarn wrangler queues pause-delivery [NAME]
```

```
pnpm wrangler queues pause-delivery [NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues resume-delivery [NAME]
```

```
yarn wrangler queues resume-delivery [NAME]
```

```
pnpm wrangler queues resume-delivery [NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues purge [NAME]
```

```
yarn wrangler queues purge [NAME]
```

```
pnpm wrangler queues purge [NAME]
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

 npm  yarn  pnpm

```
npx wrangler queues subscription create [QUEUE]
```

```
yarn wrangler queues subscription create [QUEUE]
```

```
pnpm wrangler queues subscription create [QUEUE]
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

 npm  yarn  pnpm

```
npx wrangler queues subscription list [QUEUE]
```

```
yarn wrangler queues subscription list [QUEUE]
```

```
pnpm wrangler queues subscription list [QUEUE]
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

 npm  yarn  pnpm

```
npx wrangler queues subscription get [QUEUE]
```

```
yarn wrangler queues subscription get [QUEUE]
```

```
pnpm wrangler queues subscription get [QUEUE]
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

 npm  yarn  pnpm

```
npx wrangler queues subscription delete [QUEUE]
```

```
yarn wrangler queues subscription delete [QUEUE]
```

```
pnpm wrangler queues subscription delete [QUEUE]
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

 npm  yarn  pnpm

```
npx wrangler queues subscription update [QUEUE]
```

```
yarn wrangler queues subscription update [QUEUE]
```

```
pnpm wrangler queues subscription update [QUEUE]
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

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/queues/#page","headline":"Queues · Cloudflare Workers docs","description":"Wrangler commands for managing Workers Queues configurations.","url":"https://developers.cloudflare.com/workers/wrangler/commands/queues/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
