> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Report Feedback

Help us improve OpenRouter by reporting issues with AI generations. You can submit feedback directly from the Chatroom or the Logs page.

## Overview

The Report Feedback feature allows you to flag problematic generations with a category and description. This helps our team identify and address issues with model responses, latency, billing, and more.

### Feedback categories

When reporting feedback, select the category that best describes the issue:

* **Latency**: Response was slower than expected
* **Incoherence**: Response didn't make sense or was off-topic
* **Incorrect response**: Response contained factual errors or wrong information
* **Formatting**: Response had formatting issues (markdown, code blocks, etc.)
* **Billing**: Unexpected charges or token counts
* **API Error**: Technical errors or failed requests
* **Other**: Any other issue not covered above

## Reporting from the Chatroom

In the Chatroom, you can report feedback on individual assistant messages:

1. Hover over an assistant message to reveal the action buttons
2. Click the <Icon icon="flag" /> flag icon to open the Report Feedback
   dialog
3. Select a category and add your comment
4. Click **Submit**

The generation ID is captured from the message automatically, so you
don't need to look it up.

## Reporting from the Logs page

There are two ways to report, depending on whether the generation is
already in your logs.

### From a log row

1. Go to [openrouter.ai/logs](https://openrouter.ai/logs)
2. Find the generation you want to report
3. Click the <Icon icon="flag" /> flag icon at the end of that row (it's
   in the last column, so you may need to scroll the row right to reveal
   it)
4. Select a category and add your comment
5. Click **Submit**

### By generation ID

Use this when you already have the generation ID (for example, from an
API response):

1. Go to [openrouter.ai/logs](https://openrouter.ai/logs)
2. Click the <Icon icon="ellipsis-vertical" /> menu in the filter bar
   (top right) and choose **Feedback**
3. Enter the generation ID
4. Select a category and add your comment
5. Click **Submit**

<Note>
  **Finding Your Generation ID**

  You only need to look this up for the **By generation ID** flow. The
  log row and Chatroom flows capture it automatically.

  The ID is returned in the API response under the `id` field (e.g.
  `gen-3bhGk...`). You can also find it on the Logs page: click a row to
  open its detail panel, where it's listed as **Generation ID**.
</Note>

## What happens after you submit

Your feedback is reviewed by our team to help improve:

* Model routing and provider selection
* Error handling and recovery
* Billing accuracy
* Overall platform reliability

We appreciate your help in making OpenRouter better for everyone.
