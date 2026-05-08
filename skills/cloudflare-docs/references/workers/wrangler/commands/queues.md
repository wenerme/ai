---
title: Queues
description: Wrangler commands for managing Workers Queues configurations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Queues

Manage your Workers [Queues](https://developers.cloudflare.com/queues/) configurations using Wrangler.

## `queues list`

List queues

* [  npm ](#tab-panel-10050)
* [  pnpm ](#tab-panel-10051)
* [  yarn ](#tab-panel-10052)

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

## `queues create`

Create a queue

* [  npm ](#tab-panel-10053)
* [  pnpm ](#tab-panel-10054)
* [  yarn ](#tab-panel-10055)

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

## `queues update`

Update a queue

* [  npm ](#tab-panel-10056)
* [  pnpm ](#tab-panel-10057)
* [  yarn ](#tab-panel-10058)

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

## `queues delete`

Delete a queue

* [  npm ](#tab-panel-10059)
* [  pnpm ](#tab-panel-10060)
* [  yarn ](#tab-panel-10061)

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

## `queues info`

Get queue information

* [  npm ](#tab-panel-10062)
* [  pnpm ](#tab-panel-10063)
* [  yarn ](#tab-panel-10064)

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

## `queues consumer add`

Add a Queue Worker Consumer

* [  npm ](#tab-panel-10065)
* [  pnpm ](#tab-panel-10066)
* [  yarn ](#tab-panel-10067)

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

## `queues consumer remove`

Remove a Queue Worker Consumer

* [  npm ](#tab-panel-10068)
* [  pnpm ](#tab-panel-10069)
* [  yarn ](#tab-panel-10070)

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

## `queues consumer list`

List consumers for a queue

* [  npm ](#tab-panel-10071)
* [  pnpm ](#tab-panel-10072)
* [  yarn ](#tab-panel-10073)

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

## `queues consumer http add`

Add a Queue HTTP Pull Consumer

* [  npm ](#tab-panel-10074)
* [  pnpm ](#tab-panel-10075)
* [  yarn ](#tab-panel-10076)

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

## `queues consumer http remove`

Remove a Queue HTTP Pull Consumer

* [  npm ](#tab-panel-10077)
* [  pnpm ](#tab-panel-10078)
* [  yarn ](#tab-panel-10079)

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

## `queues consumer http list`

List HTTP pull consumers for a queue

* [  npm ](#tab-panel-10080)
* [  pnpm ](#tab-panel-10081)
* [  yarn ](#tab-panel-10082)

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

## `queues consumer worker add`

Add a Queue Worker Consumer

* [  npm ](#tab-panel-10083)
* [  pnpm ](#tab-panel-10084)
* [  yarn ](#tab-panel-10085)

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

## `queues consumer worker remove`

Remove a Queue Worker Consumer

* [  npm ](#tab-panel-10086)
* [  pnpm ](#tab-panel-10087)
* [  yarn ](#tab-panel-10088)

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

## `queues consumer worker list`

List worker consumers for a queue

* [  npm ](#tab-panel-10089)
* [  pnpm ](#tab-panel-10090)
* [  yarn ](#tab-panel-10091)

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

## `queues pause-delivery`

Pause message delivery for a queue

* [  npm ](#tab-panel-10092)
* [  pnpm ](#tab-panel-10093)
* [  yarn ](#tab-panel-10094)

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

## `queues resume-delivery`

Resume message delivery for a queue

* [  npm ](#tab-panel-10095)
* [  pnpm ](#tab-panel-10096)
* [  yarn ](#tab-panel-10097)

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

## `queues purge`

Purge messages from a queue

* [  npm ](#tab-panel-10098)
* [  pnpm ](#tab-panel-10099)
* [  yarn ](#tab-panel-10100)

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

## `queues subscription create`

Create a new event subscription for a queue

* [  npm ](#tab-panel-10101)
* [  pnpm ](#tab-panel-10102)
* [  yarn ](#tab-panel-10103)

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

## `queues subscription list`

List event subscriptions for a queue

* [  npm ](#tab-panel-10104)
* [  pnpm ](#tab-panel-10105)
* [  yarn ](#tab-panel-10106)

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

## `queues subscription get`

Get details about a specific event subscription

* [  npm ](#tab-panel-10107)
* [  pnpm ](#tab-panel-10108)
* [  yarn ](#tab-panel-10109)

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

## `queues subscription delete`

Delete an event subscription from a queue

* [  npm ](#tab-panel-10110)
* [  pnpm ](#tab-panel-10111)
* [  yarn ](#tab-panel-10112)

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

## `queues subscription update`

Update an existing event subscription

* [  npm ](#tab-panel-10113)
* [  pnpm ](#tab-panel-10114)
* [  yarn ](#tab-panel-10115)

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/queues/","name":"Queues"}}]}
```
