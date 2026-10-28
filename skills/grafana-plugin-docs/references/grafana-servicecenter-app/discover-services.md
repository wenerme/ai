---
title: "Discover services | Grafana Plugins documentation"
description: "Find services in the labels on your existing SLOs, alert rules, dashboards, incidents, and synthetic checks, and create them in Service Center in bulk."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Discover services

If your service level objectives (SLOs), alert rules, dashboards, incidents, or synthetic checks already carry a label that names the service they belong to, you don’t need to create each service by hand. **Discover services** reads that label across your Grafana Cloud resources, lists each value it finds as a candidate service, and lets you create the services you want in a single step.

Service Center configures each service you create this way to match the resources that use its label value, so the [Service Center view](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/overview/) shows those resources right away.

## How Service Center finds services

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

## Before you begin

Before you discover services, make sure that:

- You have the Editor or Admin role. Users with the Viewer role can open **Discover services** and review the list, but can’t create services.
- Your resources use a consistent label for the service they belong to. Discovery finds only the values that are already on your resources.
- To include incidents, Grafana IRM is enabled in your stack. To include synthetic checks, Synthetic Monitoring is set up.

## Choose a label key

To open **Discover services** and choose the label key, follow these steps:

1. Navigate to **Alerts &amp; IRM** &gt; **Service Center** &gt; **Home** and click **Discover services**.

   If your stack already has services, you can also click **Discover services** on the **Services** page.
2. In **Label key**, select the label that identifies services on your resources, or type a custom key.

   The default is `service_name`. The list also suggests `service`, `job`, `namespace`, `app`, and `team`.

Changing the label key clears the services you selected and any names you edited.

### Check the status of each source

The **Sources** row shows whether Service Center could read each source:

- A green check mark means the source loaded.
- A red warning icon means the request failed. Hover over the source to view the error.
- A gray icon means the source isn’t available in your stack, for example because Grafana IRM isn’t enabled. Hover over the source to view the reason.

If a source fails or isn’t available, the list contains only the results from the other sources. Sources that aren’t available don’t appear as columns in the list.

## Configure service names

Service Center generates a name for each discovered service from its label value. The **Preview** shows how the current settings format three sample values.

To configure how services are named, set the following options:

- **Naming pattern**: The template for each name. The pattern must include `${service_identifier}`, which is replaced with the label value. Add text before or after it to add a prefix or suffix, for example `Payments ${service_identifier}`.
- **Case formatting**: Choose **Title case**, **Sentence case**, **Lowercase**, or **Uppercase**. The default is **Title case**.
- **Replace dashes**: When selected (the default), dashes in the label value are replaced with spaces. Underscores and other characters aren’t changed.

With the default settings, `checkout-service` becomes `Checkout Service`, `user-api-prod` becomes `User Api Prod`, and `payment_gateway` becomes `Payment_gateway`.

> Tip
>
> **Title case** and **Sentence case** lowercase every letter after the first one in a word, so acronyms such as `API` become `Api`. To keep an acronym, edit the name for that service before you create it.

## Select and create services

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

## Review the discovered services

Each service that you create from **Discover services** has the following configuration:

- **Name**: The generated name, or the name you entered.
- **Service identifier**: The label value, converted to a valid identifier. Service Center converts uppercase letters to lowercase, replaces any character other than a letter, number, or dash with a dash, and shortens the result to 63 characters. For example, `Payment_Gateway` becomes `payment-gateway`.
- **Additional identifier**: The label key you selected and the original label value, for example `service_name` = `Payment_Gateway`. Resources that use the original value still match the service.

The **Service identifier** can’t be changed after the service is created.

If two selected values convert to the same identifier, for example `checkout_api` and `checkout-api`, the dialog box shows a warning and creates only the first service of each group.

Discovered services don’t have a description, team, attributes, or dependencies. To show on-call information and [respond to service issues from Service Center](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/escalate-to-irm/), edit each service and assign a team. For details on each setting, refer to [Create a service](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/create-a-service/).

## Troubleshoot discovery

The following issues are the most common when you discover services.

### No services are discovered

If the list shows **No services discovered with the label key**, none of the loaded sources use that label key. Choose a different label key, or check the **Sources** row for sources that failed or aren’t available.

If the list shows **All discovered services already exist**, every value of the label key already belongs to a service. To find services that use a different label convention, choose a different label key.

### The create button is unavailable

**Create *N* services** is unavailable in the following cases:

- No services are selected.
- The **Naming pattern** doesn’t include `${service_identifier}`.
- Service Center couldn’t load your current services. To avoid creating duplicates, it doesn’t create services until it can check which ones already exist. Reload the page to try again.

If the button doesn’t appear at all, you don’t have permission to create services. Ask an administrator for the Editor or Admin role.
