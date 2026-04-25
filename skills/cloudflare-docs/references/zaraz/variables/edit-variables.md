---
title: Edit variables
description: Edit existing Zaraz variables.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Edit variables

1. In the Cloudflare dashboard, go to the **Tag setup** page.  
[ Go to **Tag setup** ](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Go to **Tools Configuration** \> **Variables**.
3. Locate the variable you want to edit, and select **Edit** to make your changes.
4. Select **Save** to save your edits.

## Delete a variable

Important

You cannot delete a variable being used in tools or triggers.

1. In the Cloudflare dashboard, go to the **Tag setup** page.  
[ Go to **Tag setup** ](https://dash.cloudflare.com/?to=/:account/tag-management/zaraz)
2. Go to **Tools Configuration** \> **Third-party tools**.
3. Locate any tools using the variable, and delete the variable from those tools.
4. Select **Zaraz** \> **Tools Configuration** \> **Triggers**.
5. Locate all the triggers using the variable, and delete the variable from those triggers.
6. Navigate to **Zaraz** \> **Tools Configuration** \> **Variables**.
7. Locate the variable you want to delete, and select **Delete**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/zaraz/","name":"Zaraz"}},{"@type":"ListItem","position":3,"item":{"@id":"/zaraz/variables/","name":"Variables"}},{"@type":"ListItem","position":4,"item":{"@id":"/zaraz/variables/edit-variables/","name":"Edit variables"}}]}
```
