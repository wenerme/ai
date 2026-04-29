---
title: Run test
description: Learn how to use Cloudflare's Observatory to assess the performance of your website.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Run test

## Run Synthetic test

1. In the Cloudflare dashboard, go to the **Synthetic Monitoring** page.  
[ Go to **Synthetic monitoring** ](https://dash.cloudflare.com/?to=/:account/:zone/speed/test)
2. Enter the URL you want to test. The URL must belong to the zone you are testing from.
3. Select the test type you want to use: **Browser** or **Network tests**.
4. Select the **Region** the automated browser will use.
5. Depending on your plan you can select to run the test **once**, **daily** or **weekly**. Refer to the [Quotas](https://developers.cloudflare.com/speed/observatory/run-speed-test/#quotas) section for information on the test frequency available for your plan. Note that these limits may change over time.
6. After the test finishes running, you will get a Lighthouse score and you will have access to the list of the tests run. The test result page will give you details regarding the performance of your website, both for the desktop and mobile versions. Refer to [Understand test results](https://developers.cloudflare.com/speed/observatory/test-results/) for more information.

Note

For **IPv6** Cloudflare Observatory tests originate from **ASN 15169** or **ASN 132892** and are generated with the following user agents:

* Mozilla/5.0 (Linux; Android 11; Moto G Power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36
* Mozilla/5.0 (Macintosh; Intel Mac OS X 10\_15\_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36

For **IPv4** Cloudflare Observatory tests originate from **ASN 396982** and are generated with the following user agents:

* Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36 CloudflareObservatory/1.0
* Mozilla/5.0 (Macintosh; Intel Mac OS X 10\_15\_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 CloudflareObservatory/1.0

### Recommendations

Observatory shows you a **Recommendations** tab, depending on the results from testing your website. The **Recommendations** section shows you the opportunities to improve your website that were identified based on the Lighthouse audits and recommends Cloudflare features or products that will help you improve those metrics. We also show you the potential savings you will get by enabling the recommended features or products.

### Trend and History report

In the Tested URLs table, in the last column, you can select the three dots > **View history report**, and you will have access to the **Trend** table that will show your website’s performance metrics over time and a **History report** of all the tests you run on your website.

## Enable real user monitoring (RUM)

Once a test has been run, you can enable [RUM](https://developers.cloudflare.com/speed/observatory/#real-user-monitoring-rum) data in the test results page:

1. Go to **Observatory** and select **Enable RUM**. You can choose to enable globally or enable everywhere except the EU.
2. Once RUM data is running on your site, you can access **Real user measurements** on your test results page. Usually it takes less than five minutes to see the data coming in, but it will depend on traffic.

Refer to [Understand test results](https://developers.cloudflare.com/speed/observatory/test-results/) for more information about the results provided by real user data.

### Information collected

RUM uses a lightweight JavaScript beacon to collect the information Observatory uses. It does not use any client-side state, such as cookies or `localStorage`, to collect usage metrics.

## Quotas

Quota limits for the number of tests you can run per month are currently the following:

| Plan       | One-off tests | Recurring tests | Frequency of recurring tests |
| ---------- | ------------- | --------------- | ---------------------------- |
| Pro        | 50            | 5               | Daily                        |
| Business   | 100           | 10              | Daily                        |
| Enterprise | 150           | 15              | Daily                        |

**Available Regions (all plans):**

| Region              | Region                 | Region                  |
| ------------------- | ---------------------- | ----------------------- |
| Iowa, USA           | Hamina, Finland        | Changhua County, Taiwan |
| South Carolina, USA | Madrid, Spain          | Tokyo, Japan            |
| North Virginia, USA | St. Ghislain, Belgium  | Osaka, Japan            |
| Dallas, USA         | Eemshaven, Netherlands | Jurong West, Singapore  |
| Oregon, USA         | Milan, Italy           | Sydney, Australia       |
| London, England     | Paris, France          | Mumbai, India           |
| Frankfurt, Germany  | Tel Aviv, Israel       | São Paulo, Brazil       |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/observatory/","name":"Observatory (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/observatory/run-speed-test/","name":"Run test"}}]}
```
