> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://openrouter.ai/docs/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://openrouter.ai/docs/_mcp/server.

# Top apps by token usage

GET https://openrouter.ai/api/v1/datasets/app-rankings

Returns the top public apps on OpenRouter ranked by token usage inside the requested
date window, matching the public apps marketplace on openrouter.ai/apps. Token totals
are `prompt_tokens + completion_tokens`; hidden and private apps are excluded and
traffic from related app aliases is merged into the canonical visible app.

`sort=popular` (default) ranks by total token volume inside the window.
`sort=trending` ranks by absolute excess token growth: window volume minus the average
volume of the three equal-length periods immediately preceding the window. Apps with
no excess growth are omitted, so `trending` may return fewer than `limit` rows.

Filter with `category` (marketplace category group, e.g. `coding`) or `subcategory`
(e.g. `cli-agent`). Ranks are re-numbered 1..N after filtering. Page with `offset` —
`rank` stays absolute, so the first row of `offset=50` is `rank: 51`.

Authenticate with any valid OpenRouter API key (same key used for inference).
Rate-limited to 30 requests/minute per key and 500 requests/day per account.

When republishing or quoting this dataset, OpenRouter must be cited as:
"Source: OpenRouter (openrouter.ai/apps), as of {as_of}."

Token counts come from each upstream provider's own tokenizer, so a token attributed
to one app is not directly comparable to a token attributed to another app whose
traffic flows through a different provider.

Reference: https://openrouter.ai/docs/api/api-reference/datasets/get-app-rankings

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /datasets/app-rankings:
    get:
      operationId: get-app-rankings
      summary: Top apps by token usage
      description: >-
        Returns the top public apps on OpenRouter ranked by token usage inside
        the requested

        date window, matching the public apps marketplace on openrouter.ai/apps.
        Token totals

        are `prompt_tokens + completion_tokens`; hidden and private apps are
        excluded and

        traffic from related app aliases is merged into the canonical visible
        app.


        `sort=popular` (default) ranks by total token volume inside the window.

        `sort=trending` ranks by absolute excess token growth: window volume
        minus the average

        volume of the three equal-length periods immediately preceding the
        window. Apps with

        no excess growth are omitted, so `trending` may return fewer than
        `limit` rows.


        Filter with `category` (marketplace category group, e.g. `coding`) or
        `subcategory`

        (e.g. `cli-agent`). Ranks are re-numbered 1..N after filtering. Page
        with `offset` —

        `rank` stays absolute, so the first row of `offset=50` is `rank: 51`.


        Authenticate with any valid OpenRouter API key (same key used for
        inference).

        Rate-limited to 30 requests/minute per key and 500 requests/day per
        account.


        When republishing or quoting this dataset, OpenRouter must be cited as:

        "Source: OpenRouter (openrouter.ai/apps), as of {as_of}."


        Token counts come from each upstream provider's own tokenizer, so a
        token attributed

        to one app is not directly comparable to a token attributed to another
        app whose

        traffic flows through a different provider.
      tags:
        - subpackage_datasets
      parameters:
        - name: category
          in: query
          description: >-
            Marketplace category group to filter by (e.g. `coding`). Only apps
            tagged with a subcategory inside this group are returned. Mutually
            combinable with `subcategory` — when both are supplied the
            `subcategory` must belong to the `category` group.
          required: false
          schema:
            $ref: '#/components/schemas/DatasetsAppRankingsGetParametersCategory'
        - name: subcategory
          in: query
          description: >-
            Marketplace subcategory to filter by (e.g. `cli-agent`). Takes
            precedence over `category` for the actual filter; when `category` is
            also supplied the pair must be consistent.
          required: false
          schema:
            $ref: '#/components/schemas/DatasetsAppRankingsGetParametersSubcategory'
        - name: sort
          in: query
          description: >-
            `popular` ranks apps by total token volume inside the date window.
            `trending` ranks apps by absolute excess token growth: window volume
            minus the average volume of the three equal-length periods
            immediately preceding the window. Apps with no excess growth are
            omitted from `trending` results.
          required: false
          schema:
            $ref: '#/components/schemas/DatasetsAppRankingsGetParametersSort'
        - name: start_date
          in: query
          description: >-
            Start of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to
            30 days before `end_date`. The dataset begins at 2025-01-01; earlier
            values are clamped forward to that floor and the resolved value is
            echoed in `meta.start_date`.
          required: false
          schema:
            type: string
        - name: end_date
          in: query
          description: >-
            End of the date window in YYYY-MM-DD (UTC), inclusive. Defaults to
            the most recent completed UTC day. Must be on or after 2025-01-01;
            earlier values are rejected with a 400.
          required: false
          schema:
            type: string
        - name: limit
          in: query
          description: Maximum number of apps to return (1-100). Defaults to 50.
          required: false
          schema:
            type: integer
            default: 50
        - name: offset
          in: query
          description: >-
            Number of ranked apps to skip before the first returned row (0-100).
            Defaults to 0. `rank` stays absolute, so the first row of
            `offset=50` is `rank: 51`.
          required: false
          schema:
            type: integer
            default: 0
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: >-
            Apps ranked per the requested `sort`, re-numbered 1..N. `popular`
            sorts by `total_tokens` descending; `trending` sorts by absolute
            excess token growth descending and may return fewer than `limit`
            rows.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AppRankingsResponse'
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
        '429':
          description: Too Many Requests - Rate limit exceeded
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TooManyRequestsResponse'
        '500':
          description: Internal Server Error - Unexpected server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
servers:
  - url: https://openrouter.ai/api/v1
    description: Production server
components:
  schemas:
    DatasetsAppRankingsGetParametersCategory:
      type: string
      enum:
        - coding
        - creative
        - productivity
        - entertainment
      description: >-
        Marketplace category group to filter by (e.g. `coding`). Only apps
        tagged with a subcategory inside this group are returned. Mutually
        combinable with `subcategory` — when both are supplied the `subcategory`
        must belong to the `category` group.
      title: DatasetsAppRankingsGetParametersCategory
    DatasetsAppRankingsGetParametersSubcategory:
      type: string
      enum:
        - cli-agent
        - ide-extension
        - cloud-agent
        - programming-app
        - native-app-builder
        - creative-writing
        - video-gen
        - image-gen
        - audio-gen
        - roleplay
        - game
        - writing-assistant
        - general-chat
        - personal-agent
        - legal
      description: >-
        Marketplace subcategory to filter by (e.g. `cli-agent`). Takes
        precedence over `category` for the actual filter; when `category` is
        also supplied the pair must be consistent.
      title: DatasetsAppRankingsGetParametersSubcategory
    DatasetsAppRankingsGetParametersSort:
      type: string
      enum:
        - popular
        - trending
      default: popular
      description: >-
        `popular` ranks apps by total token volume inside the date window.
        `trending` ranks apps by absolute excess token growth: window volume
        minus the average volume of the three equal-length periods immediately
        preceding the window. Apps with no excess growth are omitted from
        `trending` results.
      title: DatasetsAppRankingsGetParametersSort
    AppRankingsItem:
      type: object
      properties:
        app_id:
          type: integer
          description: Stable numeric identifier of the app on OpenRouter.
        app_name:
          type: string
          description: Public display name of the app.
        rank:
          type: integer
          description: >-
            1-based position of the app within this response, per the requested
            `sort`.
        total_requests:
          type: integer
          description: Number of requests attributed to the app inside the date window.
        total_tokens:
          type: string
          description: >-
            Sum of `prompt_tokens + completion_tokens` attributed to the app
            inside the date window, returned as a decimal string so 64-bit
            values are not truncated.
      required:
        - app_id
        - app_name
        - rank
        - total_requests
        - total_tokens
      title: AppRankingsItem
    RankingsDailyMetaVersion:
      type: string
      enum:
        - v1
      description: Dataset version. Field names and grain are stable for the life of `v1`.
      title: RankingsDailyMetaVersion
    RankingsDailyMeta:
      type: object
      properties:
        as_of:
          type: string
          description: >-
            ISO-8601 timestamp of when the response was generated. Reflects
            data-freshness because the underlying materialized view continuously
            ingests upstream events.
        end_date:
          type: string
          description: Resolved end of the date window (UTC, inclusive).
        start_date:
          type: string
          description: Resolved start of the date window (UTC, inclusive).
        version:
          $ref: '#/components/schemas/RankingsDailyMetaVersion'
          description: >-
            Dataset version. Field names and grain are stable for the life of
            `v1`.
      required:
        - as_of
        - end_date
        - start_date
        - version
      title: RankingsDailyMeta
    AppRankingsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/AppRankingsItem'
          description: >-
            Apps ranked per the requested `sort`, re-numbered 1..N after
            category filtering. `popular` sorts by `total_tokens` descending;
            `trending` sorts by absolute excess token growth descending and may
            return fewer than `limit` rows when few apps are growing.
        meta:
          $ref: '#/components/schemas/RankingsDailyMeta'
      required:
        - data
        - meta
      title: AppRankingsResponse
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
    TooManyRequestsResponseErrorData:
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
      description: Error data for TooManyRequestsResponse
      title: TooManyRequestsResponseErrorData
    TooManyRequestsResponse:
      type: object
      properties:
        error:
          $ref: '#/components/schemas/TooManyRequestsResponseErrorData'
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
      description: Too Many Requests - Rate limit exceeded
      title: TooManyRequestsResponse
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

## Examples



**Response**

```json
{
  "data": [
    {
      "app_id": 12345,
      "app_name": "Cline",
      "rank": 1,
      "total_requests": 4321,
      "total_tokens": "12345678"
    },
    {
      "app_id": 67890,
      "app_name": "Roo Code",
      "rank": 2,
      "total_requests": 2109,
      "total_tokens": "9876543"
    }
  ],
  "meta": {
    "as_of": "2026-05-12T02:00:00Z",
    "end_date": "2026-05-11",
    "start_date": "2026-04-12",
    "version": "v1"
  }
}
```

**SDK Code**

```python Datasets_getAppRankings_example
import requests

url = "https://openrouter.ai/api/v1/datasets/app-rankings"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Datasets_getAppRankings_example
const url = 'https://openrouter.ai/api/v1/datasets/app-rankings';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Datasets_getAppRankings_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://openrouter.ai/api/v1/datasets/app-rankings"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Datasets_getAppRankings_example
require 'uri'
require 'net/http'

url = URI("https://openrouter.ai/api/v1/datasets/app-rankings")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Datasets_getAppRankings_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/datasets/app-rankings")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Datasets_getAppRankings_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/datasets/app-rankings', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Datasets_getAppRankings_example
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/datasets/app-rankings");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Datasets_getAppRankings_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/datasets/app-rankings")! as URL,
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