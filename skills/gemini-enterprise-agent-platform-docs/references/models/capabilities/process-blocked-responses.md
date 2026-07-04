When interacting with Gemini on Gemini Enterprise Agent Platform, your requests
(prompts) or the generated responses might be blocked by content filters. This
document provides guidance on how to identify and process these blocked
responses.

## When is content blocked?

There are two scenarios for content filters blocking content:

- The input prompt is blocked.
- The model's response is blocked.

The sections that follow describe how to process each scenario.

### The input prompt is blocked

If your input prompt is blocked by content filters before it is sent to the
model, the API response exhibits the following characteristics:

- The [`promptFeedback`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/GenerateContentResponse#PromptFeedback) field is populated. This field contains information about why the prompt is blocked.
- The [`candidates`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/GenerateContentResponse) field isn't set.

### The model's response is blocked

If the model generates a response but that response is blocked by content
filters, the API response exhibits the following characteristics:

- The [`promptFeedback`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/GenerateContentResponse#PromptFeedback) field isn't set.
- The [`candidates`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/GenerateContentResponse) field is set with the following characteristics:
  - The [`content`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/Content) field isn't set.
  - The [`finishReason`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/GenerateContentResponse#FinishReason) field is set and indicates why response generation stopped.

You can determine why the content was blocked by inspecting these fields in the
API response.

## What's next

- Learn how to [configure content filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/configure-safety-filters).
