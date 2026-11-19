---
title: "Discover services | Grafana Plugins documentation"
description: "Create services in bulk from the services the knowledge graph observes in your stack, or from labels on your existing SLOs, alert rules, dashboards, incidents, and synthetic checks."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Discover services

Use **Discover services** to create many services at once from what’s already in your stack. It lists the services it finds as candidates, and you create the ones you want in a single step. To choose how it finds services, use the tabs at the top of the page:

- **Entity graph**: Lists the services that the [knowledge graph](https://grafana.com/docs/grafana-cloud/platform/knowledge-graph/) has observed running in your stack. It finds services even if no one has configured an SLO, alert rule, or dashboard for them yet.
- **Existing resources**: Reads a label from your SLOs, alert rules, dashboards, incidents, or synthetic checks, and lists each value it finds.

If the knowledge graph isn’t enabled in your stack, **Discover services** opens on the **Existing resources** tab.

Service Center adds identifiers to each service you create this way, so the [Service Center view](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/overview/) can show the matching resources right away.

## Discover services from the entity graph

The **Entity graph** tab lists the services in your stack’s knowledge graph. Use it to build a catalog from what’s running, rather than from what you’ve already labeled.

### Before you begin

Before you use the **Entity graph** tab, make sure that:

- The [knowledge graph](https://grafana.com/docs/grafana-cloud/platform/knowledge-graph/) is enabled in your stack.
- You have the Editor or Admin role to create services. Users with the Viewer role can review the list, but can’t create services.

### How Service Center lists services from the entity graph

The knowledge graph tracks each deployment of a service as a separate entity, so a service that runs in five namespaces is five entities. Service Center collapses entities that share a name into a single service. The list header shows how many entities it collapsed, as **Collapsed from *N* graph entities**. This page calls the name that the knowledge graph reports for a service its *graph name*.

The list includes only the services that were running in the time window you choose in **Active within**. The count in the list header shows the number of services active in that window.

Each row shows the following information:

Expand table

| Column       | What it shows                                                                                                                                                                |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service name | The graph name of the service, with an **Already exists**, **Possible duplicate**, or **Shared name** tag when one applies. Hover over a tag for details.                    |
| Identifier   | The identifier Service Center creates for the service. Service Center converts the graph name to a valid identifier that uses lowercase letters, numbers, and dashes.        |
| Scopes       | The number of environment, site, and namespace combinations where the service was observed. Hover over the value to see them.                                                |
| Team label   | The team label that the knowledge graph reports for the service, if any.                                                                                                     |
| Identifiers  | The additional identifiers Service Center adds to the service: `workload`, `service`, and `job`, when every deployment of the service reports the same value for that label. |

Services that already exist in Service Center appear with an **Already exists** tag, and you can’t select them. If a graph name has no letters or numbers that Service Center can use in an identifier, the **Identifier** column shows **unusable name**, and you can’t select that service either.

Some entities are named after the address of a database or other dependency instead of a service, for example an IP address, a hostname, or a connection string. Service Center hides these names by default.

### Create services from the entity graph

To create services from the entity graph, follow these steps:

1. Navigate to **Alerts &amp; IRM** &gt; **Service Center** and click **Discover services**.
2. In **Active within**, select how far back to look for running services: **Last 1 hour**, **Last 6 hours**, **Last 24 hours**, or **Last 7 days**. The default is **Last 24 hours**.

   Choose a longer window to include periodic workloads, such as batch jobs, that aren’t running at any given hour. Choose a shorter window to leave out short-lived or retired deployments.
3. Optional: To include services named after a network address, click ***N* network addresses hidden — show** above the list.
4. Optional: To find specific services, enter text in the filter field.

   The filter matches the service name, team label, and namespace.
5. Select the checkbox for each service you want to create.

   To select every service on the current page, select the checkbox in the list heading. Select it again to select every service on all pages, and a third time to clear the selection.
6. Click **Create *N* services**, where *N* is the number of services you selected.
7. In the dialog box, review the services and any warnings, and click **Create *N* services**.

   The dialog box lists each service’s identifier, team label, and additional identifiers. For large selections, it shows the first 100 services. For details on each warning, refer to [Review warnings before you create services](https://grafana.com/docs/plugins/grafana-servicecenter-app/latest/discover-services/#review-warnings-before-you-create-services).

Service Center shows its progress as it creates the services. To stop, click **Stop**. Services that were already created stay created. If some services can’t be created, Service Center lists the names that failed and leaves them selected so you can try again.

### Review warnings before you create services

Before Service Center creates any services, the dialog box can show the following warnings:

- **Some selected services share an identifier**: Two graph names convert to the same identifier, for example `checkout.api` and `checkout-api`. Service Center creates only the first service of each group.
- ***N* may already be in the catalog under a different name**: A graph name differs only in separators or capitalization from an existing service. Creating it would likely duplicate that service.
- ***N* of these come from shared names**: Other teams report a service with the same name in the knowledge graph. Service Center creates a separate service for each team, and adds the team to the end of each identifier.
- ***N* services will have no identifiers**: The deployments of the service report conflicting labels, so Service Center can’t match the service to SLOs or alert rules. Add identifiers to the service by hand after you create it.

### Review the services you created

Each service that you create from the **Entity graph** tab has the following configuration:

- **Name**: The graph name.
- **Service identifier**: The graph name, converted to a valid identifier. You can’t change it after you create the service.
- **Additional identifiers**: Up to three of `workload`, `service`, and `job`, when they’re consistent across the service’s deployments. Resources that carry these labels match the service.
- **Annotations**: Record where the service came from: `servicemodel.ext.grafana.com/discovery-source` set to `knowledge-graph`, `servicemodel.ext.grafana.com/kg-entity-name` set to the graph name, and `servicemodel.ext.grafana.com/kg-observed-scopes` set to the scopes where the service was observed.

Services created from the entity graph don’t have a description, team, attributes, or dependencies. The **Team label** column is for reference only. Service Center doesn’t assign that team as the service owner. To show on-call information and [respond to service issues from Service Center](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/escalate-to-irm/), edit each service and assign a team.

### Troubleshoot discovery from the entity graph

The following issues are the most common when you discover services from the entity graph.

#### The entity graph is still being built

If the tab shows **The entity graph is still being built**, the knowledge graph is enabled in your stack but hasn’t finished processing. Check back later, or discover services from existing resources in the meantime.

#### No entity graph on this stack

If the tab shows **No entity graph on this stack**, the knowledge graph isn’t enabled in your stack. Click **Switch to existing resources** to discover services from labels instead.

#### No services appear

If the list is empty, the knowledge graph reported no services in the time window you chose. Choose a longer window in **Active within**.

#### The list may be incomplete

If the list shows **This list may be incomplete**, the warning says why:

- The knowledge graph holds more services than discovery reads in one window. Choose a shorter window.
- A request to the knowledge graph failed partway through. Reload the page to try again.

## Discover services from existing resources

The **Existing resources** tab finds services in the labels on your SLOs, alert rules, dashboards, incidents, and synthetic checks.

### Before you begin

Before you discover services, make sure that:

- You have the Editor or Admin role. Users with the Viewer role can open **Discover services** and review the list, but can’t create services.
- Your resources use a consistent label for the service they belong to. Discovery finds only the values that are already on your resources.
- To include incidents, Grafana IRM is enabled in your stack. To include synthetic checks, Synthetic Monitoring is set up.

### How Service Center finds services

You choose a label key, such as `service_name`. Service Center collects every value of that key from the following sources and counts how many resources in each source use each value:

Expand table

| Source     | What Service Center reads                                                                                                                                                                                                       |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SLOs       | SLO labels.                                                                                                                                                                                                                     |
| Alerts     | Labels on Grafana-managed alert rules. Recording rules aren’t counted.                                                                                                                                                          |
| Dashboards | Dashboard tags in the form `<LABEL_KEY>:<VALUE>`, `service:<VALUE>`, or `service_name:<VALUE>`, and tags that have no key, such as `checkout`.                                                                                  |
| Incidents  | Labels on up to 100 of the most recently declared incidents from the last 90 days. If an incident doesn’t have the selected label key, Service Center uses its `service` or `service_name` label instead. Requires Grafana IRM. |
| Synthetics | Labels on Synthetic Monitoring checks. Requires Synthetic Monitoring to be set up in your stack.                                                                                                                                |

Each distinct value becomes one row in the list, with its counts from every source combined.

The list doesn’t include values that already belong to a service. A value belongs to a service when it matches the service’s **Service identifier**, or an additional identifier that uses the same label key.

> Note
>
> Dashboard tags that have no key are counted for every label key you choose. As a result, the list can include tags that aren’t services, such as `production` or `kubernetes`. Review the list before you create services.

### Choose a label key

To open **Discover services** and choose the label key, follow these steps:

1. Navigate to **Alerts &amp; IRM** &gt; **Service Center** &gt; **Home** and click **Discover services**.

   If your stack already has services, you can also click **Discover services** on the **Services** page.
2. If the **Entity graph** tab is open, click **Existing resources**.
3. In **Label key**, select the label that identifies services on your resources, or type a custom key.

   The default is `service_name`. The list also suggests `service`, `job`, `namespace`, `app`, and `team`.

Changing the label key clears the services you selected and any names you edited.

#### Check the status of each source

The **Sources** row shows whether Service Center could read each source:

- A green check mark means the source loaded.
- A red warning icon means the request failed. Hover over the source to view the error.
- A gray icon means the source isn’t available in your stack, for example because Grafana IRM isn’t enabled. Hover over the source to view the reason.

If a source fails or isn’t available, the list contains only the results from the other sources. Sources that aren’t available don’t appear as columns in the list.

### Configure service names

Service Center generates a name for each discovered service from its label value. The **Preview** shows how the current settings format three sample values.

To configure how services are named, set the following options:

- **Naming pattern**: The template for each name. The pattern must include `${service_identifier}`, which is replaced with the label value. Add text before or after it to add a prefix or suffix, for example `Payments ${service_identifier}`.
- **Case formatting**: Choose **Title case**, **Sentence case**, **Lowercase**, or **Uppercase**. The default is **Title case**.
- **Replace dashes**: When selected (the default), dashes in the label value are replaced with spaces. Underscores and other characters aren’t changed.

With the default settings, `checkout-service` becomes `Checkout Service`, `user-api-prod` becomes `User Api Prod`, and `payment_gateway` becomes `Payment_gateway`.

> Tip
>
> **Title case** and **Sentence case** lowercase every letter after the first one in a word, so acronyms such as `API` become `Api`. To keep an acronym, edit the name for that service before you create it.

### Create services from existing resources

The **Discovered services** list shows the generated name, the label value, the number of matching resources in each source, and a **Total**. The list is sorted by **Total**, with the most widely used values first. Click a column heading to sort by that column.

To create services from the list, follow these steps:

1. Optional: To find specific values, enter text in **Filter services**.

   The filter matches the label value, not the generated name.
2. Select the checkbox for each service you want to create.

   To select every service on the current page, select the checkbox in the list heading. Select it again to select every service on all pages, and a third time to clear the selection.
3. Optional: To change the name of a single service, hover over its row, click **Edit service name**, enter a name, and press Enter.

   Names must be 2 to 250 characters long and can contain letters, numbers, spaces, and the characters `-`, `_`, `.`, `(`, `)`, and `&`. To go back to the generated name, click **Reset**.
4. Click **Create *N* services**, where *N* is the number of services you selected.

   A dialog box lists each label value and the name of the service that Service Center creates for it.
5. Review the list and click **Create *N* services**.

When every service is created, Service Center opens the **Services** page.

If some services can’t be created, a warning lists each one and the reason, and **Discover services** stays open. The services that were created no longer appear in the list, so you can select the remaining ones and try again.

### Review the discovered services

Each service that you create from the **Existing resources** tab has the following configuration:

- **Name**: The generated name, or the name you entered.
- **Service identifier**: The label value, converted to a valid identifier. Service Center converts uppercase letters to lowercase, replaces any character other than a letter, number, or dash with a dash, and shortens the result to 63 characters. For example, `Payment_Gateway` becomes `payment-gateway`.
- **Additional identifier**: The label key you selected and the original label value, for example `service_name` = `Payment_Gateway`. Resources that use the original value still match the service.

The **Service identifier** can’t be changed after the service is created.

If two selected values convert to the same identifier, for example `checkout_api` and `checkout-api`, the dialog box shows a warning and creates only the first service of each group.

Discovered services don’t have a description, team, attributes, or dependencies. To show on-call information and [respond to service issues from Service Center](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/escalate-to-irm/), edit each service and assign a team. For details on each setting, refer to [Create a service](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/create-a-service/).

### Troubleshoot discovery from existing resources

The following issues are the most common when you discover services from existing resources.

#### No services are discovered

If the list shows **No services discovered with the label key**, none of the loaded sources use that label key. Choose a different label key, or check the **Sources** row for sources that failed or aren’t available.

If the list shows **All discovered services already exist**, every value of the label key already belongs to a service. To find services that use a different label convention, choose a different label key.

#### The create button is unavailable

**Create *N* services** is unavailable in the following cases:

- No services are selected.
- The **Naming pattern** doesn’t include `${service_identifier}`.
- Service Center couldn’t load your current services. To avoid creating duplicates, it doesn’t create services until it can check which ones already exist. Reload the page to try again.

If the button doesn’t appear at all, you don’t have permission to create services. Ask an administrator for the Editor or Admin role.
