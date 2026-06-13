# In-app browser

The in-app browser gives you and Codex a shared view of rendered web pages
inside a thread. Use it when you're building or debugging a web app and want to
preview pages and attach visual comments.

Use it for local development servers, file-backed previews, and public pages
that don't require sign-in. For anything that depends on login state or browser
extensions, use your regular browser or the
[Codex Chrome extension](https://developers.openai.com/codex/app/chrome-extension).

Open the in-app browser from the toolbar, by clicking a URL, by navigating
manually in the browser, or by pressing <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>
(<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> on Windows).

The in-app browser does not support authentication flows, signed-in pages,
  your regular browser profile, cookies, extensions, or existing tabs. Use it
  for pages Codex can open without logging in.

Treat page content as untrusted context. Don't paste secrets into browser flows.

<CodexScreenshot
  alt="Codex app showing a browser comment on a local web app preview"
  lightSrc="/images/codex/app/in-app-browser-light.webp"
  darkSrc="/images/codex/app/in-app-browser-dark.webp"
  maxHeight="420px"
  variant="no-wallpaper"
/>

## Browser use

Browser use lets Codex operate the in-app browser directly. Use it for local
development servers and file-backed previews when Codex needs to click, type,
inspect rendered state, take screenshots, download page assets, run read-only
page inspection JavaScript, or verify a fix in the page.

To use it, install and enable the Browser plugin. Then ask Codex to use the
browser in your task, or reference it directly with `@Browser`. The app keeps
browser use inside the in-app browser and lets you manage allowed and blocked
websites from settings.

Example:

```text
Use the browser to open http://localhost:3000/settings, reproduce the layout
bug, and fix only the overflowing controls.
```

Codex asks before using a website unless you've allowed it. Removing a site from
the allowed list means Codex asks again before using it; removing a site from the
blocked list means Codex can ask again instead of treating it as blocked.

For signed-in websites in Chrome, see
[Codex Chrome extension](https://developers.openai.com/codex/app/chrome-extension).

## Preview a page

1. Start your app's development server in the [integrated terminal](https://developers.openai.com/codex/app/features#integrated-terminal) or with a [local environment action](https://developers.openai.com/codex/app/local-environments#actions).
2. Open an unauthenticated local route, file-backed page, or public page by
   clicking a URL or navigating manually in the browser.
3. Review the rendered state alongside the code diff.
4. Leave browser comments on the elements or areas that need changes.
5. Ask Codex to address the comments and keep the scope narrow.

Example feedback:

```text
I left comments on the pricing page in the in-app browser. Address the mobile
layout issues and keep the card structure unchanged.
```

## Comment on the page

When a bug is visible only in the rendered page, use browser comments to give
Codex precise feedback on the page.

- Turn on Annotation mode, select an element or area, and submit a comment.
- In Annotation mode, hold <kbd>Shift</kbd> and click to select an area.
- Hold <kbd>Cmd</kbd> while clicking to send a comment immediately.

After you leave comments, send a message in the thread asking Codex to address
them. Comments are most useful when Codex needs to make a precise visual change.

Good feedback is specific:

```text
This button overflows on mobile. Keep the label on one line if it fits,
otherwise wrap it without changing the card height.
```

```text
This tooltip covers the data point under the cursor. Reposition the tooltip so
it stays inside the chart bounds.
```

<section class="feature-grid">

<div>

### Styling feedback

When you add an annotation to a section on the page, press the config icon next
to the text input to give Codex more granular style feedback. You can change
values like font, text, spacing, and color, preview the result directly on the
page, and then send the annotation so Codex has a clearer target for the change.

</div>

<CodexScreenshot
  alt="Codex app showing in-app browser annotation style controls"
  lightSrc="/images/codex/app/iab-annotations-light.webp"
  darkSrc="/images/codex/app/iab-annotations-dark.webp"
  maxHeight="420px"
/>

</section>

## Keep browser tasks scoped

The in-app browser is for review and iteration. Keep each browser task small
enough to review in one pass.

- Name the page, route, or local URL.
- Name the visual state you care about, such as loading, empty, error, or
  success.
- Leave comments on the exact elements or areas that need changes.
- Review the updated route after Codex changes the code.
- Ask Codex to start or check the dev server before it uses the browser.

For repository changes, use the [review pane](https://developers.openai.com/codex/app/review) to inspect the
changes and leave comments.

<section class="feature-grid">

<div>

## Developer mode

Developer mode works with Browser use in Chrome and the Codex in-app browser.
It gives Codex controlled access to the Chrome DevTools Protocol (CDP). Use it
when you want Codex to profile JavaScript, inspect console output and network
traffic, examine page state such as the DOM and applied styles, or diagnose an
issue directly in the live browser.

To enable it, open [**Settings > Browser**](codex://settings/browser-use) and,
under **Developer mode**, turn on **Enable full CDP access**. If your
organization has disabled this setting, you can't enable it locally. Admins can
set `browser_use_full_cdp_access = false` under `[features]` in
[`requirements.toml`](https://developers.openai.com/codex/enterprise/managed-configuration#pin-feature-flags).

Full CDP access lets Codex inspect and control sensitive browser internals that
may put your data at risk. Codex asks for explicit approval before it uses full
CDP to inspect a website. Review the site, task, and requested access before you
approve it.

Use `@Browser` for the in-app browser. To use Developer mode in Chrome,
[set up the Codex Chrome extension](https://developers.openai.com/codex/app/chrome-extension) and invoke
`@Chrome`.

For example:

```text
This app is slow. Use @Browser to capture a performance trace and inspect
network traffic, then identify the bottleneck.
```

</div>

<CodexScreenshot
  alt="Codex app Browser settings showing Developer mode with full CDP access enabled"
  lightSrc="/images/codex/app/browser-developer-mode-light.webp"
  darkSrc="/images/codex/app/browser-developer-mode-dark.webp"
  maxHeight="420px"
/>

</section>