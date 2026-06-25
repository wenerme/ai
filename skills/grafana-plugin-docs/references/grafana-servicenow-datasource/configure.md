---
title: "Configure the ServiceNow data source | Grafana Enterprise Plugins documentation"
description: "Configure the ServiceNow data source plugin for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the ServiceNow data source

This document explains how to configure the ServiceNow data source in Grafana, set up authentication, and prepare your ServiceNow instance.

## Before you begin

Before configuring the data source, ensure you have:

- **Grafana permissions:** Organization administrator role.
- **Grafana version:** 11.6.7 or later.
- **ServiceNow account:** A user account with access to the tables you want to query. Grafana recommends creating a dedicated user or using a service account.
- **Grafana license:** Grafana Cloud Pro, Advanced, or a Pro trial, or Grafana Enterprise with an [activated license](/docs/grafana/latest/administration/enterprise-licensing/).

## Add the data source

To add the ServiceNow data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `ServiceNow` in the search bar.
4. Select **ServiceNow**.
5. Click **Add new data source**.

## Configure authentication

The ServiceNow data source supports two authentication methods. Select the method from the **Authentication Type** drop-down.

### Basic authentication

Basic authentication uses a ServiceNow username and password.

Expand table

| Setting      | Description                                                                               |
|--------------|-------------------------------------------------------------------------------------------|
| **URL**      | The URL of your ServiceNow instance, for example `https://<INSTANCE_ID>.service-now.com`. |
| **Username** | The username of the ServiceNow account.                                                   |
| **Password** | The password of the ServiceNow account.                                                   |

### OAuth authentication

OAuth authentication uses a ServiceNow username and password along with an OAuth Client ID and Client Secret.

Expand table

| Setting           | Description                                                                               |
|-------------------|-------------------------------------------------------------------------------------------|
| **URL**           | The URL of your ServiceNow instance, for example `https://<INSTANCE_ID>.service-now.com`. |
| **Username**      | The username of the ServiceNow account.                                                   |
| **Password**      | The password of the ServiceNow account.                                                   |
| **Client ID**     | The OAuth Client ID from your ServiceNow instance.                                        |
| **Client Secret** | The OAuth Client Secret from your ServiceNow instance.                                    |

## Configure additional settings

The data source provides the following additional settings:

Expand table

| Setting             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Use Sys Tables?** | When enabled, the plugin queries ServiceNow system tables (`sys_db_object`, `sys_dictionary`, `sys_choice`, `sys_glide_object`) to retrieve table and field metadata. This populates drop-downs in the query editor with available tables and fields. When disabled, the plugin uses the Schema API and Metadata API instead. Enabling this option requires additional ServiceNow permissions. Refer to the [Configure ServiceNow permissions](#configure-servicenow-permissions) section. |
| **Query Timeout**   | Maximum time in seconds for queries to complete. Increase this value for slow ServiceNow instances or large tables. Default: `30`.                                                                                                                                                                                                                                                                                                                                                         |

### Custom headers

You can add custom HTTP headers that are sent with every request to ServiceNow. Use custom headers when your ServiceNow instance requires additional headers for proxy configurations or custom middleware.

### Secure socks proxy

If your Grafana instance has the secure socks proxy feature enabled, you can toggle **Enabled** under **Secure Socks Proxy** to route data source connections through the proxy.

### HTTP proxy

When routing Grafana traffic through an HTTP proxy, set one of the following environment variables on the Grafana server:

- `HTTP_PROXY` (or `http_proxy`): `http://<HOST>:<PORT>`
- `HTTPS_PROXY` (or `https_proxy`): `https://<HOST>:<PORT>`

## Verify the connection

Click **Save &amp; test** to verify the connection. A successful connection displays **Plugin health check successful**.

When **Use Sys Tables?** is enabled, the health check verifies access to each required system table and provides specific error messages if any permissions are missing. Refer to [Troubleshoot ServiceNow](/docs/plugins/grafana-servicenow-datasource/latest/troubleshooting/) for solutions to common health check errors.

## Configure ServiceNow permissions

To use the **Use Sys Tables?** option, the ServiceNow user needs read access to the following tables:

Expand table

| Table              | Reason                                                                           |
|--------------------|----------------------------------------------------------------------------------|
| `sys_db_object`    | Retrieves a list of available tables to query.                                   |
| `sys_dictionary`   | Retrieves the list of fields when querying a table.                              |
| `sys_choice`       | Retrieves the list of choices when filtering table results using a choice field. |
| `sys_glide_object` | Collects information about data types including names, base types, and so on.    |
| `incident`         | Validates the Table API and the Aggregate API during health checks.              |

> Note
>
> Grant the ServiceNow user access only to the tables it needs. If the user has access to too many tables, you may encounter performance issues in the query editor.

### Set up a ServiceNow user with ACL rules

The following steps require ServiceNow administrator access and are performed in your ServiceNow instance. These steps are only necessary when the **Use Sys Tables?** option is enabled. For more information about elevated privileges and ACL rules, refer to the [ServiceNow elevated privilege documentation](https://servicenow.com/docs/r/platform-security/c_ElevatedPrivilege.html).

1. Elevate the administrator user to `security_admin`:

   1. Click the profile icon in the top-right navigation.
   2. Click **Elevate Roles**.
   3. Check the box next to **security\_admin**.
   4. Click **OK**.
2. Create a role for Grafana:

   1. Navigate to **System Security** &gt; **Users and Groups** &gt; **Roles**.
   2. Click **New**.
   3. Enter a name (for example, `grafana_reader_role`) and description.
   4. Click **Submit**.
3. Create or update a user for Grafana:

   1. Create a new user (for example, `grafana_user`) or select an existing user.
   2. Assign the role you created in step 2 to this user.
4. Create ACL rules for the required system tables:

   1. Create a table-level read ACL for `sys_db_object`:

      1. Navigate to **System Security** &gt; **Access Control (ACL)**.
      2. In the **Name** column, search for `sys_db_object` and select the **Table** record.
      3. Select the **Controls** tab.
      4. In the **Access Controls** section, click **New**.
      5. Set **Operation** to **read**.
      6. In the **Requires Role** section, add the role you created.
      7. Click **Submit**.
   2. Create field-level read ACLs for `sys_db_object`. Repeat for each field: **Name**, **Label**, **Display Name**, and **Extends table**:

      1. On the `sys_db_object` table record, select the **Columns** tab.
      2. Select the field.
      3. In the **Access Controls** section, click **New**.
      4. Set **Operation** to **read**.
      5. Add the role you created.
      6. Click **Submit**.
   3. Create table-level read ACLs for `sys_dictionary`, `sys_choice`, `sys_glide_object`, and `incident` using the same process as step 4.1.
5. Add read access for any additional tables you want to query from Grafana (for example, `change_request`).

> Note
>
> If you don’t have the ITSM Roles plugin, you can alternatively grant the Grafana user admin privileges to access all tables. This approach is strongly discouraged for production environments.

### Developer instance

To create a ServiceNow developer instance for testing, go to the [ServiceNow Developer](https://developer.servicenow.com/dev.do#!/home) page.

## Provision the data source

You can define the data source using YAML files as part of Grafana’s provisioning system. For more information, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

### Basic authentication example

Refer to the [Provisioning configuration reference](#provisioning-configuration-reference) for all available keys.

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: ServiceNow
    type: grafana-servicenow-datasource
    access: proxy
    url: https://<INSTANCE_ID>.service-now.com
    basicAuthUser: <USERNAME>
    jsonData:
      authMethod: basicAuth
      useSysTables: true
      queryTimeoutSeconds: 30
    secureJsonData:
      basicAuthPassword: <PASSWORD>
```

### OAuth authentication example

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: ServiceNow
    type: grafana-servicenow-datasource
    access: proxy
    url: https://<INSTANCE_ID>.service-now.com
    basicAuthUser: <USERNAME>
    jsonData:
      authMethod: serviceNowOAuth
      oauthClientID: <CLIENT_ID>
      useSysTables: true
      queryTimeoutSeconds: 30
    secureJsonData:
      basicAuthPassword: <PASSWORD>
      oauthClientSecret: <CLIENT_SECRET>
```

### Terraform example

You can provision the ServiceNow data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). The following example configures the data source with OAuth authentication:

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "servicenow" {
  type = "grafana-servicenow-datasource"
  name = "ServiceNow"
  url  = "https://<INSTANCE_ID>.service-now.com"

  basic_auth_enabled  = true
  basic_auth_username = "<USERNAME>"

  secure_json_data_encoded = jsonencode({
    basicAuthPassword = "<PASSWORD>"
    oauthClientSecret = "<CLIENT_SECRET>"
  })

  json_data_encoded = jsonencode({
    authMethod         = "serviceNowOAuth"
    oauthClientID      = "<CLIENT_ID>"
    useSysTables       = true
    queryTimeoutSeconds = 30
  })
}
```

For basic authentication, set `authMethod` to `basicAuth` and omit the OAuth fields.

### Provisioning configuration reference

The following tables list all available provisioning keys:

**`jsonData` fields:**

Expand table

| Key                      | Type    | Description                                              |
|--------------------------|---------|----------------------------------------------------------|
| `authMethod`             | string  | Authentication method: `basicAuth` or `serviceNowOAuth`. |
| `oauthClientID`          | string  | OAuth Client ID (required when using `serviceNowOAuth`). |
| `useSysTables`           | boolean | Enable sys table queries for schema and metadata.        |
| `queryTimeoutSeconds`    | integer | Query timeout in seconds. Default: `30`.                 |
| `enableSecureSocksProxy` | boolean | Route connections through the secure socks proxy.        |

**`secureJsonData` fields:**

Expand table

| Key                 | Type   | Description          |
|---------------------|--------|----------------------|
| `basicAuthPassword` | string | ServiceNow password. |
| `oauthClientSecret` | string | OAuth Client Secret. |

> Note
>
> Older versions of the plugin used `oauthEnabled: true` in `jsonData` instead of `authMethod: serviceNowOAuth`. This configuration is still supported but deprecated. Use `authMethod` instead.
