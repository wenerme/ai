---
title: Update billing information
description: Update payment methods, billing address, or tax IDs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/billing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Update billing information

To avoid potential disruptions in your Cloudflare services, make sure your billing information is current and accurate.

If Cloudflare is unable to process your payment, review [Troubleshooting failed payments](https://developers.cloudflare.com/billing/troubleshoot/troubleshoot-failed-payments/).

## Update payment methods

Note

You may receive the error message "Your account is limited to 2 payment methods, and you've reached that limit. Please remove an existing payment method before adding a new one." when trying to add additional methods.

If you are unable to add or edit a payment method, [delete a payment method](https://developers.cloudflare.com/billing/get-started/update-billing-info/#delete-a-payment-method) and try again.

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Select **Payment**.
3. Select **Manage** next to your current payment method. The **Manage payment methods** dialog opens.
4. Select **Edit** next to the payment method you would like to edit.
5. Enter the required information and select **Save Payment Information**.

## Delete a payment method

Before removing your payment method from file, you must cancel all Cloudflare paid services.

Warning

If you currently subscribe to any [add-on services](https://developers.cloudflare.com/billing/understand/usage-based-billing/), Cloudflare must always have a payment method on file. If you need to remove a payment method, you must enter a new one to replace it.

You cannot delete a payment method if a payment fails or if there is an outstanding balance. Until Cloudflare processes payment, you can only add or edit your payment method.

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Select **Payment**.
3. From **Payment methods**, select **Manage**.
4. Next to your current payment method, select **Delete**.
5. Select **Confirm** to finish.

## Update your billing address

The billing address is associated with your payment method and is used to calculate your sales tax. If you need to update your billing address, you must also enter your payment method. The process for updating your billing address depends on the payment method.

If paying by credit card:

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. From **Billing Address**, select **Edit** and enter your information.
3. Review the suggested address in the pop-up window. If the information is correct, select **Confirm**.

If paying by PayPal, refer to PayPal's [billing address documentation ↗](https://www.paypal.com/ai/smarthelp/article/how-do-i-edit-the-billing-address-linked-to-my-credit-card-faq680).

## Update billing email address

Your billing email address is particularly important if you have [opted into email invoices](https://developers.cloudflare.com/billing/manage/invoices/#enable-email-invoices-from-cloudflare).

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to **Invoices and documents**.
3. From **Billing email preference**, select **Change email address**.
4. Enter and confirm your new email address, then select **Save**.

## Add or change a Tax ID, VAT, or GST number

If you added a payment method but did not include a Tax ID, VAT or GST number, you can add or change the Tax ID, VAT or GST number associated with the payment method afterwards.

Note

You cannot apply a VAT or GST number to past invoices. Adding a VAT or GST number will only apply to future invoices issued in the account.

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to **Payment**.
3. From **Billing Address**, select **Edit**.
4. In the **VAT/GST** field, enter your VAT or GST number.
5. Select **Confirm**.

## Remove a Tax ID, VAT, or GST number

Note

You cannot remove a VAT or GST number from past invoices. Removing a VAT or GST number will only apply to future invoices issued in the account.

1. In the Cloudflare dashboard, go to the **Billing** page.  
[ Go to **Billing** ](https://dash.cloudflare.com/?to=/:account/billing)
2. Go to **Payment**.
3. From **Billing Address**, select **Edit**.
4. In the **VAT/GST** field, delete the VAT or GST number.
5. Select **Confirm**.

## Related resources

* [Create billing profile](https://developers.cloudflare.com/billing/get-started/create-billing-profile/) — Set up your initial payment method
* [Invoices](https://developers.cloudflare.com/billing/manage/invoices/) — View and download invoices
* [Sales tax](https://developers.cloudflare.com/billing/understand/sales-tax/) — How tax is calculated based on your billing address

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/billing/","name":"Billing"}},{"@type":"ListItem","position":3,"item":{"@id":"/billing/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/billing/get-started/update-billing-info/","name":"Update billing information"}}]}
```
