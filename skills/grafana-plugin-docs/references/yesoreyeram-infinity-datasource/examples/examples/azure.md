---
title: "Azure API | Grafana Plugins documentation"
description: "Connect the Infinity data source to Azure management APIs."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure API

Connect the Infinity data source to Azure management APIs to query subscriptions, resources, cost data, and security information.

## Before you begin

- Access to the Azure portal with permissions to create app registrations
- Note your Azure Tenant ID

## Create an Azure app registration

1. In the [Azure portal](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), navigate to **Microsoft Entra ID** &gt; **App registrations**.
2. Click **New registration** and create an application.
3. Navigate to **Certificates &amp; secrets** and create a new client secret.
4. Note down the following values:

   Expand table

   | Value             | Location                                                  |
   |-------------------|-----------------------------------------------------------|
   | **Client ID**     | Overview &gt; Application (client) ID                     |
   | **Client Secret** | Certificates &amp; secrets &gt; Client secrets &gt; Value |
   | **Tenant ID**     | Overview &gt; Directory (tenant) ID                       |
5. Navigate to **API permissions** and verify the app has the required permissions.
6. Assign the app a role (for example, **Reader** or **Monitoring Reader**) on the subscriptions or resources you want to query.

## Configure the data source

1. In Grafana, navigate to **Connections** &gt; **Data sources**.
2. Click **Add new data source** and select **Infinity**.
3. Expand the **Authentication** section and select **OAuth2**.
4. Select **Client Credentials** as the grant type.
5. Configure the following settings:

   Expand table

   | Setting           | Value                                                        |
   |-------------------|--------------------------------------------------------------|
   | **Client ID**     | Your Azure app client ID                                     |
   | **Client Secret** | Your Azure app client secret                                 |
   | **Token URL**     | `https://login.microsoftonline.com/<TENANT_ID>/oauth2/token` |
   | **Scopes**        | Leave empty                                                  |
6. Add an **Endpoint parameter**:

   - **Key**: `resource`
   - **Value**: `https://management.azure.com/`
7. In **Allowed hosts**, enter `https://management.azure.com`.
8. Click **Save &amp; test**.

## Query examples

### List subscriptions

**URL:**

[Copy code to clipboard] Copy

```none
https://management.azure.com/subscriptions?api-version=2020-01-01
```

**Configuration:**

- **Type**: JSON
- **Parser**: Backend or UQL
- **Root selector**: `value`

### List resource groups

**URL:**

[Copy code to clipboard] Copy

```none
https://management.azure.com/subscriptions/{subscriptionId}/resourcegroups?api-version=2021-04-01
```

**UQL query:**

SQL [Copy code to clipboard] Copy

```sql
parse-json
| scope "value"
| project "Name"="name", "Location"="location", "Provisioning State"="properties.provisioningState"
```

### List virtual machines

**URL:**

[Copy code to clipboard] Copy

```none
https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.Compute/virtualMachines?api-version=2023-03-01
```

**UQL query:**

SQL [Copy code to clipboard] Copy

```sql
parse-json
| scope "value"
| project "Name"="name", "Location"="location", "VM Size"="properties.hardwareProfile.vmSize", "OS"="properties.storageProfile.osDisk.osType"
```

### Query cost data

**URL:**

[Copy code to clipboard] Copy

```none
https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.CostManagement/query?api-version=2023-03-01
```

**Method:** POST

**Body (JSON):**

JSON [Copy code to clipboard] Copy

```json
{
  "type": "Usage",
  "timeframe": "MonthToDate",
  "dataset": {
    "granularity": "Daily",
    "aggregation": {
      "totalCost": {
        "name": "Cost",
        "function": "Sum"
      }
    }
  }
}
```

## Provision the data source

Configure Azure OAuth2 authentication through provisioning:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Azure Infinity
    type: yesoreyeram-infinity-datasource
    jsonData:
      auth_method: oauth2
      oauth2:
        oauth2_type: client_credentials
        client_id: YOUR_CLIENT_ID
        token_url: https://login.microsoftonline.com/YOUR_TENANT_ID/oauth2/token
      oauthPassThru: false
      allowedHosts:
        - https://management.azure.com
    secureJsonData:
      oauth2ClientSecret: YOUR_CLIENT_SECRET
```

## Troubleshoot

Expand table

| Issue            | Cause                          | Solution                                                 |
|------------------|--------------------------------|----------------------------------------------------------|
| 401 Unauthorized | Invalid or expired credentials | Regenerate client secret and update configuration        |
| 403 Forbidden    | Missing role assignment        | Assign Reader role to the app on the target subscription |
| Invalid token    | Wrong token URL                | Verify tenant ID in the token URL                        |
| Empty response   | Wrong API version              | Check Azure REST API docs for the correct `api-version`  |

## Additional resources

- [Azure REST API documentation](https://learn.microsoft.com/en-us/rest/api/azure/)
- [Azure Resource Manager API reference](https://learn.microsoft.com/en-us/rest/api/resources/)
- [Azure Cost Management API](https://learn.microsoft.com/en-us/rest/api/cost-management/)
