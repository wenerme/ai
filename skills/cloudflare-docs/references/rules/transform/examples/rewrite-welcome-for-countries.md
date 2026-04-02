---
title: Rewrite page path for visitors in specific countries
description: Create two URL rewrite rules (part of Transform Rules) to rewrite the path of the welcome page for visitors in specific countries.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ URL rewrite ](https://developers.cloudflare.com/search/?tags=URL%20rewrite) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/examples/rewrite-welcome-for-countries.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Rewrite page path for visitors in specific countries

Create two URL rewrite rules (part of Transform Rules) to rewrite the path of the welcome page for visitors in specific countries.

To have a welcome page in two languages, create two URL rewrite rules with a static rewrite of the path component:

**URL rewrite rule #1**

Text in **Expression Editor**:

```

http.request.uri.path == "/welcome.html" && ip.src.country == "GB"


```

Text after **Path** \> **Rewrite to** \> _Static_:

```

/welcome-gb.html


```

**URL rewrite rule #2**

Text in **Expression Editor**:

```

http.request.uri.path == "/welcome.html" && ip.src.country == "PT"


```

Text after **Path** \> **Rewrite to** \> _Static_:

```

/welcome-pt.html


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/rewrite-welcome-for-countries/","name":"Rewrite page path for visitors in specific countries"}}]}
```
