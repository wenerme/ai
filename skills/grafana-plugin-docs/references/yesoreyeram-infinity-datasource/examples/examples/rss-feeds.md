---
title: "RSS and status feeds | Grafana Plugins documentation"
description: "Visualize RSS feeds and status pages using the Infinity data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# RSS and status feeds

Visualize RSS feeds, Atom feeds, and status pages as Grafana annotations or table data. This is useful for monitoring service status pages and correlating outages with your metrics.

## Before you begin

- Identify the RSS or Atom feed URL you want to query
- Most status feeds are publicly accessible and don’t require authentication
- For private feeds, configure appropriate authentication in the data source settings

## Configure the data source

1. In Grafana, navigate to **Connections** &gt; **Data sources**.
2. Click **Add new data source** and select **Infinity**.
3. In **Allowed hosts**, add the feed domain (for example, `https://status.aws.amazon.com`).
4. Click **Save &amp; test**.

## Query examples

### AWS status feed

Use the [AWS status RSS feed](https://status.aws.amazon.com/rss/all.rss) to display service incidents.

**Configuration:**

Expand table

| Setting           | Value                                       |
|-------------------|---------------------------------------------|
| **Type**          | XML                                         |
| **Source**        | URL                                         |
| **URL**           | `https://status.aws.amazon.com/rss/all.rss` |
| **Parser**        | Backend                                     |
| **Root selector** | `rss.channel.item`                          |

**Columns:**

Expand table

| Selector      | Alias       | Type      |
|---------------|-------------|-----------|
| `title`       | Title       | String    |
| `description` | Description | String    |
| `pubDate`     | Published   | Timestamp |
| `link`        | Link        | String    |

### GitHub status feed

**Configuration:**

Expand table

| Setting           | Value                                      |
|-------------------|--------------------------------------------|
| **Type**          | XML                                        |
| **URL**           | `https://www.githubstatus.com/history.rss` |
| **Root selector** | `rss.channel.item`                         |

### Google Cloud status (Atom feed)

Atom feeds have a different structure than RSS feeds.

**Configuration:**

Expand table

| Setting           | Value                                          |
|-------------------|------------------------------------------------|
| **Type**          | XML                                            |
| **URL**           | `https://status.cloud.google.com/en/feed.atom` |
| **Root selector** | `feed.entry`                                   |

**Columns for Atom feeds:**

Expand table

| Selector    | Alias   | Type      |
|-------------|---------|-----------|
| `title`     | Title   | String    |
| `updated`   | Updated | Timestamp |
| `link.href` | Link    | String    |
| `content`   | Content | String    |

## Use UQL for advanced parsing

For more control over data transformation, use UQL:

SQL [Copy code to clipboard] Copy

```sql
parse-xml
| scope "rss.channel.item"
| extend "published"=todatetime("pubDate")
| project "title", "published", "description", "link"
```

## Display as annotations

Use RSS feeds to add context to your dashboards by displaying events as annotations.

1. In your dashboard, click **Settings** (gear icon).
2. Navigate to **Annotations** and click **Add annotation query**.
3. Select your Infinity data source.
4. Configure the query using the settings above.
5. Map the columns:

   - **Time**: Use the `pubDate` or `updated` column
   - **Title**: Use the `title` column
   - **Text**: Use the `description` or `content` column

## RSS item structure reference

**RSS format:**

xml [Copy code to clipboard] Copy

```xml
<item>
  <title>Service is operating normally: [RESOLVED] SMS Delivery Delays</title>
  <link>http://status.aws.amazon.com/</link>
  <pubDate>Fri, 14 Jan 2022 14:44:00 PST</pubDate>
  <guid>http://status.aws.amazon.com/#sns-us-east-1_1642200240</guid>
  <description>Description of the incident...</description>
</item>
```

**Atom format:**

xml [Copy code to clipboard] Copy

```xml
<entry>
  <title>Google Cloud Console outage</title>
  <updated>2024-01-15T10:30:00Z</updated>
  <link href="https://status.cloud.google.com/incident/..." />
  <content type="html">Description of the incident...</content>
</entry>
```

## More status feeds

Expand table

| Service      | Feed URL                                            | Format |
|--------------|-----------------------------------------------------|--------|
| AWS          | `https://status.aws.amazon.com/rss/all.rss`         | RSS    |
| GitHub       | `https://www.githubstatus.com/history.rss`          | RSS    |
| Google Cloud | `https://status.cloud.google.com/en/feed.atom`      | Atom   |
| Azure        | `https://azure.status.microsoft/en-us/status/feed/` | RSS    |
| Cloudflare   | `https://www.cloudflarestatus.com/history.rss`      | RSS    |
| Datadog      | `https://status.datadoghq.com/history.rss`          | RSS    |

## Troubleshoot

Expand table

| Issue              | Cause                    | Solution                                                                                 |
|--------------------|--------------------------|------------------------------------------------------------------------------------------|
| Empty response     | Wrong root selector      | Use `rss.channel.item` for RSS or `feed.entry` for Atom                                  |
| CORS error         | Browser request blocked  | The Infinity data source makes requests from the server, not browser—check allowed hosts |
| Date parsing error | Invalid timestamp format | Use UQL with `todatetime()` to convert non-standard date formats                         |
