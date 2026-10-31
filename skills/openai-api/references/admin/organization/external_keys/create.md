## Add an external key config for an organization

**post** `/organization/external_keys`

Add an external key config for an organization

### Body Parameters

Content type: `application/json`

- `body: Aws { external_id, kms_arn, name, 3 more }  or Gcp { audience, kms_key_location, kms_key_name, 9 more }  or Azure { key_name, name, tenant_id, 4 more }`

  - `Aws object { external_id, kms_arn, name, 3 more }`

    - `external_id: string`

      The ExternalID that OpenAI will pass in the AssumeRole call for the customer's AWS account. This must be the OpenAI organization ID or an API project ID that belongs to the organization.

    - `kms_arn: string`

      The Key Management System ARN for the master key you manage

    - `name: string`

      A friendly name to identify this config

    - `role_arn: string`

      The Role ARN that OpenAI will assume to call your KMS

      `pattern: ^arn:aws:iam::\d{12}:role/.+$`

    - `type: "aws" (default: "aws")`

      - `"aws"`

    - `purpose: optional "ekm" or "psp_decryption"`

      - `"ekm"`

      - `"psp_decryption"`

  - `Gcp object { audience, kms_key_location, kms_key_name, 9 more }`

    - `audience: string`

      The aud field in the identity token OpenAI will pass in the call to the customer's GCP STS. This must be the OpenAI organization ID or an API project ID that belongs to the organization.

    - `kms_key_location: string`

      The region where your Key Management System master key is located

    - `kms_key_name: string`

      The name of the Key Management System master key you manage

    - `kms_key_ring_name: string`

      The Key Management System key ring for the master key you manage

    - `kms_project_id: string`

      The string GCP project name where your KMS resides

    - `name: string`

      A friendly name to identify this config

    - `type: "gcp" (default: "gcp")`

      - `"gcp"`

    - `workload_identity_pool_id: string`

      The pool containing the Workload Identity provider that you registered for OpenAI

    - `workload_identity_project_number: string`

      The numeric GCP project number where you registered OpenAI's workload identity

      `pattern: ^[0-9]{1,19}$`

    - `workload_identity_provider_id: string`

      The Workload Identity provider that you registered for OpenAI

    - `kms_key_version: optional string`

      An exact CryptoKeyVersion number. Required for PSP decryption; not accepted for EKM.

      `pattern: ^[1-9][0-9]*$`

    - `purpose: optional "ekm" or "psp_decryption"`

      - `"ekm"`

      - `"psp_decryption"`

  - `Azure object { key_name, name, tenant_id, 4 more }`

    - `key_name: string`

      The name of the Azure Key Vault master key that you manage

      `pattern: ^org-[0-9a-zA-Z-]*--[0-9a-zA-Z-]*$`, `maxLength: 127`

    - `name: string`

      A friendly name to identify this config

    - `tenant_id: string`

      Your Azure tenant UUID

      `pattern: ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`

    - `type: "azure" (default: "azure")`

      - `"azure"`

    - `vault_uri: string`

      The URI of the Azure vault containing the master key you manage

      `pattern: ^https://.+\.vault\.azure\.net/?$`

    - `key_version: optional string`

      An exact Azure Key Vault key version. Required for PSP decryption; not accepted for EKM.

      `pattern: ^[0-9a-fA-F]{32}$`

    - `purpose: optional "ekm" or "psp_decryption"`

      - `"ekm"`

      - `"psp_decryption"`

### Returns

- `ExternalKey object { id, api_project_ids, created_at, 21 more }`

  - `id: string`

  - `api_project_ids: array of string`

  - `created_at: integer`

  - `name: string`

  - `object: string`

  - `type: string`

  - `workspace_id: string`

  - `audience: optional string`

  - `external_id: optional string`

  - `key_name: optional string`

  - `key_version: optional string`

  - `kms_arn: optional string`

  - `kms_key_location: optional string`

  - `kms_key_name: optional string`

  - `kms_key_ring_name: optional string`

  - `kms_key_version: optional string`

  - `kms_project_id: optional string`

  - `purpose: optional "ekm" or "psp_decryption"`

    - `"ekm"`

    - `"psp_decryption"`

  - `role_arn: optional string`

  - `tenant_id: optional string`

  - `vault_uri: optional string`

  - `workload_identity_pool_id: optional string`

  - `workload_identity_project_number: optional string`

  - `workload_identity_provider_id: optional string`

### Example

```http
curl https://api.openai.com/v1/organization/external_keys \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
    -d '{
          "external_id": "external_id",
          "kms_arn": "kms_arn",
          "name": "name",
          "role_arn": "arn:aws:iam::732166991022:role/0*bWz\"J5bo7",
          "type": "aws"
        }'
```

#### 200 — Example

```json
{
  "id": "id",
  "api_project_ids": [
    "string"
  ],
  "created_at": 0,
  "name": "name",
  "object": "object",
  "type": "type",
  "workspace_id": "workspace_id",
  "audience": "audience",
  "external_id": "external_id",
  "key_name": "key_name",
  "key_version": "key_version",
  "kms_arn": "kms_arn",
  "kms_key_location": "kms_key_location",
  "kms_key_name": "kms_key_name",
  "kms_key_ring_name": "kms_key_ring_name",
  "kms_key_version": "kms_key_version",
  "kms_project_id": "kms_project_id",
  "purpose": "ekm",
  "role_arn": "role_arn",
  "tenant_id": "tenant_id",
  "vault_uri": "vault_uri",
  "workload_identity_pool_id": "workload_identity_pool_id",
  "workload_identity_project_number": "workload_identity_project_number",
  "workload_identity_provider_id": "workload_identity_provider_id"
}
```
