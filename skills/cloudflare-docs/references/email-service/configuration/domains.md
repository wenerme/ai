---
title: Domain configuration
description: Configure and verify DNS records for Email Service sending and routing on your domain.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Domain configuration

Configure domains for Cloudflare Email Service, manage DNS records, and verify domain setup for both email sending and routing.

Configure your domains to work with Cloudflare Email Service. This includes DNS record management, domain verification, and advanced domain settings.

## Automatic DNS configuration

Cloudflare can configure all required DNS records for you when you onboard a domain onto Email Sending or Email Routing.

* [ Email Sending ](#tab-panel-8265)
* [ Email Routing ](#tab-panel-8266)

Before using Email Sending, configure your domain.

1. In the Cloudflare dashboard, go to **Compute** \> **Email Service** \> **Email Sending**.  
[ Go to **Email Sending** ](https://dash.cloudflare.com/?to=/:account/email-service/sending)
2. Select **Onboard Domain**.
3. Choose a domain from your Cloudflare account. Optionally review the DNS records that Cloudflare will add to the `cf-bounce` subdomain of your domain:  
   * MX records to route bounce emails to Cloudflare.  
   * TXT record for SPF to authorize sending emails.  
   * TXT record for DKIM to provide authentication for emails sent from your domain.  
   * TXT record for DMARC on `_dmarc.yourdomain.com`.
4. Select **Done**.

Note

DNS changes can take up to 24 hours to propagate globally, but usually complete within 5-15 minutes for domains using Cloudflare DNS.

Once your domain is onboarded, you can start sending emails.

Before using Email Routing, configure your domain.

1. In the Cloudflare dashboard, go to **Compute** \> **Email Service** \> **Email Routing**.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/email-service/routing)
2. Select **Onboard Domain**.
3. Choose a domain from your Cloudflare account. Optionally review the DNS records that Cloudflare will add to your root domain:  
   * MX records to route incoming emails to Cloudflare.  
   * TXT record for SPF to authorize email routing.  
   * TXT record for DKIM to provide authentication for routed emails.
4. Select **Done**.

Note

DNS changes can take up to 24 hours to propagate globally, but usually complete within 5-15 minutes for domains using Cloudflare DNS.

Once your domain is onboarded, you can start routing emails.

## DNS record configuration details

Cloudflare automatically configures required DNS records for both email sending and routing when you onboard a domain onto Email Service. Here are the specific details of the DNS records configured:

### Sending records

These records authenticate your outbound emails. Email Sending creates DNS records on a `cf-bounce.` subdomain of your domain to handle bounce processing. These are separate from the records used by Email Routing.

* [ MX records ](#tab-panel-8256)
* [ SPF record ](#tab-panel-8257)
* [ DKIM record ](#tab-panel-8258)
* [ DMARC record ](#tab-panel-8259)

**Purpose**: Route bounce emails back to Cloudflare for processing.

```

MX cf-bounce.yourdomain.com route1.mx.cloudflare.net

MX cf-bounce.yourdomain.com route2.mx.cloudflare.net

MX cf-bounce.yourdomain.com route3.mx.cloudflare.net


```

**Configuration:**

* **Type**: MX
* **Name**: `cf-bounce` (subdomain)
* **Mail server**: Cloudflare MX servers
* **Priority**: Assigned automatically by Cloudflare

**Purpose**: Authorizes Cloudflare to send emails on behalf of your domain.

```

TXT cf-bounce.yourdomain.com "v=spf1 include:_spf.mx.cloudflare.net ~all"


```

**Configuration:**

* **Type**: TXT
* **Name**: `cf-bounce` (subdomain)
* **Value**: `v=spf1 include:_spf.mx.cloudflare.net ~all`
* **TTL**: Auto

**Purpose**: Provides cryptographic authentication for your emails.

```

TXT cf-bounce._domainkey.yourdomain.com "v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA..."


```

**Configuration:**

* **Type**: TXT
* **Name**: `cf-bounce._domainkey` (selector managed by Cloudflare)
* **Value**: DKIM public key (provided by Cloudflare)
* **TTL**: Auto

**Purpose**: Sets policy for email authentication failures.

```

TXT _dmarc.yourdomain.com "v=DMARC1; p=reject;"


```

**Configuration:**

* **Type**: TXT
* **Name**: `_dmarc`
* **Value**: DMARC policy
* **TTL**: Auto

**Policy options:**

* `p=none` \- Monitor only (recommended for new setups)
* `p=quarantine` \- Quarantine suspicious emails
* `p=reject` \- Reject unauthenticated emails

### Routing records

These records route incoming emails to Cloudflare and authenticate forwarded emails. Email Routing DNS records are configured on the root domain.

* [ MX records ](#tab-panel-8260)
* [ SPF record ](#tab-panel-8261)
* [ DKIM record ](#tab-panel-8262)

**Purpose**: Route incoming emails to Cloudflare's mail servers.

```

MX yourdomain.com route1.mx.cloudflare.net

MX yourdomain.com route2.mx.cloudflare.net

MX yourdomain.com route3.mx.cloudflare.net


```

**Configuration:**

* **Type**: MX
* **Name**: `@` (root domain)
* **Mail server**: Cloudflare routing MX servers
* **Priority**: Assigned automatically by Cloudflare

**Purpose**: Authorizes Cloudflare to forward emails on behalf of your domain.

```

TXT yourdomain.com "v=spf1 include:_spf.mx.cloudflare.net ~all"


```

**Configuration:**

* **Type**: TXT
* **Name**: `@` (root domain)
* **Value**: `v=spf1 include:_spf.mx.cloudflare.net ~all`
* **TTL**: Auto

Existing SPF records

If you have existing SPF records, merge them: `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all`.

SPF records are limited to 10 DNS lookups total. If merging pushes you over the limit, consider flattening the record or removing non-essential `include:` entries.

**Purpose**: Provides cryptographic authentication for forwarded emails.

```

TXT cf2024-1._domainkey.yourdomain.com "v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA..."


```

**Configuration:**

* **Type**: TXT
* **Name**: `cf2024-1._domainkey` (selector provided by Cloudflare)
* **Value**: DKIM public key (provided by Cloudflare)
* **TTL**: Auto

**Separate from sending DKIM** \- Email Routing uses its own DKIM selector (`cf2024-1._domainkey`) and keys, distinct from the sending DKIM selector (`cf-bounce._domainkey`).

## Domain verification

Email Sending and Email Routing have separate DNS records and separate settings pages where you can verify their status.

### Verify Email Sending records

1. Go to **Compute** \> **Email Service** \> **Email Sending** \> **Settings**.
2. The **DNS records** section shows all sending-related records:  
   * **MX records** on `cf-bounce.yourdomain.com`  
   * **SPF record** on `cf-bounce.yourdomain.com`  
   * **DKIM record** on `cf-bounce._domainkey.yourdomain.com`  
   * **DMARC record** on `_dmarc.yourdomain.com`
3. Each record shows either a **Locked** or **Unlocked** status. Both states indicate the record is configured correctly; the status reflects whether Email Service is managing the record. Refer to [Locked DNS records](#locked-dns-records) for more information.

### Verify Email Routing records

1. Go to **Compute** \> **Email Service** \> **Email Routing** \> **Settings**.
2. The **DNS records** section shows all routing-related records:  
   * **MX records** on `yourdomain.com`  
   * **SPF record** on `yourdomain.com`  
   * **DKIM record** on `cf2024-1._domainkey.yourdomain.com`
3. Each record shows either a **Locked** or **Unlocked** status. Both states indicate the record is configured correctly; the status reflects whether Email Service is managing the record. Refer to [Locked DNS records](#locked-dns-records) for more information.

### If records are not configured

* Wait 5-15 minutes for DNS propagation.
* Check DNS configuration in your domain's **DNS** \> **Records** settings.

### Locked DNS records

When Email Service onboarding succeeds, the DNS records it manages are locked to prevent accidental changes that would break mail flow. Locked records show a **Locked** status in the dashboard and cannot be edited or deleted from **DNS** \> **Records** until they are unlocked.

Only Email Routing records on the root domain (MX, SPF, and DKIM) support unlocking. Email Sending records on the `cf-bounce` subdomain stay managed by Email Service for the lifetime of the domain configuration.

To unlock an Email Routing record:

1. Go to **Compute** \> **Email Service** \> **Email Routing**.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/email-service/routing)
2. Select the domain, then open **Settings**.
3. Locate the record in the **DNS records** section and select **Unlock**.

If you want to migrate to a different email provider without immediately interrupting service, unlock the routing records first, add the new provider's records alongside them, then remove the Email Service records once the new setup is verified.

### `_dc-mx` DNS responses

This section applies only if your MX records point to hostnames that are proxied through Cloudflare.

When an MX record on your domain points to a hostname that is proxied through Cloudflare, mail delivery to that hostname would normally fail because the Cloudflare proxy does not handle SMTP. To avoid this, Cloudflare automatically inserts a `_dc-mx.<hash>.example.com` record that resolves directly to the origin IP. Sending mail servers follow this record to bypass the proxy and reach the origin.

For more information, refer to [DNS troubleshooting: \_dc- and \_dc-mx subdomains](https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/unexpected-dns-records/#dc--and-%5Fdc-mx-subdomains).

### Verification troubleshooting

* [ DNS propagation ](#tab-panel-8263)
* [ Record conflicts ](#tab-panel-8264)

**Issue**: Records show as "Not Found" immediately after adding.

**Solution**:

* Wait 5-15 minutes for DNS propagation
* Check propagation status: `dig TXT yourdomain.com`
* Cloudflare domains propagate faster than external domains

**Check propagation globally:**

Terminal window

```

# Check sending SPF record

dig TXT cf-bounce.yourdomain.com | grep spf


# Check routing SPF record

dig TXT yourdomain.com | grep spf


# Check sending DKIM record

dig TXT cf-bounce._domainkey.yourdomain.com


# Check routing DKIM record

dig TXT cf2024-1._domainkey.yourdomain.com


# Check routing MX records

dig MX yourdomain.com


# Check sending MX records (bounce handling)

dig MX cf-bounce.yourdomain.com


```

**Issue**: Existing DNS records conflict with Email Service.

**SPF conflicts:**

* Merge existing SPF records
* Remove duplicate `v=spf1` entries
* Ensure only one SPF record exists

**MX conflicts:**

* Email Routing requires Cloudflare MX records
* Remove or update existing MX records
* Cannot use Email Routing with external mail servers

**DKIM conflicts:**

* Use different selectors for different services
* `cf-bounce._domainkey` for Email Sending
* `cf2024-1._domainkey` for Email Routing
* `google._domainkey` for Google Workspace

## Domain management

Email Sending and Email Routing are managed separately. Removing one does not affect the other.

### Remove a domain from Email Sending

1. Go to **Compute** \> **Email Service** \> **Email Sending**.  
[ Go to **Email Sending** ](https://dash.cloudflare.com/?to=/:account/email-service/sending)
2. Select the domain to remove, then open **Settings**.
3. Select **Remove Domain** and confirm the action.

Removing a domain from Email Sending deletes the `cf-bounce` MX, SPF, DKIM, and DMARC records that Email Service created on the domain, and stops all outbound email sending from the domain.

### Remove a domain from Email Routing

1. Go to **Compute** \> **Email Service** \> **Email Routing**.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/email-service/routing)
2. Select the domain to remove, then open **Settings**.
3. Select **Disable Email Routing** and confirm the action.

Disabling Email Routing on a domain stops processing incoming emails and removes every routing-related DNS record (MX, SPF, DKIM) that Email Service added to the root domain. If you plan to switch to a different email provider, [unlock the records](#locked-dns-records) and add the new provider's records before disabling Email Routing so that mail flow is not interrupted.

### Transfer domain ownership

1. The domain must remain in the same Cloudflare account.
2. DNS records are tied to the account, not to specific users.
3. Use Cloudflare account-level permissions to manage access.

## Next steps

* **[Send emails API](https://developers.cloudflare.com/email-service/api/send-emails/)**: Workers binding and REST API reference
* **[Domain authentication (DKIM and SPF)](https://developers.cloudflare.com/email-service/concepts/email-authentication/)**: Learn about SPF, DKIM, and DMARC
* **[Deliverability](https://developers.cloudflare.com/email-service/concepts/deliverability/)**: Optimize email delivery

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/configuration/domains/","name":"Domain configuration"}}]}
```
