---
title: Domain configuration
description: Configure your domains to work with Cloudflare Email Service. This includes DNS record management, domain verification, and advanced domain settings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-service/configuration/domains.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Domain configuration

Configure domains for Cloudflare Email Service, manage DNS records, and verify domain setup for both email sending and routing.

Configure your domains to work with Cloudflare Email Service. This includes DNS record management, domain verification, and advanced domain settings.

## Automatic DNS configuration

You can quickly get your DNS configured by following the automatic DNS configuration flow as part of the onboarding onto Email Service.

1. Log in to the [Cloudflare Dashboard ↗](https://dash.cloudflare.com).
2. Navigate to **Compute** \> **Email Service** \> **Email Sending** or **Email Routing**.
3. Select **Onboard Domain**.
4. Choose a domain from your Cloudflare account.
5. Select **Next** to configure DNS records.
6. Press **Add records and onboard**. This will add the following DNS records to your domain:  
   * TXT records for SPF to authorize sending emails and routing forwarded emails.  
   * TXT records for DKIM to provide authentication for emails sent and forwarded from your domain.  
   * MX records to route incoming emails to Email Service.

## DNS record configuration details

Cloudflare automatically configures required DNS records for both email sending and routing when you onboard a domain onto Email Service. Here are the specific details of the DNS records configured:

### Sending records

These records authenticate your outbound emails. Email Sending creates DNS records on a `cf-bounce.` subdomain of your domain to handle bounce processing. These are separate from the records used by Email Routing.

* [ MX Records ](#tab-panel-6717)
* [ SPF Record ](#tab-panel-6718)
* [ DKIM Record ](#tab-panel-6719)
* [ DMARC Record ](#tab-panel-6720)

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

* [ MX Records ](#tab-panel-6721)
* [ SPF Record ](#tab-panel-6722)
* [ DKIM Record ](#tab-panel-6723)

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

Existing SPF Records

If you have existing SPF records, merge them: `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all`

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
3. Each record shows a **Locked** status when properly configured.

### Verify Email Routing records

1. Go to **Compute** \> **Email Service** \> **Email Routing** \> **Settings**.
2. The **DNS records** section shows all routing-related records:  
   * **MX records** on `yourdomain.com`  
   * **SPF record** on `yourdomain.com`  
   * **DKIM record** on `cf2024-1._domainkey.yourdomain.com`
3. Each record shows a **Locked** status when properly configured.

### If records are not configured

* Wait 5-15 minutes for DNS propagation.
* Check DNS configuration in your domain's **DNS** \> **Records** settings.

### Verification troubleshooting

* [ DNS Propagation ](#tab-panel-6724)
* [ Record Conflicts ](#tab-panel-6725)

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

Explain Code

**Issue**: Existing DNS records conflict with Email Service.

**SPF Conflicts:**

* Merge existing SPF records
* Remove duplicate `v=spf1` entries
* Ensure only one SPF record exists

**MX Conflicts:**

* Email Routing requires Cloudflare MX records
* Remove or update existing MX records
* Cannot use Email Routing with external mail servers

**DKIM Conflicts:**

* Use different selectors for different services
* `cf-bounce._domainkey` for Email Sending
* `cf2024-1._domainkey` for Email Routing
* `google._domainkey` for Google Workspace

## Domain management

### Remove a domain

1. Go to **Compute** \> **Email Service** \> **Email Sending** \> **Settings**.
2. Select the domain to remove.
3. Select **Remove Domain**.
4. Confirm removal.

Domain Removal Impact

Removing a domain will:

* Stop all email sending from that domain
* Disable email routing for that domain
* Require reconfiguration if re-added

### DNS record management

When you remove a domain from Email Service, you have two options for handling the DNS records:

**Option 1: Remove all records**

This removes all Email Service DNS records from your domain:

* All SPF, DKIM, and MX records for Email Service are deleted
* Your domain will no longer receive or send emails through Email Service
* If you want to use Email Service again in the future, you will need to onboard the domain and add all records from scratch

**Option 2: Keep records**

This keeps the DNS records in place but disables Email Service:

* DNS records remain in your domain configuration
* Email Service stops processing emails for the domain
* You can re-enable Email Service by onboarding the domain again
* DNS records that were automatically added will remain locked to prevent accidental deletion

To modify locked records after removal:

1. Go to your domain's **DNS** \> **Records**.
2. Find the locked Email Service records.
3. Select the record and choose **Edit**.
4. Toggle **Unlock record** to enable editing.
5. Make your changes and save.

Note

Keeping records is useful if you plan to re-enable Email Service later. Removing records is recommended if you are migrating to a different email provider.

### Transfer domain ownership

1. Domain must remain in the same Cloudflare account.
2. DNS records are tied to the account, not specific users.
3. Use Cloudflare account-level permissions to manage access.

## Next steps

* **[Send emails API](https://developers.cloudflare.com/email-service/api/send-emails/)**: Workers binding and REST API reference
* **[Domain authentication (DKIM and SPF)](https://developers.cloudflare.com/email-service/concepts/email-authentication/)**: Learn about SPF, DKIM, and DMARC
* **[Deliverability](https://developers.cloudflare.com/email-service/concepts/deliverability/)**: Optimize email delivery

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/configuration/domains/","name":"Domain configuration"}}]}
```
