---
description: Configure mTLS enforcement and minimum TLS version per custom hostname.
title: TLS Management
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# TLS Management

Last updated Jul 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Mutual TLS (mTLS) ↗](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) adds an extra layer of protection to application connections by validating certificates on the server and the client. When building a SaaS application, you may want to enforce mTLS to protect sensitive endpoints related to payment processing, database updates, and more.

[Minimum TLS Version](#minimum-tls-version) only allows HTTPS connections from visitors that support the selected TLS protocol version or newer. Cloudflare recommends TLS 1.2 to comply with the Payment Card Industry (PCI) Security Standards Council. As a SaaS provider, you can control the Minimum TLS version for your zone as a whole, as well as for individual custom hostnames.

[Cipher suites](#cipher-suites) are a combination of ciphers used to negotiate security settings during the [SSL/TLS handshake ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/). As a SaaS provider, you can specify configurations for cipher suites on your zone as a whole and cipher suites on individual custom hostnames via the API.

Caution

When you [issue a custom hostname certificate](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/) with wildcards enabled, any cipher suites or Minimum TLS settings applied to that hostname will only apply to the direct hostname.

However, if you want to update the Minimum TLS settings for all wildcard hostnames, you can change Minimum TLS version at the [zone level](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/).

## Enable mTLS

Once you have [added a custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/), you can enable mTLS by using Cloudflare Access. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** and [add mTLS authentication](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/) with a few clicks.

Note

Currently, you cannot add mTLS policies for custom hostnames using [API Shield](https://developers.cloudflare.com/api-shield/security/mtls/).

Also make sure to enforce mTLS on the specific custom hostname where it should be checked. It is not enough to have it set on the CNAME target.

## Minimum TLS Version

Note

While TLS 1.3 is the most recent and secure version, it is not supported by some older devices. Refer to Cloudflare's recommendations when [deciding what version to use](https://developers.cloudflare.com/ssl/reference/protocols/#decide-which-version-to-use).

### Scope

Minimum TLS version exists both as a [zone-level setting](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) (on the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) page under **Minimum TLS Version**) and as a custom hostname setting. What this implies is:

* For custom hostnames created via API, it is possible not to explicitly define a value for `min_tls_version`. When that is the case, whatever value is defined as your zone's minimum TLS version will be applied. To confirm whether a given custom hostname has a specific minimum TLS version set, use the following API call.

Check custom hostname TLS settings

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `SSL and Certificates Write`
* `SSL and Certificates Read`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
  "success": true,
  "result": {
    "id": "<CUSTOM_HOSTNAME_ID>",
    "ssl": {
      "id": "<CERTIFICATE_ID>",
      "bundle_method": "ubiquitous",
      "certificate_authority": "<CERTIFICATE_AUTHORITY>",
      "custom_certificate": "",
      "custom_csr_id": "",
      "custom_key": "",
      "expires_on": "",
      "hosts": [
        "app.example.com",
        "*.app.example.com"
      ],
      "issuer": "",
      "method": "http",
      "settings": {},
      "signature": "SHA256WithRSA",
      "type": "dv",
      "uploaded_on": "2020-02-06T18:11:23.531995Z",
      "validation_errors": [
        {
          "message": "SERVFAIL looking up CAA for app.example.com"
        }
      ],
      "validation_records": [
        {
          "emails": [
            "administrator@example.com",
            "webmaster@example.com"
          ],
          "http_body": "ca3-574923932a82475cb8592200f1a2a23d",
          "http_url": "http://app.example.com/.well-known/pki-validation/ca3-da12a1c25e7b48cf80408c6c1763b8a2.txt",
          "txt_name": "_acme-challenge.app.example.com",
          "txt_value": "810b7d5f01154524b961ba0cd578acc2"
        }
      ],
      "wildcard": false
    },
  }
```

* Whenever you make changes to a custom hostname via dashboard, the value that is set for Minimum TLS version will apply. If you have a scenario as explained in the bullet above, the dashboard change will override the zone-level configuration that was being applied.
* For custom hostnames with wildcards enabled, the direct custom hostname you create (for example, `saas-customer.test`) will use the hostname-specific setting, while the others (`sub1.saas-customer.test`, `sub2.saas-customer.test`, etc) will default to the zone-level setting.

### Setup

Minimum TLS version for your zone

Refer to [Minimum TLS version - SSL/TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/#zone-level).

Minimum TLS version for custom hostname

1. In the Cloudflare dashboard, go to the **Custom Hostnames** page.
[Go to **Custom Hostnames** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/custom-hostnames)
2. Find the hostname to which you want to apply Minimum TLS Version. Select **Edit**.
3. Choose the desired TLS version under **Minimum TLS Version** and select **Save**.

In the API documentation, refer to [SSL properties of a custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/). Besides the `settings` specifications, you must include `type` and `method` within the `ssl` object, as explained below.

1. Make a `GET` request to the [Custom Hostname Details](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/get/) endpoint to check what are the current values for `ssl.type` and `ssl.method`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `SSL and Certificates Write`
* `SSL and Certificates Read`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
  "success": true,
  "result": {
    "id": "<CUSTOM_HOSTNAME_ID>",
    "ssl": {
      "id": "<CERTIFICATE_ID>",
      "bundle_method": "ubiquitous",
      "certificate_authority": "<CERTIFICATE_AUTHORITY>",
      "custom_certificate": "",
      "custom_csr_id": "",
      "custom_key": "",
      "expires_on": "",
      "hosts": [
        "app.example.com",
        "*.app.example.com"
      ],
      "issuer": "",
      "method": "http",
      "settings": {},
      "signature": "SHA256WithRSA",
      "type": "dv",
      "uploaded_on": "2020-02-06T18:11:23.531995Z",
      "validation_errors": [
        {
          "message": "SERVFAIL looking up CAA for app.example.com"
        }
      ],
      "validation_records": [
        {
          "emails": [
            "administrator@example.com",
            "webmaster@example.com"
          ],
          "http_body": "ca3-574923932a82475cb8592200f1a2a23d",
          "http_url": "http://app.example.com/.well-known/pki-validation/ca3-da12a1c25e7b48cf80408c6c1763b8a2.txt",
          "txt_name": "_acme-challenge.app.example.com",
          "txt_value": "810b7d5f01154524b961ba0cd578acc2"
        }
      ],
      "wildcard": false
    },
  }
```

1. After you take note of these values, make a `PATCH` request to the [Edit Custom Hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) endpoint, providing both the minimum TLS version you want to define and the same `type` and `method` values that you obtained from the previous step.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `SSL and Certificates Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"ssl": {
				"method": "http",
				"type": "dv",
				"settings": {
						"min_tls_version:": "1.2"
				}
		}
	}'
```

## Cipher suites

For security and regulatory reasons, you may want to only allow connections from certain cipher suites. Cloudflare provides recommended values and full cipher suite reference in our [Cipher suites documentation](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#resources).

Restrict cipher suites for your zone

Refer to [Customize cipher suites - SSL/TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/).

Restrict cipher suites for custom hostname

In the API documentation, refer to [SSL properties of a custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/). Besides the `settings` specifications, you must include `type` and `method` within the `ssl` object, as explained below.

1. Make a `GET` request to the [Custom Hostname Details](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/get/) endpoint to check what are the current values for `ssl.type` and `ssl.method`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `SSL and Certificates Write`
* `SSL and Certificates Read`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
  "success": true,
  "result": {
    "id": "<CUSTOM_HOSTNAME_ID>",
    "ssl": {
      "id": "<CERTIFICATE_ID>",
      "bundle_method": "ubiquitous",
      "certificate_authority": "<CERTIFICATE_AUTHORITY>",
      "custom_certificate": "",
      "custom_csr_id": "",
      "custom_key": "",
      "expires_on": "",
      "hosts": [
        "app.example.com",
        "*.app.example.com"
      ],
      "issuer": "",
      "method": "http",
      "settings": {},
      "signature": "SHA256WithRSA",
      "type": "dv",
      "uploaded_on": "2020-02-06T18:11:23.531995Z",
      "validation_errors": [
        {
          "message": "SERVFAIL looking up CAA for app.example.com"
        }
      ],
      "validation_records": [
        {
          "emails": [
            "administrator@example.com",
            "webmaster@example.com"
          ],
          "http_body": "ca3-574923932a82475cb8592200f1a2a23d",
          "http_url": "http://app.example.com/.well-known/pki-validation/ca3-da12a1c25e7b48cf80408c6c1763b8a2.txt",
          "txt_name": "_acme-challenge.app.example.com",
          "txt_value": "810b7d5f01154524b961ba0cd578acc2"
        }
      ],
      "wildcard": false
    },
  }
```

1. After you take note of these values, make a `PATCH` request to the [Edit Custom Hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) endpoint, providing both the list of authorized cipher suites and the same `type` and `method` values that you obtained from the previous step.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `SSL and Certificates Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"ssl": {
				"method": "http",
				"type": "dv",
				"settings": {
						"ciphers": [
								"ECDHE-ECDSA-AES128-GCM-SHA256",
								"ECDHE-RSA-AES128-GCM-SHA256"
						]
				}
		}
	}'
```

Restrict cipher suites for custom hostname with custom certificate

In the API documentation, refer to [SSL properties of a custom hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/). In the case of a custom hostname with custom certificate, you must include the custom certificate in the [Edit Custom Hostname PATCH call](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/), with the `settings` specifications where you must include `type` and `method` within the `ssl` object, as explained below.

1. Make a `GET` request to the [Custom Hostname Details](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/get/) endpoint to check what are the current values for `ssl.type` and `ssl.method`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `SSL and Certificates Write`
* `SSL and Certificates Read`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
  "success": true,
  "result": {
    "id": "<CUSTOM_HOSTNAME_ID>",
    "ssl": {
      "id": "<CERTIFICATE_ID>",
      "bundle_method": "ubiquitous",
      "certificate_authority": "<CERTIFICATE_AUTHORITY>",
      "custom_certificate": "",
      "custom_csr_id": "",
      "custom_key": "",
      "expires_on": "",
      "hosts": [
        "app.example.com",
        "*.app.example.com"
      ],
      "issuer": "",
      "method": "http",
      "settings": {},
      "signature": "SHA256WithRSA",
      "type": "dv",
      "uploaded_on": "2020-02-06T18:11:23.531995Z",
      "validation_errors": [
        {
          "message": "SERVFAIL looking up CAA for app.example.com"
        }
      ],
      "validation_records": [
        {
          "emails": [
            "administrator@example.com",
            "webmaster@example.com"
          ],
          "http_body": "ca3-574923932a82475cb8592200f1a2a23d",
          "http_url": "http://app.example.com/.well-known/pki-validation/ca3-da12a1c25e7b48cf80408c6c1763b8a2.txt",
          "txt_name": "_acme-challenge.app.example.com",
          "txt_value": "810b7d5f01154524b961ba0cd578acc2"
        }
      ],
      "wildcard": false
    },
  }
```

1. After you take note of these values, make a `PATCH` request to the [Edit Custom Hostname](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) endpoint, providing both the list of authorized cipher suites and the same `type` and `method` values that you obtained from the previous step, but also the `custom_certificate` and `custom_key`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `SSL and Certificates Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"ssl": {
				"method": "http",
				"type": "dv",
				"custom_certificate": "<CERTIFICATE_STRING>",
				"custom_key": "<CERTIFICATE_PRIVATE_KEY>",
				"settings": {
						"ciphers": [
								"ECDHE-ECDSA-AES128-GCM-SHA256",
								"ECDHE-RSA-AES128-GCM-SHA256"
						],
						"min_tls_version": "1.2"
				}
		}
	}'
```

## Alerts for mutual TLS certificates

You can configure alerts to receive notifications before your mutual TLS certificates expire.

Access mTLS Certificate Expiration Alert

**Who is it for?**

[Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) customers that use client certificates for mutual TLS authentication. This notification will be sent 30 and 14 days before the expiration of the certificate.

**Other options / filters**

None.

**Included with**

Purchase of [Access](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/) and/or [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/).

**What should you do if you receive one?**

Upload a [renewed certificate](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#add-mtls-authentication-to-your-access-configuration).

Refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on how to set up an alert.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#page","headline":"TLS Settings — Cloudflare for SaaS · Cloudflare for Platforms docs","description":"Configure mTLS enforcement and minimum TLS version per custom hostname.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS","TLS"]}
```
