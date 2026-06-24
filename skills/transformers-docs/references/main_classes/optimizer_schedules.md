

# Optimization

The `.optimization` module provides:

- an optimizer with weight decay fixed that can be used to fine-tuned models, and
- several schedules in the form of schedule objects that inherit from `_LRSchedule`:
- a gradient accumulation class to accumulate the gradients of multiple batches

## AdaFactor

[[autodoc]] Adafactor

## Schedules

### SchedulerType

[[autodoc]] SchedulerType

### get_scheduler

[[autodoc]] get_scheduler

### get_constant_schedule

[[autodoc]] get_constant_schedule

### get_constant_schedule_with_warmup

[[autodoc]] get_constant_schedule_with_warmup

### get_cosine_schedule_with_warmup

[[autodoc]] get_cosine_schedule_with_warmup

### get_cosine_with_hard_restarts_schedule_with_warmup

[[autodoc]] get_cosine_with_hard_restarts_schedule_with_warmup

### get_cosine_with_min_lr_schedule_with_warmup

[[autodoc]] get_cosine_with_min_lr_schedule_with_warmup

### get_cosine_with_min_lr_schedule_with_warmup_lr_rate

[[autodoc]] get_cosine_with_min_lr_schedule_with_warmup_lr_rate

### GreedyLR

[[autodoc]] GreedyLR

### get_greedy_schedule

[[autodoc]] get_greedy_schedule

### get_linear_schedule_with_warmup

[[autodoc]] get_linear_schedule_with_warmup

### get_polynomial_decay_schedule_with_warmup

[[autodoc]] get_polynomial_decay_schedule_with_warmup

### get_inverse_sqrt_schedule

[[autodoc]] get_inverse_sqrt_schedule

### get_reduce_on_plateau_schedule

[[autodoc]] get_reduce_on_plateau_schedule

### get_wsd_schedule

[[autodoc]] get_wsd_schedule
