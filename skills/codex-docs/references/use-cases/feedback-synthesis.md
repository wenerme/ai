---
name: Turn feedback into actions
tagline: Synthesize feedback from multiple sources into a reviewable artifact.
summary: Connect Codex to multiple data sources such as Slack, GitHub, Linear,
  or Google Drive to group feedback into a reviewable Google Sheet, Google Doc,
  Slack update, or recurring feedback check.
skills:
  - token: slack
    url: https://github.com/openai/plugins/tree/main/plugins/slack
    description: Read approved feedback channels or thread links.
  - token: github
    url: https://github.com/openai/plugins/tree/main/plugins/github
    description: Read issues, PR comments, and discussion threads.
  - token: linear
    url: https://github.com/openai/plugins/tree/main/plugins/linear
    description: Read bug or feature queues.
  - token: google-drive
    url: https://github.com/openai/plugins/tree/main/plugins/google-drive
    description: Read feedback docs, exports, and folders, then create a Google Doc
      or Sheet.
  - token: google-sheets
    url: /codex/plugins
    description: Create a feedback sheet the team can sort, comment on, and update.
bestFor:
  - Analyzing feedback from Slack channels, issue threads, survey exports,
    support-ticket CSVs, or research notes.
  - Teams that need to turn feedback into actionable insights.
starterPrompt:
  title: Create the First Version
  body: >-
    Can you synthesize the beta feedback on [feature or product area] into a
    @google-sheets review sheet?


    Use these sources:

    - @slack [feedback channel or thread links]

    - @github [issue search or issue links]

    - @google-drive [survey export, notes doc, or Drive folder]


    In the sheet, group repeated feedback, include source links or IDs, mark
    confidence, and call out which items need product or engineering follow-up.


    Keep names and private quotes out of the visible summary unless I approve
    them. Do not post, send, create issues, or assign owners.
  suggestedEffort: low
relatedLinks:
  - label: Codex plugins
    url: /codex/plugins
  - label: Codex automations
    url: /codex/app/automations
  - label: Agent skills
    url: /codex/skills
---

When feedback is spread across a Slack channel, a survey export, and a few issue threads, Codex can pull it together into a Google Sheet or Doc that the team can review.

## Create the first version



1. Give Codex the feedback sources and one sentence of context.
2. Ask for a Google Sheet or Doc with themes, evidence links, questions, and follow-ups.
3. Use the same thread to turn the reviewed sheet into a Slack update or issue draft.
4. Pin the thread and add an automation if the feedback source keeps changing.



Use the starter prompt on this page for the first pass. The sources can be plugin links, attached files, or files in Google Drive.

## Turn the sheet into the next draft

Once the sheet exists, use the same thread to make it useful for the next person. Ask Codex to add a column, split a theme, draft a Slack update, or turn a reviewed theme into an issue draft.

## Keep a feedback channel current

For a Slack channel or issue queue that keeps getting new reports, pin the thread and ask Codex to check it on a schedule.