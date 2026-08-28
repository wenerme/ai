> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Changelog

> Curated release notes for the Ori CLI, with version history and changes across releases.

Curated release notes for the Ori CLI, newest version first. If you are new to Ori, start with [Ori Eval](/docs/guides/ori/eval), then [Ori Harness](/docs/guides/ori/harness), which also covers installing Ori and running your existing agent CLI. [Where Ori writes files](/docs/guides/ori/files) explains what Ori puts in your project.

<Update label="0.10.1" description="August 24, 2026" tags={["Patch"]} rss={{ title: "Ori 0.10.1", description: "This release is chat TUI polish." }}>
  This release is chat TUI polish. The model picker resolves dynamic variants, prints readable prices, hides batch rows, and gains standard keyboard navigation. The composer and the slash menu line up with the transcript, and a theme file can now replace the built-in palettes. Tooling adds a lint rule for `undefined` checks and a CI disk fix.

  ## Chat TUI

  * **Variant models resolve their metadata.** A `:nitro` or `:floor` model used to behave like an unknown model: wrong effort options, a spurious unvalidated-catalog notice, and no effort adoption. Model lookups now fall back to the variant's base id, so `/effort` and model pick treat the variant like its base model.
  * **Readable picker prices.** Prices round to at most two decimals, and a paid rate that would round to zero clamps to 0.01 so it never reads as free. An unpriced row shows a dash instead of putting its context length under the price header.
  * **No batch variants in the picker.** `:batch` endpoints are not usable interactively, so the picker hides their rows. An explicit `/model` with a typed `:batch` id stays valid.
  * **More picker navigation keys.** Pickers accept `ctrl+n` and `ctrl+p` for next and previous, `tab` and `shift+tab` to cycle, and `pgup` and `pgdn` to move a page at a time.
  * **The composer column matches the transcript.** Typed text used to start two columns right of a submitted user line, so the text jumped left on submit. The caret and the text now share the transcript columns, and the slash menu and image-path rows shift to match.
  * **A cleaner slash menu.** Command descriptions drop the parenthetical UI narration and use the real terminal width instead of a fixed 56 columns. The tab hint stays on one line at narrow widths.

  ## Themes

  * **Custom palettes from a theme file.** Point `tui.themeFile` in the feature config, or the `ORI_TUI_THEME_FILE` environment variable, at a palette file to restyle the whole TUI. Saving other appearance settings preserves the configured file.

  ## Reliability and tooling

  * **A named predicate for `undefined` checks.** A new lint rule requires `Predicate.isUndefined` and `Predicate.isNotUndefined` over bare strict comparisons in Effect-declaring packages. Existing occurrences are frozen at their per-file counts.
  * **CI survives a lintcn cache miss.** The lintcn-rules job frees runner disk before a cold build, so a cache-key miss no longer fails the run on a full disk.
</Update>

<Update label="0.10.0" description="August 23, 2026" tags={["Breaking","Minor"]} rss={{ title: "Ori 0.10.0", description: "Approvals settle on two modes, and the classifier that used to judge asks for you is gone." }}>
  Approvals settle on two modes, and the classifier that used to judge asks for you is gone. Eval takes the largest share of the release. It can now bake off embedding and rerank models, grade against examples you supply, and run without a project's persona leaking into it. The rest is repair work in the threads services, the release pipeline, the dev container, and the Slack egress path.

  ## Breaking changes

  * **`self-drive` replaces `bypass`, and `auto` is gone.** The default mode approves every command ask for the session and never prompts. `--approvals bypass` and `--approvals auto` stop parsing, so a script that passes either must drop the flag or pass `self-drive`.

  ## Approvals

  * **Two named modes.** Run `ori code --approvals self-drive` for standing consent, or `ori code --approvals manual` to answer every ask yourself. Bare `/approvals` in chat opens a two item picker, and chat prints the active mode when a run starts.
  * **Nothing judges an ask for you.** The classifier that answered attended asks shipped without an evaluation of its judgment, so it is gone. A reviewing mode comes back once it is evaluated, or as a declarative policy that a feature registers.

  ## Eval

  * **Embedding bake-offs.** `ori eval` compares embedding models end to end. Discovery reads the embeddings catalog directly, so the chat model picker keeps its own filter. The report now renders nine decimals, because a single embedding call used to print as `$0.000000`.
  * **Rerank bake-offs.** `setupRerank()` grades rerank models on the same recorder, with NDCG\@k and reciprocal rank matchers.
  * **Reference examples for the judge.** `setupJudge` takes a `references` field that reaches the judge as its own prompt section. Your criteria still decide how much those examples count. Setup accepts at most 10 entries and 20,000 characters. Over either limit it refuses the corpus and names what it got, rather than grading against a truncated version of it.
  * **Hermetic runs.** `ori eval --hermetic` builds a temporary root and links only the features that would have loaded. A project's `ori.md`, agent guides, and skill roots stay out of the run, and Ori materializes its skills into the temporary root. A run without the flag behaves as before.
  * **No fake effort comparisons.** Eval carries the harness it resolved into the run. When that harness cannot express the effort levels you asked to compare, it says so by name. It used to run one level several times and present the results as a comparison.
  * **No token clamp.** The eval path never clamps `max_tokens`, so an earlier cap cannot cut a long answer short.
  * **An affordable pinned judge.** The default judge moves to `openai/gpt-5.6-sol`. A daily catalog assertion reports when that pin stops being the cheap option, reading the public catalog only, so it spends nothing.

  ## Runtime and contracts

  * **Threads split into four services.** State, the event bus, the interception chain, and the extension point ledger now live apart. Feature facing behavior is unchanged.
  * **Effect runs only where a runtime is owned.** Calls that used to spin up a throwaway Effect runtime now run on an owned one, and the lint rule matches the receiver instead of the identifier name.

  ## Bug fixes

  * **Slack through the egress proxy.** Slack Web API calls follow the configured egress proxy, so a deployment that allows only proxied traffic can post again.
  * **Dev container on Bun 1.4.** The dev image moves to Bun 1.4, and init no longer crashes inside it.

  ## Reliability and tooling

  * **Container images publish again.** The runtime image job inherited a skip from an optional smoke job, so no container shipped for 0.8.0 or 0.9.0. The job carries its own condition now, and it names a missing publish identity before a release starts.
  * **A narrower release gate.** CI applies the release owner check to the release-please manifest alone, so an ordinary pull request is not blocked by it.
  * **A written release process.** The engineering docs state how an alpha and a stable release are cut, and which of the two an agent may run.
  * **Load bearing watchdog tests.** Ten pre-harness watchdog tests never ran, because the collector accepted a callback shape that bun test discards. They run on a test clock now, and the chat width band test stops timing out on a slow runner.
</Update>

<Update label="0.9.0" description="August 22, 2026" tags={["Breaking","Minor"]} rss={{ title: "Ori 0.9.0", description: "This release renames the never-prompt approval posture to `bypass` and makes it the default, so `auto` keeps its classifier middle ground." }}>
  This release renames the never-prompt approval posture to `bypass` and makes it the default, so `auto` keeps its classifier middle ground. Login now starts with an explicit chooser, remembers what you picked, and lets an enterprise switch off any sign-in method. Schedules arm while the daemon runs, so a cron edit takes effect on the next reload instead of the next boot. Every Effect service in the repository now declares its live layer in one place.

  ## Breaking changes

  * **`bypass` is the default approval mode.** A default session answers every ask yes, including the escalation ask a refused shell call raises. The chat TUI announces the active mode when it starts.
  * **`auto` keeps the classifier.** A classifier answers routine attended asks. A doubtful ask or an escalation still reaches you, and the declared ask-on-execute policy stays in force.
  * **The credential-gate scope modes are gone.** The `--global-auth` and `--no-global-auth` flags are removed. Login mode now decides where a credential comes from.

  ## Approvals

  * **Three named modes.** Run `ori code --approvals bypass|auto|manual` or `ori tui --approvals ...`. `manual` prompts on every ask.
  * **Mode picker in chat.** Bare `/approvals` opens a picker for the three modes. `/approvals manual` still sets the mode directly.

  ## Login

  * **Login chooser.** First run asks how Ori connects to OpenRouter: OAuth, a pasted API key, or the `OPENROUTER_API_KEY` in your shell. Ori no longer adopts a key it finds in your environment without asking.
  * **Persisted preference.** The choice lands in `~/.ori/config.json` as `loginMode`, so the chooser stays out of the way. Run `ori login` to see the current mode and pick another one.
  * **Enterprise disable flags.** Set `ORI_DISABLE_OAUTH_LOGIN`, `ORI_DISABLE_API_KEY_LOGIN`, or `ORI_DISABLE_ENV_KEY_LOGIN` to remove a sign-in method. The chooser, the hints, and credential resolution all respect the flag.
  * **Key validation.** Ori validates a pasted key before it saves it and reports a failure in plain language.

  ## Schedules

  * **Live arming.** A feature reload re-arms the schedule timers under `ori dev`, `ori start --watch`, and the split session. A cron edit used to write a correct file that no timer ever read.
  * **Honest state in `ori schedules`.** Each schedule reports an `armed` field that reflects a real timer. An unarmed schedule reports no next fire time, so a disabled schedule, an invalid cron, and a schedule with no upcoming fire all read as not armed.
  * **Guidance for agents.** The schedule skill states that a schedule arms after the turn that writes it ends, so an agent stops polling `ori schedules` for a reload that cannot land yet.

  ## Runtime and contracts

  * **One service shape.** Every `Context.Service` class carries its own `layer` and `layerTest` static members. Detached live-layer files and free-standing layer constants are gone, so a service and its wiring sit in one file.
</Update>

<Update label="0.8.0" description="August 21, 2026" tags={["Breaking","Minor"]} rss={{ title: "Ori 0.8.0", description: "This release makes Ori's own agent loop the default harness and unbundles Pi." }}>
  This release makes Ori's own agent loop the default harness and unbundles Pi. The loop ships built-in tools, steering, background subagents, session resume, and an approval posture that answers routine command asks for you. Threads let a feature start child work, watch its events, intercept its operations, and ask a model for typed output. The CLI adds MCP and harness inspection commands, starts faster, and asks you to confirm a key it found on disk. The chat TUI reports usage and spend, and it recovers when your OpenRouter credit runs out.

  ## Breaking changes

  * **First-party loop by default.** `ori code` and `ori tui` run on Ori's own agent loop instead of Pi. Launch another harness explicitly when you need it.
  * **Pi is no longer bundled.** The CLI does not ship or install Pi. This release still carries the Pi fixes below for installs that keep it.
  * **Key confirmation.** Ori asks you to confirm before its first billable call when it uses an OpenRouter key that it discovered in a project directory. Non-interactive callers that relied on the previous silent behavior must approve the key in advance.

  ## Agent loop

  * **Native turn loop.** The loop runs turns in process on the OpenRouter API, with steering, an ordered message inbox, background subagents, and goals.
  * **Built-in tools.** The loop ships its own bash, read, write, edit, glob, and grep tools. The edit tool applies changes through a patch envelope.
  * **Tool boundary.** Each tool declares its capabilities and schema, the loop controls per-turn tool visibility, and a cancelled call stops structurally.
  * **Sessions.** The loop persists session history and resumes a previous session.
  * **Compaction.** A compaction extension point and a prompt strategy keep long sessions inside the context window.

  ## Approvals

  * **Auto approvals by default.** An attended session answers routine command asks with a classifier verdict on the session model. Doubtful, destructive, or escalated calls still reach you. Pass `--approvals manual` to answer every ask yourself.
  * **Approval and sandbox axes.** The native harness separates who approves a call from what the sandbox allows it to do. A remembered answer outranks the classifier in both directions.

  ## Threads

  * **Thread primitive.** A feature creates threads with parent links and a spend budget. Cancelling a parent cancels its children.
  * **Live event view.** `watch` gives each thread a bounded live view of its own events.
  * **Operation chain.** `intercept` gives each thread a typed chain that can observe and change its operations.
  * **Structured output.** `promptFor` asks a model for a value that matches a schema, so a feature thread receives typed output.
  * **Extension points.** Extension points now use typed tokens and declare a conflict policy, so two contributions to one point resolve predictably.
  * **Cost accounting.** Turns carry real cost accounting, and the production model invoker reports a context occupancy signal.
  * **Harness certification.** A seam certification suite and a journal equality law let a new harness prove that it behaves like the others.

  ## CLI

  * **MCP inspection.** `ori mcp list` shows the configured MCP servers, and `ori mcp test` checks that one of them answers.
  * **Harness inspection.** `ori harness list` shows the harnesses the CLI can launch.
  * **Faster cold start.** The CLI starts about 300ms sooner because command runtimes load lazily and the telemetry flush detaches from exit.
  * **Update visibility.** `ori update` prints the current version and the target version, and it calls `brew upgrade` for a Homebrew install.
  * **Key ownership.** Login says whose key Ori is about to spend.
  * **Model picking.** `ori claude` seeds capabilities per model, the picker drops catalog models that cannot take text input, and first-party Claude rows read cleanly.
  * **Workspace model.** `ori code` inherits the project workspace model, and `ori harness test` picks its own model and passes on a fresh workspace.
  * **Scaffolding and validation.** Feature scaffolding produces working hooks and API features, and the feature validate summary agrees with the flags you passed.
  * **Harness binaries.** The CLI resolves harness binaries against the live PATH and keeps the installer's bin directory on it.
  * **Pack and schedule.** Pack keeps stripping pointer keys after metadata empties, and the scheduler rejects a cron expression that it cannot arm.

  ## Chat TUI

  * **Usage panel.** `/usage` opens a panel that reports usage and spend for the session.
  * **Credit recovery.** The TUI opens the model picker when your OpenRouter credit runs out, so you can continue on another model.
  * **Readable output.** Clickable links stay underlined at rest, tool arguments share one clipping budget with their disclosure, and console diagnostics go to a file instead of the frame.

  ## Pi

  * **Prompt caching.** Pi routes Anthropic models through the completions path, so prompt caching works again.
  * **Token caps.** Pi marks and releases the max-tokens cap that a 402 response forced, and it clears caps that earlier versions left on disk.
  * **Setup checks.** Ori enforces a minimum Pi version and adds a Pi check to the harness doctor.
  * **Session and extensions.** An inherited OpenRouter session id wins in the Pi runtime, the ACP launch path loads the MCP extension, and a 402 failure keeps the full keys-page URL.
  * **Setup warnings.** Pi setup warnings route through the global log bridge instead of the frame.

  ## Eval

  * **Failed runs.** Eval stops calling a model after three consecutive failed runs, and it never sends an empty candidate to the judge.
  * **Judge provenance.** Eval pins the judge slug it resolved and records it with the run.
  * **Run outcomes.** Eval uses one run-outcome vocabulary and real service layers.
  * **Report scope.** The report states the tallied scope and reconciles it against the durable record.
  * **Context inventory.** Eval prints a context inventory before the run spends anything.

  ## Runtime and runloop

  * **Clean stdout.** The daemon keeps its stream diagnostics off stdout, and console output keeps its real call sites.
  * **Dev descriptor.** Teardown restores a dev descriptor that another runtime clobbered.
  * **Boot events.** The runtime emits the boot-entered event only for the booting fiber and resolves skills before it takes a permit.
  * **Prompt order.** The system prompt places the persona first and the dashboard instructions last.
  * **Pipe safety.** An unread prompt pipe no longer fails a harness run with EPIPE.

  ## Skills and Slack

  * **Log inspection.** The code feature ships an inspect-logs skill for cross-session diagnostics.
  * **Self-development skill.** The feature-development builtin skill is now called selfdev, and its references and logging guidance no longer repeat.
  * **Slack voice.** A workspace persona outranks the surface voice rules.
  * **Slack tables.** Markdown tables convert to a form Slack accepts instead of failing the post.

  ## Reliability and tooling

  * **Runtime image.** CI builds the runtime image and publishes it to Artifact Registry through workload identity, and only on a release.
  * **Quality gates.** Lint rules replaced the ratchet framework. They cover try statements, promise running, raw JSON calls, layer construction, suppressions, literal duplication, discriminant dispatch chains, and comment lines.
  * **Effect adoption.** Filesystem and path access, date construction, tagged errors, and service keys now use Effect primitives across the framework, CLI, and tooling.
  * **Test stability.** Fixes landed for the dev CLI, boot flight, and peer path flakes.
  * **Toolchain.** The repository runs on Bun 1.4.0. Dead code and unused exports are gone.
</Update>

<Update label="0.7.1" description="August 15, 2026" tags={["Patch"]} rss={{ title: "Ori 0.7.1", description: "This release adds the Prime Agent, DeepSeek Harness, and Grok Build harnesses to the CLI." }}>
  This release adds the Prime Agent, DeepSeek Harness, and Grok Build harnesses to the CLI. `ori pi` now runs through the OpenRouter Responses API, and one flag pins reasoning effort for every harness. The chat TUI lists your OpenRouter presets in the model picker and reports per-turn speed. The runloop also fixes several skill materialization faults, and the test suite runs in shards.

  ## Harnesses

  * **Prime Agent.** `ori prime-agent` launches Prime Agent through OpenRouter, and `ori prime` is a shorter alias for it.
  * **DeepSeek Harness.** `ori dsh setup` prepares DeepSeek Harness, and the setup output now points at `ori dsh` instead of a bare `dsh` command.
  * **Grok Build.** `ori grok` launches Grok Build through OpenRouter.
  * **Pi transport.** `ori pi` sends its turns through the OpenRouter Responses API. The Pi model picker hides builtin providers that OpenRouter does not serve.
  * **Reasoning effort.** One `--reasoning-effort` flag pins the thinking level for every harness the CLI launches.
  * **Documentation.** The CLI docs describe the DeepSeek Harness and Prime Agent commands.

  ## CLI

  * **Link control.** `ori unlink` removes a previous link, and `ori link --no-path` links without touching your PATH.
  * **Install prompt.** The harness install offer defaults to yes, so Enter installs the harness.
  * **Pi repair.** The CLI reinstalls a Pi runtime whose install never finished.
  * **Generated SDK.** The CLI re-resolves the generated SDK when its dependencies change.
  * **Traffic attribution.** Each harness launch attributes its OpenRouter traffic to that launch.

  ## Chat TUI

  * **Preset picker.** The `/model` picker lists your OpenRouter presets, and it aligns model prices into readable columns.
  * **Turn speed.** The usage row reports tokens per second for each turn.
  * **Quieter prompts.** The `ask_user` prompt renders with less noise, and a folded group holds its command row at narrow widths.

  ## Runtime and runloop

  * **Skill materialization.** The runloop stops generating duplicate-name skill materializations, revalidates a reused skill snapshot, and serializes framework skill pruning per runtime.
  * **Progress reporting.** Materialization progress stays isolated per command, and the runtime records workspace materialization timings.
  * **Command output.** Audit output no longer blocks a command that writes to stdout.
  * **Pi imports.** Pi extension text imports stay isolated from the rest of the CLI.

  ## Docker and secret vault

  * **Placeholder warning.** The vault stub warns when a resolvable placeholder rides in the request body.
  * **Vault root rotation.** Docker restarts the containers that trust a re-minted vault root.

  ## Slack

  * **Bounded queues.** A Slack thread bounds its own turn queue, so one busy thread cannot queue unbounded work.

  ## Reliability and tooling

  * **macOS release binaries.** The release pipeline ad-hoc signs the darwin CLI binaries before it publishes them.
  * **Test suite speed.** Unit and integration suites run in shards, boot capture works again, and the coverage gate is gone.
  * **Test stability.** Chat TUI render tests wait on test-owned signals instead of timing, and `it.prop` now supplies its promised Schema arbitraries.
  * **Contracts and layout.** The eval terminal tag and usage cost carry their real domains. The link, logs, init, pack, schedules, builtins catalog, and harness workspace directories follow the repository shape rules, and the chat TUI drops Storybook.
  * **Release automation.** The CI job writes the `ori-releases` contents through the API instead of shell prose.
</Update>

<Update label="0.7.0" description="August 12, 2026" tags={["Breaking","Minor"]} rss={{ title: "Ori 0.7.0", description: "This release adds a local vault stub that terminates TLS and injects secrets for approved destinations." }}>
  This release adds a local vault stub that terminates TLS and injects secrets for approved destinations. The CLI can browse curated release notes, launch Pi, and report selected entries before it exits. Eval now follows the repository's Effect and schema rules, while the chat TUI shows turn, tool, and session durations.

  ## Breaking changes

  * **Eval JSON tags.** `data.pilot` in `ori eval --json` now includes a `_tag` with the value `"report"` or `"notice"`. Consumers that read this field must handle the tagged shape.
  * **Eval directory layout.** The eval command now uses one directory standard for subjects with more than two files. Paths for eval source files, tests, and shared test support may change.
  * **Eval service ports.** Eval discovery, history, JUnit reports, result channels, and provider attribution now use Effect services. Code that supplied these ports as free functions must provide the service layers instead.

  ## Docker and secret vault

  * **TLS and secrets.** The dev vault stub now terminates TLS, mints destination certificates, and injects `__{name}__` values from the `vault__{agentId}__{name}` namespace before it calls an approved destination.
  * **Destination controls.** The stub refuses blocked destinations during a stream and serves its tunnel over secure websockets. The destination list and secret values now live in a client-editable file.
  * **Connection safety.** The stub keeps the vault root key away from the agent, preserves binary request and response bodies, and forwards safe destination headers. It also removes injected credentials from response data.
  * **Workspace routing.** The vault tunnel upgrade sends the `x-workspace-id` header so the service can route the connection to its workspace.
  * **Service health.** The vault tunnel and upstream now expose healthchecks, so Docker can wait for both services before it starts dependent work.

  ## CLI

  * **Changelog browsing.** `ori changelog` lists curated releases and supports version selection, `--all`, and `--list`. A selected entry prints and exits without opening an interactive prompt.
  * **Pi command.** `ori pi` starts Pi with Ori's OpenRouter environment and passes remaining arguments to Pi.
  * **Claude environment.** The Claude command clears conflicting provider settings and applies Ori's OpenRouter environment before launch.
  * **Eval schemas.** Eval JSON envelopes and domain values now derive from schemas. Optional keys use the JSON-safe `optionalKey` form, and envelope construction failures use the CLI error channel.
  * **Eval structure.** Eval code now follows the Effect v4 reference shape. Commands use named services, schema tagged unions, and smaller subject directories. Eval derives each run from its terminal event, so final reports use the completed outcome.

  ## Runtime

  * **Snapshot publishing.** Snapshot generations now use content names. The publish lock no longer blocks concurrent snapshot work.

  ## Chat TUI

  * **Duration display.** The chat TUI now shows turn, tool, and session durations. It preserves timing metadata when usage is absent and keeps duration columns readable at narrow widths.

  ## Reliability and tooling

  * **Effect diagnostics.** The check gate clears fourteen existing Effect diagnostics. New diagnostics now fail the gate instead of remaining hidden in a baseline.
</Update>

<Update label="0.6.0" description="August 9, 2026" tags={["Breaking","Minor"]} rss={{ title: "Ori 0.6.0", description: "This release removes harness switching and gives the main ori code one harness engine." }}>
  This release removes harness switching and gives the main ori code one harness engine. It routes agent egress through an authenticated secret vault tunnel, so a feature can reach an upstream service without ever holding the credential. Eval can price a run before it starts, sweep reasoning effort, and take a chosen judge, and it no longer scores a crashed run as a wrong answer. Slack streaming reports liveness, reasoning, and staleness. The CLI reads its configuration through Config descriptors instead of the environment, and the runtime contracts derive their types from one schema.

  ## Breaking changes

  * **One harness engine.** ori code removes harness switching.

  ## Secret egress

  * **Vault tunnel.** Agent egress travels to the secret vault over a websocket, and the tunnel's CONNECT listener authenticates its caller and accepts connections through BunSocketServer.
  * **Redaction.** Redaction of substituted headers covers the whole outbound pipeline, and the key proxy reports its own defects as its own failure instead of an upstream 502.
  * **Stream close.** A graceful stream close delivers the bytes still buffered behind it.
  * **Specification.** RFC 0013 states the secret egress design, and the vault contract citations point at it. A test proves the key proxy's log holds no credential and records what the scrub cannot cover.

  ## Eval

  * **Cost control.** The `--pilot` flag measures what a run costs before you commit to it.
  * **Judging.** A comparison asks which judge grades it, and eval warns when the judge shares a model family with a candidate.
  * **Sweeps.** A comparison sweeps reasoning effort as well as models, and the eval docs prescribe a concurrent candidate sweep.
  * **Honest results.** A run that died is reported as a failure instead of a model that answered wrongly. Assertion failures stay readable, a dry run names the real top level throw instead of blaming imports, and markdown table cells escape backslashes before pipes.

  ## Slack and chat

  * **Streaming signals.** A streaming turn sends a liveness heartbeat, reports reasoning status, and marks itself stale when it stops progressing.
  * **Dead runtime.** The chat surface ends when its runtime dies mid turn instead of waiting on a turn that cannot finish.

  ## CLI and configuration

  * **Config descriptors.** The dev config, the init config cluster, the telemetry opt out, and the SQLite package settings resolve through Config descriptors. The runloop no longer reads `Bun.env` directly for journal and rollover settings.
  * **Troubleshooting.** `ori harness-doctor codex` diagnoses Codex install conflicts, and a failed `bun check` run points at `bun fix`.

  ## Runtime contracts

  * **One source per type.** The runtime session snapshot, the runtime stream event, and the runtime command derive from their schemas. Numeric fields that cross JSON carry an honest domain, the author usage mirror names its generation ids, and a raw runtime event payload that is not JSON is rejected.

  ## Architecture and tooling

  * **Boundaries.** The repository breaks its type only import cycles, drops the god file exemptions, and ratchets the count so it cannot grow back.
  * **Module layout.** The transcript interaction hooks, the eval command's discovery and paid run phases, the command roster, the scene catalog, and the root layer wiring move into named modules.
  * **Dependencies and tests.** The chat TUI Storybook runs on Storybook 8.6.17 and Vite 6.4.3, and a test covers the harness install then retry exec path.
</Update>

<Update label="0.5.1" description="August 7, 2026" tags={["Patch"]} rss={{ title: "Ori 0.5.1", description: "This release fixes what long sessions got wrong: reported spend, session resume, and journal volume." }}>
  This release fixes what long sessions got wrong: reported spend, session resume, and journal volume. Feature authors get a secret handle they can pass but never read, and the eval and test SDKs are now authored TypeScript. The CLI cleans up its help surface and its launch update prompt, and the repository lints with oxlint and oxfmt.

  ## Runtime and sessions

  * **Spend across processes.** A session keeps the spend recorded by earlier processes when a terminal state lands, so the reported cost covers the whole session.
  * **Resumed sessions.** The inbound record limit rises past the size that broke session resume.
  * **Journal volume.** Per token runtime events no longer flood the journal, and the journal retains its entries in a Chunk instead of re decoding on every append.
  * **Stall detection.** The runtime instruments the path before the harness starts and reports a stall there.

  ## Secrets and SDKs

  * **Secret handle.** A feature can receive a secret handle, pass it to a capability, and never read the value behind it.
  * **Eval and test SDKs.** The `ori/eval` and `ori/test` surfaces ship as authored TypeScript instead of generated shims.

  ## CLI

  * **Help.** `help` is a registered command, and the root listing shows a narrower set of commands.
  * **Launch updates.** The launch update prompt offers "Always auto-update on launch" as its first choice.

  ## Tooling and docs

  * **Linting.** The repository drops Ultracite and lints with oxlint and oxfmt. The effect lint backlog is empty, so a new violation fails instead of hiding in a baseline.
  * **Dead code.** The Claude harness loses its unreachable native event chain.
  * **Documentation.** Curated release notes moved into `docs/changelogs`, older entries read as succinct bullets without commit and pull request references, the RFC and engineering trees no longer carry internal detail, and the release mirror states a security contact and reporting path.
</Update>

<Update label="0.5.0" description="August 6, 2026" tags={["Breaking","Minor"]} rss={{ title: "Ori 0.5.0", description: "This release makes headless and non-Anthropic use practical." }}>
  This release makes headless and non-Anthropic use practical. Headless runs return agent questions to their caller, login works without a browser, and Claude uses credentials stored separately from the user's. The runtime now bounds live tails, event journals, and telemetry flushes, and an active log file rolls without interrupting followers. Evals report the provider behind each model and the reason a candidate was rejected, and the CLI release ships a filtered source tarball.

  ## Breaking changes

  * **Headless questions go back to the caller.** A headless run returns an agent question to whoever invoked it instead of answering it itself.

  ## Credentials and harnesses

  * **Headless login.** Login no longer requires a browser handoff, and `--with-key` accepts a key directly.
  * **Claude credential isolation.** ori neutralizes conflicting `settings.json` environment values and keeps Claude's credential store separate from the user's.
  * **Non-Anthropic models.** `ori {harness}` handles non-Anthropic models and stored credentials. The default no longer sets `ENABLE_TOOL_SEARCH`, which lets those models work. The Claude path prefers `ANTHROPIC_API_KEY` over Bearer auth.

  ## Evals

  The eval report names the provider that served each model. A rejected candidate now includes the condition that rejected it.

  The run gate can check slug provenance. Unknown `CatalogQuery` fields are rejected instead of ignored. Discovery failures are surfaced instead of reported as an empty eval list. Tool support is named when no endpoint serving the model provides it.

  ## Bounded memory and logs

  * **Bounds.** The daemon's live tail is bounded and observable. The in-memory event journal is bounded by retained bytes. A telemetry flush allows one in-flight batch under a request timeout.
  * **Logs.** The active run file rolls while a follower keeps reading across the roll. The boot sidecar scan streams under a concurrency cap. Log lookup finds the event log a run just wrote.

  ## Sessions

  Session ownership persists outside a feature workspace. A session's metadata sidecar continues across processes. The session clock starts at process start.

  ## CLI and install

  * **Diagnostics.** A boot warning about the global workspace now points at `ori workspace reset`. The same hint appears on the other boot warning path.
  * **Correctness.** Unknown subcommands error instead of falling through to `ori code`. The summary line reports prompt tokens rather than the uncached remainder.
  * **Installer.** The installer closes an unterminated arithmetic expansion in its telemetry identifier and refuses to run under a non-bash shell.

  ## Release and Slack

  The CLI release includes a gated, filtered source tarball. Its inventory check stays accurate when the selection rules change. A Slack attachment reaches the agent as a URL it can fetch.
</Update>

<Update label="0.4.0" description="August 3, 2026" tags={["Breaking","Minor"]} rss={{ title: "Ori 0.4.0", description: "This release moves harness authors onto a provider-neutral agent connection seam and lets Claude compact context in place." }}>
  This release moves harness authors onto a provider-neutral agent connection seam and lets Claude compact context in place. It also adds the native Codex ACP adapter and RFC tooling for reference links and cost tuning. The chat TUI and eval workspace handling receive focused fixes. Smaller fixes tighten harness defaults, Pi turn errors, the runloop keepalive test, and RFC validation.

  ## Breaking changes

  * **Agent connection seam.** Harness authors can register live provider connections through a provider-neutral runtime seam. The runtime owns session identity, resume, interruption, cancellation, and interactions without knowing the provider protocol.
  * **Harness initialization and compaction.** Harnesses now initialize from author definitions, and Claude can compact conversation context in place.

  ## Native Codex ACP adapter

  * **Wire protocol and process framing.** Codex now has native wire schemas and process framing.
  * **Connection runtime and events.** The adapter adds a native connection runtime and projects Codex events into the runtime's event stream.
  * **Requests and conformance.** ACP request handlers and adapter wiring land alongside a conformance kit.
  * **Provider registration.** The runloop can register Codex as a selected ACP provider.

  ## RFC tooling

  RFCs now use reference-appendix links as their house style, with validation to keep them consistent. A script handles the mechanical half of the RFC cost-tuning loop.

  ## Bug fixes

  * **Chat TUI.** Glider frames are deduplicated for a seamless loop.
  * **Eval workspaces.** `create-eval` collects the workspace once and reuses the record.
  * **Claude and Pi harnesses.** Claude enables `ENABLE_TOOL_SEARCH` only for Anthropic models. Pi now fails the turn when the assistant emits a trailing error.
  * **Runloop tests.** The NDJSON stream test now tolerates a keepalive tick racing the final payload while preserving payload order.
  * **RFC validation.** Undefined nonnumeric references are reported.
</Update>

<Update label="0.3.0" description="August 1, 2026" tags={["Breaking","Minor"]} rss={{ title: "Ori 0.3.0", description: "This release turns `ori code` into a real headless tool." }}>
  This release turns `ori code` into a real headless tool. A prompt now runs the agent to completion and prints a result instead of seeding an interactive chat, and callers that need to parse the output get structured JSONL. Sessions also outlive the process that started them, so a Claude or Pi run can be resumed after the CLI that launched it is gone. Alongside that, the chat TUI reworks how live activity and tool calls are rendered, `ori eval` learns to compare providers and validate an eval without spending model calls, and the source ships under Apache-2.0.

  ## Breaking changes

  * **A prompt runs headless.** Passing a prompt to `ori code` runs it to completion and prints the answer instead of seeding the chat.
  * **Code interaction forwarding is gone.** The forwarding path that let a headless run hand its questions to an outer caller is removed, and `create-eval` no longer answers its own questions.

  ## Headless `ori code`

  `ori code` runs headless when you pass `-p` and there is no TTY, and it can emit structured events with `--output jsonl` alongside `--print`. A finished run prints a summary of what it did. Before the forwarding path was removed, a headless run could also forward its questions to the caller instead of declining them.

  ## Chat TUI

  Live activity is now bracketed as a group with the command in hand previewed while it runs, consecutive thinking and tool rows collapse onto one line, and the detail cell on a row is chosen per tool category. An expanded tool call is framed as a card holding both the command and its result, on top of a reworked tool call density ladder. The working indicator glides.

  The workspace row was redesigned and its placement is configurable. The model picker prices each row and resolves aliases inline, and reasoning effort is configurable from that same picker. Selection got better: shift-click extends a transcript selection, double-click selects a word and triple-click a paragraph, and transcript links highlight individually on hover.

  ## Evals

  `ori eval` can compare the providers serving a model and recommend one to pin, backed by recording which provider served each run. A `--dry-run` validates an eval without spending model calls, and human output shows scores and the models they resolved to. `ori eval scratch` runs self-contained temporary evals, `ori eval skill` makes the eval-authoring skill reachable, and the eval reference moved behind `ori eval docs`. Eval files may no longer use absolute imports.

  ## Sessions and harnesses

  Session ownership is now persisted durably, which lets a Claude session be rebuilt from its ownership record and a Pi session be resumed after the owning process is gone. Claude moved onto the selected ACP adapter, and the Claude ACP path projects token usage and cost. Pi bash calls can carry a human summary.

  ## Runtime, telemetry, and licensing

  The ori source is licensed under Apache-2.0, as is the public ori-releases mirror. Runtime telemetry events are instrumented on the observer foundation, with `session_start` and `session_end` emitted for sessions that run agents. OpenRouter traffic is attributed to the ori session that produced it, and terminal usage is accounted per turn. `/fork` runs as a concurrent background session. Skills gained a `metadata.command-alias`, which gives `create-eval` a `/eval` alias. The key-proxy scrubs substituted secrets out of the response leg, and the OAuth callback pages picked up a terminal look in the OpenRouter theme.

  ## Credentials

  `ori auth` reports the resolved credential. When a project dotenv key and an `ori login` credential both exist, ori asks once per workspace which to use.

  ## Bug fixes

  **Chat TUI.** Only the status line animates while a turn runs, the glider indicator loops as a seamless stream, and elapsed time in it reads in human units. Abandoned tool calls are marked instead of sitting pending forever, activity groups start folded, clipped tool args expand with their tool call, expanded args survive on labeled rows, and edited file rows color their added and removed counts. An answered elicitation shows in the transcript, a free-text Ask User prompt receives typed keys, and a projected working directory is quoted with CRLF result lines normalized. The slash menu counts only the commands still hidden below its window and names an alias with its command on one row, built-in code skills are back in the palette, `/resume` opens as a prompt-region popup, overlay arrow keys stop scrolling the transcript, Cmd and Opt prompt deletion chords work, and a by-design static scene is labeled static rather than an offline bridge.

  **CLI.** A headless one-shot flushes its durable event log tail before exiting and prints the answer in one write instead of streaming it; the forwarded answer channel closes when the turn ends; a headless run that refuses an interactive request now warns. The CLI exits quietly on a closed stdout pipe and keeps feature boot diagnostics inside the TUI. Update checking honors the output mode in `ori update --check`, restates its cache after an install, decodes its envelope through Schema in tests, and tells source checkouts the truth while letting `ori update` repair missing release metadata. `ori eval` resolves auth through the shared login gate, harness launches use the `ori login` key rather than a project dotenv key, and the bundled ori SDK is injected so `ori eval` works in a fresh repo. The workspace `.ori` directory ignores itself, and the remote feature cache is reused when the ref has not moved.

  **Eval.** A guessed model slug is rejected at authoring time, the scoreboard stops reading "passed" when the test failed, a baseline that can never exist is reported as such, and the SDK preload no longer forces CommonJS deps through the ESM loader.

  **Harnesses and ACP.** A mid-turn 402 is clamped instead of losing the whole run, and the exhausted-402 error points at OpenRouter's own remediation URL. Pi waits for its retry verdict before failing a turn, recovers the session after the agent process dies, decodes tool result message ends, emits Anthropic `cache_control` breakpoints for `~anthropic` slugs, and carries the capture proxy port in the environment instead of pi's shared config. Claude pins the base URL in the missing-key case. Peer exits and protocol errors project as terminal failures. A mid-session model switch applies to the running harness, and a terminal turn failure carries the usage accumulated so far.

  **Runloop.** The local proxies stop severing a slow model stream at ten seconds, and a failed turn no longer emits a phantom model-less `run.started`. Event-id numbering resumes when a failure joins a live run. External skills are discovered up to the project root, built-in code skills are injected for plain ori runtimes, and a skill whose source directory is gone is skipped rather than failing the turn. The context-window cache is owned per provision instead of per module, the legacy `commandHook` boot diagnostic is actionable, `ori harness test` gets a per-case deadline, and the foreign-symlink skill test compares resolved paths. Runtime errors are standardized end to end, and the five schema arbitraries that could not generate are annotated.

  **Telemetry and CI.** Telemetry stops reporting user paths and attributes agent runs by harness and surface, and the CLI usage sink is wired into the daemon runtime. CI ignores release-please docs formatting and skips the private sentrux gate for fork PRs.
</Update>

<Update label="0.2.4" description="July 29, 2026" tags={["Patch"]} rss={{ title: "Ori 0.2.4", description: "This release launches agents through `ori claude`, `ori codex`, `ori opencode`, and `ori hermes`." }}>
  This release launches agents through `ori claude`, `ori codex`, `ori opencode`, and `ori hermes`. It turns `ori eval` into a harness with judges, baselines, history, and reports. Docker agents now run behind a key-proxy with declared feature secrets, while ACP requests and the chat TUI gain broader support.

  ## Agent launches

  * **External harnesses.** The CLI first adds `ori claude` with the general launch infrastructure. `ori codex`, `ori opencode`, and `ori hermes` follow through a shared passthrough command parser.
  * **Coding persona.** A bare `ori` launches `ori code`. Missing harness binaries prompt for installation. Fable registers as a first-class 1M-context model, and prompt economy works on the OpenRouter path.

  ## Evals

  * **Judge criteria.** `ori eval` ships starter judge criteria. Runs default to claude-opus-latest with a sonnet-latest judge, and the judge later pins to claude-opus-latest.
  * **Reports and history.** Each completed run reports its outcome and usage. Bun's junit reporter supplies per-test results, `.ori/eval/history.jsonl` stores run summaries, and each run can write a shareable markdown report.
  * **Baselines and authoring.** `ori eval` asserts cost and duration ceilings and compares runs with a known-good baseline. A writing-evals skill joins `ori code`, selects a model surface, and uses the widened OpenRouter model catalog. The runner offers a consented Bun install when Bun is missing.

  ## Chat TUI

  * **Themes and identity.** ^P or `/theme` opens the theme picker. Density theme tokens and the opentui transcript rebrand use one density axis.
  * **Rendering.** Streamed Markdown renders natively. A unified diff renderer lands. Streamed reasoning uses collapsible Thinking…/Thought for Ns rows. Links show an underline, and the workspace header row has a contrasting background.
  * **Tool calls.** Consecutive calls collapse into ^O-foldable groups with per-tool expansion and hover highlights. Working indicators and an explicit expand/collapse affordance improve tool progress visibility. Live tool progress surfaces as it happens, and provider retry status also surfaces during calls.
  * **Input and sessions.** A `?` hotkey opens keyboard shortcuts. The first ctrl+c clears the draft, and a second press exits. `/quit` aliases `/exit`. Resume sessions use their latest prompt as the name, and the model catalog uses a credential-free authenticated capability. An interactive storybook with live xterm.js terminals supports TUI development.

  ## Docker deploy and the key-proxy

  * **Key-free agents.** The agent container sends requests through a key-proxy that holds the credential. Container egress is locked to that proxy.
  * **Deployment image.** A repo-buildable prod-emulation container ships with `dev:docker`. The key moves to a secret file, the workspace becomes configurable, and pi plus web-tools dependencies bake into the dev image. The updater syncs managed deployment artifacts.

  ## Feature secrets and ACP

  * **Declared secrets.** Features declare needed secrets with a placeholder sentinel. Contracts decide which placeholders can be substituted and resolve each placeholder to its value and allowed hosts. The key-proxy substitutes declared secrets on the request leg, so the agent never sees them.
  * **Interactive requests.** Agents ask questions during a turn. Interactive request events join the contracts, the engine adds an interaction lifecycle service, and the engine bridges ACP interactive requests. The TUI renders dialogs. Pi gains `ask_user`, and the runloop drives Pi interactions over ACP.

  ## Workspaces, skills, and the CLI

  * **Workspace lifecycle.** The global workspace gains an archive primitive and `ori workspace reset`.
  * **Skills.** `ori skills` fetches built-in skills. External agent skills load from the launch cwd as a builtin, and the `ori code` agent gains a schedule skill.
  * **CLI controls.** An initial prompt accepts `--prompt`, `-p`, or `--prompt-file`. `ori code` runs an interactive update check with an early-access opt-in, and `ori --version` shows update status. `ori ci` adds a boot-check and absorbs lint. Reasoning appears in logs, and `mcp.json` configures MCP servers for harnesses and `feature.ts`.

  ## Runtime and contracts

  * **Feature APIs.** `FeatureApis` typing is auto-generated, and per-pair `use()` gating is dropped. The `use("slack")` provider type generates into the ori SDK.
  * **Runtime events.** Canonical agent-update events project into the runtime journal, and the selected-adapter coordinator-core is extracted.
  * **Telemetry.** The neutral telemetry observer contract and RFC 0012 are defined. An opt-in OTLP event-exporter layer lands in the runloop. Eval runs and activation latency are reported, and the installer tracks its telemetry.

  ## Reliability and tooling

  * **Quality gates.** lintcn integrates into CI with a no-isrecord rule. The sentrux fork pin fixes max\_depth counting for type-only edges, and markdownlint disables its unfixable MD060 rule.
  * **Release checks.** The compiled CLI release smoke test is repaired. Worktree cleanup continues after a worktree it cannot remove.

  ## Bug fixes

  * **Transcript rendering.** The reasoning disclosure caret aligns with the row gutter. The resolved theme background applies to the terminal surface. Hover and expand UX unifies across transcript disclosures. The TUI stops tearing when the terminal is resized.
  * **Resize handling and footer status.** One terminal-dimensions resize listener is shared across the tree. The footer decodes percent-encoded worktree basenames. It shows the model a `~` alias resolved to. It separates workspace from usage status.
  * **Input and clipboard behavior.** `/compact` echoes the typed line instead of a synthetic prompt. Drafts clear properly and slash menus are capped. Clipboard images read without pngpaste and decode with Jimp. The clipboard image hint stops appearing for text copies.
  * **Session startup and diagnostics.** The first message renders when the runtime re-mints the session id. Remembered-model startup logs are silenced. Capture proxy logs stay out of the TUI. Apple Terminal prompt marks are avoided.
  * **Storybook coverage.** Storybook scenes get their required helpOpen prop. The theme background test uses a valid working indicator.
  * **Session reattachment and ACP queues.** Sessions reattach with session/resume so replies stop repeating. The ACP notification queue no longer overflows. Client-minted session ids stop going to selected adapters.
  * **Pi message decoding and usage.** The pi-ACP adapter decodes the user's own message\_end instead of logging it as malformed. It surfaces pi token usage and cost. pi turns are priced from OpenRouter's streamed usage.
  * **Pi runtime and tool interactions.** Pi preserves production behavior over ACP. It hardens tool result replay. It allows custom ask-user responses. Its install and runtime use ori-as-bun, so fresh machines need no external bun.
  * **Pi elicitation UI.** The runloop advertises form elicitation so Pi `ask_user` works. `ask_user` renders a real selector without diagnostics corrupting the screen. It submits and clears its responses properly.
  * **Claude result handling.** On the Claude side, a run that exits without a result now fails properly. Bundled skills are disabled for `ori code`. Anthropic model-tier env vars default on the OpenRouter path.
  * **Codex authentication and Bun runtime.** Codex uses command auth so model metadata resolves. Bun bumps to 1.3.14 so `ori claude`/`codex`/`opencode`/`hermes` can launch at all.
  * **Eval runner setup.** The runner accepts the eval target positionally and spawns bun test from a real directory. It resolves bun to an absolute path first. It applies a 120s default per-test timeout. Each history prune gets its own temp file.
  * **Judge validation and verdict parsing.** The judge's 0..1 score bound is enforced on every transport. It survives harnesses that ignore outputSchema. It recovers verdicts from assistant-message envelopes. It scans balanced verdict objects.
  * **Bakeoff results and reports.** Judge runs are told apart from bakeoff candidates. A cut-off bakeoff candidate stays in the results. The baseline scopes to the eval files that actually ran. The judge's reason is quoted in the shareable report.
  * **Eval output and SDK checks.** Dev progress notices stay off stdout in json mode. A scaffolded workspace typechecks against the shipped SDK.
  * **Writing-evals scaffolding.** The writing-evals skill broadens its dispatch to bare model-selection prompts. It produces `*.eval.ts` in any-language repos.
  * **Telemetry and JSON output.** The telemetry first-run notice names CLI commands and is boxed. Runtime diagnostics stay off the `--json` envelope stream. `ori init --json` is parseable and stops guessing the next command. `ori init` retries transient template download failures.
  * **Workspace recovery and updates.** A stale global workspace repairs itself so the dashboard feature builds on boot. Auto-scaffold fails loudly on a broken bun install. The update channel resolves from the installed release. Usage cost reports in alpha builds.
  * **Managed skills and workspace loading.** Managed skills route through the docker key-proxy. Their sources are preserved. Global workspace skills load in `ori code`. Skills stop materializing into the launch repo.
  * **Model aliases and telemetry details.** The `-latest` model aliases are tilde-prefixed. `web_search` points at a configurable OpenRouter base URL. The telemetry command prop records only the resolved command path. Telemetry tags environment kind and reports real CLI errors.
  * **Runtime recovery and event limits.** The runtime boots through a broken feature instead of dying. NDJSON turns stay alive with a 30s keepalive line. The in-memory runtime event journal is bounded to stop host memory growth. A project feature can replace a built-in of the same name.
  * **Compiled feature resolution.** Compiled binaries bundle feature package subpaths. They resolve the package.json `imports` field in fresh module bundling. Bare package roots resolve so SDK features load. Packages resolve from disk so feature schedules build.
  * **Schedule record decoding.** The schedule feature decodes persisted run records instead of coercing unknown status to ok.
  * **Contracts.** The journal entry sequence decodes as a non-negative integer. A stale commandHook-contract command is rejected instead of crashing at dispatch. Per-run userId stops dropping from persisted session metadata. The dev event log property test stops flaking on non-json payloads.
  * **Docker and Slack.** Every dev container gets its own telemetry install id. Slack persists queued turns and replays them after a restart. It reports an error when a turn dies without a terminal event.
</Update>

<Update label="0.2.3" description="July 19, 2026" tags={["Patch"]} rss={{ title: "Ori 0.2.3", description: "This release centers on ACP agents, with Claude Code and Pi backed by a scoped connection runtime." }}>
  This release centers on ACP agents, with Claude Code and Pi backed by a scoped connection runtime. Typed hooks, context rollover, compaction, and the chat TUI also advance. Slack, CLI tooling, and reliability gates receive focused improvements.

  ## ACP agents and typed hooks

  * **ACP agents.** Claude Code and Pi expose Effect-native ACP agents on a scoped agent connection runtime.
  * **Typed hooks.** A typed user-space hooks runtime lands with its contract, codegen, and documentation foundation.

  ## Runloop and context management

  * **Rollover and compaction.** Sessions roll over at the context threshold. pi compaction uses the model context window. Native harness compaction is preferred at the threshold, and harness compaction decodes into runtime events.
  * **`use()` everywhere.** Command, schedule, and chat contexts gain `use()`.

  ## Chat TUI

  * **`/resume` and `/compact`.** `/resume` picks up a previous session inside the chat TUI, and `/compact` routes per harness.
  * **Context visibility.** The `/context` command and context window visibility land in the `ori code` TUI.
  * **Status line and footer.** The TUI shows the current git branch beside cwd and removes the redundant footer cache chip.
  * **Rendering and input.** Tool output gains syntax highlighting and hover-brightened traces. Clipboard images paste with cmd+v/ctrl+v, and resumed transcripts warn on a harness switch.

  ## Slack

  * **Cancel and status.** A text-based "cancel" command stops stuck runs. An early loading status posts before turns enter the queue.
  * **Context and filtering.** Undirected channel messages are filtered out. The per-turn Slack context shows the active harness and model.

  ## CLI and tooling

  * **`ori dev` and diagnostics.** An interactive events panel lands in `ori dev`, which logs its resolved execPath/main/argv before dev and update restarts.
  * **Remote features.** Remote-features fetch retries over SSH when HTTPS fails.
  * **Coding persona.** The coding persona gains dedicated code-practice skills.
  * **Eval.** `ori eval` model comparison uses OpenRouter's live catalog instead of a hardcoded list.
  * **Skills and repo-inspo.** The `openrouter-skill-slug` managed skill pointer ships, and repo-inspo pins its Effect source to `package.json`.
  * **Contracts.** A shared runtime lifecycle event vocabulary lands for reuse across harnesses.

  ## CI and reliability

  * **Governance.** A multi-metric governance ratchet gates quality, suppressions, and literal dupes. sentrux and the ratchet run on pre-push with a fork-ensure step.

  ## Bug fixes

  * **Chat TUI.** The in-flight `/model` steering test is deflaked. The transcript is padded so the scrollbar and chatbox stop crowding content. Pickers now preselect the active harness and model. Copy falls back to `pbcopy` on Apple Terminal.
  * **Slack.** The thread status pill clears once the reply bubble posts. Markdown tables auto-convert to native Slack table blocks. An unconfigured chat surface is skipped instead of failing.
  * **Logging, panel layout, and feature deps.** `.ori/logs` bounds `raw.payload` and NDJSON line size. The split panel gets exact pane widths and full chat mouse forwarding. Composing `--features` sources now installs the real workspace's own deps.
  * **Lint configuration and formatting.** `ori lint`'s knip config parses `.tsx` feature files. It runs oxfmt after oxlint `--fix`. It stops flagging `use()`-only cross-feature deps as unused.
  * **Host configuration and workspace paths.** An explicit `--host`+`--port` pair now reads `featuresRoot` from the descriptor. An optional `ori` `file:` dependency is recognized as an existing workspace. The dev/update re-exec argv no longer leaks the `/$bunfs` path. A `SKILL.md` model no longer overrides the workspace `ori.md` model.
  * **Harnesses.** The pi-ACP adapter uses the pipe form for a missed pipeable opportunity. Claude Code stops prefixing prompts with the stdin dash placeholder. pi runtime siblings are pinned to prevent an oauth drift crash.
  * **Runloop and CI.** `ori code`'s harness cwd anchors to the launch directory instead of the global workspace. Managed skill links self-heal, with softer pointer fallback diagnostics. The architecture gate now fails on a sentrux quality-score drop. Main's stale quality baseline is refreshed.
</Update>

<Update label="0.2.2" description="July 14, 2026" tags={["Patch"]} rss={{ title: "Ori 0.2.2", description: "This release adds the `command` contribution kind, a deterministic `/name` action for the TUI and Slack." }}>
  This release adds the `command` contribution kind, a deterministic `/name` action for the TUI and Slack. ACP gains its wire foundation and connection runtime. Workspaces can declare feature sources, while sessions, model picks, and tool rendering improve.

  ## Command contribution kind

  * **`/name` action.** A seventh capability authored as plain TypeScript dispatches pre-agent for people in the TUI and Slack. A loader, registry, pre-agent slash-command router, and Slack command gate support the action, including DMs.

  ## ACP and declarative features

  * **Wire foundation.** An Effect-native wire foundation lands for ACP.
  * **Connection runtime.** A scoped connection runtime builds on the wire foundation.
  * **`ori.md` frontmatter.** A workspace commits feature sources in `ori.md`, while the repeatable `--features` flag supplies them per invocation.
  * **CI toolchain.** Remote composed features resolve for the CI toolchain.

  ## Chat TUI

  * **Session switching.** Sessions get a dedicated page with per-session transcripts, and session selection is smoother.
  * **Model and harness.** `/model` and `/harness` picks are scoped.
  * **Rendering.** Tool call rendering is lighter, and the slash menu suggests feature commands and skills.

  ## Runtime, contracts, and deploy

  * **User attribution.** `agent.invoke` carries an optional `userId` through the harness to durable session metadata.
  * **Agent events.** Agent events use an Effect-native representation.
  * **JSON helpers.** `encodeJsonString` Schema helpers replace raw `JSON.stringify` at boundaries.
  * **Deploy.** Headless deploy artifacts and a runbook ship. A tunable resource backstop follows shortly after.

  ## Reliability and tooling

  * **Diagnostics.** The tsconfig becomes the source of truth, and seven previously-clean rules become errors.
  * **Process cleanup.** Harness process subtrees are reaped on teardown instead of leaking.

  ## Bug fixes

  * **Slack.** Prior-turn context now reads the full reply-cache text instead of Slack's 200-char notification fallback. An expired trigger falls back to a thread reply while keeping the full reply modal-only.
  * **Terminal input and boot defaults.** Raw wheel reports forward to the chat pane instead of being read as arrow keys. Boot failures surface instead of hiding behind a silent model fallback. The default model scaffolds to `openrouter/auto`. Bundled feature modules rewrite `import.meta.dir` correctly.
  * **Remote feature validation.** A remote feature root's declared deps install after fetch. Feature directory names are validated at load time.
  * **Chat startup and turn routing.** Prefetch and `start()` now share one chat-app import instead of loading it twice. Streamed turns route per session and the footer is more compact. The `/model` picker sorts by weekly popularity.
  * **Model state persistence.** `/model` slugs are validated and runtime metadata is exposed to `ori code`. The last `/model` and `/harness` picks are remembered across restarts.
  * **Terminal compatibility.** Bracketed paste stays enabled on Apple Terminal so multi-line pastes stay one prompt. Any-motion mouse mode and the cursor-color OSC are stripped from Apple Terminal host output.
  * **Harness.** `IS_SANDBOX=1` is injected into the claude subprocess env.
  * **Runloop.** Invoke-stream failures encode as terminal runtime events instead of hanging.
  * **Error formatting.** The remaining error-formatting holdouts are converted and the rule is now mechanical.
</Update>

<Update label="0.2.1" description="July 11, 2026" tags={["Patch"]} rss={{ title: "Ori 0.2.1", description: "Slack becomes a complete chat surface with cancel and recovery flows." }}>
  Slack becomes a complete chat surface with cancel and recovery flows. The `api` contribution kind and remote feature sources expand the framework. The CLI gains telemetry and update controls, while the TUI adds session commands, footer stats, and markdown rendering.

  ## Slack chat surface

  * **Cancel and recovery.** A Cancel button sits beside See details and stops an in-flight turn. Its styling and size match neighboring controls. Interrupted tool rounds are rescued and reprompted instead of leaving a bare "done" marker.
  * **Dispatch and participants.** Five bugs in dispatch, thread history, and finalize are fixed. Auto-mute no longer counts the agent as a participant and no longer misses other apps in the room.
  * **Response delivery.** Successful runs return the real result instead of the See details placeholder. Prose recovery keeps prompts and tool output out of replies, and the loading indicator appears sooner.
  * **Modals and prompts.** The expand modal opens with the ack. Expired triggers fall back to a thread reply, and the turn prompt is more insistent about always ending with a summary.

  ## Remote features and the `api` contribution kind

  * **Remote sources.** `ori start --features` accepts a remote GitHub repo path as well as a local directory. A GitHub App token fetches it, and multiple `--features` sources collapse into one root.
  * **API contribution.** The `api` contribution kind ships with exports and daemon HTTP routes for feature APIs.

  ## Chat TUI

  * **New session.** `/new`, aliased `/clear`, starts a fresh session without a process restart.
  * **Footer and stats.** The footer uses one line and a reserved toast row. It shows session cost, turn count, cwd, and the harness default model on the first frame.
  * **Model state.** The resolved model reappears after a brief gap, and footer padding matches the TUI rhythm.
  * **Rendering and controls.** `ori code` highlights GFM markdown. The slash menu supports arrow-key cycling, image attachment tokens are compact, `/model` and `/harness` work mid-turn, and a second Ctrl+C is required to exit. Clicking a message restores prompt focus.
  * **Terminal compatibility.** Transcript links open on Apple Terminal. Stray bracket sequences and synchronized-output mode-sets are sanitized in the chat and schedules views. Mid-turn messages show transcript feedback.

  ## CLI and telemetry

  * **Session resume.** `--resume` and `--session` let `ori code` reattach to a previous session.
  * **Auto-update.** `ori start` supports `--alpha` and opt-in `--watch` hot reload. `ori update` shows progress during transient retries and skips downloads for the latest release.
  * **Telemetry.** A first RFC 0012 usage telemetry client tracks installs and command usage client-side.
  * **Auth and lint.** OAuth-provisioned keys use the `key_label` value "Ori". `ori lint` follows the repository lint standard, includes markdown, and folds in syncpack and knip. Oxlint and markdownlint run concurrently.
  * **Skills.** Managed skills resolve from a frontmatter pointer at boot instead of a hardcoded path.

  ## pi harness and contracts

  * **Prompt delivery.** Large pi prompts pass through files instead of argv to avoid E2BIG.
  * **Reliability.** `max_tokens` is clamped, OpenRouter 402s retry, and native text selection in `ori code` is no longer swallowed.
  * **Model ids.** The model picker stores plain catalog ids, while the pi harness owns the `openrouter/` prefix. Harness defaults also show plain catalog ids.
  * **Attribution and contracts.** OpenRouter attribution uses `https://or.bot`. Runtime event tags survive string-contract repair after the cohesion review flags rot.

  ## Reliability and tooling

  * **Sentrux.** The boundary gate enforces its rules for real, seeded from the cohesion why-map.
  * **CI.** The lcov-only coverage reporter returns after a prior revert. `typecheck:effect` gates notice and warning, not just error. `ori code` event logs name their runtime, and `release-cli` forces `make_latest` on the newest stable build.
  * **Contract sync.** The feature-development export set is back in sync with the contract, closing a guard drift.
  * **Runloop.** Headless runs gain a durable event log, workspace-anchored state, opt-in schedule jitter, and an overlap policy.
  * **State and performance.** `ori/state` ships in the SDK, and Slack uses the same store. The chat renderer prefetches during pre-render work to cut some startup latency.
</Update>

<Update label="0.2.0" description="July 6, 2026" tags={["Breaking","Minor"]} rss={{ title: "Ori 0.2.0", description: "The chat TUI becomes an interactive surface with model and harness pickers, run steering, prompt recall, and rendered markdown." }}>
  The chat TUI becomes an interactive surface with model and harness pickers, run steering, prompt recall, and rendered markdown. Slack, durable session logs, the pi runtime, and TypeScript 7 with Effect tooling also land. Read the breaking change before consuming runtime events.

  ## Breaking changes

  * **Event tags.** Harness runtime events no longer carry a boolean success flag. Each event uses a succeeded or failed tag for discrimination.

  ## Chat TUI

  * **Model picker.** `/model` switches the OpenRouter model in the TUI. The list filters text-in/text-out models, supports `:nitro` and `:floor` variants, and matches the `ori code` `--model` flag.
  * **Harness picker.** `/harness` swaps the active harness.
  * **Run steering.** Enter steers an in-flight run, and ESC interrupts it while keeping prompt focus. The behavior follows RFC 0005.
  * **Prompt recall.** Up/down recalls prompts, and `/exit` quits the chat.
  * **Rendering.** Replies render as markdown, and URLs are clickable. Tool calls always show collapsible result boxes. The footer shows live token usage, cost, and a copy-on-select toast.
  * **Layout.** Ctrl+R and `/refresh` redraw on demand. Terminal focus and SIGCONT also trigger redraws.
  * **Tree-sitter and picker.** The tree-sitter worker stays embedded so syntax highlighting survives compiled binaries. Picker rows remain readable.
  * **Slash commands and footer.** Enter runs the highlighted slash command on a half-typed prefix. The footer shows the current model once.
  * **Terminal layout.** The TUI stays in the foreground process group for SIGWINCH reflow. The input bar is wider and always shows the default model and harness. Ori strips stray bracket sequences on Apple Terminal.

  ## Slack chat surface

  * **Slack.** A built-in Slack chat surface from sniffer lets an intern hold a conversation in Slack as in the TUI.

  ## Concurrent sessions and durable logs

  * **Spawn-thread.** `/spawn` shows a usage hint, seeds concurrent sibling sessions from a shared parent, and keeps the picked model. The feature follows RFC 0003.
  * **Durable logs.** Every daemon mode writes a durable session log with metadata sidecars, so a run's transcript survives past the process.
  * **`ori code` persona.** `ori code` boots against the global workspace with a built-in coding persona.
  * **Alpha channel.** An opt-in alpha pre-release update channel is available for early builds.

  ## pi harness runtime

  * **Routing defaults.** pi defaults to `z-ai/glm-5.2`, forces the OpenRouter provider prefix, and routes unset sessions through OpenRouter.
  * **Bun runtime.** pi runs on the Bun runtime by default with graceful fallbacks. It degrades to a direct spawn when pi on PATH is a non-JS wrapper. It re-defaults to Bun with a fallback when ori is compiled. The pi symlink is canonicalized to the real `cli.js`. The launcher passes `--bun` so the node shebang does not trampoline through `.l2s`. This re-lands and stabilizes the earlier Bun default. pi is installed into an ORI-owned copyfile runtime dir rather than `bun add -g`.
  * **web\_fetch SSRF.** DNS resolves before the SSRF check, and the socket pins to the vetted IP to close the TOCTOU gap.
  * **Fixtures.** Real pi fixtures render tool-result text in the TUI.

  ## Contracts and reliability

  * **StateStore.** The StateStore contract gains close/dispose lifecycle support in the sqlite store.
  * **Event provenance.** Author runtime events carry the harness name. Runtime event schemas accept present-but-undefined optional payload fields.
  * **Process teardown.** Harness timeout escalation to SIGKILL and stderr joins are bounded. Racing process-stream timeout paths use one finalizer.
  * **Tool results.** `harness-claude` emits `ToolCompleted`, so `ori code` renders tool results.
  * **Runloop and reload.** The resume-prefix buffer is bounded with a centralized missing-session matcher. Dev reload is atomic and carries the watch to poll baseline. `ori code` no longer creates a `.agents/skills/feature-development` symlink.

  ## Tooling and packaging

  * **TypeScript 7 and Effect.** The toolchain moves to TypeScript 7 with the Effect language-service and tsgo. The effect-migrate harness applies `multipleEffectProvide` fixes with prefiltered discovery and a non-convergence guard. Test mocks and the editor tsdk remain compatible with stock tsserver.
  * **Linting.** `explicit-function-return-type` is enabled, the 420-line file cap returns, and `typescript/no-unnecessary-condition` is enabled with all 195 violations fixed.
  * **Docs and packaging.** `generate-docs` supports a `--check` mode wired into `check`, so stale docs fail the gate. `pack` supports `--target` for host-only compilation. Test fixtures disable the global pre-push worktree-guard hook.
</Update>

<Update label="0.1.1" description="June 30, 2026" tags={["Patch"]} rss={{ title: "Ori 0.1.1", description: "This consolidation release adds feature compatibility and migration reporting." }}>
  This consolidation release adds feature compatibility and migration reporting. It also adds framework-owned linting, an evaluation harness, and scheduler reliability improvements.

  ## Feature compatibility and migration (RFC 0002)

  * **Version provenance.** `ori init` stamps the generating CLI version into `ori.md` frontmatter.
  * **Capability lifecycle.** A bundled registry keyed by CLI version records capability introduction, deprecation, removal, and breaking shape changes. Its migration report uses the `schedule` default-export to named `export const schedule` as the canonical example.
  * **Report engine.** A pure engine compares loader diagnostics with the workspace stamp and running CLI version. It explains compatibility failures instead of letting older workspaces fail silently. It classifies findings as blockers, warnings, or notes.
  * **Surfaced reports.** `ori features validate` shows the report. `ori update` exits non-zero on a blocker and advances the workspace baseline after a clean report. Existing-target sync in `ori init .` also shows it.
  * **SDK surface.** Built-in and external feature imports converge on the bare `ori` SDK specifier.

  ## `ori lint`, framework-owned linting

  * **Framework rules.** `ori lint` ships as a first-class command, and scaffolded workspaces no longer carry their own biome config.
  * **Internal enforcement.** The codebase rejects circular dependencies, wildcard imports, and relative-parent imports. Correctness rules increase, `exactOptionalPropertyTypes` is enabled, and functions use at most three parameters.

  ## Evaluation harness

  * **Author surface.** The `ori/eval` author surface and `ori eval` command let features ship evaluations beside their code.

  ## Scheduler

  * **Catch-up.** Schedules can opt in to missed runs after restart instead of skipping them.
  * **Disable without deletion.** A `disabled` frontmatter flag holds a schedule off cron while keeping it in the workspace.

  ## Chat TUI and operations

  * **Tool-call rendering.** The chat TUI renders tool calls with selectable verbosity levels.
  * **Auto-update.** `ori start` auto-update no longer waits on a Slack approval step.

  ## Reliability

  * **Structured diagnostics.** CLI, contracts, and loaders preserve structured error diagnostics instead of flattening them to strings.
  * **Daemon errors.** The daemon serializes HTTP errors as a structured envelope.
</Update>

<Update label="0.1.0" description="June 27, 2026" tags={["Minor"]} rss={{ title: "Ori 0.1.0", description: "The first tagged release brings up Ori's declarative agent-building stack defined by the RFC suite." }}>
  The first tagged release brings up Ori's declarative agent-building stack defined by the RFC suite. It introduces feature contributions, a local runtime, the `ori` CLI and dev loop, pluggable harnesses, and compiled-binary boundaries.

  ## Features and runtime

  * **Feature contract.** `feature.ts` uses the compiler-enforced `satisfies FeatureModule` contract. Manifest discovery and contribution-kind registries support skills, prompts, generations, and `getModel`. A boot-time registration pipeline runs agents from feature boot results. The model follows RFC 0002 - Feature Contribution and RFC 0005 - Adapter Interfaces.
  * **Local runtime.** Resolved artifacts build and boot locally. The runtime provides a built-in cron scheduler and the `schedule` capability, provider selection, multiple schedules per feature, a SQLite state store, and edit-mode reload with snapshot-generation skill materialization. The runtime follows RFC 0003 - Runtime Architecture and RFC 0008 - Dev Server.

  ## CLI and interfaces

  * **Commands.** The CLI includes `init`, `dev`, `start`, `code`, `login`, `update`, and `version`. `ori start` runs a headless bot server, `code` runs a local coding agent, and `login` uses OpenRouter PKCE. `ori init` scaffolds from a default template and root `ori.md` persona, writes an `AGENTS.md` guide, and validates the workspace. The CLI follows RFC 0004 - CLI.
  * **Chat and terminal UI.** The chat TUI supports `Shift+Enter`, multi-line paste, OSC 52 drag-to-copy, and a blinking caret. The Ink TUI supports `jsx` and `tsx`. The split-pane `ori dev` layout supports mouse resize and chat scrolling.
  * **Harnesses and tools.** Pluggable harnesses include PI `web_search` and `web_fetch`. The release includes a local Slack bridge and framework and GitHub emulators for testing. The scope follows RFC 0006 - Built-ins.

  ## Operations and packaging

  * **Logging.** `ori/logger` and the framework diagnostic interface send structured records to `ori logs` instead of `console.*`. The logging scope follows RFC 0011 - Diagnostic Logging.
  * **Packaging.** Compiled CLI binaries ship with `install.sh` and the `release-cli` workflow. Version-matched docs ship into `.ori/docs` with agent pointers. The scope follows RFC 0010 - CLI Binary Release.
  * **Operations.** `ori start` supports auto-update with a severity threshold and interactive Slack approval. OpenRouter attribution uses injected headers with actionable authentication hints when authentication fails. An agent-facing machine output mode supports scripting.

  Future versions are generated by [release-please](https://github.com/googleapis/release-please) from [Conventional Commits](https://www.conventionalcommits.org/) and may be curated into this format before release.
</Update>
