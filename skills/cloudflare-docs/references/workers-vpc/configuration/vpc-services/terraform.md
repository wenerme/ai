---
title: Configure with Terraform
description: Learn how to manage VPC Services using the Cloudflare Terraform provider.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure with Terraform

VPC Services can be managed as infrastructure using the [cloudflare\_connectivity\_directory\_service ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/connectivity%5Fdirectory%5Fservice) resource in the [Cloudflare Terraform provider](https://developers.cloudflare.com/terraform/).

This maps directly to the [connectivity directory](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory/subresources/services/) — the underlying API that the dashboard and Wrangler CLI also use to create and manage VPC Services. The same [VPC Service configuration fields](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#vpc-service-configuration) (type, host, ports, tunnel ID) apply regardless of how the service is created.

Note

Requires Cloudflare Terraform provider v5.13.0 or later.

## VPC Service resource

The `cloudflare_connectivity_directory_service` resource creates a VPC Service in the connectivity directory. Each resource corresponds to one VPC Service entry that a Worker can bind to.

### Hostname-based configuration

When using a hostname, provide `host.hostname` with a `resolver_network` block. This parallels the hostname-based [JSON configuration example](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#configuration-example).

```

resource "cloudflare_connectivity_directory_service" "my_private_api" {

  account_id = var.account_id

  name       = "my-private-api"

  type       = "http"

  http_port  = 80

  https_port = 443


  host = {

    hostname = "internal-api.example.com"

    resolver_network = {

      tunnel_id = var.tunnel_id

    }

  }

}


```

Explain Code

To use a custom DNS resolver within your private network, add `resolver_ips`:

```

resource "cloudflare_connectivity_directory_service" "my_private_api" {

  account_id = var.account_id

  name       = "my-private-api"

  type       = "http"


  host = {

    hostname = "internal-api.example.com"

    resolver_network = {

      tunnel_id    = var.tunnel_id

      resolver_ips = ["10.0.0.53"]

    }

  }

}


```

Explain Code

### IP-based configuration

When using IP addresses, provide `host.ipv4` and/or `host.ipv6` with a `network` block. This parallels the IP-based [JSON configuration example](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#configuration-example).

```

resource "cloudflare_connectivity_directory_service" "my_private_api" {

  account_id = var.account_id

  name       = "my-private-api"

  type       = "http"

  http_port  = 8080

  https_port = 8443


  host = {

    ipv4 = "10.0.1.50"

    ipv6 = "fe80::1"

    network = {

      tunnel_id = var.tunnel_id

    }

  }

}


```

Explain Code

### Port configuration

Ports are optional and default to 80 (HTTP) and 443 (HTTPS). To enforce a single scheme, provide only one of `http_port` or `https_port`. Refer to [VPC Service configuration](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#vpc-service-configuration) for how scheme enforcement and port behavior work.

## Workers binding configuration

Once a VPC Service exists, bind it to a Worker using the `vpc_service` binding type in the `bindings` array of a `cloudflare_worker_version` resource. This is equivalent to the [vpc\_services array in Wrangler configuration](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#workers-binding-configuration).

```

resource "cloudflare_worker_version" "my_worker_version" {

  account_id         = var.account_id

  worker_id          = cloudflare_worker.my_worker.id

  compatibility_date = "2025-02-21" # Set this to today's date

  main_module        = "worker.js"


  modules = [{

    name         = "worker.js"

    content_type = "application/javascript+module"

    content_file = "build/worker.js"

  }]


  bindings = [{

    type       = "vpc_service"

    name       = "PRIVATE_API"

    service_id = cloudflare_connectivity_directory_service.my_private_api.service_id

  }]

}


```

Explain Code

Multiple VPC Service bindings can be added to the same Worker:

```

bindings = [

  {

    type       = "vpc_service"

    name       = "PRIVATE_API"

    service_id = cloudflare_connectivity_directory_service.api.service_id

  },

  {

    type       = "vpc_service"

    name       = "PRIVATE_DATABASE"

    service_id = cloudflare_connectivity_directory_service.database.service_id

  }

]


```

Explain Code

The Worker code accesses each binding through `env.PRIVATE_API.fetch()` and `env.PRIVATE_DATABASE.fetch()`, as described in the [Workers Binding API](https://developers.cloudflare.com/workers-vpc/api/).

For more details on managing Workers and bindings with Terraform, refer to [Workers Infrastructure as Code](https://developers.cloudflare.com/workers/platform/infrastructure-as-code/).

## Data sources

The Terraform provider includes data sources for reading existing VPC Services without managing their lifecycle.

### Look up a single VPC Service

```

data "cloudflare_connectivity_directory_service" "existing" {

  account_id = var.account_id

  service_id = "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"

}


```

This is useful for binding to a VPC Service that is managed outside of your Terraform configuration (for example, created through the dashboard or Wrangler CLI).

### List VPC Services

```

data "cloudflare_connectivity_directory_services" "all_http" {

  account_id = var.account_id

  type       = "http"

}


```

## Resource schema reference

```

resource "cloudflare_connectivity_directory_service" "example" {

  # Required

  account_id = "your-account-id"        # Account identifier

  name       = "my-private-api"         # Human-readable name

  type       = "http"                   # Service type (only "http" supported)


  # Optional

  http_port  = 80                       # HTTP port (default: 80)

  https_port = 443                      # HTTPS port (default: 443)


  host = {

    # Use hostname OR ipv4/ipv6, not both


    # Option A: Hostname-based

    hostname = "internal-api.example.com"

    resolver_network = {

      tunnel_id    = "tunnel-uuid"      # Required — Cloudflare Tunnel ID

      resolver_ips = ["10.0.0.53"]      # Optional — custom DNS resolver IPs

    }


    # Option B: IP-based

    # ipv4 = "10.0.1.50"               # IPv4 address

    # ipv6 = "fe80::1"                 # IPv6 address

    # network = {

    #   tunnel_id = "tunnel-uuid"      # Required — Cloudflare Tunnel ID

    # }

  }


  # Read-only (computed by the API)

  # id         — Terraform resource ID

  # service_id — VPC Service ID (use this for Worker bindings)

  # created_at — Creation timestamp

  # updated_at — Last update timestamp

}


```

Explain Code

For the full schema, refer to the [Terraform registry documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/connectivity%5Fdirectory%5Fservice).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-vpc/","name":"Workers VPC"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-vpc/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-vpc/configuration/vpc-services/","name":"VPC Services"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-vpc/configuration/vpc-services/terraform/","name":"Configure with Terraform"}}]}
```
