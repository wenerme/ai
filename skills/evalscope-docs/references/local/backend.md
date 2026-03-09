# 评测后端 (Evaluation Backends)

EvalScope 采用模块化设计，支持多种评测后端 (Backend) 以适应不同的评测场景。

## 后端列表 (Backend List)

EvalScope 目前支持以下几种后端：

### 1. **Native Backend (默认)**
*   **标识**: `EvalBackend.NATIVE` ('Native')
*   **描述**: EvalScope 原生实现的评测后端，也是默认后端。
*   **特点**:
    *   **轻量级**: 代码结构简单，易于理解和调试。
    *   **深度集成**: 与 ModelScope 生态（模型、数据集）结合紧密。
    *   **扩展性**: 支持自定义 Dataset Adapter 实现新的评测集。
*   **适用场景**: 通用的大语言模型评测，特别是当你使用 ModelScope 数据集或需要快速验证模型效果时。
*   **数据集定义**: 位于 `evalscope/benchmarks/` 目录。

### 2. **OpenCompass Backend**
*   **标识**: `EvalBackend.OPEN_COMPASS` ('OpenCompass')
*   **描述**: 利用 OpenCompass 强大的评测能力作为后端。
*   **特点**:
    *   **生态丰富**: 复用了 OpenCompass 支持的大量数据集和评测方法。
    *   **专业性**: 提供了更复杂的评测策略和能够支持更广泛的社区模型。
*   **使用方式**: 需指定 `--eval-backend OpenCompass`。
*   **数据集定义**: 位于 `evalscope/backend/opencompass/tasks/eval_datasets.py`。

### 3. **VLMEvalKit Backend**
*   **标识**: `EvalBackend.VLM_EVAL_KIT` ('VLMEvalKit')
*   **描述**: 专为**多模态大模型 (LMMs)** 设计的评测后端。
*   **特点**:
    *   支持图像理解、视觉问答等视觉与语言结合的任务。
    *   集成 VLMEvalKit 的核心能力。
*   **适用场景**: 评测图文多模态模型 (如 Qwen-VL, Yi-VL 等)。

### 4. **RAGEval Backend**
*   **标识**: `EvalBackend.RAGE_EVAL` ('RAGEval')
*   **描述**: 专注于 **RAG (Retrieval-Augmented Generation)** 检索增强生成系统的评测。
*   **特点**:
    *   支持 MTEB (Massive Text Embedding Benchmark) 和 CLIP Benchmark。
    *   针对 Embedding 模型和 RAG 链路进行评估。
*   **适用场景**: 评测 Embedding 模型、检索器效率及生成质量。

### 5. **ThirdParty Backend**
*   **标识**: `EvalBackend.THIRD_PARTY` ('ThirdParty')
*   **描述**: 允许集成其他第三方评测工具。

## 如何选择后端 (How to Choose)

| 场景 | 推荐后端 | 命令参数 |
| :--- | :--- | :--- |
| **通用 LLM 评测** (GSM8K, MMLU, CMMLU) | **Native** (推荐) | 默认 (无需指定) |
| **使用 OpenCompass 特有数据集** | **OpenCompass** | `--eval-backend OpenCompass` |
| **多模态模型评测** (图文理解) | **VLMEvalKit** | `--eval-backend VLMEvalKit` |
| **Embedding / RAG 系统评测** | **RAGEval** | `--eval-backend RAGEval` |

## 配置示例

在 Python 脚本中指定后端：
```python
from evalscope.constants import EvalBackend
from evalscope.config import TaskConfig

task_cfg = TaskConfig(
    model='qwen/Qwen-7B-Chat',
    datasets=['gsm8k'],
    eval_backend=EvalBackend.NATIVE, # 显式指定，或者省略
    # eval_backend=EvalBackend.OPEN_COMPASS, # 切换后端
)
```

在 CLI 中指定后端：
```bash
evalscope eval --model qwen/Qwen-7B-Chat --datasets gsm8k --eval-backend OpenCompass
```
