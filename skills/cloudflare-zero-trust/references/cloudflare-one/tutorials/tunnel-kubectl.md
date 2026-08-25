---
description: This tutorial explains how to use Cloudflare Tunnels with Kubernetes client-go credential plugins for authentication. By following these steps, you can securely access your Kubernetes cluster through a Cloudflare Tunnel.
title: Use Cloudflare Tunnels with Kubernetes client-go credential plugins
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Use Cloudflare Tunnels with Kubernetes client-go credential plugins

Last updated Apr 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-one/tutorials/tunnel-kubectl/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This tutorial explains how to use Cloudflare Tunnels with Kubernetes client-go credential plugins for authentication. By following these steps, you can securely access your Kubernetes cluster through a Cloudflare Tunnel using the `kubectl` command-line tool.

## Prerequisites

* A Cloudflare account
* The Cloudflare Tunnel client (`cloudflared`) installed on your machine
* Access to a Kubernetes cluster
* `kubectl` installed on your machine

## 1\. Set up a Cloudflare Tunnel

1. Authenticate `cloudflared` with your Cloudflare account:
```sh
cloudflared tunnel login
```
2. Create a new tunnel:
```sh
cloudflared tunnel create k8s-tunnel
```
3. Configure your tunnel by creating a configuration file named `config.yml`:
```yaml
tunnel: <TUNNEL_ID>
credentials-file: /path/to/credentials.json
ingress:
  - hostname: k8s.example.com
    service: tcp://kubernetes.default.svc.cluster.local:443
  - service: http_status:404
```
Replace `<TUNNEL_ID>` with your tunnel ID and adjust the hostname as needed.
4. Start the tunnel:
```sh
cloudflared tunnel run k8s-tunnel
```

## 2\. Configure the Kubernetes API server

Ensure your Kubernetes API server is configured to accept authentication from Cloudflare Tunnels. This may involve setting up an authentication webhook or configuring the API server to trust the Cloudflare Tunnel's client certificates.

## 3\. Set up client-go credential plugin

1. Create a script named `cloudflare-k8s-auth.sh` with the following content:
```bash
#!/bin/bash
echo '{
  "apiVersion": "client.authentication.k8s.io/v1beta1",
  "kind": "ExecCredential",
  "status": {
    "token": "'"$(cloudflared access token -app=https://k8s.example.com)"'"
  }
}'
```
Make the script executable:
```sh
chmod +x cloudflare-k8s-auth.sh
```
2. Update your `~/.kube/config` file to use the credential plugin:
```yaml
apiVersion: v1
kind: Config
clusters:
  - cluster:
      server: https://k8s.example.com
    name: cloudflare-k8s
users:
  - name: cloudflare-user
    user:
      exec:
        apiVersion: client.authentication.k8s.io/v1beta1
        command: /path/to/cloudflare-k8s-auth.sh
        interactiveMode: Never
contexts:
  - context:
      cluster: cloudflare-k8s
      user: cloudflare-user
    name: cloudflare-k8s-context
current-context: cloudflare-k8s-context
```

## 4\. Use kubectl with Cloudflare Tunnel

Now you can use `kubectl` commands as usual. The client-go credential plugin will automatically handle authentication through the Cloudflare Tunnel:

```sh
kubectl get pods
```

## Troubleshooting

If you encounter issues:

* Ensure `cloudflared` is running and the tunnel is active
* Check that your `~/.kube/config` file is correctly configured
* Verify that the Kubernetes API server is properly set up to accept authentication from Cloudflare Tunnels
* Review the Cloudflare Tunnel logs for any error messages

For more information, refer to the [Cloudflare Tunnels documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) and the [Kubernetes client-go credential plugins documentation ↗](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/tunnel-kubectl/#page","headline":"Use Cloudflare Tunnels with Kubernetes client-go credential plugins · Cloudflare One docs","description":"This tutorial explains how to use Cloudflare Tunnels with Kubernetes client-go credential plugins for authentication. By following these steps, you can securely access your Kubernetes cluster through a Cloudflare Tunnel.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/tunnel-kubectl/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Kubernetes"]}
```
