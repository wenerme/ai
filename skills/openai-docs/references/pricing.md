# Pricing

Starting March 31, 2026, container usage will be billed per 20-minute session.
  Rates by memory tier are unchanged. See [container usage
  pricing](#container-usage-pricing).

<div className="-mb-6">
  

Text tokens


</div>

<small className="float-left pt-3">Prices per 1M tokens.</small>



<div data-content-switcher-pane data-value="batch" hidden>
    <div class="hidden">Batch</div>

    </div>
  <div data-content-switcher-pane data-value="flex" hidden>
    <div class="hidden">Flex</div>

    </div>
  <div data-content-switcher-pane data-value="standard">
    <div class="hidden">Standard</div>

    </div>
  <div data-content-switcher-pane data-value="priority" hidden>
    <div class="hidden">Priority</div>

    </div>



<small>
    For faster processing of API requests, try the [priority processing service
    tier](https://developers.openai.com/api/docs/guides/priority-processing). For lower prices with higher latency,
    try the [flex processing tier](https://developers.openai.com/api/docs/guides/flex-processing).

    Large numbers of API requests which are not time-sensitive can use the
    [Batch API](https://developers.openai.com/api/docs/guides/batch) for additional savings as well.

    While reasoning tokens are not visible via the API, they still occupy space in
    the model's context window and are billed as output tokens.

    For gpt-image-1.5, Text output tokens include model reasoning tokens.

</small>

<br />

<div className="-mb-6">
  

Image tokens


</div>

<small className="float-left pt-3">Prices per 1M tokens.</small>



<div data-content-switcher-pane data-value="batch" hidden>
    <div class="hidden">Batch</div>

    </div>
  <div data-content-switcher-pane data-value="standard">
    <div class="hidden">Standard</div>

    </div>



<br />

<div className="-mb-6">
  

Audio tokens


</div>

<small>Prices per 1M tokens.</small>

<br />

<div className="-mb-6">
  

Video


</div>

<small>Prices per second.</small>

<br />

<div className="-mb-6">
  

Fine-tuning


</div>

<small className="float-left pt-3">Prices per 1M tokens.</small>



<div data-content-switcher-pane data-value="batch" hidden>
        <div class="hidden">Batch</div>
    
</div>
  <div data-content-switcher-pane data-value="standard">
        <div class="hidden">Standard</div>
    
</div>



<small>
  Tokens used for model grading in reinforcement fine-tuning are billed at that
  model's per-token rate. Inference discounts are available if you enable data
  sharing when creating the fine-tune job. [Learn
  more](https://help.openai.com/en/articles/10306912-sharing-feedback-evaluation-and-fine-tuning-data-and-api-inputs-and-outputs-with-openai#h_c93188c569).
</small>

<br />

<div className="-mb-6">
  

Built-in tools


</div>

<div id="container-usage-pricing"></div>

| Tool                                                                                                                                                                                       | Cost                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Container usage (including [Hosted Shell](https://developers.openai.com/api/docs/guides/tools-shell#hosted-shell-quickstart) and [Code Interpreter](https://developers.openai.com/api/docs/guides/tools-code-interpreter)) <br />Now                 | 1 GB (default): \$0.03 / container<br />4 GB: \$0.12 / container<br />16 GB: \$0.48 / container<br />64 GB: \$1.92 / container                                                     |
| Container usage (including [Hosted Shell](https://developers.openai.com/api/docs/guides/tools-shell#hosted-shell-quickstart) and [Code Interpreter](https://developers.openai.com/api/docs/guides/tools-code-interpreter)) <br />Starting March 31st | 1 GB (default): \$0.03 / 20 minutes / container<br />4 GB: \$0.12 / 20 minutes / container<br />16 GB: \$0.48 / 20 minutes / container<br />64 GB: \$1.92 / 20 minutes / container |
| File search storage                                                                                                                                                                        | \$0.10 / GB per day (1GB free)                                                                                                                                                     |
| File search tool call <br /><small>Responses API only</small>                                                                                                                              | \$2.50 / 1k calls                                                                                                                                                                  |
| Web search (all models) <br /><small>[1]</small>                                                                                                                                           | \$10.00 / 1k calls + search content tokens billed at model rates                                                                                                                   |
| Web search preview (reasoning models, including gpt-5, o-series) <br /><small></small>                                                                                                     | \$10.00 / 1k calls + search content tokens billed at model rates                                                                                                                   |
| Web search preview (non-reasoning models) <br /><small></small>                                                                                                                            | \$25.00 / 1k calls + search content tokens are free                                                                                                                                |

<small>
The tokens used for built-in tools are billed at the chosen model's per-token rates.
GB refers to binary gigabytes of storage (also known as gibibyte), where 1GB is 2^30 bytes.

**Web search:**
There are two components that contribute to the cost of using the web search tool:
(1) tool calls and (2) search content tokens.
Tool calls are billed per 1000 calls, according to the tool version and model type. The billing dashboard and invoices will report these line items as “web search tool calls.”

Search content tokens are tokens retrieved from the search index and fed to the model alongside your prompt to generate an answer. These are billed at the model’s input token rate, unless otherwise specified.

\[1\] For `gpt-4o-mini` and `gpt-4.1-mini` with the web search non-preview tool, search content tokens are charged as a fixed block of 8,000 input tokens per call.

</small>

<br />

<div className="-mb-6">
  

AgentKit


</div>

<p>
  Build, deploy, and optimize production-grade agents with Agent Builder,
  ChatKit, and Evals. You pay only for the compute and data you actually use.
</p>

<br />

<div className="-mb-6">
  

Transcription and speech generation


</div>

<small>Prices per 1M tokens.</small>

#### Text tokens

| Model                     | Input  | Output  | Estimated cost   |
| ------------------------- | ------ | ------- | ---------------- |
| gpt-4o-mini-tts           | \$0.60 | -       | \$0.015 / minute |
| gpt-4o-transcribe         | \$2.50 | \$10.00 | \$0.006 / minute |
| gpt-4o-transcribe-diarize | \$2.50 | \$10.00 | \$0.006 / minute |
| gpt-4o-mini-transcribe    | \$1.25 | \$5.00  | \$0.003 / minute |

#### Audio tokens

| Model                     | Input  | Output  | Estimated cost   |
| ------------------------- | ------ | ------- | ---------------- |
| gpt-4o-mini-tts           | -      | \$12.00 | \$0.015 / minute |
| gpt-4o-transcribe         | \$6.00 | -       | \$0.006 / minute |
| gpt-4o-transcribe-diarize | \$6.00 | -       | \$0.006 / minute |
| gpt-4o-mini-transcribe    | \$3.00 | -       | \$0.003 / minute |

#### Other models

| Model   | Use case          | Cost                    |
| ------- | ----------------- | ----------------------- |
| Whisper | Transcription     | \$0.006 / minute        |
| TTS     | Speech generation | \$15.00 / 1M characters |
| TTS HD  | Speech generation | \$30.00 / 1M characters |

<br />

<div className="-mb-6">
  

Image generation


</div>

<small>Prices per image.</small>

<table style={{ borderCollapse: "collapse", width: "100%" }}>
  <thead>
    <tr>
      <th style={{ textAlign: "left", padding: "8px" }}>Model</th>
      <th style={{ textAlign: "left", padding: "8px" }}>Quality</th>
      <th style={{ padding: "8px" }}>1024 x 1024</th>
      <th style={{ padding: "8px" }}>1024 x 1536</th>
      <th style={{ padding: "8px" }}>1536 x 1024</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="3" style={{ padding: "8px" }}>GPT Image 1.5</td>
      <td style={{ padding: "8px" }}>Low</td>
      <td style={{ padding: "8px" }}>$0.009</td>
      <td style={{ padding: "8px" }}>$0.013</td>
      <td style={{ padding: "8px" }}>$0.013</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>Medium</td>
      <td style={{ padding: "8px" }}>$0.034</td>
      <td style={{ padding: "8px" }}>$0.05</td>
      <td style={{ padding: "8px" }}>$0.05</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>High</td>
      <td style={{ padding: "8px" }}>$0.133</td>
      <td style={{ padding: "8px" }}>$0.2</td>
      <td style={{ padding: "8px" }}>$0.2</td>
    </tr>

    <tr>
      <td rowSpan="3" style={{ padding: "8px" }}>GPT Image Latest</td>
      <td style={{ padding: "8px" }}>Low</td>
      <td style={{ padding: "8px" }}>$0.009</td>
      <td style={{ padding: "8px" }}>$0.013</td>
      <td style={{ padding: "8px" }}>$0.013</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>Medium</td>
      <td style={{ padding: "8px" }}>$0.034</td>
      <td style={{ padding: "8px" }}>$0.05</td>
      <td style={{ padding: "8px" }}>$0.05</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>High</td>
      <td style={{ padding: "8px" }}>$0.133</td>
      <td style={{ padding: "8px" }}>$0.2</td>
      <td style={{ padding: "8px" }}>$0.2</td>
    </tr>

    <tr>
      <td rowSpan="3" style={{ padding: "8px" }}>GPT Image 1</td>
      <td style={{ padding: "8px" }}>Low</td>
      <td style={{ padding: "8px" }}>$0.011</td>
      <td style={{ padding: "8px" }}>$0.016</td>
      <td style={{ padding: "8px" }}>$0.016</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>Medium</td>
      <td style={{ padding: "8px" }}>$0.042</td>
      <td style={{ padding: "8px" }}>$0.063</td>
      <td style={{ padding: "8px" }}>$0.063</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>High</td>
      <td style={{ padding: "8px" }}>$0.167</td>
      <td style={{ padding: "8px" }}>$0.25</td>
      <td style={{ padding: "8px" }}>$0.25</td>
    </tr>

    <tr>
      <td rowSpan="3" style={{ padding: "8px" }}>GPT Image 1 Mini</td>
      <td style={{ padding: "8px" }}>Low</td>
      <td style={{ padding: "8px" }}>$0.005</td>
      <td style={{ padding: "8px" }}>$0.006</td>
      <td style={{ padding: "8px" }}>$0.006</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>Medium</td>
      <td style={{ padding: "8px" }}>$0.011</td>
      <td style={{ padding: "8px" }}>$0.015</td>
      <td style={{ padding: "8px" }}>$0.015</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>High</td>
      <td style={{ padding: "8px" }}>$0.036</td>
      <td style={{ padding: "8px" }}>$0.052</td>
      <td style={{ padding: "8px" }}>$0.052</td>
    </tr>

    <tr><td colSpan="5" style={{ height: "16px" }}></td></tr>

    <tr>
      <th style={{ textAlign: "left", padding: "8px" }}>Model</th>
      <th style={{ textAlign: "left", padding: "8px" }}>Quality</th>
      <th style={{ padding: "8px" }}>1024 x 1024</th>
      <th style={{ padding: "8px" }}>1024 x 1792</th>
      <th style={{ padding: "8px" }}>1792 x 1024</th>
    </tr>
    <tr>
      <td rowSpan="2" style={{ padding: "8px" }}>DALL·E 3</td>
      <td style={{ padding: "8px" }}>Standard</td>
      <td style={{ padding: "8px" }}>$0.04</td>
      <td style={{ padding: "8px" }}>$0.08</td>
      <td style={{ padding: "8px" }}>$0.08</td>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>HD</td>
      <td style={{ padding: "8px" }}>$0.08</td>
      <td style={{ padding: "8px" }}>$0.12</td>
      <td style={{ padding: "8px" }}>$0.12</td>
    </tr>

    <tr><td colSpan="5" style={{ height: "16px" }}></td></tr>

    <tr>
      <th style={{ textAlign: "left", padding: "8px" }}>Model</th>
      <th style={{ textAlign: "left", padding: "8px" }}>Quality</th>
      <th style={{ padding: "8px" }}>256 x 256</th>
      <th style={{ padding: "8px" }}>512 x 512</th>
      <th style={{ padding: "8px" }}>1024 x 1024</th>
    </tr>
    <tr>
      <td style={{ padding: "8px" }}>DALL·E 2</td>
      <td style={{ padding: "8px" }}>Standard</td>
      <td style={{ padding: "8px" }}>$0.016</td>
      <td style={{ padding: "8px" }}>$0.018</td>
      <td style={{ padding: "8px" }}>$0.02</td>
    </tr>

  </tbody>
</table>

<br />

<div className="-mb-6">
  

Embeddings


</div>

<small>Prices per 1M tokens.</small>

<br />

### Moderation

Our `omni-moderation` models are made available free of charge ✌️

<br />

<div className="-mb-6">
  

Legacy models


</div>

<small className="float-left pt-3">Prices per 1M tokens.</small>



<div data-content-switcher-pane data-value="batch" hidden>
        <div class="hidden">Batch</div>
    
</div>
  <div data-content-switcher-pane data-value="standard">
        <div class="hidden">Standard</div>
    
</div>