> [!NOTE]
> To see an example of structured output,
> run the "Intro to structured output" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/controlled-generation/intro_controlled_generation.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fcontrolled-generation%2Fintro_controlled_generation.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/controlled-generation/intro_controlled_generation.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/controlled-generation/intro_controlled_generation.ipynb)

You can guarantee that a model's generated output always adheres to a specific
schema so that you receive consistently formatted responses. For example, you
might have an established data schema that you use for other tasks. If you
have the model follow the same schema, you can directly extract data from the
model's output without any post-processing.

To specify the structure of a model's output, define a *response schema* , which
works like a blueprint for model responses. When you submit a prompt and include
the [response schema](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.cachedContents#Schema), the model's response always follows your defined
schema.

You can control generated output when using the following models:

- Gemini models:

#### Click to expand supported models

- [Gemini 3.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-5-flash)
- [Gemini 3.1 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-flash-lite)
- [Gemini 3.1 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro) preview
- [Gemini 3 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-flash) preview
- [Gemini 2.5 Pro](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-pro)
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash) preview
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite) preview
- [Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash)
- [Gemini 2.5 Flash-Lite](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/2-5-flash-lite)

- Open models:

  - [DeepSeek R1-0528](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/deepseek/r1-0528)
  - [Llama 4 Maverick](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/llama/llama4-maverick)
  - [Llama 4 Scout](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/llama/llama4-scout)
  - [Llama 3.3](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/partner-models/llama/llama3-3)

For Open Models, follow this [user guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/maas/capabilities/structured-output).

> [!NOTE]
> **Note:** Using structured output on [tuned Gemini models](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning) can result in [decreased model quality](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning#known_issues).

## Example use cases

One use case for applying a response schema is to ensure that a model's response
produces valid JSON and conforms to your schema. Generative model outputs can
have some degree of variability, so including a response schema ensures that you
always receive valid JSON. Consequently, your downstream tasks can reliably
expect valid JSON input from generated responses.

Another example is to constrain how a model can respond. For example, you can
have a model annotate text with user-defined labels, not with labels that the
model produces. This constraint is useful when you expect a specific set of
labels such as `positive` or `negative` and don't want to receive a mixture of
other labels that the model might generate like `good`, `positive`, `negative`,
or `bad`.

## Considerations

The following considerations discuss potential limitations if you plan on using
a response schema:

- You must use the API to define and use a response schema. There's no console support.
- The size of your response schema counts towards the input token limit.
- Only certain output formats are supported, such as `application/json` or `text/x.enum`. For more information, see the `responseMimeType` parameter in the [Gemini API reference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent).
- Structured output supports a subset of the [Agent Platform
  schema reference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.cachedContents#Schema). For more information, see [Supported schema
  fields](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output#fields).
- A complex schema can result in an `InvalidArgument: 400` error. Complexity
  might come from long property names, long array length limits, enums with
  many values, objects with lots of optional properties, or a combination of
  these factors.

  If you get this error with a valid schema, make one or more of the following
  changes to resolve the error:
  - Shorten property names or enum names.
  - Flatten nested arrays.
  - Reduce the number of properties with constraints, such as numbers with minimum and maximum limits.
  - Reduce the number of properties with complex constraints, such as properties with complex formats like `date-time`.
  - Reduce the number of optional properties.
  - Reduce the number of valid values for enums.

## Supported schema fields

You can specify a `response_schema` that describes the output format.

The model will then generate a response that matches the provided schema. When
using structured outputs, the model will produce outputs in the same order as
the keys in the schema.

- The following fields from the [Agent Platform schema](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.cachedContents#Schema) are
  supported. If you use an unsupported field, Gemini Enterprise Agent Platform can still handle
  your request but ignores the field.

- `anyOf`

- `enum`: only `string` enums are supported

- `format`

- `items`

- `maximum`

- `maxItems`

- `minimum`

- `minItems`

- `nullable`

- `properties`

- `description`

- `propertyOrdering`[^\*^](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output#note)

- `required`

^\*^ `propertyOrdering` is specifically for structured output and not part of the Agent Platform schema. This field defines the order in which properties are generated. The listed properties must be unique and must be valid keys in the `properties` dictionary.

When you define a schema, the model doesn't strictly follow the order of properties that you define in the `properties` field. To enforce a specific order for property generation, use the `propertyOrdering` field. Properties listed in `propertyOrdering` are generated first, in the specified order, followed by any other properties.
**Important:** If there are any descriptions (for example, in a bulleted list), schemas, or examples (for example, for few-shot learning or RAG) in the prompt, they **must** present the same property ordering as is specified in the `responseSchema`. A mismatch in ordering can confuse the model and lead to incorrect or malformed output.

If you use the Python SDK, the default property ordering follows the order that is defined in your schema. For all other cases, properties are generated alphabetically with the required properties grouped first followed by optional properties.

For the `format` field, Gemini Enterprise Agent Platform supports the following values: `date`,
`date-time`, `duration`, and `time`. The description and format of each value is
described in the [OpenAPI Initiative Registry](https://spec.openapis.org/registry/format/)

## Before you begin

Define a response schema to specify the structure of a model's output, the field
names, and the expected data type for each field. Use only the supported fields
as listed in the [Considerations](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output#considerations) section. All other fields are
ignored.

Include your response schema as part of the `responseSchema` field only. Don't
duplicate the schema in your input prompt. If you do, the generated output might
be lower in quality.

For sample schemas, see the [Example schemas and model responses](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output#examples)
section.

### Model behavior and response schema

When a model generates a response, it uses the field name and description
from the provided schema. As such, we recommend that you use a clear structure
and unambiguous field names so that your intent is clear. It is a best practice
to use the `description` field inside schema properties to define the purpose
of each field.

By default, fields are optional, meaning the model can *populate* the fields or
*skip* them. You can set fields as required to force the model to provide a
value. If there's insufficient context in the associated input prompt, the
model generates responses mainly based on the data it was trained on.

If you aren't seeing the results you expect, start by iterating on the descriptions in the schema. If you feel you cannot fully capture the nuances of the schema in the schema description it is acceptable to discuss the schema in the prompt but make sure to:

1. Only specify the schema in the schema object. Don't also specify the schema in the prompt. Doing both can reduce performance.

2. Avoid discussing the schema in the prompt (beyond "follow the provided schema" or similar) unless necessary. This makes maintenance easier; if your schema ever needs to change, you can just change the schema instead of making sure the prompt and the schema are both updated correctly.

3. If you absolutely need to discuss the schema in the prompt (to provide examples, or to provide especialy detailed instructions that would otherwise lead to confusing `description` values in the schema), make sure to follow the *exact* same order of fields as in the provided schema. Mixing up the field order in the provided schema versus the prompt can lead to output errors.

## Send a prompt with a response schema

> [!NOTE]
> To see an example of a response schema and structured output,
> run the "Introduction to structured output" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/controlled-generation/intro_controlled_generation.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fcontrolled-generation%2Fintro_controlled_generation.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/controlled-generation/intro_controlled_generation.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/controlled-generation/intro_controlled_generation.ipynb)

By default, all fields are optional, meaning a model might generate a response
to a field. To force the model to always generate a response to a field, set the
field as required.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google import genai
    from google.genai.types import HttpOptions

    response_schema = {
        "type": "ARRAY",
        "items": {
            "type": "OBJECT",
            "properties": {
                "recipe_name": {"type": "STRING"},
                "ingredients": {"type": "ARRAY", "items": {"type": "STRING"}},
            },
            "required": ["recipe_name", "ingredients"],
        },
    }

    prompt = """
        List a few popular cookie recipes.
    """

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
            "response_schema": response_schema,
        },
    )

    print(response.text)
    # Example output:
    # [
    #     {
    #         "ingredients": [
    #             "2 1/4 cups all-purpose flour",
    #             "1 teaspoon baking soda",
    #             "1 teaspoon salt",
    #             "1 cup (2 sticks) unsalted butter, softened",
    #             "3/4 cup granulated sugar",
    #             "3/4 cup packed brown sugar",
    #             "1 teaspoon vanilla extract",
    #             "2 large eggs",
    #             "2 cups chocolate chips",
    #         ],
    #         "recipe_name": "Chocolate Chip Cookies",
    #     }
    # ]

### Go

Learn how to install or update the [Go](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import (
        "context"
        "fmt"
        "io"

        genai "google.golang.org/genai"
    )

    // generateWithRespSchema shows how to use a response schema to generate output in a specific format.
    func generateWithRespSchema(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        config := &genai.GenerateContentConfig{
            ResponseMIMEType: "application/json",
            // See the OpenAPI specification for more details and examples:
            //   https://spec.openapis.org/oas/v3.0.3.html#schema-object
            ResponseSchema: &genai.Schema{
                Type: "array",
                Items: &genai.Schema{
                    Type: "object",
                    Properties: map[string]*genai.Schema{
                        "recipe_name": {Type: "string"},
                        "ingredients": {
                            Type:  "array",
                            Items: &genai.Schema{Type: "string"},
                        },
                    },
                    Required: []string{"recipe_name", "ingredients"},
                },
            },
        }
        contents := []*genai.Content{
            {Parts: []*genai.Part{
                {Text: "List a few popular cookie recipes."},
            },
                Role: genai.RoleUser},
        }
        modelName := "gemini-2.5-flash"

        resp, err := client.Models.GenerateContent(ctx, modelName, contents, config)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        respText := resp.Text()

        fmt.Fprintln(w, respText)

        // Example response:
        // [
        //   {
        //     "ingredients": [
        //       "2 1/4 cups all-purpose flour",
        //       "1 teaspoon baking soda",
        //       ...
        //     ],
        //     "recipe_name": "Chocolate Chip Cookies"
        //   },
        //   {
        //     ...
        //   },
        //   ...
        // ]

        return nil
    }

### Node.js

#### Install

```
npm install @google/genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/js-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    const {GoogleGenAI} = require('@google/genai');

    const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
    const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'global';

    async function generateResponseSchema(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const prompt = 'List a few popular cookie recipes.';

      const responseSchema = {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            recipeName: {type: 'STRING'},
            ingredients: {
              type: 'ARRAY',
              items: {type: 'STRING'},
            },
          },
          required: ['recipeName', 'ingredients'],
        },
      };

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        },
      });

      console.log(response.text);

      // Example output:
      // [
      //     {
      //         "ingredients": [
      //             "2 1/4 cups all-purpose flour",
      //             "1 teaspoon baking soda",
      //             "1 teaspoon salt",
      //             "1 cup (2 sticks) unsalted butter, softened",
      //             "3/4 cup granulated sugar",
      //             "3/4 cup packed brown sugar",
      //             "1 teaspoon vanilla extract",
      //             "2 large eggs",
      //             "2 cups chocolate chips",
      //         ],
      //         "recipe_name": "Chocolate Chip Cookies",
      //     }
      // ]

      return response.text;
    }

### Java

Learn how to install or update the [Java](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://central.sonatype.com/artifact/com.google.genai/google-genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import com.google.genai.Client;
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.Schema;
    import com.google.genai.types.Type;
    import java.util.List;
    import java.util.Map;

    public class ControlledGenerationWithResponseSchema {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";

        String contents = "List a few popular cookie recipes.";

        generateContent(modelId, contents);
      }

      // Generates content with a response schema
      public static String generateContent(String modelId, String contents) {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          // Schema for each item in array
          Schema recipeSchema =
              Schema.builder()
                  .type(Type.Known.OBJECT)
                  .properties(
                      Map.of(
                          "recipe_name", Schema.builder().type(Type.Known.STRING).build(),
                          "ingredients",
                              Schema.builder()
                                  .type(Type.Known.ARRAY)
                                  .items(Schema.builder().type(Type.Known.STRING).build())
                                  .build()))
                  .required(List.of("recipe_name", "ingredients"))
                  .build();

          // Full root schema (array)
          Schema responseSchema = Schema.builder().type(Type.Known.ARRAY).items(recipeSchema).build();

          GenerateContentConfig config =
              GenerateContentConfig.builder()
                  .responseMimeType("application/json")
                  .responseSchema(responseSchema)
                  .build();

          GenerateContentResponse response = client.models.generateContent(modelId, contents, config);

          System.out.println(response.text());
          // Example response:
          // [
          //    {
          //        "ingredients": [
          //            "2 1/4 cups all-purpose flour",
          //            "1 teaspoon baking soda",
          //            "1 teaspoon salt",
          //            "1 cup (2 sticks) unsalted butter, softened",
          //            "3/4 cup granulated sugar",
          //            "3/4 cup packed brown sugar",
          //            "1 teaspoon vanilla extract",
          //            "2 large eggs",
          //            "2 cups chocolate chips",
          //        ],
          //        "recipe_name": "Chocolate Chip Cookies",
          //    }
          // ]
          return response.text();
        }
      }
    }

### REST

Before using any of the request data,
make the following replacements:

- <var class="edit" scope="GENERATE_RESPONSE_METHOD" translate="no">GENERATE_RESPONSE_METHOD</var>: The type of response that you want the model to generate. Choose a method that generates how you want the model's response to be returned:
  - `streamGenerateContent`: The response is streamed as it's being generated to reduce the perception of latency to a human audience.
  - `generateContent`: The response is returned after it's fully generated.
- <var class="edit" scope="LOCATION" translate="no">LOCATION</var>: The region to process the request.
- <var class="edit" scope="PROJECT_ID" translate="no">PROJECT_ID</var>: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- <var class="edit" scope="MODEL_ID" translate="no">MODEL_ID</var>: The model ID of the multimodal model that you want to use.
- <var class="edit" scope="ROLE" translate="no">ROLE</var>: The role in a conversation associated with the content. Specifying a role is required even in singleturn use cases. Acceptable values include the following:
  - `USER`: Specifies content that's sent by you.
- <var class="edit" scope="TEXT" translate="no">TEXT</var>: The text instructions to include in the prompt.
- <var class="edit" scope="RESPONSE_MIME_TYPE" translate="no">RESPONSE_MIME_TYPE</var>: The format type of the generated candidate text. For a list of supported values, see the `responseMimeType` parameter in the [Gemini API](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent).
- <var class="edit" scope="RESPONSE_SCHEMA" translate="no">RESPONSE_SCHEMA</var>: Schema for the model to follow when generating responses. It is a best practice to use the `description` field to describe the schema's purpose and its properties. For more information, see the [Schema](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.cachedContents#Schema) reference.

HTTP method and URL:

```
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATE_RESPONSE_METHOD
```

Request JSON body:

```
{
  "contents": {
    "role": "ROLE",
    "parts": {
      "text": "TEXT"
    }
  },
  "generation_config": {
    "responseMimeType": "RESPONSE_MIME_TYPE",
    "responseSchema": RESPONSE_SCHEMA,
  }
}
```

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATE_RESPONSE_METHOD"
```

#### PowerShell

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`,
and execute the following command:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/google/models/MODEL_ID:GENERATE_RESPONSE_METHOD" | Select-Object -Expand Content
```

You should receive a JSON response similar to the following.

#### Response

```
{
  "candidates": [
    {
      "content": {
        "role": "model",
        "parts": [
          {
            "text": "[{\"recipe_name\": \"Chocolate Chip Cookies\"}, {\"recipe_name\": \"Peanut Butter Cookies\"}, {\"recipe_name\": \"Oatmeal Raisin Cookies\"}, {\"recipe_name\": \"Sugar Cookies\"}, {\"recipe_name\": \"Snickerdoodles\"}]"
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.08021325,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.0921962
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.14730969,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.08866235
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.13432105,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.07172113
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.12787028,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.10017223
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 7,
    "candidatesTokenCount": 55,
    "totalTokenCount": 62
  }
}
```

#### Example curl command

    LOCATION="us-central1"
    MODEL_ID="gemini-2.5-flash"
    PROJECT_ID="test-project"
    GENERATE_RESPONSE_METHOD="generateContent"

    cat << EOF > request.json
    {
      "contents": {
        "role": "user",
        "parts": {
          "text": "List a few popular cookie recipes."
        }
      },
      "generation_config": {
        "maxOutputTokens": 2048,
        "responseMimeType": "application/json",
        "responseSchema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "recipe_name": {
                "type": "string",
                "description": "The name of the cookie recipe."
              },
            },
            "required": ["recipe_name"],
          },
        }
      }
    }
    EOF

    curl \
    -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL_ID}:${GENERATE_RESPONSE_METHOD} \
    -d '@request.json'

### Example schemas for JSON output

The following sections demonstrate a variety of sample prompts and response
schemas. A sample model response is also included after each code sample.

- [Forecast the weather for each day of the week in an array](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output#forecast)
- [Classify a product with a well-defined enum](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/control-generated-output#classify)

#### Forecast the weather for each day of the week

The following example outputs a `forecast` object for each day
of the week that includes an array of properties such as the expected
temperature and humidity level for the day. Some properties are set to nullable
so the model can return a null value when it doesn't have enough context to
generate a meaningful response. This strategy helps reduce hallucinations.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google import genai
    from google.genai.types import GenerateContentConfig, HttpOptions

    response_schema = {
        "type": "OBJECT",
        "properties": {
            "forecast": {
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "Day": {"type": "STRING", "nullable": True},
                        "Forecast": {"type": "STRING", "nullable": True},
                        "Temperature": {"type": "INTEGER", "nullable": True},
                        "Humidity": {"type": "STRING", "nullable": True},
                        "Wind Speed": {"type": "INTEGER", "nullable": True},
                    },
                    "required": ["Day", "Temperature", "Forecast", "Wind Speed"],
                },
            }
        },
    }

    prompt = """
        The week ahead brings a mix of weather conditions.
        Sunday is expected to be sunny with a temperature of 77°F and a humidity level of 50%. Winds will be light at around 10 km/h.
        Monday will see partly cloudy skies with a slightly cooler temperature of 72°F and the winds will pick up slightly to around 15 km/h.
        Tuesday brings rain showers, with temperatures dropping to 64°F and humidity rising to 70%.
        Wednesday may see thunderstorms, with a temperature of 68°F.
        Thursday will be cloudy with a temperature of 66°F and moderate humidity at 60%.
        Friday returns to partly cloudy conditions, with a temperature of 73°F and the Winds will be light at 12 km/h.
        Finally, Saturday rounds off the week with sunny skies, a temperature of 80°F, and a humidity level of 40%. Winds will be gentle at 8 km/h.
    """

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
        config=GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=response_schema,
        ),
    )

    print(response.text)
    # Example output:
    # {"forecast": [{"Day": "Sunday", "Forecast": "sunny", "Temperature": 77, "Wind Speed": 10, "Humidity": "50%"},
    #   {"Day": "Monday", "Forecast": "partly cloudy", "Temperature": 72, "Wind Speed": 15},
    #   {"Day": "Tuesday", "Forecast": "rain showers", "Temperature": 64, "Wind Speed": null, "Humidity": "70%"},
    #   {"Day": "Wednesday", "Forecast": "thunderstorms", "Temperature": 68, "Wind Speed": null},
    #   {"Day": "Thursday", "Forecast": "cloudy", "Temperature": 66, "Wind Speed": null, "Humidity": "60%"},
    #   {"Day": "Friday", "Forecast": "partly cloudy", "Temperature": 73, "Wind Speed": 12},
    #   {"Day": "Saturday", "Forecast": "sunny", "Temperature": 80, "Wind Speed": 8, "Humidity": "40%"}]}

### Go

Learn how to install or update the [Go](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import (
        "context"
        "fmt"
        "io"

        genai "google.golang.org/genai"
    )

    // generateWithNullables shows how to use the response schema with nullable values.
    func generateWithNullables(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        modelName := "gemini-2.5-flash"
        prompt := `
    The week ahead brings a mix of weather conditions.
    Sunday is expected to be sunny with a temperature of 77°F and a humidity level of 50%. Winds will be light at around 10 km/h.
    Monday will see partly cloudy skies with a slightly cooler temperature of 72°F and the winds will pick up slightly to around 15 km/h.
    Tuesday brings rain showers, with temperatures dropping to 64°F and humidity rising to 70%.
    Wednesday may see thunderstorms, with a temperature of 68°F.
    Thursday will be cloudy with a temperature of 66°F and moderate humidity at 60%.
    Friday returns to partly cloudy conditions, with a temperature of 73°F and the Winds will be light at 12 km/h.
    Finally, Saturday rounds off the week with sunny skies, a temperature of 80°F, and a humidity level of 40%. Winds will be gentle at 8 km/h.
    `
        contents := []*genai.Content{
            {Parts: []*genai.Part{
                {Text: prompt},
            },
                Role: genai.RoleUser},
        }
        config := &genai.GenerateContentConfig{
            ResponseMIMEType: "application/json",
            // See the OpenAPI specification for more details and examples:
            //   https://spec.openapis.org/oas/v3.0.3.html#schema-object
            ResponseSchema: &genai.Schema{
                Type: "object",
                Properties: map[string]*genai.Schema{
                    "forecast": {
                        Type: "array",
                        Items: &genai.Schema{
                            Type: "object",
                            Properties: map[string]*genai.Schema{
                                "Day":         {Type: "string", Nullable: genai.Ptr(true)},
                                "Forecast":    {Type: "string", Nullable: genai.Ptr(true)},
                                "Temperature": {Type: "integer", Nullable: genai.Ptr(true)},
                                "Humidity":    {Type: "string", Nullable: genai.Ptr(true)},
                                "Wind Speed":  {Type: "integer", Nullable: genai.Ptr(true)},
                            },
                            Required: []string{"Day", "Temperature", "Forecast", "Wind Speed"},
                        },
                    },
                },
            },
        }

        resp, err := client.Models.GenerateContent(ctx, modelName, contents, config)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        respText := resp.Text()

        fmt.Fprintln(w, respText)

        // Example response:
        // {
        //     "forecast": [
        //         {"Day": "Sunday", "Forecast": "Sunny", "Temperature": 77, "Wind Speed": 10, "Humidity": "50%"},
        //         {"Day": "Monday", "Forecast": "Partly Cloudy", "Temperature": 72, "Wind Speed": 15},
        //         {"Day": "Tuesday", "Forecast": "Rain Showers", "Temperature": 64, "Wind Speed": null, "Humidity": "70%"},
        //         {"Day": "Wednesday", "Forecast": "Thunderstorms", "Temperature": 68, "Wind Speed": null},
        //         {"Day": "Thursday", "Forecast": "Cloudy", "Temperature": 66, "Wind Speed": null, "Humidity": "60%"},
        //         {"Day": "Friday", "Forecast": "Partly Cloudy", "Temperature": 73, "Wind Speed": 12},
        //         {"Day": "Saturday", "Forecast": "Sunny", "Temperature": 80, "Wind Speed": 8, "Humidity": "40%"}
        //     ]
        // }

        return nil
    }

### Node.js

#### Install

```
npm install @google/genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/js-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    const {GoogleGenAI} = require('@google/genai');

    const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
    const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'global';

    async function generateNullableSchema(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const prompt = `
      The week ahead brings a mix of weather conditions.
      Sunday is expected to be sunny with a temperature of 77°F and a humidity level of 50%. Winds will be light at around 10 km/h.
      Monday will see partly cloudy skies with a slightly cooler temperature of 72°F and the winds will pick up slightly to around 15 km/h.
      Tuesday brings rain showers, with temperatures dropping to 64°F and humidity rising to 70%.
      Wednesday may see thunderstorms, with a temperature of 68°F.
      Thursday will be cloudy with a temperature of 66°F and moderate humidity at 60%.
      Friday returns to partly cloudy conditions, with a temperature of 73°F and the Winds will be light at 12 km/h.
      Finally, Saturday rounds off the week with sunny skies, a temperature of 80°F, and a humidity level of 40%. Winds will be gentle at 8 km/h.
    `;

      const responseSchema = {
        type: 'object',
        properties: {
          forecast: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                Day: {type: 'string', nullable: true},
                Forecast: {type: 'string', nullable: true},
                Temperature: {type: 'integer', nullable: true},
                Humidity: {type: 'string', nullable: true},
                WindSpeed: {type: 'integer', nullable: true},
              },
              required: ['Day', 'Temperature', 'Forecast', 'WindSpeed'],
            },
          },
        },
      };

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
        },
      });
      console.log(response.text);

      // Example output:
      //  {"forecast": [{"Day": "Sunday", "Forecast": "sunny", "Temperature": 77, "Wind Speed": 10, "Humidity": "50%"},
      //   {"Day": "Monday", "Forecast": "partly cloudy", "Temperature": 72, "Wind Speed": 15},
      //   {"Day": "Tuesday", "Forecast": "rain showers", "Temperature": 64, "Wind Speed": null, "Humidity": "70%"},
      //   {"Day": "Wednesday", "Forecast": "thunderstorms", "Temperature": 68, "Wind Speed": null},
      //   {"Day": "Thursday", "Forecast": "cloudy", "Temperature": 66, "Wind Speed": null, "Humidity": "60%"},
      //   {"Day": "Friday", "Forecast": "partly cloudy", "Temperature": 73, "Wind Speed": 12},
      //   {"Day": "Saturday", "Forecast": "sunny", "Temperature": 80, "Wind Speed": 8, "Humidity": "40%"}]}

      return response.text;
    }

### Java

Learn how to install or update the [Java](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://central.sonatype.com/artifact/com.google.genai/google-genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import com.google.genai.Client;
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.Schema;
    import com.google.genai.types.Type;
    import java.util.List;
    import java.util.Map;

    public class ControlledGenerationWithNullableSchema {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";

        String prompt =
            "The week ahead brings a mix of weather conditions.\n"
                + "Sunday is expected to be sunny with a temperature "
                + "of 77°F and a humidity level of 50%. "
                + "Winds will be light at around 10 km/h.\n"
                + "Monday will see partly cloudy skies with "
                + "a slightly cooler temperature of 72°F and the winds "
                + "will pick up slightly to around 15 km/h.\n"
                + "Tuesday brings rain showers, with temperatures dropping "
                + "to 64°F and humidity rising to 70%.\n"
                + "Wednesday may see thunderstorms, with a temperature of 68°F.\n"
                + "Thursday will be cloudy with a temperature of 66°F and moderate humidity at 60%.\n"
                + "Friday returns to partly cloudy conditions, with "
                + "a temperature of 73°F and the Winds will be "
                + "light at 12 km/h.\n"
                + "Finally, Saturday rounds off the week with sunny skies, a "
                + "temperature of 80°F, and a humidity "
                + "level of 40%. Winds will be gentle at 8 km/h.\n";

        generateContent(modelId, prompt);
      }

      // Generates content with a nullable response schema
      public static String generateContent(String modelId, String contents) {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          // Define schema for array items (each weather entry object)
          Schema dayForecastSchema =
              Schema.builder()
                  .type(Type.Known.OBJECT)
                  .properties(
                      Map.of(
                          "Day", Schema.builder().type(Type.Known.STRING).nullable(true).build(),
                          "Forecast", Schema.builder().type(Type.Known.STRING).nullable(true).build(),
                          "Temperature",
                              Schema.builder().type(Type.Known.INTEGER).nullable(true).build(),
                          "Humidity", Schema.builder().type(Type.Known.STRING).nullable(true).build(),
                          "Wind Speed",
                              Schema.builder().type(Type.Known.INTEGER).nullable(true).build()))
                  .required(List.of("Day", "Temperature", "Forecast", "Wind Speed"))
                  .build();

          // Full response schema
          Schema responseSchema =
              Schema.builder()
                  .type(Type.Known.OBJECT)
                  .properties(
                      Map.of(
                          "forecast",
                          Schema.builder().type(Type.Known.ARRAY).items(dayForecastSchema).build()))
                  .build();

          GenerateContentConfig config =
              GenerateContentConfig.builder()
                  .responseMimeType("application/json")
                  .responseSchema(responseSchema)
                  .build();

          GenerateContentResponse response = client.models.generateContent(modelId, contents, config);

          System.out.println(response.text());
          // Example response:
          // {"forecast": [{"Day": "Sunday", "Forecast": "sunny", "Temperature": 77, "Wind Speed": 10,
          // "Humidity": "50%"},
          //  {"Day": "Monday", "Forecast": "partly cloudy", "Temperature": 72, "Wind Speed": 15},
          //  {"Day": "Tuesday", "Forecast": "rain showers", "Temperature": 64, "Wind Speed": null,
          // "Humidity": "70%"},
          //  {"Day": "Wednesday", "Forecast": "thunderstorms", "Temperature": 68, "Wind Speed": null},
          //  {"Day": "Thursday", "Forecast": "cloudy", "Temperature": 66, "Wind Speed": null,
          // "Humidity": "60%"},
          //  {"Day": "Friday", "Forecast": "partly cloudy", "Temperature": 73, "Wind Speed": 12},
          //  {"Day": "Saturday", "Forecast": "sunny", "Temperature": 80, "Wind Speed": 8, "Humidity":
          // "40%"}]}
          return response.text();
        }
      }
    }

#### Classify a product

The following example includes enums where the model must classify an
object's type and condition from a list of given values.

### Python

#### Install

```
pip install --upgrade google-genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/python-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    from google import genai
    from google.genai.types import GenerateContentConfig, HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents="What type of instrument is an oboe?",
        config=GenerateContentConfig(
            response_mime_type="text/x.enum",
            response_schema={
                "type": "STRING",
                "enum": ["Percussion", "String", "Woodwind", "Brass", "Keyboard"],
            },
        ),
    )

    print(response.text)
    # Example output:
    # Woodwind

### Go

Learn how to install or update the [Go](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://pkg.go.dev/google.golang.org/genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import (
        "context"
        "fmt"
        "io"

        genai "google.golang.org/genai"
    )

    // generateWithEnumSchema shows how to use enum schema to generate output.
    func generateWithEnumSchema(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        modelName := "gemini-2.5-flash"
        contents := []*genai.Content{
            {Parts: []*genai.Part{
                {Text: "What type of instrument is an oboe?"},
            }, Role: genai.RoleUser},
        }
        config := &genai.GenerateContentConfig{
            ResponseMIMEType: "text/x.enum",
            ResponseSchema: &genai.Schema{
                Type: "STRING",
                Enum: []string{"Percussion", "String", "Woodwind", "Brass", "Keyboard"},
            },
        }

        resp, err := client.Models.GenerateContent(ctx, modelName, contents, config)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        respText := resp.Text()

        fmt.Fprintln(w, respText)

        // Example response:
        // Woodwind

        return nil
    }

### Node.js

#### Install

```
npm install @google/genai
```

To learn more, see the
[SDK reference documentation](https://googleapis.github.io/js-genai/).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    const {GoogleGenAI, Type} = require('@google/genai');

    const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
    const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'global';

    async function generateContent(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const responseSchema = {
        type: Type.STRING,
        enum: ['Percussion', 'String', 'Woodwind', 'Brass', 'Keyboard'],
      };

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'What type of instrument is an oboe?',
        config: {
          responseMimeType: 'text/x.enum',
          responseSchema: responseSchema,
        },
      });

      console.log(response.text);
      // Example output:
      //  Woodwind
      return response.text;
    }

### Java

Learn how to install or update the [Java](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://central.sonatype.com/artifact/com.google.genai/google-genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    import com.google.genai.Client;
    import com.google.genai.types.GenerateContentConfig;
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.HttpOptions;
    import com.google.genai.types.Schema;
    import com.google.genai.types.Type;
    import java.util.List;

    public class ControlledGenerationWithEnumSchema {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String contents = "What type of instrument is an oboe?";
        String modelId = "gemini-2.5-flash";
        generateContent(modelId, contents);
      }

      // Generates content with an enum response schema
      public static String generateContent(String modelId, String contents) {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          // Define the response schema with an enum.
          Schema responseSchema =
              Schema.builder()
                  .type(Type.Known.STRING)
                  .enum_(List.of("Percussion", "String", "Woodwind", "Brass", "Keyboard"))
                  .build();

          GenerateContentConfig config =
              GenerateContentConfig.builder()
                  .responseMimeType("text/x.enum")
                  .responseSchema(responseSchema)
                  .build();

          GenerateContentResponse response = client.models.generateContent(modelId, contents, config);

          System.out.print(response.text());
          // Example response:
          // Woodwind
          return response.text();
        }
      }
    }
