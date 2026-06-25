---
title: "MQTT data source | Grafana Plugins documentation"
description: "Use the MQTT data source to stream real-time MQTT messages into Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# MQTT data source

The MQTT data source plugin connects Grafana to an [MQTT](https://mqtt.org/) broker, letting you stream messages from MQTT topics directly into dashboard panels in real time. It’s well suited for IoT monitoring, sensor data visualization, and any scenario where you need live data pushed from devices or services.

> Note
>
> This plugin streams live data only. It doesn’t store messages or provide access to historical data. If you need to query past events, use a storage backend such as [Loki](/docs/loki/latest/) or [InfluxDB](/docs/grafana/latest/datasources/influxdb/) to persist messages received from MQTT.

## Supported features

The following table lists the features supported by the MQTT data source.

Expand table

| Feature         | Supported |
|-----------------|-----------|
| **Metrics**     | Yes       |
| **Streaming**   | Yes       |
| **Alerting**    | No        |
| **Annotations** | No        |
| **Logs**        | No        |
| **Traces**      | No        |

## Requirements

Before you set up the MQTT data source, you need:

- **Grafana version:** Grafana 11.0.0 or later.
- **MQTT broker:** A running MQTT v3.1.x broker accessible from the Grafana server.
- **Grafana permissions:** Organization administrator role. Refer to [Permissions](/docs/grafana/latest/administration/roles-and-permissions/) for details.

## Get started

The following pages help you set up and use the MQTT data source:

- [Configure the MQTT data source](/docs/plugins/grafana-mqtt-datasource/latest/configure/) – Set up the connection, authentication, and TLS.
- [MQTT query editor](/docs/plugins/grafana-mqtt-datasource/latest/query-editor/) – Subscribe to topics and understand how data is formatted.
- [Template variables](/docs/plugins/grafana-mqtt-datasource/latest/template-variables/) – Create dynamic dashboards with variable-driven topics.
- [Troubleshoot MQTT data source issues](/docs/plugins/grafana-mqtt-datasource/latest/troubleshooting/) – Resolve common connection, authentication, and query problems.

## Known limitations

- The plugin supports MQTT v3.1.x only. MQTT v5 isn’t supported.
- Supported connection schemes are `tcp://`, `tls://`, `ws://`, and `wss://`. The aliases `mqtt://` (same as `tcp://`), `ssl://`, `tcps://`, and `mqtts://` (same as `tls://`) are also accepted.
- Not all MQTT CONNECT packet options are available for configuration.
- All subscriptions use QoS 0 (at most once delivery).
- There’s no historical data support. Panels only display data received while they’re open.
- Timestamps are attached when messages arrive at Grafana, not extracted from message payloads. Use the **Convert field type** transformation to parse timestamps embedded in messages.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [MQTT v3.1.1 specification](https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html)
- [MQTT datasource plugin on GitHub](https://github.com/grafana/mqtt-datasource)
- [Grafana community forum](https://community.grafana.com/)
