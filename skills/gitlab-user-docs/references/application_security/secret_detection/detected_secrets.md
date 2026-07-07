# Detected secrets

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

This table lists the secrets detected by:

- Pipeline secret detection
- Client-side secret detection
- Secret push protection

Secret detection rules are updated in the [default ruleset](https://gitlab.com/gitlab-org/security-products/secret-detection/secret-detection-rules/-/tree/main).
Detected secrets with patterns that have been removed or updated remain open so you can triage them.

If you want to add a new secret detection rule, you can [propose new detection rules](pipeline/configure.md#propose-new-detection-rules) for all GitLab users, or [customize rulesets](pipeline/configure.md#customize-analyzer-rulesets) for your specific project.

| Description                                   | ID                                            | Pipeline secret detection | Client-side secret detection | Secret push protection |
|:----------------------------------------------|:----------------------------------------------|:--------------------------|:-----------------------------|:-----------------------|
| Adafruit IO Key                               | AdafruitIOKey                                 | Yes | No | Yes |
| Adobe Client ID (OAuth Web)                       | Adobe Client ID (Oauth Web)                   | Yes | No | No |
| Adobe client secret                               | Adobe Client Secret                           | Yes | No | Yes |
| Adobe IMS Access Token                            | AdobeIMSAccessToken                           | Yes | No | No |
| Age secret key                                    | Age secret key                                | Yes | No | No |
| Aiven Service Password                            | AivenServicePassword                          | Yes | No | Yes |
| Alibaba AccessKey ID                              | Alibaba AccessKey ID                          | Yes | No | No |
| Alibaba Secret Key                                | Alibaba Secret Key                            | Yes | No | No |
| Amazon OAuth Client ID                            | AmazonOAuthClientID                           | Yes | No | Yes |
| Anthropic API key                                 | anthropic_key                                 | Yes | Yes | Yes |
| Artifactory API Key                               | ArtifactoryApiKey                             | Yes | No | Yes |
| Artifactory Identity Token                        | ArtifactoryIdentityToken                      | Yes | No | Yes |
| Asana client ID                                   | Asana Client ID                               | Yes | No | No |
| Asana client secret                               | Asana Client Secret                           | Yes | No | No |
| Asana Personal Access Token V1                   | AsanaPersonalAccessTokenV1                    | Yes | No | Yes |
| Asana Personal Access Token V2                   | AsanaPersonalAccessTokenV2                    | Yes | No | Yes |
| Atlassian API Key                                 | AtlassianApiKey                               | Yes | No | Yes |
| Atlassian API token                               | Atlassian API token                           | Yes | No | No |
| Atlassian User API Token                          | AtlassianUserApiToken                         | Yes | No | Yes |
| Auth0 Client Secret                               | Auth0ClientSecret                             | Yes | No | No |
| AWS Access Key ID                                 | AWS                                           | Yes | No | Yes |
| AWS Access Secret Key                             | AWSSecretAccessKey                            | Yes | No | No |
| AWS Session Token                                 | AWSSessionToken                               | Yes | No | Yes |
| AWS Cognito Identity Pool ID                      | AWSCognitoIdentityPoolID                      | Yes | No | No |
| AWS Bedrock Key                                   | AWSBedrockKey                       | Yes | No | No |
| AWS Bedrock Short-lived Key                       | AWSBedrockShortLivedKey                       | Yes | No | Yes |
| Azure API Management Gateway Key                  | AzureAPIManagementGatewayKey                  | Yes | No | Yes |
| Azure API Management Direct Key                   | AzureAPIManagementDirectKey                   | Yes | No | No |
| Azure App Config                                  | AzureAppConfigConnectionString                        | Yes | No | Yes |
| Azure Communication Services                      | AzureCommServicesConnectionString                     | Yes | No | Yes |
| Azure Cosmos DB Credentials                       | AzureCosmosDBCredentials                   | Yes | No | No |
| Azure Entra Client Secret                         | AzureEntraClientSecret                        | Yes | No | Yes |
| Azure Entra Client ID Token                       | AzureEntraIDToken                          | Yes | No | Yes |
| Azure EventGrid Access Key                        | AzureEventGridAccessKey                       | Yes | No | No |
| Azure Functions API Key                           | AzureFunctionsAPIKey                          | Yes | No | Yes |
| Azure Logic App SAS                               | AzureLogicAppSAS                          | Yes | No | Yes |
| Azure OpenAI API Key                              | AzureOpenAIAPIKey                       | Yes | No | No |
| Azure Personal Access Token                       | AzurePersonalAccessToken                   | Yes | No | No |
| Azure SignalR Access Key                          | AzureSignalRAccessKey                          | Yes | No | Yes |
| Beamer API token                                  | Beamer API token                              | Yes | No | No |
| Bitbucket client ID                               | Bitbucket client ID                           | Yes | No | No |
| Bitbucket client secret                           | Bitbucket client secret                       | Yes | No | No |
| Brevo API token                                   | Sendinblue API token                          | Yes | No | Yes |
| Brevo SMTP token                                  | Sendinblue SMTP token                         | Yes | No | Yes |
| Canada Digital Service Notify API Key             | CDSCanadaNotifyAPIKey                         | Yes | No | Yes |
| CircleCI access token                             | CircleCI access tokens                        | Yes | No | Yes |
| Clojars deploy token                              | Clojars API token                             | Yes | No | No |
| Contentful delivery API token                     | Contentful delivery API token                 | Yes | No | No |
| Contentful personal access token                  | ContentfulPersonalAccessToken                 | Yes | No | Yes |
| Contentful preview API token                      | Contentful preview API token                  | Yes | No | No |
| Databricks API token                              | Databricks API token                          | Yes | No | No |
| DataDog API Key                                   | DataDogAPIKey                                 | Yes | No | No |
| DigitalOcean OAuth access token                   | digitalocean-access-token                     | Yes | No | No |
| DigitalOcean personal access token                | digitalocean-pat                              | Yes | No | No |
| DigitalOcean refresh token                        | digitalocean-refresh-token                    | Yes | No | No |
| Discord API key                                   | Discord API key                               | Yes | No | No |
| Discord client ID                                 | Discord client ID                             | Yes | No | No |
| Discord client secret                             | Discord client secret                         | Yes | No | No |
| Docker Personal Access Token                      | DockerPersonalAccessToken                     | Yes | No | Yes |
| Doppler API token                                 | Doppler API token                             | Yes | No | Yes |
| Doppler Service token                             | Doppler Service token                         | Yes | No | Yes |
| Dropbox API secret/key                            | Dropbox API secret/key                        | Yes | No | No |
| Dropbox App Access Token                          | DropboxAppAccessToken                         | Yes | No | Yes |
| Dropbox long lived API token                      | Dropbox long lived API token                  | Yes | No | No |
| Dropbox short lived API token                     | Dropbox short lived API token                 | Yes | No | Yes |
| Duffel API token                                  | Duffel API token                              | Yes | No | No |
| Dynatrace Platform Token                          | DynatracePlatformToken                        | Yes | No | No |
| EasyPost production API key                       | EasyPost API token                            | Yes | No | No |
| EasyPost test API key                             | EasyPost test API token                       | Yes | No | No |
| Facebook token                                    | Facebook token                                | Yes | No | No |
| Fastly API user or automation token               | Fastly API token                              | Yes | No | No |
| Figma Personal Access Token                       | FigmaPersonalAccessToken                      | Yes | No | Yes |
| Finicity API token                                | Finicity API token                            | Yes | No | No |
| Finicity client secret                            | Finicity client secret                        | Yes | No | No |
| Flutterwave Prod Encrypted Key                    | FlutterwaveProdEncryptedKey                   | Yes | No | Yes |
| Flutterwave test encrypted key                    | Flutterwave encrypted key                     | Yes | No | No |
| Flutterwave Prod Public Key                       | FlutterwaveProdPublicKey                      | Yes | No | Yes |
| Flutterwave test public key                       | Flutterwave public key                        | Yes | No | No |
| Flutterwave Prod Secret Key                       | FlutterwaveProdSecretKey                      | Yes | No | Yes |
| Flutterwave test secret key                       | Flutterwave secret key                        | Yes | No | No |
| Frame.io API token                                | Frame.io API token                            | Yes | No | No |
| GCP API key                                       | GCP API key                                   | Yes | No | No |
| GCP OAuth client secret                           | GCP OAuth client secret                       | Yes | No | Yes |
| GCP Vertex Express Mode Key                       | GCPVertexExpressModeKey                       | Yes | No | Yes |
| GitHub app token                                  | Github App Token                              | Yes | No | Yes |
| GitHub App Installation Token                     | GithubAppInstallationToken                    | Yes | No | Yes |
| GitHub Fine Grained Personal Access Token         | GithubFineGrainedPersonalAccessToken          | Yes | No | Yes |
| GitHub OAuth Access Token                         | Github OAuth Access Token                     | Yes | No | Yes |
| GitHub personal access token (classic)            | Github Personal Access Token                  | Yes | No | Yes |
| GitHub refresh token                              | Github Refresh Token                          | Yes | No | Yes |
| GitLab CI/CD job token                            | gitlab_ci_build_token                         | Yes | Yes | No |
| GitLab deploy token                               | gitlab_deploy_token                           | Yes | Yes | No |
| GitLab Feature Flags Client Token                 | None                                          | No | Yes | No |
| GitLab feed token                                 | gitlab_feed_token                             | Yes | Yes | No |
| GitLab feed token v2                              | gitlab_feed_token_v2                          | Yes | Yes | Yes |
| GitLab incoming email token                       | gitlab_incoming_email_token                   | Yes | Yes | Yes |
| GitLab Kubernetes agent token                     | gitlab_kubernetes_agent_token                 | Yes | Yes | Yes |
| GitLab OAuth application secret                   | gitlab_oauth_app_secret                       | Yes | Yes | Yes |
| GitLab personal access token                      | gitlab_personal_access_token                  | Yes | Yes | Yes |
| GitLab Personal Access Token (routable)           | gitlab_personal_access_token_routable         | Yes | Yes | Yes |
| GitLab pipeline trigger token                     | gitlab_pipeline_trigger_token                 | Yes | Yes | Yes |
| GitLab runner authentication token                | gitlab_runner_auth_token                      | Yes | Yes | Yes |
| GitLab runner registration token                  | gitlab_runner_registration_token              | Yes | No | Yes |
| GitLab SCIM OAuth token                           | gitlab_scim_oauth_token                       | Yes | Yes | No |
| GoCardless API token                              | GoCardless API token                          | Yes | No | No |
| Google API key                                    | GCP API key                                   | Yes | No | No |
| Google (GCP) service account                      | Google (GCP) Service-account                  | Yes | No | Yes |
| Grafana Service Account Token                     | GrafanaServiceAccountToken                    | Yes | No | Yes |
| Grafana Cloud Access Policy Token                 | GrafanaCloudAccessPolicyToken                 | Yes | No | Yes |
| HashiCorp Terraform API token                     | Hashicorp Terraform user/org API token        | Yes | No | Yes |
| HashiCorp Vault batch token                       | Hashicorp Vault batch token                   | Yes | No | Yes |
| HashiCorp Vault Service Token                     | HashicorpVaultServiceToken                     | Yes | No | Yes |
| Heroku API key or application authorization token | Heroku API Key                                | Yes | No | Yes |
| Highnote Live Secret Key                          | HighnoteLiveSecretKey                         | Yes | No | Yes |
| Highnote Test Secret Key                          | HighnoteTestSecretKey                         | Yes | No | Yes |
| HubSpot private app API token                     | Hubspot API token                             | Yes | No | Yes |
| Hugging Face User Access Token                    | HuggingFaceUserAccessToken                    | Yes | No | Yes |
| Instagram access token                            | Instagram access token                        | Yes | No | No |
| Intercom API token                                | Intercom API token                            | Yes | No | No |
| Intercom App Access Token                         | IntercomAppAccessToken                        | Yes | No | Yes |
| Intercom client secret or client ID               | Intercom client secret/ID                     | Yes | No | No |
| Ionic personal access token                       | Ionic API token                               | Yes | No | No |
| JFrog Platform Access Tokens                      | JfrogPlatformAccessToken                      | Yes | No | No |
| Kubernetes Service Account Token                  | KubernetesServiceAccToken                     | Yes | No | Yes |
| LangChain API Key                                 | LangChainAPIKey                               | Yes | No | Yes |
| Linear API token                                  | Linear API token                              | Yes | No | Yes |
| Linear client secret or ID (OAuth 2.0)            | Linear client secret/ID                       | Yes | No | No |
| LinkedIn client ID                                | Linkedin Client ID                            | Yes | No | No |
| LinkedIn client secret                            | Linkedin Client secret                        | Yes | No | No |
| Lob API key                                       | Lob API Key                                   | Yes | No | No |
| Lob publishable API key                           | Lob Publishable API Key                       | Yes | No | No |
| Mailchimp API key                                 | Mailchimp API key                             | Yes | No | Yes |
| Mailgun private API token                         | Mailgun private API token                     | Yes | No | Yes |
| Mailgun public verification key                   | Mailgun public validation key                 | Yes | No | No |
| Mailgun webhook signing key                       | Mailgun webhook signing key                   | Yes | No | Yes |
| Mapbox API token                                  | Mapbox API token                              | Yes | No | No |
| Mapbox Secret API Token                           | MapboxSecretApiToken                          | Yes | No | No |
| MaxMind License Key                               | MaxMind License Key                           | Yes | No | Yes |
| MessageBird access key                            | messagebird-api-token                         | Yes | No | No |
| MessageBird API client ID                         | MessageBird API client ID                     | Yes | No | No |
| Meta access token                                 | Meta access token                             | Yes | No | No |
| New Relic ingest browser API token                | New Relic ingest browser API token            | Yes | No | No |
| New Relic ingest browser API token v2             | New Relic ingest browser API token v2         | Yes | No | Yes |
| New Relic REST API Key                            | New Relic REST API Key                        | Yes | No | Yes |
| New Relic user API ID                             | New Relic user API ID                         | Yes | No | Yes |
| New Relic user API key                            | New Relic user API Key                        | Yes | No | Yes |
| npm access token                                  | npm access token                              | Yes | No | Yes |
| Oculus access token                               | Oculus access token                           | Yes | No | No |
| Okta API Token                                    | OktaAPIToken                                  | Yes | No | Yes |
| Okta Client Secret                                | OktaClientSecret                              | Yes | No | No |
| Onfido Live API Token                             | Onfido Live API Token                         | Yes | No | Yes |
| OpenAI API key                                    | open ai token                                 | Yes | No | No |
| OpenAI Project Key                                | OpenAiProjectKey                              | Yes | No | Yes |
| OpenAI Service Account Key                        | OpenAiServiceAccountKey                       | Yes | No | Yes |
| Password in URL                                   | Password in URL                               | Yes | No | No |
| PGP private key                                   | PGP private key                               | Yes | No | No |
| PKCS8 private key                                 | PKCS8 private key                             | Yes | No | No |
| PlanetScale API token                             | Planetscale API token                         | Yes | No | Yes |
| PlanetScale App Secret                            | PlanetscaleAppSecret                          | Yes | No | Yes |
| PlanetScale OAuth Secret                          | PlanetscaleOAuthSecret                        | Yes | No | Yes |
| PlanetScale password                              | Planetscale password                          | Yes | No | Yes |
| PostHog Personal API key                          | PostHogPersonalAPIkey                         | Yes | No | Yes |
| PostHog Project API key                           | PostHogProjectAPIkey                          | Yes | No | Yes |
| Postman API token                                 | Postman API token                             | Yes | No | No |
| Postman Collection Access Key                     | PostmanCollectionAccessKey                    | Yes | No | Yes |
| Pulumi API token                                  | Pulumi API token                              | Yes | No | No |
| PyPi upload token                                 | PyPI upload token                             | Yes | No | Yes |
| RSA private key                                   | RSA private key                               | Yes | No | No |
| RubyGems API token                                | Rubygem API token                             | Yes | No | Yes |
| Segment public API token                          | Segment Public API token                      | Yes | No | Yes |
| SendGrid API token                                | Sendgrid API token                            | Yes | No | Yes |
| Shippo API token                                  | Shippo API token                              | Yes | No | Yes |
| Shippo Test API token                             | Shippo Test API token                         | Yes | No | No |
| Shopify Partner API Token                         | ShopifyPartnerAPIToken                        | Yes | No | Yes |
| Shopify personal access token                     | Shopify access token                          | Yes | No | Yes |
| Shopify private app access token                  | Shopify private app access token              | Yes | No | Yes |
| Shopify Custom App Access Token                   | Shopify custom app access token               | Yes | No | Yes |
| Shopify shared secret                             | Shopify shared secret                         | Yes | No | Yes |
| Slack App Configuration Token                     | SlackAppConfigurationToken                    | Yes | No | Yes |
| Slack App Configuration Refresh Token             | SlackAppConfigurationRefreshToken             | Yes | No | Yes |
| Slack app level token                             | SlackAppLevelToken                            | Yes | No | Yes |
| Slack bot user OAuth token                        | Slack token                                   | Yes | No | Yes |
| Slack webhook                                     | Slack Webhook                                 | Yes | No | No |
| SonarQube Global Analysis Token                   | SonarQubeGlobalAnalysisToken                  | Yes | No | Yes |
| SonarQube Project Analysis Token                  | SonarQubeProjectAnalysisToken                 | Yes | No | Yes |
| SonarQube User Token                              | SonarQubeUserToken                            | Yes | No | Yes |
| Splunk Authentication Token                       | SplunkAuthToken                               | Yes | No | Yes |
| Splunk HTTP Event Collector (HEC) Token            | SplunkHECToken                               | Yes | No | No |
| SSH (DSA) private key                             | SSH (DSA) private key                         | Yes | No | No |
| SSH (EC) private key                              | SSH (EC) private key                          | Yes | No | No |
| SSH private key                                   | SSH private key                               | Yes | No | No |
| Stripe live restricted key                        | StripeLiveRestrictedKey                       | Yes | No | Yes |
| Stripe live secret key                            | StripeLiveSecretKey                           | Yes | No | Yes |
| Stripe Live Short Secret Key                      | StripeLiveShortSecretKey                      | Yes | No | Yes |
| Stripe publishable live key                       | StripeLivePublishableKey                      | Yes | No | No |
| Stripe publishable test key                       | StripeTestPublishableKey                      | Yes | No | No |
| Stripe restricted test key                        | StripeTestRestrictedKey                       | Yes | No | No |
| Stripe secret test key                            | StripeTestSecretKey                           | Yes | No | No |
| Stripe Test Short Secret Key                      | StripeTestShortSecretKey                      | Yes | No | Yes |
| Tailscale OAuth Client Secret                     | TailscaleOauthClientSecret                    | Yes | No | Yes |
| Tailscale API Access Token                        | TailscaleApiAccessToken                       | Yes | No | Yes |
| Tailscale Personal Auth Key                       | TailscalePersonalAuthKey                      | Yes | No | Yes |
| Tencent Cloud Secret ID                           | TencentCloudSecretID                          | Yes | No | Yes |
| Twilio Account SID                                | Twilio Account SID                            | Yes | No | Yes |
| Twilio API key                                    | Twilio API Key                                | Yes | No | Yes |
| Twitch OAuth client secret                        | Twitch API token                              | Yes | No | No |
| Typeform personal access token                    | Typeform API token                            | Yes | No | No |
| Volcengine Access Key ID                          | VolcengineAccessKeyID                         | Yes | No | Yes |
| WakaTime API Key                                  | WakaTimeAPIKey                                | Yes | No | Yes |
| X token                                           | Twitter token                                 | Yes | No | No |
| Yandex.Cloud AWS API compatible access secret     | Yandex.Cloud AWS API compatible Access Secret | Yes | No | No |
| Yandex.Cloud API Key                              | Yandex.Cloud API Key                          | Yes | No | No |
| Yandex.Cloud IAM cookie v1-1                      | Yandex.Cloud IAM Cookie v1 - 1                | Yes | No | No |
| Yandex.Cloud IAM cookie v1-3                      | Yandex.Cloud IAM Cookie v1 - 3                | Yes | No | No |
