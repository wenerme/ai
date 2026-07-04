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

This document provides descriptions of common issues and their solutions when
working with code execution in an isolated sandbox environment. It includes
help for sandbox creation failures, execution timeouts, and file I/O problems.

## Sandbox creation issues

- **Permissions error:** If you encounter errors when creating a sandbox,
  ensure your Google Cloud project has the Agent Platform User
  `(roles/aiplatform.user)` Identity and Access Management (IAM) role.

- **Invalid Project ID or Location:** Verify that the `PROJECT_ID` and
  `LOCATION` variables used in your code are correct and supported. For
  a list of supported regions, see [Supported regions](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-locations).

- **Agent Engine not created:** Before creating a sandbox, confirm that the
  Agent Platform instance was successfully created. The `agent_engine.create()`
  method must complete without errors.

## Code execution issues

- **Code errors:** Review the `stderr` output from the `execute_code` response
  to identify any syntax errors, runtime exceptions, or logical flaws in your
  code.

- **File I/O issues:**

  - **File not found:** Ensure that any input files specified in the `files`
    array of your `input_data` are correctly referenced within your code.
    Your code is executed in the same folder as the files and can't access
    other folders.

  - **Output file not generated:** Check that your code is writing to the
    expected output filename and that there are no errors preventing file
    creation or writing.

  - **Size limits:** There is a 100MB size limit for files.

- **State persistence:** If your code relies on previous state,
  verify that you are using the same `sandbox_name` for subsequent calls.
  Also, make sure that the sandbox has not expired.

- **Timeout:** Code execution times out after 300 seconds.
  Consider optimizing your code for performance or breaking down complex tasks
  into smaller, more manageable steps.

## Sandbox management and cleanup

- **Sandbox not found for deletion:** If you're unable to delete a sandbox,
  ensure that the `sandbox_name` you are using is correct and that the sandbox
  still exists.

- **Agent Engine not found for deletion:** Similar to sandboxes, verify the
  `agent_engine_name` when attempting to delete the Agent Platform instance.

- **Resource quotas:** If you are creating many sandboxes or performing
  frequent executions, you might encounter resource quota limits. Check your
  project's quotas for Agent Platform services and request increases
  if necessary. For
  a list of Agent Engine quotas, see [Quotas](https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/agent-quotas).
