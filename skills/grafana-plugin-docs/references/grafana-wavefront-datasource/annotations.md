---
title: "Wavefront annotations | Grafana Enterprise Plugins documentation"
description: "Use Wavefront events as annotations on Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Wavefront annotations

Use Wavefront events to add annotations to Grafana dashboards. Annotations appear as markers or regions on time-series panels and are useful for correlating operational events, such as deployments or alert transitions, with metric data.

## Before you begin

- [Configure the Wavefront data source](/docs/plugins/grafana-wavefront-datasource/latest/configure/).
- Make sure your Wavefront API token has permission to read events.
- Open the dashboard where you want to add annotations.

## Supported annotation sources

The Wavefront annotation editor has a single **Query Type**: **Events**. The editor retrieves Wavefront events from the `/api/v2/event` endpoint that fall within the dashboard time range.

Expand table

| Field          | Description                                                                                                        |
|----------------|--------------------------------------------------------------------------------------------------------------------|
| **Query Type** | Always set to **Events**.                                                                                          |
| **Limit**      | Maximum number of events to return for each refresh. Defaults to `100`. Lower values reduce load on large tenants. |

The data source returns one row per event with the following fields:

Expand table

| Field          | Description                                                                                             |
|----------------|---------------------------------------------------------------------------------------------------------|
| `Name`         | The Wavefront event name.                                                                               |
| `StartTime`    | When the event started. Used as the annotation start time.                                              |
| `EndTime`      | When the event ended. Used as the annotation end time, which lets Grafana render the event as a region. |
| `Detail`       | The event description.                                                                                  |
| `Severity`     | The event severity, for example `info`, `warn`, or `severe`.                                            |
| `Type`         | The event type, for example `alert`.                                                                    |
| `SubType`      | A more specific event subtype, such as the alert state.                                                 |
| `Target`       | The target object the event refers to.                                                                  |
| `UserID`       | The user who created the event, if any.                                                                 |
| `RunningState` | Whether the event is currently active.                                                                  |
| `IsUserEvent`  | `true` for user-created events; `false` for system-generated events.                                    |
| `IsEphemeral`  | `true` for instantaneous events without a duration.                                                     |

Because each event includes a start and an end time, Wavefront events that span a duration are rendered as shaded regions on time-series panels. Instantaneous events appear as vertical markers.

## Add an annotation

To add a Wavefront annotation:

01. Open your dashboard and click **Edit** &gt; **Settings** to open dashboard settings.
02. Select **Annotations** and click **Add annotation query** (or **New query** if an annotation already exists).
03. Enter a **Name** for the annotation, for example `Wavefront events`.
04. Set **Data source** to your Wavefront data source.
05. Leave **Query Type** set to **Events**.
06. Set **Limit** to the maximum number of events to return per refresh.
07. (Optional) Configure a **Color** to distinguish this annotation from others on the dashboard.
08. (Optional) Toggle **Hidden** to hide the annotation by default; users can still toggle it on from the dashboard.
09. (Optional) Use the **Fields** section to map response fields to the annotation **Title**, **Text**, and **Tags**, as described in [Map response fields to annotation properties](#map-response-fields-to-annotation-properties).
10. Click **Apply** to save the annotation, then save the dashboard.

For general annotation configuration options, refer to [Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

### Map response fields to annotation properties

By default, Grafana picks reasonable values for the annotation **Title**, **Text**, and **Tags**. You can override the defaults under the annotation’s **Fields** section to customize what appears in tooltips and tag filters:

Expand table

| Annotation property | Recommended Wavefront field |
|---------------------|-----------------------------|
| **Time**            | `StartTime`                 |
| **Time end**        | `EndTime`                   |
| **Title**           | `Name`                      |
| **Text**            | `Detail`                    |
| **Tags**            | `Severity` and `Type`       |

Mapping `Severity` and `Type` to **Tags** lets users filter annotations from the dashboard’s annotation toggle bar.

## Filter events with a target panel

The Wavefront events API doesn’t accept a server-side filter, so the annotation query returns every event in the time range up to **Limit**. To narrow the events that appear on a specific panel:

1. Open the panel and switch to the **Annotations** tab.
2. Disable annotations you don’t want on this panel, or enable only the Wavefront annotation.
3. Use Grafana’s tag-based annotation filters to scope by `Severity` or `Type` if you mapped those fields to **Tags**.

For broad filtering across many panels, configure multiple annotation queries (for example, one per severity) and toggle them with the dashboard’s annotation switches.

## Legacy annotation migration

Annotations created before plugin v2.0.0 used a different format. The plugin automatically migrates those annotations the first time the dashboard loads. The migration:

- Sets the annotation **Query Type** to **Events**.
- Preserves the original **Limit** value.

You don’t need to edit migrated annotations unless you want to use the newer field-mapping options.

## Use cases

Common uses of Wavefront event annotations include:

- **Deploy markers:** Surface deployment events on latency and error-rate panels to correlate metric changes with releases.
- **Wavefront alert correlation:** Overlay Wavefront alert-firing events on related metric panels during incident review. Map `SubType` to **Tags** so you can filter by alert state.
- **Maintenance windows:** Display planned maintenance events as shaded regions on infrastructure dashboards. Wavefront’s `EndTime` makes the maintenance window visible as a range, not just a marker.
- **User-driven events:** Surface manual events created by operators (`IsUserEvent` = `true`) on dashboards where context from on-call engineers is useful.

## Performance tips

- Keep **Limit** low (the default `100` is usually enough). Returning thousands of events on every dashboard refresh slows the dashboard and clutters panels.
- Hide noisy annotations by default and let users toggle them on when needed.
- Configure separate annotation queries for different severities or types so users can choose which events to display.

## Next steps

- Review metrics with the [Wavefront query editor](/docs/plugins/grafana-wavefront-datasource/latest/query-editor/).
- Use [template variables](/docs/plugins/grafana-wavefront-datasource/latest/template-variables/) to build reusable dashboards.
- Create [alert rules](/docs/plugins/grafana-wavefront-datasource/latest/alerting/) from Wavefront queries.
