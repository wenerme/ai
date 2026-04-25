---
title: Compression Rules examples
description: Example Compression Rules for Brotli, Gzip, and Zstandard configurations.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Compression Rules examples

[Disable Brotli compressionCreate a compression rule to turn off Brotli compression for all incoming requests of a given zone.](https://developers.cloudflare.com/rules/compression-rules/examples/disable-all-brotli/)[Disable compression for AVIF imagesCreate a compression rule to turn off compression for AVIF images, based on either the content type or the file extension specified in the request.](https://developers.cloudflare.com/rules/compression-rules/examples/disable-compression-avif/)[Enable Zstandard compression for default content typesCreate a compression rule to turn on Zstandard compression for response content types where Cloudflare applies compression by default.](https://developers.cloudflare.com/rules/compression-rules/examples/enable-zstandard/)[Use Gzip compression for CSV filesCreate a compression rule to set Gzip compression as the preferred compression method for CSV files.](https://developers.cloudflare.com/rules/compression-rules/examples/gzip-for-csv/)[Use only Brotli compression for a specific pathCreate a compression rule to set Brotli as the only supported compression algorithm for a specific URI path.](https://developers.cloudflare.com/rules/compression-rules/examples/only-brotli-url-path/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/compression-rules/","name":"Compression Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/compression-rules/examples/","name":"Compression Rules examples"}}]}
```
