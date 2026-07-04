This document describes how to resolve errors that you might encounter when
[creating an agent](https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime/create-an-agent).

## Content generation errors

**Issue**:

You receive an error message similar to the following:

    ValueError: Cannot get the Candidate text.
    Response candidate content part has no text.

**Possible cause**:

This error might be caused by using a version of `langchain-google-vertexai`
that's not compatible with `google-cloud-aiplatform`. Version `1.0.2` or later
of `langchain-google-vertexai` is required. To check which version you're using,
run the following command in your terminal:

    pip show langchain-google-vertexai

**Recommended solution**:

Install version `1.0.2` of `langchain-google-vertexai`. This version includes
the [LangChain tool-calling](https://github.com/langchain-ai/langchain-google/pull/166)
updates that are required to work with `google-cloud-aiplatform`. To update your
version of `langchain-google-vertexai`, run the following command in your
terminal:

    pip install langchain-google-vertexai --upgrade

After running the update command, verify that you're using version `1.0.2` or
later by running the following command in your terminal:

    pip show langchain-google-vertexai

If you're in a notebook instance (for example, Jupyter or Colab
or Workbench), you might need to restart your runtime to use the updated
packages.

## Bring your own container (BYOC) first-time creation error

**Issue**:

You deploy agents through
[BYOC](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/deploy-an-agent#from-container-image)
in your Google Cloud project for the first time in the region you are in, and
you receive an error message similar to the following:

    Reasoning Engine resource <reasoning-engine-id> failed to start and cannot serve traffic.

**Possible cause**:

The failure was likely due to Agent Runtime on Gemini Enterprise Agent Platform internal
IAM provisioning. The changes take time to complete and propagate.

**Recommended solution**:

Retry the same agent deployment request, and it will succeed.
