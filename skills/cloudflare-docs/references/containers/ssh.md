---
title: SSH
description: Connect to running container instances with SSH.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/containers/ssh.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# SSH

Anyone with write access to a Container can SSH into it with Wrangler as long as SSH is enabled.

## Configure SSH

SSH can be configured in your [Container's configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#containers) with the `wrangler_ssh` and `authorized_keys` properties. Only the `ssh-ed25519` key type is supported.

The `wrangler_ssh.enabled` property only controls whether you can SSH into a Container through Wrangler. If `wrangler_ssh.enabled` is false but keys are still present in `authorized_keys`, the SSH service will still be started on the Container.

## Connect with Wrangler

To SSH into a Container with Wrangler, you must first enable Wrangler SSH. The following example shows a basic configuration:

* [  wrangler.jsonc ](#tab-panel-6452)
* [  wrangler.toml ](#tab-panel-6453)

JSONC

```

{

  "containers": [

    {

      // other options here...

      "wrangler_ssh": {

        "enabled": true

      },

      "authorized_keys": [

        {

          "name": "<NAME>",

          "public_key": "<YOUR_PUBLIC_KEY_HERE>"

        }

      ]

    }

  ]

}


```

Explain Code

TOML

```

[[containers]]

[containers.wrangler_ssh]

enabled = true


[[containers.authorized_keys]]

name = "<NAME>"

public_key = "<YOUR_PUBLIC_KEY_HERE>"


```

For more information on configuring SSH, refer to [Wrangler SSH configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#wrangler-ssh).

Find the instance ID for your Container by running [wrangler containers instances](https://developers.cloudflare.com/workers/wrangler/commands/containers/#containers-instances) or in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/containers). The instance you want to SSH into must be running. SSH will not start a stopped Container, and an active SSH connection alone will not keep a Container alive.

Once SSH is configured and the Container is running, open the SSH connection with:

Terminal window

```

wrangler containers ssh <INSTANCE_ID>


```

## Process visibility

Without the [containers\_pid\_namespace](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#use-an-isolated-pid-namespace-for-containers) compatibility flag, all processes inside the VM are visible when you connect to your Container through SSH. This flag is turned on by default for Workers with a [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) of `2026-04-01` or later.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/ssh/","name":"SSH"}}]}
```
