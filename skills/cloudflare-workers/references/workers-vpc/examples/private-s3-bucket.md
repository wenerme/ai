---
description: Use Workers VPC to read objects from a private S3-compatible bucket behind Cloudflare Tunnel.
title: Access a private S3 bucket
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt
> Use this file to discover all available pages before exploring further.

#  Access a private S3 bucket

Last updated Apr 22, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers-vpc/examples/private-s3-bucket/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This example demonstrates how to access a private S3 bucket that is not exposed to the public internet. In this guide, we will configure a Workers VPC Service for an internal S3-compatible storage service, create a Worker that makes requests to that bucket, and deploy the Worker to validate our changes.

## Prerequisites

* A private S3-compatible storage service running in your VPC/virtual network (such as AWS S3 VPC endpoint, MinIO, or similar)
* A virtual machine/EC2 instance running in the same VPC as your S3 VPC endpoint
* Workers account with Workers VPC access

## 1\. Set up Cloudflare Tunnel

A Cloudflare Tunnel creates a secure connection from your private network to Cloudflare. This tunnel will allow Workers to securely access your private resources.

1. Navigate to the [Workers VPC dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/vpc/tunnels) and select the **Tunnels** tab.
2. Select **Create** to create a new tunnel.
3. Enter a name for your tunnel (for example, `s3-tunnel`) and select **Save tunnel**.
4. Choose your operating system and architecture. The dashboard will provide specific installation instructions for your environment.
5. Follow the provided commands to download and install `cloudflared` on your VM, and execute the service installation command with your unique token.

The dashboard will confirm when your tunnel is successfully connected. Note the tunnel ID for the next step.

## 2\. Create the Workers VPC Service

First, create a Workers VPC Service for your internal S3 storage:

```bash
npx wrangler vpc service create s3-storage \
  --type http \
  --tunnel-id <YOUR_TUNNEL_ID> \
  --hostname s3.us-west-2.amazonaws.com
```

You can also create a Workers VPC Service using an IP address (for example, if using MinIO):

```bash
npx wrangler vpc service create s3-storage \
  --type http \
  --tunnel-id <YOUR_TUNNEL_ID> \
  --ipv4 10.0.1.60 \
  --http-port 9000
```

Note the service ID returned for the next step.

## 3\. Configure S3 bucket policy

Configure your S3 bucket to allow anonymous access from your VPC endpoint. This works for unencrypted S3 objects:

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "AllowAnonymousAccessFromVPCE",
			"Effect": "Allow",
			"Principal": "*",
			"Action": ["s3:GetObject", "s3:ListBucket"],
			"Resource": [
				"arn:aws:s3:::your-bucket-name",
				"arn:aws:s3:::your-bucket-name/*"
			],
			"Condition": {
				"StringEquals": {
					"aws:sourceVpce": "vpce-your-endpoint-id"
				}
			}
		}
	]
}
```

### Testing S3 access directly

You can test S3 access directly from the VM where your Cloudflare Tunnel is running to verify the bucket policy is working correctly. These commands should work without any AWS credentials:

```bash
# Test listing bucket contents
curl -i https://s3.us-west-2.amazonaws.com/your-bucket-name/

# Test downloading a specific file
curl -i https://your-bucket-name.s3.us-west-2.amazonaws.com/test-file.txt
```

## 4\. Configure your Worker

Update your Wrangler configuration file:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "private-s3-gateway",
	"main": "src/index.js",
	// Set this to today's date
	"compatibility_date": "2026-07-21",
	"vpc_services": [
		{
			"binding": "S3_STORAGE",
			"service_id": "<YOUR_SERVICE_ID>"
		}
	]
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "private-s3-gateway"
main = "src/index.js"
# Set this to today's date
compatibility_date = "2026-07-21"

[[vpc_services]]
binding = "S3_STORAGE"
service_id = "<YOUR_SERVICE_ID>"
```

## 5\. Implement the Worker

In your Workers code, use the Workers VPC Service binding in order to send requests to the service:

```js
export default {
	async fetch(request, env, ctx) {
		try {
			// Fetch a file from the private S3 bucket via VPC endpoint
			const response = await env.S3_STORAGE.fetch("https://s3.us-west-2.amazonaws.com/my-bucket/data.json");

			// Use the response from S3 to perform more logic in Workers, before returning the final response
			return response;
		} catch (error) {
			return new Response("Storage unavailable", { status: 503 });
		}
	},
};
```

This guide demonstrates how you could access private object storage from your Workers. You could use Workers VPC Services to fetch files directly and manipulate the responses to enable you to build more full-stack and backend functionality on Workers.

## 6\. Deploy and test

Now, you can deploy and test your Worker that you have created:

```bash
npx wrangler deploy
```

```bash
# Test GET request
curl https://private-s3-gateway.workers.dev
```

## Next steps

* Add [authentication and authorization](https://developers.cloudflare.com/workers/examples/auth-with-headers/)
* Implement [rate limiting](https://developers.cloudflare.com/durable-objects/api/)
* Set up [monitoring and alerting](https://developers.cloudflare.com/analytics/analytics-engine/)
* Explore [other examples](https://developers.cloudflare.com/workers-vpc/examples/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-vpc/examples/private-s3-bucket/#page","headline":"Access a private S3 bucket · Cloudflare Workers VPC","description":"Use Workers VPC to read objects from a private S3-compatible bucket behind Cloudflare Tunnel.","url":"https://developers.cloudflare.com/workers-vpc/examples/private-s3-bucket/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
