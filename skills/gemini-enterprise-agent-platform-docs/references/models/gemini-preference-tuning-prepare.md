This document describes how to define a preference tuning dataset for a Gemini
model.

## About preference tuning datasets

The preference tuning dataset is created to capture human preference using signals like
thumbs-up-thumbs-down, pairwise, and scored feedback.

## Prepare customized preference tuning data

In this example:

An `example` is composed of input and a pair of `completions` fields.

The input includes `contents` and an optional
`system_instruction`. The sum of maximum input and maximum completion token counts
must be \<= 128K.

The `contents` field is in the same
[format used for supervised fine-tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-supervised-tuning-prepare#example-contents). It
supports multi-turn text data that needs to end with a user turn. It doesn't
support multi-modal data.

The `completions` field is composed of a pair of completions and their scores. The
pair must have one preferred completion and one dispreferred completion.

A `completion` is a single model turn that indicates the model response. The
`score` field indicates whether the completion is preferred or dispreferred.
The only possible value is zero or one.
Zero represents the dispreferred completion, while one is the preferred
completion.

We only train on the `completions` turn for each `example`.

## Dataset example for Gemini

    {
      "system_instruction": {
        "parts": [
          {
            "text": "You are a chat bot."
          }
        ]
      },
      "contents": [
        {
          "role": "user",
          "parts": [
            {
              "text": "What is my favorite fruit?"
            }
          ]
        }
      ],
      "completions": [
        {
          "score": 1,
          "completion": {
            "role": "model",
            "parts": [
              {
                "text": "Apple! Apple! Apple!"
              }
            ]
          }
        },
        {
          "score": 0,
          "completion": {
            "role": "model",
            "parts": [
              {
                "text": "Your favorite fruit is apple."
              }
            ]
          }
        }
      ]
    }

## What's next

- [Tune Gemini models by using preference tuning](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini-use-preference-tuning).
