---
title: "Create a service | Grafana Plugins documentation"
description: "Service Center provides a centralized operational view of your services. Create a service to correlate Grafana Cloud resources using labels and tags that identify the service."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Create a service

Create a service to enable the [Service Center view](/docs/grafana-cloud/alerting-and-irm/service-center/overview/) and provide a centralized operational view of your team’s services.

A service represents an application, API, or other component that your team owns and operates. Service Center correlates Grafana Cloud resources to a service by matching labels and tags that identify that service.

You can create and manage services directly in Grafana Cloud or import them from [Backstage](#import-services-from-backstage).

## Add a service

To create a service in Grafana Cloud, navigate to **Alerts &amp; IRM -&gt; Service center** and click **+ New Service**.

### Set name and attributes

Configure the basic information for the service:

1. Enter a name for the service.
2. Optional: Enter a description of the service.
3. Optional: Assign a team to the service to enable [on-call information and respond to service issues from Service Center](/docs/grafana-cloud/alerting-and-irm/service-center/escalate-to-irm/).
4. Optional: Enter custom attributes using **Add Attribute**.

   Attributes provide additional context about the service. Common examples include links to **Documentation**, **Repository**, and other relevant metadata.

### Configure service content

In the **Service content** section, define how Service Center identifies resources associated with the service.

- **Service identifier** defines the value of the `service_name` label used to discover related resources such as incidents, SLOs, dashboards, synthetic checks, and alert rules.
- **Additional identifier** lets you define additional label key-value pairs when resources use another label convention.

[](/media/docs/grafana-cloud/service-center/screenshot-service-content-section.png)

> Note
>
> The **Service identifier** value cannot be changed after the service is created.

### Configure dependencies

Optionally, define dependencies between services to model relationships within your system architecture. Dependencies help assess potential upstream or downstream impact during incidents.

After you save the service, Service Center discovers matching resources and displays them in the [Service Center view](/docs/grafana-cloud/alerting-and-irm/service-center/overview/).

## Import services from Backstage

If you use [Backstage](https://github.com/backstage/backstage), you can import services from your software catalog and keep them synchronized with Service Center.

Imported services are automatically correlated with Grafana Cloud resources such as incidents, SLOs, and other operational data.

To configure the integration, follow the instructions for the [`backstage-plugin-grafana-catalog`](https://github.com/grafana/backstage-plugin-grafana-catalog/blob/main/docs/quickstart.md).
