---
description: Troubleshoot issues with client certificates
title: Troubleshooting
image: https://developers.cloudflare.com/ssl/client-certificates/troubleshooting/og.png?v=04b850695bb032e9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Troubleshooting

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ssl/client-certificates/troubleshooting/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

If your query returns an error even after configuring and embedding a client SSL certificate, check the following settings.

Note

Before troubleshooting, disable VPNs and proxies. These can interfere with the mTLS handshake.

---

## Check SSL/TLS handshake

On your terminal, use the following command to check whether an SSL/TLS connection can be established successfully between the client and the API endpoint.

```sh
curl --verbose --cert /path/to/certificate.pem --key /path/to/key.pem https://your-api-endpoint.com
```

If the SSL/TLS handshake cannot be completed, check whether the certificate and the private key are correct. If the handshake completes but requests are still blocked, confirm that Cloudflare is verifying the client certificate.

---

## Check mTLS hosts

Check whether [mTLS has been enabled](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/) for the correct host. The host should match the API endpoint that you want to protect.

---

## Review mTLS rules

To review mTLS rules, consider the steps below. For further guidance refer to [Custom rules](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/).

1. In the Cloudflare dashboard, go to the **Security rules** page. [Go to **Security rules** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. On a specific rule, select **Edit**.
3. On that rule, check whether:
   - The Expression Preview is correct.
   - The hostname, if defined, matches your API endpoint. For example, for the API endpoint `api.trackers.ninja/time`, the rule should look like:

     ```txt
     (http.host in {"api.trackers.ninja"} and not cf.tls_client_auth.cert_verified)
     ```

4. To edit the rule, either use the user interface or select **Edit expression**.

---

## Advanced debugging

You can use [Cloudflare Workers](https://developers.cloudflare.com/workers/) to debug client certificate validation failures.

1. Create a Worker to debug print [cf.properties](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties):

   ```js
   export default {
     async fetch(request, env, ctx) {
       console.info({ message: JSON.stringify(request.cf, null, 2) });
       return new Response(JSON.stringify(request.cf, null, 2))
     }
   };
   ```

2. Associate the Worker with the hostname where mTLS is enabled using a [Worker route](https://developers.cloudflare.com/workers/configuration/routing/routes/) or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
3. Make requests to the hostname and/or path configured, with and without sending the mTLS client certificate.
4. View your logs on the [Observability](https://developers.cloudflare.com/workers/observability/) dashboard and compare the responses against the expected values listed below. [Go to **Observability** ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages/observability)

- Valid certificate

  ```json
  "tlsClientAuth": {
    "certPresented": "1",
    "certVerified": "SUCCESS",
  },
  ```

- Invalid certificate (for example, self-signed certificates)

  ```json
  "tlsClientAuth": {
    "certPresented": "1",
    "certVerified": "FAILED:self signed certificate",
  },
  ```

- No certificate

  ```json
  "tlsClientAuth": {
    "certPresented": "0",
    "certVerified": "NONE",
  },
  ```

---

## Certificate quota reached

### Cloudflare-managed CA

Cloudflare-managed client certificates count against a per-zone quota. To free up a slot, revoke certificates you no longer need. Revoking a certificate immediately releases the slot.

To list and revoke certificates, refer to the [client certificates API](https://developers.cloudflare.com/api/resources/ssl/subresources/client_certificates/).

### Bring your own CA (BYOCA)

Each Enterprise account can upload up to five CA certificates for [BYOCA](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/). This quota is shared across [API Shield](https://developers.cloudflare.com/api-shield/security/mtls/configure/), [Workers mTLS](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls/), and [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/).

If you exceed this limit, the API returns:

```txt
{
  "code": 1489,
  "message": "Hit maximum CA cert allocation."
}
```

To free a slot, you must first remove all hostname associations from the CA before deleting it. To increase your quota, contact your account team.

Note

CAs uploaded through [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/identity/devices/warp-client-checks/client-certificate/) use a separate quota. Error `12130` ("maximum number of certificates has been reached") in Access refers to the Access-specific certificate limit, not the BYOCA quota described in [Bring your own CA (BYOCA)](#bring-your-own-ca-byoca).

---

## BYOCA certificate upload errors

When uploading a CA certificate for [Bring your own CA (BYOCA)](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/), the certificate must meet the following requirements:

- The CA certificate can be from a publicly trusted CA or self-signed.
- In the certificate `Basic Constraints`, the attribute `CA` must be set to `TRUE`.
- The certificate must use one of the signature algorithms listed below:<details><summary>

  Allowed signature algorithms</summary>

<code>x509.SHA1WithRSA</code>

  <code>x509.SHA256WithRSA</code>

  <code>x509.SHA384WithRSA</code>

  <code>x509.SHA512WithRSA</code>

  <code>x509.ECDSAWithSHA1</code>

  <code>x509.ECDSAWithSHA256</code>

  <code>x509.ECDSAWithSHA384</code>

  <code>x509.ECDSAWithSHA512</code></details>

### Upload the CA certificate, not a leaf certificate

The certificate you upload must be a CA certificate — that is, it must have `Basic Constraints: CA=TRUE` in its extensions. It is the certificate that directly issued your client certificates, not a client certificate itself.

A common cause of upload failure is uploading a leaf (client) certificate instead of the CA certificate. If your certificate chain is `Root CA → Intermediate CA → Client certificate`, upload the Intermediate CA (which has `CA:TRUE`), not the client certificate.

To confirm whether a certificate is a CA certificate, run:

```sh
openssl x509 -in certificate.pem -noout -text | grep -A1 "Basic Constraints"
```

The output should include `CA:TRUE`. If it shows `CA:FALSE` or the field is absent, the certificate is not a CA certificate and cannot be uploaded.

### Unsupported signature algorithm

The CA certificate must use one of the following signature algorithms:

- `SHA1WithRSA`, `SHA256WithRSA`, `SHA384WithRSA`, `SHA512WithRSA`
- `ECDSAWithSHA1`, `ECDSAWithSHA256`, `ECDSAWithSHA384`, `ECDSAWithSHA512`

If the CA certificate uses a different algorithm, re-issue it using a supported one.

### Malformed PEM content

The `certificates` field in the upload request must contain valid, properly delimited PEM content. Ensure the certificate starts with `-----BEGIN CERTIFICATE-----` and ends with `-----END CERTIFICATE-----`. Do not include private keys or certificate signing requests in this field.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/client-certificates/troubleshooting/#page","headline":"Troubleshooting","description":"Troubleshoot issues with client certificates","url":"https://developers.cloudflare.com/ssl/client-certificates/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/ssl/client-certificates/troubleshooting/og.png?v=04b850695bb032e9","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
```
