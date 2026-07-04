> [!WARNING]
> **Preview:** This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the [Service Specific Terms](https://cloud.google.com/terms/service-terms#1). When you use this feature with AI Agents, the terms applicable to AI Agents in the Agreement apply. Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products#product-launch-stages).

> [!NOTE]
> To see an example of creating and managing skills in Skill Registry,
> run the "Intro to Skill Registry" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/agents/skill-registry/intro_skill_registry.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fagents%2Fskill-registry%2Fintro_skill_registry.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/agents/skill-registry/intro_skill_registry.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/agents/skill-registry/intro_skill_registry.ipynb)

This guide explains how to create, update, and manage skills in the Skill
Registry using the REST API.

## Before you begin

Before using Skill Registry, set up your environment:

> [!NOTE]
> **Note:** For read-only access, the `roles/aiplatform.viewer` role is sufficient. Skill Registry inherits project-level permissions.

## Compliance

The following table summarizes the compliance status:

| Feature | Status |
|---|---|
| Access Transparency | Supported |
| Data Residency (DRZ) in US and EU | Supported |
| Customer-Managed Encryption Keys (CMEK) | Not Supported |
| HIPAA certification | Not Supported |
| VPC-SC | Not Supported |

## Available regions

Skill Registry is available in the following regions:

| Region | Location |
|---|---|
| `us-central1` | Iowa |
| `europe-west4` | Netherlands |
| `us-east5` | Columbus, Ohio |

## Create a skill

To create a new skill, use the `CreateSkill` method. This operation is a
[long-running operation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#get-details-of-lro).

For examples of the expected skill structure, see the `SKILL.md` files in the
[Google Cloud Skills repository](https://github.com/google/skills/tree/main).

### REST

The following sections describe how to use the REST API to create a skill.

#### Prepare payload

Before calling the API, package your skill files into a zipped archive and
encode it to a single-line base64 string. To prepare the payload, follow these
steps:

> [!NOTE]
> **Note:** The zipped payload must meet specific size and content requirements for successful ingestion. For more information, see [Skill payload validation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry#skill-payload-validation).

1. Navigate to your skill directory:

       cd <SKILL_DIRECTORY>

2. Create the zip archive and encode it to base64.

   For example:

       zip -r skill.zip scripts/ references/ SKILL.md assets/ && base64 -w 0 -i skill.zip

#### Request variables

Before using any of the request data, make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.

- <var translate="no">LOCATION</var>: The region for your skill. For more information, see [Available regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#available-regions).

- <var translate="no">SKILL_ID</var>: The `SKILL_ID` is immutable and remains permanently
  reserved once created, even if you delete the skill later. Skill IDs must
  adhere to the following constraints:

  - Must be 1 to 63 characters long.
  - Must contain only lowercase letters, numbers, and hyphens.
  - Must start with a letter and end with a letter or number.
  - Must not start with `gcp-` (this prefix is reserved for built-in skills).

> [!NOTE]
> **Note:** Use a descriptive `SKILL_ID`. Since the `SKILL_ID` becomes the folder name when the skill is attached to an agent, a meaningful name helps the model understand the skill's purpose.

- <var translate="no">DISPLAY_NAME</var>: The name of the skill used with the agent. The
  `RetrieveSkills` method uses the display name and description to search for
  relevant skills.

- <var translate="no">DESCRIPTION</var>: A description of what the skill does.

- <var translate="no">BASE64_ZIPPED_BODY</var>: The base64-encoded content of your zipped skill
  archive.

#### HTTP method and URL

    POST https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills?skillId=SKILL_ID

#### Request JSON body

    {
    "displayName": "DISPLAY_NAME",
    "description": "DESCRIPTION",
    "zippedFilesystem": "BASE64_ZIPPED_BODY"
    }

#### `curl` command

    curl -X POST \
        -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
        -H "Content-Type: application/json" \
        -d '{
          "displayName": "DISPLAY_NAME",
          "description": "DESCRIPTION",
          "zippedFilesystem": "BASE64_ZIPPED_BODY"
        }' \
        "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills?skillId=SKILL_ID"

### Python

Organize skill files (such as `SKILL.md`, instructions, and code files) in a
local directory. The SDK supports passing either a local directory path (which
is automatically compressed) or a pre-zipped path.

For `google-cloud-aiplatform` (which provides `agentplatform`) version `1.154.0` and later:

    import agentplatform

    client = agentplatform.Client(project="PROJECT_ID", location="LOCATION")

    skill = client.skills.create(
        skill_id="SKILL_ID",
        display_name="DISPLAY_NAME",
        description="DESCRIPTION",
        config={
            # Local directory path (automatically compressed) or pre-zipped path (.zip)
            "local_path": "SKILL_PATH",
        },
    )
    print(skill.name)

For `google-cloud-aiplatform` (which provides `agentplatform`) versions older than `1.154.0`:

    import agentplatform

    client = agentplatform.Client(project="PROJECT_ID", location="LOCATION")

    skill = client.skills.create(
        display_name="DISPLAY_NAME",
        description="DESCRIPTION",
        config={
            "skill_id": "SKILL_ID",
            # Local directory path (automatically compressed) or pre-zipped path (.zip)
            "local_path": "SKILL_PATH",
        },
    )
    print(skill.name)

### Node.js

Organize skill files (such as `SKILL.md`, instructions, and code files) in a
local directory. The SDK supports passing either a local directory path (which
is automatically compressed) or a pre-zipped path.

    import { Client } from '@google-cloud/agentplatform';

    const client = new Client({
      project: 'PROJECT_ID',
      location: 'LOCATION',
    });

    const skill = await client.skills.create({
      skillId: 'SKILL_ID',
      displayName: 'DISPLAY_NAME',
      description: 'DESCRIPTION',
      config: {
        // Local directory path (automatically compressed) or pre-zipped path (.zip)
        localPath: 'SKILL_PATH',
      },
    });
    console.log(skill.name);

## Update a skill

To update an existing skill, use the `UpdateSkill` method. This operation is
a [long-running operation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#get-details-of-lro).

You can update an existing skill's display name, description, and payload
(zipped filesystem). Only the fields listed in the `updateMask` query parameter
get updated.

### REST

The following sections describe how to use the REST API to update a skill.

#### Prepare payload

Optional. If you are updating the skill's files, package your updated skill
files into a zipped archive and encode it to a single-line base64 string:

> [!NOTE]
> **Note:** The zipped payload must meet specific size and content requirements for successful ingestion. For more information, see [Skill payload validation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry#skill-payload-validation).

1. Navigate to your skill directory:

       cd <SKILL_DIRECTORY>

2. Create the zip archive and encode it to base64:

       zip -r skill.zip scripts/ references/ SKILL.md assets/ && base64 -w 0 -i skill.zip

#### Request variables

Before using any of the request data, make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: The region of the skill. For more information, see [Available regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#available-regions).
- <var translate="no">SKILL_ID</var>: The ID of the skill to update.
- <var translate="no">DISPLAY_NAME</var>: Optional. A new name for the skill.
- <var translate="no">DESCRIPTION</var>: Optional. A new description of what the skill does.
- <var translate="no">BASE64_ZIPPED_BODY</var>: Optional. The base64-encoded content of your updated zipped skill archive.

#### HTTP method and URL

    PATCH https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID

#### Request JSON body

    {
    "displayName": "DISPLAY_NAME",
    "description": "DESCRIPTION",
    "zippedFilesystem": "BASE64_ZIPPED_BODY"
    }

#### `curl` command

The following `curl` command updates the display name, description, and zipped
skill file.

    curl -X PATCH \
        -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
        -H "Content-Type: application/json; charset=utf-8" \
        -d '{
          "displayName": "DISPLAY_NAME",
          "description": "DESCRIPTION",
          "zippedFilesystem": "BASE64_ZIPPED_BODY"
        }' \
        "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID?updateMask=displayName,description,zippedFilesystem"

### Python

The SDK supports updating the skill files by passing either an unzipped local
directory path or a pre-zipped path.

    import agentplatform

    client = agentplatform.Client(project="PROJECT_ID", location="LOCATION")

    skill = client.skills.update(
        name="projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID",
        config={
            "display_name": "DISPLAY_NAME",
            "description": "DESCRIPTION",
            # Optional. Local directory path (automatically compressed) or pre-zipped path (.zip)
            "local_path": "SKILL_PATH",
        },
    )
    print(skill.name)

### Node.js

The SDK supports updating the skill files by passing either an unzipped local
directory path or a pre-zipped path.

    import { Client } from '@google-cloud/agentplatform';

    const client = new Client({
      project: 'PROJECT_ID',
      location: 'LOCATION',
    });

    const skill = await client.skills.update({
      name: 'projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID',
      config: {
        displayName: 'DISPLAY_NAME',
        description: 'DESCRIPTION',
        // Optional. Local directory path (automatically compressed) or pre-zipped path (.zip)
        localPath: 'SKILL_PATH',
      },
    });
    console.log(skill.name);

## List skills

To retrieve summary metadata for skills in a specific location (including the
name, display name, and description), use the `ListSkills` method.

### REST

The following sections describe how to use the REST API to list skills.

#### Request variables

Before using any of the request data, make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: The region of the skills you want to list. For more information, see [Available regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#available-regions).

#### HTTP method and URL

    GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills

#### `curl` command

    curl -X GET \
          -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
          "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills"

#### Example output

    {
    "name": "projects/1234567890/locations/us-central1/skills/3456789012",
    "createTime": "2026-05-10T00:02:12.497720Z",
    "updateTime": "2026-05-10T00:02:19.064874Z",
    "displayName": "cymbal_skill",
    "description": "A skill for managing Cymbal projects.",
    "state": "ACTIVE"
    }

### Python

    import agentplatform

    client = agentplatform.Client(project="PROJECT_ID", location="LOCATION")

    pager = client.skills.list()
    for skill in pager:
        print(skill.name, skill.display_name)

### Node.js

    import { Client } from '@google-cloud/agentplatform';

    const client = new Client({
      project: 'PROJECT_ID',
      location: 'LOCATION',
    });

    const pager = await client.skills.list();
    for await (const skill of pager) {
      console.log(skill.name, skill.displayName);
    }

## Get a skill

To retrieve the metadata and payload of the latest revision of a skill,
use the `GetSkill` method.

### REST

The following sections describe how to use the REST API to get a skill.

#### Request variables

Before using any of the request data, make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: The region where the skills are located. For more information, see [Available regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#available-regions).
- <var translate="no">SKILL_ID</var>: The ID of the skill to retrieve.

#### HTTP method and URL

    GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID

#### `curl` command

    curl -X GET \
          -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
          "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID"

### Python

    import agentplatform

    client = agentplatform.Client(project="PROJECT_ID", location="LOCATION")

    skill = client.skills.get(
        name="projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID"
    )
    print(skill)

### Node.js

    import { Client } from '@google-cloud/agentplatform';

    const client = new Client({
      project: 'PROJECT_ID',
      location: 'LOCATION',
    });

    const skill = await client.skills.get({
      name: 'projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID',
    });
    console.log(skill);

## Delete a skill

To delete a skill and all of its revisions, use the `DeleteSkill` method.
This operation is a [long-running operation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#get-details-of-lro).

> [!NOTE]
> **Note:** You cannot delete built-in skills that have IDs starting with `gcp-`.

> [!CAUTION]
> **Caution:** When you delete a skill, its `SKILL_ID` is reserved and cannot be reused for 24 hours.

### REST

The following sections describe how to use the REST API to delete a skill.

#### Request variables

Before using any of the request data, make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: The region where the skill you want to delete is located. For more information, see [Available regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#available-regions).
- <var translate="no">SKILL_ID</var>: The ID of the skill to delete.

#### HTTP method and URL

    DELETE https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID

#### `curl` command

    curl -X DELETE \
          -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
          "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID"

### Python

    import agentplatform

    client = agentplatform.Client(project="PROJECT_ID", location="LOCATION")

    client.skills.delete(
        name="projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID"
    )

### Node.js

    import { Client } from '@google-cloud/agentplatform';

    const client = new Client({
      project: 'PROJECT_ID',
      location: 'LOCATION',
    });

    await client.skills.delete({
      name: 'projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID',
    });

## List skill revisions

To retrieve the revision history for a specific skill, use the `ListSkillRevisions`
method.

### REST

The following sections describe how to use the REST API to list skill revisions.

#### Request variables

Before using any of the request data, make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: The region where the skills you want are located. For more information, see [Available regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#available-regions).
- <var translate="no">SKILL_ID</var>: The ID of the skill.

#### HTTP method and URL

    GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID/revisions

#### `curl` command

    curl -X GET \
          -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
          "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID/revisions"

#### Example output

    {
      "skillRevisions": [
        {
          "name": "projects/1234567890/locations/us-central1/skills/cymbal_skill/revisions/4567890123",
          "createTime": "2026-05-10T00:02:12.497720Z",
          "updateTime": "2026-05-10T00:02:19.064874Z"
        }
      ]
    }

### Python

    import agentplatform

    client = agentplatform.Client(project="PROJECT_ID", location="LOCATION")

    response = client.skills.revisions.list(
        name="projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID"
    )
    for skill_revision in response.skill_revisions:
        print(skill_revision.name, skill_revision.create_time)

### Node.js

    import { Client } from '@google-cloud/agentplatform';

    const client = new Client({
      project: 'PROJECT_ID',
      location: 'LOCATION',
    });

    const response = await client.skills.revisions.list({
      name: 'projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID',
    });
    for (const revision of response.skillRevisions || []) {
      console.log(revision.name, revision.createTime);
    }

## Get a skill revision

To retrieve a specific revision of a skill, use the `GetSkillRevision` method.

### REST

The following sections describe how to use the REST API to get a skill revision.

#### Request variables

Before using any of the request data, make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: The region of the skill. For more information, see [Available regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#available-regions).
- <var translate="no">SKILL_ID</var>: The ID of the skill.
- <var translate="no">REVISION_ID</var>: The ID of the specific revision to retrieve. This can be found in the `name` field returned by the [`ListSkillRevisions` method](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#list-skill-revisions). For example, if the `name` is `projects/1234567890/locations/us-central1/skills/cymbal-skill/revisions/4567890123`, the revision ID is `4567890123`.

#### HTTP method and URL

    GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID/revisions/REVISION_ID

#### `curl` command

    curl -X GET \
          -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
          "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID/revisions/REVISION_ID"

### Python

    import agentplatform

    client = agentplatform.Client(project="PROJECT_ID", location="LOCATION")

    revision = client.skills.revisions.get(
        name="projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID/revisions/REVISION_ID"
    )
    print(revision)

### Node.js

    import { Client } from '@google-cloud/agentplatform';

    const client = new Client({
      project: 'PROJECT_ID',
      location: 'LOCATION',
    });

    const revision = await client.skills.revisions.get({
      name: 'projects/PROJECT_ID/locations/LOCATION/skills/SKILL_ID/revisions/REVISION_ID',
    });
    console.log(revision);

## Retrieve skills

Use the `RetrieveSkills` method to find skills using semantic search. For
example, you can search for skills by describing the task you want to
accomplish, such as `find skills to manage cloud resources`.

### REST

The following sections describe how to use the REST API to retrieve skills.

#### Request variables

Before using any of the request data, make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: The region where the skills you want to search are located. For more information, see [Available regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#available-regions).
- <var translate="no">QUERY</var>: The query string to find matching skills.

#### HTTP method and URL

    GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills:retrieve?query=QUERY

#### `curl` command

    curl -X GET \
          -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
          "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/skills:retrieve?query=QUERY"

### Python

    import agentplatform

    client = agentplatform.Client(project="PROJECT_ID", location="LOCATION")

    response = client.skills.retrieve(
        query="QUERY",
        config={"top_k": TOP_K},
    )
    for retrieved_skill in response.retrieved_skills:
        print(retrieved_skill.skill_name, retrieved_skill.description)

### Node.js

    import { Client } from '@google-cloud/agentplatform';

    const client = new Client({
      project: 'PROJECT_ID',
      location: 'LOCATION',
    });

    const response = await client.skills.retrieve({
      query: 'QUERY',
      config: {
        topK: TOP_K,
      },
    });
    for (const retrievedSkill of response.retrievedSkills || []) {
      console.log(retrievedSkill.skillName, retrievedSkill.description);
    }

## Get details of a long-running operation

Some methods in the Skill Registry API, such as `CreateSkill`, `UpdateSkill`,
and `DeleteSkill`, are asynchronous and return a long-running operation.
A long-running operation is an API pattern used for operations that can take a
significant amount of time to complete. Instead of waiting for the operation to
finish, the API returns an operation resource.

The response from these methods includes a `name` field, which contains the
operation ID. For example, a `name` might look like this:
`projects/PROJECT_NUMBER/locations/LOCATION/skills/SKILL_ID/operations/OPERATION_ID`.

To check the status and get details of a long-running operation, use the
`GetOperation` method with the extracted `OPERATION_ID`.

### REST

The following sections describe how to use the REST API to get an operation.

#### Request variables

Before using any of the request data, make the following replacements:

- <var translate="no">PROJECT_ID</var>: Your Google Cloud project ID.
- <var translate="no">LOCATION</var>: The region where the operation is running. This must match the region used in your initial request. For more information, see [Available regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry/create-manage#available-regions).
- <var translate="no">OPERATION_ID</var>: The ID of the operation. Extract this from the `name` field returned by `CreateSkill`, `UpdateSkill`, or `DeleteSkill`.

#### HTTP method and URL

    GET https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID

#### `curl` command

    curl -X GET \
          -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
          "https://LOCATION-aiplatform.googleapis.com/v1beta1/projects/PROJECT_ID/locations/LOCATION/operations/OPERATION_ID"

## What's next

Guide

### [Attach skills to an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/managed-agents/create-manage#create-attach-skills)

Learn how to attach registered skills when creating or updating an agent using Managed Agents API on Agent Platform.

Guide

### [ADK Skill Registry integration](https://adk.dev/integrations/skills-registry/)

Learn how to integrate with Skill Registry in ADK.
