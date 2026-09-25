---
description: Remove the password from a private key file before uploading.
title: Remove key file password
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Remove key file password

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/remove-file-key-password/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

You cannot upload a custom certificate with a password-protected key file.

The process for removing the password depends on your operating system. The following examples remove the password from `example.com.key`.

<details>

<summary>

Linux

</summary>

1. Open a command console.
2. Go to the directory containing the <code>example.com.key</code> file.
3. Copy the original key.

   ```sh
   cp example.com.key temp.key
   ```


4. Run the following command (if using an ECDSA certificate, replace <code>rsa</code> with <code>ec</code>).

   ```sh
   openssl rsa -in temp.key -out example.com.key
   ```


5. When prompted in the console window, enter the original key password.
6. <a href="https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate">Upload the file contents</a> to Cloudflare.

</details>

<details>

<summary>

Windows

</summary>

1. Go to <a href="https://indy.fulgan.com/SSL/">https://indy.fulgan.com/SSL/ ↗︎</a> and download the latest version of OpenSSL for your x86 or x86\_64 operating system.
2. Open the <code>.zip</code> file and extract it.
3. Select **openssl.exe**.
4. In the command window that appears, run:

   ```sh
   rsa -in C:\Path\To\example.com.key -out key.pem
   ```


5. Enter the original key password when prompted by the **openssl.exe** command window.
6. <a href="https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate">Upload</a> the contents of the <code>key.pem</code> file to Cloudflare.

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/remove-file-key-password/#page","headline":"Remove key file password","description":"Remove the password from a private key file before uploading.","url":"https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/remove-file-key-password/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
