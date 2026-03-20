

# Trainer

[`Trainer`] is a complete training and evaluation loop for Transformers models. You only need a model and dataset to get started.

<Youtube id="nvBXf7s7vTI"/>

Underneath, [`Trainer`] handles batching, shuffling, and padding your dataset into tensors. The training loop runs the forward pass, calculates loss, backpropagates gradients, and updates weights. Configure the training run with [`TrainingArguments`] to customize everything from batch size and training duration to distributed strategies, compilation, and more.

## Next steps

- Start with the [fine-tuning](./training) tutorial for an introduction to training a large language model with [`Trainer`].
- Check the [Subclassing Trainer methods](./trainer_customize) guide for examples of how to subclass [`Trainer`] methods.
- See the [Data collators](./data_collators) guide to learn how to create a data collator for custom batch assembly.
- See the [Callbacks](./trainer_callbacks) guide to learn how to hook into training events.
