# ZDR with Private Safety Processing

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

li+li]:mt-2! [&_ul>li>p]:my-0! [&_#built-with-three-principles+ol>li+li]:mt-2! [&_#check-storage-status]:mt-0!">

Zero Data Retention with Private Safety Processing (ZDR with PSP) enables offline, automated safety review without OpenAI retaining customer prompts or responses. This guide provides an overview of how ZDR with PSP works and your operating responsibilities. For the full architecture and security model, see the [Private Safety Processing technical white paper](https://openaiassets.blob.core.windows.net/$web/pdf/c7284810-2252-462f-803e-075b0c95bccb/psp-whitepaper.pdf).

## Built with Three Principles

1. **Customers control their content**

   Customer content is stored in customer-controlled storage. Customers control the permissions and customer-managed Enterprise Key Management (EKM) authorization required to retrieve and decrypt protected safety records.
2. **No human review**

   Safety review must not create a new way for OpenAI personnel to read protected customer content. Encrypted customer content is decrypted in an approved, hardware-attested safety runtime that disables human access. Only bounded safety signals and operational metadata leave the PSP protected review in plaintext.
3. **Content retention for safety only**

   Content stored in customer-controlled storage serves only approved safety purposes. Customer content cannot be used to train models or be made available to other groups within OpenAI or its partners.

## How ZDR with PSP Works

The architecture consists of two flows:

- The API Request and Retention flow protects and retains eligible API content in a customer-controlled storage container.
- The Asynchronous Safety Pipeline retrieves records only for approved automated safety review and releases bounded safety decisions.

### API Request and Retention

An interaction - your prompt and the model’s response - is selected through a safety classifier referral or an approved sampling policy. A referral does not establish a policy violation.

The system encrypts the record and writes it to your regional cloud storage. OpenAI keeps an index with operational metadata and a storage reference, not a copy of the content. Encryption and storage run asynchronously without blocking inference.




![API request flow showing encrypted safety records stored in customer-controlled storage.](https://developers.openai.com/images/platform/guides/private-safety-processing/main-01-data-protection.webp)







![API request flow showing encrypted safety records stored in customer-controlled storage.](https://developers.openai.com/images/platform/guides/private-safety-processing/main-01-data-protection-dark.webp)







### Asynchronous Safety Pipeline

ZDR with PSP retrieves encrypted records from your storage and checks their ability to be decrypted. The Safety Review Runtime, a hardware-attested computing environment that disables human access, is designed to be the only OpenAI workload that can decrypt customer content. It performs automated safety review using an approved reviewer prompt and output schema that does not expose customer content.

Only predefined, bounded safety signals and approved operational metadata may leave the review in plaintext. Detailed results are encrypted before leaving the runtime and stored in your cloud storage with the original record’s expiration. ZDR with PSP encrypts the records and writes them to your regional cloud storage with a TTL of 30 days.




![Asynchronous safety-review flow showing encrypted record retrieval, protected review, and bounded outputs.](https://developers.openai.com/images/platform/guides/private-safety-processing/main-02-automated-safety-review.webp)







![Asynchronous safety-review flow showing encrypted record retrieval, protected review, and bounded outputs.](https://developers.openai.com/images/platform/guides/private-safety-processing/main-02-automated-safety-review-dark.webp)




## Customer Content Encryption

Each stored record is doubly encrypted when it is retained in customer storage:

- **OpenAI-managed HPKE encryption:** The inner encryption layer restricts decryption of customer content to the authorized Safety Review Runtime.
- **Customer-managed encryption:** [Enterprise Key Management (EKM)](https://help.openai.com/en/articles/20000943-openai-enterprise-key-management-ekm-overview) adds an outer layer using your customer-controlled key-management service.

OpenAI’s inner decryption key is not enough to decrypt a stored record when EKM is enabled: your customer-managed key authorization is also required. Revoking that authorization prevents decryption of retained records, but does not delete them or undo completed processing.

We recommend enabling EKM for this additional control. See the [EKM technical FAQ](https://help.openai.com/en/articles/20000945-ekm-technical-faq) for authorization and revocation, and the [technical whitepaper](https://openaiassets.blob.core.windows.net/$web/pdf/c7284810-2252-462f-803e-075b0c95bccb/psp-whitepaper.pdf) for encryption, confidential computing, guardrails, and transparency.



<a id="psp-decryption"></a>



### PSP decryption



PSP decryption lets you decrypt customer content in PSP records stored in your connected cloud storage using an asymmetric key that you control. OpenAI uses the public key, while the private key stays in your cloud key-management service. This is separate from EKM and doesn't grant OpenAI personnel access to your content.

See [Set up asymmetric keys](https://developers.openai.com/api/docs/guides/asymmetric-keys) for AWS KMS, Azure Key Vault, and Google Cloud KMS setup and key registration. Confirm PSP decryption availability and activation with your OpenAI contact. Registering a key doesn't enable PSP or configure storage, and only records written with PSP decryption enabled for your key can be decrypted with that key. Existing records aren't converted.

For the decryption steps, record format, and key derivation, see [Decrypt PSP records](https://developers.openai.com/api/docs/guides/psp-decryption).



<a id="select-a-key-for-psp-decryption"></a>



#### Select a key for PSP decryption



Use an [organization Admin API key](https://developers.openai.com/api/docs/guides/admin-apis) with project read/write access. Load it securely as `OPENAI_ADMIN_KEY`; project inference keys won't work. The examples use `curl` and a Bash-compatible shell.

Set your organization ID, project ID, and the `extkey` ID returned when you registered the key:

```bash
API_BASE="https://api.openai.com/v1"
ORG_ID="<OPENAI_ORG_ID>"
PROJECT_ID="<CUSTOMER_PROJECT_ID>"
KEY_ID="<EXTERNAL_KEY_ID>"

: "${OPENAI_ADMIN_KEY:?Load your organization admin key securely}"

PROJECTS_URL="$API_BASE/organization/projects"
```

Set `psp_decryption_key_id` to the returned `extkey` ID from the same organization. Leave `external_key_id`, which selects the project's EKM key, unchanged.

```bash
curl --fail-with-body -sS "$PROJECTS_URL/$PROJECT_ID" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $ORG_ID" \
  -H "Content-Type: application/json" \
  --data "{\"psp_decryption_key_id\":\"$KEY_ID\"}"
```

Success returns HTTP 200. Read the project to confirm the selection:

```bash
curl --fail-with-body -sS "$PROJECTS_URL/$PROJECT_ID" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $ORG_ID"
```

Project lists also return `psp_decryption_key_id`. The registration's `api_project_ids` shows its projects. Omitting `psp_decryption_key_id` preserves the selection; selecting the same ID again is supported.







<a id="clear-the-key-selection"></a>



#### Clear the key selection



First set the API variables shown in [Select a key for PSP decryption](#select-a-key-for-psp-decryption).

Send `null` to clear the selection. Omitting the field leaves it unchanged. Repeating a clear is supported.

```bash
curl --fail-with-body -sS "$PROJECTS_URL/$PROJECT_ID" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $ORG_ID" \
  -H "Content-Type: application/json" \
  --data '{"psp_decryption_key_id":null}'
```











<a id="customer-storage-setup-steps"></a>



<a id="set-up-and-verify-customer-storage"></a>



## Set Up and Verify Storage



Connect your own AWS S3 bucket, Azure Blob container, Google Cloud Storage bucket, or Oracle Cloud Infrastructure (OCI) Object Storage bucket to an OpenAI project. Follow the setup steps for your cloud, then register and validate the connection.

ZDR with PSP is enabled per project. Once enabled, the PSP policy applies to all API traffic in that project, including requests to models that do not otherwise require PSP. To use ZDR without PSP for eligible models, send those requests through a separate project configured for ZDR without PSP.

### Before you start

- Organizations already approved for Zero Data Retention can set up ZDR with PSP directly in the API console. If your organization isn't approved for ZDR, see the [eligibility and approval requirements](https://developers.openai.com/api/docs/guides/your-data#data-retention-controls-for-abuse-monitoring).
- Choose a storage region that matches your project's data residency. You need permission to create storage and delegate access in your cloud account.
- Have an organization administrator register and validate storage in the API console. For the Management API, use an OpenAI organization Admin API key. Project administrators can view guidance and status; a project inference key won't work for the Management API calls.

### Open storage setup in the API console

1. Open **Organization settings > Data controls > Data retention**, then select **Connect storage**.
2. In **Connect external storage**, choose **AWS**, **Azure**, **GCP**, or **OCI** and select your project. You can also open **Connect storage** from **Project Settings > Data retention**.
3. Complete the cloud setup below. Then enter your storage details in the modal and select **Connect and validate**.

### Cloud-specific Setups



<a id="aws-s3"></a>



#### AWS S3



Complete these steps if you're using AWS. For other clouds, skip to **Azure Blob Storage**, **Google Cloud Storage**, or **OCI Object Storage**.

<figure>
  <video
    controls
    playsInline
    preload="metadata"
    poster="/images/platform/guides/private-safety-processing/aws-onboarding-poster.webp"
    aria-label="AWS onboarding walkthrough for ZDR with Private Safety Processing"
    aria-describedby="aws-onboarding-video-description"
    style={{ width: "100%", height: "auto" }}
  >
    <source
      src="https://cdn.openai.com/devhub/docs/api/private-safety-processing/psp-onboarding-2026-10-07.webm"
      type="video/webm"
    />
    Your browser doesn't support this video. Follow the written steps below.
  </video>
  <figcaption id="aws-onboarding-video-description">
    AWS onboarding walkthrough (2 min 10 sec, no audio). Follow the written
    steps below for configuration values.
  </figcaption>
</figure>

#### 1. Create the bucket

Create a dedicated S3 bucket in a region compatible with your project's data residency. If Data Residency is off, the recommended region is us-west-1.

- Keep **ACLs disabled**.
- Turn on **Block all Public Access**.
- Record the bucket ARN. You'll use it as `CUSTOMER_BUCKET_ARN` below.

![AWS S3 bucket Properties page showing the bucket overview, AWS Region, and Amazon Resource Name.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-01-aws-create-bucket.webp)

#### 2. Set the lifecycle rule

Open the bucket's **Management > Create lifecycle rule** page and use these settings:

- **Rule name:** `psp-retention`
- **Prefix:** `openai/`
- **Action:** Expire current versions of objects
- **Age:** 30 days

Enable the rule. Make sure no other rule expires these records earlier. This sets the objects' lifecycle expiration; OpenAI's decryption-key expiration is separate.

![AWS S3 Management page showing Lifecycle configuration, one lifecycle rule, and the Create lifecycle rule control.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-02-aws-lifecycle-rule.webp)

#### 3. Create the access policy

In **IAM > Policies > Create policy**, choose **JSON**. Replace `CUSTOMER_BUCKET_ARN` with your bucket ARN, for example `arn:aws:s3:::your-psp-bucket`, and save the policy as `psp-bucket-policy`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetLifecycleConfiguration",
      "Resource": "CUSTOMER_BUCKET_ARN"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "CUSTOMER_BUCKET_ARN/*"
    }
  ]
}
```

#### 4. Create the IAM role

In **IAM > Roles > Create role**, choose **Custom trust policy**.

![AWS IAM Select trusted entity page with Custom trust policy selected.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-03-aws-custom-trust-policy.webp)

Use the policy below. Replace `CUSTOMER_PROJECT_ID` with your OpenAI project ID. Leave the OpenAI principal ARN unchanged.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::790389265272:role/CustomerStorage"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": ["CUSTOMER_PROJECT_ID"]
        }
      }
    }
  ]
}
```

Attach `psp-bucket-policy` to the role you are creating. You can name the role `psp-role`. Record its ARN as `CUSTOMER_ROLE_ARN`; the project ID in `sts:ExternalId` must match the project you register.

![AWS IAM Add permissions page with Use existing policy selected and the customer-managed psp-bucket-policy checked.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-04-aws-iam-role.webp)

Continue to **Register your storage**.







<a id="azure-blob-storage"></a>



#### Azure Blob Storage



Complete these steps if you're using Azure.

#### 1. Create the storage account

Create a dedicated account in commercial Azure. Choose an approved US or EU storage region that matches your project's data residency.

- **Account kind:** `StorageV2`
- **Basics > Performance:** Standard
- **Basics > Redundancy:** LRS or ZRS (preferred)
- **Advanced > Access tier:** Hot
- **Advanced > Hierarchical namespace:** Disabled
- **Networking > Public network access:** Enabled from all networks
- **Security > Secure transfer:** HTTPS required; minimum TLS 1.2
- **Security > Anonymous Blob access:** Disabled
- **Security > Storage account key access:** Disabled
- **Security > Microsoft Entra Authorization:** Enabled

Confirm the network setting meets your cloud requirements. Use the account's primary Blob endpoint, not a sovereign-cloud or custom endpoint.

![Azure storage-account Public access settings with public network access enabled from all networks.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-10-azure-public-access.webp)

![Azure storage-account Security settings with secure transfer and Microsoft Entra authorization enabled, anonymous access and storage-account key access disabled, and minimum TLS 1.2.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-11-azure-security-settings.webp)

#### 2. Create the container

Create a private container in **Storage Account > Data Storage > Containers > Add Container**. Add this container metadata in **Container > Settings > Metadata** with your exact OpenAI organization ID:

- `openai_organization_id`: your OpenAI organization ID

Add the metadata to the container, not the storage account or individual blobs.

#### 3. Set the lifecycle rule

Add an enabled rule in **Storage Account > Data Management > Lifecycle management > Add** that applies to all current/base block blobs in the dedicated account:

- **Action:** Delete after 30 days since last modification
- **Filters:** No prefix or tag filter

![Azure lifecycle-rule Details with the rule applied to all blobs and Block blobs and Base blobs selected.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-12-azure-lifecycle-scope.webp)

![Azure lifecycle-rule Base blobs settings that delete blobs after 30 days without modification.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-13-azure-lifecycle-delete.webp)

#### 4. Grant OpenAI access

Ask your directory administrator to add OpenAI's application to your tenant. Replace `CUSTOMER_TENANT_ID` below with your Azure tenant ID. Leave the application ID unchanged.

```bash
az login --tenant '<CUSTOMER_TENANT_ID>'
az ad sp create --id 'e5627955-3059-4a88-89f8-73843190624d' \
  --query '{name:displayName,objectId:id}' -o table
```

If the application already exists, use `az ad sp show` with the same `--id` and query. Record the application name and its tenant-local object ID.

Open **Storage Account > Access control (IAM) > Add role assignment** on your storage account. Select the **Reader** role, set **Assign access to** **User, group, or service principal**, then search for and select **CSG - Azure Blob Storage Prod**.

![Azure role-assignment Members tab showing the Storage Blob Data Reader role and User, group, or service principal selected.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-14-azure-role-members.webp)

![Azure Select members pane with CSG - Azure Blob Storage Prod listed as an application.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-15-azure-select-application.webp)

Then select the **Storage Blob Data Contributor** role, set **Assign access to** **User, group, or service principal**, and search for and select **CSG - Azure Blob Storage Prod**.

OpenAI manages the application credentials. Don't create or share a storage key, SAS token, or client secret.







<a id="google-cloud-storage"></a>



#### Google Cloud Storage



#### 1. Create the bucket

Create a bucket in **Cloud Storage > Buckets** in a location compatible with your OpenAI project's data residency, with:

- **Public access prevention**: On.
- **Access control**: Uniform.

You can optionally disable the default **Soft delete policy (For data recovery)**; the next step configures lifecycle deletion.

For Global projects, repeat this GCP setup for each region you intend to use.

![Google Cloud bucket access settings showing Public access prevention On, Access control Uniform, and IP filtering Not configured.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-gcp-bucket-access-controls.webp)

#### 2. Set the lifecycle rule

In your bucket's **Lifecycle** tab, add a **Delete object** rule with these conditions:

- **Object name matches prefix**: `openai/`.
- **Age**: 30 days.

![Google Cloud lifecycle rule showing Delete object, the openai/ object prefix, and Age 30.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-gcp-lifecycle-rule.webp)

#### 3. Find your Google Cloud project number

In **IAM & Admin > Settings**, copy the numeric **Project number** for the project containing your workload identity pool as `<CUSTOMER_GCP_PROJECT_NUMBER>`.

#### 4. Create the workload identity pool and provider

In **IAM & Admin > Workload Identity Federation**, create a workload identity pool and add an **OpenID Connect (OIDC)** provider with:

- **Issuer (URL)**: `https://accounts.google.com`.
- **Allowed audiences**: `<CUSTOMER_PROJECT_ID>` (your OpenAI project ID).

![Google Cloud OIDC provider setup showing the Google issuer URL and an OpenAI project ID as the allowed audience.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-gcp-oidc-provider.webp)

Configure these attribute mappings:

| Google attribute           | OIDC value      |
| -------------------------- | --------------- |
| `google.subject`           | `assertion.sub` |
| `attribute.openai_project` | `assertion.aud` |

Set the attribute condition below. **Keep OpenAI's production identity subject `112981926705442324573` unchanged.**

```text
assertion.sub == '112981926705442324573' && assertion.aud == '<CUSTOMER_PROJECT_ID>'
```

![Google Cloud provider attributes mapping google.subject to assertion.sub and attribute.openai_project to assertion.aud, with the condition restricting the OpenAI production subject and project audience.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-gcp-provider-attributes.webp)

Record the pool and provider IDs as `<CUSTOMER_GCP_POOL_ID>` and `<CUSTOMER_GCP_PROVIDER_ID>`.

**Multiple OpenAI projects**

For projects belonging to the same customer, you can reuse the pool and provider. Add each project ID to **Allowed audiences** and update the attribute condition:

```text
assertion.sub == '112981926705442324573' &&
(assertion.aud == '<CUSTOMER_PROJECT_ID_1>' || assertion.aud == '<CUSTOMER_PROJECT_ID_2>')
```

Complete the bucket grant and storage registration for each project separately.

#### 5. Create the custom storage role

In **IAM & Admin > Roles**, create a custom role in the bucket's Google Cloud project with these permissions:

```text
storage.buckets.get
storage.objects.create
storage.objects.get
storage.objects.delete
```

#### 6. Grant OpenAI access to the bucket

In your bucket's **Permissions > Grant access**, add this principal:

```text
principalSet://iam.googleapis.com/projects/<CUSTOMER_GCP_PROJECT_NUMBER>/locations/global/workloadIdentityPools/<CUSTOMER_GCP_POOL_ID>/attribute.openai_project/<CUSTOMER_PROJECT_ID>
```

Select the custom role you created in step 5.

![Google Cloud bucket access form with the OpenAI project principal set and the custom storage role selected.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-gcp-bucket-access.webp)

Continue to **Register your storage**.







<a id="oci-object-storage"></a>



#### OCI Object Storage



#### 1. Create the bucket

In the OCI Console, open **Storage > Object Storage & Archive Storage > Buckets** and create a dedicated bucket. Choose a commercial region from this table that matches your project's data residency:

| Geography | Supported OCI regions                                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US        | `us-ashburn-1`, `us-chicago-1`, `us-phoenix-1`, `us-sanjose-1`                                                                                                |
| EU        | `eu-amsterdam-1`, `eu-frankfurt-1`, `eu-madrid-1`, `eu-madrid-3`, `eu-marseille-1`, `eu-milan-1`, `eu-paris-1`, `eu-stockholm-1`, `eu-turin-1`, `eu-zurich-1` |

Use these bucket settings:

- **Storage tier:** Standard
- **Visibility:** Private
- **Object versioning:** Disabled
- **Auto-tiering:** Disabled

Keep replication disabled. Record the bucket name and region identifier as `CUSTOMER_BUCKET_NAME` and `CUSTOMER_OCI_REGION`. Open **Profile**, select **Tenancy** followed by your tenancy's name, and copy its OCID as `CUSTOMER_TENANCY_OCID`. Your tenancy must be subscribed to the bucket's region.

#### 2. Add the bucket tags

Add these tags during bucket creation, or open the bucket's **Tags** tab and select **Add**. Set **Namespace** to **None (freeform tag)** and use your exact OpenAI organization and project IDs:

| Key                      | Value                 |
| ------------------------ | --------------------- |
| `openai_organization_id` | `CUSTOMER_ORG_ID`     |
| `openai_project_id`      | `CUSTOMER_PROJECT_ID` |

Use the same IDs in the access policy and storage registration. Each bucket is bound to one OpenAI organization and project.

![OCI bucket creation form showing the openai_organization_id and openai_project_id freeform tags with example values.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-oci-bucket-tags.webp)

#### 3. Grant OpenAI access

In **Identity & Security > Policies**, select your tenancy's root compartment and create a policy named `psp-storage-access`. Turn on **Show manual editor** and enter these statements with your bucket name, region, and OpenAI organization and project IDs in the `CUSTOMER_...` placeholders. Keep OpenAI's tenancy and group OCIDs unchanged.

```text
Define tenancy OpenAICSG as ocid1.tenancy.oc1..aaaaaaaa4kzwe5jdr4gsxft7dfnwbnp3aozhxeskabsqo7czdkbp6fkh3uha
Define group OpenAICSGProduction as ocid1.group.oc1..aaaaaaaanuot5i5kooasr6qh6qo4ohqljrrxx3javkl2tkedb7ljsluq62sa
Admit group OpenAICSGProduction of tenancy OpenAICSG to {OBJECTSTORAGE_NAMESPACE_READ} in tenancy
Admit group OpenAICSGProduction of tenancy OpenAICSG to {BUCKET_READ} in tenancy where target.bucket.name = 'CUSTOMER_BUCKET_NAME'
Admit group OpenAICSGProduction of tenancy OpenAICSG to {OBJECT_READ, OBJECT_CREATE, OBJECT_OVERWRITE} in tenancy where all {target.bucket.name = 'CUSTOMER_BUCKET_NAME', target.object.name = 'openai/CUSTOMER_ORG_ID/CUSTOMER_PROJECT_ID/*'}
Allow service objectstorage-CUSTOMER_OCI_REGION to {BUCKET_INSPECT, BUCKET_READ, OBJECT_INSPECT, OBJECT_DELETE} in tenancy where target.bucket.name = 'CUSTOMER_BUCKET_NAME'
```

The policy lets OpenAI look up your Object Storage namespace, read bucket configuration, and read and write objects under your project's prefix. Namespace lookup requires the tenancy-level permission without a bucket condition. The last statement lets Oracle's regional Object Storage service delete expired objects; for Ashburn, the service name is `objectstorage-us-ashburn-1`.

Save the policy. OpenAI manages its credentials; you don't need to create or share an API signing key or access key.

#### 4. Set the lifecycle rule

Open the bucket's **Policies** tab. Under **Lifecycle policy rules**, select **Create rule** and use these settings:

- **Name:** `psp-retention`
- **Target:** Objects
- **Lifecycle action:** Delete
- **Number of days:** 30

![OCI lifecycle rule form showing the psp-retention rule with Objects as the target and deletion after 30 days.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-oci-lifecycle-rule.webp)

Expand **Advanced options** and keep **State** set to **Enabled**. Under **Object name filters**, select **Add filter**, choose **Include by prefix**, and enter `openai/CUSTOMER_ORG_ID/CUSTOMER_PROJECT_ID/`, including the trailing slash.

![OCI lifecycle advanced options showing Enabled state and an Include by prefix filter for the OpenAI organization and project.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-oci-lifecycle-prefix.webp)

Save the rule. If OCI offers to add lifecycle permissions automatically, keep the bucket-scoped grant from step 3. Make sure no other rule deletes these objects earlier or moves them to Archive storage. A retention rule doesn't replace the lifecycle deletion rule.

Continue to **Register your storage**.





### Register your storage

After completing the cloud setup above, use either the API console or the Management API to register and validate your storage. You only need to use one method.

#### Option 1: API console

Sign in as an organization administrator. The API console uses your signed-in session; you don't need an Admin API key or curl commands for this method.

##### 1. Open Connect storage

Open **Organization settings > Data controls > Data retention** and select **Connect storage**. You can also connect from **Project Settings > Data retention**.

![OpenAI organization Data controls page showing the Data retention tab, project policy table, and Connect storage control.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-06-platform-open-storage.webp)

##### 2. Enter your storage details

Choose **AWS**, **Azure**, **GCP**, or **OCI**, then select the project. If you opened the modal from project settings, that project is already selected. If **Registered storage** appears, choose **Connect new storage** to add a destination.

For **AWS**, enter the **Bucket ARN** and **IAM role ARN** from your cloud setup.

<img src="https://developers.openai.com/images/platform/guides/private-safety-processing/setup-07-platform-aws-connect.webp"
  alt="Connect external storage dialog with AWS selected, showing project selection, Bucket ARN, IAM role ARN, and Connect and validate."
  style={{ border: 0, borderRadius: 0 }}
/>

For **Azure**, enter **Tenant ID**, **Subscription ID**, **Resource group**, **Storage account name**, and **Container name**. Scroll down in the modal to complete all fields.

<img src="https://developers.openai.com/images/platform/guides/private-safety-processing/setup-08-platform-azure-connect.webp"
  alt="Connect external storage dialog with Azure selected, showing project selection, Tenant ID, Subscription ID, and Resource group."
  style={{ border: 0, borderRadius: 0 }}
/>

For **GCP**, enter **Bucket name**, **Workload identity project number**, **Workload identity pool ID**, and **Workload identity provider ID**. Scroll down in the modal to complete all fields.

<img src="https://developers.openai.com/images/platform/guides/private-safety-processing/setup-10-platform-gcp-connect.webp"
  alt="Connect external storage dialog with GCP selected, showing project selection, Bucket name, and Workload identity project number."
  style={{ border: 0, borderRadius: 0 }}
/>

For **OCI**, enter **Tenancy OCID**, **Region**, and **Bucket name**. Use the region identifier, such as `us-ashburn-1`, and the bucket name, not its OCID or URL. OpenAI discovers the Object Storage namespace automatically. Scroll down in the modal to complete all fields.

<img src="https://developers.openai.com/images/platform/guides/private-safety-processing/setup-platform-oci-connect.webp"
  alt="Connect external storage dialog with OCI selected, showing project selection, Tenancy OCID, and Region."
  style={{ border: 0, borderRadius: 0 }}
/>

##### 3. Connect and validate

Select **Connect and validate**. The API console registers the storage, runs validation, and refreshes the storage status and project policy. Registration alone doesn't change the policy.

Wait for **Storage validated** and confirmation that the project now uses ZDR with PSP, then select **Done**.

![OpenAI Project Settings showing validated AWS S3 storage and the Zero Data Retention with Private Safety Processing policy.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-09-platform-storage-validated.webp)

If validation fails after registration, fix the reported issue and select **Retry validation**. To resume later, select the destination under **Registered storage** and choose **Validate storage**. If the API console can't refresh the result, select **Refresh status** before starting over.

#### Option 2: Management API

Use an organization Admin API key for this method. Register storage with the commands below, then follow [**3. Verify your setup**](#3-verify-your-setup) to run validation.

##### 1. Prepare your API settings

Load your organization Admin API key securely into `OPENAI_ADMIN_KEY`.

Set `OPENAI_API_BASE` to the endpoint confirmed for your project: `https://api.openai.com` for global, `https://us.api.openai.com` for US, or `https://eu.api.openai.com` for Europe.

Replace the placeholders below with that endpoint and your OpenAI organization ID. Run the remaining commands in the same shell session.

```bash
OPENAI_API_BASE='<OPENAI_API_BASE>'
OPENAI_ORG_ID='<OPENAI_ORG_ID>'
OPENAI_STORAGE_URL="$OPENAI_API_BASE/v1/organization/external_storage"
```

##### 2. Send the registration request

Run the request for your provider only. Replace every `CUSTOMER_...` placeholder with your IDs and the resources you created.

**AWS S3**

```bash
curl --fail-with-body -sS -X POST "$OPENAI_STORAGE_URL" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID" \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "project_id": "CUSTOMER_PROJECT_ID",
    "provider": {
      "type": "aws",
      "bucket": "CUSTOMER_BUCKET_ARN",
      "role_arn": "CUSTOMER_ROLE_ARN"
    }
  }'
```

**Azure Blob Storage**

```bash
curl --fail-with-body -sS -X POST "$OPENAI_STORAGE_URL" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID" \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "project_id": "CUSTOMER_PROJECT_ID",
    "provider": {
      "type": "azure",
      "tenant_id": "CUSTOMER_TENANT_ID",
      "subscription_id": "CUSTOMER_SUBSCRIPTION_ID",
      "resource_group": "CUSTOMER_RESOURCE_GROUP",
      "account_name": "CUSTOMER_STORAGE_ACCOUNT",
      "container": "CUSTOMER_CONTAINER_NAME"
    }
  }'
```

**Google Cloud Storage**

```bash
curl --fail-with-body -sS -X POST "$OPENAI_STORAGE_URL" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID" \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "project_id": "<CUSTOMER_PROJECT_ID>",
    "provider": {
      "type": "gcp",
      "bucket": "<CUSTOMER_GCP_BUCKET_NAME>",
      "workload_identity_project_number": "<CUSTOMER_GCP_PROJECT_NUMBER>",
      "workload_identity_pool_id": "<CUSTOMER_GCP_POOL_ID>",
      "workload_identity_provider_id": "<CUSTOMER_GCP_PROVIDER_ID>"
    }
  }'
```

**OCI Object Storage**

```bash
curl --fail-with-body -sS -X POST "$OPENAI_STORAGE_URL" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID" \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "project_id": "CUSTOMER_PROJECT_ID",
    "provider": {
      "type": "oci",
      "tenancy_ocid": "CUSTOMER_TENANCY_OCID",
      "region": "CUSTOMER_OCI_REGION",
      "bucket": "CUSTOMER_BUCKET_NAME"
    }
  }'
```

The response contains an `id` beginning with `extstorage_` and `status: "pending"`. Keep the ID for validation. The API console shows **Pending validation** and leaves the project's retention policy unchanged.

##### 3. Verify your setup

For API validation, replace `EXTERNAL_STORAGE_ID` with the ID returned by registration, then run:

```bash
EXTERNAL_STORAGE_ID='<EXTERNAL_STORAGE_ID>'
curl --fail-with-body -sS -X POST \
  "$OPENAI_STORAGE_URL/$EXTERNAL_STORAGE_ID/validate" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID"
```

A successful response has `status: "validated"`. Validation checks configuration and access, then activates customer-managed retention for that project. The API console shows **Validated** and the read-only policy **Zero Data Retention with Private Safety Processing**.

If you used the Management API, retrieve the saved registration:

```bash
curl --fail-with-body -sS \
  "$OPENAI_STORAGE_URL/$EXTERNAL_STORAGE_ID" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID"
```

For either method, open **Project Settings > Data retention** and select **Refresh**. Confirm the destination, provider, geography, and **Validated** status, then check the policy is **Zero Data Retention with Private Safety Processing**. The organization Data retention table also shows storage and status for each project.

![OpenAI Project Settings Data retention page showing an AWS S3 external-storage connection with Validated status and the Zero Data Retention with PSP retention policy.](https://developers.openai.com/images/platform/guides/private-safety-processing/setup-05-verify-project-retention.webp)

**Validated** records a successful check, not continuous storage health. **Refresh** doesn't rerun validation. Use [Operations and Troubleshooting](#operate-and-troubleshoot-customer-storage) for ongoing monitoring and revalidation.







<a id="customer-storage-operations-steps"></a>



<a id="operate-and-troubleshoot-customer-storage"></a>



## Troubleshooting



### Check storage status

Open **Organization settings > Data controls > Data retention** for the project table, or **Project Settings > Data retention** for the project's storage details. Check the destination and geography, then read the status. You can also retrieve the registration through the API in [Setup and Verification](#set-up-and-verify-customer-storage).

- **Pending validation** (`pending`): Storage is registered but hasn't passed validation. The project's retention policy stays unchanged until validation succeeds.
- **Validated** (`validated`): Storage passed a validation check. This doesn't guarantee live connectivity.
- **Needs attention** (`unhealthy`): A check found a storage or configuration problem. Fix the cause and validate again.

**Refresh** reloads saved status; it doesn't test the connection. A runtime failure may not change the displayed status. If the API console can't load storage, check the API before treating that as a bucket outage.

### Monitor storage activity

Check these sources separately:

- **Storage registration:** Check the project, provider, geography, and validation result.
- **Cloud activity:** Check provider access logs and read/write errors, where enabled. Separate validation probes from actual PSP activity.
- **Safety and compliance events:** Check available content-lifecycle events in the Compliance API, if separately enabled. These aren't storage-registration events or cloud access logs.

Your sampling policy determines which requests create retained objects. A missing object or event alone doesn't mean storage has failed.

#### Identify validation probes

For AWS, Azure, GCP, and OCI, validation writes test objects to your configured storage destination. Their names include `csg_validation_` followed by a random hexadecimal suffix. Each object's body contains the text `customer-storage-gateway-validation:csg_validation_<suffix>`, using the same suffix as its name. They contain no customer prompts or responses. OpenAI reads each test object using the configured access, then attempts an unauthenticated `GET` of the same object to check for public access. Private storage is expected to reject the unauthenticated request. These requests may appear in your provider's access logs, depending on your logging configuration.

For AWS, validation also checks the role's `sts:ExternalId` restriction. After successfully assuming your configured role with your project's external ID, OpenAI tests `AssumeRole` calls without an external ID and with the deliberately invalid test ID `proj_smoketest-verifier`. Both test calls are expected to return `AccessDenied`. They use the same OpenAI identity and configured role; the test ID doesn't identify another customer's project. AWS CloudTrail doesn't record these denied cross-account role-assumption attempts in your account. Keep your trust policy restricted to your real project ID; don't allow the test ID or remove the external-ID condition to make these probes succeed.

### Recover from a failure

#### 1. Check the error

- `customer_managed_retention_not_enabled`: Ask your onboarding contact to confirm organization access.
- **Authentication or permission failure:** Check that you're using an organization Admin key with the required external-storage permission.
- **Configuration problem:** Check the cloud identity, trust policy or access permissions, lifecycle rules, and approved network configuration.
- `401 customer_storage_not_ready`: Check that validated storage exists for the requested project's geography.
- `incorrect_hostname`: Use the hostname that matches your fixed-residency project's configuration.
- `503 external_storage_validation_unavailable`: Retry later. Contact support if the failure persists.

If you're using AWS's project-based **[Sign up for AWS (new)](https://docs.aws.amazon.com/accounts/latest/reference/sign-up-for-aws.html)** experience, its default resource control policy (RCP) blocks OpenAI's cross-account role assumption. To use that account, upgrade to a paid plan if needed, [activate advanced features](https://docs.aws.amazon.com/accounts/latest/reference/activate-advanced-features.html), and update the RCP to permit OpenAI's `sts:AssumeRole` access.

#### 2. Validate again

After fixing the configuration, open **Connect storage** for the project and run the validation command with an organization Admin API key. Retrieve the registration or select **Refresh** to confirm **Validated**. Refresh alone doesn't run validation.

### Contact support

If storage or validation issues persist after troubleshooting, [contact OpenAI Support](https://help.openai.com/en/).

### Change or stop your setup

To disconnect storage, open **Project Settings > Data retention**. Under **External storage**, select the trash icon beside the connection, then confirm with **Disconnect storage**.

If the project uses ZDR with PSP, disconnecting its last storage connection automatically resets its retention policy to your organization's default. If other connections remain, the policy stays unchanged. Models that require ZDR with PSP may become unavailable when the policy changes.

Disconnecting storage doesn't delete your cloud storage or its contents. Continue to meet the retention requirements for existing records. Complete setup and validation for each new project and residency location.





## Ongoing Customer Responsibilities

Customers using ZDR with PSP are required to:

- **Register and validate PSP storage.** Register and validate storage buckets through OpenAI’s admin API for each PSP-enabled project and data-residency location, and configure PSP-service bucket access in accordance with OpenAI’s published guidance.
- **Retain encrypted records for at least 30 days**. Configure storage lifecycle rules so they do not delete PSP records earlier.
- **Maintain storage and key access**. Keep regional storage, service permissions, and customer-managed key authorization correctly configured.
- **Repair configuration issues.** Correct storage configuration problems after OpenAI provides notification.
- **Respond to notices about safety concerns.** Engage with OpenAI to investigate and address the concern.

## Resources

<ul>
  <li>
    [{"Private Safety Processing technical whitepaper"}](https://openaiassets.blob.core.windows.net/$web/pdf/c7284810-2252-462f-803e-075b0c95bccb/psp-whitepaper.pdf)
    {" - Full architecture, security controls, and scope."}
  </li>
  <li>
    [{"API data controls"}](https://developers.openai.com/api/docs/guides/your-data)
    {" - ZDR eligibility, endpoint-specific retention, and exceptions."}
  </li>
  <li>
    [{"Data residency"}](https://developers.openai.com/api/docs/guides/your-data#data-residency-controls)
    {" - Supported regions and processing boundaries."}
  </li>
</ul>