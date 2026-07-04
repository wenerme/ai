To get audit logs about the usage of your model endpoints, you need to enable
[Data Access audit logs](https://docs.cloud.google.com/logging/docs/audit#data-access) for Gemini Enterprise Agent Platform.
Data Access audit logs include "admin read" operations that read metadata or
configuration information. They also include "data read" and "data write"
operations that read or write user-provided data.

After you enable Data Access audit logs for Gemini Enterprise Agent Platform, to view the
`data_access` log stream in the Google Cloud console, you need to be granted the
Private Logs Viewer role (roles/logging.privateLogViewer) .

To learn more about Data Access logs, including how to enable and view the logs,
see [Gemini Enterprise Agent Platform audit logging
information](https://docs.cloud.google.com/gemini-enterprise-agent-platform/machine-learning/general/audit-logging).

## What's next

Overview

### [Introduction to tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/get-started-with-gemini-3)

Learn how to tune a model by providing a training dataset that contains a set of examples of specific downstream tasks.

Overview

### [Responsible AI](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/responsible-ai)

Learn about some of the limitations to generative AI and recommended practices for using generative AI.
