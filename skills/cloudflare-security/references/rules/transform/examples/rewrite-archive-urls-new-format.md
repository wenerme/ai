---
title: Rewrite blog archive URLs
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Rewrite blog archive URLs

Create a transform rule to rewrite the URL format `/posts/<YYYY>-<MM>-<DD>-<TITLE>` to the new format `/posts/<YYYY>/<MM>/<DD>/<TITLE>`.

To rewrite the URLs of a blog archive that follow the URL format `/posts/<YYYY>-<MM>-<DD>-<TITLE>` to the new format `/posts/<YYYY>/<MM>/<DD>/<TITLE>`, create the following URL rewrite rule:

Text in **Expression Editor**:

```txt
http.request.uri.path ~ "^/posts/[0-9]+-[0-9]+-[0-9]+-.*"
```

Text after **Path** \> **Rewrite to** \> _Dynamic_:

```txt
regex_replace(http.request.uri.path, "^/posts/([0-9]+)-([0-9]+)-([0-9]+)-(.*)$", "/posts/${1}/${2}/${3}/${4}")
```

The function `regex_replace()` also allows you to extract parts of the URL using regular expressions' capture groups. Create capture groups by putting part of the regular expression in parentheses. Then, reference a capture group using `${<NUMBER>}` in the replacement string, where `<NUMBER>` is the number of the capture group.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/rewrite-archive-urls-new-format/#page","headline":"Rewrite blog archive URLs · Cloudflare Rules docs","description":"Create a transform rule to rewrite the URL format /posts/\\\u003cYYYY>-\\\u003cMM>-\\\u003cDD>-\\\u003cTITLE> to the new format /posts/\\\u003cYYYY>/\\\u003cMM>/\\\u003cDD>/\\\u003cTITLE>.","url":"https://developers.cloudflare.com/rules/transform/examples/rewrite-archive-urls-new-format/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["URL rewrite"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/rewrite-archive-urls-new-format/","name":"Rewrite blog archive URLs"}}]}
```
