---
description: Date and time SQL functions for Analytics Engine.
title: Date and Time functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Date and Time functions

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/date-time-functions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## formatDateTime

Usage:

```sql
formatDateTime(<datetime expression>, <format string>[, <timezone string>])
```

`formatDateTime` prints a datetime as a string according to a provided format string. Refer to [ClickHouse's documentation ↗](https://clickhouse.com/docs/en/sql-reference/functions/date-time-functions/#formatdatetime)for a list of supported formatting options.

Examples:

```sql
-- prints the current YYYY-MM-DD in UTC
formatDateTime(now(), '%Y-%m-%d')

-- prints YYYY-MM-DD in the datetime's timezone
formatDateTime(<a datetime with a timezone>, '%Y-%m-%d')
formatDateTime(toDateTime('2022-12-01 16:17:00', 'America/New_York'), '%Y-%m-%d')

-- prints YYYY-MM-DD in UTC
formatDateTime(<a datetime with a timezone>, '%Y-%m-%d', 'Etc/UTC')
formatDateTime(toDateTime('2022-12-01 16:17:00', 'America/New_York'), '%Y-%m-%d', 'Etc/UTC')
```

## now

Usage:

```sql
now()
```

Returns the current time as a DateTime.

## today New

Usage:

```sql
today()
```

Returns the current date as a `Date`.

## toDateTime

Usage:

```sql
toDateTime(<expression>[, 'timezone string'])
```

`toDateTime` converts an expression to a datetime. This function does not support ISO 8601-style timezones; if your time is not in UTC then you must provide the timezone using the second optional argument.

Examples:

```sql
-- double1 contains a unix timestamp in seconds
toDateTime(double1)

-- blob1 contains an datetime in the format 'YYYY-MM-DD hh:mm:ss'
toDateTime(blob1)

-- literal values:
toDateTime(355924804) -- unix timestamp
toDateTime('355924804') -- string containing unix timestamp
toDateTime('1981-04-12 12:00:04') -- string with datetime in 'YYYY-MM-DD hh:mm:ss' format

-- interpret a date relative to New York time
toDateTime('2022-12-01 16:17:00', 'America/New_York')
```

## toYear New

Usage:

```sql
toYear(<datetime>)
```

`toYear` returns the year of a datetime.

Examples:

```sql
-- returns the number 2025
toYear(toDateTime('2025-10-27 00:00:00'))
```

## toMonth New

Usage:

```sql
toMonth(<datetime>)
```

`toMonth` returns the year of a datetime.

Examples:

```sql
-- returns the number 10
toMonth(toDateTime('2025-10-27 00:00:00'))
```

## toDayOfWeek New

Usage:

```sql
toDayOfWeek(<datetime>)
```

`toDayOfWeek` takes a datetime and returns its numerical day of the week.

Returns `1` to indicate Monday, `2` to indicate Tuesday, and so on.

Examples:

```sql
-- returns the number 1 for Monday 27th October 2025
toDayOfWeek(toDateTime('2025-10-27 00:00:00'))

-- returns the number 2 for Tuesday 28th October 2025
toDayOfWeek(toDateTime('2025-10-28 00:00:00'))

-- returns the number 7 for Sunday 2nd November 2025
toDayOfWeek(toDateTime('2025-11-02 00:00:00'))
```

## toDayOfMonth New

Usage:

```sql
toDayOfMonth(<datetime>)
```

`toDayOfMonth` returns the day of the month from a datetime.

Examples:

```sql
-- returns the number 27
toDayOfMonth(toDateTime('2025-10-27 00:00:00'))
```

## toHour New

Usage:

```sql
toHour(<datetime>)
```

`toHour` returns the hour of the day from a datetime.

Examples:

```sql
-- returns the number 9
toHour(toDateTime('2025-10-27 09:11:13'))
```

## toMinute New

Usage:

```sql
toMinute(<datetime>)
```

`toMinute` returns the minute of the hour from a datetime.

Examples:

```sql
-- returns the number 11
toMinute(toDateTime('2025-10-27 09:11:13'))
```

## toSecond New

Usage:

```sql
toSecond(<datetime>)
```

`toSecond` returns the second of the minute from a datetime.

Examples:

```sql
-- returns the number 13
toSecond(toDateTime('2025-10-27 09:11:13'))
```

## toUnixTimestamp

Usage:

```sql
toUnixTimestamp(<datetime>)
```

`toUnixTimestamp` converts a datetime into an integer unix timestamp.

Examples:

```sql
-- get the current unix timestamp
toUnixTimestamp(now())
```

## toStartOfInterval

Usage:

```sql
toStartOfInterval(<datetime>, INTERVAL '<n>' <unit>[, <timezone string>])
```

`toStartOfInterval` rounds down a datetime to the nearest offset of a provided interval. This can be useful for grouping data into equal-sized time ranges.

Examples:

```sql
-- round the current time down to the nearest 15 minutes
toStartOfInterval(now(), INTERVAL '15' MINUTE)

-- round a timestamp down to the day
toStartOfInterval(timestamp, INTERVAL '1' DAY)

-- count the number of datapoints filed in each hourly window
SELECT
  toStartOfInterval(timestamp, INTERVAL '1' HOUR) AS hour,
  sum(_sample_interval) AS count
FROM your_dataset
GROUP BY hour
ORDER BY hour ASC
```

## toStartOfYear New

Usage:

```sql
toStartOfYear(<datetime>)
```

`toStartOfYear` rounds down a datetime to the nearest start of year. This can be useful for grouping data into equal-sized time ranges.

Examples:

```sql
-- round a timestamp down to 2025-01-01 00:00:00
toStartOfYear(toDateTime('2025-10-27 00:00:00'))
```

## toStartOfMonth New

Usage:

```sql
toStartOfMonth(<datetime>)
```

`toStartOfMonth` rounds down a datetime to the nearest start of month. This can be useful for grouping data into equal-sized time ranges.

Examples:

```sql
-- round a timestamp down to 2025-10-01 00:00:00
toStartOfMonth(toDateTime('2025-10-27 00:00:00'))
```

## toStartOfWeek New

Usage:

```sql
toStartOfWeek(<datetime>)
```

`toStartOfWeek` rounds down a datetime to the start of the week. This can be useful for grouping data into equal-sized time ranges.

Treats Monday as the first day of the week.

Examples:

```sql
-- round a time on a Monday down to Monday 2025-10-27 00:00:00
toStartOfWeek(toDateTime('2025-10-27 00:00:00'))

-- round a time on a Wednesday down to Monday 2025-10-27 00:00:00
toStartOfWeek(toDateTime('2025-10-29 00:00:00'))
```

## toStartOfDay New

Usage:

```sql
toStartOfDay(<datetime>)
```

`toStartOfDay` rounds down a datetime to the nearest start of day. This can be useful for grouping data into equal-sized time ranges.

Examples:

```sql
-- round a timestamp down to 2025-10-27 00:00:00
toStartOfDay(toDateTime('2025-10-27 00:00:00'))
```

## toStartOfHour New

Usage:

```sql
toStartOfHour(<datetime>)
```

`toStartOfHour` rounds down a datetime to the nearest start of hour. This can be useful for grouping data into equal-sized time ranges.

Examples:

```sql
-- round a timestamp down to 2025-10-27 16:00:00
toStartOfHour(toDateTime('2025-10-27 16:55:25'))
```

## toStartOfFifteenMinutes New

Usage:

```sql
toStartOfFifteenMinutes(<datetime>)
```

`toStartOfFifteenMinutes` rounds down a datetime to the nearest fifteen minutes. This can be useful for grouping data into equal-sized time ranges.

Examples:

```sql
-- round a timestamp down to 2025-10-27 16:45:00
toStartOfFifteenMinutes(toDateTime('2025-10-27 16:55:25'))
```

## toStartOfTenMinutes New

Usage:

```sql
toStartOfTenMinutes(<datetime>)
```

`toStartOfTenMinutes` rounds down a datetime to the nearest ten minutes. This can be useful for grouping data into equal-sized time ranges.

Examples:

```sql
-- round a timestamp down to 2025-10-27 16:50:00
toStartOfTenMinutes(toDateTime('2025-10-27 16:55:25'))
```

## toStartOfFiveMinutes New

Usage:

```sql
toStartOfFiveMinutes(<datetime>)
```

`toStartOfFiveMinutes` rounds down a datetime to the nearest five minutes. This can be useful for grouping data into equal-sized time ranges.

Examples:

```sql
-- round a timestamp down to 2025-10-27 16:55:00
toStartOfFiveMinutes(toDateTime('2025-10-27 16:55:25'))
```

## toStartOfMinute New

Usage:

```sql
toStartOfMinute(<datetime>)
```

`toStartOfMinute` rounds down a datetime to the nearest minute. This can be useful for grouping data into equal-sized time ranges.

Examples:

```sql
-- round a timestamp down to 2025-10-27 16:55:00
toStartOfMinute(toDateTime('2025-10-27 16:55:25'))
```

## toYYYYMM New

Usage:

```sql
toYYYYMM(<datetime>)
```

`toYYYYMM` returns a number representing year and month of a datetime. For instance a datetime on `2025-05-03` would return the number `202505`.

Examples:

```sql
-- returns the number 202510
toYYYYMM(toDateTime('2025-10-27 16:55:25'))
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/date-time-functions/#page","headline":"SQL Reference · Cloudflare Analytics docs","description":"Date and time SQL functions for Analytics Engine.","url":"https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/date-time-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
