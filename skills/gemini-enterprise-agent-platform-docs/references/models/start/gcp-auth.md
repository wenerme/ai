To use Gemini on Gemini Enterprise Agent Platform, you need to authenticate by using a
[**Google Cloud API key**](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/api-keys) or by using
[**application default
credentials**](https://docs.cloud.google.com/docs/authentication/application-default-credentials). We
recommend using an API key for testing and using application default credentials
for production. This page shows you how to configure application default
credentials.

## Before you begin

#### Select a project, enable billing, enable the Agent Platform API, install gcloud CLI

## Create local authentication credentials

### Console

If you're using a local shell, then create local authentication credentials for your user
account:

```bash
gcloud auth application-default login
```

You don't need to do this if you're using Cloud Shell.

If an authentication error is returned, and you are using an external identity provider
(IdP), confirm that you have
[signed in to the gcloud CLI with your federated identity](https://docs.cloud.google.com/iam/docs/workforce-log-in-gcloud).

### curl

Run the following command to install and run `gcloud` to set up
application default credentials:

    curl -sSL https://storage.googleapis.com/cloud-samples-data/adc/setup_adc.sh

> [!NOTE]
> **Note:** You can set up application default credentials in different environments, such as for a resource with an attached service account, containerized environments, on-premises or other cloud providers, or a Google Cloud-based development environment. For more information, see [Set up Application Default Credentials](https://docs.cloud.google.com/docs/authentication/provide-credentials-adc).

## Make your first API request

After configuring application default credentials, learn how to make your first
request in the [API quickstart](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/vertex-ai-express-mode-api-quickstart).
