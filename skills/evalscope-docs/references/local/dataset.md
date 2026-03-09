# 支持的数据集 (Supported Datasets)

EvalScope 内置了丰富的数据集，涵盖了从通用能力到垂直领域的多种评测场景。

## 数据集加载与缓存 (Loading & Caching)

EvalScope 在执行评测时会**动态下载**所需的数据集。

*   **下载来源 (Source)**:
    *   默认主要从 **ModelScope** (魔搭社区) 下载。
    *   部分数据集支持通过 `HubType.HUGGINGFACE` 从 **Hugging Face** 下载。
    *   少数特定数据集会从指定的 URL 下载静态文件。

*   **缓存位置 (Cache Location)**:
    *   **ModelScope 数据集**: 通常存储在 `~/.cache/modelscope/hub/datasets`。
    *   **EvalScope 专用数据**: 存储在 `~/.cache/evalscope` 或环境变量 `EVALSCOPE_CACHE` 指定的目录。
    *   下次运行相同数据集时，会优先加载本地缓存，无需重复下载。

## 数据集定义 (Dataset Definition)

EvalScope 的数据集定义采用了**去中心化**的动态注册机制。

*   **定义位置**: 所有支持的数据集都定义在 `evalscope/benchmarks` 目录下的各个子目录中。
*   **目录结构**: 每个数据集有一个独立的目录 (如 `gsm8k/`, `mmlu/`)，其中包含一个 adapter 文件 (e.g., `gsm8k_adapter.py`)。
*   **注册机制**:
    *   Adapter 文件中使用 `@register_benchmark` 装饰器将 `BenchmarkMeta` 注册到系统。
    *   `BenchmarkMeta` 包含了数据集的元数据，如 `name`, `dataset_id` (ModelScope ID), `subset_list`, `metrics` 等。
*   **查看列表**: 可以通过查看 `evalscope/benchmarks` 目录下的子目录名称来获取所有支持的数据集列表。

### 多后端支持 (Backend Support)

EvalScope 支持多种评测后端，不同后端的数据集定义位置不同：

1.  **Native Backend** (默认): 使用上述的 `evalscope/benchmarks` 目录。
2.  **OpenCompass Backend**: 数据集定义来源于 OpenCompass 库，并在 `evalscope/backend/opencompass/tasks/eval_datasets.py` 中进行了适配和引用。
3.  **VLMEvalKit / RAGEval**: 各自维护其数据集定义和加载逻辑。

## 数据集概览 (Dataset Overview)

| Name (ID) | Title | Description | Subsets / Stats |
| :--- | :--- | :--- | :--- |
| **mmlu** | MMLU | 涵盖 STEM、人文等 57 个学科的通用知识评测 | 57 subjects |
| **ceval** | C-Eval | 针对中文语境的综合性学科评测基准 | 52 subjects |
| **gsm8k** | GSM8K | 高质量小学数学应用题，测试多步数学推理 | main |
| **arc** | ARC | 科学问答数据集，测试科学推理能力 | ARC-Easy, ARC-Challenge |
| **bbh** | Big Bench Hard | 挑战性逻辑推理任务集合 | 27 tasks |
| **humaneval** | HumanEval | Python 代码生成与函数补全评测 | openai_humaneval |
| **mbpp** | MBPP | 基础 Python 编程问题集合 | - |
| **cmmlu** | CMMLU | 综合性中文大模型评测基准 | 67 subjects |
| **hellaswag** | HellaSwag | 常识推理，测试对情景的后续预测 | - |
| **math** | MATH | 高难度数学竞赛题 (代数, 几何等) | 7 subjects |
| **toolbench** | ToolBench | 评估模型遵循指令和使用工具 (API) 的能力 | - |
| **general_qa** | General QA | 通用问答与知识检索能力评测 | - |

> **提示**: 使用 `evalscope/benchmarks` 目录下的子目录名作为 `datasets` 参数的值。

## 1. 通用知识与推理 (General Knowledge & Reasoning)
*   **MMLU / MMLU-Pro**: 涵盖 STEM、人文、社会科学等 57 个学科的通用知识评测。
*   **C-Eval / CMMLU**: 针对中文语境的综合性学科评测基准。
*   **BBH (Big-Bench Hard)**: 挑战性任务集合，测试模型的逻辑推理和复杂指令遵循能力。
*   **ARC (AI2 Reasoning Challenge)**: 科学问答数据集，分为 Easy 和 Challenge 两个难度级别。
*   **HellaSwag**: 常识推理数据集，测试模型对后续情景的预测能力。

## 2. 数学与逻辑 (Math & Logic)
*   **GSM8K**: 包含 8.5K 高质量小学数学应用题，测试多步数学推理能力。
*   **MATH / Math-500**: 涵盖代数、几何、微积分等高难度数学竞赛题。
*   **TheoremQA**: 是否包含定理证明类的问答。
*   **StrategyQA**: 需要多步隐式推理的策略性问答。

## 3. 代码生成 (Code Generation)
*   **HumanEval / HumanEval+**: 测试 Python 代码生成能力，包含函数补全任务。
*   **MBPP (Mostly Basic Python Problems)**: 基础 Python 编程问题集合。
*   **SWE-bench**: 基于真实 GitHub Issue 的软件工程问题，测试模型解决复杂实际编程问题的能力。
*   **LiveCodeBench**: 旨在评估代码大模型在最新编程竞赛题目上的表现，避免数据泄露问题。

## 4. 智能体与长文本 (Agent & Long Context)
*   **ToolBench**: 评估大模型调用工具 (API) 的能力。
*   **BFCL (Berkeley Function-Calling Leaderboard)**: 专门评估函数调用 (Function Calling) 能力。
*   **Needle-in-a-Haystack**: "大海捞针"测试，评估模型在长上下文 (Long Context) 中准确检索信息的能力。
*   **Tau-bench**: 动态环境下的 Agent 交互评测。

## 5. 多模态 (Multimodal)
*   **MMMU**: 大规模多学科多模态理解与推理基准，涵盖艺术、科学、工程等领域。
*   **MMBench**: 综合性多模态评测基准，包含感知和推理任务。
*   **MathVista**: 视觉数学推理基准。
*   **ChartQA / DocVQA**: 针对图表理解和文档视觉回答的专用数据集。
*   **AI2D**: 科学图表理解数据集。

## 6. RAG 与检索 (RAG & Retrieval)
通过 `RAGEval` 后端支持：
*   **MTEB**: 大规模文本嵌入基准，评估 Embedding 模型性能。
*   **CLIP Benchmark**: 评估图文检索模型的性能。
