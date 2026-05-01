---
title: Internet Content Provider (ICP)
description: Obtain and display an ICP license number required for websites operating in China.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/china-network/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Compliance ](https://developers.cloudflare.com/search/?tags=Compliance) 

# Internet Content Provider (ICP)

To operate a website in China, you need government permission called an Internet Content Provider (ICP) number. Think of it as a permit — without one, your site can be shut down.

The ICP system is a licensing regime established by the Telecommunications Regulations of the People's Republic of China (中华人民共和国电信条例), introduced in September 2000.

Under the ICP regime, all websites with their own domain name that operate inside China must obtain a license. This applies whether the site is hosted on a server in Mainland China or delivered to visitors in China through a CDN. Licenses are issued at the provincial level. You can use the Ministry of Industry and Information Technology (MIIT) website to [check if a domain already has an ICP number ↗](https://beian.miit.gov.cn/#/Integrated/recordQuery) (only available in Chinese).

All public websites in Mainland China must have an ICP number [displayed on the website's home page](#display-your-icp-number). Websites with the same apex domain can share the same ICP number. China-based hosting providers are instructed to shut down any website (often without notice) without an ICP number.

## Types of ICP

To host web services in Mainland China, you are legally required to acquire an **ICP filing** or an **ICP license** in China. An ICP filing covers non-commercial (informational) sites, while an ICP license is required for sites that sell goods or services.

The type of ICP you must obtain depends on the type of website you are providing to customers in China:

| ICP filing         | ICP license                                                                                                                                                                                                   |                                                                                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Definition         | An ICP filing, known in Chinese as “Bei’An,” is the first level of ICP registration. An ICP filing enables the holder to host a website on a server or CDN in Mainland China for informational purposes only. | An ICP license, known as “ICP Zheng” in Chinese, allows online platforms or third-party sellers selling goods and services to deploy their website on a hosting server or CDN within Mainland China. |
| Website Purpose    | Non-commercial and non-transactional purposes.                                                                                                                                                                | Commercial and transactional purposes.                                                                                                                                                               |
| Eligibility        | Representative officeWholly foreign-owned enterpriseJoint ventureLocal companyIndividuals (personal website)                                                                                                  | Joint venture (foreign company with less than 50% ownership)Local company                                                                                                                            |
| Example format     | Beijing ICP preparation XXXXXXXX number                                                                                                                                                                       | Beijing ICP license XXXXXXXX number                                                                                                                                                                  |
| Other requirements | N/A                                                                                                                                                                                                           | Companies acquiring an ICP license must already have obtained an ICP filing.                                                                                                                         |
| Timeline           | 1-2 months                                                                                                                                                                                                    | 2-3 months                                                                                                                                                                                           |

If you wish to host a marketing-related website, you only need an ICP filing.

---

## Obtain an ICP number

Cloudflare recommends that you apply for an ICP license through your hosting or cloud services provider, who will register the ICP number on your behalf. You will need to provide the following documents to your provider:

| For Individuals                                                                                                              | For Commercial Companies                                            |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| – ICP application form– Copy of your personal ID– Forms to authenticate website information– Copy of your domain certificate | – Copy of your business license– Your organization code certificate |

After all required documents are submitted, it can take four to eight weeks to obtain an ICP number, depending on the type of website and the province where the company is registered. Registration with the MIIT is free, but your provider may charge a processing fee.

After receiving the ICP number and the certificate, add it to your website's home page.

## Display your ICP number

After you obtain an ICP number, you must display it in the footer of your website, like in the following example:

![An ICP number displayed in the footer of a website.](https://developers.cloudflare.com/_astro/icp-number-in-footer.BX2CP_mf_1Ozdwp.webp) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/china-network/","name":"China Network"}},{"@type":"ListItem","position":3,"item":{"@id":"/china-network/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/china-network/concepts/icp/","name":"Internet Content Provider (ICP)"}}]}
```
