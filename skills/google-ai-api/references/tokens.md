> ## AI Agent Context
> - Full documentation index: https://aistudio.google.com/llms.txt
> - Gemini Docs MCP server (consistent live info): https://gemini-api-docs-mcp.dev
> - Coding agent skills & setup guide: https://aistudio.google.com/docs/coding-agents.md

# Counting tokens

For a detailed guide on counting tokens using the Gemini API, including how images, audio and video are counted, see the [Token counting guide](/docs/tokens) and accompanying [Cookbook recipe](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/Counting_Tokens.ipynb).

## Methods  {% id="methods" %}

{% table %}
  * Method
  * HTTP request

  ---

  * [Counting tokens](/api-reference/tokens/count-tokens)
  *     {% mark class="http-post" %}{% icon name="north_east" /%}`POST`{% /mark %} `/v1beta/models/{model}:countTokens`

    Runs a model's tokenizer on input `Content` and returns the token count.

{% /table %}

