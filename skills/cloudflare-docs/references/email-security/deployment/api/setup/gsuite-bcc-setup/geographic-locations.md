---
title: Geographic locations
description: Select from the following BCC addresses to process email in the correct geographic location.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/deployment/api/setup/gsuite-bcc-setup/geographic%20locations.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Geographic locations

Select from the following BCC addresses to process email in the correct geographic location.

| Host                                                                  | Location                | Note                                                                                                               |
| --------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| <customer\_name>@journaling.mxrecord.io                               | US                      | Best option to ensure all email traffic processing happens US data centers.                                        |
| <customer\_name>@journaling.mailstream-eu-primary.mxrecord.io         | EU                      | Best option to ensure all email traffic processing happens in Germany, with backup to US data centers.             |
| <customer\_name>@journaling.mailstream-eu1.mxrecord.io                | EU                      | Best option to ensure all email traffic processing happens within the EU without backup to US data centers.        |
| <customer\_name>@journaling.mailstream-bom.mxrecord.mx                | India                   | Best option to ensure all email traffic processing happens within India.                                           |
| <customer\_name>@journaling.mailstream-india-primary.mxrecord.mx      | India                   | Same as mailstream-bom.mxrecord.mx, with backup to US data centers.                                                |
| <customer\_name>@journaling.mailstream-asia.mxrecord.mx               | India                   | Best option to ensure all email traffic processing happens in India, with Australia data centers as backup.        |
| <customer\_name>@journaling.mailstream-syd.area1.cloudflare.net       | Australia / New Zealand | Best option to ensure all email traffic processing happens within Australia.                                       |
| <customer\_name>@journaling.mailstream-australia.area1.cloudflare.net | Australia / New Zealand | Best option to ensure all email traffic processing happens in Australia, with India and US data centers as backup. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/deployment/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/deployment/api/","name":"API"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/deployment/api/setup/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/","name":"Gmail BCC setup"}},{"@type":"ListItem","position":7,"item":{"@id":"/email-security/deployment/api/setup/gsuite-bcc-setup/geographic-locations/","name":"Geographic locations"}}]}
```
