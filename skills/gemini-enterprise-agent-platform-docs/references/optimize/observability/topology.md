> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

You can view agent relationships in Gemini Enterprise Agent Platform, including communication
between agents and communication between agents and MCP servers.

Using provided queries, you can explore the query results as a topology graph or
as a table. Information about agent relationships can help you to understand
dependencies and support agent governance.

You can view data for both discovered agents and agents that are registered with
[Agent Registry](https://docs.cloud.google.com/agent-registry/overview). Gemini Enterprise Agent Platform determines
relationships using aggregated trace data.

### Limitations

- Query results only include components that meet the following criteria:
  - Agents must have [functional type](https://docs.cloud.google.com/app-hub/docs/reference/rest/v1/FunctionalType) set to `AGENT` and be deployed using ADK, Gemini Enterprise, or Cloud Run; or be deployed using GKE and registered with [Agent Registry](https://docs.cloud.google.com/agent-registry/overview).
  - MCP servers must have [functional type](https://docs.cloud.google.com/app-hub/docs/reference/rest/v1/FunctionalType) set to `MCP`. First-party MCP servers deployed using OneMCP, GKE, or Cloud Run are included. Other MCP servers must be registered with [Agent Registry](https://docs.cloud.google.com/agent-registry/overview) to be included.
  - Other components, such as tools and models, or Workspace Agents aren't included in results.
- When an MCP server is registered to Agent Registry, it is classified as a shared resource by App Hub which won't show edges to other nodes in the topology graph. This limitation only applies if the MCP server is classified as a shared resource and doesn't apply to application-exclusive resources, such as Gemini Enterprise data connectors or MCP servers hosted on Cloud Run.

## Before you begin

1.

   Enable the App Hub, App Topology, Observability, and Trace APIs.

   **Roles required to enable APIs**

   To enable APIs, you need the Service Usage Admin IAM
   role (`roles/serviceusage.serviceUsageAdmin`), which
   contains the `serviceusage.services.enable` permission. [Learn how to grant
   roles](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

   [Enable the APIs](https://console.cloud.google.com/apis/enableflow?apiid=apphub.googleapis.com,apptopology.googleapis.com,observability.googleapis.com,trace.googleapis.com&redirect=https://console.cloud.google.com)
2. If you've added other projects to your [trace scope](https://docs.cloud.google.com/trace-scope/create-and-manage), then we recommend you also enable the Observability API for those projects. The topology graph only shows trace data from trace scope projects that are in the same organization as the selected project.
3. [Instrument
   your AI applications with OpenTelemetry](https://docs.cloud.google.com/stackdriver/docs/instrumentation/ai-agent-overview).

### Required roles

To get the permissions that
you need to view topology graphs,

ask your administrator to grant you the
following IAM roles on the project:

- View graphs: [App Topology Viewer](https://docs.cloud.google.com/iam/docs/roles-permissions/apptopology#apptopology.viewer) (`roles/apptopology.viewer`)
- View registered agent data: Agent Registry API Viewer (`agentregistry.viewer`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

## View graphs for a project

1. In the Google Cloud console, go to the Topology page.

   [Go to Topology](https://console.cloud.google.com/agent-platform/topology)

2. In the project picker, select the project that contains your agents.

3. In the **Queries** section, click a query.

4. The **Graph** section displays the results for the selected query.

   The topology graph is fully interactive. You can zoom in and out and drag
   nodes around to help you visualize the relationships. To open a panel that
   provides additional details about a node in the graph, click the node.
5. To view the query results as a table, click **Table**.

   - To select the columns that the table displays, click **Column display options**
   - To filter the table for specific properties, select the properties in the **Filter** field.
   - You can also sort each column in ascending or descending order.
6. To refine or customize your query, you can edit the selected query and
   view results as a topology graph in Cloud Hub. Click
   **Edit in Cloud Hub**.

To view additional data about agents in the selected project, view the
dashboards in [Application Monitoring](https://docs.cloud.google.com/monitoring/docs/application-monitoring-ai-resources).

## View graphs for a registered agent

1. In the Google Cloud console, go to the Agent Registry page.

   [Go to Agent Registry](https://console.cloud.google.com/agent-platform/agent-registry/agents)

2. In the project picker, select the project that contains your agents.

3. On the **Agents** tab, click the name of the agent that you want to view.

4. Click the **Topology** tab.

5. In the **Queries** section, click a query.

6. The **Graph** section displays the results for the selected query.

   The topology graph is fully interactive. You can zoom in and out and drag
   nodes around to help you visualize the relationships. To open a panel that
   provides additional details about a node in the graph, click the node.
7. To view the query results as a table, click **Table**.

   - To select the columns that the table displays, click **Column display options**
   - To filter the table for specific properties, select the properties in the **Filter** field.
   - You can also sort each column in ascending or descending order.
8. To refine or customize your query, you can edit the selected query and
   view results as a topology graph in Cloud Hub. Click
   **Edit in Cloud Hub**.

To view additional data about the selected agent, view the
dashboards in [Application Monitoring](https://docs.cloud.google.com/monitoring/docs/application-monitoring-ai-resources).

## What's next

- [Register discovered agents](https://docs.cloud.google.com/agent-registry/register-agents) in Agent Registry.
- Create custom queries in for agentic data and other resources in [Cloud Hub](https://docs.cloud.google.com/hub/docs/app-topology).
