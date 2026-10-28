---
title: "Find and organize services | Grafana Plugins documentation"
description: "Use the Service Center home page and service list to find services, filter them by team or identifier, star the services you care about, and share filtered views."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Find and organize services

As your service catalog grows, use the Service Center home page and service list to get to the services you care about. You can search and filter the list, star services, return to services you viewed recently, and share a filtered view with your team.

## Start from the home page

When you navigate to **Alerts &amp; IRM** &gt; **Service Center**, Service Center opens on the **Home** page. The home page links to the main ways to work with services:

- **View services**: Open the service list.
- **Create a service**: [Create a single service](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/create-a-service/). This card appears only if you have the Editor or Admin role.
- **Discover services**: [Find and create services](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/discover-services/) from the labels on your SLOs, alerts, dashboards, incidents, and synthetic checks.
- **Import from Backstage**: [Import services](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/create-a-service/#import-services-from-backstage) from your Backstage software catalog.

## Search and filter the service list

The **Services** page lists every service in alphabetical order by name, 25 services per page. Each row shows the service name, description, and service identifier.

To narrow the list, use any combination of the following filters. The list shows only the services that match every filter you set.

- **Search by name or identifier**: Matches services whose name or service identifier contains each word you enter. The search isn’t case-sensitive, and it doesn’t match additional identifiers or descriptions.
- **Filter by team**: Shows services owned by any of the selected teams.
- **Filter by identifier**: Shows services that have any of the selected additional identifiers, such as `namespace=checkout-prod`. For more information, refer to [Add additional identifiers](https://grafana.com/docs/grafana-cloud/alerting-and-irm/service-center/create-a-service/#add-additional-identifiers).
- **Starred**: Shows only the services you starred.
- **My teams**: Shows only services owned by teams you belong to. This switch appears only if you’re a member of at least one team.

To remove every filter, click **Clear filters**.

You can also filter by team from a service page: click the owning team’s name to open the service list filtered to that team.

### Share and bookmark a filtered view

Service Center saves your filters in the page URL. To share a filtered view, copy the URL and send it to your team, or bookmark it to return to the same view later.

Your browser also remembers the last filters you used. When you return to the **Services** page without filters in the URL, Service Center applies them again. Because your browser stores these filters, they don’t follow you to other browsers or devices.

## Star services

Star the services you work with most so you can find them quickly. Any user can star services, including users with the Viewer role.

To star a service, click the star icon in its row in the service list, or next to its name on the service page. Click the star again to remove it.

Stars are saved to your Grafana user account, so they follow you across browsers and devices. Other users don’t see your stars. To display only your starred services, turn on the **Starred** switch in the service list.

## Return to recently viewed services

The **Recently viewed** row above the filters on the **Services** page links to the last six services you opened, with the most recent first.

Your browser stores this list, so it doesn’t follow you to other browsers or devices.
