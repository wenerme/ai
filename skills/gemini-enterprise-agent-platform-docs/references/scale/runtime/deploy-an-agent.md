Deploying an agent on Agent Runtime makes it available remotely to handle
requests. This document explains the ways to deploy an agent based on your
development workflow: from an execution object, local source files, a
Dockerfile, a container image hosted in Artifact Registry, or directly through
a connected Git repository.

To deploy an agent on Agent Runtime, choose between the following methods:

- **Deploy from an agent object** : Ideal for interactive development in environments like Colab, enabling deployment of in-memory `local_agent` objects. This method works best for agents with structures that don't contain complex, non-serializable components.
- **Deploy from source files**: This method is well-suited for automated workflows such as CI/CD pipelines and Infrastructure as Code tools like Terraform, enabling fully declarative and automated deployments. It deploys your agent directly from local source code and does not require a Cloud Storage bucket.
- **Deploy from Dockerfile**: This method is similar to the method for deploying from source files. You deploy your agent directly from local source code. You don't need a Cloud Storage bucket. This method is appropriate if you need to define and have control over the API server that is deployed.
- **Deploy from Container Image**: This method is similar to the method for deploying from Dockerfile. You deploy a container image that is hosted in Artifact Registry. Use this method if you require control over the build process for the container image and lower deployment latency.
- **Deploy from Developer Connect** : Recommended for projects managed in a Git repository that are linked through [Developer Connect](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#developer-connect-deployment). This method streamlines agent deployment directly from your source code and natively supports version control, team collaboration, and CI/CD pipelines. Before using this method, set up your Git repository link by following the instructions in [Set up Developer Connect Git repository
  link](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#developer-connect-setup).

To get started, use the following steps:

1. [Complete prerequisites](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#prerequisites)
2. Optional: [Configure your agent for deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#configure-agent)
3. [Create an Agent Platform instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-platform-instance)
4. Optional: [Get the agent resource ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#resource-identifier)
5. Optional: [List the supported operations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#supported-operations)
6. Optional: [Grant the deployed agent permissions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#agent-permissions)

You can also use [Agents CLI](https://google.github.io/agents-cli/) for deployment.

> [!NOTE]
> **Note:** Agent Runtime deployment only supports Python.

## Prerequisites

Before you deploy an agent, make sure you have completed the following tasks:

1. [Set up your environment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup)
2. [Create an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent)

## Optional: Configure your agent for deployment

You can make the following optional configurations for your agent:

#### Define the package requirements

> [!NOTE]
> **Note:** For deployments from source files, you don't need to use the `requirements` parameter. Instead, include a `requirements.txt` file directly within your source code package. The path to this file can be specified in the `requirements_file` parameter when you [create the
> Agent Platform instance](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-platform-instance).

Provide the set of packages required by the agent for deployment. The set of
packages can either be a list of items to be installed by pip, or the path to
a file that follows the [Requirements File Format](https://pip.pypa.io/en/stable/reference/requirements-file-format).
Use the following best practices:

1. Pin your package versions for reproducible builds. Common packages to keep track of include the following: `google-cloud-aiplatform`, `cloudpickle`, `langchain`, `langchain-core`, `langchain-google-vertexai`, and `pydantic`.
2. Minimize the number of dependencies in your agent. This reduces the number of breaking changes when updating your dependencies and agent.

If the agent doesn't have any dependencies, you can set `requirements`
to `None`:

```python
requirements = None
```

If the agent uses a framework-specific template, you should specify the SDK
version that is imported (such as `1.112.0`) when developing the
agent.

### ADK

```python
requirements = [
    "google-cloud-aiplatform[agent_engines,adk]",
    # any other dependencies
]
```

### A2A

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

```python
requirements = [
    "google-cloud-aiplatform[agent_engines]",
    "google-adk[a2a]",
    # any other dependencies
]
```

### LangChain

```python
requirements = [
    "google-cloud-aiplatform[agent_engines,langchain]",
    # any other dependencies
]
```

### LangGraph

```python
requirements = [
    "google-cloud-aiplatform[agent_engines,langgraph]",
    # any other dependencies
]
```

### AG2

```python
requirements = [
    "google-cloud-aiplatform[agent_engines,ag2]",
    # any other dependencies
]
```

### LlamaIndex

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

The following instructions are for LlamaIndex Query Pipeline:

```python
requirements = [
    "google-cloud-aiplatform[agent_engines,llama_index]",
    # any other dependencies
]
```

You can also do the following with package `requirements`:

- Upper-bound or pin the version of a given package (such as `google-cloud-aiplatform`):

  ```python
    requirements = [
        # See https://pypi.org/project/google-cloud-aiplatform for the latest version.
        "google-cloud-aiplatform[agent_engines,adk]==1.112.0",
    ]

  ```
- Add additional packages and constraints:

  ```python
    requirements = [
        "google-cloud-aiplatform[agent_engines,adk]==1.112.0",
        "cloudpickle==3.0", # new
    ]

  ```
- Point to the version of a package on a GitHub branch or pull request:

  ```python
    requirements = [
        "google-cloud-aiplatform[agent_engines,adk] @ git+https://github.com/googleapis/python-aiplatform.git@`BRANCH_NAME`", # new
    ]

  ```
- Maintain the list of requirements in a file (such as `path/to/requirements.txt`):

  ```python
    requirements = "path/to/requirements.txt"

  ```

  where `path/to/requirements.txt` is a text file that follows the
  [Requirements File Format](https://pip.pypa.io/en/stable/reference/requirements-file-format/#example).
  For example:

  ```
    google-cloud-aiplatform[agent_engines,adk]
    cloudpickle==3.0

  ```

#### Define additional packages

> [!NOTE]
> **Note:** The `extra_packages` parameter is only used when deploying from an agent object.

You can include local files or directories that contain local required Python
source files. Compared to [package requirements](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#package-requirements),
this lets you use private utilities you have developed that aren't otherwise
available on PyPI or GitHub.

If the agent does not require any extra packages, you can set
`extra_packages` to `None`:

```python
extra_packages = None
```

You can also do the following with `extra_packages`:

- Include a single file (such as `agents/agent.py`):

  ```python
    extra_packages = ["agents/agent.py"]

  ```
- Include the set of files in an entire directory (for example, `agents/`):

  ```python
    extra_packages = ["agents"] # directory that includes agents/agent.py

  ```
- Specify [Python wheel binaries](https://peps.python.org/pep-0427/) (for example, `path/to/python_package.whl`):

  ```python
    requirements = [
        "google-cloud-aiplatform[agent_engines,adk]",
        "cloudpickle==3.0",
        "python_package.whl",  # install from the whl file that was uploaded
    ]
    extra_packages = ["path/to/python_package.whl"]  # bundle the whl file for uploading

  ```

#### Define environment variables

If there are environment variables that your agent depends on, you can
specify them in the `env_vars=` argument. If the agent does not
depend on any environment variables, you can set it to `None`:

```python
env_vars = None
```

If you are using secrets as environment variables with an agent that is
configured to use [agent identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity),
grant the `secretmanager.versions.access` permission (included in the
`roles/secretmanager.secretAccessor` role) to the
[Agent Platform
Service Agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/access-control#aiplatform.serviceAgent), which has the following format:

`service-PROJECT_NUMBER@gcp-sa-aiplatform.iam.gserviceaccount.com`

Your configured agent identity is used at runtime, but the
Agent Platform Service Agent is used to fetch secrets during
deployment. The added permission allows the service agent to retrieve the secret
values from Secret Manager during the deployment process.

> [!WARNING]
> **Warning:** You shouldn't set the following environment variables: `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_QUOTA_PROJECT`, `GOOGLE_CLOUD_LOCATION`, `PORT`, `K_SERVICE`, `K_REVISION`, `K_CONFIGURATION`, and `GOOGLE_APPLICATION_CREDENTIALS`. Also, you should avoid the prefix `GOOGLE_CLOUD_AGENT_ENGINE` to avoid naming conflicts with Agent Runtime environment variables.

To specify the environment variables, there are a few different options available:

### Dictionary

```python
env_vars = {
  "VARIABLE_1": "VALUE_1",
  "VARIABLE_2": "VALUE_2",
}
# These environment variables will become available in Agent Platform
# through `os.environ`, e.g.
#
#   import os
#   os.environ["VARIABLE_1"] # will have the value "VALUE_1"
#
# and
#
#   os.environ["VARIABLE_2"] # will have the value "VALUE_2"
#
```

To reference a secret in Secret Manager and have it be
available as an environment variable (for example,
`CLOUD_SQL_CREDENTIALS_SECRET`), first follow the instructions to
[Create a secret](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#create-secret) for
`CLOUD_SQL_CREDENTIALS_SECRET` in [your project](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#project),
before specifying the environment variables as:

    env_vars = {
      # ... (other environment variables and their values)
      "CLOUD_SQL_CREDENTIALS_SECRET": {"secret": SECRET_ID, "version": SECRET_VERSION_ID},
    }

where

- `SECRET_VERSION_ID` is the ID of the secret version.
- `SECRET_ID` is the ID of the secret.

> [!NOTE]
> **Note:** You can only reference secrets (and their versions) that are managed in the same project as the deployed agent.

In your [agent code](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent), you can
then reference the secret like so:

```python
secret = os.environ.get("CLOUD_SQL_CREDENTIALS_SECRET")
if secret:
  # Secrets are stored as strings, so use json.loads to parse JSON
  # payloads.
  return json.loads(secret)
```

### List

> [!NOTE]
> **Note:** This option does not support Secret Manager integration. If you need to specify managed secrets, you need to specify the environment variables as a dictionary.

```python
env_vars = ["VARIABLE_1", "VARIABLE_2"]
# This corresponds to the following code snippet:
#
#   import os
#
#   env_vars = {
#     "VARIABLE_1": os.environ["VARIABLE_1"],
#     "VARIABLE_2": os.environ["VARIABLE_2"],
#   }
```

You also need to follow the instructions in [Set up the identity and permissions for your agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions)
to grant your agent the Secret Manager Secret Accessor
(`roles/secretmanager.secretAccessor`) permission.

#### Define customized resource controls

> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

You can specify runtime resource controls for the agent, such as the minimum
and maximum number of application instances, resource limits for each
container, and concurrency for each container.

- `min_instances`: The minimum number of application instances to
  keep running at all times, with a range of `[0, 10]`. The default value is 1.

  > [!NOTE]
  > **Note:** While this feature is in Preview, even if you configure a higher number of minimum instances, you won't be billed for time when an agent is idle. This billing behavior is subject to change in the future.

- `max_instances`: The maximum number of application instances that
  can be launched to handle increased traffic, with a range of `[1, 1000]`.
  The default value is 100. If VPC-SC or PSC-I is enabled, the acceptable range is `[1, 100]` per Agent Platform resource.

- `resource_limits`: Resource limits for each container. Only
  `cpu` and `memory` keys are supported. The default value
  is `{"cpu": "4", "memory": "4Gi"}`.

  - The only supported values for `cpu` are `1`, `2`, `4`, `6` and
    `8`. For more information, see
    [Configure CPU allocation](https://docs.cloud.google.com/run/docs/configuring/cpu).

  - The only supported values for `memory` are `1Gi`, `2Gi`, ...
    `32Gi`.

  - For required CPU on different memory values, see
    [Configure memory limits](https://docs.cloud.google.com/run/docs/configuring/memory-limits).

- `container_concurrency`: Concurrency for each container and agent
  server. The recommended value is 2 \* `cpu` + 1. The default value
  is `9`.

```python
remote_agent = client.agent_engines.create(
    agent=local_agent,
    config={
        "min_instances": 1,
        "max_instances": 10,
        "resource_limits": {"cpu": "4", "memory": "8Gi"},
        "container_concurrency": 9,
        # ... other configs
    }
)
```

For best practices on how to optimize runtime resources, see [Optimize and scale
Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/optimize-and-scale).

#### Define build options

You can specify build options for the agent, such as installation scripts to
run when building the agent's container image. This is useful for installing
system dependencies (for example, `gcloud cli`, `npx`) or
other custom setups. The scripts are run with root permissions.

To use installation scripts, create a directory named
`installation_scripts` and place your shell scripts inside the
directory:

```
.
├── ...
└── installation_scripts/
    └── install.sh
```

Next, specify the `installation_scripts` directory in
`extra_packages` and the script paths in `build_options`:

```bash
extra_packages = [..., "installation_scripts/install.sh"]
build_options = {"installation_scripts": ["installation_scripts/install.sh"]}
```

You can use one of the following common installation scripts:

### install_npx.sh

```bash
#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Installing System-Wide Node.js v20.x ---"

# 1. Install prerequisites
apt-get update
apt-get install -y ca-certificates curl gnupg

# 2. Add the NodeSource repository GPG key
mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# 3. Add the NodeSource repository for Node.js v20
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

# 4. Update package lists again and install Node.js
apt-get update
apt-get install nodejs -y

echo "--- System-wide Node.js installation complete ---"
echo "Verifying versions:"

# These commands will now work for ANY user because node and npx
# are installed in /usr/bin/ which is in everyone's default PATH.
node -v
npm -v
npx -v
```

### install_uvx.sh

```bash
#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Starting setup..."

# Install uv
apt-get update
apt-get install -y curl
curl -LsSf https://astral.sh/uv/install.sh | env UV_INSTALL_DIR="/usr/local/bin" sh

# These commands will now work for ANY user because uv and uvx
# are installed in /usr/local/bin/ which is in everyone's default PATH.
uv --version
uvx --version
```

### install_gcloud_cli.sh

```bash
#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

apt-get install -y curl gpg
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
apt-get update -y && apt-get install google-cloud-cli -y

gcloud --version
```

#### Define the agent framework

You can specify the agent framework that your agent uses:

```python
agent_framework = "google-adk"
```

The following are the supported values:

- [`google-adk`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-adk-agent)
- [`langchain`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langchain-agent)
- [`langgraph`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-langgraph-agent)
- [`ag2`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-ag2-agent)
- [`llama-index`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-llamaindex-agent)
- [`custom`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-a-custom-agent)

If `agent_framework` isn't specified, the value is auto-detected if you are
[deploying from an agent object](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-platform-instance). If you are [deploying from source files](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#create-agent-platform-instance),
`agent_framework` defaults to \`custom\`.

#### Define a Cloud Storage folder

> [!NOTE]
> **Note:** The `gcs_dir_name` parameter is only used when deploying from an agent object.

Staging artifacts are overwritten if they correspond to an existing
[folder](https://docs.cloud.google.com/storage/docs/folder-types) in a Cloud Storage bucket.
If necessary, you can specify the Cloud Storage folder for the staging
artifacts. You can set `gcs_dir_name` to `None` if you
don't mind potentially overwriting the files in the default folder:

```python
gcs_dir_name = None
```

To avoid overwriting the files (such as for different environments such as
development, staging, and production), you can set up corresponding folder,
and specify the folder to stage the artifact under:

```python
gcs_dir_name = "dev" # or "staging" or "prod"
```

If you want or need to avoid collisions, you can generate a random
`uuid`:

```python
import uuid
gcs_dir_name = str(uuid.uuid4())
```

#### Define the display name

You can set the display name for the [`ReasoningEngine`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines)
resource:

```python
display_name = "Currency Exchange Rate Agent (Staging)"
```

#### Define the description

You can set the description of the [`ReasoningEngine`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines)
resource:

```python
description = """
An agent that has access to tools for looking up the exchange rate.

If you run into any issues, please contact the dev team.
"""
```

#### Define the labels

You can set the labels of the [`ReasoningEngine`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines)
resource as a dictionary of key-value string pairs. The following is an example:

```python
labels = {"author": "username", "version": "latest"}
```

#### Configure a default agent identity

You can provision agents you deploy to Agent Platform with a
unique identity upon creating your agent. The identity is tied to the
Agent Platform's agent resource ID and is independent of the
agent framework you used to develop the agent:

```python
identity_type=AGENT_IDENTITY
```

For more information, see [Create an agent with agent identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity#create-agent-identity).

#### Configure a custom service account

You can configure a custom service account as the identity of your deployed
agent, instead of the [agent identity
or default identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions).

To do so, specify the email of your custom service account as the
`service_account` when creating or updating the Agent Platform instance, for example:

```python
# Create a new instance
client.agent_engines.create(
    agent=local_agent,
    config={
        "service_account": "my-custom-service-account@my-project.iam.gserviceaccount.com",
        # ...
    },
)

# Update an existing instance
resource_name = "projects/{project_id}/locations/{location}/reasoningEngines/{reasoning_engine_id}"
client.agent_engines.update(
    name=resource_name,
    agent=local_agent,
    config={
        "service_account": "my-new-custom-service-account@my-project.iam.gserviceaccount.com",
        # ...
    },
)
```

> [!NOTE]
> **Note:** Specify only the service account email, not the full resource URI, such as `projects/{project_id}/serviceAccounts/{service_account_email}`.

#### Configure Private Service Connect interface

If you have [Private Service Connect interface and private DNS zone](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/private-service-connect-interface)
set up, you can specify your network attachment and create private DNS peering
while deploying your agent:

```python
remote_agent = client.agent_engines.create(
    agent=local_agent,
    config={
        "psc_interface_config": {
            "network_attachment": "NETWORK_ATTACHMENT",
            "dns_peering_configs": [
                {
                    "domain": "DOMAIN_SUFFIX",
                    "target_project": "TARGET_PROJECT",
                    "target_network": "TARGET_NETWORK",
                },
            ],
        },
    },
)
```

where

- `NETWORK_ATTACHMENT` is the name or full path of your network attachment. If the network attachment is created in a project (such as the Shared VPC host project) different from where you use Agent Platform, you need to pass the full path of your network attachment.
- `DOMAIN_SUFFIX` is the DNS name of the private Cloud DNS zone.
- `TARGET_PROJECT` is the project that hosts the VPC network. It can be different from the Network Attachment project.
- `TARGET_NETWORK` is the VPC network name in the \`TARGET_PROJECT\` to which the DNS peering is established.

You can configure multiple agents to use either a single, shared network
attachment or unique, dedicated network attachments. To use a shared network
attachment, provide the same network attachment in the
`psc_interface_config` for each agent you create.

#### Configure customer-managed encryption keys

You can use a custom key to encrypt your agent's data at rest. See Agent
Engine [Customer-managed
encryption keys (CMEK)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-agent-access#cmek) for more details.

To configure the custom key (CMEK) for your agent, you need to provide
the key resource name to the `encryption_spec` parameter when
creating the Agent Platform instance.

```python
# The fully qualified key name
kms_key_name = "projects/`PROJECT_ID`/locations/`LOCATION`/keyRings/`KEY_RING`/cryptoKeys/`KEY_NAME`"

remote_agent = client.agent_engines.create(
    agent=local_agent,
    config={
        "encryption_spec": {"kms_key_name": kms_key_name},
        # ... other parameters
    },
)
```

#### Set up Developer Connect Git repository link

To deploy from a Git repository using Developer Connect, follow the [Developer Connect documentation](https://docs.cloud.google.com/developer-connect/docs/connect-repo) to create a connection and link to the specific repository. The resource name of the link is used as the `git_repository_link` during [deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#developer-connect-deployment), and follows the format:
`projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION_ID/gitRepositoryLinks/REPO_ID`.

## Create an Agent Platform instance

This section describes how to create an Agent Platform instance for
deploying an agent.

To deploy an agent on Agent Platform, you can choose between the following methods:

- Deploying from an agent object for interactive development.
- Deploying from Developer Connect for Git-based workflows.
- Deploying from source files or Dockerfile for file-based workflows.
- Deploying from container image for image-based workflows.

### Python Object

To deploy the agent on Agent Platform, use `client.agent_engines.create` to
pass in the `local_agent` object along with any [optional configurations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#configure-agent):

    remote_agent = client.agent_engines.create(
        agent=local_agent,                                  # Optional.
        config={
            "requirements": requirements,                   # Optional.
            "extra_packages": extra_packages,               # Optional.
            "gcs_dir_name": gcs_dir_name,                   # Optional.
            "display_name": display_name,                   # Optional.
            "description": description,                     # Optional.
            "labels": labels,                               # Optional.
            "env_vars": env_vars,                           # Optional.
            "build_options": build_options,                 # Optional.
            "identity_type": identity_type,                 # Optional.
            "service_account": service_account,             # Optional.
            "min_instances": min_instances,                 # Optional.
            "max_instances": max_instances,                 # Optional.
            "resource_limits": resource_limits,             # Optional.
            "container_concurrency": container_concurrency, # Optional
            "encryption_spec": encryption_spec,             # Optional.
            "agent_framework": agent_framework,             # Optional.
        },
    )

Deployment takes a few minutes, during which the following steps happen in the background:

1. A bundle of the following artifacts are generated locally:

   - `*.pkl` a pickle file corresponding to local_agent.
   - `requirements.txt` a text file containing the [package requirements](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#package-requirements).
   - `dependencies.tar.gz` a tar file containing any [extra packages](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#extra-packages).
2. The bundle is uploaded to Cloud Storage (under the corresponding [folder](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#gcs-directory)) for staging the artifacts.

3. The Cloud Storage URIs for the respective artifacts are specified in the
   [PackageSpec](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines#PackageSpec).

4. The Agent Runtime service receives the request and builds containers and starts HTTP servers on the backend.

### Developer Connect

To deploy from Developer Connect on Agent Platform, use `client.agent_engines.create` by providing `developer_connect_source`, `entrypoint_module`, and `entrypoint_object` in the config dictionary, along with other [optional configurations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#configure-agent). This method lets you deploy code directly from a connected Git repository.

    remote_agent = client.agent_engines.create(
        config={
            "developer_connect_source": {                   # Required.
                "git_repository_link": "projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION_ID/gitRepositoryLinks/REPO_ID",
                "revision": "main",
                "dir": "path/to/dir",
            },
            "entrypoint_module": "agent",                   # Required.
            "entrypoint_object": "root_agent",              # Required.
            "requirements_file": "requirements.txt",        # Optional.
            # Other optional configs:
            # "env_vars": {...},
            # "service_account": "...",
        },
    )

The parameters for Developer Connect deployment are:

- `developer_connect_source` (Required, `dict`): The configuration for fetching source code. See [set up Developer Connect Git repository link](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#developer-connect-setup) for details.
  - `git_repository_link` (Required, `str`): The Developer Connect Git repository link resource name.
  - `revision` (Required, `str`): The revision to fetch (branch, tag, or commit SHA).
  - `dir` (Required, `str`): The root directory of the agent code within the repository.
- `entrypoint_module` (Required, `str`): The Python module name containing the agent entrypoint, relative to the directory specified in `developer_connect_source.dir`.
- `entrypoint_object` (Required, `str`): The name of the callable object within the `entrypoint_module` that represents the agent application (for example, `root_agent`).
- `requirements_file` (Optional, `str`): The path to a pip requirements file relative to the source root. Defaults to `requirements.txt`.

Deployment takes a few minutes, during which the following steps happen in the background:

1. The Agent Runtime service fetches the source code from the specified Git repository revision.
2. The service installs dependencies from `requirements_file` (if provided).
3. The service starts the agent application using the specified `entrypoint_module` and `entrypoint_object`.

### Source files

To deploy from source files on Agent Platform, use `client.agent_engines.create` by providing `source_packages`, `entrypoint_module`, `entrypoint_object`, and `class_methods` in the config dictionary, along with other [optional configurations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#configure-agent). With this method, you don't need to pass an agent object or Cloud Storage bucket.

    remote_agent = client.agent_engines.create(
        config={
            "source_packages": source_packages,             # Required.
            "entrypoint_module": entrypoint_module,         # Required.
            "entrypoint_object": entrypoint_object,         # Required.
            "class_methods": class_methods,                 # Required.
            "requirements_file": requirements_file,         # Optional.
            "display_name": display_name,                   # Optional.
            "description": description,                     # Optional.
            "labels": labels,                               # Optional.
            "env_vars": env_vars,                           # Optional.
            "build_options": build_options,                 # Optional.
            "identity_type": identity_type,                 # Optional.
            "service_account": service_account,             # Optional.
            "min_instances": min_instances,                 # Optional.
            "max_instances": max_instances,                 # Optional.
            "resource_limits": resource_limits,             # Optional.
            "container_concurrency": container_concurrency, # Optional
            "encryption_spec": encryption_spec,             # Optional.
            "agent_framework": agent_framework,             # Optional.
        },
    )

The parameters for inline source deployment are:

- `source_packages` (Required, `list[str]`): A list of local file or directory paths to include in the deployment. The total size of the files and directories in `source_packages` shouldn't exceed 8MB.
- `entrypoint_module` (Required, `str`): The fully qualified Python module name containing the agent entrypoint (for example, `agent_dir.agent`).
- `entrypoint_object` (Required, `str`): The name of the callable object within the `entrypoint_module` that represents the agent application (for example, `root_agent`).
- `class_methods` (Required, `list[dict]`): A list of dictionaries that define the agent's exposed methods. Each dictionary includes a `name` (Required), an `api_mode` (Required), and a `parameters` field. Refer to [List supported operations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-custom-agent#supported-operations) for more information a the methods for a custom agent.

  For example:

        "class_methods": [
            {
                "name": "method_name",
                "api_mode": "", # Possible options are: "", "async", "async_stream", "stream", "bidi_stream"
                "parameters": {
                    "type": "object",
                    "properties": {
                        "param1": {"type": "string", "description": "Description of param1"},
                        "param2": {"type": "integer"}
                    },
                    "required": ["param1"]
                }
            }
        ]
        ```

- `requirements_file` (Optional, `str`): The path to a pip requirements file within the paths specified in `source_packages`. Defaults to `requirements.txt` at the root directory of the packaged source.

Deployment takes a few minutes, during which the following steps happen in the background:

1. The Agent Platform SDK creates a `tar.gz` archive of the paths specified in `source_packages`.
2. This archive is encoded and sent directly to the Agent Platform API.
3. The Agent Runtime service receives the archive, extracts it, installs dependencies from `requirements_file` (if provided), and starts the agent application using the specified `entrypoint_module` and `entrypoint_object`.

The following is an example of deploying an agent from source files:

    from google.cloud.aiplatform import vertexai

    # Example file structure:
    # /agent_directory
    #     ├── agent.py
    #     ├── requirements.txt

    # Example agent_directory/agent.py:
    # class MyAgent:
    #     def ask(self, question: str) -> str:
    #         return f"Answer to {question}"
    # root_agent = MyAgent()

    remote_agent = client.agent_engines.create(
      config={
          "display_name": "My Agent",
          "description": "An agent deployed from a local source.",
          "source_packages": ["agent_directory"],
          "entrypoint_module": "agent_directory.agent",
          "entrypoint_object": "root_agent",
          "requirements_file": "requirements.txt",
          "class_methods": [
              {"name": "ask", "api_mode": "", "parameters": {
                  "type": "object",
                  "properties": {
                      "question": {"type": "string"}
                  },
                  "required": ["question"]
              }},
          ],
          # Other optional configs:
          # "env_vars": {...},
          # "service_account": "...",
      }
    )

### Dockerfile

To deploy from Dockerfile on Agent Platform, it follows a similar approach
to [deploying from source files](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#from-source-files). The only place that
changes when deploying is to replace `entrypoint_module`, `entrypoint_object`,
and (optionally) `requirements_file` in the config with an `image_spec`.

The following is an example of deploying an agent using a Dockerfile:

    from google.cloud.aiplatform import vertexai

    # Example file structure:
    # /current_directory
    #     ├── agent.py
    #     ├── main.py
    #     ├── requirements.txt
    #     ├── Dockerfile

    remote_agent = client.agent_engines.create(
        config={
            "source_packages": [
                "agent.py",
                "main.py",
                "requirements.txt",
                "Dockerfile",
            ],
            "image_spec": {},  # tells Agent Runtime to use the Dockerfile
            # Other optional configs
            "display_name": "Dockerfile agent",
        }
    )

### Container Image

To deploy from a container image, first follow the setup instructions for
[Bring your own container](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#byoc),
making sure to install a version of `google-cloud-aiplatform` satisfying
`>=1.144`. Next, run the following code:

    remote_agent = client.agent_engines.create(
        config={
            "container_spec": {
                "image_uri": "CONTAINER_IMAGE_URI",
            },
            # Other optional configs
            "display_name": "Container image agent",
        },
    )

Where `CONTAINER_IMAGE_URI` corresponds to the URI of the
container image in Artifact Registry (such as `us-central1-docker.pkg.dev/my-project/my-repo/my-image:tag`).

Deployment latency depends on the total time it takes to install required
packages. Once deployed, `remote_agent` corresponds to an instance of
`local_agent` that is running on Agent Platform and can be queried or
deleted.

The `remote_agent` object corresponds to an
[`AgentEngine`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.AgentEngine) class that contains the following:

- [`remote_agent.api_resource`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.ReasoningEngine) with information about the deployed agent. You can also call `remote_agent.operation_schemas()` to return the list of operations that the `remote_agent` supports. See [Supported operations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#supported-operations) for details.
- [`remote_agent.api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AgentEngines) that allows for synchronous service interactions
- [`remote_agent.async_api_client`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.agent_engines.AsyncAgentEngines) that allows for asynchronous service interactions

## Optional: Get the agent resource ID

Each deployed agent has a unique identifier. You can run the following command
to get the resource name for your deployed agent:

    remote_agent.api_resource.name

The response should look like the following string:

    "projects/PROJECT_NUMBER/locations/LOCATION/reasoningEngines/RESOURCE_ID"

where

- `PROJECT_ID` is the Google Cloud [project ID](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#project)
  where the deployed agent runs.

- `LOCATION` is the [region](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations#supported-regions-agent-engine)
  where the deployed agent runs.

- `RESOURCE_ID` is the ID of the deployed agent as a
  [`reasoningEngine` resource](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.reasoningEngines).

## Optional: List the supported operations

Each deployed agent has a list of supported operations. You can use the
[`AgentEngine.operation_schemas`](https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai._genai.types.AgentEngine#vertexai__genai_types_AgentEngine_operation_schemas)
to get the list of operations supported by the deployed agent:

    remote_agent.operation_schemas()

The schema for each operation is a dictionary that documents the information of
a method for the agent that you can call. The set of supported operations
depends on the framework you used to develop your agent:

- [Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-adk-agent#supported-operations)
- [Agent2Agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-a2a-agent#supported-operations)
- [LangChain](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langchain-agent#supported-operations)
- [LangGraph](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-langgraph-agent#supported-operations)
- [AG2](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-ag2-agent#supported-operations)
- [LlamaIndex](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-llamaindex-agent#supported-operations)
- [Custom](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-a-custom-agent#custom-methods)

## Optional: Grant the deployed agent permissions

If the deployed agent needs to be granted any additional permissions, follow the
instructions in [Set up the identity and permissions for your agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/setup#identity-and-permissions).

## What's next

Guide

### [Manage deployed agents](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-deployed-agents)

Learn how to manage agents that have been deployed to the Agent Platform managed runtime.

Guide

### [Use an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/use-an-agent)

Use an agent with Agent Platform Runtime.
