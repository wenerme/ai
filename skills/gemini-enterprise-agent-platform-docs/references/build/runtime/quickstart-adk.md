# Develop and deploy agents on Agent Runtime with Agent Development Kit

Agent Runtime lets you host agents developed with the [Agent Development Kit (ADK)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk). This document explains how to create, deploy, and test an agent using ADK.

This quickstart guides you through the following steps:

- Set up your Google Cloud project.
- Install the Agent Platform SDK for Python and ADK.
- Develop a currency exchange agent.
- Deploy the agent to Agent Runtime.
- Test the deployed agent.

You can also use the following alternative quickstarts for ADK:

- [ADK quickstart](https://google.github.io/adk-docs/get-started/quickstart/): The ADK quickstart runs entirely on your machine and assumes you're using a local IDE and terminal access.
- [Agent Starter Pack](https://github.com/GoogleCloudPlatform/agent-starter-pack): A collection of production-ready generative AI agent templates built for Agent Platform.

For the quickstart using supported frameworks other than Agent Development Kit, see [Develop and deploy agents on Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart).

## Before you begin

> [!NOTE]
> **Note:** To enable APIs, you need the `serviceusage.services.enable` permission. If you don't have this permission, ask your administrator to grant you the Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) role.

To get the permissions that
you need to use Agent Runtime,

ask your administrator to grant you the
following IAM roles on your project:

- [Agent Platform User](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.user) (`roles/aiplatform.user`)
- [Storage Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/storage#storage.admin) (`roles/storage.admin`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

## Install and initialize the Agent Platform SDK for Python

1. Run the following command to install the [Agent Platform SDK for Python](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/python-sdk/use-vertex-ai-python-sdk) and other
   required packages:

       pip install --upgrade --quiet google-cloud-aiplatform[agent_engines,adk]>=1.112

2. Authenticate as a user

   ### Local Shell

   Run the following command:

       gcloud auth application-default login

   ### Colab

   Run the following code:

       from google.colab import auth

       auth.authenticate_user(project_id="PROJECT_ID")

   ### Cloud Shell

   No action required.
3. Run the following code to import Agent Platform and initialize the SDK:

   ### Google Cloud project

       import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest

       client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(
           project="PROJECT_ID",               # Your project ID.
           location="LOCATION",                # Your cloud region.
       )

   Where:
   - `PROJECT_ID` is the Google Cloud project ID under
     which you [develop](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent) and [deploy](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent) agents

   - `LOCATION` is one of the [supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations).

## Develop an agent

1. Develop a currency exchange tool for your agent:

       def get_exchange_rate(
           currency_from: str = "USD",
           currency_to: str = "EUR",
           currency_date: str = "latest",
       ):
           """Retrieves the exchange rate between two currencies on a specified date."""
           import requests

           response = requests.get(
               f"https://api.frankfurter.app/{currency_date}",
               params={"from": currency_from, "to": currency_to},
           )
           return response.json()

2. Instantiate an agent:

       from google.adk.agents import Agent
       from vertexai import agent_engines

       agent = Agent(
           model="gemini-3.5-flash",
           name='currency_exchange_agent',
           tools=[get_exchange_rate],
       )

       app = agent_engines.AdkApp(agent=agent)

3. Test the agent locally:

   > [!NOTE]
   > **Note:** Testing an ADK agent locally uses in-memory sessions.

       async for event in app.async_stream_query(
           user_id="USER_ID",
           message="What is the exchange rate from US dollars to SEK today?",
       ):
           print(event)

   where <var translate="no">USER_ID</var> is a user-defined ID with a character limit of 128.

## Deploy an agent

Deploy the agent by creating a [`reasoningEngine`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines) resource in Agent Platform:

> [!NOTE]
> **Note:** Deploying an ADK agent to Agent Platform automatically generates a managed session resource. You can delete the managed session resource along with the agent in the [Clean-up section](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/quickstart-adk#clean-up).

    from vertexai import types

    remote_agent = client.agent_engines.create(
        agent=app,
        config={
            "requirements": ["google-cloud-aiplatform[agent_engines,adk]"],
            "staging_bucket": "STAGING_BUCKET",
            "identity_type": types.IdentityType.AGENT_IDENTITY,
        }
    )

where <var translate="no">STAGING_BUCKET</var> is a Cloud Storage bucket prefixed by `gs://`.

## Use an agent

Test the deployed agent by sending a query:

    async for event in remote_agent.async_stream_query(
        user_id="USER_ID",
        message="What is the exchange rate from US dollars to SEK today?",
    ):
        print(event)

## Clean up

To avoid incurring charges to your Google Cloud account for
the resources used on this page, follow these steps.

    remote_agent.delete(force=True)

## What's next

Guide

### [Agent Platform Runtime setup](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup)

Set up your environment to use Agent Platform Runtime.

Guide

### [Deploy agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent)

Learn the five ways to deploy an agent on Agent Platform Runtime based on your development needs.

Guide

### [Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents)

Learn how to manage agents that have been deployed to the Agent Platform managed runtime.

Guide

### [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent)

Use an agent with Agent Platform Runtime.

Resource

### [Get support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-support)

Find resources and support for Google Agent Platform.
