The Google Gen AI SDK provides a unified interface to Gemini models
through both the Gemini Developer API
and the Gemini API on Gemini Enterprise Agent Platform. With a few exceptions, code
that runs on one platform will run on both. This means that you can prototype an
application using the Gemini Developer API and then migrate the
application to Gemini Enterprise Agent Platform without rewriting your code.

To learn more about the differences between the Gemini Developer
API and Gemini on Gemini Enterprise Agent Platform, see
[Migrate from the Gemini Developer API to the Gemini API in Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/migrate).

> [!NOTE]
> To see an example of the Google Gen AI SDK,
> run the "Intro to the Google Gen AI SDK" notebook in one of the following
> environments:
>
> [!Open in Colab](https://colab.research.google.com/github/GoogleCloudPlatform/generative-ai/blob/main/sdk/intro_genai_sdk.ipynb)
>
>
> \|
>
> [!Open in Colab Enterprise](https://console.cloud.google.com/agent-platform/colab/import/https%3A%2F%2Fraw.githubusercontent.com%2FGoogleCloudPlatform%2Fgenerative-ai%2Fmain%2Fsdk%2Fintro_genai_sdk.ipynb)
>
>
> \|
>
> [!Open
> in Agent Platform Workbench](https://console.cloud.google.com/agent-platform/workbench/deploy-notebook?download_url=https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/sdk/intro_genai_sdk.ipynb)
>
>
> \|
>
> [!View on GitHub](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/sdk/intro_genai_sdk.ipynb)

### Python

The Google Gen AI SDK for Python is available on PyPI and GitHub:

- [`google-genai` on PyPI](https://pypi.org/project/google-genai/)
- [`python-genai` on GitHub](https://github.com/googleapis/python-genai)

To learn more, see the [Python SDK reference](https://googleapis.github.io/python-genai/).

### Install

```
pip install --upgrade google-genai
```

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

### Quickstart

Choose one of the following options, depending on whether you're using
Agent Platform in [express mode](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview#workflow) or not.

- **Use Agent Platform (with all Google Cloud capabilities and services)**

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

- **Use Agent Platform in express mode**

    from google import genai

    # TODO(developer): Update below line
    API_KEY = "YOUR_API_KEY"

    client = genai.Client(vertexai=True, api_key=API_KEY)

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents="Explain bubble sort to me.",
    )

    print(response.text)
    # Example response:
    # Bubble Sort is a simple sorting algorithm that repeatedly steps through the list

### Go

The Google Gen AI SDK for Go is available on go.dev and GitHub:

- [`google-genai` on go.dev](https://pkg.go.dev/google.golang.org/genai)
- [`go-genai` on GitHub](https://github.com/googleapis/go-genai)

### Install

```
go get google.golang.org/genai
```

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

### Quickstart

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

The Google Gen AI SDK for TypeScript and JavaScript is available on npm and GitHub:

- [`@google/genai` on npm](https://www.npmjs.com/package/@google/genai)
- [`js-genai` on GitHub](https://github.com/googleapis/js-genai)

### Install

```
npm install @google/genai
```

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

### Quickstart

    /**
     * @license
     * Copyright 2025 Google LLC
     * SPDX-License-Identifier: Apache-2.0
     */
    import {GoogleGenAI} from '@google/genai';

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
    const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION;
    const GOOGLE_GENAI_USE_VERTEXAI = process.env.GOOGLE_GENAI_USE_VERTEXAI;

    async function generateContentFromMLDev() {
      const ai = new GoogleGenAI({vertexai: false, apiKey: GEMINI_API_KEY});
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: 'why is the sky blue?',
      });
      console.debug(response.text);
    }

    async function generateContentFromVertexAI() {
      const ai = new GoogleGenAI({
        vertexai: true,
        project: GOOGLE_CLOUD_PROJECT,
        location: GOOGLE_CLOUD_LOCATION,
      });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: 'why is the sky blue?',
      });
      console.debug(response.text);
    }

    async function main() {
      if (GOOGLE_GENAI_USE_VERTEXAI) {
        await generateContentFromVertexAI().catch((e) =>
          console.error('got error', e),
        );
      } else {
        await generateContentFromMLDev().catch((e) =>
          console.error('got error', e),
        );
      }
    }

    main();

### Java

The Google Gen AI SDK for Java is available on Maven Central and GitHub:

- [`google-genai` on Maven Central](https://search.maven.org/artifact/com.google.genai/google-genai)
- [`java-genai` on GitHub](https://github.com/googleapis/java-genai)

### Maven Install

    <dependencies>
      <dependency>
        <groupId>com.google.genai</groupId>
        <artifactId>google-genai</artifactId>
        <version>1.4.1</version>
      </dependency>
    </dependencies>

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

### Quickstart

    /*
     * Copyright 2025 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * Usage:
     *
     * <p>1a. If you are using Vertex AI, setup ADC to get credentials:
     * https://cloud.google.com/docs/authentication/provide-credentials-adc#google-idp
     *
     * <p>Then set Project, Location, and USE_VERTEXAI flag as environment variables:
     *
     * <p>export GOOGLE_CLOUD_PROJECT=YOUR_PROJECT
     *
     * <p>export GOOGLE_CLOUD_LOCATION=YOUR_LOCATION
     *
     * <p>export GOOGLE_GENAI_USE_VERTEXAI=true
     *
     * <p>1b. If you are using Gemini Developer API, set an API key environment variable. You can find a
     * list of available API keys here: https://aistudio.google.com/app/apikey
     *
     * <p>export GOOGLE_API_KEY=YOUR_API_KEY
     *
     * <p>2. Compile the java package and run the sample code.
     *
     * <p>mvn clean compile exec:java -Dexec.mainClass="com.google.genai.examples.GenerateContent"
     * -Dexec.args="YOUR_MODEL_ID"
     */
    package com.google.genai.examples;

    import com.google.genai.Client;
    import com.google.genai.types.GenerateContentResponse;

    /** An example of using the Unified Gen AI Java SDK to generate content. */
    public final class GenerateContent {
      public static void main(String[] args) {
        final String modelId;
        if (args.length != 0) {
          modelId = args[0];
        } else {
          modelId = Constants.GEMINI_MODEL_NAME;
        }

        // Instantiate the client. The client by default uses the Gemini Developer API. It gets the API
        // key from the environment variable `GOOGLE_API_KEY`. Vertex AI API can be used by setting the
        // environment variables `GOOGLE_CLOUD_LOCATION` and `GOOGLE_CLOUD_PROJECT`, as well as setting
        // `GOOGLE_GENAI_USE_VERTEXAI` to "true".
        //
        // Note: Some services are only available in a specific API backend (Gemini or Vertex), you will
        // get a `UnsupportedOperationException` if you try to use a service that is not available in
        // the backend you are using.
        Client client = new Client();

        if (client.vertexAI()) {
          System.out.println("Using Vertex AI");
        } else {
          System.out.println("Using Gemini Developer API");
        }

        GenerateContentResponse response =
            client.models.generateContent(modelId, "What is your name?", null);

        // Gets the text string from the response by the quick accessor method `text()`.
        System.out.println("Unary response: " + response.text());

        // Gets the http headers from the response.
        response
            .sdkHttpResponse()
            .ifPresent(
                httpResponse ->
                    System.out.println("Response headers: " + httpResponse.headers().orElse(null)));
      }

      private GenerateContent() {}
    }

### C#

The Google Gen AI SDK for .NET is available on NuGet and GitHub:

- [`Google.GenAI` on NuGet](https://www.nuget.org/packages/Google.GenAI/)
- [`dotnet-genai` on GitHub](https://github.com/googleapis/dotnet-genai)

### Install

```
dotnet add package Google.GenAI
```

Set environment variables to use the Gen AI SDK with Vertex AI:

```bash
# Replace the `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION` values
# with appropriate values for your project.
export GOOGLE_CLOUD_PROJECT=GOOGLE_CLOUD_PROJECT
export GOOGLE_CLOUD_LOCATION=global
export GOOGLE_GENAI_USE_ENTERPRISE=True
```

### Quickstart

    /*
     * Copyright 2025 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *      https://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    using Google.GenAI;
    using Google.GenAI.Types;

    public class GenerateContentSimpleText {
      public static async Task SendRequestAsync() {
        string apiKey = System.Environment.GetEnvironmentVariable("GEMINI_API_KEY");
        var geminiClient = new Client(apiKey: apiKey);
        try {
          var geminiResponse = await geminiClient.Models.GenerateContentAsync(
              model: "gemini-2.0-flash", contents: "What is the capital of France?");
          Console.WriteLine("Gemini API Response:");
          Console.WriteLine(geminiResponse.Text);
        } catch (HttpRequestException ex) {
          Console.WriteLine($"An error occurred with Gemini API: {ex.ToString()}");
        }

        string project = System.Environment.GetEnvironmentVariable("GOOGLE_CLOUD_PROJECT");
        string location = System.Environment.GetEnvironmentVariable("GOOGLE_CLOUD_LOCATION") ?? "us-central1";
        Content contents = new Content {
          Role = "user", Parts = new List<Part> { new Part { Text = "What is the capital of France?" } }
        };

        var vertexClient = new Client(project: project, location: location, vertexAI: true);
        try {
          var vertexResponse = await vertexClient.Models.GenerateContentAsync(model: "gemini-2.0-flash",
                                                                              contents: contents);
          Console.WriteLine("Vertex AI API Response:");
          Console.WriteLine(vertexResponse.Text);
        } catch (Exception ex) {
          Console.WriteLine($"An error occurred with Vertex AI API: {ex.Message}");
        }
      }
    }
