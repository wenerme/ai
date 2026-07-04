Agent Platform Sessions maintains the history of interactions between a user and agents. Sessions provide definitive sources for long-term memory and conversation context.

You have several options to use Agent Platform Sessions:

- [Agent Development Kit](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/manage-with-adk): Once you deploy your Agent Development Kit (ADK) agent to Gemini Enterprise Agent Platform, session management is handled automatically.

- [API calls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/manage-with-api): You can make direct API calls to Agent Platform Sessions if you don't want to manage sessions using an ADK agent.

## Core concepts

- **Session**: A session represents the chronological sequence of messages and actions (events) for a single, ongoing interaction between a user and your agent system.

- **Event**: An event stores the content of the conversation, as well as the actions taken by the agents such as function calls. Events support a flexible schema to accommodate custom data and different frameworks.

- **State**: A state holds temporary data relevant only during the current conversation.

- **Memory**: Memory is personalized information that can be accessed across multiple sessions for a particular user. The agent can use memories to personalize responses to the user and ensure cross-session continuity.

## Core functionalities

The core functionalities of Agent Platform Sessions include the following:

- **Starting new conversations**: Create new sessions when a user begins an interaction with an agent.

- **Resuming existing conversations**: Retrieving a specific session so the agent can resume a conversation that has been paused.

- **Saving progress**: Append new interactions (events) to a session's history to update the session.

- **Listing conversations**: Find the active session threads for a particular user and application.

- **Cleaning up**: Delete session objects and their associated data when conversations are finished or no longer needed.

## What's next

- [Manage sessions using ADK](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/manage-with-adk).
- [Manage sessions using API calls](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/manage-with-api)
