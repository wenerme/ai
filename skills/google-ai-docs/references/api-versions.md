This document provides a high-level overview of the differences between the `v1`
and `v1beta` versions of the Gemini API.

- **v1** : Stable version of the API. Features in the stable version are fully-supported over the lifetime of the major version. If there are any breaking changes, then the next major version of the API will be created and the existing version will be deprecated after a reasonable period of time. Non-breaking changes may be introduced to the API without changing the major version. As of June 2026, the **Interactions API** is Generally Available and supported in `v1`.
- **v1beta** : This version includes early features and capabilities that are actively being developed. While features in `v1beta` may be subject to changes as we refine them based on feedback, it lets you try new capabilities before they are promoted to stable.

| Feature | v1 | v1beta |
|---|---|---|
| Interactions API | Yes | Yes |
| Generate Content - Text-only input | Yes | Yes |
| Generate Content - Text-and-image input | Yes | Yes |
| Generate Content - Text output | Yes | Yes |
| Generate Content - Multi-turn conversations (chat) | Yes | Yes |
| Generate Content - Function calls |   | Yes |
| Generate Content - Streaming | Yes | Yes |
| Embed Content - Text-only input | Yes | Yes |
| Generate Answer |   | Yes |
| Semantic retriever |   | Yes |

- Yes - Supported
- No - Will never be supported

## Configure API version in an SDK

The Gemini API SDKs default to `v1beta`, but you can explicitly specify versions
by setting the API version as shown in the following code sample:

> [!NOTE]
> **Note:** The GenAI SDKs use \`v1beta\` by default to enable access to preview features. You can configure the SDK to use the stable \`v1\` version (as shown below) which also supports the Interactions API.

### Python

    from google import genai

    client = genai.Client(http_options={'api_version': 'v1'})

    interaction = client.interactions.create(
        model='gemini-3.5-flash',
        input="Explain how AI works",
    )

    print(interaction.output_text)

### JavaScript

    import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({
      httpOptions: { apiVersion: "v1" },
    });

    async function main() {
      const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash",
        input: "Explain how AI works",
      });
      console.log(interaction.output_text);
    }

    await main();

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -d '{
        "model": "gemini-3.5-flash",
        "input": "Explain how AI works"
      }'