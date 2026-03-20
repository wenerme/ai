

# TRL

[TRL](https://huggingface.co/docs/trl/index) is a post-training framework for foundation models. It includes methods like SFT, GRPO, and DPO. Each method has a dedicated trainer that builds on the [`Trainer`] class and scales from a single GPU to multi-node clusters.

```py
from datasets import load_dataset
from trl import GRPOTrainer
from trl.rewards import accuracy_reward

dataset = load_dataset("trl-lib/DeepMath-103K", split="train")

trainer = GRPOTrainer(
    model="Qwen/Qwen2-0.5B-Instruct",
    reward_funcs=accuracy_reward,
    train_dataset=dataset,
)
trainer.train()
```

## Transformers integration

TRL extends Transformers APIs and adds method-specific settings.

- TRL trainers build on [`Trainer`]. Method-specific trainers like [`~trl.GRPOTrainer`] add generation, reward scoring, and loss computation. Config classes extend [`TrainingArguments`] with method-specific fields.

- Model loading uses [`AutoConfig.from_pretrained`], then instantiates the model class from the config with that class' `from_pretrained`.

## Resources

- [TRL](https://huggingface.co/docs/trl/index) docs
- [Fine Tuning with TRL](https://huggingface.co/datasets/trl-lib/documentation-images/resolve/main/Fine%20tuning%20with%20TRL%20(Oct%2025).pdf) talk