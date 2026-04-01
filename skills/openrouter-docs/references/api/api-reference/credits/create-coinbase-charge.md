# Deprecated Coinbase Commerce charge endpoint

POST https://openrouter.ai/api/v1/credits/coinbase

Deprecated. The Coinbase APIs used by this endpoint have been deprecated, so Coinbase Commerce charges have been removed. Use the web credits purchase flow instead.

Reference: https://openrouter.ai/docs/api/api-reference/credits/create-coinbase-charge

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /credits/coinbase:
    post:
      operationId: create-coinbase-charge
      summary: Deprecated Coinbase Commerce charge endpoint
      description: >-
        Deprecated. The Coinbase APIs used by this endpoint have been
        deprecated, so Coinbase Commerce charges have been removed. Use the web
        credits purchase flow instead.
      tags:
        - subpackage_credits
      responses:
        '200':
          description: Successful response
        '410':
          description: Gone - Coinbase Commerce charge creation has been removed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GoneResponse'
servers:
  - url: https://openrouter.ai/api/v1
components:
  schemas:
    GoneResponseErrorData:
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
      description: Error data for GoneResponse
      title: GoneResponseErrorData
    GoneResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/GoneResponseErrorData'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      description: Gone - Endpoint has been permanently removed or deprecated
      title: GoneResponse

```

## SDK Code Examples

```python
import requests

url = "https://openrouter.ai/api/v1/credits/coinbase"

response = requests.post(url)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/credits/coinbase';
const options = {method: 'POST'};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/credits/coinbase"

	req, _ := http.NewRequest("POST", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/credits/coinbase")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://openrouter.ai/api/v1/credits/coinbase")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://openrouter.ai/api/v1/credits/coinbase');

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/credits/coinbase");
var request = new RestRequest(Method.POST);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/credits/coinbase")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"

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