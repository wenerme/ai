# Browser and desktop drivers

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

A driver translates allowed tool calls into actions in a browser or desktop you control. Use a browser driver when your application can report page text, controls, and tabs. Use a computer driver when the model must work from screenshots and coordinates. The SDK sends requests and dispatches calls; your application owns the session, permissions, and cleanup.

## Configure common controls

Start with the [browser example](https://developers.openai.com/api/docs/guides/tools-computer-use?sdk-task=browser#run-your-first-task) in Python or Node. It shows a complete driver, a confirmation policy, and a bounded Responses run. Keep the session open until the run ends. Python also provides synchronous `BrowserToolset` and `ResponsesToolRunner` classes for synchronous drivers.

| Goal                            | Where to set it                                                                                                                                  | What to expect                                                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Limit browser methods           | Set `members` when constructing `BrowserToolset` or `AsyncBrowserToolset`.                                                                       | Only selected, implemented methods are exposed. For read-only access with the example driver, choose `read_page` alone. [Select methods](#select-methods).                     |
| Approve browser changes         | Pass `confirm` to the `BrowserToolset` or `AsyncBrowserToolset` constructor.                                                                     | Only an exact `true` or `True` allows the proposed action. Check its member, target, and arguments. [Approve actions](#approve-actions-and-own-the-session).                   |
| Restrict browser navigation     | Pass `urlPolicy` in Node or `url_policy` in Python to the `BrowserToolset` or `AsyncBrowserToolset` constructor.                                 | Required if you enable `navigate` or `new_tab`. The SDK checks the requested URL before asking for confirmation. [Restrict URLs](#restrict-urls).                              |
| Approve native computer actions | With `ResponsesToolRunner`, set Node's `computerOptions` in the run options; pass Python's `approve_safety_checks` and `before_action` to `run`. | Pending safety checks need explicit approval; the optional before-action callback can refuse any individual action. [Computer approval](#approve-actions-and-own-the-session). |
| Bound a run                     | Set `maxSteps` in Node or `max_steps` in Python in the Responses runner's run options.                                                           | The default is 20 requests. The final allowed request cannot start new effects.                                                                                                |
| Measure usage                   | Pass synchronous `onDiagnostic` in Node or `on_diagnostic` in Python to `ResponsesToolRunner.run`.                                               | Add token usage from completed request records. If a completed request has no usage, report the total as incomplete. [Inspect usage and timing](#inspect-usage-and-timing).    |

### Approve actions and own the session

Create drivers and approval callbacks in trusted application code. Keep executable configuration separate from untrusted page data, and return page data through the declared driver report fields.

A selected browser method that changes state or reads diagnostics requires `confirm`. Only exactly `true` in Node or `True` in Python approves an action. `navigate` and `new_tab` also require `urlPolicy` (Node) or `url_policy` (Python). Both callbacks receive a detached object containing `member`, validated `arguments`, prior `state`, and `call_id`; URL policy also receives the requested URL. They cannot change the validated action by editing that object.

`confirm` approves the fixed action arguments. Its `state` is a prior observation, not a lock on the document or focused control. A page can navigate or change focus while a person decides. For consent tied to a specific page or control, the driver must check the original target at execution. Disable `key` and refuse `type` with a null target in that flow; both use current focus. Apply equivalent target binding to other actions that depend on the current browser state.

To ask before reading a private page, list the read members in `confirmReads` (Node) or `confirm_reads` (Python). The same `confirm` callback runs before any driver state or content read. Its context has `phase: "before_read"` and `state: null` in Node or `None` in Python. Handle that case without reading page metadata. A refusal returns no page content or state. Existing reads keep their current behavior when this option is absent; mandatory action approvals still apply.

For computer calls, acknowledge all pending safety checks before the helper executes any actions. Node's `approveSafetyChecks` and Python's `approve_safety_checks` must return exactly true. A missing or declined callback stops the run. Optional `beforeAction` or `before_action` checks each action immediately before execution, including the final screenshot. If supplied, it must also approve explicitly. A model choice or completion message cannot grant approval. See [Computer use safety guidance](https://developers.openai.com/api/docs/guides/tools-computer-use#run-safely).

Node passes `{ signal }` as the final argument to both computer approval callbacks. Python supplies the optional `cancelled` keyword when the callback accepts it. Existing callbacks with fewer arguments remain supported. Use this context to close a pending approval prompt when the run stops. The helper waits for the callback to settle before releasing the session.

Computer approval covers the action's fixed arguments. It does not freeze the screen or focus while a person decides. If consent must apply to a particular target, the driver must bind the action to that target or reject it after a state change. Run computer actions in an isolated environment with limited network access.

### Restrict URLs

Enable `navigate` or `new_tab` only when the task needs them. Supply both `confirm` and `urlPolicy` in Node, or `confirm` and `url_policy` in Python. The URL callback receives `(context, url)`, with an optional execution context in Node or `cancelled` keyword in Python. It must return exactly true for the SDK to continue to `confirm`. A new blank tab with a null URL still requires confirmation but has no URL to check.

Parse the requested URL. Compare its protocol, hostname, and port with the destinations your task permits. Do not rely on a string prefix: `https://example.com.evil.test` must not count as `https://example.com`. A browser driver without navigation needs no URL callback. The [browser example](https://developers.openai.com/api/docs/guides/tools-computer-use?sdk-task=browser#run-your-first-task) leaves these methods disabled.

Enforce a network policy in the browser or environment as well. The callback checks a requested navigation, but it cannot restrict redirects, popups, page scripts, or embedded resources. Keep one isolated session between requests and close resources your application created. Leave borrowed resources with their owner.

### Inspect usage and timing

With `ResponsesToolRunner`, pass `onDiagnostic` in Node or `on_diagnostic` in Python to `run`. For each completed Responses request, the callback receives a record with `api: "responses"`, `stage: "request"`, `reason: "completed"`, and `usage`. The usage contains `input_tokens`, `output_tokens`, and `total_tokens` when the API supplies them; otherwise, the value is `null` in Node or `None` in Python. Sum each token field across completed requests to measure the run's usage. If any request has no usage, the totals are incomplete.

`ComputerToolset.run` does not report request usage through its diagnostic callback. The returned response can contain usage for the final request only. Use `ResponsesToolRunner` with `ComputerToolset` when you need per-request usage.

Diagnostic records also identify the API, stage, reason, call ID, member, and measured duration. They contain no raw error, page text, arguments, or image. An observer failure cannot approve an action or change its result. Keep call IDs and member names out of public logs if your application puts private data in them.

Use a synchronous observer. The runner does not wait for diagnostic work; schedule any asynchronous storage in your application.

Stage timings can overlap in eager runs because stream receipt may include action time. Do not add them together to calculate the run's total duration.

### Close and cancel work

A helper rejects overlapping calls with a busy error. A runner also rejects a second active run on the same instance. Keep one owner for each browser or desktop session.

Call the helper's `close()` to refuse new work. Its `status` is `closed` when no call remains active, or `draining` when an earlier call may still have effects. If the status is `draining`, await the original execute call before closing the driver or handing the session to another owner. The helper does not close your browser or desktop. Calling `close()` inside a driver callback does not wait on that same callback.

Cooperative Node driver methods and ordinary functions can accept a second context with `signal`. Python methods can accept the `cancelled` keyword. Check it during long work, including navigation and screenshots. Existing one-argument callbacks remain valid, but the SDK cannot force them to stop or undo an effect.

## Browser driver contract

Implement `state()` and only the operations you intend to expose. Node methods may return a value or a promise; Python supplies separate synchronous and asynchronous classes. Each operation receives one validated argument object or dictionary. For tab IDs and targets that allow no value, use explicit `null` in Node and `None` in Python.

Python rejects known synchronous or asynchronous mismatches when you create the helper. Use `async def` methods with `AsyncBrowserToolset`; preserve decorator metadata or return annotations for wrappers. Opaque wrappers are checked when called. Optional protocols such as `BrowserReadDriver` and `AsyncBrowserReadDriver` help you type a partial driver without implementing every operation. Node exports `BrowserArguments<Member>` and `BrowserResult<Member>` for the matching inputs and outputs.

`state()` reports `tabs`, an array of objects with `id`, `title`, `url`, and `active`. Use stable IDs and mark the real active tab. Exclude credentials and private information from titles and URLs. The SDK returns current state after ordinary operations, including failures. A refused [protected read](#approve-actions-and-own-the-session) returns a fixed refusal without reading or exposing state. If a required state read fails, the run stops. Node state readers receive `{ signal }`; Python state readers can accept the `cancelled` keyword. Use this context to end pending state reads when the caller stops the run. Existing readers without arguments remain supported.

Tab state reports HTTP and HTTPS origins, such as `https://example.com:8443`, without credentials, paths, queries, or fragments. Legacy state, without observation metadata, preserves `about:blank` and reports only the scheme for other URLs, such as `data:` or `file:`. Its 2,048-byte UTF-8 limit applies to the reported value, so a long page path does not prevent a state read. State with V1 observation metadata truncates titles to 1,024 UTF-8 bytes at a character boundary and sets `title_truncated` when needed. Titles and page content still need your application's privacy rules.

### Select methods

By default, the SDK exposes the following 18 methods when implemented and derives `list_tabs` from `state()`. Do not implement `list_tabs`. A `members` list can expose fewer methods, or explicitly opt in to the [scoped and pointer methods](#opt-in-to-scoped-and-pointer-methods) or [diagnostics, scripts, and file methods](#opt-in-to-diagnostics-scripts-and-file-transfers). Names must be unique, fixed members that the driver implements; only `list_tabs` needs no method beyond `state()`. An empty list exposes no methods. The SDK copies the selection at construction, keeps its own tool order, and rejects disabled calls before reading state or asking for consent.

To add an optional method while keeping implemented defaults, use `additionalMembers` in Node or `additional_members` in Python. Do not combine it with `members`. A requested addition must exist on the driver. `BROWSER_MEMBERS` and `DEFAULT_BROWSER_MEMBERS` list the fixed names without inspecting a driver.

Disabling `list_tabs` does not hide state returned by other successful operations. In Python and Node, `members` filters the browser helper. Ordinary function names may start with `browser_`, but must not match an enabled browser tool.

| Method          | Arguments                                   | Result                                   | Confirmation    |
| --------------- | ------------------------------------------- | ---------------------------------------- | --------------- |
| `navigate`      | `url`, `tab_id`                             | Text or no result                        | Yes; URL policy |
| `read_page`     | `filter` ("all" or "interactive"), `tab_id` | Text or structured read                  | No              |
| `get_page_text` | `tab_id`                                    | Text or structured read with no elements | No              |
| `find`          | `query`, `tab_id`                           | Text or structured read                  | No              |
| `click`         | `target`, `tab_id`                          | Text or no result                        | Yes             |
| `type`          | `text`, `target` (may be null), `tab_id`    | Text or no result                        | Yes             |
| `key`           | `keys` (strings), `tab_id`                  | Text or no result                        | Yes             |
| `scroll`        | `direction`, nonnegative `amount`, `tab_id` | Text or no result                        | Yes             |
| `scroll_to`     | `target`, `tab_id`                          | Text or no result                        | Yes             |
| `wait_for`      | `text`, `timeout_ms`, `tab_id`              | Text or no result                        | No              |
| `select_option` | `target`, `values` (strings), `tab_id`      | Text or no result                        | Yes             |
| `hover`         | `target`, `tab_id`                          | Text or no result                        | Yes             |
| `screenshot`    | `tab_id`                                    | Native input image                       | No              |
| `zoom`          | `region`, `tab_id`                          | Native input image                       | No              |
| `new_tab`       | `url` (may be null)                         | Text or no result                        | Yes; URL policy |
| `list_tabs`     | None                                        | Derived current state                    | No              |
| `switch_tab`    | required `tab_id`                           | Text or no result                        | Yes             |
| `close_tab`     | required `tab_id`                           | Text or no result                        | Yes             |

Except for `switch_tab` and `close_tab`, a listed `tab_id` may be null. Direction is `up`, `down`, `left`, or `right`. Node's `BrowserArguments<Member>` describes each argument object; Python exposes named input types such as `TabInput`, `ReadPageInput`, and `ClickInput`.

For `read_page`, `find`, and `get_page_text`, return `null` or no value in Node, or `None` in Python, to supply only the updated browser state. Return an empty string when a read completes with no text.

Each Node operation in this table except `list_tabs` receives `{ signal }` as a second argument. `list_tabs` uses the state reader described above. Python passes `cancelled` as a keyword argument when the method accepts it. Use this context to stop pending work, including navigation and input. Existing one-argument methods remain supported.

For `wait_for`, use nonempty text of at most 256 UTF-8 bytes after whitespace normalization. The timeout must be from 1 through 30,000 milliseconds. Read the current page again after `scroll_to` before acting on a control.

### Report structured reads

`read_page`, `find`, and `get_page_text` can return `BrowserReadV1`: `version: 1`, visible `text`, an `elements` array, and an `omitted` array. Each element has a unique `ref`, a nonempty `label`, and one of seven roles: `button`, `textbox`, `combobox`, `checkbox`, `radio`, `slider`, or `listbox`.

Only report a field's `value` or its `options` (`label` and `value` pairs) when your application allows the model to see them. A checkbox or radio can report boolean `checked`; `listbox` options can report boolean `selected`. The SDK omits these fields on other roles. Node omits optional fields set to `undefined`; it rejects `null` values for those fields. `get_page_text` must return an empty `elements` array. The SDK does not parse an ordinary string into a structured read.

The SDK does not limit the number of elements or options, page text size, or complete report size. Refs and labels have a 256-byte limit; values have a 512-byte limit. Use valid Unicode scalar values. Drivers can report partial coverage with unique `omitted` codes: `report_limit`, `text_limit`, `target_limit`, `work_limit`, `frame_limit`, `unsupported_root`, `unsupported_control`, `remote_action`, `private`, `value`, or `name_limit`.

The driver owns visibility, field privacy, and ref validity. Recheck a ref against the current page after approval and before acting. A control's label does not grant permission to read its value. Size limits alone do not make page contents safe.

### Return browser images

`screenshot` and `zoom` return a native `input_image` with at least one nonempty `image_url` or `file_id`. Both source fields may be present; each non-null source must be a nonempty string. The supported fields are `type`, `image_url`, `file_id`, `detail`, and `prompt_cache_breakpoint`. A cache breakpoint must be `{ mode: "explicit" }`; null is also accepted where the native content type permits it. The SDK validates and copies these fields before returning the image. Both Node methods return `ResponseInputImageContent`, where `detail` may be omitted or null. When set, use `auto`, `low`, `high`, or `original`.

For `zoom`, `region` is `[left, top, right, bottom]`. Coordinates must be nonnegative safe integers with positive width and height. The driver owns cropping and bounds checks. All later coordinates still refer to the full visible area.

### Opt in to scoped and pointer methods

These six browser methods are off by default, even on drivers that implement them. Select them with `members`, or add them with `additionalMembers` in Node or `additional_members` in Python. The original 18 default methods retain their names, arguments, and result types. With `members`, include any default methods you still need, such as `screenshot` or `read_page`.

| Method             | Required fields                                     | Result                | Confirmation |
| ------------------ | --------------------------------------------------- | --------------------- | ------------ |
| `read_page_scoped` | `tab_id`, `root`, `depth`, `filter`                 | `BrowserScopedReadV1` | No           |
| `click_at`         | `tab_id`, `x`, `y`, `button`, `click_count`, `keys` | Text or no result     | Yes          |
| `drag_path`        | `tab_id`, `path`, `keys`                            | Text or no result     | Yes          |
| `hold_keys`        | `tab_id`, `keys`, `duration_ms`                     | Text or no result     | Yes          |
| `hover_at`         | `tab_id`, `x`, `y`                                  | Text or no result     | Yes          |
| `set_checked`      | `tab_id`, `target`, `checked`                       | Text or no result     | Yes          |

Node uses `BrowserArguments<Member>`. Python exports `ReadPageScopedInput`, `ClickAtInput`, `DragPathInput`, `HoldKeysInput`, `HoverAtInput`, and `SetCheckedInput`. All fields are required; `tab_id` may be `null` or `None` for the active tab. Unknown fields are rejected, including extra fields in a path point. Numbers must be finite safe integers. Python rejects `True` and `False` where numbers are required.

`click_at` accepts nonnegative `x` and `y`, `button` set to `left`, `right`, or `middle`, and `click_count` set to 1, 2, or 3. `drag_path` accepts 2 through 100 exact `{x, y}` points with nonnegative coordinates. Both use the full visible area of the page in CSS pixels, even after zooming. The driver must check current bounds. Their `keys` fields contain a list of unique `Control`, `Alt`, `Meta`, or `Shift` modifiers. The list may be empty.

`hover_at` moves the pointer to current CSS coordinates without holding a button. `set_checked` sets a checkbox to the requested boolean state. Setting it to true twice must leave it checked. Even a no-op must use the original current target and pass confirmation; it must not accept a stale or replaced control.

`hold_keys` takes 1 through 8 unique nonempty key names, each at most 64 UTF-8 bytes with valid Unicode scalar values. `duration_ms` must be from 1 through 3000. Methods that change state require `confirm` to return exactly true. Cooperative methods receive the per-call cancellation context: Node passes `{ signal }` as a second argument; Python passes the `cancelled` keyword when the method accepts it. Existing one-argument methods remain valid.

### Read within a section

For `read_page_scoped`, a null `root` discovers visible sections. A non-null root must be a driver-issued scope ref, not a selector: nonempty, valid Unicode, and at most 256 UTF-8 bytes. Set `depth` from 1 through 32 and `filter` to `all` or `interactive`. Depth counts DOM traversal within that root separately from frame or shadow limits.

Return `BrowserScopedReadV1`, which extends the existing read with `scopes: [{ref, label}]`. Refs and labels must be nonempty, valid Unicode, and at most 256 UTF-8 bytes. Scope refs must be unique and must not match any element ref. This method rejects string and null results. The SDK copies known fields before it asks for final state.

Use scope refs only to select another read root. Element mutations must reject them. Invalidate scope and element refs together when their tab, document, generation, or visibility changes. Keep the existing field privacy, total work, and read limits.

### Opt in to diagnostics, scripts, and file transfers

These four methods also stay off by default. Select each one in `members` or add it with `additionalMembers` or `additional_members`, and
provide `confirm`, including for diagnostic reads. A driver's implementation alone
does not expose them to the model.

| Method             | Required arguments               | Result                    |
| ------------------ | -------------------------------- | ------------------------- |
| `read_diagnostics` | `tab_id`, `source`, `limit`      | Structured text-only read |
| `run_script`       | `tab_id`, `source`, `timeout_ms` | Text                      |
| `upload_file`      | `grant_id`                       | `BrowserFileOutcome`      |
| `download_file`    | `grant_id`                       | `BrowserFileOutcome`      |

For `read_diagnostics`, choose `console` or `network` as the source and a limit
from 1 through 100. Return a structured read with an empty `elements` array.
In Node, use the `BrowserTextReadV1` result type.
The driver must filter private data and bound its history. Do not return raw
headers, cookies, credentials, or unfiltered console messages.

`run_script` takes nonempty source containing valid Unicode and a timeout
from 1 through 30000 milliseconds. The SDK preserves the full source. Return text containing valid Unicode.
An empty string is valid; a null result is not. The SDK preserves large results.
Scripts run with the page's privileges. Use a fresh session without
credentials, restrict its network access, and retire it if execution becomes
uncertain. Stopping the local waiter does not prove that a page script stopped.

File methods accept only a caller-issued `grant_id`: nonempty, valid Unicode,
and at most 256 UTF-8 bytes. The grant identifies one approved, task-scoped file;
it is not a path or URL. The file owner must obtain separate approval for the file. It must recheck expiry and
ownership, enforce size limits, and permit the grant only once. Browser confirmation does not replace this file approval.

Return exactly `version`, `status`, `effect`, and `cleanup`. Set `version` to 1.
`cleanup` is `not_started`, `pending`, or `completed`. The valid status/effect
pairs are:

| `status`      | `effect`            |
| ------------- | ------------------- |
| `completed`   | `completed`         |
| `refused`     | `none`              |
| `unknown`     | `unknown`           |
| `interrupted` | `none` or `unknown` |

The SDK copies and validates this result before asking for final browser state.
Only `completed` sets the tool output's `ok` to true. Other outcomes retain the
structured result with `ok` false, so the runner skips dependent browser calls in
that response. Check the actual file and application state before retrying an
unknown transfer. A file result does not prove that a later form submission or
business action succeeded.

`run_script`, `upload_file`, and `download_file` receive per-call cancellation: Node
passes `{ signal }` as a second argument; Python passes the `cancelled` keyword.
Python exports `ReadDiagnosticsInput`, `RunScriptInput`, and `BrowserFileInput`.

## Computer driver contract

A computer driver receives native computer actions and returns screenshots. It must implement the following methods. Import `ComputerDriver` from `openai` in Node. In Python, import `ComputerDriver` or `AsyncComputerDriver` from `openai`. Import the matching `ComputerToolset` or Python `AsyncComputerToolset` from `openai` too.

| Method         | Action the driver receives              |
| -------------- | --------------------------------------- |
| `click`        | Coordinates, button, and any held keys  |
| `double_click` | Coordinates and any held keys           |
| `drag`         | A path and any held keys                |
| `keypress`     | A combination of keys                   |
| `move`         | Pointer coordinates                     |
| `scroll`       | Coordinates, `scroll_x`, and `scroll_y` |
| `type`         | Text for the focused control            |
| `wait`         | A request to let the environment settle |
| `screenshot`   | No argument; return the current display |

Action methods receive the existing generated computer action object, with its snake-case fields, and return no value. They must raise an error if they cannot execute the action; do not silently ignore unsupported input. Node supports synchronous results or promises; await Python async methods.

In Python, use synchronous methods with `ComputerToolset` and `async def` methods with `AsyncComputerToolset`. The helper rejects known mismatches when you create it. Preserve decorator metadata or return annotations when wrapping methods. Opaque wrappers are checked when called, so their own code can run before the helper detects a mismatch.

In Node, use `ComputerCallInput` for calls you pass to `ComputerToolset.execute()`. It accepts native calls and modern calls with an `actions` array that omit `pending_safety_checks`. Approval callbacks receive a detached call with an empty checklist for that valid omission. The replayed call keeps its original fields.

`screenshot()` returns a `computer_screenshot` with an `image_url` (including a data URL) or `file_id`. Computer helpers require at least one image source and accept both source fields. The helper does not read local files. Actions run once, in order, and the helper captures the final screenshot after them. It does not retry driver actions.

For a computer-only Responses loop, use `ComputerToolset.run` or Python's `AsyncComputerToolset.run`. Use a model available to your project that supports the [computer tool](https://developers.openai.com/api/docs/guides/tools-computer-use). For mixed runs, pass the computer helper as the Responses runner's `computer` option. Node takes computer callbacks in its run option `computerOptions`; Python takes `approve_safety_checks` and `before_action` directly as run keyword arguments. The browser example controls a browser only. It does not implement or verify a native desktop.

The computer helper and `ResponsesToolRunner` both accept Responses `context_management` compaction. They check the required item fields and replay the encrypted content unchanged. For `ResponsesToolRunner`, choose this native option or the local `contextBudget` or `context_budget` option; do not combine them.

### Run a screenshot-based task

[Run your first task](https://developers.openai.com/api/docs/guides/tools-computer-use#run-your-first-task) includes a complete Python or Node example. It uses the Responses computer tool to reveal pickup details in a local browser.

#### Use an isolated desktop

To control an operating-system desktop, see the full desktop example in [Python](https://github.com/openai/openai-python/blob/v3.31.0/examples/computer-desktop/README.md) or [Node](https://github.com/openai/openai-node/blob/v7.33.0/examples/computer-desktop/README.md). Both use an isolated Linux guest. On Macs with Apple silicon, the Linux guest runs in a virtual machine; on x86-64 Linux, it runs in Docker. Each example includes a local exercise without an API key. Its live task checks both the browser record and the saved file. For your own environment, start with the [Docker recipe](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#prepare-an-environment) and adapt the driver contract above.

## Mix browser actions with other tools

The Responses runner can combine browser and computer helpers with ordinary functions, web search, file search, code interpreter, image generation and remote MCP tools. Server-tool results keep their native content and container IDs when the next request replays the response. Failed, incomplete or unfinished server results stop the turn before local actions.

When a run declares server tools, local calls wait for the complete response even if `eager` is enabled. The runner must inspect later server results and approval requests before it can safely act.

At that completed turn, `supplyOutputs` in Node or `supply_outputs` in Python can replace an unattempted ordinary function result when its registration allows overrides. This also works without an explicit early-execution policy. A replacement cannot answer a browser call, computer call, or MCP approval request.

This runner needs stored responses to continue after image generation. It rejects `store: false` in Node or `store=False` in Python when you declare `image_generation`. Set storage to true when appropriate, or use `client.responses.create` for a single stateless request. The runner never enables storage for you.

Reuse typed function tools instead of repeating their validation. In Node, wrap a `zodResponsesFunction` or `standardResponsesFunction` with `runnerFunction` from `openai/helpers/responses-tool-runner`. The tool must include its callback. In Python, use `RegisteredFunction.from_tool` or `AsyncRegisteredFunction.from_tool` with an existing `pydantic_responses_function_tool` and an explicit typed executor. Invalid arguments stop before that executor runs. Invalid callback output stops the run without repeating an effect. Raw `RunnerFunction` and `RegisteredFunction` registrations retain their existing argument behavior.

For MCP, supply `approveMcp` in Node or `approve_mcp` in Python. The callback receives the actual detached approval request and returns true or false. The runner binds the response to that request's ID and declared server. It cannot invent approval or treat a final message as consent.

Requests that declare MCP tools disable automatic SDK retries, with or without a ledger. If a request fails, check what the MCP server did before starting another run.

## Handle failures

Throw `BrowserError` only with text safe for the model, for a recoverable issue such as a stale ref. Other errors thrown by a browser operation produce a generic failure message. For these operation failures, the runner supplies an output for every browser call, skips the remaining browser operations in that response, and lets the model choose again on the next turn. Invalid returned results or invalid state stop the run. Failure to report state, failed ordinary functions, and unapproved native computer checks also stop it.

Set `maxSteps` or `max_steps` to bound API requests. The default is 20. The final allowed request cannot start new effects. An SDK HTTP retry does not retry a driver action. Use `signal` in Node or `cancelled` in Python to stop between operations; arbitrary in-progress driver calls cannot always be undone.

`ResponsesToolRunner` preserves `tool_choice` on every request. A choice that always requires a local tool cannot finish, so the runner rejects it before any work. Use `auto` for a loop, or `responses.create` for one forced request. Required choices that also allow a declared server tool remain valid.

### Troubleshoot a run

| Symptom                                               | Check and fix                                                                                                                                                                                                    |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ComputerToolset` or a browser helper fails to import | Check the installed package in the environment running the script. Use Python `openai==3.31.0` or Node `openai@7.33.0` or a later version that includes the helpers.                                             |
| Chromium cannot launch                                | Run the Playwright install command in the same environment as the script. In a Linux container, install the required system libraries and run as a non-root user. Do not turn off the sandbox to hide the error. |
| The API rejects the model or tool                     | Check your project's model access and the model's **Tools** section in the [models catalog](https://developers.openai.com/api/docs/models). The native `computer` tool and browser function tools have different model requirements.          |
| An action or pending safety check is declined         | Inspect your application's approval policy. Check the fixed action arguments against current state. Ask for approval when needed; do not approve every request to make a run pass.                               |
| The model reaches the step limit                      | Verify the actual page or file first. Check whether the task needs capabilities your driver refuses. Simplify the task before raising `maxSteps` or `max_steps`.                                                 |
| The browser model answers without reading the page    | Enable a read method your driver implements, such as `read_page` in the example. Ask the model to read the current page and rerun the task. Verify the page or file result before accepting the answer.          |
| Clicks miss the visible target                        | [Check the screenshot and coordinates](#fix-missed-clicks).                                                                                                                                                      |

### Fix missed clicks

Capture a fresh screenshot and check that it shows the intended window. Use the same coordinate space for the screenshot and the action. If you send an 800 × 600 screenshot from a 1600 × 1200 display, double both returned coordinates before clicking. If a computer driver sends a cropped screenshot, add the crop's offset after scaling. Browser driver pointer methods use CSS pixels in the full visible page area, even after zooming; do not confuse them with display pixels.

Screenshot size affects input tokens and cost. See [capture screenshots](https://developers.openai.com/api/docs/guides/tools-computer-use-integration#capture-screenshots) for image sizing and model limits.

### Stream and resume

Responses runs are non-streaming by default. With `stream` and `onEvent` (Node) or `on_event` (Python), the runner supplies detached stream events and waits for the response to finish before execution. With `eager`, it may execute completed output items early, in order. It never executes argument deltas.

Enable eager execution only if a completed item can safely run before the runner validates the full response. If a later event changes or removes that item, the runner stops and keeps its execution record. It cannot undo the action. Leave eager execution off, or use an empty policy for early execution, if all actions must wait for the complete response to pass validation.

If completed items arrive out of order or their indexes have gaps, the runner waits for the full response before executing that part of the sequence. Effects already completed remain recorded if the stream fails.

`earlyExecution` or `early_execution` can restrict early execution to selected function wire names and control the native computer dispatcher with a separate boolean. An empty object defers all local tools. Omission keeps normal blanket eager behavior. The first deferred tool also defers all later tools to preserve their order. With `iterate()`, inspect the completed turn before advancing; closing at that boundary executes no deferred tools. These options change timing, not approval.

For one completed call, `beforeEarlyCall` or `before_early_call` can return `defer` before dispatch. It cannot make a call outside the early-execution allowlist run early. Mark an ordinary function `independent: true` only when it can run without depending on other actions. Without a ledger, independent functions can run while the stream advances. Durable runs, browser actions, and computer actions stay ordered. Started work keeps its execution record even if another call fails.

By default, at most two independent eager calls run at once. Set `maxConcurrentCalls` in Node or `max_concurrent_calls` in Python to a positive integer to change that limit. The runner waits for the current group before reading more streamed calls. This option applies only to independent eager runs without a ledger. Each function must limit any work that it starts itself.

On an interrupted eager run, inspect `ResponsesToolRunnerError.attemptedCallIds` and `completedCallIds` in Node, or `attempted_call_ids` and `completed_call_ids` in Python. They contain call IDs, not results, arguments, or driver messages. Effects may already have occurred. Read the authoritative application state before retrying an attempted or uncertain action.

Use `contextBudget` or `context_budget` to limit the next request's input bytes and images, with or without durable storage. The projection keeps the current observations and required tool relationships. An in-memory limit does not make a run recoverable after the process exits.

At a completed turn boundary, `appendUserText` or `append_user_text` queues human guidance. The runner appends it after recording pending outputs. It accepts text, not arbitrary tool output or approval objects, and does not reset the request budget.

Use this method to clarify the current task, such as asking the agent to check a different date. If the user replaces the task, stop and await the current run before starting a new one. Read the application state again and obtain fresh approval for new actions. Keep the old run's record; changing instructions does not undo its effects.

For durable recovery, supply a `ledger` that saves each checkpoint under exclusive run ownership. Only resume from a completed boundary; a pending or uncertain action needs reconciliation first. The remaining request budget and completed history survive resume. Local context-budget compaction keeps the full evidence in the ledger and pins current observations, safety checks, messages, and reasoning. It never grants approval.

Every save receives a detached, complete checkpoint, including saves before and after local effects. The checkpoint includes the full batch and accumulated history. For large batches, copying and storing these records can take quadratic total work. Choose storage suited to that volume; `contextBudget` and `context_budget` limit request input, not ledger storage.

An interrupted pending checkpoint contains the last saved prefix. It can omit later text and unattempted proposals; it never authorizes replay. Before and after an effect, the saved checkpoint includes the full observed prefix and execution records.

A run that includes MCP tools saves a pending checkpoint before each request. If the connection fails, check what the MCP server did before starting another run. The pending checkpoint cannot resume automatically.

Saved MCP declarations omit authorization and custom headers and replace server URLs with SHA-256 fingerprints. Native requests still use the original URL. Put credentials that must rotate in authorization or headers. Changing a URL path or an unrecognized query value changes its identity and requires a new run. Checkpoints containing raw MCP URLs cannot resume. Node requires `crypto.subtle.digest` to save an MCP URL. Other checkpoint inputs and outputs remain private application data.

Supply current credentials when resuming, and verify that they address the intended server and account.

Saved Code Interpreter declarations keep credential names and domains but clear their secret values. Supply current values in the tool configuration when resuming. For MCP approvals, an empty `always: {}` or `never: {}` filter applies to every tool.

Supply `approveMcp` in Node or `approve_mcp` in Python when initial input or a saved ledger contains approved MCP requests. Before the first save or API request, the runner asks again for each approval that has no completed matching MCP call. This applies with or without a ledger or context budget. It keeps completed calls and earlier refusals unchanged. If fresh approval is needed, a missing callback stops the run.

## Check a custom driver locally

Run the local exercise in the [booking demo](https://developers.openai.com/api/docs/guides/tools-computer-use#see-and-approve-changes) or [isolated desktop example](#use-an-isolated-desktop) before adapting it. Add checks for your driver's actual page state, input effects, and cleanup. SDK validation does not prove that the environment performed an action correctly.

See [Run your first task](https://developers.openai.com/api/docs/guides/tools-computer-use#run-your-first-task) for a working SDK workflow and [integration recipes](https://developers.openai.com/api/docs/guides/tools-computer-use-integration) for environment setup. After any change, verify the saved form, file, or other application record before reporting success.