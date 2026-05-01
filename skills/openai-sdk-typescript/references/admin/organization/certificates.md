# Certificates

## List organization certificates

`client.admin.organization.certificates.list(CertificateListParamsquery?, RequestOptionsoptions?): ConversationCursorPage<Certificate>`

**get** `/organization/certificates`

List uploaded certificates for this organization.

### Parameters

- `query: CertificateListParams`

  - `after?: string`

    A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificate of client.admin.organization.certificates.list()) {
  console.log(certificate.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "certificate_details": {
        "content": "content",
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "certificate",
      "active": true
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "cert_abc",
  "last_id": "cert_abc"
}
```

## Upload certificate

`client.admin.organization.certificates.create(CertificateCreateParamsbody, RequestOptionsoptions?): Certificate`

**post** `/organization/certificates`

Upload a certificate to the organization. This does **not** automatically activate the certificate.

Organizations can upload up to 50 certificates.

### Parameters

- `body: CertificateCreateParams`

  - `content: string`

    The certificate content in PEM format

  - `name?: string`

    An optional name for the certificate

### Returns

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const certificate = await client.admin.organization.certificates.create({ content: 'content' });

console.log(certificate.id);
```

#### Response

```json
{
  "id": "id",
  "certificate_details": {
    "content": "content",
    "expires_at": 0,
    "valid_at": 0
  },
  "created_at": 0,
  "name": "name",
  "object": "certificate",
  "active": true
}
```

## Get certificate

`client.admin.organization.certificates.retrieve(stringcertificateID, CertificateRetrieveParamsquery?, RequestOptionsoptions?): Certificate`

**get** `/organization/certificates/{certificate_id}`

Get a certificate that has been uploaded to the organization.

You can get a certificate regardless of whether it is active or not.

### Parameters

- `certificateID: string`

- `query: CertificateRetrieveParams`

  - `include?: Array<"content">`

    A list of additional fields to include in the response. Currently the only supported value is `content` to fetch the PEM content of the certificate.

    - `"content"`

### Returns

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const certificate = await client.admin.organization.certificates.retrieve('certificate_id');

console.log(certificate.id);
```

#### Response

```json
{
  "id": "id",
  "certificate_details": {
    "content": "content",
    "expires_at": 0,
    "valid_at": 0
  },
  "created_at": 0,
  "name": "name",
  "object": "certificate",
  "active": true
}
```

## Modify certificate

`client.admin.organization.certificates.update(stringcertificateID, CertificateUpdateParamsbody, RequestOptionsoptions?): Certificate`

**post** `/organization/certificates/{certificate_id}`

Modify a certificate. Note that only the name can be modified.

### Parameters

- `certificateID: string`

- `body: CertificateUpdateParams`

  - `name: string`

    The updated name for the certificate

### Returns

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const certificate = await client.admin.organization.certificates.update('certificate_id', {
  name: 'name',
});

console.log(certificate.id);
```

#### Response

```json
{
  "id": "id",
  "certificate_details": {
    "content": "content",
    "expires_at": 0,
    "valid_at": 0
  },
  "created_at": 0,
  "name": "name",
  "object": "certificate",
  "active": true
}
```

## Delete certificate

`client.admin.organization.certificates.delete(stringcertificateID, RequestOptionsoptions?): CertificateDeleteResponse`

**delete** `/organization/certificates/{certificate_id}`

Delete a certificate from the organization.

The certificate must be inactive for the organization and all projects.

### Parameters

- `certificateID: string`

### Returns

- `CertificateDeleteResponse`

  - `id: string`

    The ID of the certificate that was deleted.

  - `object: "certificate.deleted"`

    The object type, must be `certificate.deleted`.

    - `"certificate.deleted"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

const certificate = await client.admin.organization.certificates.delete('certificate_id');

console.log(certificate.id);
```

#### Response

```json
{
  "id": "id",
  "object": "certificate.deleted"
}
```

## Activate certificates for organization

`client.admin.organization.certificates.activate(CertificateActivateParamsbody, RequestOptionsoptions?): Page<Certificate>`

**post** `/organization/certificates/activate`

Activate certificates at the organization level.

You can atomically and idempotently activate up to 10 certificates at a time.

### Parameters

- `body: CertificateActivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificate of client.admin.organization.certificates.activate({
  certificate_ids: ['cert_abc'],
})) {
  console.log(certificate.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "certificate_details": {
        "content": "content",
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "certificate",
      "active": true
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "cert_abc",
  "last_id": "cert_abc"
}
```

## Deactivate certificates for organization

`client.admin.organization.certificates.deactivate(CertificateDeactivateParamsbody, RequestOptionsoptions?): Page<Certificate>`

**post** `/organization/certificates/deactivate`

Deactivate certificates at the organization level.

You can atomically and idempotently deactivate up to 10 certificates at a time.

### Parameters

- `body: CertificateDeactivateParams`

  - `certificate_ids: Array<string>`

### Returns

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  adminAPIKey: process.env['OPENAI_ADMIN_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const certificate of client.admin.organization.certificates.deactivate({
  certificate_ids: ['cert_abc'],
})) {
  console.log(certificate.id);
}
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "certificate_details": {
        "content": "content",
        "expires_at": 0,
        "valid_at": 0
      },
      "created_at": 0,
      "name": "name",
      "object": "certificate",
      "active": true
    }
  ],
  "has_more": true,
  "object": "list",
  "first_id": "cert_abc",
  "last_id": "cert_abc"
}
```

## Domain Types

### Certificate

- `Certificate`

  Represents an individual `certificate` uploaded to the organization.

  - `id: string`

    The identifier, which can be referenced in API endpoints

  - `certificate_details: CertificateDetails`

    - `content?: string`

      The content of the certificate in PEM format.

    - `expires_at?: number`

      The Unix timestamp (in seconds) of when the certificate expires.

    - `valid_at?: number`

      The Unix timestamp (in seconds) of when the certificate becomes valid.

  - `created_at: number`

    The Unix timestamp (in seconds) of when the certificate was uploaded.

  - `name: string`

    The name of the certificate.

  - `object: "certificate" | "organization.certificate" | "organization.project.certificate"`

    The object type.

    - If creating, updating, or getting a specific certificate, the object type is `certificate`.
    - If listing, activating, or deactivating certificates for the organization, the object type is `organization.certificate`.
    - If listing, activating, or deactivating certificates for a project, the object type is `organization.project.certificate`.

    - `"certificate"`

    - `"organization.certificate"`

    - `"organization.project.certificate"`

  - `active?: boolean`

    Whether the certificate is currently active at the specified scope. Not returned when getting details for a specific certificate.

### Certificate Delete Response

- `CertificateDeleteResponse`

  - `id: string`

    The ID of the certificate that was deleted.

  - `object: "certificate.deleted"`

    The object type, must be `certificate.deleted`.

    - `"certificate.deleted"`
