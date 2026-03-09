# EvalScope 项目概览

## 1. 项目概览 (Project Overview)

**EvalScope** 是一个由魔搭社区（ModelScope）推出的大模型评测框架，旨在为开发者提供一站式的评测解决方案。

*   **核心目标**: 评估大模型（LLM）及多模态模型（VLM）的能力。
*   **主要特性**:
    *   **多后端支持**: 除了原生 Native 后端，还集成 OpenCompass, VLMEvalKit, RAGEval 等第三方框架。
    *   **全面基准**: 内置 MMLU, GSM8K, C-Eval 等主流评测基准。
    *   **多评估模式**: 支持离线 Checkpoint 评估、在线 Service API 评估 (OpenAI API 格式)、竞技场模式 (Arena)。
    *   **性能压测**: 提供模型推理服务的性能压力测试工具。
    *   **可视化**: 提供 WebUI 用于报告展示和模型对比。

> 详情参考:
> 
*   [API Documentation (`api.local.md`)](api.local.md): API 接口 (Eval, Perf) 及参数说明。
*   [Dataset Documentation (`dataset.local.md`)](dataset.local.md): 数据集列表、加载机制及缓存说明。
*   [Registry Documentation (`registry.local.md`)](registry.local.md): 内部注册机制与动态加载流程详解。
*   [Backend Documentation (`backend.local.md`)](backend.local.md): 支持的评测后端介绍及选择指南。
*   [App Documentation (`app.local.md`)](app.local.md): 可视化 App 使用说明。

## 2. 核心架构 (Core Architecture)

EvalScope 采用模块化设计，主要包含以下层次：

*   **API Layer (`evalscope/api`)**: v1.0 重构引入的新 API 层，定义了标准化的接口和数据模型。
*   **Run Layer (`evalscope/run.py` & `evalscope/config.py`)**: 负责任务配置解析、环境初始化和任务调度。
*   **Backend Layer (`evalscope/backend`)**: 适配不同的评测后端，统一调度执行接口。
*   **Component Layer**:
    *   `benchmarks`: 数据集和基准定义。
    *   `metrics`: 评估指标实现。
    *   `models`: 模型加载与推理封装。
    *   `evaluator`: 评测执行器，连接 Model 和 Benchmark。

> 详情参考 [API 接口文档](./api.local.md)

## 3. 使用方式 (Usage)

EvalScope 支持命令行 (CLI) 和 Python SDK 两种使用方式。

### 3.1 命令行 (CLI)
通过 `evalscope` 命令入口。

*   **基本评测**:
    ```bash
    evalscope eval --model Qwen/Qwen2.5-0.5B-Instruct --datasets gsm8k --limit 10
    ```
*   **评测在线 API (如 vLLM)**:
    ```bash
    evalscope eval \
     --model qwen2.5 \
     --eval-type openai_api \
     --api-url http://127.0.0.1:8801/v1 \
     --datasets gsm8k
    ```
*   **性能压测**:
    ```bash
    evalscope perf --model Qwen/Qwen2.5-0.5B-Instruct --url http://127.0.0.1:8801/v1
    ```

> 更多关于服务化部署和 API 调用的信息，请参考 [API 接口文档 - 服务化部署](./api.local.md#3-服务化部署-service-deployment)。

### 3.2 Python SDK
使用 `TaskConfig` 和 `run_task` 接口。

```python
from evalscope import run_task, TaskConfig

# 1. 配置任务
task_cfg = TaskConfig(
    model='Qwen/Qwen2.5-0.5B-Instruct',
    datasets=['gsm8k', 'arc'],
    limit=5,
    # 可选: 自定义生成参数
    generation_config={'max_tokens': 1024, 'temperature': 0.7}
)

# 2. 运行评测
run_task(task_cfg)
```

## 4. 支持的数据集

EvalScope 支持涵盖通用知识、数学逻辑、编程代码、智能体能力等多个领域的数据集。

> 完整数据集列表请参考 [数据集列表文档](./dataset.local.md)。

## 5. 项目代码结构

```
evalscope/
├── api/                # 核心 API 定义 (Registry, Model, Benchmark 等)
├── arguments.py         # CLI 参数解析定义
├── backend/            # 第三方后端适配 (opencompass, rageval, vlmeval)
├── benchmarks/         # 内置评测基准实现
├── cli/                # 命令行入口逻辑
├── config.py           # TaskConfig 定义
├── constants.py        # 常量定义
├── evaluator/          # 评测执行器实现
├── metrics/            # 评估指标实现
├── models/             # 模型封装
├── perf/               # 性能压测工具
├── report/             # 报告生成工具
├── run.py              # 任务运行入口 (run_task)
├── third_party/        # 第三方工具集成
└── viz/                # 可视化 WebUI
```
