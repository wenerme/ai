---
title: Generate a key pair
description: Generate a public/private key pair for payload logging encryption.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/managed-rules/payload-logging/command-line/generate-key-pair.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Generate a key pair

Generate a public/private key pair using the Cloudflare [matched-data-cli ↗](https://github.com/cloudflare/matched-data-cli) command-line tool. After generating a key pair, enter the generated public key in the payload logging configuration.

Do the following:

1. [Download ↗](https://github.com/cloudflare/matched-data-cli/releases) the `matched-data-cli` tool for your platform from the **Releases** page on GitHub, under **Assets**.
2. Extract the content of the downloaded `.tar.gz` file to a local folder.
3. Open a terminal and go to the local folder containing the `matched-data-cli` tool.  
Terminal window  
```  
cd matched-data-cli  
```
4. Run the following command:  
Terminal window  
```  
./matched-data-cli generate-key-pair  
```  
```  
{  
  "private_key": "uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=",  
  "public_key": "Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8="  
}  
```

After generating the key pair, copy the public key value and enter it in the payload logging configuration.

## Troubleshooting macOS errors

If you are using macOS, the operating system may block the `matched-data-cli` tool, depending on your security settings.

For instructions on how to execute unsigned binaries like the `matched-data-cli` tool in macOS, refer to the [Safely open apps on your Mac ↗](https://support.apple.com/en-us/102445#openanyway) page in Apple Support.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/payload-logging/","name":"Log the payload of matched rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/payload-logging/command-line/","name":"Command-line operations"}},{"@type":"ListItem","position":6,"item":{"@id":"/waf/managed-rules/payload-logging/command-line/generate-key-pair/","name":"Generate a key pair"}}]}
```
