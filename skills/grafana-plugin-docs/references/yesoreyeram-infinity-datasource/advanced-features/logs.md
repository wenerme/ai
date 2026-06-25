---
title: "Logs format | Grafana Plugins documentation"
description: "Configure data for log visualization with the Infinity data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Logs format

Transform API responses into log data that can be displayed in Grafana’s Logs panel. This is useful for visualizing application logs, audit trails, or any timestamped text data from REST APIs.

## Configure logs output

To visualize data as logs:

1. In the query editor, set **Format** to **Logs**.
2. Configure your columns to include the required fields.

## Required fields

The logs format requires specific column names:

Expand table

| Column name | Type   | Description                        |
|-------------|--------|------------------------------------|
| `timestamp` | Time   | The log entry timestamp (required) |
| `body`      | String | The log message content (required) |

> Note
>
> Column names must be exactly `timestamp` and `body` (case-sensitive) for the Logs panel to recognize the data correctly.

## Optional fields

You can include additional columns to enhance log entries:

Expand table

| Column name | Type   | Description                                                       |
|-------------|--------|-------------------------------------------------------------------|
| `level`     | String | Log level (for example, `info`, `warn`, `error`) for color-coding |
| `id`        | String | Unique identifier for the log entry                               |
| Any other   | Any    | Additional fields appear as labels in the log details             |

## Example: JSON API logs

Given an API that returns:

JSON [Copy code to clipboard] Copy

```json
{
  "logs": [
    {
      "time": "2024-01-15T10:30:00Z",
      "message": "User login successful",
      "severity": "info",
      "user_id": "12345"
    },
    {
      "time": "2024-01-15T10:31:00Z",
      "message": "Failed authentication attempt",
      "severity": "warn",
      "user_id": "67890"
    }
  ]
}
```

Configure the query:

1. **Type**: JSON
2. **Format**: Logs
3. **Root selector**: `logs`
4. **Columns**:

Expand table

| Selector   | Title       | Type   |
|------------|-------------|--------|
| `time`     | `timestamp` | Time   |
| `message`  | `body`      | String |
| `severity` | `level`     | String |
| `user_id`  | `user_id`   | String |

## Example: UQL logs query

Use UQL to transform and rename fields:

SQL [Copy code to clipboard] Copy

```sql
parse-json
| scope "logs"
| project "timestamp"=todatetime("time"), "body"="message", "level"="severity", "user_id"
```

## Example: CSV logs

For CSV log data:

csv [Copy code to clipboard] Copy

```csv
time,message,level
2024-01-15T10:30:00Z,Application started,info
2024-01-15T10:30:05Z,Connected to database,info
2024-01-15T10:30:10Z,Cache initialization failed,error
```

Configure the columns:

Expand table

| Selector  | Title       | Type   |
|-----------|-------------|--------|
| `time`    | `timestamp` | Time   |
| `message` | `body`      | String |
| `level`   | `level`     | String |

## Use with the Logs panel

After configuring your query:

1. Add a **Logs** panel to your dashboard.
2. Select your Infinity data source.
3. The logs appear with timestamps and can be expanded for details.

### Log level colors

If you include a `level` column, Grafana color-codes log entries:

Expand table

| Level              | Color      |
|--------------------|------------|
| `critical`, `crit` | Purple     |
| `error`, `err`     | Red        |
| `warning`, `warn`  | Yellow     |
| `info`             | Green      |
| `debug`            | Blue       |
| `trace`            | Light blue |

## Filter logs by time range

Use time macros to filter logs to the dashboard time range:

[Copy code to clipboard] Copy

```none
https://api.example.com/logs?from=${__timeFrom}&to=${__timeTo}
```

Or filter in UQL:

SQL [Copy code to clipboard] Copy

```sql
parse-json
| scope "logs"
| where "timestamp" >= datetime("${__timeFrom}") and "timestamp" <= datetime("${__timeTo}")
| project "timestamp"=todatetime("time"), "body"="message"
```

## Limitations

- **Alerting**: Logs queries using frontend parsers (Default, UQL, GROQ) do not support Grafana Alerting. Use JSONata or JQ parsers for alerting on log data.
- **Live streaming**: The Infinity data source does not support live log streaming. Logs are fetched when the panel refreshes.
- **Large volumes**: For high-volume log data, consider using dedicated log solutions like Grafana Loki.
