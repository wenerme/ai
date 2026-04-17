---
title: Remove key file password
description: Remove the password from a private key file before uploading.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ssl/edge-certificates/custom-certificates/remove-file-key-password.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Remove key file password

You cannot upload a custom certificate with a password-protected key file.

The process for removing the password depends on your operating system. The following examples remove the password from `example.com.key`.

Linux

1. Open a command console.
2. Go to the directory containing the `example.com.key` file.
3. Copy the original key.  
Terminal window  
```  
cp example.com.key temp.key  
```
4. Run the following command (if using an ECDSA certificate, replace `rsa` with `ec`).  
Terminal window  
```  
openssl rsa -in temp.key -out example.com.key  
```
5. When prompted in the console window, enter the original key password.
6. [Upload the file contents](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate) to Cloudflare.

Windows

1. Go to [https://indy.fulgan.com/SSL/ ↗](https://indy.fulgan.com/SSL/) and download the latest version of OpenSSL for your x86 or x86\_64 operating system.
2. Open the `.zip` file and extract it.
3. Select **openssl.exe**.
4. In the command window that appears, run:  
Terminal window  
```  
rsa -in C:\Path\To\example.com.key -out key.pem  
```
5. Enter the original key password when prompted by the **openssl.exe** command window.
6. [Upload](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate) the contents of the `key.pem` file to Cloudflare.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/custom-certificates/","name":"Custom certificates"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/custom-certificates/remove-file-key-password/","name":"Remove key file password"}}]}
```
