This page shows the optional sampling parameters you can set in a request to a
model. The parameters available for each model may differ. For more information,
see the [reference documentation](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent#generationconfig).

## Token sampling parameters

The parameters in this section influence how the model selects the next token
from its vocabulary. By adjusting these parameters, you can control the
randomness and diversity of the generated text.

### Top-P

Top-P changes how the model selects tokens for output. Tokens are selected
from the most probable to least probable until the sum of their probabilities
equals the top-P value. For example, if tokens A, B, and C have a probability of
0.3, 0.2, and 0.1 and the top-P value is `0.5`, then the model will
select either A or B as the next token by using temperature and excludes C as a
candidate.

Specify a lower value for less random responses and a higher value for more
random responses.
For more information, see [`topP`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent#top-p).

### Temperature

The temperature is used for sampling during response generation, which occurs when `topP`
and `topK` are applied. Temperature controls the degree of randomness in token selection.
Lower temperatures are good for prompts that require a less open-ended or creative response, while
higher temperatures can lead to more diverse or creative results. A temperature of `0`
means that the highest probability tokens are always selected. In this case, responses for a given
prompt are mostly deterministic, but a small amount of variation is still possible.

If the model returns a response that's too generic, too short, or the model gives a fallback
response, try increasing the temperature. If the model enters infinite generation, increasing the
temperature to at least `0.1` may lead to improved results.
`1.0` is the recommended starting value for temperature.

Lower temperatures lead to predictable (but not completely [deterministic](https://medium.com/google-cloud/is-a-zero-temperature-deterministic-c4a7faef4d20))
results. For more information, see [`temperature`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent#temperature).

## Stopping parameters

The parameters in this section allow you to precisely control the length and
content of the model's generated output by defining conditions under which the
generation process should stop.

### Maximum output tokens

Set [`maxOutputTokens`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent#maxOutputTokens) to limit the number of tokens
generated in the response. A token is approximately four characters, so 100
tokens correspond to roughly 60-80 words. Set a low value to limit the length
of the response.

### Stop sequences

Define strings in [`stopSequences`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent#stopSequences) to tell the model to stop
generating text if one of the strings is encountered in the response. If a
string appears multiple times in the response, then the response is truncated
where the string is first encountered. The strings are case-sensitive.

## Token penalization parameters

The parameters in this section allow you to control the likelihood of tokens
being generated based on their frequency and presence in the output.

### Frequency penalty

Positive values penalize tokens that repeatedly appear in the generated text, decreasing the
probability of repeating content. The minimum value is `-2.0`. The maximum value is up
to, but not including, `2.0`.
For more information, see [`frequencyPenalty`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent#frequencyPenalty).

### Presence penalty

Positive values penalize tokens that already appear in the generated text, increasing the
probability of generating more diverse content. The minimum value is `-2.0`. The maximum
value is up to, but not including, `2.0`.
For more information, see [`presencePenalty`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent#presencePenalty).

## Advanced parameters

Use these parameters to return more information about the tokens in the response
or to control the variability of the response.

> [!WARNING]
>
> **Preview**
>
>
> This product or feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section
> of the [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA products and features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

### Seed

When seed is fixed to a specific value, the model makes a best effort to provide
the same response for repeated requests. Deterministic output isn't guaranteed.
Also, changing the model or parameter settings, such as the temperature, can
cause variations in the response even when you use the same seed value. By
default, a random seed value is used.
For more information, see [`seed`](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.endpoints/generateContent#seed).

### Example

Here is an example that uses parameters to tune a model's response.

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
        contents="Why is the sky blue?",
        # See the SDK documentation at
        # https://googleapis.github.io/python-genai/genai.html#genai.types.GenerateContentConfig
        config=GenerateContentConfig(
            temperature=0,
            candidate_count=1,
            response_mime_type="application/json",
            top_p=0.95,
            top_k=20,
            seed=5,
            max_output_tokens=500,
            stop_sequences=["STOP!"],
            presence_penalty=0.0,
            frequency_penalty=0.0,
        ),
    )
    print(response.text)
    # Example response:
    # {
    #   "explanation": "The sky appears blue due to a phenomenon called Rayleigh scattering. When ...
    # }

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

    // generateWithConfig shows how to generate text using a text prompt and custom configuration.
    func generateWithConfig(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        modelName := "gemini-2.5-flash"
        contents := genai.Text("Why is the sky blue?")
        // See the documentation: https://pkg.go.dev/google.golang.org/genai#GenerateContentConfig
        config := &genai.GenerateContentConfig{
            Temperature:      genai.Ptr(float32(0.0)),
            CandidateCount:   int32(1),
            ResponseMIMEType: "application/json",
        }

        resp, err := client.Models.GenerateContent(ctx, modelName, contents, config)
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        respText := resp.Text()

        fmt.Fprintln(w, respText)
        // Example response:
        // {
        //   "explanation": "The sky is blue due to a phenomenon called Rayleigh scattering ...
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

    async function generateContent(
      projectId = GOOGLE_CLOUD_PROJECT,
      location = GOOGLE_CLOUD_LOCATION
    ) {
      const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: location,
      });

      const config = {
        temperature: 0,
        candidateCount: 1,
        responseMimeType: 'application/json',
        topP: 0.95,
        topK: 20,
        seed: 5,
        maxOutputTokens: 500,
        stopSequences: ['STOP!'],
        presencePenalty: 0.0,
        frequencyPenalty: 0.0,
      };

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Why is the sky blue?',
        config: config,
      });

      console.log(response.text);

      // Example response:
      // {
      //   "explanation": "The sky appears blue due to a phenomenon called Rayleigh scattering. When ...
      // }

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

    public class TextGenerationConfigWithText {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        generateContent(modelId);
      }

      // Generates text with text input and optional configurations
      public static String generateContent(String modelId) {
        // Client Initialization. Once created, it can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          // Set optional configuration parameters
          GenerateContentConfig contentConfig =
              GenerateContentConfig.builder()
                  .temperature(0.0F)
                  .candidateCount(1)
                  .responseMimeType("application/json")
                  .topP(0.95F)
                  .topK(20F)
                  .seed(5)
                  .maxOutputTokens(500)
                  .stopSequences("STOP!")
                  .presencePenalty(0.0F)
                  .frequencyPenalty(0.0F)
                  .build();

          // Generate content using optional configuration
          GenerateContentResponse response =
              client.models.generateContent(modelId, "Why is the sky blue?", contentConfig);

          System.out.print(response.text());
          // Example response:
          // {
          //  "explanation": "The sky appears blue due to a phenomenon called Rayleigh scattering.
          // Sunlight, which appears white, is actually composed of all the colors of the rainbow...
          // }
          return response.text();
        }
      }
    }

## What's next

- Learn about [responsible AI best practices and Agent Platform's safety filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
- Learn about [system instructions for safety](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/safety-system-instructions).
- Learn about [abuse monitoring](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/abuse-monitoring).
- Learn about [responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
