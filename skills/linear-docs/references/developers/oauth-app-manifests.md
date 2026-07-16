# OAuth application manifests

OAuth app manifests let developers define a Linear OAuth app as structured data instead of filling the form manually. This is useful for hosted platforms that want a reproducible setup flow, and for self-hosted or open-source projects that want to link to a pre-populated app configuration.

Linear supports two equivalent formats:

* URL parameters for pre-populating the **Create OAuth app** page
* JSON manifest format for storing, validating, and sharing the same configuration

Use URL parameters when you want to send someone directly to a pre-filled app setup page. Use the JSON manifest format when you want to store the configuration in a file, validate it locally, or generate it programmatically.

## Pre-populated OAuth application with URL parameters

Create a pre-populated OAuth application by adding allowed URL parameters to the workspace+agnostic version of the OAuth application creation form:

[https://linear.app/settings/api/applications/new](https://linear.app/settings/api/applications/new?distribution=public &display.description=Adds+Linear+issue+creation+to+Acme+Agent &display.iconUrl=https%3A%2F%2Facme.dev%2Flinear-agent-icon.png &developer.name=Acme&oauth.client_name=Acme+Agent &oauth.client_uri=https%3A%2F%2Facme.dev%2Flinear &oauth.redirect_uris=https%3A%2F%2Facme.dev%2Fapi%2Flinear%2Fcallback&oauth.redirect_uris=https%3A%2F%2Facme.dev%2Fapi%2Flinear%2Fcallback &oauth.grant_types=authorization_code &oauth.grant_types=client_credentials &webhook.enabled=true &webhook.url=https%3A%2F%2Facme.dev%2Fapi%2Flinear%2Fwebhook &webhook.resourceTypes=Issue&webhook.resourceTypes=Comment&webhook.resourceTypes=OAuthAuthorization)

Example:

```md
https://linear.app/settings/api/applications/new?distribution=public &display.description=Adds+Linear+issue+creation+to+Acme+Agent&display.iconUrl=https%3A%2F%2Facme.dev%2Flinear-agent-icon.png&developer.name=Acme&oauth.client_name=Acme+Agent&oauth.client_uri=https%3A%2F%2Facme.dev%2Flinear&oauth.redirect_uris=https%3A%2F%2Facme.dev%2Fapi%2Flinear%2Fcallback&oauth.redirect_uris=https%3A%2F%2Facme.dev%2Fapi%2Flinear%2Fcallback&oauth.grant_types=authorization_code&oauth.grant_types=client_credentials&webhook.enabled=true&webhook.url=https%3A%2F%2Facme.dev%2Fapi%2Flinear%2Fwebhook&webhook.resourceTypes=Issue&webhook.resourceTypes=Comment&webhook.resourceTypes=OAuthAuthorization
```

### Supported parameters

#### `distribution`

Whether the app should be available only in the current workspace or installable by other workspaces.

* Allowed values: `private`, `public`
* Default: `private`

#### `display.description`

A short user-facing description of the application.

* Max length: 1000 characters

#### `display.iconUrl`

An HTTP or HTTPS URL for the application icon shown during authorization and in settings.

* Format: absolute URL
* Recommendation: use an image at least 256×256px

#### `developer.name`

The person or company responsible for the application.

* Required for a complete setup
* Min length: 2
* Max length: 80

#### `oauth.client_name`

The user-visible name of the OAuth app.

* Required for a complete setup
* Min length: 2
* Max length: 80
* Must not contain `Linear`
* Must not contain `http://` or `https://`

#### `oauth.client_uri`

The homepage or documentation URL for the application.

* Format: absolute HTTP or HTTPS URL
* Required for a complete setup

#### `oauth.redirect_uris`

A redirect URI registered for the OAuth app. Repeat this parameter to provide multiple values.

* Format: absolute HTTP or HTTPS URL
* Required for a complete setup
* Repeatable: yes
* Minimum items: 1
* Maximum items: 32
* Values must be unique

Example:

```md
oauth.redirect_uris=https://acme.dev/api/linear/callback oauth.redirect_uris=https://acme.dev/api/linear/callback/preview
```

#### `oauth.grant_types`

The OAuth grant types the app supports. Repeat this parameter to provide multiple values.

* Allowed values: `authorization_code`, `client_credentials`
* Repeatable: yes
* `authorization_code` is always required
* Default when omitted in the manifest format: `authorization_code`

Example:

oauth.grant_types=authorization_code oauth.grant_types=client_credentials

#### `webhook.enabled`

Whether webhook delivery is enabled for the app.

* Allowed values: `true`, `false`
* Default: enabled when a manifest webhook block is present

#### `webhook.url`

The HTTPS endpoint that receives webhook events.

* Format: absolute HTTPS URL
* Must use `https://`
* The host must not be a loopback host, private-network host, or `linear.app`

#### `webhook.resourceTypes`

The resource types the webhook should subscribe to. Repeat this parameter to provide multiple values.

* Repeatable: yes
* Minimum items: 1 when `webhook.url` is set
* Values must be unique

Supported values:

* `AgentSessionEvent`
* `AppUserNotification`
* `Attachment`
* `Comment`
* `Customer`
* `CustomerNeed`
* `Cycle`
* `Document`
* `Initiative`
* `InitiativeUpdate`
* `Issue`
* `IssueLabel`
* `IssueSLA`
* `OAuthAuthorization`
* `PermissionChange`
* `Project`
* `ProjectLabel`
* `ProjectUpdate`
* `Reaction`
* `Release`
* `ReleaseNote`
* `User`

Example:

```md
webhook.resourceTypes=Issue webhook.resourceTypes=Comment webhook.resourceTypes=OAuthAuthorization
```

### Notes

* Repeated query parameters are used for array values such as `oauth.redirect_uris`, `oauth.grant_types`, and `webhook.resourceTypes`.
* Unsupported query parameters are ignored.
* If both dot-notation parameters and a `manifest` query parameter are provided, the JSON manifest takes precedence.

## JSON manifest format

The JSON manifest format is the canonical, versioned representation of the same OAuth app configuration.

### Example manifest

```md
{ "$schema": "https://linear.app/.well-known/oauth-app-manifest.schema.json", "schemaVersion": "1.0.0", "distribution": "public", "display": { "description": "Adds Linear issue creation to Acme Agent.", "iconUrl": "https://acme.dev/linear-agent-icon.png" }, "developer": { "name": "Acme" }, "oauth": { "client_name": "Acme Agent", "client_uri": "https://acme.dev/linear", "redirect_uris": [ "https://acme.dev/api/linear/callback", "https://acme.dev/api/linear/callback/preview" ], "grant_types": [ "authorization_code" ] }, "webhook": { "enabled": true, "url": "https://acme.dev/api/linear/webhook", "resourceTypes": [ "Issue", "Comment", "OAuthAuthorization" ] } }
```

The published JSON Schema is available at:

[https://linear.app/.well-known/oauth-app-manifest.schema.json](https://linear.app/.well-known/oauth-app-manifest.schema.json)

Developers can reference it from the `$schema` field so editors and CI tooling can validate the manifest locally.

### Top-level fields

#### `$schema`

Optional schema URL for editor and tooling support.

* Type: `string`
* Value: `https://linear.app/.well-known/oauth-app-manifest.schema.json`

#### `schemaVersion`

The version of the OAuth app manifest format.

* Type: `string`
* Required: yes
* Current value: `1.0.0`

#### `distribution`

Whether the application is private to one workspace or publicly installable.

* Type: `string`
* Allowed values: `private`, `public`
* Default: `private`

#### `display`

Optional display metadata shown during authorization, installation, and settings.

`display.description`

* Type: `string`
* Max length: 1000 characters

`display.iconUrl`

* Type: `string`
* Format: absolute HTTP or HTTPS URL

#### `developer`

Public information about the app developer.

`developer.name`

* Type: `string`
* Required: yes
* Min length: 2
* Max length: 80

#### `oauth`

OAuth configuration for the app.

`oauth.client_name`

* Type: `string`
* Required: yes
* Min length: 2
* Max length: 80
* Must not contain `Linear`
* Must not contain `http://` or `https://`

`oauth.client_uri`

* Type: `string`
* Required: yes
* Format: absolute HTTP or HTTPS URL

`oauth.redirect_uris`

* Type: `string[]`
* Required: yes
* Minimum items: 1
* Maximum items: 32
* Values must be unique

`oauth.grant_types`

* Type: `string[]`
* Allowed values: `authorization_code`, `client_credentials`
* Minimum items: 1
* Values must be unique
* Must include `authorization_code`
* Default: `authorization_code`

#### `webhook`

Optional webhook configuration for the OAuth app.

`webhook.url`

* Type: `string`
* Required when `webhook` is provided
* Format: absolute HTTPS URL
* Must use `https://`

`webhook.enabled`

* Type: `boolean`
* Default: `true`

`webhook.resourceTypes`

* Type: `string[]`
* Required when `webhook` is provided
* Minimum items: 1
* Values must be unique

## Passing a manifest in the URL

A JSON manifest can be passed to the create page through a single `manifest` query parameter.

### Example

```md
https://linear.app/settings/api/applications/new?manifest=%7B%22schemaVersion%22%3A%221.0.0%22%2C%22developer%22%3A%7B%22name%22%3A%22Acme%22%7D%2C%22oauth%22%3A%7B%22client_name%22%3A%22Acme%20Agent%22%2C%22client_uri%22%3A%22https%3A%2F%2Facme.dev%2Flinear%22%2C%22redirect_uris%22%3A%5B%22https%3A%2F%2Facme.dev%2Fapi%2Flinear%2Fcallback%22%5D%7D%7D
```

This is useful when the configuration already exists as JSON and you want to open the app creation page with that manifest applied directly.
