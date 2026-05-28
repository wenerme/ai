> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Create a BYOK provider credential

POST https://openrouter.ai/api/v1/byok
Content-Type: application/json

Create a new bring-your-own-key (BYOK) provider credential. The raw key is encrypted at rest and never returned in API responses. Defaults to the authenticated entity's default workspace; use the `workspace_id` body field to scope to a different workspace. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/byok/create-byok-key

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /byok:
    post:
      operationId: create-byok-key
      summary: Create a BYOK provider credential
      description: >-
        Create a new bring-your-own-key (BYOK) provider credential. The raw key
        is encrypted at rest and never returned in API responses. Defaults to
        the authenticated entity's default workspace; use the `workspace_id`
        body field to scope to a different workspace. [Management
        key](/docs/guides/overview/auth/management-api-keys) required.
      tags:
        - subpackage_byok
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '201':
          description: BYOK credential created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateBYOKKeyResponse'
        '400':
          description: Bad Request - Invalid request parameters or malformed input
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BadRequestResponse'
        '401':
          description: Unauthorized - Authentication required or invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
        '403':
          description: Forbidden - Authentication successful but insufficient permissions
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ForbiddenResponse'
        '500':
          description: Internal Server Error - Unexpected server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateBYOKKeyRequest'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    BYOKProviderSlug:
      type: string
      enum:
        - ai21
        - aion-labs
        - akashml
        - alibaba
        - amazon-bedrock
        - amazon-nova
        - ambient
        - anthropic
        - arcee-ai
        - atlas-cloud
        - avian
        - azure
        - baidu
        - baseten
        - black-forest-labs
        - byteplus
        - cerebras
        - chutes
        - cirrascale
        - clarifai
        - cloudflare
        - cohere
        - crusoe
        - darkbloom
        - deepinfra
        - deepseek
        - dekallm
        - digitalocean
        - featherless
        - fireworks
        - friendli
        - gmicloud
        - google-ai-studio
        - google-vertex
        - groq
        - hyperbolic
        - inception
        - inceptron
        - inference-net
        - infermatic
        - inflection
        - io-net
        - ionstream
        - liquid
        - mancer
        - mara
        - minimax
        - mistral
        - modelrun
        - modular
        - moonshotai
        - morph
        - ncompass
        - nebius
        - nex-agi
        - nextbit
        - novita
        - nvidia
        - open-inference
        - openai
        - parasail
        - perceptron
        - perplexity
        - phala
        - poolside
        - recraft
        - reka
        - relace
        - sambanova
        - seed
        - siliconflow
        - sourceful
        - stepfun
        - streamlake
        - switchpoint
        - together
        - upstage
        - venice
        - wandb
        - xai
        - xiaomi
        - z-ai
      description: >-
        The upstream provider this credential authenticates against, as a
        lowercase slug (e.g. `openai`, `anthropic`, `amazon-bedrock`).
      title: BYOKProviderSlug
    CreateBYOKKeyRequest:
      type: object
      properties:
        allowed_models:
          type:
            - array
            - 'null'
          items:
            type: string
          description: >-
            Optional allowlist of model slugs this credential may be used for.
            `null` means no restriction.
        allowed_user_ids:
          type:
            - array
            - 'null'
          items:
            type: string
          description: >-
            Optional allowlist of user IDs that may use this credential. `null`
            means no restriction.
        disabled:
          type: boolean
          description: Whether this credential should be created in a disabled state.
        is_fallback:
          type: boolean
          description: >-
            Whether this credential is treated as a fallback — used only after
            non-fallback keys for the same provider have been tried.
        key:
          type: string
          description: >-
            The raw provider API key or credential. This value is encrypted at
            rest and never returned in API responses.
        name:
          type:
            - string
            - 'null'
          description: Optional human-readable name for the credential.
        provider:
          $ref: '#/components/schemas/BYOKProviderSlug'
        workspace_id:
          type: string
          format: uuid
          description: >-
            Optional workspace ID. Defaults to the authenticated entity's
            default workspace.
      required:
        - key
        - provider
      title: CreateBYOKKeyRequest
    CreateByokKeyResponseData:
      type: object
      properties:
        allowed_api_key_hashes:
          type:
            - array
            - 'null'
          items:
            type: string
          description: >-
            Optional allowlist of OpenRouter API key hashes (`api_keys.hash`)
            that may use this credential. `null` means no restriction.
        allowed_models:
          type:
            - array
            - 'null'
          items:
            type: string
          description: >-
            Optional allowlist of model slugs this credential may be used for.
            `null` means no restriction.
        allowed_user_ids:
          type:
            - array
            - 'null'
          items:
            type: string
          description: >-
            Optional allowlist of user IDs that may use this credential. `null`
            means no restriction.
        created_at:
          type: string
          description: ISO timestamp of when the credential was created.
        disabled:
          type: boolean
          description: Whether this credential is currently disabled.
        id:
          type: string
          format: uuid
          description: Stable public identifier for this BYOK credential.
        is_fallback:
          type: boolean
          description: >-
            Whether this credential is treated as a fallback — used only after
            non-fallback keys for the same provider have been tried.
        label:
          type: string
          description: >-
            Short masked snippet of the key (e.g. the first/last few characters)
            used to identify it in the UI.
        name:
          type:
            - string
            - 'null'
          description: Optional human-readable name for the credential.
        provider:
          $ref: '#/components/schemas/BYOKProviderSlug'
        sort_order:
          type: integer
          description: >-
            Position within the provider — credentials are tried in ascending
            sort order.
        workspace_id:
          type: string
          format: uuid
          description: ID of the workspace this credential belongs to.
      required:
        - allowed_api_key_hashes
        - allowed_models
        - allowed_user_ids
        - created_at
        - disabled
        - id
        - is_fallback
        - label
        - provider
        - sort_order
        - workspace_id
      description: The created BYOK credential.
      title: CreateByokKeyResponseData
    CreateBYOKKeyResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/CreateByokKeyResponseData'
      required:
        - data
      title: CreateBYOKKeyResponse
    BadRequestResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for BadRequestResponse
      title: BadRequestResponseErrorData
    BadRequestResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/BadRequestResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Bad Request - Invalid request parameters or malformed input
      title: BadRequestResponse
    UnauthorizedResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for UnauthorizedResponse
      title: UnauthorizedResponseErrorData
    UnauthorizedResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/UnauthorizedResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Unauthorized - Authentication required or invalid credentials
      title: UnauthorizedResponse
    ForbiddenResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for ForbiddenResponse
      title: ForbiddenResponseErrorData
    ForbiddenResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/ForbiddenResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Forbidden - Authentication successful but insufficient permissions
      title: ForbiddenResponse
    InternalServerResponseErrorData:
      type: object
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
      required:
        - code
        - message
      description: Error data for InternalServerResponse
      title: InternalServerResponseErrorData
    InternalServerResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/InternalServerResponseErrorData'
        openrouter_metadata:
          type:
            - object
            - 'null'
          additionalProperties:
            description: Any type
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Internal Server Error - Unexpected server error
      title: InternalServerResponse
  securitySchemes:
    apiKey:
      type: http
      scheme: bearer
      description: API key as bearer token in Authorization header

```

## SDK Code Examples

```python BYOK_createBYOKKey_example
import requests

url = "https://openrouter.ai/api/v1/byok"

payload = {
    "key": "sk-proj-abc123...",
    "provider": "openai",
    "name": "Production OpenAI Key"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript BYOK_createBYOKKey_example
const url = 'https://openrouter.ai/api/v1/byok';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"key":"sk-proj-abc123...","provider":"openai","name":"Production OpenAI Key"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go BYOK_createBYOKKey_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/byok"

	payload := strings.NewReader("{\n  \"key\": \"sk-proj-abc123...\",\n  \"provider\": \"openai\",\n  \"name\": \"Production OpenAI Key\"\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby BYOK_createBYOKKey_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/byok")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"key\": \"sk-proj-abc123...\",\n  \"provider\": \"openai\",\n  \"name\": \"Production OpenAI Key\"\n}"

response = http.request(request)
puts response.read_body
```

```java BYOK_createBYOKKey_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/byok")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"key\": \"sk-proj-abc123...\",\n  \"provider\": \"openai\",\n  \"name\": \"Production OpenAI Key\"\n}")
  .asString();
```

```php BYOK_createBYOKKey_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/byok', [
  'body' => '{
  "key": "sk-proj-abc123...",
  "provider": "openai",
  "name": "Production OpenAI Key"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp BYOK_createBYOKKey_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/byok");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"key\": \"sk-proj-abc123...\",\n  \"provider\": \"openai\",\n  \"name\": \"Production OpenAI Key\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift BYOK_createBYOKKey_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "key": "sk-proj-abc123...",
  "provider": "openai",
  "name": "Production OpenAI Key"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/byok")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```