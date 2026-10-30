# Detected secrets

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

## Secret categories

GitLab Secret Detection identifies secrets using two approaches: rule-based detection and generic detection.

### Rule-based detection

Rule-based detection identifies secrets by matching scanned content against a known pattern for each
credential type, called a rule. For example, a GitLab personal access token is identified by the pattern
`glpat-` followed by a 20-character string. GitLab supports
[200+ rules](#supported-rules-for-rule-based-detection) covering popular vendors by default.

Rule-based detection's coverage is limited to the rules the analyzer supports.
Secrets that don't match a supported rule aren't detected. Both the Gitleaks-based analyzer
and [GitLab Secret Scanning for Source Code](gitlab_secret_scanner/_index.md)
support rule-based detection.

### Generic detection

- Tier: Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated
- Status: Beta

Rule-based detection can only find secrets that match a pattern it already knows about.
Many credentials don't follow a published or consistent format, so no rule can match them.
For example, a password for an internal service, a database connection string, or an API key
with no distinguishing prefix.
Generic detection targets these secrets.
Instead of matching a fixed pattern, generic detection examines the context around a value and the properties
of the value itself. Both signals determine whether the value is likely to be a credential.

Because generic detection doesn't depend on a known pattern, it can catch secrets that rule-based
detection misses. It's also more prone to false positives, so GitLab Secret Scanning for Source Code
includes false positive reduction to reduce noise.

GitLab Secret Scanning for Source Code is the only GitLab analyzer that supports generic detection.
For more information, see [generic secrets](gitlab_secret_scanner/_index.md#generic-secrets).

Generic detection isn't limited to an obvious `secret = "value"` assignment.
The following snippet shows less obvious values it identifies, and the finding each one produces:

```plaintext
# Secret assigned in a Perl hash, not a plain key-value pair
$config{'webhook_token'} = "Of0Pg2Qh4Ri6Sj8Tk";

# Password stored as the content of an XML element, not an attribute
<db_password>Ct8Du0Ev2Fw4Gx6Hy</db_password>

# API key passed as a URL query parameter
https://app.gitlab.com?api_key=Of3Pg5Qh7Ri9Sj1Tk

# Token embedded as a literal value in a SQL statement
INSERT INTO secrets (key, value) VALUES ('api_token', 'Kb1Lc3Md5Ne7Of9Pg');

# Password assigned through an environment variable lookup, not a plain variable
ENV["redis_pass"] = "Tt7Yy9Uu1Ii3OoPp5"

# Token passed as an argument to a setter method, not a direct assignment
config.put("dbToken", "Kb8Lc0Md2Ne4Of6Pg");

# Bearer token embedded in an XML configuration property
<property name="authorizationHeader" value="Bearer JWT_TOKEN_EXAMPLE"/>

# Secret passed as a CLI flag, not a variable assignment
curl "https://api.example.com/v1/deploy" --api-token=7bN2vLpQ9wXzKfM4

# Credential left behind in a comment
# old admin password was T3mpP@ssw0rd2023XyZ1, rotate before removing this line

# UUID-formatted secret
client_secret: 123e4567-e89b-12d3-a456-426614174000

# Secret disguised by Base64 encoding
auth_token = "c2VjcmV0LWFwaS1rZXktdmFsdWU="

# Secret disguised by hex encoding
signing_key = "4f3c2b1a9e8d7c6b5a4938271605f4e3d2c1b0a"
```

#### Generic secret findings

When a generic secret is found, GitLab labels the finding in the vulnerability report based on the type of value it detected:

- `Generic Password`: A human-defined password, such as a database password or a service password.
- `Generic Secret`: A machine-generated credential, such as an API key or access token, that doesn't match a known vendor format.
- `Generic UUID Secret`, `Generic Base64-Encoded Secret`, `Generic Base64URL-Encoded Secret`, `Generic Hex-Encoded Secret`, `Generic JWT Token`, and `Generic Paseto Token`: Machine-generated credentials that GitLab further classified by their format.

Each finding includes a description that explains why the value was flagged. The description provides
guidance on how to confirm whether the value is a real secret, rotate a confirmed secret, or
dismiss a false positive.

#### Secrets generic detection might miss

Generic detection identifies a secret from its surroundings, such as a keyword or the format of the value,
not from confirming what the value does. This approach has trade-offs. Even with false positive reduction in
place, some non-secret values can show up as findings. For example:

- A secret built through concatenation or string interpolation, such as `full_key = prefix + secret_suffix`.
- A secret with no recognizable keyword nearby, such as a hardcoded value with no label like `key`, `secret`, `token`, or `password` next to it.
- A secret in a file or path that generic detection excludes, such as a vendored dependency, a generated file, or documentation.
- A value that's shorter than the minimum length generic detection expects for that type of secret.
- A secret reported at medium or low confidence. By default, GitLab Secret Scanning for Source Code shows only high-confidence findings in the vulnerability report. To change this, see [confidence level](gitlab_secret_scanner/_index.md#confidence-level).

## Supported rules for rule-based detection

This table lists the rules used for rule-based detection.
Both the Gitleaks-based analyzer and GitLab Secret Scanning for Source Code analyzers use the same ruleset,
but a validity check might run only on findings from one analyzer.

For each rule, the table shows:

- Pipeline secret detection, client-side secret detection, and secret push protection:
  Whether that type of secret detection supports the rule.
- Validity check: Whether GitLab can check if a secret detected by the rule is active.
- Validity check analyzer: Which analyzer findings GitLab checks for validity:
  - `Both`: Findings from both analyzers.
  - `GitLab Secret Scanning for Source Code`: Findings from GitLab Secret Scanning for Source Code only.
  - `None`: The rule has no validity check.

For more information, see [validity checks](../vulnerabilities/validity_check.md).

Secret detection rules are updated in the [default ruleset](https://gitlab.com/gitlab-org/security-products/secret-detection/secret-detection-rules/-/tree/main).
Detected secrets with patterns that have been removed or updated remain open so you can triage them.

If you want to add a new secret detection rule, you can [propose new detection rules](pipeline/configure.md#propose-new-detection-rules) for all GitLab users, or [customize rulesets](pipeline/configure.md#customize-analyzer-rulesets) for your specific project.

| Description                                   | ID                                            | Pipeline secret detection | Client-side secret detection | Secret push protection | Validity check | Validity check analyzer                |
|:----------------------------------------------|:----------------------------------------------|:--------------------------|:-----------------------------|:-----------------------|:---------------|:---------------------------------------|
| Adafruit IO Key                               | AdafruitIOKey                                 | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Adobe Client ID (OAuth Web)                       | Adobe Client ID (Oauth Web)                   | Yes | No | No | No | None |
| Adobe client secret                               | Adobe Client Secret                           | Yes | No | Yes | No | None |
| Adobe IMS Access Token                            | AdobeIMSAccessToken                           | Yes | No | No | No | None |
| Age secret key                                    | Age secret key                                | Yes | No | No | No | None |
| Aiven Service Password                            | AivenServicePassword                          | Yes | No | Yes | No | None |
| Alibaba AccessKey ID                              | Alibaba AccessKey ID                          | Yes | No | No | No | None |
| Alibaba Secret Key                                | Alibaba Secret Key                            | Yes | No | No | No | None |
| Amazon OAuth Client ID                            | AmazonOAuthClientID                           | Yes | No | Yes | No | None |
| Anthropic API key                                 | anthropic_key                                 | Yes | Yes | Yes | Yes | GitLab Secret Scanning for Source Code |
| Artifactory API Key                               | ArtifactoryApiKey                             | Yes | No | Yes | No | None |
| Artifactory Identity Token                        | ArtifactoryIdentityToken                      | Yes | No | Yes | No | None |
| Asana client ID                                   | Asana Client ID                               | Yes | No | No | No | None |
| Asana client secret                               | Asana Client Secret                           | Yes | No | No | No | None |
| Asana Personal Access Token V1                   | AsanaPersonalAccessTokenV1                    | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Asana Personal Access Token V2                   | AsanaPersonalAccessTokenV2                    | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Atlassian API Key                                 | AtlassianApiKey                               | Yes | No | Yes | No | None |
| Atlassian API token                               | Atlassian API token                           | Yes | No | No | No | None |
| Atlassian User API Token                          | AtlassianUserApiToken                         | Yes | No | Yes | No | None |
| Auth0 Client Secret                               | Auth0ClientSecret                             | Yes | No | No | No | None |
| AWS Access Key ID                                 | AWS                                           | Yes | No | Yes | Yes | Both |
| AWS Access Secret Key                             | AWSSecretAccessKey                            | Yes | No | No | No | None |
| AWS Session Token                                 | AWSSessionToken                               | Yes | No | Yes | No | None |
| AWS Cognito Identity Pool ID                      | AWSCognitoIdentityPoolID                      | Yes | No | No | No | None |
| AWS Bedrock Key                                   | AWSBedrockKey                       | Yes | No | No | No | None |
| AWS Bedrock Short-lived Key                       | AWSBedrockShortLivedKey                       | Yes | No | Yes | No | None |
| Azure API Management Gateway Key                  | AzureAPIManagementGatewayKey                  | Yes | No | Yes | No | None |
| Azure API Management Direct Key                   | AzureAPIManagementDirectKey                   | Yes | No | No | No | None |
| Azure App Config                                  | AzureAppConfigConnectionString                        | Yes | No | Yes | No | None |
| Azure Communication Services                      | AzureCommServicesConnectionString                     | Yes | No | Yes | No | None |
| Azure Cosmos DB Credentials                       | AzureCosmosDBCredentials                   | Yes | No | No | No | None |
| Azure Entra Client Secret                         | AzureEntraClientSecret                        | Yes | No | Yes | No | None |
| Azure Entra Client ID Token                       | AzureEntraIDToken                          | Yes | No | Yes | No | None |
| Azure EventGrid Access Key                        | AzureEventGridAccessKey                       | Yes | No | No | No | None |
| Azure Functions API Key                           | AzureFunctionsAPIKey                          | Yes | No | Yes | No | None |
| Azure Logic App SAS                               | AzureLogicAppSAS                          | Yes | No | Yes | No | None |
| Azure OpenAI API Key                              | AzureOpenAIAPIKey                       | Yes | No | No | No | None |
| Azure Personal Access Token                       | AzurePersonalAccessToken                   | Yes | No | No | No | None |
| Azure SignalR Access Key                          | AzureSignalRAccessKey                          | Yes | No | Yes | No | None |
| Beamer API token                                  | Beamer API token                              | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| Bitbucket client ID                               | Bitbucket client ID                           | Yes | No | No | No | None |
| Bitbucket client secret                           | Bitbucket client secret                       | Yes | No | No | No | None |
| Brevo API token                                   | Sendinblue API token                          | Yes | No | Yes | No | None |
| Brevo SMTP token                                  | Sendinblue SMTP token                         | Yes | No | Yes | No | None |
| Canada Digital Service Notify API Key             | CDSCanadaNotifyAPIKey                         | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| CircleCI access token                             | CircleCI access tokens                        | Yes | No | Yes | No | None |
| Clojars deploy token                              | Clojars API token                             | Yes | No | No | No | None |
| Contentful delivery API token                     | Contentful delivery API token                 | Yes | No | No | No | None |
| Contentful personal access token                  | ContentfulPersonalAccessToken                 | Yes | No | Yes | No | None |
| Contentful preview API token                      | Contentful preview API token                  | Yes | No | No | No | None |
| Databricks API token                              | Databricks API token                          | Yes | No | No | No | None |
| DataDog API Key                                   | DataDogAPIKey                                 | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| DigitalOcean OAuth access token                   | digitalocean-access-token                     | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| DigitalOcean personal access token                | digitalocean-pat                              | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| DigitalOcean refresh token                        | digitalocean-refresh-token                    | Yes | No | No | No | None |
| Discord API key                                   | Discord API key                               | Yes | No | No | No | None |
| Discord client ID                                 | Discord client ID                             | Yes | No | No | No | None |
| Discord client secret                             | Discord client secret                         | Yes | No | No | No | None |
| Docker Personal Access Token                      | DockerPersonalAccessToken                     | Yes | No | Yes | No | None |
| Doppler API token                                 | Doppler API token                             | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Doppler Service token                             | Doppler Service token                         | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Dropbox API secret/key                            | Dropbox API secret/key                        | Yes | No | No | No | None |
| Dropbox App Access Token                          | DropboxAppAccessToken                         | Yes | No | Yes | No | None |
| Dropbox long lived API token                      | Dropbox long lived API token                  | Yes | No | No | No | None |
| Dropbox short lived API token                     | Dropbox short lived API token                 | Yes | No | Yes | No | None |
| Duffel API token                                  | Duffel API token                              | Yes | No | No | No | None |
| Dynatrace Platform Token                          | DynatracePlatformToken                        | Yes | No | No | No | None |
| EasyPost production API key                       | EasyPost API token                            | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| EasyPost test API key                             | EasyPost test API token                       | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| Facebook token                                    | Facebook token                                | Yes | No | No | No | None |
| Fastly API user or automation token               | Fastly API token                              | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| Figma Personal Access Token                       | FigmaPersonalAccessToken                      | Yes | No | Yes | No | None |
| Finicity API token                                | Finicity API token                            | Yes | No | No | No | None |
| Finicity client secret                            | Finicity client secret                        | Yes | No | No | No | None |
| Flutterwave Prod Encrypted Key                    | FlutterwaveProdEncryptedKey                   | Yes | No | Yes | No | None |
| Flutterwave test encrypted key                    | Flutterwave encrypted key                     | Yes | No | No | No | None |
| Flutterwave Prod Public Key                       | FlutterwaveProdPublicKey                      | Yes | No | Yes | No | None |
| Flutterwave test public key                       | Flutterwave public key                        | Yes | No | No | No | None |
| Flutterwave Prod Secret Key                       | FlutterwaveProdSecretKey                      | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Flutterwave test secret key                       | Flutterwave secret key                        | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| Frame.io API token                                | Frame.io API token                            | Yes | No | No | No | None |
| GCP API key or Google API key                     | GCP API key                                   | Yes | No | No | Yes | Both |
| GCP OAuth client secret                           | GCP OAuth client secret                       | Yes | No | Yes | No | None |
| GCP service account (Google)                      | Google (GCP) Service-account                  | Yes | No | Yes | No | None |
| GCP Vertex Express Mode Key                       | GCPVertexExpressModeKey                       | Yes | No | Yes | No | None |
| GitHub app token                                  | Github App Token                              | Yes | No | Yes | No | None |
| GitHub App Installation Token                     | GithubAppInstallationToken                    | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| GitHub Fine Grained Personal Access Token         | GithubFineGrainedPersonalAccessToken          | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| GitHub OAuth Access Token                         | Github OAuth Access Token                     | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| GitHub personal access token (classic)            | Github Personal Access Token                  | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| GitHub refresh token                              | Github Refresh Token                          | Yes | No | Yes | No | None |
| GitLab CI/CD job token                            | gitlab_ci_build_token                         | Yes | Yes | No | Yes | Both |
| GitLab deploy token                               | gitlab_deploy_token                           | Yes | Yes | No | Yes | Both |
| GitLab Feature Flags Client Token                 | None                                          | No | Yes | No | No | None |
| GitLab feed token                                 | gitlab_feed_token                             | Yes | Yes | No | No | None |
| GitLab feed token v2                              | gitlab_feed_token_v2                          | Yes | Yes | Yes | Yes | Both |
| GitLab incoming email token                       | gitlab_incoming_email_token                   | Yes | Yes | Yes | Yes | Both |
| GitLab Kubernetes agent token                     | gitlab_kubernetes_agent_token                 | Yes | Yes | Yes | Yes | Both |
| GitLab OAuth application secret                   | gitlab_oauth_app_secret                       | Yes | Yes | Yes | Yes | Both |
| GitLab personal access token                      | gitlab_personal_access_token                  | Yes | Yes | Yes | Yes | Both |
| GitLab Personal Access Token (routable)           | gitlab_personal_access_token_routable         | Yes | Yes | Yes | Yes | Both |
| GitLab Personal Access Token (routable, versioned) | gitlab_personal_access_token_routable_versioned | Yes | Yes | Yes | Yes | Both |
| GitLab pipeline trigger token                     | gitlab_pipeline_trigger_token                 | Yes | Yes | Yes | Yes | Both |
| GitLab runner authentication token                | gitlab_runner_auth_token                      | Yes | Yes | Yes | Yes | Both |
| GitLab runner authentication token (routable)     | gitlab_runner_auth_token_routable             | Yes | Yes | Yes | Yes | Both |
| GitLab runner registration token                  | gitlab_runner_registration_token              | Yes | No | Yes | No | None |
| GitLab SCIM OAuth token                           | gitlab_scim_oauth_token                       | Yes | Yes | No | Yes | Both |
| GoCardless API token                              | GoCardless API token                          | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| Grafana Service Account Token                     | GrafanaServiceAccountToken                    | Yes | No | Yes | No | None |
| Grafana Cloud Access Policy Token                 | GrafanaCloudAccessPolicyToken                 | Yes | No | Yes | No | None |
| HashiCorp Terraform API token                     | Hashicorp Terraform user/org API token        | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| HashiCorp Vault batch token                       | Hashicorp Vault batch token                   | Yes | No | Yes | No | None |
| HashiCorp Vault Service Token                     | HashicorpVaultServiceToken                     | Yes | No | Yes | No | None |
| Heroku API key or application authorization token | Heroku API Key                                | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Highnote Live Secret Key                          | HighnoteLiveSecretKey                         | Yes | No | Yes | No | None |
| Highnote Test Secret Key                          | HighnoteTestSecretKey                         | Yes | No | Yes | No | None |
| HubSpot private app API token                     | Hubspot API token                             | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Hugging Face User Access Token                    | HuggingFaceUserAccessToken                    | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Instagram access token                            | Instagram access token                        | Yes | No | No | No | None |
| Intercom API token                                | Intercom API token                            | Yes | No | No | No | None |
| Intercom App Access Token                         | IntercomAppAccessToken                        | Yes | No | Yes | No | None |
| Intercom client secret or client ID               | Intercom client secret/ID                     | Yes | No | No | No | None |
| Ionic personal access token                       | Ionic API token                               | Yes | No | No | No | None |
| JFrog Platform Access Tokens                      | JfrogPlatformAccessToken                      | Yes | No | No | No | None |
| Kubernetes Service Account Token                  | KubernetesServiceAccToken                     | Yes | No | Yes | No | None |
| LangChain API Key                                 | LangChainAPIKey                               | Yes | No | Yes | No | None |
| Linear API token                                  | Linear API token                              | Yes | No | Yes | No | None |
| Linear client secret or ID (OAuth 2.0)            | Linear client secret/ID                       | Yes | No | No | No | None |
| LinkedIn client ID                                | Linkedin Client ID                            | Yes | No | No | No | None |
| LinkedIn client secret                            | Linkedin Client secret                        | Yes | No | No | No | None |
| Lob API key                                       | Lob API Key                                   | Yes | No | No | No | None |
| Lob publishable API key                           | Lob Publishable API Key                       | Yes | No | No | No | None |
| Mailchimp API key                                 | Mailchimp API key                             | Yes | No | Yes | No | None |
| Mailgun private API token                         | Mailgun private API token                     | Yes | No | Yes | No | None |
| Mailgun public verification key                   | Mailgun public validation key                 | Yes | No | No | No | None |
| Mailgun webhook signing key                       | Mailgun webhook signing key                   | Yes | No | Yes | No | None |
| Mapbox API token                                  | Mapbox API token                              | Yes | No | No | No | None |
| Mapbox Secret API Token                           | MapboxSecretApiToken                          | Yes | No | No | No | None |
| MaxMind License Key                               | MaxMind License Key                           | Yes | No | Yes | No | None |
| MessageBird access key                            | messagebird-api-token                         | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| MessageBird API client ID                         | MessageBird API client ID                     | Yes | No | No | No | None |
| Meta access token                                 | Meta access token                             | Yes | No | No | No | None |
| New Relic ingest browser API token                | New Relic ingest browser API token            | Yes | No | No | No | None |
| New Relic ingest browser API token v2             | New Relic ingest browser API token v2         | Yes | No | Yes | No | None |
| New Relic REST API Key                            | New Relic REST API Key                        | Yes | No | Yes | No | None |
| New Relic user API ID                             | New Relic user API ID                         | Yes | No | Yes | No | None |
| New Relic user API key                            | New Relic user API Key                        | Yes | No | Yes | No | None |
| npm access token                                  | npm access token                              | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Oculus access token                               | Oculus access token                           | Yes | No | No | No | None |
| Okta API Token                                    | OktaAPIToken                                  | Yes | No | Yes | No | None |
| Okta Client Secret                                | OktaClientSecret                              | Yes | No | No | No | None |
| Onfido Live API Token                             | Onfido Live API Token                         | Yes | No | Yes | No | None |
| OpenAI API key                                    | open ai token                                 | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| OpenAI Project Key                                | OpenAiProjectKey                              | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| OpenAI Service Account Key                        | OpenAiServiceAccountKey                       | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| OpenAI Service Admin Key                          | OpenAiServiceAdminKey                         | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Password in URL                                   | Password in URL                               | Yes | No | No | No | None |
| PGP private key                                   | PGP private key                               | Yes | No | No | No | None |
| PKCS8 private key                                 | PKCS8 private key                             | Yes | No | No | No | None |
| PlanetScale API token                             | Planetscale API token                         | Yes | No | Yes | No | None |
| PlanetScale App Secret                            | PlanetscaleAppSecret                          | Yes | No | Yes | No | None |
| PlanetScale OAuth Secret                          | PlanetscaleOAuthSecret                        | Yes | No | Yes | No | None |
| PlanetScale password                              | Planetscale password                          | Yes | No | Yes | No | None |
| PostHog Personal API key                          | PostHogPersonalAPIkey                         | Yes | No | Yes | No | None |
| PostHog Project API key                           | PostHogProjectAPIkey                          | Yes | No | Yes | No | None |
| Postman API token                                 | Postman API token                             | Yes | No | No | Yes | Both |
| Postman Collection Access Key                     | PostmanCollectionAccessKey                    | Yes | No | Yes | No | None |
| Pulumi API token                                  | Pulumi API token                              | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| PyPi upload token                                 | PyPI upload token                             | Yes | No | Yes | No | None |
| RSA private key                                   | RSA private key                               | Yes | No | No | No | None |
| RubyGems API token                                | Rubygem API token                             | Yes | No | Yes | No | None |
| Segment public API token                          | Segment Public API token                      | Yes | No | Yes | No | None |
| SendGrid API token                                | Sendgrid API token                            | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Shippo API token                                  | Shippo API token                              | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Shippo Test API token                             | Shippo Test API token                         | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| Shopify Partner API Token                         | ShopifyPartnerAPIToken                        | Yes | No | Yes | No | None |
| Shopify personal access token                     | Shopify access token                          | Yes | No | Yes | No | None |
| Shopify private app access token                  | Shopify private app access token              | Yes | No | Yes | No | None |
| Shopify Custom App Access Token                   | Shopify custom app access token               | Yes | No | Yes | No | None |
| Shopify shared secret                             | Shopify shared secret                         | Yes | No | Yes | No | None |
| Slack App Configuration Token                     | SlackAppConfigurationToken                    | Yes | No | Yes | No | None |
| Slack App Configuration Refresh Token             | SlackAppConfigurationRefreshToken             | Yes | No | Yes | No | None |
| Slack app level token                             | SlackAppLevelToken                            | Yes | No | Yes | No | None |
| Slack bot user OAuth token                        | Slack token                                   | Yes | No | Yes | No | None |
| Slack webhook                                     | Slack Webhook                                 | Yes | No | No | No | None |
| SonarQube Global Analysis Token                   | SonarQubeGlobalAnalysisToken                  | Yes | No | Yes | No | None |
| SonarQube Project Analysis Token                  | SonarQubeProjectAnalysisToken                 | Yes | No | Yes | No | None |
| SonarQube User Token                              | SonarQubeUserToken                            | Yes | No | Yes | No | None |
| Splunk Authentication Token                       | SplunkAuthToken                               | Yes | No | Yes | No | None |
| Splunk HTTP Event Collector (HEC) Token            | SplunkHECToken                               | Yes | No | No | No | None |
| SSH (DSA) private key                             | SSH (DSA) private key                         | Yes | No | No | No | None |
| SSH (EC) private key                              | SSH (EC) private key                          | Yes | No | No | No | None |
| SSH private key                                   | SSH private key                               | Yes | No | No | No | None |
| Stripe live restricted key                        | StripeLiveRestrictedKey                       | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Stripe live secret key                            | StripeLiveSecretKey                           | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Stripe Live Short Secret Key                      | StripeLiveShortSecretKey                      | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Stripe publishable live key                       | StripeLivePublishableKey                      | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| Stripe publishable test key                       | StripeTestPublishableKey                      | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| Stripe restricted test key                        | StripeTestRestrictedKey                       | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| Stripe secret test key                            | StripeTestSecretKey                           | Yes | No | No | Yes | GitLab Secret Scanning for Source Code |
| Stripe Test Short Secret Key                      | StripeTestShortSecretKey                      | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Tailscale OAuth Client Secret                     | TailscaleOauthClientSecret                    | Yes | No | Yes | No | None |
| Tailscale API Access Token                        | TailscaleApiAccessToken                       | Yes | No | Yes | Yes | GitLab Secret Scanning for Source Code |
| Tailscale Personal Auth Key                       | TailscalePersonalAuthKey                      | Yes | No | Yes | No | None |
| Tencent Cloud Secret ID                           | TencentCloudSecretID                          | Yes | No | Yes | No | None |
| Twilio Account SID                                | Twilio Account SID                            | Yes | No | Yes | No | None |
| Twilio API key                                    | Twilio API Key                                | Yes | No | Yes | No | None |
| Twitch OAuth client secret                        | Twitch API token                              | Yes | No | No | No | None |
| Typeform personal access token                    | Typeform API token                            | Yes | No | No | No | None |
| Volcengine Access Key ID                          | VolcengineAccessKeyID                         | Yes | No | Yes | No | None |
| WakaTime API Key                                  | WakaTimeAPIKey                                | Yes | No | Yes | No | None |
| X token                                           | Twitter token                                 | Yes | No | No | No | None |
| Yandex.Cloud AWS API compatible access secret     | Yandex.Cloud AWS API compatible Access Secret | Yes | No | No | No | None |
| Yandex.Cloud API Key                              | Yandex.Cloud API Key                          | Yes | No | No | No | None |
| Yandex.Cloud IAM cookie v1-1                      | Yandex.Cloud IAM Cookie v1 - 1                | Yes | No | No | No | None |
| Yandex.Cloud IAM cookie v1-3                      | Yandex.Cloud IAM Cookie v1 - 3                | Yes | No | No | No | None |
