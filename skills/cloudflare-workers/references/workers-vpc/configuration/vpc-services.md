---
description: Register private network resources as VPC Services that Workers can access through Cloudflare Tunnel.
title: VPC Services
image: https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/og.png?v=2c2633353a7f0d7f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-vpc/llms.txt
> Use this file to discover all available pages before exploring further.

# VPC Services

Last updated Nov 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

VPC Services are the core building block of Workers VPC. They represent specific resources in your private network that Workers can access through Cloudflare Tunnel.

You can use bindings to connect to VPC Services from Workers. Every request made to a VPC Service using its `fetch` function will be securely routed to the configured service in the private network.

VPC Services enforce that requests are routed to their intended service without exposing the entire network, securing your workloads and preventing server-side request forgery (SSRF).

Members with the **Connectivity Directory Bind** role can bind to existing VPC Services from Workers. Creating VPC Services requires the **Connectivity Directory Admin** role.

Note

Workers VPC is currently in beta. Features and APIs may change before general availability. While in beta, Workers VPC is available for free to all Workers plans.

## VPC Service configuration

A VPC Service consists of:

- **Type**: `http` for HTTP/HTTPS services, or `tcp` for TCP services (for example, PostgreSQL, MySQL)
- **Tunnel ID**: The Cloudflare Tunnel that provides network connectivity
- **Hostname or IPv4/IPv6 addresses**: The hostname, or IPv4 and/or IPv6 addresses to use to route to your service from the tunnel in your private network
- **Ports**: For `http` type, HTTP and/or HTTPS port configuration (optional, defaults to 80/443). For `tcp` type, a TCP port (required).
- **Application protocol** (TCP only): Optionally, specify `postgresql` or `mysql` to indicate the application-layer protocol for the TCP service
- **TLS settings**: Optionally, configure how the connection to the origin verifies TLS certificates, a custom certificate authority (CA) to trust, and a client certificate to present for mutual TLS (mTLS)
- **Resolver IPs**: Optionally, a specific resolver IP can be provided — when not provided, `cloudflared` will direct DNS traffic to the currently configured default system resolver.

### HTTP services

HTTP VPC Services allow Workers to make `fetch()` requests to private HTTP/HTTPS endpoints.

Requests are encrypted in flight until they reach your network via a tunnel, regardless of the scheme used in the URL provided to `fetch`. If the `http` scheme is used, a plaintext connection is established to the service from the tunnel.

The `https` scheme can be used for an encrypted connection within your network, between the tunnel and your service. When the `https` scheme is specified, a hostname provided to the `fetch()` operation is utilized as the Server Name Indication (SNI) value.

VPC Services default to allowing both `http` and `https` schemes to be used. You can provide values for only one of `http_port` or `https_port` to enforce the use of a particular scheme.

When Workers VPC is unable to establish a connection to your service, `fetch()` will throw an exception.

### TCP services

TCP VPC Services allow connections to TCP-based services such as PostgreSQL and MySQL databases. Use the `tcp` service type with a `--tcp-port` to expose a TCP service.

You can optionally specify an `--app-protocol` of `postgresql` or `mysql` to indicate the application-layer protocol. This metadata is used by other Cloudflare products, such as [Hyperdrive](https://developers.cloudflare.com/hyperdrive/), to locate TCP services using a supported wire protocol.

TCP VPC Services are used with [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) to connect Workers to private databases. Refer to [Connect to a private database using Workers VPC](https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database-vpc/) for a complete guide.

Note

The [VPC Service configuration](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#vpc-service-configuration) host and port(s) will always be used to connect and route requests to your services, even if a different host or port is present in the URL provided to the `fetch()` operation in the Worker code.

The host provided in the `fetch()` operation is not used to route requests, and instead only populates the `Host` field for a HTTP request, or `Host` and the Server Name Indication (SNI) value presented to your service for a HTTPS request.

The port provided in the `fetch()` operation is ignored — the port specified in the VPC Service configuration for the provided scheme will be used.

### Supported TLS certificates

When using the `https` scheme, the tunnel verifies the TLS certificate presented by your origin service. Workers VPC trusts the following certificate types:

- **Publicly trusted certificates** — Certificates issued by well-known public certificate authorities (for example, Let's Encrypt, DigiCert).
- **[Cloudflare Origin CA certificates](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)** — Free certificates issued by Cloudflare that encrypt traffic between Cloudflare and your origin. Origin CA certificates are not trusted by browsers, but are trusted by Workers VPC when connecting to your private services.
- **Certificates issued by your own CA** — Certificates signed by a private CA, such as an internal public key infrastructure (PKI) or the Amazon RDS CA. Upload the CA certificate and reference it from the VPC Service. Refer to [Custom CA and client certificates](#custom-ca-and-client-certificates).

If your origin service presents a certificate that is not issued by one of these CAs, the TLS handshake will fail and `fetch()` will throw an exception.

### TLS certificate verification mode

You can configure how the connection to your origin service verifies TLS certificates by setting the `--cert-verification-mode` option when creating or updating a VPC Service. This applies to both HTTP and TCP service types.

| Mode | Description |
| --- | --- |
| `verify_full` | Verify the full certificate chain and hostname (default) |
| `verify_ca` | Verify the certificate chain only, skip hostname verification |
| `disabled` | Do not verify the server certificate |

## Custom CA and client certificates

Private services often use certificates issued by a private certificate authority (CA), or require callers to authenticate with a client certificate (mutual TLS, or mTLS). You can attach both to a VPC Service, so Workers VPC can verify your origin and authenticate to it without weakening the connection with `verify_ca` or `disabled`.

- **Custom CA** ( `certificate_authority`) — The CA certificate or chain that Workers VPC uses to verify the certificate presented by your origin.
- **Client certificate** ( `client_certificate`) — The certificate and private key that Workers VPC presents when your origin requests a client certificate.

You can configure a custom CA, a client certificate, or both. For `http` services, these settings apply to connections that use the `https` scheme, not plaintext HTTP. For `tcp` services, they apply to the TLS connection to your service, including PostgreSQL databases used with [Hyperdrive](https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database-vpc/).

You can configure custom CA and client certificates with Wrangler, the [API](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory/subresources/services/), or [Terraform](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/terraform/#custom-ca-and-client-certificates).

### Upload certificates

Upload the CA certificate and the client certificate to your account. Each upload returns a certificate ID that you reference from the VPC Service.

```sh
npx wrangler cert upload certificate-authority --ca-cert ./ca.pem --name private-ca
npx wrangler cert upload mtls-certificate --cert ./client.pem --key ./client-key.pem --name private-client
```

Upload the CA certificate with `ca` set to `true`:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Account: SSL and Certificates Write</code>

</details>

*Upload mTLS certificatebash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mtls_certificates" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "private-ca",
		"ca": true,
		"certificates": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
	}'
```

Upload the client certificate and its private key with `ca` set to `false`:

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Account: SSL and Certificates Write</code>

</details>

*Upload mTLS certificatebash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mtls_certificates" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "private-client",
		"ca": false,
		"certificates": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
		"private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
	}'
```

### Attach certificates to a VPC Service

Reference the certificate IDs in the TLS settings of the VPC Service. When you provide a custom CA or a client certificate, you must also set the certificate verification mode explicitly.

```sh
npx wrangler vpc service create private-api \
  --type http \
  --https-port 443 \
  --hostname api.internal.example \
  --tunnel-id <TUNNEL_ID> \
  --certificate-authority <CA_CERTIFICATE_ID> \
  --client-certificate <CLIENT_CERTIFICATE_ID> \
  --cert-verification-mode verify_full
```

*Create Workers VPC connectivity servicebash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/connectivity/directory/services" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"type": "http",
		"name": "private-api",
		"https_port": 443,
		"host": {
				"hostname": "api.internal.example",
				"resolver_network": {
						"tunnel_id": "<TUNNEL_ID>"
				}
		},
		"tls_settings": {
				"certificate_authority": "<CA_CERTIFICATE_ID>",
				"client_certificate": "<CLIENT_CERTIFICATE_ID>",
				"cert_verification_mode": "verify_full"
		}
	}'
```

The following rules apply:

- `cert_verification_mode` is required whenever you set `certificate_authority` or `client_certificate`.
- A custom CA cannot be combined with `disabled`, because the CA is only used to verify the origin certificate. Use `verify_full` or `verify_ca`.
- A client certificate can be used without a custom CA, with any verification mode.
- TLS settings are configured on each VPC Service. The `network` or `resolver_network` of the service host has no TLS settings of its own.

### Rotate or remove certificates

To rotate a certificate, upload the new certificate, then update the VPC Service to reference the new certificate ID. Changes can take a few seconds to apply.

Updating a VPC Service replaces its complete configuration, including TLS settings. Include every TLS setting the service should keep. Certificate references and the verification mode that you omit are cleared, and an update without TLS settings returns the service to the default verification (`verify_full` with publicly trusted CAs and Cloudflare Origin CA).

For example, to rotate the client certificate while keeping the custom CA:

```sh
npx wrangler vpc service update <SERVICE_ID> \
  --name private-api \
  --type http \
  --https-port 443 \
  --hostname api.internal.example \
  --tunnel-id <TUNNEL_ID> \
  --certificate-authority <CA_CERTIFICATE_ID> \
  --client-certificate <NEW_CLIENT_CERTIFICATE_ID> \
  --cert-verification-mode verify_full
```

Removing a certificate reference from a VPC Service, or deleting the VPC Service, does not delete the uploaded certificate. To delete it, use `wrangler cert delete` or the [Delete mTLS certificate endpoint](https://developers.cloudflare.com/api/resources/mtls_certificates/methods/delete/).

If a certificate does not match your origin, the connection fails instead of falling back to weaker verification, and `fetch()` throws an exception that includes the reason, for example `CERTIFICATE_VERIFY_FAILED`. Refer to [Troubleshooting](https://developers.cloudflare.com/workers-vpc/reference/troubleshooting/) for TLS errors.

## Configuration examples

These configurations represent the expected contract of the [REST API for creating a VPC Service](https://developers.cloudflare.com/api/resources/connectivity/subresources/directory/subresources/services/), a type of service within the broader connectivity directory.

### HTTP service with IP addresses

The following is an example of an HTTP VPC Service using custom HTTP and HTTPS ports, and both IPv4 and IPv6 addresses.

```jsonc
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

### HTTP service with hostname

The following is an example of an HTTP VPC Service using a hostname. When using a hostname, provide a `resolver_network` that optionally includes `resolver_ips`.

```jsonc
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

### TCP service (for example, PostgreSQL)

The following is an example of a TCP VPC Service for a PostgreSQL database.

```jsonc
{
	"type": "tcp",
	"name": "my-postgres-db",
	"tcp_port": 5432,
	"app_protocol": "postgresql", // Optional: "postgresql" or "mysql"

	"host": {
		"ipv4": "10.0.0.5",
		"network": {
			"tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da",
		},
	},
}
```

### Service with TLS certificate verification

The following example creates a TCP service with `verify_ca` certificate verification mode.

```jsonc
{
	"type": "tcp",
	"name": "my-postgres-db",
	"tcp_port": 5432,
	"app_protocol": "postgresql",

	"host": {
		"ipv4": "10.0.0.5",
		"network": {
			"tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da",
		},
	},

	"tls_settings": {
		"cert_verification_mode": "verify_ca",
	},
}
```

### Service with a custom CA and client certificate

The following example creates a TCP service for a PostgreSQL database that presents a certificate signed by a private CA and requires a client certificate. The certificate IDs are returned when you [upload certificates](#upload-certificates).

```jsonc
{
	"type": "tcp",
	"name": "my-postgres-db",
	"tcp_port": 5432,
	"app_protocol": "postgresql",

	"host": {
		"hostname": "db.internal.example",
		"resolver_network": {
			"tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da",
		},
	},

	"tls_settings": {
		"certificate_authority": "705db030-8247-489b-80dd-0d6256e5950d", // Optional: custom CA certificate ID
		"client_certificate": "a493fbb4-34bc-4218-a63c-61a9323ac725", // Optional: client certificate ID for mTLS
		"cert_verification_mode": "verify_full", // Required when a certificate is set
	},
}
```

## Workers binding configuration

Once you have created a VPC Service, you can bind it to your Worker:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"main": "src/index.js",
	"upload_source_maps": true,
	"vpc_services": [
		{
			"binding": "PRIVATE_API",
			"service_id": "e6a0817c-79c5-40ca-9776-a1c019defe70",
			"remote": true // When true, utilizes [remote bindings](/workers/local-development/#remote-bindings) to allow access to the VPC Service during local development.
		}
	]
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-worker"
main = "src/index.js"
upload_source_maps = true

[[vpc_services]]
binding = "PRIVATE_API"
service_id = "e6a0817c-79c5-40ca-9776-a1c019defe70"
remote = true
```

You can have multiple VPC service bindings:

```jsonc
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

```toml
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

## Required roles

Workers VPC uses the following account roles:

- `Connectivity Directory Read` to view Workers VPC Services and Tunnels.
- `Connectivity Directory Bind` to list, read, and bind VPC Services in Workers.
- `Connectivity Directory Admin` to create, update, and delete VPC Services, and bind directly to tunnels through a VPC Network binding.

For role definitions, refer to [Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles).

If your roles were recently updated and commands are still failing, refresh Wrangler authentication:

```sh
npx wrangler logout
npx wrangler login
```

If you authenticate with an API token (`CLOUDFLARE_API_TOKEN`), ensure the token belongs to a user with the required roles.

## Next steps

- [Configure VPC Services with Terraform](https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/terraform/) for managing VPC Services as infrastructure
- Set up [Cloudflare Tunnel](https://developers.cloudflare.com/workers-vpc/configuration/tunnel/) for your environment
- Learn about the [Service Binding API](https://developers.cloudflare.com/workers-vpc/api/)
- Refer to [examples](https://developers.cloudflare.com/workers-vpc/examples/) of common use cases

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/#page","headline":"VPC Services","description":"Register private network resources as VPC Services that Workers can access through Cloudflare Tunnel.","url":"https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/","inLanguage":"en","image":"https://developers.cloudflare.com/workers-vpc/configuration/vpc-services/og.png?v=2c2633353a7f0d7f","dateModified":"2026-11-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
