---
title: Wrangler commands
description: Wrangler CLI commands for creating, managing, and interacting with Cloudflare Queues.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Wrangler commands

Queues Wrangler commands use REST APIs to interact with the control plane. This page lists the Wrangler commands for Queues.

## `queues list`

List queues

* [  npm ](#tab-panel-8163)
* [  pnpm ](#tab-panel-8164)
* [  yarn ](#tab-panel-8165)

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

* [  npm ](#tab-panel-8166)
* [  pnpm ](#tab-panel-8167)
* [  yarn ](#tab-panel-8168)

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

* [  npm ](#tab-panel-8169)
* [  pnpm ](#tab-panel-8170)
* [  yarn ](#tab-panel-8171)

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

* [  npm ](#tab-panel-8172)
* [  pnpm ](#tab-panel-8173)
* [  yarn ](#tab-panel-8174)

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

* [  npm ](#tab-panel-8175)
* [  pnpm ](#tab-panel-8176)
* [  yarn ](#tab-panel-8177)

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

* [  npm ](#tab-panel-8178)
* [  pnpm ](#tab-panel-8179)
* [  yarn ](#tab-panel-8180)

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

* [  npm ](#tab-panel-8181)
* [  pnpm ](#tab-panel-8182)
* [  yarn ](#tab-panel-8183)

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

## `queues consumer http add`

Add a Queue HTTP Pull Consumer

* [  npm ](#tab-panel-8184)
* [  pnpm ](#tab-panel-8185)
* [  yarn ](#tab-panel-8186)

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

* [  npm ](#tab-panel-8187)
* [  pnpm ](#tab-panel-8188)
* [  yarn ](#tab-panel-8189)

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

## `queues consumer worker add`

Add a Queue Worker Consumer

* [  npm ](#tab-panel-8190)
* [  pnpm ](#tab-panel-8191)
* [  yarn ](#tab-panel-8192)

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

* [  npm ](#tab-panel-8193)
* [  pnpm ](#tab-panel-8194)
* [  yarn ](#tab-panel-8195)

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

## `queues pause-delivery`

Pause message delivery for a queue

* [  npm ](#tab-panel-8196)
* [  pnpm ](#tab-panel-8197)
* [  yarn ](#tab-panel-8198)

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

* [  npm ](#tab-panel-8199)
* [  pnpm ](#tab-panel-8200)
* [  yarn ](#tab-panel-8201)

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

* [  npm ](#tab-panel-8202)
* [  pnpm ](#tab-panel-8203)
* [  yarn ](#tab-panel-8204)

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

* [  npm ](#tab-panel-8205)
* [  pnpm ](#tab-panel-8206)
* [  yarn ](#tab-panel-8207)

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

* [  npm ](#tab-panel-8208)
* [  pnpm ](#tab-panel-8209)
* [  yarn ](#tab-panel-8210)

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

* [  npm ](#tab-panel-8211)
* [  pnpm ](#tab-panel-8212)
* [  yarn ](#tab-panel-8213)

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

* [  npm ](#tab-panel-8214)
* [  pnpm ](#tab-panel-8215)
* [  yarn ](#tab-panel-8216)

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

* [  npm ](#tab-panel-8217)
* [  pnpm ](#tab-panel-8218)
* [  yarn ](#tab-panel-8219)

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
