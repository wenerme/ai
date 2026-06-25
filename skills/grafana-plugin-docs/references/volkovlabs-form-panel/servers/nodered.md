---
title: "Node-RED | Grafana Plugins documentation"
description: "Learn how to use Node-RED as a visual API gateway for authentication, CORS management, and database integration with the Business Forms panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Node-RED

Node-RED is a good companion for the Business Forms panel because it’s simple, provides a visual interface, and doesn’t require developer experience.

Thanks to community member [Alejandro Guida](https://github.com/canob) for this explanation.

## Use cases

Node-RED usage scenarios with the Business Forms panel:

- Manage authentication (acquire and renew tokens) for API services using OAuth2 authentication. Because the Business Forms panel can’t handle this type of authentication, you can use the API inside API approach.
- Use an API gateway to relax CORS restrictions, because Node-RED’s default response includes the `Access-Control-Allow-Origin: *` header.
- Manage authentication across all destination databases and APIs to maintain a single authentication type for all services.

[](/media/docs/grafana/panels-visualizations/business-forms/node-red.png)
