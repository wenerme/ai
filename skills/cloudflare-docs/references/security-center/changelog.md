---
title: Changelog
description: Track the latest updates and changes to Security Center features.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/security-center.xml) 

## 2026-04-27

  
**Unified workspace for Brand Protection**   

We have introduced a unified investigation workspace within Brand Protection to help analysts manage complex brand portfolios. Instead of jumping between individual queries, you can now consolidate your workflow into a single, cohesive view.

#### What's new

* You can now elect multiple saved queries from your dashboard to generate a consolidated "Combined Matches" view. This allows you to triage results from different brand queries in one unified table
* You can open query extended views in distinct tabs within the Brand Protection dashboard. This enables you to maintain multiple investigation contexts simultaneously and switch between them without losing your place.
* You can reset your workspace using the new "Clear Selection" action, making it easier to pivot between different investigation sets.

#### Key benefits

* Eliminate fragmented workflows by viewing all matches across different query buckets in a single table, reducing the need to click through dozens of individual query pages
* Correlate related campaigns by seeing similar domains or infrastructure patterns that appear across multiple saved queries

Learn more in our [Brand Protection documentation](https://developers.cloudflare.com/security-center/brand-protection/).

## 2026-04-08

  
**Real-time alerts and daily digests for Threat Events**   

You can now automate your threat monitoring by setting up custom alerts in your saved views. Instead of manually checking the dashboard for updates, you can subscribe to notifications that trigger whenever new data matches your specific filter sets, like new activity associated to a particular threat actor or spikes in activity within your industry.

#### Stay ahead of emerging threats

By linking your saved views to the Cloudflare Notifications Center, you can ensure the right information reaches your team at the right time.

* **Immediate Alerts**: receive real-time notifications the moment a critical event is detected that matches your saved criteria. This is essential for high-priority monitoring, such as tracking active campaigns from specific APT groups.
* **Daily Digests**: opt for a summarized report delivered once a day. This is ideal for maintaining situational awareness of broader trends, like regional activity shifts or industry-wide threat landscapes, without cluttering your inbox.
![Threat Events notifications](https://developers.cloudflare.com/_astro/threat-events-notifications.3Fl8LGOn_S9A1r.webp) 

#### How to get started

To set up an alert, go to **Application Security** \> **Threat Intelligence** \> **Threat Events**. From there:

1. Choose your datasets and apply your desired filters and select **Save View** (or select an existing one).
2. Open the **Manage Saved Views** menu.
3. Select **Add Alert** next to your chosen view to configure your notification preferences in the Cloudflare dashboard.

For more technical details on configuring notifications, refer to the [Threat Events documentation](https://developers.cloudflare.com/security-center/cloudforce-one/).

## 2026-03-18

  
**Real-time logo match preview**   

We are introducing **Logo Match Preview**, bringing the same pre-save visibility to visual assets that was previously only available for string-based queries. This update allows you to fine-tune your brand detection strategy before committing to a live monitor.

#### What’s new:

* Upload your brand logo and immediately see a sample of potential matches from recently detected sites before finalizing the query
* Adjust your similarity score (from 75% to 100%) and watch the results refresh in real-time to find the balance between broad detection and noise reduction
* Review the specific logos triggered by your current settings to ensure your query is capturing the right level of brand infringement

If you are ready to test your brand assets, go to the [Brand Protection dashboard ↗](https://developers.cloudflare.com/security-center/brand-protection/) to try the new preview tool.

## 2026-03-06

  
**Dismiss and filter matches in Brand Protection**   

We have introduced new triage controls to help you manage your Brand Protection results more efficiently. You can now clear out the noise by dismissing matches while maintaining full visibility into your historical decisions.

#### What's new

* **Dismiss matches**: Users can now mark specific results as dismissed if they are determined to be benign or false positives, removing them from the primary triage view.
* **Show/Hide toggle**: A new visibility control allows you to instantly switch between viewing only active matches and including previously dismissed ones.
* **Persistent review states**: Dismissed status is saved across sessions, ensuring that your workspace remains organized and focused on new or high-priority threats.

#### Key benefits of the dismiss match functionality:

* Reduce alert fatigue by hiding known-safe results, allowing your team to focus exclusively on unreviewed or high-risk infringements.
* Auditability and recovery through the visibility toggle, ensuring that no match is ever truly "lost" and can be re-evaluated if a site's content changes.
* Improved collaboration as your team members can see which matches have already been vetted and dismissed by others.

Ready to clean up your match queue? Learn more in our [Brand Protection documentation](https://developers.cloudflare.com/security-center/brand-protection/).

## 2026-02-23

  
**Saved views for Threat Events**   

**TL;DR:** You can now create and save custom configurations of the Threat Events dashboard, allowing you to instantly return to specific filtered views — such as industry-specific attacks or regional Sankey flows — without manual reconfiguration.

#### Why this matters

Threat intelligence is most effective when it is personalized. Previously, analysts had to manually re-apply complex filters (like combining specific industry datasets with geographic origins) every time they logged in. This update provides material value by:

* Analysts can now jump straight into "Known Ransomware Infrastructure" or "Retail Sector Targets" views with a single click, eliminating repetitive setup tasks
* Teams can ensure everyone is looking at the same data subsets by using standardized saved views, reducing the risk of missing critical patterns due to inconsistent filtering.

Cloudforce One subscribers can start saving their custom views now in [Application Security > Threat Intelligence > Threat Events ↗](https://dash.cloudflare.com/?to=/:account/security-center/threat-intelligence/threat-events).

## 2026-02-19

  
**Cloudforce One Threat events graphs are now visible in the dashboard**   

We have introduced dynamic visualizations to the Threat Events dashboard to help you better understand the threat landscape and identify emerging patterns at a glance.

What's new:

* **Sankey Diagrams**: Trace the flow of attacks from country of origin to target country to identify which regions are being hit hardest and where the threat infrastructure resides.
![Sankey Diagram](https://developers.cloudflare.com/_astro/2026-02-19-sankey-diagram.VZMSmdZL_Z1dxq3E.webp) 
* **Dataset Distribution over time**: Instantly pivot your view to understand if a specific campaign is targeting your sector or if it is a broad-spectrum commodity attack.
![Events over time](https://developers.cloudflare.com/_astro/2026-02-19-events-over-time.CqD7VKqA_Z20JNi0.webp) 
* **Enhanced Filtering**: Use these visual tools to filter and drill down into specific attack vectors directly from the charts.

Cloudforce One subscribers can explore these new views now in [Application Security > Threat Intelligence > Threat Events ↗](https://dash.cloudflare.com/?to=/:account/security-center/threat-intelligence/threat-events).

## 2026-02-12

  
**Enhanced Logo Matching for Brand Protection**   

We have significantly upgraded our Logo Matching capabilities within Brand Protection. While previously limited to approximately 100% matches, users can now detect a wider range of brand assets through a redesigned matching model and UI.

#### What's new

* **Configurable match thresholds**: Users can set a minimum match score (starting at 75%) when creating a logo query to capture subtle variations or high-quality impersonations.
* **Visual match scores**: Allow users to see the exact percentage of the match directly in the results table, highlighted with color-coded lozenges to indicate severity.
* **Direct logo previews**: Available in the Cloudflare dashboard — similar to string matches — to verify infringements at a glance.

#### Key benefits

* **Expose sophisticated impersonators** who use slightly altered logos to bypass basic detection filters.
* **Faster triage** of the most relevant threats immediately using visual indicators, reducing the time spent manually reviewing matches.

Ready to protect your visual identity? Learn more in our [Brand Protection documentation](https://developers.cloudflare.com/security-center/brand-protection/).

## 2026-02-03

  
**Threat actor identification with "also known as" aliases**   

Identifying threat actors can be challenging, because naming conventions often vary across the security industry. To simplify your research, **Cloudflare Threat Events** now include an **Also known as** field, providing a list of common aliases and industry-standard names for the groups we track.

This new field is available in both the Cloudflare dashboard and via the API. In the dashboard, you can view these aliases by expanding the event details side panel (under the **Attacker** field) or by adding it as a column in your configurable table view.

#### Key benefits

* Easily map Cloudflare-tracked actors to the naming conventions used by other vendors without manual cross-referencing.
* Quickly identify if a detected threat actor matches a group your team is already monitoring via other intelligence feeds.

For more information on how to access this data, refer to the [Threat Events API documentation ↗](https://developers.cloudflare.com/api/resources/cloudforce%5Fone/subresources/threat%5Fevents/).

## 2026-01-14

  
**URL Scanner now supports PDF report downloads**   

We have expanded the reporting capabilities of the Cloudflare URL Scanner. In addition to existing JSON and HAR exports, users can now generate and download a **PDF report** directly from the Cloudflare dashboard. This update streamlines how security analysts can share findings with stakeholders who may not have access to the Cloudflare dashboard or specialized tools to parse JSON and HAR files.

**Key Benefits:**

* Consolidate scan results, including screenshots, security signatures, and metadata, into a single, portable document
* Easily share professional-grade summaries with non-technical stakeholders or legal teams for faster incident response

**What’s new:**

* **PDF Export Button:** A new download option is available in the URL Scanner results page within the Cloudflare dashboard
* **Unified Documentation:** Access all scan details—from high-level summaries to specific security flags—in one offline-friendly file

To get started with the URL Scanner and explore our reporting capabilities, visit the [URL Scanner API documentation ↗](https://developers.cloudflare.com/api/resources/url%5Fscanner/).

---

## 2026-01-12

  
**Cloudflare Threat Events now support STIX2 format**   

We are excited to announce that **Cloudflare Threat Events** now supports the **STIX2 (Structured Threat Information Expression)** format. This was a highly requested feature designed to streamline how security teams consume and act upon our threat intelligence.

By adopting this industry-standard format, you can now integrate Cloudflare's threat events data more effectively into your existing security ecosystem.

#### Key benefits

* Eliminate the need for custom parsers, as STIX2 allows for "out of the box" ingestion into major **Threat Intel Platforms (TIPs)**, **SIEMs**, and **SOAR** tools.
* STIX2 provides a standardized way to represent relationships between indicators, sightings, and threat actors, giving your analysts a clearer picture of the threat landscape.

For technical details on how to query events using this format, please refer to our [Threat Events API Documentation ↗](https://developers.cloudflare.com/api/resources/cloudforce%5Fone/subresources/threat%5Fevents/methods/list/).

---

## 2025-11-21

  
**Threat insights are now available in the Threat Events platform**   

The threat events platform now has threat insights available for some relevant parent events. Threat intelligence analyst users can access these insights for their threat hunting activity. Insights are also highlighted in the Cloudflare dashboard by a small `lightning icon` and the insights can refer to multiple, connected events, potentially part of the same attack or campaign and associated with the same threat actor.

For more information, refer to [Analyze threat events](https://developers.cloudflare.com/security-center/cloudforce-one/#analyze-threat-events).

## 2025-10-31

  
**Report logo misuse to Cloudflare directly from the Brand Protection dashboard**   

The Brand Protection logo query dashboard now allows you to use the **Report to Cloudflare** button to submit an Abuse report directly from the Brand Protection logo queries dashboard. While you could previously report new domains that were impersonating your brand before, now you can do the same for websites found to be using your logo without your permission. The abuse reports will be prefilled and you will only need to validate a few fields before you can click the submit button, after which our team process your request.

Ready to start? Check out the [Brand Protection docs](https://developers.cloudflare.com/security-center/brand-protection/).

## 2025-10-27

  
**Cloudforce One RFI tokens are now visible in the dashboard**   

The Requests for Information (RFI) dashboard now shows users the number of tokens used by each submitted RFI to better understand usage of tokens and how they relate to each request submitted.

![Cloudforce One RFI tokens](https://developers.cloudflare.com/_astro/2025-10-24RFITokens.DPm1e8uC_2g3fE3.webp) 

What’s new:

* Users can now see the number of tokens used for a submitted request for information.
* Users can see the remaining tokens allocated to their account for the quarter.
* Users can only select the Routine priority for the `Strategic Threat Research` request type.

Cloudforce One subscribers can try it now in [Application Security > Threat Intelligence > Requests for Information ↗](https://dash.cloudflare.com/?to=/:account/security-center/threat-intelligence/requests).

## 2025-10-17

  
**New Application Security reports (Closed Beta)**   

Cloudflare's new **Application Security report**, currently in Closed Beta, is now available in the dashboard.

[ Go to **Security reports** ](https://dash.cloudflare.com/?to=/:account/security-center/reports) 

The reports are generated monthly and provide cyber security insights trends for all of the Enterprise zones in your Cloudflare account.

The reports also include an industry benchmark, comparing your cyber security landscape to peers in your industry.

![Application Security report mock data](https://developers.cloudflare.com/_astro/2025-10-17-application-security-report-mock-data.Cz0-WuoX_15MbLt.webp) 

Learn more about the reports by referring to the [Security Reports documentation](https://developers.cloudflare.com/security-center/app-security-reports/).

Use the feedback survey link at the top of the page to help us improve the reports.

![Application Security report survey](https://developers.cloudflare.com/_astro/2025-10-17-report-feedback-survey.DPmUlWh2_Z1nYBN6.webp) 

## 2025-08-15

  
**Save time with bulk query creation in Brand Protection**   

[Brand Protection](https://developers.cloudflare.com/security-center/brand-protection/) detects domains that may be impersonating your brand — from common misspellings (`cloudfalre.com`) to malicious concatenations (`cloudflare-okta.com`). Saved search queries run continuously and alert you when suspicious domains appear.

You can now create and save multiple queries in a single step, streamlining setup and management. Available now via the [Brand Protection bulk query creation API](https://developers.cloudflare.com/api/resources/brand%5Fprotection/subresources/queries/methods/bulk/).

## 2025-07-18

  
**New APIs for Brand Protection setup**   

The Brand Protection API is now available, allowing users to create new queries and delete existing ones, fetch matches and more!

What you can do:

* **create new string or logo query**
* **delete string or logo queries**
* **download matches for both logo and string queries**
* **read matches for both logo and string queries**

Ready to start? Check out the [Brand Protection API](https://developers.cloudflare.com/api/resources/brand%5Fprotection/) in our documentation.

## 2025-05-08

  
**URL Scanner now supports geo-specific scanning**   

Enterprise customers can now choose the geographic location from which a URL scan is performed — either via [Security Center](https://developers.cloudflare.com/security-center/investigate/) in the Cloudflare dashboard or via the [URL Scanner API](https://developers.cloudflare.com/api/resources/url%5Fscanner/subresources/scans/methods/create/).

This feature gives security teams greater insight into how a website behaves across different regions, helping uncover targeted, location-specific threats.

**What’s new:**

* Location Picker: Select a location for the scan via **Security Center → Investigate** in the dashboard or through the API.
* Region-aware scanning: Understand how content changes by location — useful for detecting regionally tailored attacks.
* Default behavior: If no location is set, scans default to the user’s current geographic region.

Learn more in the [Security Center documentation](https://developers.cloudflare.com/security-center/).

## 2025-02-03

* Security Center now has a role called Brand Protection. This role gives you access to the Brand Protection feature on the API and Cloudflare dashboard. Brand Protection role also gives you access to the Investigate platform, where you can consume the Threat Intel API and URL scanner API calls.

## 2025-01-20

* On the URL scanner, customers who search for a report will now get a list of all reports related to that specific hostname. A hash is also available in the security report. By selecting the hash, the dashboard will list reports containing the same hash.

## 2024-09-23

* Customers can now export all matches from a saved query. Select your **Query name** \> select the three dots > **Export matches**.

## 2024-09-19

* Customers can now create a `security.txt` file file to provide the security research team with a standardized way to report vulnerabilities.

## 2024-07-22

* Customers can now archive multiple Security Insights at the same time. Go to **Security Center** \> **Security Insights** and select the insights to archive.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security-center/","name":"Security Center"}},{"@type":"ListItem","position":3,"item":{"@id":"/security-center/changelog/","name":"Changelog"}}]}
```
