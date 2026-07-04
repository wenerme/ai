Use this page to learn how to view logs and monitor requests and access control
decisions for traffic routed through your Agent Gateway
deployment.

## Logging

Agent Gateway logs are generated using the
`networkservices.googleapis.com/Gateway` monitored resource.

You can use these logs to monitor access requests to the gateway. This includes
the logs created when Agent Gateway is deployed in dry-run mode.

### View logs for a specific gateway

To view the logs for a specific gateway, complete the following steps.

### Console query

1. In the Google Cloud console, go to the **Logs Explorer** page.

   [Go to Logs Explorer](https://console.cloud.google.com/logs)
2. Click the **Show query** toggle.

3. Paste the following into the query field.

   ```
   resource.type="networkservices.googleapis.com/Gateway"
   resource.labels.location="REGION"
   resource.labels.gateway_name="AGENT_GATEWAY_NAME"
   ```

   Replace the following:
   - `REGION`: The region of your gateway.
   - `AGENT_GATEWAY_NAME`: The name of your gateway.
4. Click **Run query**.

### What is logged

Agent Gateway log entries contain information useful for
monitoring and debugging traffic to and from your gateway.

| Field | Field format | Field type: Required or Optional | Description |
| Field | Field format | Field type: Required or Optional | Description |
|---|---|---|---|
| **severity** **insertID** **timestamp** **receiveTimestamp** **trace** **traceSampled** **logName** | [LogEntry](https://docs.cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry) | Required | The general fields as described in a log entry. |
| **httpRequest** | [HttpRequest](https://docs.cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#HttpRequest) | Required | A common protocol for logging HTTP requests. |
| **resource** | [MonitoredResource](https://docs.cloud.google.com/logging/docs/reference/v2/rest/v2/MonitoredResource) | Required | The `MonitoredResource` is the resource type associated with a log entry. The resource type for Agent Gateway is `networkservices.googleapis.com/Gateway`. |
| **jsonPayload** | object ([Struct](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf?_ga#struct) format) | Required | The log entry payload that is expressed as a JSON object. The JSON object contains the following Agent Gateway fields: - `agentGatewayInfo`: Includes information about Agent Gateway requests. - `mcpInfo`: Includes information about the MCP method of the request (for example, "tools/list" or "tools/call") and the primary parameter associated with the method, if any. For example, in the case of the "tools/call" method the parameter is the tool name. - `agentRegistryResource`: The Agent Registry resource name of the MCP server, agent, or endpoint that was matched to the request. - You can also inspect the details of the [`serviceEntensionsInfo`](https://docs.cloud.google.com/service-extensions/docs/monitor-lb-callouts#what-is-logged-for-callouts) field for information about the authorization extension (IAP, Model Armor, or other) that handled the request. |

## Monitoring

Agent Gateway exports some Service Extensions metrics
to Cloud Monitoring. If you're delegating authorization to
Service Extensions, you can use these metrics to monitor traffic to and
from your extension. For details, see [Logging and monitoring for
Cloud Load Balancing
callouts](https://docs.cloud.google.com/service-extensions/docs/monitor-lb-callouts#monitoring_metrics_for_callouts).

### Observability dashboard

Agent Gateway provides an observability dashboard that lets you
monitor, audit, and debug traffic routed through your gateways:

- **Scorecards**: Track the total number of attempted authorizations, authorization failures, and requests per second.
- **Charts**: Visualize authorization failure rates (%) and requests per second over time.
- **Egress traffic logs** : Review detailed logs for egress queries, including `403` denials, traffic to unregistered endpoints, and overall traffic trends.

Use the following steps to access the observability dashboard for a gateway in
the Google Cloud console:

1. In the Google Cloud console, go to the **Agent Gateway** page.

   [Go to Agent Gateway](https://console.cloud.google.com/agent-platform/gateways)
2. Click the name of the gateway that you want to monitor.

3. Click the **Observability** tab.

**Dashboard data requirements**

The Agent Gateway observability dashboard uses
Observability Analytics to display data. If the dashboard isn't loading data,
ensure that you [upgrade the `_Default` log bucket to use
Observability Analytics](https://docs.cloud.google.com/logging/docs/buckets#upgrade-bucket). The dashboard
retrieves data from the `_Default` bucket's [`_AllLogs`
view](https://docs.cloud.google.com/logging/docs/logs-views#auto-create-views).

## What's next

Codelab

### [Codelab: Govern agentic workloads with Agent Platform](https://codelabs.developers.google.com/cloudnet-agent-gateway)

Learn how to govern agentic workloads with Agent Gateway on Gemini Enterprise Agent Platform.

Troubleshooting

### [Troubleshoot Agent Gateway](https://docs.cloud.google.com/gemini-enterprise-agent-platform/troubleshooting/troubleshoot-agent-gateway)

Learn how to troubleshoot Agent Gateway connectivity.
