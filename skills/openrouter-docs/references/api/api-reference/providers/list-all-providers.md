> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# List all providers



## OpenAPI

````yaml /openapi/openapi.yaml get /providers
openapi: 3.1.0
info:
  contact:
    email: support@openrouter.ai
    name: OpenRouter Support
    url: https://openrouter.ai/docs
  description: OpenAI-compatible API with additional OpenRouter features
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
  title: OpenRouter API
  version: 1.0.0
servers:
  - description: Production server
    url: https://openrouter.ai/api/v1
    x-speakeasy-server-id: production
security:
  - apiKey: []
tags:
  - description: API key management endpoints
    name: API Keys
  - description: Analytics and usage endpoints
    name: Analytics
  - description: Anthropic Messages endpoints
    name: Anthropic Messages
  - description: BYOK endpoints
    name: BYOK
  - description: Benchmarks endpoints
    name: Benchmarks
  - description: Chat completion endpoints
    name: Chat
  - description: Task classification market-share endpoints
    name: Classifications
  - description: Credit management endpoints
    name: Credits
  - description: Datasets endpoints
    name: Datasets
  - description: Text embedding endpoints
    name: Embeddings
  - description: Endpoint information
    name: Endpoints
  - description: Files endpoints
    name: Files
  - description: Generation history endpoints
    name: Generations
  - description: Guardrails endpoints
    name: Guardrails
  - description: Images endpoints
    name: Images
  - description: Model information endpoints
    name: Models
  - description: OAuth authentication endpoints
    name: OAuth
  - description: Observability endpoints
    name: Observability
  - description: Organization endpoints
    name: Organization
  - description: Presets endpoints
    name: Presets
  - description: Provider information endpoints
    name: Providers
  - description: Rerank endpoints
    name: Rerank
  - description: OpenAI-compatible Responses API endpoints
    name: Responses
  - description: SCIM endpoints
    name: SCIM
  - description: Speech-to-text endpoints
    name: STT
    x-displayName: Transcriptions
  - description: Text-to-speech endpoints
    name: TTS
    x-displayName: Speech
  - description: Video Generation endpoints
    name: Video Generation
  - description: Workspaces endpoints
    name: Workspaces
  - description: beta.Analytics endpoints
    name: beta.Analytics
externalDocs:
  description: OpenRouter Documentation
  url: https://openrouter.ai/docs
paths:
  /providers:
    get:
      tags:
        - Providers
      summary: List all providers
      operationId: listProviders
      responses:
        '200':
          content:
            application/json:
              example:
                data:
                  - datacenters:
                      - US
                      - IE
                    headquarters: US
                    name: OpenAI
                    privacy_policy_url: https://openai.com/privacy
                    slug: openai
                    status_page_url: https://status.openai.com
                    terms_of_service_url: https://openai.com/terms
              schema:
                example:
                  data:
                    - datacenters:
                        - US
                        - IE
                      headquarters: US
                      name: OpenAI
                      privacy_policy_url: https://openai.com/privacy
                      slug: openai
                      status_page_url: https://status.openai.com
                      terms_of_service_url: https://openai.com/terms
                properties:
                  data:
                    items:
                      example:
                        datacenters:
                          - US
                          - IE
                        headquarters: US
                        name: OpenAI
                        privacy_policy_url: https://openai.com/privacy
                        slug: openai
                        status_page_url: https://status.openai.com
                        terms_of_service_url: https://openai.com/terms
                      properties:
                        datacenters:
                          description: >-
                            ISO 3166-1 Alpha-2 country codes of the provider
                            datacenter locations
                          example:
                            - US
                            - IE
                          items:
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
                            type: string
                          type:
                            - array
                            - 'null'
                        headquarters:
                          description: >-
                            ISO 3166-1 Alpha-2 country code of the provider
                            headquarters
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
                            - null
                          example: US
                          type:
                            - string
                            - 'null'
                        name:
                          description: Display name of the provider
                          example: OpenAI
                          type: string
                        privacy_policy_url:
                          description: URL to the provider's privacy policy
                          example: https://openai.com/privacy
                          type:
                            - string
                            - 'null'
                        slug:
                          description: URL-friendly identifier for the provider
                          example: openai
                          type: string
                        status_page_url:
                          description: URL to the provider's status page
                          example: https://status.openai.com
                          type:
                            - string
                            - 'null'
                        terms_of_service_url:
                          description: URL to the provider's terms of service
                          example: https://openai.com/terms
                          type:
                            - string
                            - 'null'
                      required:
                        - name
                        - slug
                        - privacy_policy_url
                      type: object
                    type: array
                required:
                  - data
                type: object
          description: Returns a list of providers
        '500':
          content:
            application/json:
              example:
                error:
                  code: 500
                  message: Internal Server Error
              schema:
                $ref: '#/components/schemas/InternalServerResponse'
          description: Internal Server Error - Unexpected server error
components:
  schemas:
    InternalServerResponse:
      description: Internal Server Error - Unexpected server error
      example:
        error:
          code: 500
          message: Internal Server Error
      properties:
        error:
          $ref: '#/components/schemas/InternalServerResponseErrorData'
        openrouter_metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
        user_id:
          type:
            - string
            - 'null'
      required:
        - error
      type: object
    InternalServerResponseErrorData:
      description: Error data for InternalServerResponse
      example:
        code: 500
        message: Internal Server Error
      properties:
        code:
          type: integer
        message:
          type: string
        metadata:
          additionalProperties: {}
          type:
            - object
            - 'null'
      required:
        - code
        - message
      type: object
  securitySchemes:
    apiKey:
      description: API key as bearer token in Authorization header
      scheme: bearer
      type: http

````