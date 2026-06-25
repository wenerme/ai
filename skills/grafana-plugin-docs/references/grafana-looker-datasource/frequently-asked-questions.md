---
title: "Frequently asked questions | Grafana Enterprise Plugins documentation"
description: "Configuration Q: In the data source configuration section, I am getting the error message invalid config. What does this mean? A: Mostly invalid config refers to missing required information such as Looker URL, Looker client ID and Looker client secret."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](/docs/)[breadcrumb arrow] [Plugins](/docs/plugins/)[breadcrumb arrow] [Looker data source plugin for Grafana](/docs/plugins/grafana-looker-datasource/latest/)[breadcrumb arrow] Frequently asked questions

## Configuration

- **Q:** In the data source configuration section, I am getting the error message `invalid config`. What does this mean?

  **A:** Mostly `invalid config` refers to missing required information such as Looker URL, Looker client ID and Looker client secret.
- **Q:** In the data source configuration section, I am getting the error message `unable to lookup Looker URL from the Grafana server`. What does this mean?

  **A:** Mostly `unable to lookup Looker URL from the Grafana server` refers to either incorrect Looker URL or the Looker instance might not be reachable from the Grafana server.
- **Q:** In the data source configuration section, I am getting the error message `unable to authenticate Looker instance. Potentially incorrect credentials provided`. What does this mean?

  **A:** Mostly `unable to authenticate Looker instance. Potentially incorrect credentials provided` refers to incorrect client id and/or client secret. Ensure you are using correct credentials and credentials with correct permissions to query the data from the Looker instance
- **Q:** How do I validate the credentials outside Grafana instance to ensure I am providing correct credentials?

  **A:** If Grafana not able to connect with your Looker and still if you think the credentials are correct, you can cross verify this by running the following curl command from the host grafana server is running. `curl --location 'https://xxxxxx.looker.app/api/4.0/login' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'client_id=xxxxxx' --data-urlencode 'client_secret=xxxxxx'`. The above command should get a successful api token. Otherwise, you need to fix your API credentials. Once you retrieve the token, you should be able to use this with `curl --location 'https://xxxxxx.looker.app/api/4.0/lookml_models' --header 'Authorization: Bearer xxxxxx'`
