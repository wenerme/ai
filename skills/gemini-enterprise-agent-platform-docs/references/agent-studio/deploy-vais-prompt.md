> [!WARNING]
>
> **Preview**
>
>
> This feature is
>
> subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the
> [Service Specific
> Terms](https://docs.cloud.google.com/terms/service-terms#1).
>
> Pre-GA features are available "as is" and might have limited support.
>
> For more information, see the
> [launch stage descriptions](https://cloud.google.com/products/#product-launch-stages).

In Agent Studio, you can design and iterate your prompts and
compare results from different configurations and models. Once you finish
engineering your prompt, you can deploy your prompt as a web application to
share with your collaborators or target users to let them test out the web
application. The web application is hosted on Cloud Run and is
available outside the Google Cloud console.

In this quick start, you will:

- Create a prompt with prompt variables
- Deploy your prompt as a web application
- Monitor deployment progress and test the deployed application
- Update and re-deploy your prompt
- Test out prompt submission with multimodal supports

## Before you start

If you have never used Agent Studio before, you can follow
[another quickstart
guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/quickstart) or take the
[Google Cloud Skills Boost
course](https://www.cloudskillsboost.google/course_templates/552) to learn the
basics of Agent Studio. In this guide, you should have the
following:

1. A Google Cloud project with billing and the Agent Platform API enabled.
2. The [roles required](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/deploy-vais-prompt#required-roles) to deploy a Agent Studio prompt as a web application. If you created a new project for this guide, then you already have the required permissions.

Optionally, you can also ensure that the [Compute Engine
default service account](https://docs.cloud.google.com/compute/docs/access/service-accounts#default_service_account) has the [roles required for the deployment service
account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/deploy-vais-prompt#service-account-required-roles). If you have permission to grant
roles, then you can instead grant these roles when deploying your application.

### Required roles

To get the permissions that
you need to deploy a Agent Studio prompt as a web application,

ask your administrator to grant you the
following IAM roles on your project:

- [Agent Platform User](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.user) (`roles/aiplatform.user`)
- Enable the required APIs: [Service Usage Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/serviceusage#serviceusage.serviceUsageAdmin) (`roles/serviceusage.serviceUsageAdmin`)
- Grant required roles to the Compute Engine default service account: [Project IAM Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/resourcemanager#resourcemanager.projectIamAdmin) (`roles/resourcemanager.projectIamAdmin`)
- Deploy a Cloud Run application:
  - [Cloud Run Admin](https://docs.cloud.google.com/iam/docs/roles-permissions/run#run.admin) (`roles/run.admin`)
  - [Cloud Run Source Developer](https://docs.cloud.google.com/iam/docs/roles-permissions/run#run.sourceDeveloper) (`roles/run.sourceDeveloper`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

You might also be able to get
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

### Required roles for the deployment service account

To ensure that [Compute Engine default service account](https://docs.cloud.google.com/compute/docs/access/service-accounts#default_service_account) has the necessary
permissions to execute builds on your behalf,

ask your administrator to grant the
following IAM roles to [Compute Engine default service account](https://docs.cloud.google.com/compute/docs/access/service-accounts#default_service_account) on your project:

**Important:** You must grant these roles to [Compute Engine default service account](https://docs.cloud.google.com/compute/docs/access/service-accounts#default_service_account), *not* to your user account. Failure to grant the roles to the correct principal might result in permission errors.

- [Agent Platform Service Agent](https://docs.cloud.google.com/iam/docs/roles-permissions/aiplatform#aiplatform.serviceAgent) (`roles/aiplatform.serviceAgent`)
- [Cloud Build Service Account](https://docs.cloud.google.com/iam/docs/roles-permissions/cloudbuild#cloudbuild.builds.builder) (`roles/cloudbuild.builds.builder`)

For more information about granting roles, see [Manage access to projects, folders, and organizations](https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access).

Your administrator might also be able to give [Compute Engine default service account](https://docs.cloud.google.com/compute/docs/access/service-accounts#default_service_account)
the required permissions through [custom
roles](https://docs.cloud.google.com/iam/docs/creating-custom-roles) or other [predefined
roles](https://docs.cloud.google.com/iam/docs/roles-overview#predefined).

If you have permission to grant roles, then you can instead grant these roles
when deploying your application.

## Create a prompt with prompt variables

Navigate to the [create prompt page](https://console.cloud.google.com/agent-platform/studio/multimodal) of
Agent Studio, and then click **Add
variable** in the prompt input box.

In the **Manage prompt variables** dialog, enter a variable name and give it a
value. Then click **Apply**.

![Manage prompt variables dialog](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/images/_deploy/02-prompt-variable-dialog.png)

In the prompt input box, compose the prompt using the variable and then adjust
other parameters. For example, you can enable **Grounding with
Google Search**, and has "Always get current weather from the web" as
the system instructions.

## Deploy your prompt as a web application

To deploy your prompt as a web application, click the **Build with code** button
on the top right corner. Then click **Deploy as app.**

![Click build with code button and click deploy as app](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/04-click-build-with-code-button.png)

### Save the prompt

The save prompt dialog will pop up, as saving is required before a prompt can be
deployed. The deploy dialog will open automatically once the prompt has been
saved.

![Save prompt first before deployment](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/05-save-prompt.png)

> [!NOTE]
> **Note:** Saving your prompt in a region for the first time can take 2-3 minutes to complete. A warning box will appear after 1 minute. This is expected to be a one-time slow operation. Any subsequent prompt saving actions when using the same project and region will only take a few seconds.

### Enable APIs for the first deployment and grant permissions

1. Once the prompt is saved, the deployment process will continue. If this is your first deployment, you will see a dialog for enabling required APIs. Click **Enable required APIs**.
2. After the APIs are enabled, the **Create a web app** dialog will appear. You can choose to **Required authentication (via [Identity Aware Proxy](https://docs.cloud.google.com/iap/docs/enabling-cloud-run))** or **Allow public access** .
   - If required authentication is chosen, follow the [guide to grant access](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/deploy-vais-prompt#grant-access) (include yourself).
   - When you select **Allow public access** , it means anyone can access the app. Therefore, **don't include sensitive or personally identifiable information (PII) in your prompt** . Check the **I understand this app will be deployed publicly** checkbox to acknowledge.
3. Click **Create app** to start the deployment.
4. If this is your first deployment, another dialog will pop up asking you to grant the required roles to the service account. Click **Grant all** to proceed.

   > [!NOTE]
   > **Note:** If you don't have permissions to enable APIs or to grant access, ask your project administrator to grant the necessary permissions for you. See the [Required roles for the deployment service account](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/deploy-vais-prompt#service-account-required-roles) for more details.

### Deployment starts

Agent Studio will create a zip file that contains the source
code for the web application and will upload the zip file to a Cloud Storage
bucket. After deployment starts, the **Manage web app** dialog will pop up with
information about your deployment, such as your application's name, when it was
last deployed, its deployment status, and more.

![Manage app dialog](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/10-manage-app-dialog.png)

## Monitoring the deployment status

Deployment takes 2-3 minutes to complete, and the deployment status is shown in
the **Status** column of the **Manage web app** dialog. If you close the
**Manage web app** dialog, you can reopen it from the menu under the **Build
with code** button.

Once the deployment is complete, the status column will change to **Ready** , and
the **Open** button will appear next to the application name.

![Open the app button shows up next to the app name](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/12-open-app.png)

### Access control and secret key

Your web application is deployed with **Allow unauthenticated** access control
enabled by default. You can turn it off by clicking the pencil icon
button. See the [turn off public access section](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/deploy-vais-prompt#turn-off-public-access) for
more information.

To provide basic protection, the web application requires a secret key to be
appended to the URL for submitting the prompt. You can find the secret key in
the **Secret Key** column. If you open the web application from
Agent Studio, the key will be appended to the URL for you.

### Open the web application and submit the prompt

Click **Open** in the **Manage web app** dialog to access the deployed
application. The application should be opened with the secret key appended to
the URL in the format of `?key=SECRET_KEY`.

![Open the web application from the manage app dialog. Secret key is appended to the URL.](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/13-web-app.png)

Enter a value to the variable and then click **Submit**. You should be able to
see the results on the right.

![Submit the prompt from the web app](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/13-2-web-applications-results.png)

### Open the web application from the Build with code button menu

If your web application is ready, you can also open it from the **Build with
code** button menu.

![Open the app from the build with code button menu](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/16-open-app-from-build-with-code.png)

Cloud Run is a serverless service, which means that the container for
the application will be shut down if it is not actively used. Therefore, the web
application can sometimes take a few seconds to load, or a submission won't work
if you have left the web application idling for too long. Refreshing the page
should solve this issue.

### Monitoring the status from the notification bell

You can also monitor the status from the **Notifications** menu by clicking the
bell icon. The bell icon will stop its loading animation and show a green circle
if deployment is completed successfully.

![Monitor the status from the notification bell](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/14-notification-bell.png)

If you click the notification, it will redirect you to the Cloud Run
page. The URL in the Cloud Run page does not have the secret key
appended. You will need to manually append it in the format `?key=SECRET_KEY`.

![App link in Cloud Run page doesn't have the key appended](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/15-cloud-run-page.png)

## Update and re-deploy your prompt

You can further edit your prompt in Agent Studio and turn the
prompt into a conversation. Then click the **Build with code** button and click
**Manage app** to open the **Manage web app** dialog. Click **Update app** to
re-deploy your web application with the updated prompt.

A confirmation dialog will appear. It tells you that if you redeploy, you will
lose any changes that you made to the deployed web application outside
Agent Studio (such as in the [Cloud Run source code
editor](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/deploy-vais-prompt#edit-source-code)). Click **Confirm** to proceed.

The **Manage web app** dialog will pop up again. The process is similar to the
initial deployment. You can monitor the progress in [the same way as the first
deployment](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/deploy-vais-prompt#monitoring_the_deployment_status).

After the update is done, you can open the web application again. You will see
the conversation UI with the prompt variable. Fill in the value and type any
non-empty content to continue the conversation.

![The updated app has a chat UI](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/20-updated-app.png)

## Insert multimodal content

You can insert inputs such as images, video, audio, and documents into the
conversation UI. What inputs are supported depends on the model selected for the
prompt. See the [documentation for multimodal support for each
model](https://ai.google.dev/gemini-api/docs/models#model-variations).

To insert a file, click the clip icon button in the
conversation input box.

![Insert multimodal inputs](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/21-multimodal.png)

You will be able to interact with the model with the input you provide.

![Interact with the model using the multimodal inputs](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/22-multimodal-image.png)

## Advanced Topics

Once you are familiar with the deployment process, you can consider the
following actions.

### Edit source code in
Cloud Run

If you want to customize the web application, you can make changes to the
source code in Cloud Run. Open the Cloud Run source code
page from the **Manage web app** dialog by clicking the
more icon button at the end of the row.
![open source code editor from the manage web app dialog](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/adv-edit-01-open-source-code.png)

Alternatively, You can also navigate to the security page from the web
application by clicking the **source code editor** link.

In the Cloud Run source code page, click **Edit source** to start
editing mode. Once you are done, click **Save and redeploy**.

> [!NOTE]
> **Note:** Cloud Run doesn't support version control directly. If you re-deploy from Agent Studio, the changes will also be overwritten. To save a version, you can click **Download ZIP** on the bottom left corner to save the current version before re-deploying.

After the re-deployment is completed, you need to open the application from
Agent Studio. You can navigate to the
Agent Studio page from the link in the **Deployed from
Agent Platform** badge.

### Grant access

To grant users or groups access to the app, follow the steps:

1. Open the **Manage Web App** dialog.
2. Click the pencil icon in the **Access Control** column. The Cloud Run security page opens in a new tab.
3. On the Cloud Run security page, find the checkbox for Identity-Aware Proxy (IAP). Make sure it is checked, and then click **Edit Policy**.
4. A subtask will show up to let you edit access. Enter user or group emails to the **Principal** field. If you are a user in an organization, you can only add users from the same organization.
   ![Subtask to edit IAP](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/adv-07-edit-iap.png)
5. Leave the access levels field empty.
6. Click **Save**.
7. After the subtask is closed, click **Save** again in the Cloud Run page.
   ![Save again in Cloud Run UI](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/adv-08-edit-iap-cloudrun-save.png)

   > [!WARNING]
   > The second **Save** click step is required for the changes to be effective. There is also a potential delay of a few minutes for the policy edit to be effective.

### Turn off public access

When you don't need the web application to be publicly accessible, you can
turn it off in Cloud Run. Open the **Manage Web App** dialog, and
click the pencil icon in the **Access Control** column. The
Cloud Run security page will open in a new tab.

You can also navigate to the security page from the web
application by clicking the **Security settings** link.

In the Security page of your web application's corresponding
Cloud Run service, check **Use Cloud IAM to
authenticate incoming requests** and choose **Require authentication** .
Click **Save**.

This will result in your web application no longer being accessible through
the URL. You will see an **Error: Forbidden** page if you try to access it.

### Turn on public access again

If you want to turn back public access, clear the **Use Cloud
IAM to authenticate incoming requests** checkbox and save.
If you choose the **Allow unauthenticated invocations** , it won't work if
your project is in an organization.
See [authentication in
Cloud Run](https://docs.cloud.google.com/run/docs/authenticating/overview) for more details.

### Set up local access for development

In the Public Preview, access control is not yet supported. Therefore, once
you turn off public access, the only way you can access the web application is
by setting up a local proxy. You can do this through gcloud
commands. First, open Cloud Shell through the terminal icon
button in the top right corner of the Google Cloud console.

It will ask you to authorize Cloud Shell. Click **Authorize** to
continue.

Once it is done, open the **Manage web app** dialog and click the
more icon button at the end of the row to see more actions. Click **Set up
local access via Cloud Shell** .
![Get set up local access command from the manage web app dialog](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/adv-05-cloud-shell-command.png)

A command will be added to your Cloud Shell. Press enter and wait for it to
finish printing. Click the link in the line starting with `Click on the
link to preview`. You will be able to view your application. This link
only works when you have the gcloud command running.
![Local access link in Cloud Shell](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/adv-06-local-access.png)

## Common issues

#### Authentication error: No secret key

If you see the following error, it means no secret key is appended to the
URL. Follow [the instructions to open the web](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/deploy-vais-prompt#open-web-app)
application from Agent Studio, or copy the secret key from
the **Manage app** dialog and append it to the URL in the format of
`?key=SECRET_KEY`.
![error for no secret key](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/error-01-no-secret-key.png)

#### Authentication error: Invalid secret key

The following error means that the key appended to the URL is invalid.
The secret key is unique to each prompt. If you have a secret key from another
prompt, it won't work. Follow the [instructions to open
the web application properly](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/deploy-vais-prompt#open-web-app).
![error for invalid key](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/error-02-invalid-key.png)

#### 400 Invalid argument: empty input

The following error happens when you have inputs in the prompt variable,
but the chat is empty; a 400 error message will appear. You can fix this by
typing anything non-empty and resubmitting.
![error for empty content](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/error-03-invalid-input.png)

#### 400 Invalid argument: mimeType is not supported

If you choose a file type that the model does not support, it will return a
400 error. This is expected, and you will have to use other types of files
supported by the model. See the
[documentation for multimodal support for each model](https://ai.google.dev/gemini-api/docs/models#model-variations).
![error for unsupported mime types](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/agent-studio/images/deploy/error-03-invalid-input.png)

## What's next

Overview

### [Build overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build)

Learn how to build agents in Google Agent Platform.

Guide

### [Agent Studio capabilities](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/agent-studio-capabilities)

Learn about the capabilities of Agent Studio.

Quickstart

### [Agent Studio quickstart: Send text prompts to Gemini](https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/quickstart)

Learn how to send text prompts to Gemini using Agent Studio.
