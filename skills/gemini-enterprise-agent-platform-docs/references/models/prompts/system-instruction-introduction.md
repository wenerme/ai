> [!NOTE]
> To see an example of system instructions,
> run the "Intro to Gemini 3.5 Flash" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_5_flash.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_3_5_flash.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/getting-started/intro_gemini_3_5_flash.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_3_5_flash.ipynb)

This document describes what system instructions are and best practices for
writing effective system instructions. To learn how to add system instructions
to your prompts, see
[Use system instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instructions)
instead.

System instructions are a set of instructions that the model processes before it
processes prompts. We recommend that you use system instructions to tell the
model how you want it to behave and respond to prompts. For example, you can
include things like a persona to adopt, contextual information, and formatting
instructions.

System instructions are especially useful in cases when you want to provide the
model with information that an end user can't see or change, which can help you
give the model additional context to understand the task, provide more
customized responses, adhere to specific guidelines over the full user
interaction with the model. Additionally, system instructions are beneficial
when you want to run multiple prompts with the same set of instructions.

When system instructions are set, they apply to the entire request. System
instructions work across multiple user and model turns when included in the
prompt. Though system instructions are separate from the contents of the prompt,
they're still part of your overall prompts and therefore subject to standard
data use policies.

> [!NOTE]
> **Note:** System instructions can help guide the model to follow instructions, but they don't fully prevent jailbreaks or leaks. We recommend exercising caution around putting any sensitive information in system instructions.

## Use cases

Generally, we recommend using system instructions to do one or more of the
following:

- Define a persona or role
- Define output format
- Define output style and tone
- Define goals or rules for the task
- Provide additional context for the prompt

### Persona or role

You can influence how a model responds to prompts by defining a persona or
role in system instructions.

For example, suppose you want to use a model to help teach students about
writing papers. Compare the difference in the model's responses when you
define the following roles:

- You are a bot, tasked with teaching college students about how to write a paper about a given subject.
- You are a bot, tasked with helping primary school students about how to write a paper about a given subject.

| System instructions | Bot for college students | Bot for primary school students |
| System instructions |
|---|---|---|
| **You are a bot, tasked with teaching college students** about how to write a paper about a given subject. | **You are a bot, tasked with helping primary school students** about how to write a paper about a given subject. |

### Output format

You can influence how a model formats its response by defining an output
format, such as Markdown or JSON, in system instructions.

For example, suppose you want to use a model to summarize customer reviews
for your business. Compare the difference in the model's responses when you
define the following output formats:

- Output your response in JSON. At the very end, outside the JSON object, write 3-5 sentences of advice to the business on how to improve.
- No formatting requirements.

| System instructions | JSON | No formatting requirements |
| System instructions |
|---|---|---|
| You are a PR professional for high-end businesses. Follow these instructions, and base your response on the provided User Input. Instructions: - Read through reviews submitted to you. - Summarize the pros and cons of the business based on reviews. **- Output your response in JSON. - At the very end, outside the JSON object, write 3 to 5 sentences of advice to the business on how to improve.** - Keep it concise. - Stick to the facts. - Do not hallucinate. - If there are conflicting opinions, only include the opinion that is recorded the most. - Do not include any irrelevant information. - Do not mention any reviewers by name. | You are a PR professional for high-end businesses. Follow these instructions, and base your response on the provided User Input. Instructions: - Read through reviews submitted to you. - Summarize the pros and cons of the business based on reviews. - Keep it concise. - Stick to the facts. - Do not hallucinate. - If there are conflicting opinions, only include the opinion that is recorded the most. - Do not include any irrelevant information. - Do not mention any reviewers by name. |

### Style and tone

You can influence a model's response by defining its output style and tone,
such as verbosity, formality, and target reading level, in system
instructions.

For example, suppose you want to use a model to write proposals for
government initiatives. Compare the difference in the model's responses when
you define the following tones:

- Professional
- Casual

| System instructions | Professional | Casual |
| System instructions |
|---|---|---|
| You are a government proposal writer. You are tasked with producing proposals for future campaigns. Based on the template and user input, provide a proposal for the upcoming campaign. - Do not use the internet. - Keep answers for each section to no more than two sentences. - **Write in a professional tone.** - Provide answers in Markdown format. Proposal template: - The Big Idea: - The Challenge - The Solution - Target Audience - Key Message - Channels - Content Highlights - Expected Results - Why Us - Call to Action | You are a government proposal writer. You are tasked with producing proposals for future campaigns. Based on the template and user input, provide a proposal for the upcoming campaign. - Do not use the internet. - Keep answers for each section to no more than two sentences. - **Write in a casual tone.** - Provide answers in Markdown format. Proposal template: - The Big Idea: - The Challenge - The Solution - Target Audience - Key Message - Channels - Content Highlights - Expected Results - Why Us - Call to Action |

### Goals and rules

You can influence a model's response by defining goals or rules, in other
words, what the model should or shouldn't do, in system instructions.

For example, suppose you want to use a model to write Python code. Compare
the difference in the model's responses when you define the following rules:

- When generating code, make sure to include docstrings explaining the inputs, outputs, and usage of every method.
- Only generate code, do not include any docstrings.

| System instructions | Docstrings | No docstrings |
| System instructions |
|---|---|---|
| When generating code, make sure to include docstrings explaining the inputs, outputs, and usage of every method. | Only generate code, do not include any docstring. |

### Context

You can influence how a model responds to prompts by adding additional
context in system instructions.

For example, suppose you want to use a model to write speeches for events.
Compare the difference in the model's responses when you provide the
following context:

- Things to include in the speech.
- No extra context.

| System instructions | Things to include in the speech | No extra context |
| System instructions |
|---|---|---|
| Help the user write a speech based on the information provided: - Event - Audience Size - Speaker Information (name, age, etc.) - Speech Tone - Speech Length - Miscellaneous If the user does not provide all of this information, please respond with, "I'm sorry, but I do not have all of the necessary information to create a speech. Please provide the event, audience size, speaker information, tone, length, and any miscellaneous information." **Some general things to include are: - Breaks for pause - An intriguing hook - A closing remark to keep the speech memorable - A joke** | Help the user write a speech based on the information provided: - Event - Audience Size - Speaker Information (name, age, etc.) - Speech Tone - Speech Length - Miscellaneous If the user does not provide all of this information, please respond with, "I'm sorry, but I do not have all of the necessary information to create a speech. Please provide the event, audience size, speaker information, tone, length, and any miscellaneous information." |

## What's next

- Learn how to [use system instructions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instructions)
- Explore more examples of prompts in the [Prompt gallery](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/prompt-gallery).
