This document describes how to use prompt templates. A prompt template is a
prompt that includes replaceable variables. Prompt templates enable you to test
how different prompt formats perform with different prompt data, without
requiring you to write multiple individual prompts.

Prompt template variables must meet the following requirements:

- Variables must be wrapped in curly-braces.
- Variable names must not contain spaces.

For example, consider the following prompts and their corresponding system
instructions:

- **System instructions**: Respond to the question concisely.
- **Prompts** :
  - Do coyotes eat berries?
  - Do eagles swim?
  - Do squirrels dig holes?

The corresponding prompt template would be similar to the following:

- **Prompt template** : `Do {animal_name} {animal_activity}?`
- **Variable replacements**:

  | `animal_name` replacements | `animal_activity` replacements |
  |---|---|
  | Coyotes | eat berries |
  | Eagles | swim |
  | Squirrels | dig holes |

## Limitations

- System instructions are not supported as a replaceable variable in prompt templates.
- Prompt templates don't support multimodal prompts.

## What's next

- Start prompting in the [Vertex AI Studio](https://console.cloud.google.com/agent-platform/studio/multimodal;mode=prompt).
- Learn more about [prompting strategies](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/prompt-design-strategies).
- Learn about [responsible AI best practices and Agent Platform's safety filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
