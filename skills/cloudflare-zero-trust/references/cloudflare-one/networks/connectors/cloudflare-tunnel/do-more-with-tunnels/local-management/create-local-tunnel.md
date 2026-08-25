---
description: Create a locally-managed tunnel in Zero Trust networking.
title: Create a locally-managed tunnel
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a locally-managed tunnel

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Follow this step-by-step guide to get your first tunnel up and running using the CLI.

Tip

If your server is behind a restrictive firewall, verify it can reach Cloudflare on port `7844` before proceeding. Refer to [Connectivity pre-checks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/).

## Prerequisites

Before you start, make sure you:

* [Add a website to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).
* [Change your domain nameservers to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/).

## 1\. Download and install `cloudflared`

1. Download `cloudflared` on your machine. Visit the [downloads](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) page to find the right package for your OS.
2. Rename the executable to `cloudflared.exe`
3. In PowerShell, change directory to your Downloads folder and run `.\cloudflared.exe --version`. It should output the version of `cloudflared`. Note that `cloudflared.exe` could be `cloudflared-windows-amd64.exe` or `cloudflared-windows-386.exe` if you have not renamed it.
```powershell
PS C:\Users\Administrator\Downloads\cloudflared-stable-windows-amd64> .\cloudflared.exe --version
```

To download and install `cloudflared`:

```sh
brew install cloudflared
```

Alternatively, you can [download the latest Darwin amd64 release](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) directly.

**Debian and Ubuntu APT**

Use the apt package manager to install `cloudflared` on compatible machines.

1. Add Cloudflare's package signing key:

```sh
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
```

1. Add Cloudflare's apt repo to your apt repositories:

```sh
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
```

1. Update repositories and install cloudflared:

```sh
sudo apt-get update && sudo apt-get install cloudflared
```

**RHEL RPM**

Use the rpm package manager to install `cloudflared` on compatible machines.

1. Add Cloudflare's repository:
```sh
curl -fsSl https://pkg.cloudflare.com/cloudflared.repo | sudo tee /etc/yum.repos.d/cloudflared.repo
```
2. Update repositories and install cloudflared:
```sh
sudo yum update && sudo yum install cloudflared
```

**Arch Linux**

`cloudflared` is in the Arch Linux [community repository ↗](https://wiki.archlinux.org/title/official%5Frepositories#community). Use `pacman` to install `cloudflared` on compatible machines.

```sh
pacman -Syu cloudflared
```

**Other**

Alternatively you can download the `cloudflared` binary or the linux packages to your machine and install manually. Visit the [downloads](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) page to find the right package for your OS.

To build the latest version of `cloudflared` from source:

```sh
git clone https://github.com/cloudflare/cloudflared.git
cd cloudflared
make cloudflared
go install github.com/cloudflare/cloudflared/cmd/cloudflared
```

Depending on where you installed `cloudflared`, you can move it to a known path as well.

```sh
mv /root/cloudflared/cloudflared /usr/bin/cloudflared
```

## 2\. Authenticate `cloudflared`

```sh
cloudflared tunnel login
```

Running this command will:

* Open a browser window and prompt you to log in to your Cloudflare account. After logging in to your account, select your hostname.
* Generate an account certificate, the [cert.pem file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#certpem), in the [default cloudflared directory](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#default-cloudflared-directory).

## 3\. Create a tunnel and give it a name

```sh
cloudflared tunnel create <NAME>
```

Running this command will:

* Create a tunnel by establishing a persistent relationship between the name you provide and a UUID for your tunnel. At this point, no connection is active within the tunnel yet.
* Generate a [tunnel credentials file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#credentials-file) in the [default cloudflared directory](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#default-cloudflared-directory).
* Create a subdomain of `.cfargotunnel.com`.

From the output of the command, take note of the tunnel's UUID and the path to your tunnel's credentials file.

Confirm that the tunnel has been successfully created by running:

```sh
cloudflared tunnel list
```

## 4\. Create a configuration file

1. In your `.cloudflared` directory, create a [config.yml file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file/) using any text editor. This file will configure the tunnel to route traffic from a given origin to the hostname of your choice.
2. Add the following fields to the file:
If you are connecting a [published application](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/):
```yml
url: http://localhost:8000
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/<Tunnel-UUID>.json
```
If you are connecting a [private network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/):
```yml
tunnel: <Tunnel-UUID>
credentials-file: /root/.cloudflared/<Tunnel-UUID>.json
warp-routing:
  enabled: true
```
3. Confirm that the configuration file has been successfully created by running:
```sh
cat config.yml
```

## 5\. Start routing traffic

1\. To route a [published application](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/) through the tunnel:

```sh
cloudflared tunnel route dns <UUID or NAME> <hostname>
```

This command will create a `CNAME` record pointing to `<UUID>.cfargotunnel.com`.

2\. If you are connecting a private network, route a private IP address or CIDR through the tunnel:

```sh
cloudflared tunnel route ip add <IP/CIDR> <UUID or NAME>
```

3\. Confirm that the route has been successfully established:

```sh
cloudflared tunnel route ip show
```

## 6\. Run the tunnel

Run the tunnel to proxy incoming traffic from the tunnel to any number of services running locally on your origin.

```sh
cloudflared tunnel run <UUID or NAME>
```

If your configuration file has a custom name or is not in the `.cloudflared` directory, add the `--config` flag and specify the path.

```sh
cloudflared tunnel --config /path/your-config-file.yml run <UUID or NAME>
```

Note

Cloudflare Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS. For more information, refer to [run as a service](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/).

## 7\. Check the tunnel

To get information on the tunnel you just created, run:

```sh
cloudflared tunnel info <UUID or NAME>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/#page","headline":"Create a locally-managed tunnel · Cloudflare One docs","description":"Create a locally-managed tunnel in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CLI"]}
```
