---
title: Enable audit logs
description: Enable email security audit logs via Logpush.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Enable audit logs

With Email security, you can enable logs to review actions performed on your account.

To enable audit logs:

1. In the Cloudflare dashboard, go to the **Logpush** page.  
[ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)
2. Select your storage destination.
3. Select the three dots > **Edit**.
4. Under **Configure logpush job**:  
   * **Job name**: Enter the job name, if it is not already prepopulated.  
   * **If logs match** \> Select **Filtered logs**:  
         * **Field**: Choose `ResourceType`.  
         * **Operator**: Choose `starts with`.  
         * **Value**: Enter `email_security`.
5. Select **Submit**.

You can now view logs via the Cloudflare dashboard.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/","name":"Configure Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/audit-logs/","name":"Enable audit logs"}}]}
```
