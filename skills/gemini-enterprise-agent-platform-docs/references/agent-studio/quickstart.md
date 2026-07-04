You can use [Agent Studio](https://console.cloud.google.com/agent-platform/studio/) to design,
test, and manage prompts for Google's
[Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models) large language models (LLMs) and
partner and open models. Agent Studio supports certain partner and open models that are
offered on Agent Platform as
[models as a service (MaaS)](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/use-partner-models),
such as Anthropic Claude models and Meta's Llama models.

> [!NOTE]
> **Note:** On your initial use for partner and open models, Agent Platform prompts you to accept the partner and open's terms and conditions. You must do this once for each partner and open provider to start using their models.

In this quickstart, you:

- Send these prompts to the Agent Platform API using samples from the generative AI prompt gallery, including the following:
  - A summarization text prompt
  - A code generation prompt
- View the code used to generate the responses

## Sample prompts in Agent Studio

A prompt is a natural language request submitted to a language model that
generates a response. Prompts can contain questions, instructions, contextual
information,
[few-shot examples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/introduction-prompt-design#few-shot-examples),
and partial input for the model to complete. After the model receives a prompt,
depending on the type of model used, it can generate text, embeddings, code,
images, videos, music, and more.

The sample prompts in [Agent Studio](https://console.cloud.google.com/agent-platform/studio/)
[Prompt Gallery](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/prompt-gallery) are predesigned to help
demonstrate model capabilities. Each prompt is preconfigured with specified
model and parameter values so you can open the sample prompt and click
**Submit** to generate a response.

## Test the Gemini flash model using a summarization text prompt

Send a summarization text prompt to the Agent Platform API. A summarization
task extracts the most important information from text. You can provide
information in the prompt to help the model create a summary, or ask the model
to create a summary on its own.

1. Go to the **Prompt Gallery** page from the Agent Platform
   section in the Google Cloud console.

   [Go to Prompt Gallery](https://console.cloud.google.com/agent-platform/studio/prompt-gallery)

2. In the **Tasks** drop-down menu, select **Summarize**.

3. Open the **Audio Summarization** card.

   This sample prompt includes an audio file and requests a summary of the file
   contents in a bulleted list.
4. Notice that in the settings panel, the model's default value is set to
   **gemini-3.1-pro-preview** . You can choose a different Gemini model
   by clicking **Switch model**.

5. Click **Submit** to generate the
   summary.

   The output is displayed in the response.
6. To view the Gemini Enterprise Agent Platform code used to generate the transcript
   summary, click **Code**.

   In the **Get code** panel, you can choose your preferred language to get the
   sample code for the prompt, or you can open the Python code in a
   Colab Enterprise notebook.

## Test the Gemini flash model using a code generation prompt

Send a code generation prompt to the Agent Platform API. A code generation task
generates code using a natural language description.

1. Go to the **Prompt Gallery** page from the Agent Platform
   section in the Google Cloud console.

   [Go to Prompt Gallery](https://console.cloud.google.com/agent-platform/studio/prompt-gallery)

2. In the **Tasks** drop-down menu, select **Code**.

3. Open the **Generate code from comments** card.

   This sample prompt includes a [system instruction](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instruction-introduction)
   that tells the model how to respond and some incomplete Java methods.
4. Notice that in the settings panel, the model's default value is set to
   **gemini-3.1-pro-preview** . You can choose a different Gemini model
   by clicking **Switch model**.

5. To complete each method by generating code in the areas marked
   `<WRITE CODE HERE>`, click **Submit** .

   The output is displayed in the response.
6. To view the Gemini Enterprise Agent Platform code used to generate the transcript summary,
   click **Code**.

   In the **Get code** panel, you can choose your preferred language to get the
   sample code for the prompt, or you can open the Python code in a
   Colab Enterprise notebook.

## What's next

Overview

### [Build overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build)

Learn how to build agents in Google Agent Platform.

Guide

### [Agent Studio capabilities](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/agent-studio-capabilities)

Learn about the capabilities of Agent Studio.

Guide

### [Deploy your prompt as a web application](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/deploy-vais-prompt)

Follow the guide to deploy your prompt as a web application from Agent Studio.
