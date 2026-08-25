---
description: Learn about publish applications with terraform in this guide.
title: Publish applications with Terraform
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Publish applications with Terraform

Last updated Jun 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/clientless-access/terraform/publish-apps-with-terraform/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide covers how to use the [Cloudflare Terraform provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) to quickly publish and secure a private application. In the following example, we will add a new published application to an existing Cloudflare Tunnel, configure how `cloudflared` proxies traffic to the application, and secure the application with Cloudflare Access.

## Prerequisites

* [Add your domain to Cloudflare](https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/add-site/)
* [Configure an IdP integration](https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/configure-idp/)
* [Create a Cloudflare Tunnel](https://developers.cloudflare.com/learning-paths/clientless-access/connect-private-applications/create-tunnel/#create-a-tunnel) via the Zero Trust dashboard
* Install the [Terraform client ↗](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
* [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) (refer to the [minimum required permissions](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/terraform/#3-create-a-cloudflare-api-token))

## 1\. Create a Terraform configuration directory

Terraform functions through a working directory that contains configuration files. You can store your configuration in multiple files or just one — Terraform will evaluate all of the configuration files in the directory as if they were in a single document.

1. Create a folder for your Terraform configuration:
```sh
mkdir cloudflare-tf
```
2. Change into the directory:
```sh
cd cloudflare-tf
```

## 2\. Declare providers and variables

Create a `.tf` file and copy-paste the following example. Fill in your API token, account and zone information, and Tunnel ID.

Find the Tunnel ID

1. In the Cloudflare dashboard, go to **Networking** \> **Tunnels**.
[Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Select the tunnel name.
3. Copy the **Tunnel ID**.

```txt
terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = "<API-TOKEN>"
}

variable "account_id" {
  default = "<ACCOUNT-ID>"
}

variable "zone_id" {
  default = "<ZONE-ID>"
}

variable "zone_name" {
  default = "mycompany.com"
}

variable "tunnel_id" {
  default = "<TUNNEL-ID>"
}
```

Caution

To prevent accidentally exposing your Cloudflare credentials, do not save this file in your version control system. Learn more about [tracking a Terraform configuration](https://developers.cloudflare.com/terraform/tutorial/track-history/).

## 3\. Configure Cloudflare resources

Add the following resources to your Terraform configuration.

### Add published application to Cloudflare Tunnel

Using the [cloudflare\_tunnel\_config ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/tunnel%5Fconfig) resource, create an ingress rule that maps your application to a public DNS record. This example makes `localhost:8080` available on `app.mycompany.com`, sets the [Connect Timeout](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/#connecttimeout), and enables [Access JWT validation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/#access).

```txt
resource "cloudflare_tunnel_config" "example_config" {
  account_id = var.cloudflare_account_id
  tunnel_id  = var.tunnel_id

  config {
    ingress_rule {
      hostname = "app.${var.zone_name}"
      service  = "http://localhost:8080"
      origin_request {
        connect_timeout = "2m0s"
        access {
          required  = true
          team_name = "myteam"
          aud_tag   = [cloudflare_access_application.example_app.aud]
        }
      }
    }
    ingress_rule {
      # Respond with a `404` status code when the request does not match any of the previous hostnames.
      service  = "http_status:404"
    }
  }
}
```

Note

Published application configurations must include a catch-all ingress rule at the bottom of the file.

### Create an Access application

Using the [cloudflare\_access\_application ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/access%5Fapplication) resource, add the application to Cloudflare Access.

```txt
resource "cloudflare_access_application" "example_app" {
  zone_id                   = var.zone_id
  name                      = "Example application"
  domain                    = "app.${var.zone_name}"
  type                      = "self_hosted"
  session_duration          = "24h"
  auto_redirect_to_identity = false
}
```

### Create an Access policy

Using the [cloudflare\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/access%5Fapplication) resource, create a policy to secure the application. The following policy will only allow access to users who authenticate through your identity provider.

```txt
resource "cloudflare_access_policy" "example_policy" {
  application_id    = cloudflare_access_application.example_app.id
  zone_id           = var.zone_id
  name              = "Example policy"
  precedence        = "1"
  decision          = "allow"

  include {
    login_method = ["<IDP-UUID>"]
  }

}
```

## 4\. Deploy Terraform

To deploy the configuration files:

1. Initialize your configuration directory:
```sh
terraform init
```
2. Preview everything that will be created:
```sh
terraform plan
```
3. Apply the configuration:
```sh
terraform apply
```

Users can now access the private application by going to the public URL and authenticating with Cloudflare Access.

You can view your new tunnel in the Cloudflare dashboard under **Networking** \> **Tunnels**.

[Go to **Tunnels** ↗](https://dash.cloudflare.com/?to=/:account/tunnels)

Your Access application and policy are under **Zero Trust** \> **Access controls** \> **[Applications ↗](https://dash.cloudflare.com/?to=/:account/one/access/apps)**.

Note

If you need to modify the Access application, Access policy or DNS record, you must make the changes via Terraform. Changes made via the dashboard will break Terraform's state. To prevent this from happening, [set the dashboard to read-only](https://developers.cloudflare.com/cloudflare-one/api-terraform/#set-dashboard-to-read-only).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/terraform/publish-apps-with-terraform/#page","headline":"Publish applications with Terraform · Cloudflare Learning Paths","description":"Learn about publish applications with terraform in this guide.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/terraform/publish-apps-with-terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
