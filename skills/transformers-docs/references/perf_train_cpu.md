

# CPU

A modern CPU is capable of efficiently training large models by leveraging the underlying optimizations built into the hardware and training on fp16 or bf16 data types.

This guide focuses on how to train large models on an Intel CPU using mixed precision. AMP is enabled for CPU backends training with PyTorch.

[`Trainer`] supports AMP training with CPU by adding the `--use_cpu`, and `--bf16` parameters. The example below demonstrates the [run_qa.py](https://github.com/huggingface/transformers/tree/main/examples/pytorch/question-answering) script.

```bash
python run_qa.py \
 --model_name_or_path google-bert/bert-base-uncased \
 --dataset_name squad \
 --do_train \
 --do_eval \
 --per_device_train_batch_size 12 \
 --learning_rate 3e-5 \
 --num_train_epochs 2 \
 --max_seq_length 384 \
 --doc_stride 128 \
 --output_dir /tmp/debug_squad/ \
 --bf16 \
 --use_cpu
```

These parameters can also be added to [`TrainingArguments`] as shown below.

```py
training_args = TrainingArguments(
    output_dir="./outputs",
    bf16=True,
    use_cpu=True,
)
```

## Resources

Learn more about training on Intel CPUs in the [Accelerating PyTorch Transformers with Intel Sapphire Rapids](https://huggingface.co/blog/intel-sapphire-rapids) blog post.
