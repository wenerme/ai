---
title: URL forwarding with Page Rules
description: Page Rules allow you to forward or redirect traffic to a different URL, though they are just one of the options provided by Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/page-rules/how-to/url-forwarding.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# URL forwarding with Page Rules

Page Rules allow you to forward or redirect traffic to a different URL, though they are just one of the [options provided by Cloudflare](https://developers.cloudflare.com/fundamentals/reference/redirects/).

Note

Consider alternative [Rules](https://developers.cloudflare.com/rules/) options due to their enhanced configurability. Refer to the [migration guide](https://developers.cloudflare.com/rules/reference/page-rules-migration/) for details.

For more flexibility and customization, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

---

## Redirect with Page Rules

To configure URL forwarding or redirects using Page Rules:

1. In the Cloudflare dashboard, go to the **Page Rules** page.  
[ Go to **Page Rules** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/page-rules)
2. Select **Create Page Rule**.
3. Under **If the URL matches**, enter the URL or URL pattern that should match the rule.
4. In **Pick a Setting**, choose **Forwarding URL** from the drop-down menu.
5. For **Select status code**, choose _301 - Permanent Redirect_ or _302 - Temporary Redirect_.
6. Enter the destination URL.
7. Select **Save and Deploy Page Rule**.

Note

Page Rules require a [proxied DNS record](https://developers.cloudflare.com/dns/proxy-status/) to work. Page Rules will not apply to subdomains that do not exist in DNS or are not being directed to Cloudflare.

---

## Forwarding examples

Imagine you want site visitors to reach your website for a variety of URL patterns. For instance, the page rule URL patterns `*www.example.com/products` and `*example.com/products` match:

```

http://example.com/products


http://www.example.com/products


https://www.example.com/products


https://blog.example.com/products


https://www.blog.example.com/products


```

but do not match:

```

http://www.example.com/blog/products (extra directory)

or

http://www.example.comproducts (no trailing slash)


```

Once you have created the pattern that matches what you want, select the **Forwarding** toggle. This will display a field where you can enter the address you want requests forwarded to.

```

https://example.com/products


```

If you enter the address above in the forwarding box and select **Add Rule**, within a few seconds any requests that match the pattern you entered will automatically be forwarded with an `HTTP 302` redirect status code to the new URL.

---

## Advanced forwarding options

If you use a basic redirect, such as forwarding the apex domain (`example.com`) to `www.example.com`, then you lose anything else in the URL.

For example, you could set up the pattern:

```

example.com


```

And have it forward to:

```

http://www.example.com


```

However, if someone entered `example.com/some-particular-page.html`, they would be redirected to:

```

www.example.com


```

Instead of:

```

www.example.com/some-particular-page.html


```

The solution is to use variables. Each wildcard corresponds to a variable when can be referenced in the forwarding address. The variables are represented by a `$` (dollar sign) followed by a number. To refer to the first wildcard you would use `$1`, to refer to the second wildcard you would use `$2`, and so on.

To fix the forwarding from the apex to `www` in the above example, you could use the same pattern:

```

example.com/*


```

You would then set up the following URL for traffic to forward to:

```

http://www.example.com/$1


```

In this case, if someone went to:

```

example.com/some-particular-page.html


```

They would be redirected to:

```

http://www.example.com/some-particular-page.html


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/page-rules/","name":"Page Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/page-rules/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/page-rules/how-to/url-forwarding/","name":"URL forwarding with Page Rules"}}]}
```
