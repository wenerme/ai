---
description: Update cloudflared to the latest version.
title: Update cloudflared
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt
> Use this file to discover all available pages before exploring further.

# Update cloudflared

Last updated May 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/tunnel/downloads/update-cloudflared/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Updates will cause `cloudflared` to restart which will impact traffic currently being served. You can perform zero-downtime upgrades by using Cloudflare's [Load Balancer product](#update-with-cloudflare-load-balancer) or by using [multiple cloudflared instances](#update-with-multiple-cloudflared-instances).

## Update the `cloudflared` service

Refer to the following commands to update `cloudflared` for a remotely-managed tunnel or a locally-managed tunnel. Locally-managed tunnels must be set up to [run as a service](https://developers.cloudflare.com/tunnel/advanced/local-management/as-a-service/) for the following commands to execute successfully.

Run the following command:

```powershell
cloudflared update
```

After running `cloudflared update` to update `cloudflared`, you must restart the service for it to take effect. Run:

```powershell
net start cloudflared
```

1. Update the `cloudflared` package:

```sh
brew upgrade cloudflared
```

1. Restart the service:

```sh
sudo launchctl stop com.cloudflare.cloudflared
sudo launchctl unload /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
sudo launchctl start com.cloudflare.cloudflared
```

**If installed via apt:**

1. Update the `cloudflared` package:

```sh
sudo apt-get update && sudo apt-get install --only-upgrade cloudflared
```

1. Restart the service:

```sh
sudo systemctl restart cloudflared.service
```

**If installed via `dpkg -i`:**

Use the following commands if you installed `cloudflared` using the `dpkg` package manager.

You can check if `cloudflared` was installed by a package manager by running `ls -la /usr/local/etc/cloudflared/` and looking for `.installedFromPackageManager` in the output.

1. Update the `cloudflared` package:

```sh
curl --location --output cloudflared.deb "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-$(dpkg --print-architecture).deb" && sudo dpkg -i cloudflared.deb
```

1. Restart the service:

```sh
sudo systemctl restart cloudflared.service
```

1. Update the `cloudflared` package:

```sh
sudo yum update cloudflared
```

1. Restart the service:

```sh
sudo systemctl restart cloudflared.service
```

**If you created a remotely-managed tunnel using the dashboard:**

1. In the Cloudflare dashboard, go to **Networking** \> **Tunnels**.
[Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Select your tunnel to open its detail page.
3. On the **Overview** tab, copy the Docker installation command. The copied command will contain your token.
4. Paste this command into a terminal window.

This command creates a new container from the latest `cloudflared` image. You can now delete the old container.

Caution

Cloudflare recommends creating remotely-managed tunnels when working with Docker.

**If you created a remotely or locally-managed tunnel using the API, run the following command:**

```sh
docker run --pull always cloudflare/cloudflared:latest tunnel --no-autoupdate run --token <TOKEN>
```

**If you created a locally-managed tunnel using the CLI:**

1. Mount your local `.cloudflared` directory into the Docker container using a volume.
2. Run the following command to update `cloudflared`:
```sh
docker run --pull always -v <PATH-TO-YOUR-LOCAL-CLOUDFLARED>:/home/nonroot/.cloudflared cloudflare/cloudflared:latest tunnel --no-autoupdate run <TUNNEL-ID>
```

If you installed `cloudflared` from GitHub-provided binaries or from source, run the following command:

```sh
cloudflared update
```

If you installed `cloudflared` with a package manager, you must update it using the same package manager.

You can check if `cloudflared` was installed by a package manager by running `ls -la /usr/local/etc/cloudflared/` and looking for `.installedFromPackageManager` in the output.

## Update with Cloudflare Load Balancer

You can update `cloudflared` without downtime by using Cloudflare's Load Balancer product with your Cloudflare Tunnel deployment.

1. Install a new instance of `cloudflared` and [create](https://developers.cloudflare.com/tunnel/setup/) a new Tunnel.
2. Configure the instance to point traffic to the same locally-available service as your current, active instance of `cloudflared`.
3. [Add the address](https://developers.cloudflare.com/tunnel/routing/#add-a-tunnel-to-a-load-balancer-pool) of the new instance of `cloudflared` into your Load Balancer pool as priority 2.
4. Swap the priority such that the new instance is now priority 1 and monitor to confirm traffic is being served.
5. Once confirmed, you can remove the older version from the Load Balancer pool.

## Update with multiple `cloudflared` instances

If you are not using Cloudflare's Load Balancer, you can use multiple instances of `cloudflared` to update without the risk of downtime.

1. Install a new instance of `cloudflared` and [create](https://developers.cloudflare.com/tunnel/setup/) a new Tunnel.
2. Configure the instance to point traffic to the same locally-available service as your current, active instance of `cloudflared`.
3. In the Cloudflare DNS dashboard, [replace](https://developers.cloudflare.com/tunnel/routing/#dns-records) the address of the current instance of `cloudflared` with the address of the new instance. Save the record.
4. Remove the now-inactive instance of `cloudflared`.

Traffic handling

When the old replica is stopped, it will drop long-lived HTTP requests (for example, WebSocket) and TCP connections (for example, SSH). UDP flows will also be dropped, as they are modeled based on timeouts. When the new replica connects, it will handle all new traffic, including new HTTP requests, TCP connections, and UDP flows.

### Run multiple instances in Windows

Windows systems require services to have a unique name and display name. You can run multiple instances of `cloudflared` by creating `cloudflared` services with unique names.

1. Install and configure `cloudflared`.
2. Next, create a service with a unique name and point to the `cloudflared` executable and configuration file.

```powershell
sc.exe create <unique-name> binPath='<path-to-exe>' --config '<path-to-config>' displayname="Unique Name"
```

1. Proceed to create additional services with unique names.
2. You can now start each unique service.

```powershell
sc.exe start <unique-name>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/downloads/update-cloudflared/#page","headline":"Update cloudflared · Cloudflare Docs","description":"Update cloudflared to the latest version.","url":"https://developers.cloudflare.com/tunnel/downloads/update-cloudflared/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Docker"]}
```
