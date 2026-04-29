---
title: Get started
description: Create your first Workers VPC Service and connect a Worker to your private network.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

This guide will walk you through creating your first Workers VPC Service, allowing your Worker to access resources in your private network.

You will create a Workers application, create a Tunnel in your private network to connect it to Cloudflare, and then configure VPC Services for the services on your private network you want to access from Workers.

Note

Workers VPC is currently in beta. Features and APIs may change before general availability. While in beta, Workers VPC is available for free to all Workers plans.

## Prerequisites

Before you begin, ensure you have completed the following:

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

Additionally, you will need:

* Access to a private network (your local network, AWS VPC, Azure VNet, GCP VPC, or on-premise networks)
* The **Connectivity Directory Bind** role to bind to existing VPC Services from Workers.
* Or, the **Connectivity Directory Admin** role to create VPC Services, and bind to them from Workers.

## 1\. Create a new Worker project

Create a new Worker project using Wrangler:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- workers-vpc-app
```

```
yarn create cloudflare workers-vpc-app
```

```
pnpm create cloudflare@latest workers-vpc-app
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Navigate to your project directory:

Terminal window

```

cd workers-vpc-app


```

## 2\. Set up Cloudflare Tunnel

A Cloudflare Tunnel creates a secure connection from your private network to Cloudflare. This tunnel will allow Workers to securely access your private resources. You can create the tunnel on a virtual machine or container in your external cloud, or even on your local desktop for the sake of this tutorial.

1. Navigate to the [Workers VPC dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/vpc/tunnels) and select the **Tunnels** tab.
2. Select **Create** to create a new tunnel.
3. Enter a name for your tunnel (for example, `workers-vpc-tunnel`) and select **Save tunnel**.
4. Choose your operating system and architecture. The dashboard will provide specific installation instructions for your environment.
5. Follow the provided commands to download and install `cloudflared`, and execute the service installation command with your unique token.

The dashboard will confirm when your tunnel is successfully connected.

### Configuring your private network for Cloudflare Tunnel

Once your tunnel is connected, you will need to ensure it can access the services that you want your Workers to have access to. The tunnel should be installed on a machine that can reach the internal resources you want to expose to Workers VPC. In external clouds, this may mean configuring Access-Control-Lists, Security Groups, or VPC Firewall Rules to ensure that the tunnel can access the desired services.

Note

This guide provides a quick setup for Workers VPC.

For comprehensive tunnel configuration, monitoring, and management, refer to the [full Cloudflare Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

## 3\. Create a VPC Service

Now that your tunnel is running, create a VPC Service that Workers can use to access your internal resources:

* [ Dashboard ](#tab-panel-8434)
* [ Wrangler CLI ](#tab-panel-8435)

1. Navigate to the [Workers VPC dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/vpc) and select the **VPC Services** tab.
2. Select **Create** to create a new VPC Service.
3. Enter a **Service name** for your VPC Service (for example, `my-private-api`).
4. Select your tunnel from the **Tunnel** dropdown, or select **Create Tunnel** if you need to create a new one.
5. Enter the **Host or IP address** of your internal service (for example, `localhost`, `internal-api.company.local`, or `10.0.1.50`).
6. Configure **Ports**. Select either:  
   * **Use default ports** for standard HTTP (80) and HTTPS (443)  
   * **Provide port values** to specify custom HTTP and HTTPS ports
7. Configure **DNS Resolver**. Select either:  
   * **Use tunnel as resolver** to use the tunnel's built-in DNS resolution  
   * **Custom resolver** and enter your DNS resolver IP (for example, `8.8.8.8`)
8. Select **Create service** to create your VPC Service.

The dashboard will display your new VPC Service with a unique Service ID. Save this Service ID for the next step.

Terminal window

```

npx wrangler vpc service create my-private-api \

  --type http \

  --tunnel-id <YOUR_TUNNEL_ID> \

  --hostname <YOUR_HOSTNAME>


```

Replace:

* `<YOUR_TUNNEL_ID>` with your tunnel ID from step 2
* `<YOUR_HOSTNAME>` with your internal service hostname (for example, `internal-api.company.local`)

You can also:

* Create services using IP addresses by replacing `--hostname <YOUR_HOSTNAME>` with `--ipv4 <YOUR_IPV4_ADDRESS>` (for example, `--ipv4 10.0.1.50`), `--ipv6 <YOUR_IPV6_ADDRESS>` (for example, `--ipv6 fe80::1`), or both for dual-stack configuration (`--ipv4 10.0.1.50 --ipv6 fe80::1`)
* Specify custom ports by adding `--http-port <PORT>` and/or `--https-port <PORT>` (for example, `--http-port 8080 --https-port 8443`)

The command will return a service ID. Save this for the next step.

If you encounter permission errors, refer to [Required roles](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#required-roles).

## 4\. Configure your Worker

Add the VPC Service binding to your Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-8436)
* [  wrangler.toml ](#tab-panel-8437)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "workers-vpc-app",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-04-29",

  "vpc_services": [

    {

      "binding": "VPC_SERVICE",

      "service_id": "<YOUR_SERVICE_ID>"

    }

  ]

}


```

Explain Code

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "workers-vpc-app"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-04-29"


[[vpc_services]]

binding = "VPC_SERVICE"

service_id = "<YOUR_SERVICE_ID>"


```

Replace `<YOUR_SERVICE_ID>` with the service ID from step 3.

## 5\. Write your Worker code

Update your Worker to use the VPC Service binding. The following example:

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const url = new URL(request.url);


    // This is a simple proxy scenario.

    // In this case, you will need to replace the URL with the proper protocol (http vs. https), hostname and port of the service.

    // For example, this could be "http://localhost:1111", "http://192.0.0.1:3000", "https://my-internal-api.example.com"

    const targetUrl = new URL(`http://<ENTER_SERVICE_HOST>:<ENTER_SERVICE_PORT>${url.pathname}${url.search}`);


    // Create new request with the target URL but preserve all other properties

    const proxyRequest = new Request(targetUrl, {

      method: request.method,

      headers: request.headers,

      body: request.body,

    });


    const response = await env.VPC_SERVICE.fetch(proxyRequest);


    return response;

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

## 6\. Test locally

Test your Worker locally. You must use remote VPC Services, using either [Workers remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) as was configured in your `wrangler.jsonc` configuration file, or using `npx wrangler dev --remote`:

Terminal window

```

npx wrangler dev


```

Visit `http://localhost:8787` to test your Worker's connection to your private network.

## 7\. Deploy your Worker

Once testing is complete, deploy your Worker:

Terminal window

```

npx wrangler deploy


```

Your Worker is now deployed and can access your private network resources securely through the Cloudflare Tunnel. If you encounter permission errors, refer to [Required roles](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#required-roles).

## Next steps

* Explore [configuration options](https://developers.cloudflare.com/workers-vpc/configuration/) for advanced setups
* Set up [high availability tunnels](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/hardware-requirements/) for production
* View [platform-specific guides](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/) for AWS, Azure, GCP, and Kubernetes
* Check out [examples](https://developers.cloudflare.com/workers-vpc/examples/) for common use cases

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-vpc/","name":"Workers VPC"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-vpc/get-started/","name":"Get started"}}]}
```
