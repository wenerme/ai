---
title: Block pages
description: For DNS policies, you will need to enable the block page on a per-policy basis.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/learning-paths/cybersafe/gateway-onboarding/gateway-block-pages.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Block pages

## Enable the block page for DNS policies

For DNS policies, you will need to enable the block page on a per-policy basis.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Traffic policies** \> **Firewall policies** \> **DNS**.
2. Select **Add a policy** to create a new policy, or choose the policy you want to customize and select **Edit**. You can only edit the block page for policies with a Block action.
3. Under **Configure policy settings**, turn on **Modify Gateway block behavior**.
4. Choose your block behavior:  
   * **Use account-level block setting**: Use the global block page setting configured in your account settings. The global setting can be the default Gateway block page, an [HTTP redirect](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#redirect-to-a-block-page), or a [custom Gateway block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#customize-the-block-page).  
   * **Override account setting with URL redirect**: Redirect users with a `307` HTTP redirect to a URL you specify on a policy level.
5. (Optional) If your account-level block page setting uses a custom Gateway block page, you can turn on **Add an additional message to your custom block page when traffic matches this policy** to add a custom message to your custom block page when traffic is blocked by this policy. This option will replace the **Message** field.
6. Select **Save policy**.

Depending on your settings, Gateway will display a block page in your users' browsers or redirect them to a specified URL when they are blocked by this policy.

## Customize the block page

You can customize the Cloudflare-hosted block page by making global changes that Gateway will display every time a user reaches your block page. Customizations will apply regardless of the type of policy (DNS or HTTP) that blocks the traffic.

To customize your block page:

* [ Dashboard ](#tab-panel-5080)
* [ Terraform (v5) ](#tab-panel-5081)

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Reusable components** \> **Custom pages**.
2. Under **Account Gateway block page**, select **Customize**.
3. Choose **Custom Gateway block page**. Gateway will display a preview of your custom block page. Available customizations include:  
   * Your organization's name  
   * [Logo](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#add-a-logo-image)  
   * Header text  
   * Global block message, which will be displayed above the policy-specific block message  
   * [Mailto link](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#allow-users-to-email-an-administrator)  
   * Background color
4. Select **Save**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. In [cloudflare\_zero\_trust\_gateway\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fgateway%5Fsettings), configure the `block_page` argument with your customizations:  
```  
resource "cloudflare_zero_trust_gateway_settings" "team_name" {  
  account_id = var.cloudflare_account_id  
  settings = {  
    block_page = {  
      enabled = true //do not use the default Gateway block page  
      mode = "customized_block_page" //use a custom block page  
      name = "Cloudflare"  
      logo_path = "https://logos.com/a.png"  
      header_text = "--header--"  
      footer_text = "--footer--"  
      mailto_address = "admin@example.com"  
      mailto_subject = "Blocked Request"  
      background_color = "#ffffff"  
      suppress_footer = false  
    }  
  }  
}  
```

Gateway will now display a custom Gateway block page when your users visit a blocked website.

### Add a logo image

You can include an external logo image to display on your custom block page. The block page resizes all images to 146x146 pixels. The URL must be valid and no longer than 2048 characters. Accepted file types include SVG, PNG, JPEG, and GIF.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/","name":"Onboarding Cloudflare Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/gateway-block-pages/","name":"Block pages"}}]}
```
