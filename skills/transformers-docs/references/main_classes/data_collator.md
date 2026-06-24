

# Data Collator

Data collators are objects that will form a batch by using a list of dataset elements as input. These elements are of
the same type as the elements of `train_dataset` or `eval_dataset`.

To be able to build batches, data collators may apply some processing (like padding). Some of them (like
[`DataCollatorForLanguageModeling`]) also apply some random data augmentation (like random masking)
on the formed batch.

Examples of use can be found in the [example scripts](../examples) or [example notebooks](../notebooks).

## Default data collator

[[autodoc]] data.data_collator.default_data_collator

## DefaultDataCollator

[[autodoc]] data.data_collator.DefaultDataCollator

## DataCollatorWithPadding

[[autodoc]] data.data_collator.DataCollatorWithPadding

## DataCollatorForTokenClassification

[[autodoc]] data.data_collator.DataCollatorForTokenClassification

## DataCollatorForSeq2Seq

[[autodoc]] data.data_collator.DataCollatorForSeq2Seq

## DataCollatorForLanguageModeling

[[autodoc]] data.data_collator.DataCollatorForLanguageModeling
    - numpy_mask_tokens
    - torch_mask_tokens

## DataCollatorForWholeWordMask

[[autodoc]] data.data_collator.DataCollatorForWholeWordMask
    - numpy_mask_tokens
    - torch_mask_tokens

## DataCollatorForPermutationLanguageModeling

[[autodoc]] data.data_collator.DataCollatorForPermutationLanguageModeling
    - numpy_mask_tokens
    - torch_mask_tokens

## DataCollatorWithFlattening

[[autodoc]] data.data_collator.DataCollatorWithFlattening

## DataCollatorForMultipleChoice

[[autodoc]] data.data_collator.DataCollatorForMultipleChoice
