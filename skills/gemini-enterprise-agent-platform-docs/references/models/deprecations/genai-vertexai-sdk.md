## Key changes

The following namespaces in the Vertex AI SDK are in the deprecation phase. SDK releases after June 24, 2026 won't include these modules. Use the equivalent namespaces from the Google Gen AI SDK, which has full feature parity with the deprecated modules and packages.

| Vertex AI SDK | Impacted code | Google Gen AI SDK replacement |
| --- | --- | --- |
| `google-cloud-aiplatform` | Removed modules: - `vertexai.generative_models` - `vertexai.language_models` - `vertexai.vision_models` - `vertexai.caching` - `vertexai.tuning` | `google-genai` |
| `cloud.google.com/go/vertexai/genai` | Removed package: - `vertex.genai` | `google.golang.org/genai` |
| `@google-cloud/vertexai` | Removed modules: - `vertexai.generative_models` - `vertexai.chat_session` - `vertexai.functions` | `@google/genai` |
| `com.google.cloud:google-cloud-vertexai` | Removed package: - `com.google.cloud.vertexai.generativeai` | `com.google.genai:google-genai` |

## Code migration

Use the following sections to migrate specific code snippets from the
Vertex AI SDK to the Google Gen AI SDK.

> [!NOTE]
> Note: The examples may omit imports, dependencies, and other boilerplate code to improve readability.

### Installation

Replace the Vertex AI SDK dependency with the Google Gen AI SDK
dependency.

Before

### Python

pip install -U -q "google-cloud-aiplatform"

### Java

Gradle:

implementation 'com.google.cloud:google-cloud-vertexai:1.26.0'

maven:

com.google.cloud
google-cloud-vertexai

### JavaScript

npm install @google-cloud/vertexai

### Go

go get cloud.google.com/go/vertexai/genai

After

### Python

pip install -U -q "google-genai"

### Java

implementation 'com.google.genai:google-genai:1.17.0'

com.google.genai
google-genai

### JavaScript

npm install @google/genai

### Go

go get google.golang.org/genai

### Context caching

Context caching involves storing and reusing frequently used portions of model
prompts for similar requests. Replace the Vertex AI SDK implementation
with the Google Gen AI SDK

### Python

Imports

from google.cloud import aiplatform
import https://docs.cloud.google.com/python/docs/reference/vertexai/latest
import datetime

Create

vertexai.init(project=GOOGLE_CLOUD_PROJECT, location=GOOGLE_CLOUD_LOCATION)

cache_content = vertexai.caching.CachedContent.create(
model_name=MODEL_NAME,
system_instruction='Please answer my question formally',
contents=['user content'],
ttl=datetime.timedelta(days=1),
)

Get

cache_content = vertexai.caching.CachedContent.get(cached_content_name="projects/{project}/locations/{location}/cachedContents/{cached_content}")

Delete

cache_content.delete()

Update

cache_content.update(ttl=datetime.timedelta(days=2))

List

cache_contents = vertexai.caching.CachedContent.list()

### Java

Context caching is not supported by the Java Vertex AI SDK, but is
supported by the Google Gen AI SDK.

### JavaScript

Context caching is not supported by the JavaScript Vertex AI SDK, but
is supported by the Google Gen AI SDK.

### Go

package contextcaching

// [START generativeaionvertexai_gemini_create_context_cache]
import (
"context"
"fmt"
"io"
"time"

"cloud.google.com/go/vertexai/genai"

content := &genai.CachedContent{
Model: modelName,
SystemInstruction: &genai.Content{
Parts: []genai.Part{genai.Text(systemInstruction)},
},
Expiration: genai.ExpireTimeOrTTL{TTL: 60 * time.Minute},
Contents: []*genai.Content{
{
Role: "user",
Parts: []genai.Part{part1, part2},
}

result, err := client.CreateCachedContent(context, content)

cachedContent, err := client.GetCachedContent(context, contentName)

err = client.DeleteCachedContent(context, contentName)

newExpireTime := cc.Expiration.ExpireTime.Add(15 * time.Minute)
ccUpdated := client.UpdateCachedContent(context, cc, &genai.CachedContentToUpdate{
Expiration: &genai.ExpireTimeOrTTL{ExpireTime: newExpireTime},
})

iter, err := client.ListCachedContents(context, contentName)

### Python

from google import genai
from google.genai.types import Content, CreateCachedContentConfig, HttpOptions, Part

client = genai.Client(http_options=HttpOptions(api_version="v1"))

content_cache = client.caches.create(
model="gemini-2.5-flash",
config=CreateCachedContentConfig(
contents=contents,
system_instruction=system_instruction,
display_name="example-cache",
ttl="86400s",
),

content_cache_list = client.caches.list()

# Access individual properties of a ContentCache object(s)

for content_cache in content_cache_list:
print(f"Cache `{content_cache.name}` for model `{content_cache.model}`")
print(f"Last updated at: {content_cache.update_time}")
print(f"Expires at: {content_cache.expire_time}")

client.caches.delete(name=cache_name)

content_cache = client.caches.update(
name=cache_name, config=UpdateCachedContentConfig(ttl="36000s")

cache_contents = client.caches.list(config={'page_size': 2})

### Java

import com.google.genai.types.CachedContent;
import com.google.genai.types.Content;
import com.google.genai.types.CreateCachedContentConfig;
import com.google.genai.types.DeleteCachedContentResponse;
import com.google.genai.types.ListCachedContentsConfig;

Content content =
Content.fromParts(
fetchPdfPart(
"https://storage.googleapis.com/cloud-samples-data/generative-ai/pdf/2403.05530.pdf"));

CreateCachedContentConfig config =
CreateCachedContentConfig.builder()
.systemInstruction(Content.fromParts(Part.fromText("summarize the pdf")))
.expireTime(Instant.now().plus(Duration.ofHours(1)))
.contents(content)
.build();

CachedContent cachedContent1 = client.caches.create("gemini-2.5-flash", config);

CachedContent cachedContent2 = client.caches.get(cachedContent1.name().get(), null);
System.out.println("get cached content: " + cachedContent2);

DeleteCachedContentResponse unused = client.caches.delete(cachedContent1.name().get(), null);
System.out.println("Deleted cached content: " + cachedContent1.name().get());

CachedContent cachedContentUpdate =
client.caches.update(
cachedContent.name().get(),
UpdateCachedContentConfig.builder().ttl(Duration.ofMinutes(10)).build());
System.out.println("Update cached content: " + cachedContentUpdate);

System.out.println("List cached contents resrouce names: ");
for (CachedContent cachedContent :
client.caches.list(ListCachedContentsConfig.builder().pageSize(5).build())) {
System.out.println(cachedContent.name().get());

### JavaScript

const ai = new GoogleGenAI({
vertexai: true,
project: GOOGLE_CLOUD_PROJECT,
location: GOOGLE_CLOUD_LOCATION,
});

const cachedContent1: Part = {
fileData: {
fileUri: 'gs://cloud-samples-data/generative-ai/pdf/2403.05530.pdf',
mimeType: 'application/pdf',
};

const cachedContent2: Part = {
fileUri: 'gs://cloud-samples-data/generative-ai/pdf/2312.11805v3.pdf',

const cache = await ai.caches.create({
model: 'gemini-1.5-pro-002',
config: {contents: [cachedContent1, cachedContent2]},

const getResponse = await ai.caches.get({name: cacheName});

await ai.caches.delete({name: cacheName});

const updateResponse = await ai.caches.update({
name: cacheName,
config: {ttl: '86400s'},

const listResponse = await ai.caches.list();
let i = 1;
for await (const cachedContent of listResponse) {
console.debug(`List response ${i++}: `, JSON.stringify(cachedContent));

### Go

"encoding/json"

genai "google.golang.org/genai"

cacheContents := []*genai.Content{
Parts: []*genai.Part{
{FileData: &genai.FileData{
FileURI: "gs://cloud-samples-data/generative-ai/pdf/2312.11805v3.pdf",
MIMEType: "application/pdf",
}},
FileURI: "gs://cloud-samples-data/generative-ai/pdf/2403.05530.pdf",
config := &genai.CreateCachedContentConfig{
Contents: cacheContents,
{Text: systemInstruction},
DisplayName: "example-cache",
TTL: "86400s",

res, err := client.Caches.Create(ctx, modelName, config)

cachedContent, err := client.GetCachedContent(ctx, contentName)

_, err = client.Caches.Delete(ctx, result.Name, &genai.DeleteCachedContentConfig{})

result, err = client.Caches.Update(ctx, result.Name, &genai.UpdateCachedContentConfig{
ExpireTime: time.Now().Add(time.Hour),

// List the first page.
page, err := client.Caches.List(ctx, &genai.ListCachedContentsConfig{PageSize: 2})

// Continue to the next page.
page, err = page.Next(ctx)

// Resume the page iteration using the next page token.
page, err = client.Caches.List(ctx, &genai.ListCachedContentsConfig{PageSize: 2, PageToken: page.NextPageToken})

### Configuration and system instructions

Configuration defines parameters that control model behavior, and system
instructions provide guiding directives to steer model responses towards a
specific persona, style, or task. Replace the configuration and system
instructions from the Vertex AI SDK
with the following code that uses the Google Gen AI SDK.

### Python

model = generative_models.GenerativeModel(
GEMINI_MODEL_NAME,
system_instruction=[
"Talk like a pirate.",
"Don't use rude words.",
],
response = model.generate_content(
contents="Why is sky blue?",
generation_config=generative_models.GenerationConfig(
temperature=0,
top_p=0.95,
top_k=20,
candidate_count=1,
max_output_tokens=100,
stop_sequences=["STOP!"],
response_logprobs=True,
logprobs=3,
safety_settings={
generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_ONLY_HIGH,
generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_NONE,

### Java

import com.google.cloud.vertexai.api.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerationConfig.html;

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerationConfig.html generationConfig =
https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerationConfig.html.newBuilder().https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerationConfig.Builder.html#com_google_cloud_vertexai_api_GenerationConfig_Builder_setMaxOutputTokens_int_(50).build();

// Use the builder to instantialize the model with the configuration.
GenerativeModel model =
new GenerativeModel.Builder()
.setModelName("gemino-pro")
.setVertexAi(vertexAi)
.setGenerationConfig(generationConfig)

### JavaScript

const {VertexAI} = require('https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/overview.html');

const generativeModel = vertexAI.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({
model: 'gemini-2.5-flash',
systemInstruction: {
parts: [
{text: 'You are a helpful language translator.'},
{text: 'Your mission is to translate text in English to French.'},

const textPart = {
text: ` User input: I like bagels. Answer:`,

const request = {
contents: [{role: 'user', parts: [textPart]}],

const resp = await generativeModel.generateContent(request);
const contentResponse = await resp.response;
console.log(JSON.stringify(contentResponse));

### Go

model := client.GenerativeModel(modelName)

model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerationConfig = genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerationConfig{
TopP: proto.Float32(1),
TopK: proto.Int32(32),
Temperature: proto.Float32(0.4),
MaxOutputTokens: proto.Int32(2048),

systemInstruction := fmt.Sprintf("Your mission is to translate text from %xs to %s", sourceLanguageCode, targetLanguageCode)

model.SystemInstruction = &genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Content{
Parts: []genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Part{genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Text(systemInstruction)},

### Python

from google.genai import types

response = client.models.generate_content(
model='gemini-2.5-flash',
contents='high',
config=types.GenerateContentConfig(
system_instruction='I say high, you say low',
max_output_tokens=3,
temperature=0.3,

### Java

Import `GenerateContentConfig`:

import com.google.genai.types.GenerateContentConfig;

Create the system instruction:

Content systemInstruction = Content.fromParts(Part.fromText("You are a history teacher."));

Add the system instructions to the content config:

GenerateContentConfig config =
GenerateContentConfig.builder()
...
.systemInstruction(systemInstruction)

For the full implementation, see
GenerateContentWithConfigs.java.

### JavaScript

const response = await ai.models.generateContent({
contents: 'high',
config: {systemInstruction: 'I say high you say low.'},
console.debug(response.text);

await generateContentFromVertexAI().catch((e) =>
console.error('got error', e),
);

### Go

config := &genai.GenerateContentConfig{
{Text: "You're a language translator. Your mission is to translate text in English to French."},

resp, err := client.Models.GenerateContent(ctx, modelName, contents, config)

### Embeddings

Embeddings are numerical vector representations of text, images, or video that
capture their semantic or visual meaning and relationships in a high-dimensional
space. Replace the embedding implementation from the Vertex AI SDK with
the following code that uses the Google Gen AI SDK.

### Python

from vertexai.language_models import TextEmbeddingInput, TextEmbeddingModel

model = TextEmbeddingModel.from_pretrained("gemini-embedding-001")
text_input = TextEmbeddingInput(
task_type="RETRIEVAL_DOCUMENT", # Optional
title="Driver's License", # Optional
text="How do I get a driver's license/learner's permit?"
response = model.get_embeddings(
[text_input], output_dimensionality=3072

### Java

Embeddings are not supported by the Java Vertex AI SDK, but are

### JavaScript

Embeddings are not supported by the JavaScript Vertex AI SDK, but are

### Go

Embeddings are not supported by the Go Vertex AI SDK, but are

### Python

from google.genai.types import EmbedContentConfig

client = genai.Client()
response = client.models.embed_content(
model="gemini-embedding-001",
contents="How do I get a driver's license/learner's permit?",
config=EmbedContentConfig(
output_dimensionality=3072, # Optional

### Java

import com.google.genai.Client;
import com.google.genai.types.EmbedContentResponse;

EmbedContentResponse response =
client.models.embedContent("text-embedding-005", "why is the sky blue?", null);

### JavaScript

const response = await ai.models.embedContent({
model: 'text-embedding-005',
contents: 'Hello world!',

console.debug(JSON.stringify(response));

await embedContentFromVertexAI().catch((e) =>

### Go

"google.golang.org/genai"

result, err := client.Models.EmbedContent(ctx, *model, genai.Text("What is your name?"), &genai.EmbedContentConfig{TaskType: "RETRIEVAL_QUERY"})
fmt.Printf("%#v\n", result.Embeddings[0])

fmt.Println("Embed content RETRIEVAL_DOCUMENT task type example.")
result, err = client.Models.EmbedContent(ctx, *model, genai.Text("What is your name?"), &genai.EmbedContentConfig{TaskType: "RETRIEVAL_DOCUMENT"})

### Function calling

Function calling enables a model to identify when to invoke an external tool or
API and then generate structured data containing the necessary function and
arguments for execution. Replace the function calling implementation with the
Vertex AI SDK with the following code that uses the Google Gen AI SDK.

### Python

get_current_weather_func = generative_models.FunctionDeclaration(
name="get_current_weather",
description="Get the current weather in a given location",
parameters=_REQUEST_FUNCTION_PARAMETER_SCHEMA_STRUCT,

weather_tool = generative_models.Tool(
function_declarations=[get_current_weather_func],

tools=[weather_tool],

chat = model.start_chat()

response1 = chat.send_message("What is the weather like in Boston?")
assert (
response1.candidates[0].content.parts[0].function_call.name
== "get_current_weather"
response2 = chat.send_message(
generative_models.Part.from_function_response(
response={
"content": {"weather": "super nice"},
assert response2.text

### Java

Tool tool =
Tool.newBuilder()
.addFunctionDeclarations(
FunctionDeclarationMaker.fromJsonString(jsonString)

// Start a chat session from a model, with the use of the declared
// function.
.setModelName(MODEL_NAME)
.setTools(Arrays.asList(tool))
ChatSession chat = model.startChat();

System.out.println(String.format("Ask the question: %s", TEXT));
GenerateContentResponse response = chat.sendMessage(TEXT);

// Provide an answer to the model so that it knows what the result of a
// "function call" is.
ContentMaker.fromMultiModalData(
PartMaker.fromFunctionResponse(
"getCurrentWeather", Collections.singletonMap("currentWeather", "snowing")));
response = chat.sendMessage(content);

### JavaScript

const {
VertexAI,
FunctionDeclarationSchemaType,
} = require('https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/overview.html');

const functionDeclarations = [
function_declarations: [
name: 'get_current_weather',
description: 'get weather in a given location',
parameters: {
type: https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/overview.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/schematype.html,
properties: {
location: {type: https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/overview.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/schematype.html},
unit: {
type: https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/overview.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/schematype.html,
enum: ['celsius', 'fahrenheit'],
required: ['location'],
];

async function functionCallingBasic(
projectId = 'PROJECT_ID',
location = 'us-central1',
model = 'gemini-2.5-flash'
) {
// Initialize Vertex with your Cloud project and location
const vertexAI = new https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({project: projectId, location: location});

// Instantiate the model
const generativeModel = vertexAI.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({
model: model,

contents: [
{role: 'user', parts: [{text: 'What is the weather in Boston?'}]},
tools: functionDeclarations,
const result = await generativeModel.generateContent(request);
console.log(JSON.stringify(result.response.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/generatecontentresponse.html[0].https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/generatecontentcandidate.html));

### Go

package functioncalling

"errors"

funcName := "getCurrentWeather"
funcDecl := &genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_FunctionDeclaration{
Name: funcName,
Description: "Get the current weather in a given location",
Parameters: &genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Schema{
Type: genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_TypeUnspecified_TypeString_TypeNumber_TypeInteger_TypeBoolean_TypeArray_TypeObject,
Properties: map[string]*genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Schema{
"location": {
Type: genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_TypeUnspecified_TypeString_TypeNumber_TypeInteger_TypeBoolean_TypeArray_TypeObject,
Description: "location",
Required: []string{"location"},

// Add the weather function to our model toolbox.
model.Tools = []*genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Tool{
FunctionDeclarations: []*genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_FunctionDeclaration{funcDecl},

prompt := genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Text("What's the weather like in Boston?")
resp, err := model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerativeModel_GenerateContent(ctx, prompt)

if len(resp.Candidates) == 0 {
return errors.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai/tokenizer.html#cloud_google_com_go_vertexai_genai_tokenizer_Tokenizer_New("got empty response from model")
} else if len(resp.Candidates[0].https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Candidate_FunctionCalls()) == 0 {
return errors.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai/tokenizer.html#cloud_google_com_go_vertexai_genai_tokenizer_Tokenizer_New("got no function call suggestions from model")

funcResp := &genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_FunctionResponse{
Response: map[string]any{
"content": mockAPIResp,

// Return the API response to the model allowing it to complete its response.
resp, err = model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerativeModel_GenerateContent(ctx, prompt, funcResp)
if err != nil {
return fmt.Errorf("failed to generate content: %w", err)
if len(resp.Candidates) == 0 || len(resp.Candidates[0].https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Content.Parts) == 0 {
return errors.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai/tokenizer.html#cloud_google_com_go_vertexai_genai_tokenizer_Tokenizer_New("got empty response from model")

### Python

def get_current_weather(location: str) -> str:
"""Returns the current weather.

Args:
location: The city and state, e.g. San Francisco, CA
"""
return 'sunny'

contents='What is the weather like in Boston?',
config=types.GenerateContentConfig(tools=[get_current_weather]),

### Java

Use either the `Chat` or `GenerateContent` methods to implement function
calling.

Using `Chat`

Declare the methods that will become callable functions:

Method method1 =
ChatWithFunctionCall.class.getDeclaredMethod("getCurrentWeather", String.class);
Method method2 =
ChatWithFunctionCall.class.getDeclaredMethod("divideTwoIntegers", int.class, int.class);

Add the two methods as callable functions to the tool within the content
config:

GenerateContentConfig.builder().tools(Tool.builder().functions(method1, method2)).build();

Create a chat session with the config:

Chat chatSession = client.chats.create("gemini-2.5-flash", config);

GenerateContentResponse response1 =
chatSession.sendMessage("what is the weather in San Francisco?");

ChatWithFunctionCall.java.

Using `GenerateContent`

GenerateContentWithFunctionCall.class.getMethod(
"getCurrentWeather", String.class, String.class);
"divideTwoIntegers", Integer.class, Integer.class);

GenerateContentConfig.builder().tools(Tool.builder().functions(method1, method2)).build();

Use `generateContent` with the config:

GenerateContentResponse response =
client.models.generateContent(
"gemini-2.5-flash",
"What is the weather in Vancouver? And can you divide 10 by 0?",
config);

GenerateContentWithFunctionCall.java.

### JavaScript

import {
FunctionCall,
FunctionCallingConfigMode,
FunctionDeclaration,
GoogleGenAI,
Type,
} from '@google/genai';

const controlLightFunctionDeclaration: FunctionDeclaration = {
name: 'controlLight',
type: Type.OBJECT,
description: 'Set the brightness and color temperature of a room light.',
brightness: {
type: Type.NUMBER,
description:
'Light level from 0 to 100. Zero is off and 100 is full brightness.',
colorTemperature: {
type: Type.STRING,
'Color temperature of the light fixture which can be `daylight`, `cool` or `warm`.',
required: ['brightness', 'colorTemperature'],
contents: 'Dim the lights so the room feels cozy and warm.',
config: {
tools: [{functionDeclarations: [controlLightFunctionDeclaration]}],
toolConfig: {
functionCallingConfig: {
mode: FunctionCallingConfigMode.ANY,
allowedFunctionNames: ['controlLight'],

console.debug(response.functionCalls);

### Go

package main

"flag"
"log"

var model = flag.String("model", "gemini-2.5-flash", "the model name, e.g. gemini-2.5-flash")

func run(ctx context.Context) {
client, err := genai.NewClient(ctx, nil)
log.Fatal(err)

funcDecl := &genai.FunctionDeclaration{
Parameters: &genai.Schema{
Type: genai.TypeObject,
Properties: map[string]*genai.Schema{
Type: genai.TypeString,
var config *genai.GenerateContentConfig = &genai.GenerateContentConfig{
Tools: []*genai.Tool{
FunctionDeclarations: []*genai.FunctionDeclaration{funcDecl},
// Call the GenerateContent method.
result, err := client.Models.GenerateContent(ctx, *model, genai.Text("What's the weather like in Boston?"), config)
fmt.Println(result.Candidates[0].Content.Parts[0].FunctionCall.Name)

// Use synthetic data to simulate a response from the external API.
// In a real application, this would come from an actual weather API.
mockAPIResp, err := json.Marshal(map[string]string{
"location": "Boston",
"temperature": "38",
"temperature_unit": "F",
"description": "Cold and cloudy",
"humidity": "65",
"wind": `{"speed": "10", "direction": "NW"}`,

funcResp := &genai.FunctionResponse{

mockedFunctionResponse := []*genai.Content{
&genai.Content{
&genai.Part{Text: "What's the weather like in Boston?"},
result.Candidates[0].Content,
Role: "tool",
&genai.Part{FunctionResponse: funcResp},
result, err = client.Models.GenerateContent(ctx, *model, mockedFunctionResponse, config)
fmt.Println(result.Text())

func main() {
ctx := context.Background()
flag.Parse()
run(ctx)

### Grounding

Grounding is the process of providing a model with external, domain-specific
information to improve response accuracy, relevance, and consistency. Replace
the grounding implementation with the Vertex AI SDK with the following
code that uses the Google Gen AI SDK.

### Python

model = generative_models.GenerativeModel(GEMINI_MODEL_NAME)
google_search_retriever_tool = (
generative_models.Tool.from_google_search_retrieval(
generative_models.grounding.GoogleSearchRetrieval()
"Why is sky blue?",
tools=[google_search_retriever_tool],
generation_config=generative_models.GenerationConfig(temperature=0),

### Java

import com.google.cloud.vertexai.api.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GroundingMetadata.html;

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Tool.html googleSearchTool =
https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Tool.html.newBuilder()
.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Tool.Builder.html#com_google_cloud_vertexai_api_Tool_Builder_setGoogleSearch_com_google_cloud_vertexai_api_Tool_GoogleSearch_(https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Tool.GoogleSearch.html.newBuilder())

new GenerativeModel(modelName, vertexAI)
.withTools(Collections.singletonList(googleSearchTool));

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html response = model.generateContent("Why is the sky blue?");

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GroundingMetadata.html groundingMetadata = response.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html#com_google_cloud_vertexai_api_GenerateContentResponse_getCandidates_int_(0).getGroundingMetadata();
String answer = ResponseHandler.getText(response);

### JavaScript

const {VertexAI} = require('https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/overview.html');

const vertexAI = new https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({project: projectId, location: location});

const generativeModelPreview = vertexAI.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({
generationConfig: {maxOutputTokens: 256},

const googleSearchTool = {
googleSearch: {},

contents: [{role: 'user', parts: [{text: 'Why is the sky blue?'}]}],
tools: [googleSearchTool],

const result = await generativeModelPreview.generateContent(request);
const response = await result.response;
const groundingMetadata = response.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/generatecontentresponse.html[0].https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/generatecontentcandidate.html;
console.log(
'Response: ',
JSON.stringify(response.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/generatecontentresponse.html[0].https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/generatecontentcandidate.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/content.html[0].text)
console.log('GroundingMetadata is: ', JSON.stringify(groundingMetadata));

### Go

Grounding is not supported by the Go Vertex AI SDK, but is supported
by the Google Gen AI SDK.

### Python

from google.genai import Client

client = Client(
vertexai=True,
project=GOOGLE_CLOUD_PROJECT,
location=GOOGLE_CLOUD_LOCATION

model='gemini-2.5-flash-exp',
contents='Why is the sky blue?',
tools=[types.Tool(google_search=types.GoogleSearch())]),

### Java

Import the `Tool` module:

import com.google.genai.types.Tool;

Set the Google Search tool in the config:

Tool googleSearchTool = Tool.builder().googleSearch(GoogleSearch.builder()).build();

Add the tool to the content config:

.tools(googleSearchTool)

### JavaScript

contents:
'What is the sum of the first 50 prime numbers? Generate and run code for the calculation, and make sure you get all 50.',
tools: [{googleSearch: {}}],
console.debug(JSON.stringify(response?.candidates?.[0]?.groundingMetadata));

### Go

var model = flag.String("model", "gemini-2.5-flash", "the model name, e.g. gemini-2.5-flash")

// Add the Google Search grounding tool to the GenerateContentConfig.
GoogleSearch: &genai.GoogleSearch{},
result, err := client.Models.GenerateContent(ctx, *model, genai.Text("Why is the sky blue?"), config)

### Safety settings

Safety settings are configurable parameters that allow users to manage model
responses by filtering or blocking content related to specific harmful
categories, such as hate speech, sexual content, or violence. Replace the safety
settings implementation with the Vertex AI SDK with the following code
that uses the Google Gen AI SDK.

### Python

generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_ONLY_HIGH,
generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_NONE,

### Java

import com.google.cloud.vertexai.api.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.SafetySetting.html;
import com.google.cloud.vertexai.api.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.SafetySetting.html.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.SafetySetting.HarmBlockThreshold.html;

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.SafetySetting.html safetySetting =
https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.SafetySetting.html.newBuilder()
.setCategory(https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.HarmCategory.html.HARM_CATEGORY_DANGEROUS_CONTENT)
.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.SafetySetting.Builder.html#com_google_cloud_vertexai_api_SafetySetting_Builder_setThreshold_com_google_cloud_vertexai_api_SafetySetting_HarmBlockThreshold_(https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.SafetySetting.HarmBlockThreshold.html.BLOCK_LOW_AND_ABOVE)

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html response =
model
.withSafetySetting(Arrays.asList(SafetySetting))
.generateContent("Please explain LLM?");

### JavaScript

HarmCategory,
HarmBlockThreshold,
} = require('https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/overview.html');

const vertexAI = new https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({project: PROJECT_ID, location: LOCATION});

const generativeModel = vertexAI.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({
safetySettings: [
category: https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/harmcategory.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/harmcategory.html,
threshold: https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/harmblockthreshold.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/harmblockthreshold.html,
category: https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/harmcategory.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/harmcategory.html,
threshold: https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/harmblockthreshold.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/harmblockthreshold.html,

contents: [{role: 'user', parts: [{text: 'Tell me something dangerous.'}]}],

console.log('Prompt:');
console.log(request.contents[0].https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/content.html[0].text);
console.log('Streaming Response Text:');

// Create the response stream
const responseStream = await generativeModel.generateContentStream(request);

// Log the text response as it streams
for await (const item of responseStream.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/streamgeneratecontentresult.html) {
if (item.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/generatecontentresponse.html[0].https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/generatecontentcandidate.html === 'SAFETY') {
console.log('This response stream terminated due to safety concerns.');
break;
} else {
process.stdout.write(item.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/generatecontentresponse.html[0].https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/generatecontentcandidate.html.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/content.html[0].text);

### Go

package safetysettings

// generateContent generates text from prompt and configurations provided.
func generateContent(w io.Writer, projectID, location, modelName string) error {
// location := "us-central1"
// model := "gemini-2.5-flash"

client, err := genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Client_NewClient(ctx, projectID, location)
return err
defer client.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Client_Close()

model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerationConfig_SetTemperature(0.8)

// configure the safety settings thresholds
model.SafetySettings = []*genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_SafetySetting{
Category: genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_HarmCategoryUnspecified_HarmCategoryHateSpeech_HarmCategoryDangerousContent_HarmCategoryHarassment_HarmCategorySexuallyExplicit_HarmCategoryCivicIntegrity,
Threshold: genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_HarmBlockUnspecified_HarmBlockLowAndAbove_HarmBlockMediumAndAbove_HarmBlockOnlyHigh_HarmBlockNone_HarmBlockSafetysettingOff,
Category: genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_HarmCategoryUnspecified_HarmCategoryHateSpeech_HarmCategoryDangerousContent_HarmCategoryHarassment_HarmCategorySexuallyExplicit_HarmCategoryCivicIntegrity,
Threshold: genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_HarmBlockUnspecified_HarmBlockLowAndAbove_HarmBlockMediumAndAbove_HarmBlockOnlyHigh_HarmBlockNone_HarmBlockSafetysettingOff,

res, err := model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerativeModel_GenerateContent(ctx, genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Text("Hello, say something mean to me."))
return fmt.Errorf("unable to generate content: %v", err)
fmt.Fprintf(w, "generate-content response: %v\n", res.Candidates[0].https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Content.Parts[0])

fmt.Fprintf(w, "safety ratings:\n")
for _, r := range res.Candidates[0].SafetyRatings {
fmt.Fprintf(w, "\t%+v\n", r)

return nil

### Python

contents='Say something bad.',
safety_settings=[
types.SafetySetting(
category='HARM_CATEGORY_HATE_SPEECH',
threshold='BLOCK_ONLY_HIGH',
]

### Java

Import the `HarmBlockThreshold`, `HarmCategory`, and `SafetySetting`
modules:

import com.google.genai.types.HarmBlockThreshold;
import com.google.genai.types.HarmCategory;
import com.google.genai.types.SafetySetting;

Set the safety settings in the config:

ImmutableList safetySettings =
ImmutableList.of(
SafetySetting.builder()
.category(HarmCategory.Known.HARM_CATEGORY_HATE_SPEECH)
.threshold(HarmBlockThreshold.Known.BLOCK_ONLY_HIGH)
.build(),
.category(HarmCategory.Known.HARM_CATEGORY_DANGEROUS_CONTENT)
.threshold(HarmBlockThreshold.Known.BLOCK_LOW_AND_ABOVE)
.build());

Add the safety settings to the content config:

.safetySettings(safetySettings)

### JavaScript

HarmBlockMethod,

contents: 'say something bad',
method: HarmBlockMethod.SEVERITY,
category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
category: HarmCategory.HARM_CATEGORY_HARASSMENT,

console.debug(JSON.stringify(response?.candidates?.[0]?.safetyRatings));

### Go

var model = flag.String("model", "gemini-2.5-flash", "the model name, e.g. gemini-2.5-flash")

var safetySettings []*genai.SafetySetting = []*genai.SafetySetting{
Category: genai.HarmCategoryHarassment,
Threshold: genai.HarmBlockThresholdBlockMediumAndAbove,
Category: genai.HarmCategoryDangerousContent,
SafetySettings: safetySettings,
result, err := client.Models.GenerateContent(ctx, *model, genai.Text("What is your name?"), config)

### Chat sessions

Chat sessions are conversational interactions where the model maintains context
over multiple turns by recalling previous messages and using them to inform
current responses. Replace the implementation from the Vertex AI SDK with

### Python

model = GenerativeModel(

# You can specify tools when creating a model to avoid having to send them with every request.

tool_config=tool_config,
print(chat.send_message("What is the weather like in Boston?"))
print(chat.send_message(
Part.from_function_response(
"content": {"weather_there": "super nice"},
))

### Java

import com.google.cloud.vertexai.generativeai.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.ChatSession.html;

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html model = new https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html("gemini-2.5-flash", vertexAi);
https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.ChatSession.html chat = model.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html#com_google_cloud_vertexai_generativeai_GenerativeModel_startChat__();

ResponseStream response = chat
.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.ChatSession.html#com_google_cloud_vertexai_generativeai_ChatSession_sendMessageStream_com_google_cloud_vertexai_api_Content_("Can you tell me a story about cheese in 100 words?");
ResponseStream anotherResponse = chat
.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.ChatSession.html#com_google_cloud_vertexai_generativeai_ChatSession_sendMessageStream_com_google_cloud_vertexai_api_Content_("Can you modify the story to be written for a 5 year old?");

### JavaScript

const {VertexAI} = require('https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/overview.html');

const chat = generativeModel.startChat({});

const result1 = await chat.sendMessage('Hello');
const response1 = await result1.response;
console.log('Chat response 1: ', JSON.stringify(response1));

const result2 = await chat.sendMessage(
'Can you tell me a scientific fun fact?'
const response2 = await result2.response;
console.log('Chat response 2: ', JSON.stringify(response2));

### Go

prompt := "Do you have the Pixel 8 Pro in stock?"
fmt.Fprintf(w, "Question: %s\n", prompt)
resp, err := chat.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_ChatSession_SendMessage(ctx, genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Text(prompt))

### Python

Synchronous

chat = client.chats.create(model='gemini-2.5-flash')
response = chat.send_message('tell me a story')
print(response.text)
response = chat.send_message('summarize the story you told me in 1 sentence')

Asynchronous

chat = client.aio.chats.create(model='gemini-2.5-flash')
response = await chat.send_message('tell me a story')

Synchronous streaming

for chunk in chat.send_message_stream('tell me a story'):
print(chunk.text, end='')

Asynchronous streaming

async for chunk in await chat.send_message_stream('tell me a story'):
print(chunk.text, end='') # end='' is optional, for demo purposes.

### Java

Import the `Chat` and `GenerateContentResponse` modules:

import com.google.genai.Chat;
import com.google.genai.types.GenerateContentResponse;

Create a chat session:

Chat chatSession = client.chats.create("gemini-2.5-flash");

Use `GenerateContentResponse` to provide prompts:

chatSession
.sendMessage("Can you tell me a story about cheese in 100 words?");
// Gets the text string from the response by the quick accessor method `text()`.
System.out.println("Unary response: " + response.text());

GenerateContentResponse response2 =
.sendMessage("Can you modify the story to be written for a 5 year old?");
// Gets the text string from the second response.
System.out.println("Unary response: " + response2.text());

ChatWithHistory.java.

### JavaScript

const chat = ai.chats.create({model: 'gemini-2.5-flash'});

const response = await chat.sendMessage({message: 'Why is the sky blue?'});
console.debug('chat response 1: ', response.text);
const response2 = await chat.sendMessage({message: 'Why is the sunset red?'});
console.debug('chat response 2: ', response2.text);

const history = chat.getHistory();
for (const content of history) {
console.debug('chat history: ', JSON.stringify(content, null, 2));

### Go

var model = flag.String("model", "gemini-2.5-flash", "the model name, e.g. gemini-2.5-flash")

var config *genai.GenerateContentConfig = &genai.GenerateContentConfig{Temperature: genai.Ptr float32}

// Create a new Chat.
chat, err := client.Chats.Create(ctx, *model, config, nil)

// Send first chat message.
result, err := chat.SendMessage(ctx, genai.Part{Text: "What's the weather in San Francisco?"})

// Send second chat message.
result, err = chat.SendMessage(ctx, genai.Part{Text: "How about New York?"})

### Multimodal inputs

Multimodal inputs refers to the ability of a model to process and understand
information from data types beyond text, such as images, audio, and video.
Replace the implementation with the Vertex AI SDK with the following code

### Python

from vertexai.generative_models import GenerativeModel, Image
vision_model = GenerativeModel("gemini-2.5-flash-vision")

# Local image

image = Image.load_from_file("image.jpg")
print(vision_model.generate_content(["What is shown in this image?", image]))

# Image from Cloud Storage

image_part = generative_models.Part.from_uri("gs://download.tensorflow.org/example_images/320px-Felis_catus-cat_on_snow.jpg", mime_type="image/jpeg")
print(vision_model.generate_content([image_part, "Describe this image?"]))

# Text and video

video_part = Part.from_uri("gs://cloud-samples-data/video/animals.mp4", mime_type="video/mp4")
print(vision_model.generate_content(["What is in the video? ", video_part]))

### Java

import com.google.cloud.vertexai.generativeai.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.ContentMaker.html;

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html model = new https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html("gemini-2.5-flash-vision", vertexAi);

ResponseStream stream =
model.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html#com_google_cloud_vertexai_generativeai_GenerativeModel_generateContentStream_com_google_cloud_vertexai_api_Content_(https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.ContentMaker.html.fromMultiModalData(
"Please describe this image",
https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.PartMaker.html.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.PartMaker.html#com_google_cloud_vertexai_generativeai_PartMaker_fromMimeTypeAndData_java_lang_String_java_lang_Object_("image/jpeg", IMAGE_URI)
));

### JavaScript

const {VertexAI, HarmBlockThreshold, HarmCategory} = require('https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/overview.html');

const vertex_ai = new https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({project: project, location: location});

const generativeVisionModel = vertex_ai.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({
model: 'gemini-ultra-vision',

async function multiPartContent() {
const filePart = {file_data: {file_uri: "gs://sararob_imagegeneration_test/kitten.jpeg", mime_type: "image/jpeg"}};
const textPart = {text: 'What is this picture about?'};

contents: [{role: 'user', parts: [textPart, filePart]}],

const resp = await generativeVisionModel.generateContentStream(request);

multiPartContent();

### Go

Images

img := genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_FileData{
MIMEType: "image/jpeg",
FileURI: "gs://generativeai-downloads/images/scones.jpg",
prompt := genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Text("What is in this image?")

resp, err := gemini.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerativeModel_GenerateContent(ctx, img, prompt)
return fmt.Errorf("error generating content: %w", err)

Video

package multimodalvideoaudio

"mime"
"path/filepath"

part := genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_FileData{
MIMEType: mime.TypeByExtension(filepath.Ext("pixel8.mp4")),
FileURI: "gs://cloud-samples-data/generative-ai/video/pixel8.mp4",

res, err := model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerativeModel_GenerateContent(ctx, part, genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Text(`Provide a description of the video. The description should also contain anything important which people say in the video.`))

### Python

from google.genai.types import HttpOptions, Part

# Local image

with open("image.jpg", "rb") as f:
image = Part.from_bytes(data=f.read(), mime_type="image/jpeg")
contents=["What is shown in this image?", image]

# Image from Cloud Storage

image_part = Part.from_uri(file_uri="gs://download.tensorflow.org/example_images/320px-Felis_catus-cat_on_snow.jpg", mime_type="image/jpeg")
contents=[image_part, "Describe this image?"]

# Text and video

video_part = Part.from_uri(file_uri="gs://cloud-samples-data/video/animals.mp4", mime_type="video/mp4")
contents=["What is in the video? ", video_part]

### Java

Import the `GenerateContentResponse` module:

Provide a combination of text, image, and video for multimodal prompting:

Part.fromText("describe the image"),
Part.fromUri("gs://cloud-samples-data/generative-ai/image/scones.jpg", "image/jpeg"));

Provide the combined prompt to the model:

client.models.generateContent("gemini-2.5-flash", content, null);

GenerateContentWithImageInput.java.

### JavaScript

const filePart = {file_data: {file_uri: "gs://sararob_imagegeneration_test/kitten.jpeg", mime_type: "image/jpeg"}};
const contents = [{role: 'user', parts: [textPart, filePart]}];
const response = await ai.models.generateContentStream({
model: 'gemini-2.5-flash-exp',
contents: contents,
let i = 0;
for await (const chunk of response) {
const text = chunk.text;
if (text) {
console.debug(text);

### Go

config := &genai.GenerateContentConfig{}
config.ResponseModalities = []string{"IMAGE", "TEXT"}
result, err := client.Models.GenerateContent(ctx, *model, genai.Text("Generate a story about a cute baby turtle in a 3d digital art style. For each scene, generate an image."), config)

Video and Audio

part := genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_FileData{

res, err := model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerativeModel_GenerateContent(ctx, part, genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Text(`Provide a description of the video. The description should also contain anything important which people say in the video.`))

### Text generation

Text generation is the process by which a model produces human-like written
content based on a given prompt. Replace the implementation with the

#### Synchronous generation

### Python

assert response.text

### Java

import com.google.cloud.vertexai.api.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html;
GenerativeModel model = new GenerativeModel("gemini-2.5-flash", vertexAi);
https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html response = model.generateContent("How are you?");

### JavaScript

Both the Vertex AI SDK and Google Gen AI SDK only support
asynchronous text generation for JavaScript.

### Go

gemini := client.GenerativeModel(modelName)
prompt := genai.Text(
"What's a good name for a flower shop that specializes in selling bouquets of dried flowers?")

resp, err := gemini.GenerateContent(ctx, prompt)

### Python

model='gemini-2.5-flash', contents='Why is the sky blue?'

### Java

Generate text with `generateContent`:

client.models.generateContent("gemini-2.5-flash", "What is your name?", null);

GenerateContent.java.

### JavaScript

### Go

var config *genai.GenerateContentConfig = &genai.GenerateContentConfig{Temperature: genai.Ptr float32}
result, err := client.Models.GenerateContent(ctx, *model, genai.Text("What is your name?"), config)

#### Asynchronous generation

### Python

response = await model.generate_content_async(

### Java

import com.google.cloud.vertexai.api.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html;

ApiFuture future = model.generateContentAsync("How are you?");
https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html response = future.get();

### JavaScript

const {VertexAI} = require('https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/overview.html');

const vertexAI = new https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({project: projectId, location: location});

const generativeModel = vertexAI.https://docs.cloud.google.com/nodejs/docs/reference/vertexai/latest/vertexai/vertexai.html({

role: 'user',
text: 'Write a story about a magic backpack.',

console.log(JSON.stringify(request));
console.log(result.response.text);

### Go

Not applicable: Go manages concurrent tasks without asynchronous operations.

### Python

response = await client.aio.models.generate_content(
model='gemini-2.5-flash', contents='Tell me a story in 300 words.'

### Java

Generate text asynchronously:

CompletableFuture responseFuture =
client.async.models.generateContent(
"gemini-2.5-flash", "Introduce Google AI Studio.", null);

responseFuture
.thenAccept(
response -> {
System.out.println("Async response: " + response.text());
.join();

GenerateContentAsync.java.

### JavaScript

contents: 'why is the sky blue?',

### Go

#### Streaming

### Python

stream = model.generate_content(
stream=True,
for chunk in stream:
chunk.text
or chunk.candidates[0].finish_reason
is generative_models.FinishReason.STOP

async_stream = await model.generate_content_async(
async for chunk in async_stream:

### Java

import com.google.cloud.vertexai.generativeai.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.ResponseStream.html;
import com.google.cloud.vertexai.api.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html;

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html model = new https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html("gemini-2.5-flash", vertexAi);
ResponseStream responseStream = model.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html#com_google_cloud_vertexai_generativeai_GenerativeModel_generateContentStream_com_google_cloud_vertexai_api_Content_("How are you?");

### JavaScript

const vertexAI = new VertexAI({project: projectId, location: location});

const generativeModel = vertexAI.getGenerativeModel({

contents: [{role: 'user', parts: [{text: 'What is Node.js?'}]}],

console.log(request.contents[0].parts[0].text);

for await (const item of responseStream.stream) {
process.stdout.write(item.candidates[0].content.parts[0].text);

### Go

package streamtextbasic

"google.golang.org/api/iterator"

iter := model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerativeModel_GenerateContentStream(
ctx,
genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Text("Write a story about a magic backpack."),
for {
resp, err := iter.Next()
fmt.Fprint(w, "generated response: ")
for _, c := range resp.Candidates {
for _, p := range c.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Content.Parts {
fmt.Fprintf(w, "%s ", p)

### Python

for chunk in client.models.generate_content_stream(
):

async for chunk in await client.aio.models.generate_content_stream(

### Java

Import the `ResponseStream` and `GenerateContentResponse` modules:

import com.google.genai.ResponseStream;

Provide the model a prompt and stream the results:

ResponseStream responseStream =
client.models.generateContentStream(
"gemini-2.5-flash", "Tell me a story in 300 words.", null);

System.out.println("Streaming response: ");
for (GenerateContentResponse res : responseStream) {
System.out.print(res.text());

### JavaScript

'Generate a story about a cute baby turtle in a 3d digital art style. For each scene, generate an image.',
responseModalities: [Modality.IMAGE, Modality.TEXT],

const data = chunk.data;
} else if (data) {
const fileName = `generate_content_streaming_image_${i++}.png`;
console.debug(`Writing response image to file: ${fileName}.`);
fs.writeFileSync(fileName, data);

### Go

var config *genai.GenerateContentConfig = &genai.GenerateContentConfig{SystemInstruction: &genai.Content{Parts: []*genai.Part{&genai.Part{Text: "You are a story writer."}}}}
for result, err := range client.Models.GenerateContentStream(ctx, *model, genai.Text("Tell me a story in 300 words."), config) {
fmt.Print(result.Text())

### Image generation

Image generation is the process by which a model creates images from textual
descriptions or other input modalities. Replace the implementation with the

### Python

model = ImageGenerationModel.from_pretrained("imagegeneration@002")
response = model.generate_images(
prompt="Astronaut riding a horse",

# Optional:

number_of_images=1,
seed=0,
response[0].show()
response[0].save("image1.png")

### Java

Image generation is not supported by the Java Vertex AI SDK, but is

### JavaScript

Image generation is not supported by the JavaScript Vertex AI SDK, but

### Go

Image generation is not supported by the Go Vertex AI SDK, but is

### Python

# Generate Image

response1 = client.models.generate_images(
model='imagen-3.0-generate-002',
prompt='An umbrella in the foreground, and a rainy night sky in the background',
config=types.GenerateImagesConfig(
include_rai_reason=True,
output_mime_type='image/jpeg',
response1.generated_images[0].image.show()

### Java

import com.google.genai.types.GenerateImagesConfig;
import com.google.genai.types.GenerateImagesResponse;
import com.google.genai.types.Image;

GenerateImagesConfig generateImagesConfig =
GenerateImagesConfig.builder()
.numberOfImages(1)
.outputMimeType("image/jpeg")
.includeSafetyAttributes(true)

GenerateImagesResponse generatedImagesResponse =
client.models.generateImages(
"imagen-3.0-generate-002", "Robot holding a red skateboard", generateImagesConfig);

Image generatedImage = generatedImagesResponse.generatedImages().get().get(0).image().get();

### JavaScript

const response = await ai.models.generateImages({
model: 'imagen-3.0-generate-002',
prompt: 'Robot holding a red skateboard',
numberOfImages: 1,
includeRaiReason: true,

console.debug(response?.generatedImages?.[0]?.image?.imageBytes);

### Go

fmt.Println("Generate image example.")
response1, err := client.Models.GenerateImages(
ctx, "imagen-3.0-generate-002",
/ prompt=/ "An umbrella in the foreground, and a rainy night sky in the background",
&genai.GenerateImagesConfig{
IncludeSafetyAttributes: true,
OutputMIMEType: "image/jpeg",

### Controlled generation

Controlled generation refers to the process of guiding model output to adhere to
specific constraints, formats, styles, or attributes, rather than generating
free-form text. Replace the implementation with the Vertex AI SDK

### Python

_RESPONSE_SCHEMA_STRUCT = {
"type": "object",
"properties": {
"type": "string",
"required": ["location"],

contents="Why is sky blue? Respond in JSON Format.",
response_schema=_RESPONSE_SCHEMA_STRUCT,

### Java

import com.google.cloud.vertexai.api.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Schema.html;
import com.google.cloud.vertexai.api.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Type.html;
import com.google.cloud.vertexai.generativeai.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.ContentMaker.html;
import com.google.cloud.vertexai.generativeai.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.PartMaker.html;

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerationConfig.html generationConfig = https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerationConfig.html.newBuilder()
.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerationConfig.Builder.html#com_google_cloud_vertexai_api_GenerationConfig_Builder_setResponseMimeType_java_lang_String_("application/json")
.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerationConfig.Builder.html#com_google_cloud_vertexai_api_GenerationConfig_Builder_setResponseSchema_com_google_cloud_vertexai_api_Schema_(https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Schema.html.newBuilder()
.setType(https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Type.html.ARRAY)
.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Schema.Builder.html#com_google_cloud_vertexai_api_Schema_Builder_setItems_com_google_cloud_vertexai_api_Schema_(https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Schema.html.newBuilder()
.setType(https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Type.html.OBJECT)
.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Schema.Builder.html#com_google_cloud_vertexai_api_Schema_Builder_putProperties_java_lang_String_com_google_cloud_vertexai_api_Schema_("object", https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Schema.html.newBuilder().setType(https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.Type.html.STRING).build())
.build())

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html model = new https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html(modelName, vertexAI)
.withGenerationConfig(generationConfig);

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html response = model.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.generativeai.GenerativeModel.html#com_google_cloud_vertexai_generativeai_GenerativeModel_generateContent_com_google_cloud_vertexai_api_Content_(
PartMaker.fromMimeTypeAndData("image/jpeg",
"gs://cloud-samples-data/generative-ai/image/office-desk.jpeg"),
"gs://cloud-samples-data/generative-ai/image/gardening-tools.jpeg"),
"Generate a list of objects in the images."

### JavaScript

const vertex_ai = new VertexAI({project: project, location: location});

const responseSchema = {
type: 'ARRAY',
items: {
type: 'OBJECT',
'recipeName': {
type: 'STRING',
description: 'Name of the recipe',
nullable: false,
required: ['recipeName'],

const generativeModel = vertex_ai.getGenerativeModel({
generationConfig: {
responseSchema: responseSchema,
responseMimeType: 'application/json',

async function generateContentControlledOutput() {

const req = {
contents: [{role: 'user', parts: [{text: 'list 3 popular cookie recipe'}]}],

const resp = await generativeModel.generateContent(req);

console.log('aggregated response: ', JSON.stringify(resp.response));

generateContentControlledOutput();

### Go

model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerationConfig.ResponseMIMEType = "application/json"

// Build an OpenAPI schema, in memory
model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerationConfig.ResponseSchema = &genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Schema{
Type: genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_TypeUnspecified_TypeString_TypeNumber_TypeInteger_TypeBoolean_TypeArray_TypeObject,
Items: &genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Schema{
Type: genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_TypeUnspecified_TypeString_TypeNumber_TypeInteger_TypeBoolean_TypeArray_TypeObject,
Items: &genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Schema{
Type: genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_TypeUnspecified_TypeString_TypeNumber_TypeInteger_TypeBoolean_TypeArray_TypeObject,
Properties: map[string]*genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Schema{
"object": {
Type: genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_TypeUnspecified_TypeString_TypeNumber_TypeInteger_TypeBoolean_TypeArray_TypeObject,

img1 := genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_FileData{
FileURI: "gs://cloud-samples-data/generative-ai/image/office-desk.jpeg",

img2 := genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_FileData{
FileURI: "gs://cloud-samples-data/generative-ai/image/gardening-tools.jpeg",

prompt := "Generate a list of objects in the images."

res, err := model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerativeModel_GenerateContent(ctx, img1, img2, genai.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_Text(prompt))

### Python

response_schema = {
"type": "ARRAY",
"items": {
"recipe_name": {"type": "STRING"},
"ingredients": {"type": "ARRAY", "items": {"type": "STRING"}},
"required": ["recipe_name", "ingredients"],

prompt = """
List a few popular cookie recipes.

contents=prompt,
config={
"response_mime_type": "application/json",
"response_schema": response_schema,

### Java

Import the `Schema` and `Type` modules:

import com.google.genai.types.Schema;
import com.google.genai.types.Type;

Create the response schema:

Schema schema =
Schema.builder()
.type(Type.Known.ARRAY)
.items(
.type(Type.Known.OBJECT)
.properties(
ImmutableMap.of(
"recipe_name",
Schema.builder().type(Type.Known.STRING).build(),
"ingredients",
.items(Schema.builder().type(Type.Known.STRING))
.build()))
.required("recipe_name", "ingredients"))

Add the schema to the content config:

.responseMimeType("application/json")
.candidateCount(1)
.responseSchema(schema)

Generate responses with the config:

"gemini-2.5-flash", "List a few popular cookie recipes.", config);

GenerateContentWithResponseSchema.java.

### JavaScript

contents: 'List 3 popular cookie recipes.',
responseSchema: {
type: Type.ARRAY,

### Go

return "", fmt.Errorf("failed to create content cache: %w", err)

cachedContent, err := json.MarshalIndent(res, "", " ")
return "", fmt.Errorf("failed to marshal cache info: %w", err)

### Count tokens

Tokens are the fundamental units of text (letters, words, phrases) that models
process, analyze, and generate. To count or compute tokens in a response,

### Python

content = ["Why is sky blue?", "Explain it like I'm 5."]

response = model.count_tokens(content)

### Java

import com.google.cloud.vertexai.api.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.CountTokensResponse.html;

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.CountTokensResponse.html response = model.countTokens(textPrompt);

int promptTokenCount = response.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.CountTokensResponse.html#com_google_cloud_vertexai_api_CountTokensResponse_getTotalTokens__();
int promptCharCount = response.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.CountTokensResponse.html#com_google_cloud_vertexai_api_CountTokensResponse_getTotalBillableCharacters__();

https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html contentResponse = model.generateContent(textPrompt);

int tokenCount = contentResponse.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html#com_google_cloud_vertexai_api_GenerateContentResponse_getUsageMetadata__().getPromptTokenCount();
int candidateTokenCount = contentResponse.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html#com_google_cloud_vertexai_api_GenerateContentResponse_getUsageMetadata__().getCandidatesTokenCount();
int totalTokenCount = contentResponse.https://docs.cloud.google.com/java/docs/reference/google-cloud-vertexai/latest/com.google.cloud.vertexai.api.GenerateContentResponse.html#com_google_cloud_vertexai_api_GenerateContentResponse_getUsageMetadata__().getTotalTokenCount();

### JavaScript

contents: [{role: 'user', parts: [{text: 'How are you doing today?'}]}],
const response = await generativeModel.countTokens(request);
console.log('count tokens response: ', JSON.stringify(response));

### Go

package tokencount

resp, err := model.CountTokens(ctx, prompt)

fmt.Fprintf(w, "Number of tokens for the prompt: %d\n", resp.TotalTokens)

resp2, err := model.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_GenerativeModel_GenerateContent(ctx, prompt)

fmt.Fprintf(w, "Number of tokens for the prompt: %d\n", resp2.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_UsageMetadata.PromptTokenCount)
fmt.Fprintf(w, "Number of tokens for the candidates: %d\n", resp2.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_UsageMetadata.CandidatesTokenCount)
fmt.Fprintf(w, "Total number of tokens: %d\n", resp2.https://docs.cloud.google.com/go/docs/reference/cloud.google.com/go/vertexai/latest/genai.html#cloud_google_com_go_vertexai_genai_UsageMetadata.TotalTokenCount)

### Python

response = client.models.count_tokens(
print(response)

Compute tokens

response = client.models.compute_tokens(

### Java

Import the `CountTokensResponse` and `ComputeTokensResponse` modules:

import com.google.genai.types.CountTokensResponse;
import com.google.genai.types.ComputeTokensResponse;

Use `countTokens` to count the number of tokens used for a prompt:

CountTokensResponse response =
client.models.countTokens("gemini-2.5-flash", "What is your name?", null);

Use `computeTokens` for a more granular analysis of how the prompt is
tokenized:

ComputeTokensResponse response =
client.models.computeTokens("gemini-2.5-flash", "What is your name?", null);

CountTokens.java.

### JavaScript

const response = await ai.models.countTokens({
contents: 'The quick brown fox jumps over the lazy dog.',

### Go

client, err := genai.NewClient(ctx, &genai.ClientConfig{Backend: genai.BackendVertexAI})

fmt.Println("Count tokens example.")
countTokensResult, err := client.Models.CountTokens(ctx, *model, genai.Text("What is your name?"), nil)

fmt.Println(countTokensResult.TotalTokens)
