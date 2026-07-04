## Before you begin

To ensure that the Compute Engine default service account
has the necessary permissions to optimize prompts, ask your administrator to
grant the following IAM roles on the project to it and to
a user account that has the Agent Platform User (`roles/aiplatform.user`)
role:

> [!IMPORTANT]
> Important: You must grant these roles to the Compute Engine default service account, along with a user account that has the Agent Platform User (`roles/aiplatform.user`) role. Failure to grant the roles to the correct principals might result in permission errors.

- Agent Platform User (`roles/aiplatform.user`)
- Agent Platform Service Agent (`roles/aiplatform.serviceAgent`)

For more information about granting roles, see
Manage access to projects, folders, and organizations.

Your administrator might also be able to give the
Compute Engine default service account
and your user account the required permissions through
custom roles or other
predefined roles.

## Optimize a prompt

```
# Import libraries
import https://docs.cloud.google.com/python/docs/reference/agentplatform/latest
import logging

# Google Colab authentication
from google.colab import auth
PROJECT_NAME = "PROJECT"
auth.authenticate_user(project_id=PROJECT_NAME)

# Initialize the Agent Platform client
client = https://docs.cloud.google.com/python/docs/reference/agentplatform/latest.Client(project=PROJECT_NAME, location='us-central1')

# Input original prompt to optimize
prompt = """You are a professional chef. Your goal is teaching how to cook healthy cooking recipes to your apprentice.

Given a question from your apprentice and some context, provide the correct answer to the question.
Use the context to return a single and correct answer with some explanation.
"""

# Optimize prompt
output = client.https://docs.cloud.google.com/python/docs/reference/agentplatform/latest/vertexai._genai.prompt_optimizer.html.optimize_prompt(prompt=prompt)

# View optimized prompt
print(output.model_dump_json(indent=2))

```

This `output` object is of type `OptimizeResponse` and provides information
about the optimization process. The most important part is the
`suggested_prompt` which contains the optimized prompt that you can use to get
better results from your model. The other fields, especially
`applicable_guidelines`, are useful for understanding why and how your prompt
was improved, which can help you write better prompts in the future. Here's an
example of the output:

```
{
  "optimization_mode": "zero_shot",
  "applicable_guidelines": [
      "applicable_guideline": "Structure",
      "suggested_improvement": "Add role definition.",
      "text_before_change": "...",
      "text_after_change": "Role: You are an AI assistant...\n\nTask Context:\n..."
    },
      "applicable_guideline": "RedundancyInstructions",
      "suggested_improvement": "Remove redundant explanation.",
      "text_after_change": ""
    }
  ],
  "original_prompt": "...",
  "suggested_prompt": "Role: You are an AI assistant...\n\nTask Context:\n..."

```

### Optimizing for smaller models

Smaller models like Gemma 3n E4B have different instruction-following
capabilities than larger models. Prompts that perform well for large models
might not be optimal for these smaller models. The zero-shot optimizer provides
a `gemini_nano` mode to address this issue. The `gemini_nano` mode refines your
prompt to align specifically with the characteristics of smaller models, which
helps to generate prompts that better fit the capabilities of smaller models.

The following example shows how to optimize a prompt for smaller models:

```
client = vertexai.Client(project=PROJECT_NAME, location='us-central1')
prompt = 'Generate system instructions for analyzing medical articles'

# optimize_prompt returns OptimizeResponse type, which has 2 fields: raw_text_response and parsed_response
# raw_text_response is guaranteed and always will be given to the user.
# parsed_response is not guaranteed. If parsing is possible, the parsed response is stored in this field.
#    parsed_response contains the following 4 fields:
#    optimization_type, applicable_guidelines, original_prompt, suggested_prompt
response = client.prompt_optimizer.optimize_prompt(
    prompt=prompt,
    config=vertexai.types.OptimizeConfig(
        optimization_target=vertexai.types.OptimizeTarget.OPTIMIZATION_TARGET_GEMINI_NANO
        )

# print(response.raw_text_response)
print(response.parsed_response.suggested_prompt)
```
