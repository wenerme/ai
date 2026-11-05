> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Document understanding

Gemini models can process documents in PDF format, using native
vision to understand entire document contexts. This goes beyond
just text extraction, allowing Gemini to:

*   Analyze and interpret content, including text, images, diagrams,
  charts, and tables, even in long documents up to 1000 pages.

*   Extract information into [structured output](/docs/structured-output) formats.

*   Summarize and answer questions based on both the visual and textual elements
  in a document.

*   Transcribe document content (e.g. to HTML), preserving layouts and
  formatting, for use in downstream applications.


You can also pass Microsoft Office and OpenDocument files, such as Word
documents, PowerPoint presentations, and Excel spreadsheets. For details, see
[Office and OpenDocument files](/docs/document-processing#office-documents).
Other non-PDF documents, such as TXT, Markdown, or HTML files, are processed as
plain text, which eliminates context like charts or formatting.

## Passing PDF data inline  {% id="inline_data" %}

You can pass PDF data inline in the request. This is best
suited for smaller documents or temporary processing where you don't need to
reference the file in subsequent requests. We recommend using the
[Files API](/docs/document-processing#large-pdfs)
for larger documents that you need to refer to in multi-turn interactions to
improve request latency and reduce bandwidth usage.

The following example shows you how to pass PDF data inline:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  import base64
  
  client = genai.Client()
  
  with open('path/to/document.pdf', 'rb') as f:
      pdf_bytes = f.read()
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input=[
          {
              "type": "document",
              "data": base64.b64encode(pdf_bytes).decode('utf-8'),
              "mime_type": "application/pdf"
          },
          {"type": "text", "text": "Summarize this document"}
      ]
  )
  
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  import * as fs from "node:fs";
  
  const ai = new GoogleGenAI({});
  
  async function main() {
      const pdfData = fs.readFileSync("path/to/document.pdf", {
          encoding: "base64"
      });
  
      const interaction = await ai.interactions.create({
          model: "gemini-3.8-flash",
          input: [
              { type: "text", text: "Summarize this document" },
              {
                  type: "document",
                  data: pdfData,
                  mime_type: "application/pdf"
              }
          ]
      });
      console.log(interaction.output_text);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.DocumentContent;
  import com.google.genai.gaos.models.interactions.DocumentContentMimeType;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.nio.file.Files;
  import java.nio.file.Paths;
  import java.util.Arrays;
  import java.util.Base64;
  import java.util.List;
  
  Client client = new Client();
  
  byte[] pdfBytes = Files.readAllBytes(Paths.get("path/to/document.pdf"));
  String base64Pdf = Base64.getEncoder().encodeToString(pdfBytes);
  
  Content docContent =
      DocumentContent.builder()
          .data(base64Pdf)
          .mimeType(DocumentContentMimeType.APPLICATION_PDF)
          .build();
  Content textContent = TextContent.builder().text("Summarize this document").build();
  
  List<Content> contents = Arrays.asList(docContent, textContent);
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.ofContent(contents))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "encoding/base64"
      "fmt"
      "log"
      "os"
  
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
  
      pdfBytes, err := os.ReadFile("path/to/document.pdf")
      if err != nil {
          log.Fatal(err)
      }
      base64Pdf := base64.StdEncoding.EncodeToString(pdfBytes)
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.DocumentContent{
                      Data:     genai.Ptr(base64Pdf),
                      MimeType: interactions.DocumentContentMimeTypeApplicationPdf.ToPointer(),
                  }),
                  interactions.NewContent(interactions.TextContent{
                      Text: "Summarize this document",
                  }),
              }),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```shell
  PDF_PATH="path/to/document.pdf"
  
  if [[ "$(base64 --version 2>&1)" = *"FreeBSD"* ]]; then
  B64FLAGS="--input"
  else
  B64FLAGS="-w0"
  fi
  
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -H "Api-Revision: 2026-05-20" \
  -d '{
    "model": "gemini-3.8-flash",
    "input": [
      {
        "type": "document",
        "data": "'$(base64 $B64FLAGS $PDF_PATH)'",
        "mime_type": "application/pdf"
      },
      {"type": "text", "text": "Summarize this document"}
    ]
  }'
  ```

  {% /tab %}

{% /tabs %}

You can also upload a local PDF file for processing:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  uploaded_file = client.files.upload(file="file.pdf")
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input=[
          {"type": "document", "uri": uploaded_file.uri, "mime_type": uploaded_file.mime_type},
          {"type": "text", "text": "Summarize this document"}
      ]
  )
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  async function main() {
      const uploadedFile = await ai.files.upload({
          file: "file.pdf",
          config: { mimeType: "application/pdf" }
      });
  
      const interaction = await ai.interactions.create({
          model: "gemini-3.8-flash",
          input: [
              { type: "text", text: "Summarize this document" },
              {
                  type: "document",
                  uri: uploadedFile.uri,
                  mime_type: uploadedFile.mimeType
              }
          ]
      });
      console.log(interaction.output_text);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.DocumentContent;
  import com.google.genai.gaos.models.interactions.DocumentContentMimeType;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import com.google.genai.types.File;
  import com.google.genai.types.UploadFileConfig;
  import java.util.Arrays;
  import java.util.List;
  
  Client client = new Client();
  
  File uploadedFile =
      client.files.upload(
          new java.io.File("file.pdf"),
          UploadFileConfig.builder().mimeType("application/pdf").build());
  
  Content docContent =
      DocumentContent.builder()
          .uri(uploadedFile.uri().orElse(""))
          .mimeType(DocumentContentMimeType.of(uploadedFile.mimeType().orElse("application/pdf")))
          .build();
  Content textContent = TextContent.builder().text("Summarize this document").build();
  
  List<Content> contents = Arrays.asList(docContent, textContent);
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.ofContent(contents))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
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
  
      uploadedFile, err := client.Files.UploadFromPath(ctx, "file.pdf", &genai.UploadFileConfig{
          MIMEType: "application/pdf",
      })
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.DocumentContent{
                      URI:      genai.Ptr(uploadedFile.URI),
                      MimeType: interactions.DocumentContentMimeType(uploadedFile.MIMEType).ToPointer(),
                  }),
                  interactions.NewContent(interactions.TextContent{
                      Text: "Summarize this document",
                  }),
              }),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

{% /tabs %}

## Uploading PDFs using the Files API  {% id="large-pdfs" %}

We recommend you use Files API for larger files or when you intend to reuse a
document across multiple requests. This improves request latency and reduces
bandwidth usage by decoupling the file upload from the model requests.

{% callout type="note" %}
  The Files API is available at no cost in all regions where the Gemini API
  is available. Uploaded files are stored for 48 hours.

{% /callout %}

### Large PDFs from URLs  {% id="large-pdfs-urls" %}

Use the File API to simplify uploading and processing large PDF files from URLs:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  import io
  import httpx
  
  client = genai.Client()
  
  long_context_pdf_path = "https://arxiv.org/pdf/2312.11805"
  
  doc_io = io.BytesIO(httpx.get(long_context_pdf_path).content)
  
  sample_doc = client.files.upload(
    file=doc_io,
    config=dict(
      mime_type='application/pdf')
  )
  
  prompt = "Summarize this document"
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input=[
          {"type": "document", "uri": sample_doc.uri, "mime_type": sample_doc.mime_type},
          {"type": "text", "text": prompt}
      ]
  )
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  async function main() {
  
      const pdfBuffer = await fetch("https://arxiv.org/pdf/2312.11805")
          .then((response) => response.arrayBuffer());
  
      const fileBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
  
      const file = await ai.files.upload({
          file: fileBlob,
          config: {
              displayName: 'A17_FlightPlan.pdf',
          },
      });
  
      let getFile = await ai.files.get({ name: file.name || "" });
      while (getFile.state === 'PROCESSING') {
          getFile = await ai.files.get({ name: file.name || "" });
          console.log(`current file status: ${getFile.state}`);
          console.log('File is still processing, retrying in 5 seconds');
  
          await new Promise((resolve) => {
              setTimeout(resolve, 5000);
          });
      }
      if (file.state === 'FAILED') {
          throw new Error('File processing failed.');
      }
  
      const interaction = await ai.interactions.create({
          model: 'gemini-3.8-flash',
          input: [
              { type: "document", uri: file.uri, mime_type: file.mimeType },
              { type: "text", text: "Summarize this document" }
          ],
      });
  
      console.log(interaction.output_text);
  
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.DocumentContent;
  import com.google.genai.gaos.models.interactions.DocumentContentMimeType;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import com.google.genai.types.File;
  import com.google.genai.types.UploadFileConfig;
  import java.net.URI;
  import java.net.http.HttpClient;
  import java.net.http.HttpRequest;
  import java.net.http.HttpResponse;
  import java.util.Arrays;
  import java.util.List;
  
  Client client = new Client();
  
  String longContextPdfPath = "https://arxiv.org/pdf/2312.11805";
  HttpClient httpClient = HttpClient.newHttpClient();
  HttpRequest request = HttpRequest.newBuilder().uri(URI.create(longContextPdfPath)).build();
  byte[] pdfBytes = httpClient.send(request, HttpResponse.BodyHandlers.ofByteArray()).body();
  
  File sampleDoc =
      client.files.upload(
          pdfBytes, UploadFileConfig.builder().mimeType("application/pdf").build());
  
  String prompt = "Summarize this document";
  
  Content docContent =
      DocumentContent.builder()
          .uri(sampleDoc.uri().orElse(""))
          .mimeType(DocumentContentMimeType.of(sampleDoc.mimeType().orElse("application/pdf")))
          .build();
  Content textContent = TextContent.builder().text(prompt).build();
  
  List<Content> contents = Arrays.asList(docContent, textContent);
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.ofContent(contents))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "bytes"
      "context"
      "fmt"
      "io"
      "log"
      "net/http"
  
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
  
      longContextPdfPath := "https://arxiv.org/pdf/2312.11805"
      resp, err := http.Get(longContextPdfPath)
      if err != nil {
          log.Fatal(err)
      }
      defer resp.Body.Close()
      pdfBytes, err := io.ReadAll(resp.Body)
      if err != nil {
          log.Fatal(err)
      }
  
      sampleDoc, err := client.Files.Upload(ctx, bytes.NewReader(pdfBytes), &genai.UploadFileConfig{
          MIMEType: "application/pdf",
      })
      if err != nil {
          log.Fatal(err)
      }
  
      prompt := "Summarize this document"
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.DocumentContent{
                      URI:      genai.Ptr(sampleDoc.URI),
                      MimeType: interactions.DocumentContentMimeType(sampleDoc.MIMEType).ToPointer(),
                  }),
                  interactions.NewContent(interactions.TextContent{
                      Text: prompt,
                  }),
              }),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```shell
  PDF_PATH="https://arxiv.org/pdf/2312.11805"
  DISPLAY_NAME="Gemini_paper"
  PROMPT="Summarize this document"
  
  wget -O "${DISPLAY_NAME}.pdf" "${PDF_PATH}"
  
  MIME_TYPE=$(file -b --mime-type "${DISPLAY_NAME}.pdf")
  NUM_BYTES=$(wc -c < "${DISPLAY_NAME}.pdf")
  
  echo "MIME_TYPE: ${MIME_TYPE}"
  echo "NUM_BYTES: ${NUM_BYTES}"
  
  tmp_header_file=upload-header.tmp
  
  curl "https://generativelanguage.googleapis.com/upload/v1beta/files?key=${GEMINI_API_KEY}" \
  -D upload-header.tmp \
  -H "X-Goog-Upload-Protocol: resumable" \
  -H "X-Goog-Upload-Command: start" \
  -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
  -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
  -H "Content-Type: application/json" \
  -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null
  
  upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
  rm "${tmp_header_file}"
  
  curl "${upload_url}" \
  -H "Content-Length: ${NUM_BYTES}" \
  -H "X-Goog-Upload-Offset: 0" \
  -H "X-Goog-Upload-Command: upload, finalize" \
  --data-binary "@${DISPLAY_NAME}.pdf" 2> /dev/null > file_info.json
  
  file_uri=$(jq -r ".file.uri" file_info.json)
  echo "file_uri: ${file_uri}"
  
  cat << EOF > payload.json
  {
  "model": "gemini-3.8-flash",
  "input": [
    {"type": "text", "text": "${PROMPT}"},
    {"type": "document", "uri": "${file_uri}", "mime_type": "application/pdf"}
  ]
  }
  EOF
  
  curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -X POST \
    -d @payload.json 2> /dev/null > response.json
  
  cat response.json
  echo
  
  jq ".steps[-1].content[0].text" response.json
  
  rm "${DISPLAY_NAME}.pdf"
  rm payload.json
  ```

  {% /tab %}

{% /tabs %}

### Large PDFs stored locally  {% id="large-pdfs-local" %}

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  import pathlib
  
  client = genai.Client()
  
  file_path = pathlib.Path('large_file.pdf')
  sample_file = client.files.upload(
      file=file_path,
  )
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input=[
          {"type": "document", "uri": sample_file.uri, "mime_type": sample_file.mime_type},
          {"type": "text", "text": "Summarize this document"}
      ]
  )
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  async function main() {
      const file = await ai.files.upload({
          file: 'path-to-localfile.pdf',
          config: {
              displayName: 'A17_FlightPlan.pdf',
          },
      });
  
      let getFile = await ai.files.get({ name: file.name || "" });
      while (getFile.state === 'PROCESSING') {
          getFile = await ai.files.get({ name: file.name || "" });
          console.log(`current file status: ${getFile.state}`);
          console.log('File is still processing, retrying in 5 seconds');
  
          await new Promise((resolve) => {
              setTimeout(resolve, 5000);
          });
      }
      if (file.state === 'FAILED') {
          throw new Error('File processing failed.');
      }
  
      const interaction = await ai.interactions.create({
          model: 'gemini-3.8-flash',
          input: [
              { type: "document", uri: file.uri, mime_type: file.mimeType },
              { type: "text", text: "Summarize this document" }
          ],
      });
  
      console.log(interaction.output_text);
  
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.DocumentContent;
  import com.google.genai.gaos.models.interactions.DocumentContentMimeType;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import com.google.genai.types.File;
  import com.google.genai.types.UploadFileConfig;
  import java.util.Arrays;
  import java.util.List;
  
  Client client = new Client();
  
  File sampleFile =
      client.files.upload(
          new java.io.File("large_file.pdf"),
          UploadFileConfig.builder().mimeType("application/pdf").build());
  
  Content docContent =
      DocumentContent.builder()
          .uri(sampleFile.uri().orElse(""))
          .mimeType(DocumentContentMimeType.of(sampleFile.mimeType().orElse("application/pdf")))
          .build();
  Content textContent = TextContent.builder().text("Summarize this document").build();
  
  List<Content> contents = Arrays.asList(docContent, textContent);
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.ofContent(contents))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
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
  
      sampleFile, err := client.Files.UploadFromPath(ctx, "large_file.pdf", &genai.UploadFileConfig{
          MIMEType: "application/pdf",
      })
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.DocumentContent{
                      URI:      genai.Ptr(sampleFile.URI),
                      MimeType: interactions.DocumentContentMimeType(sampleFile.MIMEType).ToPointer(),
                  }),
                  interactions.NewContent(interactions.TextContent{
                      Text: "Summarize this document",
                  }),
              }),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```shell
  PDF_PATH="path/to/large_file.pdf"
  NUM_BYTES=$(wc -c < "${PDF_PATH}")
  DISPLAY_NAME=TEXT
  tmp_header_file=upload-header.tmp
  
  curl "https://generativelanguage.googleapis.com/upload/v1beta/files?key=${GEMINI_API_KEY}" \
  -D upload-header.tmp \
  -H "X-Goog-Upload-Protocol: resumable" \
  -H "X-Goog-Upload-Command: start" \
  -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
  -H "X-Goog-Upload-Header-Content-Type: application/pdf" \
  -H "Content-Type: application/json" \
  -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null
  
  upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
  rm "${tmp_header_file}"
  
  curl "${upload_url}" \
  -H "Content-Length: ${NUM_BYTES}" \
  -H "X-Goog-Upload-Offset: 0" \
  -H "X-Goog-Upload-Command: upload, finalize" \
  --data-binary "@${PDF_PATH}" 2> /dev/null > file_info.json
  
  file_uri=$(jq ".file.uri" file_info.json)
  echo file_uri=$file_uri
  
  curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -X POST \
    -d '{
      "model": "gemini-3.8-flash",
      "input": [
        {"type": "document", "uri": '$file_uri', "mime_type": "application/pdf"},
        {"type": "text", "text": "Can you add a few more lines to this poem?"}
      ]
    }' 2> /dev/null > response.json
  
  cat response.json
  echo
  
  jq ".steps[-1].content[0].text" response.json
  ```

  {% /tab %}

{% /tabs %}

You can verify the API successfully stored the uploaded file and get its
metadata by calling [`files.get`](https://ai.google.dev/api/rest/v1beta/files/get). Only the `name`
(and by extension, the `uri`) are unique.

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  import pathlib
  
  client = genai.Client()
  
  fpath = pathlib.Path('example.pdf')
  fpath.write_text('hello')
  
  file = client.files.upload(file='example.pdf')
  
  file_info = client.files.get(name=file.name)
  print(file_info.model_dump_json(indent=4))
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.types.File;
  import com.google.genai.types.UploadFileConfig;
  import java.nio.charset.StandardCharsets;
  import java.nio.file.Files;
  import java.nio.file.Path;
  import java.nio.file.Paths;
  
  Client client = new Client();
  
  Path fpath = Paths.get("example.pdf");
  Files.write(fpath, "hello".getBytes(StandardCharsets.UTF_8));
  
  File file =
      client.files.upload(
          fpath.toFile(), UploadFileConfig.builder().mimeType("application/pdf").build());
  
  File fileInfo = client.files.get(file.name().orElse(""), null);
  System.out.println(fileInfo.toJson());
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "context"
      "fmt"
      "log"
      "os"
  
      "google.golang.org/genai"
  )
  
  func main() {
      ctx := context.Background()
      client, err := genai.NewClient(ctx, nil)
      if err != nil {
          log.Fatal(err)
      }
  
      if err := os.WriteFile("example.pdf", []byte("hello"), 0644); err != nil {
          log.Fatal(err)
      }
  
      file, err := client.Files.UploadFromPath(ctx, "example.pdf", &genai.UploadFileConfig{
          MIMEType: "application/pdf",
      })
      if err != nil {
          log.Fatal(err)
      }
  
      fileInfo, err := client.Files.Get(ctx, file.Name, nil)
      if err != nil {
          log.Fatal(err)
      }
      fmt.Println(fileInfo)
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```shell
  name=$(jq -r ".file.name" file_info.json)
  curl "https://generativelanguage.googleapis.com/v1beta/$name?key=$GEMINI_API_KEY" > file_info.json
  name=$(jq -r ".name" file_info.json)
  echo name=$name
  file_uri=$(jq -r ".uri" file_info.json)
  echo file_uri=$file_uri
  ```

  {% /tab %}

{% /tabs %}

## Passing multiple PDFs  {% id="prompt-multiple" %}

The Gemini API is capable of processing multiple PDF documents (up to 1000
pages) in a single request, as long as the combined size of the documents and
the text prompt stays within the model's context window.

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  import io
  import httpx
  
  client = genai.Client()
  
  doc_url_1 = "https://arxiv.org/pdf/2312.11805"
  doc_url_2 = "https://arxiv.org/pdf/2403.05530"
  
  doc_data_1 = io.BytesIO(httpx.get(doc_url_1).content)
  doc_data_2 = io.BytesIO(httpx.get(doc_url_2).content)
  
  sample_pdf_1 = client.files.upload(
    file=doc_data_1,
    config=dict(mime_type='application/pdf')
  )
  sample_pdf_2 = client.files.upload(
    file=doc_data_2,
    config=dict(mime_type='application/pdf')
  )
  
  prompt = "What is the difference between each of the main benchmarks between these two papers? Output these in a table."
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input=[
          {"type": "document", "uri": sample_pdf_1.uri, "mime_type": sample_pdf_1.mime_type},
          {"type": "document", "uri": sample_pdf_2.uri, "mime_type": sample_pdf_2.mime_type},
          {"type": "text", "text": prompt}
      ]
  )
  
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  async function uploadRemotePDF(url = '', displayName = '') {
      const pdfBuffer = await fetch(url)
          .then((response) => response.arrayBuffer());
  
      const fileBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
  
      const file = await ai.files.upload({
          file: fileBlob,
          config: {
              displayName: displayName,
          },
      });
  
      let getFile = await ai.files.get({ name: file.name || "" });
      while (getFile.state === 'PROCESSING') {
          getFile = await ai.files.get({ name: file.name || "" });
          console.log(`current file status: ${getFile.state}`);
          console.log('File is still processing, retrying in 5 seconds');
  
          await new Promise((resolve) => {
              setTimeout(resolve, 5000);
          });
      }
      if (file.state === 'FAILED') {
          throw new Error('File processing failed.');
      }
  
      return file;
  }
  
  async function main() {
      const file1 = await uploadRemotePDF("https://arxiv.org/pdf/2312.11805", "PDF 1");
      const file2 = await uploadRemotePDF("https://arxiv.org/pdf/2403.05530", "PDF 2");
  
      const interaction = await ai.interactions.create({
          model: 'gemini-3.8-flash',
          input: [
              { type: "document", uri: file1.uri, mime_type: file1.mimeType },
              { type: "document", uri: file2.uri, mime_type: file2.mimeType },
              { type: "text", text: "What is the difference between each of the main benchmarks between these two papers? Output these in a table." }
          ],
      });
  
      console.log(interaction.output_text);
  }
  
  await main();
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.DocumentContent;
  import com.google.genai.gaos.models.interactions.DocumentContentMimeType;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import com.google.genai.types.File;
  import com.google.genai.types.UploadFileConfig;
  import java.net.URI;
  import java.net.http.HttpClient;
  import java.net.http.HttpRequest;
  import java.net.http.HttpResponse;
  import java.util.Arrays;
  import java.util.List;
  
  Client client = new Client();
  
  String docUrl1 = "https://arxiv.org/pdf/2312.11805";
  String docUrl2 = "https://arxiv.org/pdf/2403.05530";
  
  HttpClient httpClient = HttpClient.newHttpClient();
  byte[] docData1 =
      httpClient
          .send(HttpRequest.newBuilder().uri(URI.create(docUrl1)).build(), HttpResponse.BodyHandlers.ofByteArray())
          .body();
  byte[] docData2 =
      httpClient
          .send(HttpRequest.newBuilder().uri(URI.create(docUrl2)).build(), HttpResponse.BodyHandlers.ofByteArray())
          .body();
  
  File samplePdf1 =
      client.files.upload(
          docData1, UploadFileConfig.builder().mimeType("application/pdf").build());
  File samplePdf2 =
      client.files.upload(
          docData2, UploadFileConfig.builder().mimeType("application/pdf").build());
  
  String prompt =
      "What is the difference between each of the main benchmarks between these two papers? Output these in a table.";
  
  Content doc1Content =
      DocumentContent.builder()
          .uri(samplePdf1.uri().orElse(""))
          .mimeType(DocumentContentMimeType.of(samplePdf1.mimeType().orElse("application/pdf")))
          .build();
  Content doc2Content =
      DocumentContent.builder()
          .uri(samplePdf2.uri().orElse(""))
          .mimeType(DocumentContentMimeType.of(samplePdf2.mimeType().orElse("application/pdf")))
          .build();
  Content textContent = TextContent.builder().text(prompt).build();
  
  List<Content> contents = Arrays.asList(doc1Content, doc2Content, textContent);
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-3.8-flash"))
          .input(InteractionsInput.ofContent(contents))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab label="Go" %}
  ```go
  package main
  
  import (
      "bytes"
      "context"
      "fmt"
      "io"
      "log"
      "net/http"
  
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
  
      docURL1 := "https://arxiv.org/pdf/2312.11805"
      docURL2 := "https://arxiv.org/pdf/2403.05530"
  
      resp1, err := http.Get(docURL1)
      if err != nil {
          log.Fatal(err)
      }
      defer resp1.Body.Close()
      docData1, err := io.ReadAll(resp1.Body)
      if err != nil {
          log.Fatal(err)
      }
  
      resp2, err := http.Get(docURL2)
      if err != nil {
          log.Fatal(err)
      }
      defer resp2.Body.Close()
      docData2, err := io.ReadAll(resp2.Body)
      if err != nil {
          log.Fatal(err)
      }
  
      samplePdf1, err := client.Files.Upload(ctx, bytes.NewReader(docData1), &genai.UploadFileConfig{
          MIMEType: "application/pdf",
      })
      if err != nil {
          log.Fatal(err)
      }
      samplePdf2, err := client.Files.Upload(ctx, bytes.NewReader(docData2), &genai.UploadFileConfig{
          MIMEType: "application/pdf",
      })
      if err != nil {
          log.Fatal(err)
      }
  
      prompt := "What is the difference between each of the main benchmarks between these two papers? Output these in a table."
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-3.8-flash"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.DocumentContent{
                      URI:      genai.Ptr(samplePdf1.URI),
                      MimeType: interactions.DocumentContentMimeType(samplePdf1.MIMEType).ToPointer(),
                  }),
                  interactions.NewContent(interactions.DocumentContent{
                      URI:      genai.Ptr(samplePdf2.URI),
                      MimeType: interactions.DocumentContentMimeType(samplePdf2.MIMEType).ToPointer(),
                  }),
                  interactions.NewContent(interactions.TextContent{
                      Text: prompt,
                  }),
              }),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      if res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```shell
  DOC_URL_1="https://arxiv.org/pdf/2312.11805"
  DOC_URL_2="https://arxiv.org/pdf/2403.05530"
  DISPLAY_NAME_1="Gemini_paper"
  DISPLAY_NAME_2="Gemini_1.5_paper"
  PROMPT="What is the difference between each of the main benchmarks between these two papers? Output these in a table."
  
  upload_pdf() {
  local doc_url="$1"
  local display_name="$2"
  
  echo "Downloading ${display_name} from ${doc_url}..." >&2
  wget -O "${display_name}.pdf" "${doc_url}" 2> /dev/null
  
  local MIME_TYPE=$(file -b --mime-type "${display_name}.pdf")
  local NUM_BYTES=$(wc -c < "${display_name}.pdf")
  
  echo "MIME_TYPE: ${MIME_TYPE}" >&2
  echo "NUM_BYTES: ${NUM_BYTES}" >&2
  
  local tmp_header_file="upload-header-${display_name}.tmp"
  
  curl "https://generativelanguage.googleapis.com/upload/v1beta/files?key=${GEMINI_API_KEY}" \
    -D "${tmp_header_file}" \
    -H "X-Goog-Upload-Protocol: resumable" \
    -H "X-Goog-Upload-Command: start" \
    -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
    -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
    -H "Content-Type: application/json" \
    -d "{'file': {'display_name': '${display_name}'}}" 2> /dev/null
  
  local upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
  rm "${tmp_header_file}"
  
  echo "Upload URL for ${display_name}: ${upload_url}" >&2
  
  curl "${upload_url}" \
    -H "Content-Length: ${NUM_BYTES}" \
    -H "X-Goog-Upload-Offset: 0" \
    -H "X-Goog-Upload-Command: upload, finalize" \
    --data-binary "@${display_name}.pdf" 2> /dev/null > "file_info_${display_name}.json"
  
  local file_uri=$(jq -r ".file.uri" "file_info_${display_name}.json")
  echo "file_uri for ${display_name}: ${file_uri}" >&2
  
  rm "${display_name}.pdf"
  
  echo "${file_uri}"
  }
  
  file_uri_1=$(upload_pdf "${DOC_URL_1}" "${DISPLAY_NAME_1}")
  
  file_uri_2=$(upload_pdf "${DOC_URL_2}" "${DISPLAY_NAME_2}")
  
  cat << EOF > payload_multi.json
  {
  "model": "gemini-3.8-flash",
  "input": [
    {"type": "document", "uri": "${file_uri_1}", "mime_type": "application/pdf"},
    {"type": "document", "uri": "${file_uri_2}", "mime_type": "application/pdf"},
    {"type": "text", "text": "${PROMPT}"}
  ]
  }
  EOF
  
  curl "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -X POST \
    -d @payload_multi.json 2> /dev/null > response.json
  
  cat response.json
  echo
  
  jq ".steps[-1].content[0].text" response.json
  
  rm payload_multi.json
  rm "file_info_${DISPLAY_NAME_1}.json"
  rm "file_info_${DISPLAY_NAME_2}.json"
  ```

  {% /tab %}

{% /tabs %}

## Office and OpenDocument files  {% id="office-documents" %}

Gemini models can process Microsoft Office and OpenDocument files. Pass them
the same way as PDFs, either inline or with the Files API, using a `document`
content block and one of the following MIME types:

| File type | Extension | MIME type |
| --- | --- | --- |
| Documents | `.docx` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
|  | `.doc` | `application/msword` |
|  | `.dotx` | `application/vnd.openxmlformats-officedocument.wordprocessingml.template` |
|  | `.odt` | `application/vnd.oasis.opendocument.text` |
| Presentations | `.pptx` | `application/vnd.openxmlformats-officedocument.presentationml.presentation` |
|  | `.ppt` | `application/vnd.ms-powerpoint` |
|  | `.odp` | `application/vnd.oasis.opendocument.presentation` |
| Spreadsheets | `.xlsx` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
|  | `.xls` | `application/vnd.ms-excel` |
|  | `.ods` | `application/vnd.oasis.opendocument.spreadsheet` |

These files are processed as follows:

* **DOCX, DOTX, ODT, and PPTX files**: The model receives the text of the
  whole file, plus embedded images for DOCX and PPTX files. Pages and slides
  aren't rendered as images, so page layout and visual elements such as
  charts might not be preserved.
* **DOC, PPT, and ODP files**: Each page or slide is rendered as an image,
  so the model can interpret layouts, charts, and images. The whole file is
  processed.
* **XLSX and XLS files**: Only the **first sheet** is read. Its contents are
  converted to CSV, so the model receives the cell values but not formulas or
  formatting.
* **ODS files**: Only the **first sheet** is read. The model receives its cell
  data and formulas.

Other sheets in a workbook are ignored. To analyze a different sheet, move it to
the first position or save it as a separate file.

Files are processed the same way whether you pass them in a request or a tool
returns them in a [function response](/docs/function-calling#multimodal).
The existing file size and page limits apply to the whole file.

The following example uploads a PowerPoint presentation with the Files API and
asks the model to summarize it:

{% tabs %}
  {% tab filename="sample.py" label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  deck = client.files.upload(
      file="quarterly_review.pptx",
      config={
          "mime_type": "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      },
  )
  
  interaction = client.interactions.create(
      model="gemini-3.8-flash",
      input=[
          {"type": "document", "uri": deck.uri, "mime_type": deck.mime_type},
          {"type": "text", "text": "Summarize the key takeaways from each slide."},
      ],
  )
  
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab filename="sample.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  async function main() {
      const deck = await ai.files.upload({
          file: "quarterly_review.pptx",
          config: {
              mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          },
      });
  
      const interaction = await ai.interactions.create({
          model: "gemini-3.8-flash",
          input: [
              { type: "document", uri: deck.uri, mime_type: deck.mimeType },
              { type: "text", text: "Summarize the key takeaways from each slide." }
          ]
      });
      console.log(interaction.output_text);
  }
  
  main();
  ```

  {% /tab %}

  {% tab filename="sample.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -d '{
      "model": "gemini-3.8-flash",
      "input": [
        {
          "type": "document",
          "uri": "https://generativelanguage.googleapis.com/v1beta/files/FILE_ID",
          "mime_type": "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        },
        {"type": "text", "text": "Summarize the key takeaways from each slide."}
      ]
    }'
  ```

  {% /tab %}

{% /tabs %}

Tools can also return these files to the model. For details, see
[Multimodal function responses](/docs/function-calling#multimodal).

## Technical details  {% id="technical-details" %}

Gemini supports PDF files up to 50MB or 1000 pages. This limit applies
to both inline data and Files API uploads. Each document page is equivalent to
258 tokens.

While there are no specific limits to the number of pixels in a document besides
the model's [context window](/docs/long-context), larger pages are
scaled down to a maximum resolution of 3072 x 3072 while preserving their
original aspect ratio, while smaller pages are scaled up to 768 x 768 pixels.
There is no cost reduction for pages at lower sizes, other than bandwidth, or
performance improvement for pages at higher resolution.

### Gemini 3 models  {% id="gemini-3-models" %}

Gemini 3 introduces granular control over multimodal vision processing with the
`media_resolution` parameter. You can now set the resolution to low, medium, or
high per individual media part. With this addition, the processing of PDF
documents has been updated:

1.   **Native text inclusion:** Text natively embedded in the PDF is extracted
  and provided to the model.

2.   **Billing & token reporting:**

  *     You are **not charged** for tokens originating from the extracted
    **native text** in PDFs.

  *     In the `usage_metadata` section of the API response, tokens generated
    from processing PDF pages (as images) are now counted under the `IMAGE`
    modality, not a separate `DOCUMENT` modality as in some earlier
    versions.



For more details about the media resolution parameter, see the
[Media resolution](/docs/media-resolution) guide.

### Document types  {% id="document-types" %}

Document vision meaningfully understands PDFs and DOC, PPT, and ODP files,
which are rendered as page images. DOCX, DOTX, ODT, and PPTX files are converted
to text, and spreadsheets are read as tabular data. For details, see
[Office and OpenDocument files](/docs/document-processing#office-documents).

Technically, you can pass other MIME types for document understanding, like
TXT, Markdown, HTML, XML, etc. However, these types are extracted as pure
text, which means the model can't understand the visual elements present in a
rendered file. Any file-type specifics like charts, diagrams, HTML tags,
Markdown formatting, etc., will be lost.

To learn about other file input methods, see the
[File input methods](/docs/file-input-methods) guide.

### Best practices  {% id="best-practices" %}

For best results:

* Rotate pages to the correct orientation before uploading.
* Avoid blurry pages.
* If using a single page, place the text prompt after the page.

## What's next  {% id="whats-next" %}

To learn more, see the following resources:

*   [File prompting strategies](/docs/files#prompt-guide): The
  Gemini API supports prompting with text, image, audio, and video data, also
  known as multimodal prompting.

*   [System instructions](/docs/text-generation#system-instructions):
  System instructions let you steer the behavior of the model based on your
  specific needs and use cases.


