## Max output tokens

Maximum number of tokens that can be generated in the response. A token is
approximately four characters. 100 tokens correspond to roughly 60-80 words.

Specify a lower value for shorter responses and a higher value for potentially longer
responses.

## Temperature

The temperature is used for sampling during response generation, which occurs when `topP`
and `topK` are applied. Temperature controls the degree of randomness in token selection.
Lower temperatures are good for prompts that require a less open-ended or creative response, while
higher temperatures can lead to more diverse or creative results. A temperature of `0`
means that the highest probability tokens are always selected. In this case, responses for a given
prompt are mostly deterministic, but a small amount of variation is still possible.

If the model returns a response that's too generic, too short, or the model gives a fallback
response, try increasing the temperature. If the model enters infinite generation, increasing the
temperature to at least `0.1` may lead to improved results.
`1.0` is the recommended starting value for temperature.

Gemini models support a temperature value between 0.0 and 2.0. Models have a default
temperature of 1.0.

## Top-P

Top-P changes how the model selects tokens for output. Tokens are selected
from the most probable to least probable until the sum of their probabilities
equals the top-P value. For example, if tokens A, B, and C have a probability of
0.3, 0.2, and 0.1 and the top-P value is `0.5`, then the model will
select either A or B as the next token by using temperature and excludes C as a
candidate.

Specify a lower value for less random responses and a higher value for more
random responses.

## Top-K

Top-K changes how the model selects tokens for output. A top-K of
`1` means the next selected token is the most probable among all
tokens in the model's vocabulary (also called greedy decoding), while a top-K of
`3` means that the next token is selected from among the three most
probable tokens by using temperature.

For each token selection step, the top-K tokens with the highest
probabilities are sampled. Then tokens are further filtered based on top-P with
the final token selected using temperature sampling.

## Seed

When seed is fixed to a specific value, the model makes a best effort to provide
the same response for repeated requests. Deterministic output isn't guaranteed.
Also, changing the model or parameter settings, such as the temperature, can
cause variations in the response even when you use the same seed value. By
default, a random seed value is used.

This is a preview feature.

## What's next

- Explore examples of prompts in the Prompt gallery.
- Learn how to optimize prompts for use with Google models by using the Gemini Enterprise Agent Platform prompt optimizer (Preview).
