---
title: "Configure the Snowflake data source | Grafana Enterprise Plugins documentation"
description: "Learn how to configure the Snowflake data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Snowflake data source

This document explains how to configure the Snowflake data source in Grafana.

## Before you begin

You must install the Snowflake plugin before configuring the data source. Refer to [Install a plugin](/docs/grafana/latest/administration/plugin-management/#install-a-plugin) for instructions on how to add the plugin. For general information on adding and managing plugins, refer to [Plugin management](/docs/grafana/latest/administration/plugin-management/). Grafana recommends keeping your plugin up to date to access all current features.

Before configuring the data source, ensure you have:

- **Grafana permissions:** Organization administrator role.
- **Snowflake user:** A [Snowflake user](https://docs.snowflake.com/en/sql-reference/sql/create-user.html) with the appropriate [role](https://docs.snowflake.com/en/sql-reference/sql/grant-role.html) granted.

  - This data source does not require a specific role.
  - The Snowflake user’s role is what allows that user to access tables. To query your data, ensure your user has the appropriate roles.
- **Grafana license:** One of the following:
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Add the data source

For general information on adding a data source, refer to [Add a data source](/docs/grafana/latest/datasources/add-a-data-source/).

To add the Snowflake data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Snowflake` in the search bar.
4. Select the Snowflake data source.
5. Click **Add new data source** in the upper right.

Grafana takes you to the **Settings** tab, where you will set up your Snowflake configuration.

## Configure Snowflake

Configuring the Snowflake data source requires a Snowflake user with a username and a password.

Grafana recommends creating a new user with limited permissions for this data source.

### Create a user

To connect to Snowflake, you must create a user or authenticate using an existing one. This user runs all queries sent from Grafana.

If you want separate users to run different queries or workloads, create multiple Snowflake data sources with different settings.

To create a user in Snowflake, log in to your Snowflake instance and run the [CREATE USER](https://docs.snowflake.com/en/sql-reference/sql/create-user.html) command.

### Grant a role

After the Snowflake user is created, you must grant a role using the [GRANT ROLE](https://docs.snowflake.com/en/sql-reference/sql/grant-role.html) command. Granting a role to a user allows the user to perform operations allowed by that role.

This role defines what warehouses and tables the user has access to.

### Get account details from Snowflake

If you already have a working Snowflake account, you can get the information needed to connect to Snowflake from your dashboard by going to the lower-left corner under your account name and clicking **View account details**. From there you can grab the Account name, Region, and Username to be used in the data source configuration.

## Configuration options

These connection settings are the same that are used when [connecting via SnowSQL](https://docs.snowflake.com/en/user-guide/getting-started-tutorial-log-in.html).

The following table describes the available configuration options:

Expand table

| Field                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**                   | A name for this particular Snowflake data source.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Account**                | The name of the Snowflake account assigned by Snowflake. In the URL received from Snowflake after the account was provisioned, the account name is the *entire* string to the left of `snowflakecomputing.com`. If the Snowflake instance is not on `us-west-2`, then the region must be included in the account name. Example: `xyz123.us-east-1`. If the Snowflake instance is not on Amazon Web Services, then the platform must also be included in the account name. Example: `xyz123.us-east-1.gcp`. |
| **Region**                 | **Deprecated in favor of Account**. Region specifies the region where the Snowflake instance lives.                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Username**               | The username of the account that will query Snowflake.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Authentication Type**    | Authentication type. One of: password, key pair, OAuth, or programmatic access token (PAT).                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Password**               | The password of the account that will query Snowflake.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Private Key**            | The RSA private key for Key Pair authentication. Accepts both unencrypted and encrypted keys.                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Private Key Passphrase** | The passphrase used to decrypt an encrypted private key. Leave empty if your private key is unencrypted.                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Token**                  | The programmatic access token secret used when PAT authentication is selected.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Role**                   | This option allows users to connect to the Snowflake instance using a role that is not the default for the user. The role must still be granted to the user using the [`GRANT ROLE`](https://docs.snowflake.com/en/sql-reference/sql/grant-role.html) command.                                                                                                                                                                                                                                             |
| **Warehouse**              | The warehouse to use by default for queries.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Database**               | The database to use by default for queries.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Schema**                 | The schema to use by default for queries.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **TimeInterval**           | Optional. The lower limit for the `$__interval` and `$__interval_ms` macros. Default: `10s`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Default Query**          | Optional. Default query to be used when adding a new Snowflake query to the panel.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Default Variable Query** | Optional. Default query to be used when adding a new Snowflake query to the dashboard variable.                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Row Limit**              | Optional. Limits the maximum number of rows read from query results (applied by the plugin, not in the database). If unset, falls back to environment variable `GF_DATAPROXY_ROW_LIMIT`, or unlimited if not set.                                                                                                                                                                                                                                                                                          |

## Authentication

The Snowflake data source supports the following authentication methods.

### Password authentication

Password authentication uses a username and password to authenticate with Snowflake.

1. Set **Authentication Type** to **Password**.
2. Enter the **Username** and **Password** for your Snowflake account.
3. Click **Save &amp; test** to verify the connection.

### Key Pair authentication

For enhanced security, Key Pair authentication can be used as an alternative to password authentication. Both unencrypted and passphrase-protected encrypted private keys are supported.

To configure Key Pair authentication:

1. Generate the public and private keys by following the [Snowflake Key Pair authentication documentation](https://docs.snowflake.com/en/user-guide/key-pair-auth.html).
2. Update the `rsa_public_key` in Snowflake for your user.
3. In Grafana, set **Authentication Type** to **Key Pair**.
4. Enter the **Username**.
5. Paste the full contents of your private key file into the **Private Key** field.
6. If your private key is encrypted, enter the passphrase you used when generating it in the **Private Key Passphrase** field. Leave this field empty for unencrypted keys.
7. Click **Save &amp; test** to verify the connection.

### OAuth authentication

You can use OAuth authentication to pass through tokens to Snowflake on behalf of the user logged into Grafana.

The following instructions use Azure AD as the OAuth provider:

1. Use Azure AD to [set up OAuth](/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/azuread/).
2. Follow [these instructions](https://community.snowflake.com/s/article/External-oAuth-Token-Generation-using-Azure-AD) to update the application you created in step 1, and add a client application for Snowflake.
3. Update the *scopes* you created in step 1 in your `grafana.ini` file. Add the API you created in step 2. The scopes should look something like:

   ini [Copy code to clipboard] Copy

   ```ini
   scopes = api://8c1a0b1c-6bb0-4190-a730-8a1c34237619/session:role-any openid email profile offline_access
   ```
4. Restart Grafana and log in with Azure AD.
5. Create a Snowflake data source using Authentication Type: **OAuth** and toggle **Forward OAuth Identity**.
6. Click **Save &amp; test** to confirm the token is being passed through and is valid.

#### Troubleshoot OAuth token errors

If you get an invalid token error, step 2 instructions provide ways to validate the token which will provide additional information on why it is invalid:

SQL [Copy code to clipboard] Copy

```sql
select system$verify_external_oauth_token('<ACCESS_TOKEN>');
```

#### Additional OAuth resources

For more information about OAuth authentication with Snowflake, refer to the following resources:

- [Azure OAuth - On behalf of user flow](https://docs.snowflake.com/en/user-guide/oauth-azure)
- [Testing with Postman](https://community.snowflake.com/s/article/How-To-Configure-Postman-for-testing-SQL-API-with-OAuth)
- [Set up a Snowflake security integration](https://community.snowflake.com/s/article/Create-Security-Integration-User-To-Use-With-OAuth-Client-Token-With-Azure-AD)

### Programmatic Access Token (PAT) authentication

Programmatic Access Tokens (PATs) are user-level tokens you can generate directly in Snowflake and use in place of a password. They are useful for service accounts and automated workflows where OAuth is not available.

To configure PAT authentication:

1. Generate a programmatic access token by following the [Snowflake programmatic access tokens documentation](https://docs.snowflake.com/en/user-guide/programmatic-access-tokens).
2. In Grafana, set **Authentication Type** to **Programmatic Access Token**.
3. Enter the **Username** for your Snowflake account.
4. Paste your token in the **Token** field.
5. Click **Save &amp; test** to verify the connection.

## Verify the connection

Click **Save &amp; test** to verify the connection. If successful, you should see the following message:

**Data source is working.**

If you don’t see this message, refer to the [Troubleshooting](/docs/plugins/grafana-snowflake-datasource/latest/troubleshooting/) guide for help.

## Provision the data source

You can define the data source in YAML files as part of Grafana’s provisioning system. For more information, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

### Provisioning example

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Snowflake
    type: grafana-snowflake-datasource
    access: proxy
    basicAuth: false
    editable: true
    enabled: true
    jsonData:
      account: xyz123.east-us-2.azure
      username: grafana-user
      authType: password
      timeInterval: 10s
      defaultQuery: SELECT $__timeGroup(<time_column>, $__interval) as time, <value_column> FROM <metric_table> WHERE $__timeFilter(time)
      defaultVariableQuery: SELECT DISTINCT <column_name> FROM <metric_table> LIMIT 1000
      defaultInterpolation: ''
    secureJsonData:
      password: <YOUR_PASSWORD>
```

### Provisioning example with ACCOUNTADMIN role

For the Billing dashboard, you need a data source with the `ACCOUNTADMIN` role:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Snowflake Billing Data
    type: grafana-snowflake-datasource
    access: proxy
    basicAuth: false
    editable: true
    enabled: true
    jsonData:
      account: xyz123.us-east1.gcp
      username: grafana-admin-user
      database: snowflake
      role: ACCOUNTADMIN
      authType: password
      timeInterval: 10s
      defaultQuery: SELECT $__timeGroup(<time_column>, $__interval) as time, <value_column> FROM <metric_table> WHERE $__timeFilter(time)
      defaultVariableQuery: SELECT DISTINCT <column_name> FROM <metric_table> LIMIT 1000
      defaultInterpolation: sqlstring
    secureJsonData:
      password: <YOUR_PASSWORD>
```

Replace `<YOUR_PASSWORD>` with your actual Snowflake password.

### Provisioning example with encrypted Key Pair authentication

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Snowflake Key Pair Encrypted
    type: grafana-snowflake-datasource
    access: proxy
    basicAuth: false
    editable: true
    enabled: true
    jsonData:
      account: xyz123.us-east1.gcp
      username: grafana-user
      authType: keypair
      timeInterval: 10s
    secureJsonData:
      privateKey: |
        -----BEGIN ENCRYPTED PRIVATE KEY-----
        <YOUR_ENCRYPTED_PRIVATE_KEY>
        -----END ENCRYPTED PRIVATE KEY-----
      privateKeyPassphrase: <YOUR_PASSPHRASE>
```

### Provisioning example with Programmatic Access Token (PAT) authentication

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Snowflake
    type: grafana-snowflake-datasource
    access: proxy
    basicAuth: false
    editable: true
    enabled: true
    jsonData:
      account: xyz123.east-us-2.azure
      username: grafana-user
      authType: pat
      timeInterval: 10s
    secureJsonData:
      patToken: <YOUR_PAT_TOKEN>
```

Replace `<YOUR_PAT_TOKEN>` with your Snowflake programmatic access token.

## Use Terraform to provision the data source

You can automate the configuration of the Snowflake data source in Grafana using Terraform with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs).

### Basic Terraform example

terraform [Copy code to clipboard] Copy

```terraform
terraform {
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 2.0"
    }
  }
}

provider "grafana" {
  url  = var.grafana_url
  auth = var.grafana_auth
}

variable "grafana_url" {
  description = "Grafana instance URL"
  type        = string
  default     = "http://localhost:3000"
}

variable "grafana_auth" {
  description = "Grafana API key or service account token"
  type        = string
  sensitive   = true
}

variable "snowflake_account" {
  description = "Snowflake account identifier (e.g., xyz123.us-east-1)"
  type        = string
}

variable "snowflake_username" {
  description = "Snowflake username"
  type        = string
}

variable "snowflake_password" {
  description = "Snowflake password"
  type        = string
  sensitive   = true
}

variable "snowflake_warehouse" {
  description = "Snowflake warehouse name"
  type        = string
}

variable "snowflake_database" {
  description = "Snowflake database name"
  type        = string
}

resource "grafana_data_source" "snowflake" {
  name = "Snowflake"
  type = "grafana-snowflake-datasource"

  json_data_encoded = jsonencode({
    account      = var.snowflake_account
    username     = var.snowflake_username
    authType     = "password"
    warehouse    = var.snowflake_warehouse
    database     = var.snowflake_database
    timeInterval = "10s"
  })

  secure_json_data_encoded = jsonencode({
    password = var.snowflake_password
  })

  is_default = false
}

output "datasource_id" {
  description = "The ID of the created Snowflake data source"
  value       = grafana_data_source.snowflake.id
}

output "datasource_uid" {
  description = "The UID of the created Snowflake data source"
  value       = grafana_data_source.snowflake.uid
}
```

### Terraform example with Key Pair authentication

terraform [Copy code to clipboard] Copy

```terraform
variable "snowflake_private_key" {
  description = "Snowflake private key (unencrypted)"
  type        = string
  sensitive   = true
}

resource "grafana_data_source" "snowflake_keypair" {
  name = "Snowflake"
  type = "grafana-snowflake-datasource"

  json_data_encoded = jsonencode({
    account      = var.snowflake_account
    username     = var.snowflake_username
    authType     = "keypair"
    warehouse    = var.snowflake_warehouse
    database     = var.snowflake_database
    timeInterval = "10s"
  })

  secure_json_data_encoded = jsonencode({
    privateKey = var.snowflake_private_key
  })

  is_default = false
}
```

### Deploy the configuration

1. Create a `terraform.tfvars` file with your specific values:

   hcl [Copy code to clipboard] Copy

   ```hcl
   grafana_url         = "https://your-grafana.com"
   grafana_auth        = "your-api-key"
   snowflake_account   = "xyz123.us-east-1"
   snowflake_username  = "grafana-user"
   snowflake_password  = "your-password"
   snowflake_warehouse = "COMPUTE_WH"
   snowflake_database  = "your_database"
   ```
2. Initialize and apply the configuration:

   Bash [Copy code to clipboard] Copy

   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

The configuration uses the Grafana Terraform provider to create the data source with secure storage of credentials. You can adjust the `is_default` setting to `true` if you want this to be your default data source in Grafana.
