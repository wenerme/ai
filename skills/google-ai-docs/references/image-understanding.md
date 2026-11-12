> ## AI Agent Context
> Get the complete documentation index at: https://aistudio.google.com/llms.txt
> Use this file to discover all available pages.
> For the full documentation in a single file, fetch: https://aistudio.google.com/llms-full.txt

# Image understanding

Gemini models are built to be multimodal from the ground up, unlocking a wide
range of image processing and computer vision tasks including but not limited to
image captioning, classification, and visual question answering without having
to train specialized ML models.

In addition to their general multimodal capabilities, Gemini models offer
**enhanced accuracy** for specific use cases like [object detection](/docs/image-understanding#object-detection) and [segmentation](/docs/image-understanding#segmentation), through additional
training.

## Passing images to Gemini  {% id="image-input" %}

You can provide images as input to Gemini using several methods:

* [Passing image using URL](/docs/image-understanding#url-image): Ideal for publicly accessible images.
* [Passing inline image data](/docs/image-understanding#inline-image): For base64-encoded image data.
* [Uploading images using the File API](/docs/image-understanding#upload-image): Recommended for
  larger files or for reusing images across multiple requests.

### Passing image using URL  {% id="url-image" %}

You can upload an image using the [Files API](/docs/files) and pass it
in the request:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  uploaded_file = client.files.upload(file="path/to/organ.jpg")
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
      input=[
          {"type": "text", "text": "Caption this image."},
          {
              "type": "image",
              "uri": uploaded_file.uri,
              "mime_type": uploaded_file.mime_type
          }
      ]
  )
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const client = new GoogleGenAI({});
  
  const uploadedFile = await client.files.upload({
      file: "path/to/organ.jpg",
      config: { mimeType: "image/jpeg" }
  });
  
  const interaction = await client.interactions.create({
      model: "gemini-4-hydrogen",
      input: [
          {type: "text", text: "Caption this image."},
          {
              type: "image",
              uri: uploadedFile.uri,
              mime_type: uploadedFile.mimeType
          }
      ]
  });
  console.log(interaction.output_text);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.ImageContent;
  import com.google.genai.gaos.models.interactions.ImageContentMimeType;
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
          new java.io.File("path/to/organ.jpg"),
          UploadFileConfig.builder().mimeType("image/jpeg").build());
  
  Content textContent = TextContent.builder().text("Caption this image.").build();
  Content imageContent =
      ImageContent.builder()
          .uri(uploadedFile.uri().orElse(""))
          .mimeType(ImageContentMimeType.of(uploadedFile.mimeType().orElse("image/jpeg")))
          .build();
  
  List<Content> contents = Arrays.asList(textContent, imageContent);
  
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
  
      uploadedFile, err := client.Files.UploadFromPath(ctx, "path/to/organ.jpg", &genai.UploadFileConfig{
          MIMEType: "image/jpeg",
      })
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.TextContent{
                      Text: "Caption this image.",
                  }),
                  interactions.NewContent(interactions.ImageContent{
                      URI:      genai.Ptr(uploadedFile.URI),
                      MimeType: interactions.ImageContentMimeType(uploadedFile.MIMEType).ToPointer(),
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
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-4-hydrogen",
      "input": [
        {"type": "text", "text": "Caption this image."},
        {
          "type": "image",
          "uri": "YOUR_FILE_URI",
          "mime_type": "image/jpeg"
        }
      ]
    }'
  ```

  {% /tab %}

  {% tab label="CLI" %}
  ```bash
  FILE=$(gemini-api files upload path/to/organ.jpg --wait)
  gemini-api analyze "Caption this image." -i "$FILE"
  ```

  {% /tab %}

{% /tabs %}

### Passing inline image data  {% id="inline-image" %}

You can provide image data as base64-encoded strings:

{% tabs %}
  {% tab label="Python" %}
  ```python
  import base64
  from google import genai
  
  with open('path/to/small-sample.jpg', 'rb') as f:
      image_bytes = f.read()
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
      input=[
          {"type": "text", "text": "Caption this image."},
          {
              "type": "image",
              "data": base64.b64encode(image_bytes).decode('utf-8'),
              "mime_type": "image/jpeg"
          }
      ]
  )
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  import * as fs from "node:fs";
  
  const client = new GoogleGenAI({});
  const base64ImageFile = fs.readFileSync("path/to/small-sample.jpg", {
    encoding: "base64",
  });
  
  const interaction = await client.interactions.create({
      model: "gemini-4-hydrogen",
      input: [
          {type: "text", text: "Caption this image."},
          {
              type: "image",
              data: base64ImageFile,
              mime_type: "image/jpeg"
          }
      ]
  });
  console.log(interaction.output_text);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.ImageContent;
  import com.google.genai.gaos.models.interactions.ImageContentMimeType;
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
  
  byte[] imageBytes = Files.readAllBytes(Paths.get("path/to/small-sample.jpg"));
  String base64Image = Base64.getEncoder().encodeToString(imageBytes);
  
  Client client = new Client();
  
  Content textContent = TextContent.builder().text("Caption this image.").build();
  Content imageContent =
      ImageContent.builder()
          .data(base64Image)
          .mimeType(ImageContentMimeType.IMAGE_JPEG)
          .build();
  
  List<Content> contents = Arrays.asList(textContent, imageContent);
  
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
  
      imageBytes, err := os.ReadFile("path/to/small-sample.jpg")
      if err != nil {
          log.Fatal(err)
      }
      base64Image := base64.StdEncoding.EncodeToString(imageBytes)
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.TextContent{
                      Text: "Caption this image.",
                  }),
                  interactions.NewContent(interactions.ImageContent{
                      Data:     genai.Ptr(base64Image),
                      MimeType: interactions.ImageContentMimeTypeImageJpeg.ToPointer(),
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
  IMG_PATH="/path/to/your/image1.jpg"
  
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
        {"type": "text", "text": "Caption this image."},
        {
          "type": "image",
          "data": "'"$(base64 $B64FLAGS $IMG_PATH)"'",
          "mime_type": "image/jpeg"
        }
      ]
    }'
  ```

  {% /tab %}

  {% tab label="CLI" %}
  ```bash
  gemini-api analyze "Caption this image." -i path/to/small-sample.jpg
  ```

  {% /tab %}

{% /tabs %}

{% callout type="note" %}
  Inline image data limits your total request size (text prompts, system
  instructions, and inline bytes) to 20MB. For larger requests,
  [upload image files](/docs/image-understanding#upload-image) using the File API.

{% /callout %}

### Uploading images using the File API  {% id="upload-image" %}

For large files or to be able to use the same image file repeatedly, use the
Files API. See the [Files API guide](/docs/files).

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  my_file = client.files.upload(file="path/to/sample.jpg")
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
      input=[
          {"type": "text", "text": "Caption this image."},
          {
              "type": "image",
              "uri": my_file.uri,
              "mime_type": my_file.mime_type
          }
      ]
  )
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const client = new GoogleGenAI({});
  
  const myfile = await client.files.upload({
      file: "path/to/sample.jpg",
      config: { mimeType: "image/jpeg" },
  });
  
  const interaction = await client.interactions.create({
      model: "gemini-4-hydrogen",
      input: [
          {type: "text", text: "Caption this image."},
          {
              type: "image",
              uri: myfile.uri,
              mime_type: myfile.mimeType
          }
      ]
  });
  console.log(interaction.output_text);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.ImageContent;
  import com.google.genai.gaos.models.interactions.ImageContentMimeType;
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
  
  File myFile =
      client.files.upload(
          new java.io.File("path/to/sample.jpg"),
          UploadFileConfig.builder().mimeType("image/jpeg").build());
  
  Content textContent = TextContent.builder().text("Caption this image.").build();
  Content imageContent =
      ImageContent.builder()
          .uri(myFile.uri().orElse(""))
          .mimeType(ImageContentMimeType.of(myFile.mimeType().orElse("image/jpeg")))
          .build();
  
  List<Content> contents = Arrays.asList(textContent, imageContent);
  
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
  
      myFile, err := client.Files.UploadFromPath(ctx, "path/to/sample.jpg", &genai.UploadFileConfig{
          MIMEType: "image/jpeg",
      })
      if err != nil {
          log.Fatal(err)
      }
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.TextContent{
                      Text: "Caption this image.",
                  }),
                  interactions.NewContent(interactions.ImageContent{
                      URI:      genai.Ptr(myFile.URI),
                      MimeType: interactions.ImageContentMimeType(myFile.MIMEType).ToPointer(),
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
  
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-4-hydrogen",
      "input": [
        {"type": "text", "text": "Caption this image."},
        {
          "type": "image",
          "uri": "YOUR_FILE_URI",
          "mime_type": "image/jpeg"
        }
      ]
    }'
  ```

  {% /tab %}

{% /tabs %}

## Prompting with multiple images  {% id="multiple-images" %}

You can provide multiple images in a single prompt by including multiple image
objects in the `input` array:

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  
  client = genai.Client()
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
      input=[
          {"type": "text", "text": "What is different between these two images?"},
          {
              "type": "image",
              "uri": "https://example.com/image1.jpg",
              "mime_type": "image/jpeg"
          },
          {
              "type": "image",
              "uri": "https://example.com/image2.jpg",
              "mime_type": "image/jpeg"
          }
      ]
  )
  print(interaction.output_text)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  
  const client = new GoogleGenAI({});
  
  const interaction = await client.interactions.create({
      model: "gemini-4-hydrogen",
      input: [
          {type: "text", text: "What is different between these two images?"},
          {
              type: "image",
              uri: "https://example.com/image1.jpg",
              mime_type: "image/jpeg"
          },
          {
              type: "image",
              uri: "https://example.com/image2.jpg",
              mime_type: "image/jpeg"
          }
      ]
  });
  console.log(interaction.output_text);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.ImageContent;
  import com.google.genai.gaos.models.interactions.ImageContentMimeType;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.List;
  
  Client client = new Client();
  
  Content textContent =
      TextContent.builder().text("What is different between these two images?").build();
  Content image1 =
      ImageContent.builder()
          .uri("https://example.com/image1.jpg")
          .mimeType(ImageContentMimeType.IMAGE_JPEG)
          .build();
  Content image2 =
      ImageContent.builder()
          .uri("https://example.com/image2.jpg")
          .mimeType(ImageContentMimeType.IMAGE_JPEG)
          .build();
  
  List<Content> contents = Arrays.asList(textContent, image1, image2);
  
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
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.TextContent{
                      Text: "What is different between these two images?",
                  }),
                  interactions.NewContent(interactions.ImageContent{
                      URI:      genai.Ptr("https://example.com/image1.jpg"),
                      MimeType: interactions.ImageContentMimeTypeImageJpeg.ToPointer(),
                  }),
                  interactions.NewContent(interactions.ImageContent{
                      URI:      genai.Ptr("https://example.com/image2.jpg"),
                      MimeType: interactions.ImageContentMimeTypeImageJpeg.ToPointer(),
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
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-4-hydrogen",
      "input": [
        {"type": "text", "text": "What is different between these two images?"},
        {
          "type": "image",
          "uri": "https://example.com/image1.jpg",
          "mime_type": "image/jpeg"
        },
        {
          "type": "image",
          "uri": "https://example.com/image2.jpg",
          "mime_type": "image/jpeg"
        }
      ]
    }'
  ```

  {% /tab %}

  {% tab label="CLI" %}
  ```bash
  gemini-api analyze "What is different between these two images?" -i image1.jpg -i image2.jpg
  ```

  {% /tab %}

{% /tabs %}

## Object detection  {% id="object-detection" %}

Models are trained to detect objects in an
image and get their bounding box coordinates. The coordinates, relative to image
dimensions, scale to \[0, 1000\]. You need to descale these coordinates based on
your original image size.

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from pydantic import BaseModel, Field
  from typing import List
  import json
  
  client = genai.Client()
  prompt = "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000."
  
  class BoundingBox(BaseModel):
      box_2d: List[int] = Field(description="The 2D bounding box of the item as [ymin, xmin, ymax, xmax] normalized to 0-1000.")
      mask: List[List[int]] = Field(description="The segmentation mask of the item as a polygon of [x,y] coordinates, normalized to 0-1000.")
      label: str = Field(description="A descriptive label for the item.")
  
  class BoundingBoxes(BaseModel):
      boxes: List[BoundingBox]
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
      input=[
          {"type": "text", "text": prompt},
          {
              "type": "image",
              "uri": "https://example.com/image.png",
              "mime_type": "image/png"
          }
      ],
      response_format={
          "type": "text",
          "mime_type": "application/json",
          "schema": BoundingBoxes.model_json_schema()
      }
  )
  
  bounding_boxes = BoundingBoxes.model_validate_json(interaction.output_text)
  print(bounding_boxes)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  import * as z from "zod";
  
  const client = new GoogleGenAI({});
  const prompt = "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000.";
  
  const boundingBoxesSchema = z.object({
    boxes: z.array(z.object({
      box_2d: z.array(z.number()),
      mask: z.array(z.array(z.number())),
      label: z.string()
    }))
  });
  
  const interaction = await client.interactions.create({
    model: "gemini-4-hydrogen",
    input: [
      { type: "text", text: prompt },
      {
        type: "image",
        uri: "https://example.com/image.png",
        mime_type: "image/png"
      }
    ],
    response_format: {
      type: 'text',
      mime_type: 'application/json',
      schema: z.toJSONSchema(boundingBoxesSchema)
    },
  });
  
  const result = boundingBoxesSchema.parse(JSON.parse(interaction.output_text));
  console.log(result);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.CreateModelInteractionResponseFormat;
  import com.google.genai.gaos.models.interactions.ImageContent;
  import com.google.genai.gaos.models.interactions.ImageContentMimeType;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.ResponseFormat;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.interactions.TextResponseFormat;
  import com.google.genai.gaos.models.interactions.TextResponseFormatMimeType;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.List;
  import java.util.Map;
  
  Client client = new Client();
  String prompt =
      "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000.";
  
  Map<String, Object> boundingBoxSchema =
      Map.of(
          "type", "object",
          "properties",
              Map.of(
                  "box_2d",
                      Map.of(
                          "type", "array",
                          "items", Map.of("type", "integer"),
                          "description",
                              "The 2D bounding box of the item as [ymin, xmin, ymax, xmax] normalized to 0-1000."),
                  "mask",
                      Map.of(
                          "type", "array",
                          "items", Map.of("type", "array", "items", Map.of("type", "integer")),
                          "description",
                              "The segmentation mask of the item as a polygon of [x,y] coordinates, normalized to 0-1000."),
                  "label",
                      Map.of("type", "string", "description", "A descriptive label for the item.")),
          "required", List.of("box_2d", "mask", "label"));
  
  Map<String, Object> boundingBoxesSchema =
      Map.of(
          "type", "object",
          "properties", Map.of("boxes", Map.of("type", "array", "items", boundingBoxSchema)),
          "required", List.of("boxes"));
  
  CreateModelInteractionResponseFormat format =
      CreateModelInteractionResponseFormat.of(
          ResponseFormat.of(
              TextResponseFormat.builder()
                  .mimeType(TextResponseFormatMimeType.APPLICATION_JSON)
                  .schema(boundingBoxesSchema)
                  .build()));
  
  Content textContent = TextContent.builder().text(prompt).build();
  Content imageContent =
      ImageContent.builder()
          .uri("https://example.com/image.png")
          .mimeType(ImageContentMimeType.IMAGE_PNG)
          .build();
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-4-hydrogen"))
          .input(InteractionsInput.ofContent(Arrays.asList(textContent, imageContent)))
          .responseFormat(format)
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
  
      prompt := "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000."
  
      boundingBoxSchema := map[string]any{
          "type": "object",
          "properties": map[string]any{
              "box_2d": map[string]any{
                  "type":        "array",
                  "items":       map[string]any{"type": "integer"},
                  "description": "The 2D bounding box of the item as [ymin, xmin, ymax, xmax] normalized to 0-1000.",
              },
              "mask": map[string]any{
                  "type":        "array",
                  "items":       map[string]any{"type": "array", "items": map[string]any{"type": "integer"}},
                  "description": "The segmentation mask of the item as a polygon of [x,y] coordinates, normalized to 0-1000.",
              },
              "label": map[string]any{
                  "type":        "string",
                  "description": "A descriptive label for the item.",
              },
          },
          "required": []string{"box_2d", "mask", "label"},
      }
  
      boundingBoxesSchema := map[string]any{
          "type": "object",
          "properties": map[string]any{
              "boxes": map[string]any{
                  "type":  "array",
                  "items": boundingBoxSchema,
              },
          },
          "required": []string{"boxes"},
      }
  
      format := interactions.NewCreateModelInteractionResponseFormat(
          interactions.NewResponseFormat(interactions.TextResponseFormat{
              MimeType: interactions.TextResponseFormatMimeTypeApplicationJSON.ToPointer(),
              Schema:   boundingBoxesSchema,
          }),
      )
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.TextContent{
                      Text: prompt,
                  }),
                  interactions.NewContent(interactions.ImageContent{
                      URI:      genai.Ptr("https://example.com/image.png"),
                      MimeType: interactions.ImageContentMimeTypeImagePng.ToPointer(),
                  }),
              }),
              ResponseFormat: genai.Ptr(format),
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
  ```bash
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-4-hydrogen",
      "input": [
        {"type": "text", "text": "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000."},
        {
          "type": "image",
          "uri": "https://example.com/image.png",
          "mime_type": "image/png"
        }
      ],
      "response_format": {
        "type": "text",
        "mime_type": "application/json",
        "schema": {
          "type": "object",
          "properties": {
            "boxes": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "box_2d": { "type": "array", "items": { "type": "integer" } },
                  "mask": { "type": "array", "items": { "type": "array", "items": { "type": "integer" } } },
                  "label": { "type": "string" }
                },
                "required": ["box_2d", "mask", "label"]
              }
            }
          },
          "required": ["boxes"]
        }
      }
    }'
  ```

  {% /tab %}

  {% tab label="CLI" %}
  ```bash
  gemini-api generate -i image.png "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000." \
    --body '{"response_format": {"type": "text", "mime_type": "application/json", "schema": {
      "type": "object", "required": ["boxes"], "properties": {"boxes": {"type": "array", "items": {
        "type": "object", "required": ["box_2d", "mask", "label"], "properties": {
          "box_2d": {"type": "array", "items": {"type": "integer"}},
          "mask": {"type": "array", "items": {"type": "array", "items": {"type": "integer"}}},
          "label": {"type": "string"}}}}}}}}'
  ```

  {% /tab %}

{% /tabs %}

{% callout type="note" %}
  The model also supports generating bounding boxes based on custom
  instructions, such as: "Show bounding boxes of all green objects in this image".

{% /callout %}

For more examples, check following notebooks in the [Gemini Cookbook](https://github.com/google-gemini/cookbook):

## Segmentation  {% id="segmentation" %}

Starting with Gemini 2.5, models not only detect items but also segment them
and provide their contour masks.

The model predicts a JSON list, where each item represents a segmentation mask.
Each item has a bounding box ("`box_2d`") in the format `[y0, x0, y1, x1]` with
normalized coordinates between 0 and 1000, a label ("`label`") that identifies
the object, and finally the segmentation mask inside the bounding box, as base64
encoded png that is a probability map with values between 0 and 255.

{% callout type="note" %}
  Gemini 4 Hydrogen defaults to `thinking_level` set to `"high"`. For lower latency on high-volume segmentation, you can also test `"low"`, or use `"minimal"` on [models that support minimal thinking](/docs/thinking#thinking-levels) such as `gemini-3.5-flash-lite`.

{% /callout %}

{% tabs %}
  {% tab label="Python" %}
  ```python
  from google import genai
  from pydantic import BaseModel, Field
  from typing import List
  import json
  
  client = genai.Client()
  
  prompt = """
  Give the segmentation masks for the wooden and glass items.
  Output a JSON list of segmentation masks where each entry contains the 2D
  bounding box in the key "box_2d", the segmentation mask in key "mask", and
  the text label in the key "label". Use descriptive labels.
  """
  
  class BoundingBox(BaseModel):
      box_2d: List[int] = Field(description="The 2D bounding box of the item as [ymin, xmin, ymax, xmax] normalized to 0-1000.")
      mask: List[List[int]] = Field(description="The segmentation mask of the item as a polygon of [x,y] coordinates, normalized to 0-1000.")
      label: str = Field(description="A descriptive label for the item.")
  
  class BoundingBoxes(BaseModel):
      boxes: List[BoundingBox]
  
  interaction = client.interactions.create(
      model="gemini-4-hydrogen",
      input=[
          {"type": "text", "text": prompt},
          {
              "type": "image",
              "uri": "https://example.com/image.png",
              "mime_type": "image/png"
          }
      ],
      response_format={
          "type": "text",
          "mime_type": "application/json",
          "schema": BoundingBoxes.model_json_schema()
      },
      generation_config={
          "thinking_level": "high"
      }
  )
  
  items = BoundingBoxes.model_validate_json(interaction.output_text)
  print("Segmentation results:", items)
  ```

  {% /tab %}

  {% tab label="JavaScript" %}
  ```javascript
  import { GoogleGenAI } from "@google/genai";
  import * as z from "zod";
  
  const client = new GoogleGenAI({});
  const prompt = `
  Give the segmentation masks for the wooden and glass items.
  Output a JSON list of segmentation masks where each entry contains the 2D
  bounding box in the key "box_2d", the segmentation mask in key "mask", and
  the text label in the key "label". Use descriptive labels.
  `;
  
  const boundingBoxesSchema = z.object({
    boxes: z.array(z.object({
      box_2d: z.array(z.number()),
      mask: z.array(z.array(z.number())),
      label: z.string()
    }))
  });
  
  const interaction = await client.interactions.create({
    model: "gemini-4-hydrogen",
    input: [
      { type: "text", text: prompt },
      {
        type: "image",
        uri: "https://example.com/image.png",
        mime_type: "image/png"
      }
    ],
    response_format: {
      type: 'text',
      mime_type: 'application/json',
      schema: z.toJSONSchema(boundingBoxesSchema)
    },
    generation_config: {
      thinking_level: "high"
    }
  });
  
  const result = boundingBoxesSchema.parse(JSON.parse(interaction.output_text));
  console.log(result);
  ```

  {% /tab %}

  {% tab label="Java" %}
  ```java
  import com.google.genai.Client;
  import com.google.genai.gaos.models.interactions.Content;
  import com.google.genai.gaos.models.interactions.CreateModelInteraction;
  import com.google.genai.gaos.models.interactions.CreateModelInteractionResponseFormat;
  import com.google.genai.gaos.models.interactions.GenerationConfig;
  import com.google.genai.gaos.models.interactions.ImageContent;
  import com.google.genai.gaos.models.interactions.ImageContentMimeType;
  import com.google.genai.gaos.models.interactions.Interaction;
  import com.google.genai.gaos.models.interactions.InteractionsInput;
  import com.google.genai.gaos.models.interactions.Model;
  import com.google.genai.gaos.models.interactions.ResponseFormat;
  import com.google.genai.gaos.models.interactions.TextContent;
  import com.google.genai.gaos.models.interactions.TextResponseFormat;
  import com.google.genai.gaos.models.interactions.TextResponseFormatMimeType;
  import com.google.genai.gaos.models.interactions.ThinkingLevel;
  import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;
  import java.util.Arrays;
  import java.util.List;
  import java.util.Map;
  
  Client client = new Client();
  
  String prompt =
      "Give the segmentation masks for the wooden and glass items.\n"
          + "Output a JSON list of segmentation masks where each entry contains the 2D\n"
          + "bounding box in the key \"box_2d\", the segmentation mask in key \"mask\", and\n"
          + "the text label in the key \"label\". Use descriptive labels.";
  
  Map<String, Object> boundingBoxSchema =
      Map.of(
          "type", "object",
          "properties",
              Map.of(
                  "box_2d",
                      Map.of(
                          "type", "array",
                          "items", Map.of("type", "integer"),
                          "description",
                              "The 2D bounding box of the item as [ymin, xmin, ymax, xmax] normalized to 0-1000."),
                  "mask",
                      Map.of(
                          "type", "array",
                          "items", Map.of("type", "array", "items", Map.of("type", "integer")),
                          "description",
                              "The segmentation mask of the item as a polygon of [x,y] coordinates, normalized to 0-1000."),
                  "label",
                      Map.of("type", "string", "description", "A descriptive label for the item.")),
          "required", List.of("box_2d", "mask", "label"));
  
  Map<String, Object> boundingBoxesSchema =
      Map.of(
          "type", "object",
          "properties", Map.of("boxes", Map.of("type", "array", "items", boundingBoxSchema)),
          "required", List.of("boxes"));
  
  CreateModelInteractionResponseFormat format =
      CreateModelInteractionResponseFormat.of(
          ResponseFormat.of(
              TextResponseFormat.builder()
                  .mimeType(TextResponseFormatMimeType.APPLICATION_JSON)
                  .schema(boundingBoxesSchema)
                  .build()));
  
  Content textContent = TextContent.builder().text(prompt).build();
  Content imageContent =
      ImageContent.builder()
          .uri("https://example.com/image.png")
          .mimeType(ImageContentMimeType.IMAGE_PNG)
          .build();
  
  CreateModelInteraction params =
      CreateModelInteraction.builder()
          .model(Model.of("gemini-4-hydrogen"))
          .input(InteractionsInput.ofContent(Arrays.asList(textContent, imageContent)))
          .responseFormat(format)
          .generationConfig(GenerationConfig.builder().thinkingLevel(ThinkingLevel.HIGH).build())
          .build();
  
  Interaction interaction =
      client.interactions.create(CreateInteractionRequestBody.of(params)).interaction().get();
  System.out.println("Segmentation results: " + interaction.outputText().orElse(""));
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
  
      prompt := "Give the segmentation masks for the wooden and glass items.\n" +
          "Output a JSON list of segmentation masks where each entry contains the 2D\n" +
          "bounding box in the key \"box_2d\", the segmentation mask in key \"mask\", and\n" +
          "the text label in the key \"label\". Use descriptive labels."
  
      boundingBoxSchema := map[string]any{
          "type": "object",
          "properties": map[string]any{
              "box_2d": map[string]any{
                  "type":        "array",
                  "items":       map[string]any{"type": "integer"},
                  "description": "The 2D bounding box of the item as [ymin, xmin, ymax, xmax] normalized to 0-1000.",
              },
              "mask": map[string]any{
                  "type":        "array",
                  "items":       map[string]any{"type": "array", "items": map[string]any{"type": "integer"}},
                  "description": "The segmentation mask of the item as a polygon of [x,y] coordinates, normalized to 0-1000.",
              },
              "label": map[string]any{
                  "type":        "string",
                  "description": "A descriptive label for the item.",
              },
          },
          "required": []string{"box_2d", "mask", "label"},
      }
  
      boundingBoxesSchema := map[string]any{
          "type": "object",
          "properties": map[string]any{
              "boxes": map[string]any{
                  "type":  "array",
                  "items": boundingBoxSchema,
              },
          },
          "required": []string{"boxes"},
      }
  
      format := interactions.NewCreateModelInteractionResponseFormat(
          interactions.NewResponseFormat(interactions.TextResponseFormat{
              MimeType: interactions.TextResponseFormatMimeTypeApplicationJSON.ToPointer(),
              Schema:   boundingBoxesSchema,
          }),
      )
  
      res, err := client.Interactions.Create(ctx, operations.CreateInteractionRequest{
          Body: operations.NewCreateInteractionRequestBody(interactions.CreateModelInteraction{
              Model: interactions.Model("gemini-4-hydrogen"),
              Input: interactions.NewInteractionsInput([]interactions.Content{
                  interactions.NewContent(interactions.TextContent{
                      Text: prompt,
                  }),
                  interactions.NewContent(interactions.ImageContent{
                      URI:      genai.Ptr("https://example.com/image.png"),
                      MimeType: interactions.ImageContentMimeTypeImagePng.ToPointer(),
                  }),
              }),
              ResponseFormat: genai.Ptr(format),
              GenerationConfig: &interactions.GenerationConfig{
                  ThinkingLevel: interactions.ThinkingLevelHigh.ToPointer(),
              },
          }),
      })
      if err != nil {
          log.Fatal(err)
      }
      if res.Interaction.OutputText != nil {
          fmt.Println("Segmentation results: " + *res.Interaction.OutputText)
      }
  }
  ```

  {% /tab %}

  {% tab label="REST" %}
  ```bash
  curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H 'Content-Type: application/json' \
    -H "Api-Revision: 2026-05-20" \
    -d '{
      "model": "gemini-4-hydrogen",
      "input": [
        {"type": "text", "text": "Give the segmentation masks for the wooden and glass items.\nOutput a JSON list of segmentation masks where each entry contains the 2D\nbounding box in the key \"box_2d\", the segmentation mask in key \"mask\", and\nthe text label in the key \"label\". Use descriptive labels."},
        {
          "type": "image",
          "uri": "https://example.com/image.png",
          "mime_type": "image/png"
        }
      ],
      "response_format": {
        "type": "text",
        "mime_type": "application/json",
        "schema": {
          "type": "object",
          "properties": {
            "boxes": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "box_2d": { "type": "array", "items": { "type": "integer" } },
                  "mask": { "type": "array", "items": { "type": "array", "items": { "type": "integer" } } },
                  "label": { "type": "string" }
                },
                "required": ["box_2d", "mask", "label"]
              }
            }
          },
          "required": ["boxes"]
        }
      },
      "generation_config": {
        "thinking_level": "high"
      }
    }'
  ```

  {% /tab %}

{% /tabs %}

![A table with cupcakes, with the wooden and glass objects highlighted](https://www.gstatic.com/cloud-cms/86b50800e5bf459eeb2a91d96a5ed82a.jpg)## Supported image formats  {% id="supported-formats" %}

Gemini supports the following image format MIME types:

* PNG - `image/png`
* JPEG - `image/jpeg`
* WEBP - `image/webp`
* HEIC - `image/heic`
* HEIF - `image/heif`

To learn about other file input methods, see the
[File input methods](/docs/file-input-methods) guide.

## Capabilities  {% id="capabilities" %}

All Gemini model versions are multimodal and can be utilized in a wide range
of image processing and computer vision tasks including but not limited to
image captioning, visual question and answering, image classification,
object detection and segmentation.

Gemini can reduce the need to use specialized ML models depending on your
quality and performance requirements.

The latest model versions are specifically trained improve accuracy of
specialized tasks in addition to generic capabilities, like enhanced
[object detection](/docs/image-understanding#object-detection) and [segmentation](/docs/image-understanding#segmentation).

## Limitations and key technical information  {% id="technical-details-image" %}

### File limit  {% id="file-limit" %}

Gemini models support a maximum of 3,600 image files per request.

### Token calculation  {% id="token-calculation" %}

* 258 tokens if both dimensions <= 384 pixels.
  Larger images are tiled into 768x768 pixel tiles, each costing 258 tokens.

A rough formula for calculating the number of tiles is as follows:

* Calculate the crop unit size which is roughly: `floor(min(width, height)` / 1.5).
* Divide each dimension by the crop unit size and multiply together to get the
  number of tiles.

For example, for an image of dimensions 960x540 would have a crop unit size
of 360. Divide each dimension by 360 and the number of tile is 3 * 2 = 6.

### Media resolution  {% id="media-resolution" %}

Gemini 3 introduces granular control over multimodal vision processing with the
`media_resolution` parameter. The `media_resolution` parameter determines the
**maximum number of tokens allocated per input image or video frame.**
Higher resolutions improve the model's ability to
read fine text or identify small details, but increase token usage and latency.

## Tips and best practices  {% id="tips-best-practices" %}

* Verify that images are correctly rotated.
* Use clear, non-blurry images.
* When using a single image with text, place the text prompt *before* the image in the `input` array.

## What's next  {% id="whats-next" %}

This guide shows you how to upload image files and generate text outputs
from image inputs. To learn more, see the following resources:

*   [Files API](/docs/files): Learn more about uploading and managing files for use with Gemini.

*   [System instructions](/docs/text-generation#system-instructions):
  System instructions let you steer the behavior of the model based on your
  specific needs and use cases.

*   [File prompting strategies](/docs/files#prompt-guide): The
  Gemini API supports prompting with text, image, audio, and video data, also
  known as multimodal prompting.

*   [Safety guidance](/docs/safety-guidance): Sometimes generative
  AI models produce unexpected outputs, such as outputs that are inaccurate,
  biased, or offensive. Post-processing and human evaluation are essential to
  limit the risk of harm from such outputs.


