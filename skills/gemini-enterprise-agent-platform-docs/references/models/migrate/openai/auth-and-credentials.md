To use the OpenAI Python libraries, install the OpenAI SDK:

    pip install openai

To authenticate with the Chat Completions API, you can
either modify your client setup or change your environment
configuration to use Google authentication and an Agent Platform
endpoint. Choose whichever method that's easier, and follow the steps for
setting up depending on whether you want to call Gemini models
or self-deployed Model Garden models.

Certain models in Model Garden and
[supported Hugging Face models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/open-models/use-hugging-face-models)
need to be
[deployed to a Gemini Enterprise Agent Platform endpoint](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/deployment)
first before they can serve requests.
When
calling these self-deployed models from the Chat Completions API, you need to
specify the endpoint ID. To list your
existing Agent Platform endpoints, use the
[`gcloud ai endpoints list` command](https://docs.cloud.google.com/sdk/gcloud/reference/ai/endpoints/list).

### Client setup

To programmatically get Google credentials in Python, you can use the
`google-auth` Python SDK:

    pip install google-auth requests

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    import openai

    from google.auth import default
    import google.auth.transport.requests

    # TODO(developer): Update and un-comment below lines
    # project_id = "PROJECT_ID"
    # location = "us-central1"

    # Programmatically get an access token
    credentials, _ = default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
    credentials.refresh(google.auth.transport.requests.Request())
    # Note: the credential lives for 1 hour by default (https://cloud.google.com/docs/authentication/token-types#at-lifetime); after expiration, it must be refreshed.

    ##############################
    # Choose one of the following:
    ##############################

    # If you are calling a Gemini model, set the ENDPOINT_ID variable to use openapi.
    ENDPOINT_ID = "openapi"

    # If you are calling a self-deployed model from Model Garden, set the
    # ENDPOINT_ID variable and set the client's base URL to use your endpoint.
    # ENDPOINT_ID = "YOUR_ENDPOINT_ID"

    # OpenAI Client
    client = openai.OpenAI(
        base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/{ENDPOINT_ID}",
        api_key=credentials.token,
    )

By default, service account access tokens last for 1 hour. You can
[extend the life of service account access tokens](https://docs.cloud.google.com/docs/authentication/token-types#extend-sa-access-token-lifetime)
or periodically refresh your token and update the `openai.api_key` variable.

### Environment variables

[Install](https://docs.cloud.google.com/sdk/docs/install-sdk) the Google Cloud CLI. The OpenAI library can
read the `OPENAI_API_KEY` and `OPENAI_BASE_URL` environment
variables to change the authentication and endpoint in their default client.
Set the following variables:

    $ export PROJECT_ID=PROJECT_ID
    $ export LOCATION=LOCATION
    $ export OPENAI_API_KEY="$(gcloud auth application-default print-access-token)"

To call a Gemini model, set the `MODEL_ID`
variable and use the `openapi` endpoint:

    $ export MODEL_ID=MODEL_ID
    $ export OPENAI_BASE_URL="https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/openapi"

To call a self-deployed model from Model Garden, set the `ENDPOINT`
variable and use that in your URL instead:

    $ export ENDPOINT=ENDPOINT_ID
    $ export OPENAI_BASE_URL="https://${LOCATION}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT}"

Next, initialize the client:

    client = openai.OpenAI()

The Gemini Chat Completions API uses OAuth to authenticate
with a
[short-lived access token](https://docs.cloud.google.com/iam/docs/create-short-lived-credentials-direct#sa-credentials-oauth).
By default, service account access tokens last for 1 hour. You can
[extend the life of service account access tokens](https://docs.cloud.google.com/docs/authentication/token-types#extend-sa-access-token-lifetime)
or periodically refresh your token and update the `openai.api_key` variable.

## Refresh your credentials

The following example shows how to refresh your credentials automatically as
needed:

### Python

    from typing import Any

    import google.auth
    import google.auth.transport.requests
    import openai

    class OpenAICredentialsRefresher:
        def __init__(self, **kwargs: Any) -> None:
            # Set a placeholder key here
            self.client = openai.OpenAI(**kwargs, api_key="PLACEHOLDER")
            self.creds, self.project = google.auth.default(
                scopes=["https://www.googleapis.com/auth/cloud-platform"]
            )

        def __getattr__(self, name: str) -> Any:
            if not self.creds.valid:
                self.creds.refresh(google.auth.transport.requests.Request())

                if not self.creds.valid:
                    raise RuntimeError("Unable to refresh auth")

                self.client.api_key = self.creds.token
            return getattr(self.client, name)

        # TODO(developer): Update and un-comment below lines
        # project_id = "PROJECT_ID"
        # location = "us-central1"

        client = OpenAICredentialsRefresher(
            base_url=f"https://{location}-aiplatform.googleapis.com/v1/projects/{project_id}/locations/{location}/endpoints/openapi",
        )

        response = client.chat.completions.create(
            model="google/gemini-2.0-flash-001",
            messages=[{"role": "user", "content": "Why is the sky blue?"}],
        )

        print(response)

## What's next

- See examples of calling the [Chat Completions API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/openai/examples) with the OpenAI-compatible syntax.
- See examples of calling the [Inference API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent) with the OpenAI-compatible syntax.
- See examples of calling the [Function Calling API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/function-calling#examples) with OpenAI-compatible syntax.
- Learn more about the [Gemini API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models).
- Learn more about [migrating from Azure OpenAI to the Gemini API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate/migrate-from-azure-to-gemini).
