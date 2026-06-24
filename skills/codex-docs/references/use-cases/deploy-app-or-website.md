---
name: Deploy an app or website
tagline: Build or update a web app, deploy a preview, and get a live URL.
summary: Use Codex with Build Web Apps and Vercel to turn a repo, screenshot,
  design, or rough app idea into a working preview deployment you can share.
skills:
  - token: build-web-apps
    url: https://github.com/openai/plugins/tree/main/plugins/build-web-apps
    description: Build, review, and prepare web apps with React, UI, deployment,
      payments, and database guidance.
  - token: vercel
    url: https://github.com/openai/plugins/tree/main/plugins/vercel
    description: Deploy previews, inspect deployments, read build logs, and manage
      Vercel project settings.
bestFor:
  - Turning a screenshot, map, design brief, or rough app idea into a working
    web preview
  - Deploying a branch or local app without manually wiring Vercel commands
  - Sharing a live URL after Codex runs the build and checks the deployment
starterPrompt:
  title: Build and Deploy a Preview
  body: >-
    Use @build-web-apps to turn [repo, screenshot, design, or rough app idea]
    into a working website.


    Then use @vercel to deploy a preview and hand me the live URL.


    Context:

    - [what the site should do]

    - [source data, API, docs, or assets to use]

    - [style or product constraints]

    - [anything not to change]


    Before you hand it back, run the local build and verify the deployment is
    ready.
  suggestedEffort: medium
relatedLinks:
  - label: Build Web Apps plugin
    url: https://github.com/openai/plugins/tree/main/plugins/build-web-apps
  - label: Vercel plugin
    url: https://github.com/openai/plugins/tree/main/plugins/vercel
  - label: Vercel deployments
    url: https://vercel.com/docs/deployments/overview
---

## Start with the site and the deploy target

Codex can build or update a website or app, run the project checks, deploy it with Vercel, and return the URL.

The useful handoff is concrete: a repo, screenshot, map, design brief, product note, API doc, or data source. Codex should inspect the project before changing it, then use the Vercel plugin to deploy a preview by default.

Use `@build-web-apps` when Codex needs to build or polish the app. Use `@vercel` when it should deploy, inspect the deployment, or read Vercel build logs.

## Check the result before you share it

Codex should tell you what it changed, which command it used to build the project, and whether the Vercel deployment is ready. If the deploy needs an environment variable, team choice, domain setting, or login step, Codex should call that out instead of pretending the site is finished.

Keep production changes explicit. A preview deployment is the default; ask for production only when you mean it.

## Iterate from the live URL

Once you have the preview, keep the same thread open. Ask Codex to open the URL, fix layout issues, update copy, wire missing data, or read Vercel logs if the deploy fails. The thread already has the repo, deployment, and build context.

Good follow-ups are specific:

- "The mobile layout is cramped. Fix it and redeploy the preview."
- "Use the same project and add the latest data from [source]."
- "Read the failed build logs and fix the deploy."