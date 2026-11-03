> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

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

