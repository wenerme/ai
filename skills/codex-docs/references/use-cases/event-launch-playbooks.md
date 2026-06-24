---
name: Run event playbooks
tagline: Create repeatable workflows for event program management.
summary: Use Codex with Slack, Google Drive, and Calendar to gather planning
  context, draft attendee-facing copy, and prepare a private checklist with
  owners, approvals, and open questions.
skills:
  - token: slack
    url: https://github.com/openai/plugins/tree/main/plugins/slack
    description: Read planning channels, threads, canvases, and decisions that
      define the current event scope.
  - token: google-drive
    url: https://github.com/openai/plugins/tree/main/plugins/google-drive
    description: Gather approved templates, event docs, decks, recap notes, and
      launch assets.
  - token: google-calendar
    url: https://github.com/openai/plugins/tree/main/plugins/google-calendar
    description: Check event timing, deadlines, and meeting context while building
      the playbook.
  - token: sheets
    description: Track tasks, owners, and deadlines in a structured format.
bestFor:
  - Community, developer relations, marketing, and operations teams running
    events.
  - Event pages, handoffs, and launch checklists where public copy and private
    operations need to stay separate.
  - Recurring event programs that need source-backed templates, owners,
    approvals, and open questions.
starterPrompt:
  title: Build the Event Playbook
  body: >-
    Create a source-backed playbook for [event].


    Sources to use:

    - planning channels or threads: [links or names]

    - approved docs, decks, sheets, or templates: [links or names]

    - calendar events or deadlines: [links or dates]


    Split the output into:

    - attendee-facing copy

    - private operating checklist

    - owner map

    - support plan or resources

    - approvals still needed

    - open questions

    - source appendix


    Do not publish anything or assume missing details. Put unknowns in open
    questions and keep private operations out of the public copy.
  suggestedEffort: medium
relatedLinks:
  - label: Codex plugins
    url: /codex/plugins
  - label: Codex automations
    url: /codex/app/automations
  - label: Use Codex in Slack
    url: /codex/integrations/slack
---

## Introduction

When you have event programs to manage, for example our [Codex community meetups](https://developers.openai.com/community/meetups), you often have context scattered across multiple sources:

- The public event page
- The program support plan
- Slack messages
- Sheets or documents
- etc.

You can use Codex to gather the approved planning sources and turn them into a playbook that separates attendee-facing copy from private operating details.

## Create your first playbook

Use the starter prompt to ask Codex to generate an event playbook for you. It should:

- Name planning sources (these could be links, internal tools, etc.)
- List required information
- Define rules for attendee-facing copy (keeping internal logistics out of it)

You should get a list of things to check and run every time a new event is planned.

## Run the playbook as an automation

After the first run of your new playbook works, keep the same thread open and ask Codex to run it as a scheduled automation.