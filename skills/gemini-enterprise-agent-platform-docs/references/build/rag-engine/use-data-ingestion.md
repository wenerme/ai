The [VPC-SC security controls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/security-controls) and
CMEK are supported by Agent Platform RAG Engine. Data residency and AXT security controls aren't
supported.

This page explains how to perform data ingestion using a supported data source,
such as Cloud Storage, Google Drive, Slack, Jira, or SharePoint, and how to
use that data with RAG Engine. The
[ragFiles.import](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.ragCorpora.ragFiles/import)
method provides data connectors to these data sources.

## Data sources supported for RAG

The following data sources are supported:

- **Upload a local file:** A single-file upload using `upload_file` (up to 25 MB), which is a synchronous call.
- **Cloud Storage:** Import file(s) from Cloud Storage.
- **Google Drive:** Import a directory from Google Drive.

  The service account must be granted the correct permissions to import files.
  Otherwise, no files are imported and no error message displays. For more
  information on file size limits, see [Supported document
  types](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/supported-documents).

  To authenticate and grant permissions, do the following:
  1. Go to the [IAM page](https://console.cloud.google.com/iam-admin/iam) of your Google Cloud project.
  2. Select **Include Google-provided role grant**.
  3. Search for the **Agent Platform RAG Data Service Agent** service account.
  4. Click **Share** on the drive folder, and share with the service account.
  5. Grant `Viewer` permission to the service account on your Google Drive folder or file. The Google Drive resource ID can be found in the web URL.
- **[Slack](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-data-ingestion#import-from-slack)**: Import files from Slack by using a data
  connector.

- **[Jira](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-data-ingestion#import-from-jira)**: Import files from Jira by using a data
  connector.

## Data deduplication

If the same file is imported multiple times with no changes, the file is skipped
since it already exists. Therefore, the `response.skipped_rag_files_count`
refers to the number of files that were skipped during the import process.

A file is skipped when the following conditions are met:

- The file has been imported.
- The file hasn't changed.
- The chunking configuration for the file hasn't changed.

## Understand import failures

To understand import failures, this section explains the metadata in a response
to an import request and a data sink, which is the destination for the data that
you're importing.

### Response metadata

You can use `response.metadata` (a response object in the SDK) to view the
import results, the request time, and the response time.

### Import result sink

In the SDK, `import_result_sink` is an optional function parameter that can be
set to a valid string value.

If the `import_result_sink` is provided, the successful and failed file results
are written to the sink. Having all results written to the sink makes it easier
to understand why some files might fail to be imported and which files didn't
import.

The `import_result_sink` must be a Cloud Storage path or a BigQuery
table.

- If the `import_result_sink` is a Cloud Storage path, it should use
  the format of `gs://my-bucket/my/object.ndjson`, and the object must not
  exist. After the import job completes, each line of the
  Cloud Storage object contains a JSON object, which has an operation
  ID, a create timestamp, a filename, a status, and a file ID.

- If the `import_result_sink` is a BigQuery table, it should
  use the format of `bq://my-project.my-dataset.my-table`. The table doesn't
  have to exist. If the table doesn't exist, it is created. If the table does
  exist, the schema is verified. The first time the BigQuery
  import result sink is provided, you will provide a non-existent table;
  otherwise, you can reuse the existing table.

## Import files from Cloud Storage or Google Drive

To import files from Cloud Storage or Google Drive into your corpus, do
the following:

1. Create a RAG corpus. For more information, see [Method:
   ragCorpora.create](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.ragCorpora/create).

2. To import your files from Cloud Storage or Google Drive, use the
   [ragFiles.import](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1beta1/projects.locations.ragCorpora.ragFiles/import) method.

   The system automatically checks your file's path, filename, and
   `version_id`. The `version_id` is a file hash that's
   calculated using the file's content, which prevents the file from being
   reindexed.

   If a file with the same filename and path has a content
   update, the file is reindexed.

## Import files from Slack

To import files from [Slack](https://slack.com/) into your corpus, do the
following:

1. Create a corpus, which is an index that structures and optimizes your data for searching. For more information, see [Method:
   ragCorpora.create](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.ragCorpora/create).
2. Get your `CHANNEL_ID` from the Slack channel ID.
3. Create and set up an app to use with RAG Engine.
   1. From the Slack UI, in the **Add features and functionality** section, click **Permissions**.
   2. Add the following permissions:
      - `channels:history`
      - `groups:history`
      - `im:history`
      - `mpim:history`
   3. Click **Install to Workspace** to install the app into your Slack workspace.
4. Click **Copy** to get your API token, which authenticates your identity and grants you access to an API.
5. Add your API token to your Secret Manager.
6. To view the stored secret, grant the **Secret Manager Secret
   Accessor** role to your project's RAG Engine service account.

The following curl and Python code samples demonstrate how to import files from
your Slack resources.

### curl

If you want to get messages from a specific channel, change the
`CHANNEL_ID`.

    API_KEY_SECRET_VERSION=SLACK_API_KEY_SECRET_VERSION
    CHANNEL_ID=SLACK_CHANNEL_ID
    PROJECT_ID=us-central1

    curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://${ ENDPOINT }/v1beta1/projects/${ PROJECT_ID }/locations/${ PROJECT_ID }/ragCorpora/${ RAG_CORPUS_ID }/ragFiles:import \
    -d '{
      "import_rag_files_config": {
        "slack_source": {
          "channels": [
            {
              "apiKeyConfig": {
                "apiKeySecretVersion": "'"${ API_KEY_SECRET_VERSION }"'"
              },
              "channels": [
                {
                  "channel_id": "'"${ CHANNEL_ID }"'"
                }
              ]
            }
          ]
        }
      }
    }'

### Python

If you want to get messages for a given range of time or from a specific
channel, change any of the following fields:

- <var translate="no">START_TIME</var>
- <var translate="no">END_TIME</var>
- <var translate="no">CHANNEL1</var> or <var translate="no">CHANNEL2</var>

        # Slack example
        start_time = protobuf.timestamp_pb2.Timestamp()
        start_time.GetCurrentTime()
        end_time = protobuf.timestamp_pb2.Timestamp()
        end_time.GetCurrentTime()
        source = rag.SlackChannelsSource(
            channels = [
                SlackChannel("CHANNEL1", "api_key1"),
                SlackChannel("CHANNEL2", "api_key2", START_TIME, END_TIME)
            ],
        )

        response = rag.import_files(
            corpus_name="projects/my-project/locations/us-central1/ragCorpora/my-corpus-1",
            source=source,
            chunk_size=512,
            chunk_overlap=100,
        )

## Import files from Jira

To import files from
[Jira](https://www.atlassian.com/software/jira?referer=jira.com) into your
corpus, do the following:

1. Create a corpus, which is an index that structures and optimizes your data
   for searching. For more information, see [Method:
   ragCorpora.create](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.ragCorpora/create).

2. To create an API token, sign in to the [Atlassian
   site](https://id.atlassian.com/login?continue=https://id.atlassian.com/manage-profile/security/api-tokens).

3. Use *{YOUR_ORG_ID}.atlassian.net* as the <var translate="no">SERVER_URI</var> in the request.

4. Use your Atlassian email as the <var translate="no">EMAIL</var> in the request.

5. Provide `projects` or `customQueries` with your request. To learn more about
   custom queries, see [Use advanced search with Jira Query Language
   (JQL)](https://support.atlassian.com/jira-service-management-cloud/docs/use-advanced-search-with-jira-query-language-jql/).

   When you import `projects`, `projects` is expanded into the corresponding
   queries to get the entire project. For example, `MyProject` is expanded to
   `project = MyProject`.
6. Click **Copy** to get your API token, which authenticates your identity and
   grants you access to an API.

7. Add your API token to your Secret Manager.

8. Grant **Secret Manager Secret Accessor** role to your project's
   RAG Engine service account.

### curl

    EMAIL=JIRA_EMAIL
    API_KEY_SECRET_VERSION=JIRA_API_KEY_SECRET_VERSION
    SERVER_URI=JIRA_SERVER_URI
    CUSTOM_QUERY=JIRA_CUSTOM_QUERY
    PROJECT_ID=JIRA_PROJECT
    REGION= "us-central1"

    curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://${ ENDPOINT }/v1beta1/projects/${ PROJECT_ID }/locations/REGION>/ragCorpora/${ RAG_CORPUS_ID }/ragFiles:import \
    -d '{
      "import_rag_files_config": {
        "jiraSource": {
          "jiraQueries": [{
            "projects": ["'"${ PROJECT_ID }"'"],
            "customQueries": ["'"${ CUSTOM_QUERY }"'"],
            "email": "'"${ EMAIL }"'",
            "serverUri": "'"${ SERVER_URI }"'",
            "apiKeyConfig": {
              "apiKeySecretVersion": "'"${ API_KEY_SECRET_VERSION }"'"
            }
          }]
        }
      }
    }'

### Python

        # Jira Example
        jira_query = rag.JiraQuery(
            email="xxx@yyy.com",
            jira_projects=["project1", "project2"],
            custom_queries=["query1", "query2"],
            api_key="api_key",
            server_uri="server.atlassian.net"
        )
        source = rag.JiraSource(
            queries=[jira_query],
        )

        response = rag.import_files(
            corpus_name="projects/my-project/locations/REGION/ragCorpora/my-corpus-1",
            source=source,
            chunk_size=512,
            chunk_overlap=100,
        )

## Import files from SharePoint

To import files from your SharePoint site into your corpus, do the following:

1. Create a corpus, which is an index that structures and optimizes your data
   for searching. For more information, see [Method:
   ragCorpora.create](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/rest/v1/projects.locations.ragCorpora/create).

2. Create an Azure app to access your SharePoint site.

   1. To create a registration, go to
      [App Registrations](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/%7E/RegisteredApps).

      1. Provide a name for the application.

      2. Choose the option, **Accounts in this organizational directory
         only**.

      3. Verify that the redirect URIs are empty.

   2. In the **Overview** section, use your *Application (client) ID* as the
      <var translate="no">CLIENT_ID</var>, and use your "Directory (tenant) ID" as the
      <var translate="no">TENANT_ID</var>.

   3. In the **Manage** section, update the API permissions by doing the
      following:

      1. Add the SharePoint `Sites.Read.All` permission.

      2. Add the Microsoft Graph `Files.Read.All` and `Browser
         SiteLists.Read.All` permissions.

      3. Grant admin consent for these permission changes to take effect.

   4. In the **Manage** section, do the following:

      1. Update **Certificates and Secrets** with a new client secret.

      2. Use the <var translate="no">API_KEY_SECRET_VERSION</var> to add the secret
         value to the Secret Manager.

3. Grant **Secret Manager Secret Accessor** role to your project's
   RAG Engine service account.

4. Use *{YOUR_ORG_ID}.sharepoint.com* as the
   <var translate="no">SHAREPOINT_SITE_NAME</var>.

5. A drive name or drive ID in the SharePoint site must be specified in the
   request.

6. Optional: A folder path or folder ID on the drive can be specified. If the
   folder path or folder ID isn't specified, all of the folders and files on
   the drive are imported.

### curl

    CLIENT_ID=SHAREPOINT_CLIENT_ID
    API_KEY_SECRET_VERSION=SHAREPOINT_API_KEY_SECRET_VERSION
    TENANT_ID=SHAREPOINT_TENANT_ID
    SITE_NAME=SHAREPOINT_SITE_NAME
    FOLDER_PATH=SHAREPOINT_FOLDER_PATH
    DRIVE_NAME=SHAREPOINT_DRIVE_NAME

    curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    https://${ ENDPOINT }/v1beta1/projects/${ PROJECT_ID }/locations/REGION>/ragCorpora/${ RAG_CORPUS_ID }/ragFiles:import \
    -d '{
      "import_rag_files_config": {
        "sharePointSources": {
          "sharePointSource": [{
            "clientId": "'"${ CLIENT_ID }"'",
            "apiKeyConfig": {
              "apiKeySecretVersion": "'"${ API_KEY_SECRET_VERSION }"'"
            },
            "tenantId": "'"${ TENANT_ID }"'",
            "sharepointSiteName": "'"${ SITE_NAME }"'",
            "sharepointFolderPath": "'"${ FOLDER_PATH }"'",
            "driveName": "'"${ DRIVE_NAME }"'"
          }]
        }
      }
    }'

### Python

        from vertexai.preview import rag
        from vertexai.preview.rag.utils import resources

        CLIENT_ID="SHAREPOINT_CLIENT_ID"
        API_KEY_SECRET_VERSION="SHAREPOINT_API_KEY_SECRET_VERSION"
        TENANT_ID="SHAREPOINT_TENANT_ID"
        SITE_NAME="SHAREPOINT_SITE_NAME"
        FOLDER_PATH="SHAREPOINT_FOLDER_PATH"
        DRIVE_NAME="SHAREPOINT_DRIVE_NAME"

        # SharePoint Example.
        source = resources.SharePointSources(
            share_point_sources=[
                resources.SharePointSource(
                    client_id=CLIENT_ID,
                    client_secret=API_KEY_SECRET_VERSION,
                    tenant_id=TENANT_ID,
                    sharepoint_site_name=SITE_NAME,
                    sharepoint_folder_path=FOLDER_PATH,
                    drive_id=DRIVE_ID,
                )
            ]
        )

        response = rag.import_files(
            corpus_name="projects/my-project/locations/REGION/ragCorpora/my-corpus-1",
            source=source,
            chunk_size=512,
            chunk_overlap=100,
        )

## What's next

- [Vector database choices in
  RAG Engine on Gemini Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/vector-db-choices)
