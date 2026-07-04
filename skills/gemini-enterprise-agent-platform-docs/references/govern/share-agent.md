This page describes how to share a single agent in your project by granting
Identity and Access Management permissions to users or service accounts.

To share an agent, you grant the `aiplatform.reasoningEngines.query` permission
on the specific agent resource.

## When to share an agent

Sharing an agent allows multiple users or automated systems to query the agent.
Common scenarios for sharing an agent include the following:

- **Collaboration**: Share an agent with other members of your team or organization to use it for their tasks.
- **Application integration**: Grant access to a service account so that a custom application, such as an internal chatbot or a customer support portal, can call the agent to handle specific user requests.
- **Agent-to-agent communication**: In a multi-agent system, one agent might need to call another agent for information or to delegate a sub-task.
- **Information access**: Provide users with controlled access to data through a conversational interface without granting them direct access to the underlying data sources. For example, share an agent connected to a knowledge base (like HR policies or technical documentation) with all employees.

## Before you begin

1. Identify the agent that you want to share. You need the project ID and the reasoning engine ID of the agent.
2. Identify the users or service accounts that you want to grant access to.

## Step 1: Create a custom role

To follow the principle of least privilege, create a custom role
that contains only the `aiplatform.reasoningEngines.query` permission.

### gcloud

To create a custom role in the project, run the following command:

```sh
gcloud iam roles create ROLE_ID  --project=PROJECT_ID \
  --title="ROLE_TITLE" \
  --description="ROLE_DESCRIPTION" \
  --permissions=aiplatform.reasoningEngines.query
```

Alternatively, to create the role for the entire organization:

```sh
gcloud iam roles create ROLE_ID --organization=ORGANIZATION_ID \
  --title="ROLE_TITLE" \
  --description="ROLE_DESCRIPTION" \
  --permissions=aiplatform.reasoningEngines.query
```

Replace the following:

- `ROLE_ID`: The ID of the role, such as `agentUser`.
- `ROLE_TITLE`: A title for the role, such as `Agent runtime user`.
- `ROLE_DESCRIPTION`: A short description of the role, such as `Allows querying agents`.
- `PROJECT_ID`: The project ID.
- `ORGANIZATION_ID`: The organization ID.

### Terraform

To create the custom role using Terraform, use the `google_project_iam_custom_role` resource:

```tf
resource "google_project_iam_custom_role" "reasoning_engine_query" {
role_id     = "ROLE_ID"
title       = "ROLE_TITLE"
project     = "PROJECT_ID"
permissions = ["aiplatform.reasoningEngines.query"]
}
```

Replace the following:

- `ROLE_ID`: The ID of the role, such as `agentUser`.
- `ROLE_TITLE`: A title for the role, such as `Agent runtime user`.
- `PROJECT_ID`: The project ID.

The custom role name will be `projects/PROJECT_ID/roles/ROLE_ID` or
`organizations/ORGANIZATION_ID/roles/ROLE_ID`.

## Step 2: Grant the role on the agent

After the role is created, bind the role to an agent and specify the user or
service account to grant permission to.

### Python

To grant the role using Python, use the `google-cloud-aiplatform` library:

```py
from google.cloud.aiplatform_v1 import ReasoningEngineServiceClient
from google.api_core.client_options import ClientOptions

# Initialize the client
client = ReasoningEngineServiceClient(
  client_options=ClientOptions(api_endpoint="LOCATION-aiplatform.googleapis.com")
)

# Define the resource path
resource = "projects/PROJECT_ID/locations/LOCATION/reasoningEngines/REASONING_ENGINE_ID"

# Get the current IAM policy and add the new binding
policy = client.get_iam_policy(request={"resource": resource})
binding = policy.bindings.add()
binding.role = "projects/PROJECT_ID/roles/ROLE_ID"
binding.members.append("USER_OR_SA")

# Update the IAM policy on the resource
client.set_iam_policy(request={"resource": resource, "policy": policy})
```

Replace the following:

- `LOCATION`: The region where the agent is deployed, such as `us-central1`.
- `PROJECT_ID`: The project ID.
- `REASONING_ENGINE_ID`: The reasoning engine ID of the agent.
- `ROLE_ID`: The ID of the role, such as `agentUser`.
- `USER_OR_SA`: The user email or service account, such as `user:someone@example.com` or `serviceAccount:my-sa@my-project.iam.gserviceaccount.com`.

### Terraform

To grant the role using Terraform, use the `google_vertex_ai_reasoning_engine_iam_member` resource:

```tf
resource "google_vertex_ai_reasoning_engine_iam_member" "example" {
project          = "PROJECT_ID"
region           = "REGION"
reasoning_engine = google_vertex_ai_reasoning_engine.my_engine.name
role             = google_project_iam_custom_role.reasoning_engine_query.name
member           = "USER_OR_SA"
}
```

Replace the following:

- `PROJECT_ID`: The project ID.
- `REGION`: The region.
- `USER_OR_SA`: The user or service account.

## Security considerations

Granting access to the agent provides direct access to send messages to the
agent's FastAPI endpoint. The security guarantees are determined by the code of
the receiving agent.

- **Trusted frontend**: Most default ADK agents operate from a trusted frontend. The agent trusts the frontend commands, which gives the frontend full control of sessions and users. In these cases, don't grant direct access to the agent to untrusted entities.
- **A2A agents**: Other agents, like Agent2Agent (A2A) agents, can be exposed to untrusted entities if they implement their own authentication and authorization. The agent runtime only provides coarse access control to the agent interface.
