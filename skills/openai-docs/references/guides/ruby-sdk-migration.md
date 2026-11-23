# Upgrade to the Ruby SDK 1.0

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use this guide to update an application that uses the `openai` gem. The SDK requires Ruby 3.3.0 or later. Update the gem version in your `Gemfile`, run `bundle update openai`, and run your application's tests and type checker.

## Migrate off Assistants and Threads

Replace `client.beta.assistants` and `client.beta.threads` with Responses and Conversations. Create a Conversation for each thread you migrate. Use the history your application already stores, and keep the new conversation ID for later requests.

Pass the model, instructions, and tools from your application to `client.responses.create`. Use `client.responses.stream` for streamed results. Return function results as `function_call_output` items with the original `call_id`.

Follow the [Assistants migration guide](https://developers.openai.com/api/docs/assistants/migration) and the [Conversations examples](https://developers.openai.com/api/docs/guides/conversation-state#using-the-conversations-api).

## Remove Videos and Sora 2 calls

Remove `client.videos` calls, polling and download jobs, Videos type annotations, and Batch inputs targeting `/v1/videos`. The Videos API and Sora 2 model IDs have retired. For stored `video.completed` or `video.failed` webhook events, read the video ID with `event[:data][:id]` after verification.

## Use the full compacted history

Compaction can return retained user, system, and developer input messages alongside output items and compaction records. Update Ruby, Sorbet, and RBS annotations from `ResponseOutputItem` to `ResponseItem` for GA compaction and from `BetaResponseOutputItem` to `BetaResponseItem` for beta compaction.

When inspecting a message, check its class and role before accessing its content. Function calls in compacted output use `ResponseFunctionToolCallItem` in GA and `BetaResponseFunctionToolCallItem` in beta. Ordinary Responses output keeps its existing types.

Pass `compacted.deep_to_h.fetch(:output)` as the next request's `input` to preserve the entire window. See [Compaction](https://developers.openai.com/api/docs/guides/compaction).

## Update Live delegation tool choices

In `OpenAI::Live::ResponsesDelegationConfig::ToolChoice` and `OpenAI::Live::ResponsesDelegationUpdateConfig::ToolChoice`, replace `LiveFunctionToolChoiceParam` with `Function` and `LiveMCPToolChoiceParam` with `Mcp`. Update constructor calls, class checks, and Sorbet `OrHash` references. In RBS, replace `live_function_tool_choice_param` with `function` and `live_mcp_tool_choice_param` with `mcp`.

Function choices require a string `name`. MCP choices require a string `server_label`. Omit `name` to leave it out, pass `nil` to send JSON null, or pass a string to select a tool. The same MCP fields apply to allowed-tools entries.

See [Live Responses delegation](https://developers.openai.com/api/docs/guides/live-delegation#configure-responses-delegation).

## Pass named graders as a hash

Set `MultiGrader#graders` to a hash keyed by grader name. For example, pass `graders: {quality: grader}` and refer to `quality` in `calculate_output`. Read each returned grader by its key and use `MultiGrader::Grader` for the value type. See [Graders](https://developers.openai.com/api/docs/guides/graders).

## Compare returned image sizes as strings

Image responses and image generation and edit stream events return size strings such as `"1024x1024"`. Use `image.size == "1024x1024"` to compare the size. The size constants and `Size.values` also use strings.

## Replace retired model constants

Replace `GPT_4_VISION_PREVIEW`, `GPT_3_5_TURBO_0613`, and `GPT_3_5_TURBO_16K_0613` with supported model IDs. If your application sends images, choose a model that accepts image inputs. See the [model list](https://developers.openai.com/api/docs/models).

## Check typed callers

- Responses input-item listing decodes assistant messages as `ResponseOutputMessage`. Check that branches that read assistant content use the output message type.
- To send an SDK request model as keyword arguments, pass `**params.to_hash`. Construct a nested SDK object when you need typed readers for fields in a nested hash.
- Decisions keeps the released `DecisionInputMessage::User`, `DecisionInputMessage::Developer`, `DecisionInputMessage::System`, and `DecisionInputMessage::Assistant` constructors.

For Ruby code examples, read the [SDK migration guide](https://github.com/openai/openai-ruby/blob/v1.0.0/docs/MIGRATION_1.0.0.md).