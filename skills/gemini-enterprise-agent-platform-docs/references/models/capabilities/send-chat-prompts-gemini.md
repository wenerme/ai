> [!NOTE]
> To see an example of getting started with Chat with the Gemini Pro model,
> run the "Getting Started with Chat with the Gemini Pro model" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_chat.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fgemini%2Fgetting-started%2Fintro_gemini_chat.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/getting-started/intro_gemini_chat.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/getting-started/intro_gemini_chat.ipynb)

This page shows you how to send chat prompts to a Gemini model by using
the Google Cloud console, REST API, and supported SDKs.

To learn how to add images and other media to your request, see
[Image understanding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-understanding).

For a list of languages supported by Gemini, see
[Language support](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models#languages-gemini).

*** ** * ** ***

To explore
the generative AI models and APIs that are available on Gemini Enterprise Agent Platform, go to
Model Garden in the Google Cloud console.

[Go to Model Garden](https://console.cloud.google.com/agent-platform/model-garden)

*** ** * ** ***

If you're looking for a way to use Gemini directly from your mobile and
web apps, see the
[Firebase AI Logic client SDKs](https://firebase.google.com/docs/ai-logic) for
Swift, Android, Web, Flutter, and Unity apps.

## Generate text

For testing and iterating on chat prompts, we recommend using the
Google Cloud console. To send prompts programmatically to the model, you can use the
REST API, Google Gen AI SDK, Agent Platform SDK, or one of the other supported libraries and
SDKs.

You can use system instructions to steer the behavior of the model based on a
specific need or use case. For example, you can define a persona or role for a
chatbot that responds to customer service requests. For more information, see
the
[system instructions code samples](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/prompts/system-instructions#code_samples).

You can use the [Google Gen AI SDK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models) to send requests if
you're using
[Gemini 2.5 Flash](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models).

Here is a text generation example.

### Console

To use the Agent Studio to send a chat prompt in the
Google Cloud console, do the following:

1. In the Agent Platform section of the Google Cloud console, go to the **Agent Studio** page.

   [Go to
   Agent Studio](https://console.cloud.google.com/agent-platform/generative/language)
2. In **Start a conversation** , click **Text chat**.
3. Optional: Configure the model and parameters:

   - **Model** : Select **Gemini Pro**.
   - **Region**: Select the region that you want to use.
   - **Temperature**: Use the slider or textbox to enter a value for
     temperature.

     The temperature is used for sampling during response generation, which occurs when `topP` and `topK` are applied. Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a less open-ended or creative response, while higher temperatures can lead to more diverse or creative results. A temperature of `0` means that the highest probability tokens are always selected. In this case, responses for a given prompt are mostly deterministic, but a small amount of variation is still possible.

     If the model returns a response that's too generic, too short, or the model gives a fallback
     response, try increasing the temperature. If the model enters infinite generation, increasing the
     temperature to at least `0.1` may lead to improved results.
     `1.0` is the recommended starting value for temperature.
   - **Output token limit**: Use the slider or textbox to enter a value for the
     max output limit.

     Maximum number of tokens that can be generated in the response. A token is approximately four characters. 100 tokens correspond to roughly 60-80 words.

     Specify a lower value for shorter responses and a higher value for potentially longer
     responses.
   - **Add stop sequence**: Optional. Enter a stop sequence, which is a series of characters that includes spaces. If the model encounters a stop sequence, the response generation stops. The stop sequence isn't included in the response, and you can add up to five stop sequences.
4. Optional: To configure advanced parameters, click **Advanced** and configure as follows: **Click to expand advanced configurations**
   - **Top-K**: Use the slider or textbox to enter a value for top-K.

     Top-K changes how the model selects tokens for output. A top-K of `1` means the next selected token is the most probable among all tokens in the model's vocabulary (also called greedy decoding), while a top-K of `3` means that the next token is selected from among the three most probable tokens by using temperature.

     For each token selection step, the top-K tokens with the highest
     probabilities are sampled. Then tokens are further filtered based on top-P with
     the final token selected using temperature sampling.

     Specify a lower value for less random responses and a higher value for more
     random responses.
   - **Top-P**: Use the slider or textbox to enter a value for top-P. Tokens are selected from most probable to the least until the sum of their probabilities equals the value of top-P. For the least variable results, set top-P to \`0\`.
   - **Enable Grounding** : Add a **grounding source** and **path** to customize this feature.
5. Enter your text prompt in the **Prompt** pane. The model uses previous messages as context for new responses.
6. Optional: To display the number of text tokens, click **View tokens** . You can view the tokens or token IDs of your text prompt.
   - To view the tokens in the text prompt that are highlighted with different colors marking the boundary of each token ID, click **Token ID to text**. Media tokens aren't supported.
   - To view the token IDs, click **Token ID** .

     To close the tokenizer tool pane, click **X**, or click outside of the pane.
7. Click **Submit**.
8. Optional: To save your prompt to **My prompts** , click **Save**.
9. Optional: To get the Python code or a curl command for your prompt, click **Get code**.
10. Optional: To clear all previous messages, click **Clear conversation**

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

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents="How does AI work?",
    )
    print(response.text)
    # Example response:
    # Okay, let's break down how AI works. It's a broad field, so I'll focus on the ...
    #
    # Here's a simplified overview:
    # ...

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

        "google.golang.org/genai"
    )

    // generateWithText shows how to generate text using a text prompt.
    func generateWithText(w io.Writer) error {
        ctx := context.Background()

        client, err := genai.NewClient(ctx, &genai.ClientConfig{
            HTTPOptions: genai.HTTPOptions{APIVersion: "v1"},
        })
        if err != nil {
            return fmt.Errorf("failed to create genai client: %w", err)
        }

        resp, err := client.Models.GenerateContent(ctx,
            "gemini-2.5-flash",
            genai.Text("How does AI work?"),
            nil,
        )
        if err != nil {
            return fmt.Errorf("failed to generate content: %w", err)
        }

        respText := resp.Text()

        fmt.Fprintln(w, respText)
        // Example response:
        // That's a great question! Understanding how AI works can feel like ...
        // ...
        // **1. The Foundation: Data and Algorithms**
        // ...

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

      const response = await client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'How does AI work?',
      });

      console.log(response.text);

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
    import com.google.genai.types.GenerateContentResponse;
    import com.google.genai.types.HttpOptions;

    public class TextGenerationWithText {

      public static void main(String[] args) {
        // TODO(developer): Replace these variables before running the sample.
        String modelId = "gemini-2.5-flash";
        generateContent(modelId);
      }

      // Generates text with text input
      public static String generateContent(String modelId) {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        try (Client client =
            Client.builder()
                .location("global")
                .vertexAI(true)
                .httpOptions(HttpOptions.builder().apiVersion("v1").build())
                .build()) {

          GenerateContentResponse response =
              client.models.generateContent(modelId, "How does AI work?", null);

          System.out.print(response.text());
          // Example response:
          // Okay, let's break down how AI works. It's a broad field, so I'll focus on the ...
          //
          // Here's a simplified overview:
          // ...
          return response.text();
        }
      }
    }

### C#

Learn how to install or update the [C#](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview).

To learn more, see the
[SDK reference documentation](https://github.com/googleapis/dotnet-genai).

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

    using Google.GenAI;
    using Google.GenAI.Types;
    using System;
    using System.Threading.Tasks;

    public class TextGenWithTxt
    {
        public async Task<string> GenerateContent(
            string projectId = "your-project-id",
            string location = "global",
            string model = "gemini-2.5-flash")
        {
            await using var client = new Client(
                project: projectId,
                location: location,
                vertexAI: true,
                httpOptions: new HttpOptions { ApiVersion = "v1" });

            GenerateContentResponse response = await client.Models.GenerateContentAsync(model: model, contents: "How does AI work?");

            string responseText = response.Candidates[0].Content.Parts[0].Text;
            Console.WriteLine(responseText);
            // Example response:
            // AI, or Artificial Intelligence, at its core, is about creating machines that can perform...
            // Here's a breakdown of how it generally works...
            return responseText;
        }
    }

### REST

Before using any of the request data,
make the following replacements:

- `GENERATE_RESPONSE_METHOD`: The type of response that you want the model to generate. Choose a method that generates how you want the model's response to be returned:
  - `streamGenerateContent`: The response is streamed as it's being generated to reduce the perception of latency to a human audience.
  - `generateContent`: The response is returned after it's fully generated.
- `LOCATION`: The region to process the request. Available options include the following: **Click to expand a partial list of available regions**
  - `us-central1`
  - `us-west4`
  - `northamerica-northeast1`
  - `us-east4`
  - `us-west1`
  - `asia-northeast3`
  - `asia-southeast1`
  - `asia-northeast1`
- `PROJECT_ID`: Your \[project ID\](/resource-manager/docs/creating-managing-projects#identifiers). .
- `MODEL_ID`: The model ID of the multimodal model that you want to use.
-

  ```
  TEXT1
  ```
  The text instructions to include in the first prompt of the multi-turn conversation. For example, `What are all the colors in a
  rainbow?`
-

  ```
  TEXT2
  ```
  The text instructions to include in the second prompt. For example, `Why does it appear when it rains?`
- `TEMPERATURE`: The temperature is used for sampling during response generation, which occurs when `topP` and `topK` are applied. Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a less open-ended or creative response, while higher temperatures can lead to more diverse or creative results. A temperature of `0` means that the highest probability tokens are always selected. In this case, responses for a given prompt are mostly deterministic, but a small amount of variation is still possible.

  If the model returns a response that's too generic, too short, or the model gives a fallback
  response, try increasing the temperature. If the model enters infinite generation, increasing the
  temperature to at least `0.1` may lead to improved results.
  `1.0` is the recommended starting value for temperature.

To send your request, choose one of these options:

#### curl

> [!NOTE]
> **Note:** The following command assumes that you have logged in to the `gcloud` CLI with your user account by running [`gcloud init`](https://docs.cloud.google.com/sdk/gcloud/reference/init) or [`gcloud auth login`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/login) , or by using [Cloud Shell](https://docs.cloud.google.com/shell/docs), which automatically logs you into the `gcloud` CLI . You can check the currently active account by running [`gcloud auth list`](https://docs.cloud.google.com/sdk/gcloud/reference/auth/list).

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
cat > request.json << 'EOF'
{
  "contents": [
    {
      "role": "user",
      "parts": { "text": "TEXT1" }
    },
    {
      "role": "model",
      "parts": { "text": "What a great question!" }
    },
    {
      "role": "user",
      "parts": { "text": "TEXT2" }
    }
  ],
  "generation_config": {
    "temperature": TEMPERATURE
  }
}
EOF
```

Then execute the following command to send your REST request:

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

Save the request body in a file named `request.json`.
Run the following command in the terminal to create or overwrite
this file in the current directory:

```
@'
{
  "contents": [
    {
      "role": "user",
      "parts": { "text": "TEXT1" }
    },
    {
      "role": "model",
      "parts": { "text": "What a great question!" }
    },
    {
      "role": "user",
      "parts": { "text": "TEXT2" }
    }
  ],
  "generation_config": {
    "temperature": TEMPERATURE
  }
}
'@  | Out-File -FilePath request.json -Encoding utf8
```

Then execute the following command to send your REST request:

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
            "text": "You're right to ask that! Rainbows are a beautiful and fascinating phenomenon. Here's the breakdown:\n\n**1. Sunlight and Water Droplets:**\n\n* Rainbows are created when sunlight interacts with water droplets suspended in the air, typically after rain.\n\n**2. Refraction and Reflection:**\n\n* **Refraction:** When sunlight enters a water droplet, it bends or refracts. This bending is different for each color of light (red bends the least, violet the most).\n* **Reflection:** Inside the droplet, the light bounces off the back surface and then refracts again as it exits the droplet.\n\n**3. Dispersion:**\n\n* The refraction and reflection process separates the white sunlight into its component colors, just like a prism. This separation of colors is called dispersion.\n\n**4. Our Perspective:**\n\n* You only see a rainbow when you're standing with the sun behind you and the rain in front of you. The colors appear in an arc because the angle at which the light refracts and reflects is specific for each color.\n\n**In short:**\n\nRainbows are created when sunlight hits water droplets in the air, causing the light to be refracted, reflected, and dispersed into its individual colors.  \n"
          }
        ]
      },
      "finishReason": "STOP",
      "safetyRatings": [
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.06255973,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.039937314
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.096705794,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.08404062
        },
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.10818896,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.036631368
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "probability": "NEGLIGIBLE",
          "probabilityScore": 0.116764,
          "severity": "HARM_SEVERITY_NEGLIGIBLE",
          "severityScore": 0.05023736
        }
      ]
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 22,
    "candidatesTokenCount": 256,
    "totalTokenCount": 278
  }
}
```

### Streaming and non-streaming responses

You can choose whether the model generates *streaming* responses or
*non-streaming* responses. For streaming responses, you receive each response
as soon as its output token is generated. For non-streaming responses, you receive
all responses after all of the output tokens are generated.

Here is a streaming text generation example.

### Python

Before trying this sample, follow the Python setup instructions in the
[Agent Platform quickstart using
client libraries](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/start/client-libraries).

To authenticate to Agent Platform, set up Application Default Credentials.
For more information, see

[Set up authentication for a local development environment](https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

    from google import genai
    from google.genai.types import HttpOptions

    client = genai.Client(http_options=HttpOptions(api_version="v1"))
    chat_session = client.chats.create(model="gemini-3.5-flash")

    for chunk in chat_session.send_message_stream("Why is the sky blue?"):
        print(chunk.text, end="")
    # Example response:
    # The
    #  sky appears blue due to a phenomenon called **Rayleigh scattering**. Here's
    #  a breakdown of why:
    # ...

## Gemini multiturn chat behavior

When you use multiturn chat, Gemini Enterprise Agent Platform locally stores the initial content
and prompts that you sent to the model. Gemini Enterprise Agent Platform sends all of this data with
each subsequent request to the model. Consequently, the input costs for each
message that you send is a running total of all the data that was already sent
to the model. If your initial content is sufficiently large, consider using
[context caching](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/context-cache/context-cache-overview) when you create the initial model object to better
control input costs.

## What's next

- Learn how to send multimodal prompt requests:
  - [Image understanding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/image-understanding)
  - [Video understanding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/video-understanding)
  - [Audio understanding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/audio-understanding)
  - [Document understanding](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/document-understanding)
- Learn about [responsible AI best practices and Agent Platform's safety filters](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai).
