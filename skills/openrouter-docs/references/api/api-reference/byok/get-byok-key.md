> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Get a BYOK provider credential

GET https://openrouter.ai/api/v1/byok/{id}

Get a single bring-your-own-key (BYOK) provider credential by its `id`. [Management key](/docs/guides/overview/auth/management-api-keys) required.

Reference: https://openrouter.ai/docs/api/api-reference/byok/get-byok-key

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /byok/{id}:
    get:
      operationId: get-byok-key
      summary: Get a BYOK provider credential
      description: >-
        Get a single bring-your-own-key (BYOK) provider credential by its `id`.
        [Management key](/docs/guides/overview/auth/management-api-keys)
        required.
      tags:
        - subpackage_byok
      parameters:
        - name: id
          in: path
          description: The BYOK credential ID (UUID).
          required: true
          schema:
            type: string
            format: uuid
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: BYOK credential details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GetBYOKKeyResponse'
        '401':
          description: Unauthorized - Authentication required or invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
        '404':
          description: Not Found - Resource does not exist
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotFoundResponse'
        '500':
          description: Internal Server Error - Unexpected server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
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
        - deepinfra
        - deepseek
        - dekallm
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
    GetByokKeyResponseData:
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
      description: The BYOK credential.
      title: GetByokKeyResponseData
    GetBYOKKeyResponse:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/GetByokKeyResponseData'
      required:
        - data
      title: GetBYOKKeyResponse
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
    NotFoundResponseErrorData:
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
      description: Error data for NotFoundResponse
      title: NotFoundResponseErrorData
    NotFoundResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/NotFoundResponseErrorData'
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
      description: Not Found - Resource does not exist
      title: NotFoundResponse
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

```python BYOK_getBYOKKey_example
import requests

url = "https://openrouter.ai/api/v1/byok/11111111-2222-3333-4444-555555555555"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript BYOK_getBYOKKey_example
const url = 'https://openrouter.ai/api/v1/byok/11111111-2222-3333-4444-555555555555';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go BYOK_getBYOKKey_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/byok/11111111-2222-3333-4444-555555555555"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby BYOK_getBYOKKey_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/byok/11111111-2222-3333-4444-555555555555")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java BYOK_getBYOKKey_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/byok/11111111-2222-3333-4444-555555555555")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php BYOK_getBYOKKey_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/byok/11111111-2222-3333-4444-555555555555', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp BYOK_getBYOKKey_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/byok/11111111-2222-3333-4444-555555555555");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift BYOK_getBYOKKey_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/byok/11111111-2222-3333-4444-555555555555")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

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