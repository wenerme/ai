> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For full documentation content, see https://openrouter.ai/docs/llms-full.txt.

# Get current API key

GET https://openrouter.ai/api/v1/key

Get information on the API key associated with the current authentication session

Reference: https://openrouter.ai/docs/api/api-reference/api-keys/get-current-key

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /key:
    get:
      operationId: get-current-key
      summary: Get current API key
      description: >-
        Get information on the API key associated with the current
        authentication session
      tags:
        - subpackage_apiKeys
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: API key details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/API Keys_getCurrentKey_Response_200'
        '401':
          description: Unauthorized - Authentication required or invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedResponse'
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
    KeyGetResponsesContentApplicationJsonSchemaDataRateLimit:
      type: object
      properties:
        interval:
          type: string
          description: Rate limit interval
        note:
          type: string
          description: Note about the rate limit
        requests:
          type: integer
          description: Number of requests allowed per interval
      required:
        - interval
        - note
        - requests
      description: Legacy rate limit information about a key. Will always return -1.
      title: KeyGetResponsesContentApplicationJsonSchemaDataRateLimit
    KeyGetResponsesContentApplicationJsonSchemaData:
      type: object
      properties:
        byok_usage:
          type: number
          format: double
          description: Total external BYOK usage (in USD) for the API key
        byok_usage_daily:
          type: number
          format: double
          description: External BYOK usage (in USD) for the current UTC day
        byok_usage_monthly:
          type: number
          format: double
          description: External BYOK usage (in USD) for current UTC month
        byok_usage_weekly:
          type: number
          format: double
          description: >-
            External BYOK usage (in USD) for the current UTC week
            (Monday-Sunday)
        creator_user_id:
          type:
            - string
            - 'null'
          description: >-
            The user ID of the key creator. For organization-owned keys, this is
            the member who created the key. For individual users, this is the
            user's own ID.
        expires_at:
          type:
            - string
            - 'null'
          format: date-time
          description: >-
            ISO 8601 UTC timestamp when the API key expires, or null if no
            expiration
        include_byok_in_limit:
          type: boolean
          description: Whether to include external BYOK usage in the credit limit
        is_free_tier:
          type: boolean
          description: Whether this is a free tier API key
        is_management_key:
          type: boolean
          description: Whether this is a management key
        is_provisioning_key:
          type: boolean
          description: Whether this is a management key
        label:
          type: string
          description: Human-readable label for the API key
        limit:
          type:
            - number
            - 'null'
          format: double
          description: Spending limit for the API key in USD
        limit_remaining:
          type:
            - number
            - 'null'
          format: double
          description: Remaining spending limit in USD
        limit_reset:
          type:
            - string
            - 'null'
          description: Type of limit reset for the API key
        rate_limit:
          $ref: >-
            #/components/schemas/KeyGetResponsesContentApplicationJsonSchemaDataRateLimit
          description: Legacy rate limit information about a key. Will always return -1.
        usage:
          type: number
          format: double
          description: Total OpenRouter credit usage (in USD) for the API key
        usage_daily:
          type: number
          format: double
          description: OpenRouter credit usage (in USD) for the current UTC day
        usage_monthly:
          type: number
          format: double
          description: OpenRouter credit usage (in USD) for the current UTC month
        usage_weekly:
          type: number
          format: double
          description: >-
            OpenRouter credit usage (in USD) for the current UTC week
            (Monday-Sunday)
      required:
        - byok_usage
        - byok_usage_daily
        - byok_usage_monthly
        - byok_usage_weekly
        - creator_user_id
        - include_byok_in_limit
        - is_free_tier
        - is_management_key
        - is_provisioning_key
        - label
        - limit
        - limit_remaining
        - limit_reset
        - rate_limit
        - usage
        - usage_daily
        - usage_monthly
        - usage_weekly
      description: Current API key information
      title: KeyGetResponsesContentApplicationJsonSchemaData
    API Keys_getCurrentKey_Response_200:
      type: object
      properties:
        data:
          $ref: '#/components/schemas/KeyGetResponsesContentApplicationJsonSchemaData'
          description: Current API key information
      required:
        - data
      title: API Keys_getCurrentKey_Response_200
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

```python API Keys_getCurrentKey_example
import requests

url = "https://openrouter.ai/api/v1/key"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript API Keys_getCurrentKey_example
const url = 'https://openrouter.ai/api/v1/key';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go API Keys_getCurrentKey_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/key"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby API Keys_getCurrentKey_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/key")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java API Keys_getCurrentKey_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/key")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php API Keys_getCurrentKey_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/key', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp API Keys_getCurrentKey_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/key");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift API Keys_getCurrentKey_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/key")! as URL,
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