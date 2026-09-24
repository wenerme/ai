The Gemini API enables Retrieval Augmented Generation ("RAG") through the File
Search tool. File Search imports, chunks, and indexes your data to
enable fast retrieval of relevant information based on a provided prompt. This
retrieved information is then used as context for the model, allowing it to
provide more accurate and relevant answers. File search is also able to
provide multimodal capabilities with text embeddings supported by
`gemini-embedding-001`, and image/multimodal embedding supported by `gemini-embedding-2`.

> [!NOTE]
> **Note:** Audio and video formats are not currently supported.

File storage and embedding generation at query time is free, and you'll only pay
for creating embeddings when you first index your files and the normal Gemini
model input / output tokens cost. This new billing paradigm makes the File
Search Tool both easier and more cost-effective to build and scale with. See
[pricing](https://ai.google.dev/gemini-api/docs/file-search#pricing) section for details.

## Directly upload to File Search store

This example shows how to directly upload a file to the
[file search store](https://ai.google.dev/api/file-search/file-search-stores#method:-media.uploadtofilesearchstore):

### Python

    from google import genai
    from google.genai import types
    import time

    client = genai.Client()

    file_search_store = client.file_search_stores.create(
        config={
            'display_name': 'your-fileSearchStore-name',
            'embedding_model': 'models/gemini-embedding-2'
        }
    )

    operation = client.file_search_stores.upload_to_file_search_store(
      file='sample.txt',
      file_search_store_name=file_search_store.name,
      config={
          'display_name' : 'display-file-name',
      }
    )

    while not operation.done:
        time.sleep(5)
        operation = client.operations.get(operation)

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input="Can you tell me about [insert question]",
        tools=[{
            "type": "file_search",
            "file_search_store_names": [file_search_store.name]
        }]
    )

    for step in interaction.steps:
        if step.type == "model_output":
            for content_block in step.content:
                if content_block.type == "text":
                    print(content_block.text)
                    if content_block.annotations:
                        print("\nSources:")
                        for annotation in content_block.annotations:
                            if annotation.type == "file_citation":
                                print(f"  - {annotation.file_name}: {annotation.source}")

### JavaScript

    import { GoogleGenAI } from '@google/genai';

    const ai = new GoogleGenAI({});

    async function run() {
      const fileSearchStore = await ai.fileSearchStores.create({
        config: {
          displayName: 'your-fileSearchStore-name',
          embeddingModel: 'models/gemini-embedding-2'
        }
      });

      let operation = await ai.fileSearchStores.uploadToFileSearchStore({
        file: 'file.txt',
        fileSearchStoreName: fileSearchStore.name,
        config: {
          displayName: 'file-name',
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.get({ operation });
      }

      const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: "Can you tell me about [insert question]",
        tools: [{
          type: "file_search",
          file_search_store_names: [fileSearchStore.name]
        }]
      });

      for (const step of interaction.steps) {
        if (step.type === 'model_output') {
          for (const contentBlock of step.content) {
            if (contentBlock.type === 'text') {
              console.log(contentBlock.text);
              if (contentBlock.annotations) {
                console.log("\nSources:");
                for (const annotation of contentBlock.annotations) {
                  if (annotation.type === 'file_citation') {
                    console.log(`  - ${annotation.file_name}: ${annotation.source}`);
                  }
                }
              }
            }
          }
        }
      }
    }

    run();

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Annotation;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.FileCitation;
    import com.google.genai.gaos.models.interactions.FileSearch;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ModelOutputStep;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import com.google.genai.types.CreateFileSearchStoreConfig;
    import com.google.genai.types.FileSearchStore;
    import com.google.genai.types.UploadToFileSearchStoreConfig;
    import com.google.genai.types.UploadToFileSearchStoreOperation;
    import java.util.Arrays;

    Client client = new Client();

    FileSearchStore fileSearchStore =
        client.fileSearchStores.create(
            CreateFileSearchStoreConfig.builder()
                .displayName("your-fileSearchStore-name")
                .embeddingModel("models/gemini-embedding-2")
                .build());

    UploadToFileSearchStoreOperation operation =
        client.fileSearchStores.uploadToFileSearchStore(
            fileSearchStore.name().get(),
            "sample.txt",
            UploadToFileSearchStoreConfig.builder().displayName("display-file-name").build());

    while (!operation.done().orElse(false)) {
      Thread.sleep(5000);
      operation = client.operations.get(operation, null);
    }

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.of("Can you tell me about [insert question]"))
            .tools(
                Arrays.asList(
                    FileSearch.builder()
                        .fileSearchStoreNames(Arrays.asList(fileSearchStore.name().get()))
                        .build()))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.steps().isPresent()) {
      for (Step step : interaction.steps().get()) {
        if (step instanceof ModelOutputStep) {
          ModelOutputStep outputStep = (ModelOutputStep) step;
          if (outputStep.content().isPresent()) {
            for (Content contentBlock : outputStep.content().get()) {
              if (contentBlock instanceof TextContent) {
                TextContent textContent = (TextContent) contentBlock;
                System.out.println(textContent.text().orElse(""));
                if (textContent.annotations().isPresent()
                    && !textContent.annotations().get().isEmpty()) {
                  System.out.println("\nSources:");
                  for (Annotation annotation : textContent.annotations().get()) {
                    if (annotation instanceof FileCitation) {
                      FileCitation citation = (FileCitation) annotation;
                      System.out.printf(
                          "  - %s: %s%n",
                          citation.fileName().orElse(""), citation.source().orElse(""));
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

### Go

    package main

    import (
        "context"
        "fmt"
        "log"
        "time"

        "google.golang.org/genai"
        "google.golang.org/genai/interactions/models/interactions"
        "google.golang.org/genai/interactions/models/operations"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        fileSearchStore, err := client.FileSearchStores.Create(ctx, &genai.CreateFileSearchStoreConfig{
            DisplayName:    "your-fileSearchStore-name",
            EmbeddingModel: "models/gemini-embedding-2",
        })
        if err != nil {
            log.Fatal(err)
        }

        operation, err := client.FileSearchStores.UploadToFileSearchStoreFromPath(
            ctx,
            "sample.txt",
            fileSearchStore.Name,
            &genai.UploadToFileSearchStoreConfig{
                DisplayName: "display-file-name",
            },
        )
        if err != nil {
            log.Fatal(err)
        }

        for !operation.Done {
            time.Sleep(5 * time.Second)
            operation, err = client.Operations.GetUploadToFileSearchStoreOperation(ctx, operation, nil)
            if err != nil {
                log.Fatal(err)
            }
        }

        resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(
                interactions.CreateModelInteraction{
                    Model: interactions.Model("gemini-3.8-flash"),
                    Input: interactions.NewInteractionsInput("Can you tell me about [insert question]"),
                    Tools: []interactions.Tool{
                        interactions.NewTool(interactions.FileSearch{
                            FileSearchStoreNames: []string{fileSearchStore.Name},
                        }),
                    },
                },
            ),
        })
        if err != nil {
            log.Fatal(err)
        }

        for _, step := range resp.Interaction.Steps {
            if step.ModelOutputStep != nil {
                for _, content := range step.ModelOutputStep.Content {
                    if content.TextContent != nil {
                        fmt.Println(content.TextContent.Text)
                        if len(content.TextContent.Annotations) > 0 {
                            fmt.Println("\nSources:")
                            for _, annotation := range content.TextContent.Annotations {
                                if annotation.FileCitation != nil {
                                    c := annotation.FileCitation
                                    fileName := ""
                                    if c.FileName != nil {
                                        fileName = *c.FileName
                                    }
                                    source := ""
                                    if c.Source != nil {
                                        source = *c.Source
                                    }
                                    fmt.Printf("  - %s: %s\n", fileName, source)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

### REST

    # 1. Create a File Search store
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=$GEMINI_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{
          "displayName": "your-file-search-store-name",
          "embeddingModel": "models/gemini-embedding-2"
        }' > store_res.json

    FILE_SEARCH_STORE_NAME=$(jq -r ".name" store_res.json)

    # 2. Upload directly to File Search store using resumable upload
    NUM_BYTES=$(wc -c < "sample.txt")
    curl "https://generativelanguage.googleapis.com/upload/v1beta/fileSearchStores/$FILE_SEARCH_STORE_NAME:uploadToFileSearchStore?key=$GEMINI_API_KEY" \
        -D upload-header.tmp \
        -H "X-Goog-Upload-Protocol: resumable" \
        -H "X-Goog-Upload-Command: start" \
        -H "X-Goog-Upload-Header-Content-Length: $NUM_BYTES" \
        -H "X-Goog-Upload-Header-Content-Type: text/plain" \
        -H "Content-Type: application/json" \
        -d '{"displayName": "sample.txt"}' 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " upload-header.tmp | cut -d" " -f2 | tr -d "\r")
    rm upload-header.tmp

    curl "${upload_url}" \
        -H "Content-Length: $NUM_BYTES" \
        -H "X-Goog-Upload-Offset: 0" \
        -H "X-Goog-Upload-Command: upload, finalize" \
        --data-binary "@sample.txt" 2> /dev/null > upload_response.json

    cat upload_response.json

    # 3. Query using the File Search store
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{
          "model": "gemini-3.8-flash",
          "input": "Can you tell me about [insert question]",
          "tools": [{
            "type": "file_search",
            "file_search_store_names": ["'"$FILE_SEARCH_STORE_NAME"'"]
          }]
        }'

Check the API reference for [`uploadToFileSearchStore`](https://ai.google.dev/api/file-search/file-search-stores#method:-media.uploadtofilesearchstore) for more information.

## Importing files

Alternatively, you can upload an existing file and [import it to your file search store](https://ai.google.dev/api/file-search/file-search-stores#method:-filesearchstores.importfile):

### Python

    from google import genai
    from google.genai import types
    import time

    client = genai.Client()

    sample_file = client.files.upload(file='sample.txt', config={'display_name': 'display_file_name'})

    file_search_store = client.file_search_stores.create(
        config={
            'display_name': 'your-fileSearchStore-name',
            'embedding_model': 'models/gemini-embedding-2'
        }
    )

    operation = client.file_search_stores.import_file(
        file_search_store_name=file_search_store.name,
        file_name=sample_file.name
    )

    while not operation.done:
        time.sleep(5)
        operation = client.operations.get(operation)

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input="Can you tell me about [insert question]",
        tools=[{
            "type": "file_search",
            "file_search_store_names": [file_search_store.name]
        }]
    )

    for step in interaction.steps:
        if step.type == "model_output":
            for content_block in step.content:
                if content_block.type == "text":
                    print(content_block.text)

### JavaScript

    import { GoogleGenAI } from '@google/genai';

    const ai = new GoogleGenAI({});

    async function run() {
      const sampleFile = await ai.files.upload({
        file: 'sample.txt',
        config: { displayName: 'file-name' }
      });

      const fileSearchStore = await ai.fileSearchStores.create({
        config: {
          displayName: 'your-fileSearchStore-name',
          embeddingModel: 'models/gemini-embedding-2'
        }
      });

      let operation = await ai.fileSearchStores.importFile({
        fileSearchStoreName: fileSearchStore.name,
        fileName: sampleFile.name
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.get({ operation: operation });
      }

      const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: "Can you tell me about [insert question]",
        tools: [{
          type: "file_search",
          file_search_store_names: [fileSearchStore.name]
        }]
      });

      for (const step of interaction.steps) {
        if (step.type === 'model_output') {
          for (const contentBlock of step.content) {
            if (contentBlock.type === 'text') {
              console.log(contentBlock.text);
            }
          }
        }
      }
    }

    run();

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.FileSearch;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ModelOutputStep;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import com.google.genai.types.CreateFileSearchStoreConfig;
    import com.google.genai.types.File;
    import com.google.genai.types.FileSearchStore;
    import com.google.genai.types.ImportFileOperation;
    import com.google.genai.types.UploadFileConfig;
    import java.util.Arrays;

    Client client = new Client();

    File sampleFile =
        client.files.upload(
            "sample.txt", UploadFileConfig.builder().displayName("display_file_name").build());

    FileSearchStore fileSearchStore =
        client.fileSearchStores.create(
            CreateFileSearchStoreConfig.builder()
                .displayName("your-fileSearchStore-name")
                .embeddingModel("models/gemini-embedding-2")
                .build());

    ImportFileOperation operation =
        client.fileSearchStores.importFile(
            fileSearchStore.name().get(), sampleFile.name().get(), null);

    while (!operation.done().orElse(false)) {
      Thread.sleep(5000);
      operation = client.operations.get(operation, null);
    }

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.of("Can you tell me about [insert question]"))
            .tools(
                Arrays.asList(
                    FileSearch.builder()
                        .fileSearchStoreNames(Arrays.asList(fileSearchStore.name().get()))
                        .build()))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.steps().isPresent()) {
      for (Step step : interaction.steps().get()) {
        if (step instanceof ModelOutputStep) {
          ModelOutputStep outputStep = (ModelOutputStep) step;
          if (outputStep.content().isPresent()) {
            for (Content contentBlock : outputStep.content().get()) {
              if (contentBlock instanceof TextContent) {
                TextContent textContent = (TextContent) contentBlock;
                System.out.println(textContent.text().orElse(""));
              }
            }
          }
        }
      }
    }

### Go

    package main

    import (
        "context"
        "fmt"
        "log"
        "time"

        "google.golang.org/genai"
        "google.golang.org/genai/interactions/models/interactions"
        "google.golang.org/genai/interactions/models/operations"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        sampleFile, err := client.Files.UploadFromPath(ctx, "sample.txt", &genai.UploadFileConfig{
            DisplayName: "display_file_name",
        })
        if err != nil {
            log.Fatal(err)
        }

        fileSearchStore, err := client.FileSearchStores.Create(ctx, &genai.CreateFileSearchStoreConfig{
            DisplayName:    "your-fileSearchStore-name",
            EmbeddingModel: "models/gemini-embedding-2",
        })
        if err != nil {
            log.Fatal(err)
        }

        operation, err := client.FileSearchStores.ImportFile(ctx, fileSearchStore.Name, sampleFile.Name, nil)
        if err != nil {
            log.Fatal(err)
        }

        for !operation.Done {
            time.Sleep(5 * time.Second)
            operation, err = client.Operations.GetImportFileOperation(ctx, operation, nil)
            if err != nil {
                log.Fatal(err)
            }
        }

        resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(
                interactions.CreateModelInteraction{
                    Model: interactions.Model("gemini-3.8-flash"),
                    Input: interactions.NewInteractionsInput("Can you tell me about [insert question]"),
                    Tools: []interactions.Tool{
                        interactions.NewTool(interactions.FileSearch{
                            FileSearchStoreNames: []string{fileSearchStore.Name},
                        }),
                    },
                },
            ),
        })
        if err != nil {
            log.Fatal(err)
        }

        for _, step := range resp.Interaction.Steps {
            if step.ModelOutputStep != nil {
                for _, content := range step.ModelOutputStep.Content {
                    if content.TextContent != nil {
                        fmt.Println(content.TextContent.Text)
                    }
                }
            }
        }
    }

### REST

    # 1. Upload file using the Files API
    NUM_BYTES=$(wc -c < "sample.txt")
    curl "https://generativelanguage.googleapis.com/upload/v1beta/files?key=$GEMINI_API_KEY" \
        -D upload-header.tmp \
        -H "X-Goog-Upload-Protocol: resumable" \
        -H "X-Goog-Upload-Command: start" \
        -H "X-Goog-Upload-Header-Content-Length: $NUM_BYTES" \
        -H "X-Goog-Upload-Header-Content-Type: text/plain" \
        -H "Content-Type: application/json" \
        -d '{"file": {"displayName": "sample.txt"}}' 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " upload-header.tmp | cut -d" " -f2 | tr -d "\r")
    rm upload-header.tmp

    curl "${upload_url}" \
        -H "Content-Length: $NUM_BYTES" \
        -H "X-Goog-Upload-Offset: 0" \
        -H "X-Goog-Upload-Command: upload, finalize" \
        --data-binary "@sample.txt" 2> /dev/null > file_info.json

    FILE_NAME=$(jq -r ".file.name" file_info.json)

    # 2. Create a File Search store
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=$GEMINI_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{
          "displayName": "your-file-search-store-name",
          "embeddingModel": "models/gemini-embedding-2"
        }' > store_res.json

    FILE_SEARCH_STORE_NAME=$(jq -r ".name" store_res.json)

    # 3. Import the file into the File Search store
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/fileSearchStores/$FILE_SEARCH_STORE_NAME:importFile?key=$GEMINI_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{"fileName": "'"$FILE_NAME"'"}'

    # 4. Query using the File Search store
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{
          "model": "gemini-3.8-flash",
          "input": "Can you tell me about [insert question]",
          "tools": [{
            "type": "file_search",
            "file_search_store_names": ["'"$FILE_SEARCH_STORE_NAME"'"]
          }]
        }'

Check the API reference for [`importFile`](https://ai.google.dev/api/file-search/file-search-stores#method:-filesearchstores.importfile) for more information.

## Chunking configuration

When you import a file into a File Search store, it's automatically broken down
into chunks, embedded, indexed, and uploaded to your File Search store. If you
need more control over the chunking strategy, you can specify a
[`chunking_config`](https://ai.google.dev/api/file-search/file-search-stores#request-body_5) setting
to set a maximum number of tokens per chunk and maximum number of overlapping
tokens.

### Python

    from google import genai
    from google.genai import types
    import time

    client = genai.Client()

    operation = client.file_search_stores.upload_to_file_search_store(
        file_search_store_name=file_search_store.name,
        file='sample.txt',
        config={
            'chunking_config': {
              'white_space_config': {
                'max_tokens_per_chunk': 200,
                'max_overlap_tokens': 20
              }
            }
        }
    )

    while not operation.done:
        time.sleep(5)
        operation = client.operations.get(operation)

    print("Custom chunking complete.")

### JavaScript

    import { GoogleGenAI } from '@google/genai';

    const ai = new GoogleGenAI({});

    let operation = await ai.fileSearchStores.uploadToFileSearchStore({
      file: 'file.txt',
      fileSearchStoreName: fileSearchStore.name,
      config: {
        displayName: 'file-name',
        chunkingConfig: {
          whiteSpaceConfig: {
            maxTokensPerChunk: 200,
            maxOverlapTokens: 20
          }
        }
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.get({ operation });
    }
    console.log("Custom chunking complete.");

### Java

    import com.google.genai.Client;
    import com.google.genai.types.ChunkingConfig;
    import com.google.genai.types.UploadToFileSearchStoreConfig;
    import com.google.genai.types.UploadToFileSearchStoreOperation;
    import com.google.genai.types.WhiteSpaceConfig;

    Client client = new Client();

    UploadToFileSearchStoreOperation operation =
        client.fileSearchStores.uploadToFileSearchStore(
            "fileSearchStores/my-file-search-store",
            "sample.txt",
            UploadToFileSearchStoreConfig.builder()
                .displayName("file-name")
                .chunkingConfig(
                    ChunkingConfig.builder()
                        .whiteSpaceConfig(
                            WhiteSpaceConfig.builder()
                                .maxTokensPerChunk(200)
                                .maxOverlapTokens(20)
                                .build())
                        .build())
                .build());

    while (!operation.done().orElse(false)) {
      Thread.sleep(5000);
      operation = client.operations.get(operation, null);
    }

    System.out.println("Custom chunking complete.");

### Go

    package main

    import (
        "context"
        "fmt"
        "log"
        "time"

        "google.golang.org/genai"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        operation, err := client.FileSearchStores.UploadToFileSearchStoreFromPath(
            ctx,
            "sample.txt",
            "fileSearchStores/my-file-search-store",
            &genai.UploadToFileSearchStoreConfig{
                DisplayName: "file-name",
                ChunkingConfig: &genai.ChunkingConfig{
                    WhiteSpaceConfig: &genai.WhiteSpaceConfig{
                        MaxTokensPerChunk: genai.Ptr(int32(200)),
                        MaxOverlapTokens:  genai.Ptr(int32(20)),
                    },
                },
            },
        )
        if err != nil {
            log.Fatal(err)
        }

        for !operation.Done {
            time.Sleep(5 * time.Second)
            operation, err = client.Operations.GetUploadToFileSearchStoreOperation(ctx, operation, nil)
            if err != nil {
                log.Fatal(err)
            }
        }

        fmt.Println("Custom chunking complete.")
    }

### REST

    NUM_BYTES=$(wc -c < "sample.txt")
    curl "https://generativelanguage.googleapis.com/upload/v1beta/fileSearchStores/$FILE_SEARCH_STORE_NAME:uploadToFileSearchStore?key=$GEMINI_API_KEY" \
        -D upload-header.tmp \
        -H "X-Goog-Upload-Protocol: resumable" \
        -H "X-Goog-Upload-Command: start" \
        -H "X-Goog-Upload-Header-Content-Length: $NUM_BYTES" \
        -H "X-Goog-Upload-Header-Content-Type: text/plain" \
        -H "Content-Type: application/json" \
        -d '{
          "displayName": "sample.txt",
          "chunkingConfig": {
            "whiteSpaceConfig": {
              "maxTokensPerChunk": 200,
              "maxOverlapTokens": 20
            }
          }
        }' 2> /dev/null

    upload_url=$(grep -i "x-goog-upload-url: " upload-header.tmp | cut -d" " -f2 | tr -d "\r")
    rm upload-header.tmp

    curl "${upload_url}" \
        -H "Content-Length: $NUM_BYTES" \
        -H "X-Goog-Upload-Offset: 0" \
        -H "X-Goog-Upload-Command: upload, finalize" \
        --data-binary "@sample.txt" 2> /dev/null > upload_response.json

    cat upload_response.json

To use your File Search store, pass it as a tool to the `interactions.create`
method, as shown in the [Upload](https://ai.google.dev/gemini-api/docs/file-search#upload) and [Import](https://ai.google.dev/gemini-api/docs/file-search#importing-files) examples.

## How it works

File Search uses a technique called semantic search to find information relevant
to the user prompt. Unlike standard keyword-based search, semantic search
understands the meaning and context of your query.

When you import a file, it's converted into numerical representations called
[embeddings](https://ai.google.dev/gemini-api/docs/embeddings), which capture the semantic meaning of
the uploaded content. These embeddings are stored in a specialized File Search database.
When you make a query, it's also converted into an embedding. Then the system
performs a File Search to find the most similar and relevant document chunks
from the File Search store.

There is no Time To Live (TTL) for embeddings;
they persist until manually deleted, or when the model is deprecated. Files,
however, are deleted after 48 hours.

Here's a breakdown of the process for using the File Search
`uploadToFileSearchStore` API:

1. **Create a File Search store**: A File Search store contains the processed
   data from your files. It's the persistent container for the embeddings that the
   semantic search will operate on.

2. **Upload a file and import into a File Search store** : Simultaneously upload
   a file and import the results into your File Search store. This creates a
   temporary `File` object, which is a reference to your raw document. That data is
   then chunked, converted into File Search embeddings, and indexed. The `File`
   object gets deleted after 48 hours, while the data imported into the File Search
   store will be stored indefinitely until you choose to delete it.

3. **Query with File Search** : Finally, you use the `FileSearch` tool in a
   `generateContent` call. In the tool configuration, you specify a
   `FileSearchRetrievalResource`, which points to the `FileSearchStore` you want to
   search. This tells the model to perform a semantic search on that specific
   File Search store to find relevant information to ground its response.

![The indexing and querying process of File Search](https://ai.google.dev/static/gemini-api/docs/images/File-search.png) The indexing and querying process of File Search

In this diagram, the dotted line from *Documents* to *Embedding model*
(using [`gemini-embedding-001`](https://ai.google.dev/gemini-api/docs/embeddings))
represents the `uploadToFileSearchStore` API (bypassing *File storage* ).
Otherwise, using the [Files API](https://ai.google.dev/gemini-api/docs/files) to separately create
and then import files moves the indexing process from *Documents* to
*File storage* and then to *Embedding model*.

## File Search stores

A File Search store is a container for your document embeddings. While raw files
uploaded through the File API are deleted after 48 hours, the data imported into
a File Search store is stored indefinitely until you manually delete it. You can
create multiple File Search stores to organize your documents. The
`FileSearchStore` API lets you create, list, get, and delete to manage your file
search stores. File Search store names are globally scoped.

Here are some examples of how to manage your File Search stores:

### Python

    file_search_store = client.file_search_stores.create(
        config={
            'display_name': 'myfilesearchstore123',
            'embedding_model': 'models/gemini-embedding-2'
        }
    )

    for store in client.file_search_stores.list():
        print(store)

    my_file_search_store = client.file_search_stores.get(name=file_search_store.name)

    client.file_search_stores.delete(name=file_search_store.name, config={'force': True})

### JavaScript

    const fileSearchStore = await ai.fileSearchStores.create({
      config: {
        displayName: 'myfilesearchstore123',
        embeddingModel: 'models/gemini-embedding-2'
      }
    });

    const fileSearchStores = await ai.fileSearchStores.list();
    for await (const store of fileSearchStores) {
      console.log(store);
    }

    const myFileSearchStore = await ai.fileSearchStores.get({
      name: fileSearchStore.name
    });

    await ai.fileSearchStores.delete({
      name: fileSearchStore.name,
      config: { force: true }
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.types.CreateFileSearchStoreConfig;
    import com.google.genai.types.DeleteFileSearchStoreConfig;
    import com.google.genai.types.FileSearchStore;

    Client client = new Client();

    FileSearchStore fileSearchStore =
        client.fileSearchStores.create(
            CreateFileSearchStoreConfig.builder()
                .displayName("myfilesearchstore123")
                .embeddingModel("models/gemini-embedding-2")
                .build());

    for (FileSearchStore store : client.fileSearchStores.list(null)) {
      System.out.println(store);
    }

    FileSearchStore myFileSearchStore =
        client.fileSearchStores.get(fileSearchStore.name().get(), null);

    client.fileSearchStores.delete(
        fileSearchStore.name().get(), DeleteFileSearchStoreConfig.builder().force(true).build());

### Go

    package main

    import (
        "context"
        "fmt"
        "log"

        "google.golang.org/genai"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        fileSearchStore, err := client.FileSearchStores.Create(ctx, &genai.CreateFileSearchStoreConfig{
            DisplayName:    "myfilesearchstore123",
            EmbeddingModel: "models/gemini-embedding-2",
        })
        if err != nil {
            log.Fatal(err)
        }

        for store, err := range client.FileSearchStores.All(ctx) {
            if err != nil {
                log.Fatal(err)
            }
            fmt.Println(store)
        }

        myFileSearchStore, err := client.FileSearchStores.Get(ctx, fileSearchStore.Name, nil)
        if err != nil {
            log.Fatal(err)
        }
        _ = myFileSearchStore

        err = client.FileSearchStores.Delete(ctx, fileSearchStore.Name, &genai.DeleteFileSearchStoreConfig{
            Force: genai.Ptr(true),
        })
        if err != nil {
            log.Fatal(err)
        }
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=${GEMINI_API_KEY}" \
        -H "Content-Type: application/json" \
        -d '{ "displayName": "My Store", "embedding_model": "models/gemini-embedding-2" }'

    curl "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=${GEMINI_API_KEY}"

    curl "https://generativelanguage.googleapis.com/v1beta/fileSearchStores/myfilesearchstore123?key=${GEMINI_API_KEY}"

    curl -X DELETE "https://generativelanguage.googleapis.com/v1beta/fileSearchStores/myfilesearchstore123?key=${GEMINI_API_KEY}"

## File Search documents

You can manage individual documents in your file stores with the
[File Search Documents](https://ai.google.dev/api/file-search/documents) API to `list` each document
in a file search store, `get` information about a document, and `delete` a
document by name.

### Python

    for document_in_store in client.file_search_stores.documents.list(parent='fileSearchStores/myfilesearchstore123'):
      print(document_in_store)

    file_search_document = client.file_search_stores.documents.get(name='fileSearchStores/myfilesearchstore123/documents/sampletxt123')
    print(file_search_document)

    client.file_search_stores.documents.delete(name='fileSearchStores/myfilesearchstore123/documents/sampletxt123', config={'force': True})

### JavaScript

    const documents = await ai.fileSearchStores.documents.list({
      parent: 'fileSearchStores/myfilesearchstore123'
    });
    for await (const doc of documents) {
      console.log(doc);
    }

    const fileSearchDocument = await ai.fileSearchStores.documents.get({
      name: 'fileSearchStores/myfilesearchstore123/documents/sampletxt123'
    });

    await ai.fileSearchStores.documents.delete({
      name: 'fileSearchStores/myfilesearchstore123/documents/sampletxt123',
      config: { force: true }
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.types.DeleteDocumentConfig;
    import com.google.genai.types.Document;

    Client client = new Client();

    for (Document documentInStore :
        client.fileSearchStores.documents.list("fileSearchStores/myfilesearchstore123", null)) {
      System.out.println(documentInStore);
    }

    Document fileSearchDocument =
        client.fileSearchStores.documents.get(
            "fileSearchStores/myfilesearchstore123/documents/sampletxt123", null);
    System.out.println(fileSearchDocument);

    client.fileSearchStores.documents.delete(
        "fileSearchStores/myfilesearchstore123/documents/sampletxt123",
        DeleteDocumentConfig.builder().force(true).build());

### Go

    package main

    import (
        "context"
        "fmt"
        "log"

        "google.golang.org/genai"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        for documentInStore, err := range client.FileSearchStores.Documents.All(ctx, "fileSearchStores/myfilesearchstore123") {
            if err != nil {
                log.Fatal(err)
            }
            fmt.Println(documentInStore)
        }

        fileSearchDocument, err := client.FileSearchStores.Documents.Get(ctx, "fileSearchStores/myfilesearchstore123/documents/sampletxt123", nil)
        if err != nil {
            log.Fatal(err)
        }
        fmt.Println(fileSearchDocument)

        err = client.FileSearchStores.Documents.Delete(ctx, "fileSearchStores/myfilesearchstore123/documents/sampletxt123", &genai.DeleteDocumentConfig{
            Force: genai.Ptr(true),
        })
        if err != nil {
            log.Fatal(err)
        }
    }

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/fileSearchStores/myfilesearchstore123/documents?key=${GEMINI_API_KEY}"

    curl "https://generativelanguage.googleapis.com/v1beta/fileSearchStores/myfilesearchstore123/documents/sampletxt123?key=${GEMINI_API_KEY}"

    curl -X DELETE "https://generativelanguage.googleapis.com/v1beta/fileSearchStores/myfilesearchstore123/documents/sampletxt123?key=${GEMINI_API_KEY}&force=true"

## File metadata

You can add custom metadata to your files to help filter them or provide
additional context. Metadata is a set of key-value pairs.

### Python

    op = client.file_search_stores.import_file(
        file_search_store_name=file_search_store.name,
        file_name=sample_file.name,
        config={
            'custom_metadata': [
                {"key": "author", "string_value": "Robert Graves"},
                {"key": "year", "numeric_value": 1934}
            ]
        }
    )

### JavaScript

    let operation = await ai.fileSearchStores.importFile({
      fileSearchStoreName: fileSearchStore.name,
      fileName: sampleFile.name,
      config: {
        customMetadata: [
          { key: "author", stringValue: "Robert Graves" },
          { key: "year", numericValue: 1934 }
        ]
      }
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.types.CustomMetadata;
    import com.google.genai.types.ImportFileConfig;
    import com.google.genai.types.ImportFileOperation;
    import java.util.Arrays;

    Client client = new Client();

    ImportFileOperation op =
        client.fileSearchStores.importFile(
            "fileSearchStores/myfilesearchstore123",
            "files/samplefile123",
            ImportFileConfig.builder()
                .customMetadata(
                    Arrays.asList(
                        CustomMetadata.builder().key("author").stringValue("Robert Graves").build(),
                        CustomMetadata.builder().key("year").numericValue(1934f).build()))
                .build());

### Go

    package main

    import (
        "context"
        "log"

        "google.golang.org/genai"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        op, err := client.FileSearchStores.ImportFile(
            ctx,
            "fileSearchStores/myfilesearchstore123",
            "files/samplefile123",
            &genai.ImportFileConfig{
                CustomMetadata: []*genai.CustomMetadata{
                    {Key: "author", StringValue: "Robert Graves"},
                    {Key: "year", NumericValue: genai.Ptr(float32(1934))},
                },
            },
        )
        if err != nil {
            log.Fatal(err)
        }
        _ = op
    }

This is useful when you have multiple documents in a File Search store and want
to search only a subset of them.

### Python

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input="Tell me about the book 'I, Claudius'",
        tools=[{
            "type": "file_search",
            "file_search_store_names": [file_search_store.name],
            "metadata_filter": 'author="Robert Graves"',
        }]
    )

    for step in interaction.steps:
        if step.type == "model_output":
            for content_block in step.content:
                if content_block.type == "text":
                    print(content_block.text)

### JavaScript

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: "Tell me about the book 'I, Claudius'",
      tools: [{
        type: "file_search",
        file_search_store_names: [fileSearchStore.name],
        metadata_filter: 'author="Robert Graves"',
      }]
    });

    for (const step of interaction.steps) {
      if (step.type === 'model_output') {
        for (const contentBlock of step.content) {
          if (contentBlock.type === 'text') {
            console.log(contentBlock.text);
          }
        }
      }
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.FileSearch;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ModelOutputStep;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.of("Tell me about the book 'I, Claudius'"))
            .tools(
                Arrays.asList(
                    FileSearch.builder()
                        .fileSearchStoreNames(Arrays.asList("fileSearchStores/myfilesearchstore123"))
                        .metadataFilter("author=\"Robert Graves\"")
                        .build()))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.steps().isPresent()) {
      for (Step step : interaction.steps().get()) {
        if (step instanceof ModelOutputStep) {
          ModelOutputStep outputStep = (ModelOutputStep) step;
          if (outputStep.content().isPresent()) {
            for (Content contentBlock : outputStep.content().get()) {
              if (contentBlock instanceof TextContent) {
                TextContent textContent = (TextContent) contentBlock;
                System.out.println(textContent.text().orElse(""));
              }
            }
          }
        }
      }
    }

### Go

    package main

    import (
        "context"
        "fmt"
        "log"

        "google.golang.org/genai"
        "google.golang.org/genai/interactions/models/interactions"
        "google.golang.org/genai/interactions/models/operations"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(
                interactions.CreateModelInteraction{
                    Model: interactions.Model("gemini-3.8-flash"),
                    Input: interactions.NewInteractionsInput("Tell me about the book 'I, Claudius'"),
                    Tools: []interactions.Tool{
                        interactions.NewTool(interactions.FileSearch{
                            FileSearchStoreNames: []string{"fileSearchStores/myfilesearchstore123"},
                            MetadataFilter:       genai.Ptr(`author="Robert Graves"`),
                        }),
                    },
                },
            ),
        })
        if err != nil {
            log.Fatal(err)
        }

        for _, step := range resp.Interaction.Steps {
            if step.ModelOutputStep != nil {
                for _, content := range step.ModelOutputStep.Content {
                    if content.TextContent != nil {
                        fmt.Println(content.TextContent.Text)
                    }
                }
            }
        }
    }

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
        -H "x-goog-api-key: $GEMINI_API_KEY" \
        -H 'Content-Type: application/json' \
        -X POST \
        -d '{
                "model": "gemini-3.8-flash",
                "input": [{"type": "text", "text": "Tell me about the book I, Claudius"}],
                "tools": [{
                    "type": "file_search",
                    "file_search_store_names": ["'$STORE_NAME'"],
                    "metadata_filter": "author = \"Robert Graves\""
                }]
            }' 2> /dev/null > response.json

    cat response.json

Guidance on implementing list filter syntax for `metadata_filter` can be found
at [google.aip.dev/160](https://google.aip.dev/160)

## Multimodal File Search

Multimodal File Search lets you to natively embed and search through images,
enabling rich, multimodal RAG applications.

### Configure the embedding model

When you create a `FileSearchStore`, you must override the default text-only
embedding model to use a multimodal model. Use `models/gemini-embedding-2` to
process both text and images.

### Python

    store = client.file_search_stores.create(
        config={
            "display_name": "Multimodal Catalog",
            "embedding_model": "models/gemini-embedding-2",
        }
    )

### JavaScript

    const fileSearchStore = await ai.fileSearchStores.create({
      config: {
        displayName: "Multimodal Catalog",
        embeddingModel: "models/gemini-embedding-2",
      },
    });

### Java

    import com.google.genai.Client;
    import com.google.genai.types.CreateFileSearchStoreConfig;
    import com.google.genai.types.FileSearchStore;

    Client client = new Client();

    FileSearchStore store =
        client.fileSearchStores.create(
            CreateFileSearchStoreConfig.builder()
                .displayName("Multimodal Catalog")
                .embeddingModel("models/gemini-embedding-2")
                .build());

### Go

    package main

    import (
        "context"
        "log"

        "google.golang.org/genai"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        store, err := client.FileSearchStores.Create(ctx, &genai.CreateFileSearchStoreConfig{
            DisplayName:    "Multimodal Catalog",
            EmbeddingModel: "models/gemini-embedding-2",
        })
        if err != nil {
            log.Fatal(err)
        }
        _ = store
    }

### REST

    curl -X POST "https://generativelanguage.googleapis.com/v1beta/fileSearchStores?key=$GEMINI_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{
          "display_name": "Multimodal Catalog",
          "embedding_model": "models/gemini-embedding-2"
        }'

### Upload images

After you create the store with a multimodal embedding model, you can upload
image files directly using the same upload APIs described in
[Directly upload to File Search store](https://ai.google.dev/gemini-api/docs/file-search#upload) or [Importing files](https://ai.google.dev/gemini-api/docs/file-search#importing-files).

**Image file requirements:**

- Image files must be at most 4K x 4K pixels in resolution.
- Supported formats are PNG, JPEG.

## Citations

When you use File Search, the model's response may include citations that
specify which parts of your uploaded documents were used to generate the
answer. This helps with fact-checking and verification.

You can access citation information through the `annotations` attribute inside the `model_output` step's `content` blocks of the response.

### Python

    for step in interaction.steps:
        if step.type == 'model_output':
            for content in step.content:
                if content.type == 'text' and content.annotations:
                    print(content.annotations)

### JavaScript

    for (const step of interaction.steps) {
      if (step.type === 'model_output') {
        for (const contentBlock of step.content) {
          if (contentBlock.type === 'text' && contentBlock.annotations) {
            console.log(JSON.stringify(contentBlock.annotations, null, 2));
          }
        }
      }
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.FileSearch;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ModelOutputStep;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.of("Can you tell me about [insert question]"))
            .tools(
                Arrays.asList(
                    FileSearch.builder()
                        .fileSearchStoreNames(Arrays.asList("fileSearchStores/myfilesearchstore123"))
                        .build()))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.steps().isPresent()) {
      for (Step step : interaction.steps().get()) {
        if (step instanceof ModelOutputStep) {
          ModelOutputStep outputStep = (ModelOutputStep) step;
          if (outputStep.content().isPresent()) {
            for (Content content : outputStep.content().get()) {
              if (content instanceof TextContent) {
                TextContent textContent = (TextContent) content;
                if (textContent.annotations().isPresent()) {
                  System.out.println(textContent.annotations().get());
                }
              }
            }
          }
        }
      }
    }

### Go

    package main

    import (
        "context"
        "fmt"
        "log"

        "google.golang.org/genai"
        "google.golang.org/genai/interactions/models/interactions"
        "google.golang.org/genai/interactions/models/operations"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(
                interactions.CreateModelInteraction{
                    Model: interactions.Model("gemini-3.8-flash"),
                    Input: interactions.NewInteractionsInput("Can you tell me about [insert question]"),
                    Tools: []interactions.Tool{
                        interactions.NewTool(interactions.FileSearch{
                            FileSearchStoreNames: []string{"fileSearchStores/myfilesearchstore123"},
                        }),
                    },
                },
            ),
        })
        if err != nil {
            log.Fatal(err)
        }

        for _, step := range resp.Interaction.Steps {
            if step.ModelOutputStep != nil {
                for _, content := range step.ModelOutputStep.Content {
                    if content.TextContent != nil && len(content.TextContent.Annotations) > 0 {
                        fmt.Println(content.TextContent.Annotations)
                    }
                }
            }
        }
    }

### REST

    {
      "steps": [
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "...",
              "annotations": [
                {
                  "type": "file_citation",
                  "file_name": "sample.txt",
                  "source": "..."
                }
              ]
            }
          ]
        }
      ]
    }

For detailed information on the structure of the citations, see the
[API reference for Interactions](https://ai.google.dev/api/interactions-api#Resource:FileCitation).

### Page numbers

When you use File Search with documents that have pages (such as PDFs), the
model's response may include the page number where the information was found.
You can access this information through the `page_number` attribute of a
`file_citation` annotation.

### Python

    for step in interaction.steps:
        if step.type == "model_output":
            for content in step.content:
                if content.type == "text" and content.annotations:
                    for annotation in content.annotations:
                        if annotation.type == "file_citation" and annotation.page_number:
                            print(f"Cited Page: {annotation.page_number}")

### JavaScript

    for (const step of interaction.steps) {
      if (step.type === 'model_output') {
        for (const block of step.content) {
          if (block.type === 'text' && block.annotations) {
            for (const annotation of block.annotations) {
              if (annotation.type === 'file_citation' && annotation.pageNumber) {
                console.log(`Cited Page: ${annotation.pageNumber}`);
              }
            }
          }
        }
      }
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Annotation;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.FileCitation;
    import com.google.genai.gaos.models.interactions.FileSearch;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ModelOutputStep;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.of("Can you tell me about [insert question]"))
            .tools(
                Arrays.asList(
                    FileSearch.builder()
                        .fileSearchStoreNames(Arrays.asList("fileSearchStores/myfilesearchstore123"))
                        .build()))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.steps().isPresent()) {
      for (Step step : interaction.steps().get()) {
        if (step instanceof ModelOutputStep) {
          ModelOutputStep outputStep = (ModelOutputStep) step;
          if (outputStep.content().isPresent()) {
            for (Content content : outputStep.content().get()) {
              if (content instanceof TextContent) {
                TextContent textContent = (TextContent) content;
                if (textContent.annotations().isPresent()) {
                  for (Annotation annotation : textContent.annotations().get()) {
                    if (annotation instanceof FileCitation) {
                      FileCitation citation = (FileCitation) annotation;
                      if (citation.pageNumber().isPresent()) {
                        System.out.println("Cited Page: " + citation.pageNumber().get());
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

### Go

    package main

    import (
        "context"
        "fmt"
        "log"

        "google.golang.org/genai"
        "google.golang.org/genai/interactions/models/interactions"
        "google.golang.org/genai/interactions/models/operations"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(
                interactions.CreateModelInteraction{
                    Model: interactions.Model("gemini-3.8-flash"),
                    Input: interactions.NewInteractionsInput("Can you tell me about [insert question]"),
                    Tools: []interactions.Tool{
                        interactions.NewTool(interactions.FileSearch{
                            FileSearchStoreNames: []string{"fileSearchStores/myfilesearchstore123"},
                        }),
                    },
                },
            ),
        })
        if err != nil {
            log.Fatal(err)
        }

        for _, step := range resp.Interaction.Steps {
            if step.ModelOutputStep != nil {
                for _, content := range step.ModelOutputStep.Content {
                    if content.TextContent != nil {
                        for _, annotation := range content.TextContent.Annotations {
                            if annotation.FileCitation != nil && annotation.FileCitation.PageNumber != nil {
                                fmt.Println("Cited Page:", *annotation.FileCitation.PageNumber)
                            }
                        }
                    }
                }
            }
        }
    }

### REST

    {
      "steps": [
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "...",
              "annotations": [
                {
                  "type": "file_citation",
                  "file_name": "document.pdf",
                  "page_number": 1,
                  "source": "..."
                }
              ]
            }
          ]
        }
      ]
    }

### Media citations

When the model references an image chunk during generation, the API returns an
annotation of type `file_citation` in the annotations that includes a `media_id`. You can use this
ID to download the exact image chunk the model referenced. This `media_id` is
persistent across multiple search calls, which lets you reliably retrieve
the same image or cache it using the ID.

The following snippet is an example REST response step:

    {
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "...",
          "annotations": [
            {
              "type": "file_citation",
              "file_name": "product_image",
              "media_id": "fileSearchStores/my-store-123/media/BlobId-456"
            }
          ]
        }
      ]
    }

The following code snippets demonstrate how to retrieve the `media_id` and
download the media:

### Python

    for step in interaction.steps:
        if step.type == "model_output":
            for content in step.content:
                if content.type == "text" and content.annotations:
                    for annotation in content.annotations:
                        if annotation.type == "file_citation" and annotation.media_id:
                            print(f"Cited Media ID: {annotation.media_id}")
                            blob_content = client.file_search_stores.download_media(
                                media_id=annotation.media_id
                            )

### JavaScript

    for (const step of interaction.steps) {
      if (step.type === 'model_output') {
        for (const block of step.content) {
          if (block.type === 'text' && block.annotations) {
            for (const annotation of block.annotations) {
              if (annotation.type === 'file_citation' && annotation.mediaId) {
                console.log(`Cited Media ID: ${annotation.mediaId}`);
                const blobContent = await ai.fileSearchStores.downloadMedia(annotation.mediaId);
              }
            }
          }
        }
      }
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Annotation;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.FileCitation;
    import com.google.genai.gaos.models.interactions.FileSearch;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ModelOutputStep;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.of("Can you tell me about [insert question]"))
            .tools(
                Arrays.asList(
                    FileSearch.builder()
                        .fileSearchStoreNames(Arrays.asList("fileSearchStores/myfilesearchstore123"))
                        .build()))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.steps().isPresent()) {
      for (Step step : interaction.steps().get()) {
        if (step instanceof ModelOutputStep) {
          ModelOutputStep outputStep = (ModelOutputStep) step;
          if (outputStep.content().isPresent()) {
            for (Content content : outputStep.content().get()) {
              if (content instanceof TextContent) {
                TextContent textContent = (TextContent) content;
                if (textContent.annotations().isPresent()) {
                  for (Annotation annotation : textContent.annotations().get()) {
                    if (annotation instanceof FileCitation) {
                      FileCitation citation = (FileCitation) annotation;
                      if (citation.mediaId().isPresent()) {
                        System.out.println("Cited Media ID: " + citation.mediaId().get());
                        byte[] blobContent =
                            client.fileSearchStores.downloadMedia(citation.mediaId().get(), null);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

### Go

    package main

    import (
        "context"
        "fmt"
        "log"

        "google.golang.org/genai"
        "google.golang.org/genai/interactions/models/interactions"
        "google.golang.org/genai/interactions/models/operations"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(
                interactions.CreateModelInteraction{
                    Model: interactions.Model("gemini-3.8-flash"),
                    Input: interactions.NewInteractionsInput("Can you tell me about [insert question]"),
                    Tools: []interactions.Tool{
                        interactions.NewTool(interactions.FileSearch{
                            FileSearchStoreNames: []string{"fileSearchStores/myfilesearchstore123"},
                        }),
                    },
                },
            ),
        })
        if err != nil {
            log.Fatal(err)
        }

        for _, step := range resp.Interaction.Steps {
            if step.ModelOutputStep != nil {
                for _, content := range step.ModelOutputStep.Content {
                    if content.TextContent != nil {
                        for _, annotation := range content.TextContent.Annotations {
                            if annotation.FileCitation != nil && annotation.FileCitation.MediaID != nil {
                                fmt.Println("Cited Media ID:", *annotation.FileCitation.MediaID)
                                blobContent, err := client.FileSearchStores.DownloadMedia(ctx, *annotation.FileCitation.MediaID, nil)
                                if err != nil {
                                    log.Fatal(err)
                                }
                                _ = blobContent
                            }
                        }
                    }
                }
            }
        }
    }

### REST

    curl -X GET "https://generativelanguage.googleapis.com/v1/fileSearchStores/my-store-123/media/BlobId-456" \
      -H "x-goog-api-key: $GEMINI_API_KEY"

## Custom metadata

If you have added custom metadata to your files, you can access it in the
annotations of the model's response. This is useful for passing
additional context (like URLs, page numbers, or authors) from your source
documents to your application logic. Each citation annotation of type `file_citation`
contains this custom metadata.

### Python

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input="Tell me about [insert question]",
        tools=[{
            "type": "file_search",
            "file_search_store_names": [file_search_store.name]
        }]
    )

    for step in interaction.steps:
        if step.type == "model_output":
            for content_block in step.content:
                if content_block.annotations:
                    for annotation in content_block.annotations:
                        print(annotation)

### JavaScript

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: "Tell me about [insert question]",
      tools: [{
        type: "file_search",
        file_search_store_names: [fileSearchStore.name]
      }]
    });

    for (const step of interaction.steps) {
      if (step.type === 'model_output') {
        for (const contentBlock of step.content) {
          if (contentBlock.annotations) {
            contentBlock.annotations.forEach((annotation) => {
              console.log(annotation);
            });
          }
        }
      }
    }

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.Annotation;
    import com.google.genai.gaos.models.interactions.Content;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.FileSearch;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ModelOutputStep;
    import com.google.genai.gaos.models.interactions.Step;
    import com.google.genai.gaos.models.interactions.TextContent;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;

    Client client = new Client();

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.of("Tell me about [insert question]"))
            .tools(
                Arrays.asList(
                    FileSearch.builder()
                        .fileSearchStoreNames(Arrays.asList("fileSearchStores/myfilesearchstore123"))
                        .build()))
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    if (interaction.steps().isPresent()) {
      for (Step step : interaction.steps().get()) {
        if (step instanceof ModelOutputStep) {
          ModelOutputStep outputStep = (ModelOutputStep) step;
          if (outputStep.content().isPresent()) {
            for (Content contentBlock : outputStep.content().get()) {
              if (contentBlock instanceof TextContent) {
                TextContent textContent = (TextContent) contentBlock;
                if (textContent.annotations().isPresent()) {
                  for (Annotation annotation : textContent.annotations().get()) {
                    System.out.println(annotation);
                  }
                }
              }
            }
          }
        }
      }
    }

### Go

    package main

    import (
        "context"
        "fmt"
        "log"

        "google.golang.org/genai"
        "google.golang.org/genai/interactions/models/interactions"
        "google.golang.org/genai/interactions/models/operations"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(
                interactions.CreateModelInteraction{
                    Model: interactions.Model("gemini-3.8-flash"),
                    Input: interactions.NewInteractionsInput("Tell me about [insert question]"),
                    Tools: []interactions.Tool{
                        interactions.NewTool(interactions.FileSearch{
                            FileSearchStoreNames: []string{"fileSearchStores/myfilesearchstore123"},
                        }),
                    },
                },
            ),
        })
        if err != nil {
            log.Fatal(err)
        }

        for _, step := range resp.Interaction.Steps {
            if step.ModelOutputStep != nil {
                for _, content := range step.ModelOutputStep.Content {
                    if content.TextContent != nil {
                        for _, annotation := range content.TextContent.Annotations {
                            fmt.Println(annotation)
                        }
                    }
                }
            }
        }
    }

### REST

    {
      "steps": [
        {
          "type": "model_output",
          "content": [
            {
              "type": "text",
              "text": "...",
              "annotations": [
                {
                  "file_name": "...",
                  "source": "...",
                  "custom_metadata": [
                    {
                      "key": "author",
                      "string_value": "Robert Graves"
                    },
                    {
                      "key": "year",
                      "numeric_value": 1934
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }

## Structured output

Starting with Gemini 3 models, you can combine file search tool with
[structured outputs](https://ai.google.dev/gemini-api/docs/structured-output).

### Python

    from pydantic import BaseModel, Field

    class Money(BaseModel):
        amount: str = Field(description="The numerical part of the amount.")
        currency: str = Field(description="The currency of amount.")

    interaction = client.interactions.create(
        model="gemini-3.8-flash",
        input="What is the minimum hourly wage in Tokyo right now?",
        tools=[{
            "type": "file_search",
            "file_search_store_names": [file_search_store.name]
        }],
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": Money.model_json_schema()
        },
    )
    result = Money.model_validate_json(interaction.output_text)
    print(result)

### JavaScript

    import { z } from "zod";

    const moneyJsonSchema = {
      type: "object",
      properties: {
        amount: { type: "string", description: "The numerical part of the amount." },
        currency: { type: "string", description: "The currency of amount." }
      },
      required: ["amount", "currency"]
    };

    const moneySchema = z.fromJSONSchema(moneyJsonSchema);

    async function run() {
      const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: "What is the minimum hourly wage in Tokyo right now?",
        tools: [{
          type: "file_search",
          file_search_store_names: [fileSearchStore.name],
        }],
        response_format: {
          type: 'text',
          mime_type: 'application/json',
          schema: moneyJsonSchema
        },
      });

      const result = moneySchema.parse(JSON.parse(interaction.output_text));
      console.log(result);
    }

    run();

### Java

    import com.google.genai.Client;
    import com.google.genai.gaos.models.interactions.CreateModelInteraction;
    import com.google.genai.gaos.models.interactions.CreateModelInteractionResponseFormat;
    import com.google.genai.gaos.models.interactions.FileSearch;
    import com.google.genai.gaos.models.interactions.Interaction;
    import com.google.genai.gaos.models.interactions.InteractionsInput;
    import com.google.genai.gaos.models.interactions.Model;
    import com.google.genai.gaos.models.interactions.ResponseFormat;
    import com.google.genai.gaos.models.interactions.TextResponseFormat;
    import com.google.genai.gaos.models.interactions.TextResponseFormatMimeType;
    import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
    import java.util.Arrays;
    import java.util.HashMap;
    import java.util.Map;

    Client client = new Client();

    Map<String, Object> properties = new HashMap<>();

    Map<String, Object> amountProp = new HashMap<>();
    amountProp.put("type", "string");
    amountProp.put("description", "The numerical part of the amount.");
    properties.put("amount", amountProp);

    Map<String, Object> currencyProp = new HashMap<>();
    currencyProp.put("type", "string");
    currencyProp.put("description", "The currency of amount.");
    properties.put("currency", currencyProp);

    Map<String, Object> moneyJsonSchema = new HashMap<>();
    moneyJsonSchema.put("type", "object");
    moneyJsonSchema.put("properties", properties);
    moneyJsonSchema.put("required", Arrays.asList("amount", "currency"));

    CreateModelInteractionResponseFormat format =
        CreateModelInteractionResponseFormat.of(
            ResponseFormat.of(
                TextResponseFormat.builder()
                    .mimeType(TextResponseFormatMimeType.APPLICATION_JSON)
                    .schema(moneyJsonSchema)
                    .build()));

    CreateModelInteraction params =
        CreateModelInteraction.builder()
            .model(Model.of("gemini-3.8-flash"))
            .input(InteractionsInput.of("What is the minimum hourly wage in Tokyo right now?"))
            .tools(
                Arrays.asList(
                    FileSearch.builder()
                        .fileSearchStoreNames(Arrays.asList("fileSearchStores/myfilesearchstore123"))
                        .build()))
            .responseFormat(format)
            .build();

    Interaction interaction =
        client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();

    System.out.println(interaction.outputText().orElse(""));

### Go

    package main

    import (
        "context"
        "fmt"
        "log"

        "google.golang.org/genai"
        "google.golang.org/genai/interactions/models/interactions"
        "google.golang.org/genai/interactions/models/operations"
    )

    func main() {
        ctx := context.Background()
        client, err := genai.NewClient(ctx, nil)
        if err != nil {
            log.Fatal(err)
        }

        moneyJsonSchema := map[string]any{
            "type": "object",
            "properties": map[string]any{
                "amount": map[string]any{
                    "type":        "string",
                    "description": "The numerical part of the amount.",
                },
                "currency": map[string]any{
                    "type":        "string",
                    "description": "The currency of amount.",
                },
            },
            "required": []string{"amount", "currency"},
        }

        format := interactions.NewCreateModelInteractionResponseFormat(
            interactions.NewResponseFormat(interactions.TextResponseFormat{
                MimeType: interactions.TextResponseFormatMimeTypeApplicationJSON.ToPointer(),
                Schema:   moneyJsonSchema,
            }),
        )

        resp, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
            Body: operations.NewCreateInteractionRequestBody(
                interactions.CreateModelInteraction{
                    Model: interactions.Model("gemini-3.8-flash"),
                    Input: interactions.NewInteractionsInput("What is the minimum hourly wage in Tokyo right now?"),
                    Tools: []interactions.Tool{
                        interactions.NewTool(interactions.FileSearch{
                            FileSearchStoreNames: []string{"fileSearchStores/myfilesearchstore123"},
                        }),
                    },
                    ResponseFormat: &format,
                },
            ),
        })
        if err != nil {
            log.Fatal(err)
        }

        fmt.Println(resp.Interaction.GetOutputText())
    }

### REST

    curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
      -H "x-goog-api-key: $GEMINI_API_KEY" \
      -H 'Content-Type: application/json' \
      -X POST \
      -d '{
        "model": "gemini-3.8-flash",
        "input": "What is the minimum hourly wage in Tokyo right now?",
        "tools": [{
          "type": "file_search",
          "file_search_store_names": ["$FILE_SEARCH_STORE_NAME"]
        }],
        "response_format": {
          "type": "text",
          "mime_type": "application/json",
          "schema": {
            "type": "object",
            "properties": {
              "amount": {"type": "string", "description": "The numerical part of the amount."},
              "currency": {"type": "string", "description": "The currency of amount."}
            },
            "required": ["amount", "currency"]
          }
        }
      }'

## Supported models

The following models support File Search:

| Model | File Search |
|---|---|
| [Gemini 3.8 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash) | ✔️ |
| [Gemini 3.7 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash) | ✔️ |
| [Gemini 3.6 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash) | ✔️ |
| [Gemini 3.5 Flash-Lite](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite) | ✔️ |
| [Gemini 3.5 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash) | ✔️ |
| [Gemini 3.1 Pro Preview](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview) | ✔️ |
| [Gemini 3.1 Flash-Lite](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-lite) | ✔️ |
| [Gemini 3 Flash Preview](https://ai.google.dev/gemini-api/docs/models/gemini-3-flash-preview) | ✔️ |

## Supported file types

File Search supports a wide range of file formats, listed in the following
sections.

### Application file types

- `application/dart`
- `application/ecmascript`
- `application/json`
- `application/ms-java`
- `application/msword`
- `application/pdf`
- `application/sql`
- `application/typescript`
- `application/vnd.curl`
- `application/vnd.dart`
- `application/vnd.ibm.secure-container`
- `application/vnd.jupyter`
- `application/vnd.ms-excel`
- `application/vnd.oasis.opendocument.text`
- `application/vnd.openxmlformats-officedocument.presentationml.presentation`
- `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- `application/vnd.openxmlformats-officedocument.wordprocessingml.template`
- `application/x-csh`
- `application/x-hwp`
- `application/x-hwp-v5`
- `application/x-latex`
- `application/x-php`
- `application/x-powershell`
- `application/x-sh`
- `application/x-shellscript`
- `application/x-tex`
- `application/x-zsh`
- `application/xml`
- `application/zip`

### Text file types

- `text/1d-interleaved-parityfec`
- `text/RED`
- `text/SGML`
- `text/cache-manifest`
- `text/calendar`
- `text/cql`
- `text/cql-extension`
- `text/cql-identifier`
- `text/css`
- `text/csv`
- `text/csv-schema`
- `text/dns`
- `text/encaprtp`
- `text/enriched`
- `text/example`
- `text/fhirpath`
- `text/flexfec`
- `text/fwdred`
- `text/gff3`
- `text/grammar-ref-list`
- `text/hl7v2`
- `text/html`
- `text/javascript`
- `text/jcr-cnd`
- `text/jsx`
- `text/markdown`
- `text/mizar`
- `text/n3`
- `text/parameters`
- `text/parityfec`
- `text/php`
- `text/plain`
- `text/provenance-notation`
- `text/prs.fallenstein.rst`
- `text/prs.lines.tag`
- `text/prs.prop.logic`
- `text/raptorfec`
- `text/rfc822-headers`
- `text/rtf`
- `text/rtp-enc-aescm128`
- `text/rtploopback`
- `text/rtx`
- `text/sgml`
- `text/shaclc`
- `text/shex`
- `text/spdx`
- `text/strings`
- `text/t140`
- `text/tab-separated-values`
- `text/texmacs`
- `text/troff`
- `text/tsv`
- `text/tsx`
- `text/turtle`
- `text/ulpfec`
- `text/uri-list`
- `text/vcard`
- `text/vnd.DMClientScript`
- `text/vnd.IPTC.NITF`
- `text/vnd.IPTC.NewsML`
- `text/vnd.a`
- `text/vnd.abc`
- `text/vnd.ascii-art`
- `text/vnd.curl`
- `text/vnd.debian.copyright`
- `text/vnd.dvb.subtitle`
- `text/vnd.esmertec.theme-descriptor`
- `text/vnd.exchangeable`
- `text/vnd.familysearch.gedcom`
- `text/vnd.ficlab.flt`
- `text/vnd.fly`
- `text/vnd.fmi.flexstor`
- `text/vnd.gml`
- `text/vnd.graphviz`
- `text/vnd.hans`
- `text/vnd.hgl`
- `text/vnd.in3d.3dml`
- `text/vnd.in3d.spot`
- `text/vnd.latex-z`
- `text/vnd.motorola.reflex`
- `text/vnd.ms-mediapackage`
- `text/vnd.net2phone.commcenter.command`
- `text/vnd.radisys.msml-basic-layout`
- `text/vnd.senx.warpscript`
- `text/vnd.sosi`
- `text/vnd.sun.j2me.app-descriptor`
- `text/vnd.trolltech.linguist`
- `text/vnd.wap.si`
- `text/vnd.wap.sl`
- `text/vnd.wap.wml`
- `text/vnd.wap.wmlscript`
- `text/vtt`
- `text/wgsl`
- `text/x-asm`
- `text/x-bibtex`
- `text/x-boo`
- `text/x-c`
- `text/x-c++hdr`
- `text/x-c++src`
- `text/x-cassandra`
- `text/x-chdr`
- `text/x-coffeescript`
- `text/x-component`
- `text/x-csh`
- `text/x-csharp`
- `text/x-csrc`
- `text/x-cuda`
- `text/x-d`
- `text/x-diff`
- `text/x-dsrc`
- `text/x-emacs-lisp`
- `text/x-erlang`
- `text/x-gff3`
- `text/x-go`
- `text/x-haskell`
- `text/x-java`
- `text/x-java-properties`
- `text/x-java-source`
- `text/x-kotlin`
- `text/x-lilypond`
- `text/x-lisp`
- `text/x-literate-haskell`
- `text/x-lua`
- `text/x-moc`
- `text/x-objcsrc`
- `text/x-pascal`
- `text/x-pcs-gcd`
- `text/x-perl`
- `text/x-perl-script`
- `text/x-python`
- `text/x-python-script`
- `text/x-r-markdown`
- `text/x-rsrc`
- `text/x-rst`
- `text/x-ruby-script`
- `text/x-rust`
- `text/x-sass`
- `text/x-scala`
- `text/x-scheme`
- `text/x-script.python`
- `text/x-scss`
- `text/x-setext`
- `text/x-sfv`
- `text/x-sh`
- `text/x-siesta`
- `text/x-sos`
- `text/x-sql`
- `text/x-swift`
- `text/x-tcl`
- `text/x-tex`
- `text/x-vbasic`
- `text/x-vcalendar`
- `text/xml`
- `text/xml-dtd`
- `text/xml-external-parsed-entity`
- `text/yaml`

## Limitations

- **Live API:** File Search is not supported in the [Live API](https://ai.google.dev/gemini-api/docs/live).
- **Tool incompatibility:** Built-in grounding tools cannot be combined with one another; for example, File Search cannot be used simultaneously with [Grounding with Google Search](https://ai.google.dev/gemini-api/docs/google-search) or [URL Context](https://ai.google.dev/gemini-api/docs/url-context) in the same request.

### Rate limits

The File Search API has the following limits to enforce service stability:

- **Maximum file size / per document limit**: 100 MB
- **Total size of project File Search stores** (based on user tier):
  - **Free**: 1 GB
  - **Tier 1**: 10 GB
  - **Tier 2**: 100 GB
  - **Tier 3**: 1 TB
- **Recommendation**: Limit the size of each File Search store to under 20 GB to ensure optimal retrieval latencies.

> [!NOTE]
> **Note:** The limit on File Search store size is computed on the backend, based on the size of your input plus the embeddings generated and stored with it. This is typically approximately 3 times the size of your input data.

## Pricing

- You are charged for embeddings at indexing time based on existing [embeddings pricing](https://ai.google.dev/gemini-api/docs/pricing#gemini-embedding-2).
- Storage is free of charge.
- Query time embeddings are free of charge.
- Retrieved document tokens are charged as regular [context tokens](https://ai.google.dev/gemini-api/docs/tokens).

## What's next

- Visit the API reference for [File Search Stores](https://ai.google.dev/api/file-search/file-search-stores) and File Search [Documents](https://ai.google.dev/api/file-search/documents).