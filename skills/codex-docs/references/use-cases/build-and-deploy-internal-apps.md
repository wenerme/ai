---
name: Build and deploy internal apps
tagline: Turn a team workflow into a hosted internal app with Sites.
summary: Use Codex with Sites to build, test, and deploy internal apps, with
  built-in storage and auth context.
skills:
  - token: sites
    url: https://chatgpt.com/plugins/share/sites
    description: Build, test, and deploy a static site or full-stack web app from Codex.
bestFor:
  - Teams that want to turn recurring workflows into interactive apps.
  - Apps that need lightweight structured persistence, file uploads, or
    workspace-oriented sharing.
  - Internal tools that benefit from building, testing, deploying, and iterating
    in one Codex thread.
starterPrompt:
  title: Build and Deploy an Internal App
  body: |-
    Use @sites to build and deploy an internal app for [team or workflow].

    Goal:
    - [what the app should help people do]
    - [who should use it]
    - [source docs, data, or connected services Codex should inspect]

    Requirements:
    - Keep the first version focused on one useful workflow.
    - Use D1 for structured data persistence.
    - Use R2 for user-uploaded files if needed.
    - Test the main flow, persistence, and responsive layout before deploying.

    Make it available to all workspace users.
  suggestedEffort: medium
relatedLinks:
  - label: Sites documentation
    url: /codex/sites
  - label: Sites showcase
    url: /showcase/sites
---

## Build and deploy from one thread

Sites is a plugin and managed hosting service for things you build with Codex. Ask Codex to create an app, and it can build the project, run it for testing, deploy it, and return a URL you can share.

The scope ranges from simple static sites to full-stack JavaScript or TypeScript web apps. That makes Sites a good fit for focused internal tools: onboarding dashboards, enablement hubs, searchable resource libraries, lightweight workflow apps, and reporting views.

See the [Sites documentation](https://developers.openai.com/codex/sites) for setup, storage, deployment, and access guidance.

Start with one useful workflow. A clear first version is easier to review, deploy, and improve than a broad request to recreate an entire internal system.

## Give Codex the workflow context

Tell Codex who the app is for, what people should accomplish, which source material it should inspect, and what should persist between sessions. Be explicit about the intended sharing scope and ask Codex to test the main flow before it deploys.

You can also leverage [Plugins](https://developers.openai.com/codex/plugins) to fetch or refresh data from internal sources.

If you need live data fetching, you can connect to a 3rd party tool using an
  API key. But if you want to leverage app connections, you can create a [thread
  automation](https://developers.openai.com/codex/app/automations#thread-automations) to fetch data with
  plugins on a set schedule, update the app and redeploy it.

## Choose storage deliberately

Many internal apps need persistence. Sites supports two storage primitives:

- Use D1, a SQLite-compatible database, for structured data such as checklist state, bookmarks, filters, annotations, configuration, and file metadata.
- Use R2 object storage for file bytes such as uploaded documents, images, or other assets that should persist.

Keep structured metadata in D1 and larger file objects in R2. A read-only resource page or static microsite may not need either one.

## Manage and share your projects

You can manage who has access to your deployed projects.

By default, they will only available to you (owner) and workspace admins.

But you can allow access to either:

- All workspace users (`workspace_all`)
  or
- Specific active users or groups (`custom`)

To change access, you can manage your projects from the Sites page in Codex or ask Codex directly to update access to either:

## Examples

The [Sites showcase](https://developers.openai.com/showcase/sites) includes sites examples with full prompts.

- **[Onboarding Hub](https://developers.openai.com/showcase/onboarding-hub)** combines a first-week checklist, resources, notes, and uploaded documents. It uses D1 for user state and file metadata, and R2 for uploaded file bytes.
- **[Enablement Hub](https://developers.openai.com/showcase/enablement-hub)** provides a searchable training library with filters and saved bookmarks backed by D1.
- **[Pulse Dashboard](https://developers.openai.com/showcase/pulse-dashboard)** presents metrics, trends, and lineage details while using D1 for configuration and cached snapshots.
- **[Sparkboard](https://developers.openai.com/showcase/idea-intake)** turns employee idea intake into a workflow with authenticated submissions, voting, comments, status boards, and contributor rankings.
- **[Launch Cal](https://developers.openai.com/showcase/launch-cal)** organizes upcoming product launches into a monthly calendar with filters, risk signals, checklists, and connected-source references.
- **[Event Planning Hub](https://developers.openai.com/showcase/event-planning-hub)** combines event requests, approvals, templates, milestones, policy readiness, and connected planning resources.

Use those examples as starting points, then narrow the prompt around your team's workflow and source material.