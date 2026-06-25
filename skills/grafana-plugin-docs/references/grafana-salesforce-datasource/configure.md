---
title: "Configure the Salesforce data source | Grafana Enterprise Plugins documentation"
description: "Learn how to configure the Salesforce data source for Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure the Salesforce data source

This document explains configuration options for Salesforce data source in Grafana.

## Before you begin

Before you can configure the Salesforce data source, ensure you have the following:

- The Salesforce data source plugin installed. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).
- A [Salesforce](https://www.salesforce.com/) account.
- A Salesforce app configured with OAuth settings. Choose one of the following:

  - **New setups (recommended)**: An [External Client App](https://help.salesforce.com/s/articleView?id=sf.connected_app_overview.htm&type=5) with JWT authentication (refer to [External Client App settings](#external-client-app-settings)).
  - **Existing setups**: A [Connected App](https://help.salesforce.com/s/articleView?id=sf.connected_app_overview.htm&type=5) configured with OAuth settings (refer to [Connected App settings](#connected-app-settings)).
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated Grafana Enterprise license](/docs/grafana/latest/administration/enterprise-licensing/).
- Grafana version 9.5.13 or later.
- The `Organization Administrator` role in Grafana to add data sources.

## Salesforce app configuration

Grafana supports two authentication methods with the Salesforce data source: **Credentials** or **JWT**.

Before configuring the Salesforce data source, you must set up an app in Salesforce to enable OAuth authentication. Salesforce offers two app types: **External Client Apps (ECAs)** and **Connected Apps**.

> Warning
>
> **Salesforce Spring ‘26 change**: Starting with the Spring ‘26 release, Salesforce disabled the creation of new Connected Apps by default. New users should create an [External Client App](#external-client-app-settings) instead. Existing Connected Apps continue to work normally.
>
> For more information, refer to Salesforce’s [Connected App to External Client App Migration](https://help.salesforce.com/s/articleView?id=sf.connected_app_to_eca_migration.htm&type=5) guide.

## External Client App settings

External Client Apps (ECAs) are Salesforce’s recommended approach for new integrations. ECAs support JWT-based authentication, which is the recommended authentication method for the Grafana Salesforce data source.

To create an External Client App for JWT authentication:

1. In Salesforce Setup, search for **App Manager** and select it.
2. Click **New External Client App**.
3. Enter a name and contact email for your app.
4. Under **OAuth Settings**, configure the following:

   - **Enable OAuth Settings**: Select this option.
   - **Callback URL**: Enter `sfdc://oauth/jwt/success`.
   - **Use Digital Signatures**: Select this option and upload your public certificate file (.crt). To generate a certificate, refer to [Generate a Self-Signed Certificate](https://help.salesforce.com/s/articleView?id=sf.security_keys_creating.htm&type=5).
   - **Selected OAuth Scopes**: Add the following scopes:

     - Access and manage your data (api)
     - Perform requests on your behalf at any time (refresh\_token, offline\_access)
5. Save the app.
6. After saving, navigate to the app’s **OAuth Settings** to obtain the **Consumer Key**.

### Configure user access for JWT

After creating the External Client App, configure user access:

1. In Salesforce Setup, search for **Permission Sets** and create a new permission set for JWT access.
2. In the permission set, click **Assigned Connected Apps** and add your External Client App.
3. Assign the permission set to the Salesforce user that Grafana will use for authentication.
4. In **App Manager**, find your app and click **Manage**.
5. Under **OAuth Policies**, set **Permitted Users** to **Admin approved users are pre-authorized**.

For more information, refer to Salesforce’s [Configure OAuth JWT Flow for External Client Apps](https://help.salesforce.com/s/articleView?id=sf.configure_oauth_jwt_flow_external_client_apps.htm&type=5).

## Connected App settings

> Note
>
> Connected Apps are a legacy option. If you are setting up a new integration, Salesforce recommends using [External Client Apps](#external-client-app-settings) instead. As of Spring ‘26, creating new Connected Apps requires a request to Salesforce Support.

If you have an existing Connected App or have requested the ability to create one from Salesforce Support, configure the following settings.

### Credentials-based Connected App settings

> Note
>
> Credentials-based authentication uses the [OAuth 2.0 Username-Password Flow](https://help.salesforce.com/articleView?id=sf.remoteaccess_oauth_username_password_flow.htm&type=5), which requires a Connected App. This flow is not available with External Client Apps. For new setups, use [JWT-based authentication](#jwt-based-connected-app-settings) instead.

If you are using the Credentials authentication method with an existing Connected App, you must set the following:

- **Enable OAuth settings**: Select this option to enable OAuth.
- **Callback URL**: Required in Salesforce but not used by the Grafana Salesforce plugin. You can use any valid URL.
- **Selected OAuth Scopes (minimum requirements)**: Select the following scope:

  - Access and manage your data (api)
- **Require Secret for Refresh Token Flow**: Can be enabled or disabled.

### JWT-based Connected App settings

If you use JWT authentication with an existing Connected App, you must set the following:

- **Enable OAuth settings**: Select this option to enable OAuth.
- **Callback URL**: Enter `sfdc://oauth/jwt/success`.
- **Use digital signatures**: Select this option and upload the digital certificate.
- **Selected OAuth Scopes (minimum requirements)**: Select the following scopes:

  - Access and manage your data (api)
  - Perform requests on your behalf at any time (refresh\_token, offline\_access)
- **Require Secret for Refresh Token Flow**: Can be enabled or disabled.

For new setups, refer to [External Client App settings](#external-client-app-settings) for the recommended approach using External Client Apps.

## Add the Salesforce data source

For general information on installing and managing plugins and data sources in Grafana refer to the following documents:

- [Install Grafana plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-plugins)
- [Plugin management](/docs/grafana/latest/administration/plugin-management/)
- [Data source management](/docs/grafana/latest/administration/data-source-management/#data-source-management)

To install the Salesforce data source plugin, refer to Grafana’s [Salesforce installation page](/grafana/plugins/grafana-salesforce-datasource/?tab=installation).

> Note
>
> You must install the Salesforce data source plugin prior to adding and configuring the Salesforce data source. The plugin connects you to the data source.

Once you have installed the Salesforce plugin, complete the following steps to add the Salesforce data source:

1. Click **Connections** in the left-side menu.
2. Enter `Salesforce` in the search bar.
3. Select the **Salesforce data source** tile.
4. Click **Add new data source** in the upper right.
5. You are taken to the **Settings** tab where you will set up your Salesforce configuration.

## Salesforce configuration options

Following is a list of configuration options for Salesforce.

The first option is to give the connection a name:

- **Name** - The name for your data source. This is how you refer to the data source in queries and panels. Examples: Salesforce\_Sales\_Prod1, SF-Prod-East1.
- **Default** - Toggle to select the default name in dashboard panels. This will set it as the default data source when you access a dashboard panel.

### Connection settings

Grafana supports two authentication methods with the Salesforce data source: **Credentials** or **JWT**.

#### Credentials-based authentication

> Note
>
> Credentials-based authentication requires a Connected App. As of Salesforce Spring ‘26, creating new Connected Apps requires a request to Salesforce Support. For new setups, use [JWT-based authentication](#jwt-based-authentication) with an External Client App instead.

Following are configuration options for Credentials-based authentication:

- **User name**: The user name for the Salesforce account used to connect to Salesforce. Examples: `salesforce_admin@abccompany.com`.
- **Password**: The password used to connect to Salesforce.
- **Security token**: Add the [security token](https://help.salesforce.com/s/articleView?id=xcloud.user_security_token.htm&type=5).
- **Consumer key**: The consumer key used to connect to Salesforce. You obtain this from your Connected App.
- **Consumer secret**: The consumer secret used to connect to Salesforce. You obtain this from your Connected App.

#### JWT-based authentication

JWT-based authentication is the recommended method for new setups and works with both External Client Apps and Connected Apps.

- For External Client Apps, refer to [External Client App settings](#external-client-app-settings).
- For Connected Apps, refer to Salesforce’s [Configure a Connected App to Issue JWT-Based Access Tokens](https://help.salesforce.com/s/articleView?id=sf.jwt_connectedapp_enable.htm&type=5).

Add the following under **Digital Signature**:

- **Certificate**: The certificate that is used as the digital signature in your Salesforce app. To generate a certificate, refer to [Generate a Certificate Signed by a Certificate Authority](https://help.salesforce.com/s/articleView?id=sf.security_keys_uploading_signed_cert.htm&type=5). To generate a self-signed certificate, refer to [Generate a Self-Signed Certificate](https://help.salesforce.com/s/articleView?id=sf.security_keys_creating.htm&type=5).
- **Private key**: Add the private key for the certificate.

Add the following under **App Credentials**:

- **User name**: The user name for the Salesforce account used to connect to Salesforce. Examples: `salesforce_admin@abccompany.com`.
- **Consumer key**: The consumer key used to connect to Salesforce. You obtain this from your External Client App or Connected App.

### Optional settings

- **Environment** - Click the drop-down to select your environment.
- **Private data source connect** - ***Only for Grafana Cloud users.*** Private data source connect, or PDC, allows you to establish a private, secured connection between a Grafana Cloud instance, or stack, and data sources secured within a private network. Click the drop-down to locate the URL for PDC. For more information regarding Grafana PDC refer to [Private data source connect (PDC)](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/).

Once you have added your connection settings, click **Test** to test the data source connection.

## Configure the data source with provisioning

Configure the Salesforce data source using Grafana’s provisioning system by defining settings in YAML files. For details on the provisioning system and configuration options, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#datasources).

The following example is for provisioning the Salesforce data source:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Salesforce - user password authentication
    type: grafana-salesforce-datasource
    jsonData:
      authType: user
      user: user name
    secureJsonData:
      password: password
      securityToken: securityToken
      clientID: consumer key
      clientSecret: consumer secret
  - name: Salesforce - jwt authentication
    type: grafana-salesforce-datasource
    jsonData:
      authType: jwt
      user: user name
    secureJsonData:
      clientID: consumer key
      cert: |
        -----BEGIN CERTIFICATE-----
        xxxxxxxxxxxxxxxxxxxxxxxxxxx
        -----END CERTIFICATE-----
      privateKey: |
        -----BEGIN PRIVATE KEY-----
        xxxxxxxxxxxxxxxxxxxxxxxxxxx
        -----END PRIVATE KEY-----
```

To provision a sandbox environment, update the `jsonData` setting with the sandbox property:

YAML [Copy code to clipboard] Copy

```yaml
jsonData:
  sandbox: true
```

## Configure the data source with Terraform

You can configure the Salesforce data source as code using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs). This approach enables version-controlled, reproducible data source configurations across environments.

The following examples demonstrate configurations for Credentials-based and JWT-based authentication.

### Credentials-based authentication

terraform [Copy code to clipboard] Copy

```terraform
terraform {
  required_providers {
    grafana = {
      source  = "grafana/grafana"
      version = "~> 3.0"
    }
  }
}

provider "grafana" {
  url  = var.grafana_url
  auth = var.grafana_auth
}

resource "grafana_data_source" "salesforce_credentials" {
  type = "grafana-salesforce-datasource"
  name = "Salesforce"

  json_data_encoded = jsonencode({
    authType = "user"
    user     = var.salesforce_username
  })

  secure_json_data_encoded = jsonencode({
    password      = var.salesforce_password
    securityToken = var.salesforce_security_token
    clientID      = var.salesforce_consumer_key
    clientSecret  = var.salesforce_consumer_secret
  })
}
```

### JWT-based authentication

terraform [Copy code to clipboard] Copy

```terraform
resource "grafana_data_source" "salesforce_jwt" {
  type = "grafana-salesforce-datasource"
  name = "Salesforce JWT"

  json_data_encoded = jsonencode({
    authType = "jwt"
    user     = var.salesforce_username
  })

  secure_json_data_encoded = jsonencode({
    clientID   = var.salesforce_consumer_key
    cert       = var.salesforce_certificate
    privateKey = var.salesforce_private_key
  })
}
```

### Sandbox environment

To configure a sandbox environment, add the `sandbox` property to `json_data_encoded`:

terraform [Copy code to clipboard] Copy

```terraform
resource "grafana_data_source" "salesforce_sandbox" {
  type = "grafana-salesforce-datasource"
  name = "Salesforce Sandbox"

  json_data_encoded = jsonencode({
    authType = "user"
    user     = var.salesforce_username
    sandbox  = true
  })

  secure_json_data_encoded = jsonencode({
    password      = var.salesforce_password
    securityToken = var.salesforce_security_token
    clientID      = var.salesforce_consumer_key
    clientSecret  = var.salesforce_consumer_secret
  })
}
```

For more information about the Grafana Terraform provider, refer to the [Grafana provider documentation](https://registry.terraform.io/providers/grafana/grafana/latest/docs).
