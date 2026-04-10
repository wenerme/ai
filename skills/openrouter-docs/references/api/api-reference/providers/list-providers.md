For clean Markdown of any page, append .md to the page URL. For a complete documentation index, see https://openrouter.ai/docs/api/api-reference/providers/llms.txt. For full documentation content, see https://openrouter.ai/docs/api/api-reference/providers/llms-full.txt.

# List all providers

GET https://openrouter.ai/api/v1/providers

Reference: https://openrouter.ai/docs/api/api-reference/providers/list-providers

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: OpenRouter API
  version: 1.0.0
paths:
  /providers:
    get:
      operationId: list-providers
      summary: List all providers
      tags:
        - subpackage_providers
      parameters:
        - name: Authorization
          in: header
          description: API key as bearer token in Authorization header
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Returns a list of providers
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Providers_listProviders_Response_200'
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
    ProvidersGetResponsesContentApplicationJsonSchemaDataItemsDatacentersItems:
      type: string
      enum:
        - AD
        - AE
        - AF
        - AG
        - AI
        - AL
        - AM
        - AO
        - AQ
        - AR
        - AS
        - AT
        - AU
        - AW
        - AX
        - AZ
        - BA
        - BB
        - BD
        - BE
        - BF
        - BG
        - BH
        - BI
        - BJ
        - BL
        - BM
        - BN
        - BO
        - BQ
        - BR
        - BS
        - BT
        - BV
        - BW
        - BY
        - BZ
        - CA
        - CC
        - CD
        - CF
        - CG
        - CH
        - CI
        - CK
        - CL
        - CM
        - CN
        - CO
        - CR
        - CU
        - CV
        - CW
        - CX
        - CY
        - CZ
        - DE
        - DJ
        - DK
        - DM
        - DO
        - DZ
        - EC
        - EE
        - EG
        - EH
        - ER
        - ES
        - ET
        - FI
        - FJ
        - FK
        - FM
        - FO
        - FR
        - GA
        - GB
        - GD
        - GE
        - GF
        - GG
        - GH
        - GI
        - GL
        - GM
        - GN
        - GP
        - GQ
        - GR
        - GS
        - GT
        - GU
        - GW
        - GY
        - HK
        - HM
        - HN
        - HR
        - HT
        - HU
        - ID
        - IE
        - IL
        - IM
        - IN
        - IO
        - IQ
        - IR
        - IS
        - IT
        - JE
        - JM
        - JO
        - JP
        - KE
        - KG
        - KH
        - KI
        - KM
        - KN
        - KP
        - KR
        - KW
        - KY
        - KZ
        - LA
        - LB
        - LC
        - LI
        - LK
        - LR
        - LS
        - LT
        - LU
        - LV
        - LY
        - MA
        - MC
        - MD
        - ME
        - MF
        - MG
        - MH
        - MK
        - ML
        - MM
        - MN
        - MO
        - MP
        - MQ
        - MR
        - MS
        - MT
        - MU
        - MV
        - MW
        - MX
        - MY
        - MZ
        - NA
        - NC
        - NE
        - NF
        - NG
        - NI
        - NL
        - 'NO'
        - NP
        - NR
        - NU
        - NZ
        - OM
        - PA
        - PE
        - PF
        - PG
        - PH
        - PK
        - PL
        - PM
        - PN
        - PR
        - PS
        - PT
        - PW
        - PY
        - QA
        - RE
        - RO
        - RS
        - RU
        - RW
        - SA
        - SB
        - SC
        - SD
        - SE
        - SG
        - SH
        - SI
        - SJ
        - SK
        - SL
        - SM
        - SN
        - SO
        - SR
        - SS
        - ST
        - SV
        - SX
        - SY
        - SZ
        - TC
        - TD
        - TF
        - TG
        - TH
        - TJ
        - TK
        - TL
        - TM
        - TN
        - TO
        - TR
        - TT
        - TV
        - TW
        - TZ
        - UA
        - UG
        - UM
        - US
        - UY
        - UZ
        - VA
        - VC
        - VE
        - VG
        - VI
        - VN
        - VU
        - WF
        - WS
        - YE
        - YT
        - ZA
        - ZM
        - ZW
      title: >-
        ProvidersGetResponsesContentApplicationJsonSchemaDataItemsDatacentersItems
    ProvidersGetResponsesContentApplicationJsonSchemaDataItemsHeadquarters:
      type: string
      enum:
        - AD
        - AE
        - AF
        - AG
        - AI
        - AL
        - AM
        - AO
        - AQ
        - AR
        - AS
        - AT
        - AU
        - AW
        - AX
        - AZ
        - BA
        - BB
        - BD
        - BE
        - BF
        - BG
        - BH
        - BI
        - BJ
        - BL
        - BM
        - BN
        - BO
        - BQ
        - BR
        - BS
        - BT
        - BV
        - BW
        - BY
        - BZ
        - CA
        - CC
        - CD
        - CF
        - CG
        - CH
        - CI
        - CK
        - CL
        - CM
        - CN
        - CO
        - CR
        - CU
        - CV
        - CW
        - CX
        - CY
        - CZ
        - DE
        - DJ
        - DK
        - DM
        - DO
        - DZ
        - EC
        - EE
        - EG
        - EH
        - ER
        - ES
        - ET
        - FI
        - FJ
        - FK
        - FM
        - FO
        - FR
        - GA
        - GB
        - GD
        - GE
        - GF
        - GG
        - GH
        - GI
        - GL
        - GM
        - GN
        - GP
        - GQ
        - GR
        - GS
        - GT
        - GU
        - GW
        - GY
        - HK
        - HM
        - HN
        - HR
        - HT
        - HU
        - ID
        - IE
        - IL
        - IM
        - IN
        - IO
        - IQ
        - IR
        - IS
        - IT
        - JE
        - JM
        - JO
        - JP
        - KE
        - KG
        - KH
        - KI
        - KM
        - KN
        - KP
        - KR
        - KW
        - KY
        - KZ
        - LA
        - LB
        - LC
        - LI
        - LK
        - LR
        - LS
        - LT
        - LU
        - LV
        - LY
        - MA
        - MC
        - MD
        - ME
        - MF
        - MG
        - MH
        - MK
        - ML
        - MM
        - MN
        - MO
        - MP
        - MQ
        - MR
        - MS
        - MT
        - MU
        - MV
        - MW
        - MX
        - MY
        - MZ
        - NA
        - NC
        - NE
        - NF
        - NG
        - NI
        - NL
        - 'NO'
        - NP
        - NR
        - NU
        - NZ
        - OM
        - PA
        - PE
        - PF
        - PG
        - PH
        - PK
        - PL
        - PM
        - PN
        - PR
        - PS
        - PT
        - PW
        - PY
        - QA
        - RE
        - RO
        - RS
        - RU
        - RW
        - SA
        - SB
        - SC
        - SD
        - SE
        - SG
        - SH
        - SI
        - SJ
        - SK
        - SL
        - SM
        - SN
        - SO
        - SR
        - SS
        - ST
        - SV
        - SX
        - SY
        - SZ
        - TC
        - TD
        - TF
        - TG
        - TH
        - TJ
        - TK
        - TL
        - TM
        - TN
        - TO
        - TR
        - TT
        - TV
        - TW
        - TZ
        - UA
        - UG
        - UM
        - US
        - UY
        - UZ
        - VA
        - VC
        - VE
        - VG
        - VI
        - VN
        - VU
        - WF
        - WS
        - YE
        - YT
        - ZA
        - ZM
        - ZW
      description: ISO 3166-1 Alpha-2 country code of the provider headquarters
      title: ProvidersGetResponsesContentApplicationJsonSchemaDataItemsHeadquarters
    ProvidersGetResponsesContentApplicationJsonSchemaDataItems:
      type: object
      properties:
        datacenters:
          type:
            - array
            - 'null'
          items:
            $ref: >-
              #/components/schemas/ProvidersGetResponsesContentApplicationJsonSchemaDataItemsDatacentersItems
          description: >-
            ISO 3166-1 Alpha-2 country codes of the provider datacenter
            locations
        headquarters:
          oneOf:
            - $ref: >-
                #/components/schemas/ProvidersGetResponsesContentApplicationJsonSchemaDataItemsHeadquarters
            - type: 'null'
          description: ISO 3166-1 Alpha-2 country code of the provider headquarters
        name:
          type: string
          description: Display name of the provider
        privacy_policy_url:
          type:
            - string
            - 'null'
          description: URL to the provider's privacy policy
        slug:
          type: string
          description: URL-friendly identifier for the provider
        status_page_url:
          type:
            - string
            - 'null'
          description: URL to the provider's status page
        terms_of_service_url:
          type:
            - string
            - 'null'
          description: URL to the provider's terms of service
      required:
        - name
        - privacy_policy_url
        - slug
      title: ProvidersGetResponsesContentApplicationJsonSchemaDataItems
    Providers_listProviders_Response_200:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: >-
              #/components/schemas/ProvidersGetResponsesContentApplicationJsonSchemaDataItems
      required:
        - data
      title: Providers_listProviders_Response_200
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

```python
import requests

url = "https://openrouter.ai/api/v1/providers"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript
const url = 'https://openrouter.ai/api/v1/providers';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

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

	url := "https://openrouter.ai/api/v1/providers"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://openrouter.ai/api/v1/providers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://openrouter.ai/api/v1/providers")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://openrouter.ai/api/v1/providers', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://openrouter.ai/api/v1/providers");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://openrouter.ai/api/v1/providers")! as URL,
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