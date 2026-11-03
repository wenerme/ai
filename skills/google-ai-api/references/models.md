> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Models

The models endpoint provides a way for you to programmatically list the available models, and retrieve extended metadata such as supported functionality and context window sizing. Read more in [the Models guide](/docs/models).

## Methods  {% id="methods" %}

{% table %}
  * Method
  * HTTP request

  ---

  * [Getting a model](/api-reference/models/get-model)
  *     {% mark class="http-get" %}{% icon name="south_west" /%}`GET`{% /mark %} `/v1beta/models/{model}`

    Gets information about a specific [`Model`](/api-reference/models#Resource:Model) such as its version number, token limits, [parameters](/docs/prompting-strategies#model-parameters) and other metadata.


  ---

  * [Listing models](/api-reference/models/list-models)
  *     {% mark class="http-get" %}{% icon name="south_west" /%}`GET`{% /mark %} `/v1beta/models`

    Lists the [`Model`s](/docs/models) available through the Gemini API.

{% /table %}

## Resources  {% id="resources" %}

### Model  {% id="Resource:Model" %}

Information about a Generative Language Model.

**Properties:**

**name**: {% mark %}required{% /mark %} `string`

The resource name of the [`Model`](/api-reference/models#Resource:Model). Refer to [Model variants](/docs/models#model-versions) for all allowed values. Format: `models/{model}` with a `{model}` naming convention of:

- "{base_model_id}-{version}"

Examples:

- `models/gemini-1.5-flash-001`

{% hr /%}

**baseModelId**: {% mark %}required{% /mark %} `string`

The name of the base model, pass this to the generation request. Examples:

- `gemini-1.5-flash`

{% hr /%}

**version**: {% mark %}required{% /mark %} `string`

The version number of the model. This represents the major version (`1.0` or `1.5`)

{% hr /%}

**displayName**: `string`

The human-readable name of the model. E.g. "Gemini 1.5 Flash". The name can be up to 128 characters long and can consist of any UTF-8 characters.

{% hr /%}

**description**: `string`

A short description of the model.

{% hr /%}

**inputTokenLimit**: `integer`

Maximum number of input tokens allowed for this model.

{% hr /%}

**outputTokenLimit**: `integer`

Maximum number of output tokens available for this model.

{% hr /%}

**supportedGenerationMethods**: `array (string)`

The model's supported generation methods. The corresponding API method names are defined as Pascal case strings, such as `generateMessage` and `generateContent`.

{% hr /%}

**temperature**: `number`

Controls the randomness of the output. Values can range over `[0.0,max_temperature]`, inclusive. A higher value will produce responses that are more varied, while a value closer to `0.0` will typically result in less surprising responses from the model. This value specifies default to be used by the backend while making the call to the model.

{% hr /%}

**maxTemperature**: `number`

The maximum temperature this model can use.

{% hr /%}

**topP**: `number`

For [Nucleus sampling](/docs/prompting-strategies#model-parameters). Nucleus sampling considers the smallest set of tokens whose probability sum is at least `top_p`. This value specifies default to be used by the backend while making the call to the model.

{% hr /%}

**topK**: `integer`

For Top-k sampling. Top-k sampling considers the set of `top_k` most probable tokens. This value specifies default to be used by the backend while making the call to the model. If empty, indicates the model doesn't use top-k sampling, and `top_k` isn't allowed as a generation parameter.

{% hr /%}

**thinking**: `boolean`

Whether the model supports thinking.

