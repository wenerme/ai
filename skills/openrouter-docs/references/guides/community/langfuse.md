> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Langfuse

> Using OpenRouter with Langfuse

export const LlmsOnly = ({children}) => null;

export const API_KEY_REF = '<OPENROUTER_API_KEY>';

<Tip>
  Looking to auto-instrument without client code? Check out [OpenRouter Broadcast](/docs/guides/features/broadcast/langfuse) to automatically send traces to Langfuse.
</Tip>

## Using Langfuse

[Langfuse](https://langfuse.com/) provides observability and analytics for LLM applications. Since OpenRouter uses the OpenAI API schema, you can use Langfuse's native integration with the OpenAI SDK to automatically trace and monitor your OpenRouter API calls.

### Installation

```bash lines theme={null}
pip install langfuse openai
```

### Configuration

Set up your environment variables:

<CodeGroup>
  ```python title="Environment Setup" lines theme={null}
  import os

  # Set your Langfuse API keys
  LANGFUSE_SECRET_KEY="sk-lf-..."
  LANGFUSE_PUBLIC_KEY="pk-lf-..."
  # EU region
  LANGFUSE_HOST="https://cloud.langfuse.com"
  # US region
  # LANGFUSE_HOST="https://us.cloud.langfuse.com"

  # Set your OpenRouter API key
  os.environ["OPENAI_API_KEY"] = "<OPENROUTER_API_KEY>"
  ```
</CodeGroup>

### Simple LLM Call

Since OpenRouter provides an OpenAI-compatible API, you can use the Langfuse OpenAI SDK wrapper to automatically log OpenRouter calls as generations in Langfuse:

<CodeGroup>
  ```python title="Basic Integration" expandable lines theme={null}
  # Import the Langfuse OpenAI SDK wrapper
  from langfuse.openai import openai

  # Create an OpenAI client with OpenRouter's base URL
  client = openai.OpenAI(
      base_url="https://openrouter.ai/api/v1",
      default_headers={
          "HTTP-Referer": "<YOUR_SITE_URL>",  # Optional: Your site URL
          "X-OpenRouter-Title": "<YOUR_SITE_NAME>",      # Optional: Your site name
      }
  )

  # Make a chat completion request
  response = client.chat.completions.create(
      model="anthropic/claude-sonnet-4.6",
      messages=[
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Tell me a fun fact about space."}
      ],
      name="fun-fact-request"  # Optional: Name of the generation in Langfuse
  )

  # Print the assistant's reply
  print(response.choices[0].message.content)
  ```
</CodeGroup>

### Advanced Tracing with Nested Calls

Use the `@observe()` decorator to capture execution details of functions with nested LLM calls:

<CodeGroup>
  ```python title="Nested Function Tracing" expandable lines theme={null}
  from langfuse import observe
  from langfuse.openai import openai

  # Create an OpenAI client with OpenRouter's base URL
  client = openai.OpenAI(
      base_url="https://openrouter.ai/api/v1",
  )

  @observe()  # This decorator enables tracing of the function
  def analyze_text(text: str):
      # First LLM call: Summarize the text
      summary_response = summarize_text(text)
      summary = summary_response.choices[0].message.content

      # Second LLM call: Analyze the sentiment of the summary
      sentiment_response = analyze_sentiment(summary)
      sentiment = sentiment_response.choices[0].message.content

      return {
          "summary": summary,
          "sentiment": sentiment
      }

  @observe()  # Nested function to be traced
  def summarize_text(text: str):
      return client.chat.completions.create(
          model="openai/gpt-4o-mini",
          messages=[
              {"role": "system", "content": "You summarize texts in a concise manner."},
              {"role": "user", "content": f"Summarize the following text:\n{text}"}
          ],
          name="summarize-text"
      )

  @observe()  # Nested function to be traced
  def analyze_sentiment(summary: str):
      return client.chat.completions.create(
          model="openai/gpt-4o-mini",
          messages=[
              {"role": "system", "content": "You analyze the sentiment of texts."},
              {"role": "user", "content": f"Analyze the sentiment of the following summary:\n{summary}"}
          ],
          name="analyze-sentiment"
      )

  # Example usage
  text_to_analyze = "OpenRouter's unified API has significantly advanced the field of AI development, setting new standards for model accessibility."
  result = analyze_text(text_to_analyze)
  print(result)
  ```
</CodeGroup>

### Learn More

* **Langfuse OpenRouter Integration**: [https://langfuse.com/docs/integrations/other/openrouter](https://langfuse.com/docs/integrations/other/openrouter)
* **OpenRouter Quick Start Guide**: [https://openrouter.ai/docs/quickstart](https://openrouter.ai/docs/quickstart)
* **Langfuse `@observe()` Decorator**: [https://langfuse.com/docs/sdk/python/decorators](https://langfuse.com/docs/sdk/python/decorators)
