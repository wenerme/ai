This section explains how Provisioned Throughput works with the
Gemini Live API for token counting and quota enforcement.

The Gemini Live API supports low-latency multimodal interactions through
sessions. It uses a session memory to retain and recall information from
interactions within a session. This lets the model recall previously provided or discussed information. Provisioned Throughput supports
the Gemini 2.5 Flash with Gemini Live API model. For more
information about the Gemini Live API, including session limits and
capabilities, see the
[Gemini Live API reference](https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/models/multimodal-live).

The Gemini Live API requires a session to be dedicated entirely to
either Provisioned Throughput or PayGo traffic. It
doesn't support spillover traffic between Provisioned Throughput and
PayGo within the same session. The traffic type set at the start
of a session continues for its entire duration. If you reach your
Provisioned Throughput quota during an active session, you won't
experience throttling or errors. Instead, the system lets the traffic
temporarily burst for the session to continue, with all subsequent usage
registered against your overall quota. This temporary burst can cause your
monitoring dashboards to display Provisioned Throughput usage
(dedicated traffic) above your limit. To avoid exceeding your allocated limits
mid-session, it's important to purchase sufficient GSUs to support your expected
usage.

Spillover is supported from one session to the next. If you exceed your
Provisioned Throughput limit after a session is over, you can start
an additional session using PayGo. Whether a session is processed
entirely as Provisioned Throughput or PayGo is
decided at the start of the session. The system checks the header sent by the
user and then verifies whether there's sufficient
Provisioned Throughput quota for the session. If the available
Provisioned Throughput quota is insufficient to process the entire
session, then PayGo quota is used instead.

## Calculate throughput for Gemini Live API

While using the Gemini Live API, the tokens stored in the session memory
can be used in subsequent requests to the model. As a result, Provisioned Throughput
takes into account the incoming tokens as well as session memory tokens in the
same request. This might lead to the number of tokens being processed per request
being greater than the tokens sent by the user in the ongoing request.

The Gemini Live API has a limit on the total tokens that can be stored in
the session memory and also has a metadata field containing the total number
of tokens. While calculating how much throughput is needed to serve your requests,
you must account for tokens in the session memory.
If you've used the Gemini Live API with pay-as-you-go (PayGo), you can
use these traffic patterns and session tokens to help estimate your
Provisioned Throughput needs.

### Example of how to estimate your Provisioned Throughput requirements for Gemini Live API

During a session, all traffic is processed either as
Provisioned Throughput or pay-as-you-go.

The session state, including the session memory,
are available as long as the session is live.

This example illustrates how two consecutive requests are processed by
including the tokens from the session memory.

#### Request#1 details

**Duration**: 10 seconds

**Tokens sent (audio)**: 10 seconds x 25 tokens/second = 250 tokens

**Tokens sent (video)**: 10 seconds x 258 tokens/frame per second = 2580 tokens

**Total tokens processed for Request#1**:

- **Tokens sent**: Sum of audio and video tokens sent = 2580+250 = 2830 tokens
- **Tokens received**: 100 (audio)

#### Request#2 details

**Duration**: 40 seconds

**Tokens sent (audio)**: 40 seconds x 25 tokens/second = 1000 tokens

**Total tokens processed for Request#2**:

- **Tokens sent**: Tokens sent in Request#2 + session memory tokens from Request#1 = 2830 tokens + 1000 tokens = 3830 tokens
- **Tokens received**: 200 (audio)

#### Calculate the number of tokens processed in the requests

The number of tokens processed during these requests is calculated, as follows:

- Request#1 processes only the input and output tokens from
  the ongoing request, as there are no additional tokens in the session
  memory.

- Request #2 processes the input and output tokens from
  the ongoing request, but also includes the input tokens from the
  session memory, consisting of the input tokens from the preceding request
  (Request #1) from the session memory. The burndown rate for tokens in the session
  memory is the same as that for standard input tokens
  (1 input session memory token = 1 input token).

  If Request#2 took exactly 1 second to process after you sent it,
  your tokens are processed and applied to your Provisioned Throughput quota, as follows:
  - Multiply your inputs by the burndown rates to get the total input tokens:

    2830 x (1 token per session memory token) + 1000 x (1 token per input text token) = 3830 burndown adjusted input tokens per query
  - Multiply your outputs by the burndown rates to get the total output tokens:

    200 x (24 tokens per audio output token) = 4,800 tokens
  - Add these two totals to get the total number of tokens processed:

    3,830 tokens + 4,800 tokens = 8,630 tokens

## What's next

- [Purchase Provisioned Throughput](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/provisioned-throughput/purchase-provisioned-throughput).
