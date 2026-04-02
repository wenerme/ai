---
title: Enable Consent Management
description: Your Consent Management platform is ready. Your website should now display a modal asking for consent for the tools you have configured.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/zaraz/consent-management/enable-consent-management.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Enable Consent Management

1. In the Cloudflare dashboard, go to the **Consent** page.  
[ Go to **Consent** ](https://dash.cloudflare.com/?to=/:account/tag-management/consent)
2. Turn on **Enable Consent Management**.
3. In **Consent modal text** fill in any legal information required in your country. Use HTML code to format your information as you would in any other HTML editor.
4. Under **Purposes**, select **Add new Purpose**. Give your new purpose a name and a description. Purposes are the reasons for using third-party tools in your website.
5. In **Assign purpose to tools**, match tools to purposes by selecting one of the purposes previously created from the drop-down menu. Do this for all your tools.
6. Select **Save**.

Your Consent Management platform is ready. Your website should now display a modal asking for consent for the tools you have configured.

## Adding different languages

In your Zaraz consent settings, you can add your consent modal text and purposes in various languages.

1. In the Cloudflare dashboard, go to the **Consent** page.  
[ Go to **Consent** ](https://dash.cloudflare.com/?to=/:account/tag-management/consent)
2. Select a default language of your choice. The default setting is English.
3. In **Consent modal text** and **Purposes**, you can select different languages and add translations.

## Overriding the consent modal language

By default, the Zaraz Consent Management Platform will try to match the language of the consent modal with the language requested by the browser, using the `Accept-Language` HTTP header. If, for any reason, you would like to force the consent modal language to a specific one, you can use the `zaraz.set` Web API to define the default `__zarazConsentLanguage` value.

Below is an example that forces the language shown to be American English.

```

<script>

  zaraz.set('__zarazConsentLanguage', 'en-US')

</script>


```

## Next steps

If the default consent modal does not suit your website's design, you can use the [Custom CSS tool](https://developers.cloudflare.com/zaraz/consent-management/custom-css/) to add your own custom design.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/consent-management/","name":"Consent management"}},{"@type":"ListItem","position":4,"item":{"@id":"/zaraz/consent-management/enable-consent-management/","name":"Enable Consent Management"}}]}
```
