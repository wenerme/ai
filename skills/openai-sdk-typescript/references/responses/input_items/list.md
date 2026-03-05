## List

`client.responses.inputItems.list(stringresponseID, InputItemListParamsquery?, RequestOptionsoptions?): CursorPage<ResponseItem>`

**get** `/responses/{response_id}/input_items`

Returns a list of input items for a given response.

### Parameters

- `responseID: string`

- `query: InputItemListParams`

  - `after?: string`

    An item ID to list items after, used in pagination.

  - `include?: Array<ResponseIncludable>`

    Additional fields to include in the response. See the `include`
    parameter for Response creation above for more information.

    - `"file_search_call.results"`

    - `"web_search_call.results"`

    - `"web_search_call.action.sources"`

    - `"message.input_image.image_url"`

    - `"computer_call_output.output.image_url"`

    - `"code_interpreter_call.outputs"`

    - `"reasoning.encrypted_content"`

    - `"message.output_text.logprobs"`

  - `limit?: number`

    A limit on the number of objects to be returned. Limit can range between
    1 and 100, and the default is 20.

  - `order?: "asc" | "desc"`

    The order to return the input items in. Default is `desc`.

    - `asc`: Return the input items in ascending order.
    - `desc`: Return the input items in descending order.

    - `"asc"`

    - `"desc"`

### Returns

- `ResponseItem = ResponseInputMessageItem | ResponseOutputMessage | ResponseFileSearchToolCall | 17 more`

  Content item used to generate a response.

  - `ResponseInputMessageItem`

    - `id: string`

      The unique ID of the message input.

    - `content: ResponseInputMessageContentList`

      A list of one or many input items to the model, containing different content
      types.

      - `ResponseInputText`

        A text input to the model.

        - `text: string`

          The text input to the model.

        - `type: "input_text"`

          The type of the input item. Always `input_text`.

          - `"input_text"`

      - `ResponseInputImage`

        An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

        - `detail: "low" | "high" | "auto"`

          The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

          - `"low"`

          - `"high"`

          - `"auto"`

        - `type: "input_image"`

          The type of the input item. Always `input_image`.

          - `"input_image"`

        - `file_id?: string | null`

          The ID of the file to be sent to the model.

        - `image_url?: string | null`

          The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

      - `ResponseInputFile`

        A file input to the model.

        - `type: "input_file"`

          The type of the input item. Always `input_file`.

          - `"input_file"`

        - `file_data?: string`

          The content of the file to be sent to the model.

        - `file_id?: string | null`

          The ID of the file to be sent to the model.

        - `file_url?: string`

          The URL of the file to be sent to the model.

        - `filename?: string`

          The name of the file to be sent to the model.

    - `role: "user" | "system" | "developer"`

      The role of the message input. One of `user`, `system`, or `developer`.

      - `"user"`

      - `"system"`

      - `"developer"`

    - `status?: "in_progress" | "completed" | "incomplete"`

      The status of item. One of `in_progress`, `completed`, or
      `incomplete`. Populated when items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type?: "message"`

      The type of the message input. Always set to `message`.

      - `"message"`

  - `ResponseOutputMessage`

    An output message from the model.

    - `id: string`

      The unique ID of the output message.

    - `content: Array<ResponseOutputText | ResponseOutputRefusal>`

      The content of the output message.

      - `ResponseOutputText`

        A text output from the model.

        - `annotations: Array<FileCitation | URLCitation | ContainerFileCitation | FilePath>`

          The annotations of the text output.

          - `FileCitation`

            A citation to a file.

            - `file_id: string`

              The ID of the file.

            - `filename: string`

              The filename of the file cited.

            - `index: number`

              The index of the file in the list of files.

            - `type: "file_citation"`

              The type of the file citation. Always `file_citation`.

              - `"file_citation"`

          - `URLCitation`

            A citation for a web resource used to generate a model response.

            - `end_index: number`

              The index of the last character of the URL citation in the message.

            - `start_index: number`

              The index of the first character of the URL citation in the message.

            - `title: string`

              The title of the web resource.

            - `type: "url_citation"`

              The type of the URL citation. Always `url_citation`.

              - `"url_citation"`

            - `url: string`

              The URL of the web resource.

          - `ContainerFileCitation`

            A citation for a container file used to generate a model response.

            - `container_id: string`

              The ID of the container file.

            - `end_index: number`

              The index of the last character of the container file citation in the message.

            - `file_id: string`

              The ID of the file.

            - `filename: string`

              The filename of the container file cited.

            - `start_index: number`

              The index of the first character of the container file citation in the message.

            - `type: "container_file_citation"`

              The type of the container file citation. Always `container_file_citation`.

              - `"container_file_citation"`

          - `FilePath`

            A path to a file.

            - `file_id: string`

              The ID of the file.

            - `index: number`

              The index of the file in the list of files.

            - `type: "file_path"`

              The type of the file path. Always `file_path`.

              - `"file_path"`

        - `text: string`

          The text output from the model.

        - `type: "output_text"`

          The type of the output text. Always `output_text`.

          - `"output_text"`

        - `logprobs?: Array<Logprob>`

          - `token: string`

          - `bytes: Array<number>`

          - `logprob: number`

          - `top_logprobs: Array<TopLogprob>`

            - `token: string`

            - `bytes: Array<number>`

            - `logprob: number`

      - `ResponseOutputRefusal`

        A refusal from the model.

        - `refusal: string`

          The refusal explanation from the model.

        - `type: "refusal"`

          The type of the refusal. Always `refusal`.

          - `"refusal"`

    - `role: "assistant"`

      The role of the output message. Always `assistant`.

      - `"assistant"`

    - `status: "in_progress" | "completed" | "incomplete"`

      The status of the message input. One of `in_progress`, `completed`, or
      `incomplete`. Populated when input items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: "message"`

      The type of the output message. Always `message`.

      - `"message"`

    - `phase?: "commentary" | "final_answer" | null`

      Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`). For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

      Use `commentary` for an intermediate assistant message and `final_answer` for
      the final assistant message. For follow-up requests with models like
      `gpt-5.3-codex` and later, preserve and resend phase on all assistant
      messages. Omitting it can degrade performance. Not used for user messages.

      - `"commentary"`

      - `"final_answer"`

  - `ResponseFileSearchToolCall`

    The results of a file search tool call. See the
    [file search guide](https://platform.openai.com/docs/guides/tools-file-search) for more information.

    - `id: string`

      The unique ID of the file search tool call.

    - `queries: Array<string>`

      The queries used to search for files.

    - `status: "in_progress" | "searching" | "completed" | 2 more`

      The status of the file search tool call. One of `in_progress`,
      `searching`, `incomplete` or `failed`,

      - `"in_progress"`

      - `"searching"`

      - `"completed"`

      - `"incomplete"`

      - `"failed"`

    - `type: "file_search_call"`

      The type of the file search tool call. Always `file_search_call`.

      - `"file_search_call"`

    - `results?: Array<Result> | null`

      The results of the file search tool call.

      - `attributes?: Record<string, string | number | boolean> | null`

        Set of 16 key-value pairs that can be attached to an object. This can be
        useful for storing additional information about the object in a structured
        format, and querying for objects via API or the dashboard. Keys are strings
        with a maximum length of 64 characters. Values are strings with a maximum
        length of 512 characters, booleans, or numbers.

        - `string`

        - `number`

        - `boolean`

      - `file_id?: string`

        The unique ID of the file.

      - `filename?: string`

        The name of the file.

      - `score?: number`

        The relevance score of the file - a value between 0 and 1.

      - `text?: string`

        The text that was retrieved from the file.

  - `ResponseComputerToolCall`

    A tool call to a computer use tool. See the
    [computer use guide](https://platform.openai.com/docs/guides/tools-computer-use) for more information.

    - `id: string`

      The unique ID of the computer call.

    - `action: Click | DoubleClick | Drag | 6 more`

      A click action.

      - `Click`

        A click action.

        - `button: "left" | "right" | "wheel" | 2 more`

          Indicates which mouse button was pressed during the click. One of `left`, `right`, `wheel`, `back`, or `forward`.

          - `"left"`

          - `"right"`

          - `"wheel"`

          - `"back"`

          - `"forward"`

        - `type: "click"`

          Specifies the event type. For a click action, this property is always `click`.

          - `"click"`

        - `x: number`

          The x-coordinate where the click occurred.

        - `y: number`

          The y-coordinate where the click occurred.

      - `DoubleClick`

        A double click action.

        - `type: "double_click"`

          Specifies the event type. For a double click action, this property is always set to `double_click`.

          - `"double_click"`

        - `x: number`

          The x-coordinate where the double click occurred.

        - `y: number`

          The y-coordinate where the double click occurred.

      - `Drag`

        A drag action.

        - `path: Array<Path>`

          An array of coordinates representing the path of the drag action. Coordinates will appear as an array of objects, eg

          ```
          [
            { x: 100, y: 200 },
            { x: 200, y: 300 }
          ]
          ```

          - `x: number`

            The x-coordinate.

          - `y: number`

            The y-coordinate.

        - `type: "drag"`

          Specifies the event type. For a drag action, this property is always set to `drag`.

          - `"drag"`

      - `Keypress`

        A collection of keypresses the model would like to perform.

        - `keys: Array<string>`

          The combination of keys the model is requesting to be pressed. This is an array of strings, each representing a key.

        - `type: "keypress"`

          Specifies the event type. For a keypress action, this property is always set to `keypress`.

          - `"keypress"`

      - `Move`

        A mouse move action.

        - `type: "move"`

          Specifies the event type. For a move action, this property is always set to `move`.

          - `"move"`

        - `x: number`

          The x-coordinate to move to.

        - `y: number`

          The y-coordinate to move to.

      - `Screenshot`

        A screenshot action.

        - `type: "screenshot"`

          Specifies the event type. For a screenshot action, this property is always set to `screenshot`.

          - `"screenshot"`

      - `Scroll`

        A scroll action.

        - `scroll_x: number`

          The horizontal scroll distance.

        - `scroll_y: number`

          The vertical scroll distance.

        - `type: "scroll"`

          Specifies the event type. For a scroll action, this property is always set to `scroll`.

          - `"scroll"`

        - `x: number`

          The x-coordinate where the scroll occurred.

        - `y: number`

          The y-coordinate where the scroll occurred.

      - `Type`

        An action to type in text.

        - `text: string`

          The text to type.

        - `type: "type"`

          Specifies the event type. For a type action, this property is always set to `type`.

          - `"type"`

      - `Wait`

        A wait action.

        - `type: "wait"`

          Specifies the event type. For a wait action, this property is always set to `wait`.

          - `"wait"`

    - `call_id: string`

      An identifier used when responding to the tool call with output.

    - `pending_safety_checks: Array<PendingSafetyCheck>`

      The pending safety checks for the computer call.

      - `id: string`

        The ID of the pending safety check.

      - `code?: string | null`

        The type of the pending safety check.

      - `message?: string | null`

        Details about the pending safety check.

    - `status: "in_progress" | "completed" | "incomplete"`

      The status of the item. One of `in_progress`, `completed`, or
      `incomplete`. Populated when items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: "computer_call"`

      The type of the computer call. Always `computer_call`.

      - `"computer_call"`

  - `ResponseComputerToolCallOutputItem`

    - `id: string`

      The unique ID of the computer call tool output.

    - `call_id: string`

      The ID of the computer tool call that produced the output.

    - `output: ResponseComputerToolCallOutputScreenshot`

      A computer screenshot image used with the computer use tool.

      - `type: "computer_screenshot"`

        Specifies the event type. For a computer screenshot, this property is
        always set to `computer_screenshot`.

        - `"computer_screenshot"`

      - `file_id?: string`

        The identifier of an uploaded file that contains the screenshot.

      - `image_url?: string`

        The URL of the screenshot image.

    - `type: "computer_call_output"`

      The type of the computer tool call output. Always `computer_call_output`.

      - `"computer_call_output"`

    - `acknowledged_safety_checks?: Array<AcknowledgedSafetyCheck>`

      The safety checks reported by the API that have been acknowledged by the
      developer.

      - `id: string`

        The ID of the pending safety check.

      - `code?: string | null`

        The type of the pending safety check.

      - `message?: string | null`

        Details about the pending safety check.

    - `status?: "in_progress" | "completed" | "incomplete"`

      The status of the message input. One of `in_progress`, `completed`, or
      `incomplete`. Populated when input items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

  - `ResponseFunctionWebSearch`

    The results of a web search tool call. See the
    [web search guide](https://platform.openai.com/docs/guides/tools-web-search) for more information.

    - `id: string`

      The unique ID of the web search tool call.

    - `action: Search | OpenPage | FindInPage`

      An object describing the specific action taken in this web search call.
      Includes details on how the model used the web (search, open_page, find_in_page).

      - `Search`

        Action type "search" - Performs a web search query.

        - `query: string`

          [DEPRECATED] The search query.

        - `type: "search"`

          The action type.

          - `"search"`

        - `queries?: Array<string>`

          The search queries.

        - `sources?: Array<Source>`

          The sources used in the search.

          - `type: "url"`

            The type of source. Always `url`.

            - `"url"`

          - `url: string`

            The URL of the source.

      - `OpenPage`

        Action type "open_page" - Opens a specific URL from search results.

        - `type: "open_page"`

          The action type.

          - `"open_page"`

        - `url?: string | null`

          The URL opened by the model.

      - `FindInPage`

        Action type "find_in_page": Searches for a pattern within a loaded page.

        - `pattern: string`

          The pattern or text to search for within the page.

        - `type: "find_in_page"`

          The action type.

          - `"find_in_page"`

        - `url: string`

          The URL of the page searched for the pattern.

    - `status: "in_progress" | "searching" | "completed" | "failed"`

      The status of the web search tool call.

      - `"in_progress"`

      - `"searching"`

      - `"completed"`

      - `"failed"`

    - `type: "web_search_call"`

      The type of the web search tool call. Always `web_search_call`.

      - `"web_search_call"`

  - `ResponseFunctionToolCallItem extends ResponseFunctionToolCall`

    A tool call to run a function. See the
    [function calling guide](https://platform.openai.com/docs/guides/function-calling) for more information.

    - `id: string`

      The unique ID of the function tool call.

  - `ResponseFunctionToolCallOutputItem`

    - `id: string`

      The unique ID of the function call tool output.

    - `call_id: string`

      The unique ID of the function tool call generated by the model.

    - `output: string | Array<ResponseInputText | ResponseInputImage | ResponseInputFile>`

      The output from the function call generated by your code.
      Can be a string or an list of output content.

      - `string`

      - `Array<ResponseInputText | ResponseInputImage | ResponseInputFile>`

        - `ResponseInputText`

          A text input to the model.

          - `text: string`

            The text input to the model.

          - `type: "input_text"`

            The type of the input item. Always `input_text`.

            - `"input_text"`

        - `ResponseInputImage`

          An image input to the model. Learn about [image inputs](https://platform.openai.com/docs/guides/vision).

          - `detail: "low" | "high" | "auto"`

            The detail level of the image to be sent to the model. One of `high`, `low`, or `auto`. Defaults to `auto`.

            - `"low"`

            - `"high"`

            - `"auto"`

          - `type: "input_image"`

            The type of the input item. Always `input_image`.

            - `"input_image"`

          - `file_id?: string | null`

            The ID of the file to be sent to the model.

          - `image_url?: string | null`

            The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.

        - `ResponseInputFile`

          A file input to the model.

          - `type: "input_file"`

            The type of the input item. Always `input_file`.

            - `"input_file"`

          - `file_data?: string`

            The content of the file to be sent to the model.

          - `file_id?: string | null`

            The ID of the file to be sent to the model.

          - `file_url?: string`

            The URL of the file to be sent to the model.

          - `filename?: string`

            The name of the file to be sent to the model.

    - `type: "function_call_output"`

      The type of the function tool call output. Always `function_call_output`.

      - `"function_call_output"`

    - `status?: "in_progress" | "completed" | "incomplete"`

      The status of the item. One of `in_progress`, `completed`, or
      `incomplete`. Populated when items are returned via API.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

  - `ImageGenerationCall`

    An image generation request made by the model.

    - `id: string`

      The unique ID of the image generation call.

    - `result: string | null`

      The generated image encoded in base64.

    - `status: "in_progress" | "completed" | "generating" | "failed"`

      The status of the image generation call.

      - `"in_progress"`

      - `"completed"`

      - `"generating"`

      - `"failed"`

    - `type: "image_generation_call"`

      The type of the image generation call. Always `image_generation_call`.

      - `"image_generation_call"`

  - `ResponseCodeInterpreterToolCall`

    A tool call to run code.

    - `id: string`

      The unique ID of the code interpreter tool call.

    - `code: string | null`

      The code to run, or null if not available.

    - `container_id: string`

      The ID of the container used to run the code.

    - `outputs: Array<Logs | Image> | null`

      The outputs generated by the code interpreter, such as logs or images.
      Can be null if no outputs are available.

      - `Logs`

        The logs output from the code interpreter.

        - `logs: string`

          The logs output from the code interpreter.

        - `type: "logs"`

          The type of the output. Always `logs`.

          - `"logs"`

      - `Image`

        The image output from the code interpreter.

        - `type: "image"`

          The type of the output. Always `image`.

          - `"image"`

        - `url: string`

          The URL of the image output from the code interpreter.

    - `status: "in_progress" | "completed" | "incomplete" | 2 more`

      The status of the code interpreter tool call. Valid values are `in_progress`, `completed`, `incomplete`, `interpreting`, and `failed`.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

      - `"interpreting"`

      - `"failed"`

    - `type: "code_interpreter_call"`

      The type of the code interpreter tool call. Always `code_interpreter_call`.

      - `"code_interpreter_call"`

  - `LocalShellCall`

    A tool call to run a command on the local shell.

    - `id: string`

      The unique ID of the local shell call.

    - `action: Action`

      Execute a shell command on the server.

      - `command: Array<string>`

        The command to run.

      - `env: Record<string, string>`

        Environment variables to set for the command.

      - `type: "exec"`

        The type of the local shell action. Always `exec`.

        - `"exec"`

      - `timeout_ms?: number | null`

        Optional timeout in milliseconds for the command.

      - `user?: string | null`

        Optional user to run the command as.

      - `working_directory?: string | null`

        Optional working directory to run the command in.

    - `call_id: string`

      The unique ID of the local shell tool call generated by the model.

    - `status: "in_progress" | "completed" | "incomplete"`

      The status of the local shell call.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: "local_shell_call"`

      The type of the local shell call. Always `local_shell_call`.

      - `"local_shell_call"`

  - `LocalShellCallOutput`

    The output of a local shell tool call.

    - `id: string`

      The unique ID of the local shell tool call generated by the model.

    - `output: string`

      A JSON string of the output of the local shell tool call.

    - `type: "local_shell_call_output"`

      The type of the local shell tool call output. Always `local_shell_call_output`.

      - `"local_shell_call_output"`

    - `status?: "in_progress" | "completed" | "incomplete" | null`

      The status of the item. One of `in_progress`, `completed`, or `incomplete`.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

  - `ResponseFunctionShellToolCall`

    A tool call that executes one or more shell commands in a managed environment.

    - `id: string`

      The unique ID of the shell tool call. Populated when this item is returned via API.

    - `action: Action`

      The shell commands and limits that describe how to run the tool call.

      - `commands: Array<string>`

      - `max_output_length: number | null`

        Optional maximum number of characters to return from each command.

      - `timeout_ms: number | null`

        Optional timeout in milliseconds for the commands.

    - `call_id: string`

      The unique ID of the shell tool call generated by the model.

    - `environment: ResponseLocalEnvironment | ResponseContainerReference | null`

      Represents the use of a local environment to perform shell actions.

      - `ResponseLocalEnvironment`

        Represents the use of a local environment to perform shell actions.

        - `type: "local"`

          The environment type. Always `local`.

          - `"local"`

      - `ResponseContainerReference`

        Represents a container created with /v1/containers.

        - `container_id: string`

        - `type: "container_reference"`

          The environment type. Always `container_reference`.

          - `"container_reference"`

    - `status: "in_progress" | "completed" | "incomplete"`

      The status of the shell call. One of `in_progress`, `completed`, or `incomplete`.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: "shell_call"`

      The type of the item. Always `shell_call`.

      - `"shell_call"`

    - `created_by?: string`

      The ID of the entity that created this tool call.

  - `ResponseFunctionShellToolCallOutput`

    The output of a shell tool call that was emitted.

    - `id: string`

      The unique ID of the shell call output. Populated when this item is returned via API.

    - `call_id: string`

      The unique ID of the shell tool call generated by the model.

    - `max_output_length: number | null`

      The maximum length of the shell command output. This is generated by the model and should be passed back with the raw output.

    - `output: Array<Output>`

      An array of shell call output contents

      - `outcome: Timeout | Exit`

        Represents either an exit outcome (with an exit code) or a timeout outcome for a shell call output chunk.

        - `Timeout`

          Indicates that the shell call exceeded its configured time limit.

          - `type: "timeout"`

            The outcome type. Always `timeout`.

            - `"timeout"`

        - `Exit`

          Indicates that the shell commands finished and returned an exit code.

          - `exit_code: number`

            Exit code from the shell process.

          - `type: "exit"`

            The outcome type. Always `exit`.

            - `"exit"`

      - `stderr: string`

        The standard error output that was captured.

      - `stdout: string`

        The standard output that was captured.

      - `created_by?: string`

        The identifier of the actor that created the item.

    - `status: "in_progress" | "completed" | "incomplete"`

      The status of the shell call output. One of `in_progress`, `completed`, or `incomplete`.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: "shell_call_output"`

      The type of the shell call output. Always `shell_call_output`.

      - `"shell_call_output"`

    - `created_by?: string`

      The identifier of the actor that created the item.

  - `ResponseApplyPatchToolCall`

    A tool call that applies file diffs by creating, deleting, or updating files.

    - `id: string`

      The unique ID of the apply patch tool call. Populated when this item is returned via API.

    - `call_id: string`

      The unique ID of the apply patch tool call generated by the model.

    - `operation: CreateFile | DeleteFile | UpdateFile`

      One of the create_file, delete_file, or update_file operations applied via apply_patch.

      - `CreateFile`

        Instruction describing how to create a file via the apply_patch tool.

        - `diff: string`

          Diff to apply.

        - `path: string`

          Path of the file to create.

        - `type: "create_file"`

          Create a new file with the provided diff.

          - `"create_file"`

      - `DeleteFile`

        Instruction describing how to delete a file via the apply_patch tool.

        - `path: string`

          Path of the file to delete.

        - `type: "delete_file"`

          Delete the specified file.

          - `"delete_file"`

      - `UpdateFile`

        Instruction describing how to update a file via the apply_patch tool.

        - `diff: string`

          Diff to apply.

        - `path: string`

          Path of the file to update.

        - `type: "update_file"`

          Update an existing file with the provided diff.

          - `"update_file"`

    - `status: "in_progress" | "completed"`

      The status of the apply patch tool call. One of `in_progress` or `completed`.

      - `"in_progress"`

      - `"completed"`

    - `type: "apply_patch_call"`

      The type of the item. Always `apply_patch_call`.

      - `"apply_patch_call"`

    - `created_by?: string`

      The ID of the entity that created this tool call.

  - `ResponseApplyPatchToolCallOutput`

    The output emitted by an apply patch tool call.

    - `id: string`

      The unique ID of the apply patch tool call output. Populated when this item is returned via API.

    - `call_id: string`

      The unique ID of the apply patch tool call generated by the model.

    - `status: "completed" | "failed"`

      The status of the apply patch tool call output. One of `completed` or `failed`.

      - `"completed"`

      - `"failed"`

    - `type: "apply_patch_call_output"`

      The type of the item. Always `apply_patch_call_output`.

      - `"apply_patch_call_output"`

    - `created_by?: string`

      The ID of the entity that created this tool call output.

    - `output?: string | null`

      Optional textual output returned by the apply patch tool.

  - `McpListTools`

    A list of tools available on an MCP server.

    - `id: string`

      The unique ID of the list.

    - `server_label: string`

      The label of the MCP server.

    - `tools: Array<Tool>`

      The tools available on the server.

      - `input_schema: unknown`

        The JSON schema describing the tool's input.

      - `name: string`

        The name of the tool.

      - `annotations?: unknown`

        Additional annotations about the tool.

      - `description?: string | null`

        The description of the tool.

    - `type: "mcp_list_tools"`

      The type of the item. Always `mcp_list_tools`.

      - `"mcp_list_tools"`

    - `error?: string | null`

      Error message if the server could not list tools.

  - `McpApprovalRequest`

    A request for human approval of a tool invocation.

    - `id: string`

      The unique ID of the approval request.

    - `arguments: string`

      A JSON string of arguments for the tool.

    - `name: string`

      The name of the tool to run.

    - `server_label: string`

      The label of the MCP server making the request.

    - `type: "mcp_approval_request"`

      The type of the item. Always `mcp_approval_request`.

      - `"mcp_approval_request"`

  - `McpApprovalResponse`

    A response to an MCP approval request.

    - `id: string`

      The unique ID of the approval response

    - `approval_request_id: string`

      The ID of the approval request being answered.

    - `approve: boolean`

      Whether the request was approved.

    - `type: "mcp_approval_response"`

      The type of the item. Always `mcp_approval_response`.

      - `"mcp_approval_response"`

    - `reason?: string | null`

      Optional reason for the decision.

  - `McpCall`

    An invocation of a tool on an MCP server.

    - `id: string`

      The unique ID of the tool call.

    - `arguments: string`

      A JSON string of the arguments passed to the tool.

    - `name: string`

      The name of the tool that was run.

    - `server_label: string`

      The label of the MCP server running the tool.

    - `type: "mcp_call"`

      The type of the item. Always `mcp_call`.

      - `"mcp_call"`

    - `approval_request_id?: string | null`

      Unique identifier for the MCP tool call approval request.
      Include this value in a subsequent `mcp_approval_response` input to approve or reject the corresponding tool call.

    - `error?: string | null`

      The error from the tool call, if any.

    - `output?: string | null`

      The output from the tool call.

    - `status?: "in_progress" | "completed" | "incomplete" | 2 more`

      The status of the tool call. One of `in_progress`, `completed`, `incomplete`, `calling`, or `failed`.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

      - `"calling"`

      - `"failed"`

### Example

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const responseItem of client.responses.inputItems.list('response_id')) {
  console.log(responseItem);
}
```
