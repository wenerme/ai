---
description: Detect phishing domains and impersonation attempts targeting your brand.
title: Brand Protection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt
> Use this file to discover all available pages before exploring further.

# Brand Protection

Last updated Jun 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/security-center/brand-protection/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Brand Protection allows you to proactively identify and mitigate domain impersonation and phishing attacks. By monitoring newly registered domains and visual assets across the Internet, Cloudflare helps protect your brand's reputation and prevents your customers or employees from submitting sensitive information to fraudulent sites.

Common threats include:

* [Typosquatting ↗](https://en.wikipedia.org/wiki/Typosquatting): For example, typing `cloudfalre.com` instead of `cloudflare.com`.
* Concatenation of services (`cloudflare-service.com`) often registered by attackers to trick unsuspecting victims into submitting private information such as passwords.
* [Homoglyph attacks ↗](https://en.wikipedia.org/wiki/IDN%5Fhomograph%5Fattack) that use lookalike characters to trick unsuspecting victims.

User permission

Access to Brand Protection is managed through [Cloudflare RBAC](https://developers.cloudflare.com/fundamentals/manage-members/roles/).

Only users with the following roles can access and configure Brand Protection:

* Super Admin
* Admin
* Brand Protection (custom role)
* Cloudforce One

## Types of queries

Cloudflare Brand Protection offers two distinct methods for monitoring impersonation: domain search and logo search.

### Domain search

Search for domains based on text patterns, misspellings, or service combinations.

To start searching for new domains that might be trying to impersonate your brand:

1. In the Cloudflare dashboard, go to the **Brand Protection** page.
[Go to **Brand protection** ↗](https://dash.cloudflare.com/?to=/:account/security-center/brand-protection)
2. In **String query**, provide a name for your query. You can add multiple brand phrases on the same query, and the results will generate matches for all of those. Once you entered the string queries, select **Search matches**.
3. In the **Character distance**, select from `0-3`. This defines how many characters a result can differ from your string (for example, a distance of 1 would catch `clpudflare.com`). The number of characters the results can differ from your domain.
Note
If a brand phrase or search term has less than five characters, you can only choose a max distance of `0` (zero).
4. You can select **Save query** to monitor it in the future and perform other actions, such as delete, clone and set up alerts, according to your Paid plan limits.
5. To export all matches from a saved query, select your **Query name** \> select the three dots > **Export matches**.

In the section **Monitor Strings**, you can check all the string queries that you selected to monitor. You can delete, clone, or create notifications for a string query. Refer to [Brand Protection Alerts](#brand-protection-alerts) to set up notifications. You can also dismiss any domain matched in the query if you have investigated and deemed it benign or a false positive. Users can still access their previously dismissed matches by turning on the **Show dismissed matches** toggle in the Cloudflare dashboard.

### Logo search (AI-powered)

Logo search uses computer vision to detect domains using your visual assets, even if the domain name does not contain your brand string.

To set up a new logo query:

1. Select **Monitor Logos** and select **Add logo**.
2. Add a name for your query and upload your logo. Only the `.png`, `.jpeg`, and `.jpg` file extensions are supported.
3. Set the threshold: Set a match threshold (the minimum is 75%). A higher score ensures high-precision matches, while a lower score catches remixed or slightly altered versions of your logo.
4. Select **Save logo**. The system will now scan newly detected infrastructure for visual matches.

The browser will return to the **Monitored Logos** page, where you can access your query and configure notifications.

## Investigate a query

In this section, the dashboard displays:

* **Domain overview** where you can request to [change categorization](https://developers.cloudflare.com/security-center/investigate/change-categorization/) and view the resolution history of your domain for up to seven days.
* **WHOIS** that provides details about the date the domain was created, registrant and nameservers.
* **Domain history** that provides information on the domain category and when it was last changed. Refer to [Investigate threats](https://developers.cloudflare.com/security-center/investigate/investigate-threats/) for more details.
* **URL Reports** that provides information on any reported URL.

To investigate a string query:

1. Go to the **Monitor Strings** or **Monitor Logos** section to view all your queries.
2. Select a monitored query to inspect all the domains that matched your query.
3. Next to the domain, select **Domain** or **URL**. This will trigger a search on the [**Investigate**](https://developers.cloudflare.com/security-center/investigate/) section in a separate tab. URL scanner will also be triggered from **Brand Protection** through **Security Center** \> **Investigate**. You will also have access to a report which will be generated automatically. The report will display screenshots of the matched domain, and the registrar of your domain.

## Report abuse

Submit abuse report

You can only submit an abuse report if your domain is with [Cloudflare Registrar ↗](https://www.cloudflare.com/products/registrar/), or if the IP used by the domain is hosted by Cloudflare.

To submit abuse reports directly from the dashboard:

1. In the Cloudflare dashboard, go to the **Brand Protection** page.
[Go to **Brand protection** ↗](https://dash.cloudflare.com/?to=/:account/security-center/brand-protection)
2. Go to **Monitor Strings**, select the query you want to report.
3. Select **Report to Cloudflare**.
4. Fill in the details to submit an abuse report.
5. Select **Submit**.

To view abuse reports, in the Cloudflare dashboard, go to the **Abuse Reports** page.

[Go to **Abuse reports** ↗](https://dash.cloudflare.com/?to=/:account/abuse-reports)

You can review abuse reports against your zones and any mitigations taken against reports in response.

You can also **Request review** of most mitigations.

## Cease and Desist letters

When you identify an infringing domain hosted outside of Cloudflare, you can generate a Cease and Desist (C&D) letter directly from the dashboard. The system automatically pulls registrar data and WHOIS contact information (such as the registrant or registrar abuse email) and pre-fills your custom-branded templates.

When reviewing a matched domain, you have two paths to action depending on where the domain is hosted:

* **Report to Cloudflare**: If the matched domain is using Cloudflare's network or registrar, trigger the integrated abuse reporting flow instantly.
* **Generate a C&D Letter**: If the domain is hosted elsewhere, use one of the default templates or one you previously saved in the dashboard.

### Generate a C&D letter

1. In the Cloudflare dashboard, go to the **Brand Protection** page.
[Go to **Brand protection** ↗](https://dash.cloudflare.com/?to=/:account/security-center/brand-protection)
2. Go to **Monitor Strings** and select a query to view its matched domains.
3. Next to the domain you want to take action on, click **Generate C&D Letter**.
4. Choose a template. You can select from three default templates or from your own saved templates:

  * **Registrant - Exact Match**: A cease and desist letter direct to a registrant of a domain that is an exact match to the protected trademark.
  * **Registrant - Similar Match**: A cease and desist letter directed to a registrant of a domain that is confusingly similar to the protected trademark (1-character distance).
  * **Registrar - Trademark Infringement**: A letter directed to a domain registrar regarding trademark infringement by their registrant.
  * **Registrar - Trademark Infringement & Phishing**: A letter directed to a domain registrar regarding trademark infringement and phishing by their registrant.
5. Review and edit the pre-filled letter. The system auto-populates recipient data from WHOIS records.
6. Click **Download** to save the finalized PDF.

Note

Cloudflare does not represent you and cannot provide you with legal advice. Only you can decide whether your rights have been infringed, whether a cease and desist letter is appropriate, and what that letter should say.

## Brand Protection API

The [Brand Protection API](https://developers.cloudflare.com/api/resources/brand%5Fprotection/) allows for programmatic management and integration with your [SOC ↗](https://www.cloudflare.com/en-gb/learning/security/glossary/what-is-a-security-operations-center-soc/) or [SIEM ↗](https://www.cloudflare.com/en-gb/learning/security/what-is-siem/). Using the Brand Protection API, you can:

* Manage queries: Create, edit, or delete string and logo queries.
* Data retrieval: Read and download matches for automated ingestion.
* Query editing: Update existing query parameters without losing historical data.

## Notifications and alerts

Brand Protection integrates with Cloudflare's ANS (Alerts Notification Service) to provide configurable alerts when new domains are detected.

Any matches that are found during the new domain search are then inserted into an internal alerts table which triggers an alert for the user. This allows you to receive real-time notifications and take immediate action to investigate and potentially block any suspicious domains that may be attempting to impersonate your brand.

Brand Protection Alerts

**Who is it for?**

Customers who want a summary of activity related to [Brand Protection](https://developers.cloudflare.com/security-center/brand-protection/).

**Other options / filters**

You can set up Brand Protection Alerts on individual monitored queries. For more details, refer to [Brand Protection Alerts](https://developers.cloudflare.com/security-center/brand-protection/#brand-protection-alerts).

**Included with**

Professional plans or higher.

**What should you do if you receive one?**

Investigate and potentially block any suspicious domains that may be trying to impersonate your brand.

Brand Protection Digest

**Who is it for?**

Customers who want a summary of activity related to [Brand Protection](https://developers.cloudflare.com/security-center/brand-protection/).

**Other options / filters**

You can set up Brand Protection Digest on individual monitored queries. For more details, refer to [Brand Protection Alerts](https://developers.cloudflare.com/security-center/brand-protection/#brand-protection-alerts).

**Included with**

Professional plans or higher.

**What should you do if you receive one?**

Investigate and potentially block any suspicious domains that may be trying to impersonate your brand.

Logo Match Alerts

**Who is it for?**

Customers who want to receive a notification when the [Brand Protection](https://developers.cloudflare.com/security-center/brand-protection/) system detects a new domain which is using the uploaded logo and might be infringing copyright.

**Other options / filters**

You can select the query that you want to be alerted on.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

Review the domains and URLs that are potentially impersonating your brand.

Security Insights

**Who is it for?**

Customers who want to receive notifications based on security insights findings.

**Other options / filters**

You can select the insight(s) you want to be alerted on.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

Review the insight and decide whether you want to resolve it, archive it, or export it.

Abuse report

**Who is it for?**

Customers who want to be alerted in the event that an abuse report is filed against their website.

**Other options / filters**

You can filter the reports based on date, report status, report type, and domain.

**Included with**

All Cloudflare plans.

**What should you do if you receive one?**

View our guidance on [customer abuse report obligations](https://developers.cloudflare.com/fundamentals/reference/report-abuse/abuse-report-obligations/) and more information on how to [view and submit abuse reports](https://developers.cloudflare.com/fundamentals/reference/report-abuse/submit-report/).

To set up a Brand Protection Alert:

1. Go to **Monitor Strings** and locate the query for which you would like to create notifications.
2. Select **alerts**. This should redirect you to the **Add Notification** page, where you can configure what you want to be notified about, and how.
Note
You can also set up the alerts from your [Notifications](https://developers.cloudflare.com/notifications/) menu.
3. Create a notification name, add a description (optional), and select the monitored queries. You can also add a Webhook, and a notification email. You can add multiple email addresses.
4. Select **Save**.

Manage your notifications in the **All notifications** tab. You can disable, edit, delete, or test them.

## Subscriptions and limitations

* Self-serve users can subscribe directly to add monitoring capacity to their account.
* You may only use the Brand Protection search tools to search for domains that may be attempting to impersonate your brand or a brand that has authorized you to conduct such search on its behalf.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security-center/brand-protection/#page","headline":"Brand Protection · Cloudflare Security Center docs","description":"Detect phishing domains and impersonation attempts targeting your brand.","url":"https://developers.cloudflare.com/security-center/brand-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Phishing","AI"]}
```
