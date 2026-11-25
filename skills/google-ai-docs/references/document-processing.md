> ## AI Agent Context
> - Full documentation index: https://aistudio.google.com/llms.txt
> - Gemini Docs MCP server (consistent live info): https://gemini-api-docs-mcp.dev
> - Coding agent skills & setup guide: https://aistudio.google.com/docs/coding-agents.md

# Document understanding

Gemini models process PDFs, Microsoft Office files, and OpenDocument files,
including Word documents, PowerPoint presentations, and Excel spreadsheets, to
analyze, summarize, and extract information from complex files. In addition to
reading plain text, the models understand visual and structural context, which
lets you:

* Analyze text, images, diagrams, charts, and tables across up to 1,000 PDF
  pages or up to 2,000 Office and OpenDocument pages or slides.
* Read spreadsheet values, formulas, and rendered charts across worksheets.
* Extract information into [structured output](/docs/structured-output) formats.
* Summarize, compare, and answer questions using both visual and textual details.
* Transcribe documents to formats like HTML while preserving layout.

See [Office and OpenDocument files](/docs/document-processing#office-documents)
for supported MIME types and defaults. To inspect specific pages, sheets, or
content layers instead of a whole file, see
[Customize document, presentation, and spreadsheet processing](/docs/document-processing#customize-document-processing).
Plain-text formats such as TXT, Markdown, and HTML are read as text only,
without layout or chart context.

## Passing document data inline  {% id="inline_data" %}

Pass document data inline for small files or one-off requests where you do not
need to reuse the file. For larger documents or multi-turn workflows, use the
[Files API](/docs/document-processing#large-pdfs) to reduce latency and
bandwidth.

The following example passes a PDF inline:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  import base64
  
  client = genai.Client()
  
  with open('path/to/document.pdf', 'rb') as f:
      pdf_bytes = f.read()
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
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
          model: "gemini-4-hydrogen",
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
          .model(Model.of("gemini-4-hydrogen"))
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
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: genai.Ptr(interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.DocumentContent{
                      Data:     genai.Ptr(base64Pdf),
                      MimeType: interactions.DocumentContentMimeTypeApplicationPdf.ToPointer(),
                  }),
                  interactions.NewContent(interactions.TextContent{
                      Text: "Summarize this document",
                  }),
              })),
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
    "model": "gemini-4-hydrogen",
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

  {% tab label="CLI" %}
  ```bash
  gemini-api analyze -i path/to/document.pdf "Summarize this document"
  ```

  {% /tab %}

{% /tabs %}

You can also upload a local document for processing:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  uploaded_file = client.files.upload(file="file.pdf")
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
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
          model: "gemini-4-hydrogen",
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
          .model(Model.of("gemini-4-hydrogen"))
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
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: genai.Ptr(interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.DocumentContent{
                      URI:      genai.Ptr(uploadedFile.URI),
                      MimeType: interactions.DocumentContentMimeType(uploadedFile.MIMEType).ToPointer(),
                  }),
                  interactions.NewContent(interactions.TextContent{
                      Text: "Summarize this document",
                  }),
              })),
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

  {% tab label="CLI" %}
  ```bash
  FILE=$(gemini-api files upload file.pdf --wait)
  gemini-api analyze -i "$FILE" "Summarize this document"
  ```

  {% /tab %}

{% /tabs %}

## Uploading documents using the Files API  {% id="large-pdfs" %}

Use the Files API for larger files or when you reuse a document across multiple
requests. Uploading once decouples file transfer from model requests, which
reduces latency and bandwidth.

{% callout type="note" %}
  The Files API is available at no cost in all regions where the Gemini API
  is available. Uploaded files are stored for 48 hours.

{% /callout %}

### Large documents from URLs  {% id="large-pdfs-urls" %}

Use the Files API to upload and process large documents from URLs:

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
      model="gemini-4-hydrogen",
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
          model: 'gemini-4-hydrogen',
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
          .model(Model.of("gemini-4-hydrogen"))
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
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: genai.Ptr(interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.DocumentContent{
                      URI:      genai.Ptr(sampleDoc.URI),
                      MimeType: interactions.DocumentContentMimeType(sampleDoc.MIMEType).ToPointer(),
                  }),
                  interactions.NewContent(interactions.TextContent{
                      Text: prompt,
                  }),
              })),
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
  "model": "gemini-4-hydrogen",
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

  {% tab label="CLI" %}
  ```bash
  curl -fsSL -o Gemini_paper.pdf "https://arxiv.org/pdf/2312.11805"
  FILE=$(gemini-api files upload Gemini_paper.pdf --wait)
  gemini-api analyze -i "$FILE" "Summarize this document"
  ```

  {% /tab %}

{% /tabs %}

### Large documents stored locally  {% id="large-pdfs-local" %}

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
      model="gemini-4-hydrogen",
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
          model: 'gemini-4-hydrogen',
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
          .model(Model.of("gemini-4-hydrogen"))
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
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: genai.Ptr(interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.DocumentContent{
                      URI:      genai.Ptr(sampleFile.URI),
                      MimeType: interactions.DocumentContentMimeType(sampleFile.MIMEType).ToPointer(),
                  }),
                  interactions.NewContent(interactions.TextContent{
                      Text: "Summarize this document",
                  }),
              })),
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
      "model": "gemini-4-hydrogen",
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

  {% tab label="CLI" %}
  ```bash
  FILE=$(gemini-api files upload large_file.pdf --wait)
  gemini-api analyze -i "$FILE" "Summarize this document"
  ```

  {% /tab %}

{% /tabs %}

You can verify the API successfully stored the uploaded file and get its
metadata by calling [`files.get`](/api-reference/files/get-file). Only the `name`
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

  {% tab label="CLI" %}
  ```bash
  # Replace example.pdf with the path to a local PDF file.
  FILE=$(gemini-api files upload example.pdf)
  gemini-api files get "$FILE" -o json
  ```

  {% /tab %}

{% /tabs %}

## Passing multiple documents  {% id="prompt-multiple" %}

You can process multiple documents in a single request as long as the combined
files and prompt fit within the model's context window.

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
      model="gemini-4-hydrogen",
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
          model: 'gemini-4-hydrogen',
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
          .model(Model.of("gemini-4-hydrogen"))
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
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: genai.Ptr(interactions.NewInteractionsInput([]interactions.Content{
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
              })),
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
  "model": "gemini-4-hydrogen",
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

  {% tab label="CLI" %}
  ```bash
  curl -fsSL -o Gemini_paper.pdf "https://arxiv.org/pdf/2312.11805"
  curl -fsSL -o Gemini_1.5_paper.pdf "https://arxiv.org/pdf/2403.05530"
  PDF_1=$(gemini-api files upload Gemini_paper.pdf --wait)
  PDF_2=$(gemini-api files upload Gemini_1.5_paper.pdf --wait)
  gemini-api analyze -i "$PDF_1" -i "$PDF_2" \
    "What is the difference between each of the main benchmarks between these two papers? Output these in a table."
  ```

  {% /tab %}

{% /tabs %}

## Office and OpenDocument files  {% id="office-documents" %}

Gemini models process Microsoft Office and OpenDocument files the same way as
PDFs. Pass them inline or with the Files API using a `document` content block
and one of these MIME types:

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

When you omit `processing` options, Gemini ingests the full file using these defaults:

| Extensions | Gemini 4+ | Gemini 3 & 2.5 |
| :--- | :--- | :--- |
| `.docx`, `.dotx`, `.odt`, `.pptx` | Page/slide images (medium res, ~560 tokens/page) | Extracted text (+ embedded images) |
| `.doc`, `.ppt`, `.odp` | Page/slide images (medium res, ~560 tokens/page) | Page/slide images |
| `.xlsx`, `.xls` | All sheets: values, formulas, sheet names | All sheets as CSV (values only) |
| `.ods` | All sheets: values, formulas, sheet names | All sheets: values, formulas, sheet names |

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
      model="gemini-4-hydrogen",
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
        mimeType:
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      },
    });
  
    const interaction = await ai.interactions.create({
      model: "gemini-4-hydrogen",
      input: [
        { type: "document", uri: deck.uri, mime_type: deck.mimeType },
        { type: "text", text: "Summarize the key takeaways from each slide." },
      ],
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
      "model": "gemini-4-hydrogen",
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

  {% tab filename="sample.sh" label="CLI" %}
  ```bash
  FILE=$(gemini-api files upload quarterly_review.pptx --wait \
    --mime-type application/vnd.openxmlformats-officedocument.presentationml.presentation)
  gemini-api analyze -i "$FILE" "Summarize the key takeaways from each slide."
  ```

  {% /tab %}

{% /tabs %}

Tools can also return these files or sliced selections in a
[function response](/docs/function-calling#multimodal). Existing file size and
page limits apply to the whole file.

## Customize document, presentation, and spreadsheet processing  {% id="customize-document-processing" %}

You can select specific pages, worksheet tabs, cell ranges, content layers, and
rendering resolution instead of sending an entire file. Pass a `processing`
object with `type` set to `static` on a document block, as shown in the examples
below. Gemini 3 and Gemini 4 models support these options in both user inputs
and tool results.

Gemini counts and bills tokens only for the slice you send. The model also
receives total page counts and worksheet names so it can ask for follow-up
ranges in later turns.

### Slice pages and select content layers  {% id="page-options" %}

Use `processing.page_options` to slice PDFs, documents, and presentations. All
fields are optional.

| Option | Description |
| --- | --- |
| `start_page` | First page to include (1-indexed, inclusive). Defaults to 1 when you set `end_page`. Values of 0 or less return an invalid argument error; values past the end of the file return an empty slice. |
| `end_page` | Last page to include (1-indexed, inclusive). Defaults to the last page when you set `start_page`, and clamps to the end of the file if higher. Must be at least `start_page`. |
| `content_layers` | List of layers to extract: `page_image` for rendered page images, `page_text` for extracted text, or both. Defaults to `page_image` when `processing` is set. |
| `resolution` | Set on the outer document block to `low` (~280 tokens/page), `medium` (default, ~560 tokens/page), or `high` (~1,120 tokens/page). |

{% callout type="note" %}
  For large documents or slide decks, scan with `page_text` first. Then request
  `page_image` at `high` resolution only for pages with charts or dense layouts.

{% /callout %}

{% tabs %}
  {% tab filename="page_options.py" label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  uploaded_doc = client.files.upload(file="quarterly_report.pdf")
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
      input=[
          {
              "type": "document",
              "uri": uploaded_doc.uri,
              "mime_type": "application/pdf",
              "resolution": "high",
              "processing": {
                  "type": "static",
                  "page_options": {
                      "start_page": 3,
                      "end_page": 7,
                      "content_layers": ["page_image"],
                  },
              },
          },
          {
              "type": "text",
              "text": "Summarize the revenue bridge chart and footnotes on pages 3 through 7.",
          },
      ],
  )
  
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab filename="page_options.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  const uploadedDoc = await ai.files.upload({
    file: "quarterly_report.pdf",
    config: { mimeType: "application/pdf" },
  });
  
  const interaction = await ai.interactions.create({
    model: "gemini-4-hydrogen",
    input: [
      {
        type: "document",
        uri: uploadedDoc.uri,
        mime_type: "application/pdf",
        resolution: "high",
        processing: {
          type: "static",
          page_options: {
            start_page: 3,
            end_page: 7,
            content_layers: ["page_image"],
          },
        },
      },
      {
        type: "text",
        text: "Summarize the revenue bridge chart and footnotes on pages 3 through 7.",
      },
    ],
  });
  
  console.log(interaction.output_text);
  ```

  {% /tab %}

  {% tab filename="PageOptions.java" label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.DocumentContent;
  import com.google.genai.gaos.models.interactions.DocumentContentMimeType;
  import com.google.genai.gaos.models.interactions.DocumentMediaProcessing;
  import com.google.genai.gaos.models.interactions.DocumentProcessing;
  import com.google.genai.gaos.models.interactions.DocumentStaticMediaProcessing;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.MediaResolution;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.PageProcessingOptions;
  import com.google.genai.gaos.models.interactions.PageProcessingOptionsContentLayer;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import com.google.genai.types.File;
  import com.google.genai.types.UploadFileConfig;
  import java.util.List;
  
  Client client = new Client();
  
  File uploadedDoc =
      client.files.upload(
          new java.io.File("quarterly_report.pdf"),
          UploadFileConfig.builder().mimeType("application/pdf").build());
  
  List<Content> content =
      List.of(
          DocumentContent.builder()
              .uri(uploadedDoc.uri().orElse(""))
              .mimeType(DocumentContentMimeType.APPLICATION_PDF)
              .resolution(MediaResolution.HIGH)
              .processing(
                  DocumentProcessing.of(
                      DocumentMediaProcessing.of(
                          DocumentStaticMediaProcessing.builder()
                              .pageOptions(
                                  PageProcessingOptions.builder()
                                      .startPage(3)
                                      .endPage(7)
                                      .contentLayers(
                                          List.of(PageProcessingOptionsContentLayer.PAGE_IMAGE))
                                      .build())
                              .build())))
              .build(),
          TextContent.builder()
              .text("Summarize the revenue bridge chart and footnotes on pages 3 through 7.")
              .build());
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-4-hydrogen"))
          .input(InteractionsInput.ofContent(content))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().orElseThrow();
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab filename="page_options.go" label="Go" %}
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
  
      uploadedDoc, err := client.Files.UploadFromPath(ctx, "quarterly_report.pdf", &genai.UploadFileConfig{
          MIMEType: "application/pdf",
      })
      if err != nil {
          log.Fatal(err)
      }
  
      contents := []interactions.Content{
          interactions.NewContent(interactions.DocumentContent{
              URI:        genai.Ptr(uploadedDoc.URI),
              MimeType:   interactions.DocumentContentMimeTypeApplicationPdf.ToPointer(),
              Resolution: interactions.MediaResolutionHigh.ToPointer(),
              Processing: genai.Ptr(interactions.NewDocumentProcessing(
                  interactions.NewDocumentMediaProcessing(interactions.DocumentStaticMediaProcessing{
                      PageOptions: &interactions.PageProcessingOptions{
                          StartPage: genai.Ptr(3),
                          EndPage:   genai.Ptr(7),
                          ContentLayers: []interactions.PageProcessingOptionsContentLayer{
                              interactions.PageProcessingOptionsContentLayerPageImage,
                          },
                      },
                  }),
              )),
          }),
          interactions.NewContent(interactions.TextContent{
              Text: "Summarize the revenue bridge chart and footnotes on pages 3 through 7.",
          }),
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: genai.Ptr(interactions.NewInteractionsInput(contents)),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      if res.Interaction != nil && res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab filename="page_options.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
      "model": "gemini-4-hydrogen",
      "input": [
        {
          "type": "document",
          "uri": "https://generativelanguage.googleapis.com/v1beta/files/FILE_ID",
          "mime_type": "application/pdf",
          "resolution": "high",
          "processing": {
            "type": "static",
            "page_options": {
              "start_page": 3,
              "end_page": 7,
              "content_layers": ["page_image"]
            }
          }
        },
        {
          "type": "text",
          "text": "Summarize the revenue bridge chart and footnotes on pages 3 through 7."
        }
      ]
    }'
  ```

  {% /tab %}

{% /tabs %}

### Select spreadsheet tabs and cell ranges  {% id="spreadsheet-options" %}

Use `processing.spreadsheet_options` to select tabs, cell ranges, and layers in
spreadsheets. All fields are optional.

| Option | Description |
| --- | --- |
| `sheet_index` | Worksheet position in tab order (1-indexed). Omit to include all sheets, up to 50,000 cells per sheet. Values of 0 or less, or above the sheet count, return an invalid argument error. |
| `visible_cells` | Cell or range in A1 notation, such as A1:G40 or B5. Crops all selected layers to that region. |
| `content_layers` | List of layers to extract: `data` for evaluated values, `formulas` for raw formulas, and `visual` for a rendered snapshot of charts and layout. Defaults to `data` and `formulas`. |
| `resolution` | Set on the outer document block to `low`, `medium` (default), or `high` when you include the `visual` layer. |

{% tabs %}
  {% tab filename="spreadsheet_options.py" label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  workbook = client.files.upload(file="financial_model.xlsx")
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
      input=[
          {
              "type": "document",
              "uri": workbook.uri,
              "mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "resolution": "high",
              "processing": {
                  "type": "static",
                  "spreadsheet_options": {
                      "sheet_index": 2,
                      "visible_cells": "A1:H50",
                      "content_layers": ["data", "formulas", "visual"],
                  },
              },
          },
          {
              "type": "text",
              "text": "Audit the EBITDA formulas and chart in Sheet 2 (A1:H50).",
          },
      ],
  )
  
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab filename="spreadsheet_options.js" label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const ai = new GoogleGenAI({});
  
  const workbook = await ai.files.upload({
    file: "financial_model.xlsx",
    config: {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });
  
  const interaction = await ai.interactions.create({
    model: "gemini-4-hydrogen",
    input: [
      {
        type: "document",
        uri: workbook.uri,
        mime_type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        resolution: "high",
        processing: {
          type: "static",
          spreadsheet_options: {
            sheet_index: 2,
            visible_cells: "A1:H50",
            content_layers: ["data", "formulas", "visual"],
          },
        },
      },
      {
        type: "text",
        text: "Audit the EBITDA formulas and chart in Sheet 2 (A1:H50).",
      },
    ],
  });
  
  console.log(interaction.output_text);
  ```

  {% /tab %}

  {% tab filename="SpreadsheetOptions.java" label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.DocumentContent;
  import com.google.genai.gaos.models.interactions.DocumentContentMimeType;
  import com.google.genai.gaos.models.interactions.DocumentMediaProcessing;
  import com.google.genai.gaos.models.interactions.DocumentProcessing;
  import com.google.genai.gaos.models.interactions.DocumentStaticMediaProcessing;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.MediaResolution;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.SpreadsheetProcessingOptions;
  import com.google.genai.gaos.models.interactions.SpreadsheetProcessingOptionsContentLayer;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import com.google.genai.types.File;
  import com.google.genai.types.UploadFileConfig;
  import java.util.List;
  
  Client client = new Client();
  
  File workbook =
      client.files.upload(
          new java.io.File("financial_model.xlsx"),
          UploadFileConfig.builder()
              .mimeType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
              .build());
  
  List<Content> content =
      List.of(
          DocumentContent.builder()
              .uri(workbook.uri().orElse(""))
              .mimeType(
                  DocumentContentMimeType
                      .APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET)
              .resolution(MediaResolution.HIGH)
              .processing(
                  DocumentProcessing.of(
                      DocumentMediaProcessing.of(
                          DocumentStaticMediaProcessing.builder()
                              .spreadsheetOptions(
                                  SpreadsheetProcessingOptions.builder()
                                      .sheetIndex(2)
                                      .visibleCells("A1:H50")
                                      .contentLayers(
                                          List.of(
                                              SpreadsheetProcessingOptionsContentLayer.DATA,
                                              SpreadsheetProcessingOptionsContentLayer.FORMULAS,
                                              SpreadsheetProcessingOptionsContentLayer.VISUAL))
                                      .build())
                              .build())))
              .build(),
          TextContent.builder()
              .text("Audit the EBITDA formulas and chart in Sheet 2 (A1:H50).")
              .build());
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-4-hydrogen"))
          .input(InteractionsInput.ofContent(content))
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().orElseThrow();
  System.out.println(interaction.outputText().orElse(""));
  ```

  {% /tab %}

  {% tab filename="spreadsheet_options.go" label="Go" %}
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
  
      workbook, err := client.Files.UploadFromPath(ctx, "financial_model.xlsx", &genai.UploadFileConfig{
          MIMEType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
      if err != nil {
          log.Fatal(err)
      }
  
      contents := []interactions.Content{
          interactions.NewContent(interactions.DocumentContent{
              URI:        genai.Ptr(workbook.URI),
              MimeType:   interactions.DocumentContentMimeTypeApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlSheet.ToPointer(),
              Resolution: interactions.MediaResolutionHigh.ToPointer(),
              Processing: genai.Ptr(interactions.NewDocumentProcessing(
                  interactions.NewDocumentMediaProcessing(interactions.DocumentStaticMediaProcessing{
                      SpreadsheetOptions: &interactions.SpreadsheetProcessingOptions{
                          SheetIndex:   genai.Ptr(2),
                          VisibleCells: genai.Ptr("A1:H50"),
                          ContentLayers: []interactions.SpreadsheetProcessingOptionsContentLayer{
                              interactions.SpreadsheetProcessingOptionsContentLayerData,
                              interactions.SpreadsheetProcessingOptionsContentLayerFormulas,
                              interactions.SpreadsheetProcessingOptionsContentLayerVisual,
                          },
                      },
                  }),
              )),
          }),
          interactions.NewContent(interactions.TextContent{
              Text: "Audit the EBITDA formulas and chart in Sheet 2 (A1:H50).",
          }),
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: genai.Ptr(interactions.NewInteractionsInput(contents)),
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      if res.Interaction != nil && res.Interaction.OutputText != nil {
          fmt.Println(*res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab filename="spreadsheet_options.sh" label="REST" %}
  ```shell
  curl -X POST "https://generativelanguage.googleapis.com/v1/interactions" \
    -H "Content-Type: application/json" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -d '{
      "model": "gemini-4-hydrogen",
      "input": [
        {
          "type": "document",
          "uri": "https://generativelanguage.googleapis.com/v1beta/files/WORKBOOK_FILE_ID",
          "mime_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "resolution": "high",
          "processing": {
            "type": "static",
            "spreadsheet_options": {
              "sheet_index": 2,
              "visible_cells": "A1:H50",
              "content_layers": ["data", "formulas", "visual"]
            }
          }
        },
        {
          "type": "text",
          "text": "Audit the EBITDA formulas and chart in Sheet 2 (A1:H50)."
        }
      ]
    }'
  ```

  {% /tab %}

{% /tabs %}

## Technical details  {% id="technical-details" %}

### Limits and scaling  {% id="limits-and-scaling" %}

* File size and length: Up to 50 MB per file, 1,000 pages per PDF, or 2,000
  pages or slides per Office or OpenDocument file. These limits apply to both
  inline data and Files API uploads, and to the full uploaded file even when
  slicing.
* Spreadsheets: Up to 50,000 cells per sheet.
* Page image rendering: Gemini renders PDF and Office pages to 2-megapixel
  images (288 DPI) while preserving aspect ratio. Input pixel dimensions do not
  change token cost; use `resolution` to control token budget and detail.
* Other text formats: Plain-text files such as TXT, Markdown, HTML, and XML are
  extracted as text only, without layout, formatting, or charts. See
  [File input methods](/docs/file-input-methods) for all input options.

### Tokens and billing  {% id="tokens-and-billing" %}

* Gemini 4 and Gemini 3 models: Page image token counts depend on `resolution`.
  They use about 280 tokens per page at `low`, 560 at `medium` (default), or
  1,120 at `high`. See [Media resolution](/docs/media-resolution) for details.
* Gemini 2.5 models: Flat 258 tokens per page.
* PDF native text and usage reporting: For default PDF processing without
  `processing` options, embedded PDF text is extracted alongside page images at
  no extra token charge. Page image tokens appear under the `image` modality in
  `usage.input_tokens_by_modality`.
* Sliced billing: When you set `processing` options, Gemini counts and bills
  only the selected pages, sheets, and content layers sent to the model.

## Best practices  {% id="best-practices" %}

* Rotate pages to the correct orientation before uploading.
* Avoid blurry scans or low-contrast pages.
* When sending a single page, place the text prompt after the document.

## What's next  {% id="whats-next" %}

To learn more, see the following resources:

* [File prompting strategies](/docs/files#prompt-guide): The
  Gemini API supports prompting with text, image, audio, and video data, also
  known as multimodal prompting.

* [System instructions](/docs/text-generation#system-instructions):
  System instructions let you steer the behavior of the model based on your
  specific needs and use cases.


