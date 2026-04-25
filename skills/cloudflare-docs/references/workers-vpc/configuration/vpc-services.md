---
title: VPC Services
description: Register private network resources as VPC Services that Workers can access through Cloudflare Tunnel.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# VPC Services

VPC Services are the core building block of Workers VPC. They represent specific resources in your private network that Workers can access through Cloudflare Tunnel.

You can use bindings to connect to VPC Services from Workers. Every request made to a VPC Service using its `fetch` function will be securely routed to the configured service in the private network.

VPC Services enforce that requests are routed to their intended service without exposing the entire network, securing your workloads and preventing server-side request forgery (SSRF).

Members with the **Connectivity Directory Bind** role can bind to existing VPC Services from Workers. Creating VPC Services requires the **Connectivity Directory Admin** role.

Note

Workers VPC is currently in beta. Features and APIs may change before general availability. While in beta, Workers VPC is available for free to all Workers plans.

## VPC Service configuration

A VPC Service consists of:

* **Type**: Currently only `http` is supported (support for `tcp` coming soon)
* **Tunnel ID**: The Cloudflare Tunnel that provides network connectivity
* **Hostname or IPv4/IPv6 addresses**: The hostname, or IPv4 and/or IPv6 addresses to use to route to your service from the tunnel in your private network
* **Ports**: HTTP and/or HTTPS port configuration (optional, defaults to 80/443)
* **Resolver IPs**: Optionally, a specific resolver IP can be provided — when not provided, `cloudflared` will direct DNS traffic to the currently configured default system resolver.

Requests are encrypted in flight until they reach your network via a tunnel, regardless of the scheme used in the URL provided to `fetch`. If the `http` scheme is used, a plaintext connection is established to the service from the tunnel.

The `https` scheme can be used for an encrypted connection within your network, between the tunnel and your service. When the `https` scheme is specified, a hostname provided to the `fetch()` operation is utilized as the Server Name Indication (SNI) value.

VPC Services default to allowing both `http` and `https` schemes to be used. You can provide values for only one of `http_port` or `https_port` to enforce the use of a particular scheme.

When Workers VPC is unable to establish a connection to your service, `fetch()` will throw an exception.

Note

The [VPC Service configuration](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#vpc-service-configuration) host and port(s) will always be used to connect and route requests to your services, even if a different host or port is present in the URL provided to the `fetch()` operation in the Worker code.

The host provided in the `fetch()` operation is not used to route requests, and instead only populates the `Host` field for a HTTP request, or `Host` and the Server Name Indication (SNI) value presented to your service for a HTTPS request.

The port provided in the `fetch()` operation is ignored — the port specified in the VPC Service configuration for the provided scheme will be used.

### Supported TLS certificates

When using the `https` scheme, the tunnel verifies the TLS certificate presented by your origin service. Workers VPC trusts the following certificate types:

* **Publicly trusted certificates** — Certificates issued by well-known public certificate authorities (for example, Let's Encrypt, DigiCert).
* **[Cloudflare Origin CA certificates](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)** — Free certificates issued by Cloudflare that encrypt traffic between Cloudflare and your origin. Origin CA certificates are not trusted by browsers, but are trusted by Workers VPC when connecting to your private services.

If your origin service presents a certificate that is not issued by a publicly trusted CA or by Cloudflare Origin CA, the TLS handshake will fail and `fetch()` will throw an exception.

## Configuration example

The following is an example of a VPC Service for a service using custom HTTP and HTTPS ports, and both IPv4 and IPv6 addresses. These configurations represent the expected contract of the [REST API for creating a VPC Service](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory/subresources/services/), a type of service within the broader connectivity directory.

JSONC

```

{

  "type": "http",

  "name": "human-readable-name",


  // Port configuration (optional - defaults to 80/443)

  "http_port": 80,

  "https_port": 443,


  // Host configuration

  "host": {

    "ipv4": "10.0.0.1",

    "ipv6": "fe80::",

    "network": {

      "tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da",

    },

  },

}


```

Explain Code

The following is an example of a VPC Service for a service using custom HTTP and HTTPS ports as well, using a hostname. Note that since we are using a hostname, we must provide our service with a `resolver_network` that optionally has `resolver_ips`.

JSONC

```

{

  "type": "http",

  "name": "human-readable-name",


  // Port configuration (optional - defaults to 80/443)

  "http_port": 80,

  "https_port": 443,


  // Hostname Host (with DNS resolver)

  "host": {

    "hostname": "example.com",

    "resolver_network": {

      "tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da",

      "resolver_ips": ["10.0.0.1"], // Optional

    },

  },

}


```

Explain Code

## Workers binding configuration

Once you have created a VPC Service, you can bind it to your Worker:

* [  wrangler.jsonc ](#tab-panel-9539)
* [  wrangler.toml ](#tab-panel-9540)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-worker",

  "main": "src/index.js",

  "vpc_services": [

    {

      "binding": "PRIVATE_API",

      "service_id": "e6a0817c-79c5-40ca-9776-a1c019defe70",

      "remote": true // When true, utilizes [remote bindings](/workers/development-testing/#remote-bindings) to allow access to the VPC Service during local development.

    }

  ]

}


```

Explain Code

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-worker"

main = "src/index.js"


[[vpc_services]]

binding = "PRIVATE_API"

service_id = "e6a0817c-79c5-40ca-9776-a1c019defe70"

remote = true


```

You can have multiple VPC service bindings:

* [  wrangler.jsonc ](#tab-panel-9541)
* [  wrangler.toml ](#tab-panel-9542)

JSONC

```

{

  "vpc_services": [

    {

      "binding": "PRIVATE_API",

      "service_id": "daf43e8c-a81a-4242-9912-4a2ebe4fdd79",

      "remote": true

    },

    {

      "binding": "PRIVATE_DATABASE",

      "service_id": "453b6067-1327-420d-89b3-2b6ad16e6551",

      "remote": true

    },

    {

      "binding": "INTERNAL_CACHE",

      "service_id": "6c39b574-237e-49f4-852a-cea5a93ed8f9",

      "remote": true

    }

  ]

}


```

Explain Code

TOML

```

[[vpc_services]]

binding = "PRIVATE_API"

service_id = "daf43e8c-a81a-4242-9912-4a2ebe4fdd79"

remote = true


[[vpc_services]]

binding = "PRIVATE_DATABASE"

service_id = "453b6067-1327-420d-89b3-2b6ad16e6551"

remote = true


[[vpc_services]]

binding = "INTERNAL_CACHE"

service_id = "6c39b574-237e-49f4-852a-cea5a93ed8f9"

remote = true


```

Explain Code

## Required roles

Workers VPC uses the following account roles:

* `Connectivity Directory Read` to view Workers VPC Services and Tunnels.
* `Connectivity Directory Bind` to list, read, and bind VPC Services in Workers.
* `Connectivity Directory Admin` to create, update, and delete VPC Services, and bind directly to tunnels through a VPC Network binding.

For role definitions, refer to [Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles).

If your roles were recently updated and commands are still failing, refresh Wrangler authentication:

Terminal window

```

npx wrangler logout

npx wrangler login


```

If you authenticate with an API token (`CLOUDFLARE_API_TOKEN`), ensure the token belongs to a user with the required roles.

## Next steps

* [Configure VPC Services with Terraform](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/terraform/) for managing VPC Services as infrastructure
* Set up [Cloudflare Tunnel](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/) for your environment
* Learn about the [Service Binding API](https://developers.cloudflare.com/workers-vpc/api/)
* Refer to [examples](https://developers.cloudflare.com/workers-vpc/examples/) of common use cases

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-vpc/","name":"Workers VPC"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-vpc/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-vpc/configuration/vpc-services/","name":"VPC Services"}}]}
```
