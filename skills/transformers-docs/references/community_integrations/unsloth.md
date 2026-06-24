

# Unsloth

[Unsloth](https://unsloth.ai/docs) is a fine-tuning and reinforcement framework that speeds up training and reduces memory usage for large language models. It supports training in 4-bit, 8-bit, and 16-bit precision with custom RoPE and Triton kernels. Unsloth works with Llama, Mistral, Gemma, Qwen, and other model families.

```py
from datasets import load_dataset
from transformers import TrainingArguments
from unsloth import FastLanguageModel
from unsloth.trainer import UnslothTrainer

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Llama-3.2-1B-Instruct",
    max_seq_length=2048,
    load_in_4bit=True,
)

model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    lora_alpha=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
)

dataset = load_dataset("trl-lib/Capybara", split="train[:500]")
dataset = dataset.map(lambda x: {"text": x["conversations"][0]["value"]})

trainer = UnslothTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=2048,
    args=TrainingArguments(
        output_dir="outputs",
        per_device_train_batch_size=2,
        num_train_epochs=1,
    ),
)

trainer.train()
```

## Transformers integration

Unsloth wraps Transformers APIs and patches internal methods for speed.

- `FastLanguageModel.from_pretrained` loads config with [`AutoConfig.from_pretrained`]. It then loads a base model with [`AutoModelForCausalLM.from_pretrained`]. Before loading, Unsloth patches attention, decoder layer, and rotary embedding classes inside a Transformers model.

- `UnslothTrainer` extends TRL's [`~trl.SFTTrainer`]. Unsloth patches [`~Trainer.compute_loss`] and [`~Trainer.training_step`] to fix gradient accumulation in older Transformers versions.

## Resources

- [Unsloth](https://unsloth.ai/docs) docs
- [Make LLM Fine-tuning 2x faster with Unsloth and TRL](https://huggingface.co/blog/unsloth-trl) blog post