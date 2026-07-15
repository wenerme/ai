---
title: "Configure the Dynatrace data source | Grafana Enterprise Plugins documentation"
description: "Configure the Dynatrace data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Dynatrace data source

This document provides guidance on configuring the Dynatrace data source.

## Before you begin

The Dynatrace data source has the following requirements.

Grafana requirements:

- Grafana 10.4 or later
- One of the following:

  - [Grafana Cloud](/products/cloud/) Free, Advanced, or Trial account.
  - Grafana Enterprise with an [activated license](/docs/grafana/latest/administration/enterprise-licensing/).
- The `Organization administrator` role to add data sources.

Dynatrace requirements:

- A Dynatrace environment (SaaS, Managed, or Environment ActiveGate).
- A Dynatrace API token with appropriate scopes (see [Get an API key from Dynatrace](#get-an-api-key-from-dynatrace)).
- If using TLS/SSL: CA certificates, client certificates, or client keys as needed.

### Installation

Install the Dynatrace plugin from the [Grafana plugin catalog](/grafana/plugins/grafana-dynatrace-datasource/?tab=installation).

## Known limitations

The following are known limitations with the Dynatrace data source:

- **Logs query type is in beta** - The underlying Dynatrace API is an Early Adopter release and may change in non-compatible ways.
- **Logs aggregate mode** - Aggregate mode for Logs queries is not yet supported.
- **Multi-value variables** - Support for multi-value template variables varies by query type. Test your specific use case to verify compatibility.

## Get an API key from Dynatrace

To set up an API token, refer to [Dynatrace API - Tokens and authentication](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/basics/dynatrace-api-authentication).

To query the individual services, you need specific scopes added to your API token.

Expand table

| Service           | Required scopes                                                    |
|-------------------|--------------------------------------------------------------------|
| Metrics           | `Read metrics`, `Read entities` *(optional: `Read configuration`)* |
| Problems          | `Access problem and event feed, metrics, and topology`             |
| Problems V2       | `Read problems`                                                    |
| USQL              | `User sessions`                                                    |
| Logs              | `Read logs`                                                        |
| Audit Logs        | `Read audit logs`                                                  |
| Management Zones  | `Read configuration`                                               |
| SLO               | `Read SLO`                                                         |
| Events            | `Read events`                                                      |
| Synthetic         | `Read synthetic monitors, locations, and nodes`                    |
| Tokens            | `Read API tokens`                                                  |
| Direct API Access | Refer to Dynatrace API documentation for the scopes required       |

## Get a Platform token from Dynatrace

To query data stored in Dynatrace Grail, you need a Platform token in addition to an API token. Platform tokens provide access to Grail’s unified data lakehouse for logs, metrics, traces, and events.

To set up a Platform token, refer to [Dynatrace API - Tokens and authentication](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/basics/dynatrace-api-authentication).

An IAM policy must be attached to the service identity used by the Platform token and must grant access to the environment being queried. The policy must also allow read access to the relevant Grail datasets. For more information about configuring IAM policy permissions for Grail, refer to the [Dynatrace documentation on assigning permissions in Grail](https://docs.dynatrace.com/docs/discover-dynatrace/platform/grail/organize-data/assign-permissions-in-grail).

The following table lists the required scopes for each Grail data type:

Expand table

| Service         | Required scopes          |
|-----------------|--------------------------|
| Metrics         | `storage:metrics:read`   |
| Events          | `storage:events:read`    |
| Spans / Traces  | `storage:spans:read`     |
| Logs            | `storage:logs:read`      |
| Entities        | `storage:entities:read`  |
| Business Events | `storage:bizevents:read` |

## Add the Dynatrace data source

Complete the following steps to add a new Dynatrace data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Dynatrace` in the search bar.
4. Select the Dynatrace data source.
5. Click **Add new data source** in the upper right.

Grafana takes you to the **Settings** tab, where you will set up your Dynatrace configuration.

## Configure the data source in the UI

The following is a list of configuration options for Dynatrace.

Expand table

| **Setting** | **Description**                                                                                                                                  |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**    | The data source name. This is how you refer to the data source in panels and queries. Examples: `Dynatrace_1`.                                   |
| **Default** | Toggle to select this data source as the default in dashboard panels. When you create or edit a panel, this will be the preselected data source. |

### Dynatrace API type

Select the type of Dynatrace instance that you are connecting to:

**SaaS Environment** - Dynatrace’s cloud-hosted service where Dynatrace manages all the infrastructure for you.

- **Environment ID** - The environment ID from your instance URL. For example, in `yfc55578.live.dynatrace.com`, the Environment ID is `yfc55578`.

**Managed Cluster** - A self-hosted Dynatrace deployment that you run on your own infrastructure (on-premises or in your own cloud environment).

- **Environment ID** - The environment ID from your instance URL. For example, in `yd8888.managed-sprint.dynalabs.io/e/abc99984-3af2-55tt-72kl-0672983gc45`, the Environment ID is `abc99984-3af2-55tt-72kl-0672983gc45`.
- **Domain** - The domain name of your Dynatrace server. For example: `yd8888.managed-sprint.dynalabs.io`

**Raw URL** - Use this option for Dynatrace instances that don’t fit into the SaaS or Managed Cluster categories, such as Environment ActiveGate.

- **URL** - The full URL of your Dynatrace instance. For example: `https://yfc55578.live.dynatrace.com`

### Common settings

The following settings apply to all API types:

- **Dynatrace API token** - Enter your Dynatrace API token. At minimum, it must have `metrics.read` and `entities.read` permissions. Refer to [Get an API key from Dynatrace](#get-an-api-key-from-dynatrace) for instructions on creating the token and required scopes for each query type.
- **Dynatrace Platform token** - *(Optional)* Enter your Dynatrace Platform token. This token is required for querying data stored in Dynatrace Grail. Refer to [Get a Platform token from Dynatrace](#get-a-platform-token-from-dynatrace) for instructions on creating the token and required scopes.
- **Timeout** - The timeout, in seconds, for the HTTP client. The default is `30`.
- **Add self-signed certificate** - Enable this option to provide your own CA certificate for TLS verification.

  - **CA Certificate** - Paste your CA certificate content.
- **TLS Client Authentication** - Enable this option to configure TLS client authentication using a client certificate and key.

  - **ServerName** - Used to verify the hostname on the returned certificates unless **Skip TLS certificate validation** is enabled.
  - **Client Certificate** - Paste your client certificate content.
  - **Client Key** - Paste your client key content.
- **Skip TLS certificate validation** - Enable this option to skip SSL/TLS certificate validation when connecting to the Dynatrace API endpoint. Use with caution.

## Configure the data source with provisioning

You can define and configure the data source in YAML files as part of the Grafana provisioning system. For more information about provisioning and available configuration options, refer to [Provision Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Dynatrace
    type: grafana-dynatrace-datasource
    jsonData:
      apiType: saas
      environmentId: environment Id
    secureJsonData:
      apiToken: API token
      platformToken: Platform token # Optional: Required for Grail queries
  - name: Dynatrace Managed
    type: grafana-dynatrace-datasource
    jsonData:
      apiType: managed
      environmentId: environment Id # example: abc99984-3af2-55tt-72kl-0672983gc45
      domain: domain # example: yd8888.managed-sprint.dynalabs.io
      tlsSkipVerify: false
      tlsAuthWithCACert: true
      tlsAuth: true
      serverName: dynatrace.example.com
      httpClientTimeout: 360
    secureJsonData:
      apiToken: API token
      platformToken: Platform token # Optional: Required for Grail queries
      tlsCACert: |
        -----BEGIN CERTIFICATE-----
        1221323123213123231231232+g6DAzj/11231
        sdsaas==
        -----END CERTIFICATE-----
      tlsClientCert: |
        -----BEGIN CERTIFICATE-----
        1221323123213123231231232+g6DAzj/11231
        sdsaas==
        -----END CERTIFICATE-----
      tlsClientKey: |
        -----BEGIN RSA PRIVATE KEY-----
        1221323123213123231231232+g6DAzj/11231
        sdsaas==
        -----END RSA PRIVATE KEY-----
```

## Configure Dynatrace with Terraform

You can configure the Dynatrace data source as code using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). This approach enables version-controlled, reproducible data source configurations across environments.

The following examples demonstrate configurations for each API type (SaaS, Managed, and Raw URL), as well as an advanced configuration with TLS settings.

Terraform [Copy code to clipboard] Copy

```terraform
terraform {
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 3.0"
    }
  }
}

provider "grafana" {
  url  = var.grafana_url
  auth = var.grafana_auth
}

# SaaS Environment Example
resource "grafana_data_source" "dynatrace_saas" {
  type = "grafana-dynatrace-datasource"
  name = "Dynatrace SaaS"

  json_data_encoded = jsonencode({
    apiType       = "saas"
    environmentId = var.dynatrace_environment_id
  })

  secure_json_data_encoded = jsonencode({
    apiToken      = var.dynatrace_api_token
    platformToken = var.dynatrace_platform_token # Optional: Required for Grail queries
  })
}

# Managed Cluster Example
resource "grafana_data_source" "dynatrace_managed" {
  type = "grafana-dynatrace-datasource"
  name = "Dynatrace Managed"

  json_data_encoded = jsonencode({
    apiType       = "managed"
    environmentId = var.dynatrace_environment_id
    domain        = var.dynatrace_domain
  })

  secure_json_data_encoded = jsonencode({
    apiToken = var.dynatrace_api_token
  })
}

# Raw URL Example
resource "grafana_data_source" "dynatrace_raw" {
  type = "grafana-dynatrace-datasource"
  name = "Dynatrace Raw URL"

  json_data_encoded = jsonencode({
    apiType       = "url"
    environmentId = var.dynatrace_raw_url
  })

  secure_json_data_encoded = jsonencode({
    apiToken = var.dynatrace_api_token
  })
}

# Advanced Configuration with TLS and Timeout
resource "grafana_data_source" "dynatrace_advanced" {
  type = "grafana-dynatrace-datasource"
  name = "Dynatrace Advanced"

  json_data_encoded = jsonencode({
    apiType           = "managed"
    environmentId     = var.dynatrace_environment_id
    domain            = var.dynatrace_domain
    httpClientTimeout = 30
    tlsSkipVerify     = false
    tlsAuthWithCACert = true
    tlsAuth           = true
    serverName        = var.dynatrace_server_name
  })

  secure_json_data_encoded = jsonencode({
    apiToken      = var.dynatrace_api_token
    tlsCACert     = var.dynatrace_ca_cert
    tlsClientCert = var.dynatrace_tls_client_cert
    tlsClientKey  = var.dynatrace_tls_client_key
  })
}

# Variables
variable "grafana_url" {
  description = "Grafana instance URL"
  type        = string
  default     = "http://localhost:3000"
}

variable "grafana_auth" {
  description = "Grafana authentication (e.g., admin:password or API key)"
  type        = string
  sensitive   = true
}

variable "dynatrace_environment_id" {
  description = "Dynatrace Environment ID"
  type        = string
}

variable "dynatrace_domain" {
  description = "Dynatrace domain for managed cluster"
  type        = string
  default     = ""
}

variable "dynatrace_raw_url" {
  description = "Full URL for Dynatrace instance (Raw URL mode). Used as environmentId when apiType is 'url'."
  type        = string
  default     = ""
}

variable "dynatrace_api_token" {
  description = "Dynatrace API Token"
  type        = string
  sensitive   = true
}

variable "dynatrace_platform_token" {
  description = "Dynatrace Platform Token for Grail queries"
  type        = string
  sensitive   = true
  default     = ""
}

variable "dynatrace_ca_cert" {
  description = "CA Certificate for TLS"
  type        = string
  sensitive   = true
  default     = ""
}

variable "dynatrace_server_name" {
  description = "TLS Server Name for hostname verification"
  type        = string
  default     = ""
}

variable "dynatrace_tls_client_cert" {
  description = "TLS Client Certificate for TLS client authentication"
  type        = string
  sensitive   = true
  default     = ""
}

variable "dynatrace_tls_client_key" {
  description = "TLS Client Key for TLS client authentication"
  type        = string
  sensitive   = true
  default     = ""
}

# Outputs
output "dynatrace_saas_uid" {
  description = "UID of the Dynatrace SaaS data source"
  value       = grafana_data_source.dynatrace_saas.uid
}

output "dynatrace_managed_uid" {
  description = "UID of the Dynatrace Managed data source"
  value       = grafana_data_source.dynatrace_managed.uid
}

output "dynatrace_raw_uid" {
  description = "UID of the Dynatrace Raw URL data source"
  value       = grafana_data_source.dynatrace_raw.uid
}
```
