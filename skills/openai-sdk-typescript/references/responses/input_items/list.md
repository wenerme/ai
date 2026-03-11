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

- `ResponseItem = ResponseInputMessageItem | ResponseOutputMessage | ResponseFileSearchToolCall | 19 more`

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

        - `detail: "low" | "high" | "auto" | "original"`

          The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

          - `"low"`

          - `"high"`

          - `"auto"`

          - `"original"`

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

      Labels an `assistant` message as intermediate commentary (`commentary`) or the final answer (`final_answer`).
      For models like `gpt-5.3-codex` and beyond, when sending follow-up requests, preserve and resend
      phase on all assistant messages — dropping it can degrade performance. Not used for user messages.

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

    - `action?: Click | DoubleClick | Drag | 6 more`

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

    - `actions?: ComputerActionList`

      Flattened batched actions for `computer_use`. Each action includes an
      `type` discriminator and action-specific fields.

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

          - `detail: "low" | "high" | "auto" | "original"`

            The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.

            - `"low"`

            - `"high"`

            - `"auto"`

            - `"original"`

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

  - `ResponseToolSearchCall`

    - `id: string`

      The unique ID of the tool search call item.

    - `arguments: unknown`

      Arguments used for the tool search call.

    - `call_id: string | null`

      The unique ID of the tool search call generated by the model.

    - `execution: "server" | "client"`

      Whether tool search was executed by the server or by the client.

      - `"server"`

      - `"client"`

    - `status: "in_progress" | "completed" | "incomplete"`

      The status of the tool search call item that was recorded.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `type: "tool_search_call"`

      The type of the item. Always `tool_search_call`.

      - `"tool_search_call"`

    - `created_by?: string`

      The identifier of the actor that created the item.

  - `ResponseToolSearchOutputItem`

    - `id: string`

      The unique ID of the tool search output item.

    - `call_id: string | null`

      The unique ID of the tool search call generated by the model.

    - `execution: "server" | "client"`

      Whether tool search was executed by the server or by the client.

      - `"server"`

      - `"client"`

    - `status: "in_progress" | "completed" | "incomplete"`

      The status of the tool search output item that was recorded.

      - `"in_progress"`

      - `"completed"`

      - `"incomplete"`

    - `tools: Array<Tool>`

      The loaded tool definitions returned by tool search.

      - `FunctionTool`

        Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).

        - `name: string`

          The name of the function to call.

        - `parameters: Record<string, unknown> | null`

          A JSON schema object describing the parameters of the function.

        - `strict: boolean | null`

          Whether to enforce strict parameter validation. Default `true`.

        - `type: "function"`

          The type of the function tool. Always `function`.

          - `"function"`

        - `defer_loading?: boolean`

          Whether this function is deferred and loaded via tool search.

        - `description?: string | null`

          A description of the function. Used by the model to determine whether or not to call the function.

      - `FileSearchTool`

        A tool that searches for relevant content from uploaded files. Learn more about the [file search tool](https://platform.openai.com/docs/guides/tools-file-search).

        - `type: "file_search"`

          The type of the file search tool. Always `file_search`.

          - `"file_search"`

        - `vector_store_ids: Array<string>`

          The IDs of the vector stores to search.

        - `filters?: ComparisonFilter | CompoundFilter | null`

          A filter to apply.

          - `ComparisonFilter`

            A filter used to compare a specified attribute key to a given value using a defined comparison operation.

            - `key: string`

              The key to compare against the value.

            - `type: "eq" | "ne" | "gt" | 3 more`

              Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

              - `eq`: equals
              - `ne`: not equal
              - `gt`: greater than
              - `gte`: greater than or equal
              - `lt`: less than
              - `lte`: less than or equal
              - `in`: in
              - `nin`: not in

              - `"eq"`

              - `"ne"`

              - `"gt"`

              - `"gte"`

              - `"lt"`

              - `"lte"`

            - `value: string | number | boolean | Array<string | number>`

              The value to compare against the attribute key; supports string, number, or boolean types.

              - `string`

              - `number`

              - `boolean`

              - `Array<string | number>`

                - `string`

                - `number`

          - `CompoundFilter`

            Combine multiple filters using `and` or `or`.

            - `filters: Array<ComparisonFilter | unknown>`

              Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

              - `ComparisonFilter`

                A filter used to compare a specified attribute key to a given value using a defined comparison operation.

                - `key: string`

                  The key to compare against the value.

                - `type: "eq" | "ne" | "gt" | 3 more`

                  Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

                  - `eq`: equals
                  - `ne`: not equal
                  - `gt`: greater than
                  - `gte`: greater than or equal
                  - `lt`: less than
                  - `lte`: less than or equal
                  - `in`: in
                  - `nin`: not in

                  - `"eq"`

                  - `"ne"`

                  - `"gt"`

                  - `"gte"`

                  - `"lt"`

                  - `"lte"`

                - `value: string | number | boolean | Array<string | number>`

                  The value to compare against the attribute key; supports string, number, or boolean types.

                  - `string`

                  - `number`

                  - `boolean`

                  - `Array<string | number>`

                    - `string`

                    - `number`

              - `unknown`

            - `type: "and" | "or"`

              Type of operation: `and` or `or`.

              - `"and"`

              - `"or"`

        - `max_num_results?: number`

          The maximum number of results to return. This number should be between 1 and 50 inclusive.

        - `ranking_options?: RankingOptions`

          Ranking options for search.

          - `hybrid_search?: HybridSearch`

            Weights that control how reciprocal rank fusion balances semantic embedding matches versus sparse keyword matches when hybrid search is enabled.

            - `embedding_weight: number`

              The weight of the embedding in the reciprocal ranking fusion.

            - `text_weight: number`

              The weight of the text in the reciprocal ranking fusion.

          - `ranker?: "auto" | "default-2024-11-15"`

            The ranker to use for the file search.

            - `"auto"`

            - `"default-2024-11-15"`

          - `score_threshold?: number`

            The score threshold for the file search, a number between 0 and 1. Numbers closer to 1 will attempt to return only the most relevant results, but may return fewer results.

      - `ComputerTool`

        A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

        - `type: "computer"`

          The type of the computer tool. Always `computer`.

          - `"computer"`

      - `ComputerUsePreviewTool`

        A tool that controls a virtual computer. Learn more about the [computer tool](https://platform.openai.com/docs/guides/tools-computer-use).

        - `display_height: number`

          The height of the computer display.

        - `display_width: number`

          The width of the computer display.

        - `environment: "windows" | "mac" | "linux" | 2 more`

          The type of computer environment to control.

          - `"windows"`

          - `"mac"`

          - `"linux"`

          - `"ubuntu"`

          - `"browser"`

        - `type: "computer_use_preview"`

          The type of the computer use tool. Always `computer_use_preview`.

          - `"computer_use_preview"`

      - `WebSearchTool`

        Search the Internet for sources related to the prompt. Learn more about the
        [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

        - `type: "web_search" | "web_search_2025_08_26"`

          The type of the web search tool. One of `web_search` or `web_search_2025_08_26`.

          - `"web_search"`

          - `"web_search_2025_08_26"`

        - `filters?: Filters | null`

          Filters for the search.

          - `allowed_domains?: Array<string> | null`

            Allowed domains for the search. If not provided, all domains are allowed.
            Subdomains of the provided domains are allowed as well.

            Example: `["pubmed.ncbi.nlm.nih.gov"]`

        - `search_context_size?: "low" | "medium" | "high"`

          High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

          - `"low"`

          - `"medium"`

          - `"high"`

        - `user_location?: UserLocation | null`

          The approximate location of the user.

          - `city?: string | null`

            Free text input for the city of the user, e.g. `San Francisco`.

          - `country?: string | null`

            The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

          - `region?: string | null`

            Free text input for the region of the user, e.g. `California`.

          - `timezone?: string | null`

            The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

          - `type?: "approximate"`

            The type of location approximation. Always `approximate`.

            - `"approximate"`

      - `Mcp`

        Give the model access to additional tools via remote Model Context Protocol
        (MCP) servers. [Learn more about MCP](https://platform.openai.com/docs/guides/tools-remote-mcp).

        - `server_label: string`

          A label for this MCP server, used to identify it in tool calls.

        - `type: "mcp"`

          The type of the MCP tool. Always `mcp`.

          - `"mcp"`

        - `allowed_tools?: Array<string> | McpToolFilter | null`

          List of allowed tool names or a filter object.

          - `Array<string>`

          - `McpToolFilter`

            A filter object to specify which tools are allowed.

            - `read_only?: boolean`

              Indicates whether or not a tool modifies data or is read-only. If an
              MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
              it will match this filter.

            - `tool_names?: Array<string>`

              List of allowed tool names.

        - `authorization?: string`

          An OAuth access token that can be used with a remote MCP server, either
          with a custom MCP server URL or a service connector. Your application
          must handle the OAuth authorization flow and provide the token here.

        - `connector_id?: "connector_dropbox" | "connector_gmail" | "connector_googlecalendar" | 5 more`

          Identifier for service connectors, like those available in ChatGPT. One of
          `server_url` or `connector_id` must be provided. Learn more about service
          connectors [here](https://platform.openai.com/docs/guides/tools-remote-mcp#connectors).

          Currently supported `connector_id` values are:

          - Dropbox: `connector_dropbox`
          - Gmail: `connector_gmail`
          - Google Calendar: `connector_googlecalendar`
          - Google Drive: `connector_googledrive`
          - Microsoft Teams: `connector_microsoftteams`
          - Outlook Calendar: `connector_outlookcalendar`
          - Outlook Email: `connector_outlookemail`
          - SharePoint: `connector_sharepoint`

          - `"connector_dropbox"`

          - `"connector_gmail"`

          - `"connector_googlecalendar"`

          - `"connector_googledrive"`

          - `"connector_microsoftteams"`

          - `"connector_outlookcalendar"`

          - `"connector_outlookemail"`

          - `"connector_sharepoint"`

        - `defer_loading?: boolean`

          Whether this MCP tool is deferred and discovered via tool search.

        - `headers?: Record<string, string> | null`

          Optional HTTP headers to send to the MCP server. Use for authentication
          or other purposes.

        - `require_approval?: McpToolApprovalFilter | "always" | "never" | null`

          Specify which of the MCP server's tools require approval.

          - `McpToolApprovalFilter`

            Specify which of the MCP server's tools require approval. Can be
            `always`, `never`, or a filter object associated with tools
            that require approval.

            - `always?: Always`

              A filter object to specify which tools are allowed.

              - `read_only?: boolean`

                Indicates whether or not a tool modifies data or is read-only. If an
                MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                it will match this filter.

              - `tool_names?: Array<string>`

                List of allowed tool names.

            - `never?: Never`

              A filter object to specify which tools are allowed.

              - `read_only?: boolean`

                Indicates whether or not a tool modifies data or is read-only. If an
                MCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),
                it will match this filter.

              - `tool_names?: Array<string>`

                List of allowed tool names.

          - `"always" | "never"`

            - `"always"`

            - `"never"`

        - `server_description?: string`

          Optional description of the MCP server, used to provide more context.

        - `server_url?: string`

          The URL for the MCP server. One of `server_url` or `connector_id` must be
          provided.

      - `CodeInterpreter`

        A tool that runs Python code to help generate a response to a prompt.

        - `container: string | CodeInterpreterToolAuto`

          The code interpreter container. Can be a container ID or an object that
          specifies uploaded file IDs to make available to your code, along with an
          optional `memory_limit` setting.

          - `string`

          - `CodeInterpreterToolAuto`

            Configuration for a code interpreter container. Optionally specify the IDs of the files to run the code on.

            - `type: "auto"`

              Always `auto`.

              - `"auto"`

            - `file_ids?: Array<string>`

              An optional list of uploaded files to make available to your code.

            - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

              The memory limit for the code interpreter container.

              - `"1g"`

              - `"4g"`

              - `"16g"`

              - `"64g"`

            - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

              Network access policy for the container.

              - `ContainerNetworkPolicyDisabled`

                - `type: "disabled"`

                  Disable outbound network access. Always `disabled`.

                  - `"disabled"`

              - `ContainerNetworkPolicyAllowlist`

                - `allowed_domains: Array<string>`

                  A list of allowed domains when type is `allowlist`.

                - `type: "allowlist"`

                  Allow outbound network access only to specified domains. Always `allowlist`.

                  - `"allowlist"`

                - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                  Optional domain-scoped secrets for allowlisted domains.

                  - `domain: string`

                    The domain associated with the secret.

                  - `name: string`

                    The name of the secret to inject for the domain.

                  - `value: string`

                    The secret value to inject for the domain.

        - `type: "code_interpreter"`

          The type of the code interpreter tool. Always `code_interpreter`.

          - `"code_interpreter"`

      - `ImageGeneration`

        A tool that generates images using the GPT image models.

        - `type: "image_generation"`

          The type of the image generation tool. Always `image_generation`.

          - `"image_generation"`

        - `action?: "generate" | "edit" | "auto"`

          Whether to generate a new image or edit an existing image. Default: `auto`.

          - `"generate"`

          - `"edit"`

          - `"auto"`

        - `background?: "transparent" | "opaque" | "auto"`

          Background type for the generated image. One of `transparent`,
          `opaque`, or `auto`. Default: `auto`.

          - `"transparent"`

          - `"opaque"`

          - `"auto"`

        - `input_fidelity?: "high" | "low" | null`

          Control how much effort the model will exert to match the style and features, especially facial features, of input images. This parameter is only supported for `gpt-image-1` and `gpt-image-1.5` and later models, unsupported for `gpt-image-1-mini`. Supports `high` and `low`. Defaults to `low`.

          - `"high"`

          - `"low"`

        - `input_image_mask?: InputImageMask`

          Optional mask for inpainting. Contains `image_url`
          (string, optional) and `file_id` (string, optional).

          - `file_id?: string`

            File ID for the mask image.

          - `image_url?: string`

            Base64-encoded mask image.

        - `model?: (string & {}) | "gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

          The image generation model to use. Default: `gpt-image-1`.

          - `(string & {})`

          - `"gpt-image-1" | "gpt-image-1-mini" | "gpt-image-1.5"`

            - `"gpt-image-1"`

            - `"gpt-image-1-mini"`

            - `"gpt-image-1.5"`

        - `moderation?: "auto" | "low"`

          Moderation level for the generated image. Default: `auto`.

          - `"auto"`

          - `"low"`

        - `output_compression?: number`

          Compression level for the output image. Default: 100.

        - `output_format?: "png" | "webp" | "jpeg"`

          The output format of the generated image. One of `png`, `webp`, or
          `jpeg`. Default: `png`.

          - `"png"`

          - `"webp"`

          - `"jpeg"`

        - `partial_images?: number`

          Number of partial images to generate in streaming mode, from 0 (default value) to 3.

        - `quality?: "low" | "medium" | "high" | "auto"`

          The quality of the generated image. One of `low`, `medium`, `high`,
          or `auto`. Default: `auto`.

          - `"low"`

          - `"medium"`

          - `"high"`

          - `"auto"`

        - `size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto"`

          The size of the generated image. One of `1024x1024`, `1024x1536`,
          `1536x1024`, or `auto`. Default: `auto`.

          - `"1024x1024"`

          - `"1024x1536"`

          - `"1536x1024"`

          - `"auto"`

      - `LocalShell`

        A tool that allows the model to execute shell commands in a local environment.

        - `type: "local_shell"`

          The type of the local shell tool. Always `local_shell`.

          - `"local_shell"`

      - `FunctionShellTool`

        A tool that allows the model to execute shell commands.

        - `type: "shell"`

          The type of the shell tool. Always `shell`.

          - `"shell"`

        - `environment?: ContainerAuto | LocalEnvironment | ContainerReference | null`

          - `ContainerAuto`

            - `type: "container_auto"`

              Automatically creates a container for this request

              - `"container_auto"`

            - `file_ids?: Array<string>`

              An optional list of uploaded files to make available to your code.

            - `memory_limit?: "1g" | "4g" | "16g" | "64g" | null`

              The memory limit for the container.

              - `"1g"`

              - `"4g"`

              - `"16g"`

              - `"64g"`

            - `network_policy?: ContainerNetworkPolicyDisabled | ContainerNetworkPolicyAllowlist`

              Network access policy for the container.

              - `ContainerNetworkPolicyDisabled`

                - `type: "disabled"`

                  Disable outbound network access. Always `disabled`.

                  - `"disabled"`

              - `ContainerNetworkPolicyAllowlist`

                - `allowed_domains: Array<string>`

                  A list of allowed domains when type is `allowlist`.

                - `type: "allowlist"`

                  Allow outbound network access only to specified domains. Always `allowlist`.

                  - `"allowlist"`

                - `domain_secrets?: Array<ContainerNetworkPolicyDomainSecret>`

                  Optional domain-scoped secrets for allowlisted domains.

                  - `domain: string`

                    The domain associated with the secret.

                  - `name: string`

                    The name of the secret to inject for the domain.

                  - `value: string`

                    The secret value to inject for the domain.

            - `skills?: Array<SkillReference | InlineSkill>`

              An optional list of skills referenced by id or inline data.

              - `SkillReference`

                - `skill_id: string`

                  The ID of the referenced skill.

                - `type: "skill_reference"`

                  References a skill created with the /v1/skills endpoint.

                  - `"skill_reference"`

                - `version?: string`

                  Optional skill version. Use a positive integer or 'latest'. Omit for default.

              - `InlineSkill`

                - `description: string`

                  The description of the skill.

                - `name: string`

                  The name of the skill.

                - `source: InlineSkillSource`

                  Inline skill payload

                  - `data: string`

                    Base64-encoded skill zip bundle.

                  - `media_type: "application/zip"`

                    The media type of the inline skill payload. Must be `application/zip`.

                    - `"application/zip"`

                  - `type: "base64"`

                    The type of the inline skill source. Must be `base64`.

                    - `"base64"`

                - `type: "inline"`

                  Defines an inline skill for this request.

                  - `"inline"`

          - `LocalEnvironment`

            - `type: "local"`

              Use a local computer environment.

              - `"local"`

            - `skills?: Array<LocalSkill>`

              An optional list of skills.

              - `description: string`

                The description of the skill.

              - `name: string`

                The name of the skill.

              - `path: string`

                The path to the directory containing the skill.

          - `ContainerReference`

            - `container_id: string`

              The ID of the referenced container.

            - `type: "container_reference"`

              References a container created with the /v1/containers endpoint

              - `"container_reference"`

      - `CustomTool`

        A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

        - `name: string`

          The name of the custom tool, used to identify it in tool calls.

        - `type: "custom"`

          The type of the custom tool. Always `custom`.

          - `"custom"`

        - `defer_loading?: boolean`

          Whether this tool should be deferred and discovered via tool search.

        - `description?: string`

          Optional description of the custom tool, used to provide more context.

        - `format?: CustomToolInputFormat`

          The input format for the custom tool. Default is unconstrained text.

          - `Text`

            Unconstrained free-form text.

            - `type: "text"`

              Unconstrained text format. Always `text`.

              - `"text"`

          - `Grammar`

            A grammar defined by the user.

            - `definition: string`

              The grammar definition.

            - `syntax: "lark" | "regex"`

              The syntax of the grammar definition. One of `lark` or `regex`.

              - `"lark"`

              - `"regex"`

            - `type: "grammar"`

              Grammar format. Always `grammar`.

              - `"grammar"`

      - `NamespaceTool`

        Groups function/custom tools under a shared namespace.

        - `description: string`

          A description of the namespace shown to the model.

        - `name: string`

          The namespace name used in tool calls (for example, `crm`).

        - `tools: Array<Function | CustomTool>`

          The function/custom tools available inside this namespace.

          - `Function`

            - `name: string`

            - `type: "function"`

              - `"function"`

            - `description?: string | null`

            - `parameters?: unknown`

            - `strict?: boolean | null`

          - `CustomTool`

            A custom tool that processes input using a specified format. Learn more about   [custom tools](https://platform.openai.com/docs/guides/function-calling#custom-tools)

            - `name: string`

              The name of the custom tool, used to identify it in tool calls.

            - `type: "custom"`

              The type of the custom tool. Always `custom`.

              - `"custom"`

            - `defer_loading?: boolean`

              Whether this tool should be deferred and discovered via tool search.

            - `description?: string`

              Optional description of the custom tool, used to provide more context.

            - `format?: CustomToolInputFormat`

              The input format for the custom tool. Default is unconstrained text.

              - `Text`

                Unconstrained free-form text.

                - `type: "text"`

                  Unconstrained text format. Always `text`.

                  - `"text"`

              - `Grammar`

                A grammar defined by the user.

                - `definition: string`

                  The grammar definition.

                - `syntax: "lark" | "regex"`

                  The syntax of the grammar definition. One of `lark` or `regex`.

                  - `"lark"`

                  - `"regex"`

                - `type: "grammar"`

                  Grammar format. Always `grammar`.

                  - `"grammar"`

        - `type: "namespace"`

          The type of the tool. Always `namespace`.

          - `"namespace"`

      - `ToolSearchTool`

        Hosted or BYOT tool search configuration for deferred tools.

        - `type: "tool_search"`

          The type of the tool. Always `tool_search`.

          - `"tool_search"`

        - `description?: string | null`

          Description shown to the model for a client-executed tool search tool.

        - `execution?: "server" | "client"`

          Whether tool search is executed by the server or by the client.

          - `"server"`

          - `"client"`

        - `parameters?: unknown`

          Parameter schema for a client-executed tool search tool.

      - `WebSearchPreviewTool`

        This tool searches the web for relevant results to use in a response. Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search).

        - `type: "web_search_preview" | "web_search_preview_2025_03_11"`

          The type of the web search tool. One of `web_search_preview` or `web_search_preview_2025_03_11`.

          - `"web_search_preview"`

          - `"web_search_preview_2025_03_11"`

        - `search_content_types?: Array<"text" | "image">`

          - `"text"`

          - `"image"`

        - `search_context_size?: "low" | "medium" | "high"`

          High level guidance for the amount of context window space to use for the search. One of `low`, `medium`, or `high`. `medium` is the default.

          - `"low"`

          - `"medium"`

          - `"high"`

        - `user_location?: UserLocation | null`

          The user's location.

          - `type: "approximate"`

            The type of location approximation. Always `approximate`.

            - `"approximate"`

          - `city?: string | null`

            Free text input for the city of the user, e.g. `San Francisco`.

          - `country?: string | null`

            The two-letter [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1) of the user, e.g. `US`.

          - `region?: string | null`

            Free text input for the region of the user, e.g. `California`.

          - `timezone?: string | null`

            The [IANA timezone](https://timeapi.io/documentation/iana-timezones) of the user, e.g. `America/Los_Angeles`.

      - `ApplyPatchTool`

        Allows the assistant to create, delete, or update files using unified diffs.

        - `type: "apply_patch"`

          The type of the tool. Always `apply_patch`.

          - `"apply_patch"`

    - `type: "tool_search_output"`

      The type of the item. Always `tool_search_output`.

      - `"tool_search_output"`

    - `created_by?: string`

      The identifier of the actor that created the item.

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
