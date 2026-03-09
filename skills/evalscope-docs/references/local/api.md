# EvalScope API 参考 (API Reference)

## 1. 数据结构 (Data Structures)

### 1.1 任务配置 (`TaskConfig`)
位于 `evalscope/evalscope/config.py`，是贯穿整个评测流程的核心配置对象。
主要字段包括：
*   `model` / `model_id`: 模型标示或对象。
*   `datasets`: 待评测的数据集列表。
*   `dataset_args`: 数据集特定参数，例如 `{'gsm8k': {'subset_list': ['main'], 'few_shot_num': 0}}`。
    *   `subset_list`: 指定评测的子集列表 (e.g., `['human_test', 'augmented_test']`)，若不指定则使用默认所有子集。
    *   `few_shot_num`: 指定 few-shot 的数量。
*   `model_args`: 模型初始化参数，根据后端不同支持不同字段：
    *   **Native / ModelScope**:
        *   `model_path`: (Optional) 指定模型权重路径，覆盖 `model` 字段。
        *   `precision`: (Optional) 模型精度，如 `torch.float16`, `float16`, `bfloat16`, `auto`。
        *   `device_map`: (Optional) 设备分配策略，如 `auto`, `cuda:0`。
        *   `tokenizer_path`: (Optional) 指定 tokenizer 路径。
        *   `chat_template`: (Optional) 自定义 chat template 字符串。
        *   `tokenizer_call_args`: (Optional) 传递给 tokenizer 的额外参数 (Dict)。
        *   `enable_thinking`: (Optional) 是否启用思考模式 (Boolean)。
        *   **Other**: 其他所有参数将直接传递给 `AutoModelForCausalLM.from_pretrained` (e.g., `trust_remote_code=True`, `revision='master'`)。
    *   **OpenAI Compatible**:
        *   所有参数将直接传递给 `openai.OpenAI` 客户端构造函数 (e.g., `timeout=30`, `max_retries=2`)。
*   `generation_config`: 生成参数 (如 `max_tokens`, `temperature`)。
*   `eval_backend`: 后端类型 (`Native`, `OpenCompass`, etc.)。
*   `eval_type`: 评估类型 (`Checkpoint`, `Service`, `Mock`)。
*   `limit`: 评估样本数量限制。
*   `work_dir`: 结果输出目录。

### 1.2 评测基准元数据 (`BenchmarkMeta`)
位于 `evalscope/evalscope/api/benchmark/meta.py`，用于描述一个评测基准的属性。
通常包含：
*   `name`: 基准名称。
*   `domain`: 领域。
*   `metric`: 使用的指标。
*   `data_adapter`: 对应的数据适配器类。

## 2. 接口说明 (Interfaces)

EvalScope 提供了基于注册表 (Registry) 的扩展机制，允许用户自定义核心组件。
注册表定义在 `evalscope/evalscope/api/registry.py`。

### 2.1 Registry 系统
*   `BENCHMARK_REGISTRY`: 管理评测基准 (`register_benchmark`)。
*   `MODEL_APIS`: 管理模型 API 接口 (`register_model_api`)。
*   `METRIC_REGISTRY`: 管理评估指标 (`register_metric`)。
*   `FILTER_REGISTRY`: 管理数据过滤器 (`register_filter`)。

### 2.2 核心接口
*   **Model**:
    *   定义模型加载和推理行为。
    *   `LazyModel` (`evalscope/evalscope/api/model/lazy_model.py`) 实现按需加载。
*   **Evaluator**:
    *   `DefaultEvaluator` (`evalscope/evaluator/default_evaluator.py`)：执行评测循环，调用 Model 对 Benchmark 数据进行推理，并计算 Metric。
*   **BackendManager**:
    *   `OpenCompassBackendManager`, `VLMEvalKitBackendManager`, `RAGEvalBackendManager` 等，用于适配第三方框架的配置和执行方式。

## 3. 服务化部署 (Service Deployment)

EvalScope 支持作为 HTTP 服务启动，允许用户通过 REST API 动态提交评测任务和性能压测任务。

### 3.1 启动服务
使用 `evalscope service` 命令启动服务：

```bash
evalscope service --host 0.0.0.0 --port 9000
```

### 3.2 API 接口
服务启动后提供以下核心接口：

*   **`POST /api/v1/eval`**: 提交模型评测任务
    *   **调用方式**: **同步调用 (Synchronous)**。接口会阻塞直到评测完成，并直接在响应中返回评测结果。目前**不支持**异步提交后轮询查询。
    *   **Body 参数 (详细)**:
        *   `model` (Required, str): 模型名称或路径。
        *   `datasets` (Required, List[str]): 评测数据集列表 (如 `['gsm8k', 'arc']`)。
        *   `api_url` (Optional, str): OpenAI API 格式的接口地址 (如 `http://127.0.0.1:8000/v1`)。
        *   `api_key` (Optional, str): API Key (默认 `EMPTY`)。
        *   `limit` (Optional, int/float): 限制评测样本数 (整数为条数，浮点数为比例)。
        *   `generation_config` (Optional, Dict): 生成参数，支持 `temperature`, `max_tokens`, `top_p`, `top_k`, `stream`, `timeout` 等。
        *   `model_args` (Optional, Dict): 模型初始化参数 (如 `revision`, `precision`)。
        *   `dataset_args` (Optional, Dict): 数据集加载参数。
        *   `eval_batch_size` (Optional, int): 评测批处理大小 (默认 1)。
        *   `work_dir` (Optional, str): 结果输出根目录 (默认 `./outputs`)。
            *   **默认行为**: 自动在 `work_dir` 下创建带时间戳的子目录 (e.g., `./outputs/20251213_153000`)。
        *   `no_timestamp` (Optional, bool): 控制是否生成时间戳子目录。
            *   **默认 False**: 生成时间戳子目录。
            *   **设为 True**: 结果直接输出到 `work_dir` 指定的目录，不创建子目录。
        *   `use_cache` (Optional, str): **指定具体的输出目录路径**。
            *   **作用**: 一旦设置此参数，`work_dir` 参数将被忽略，评测结果直接输出到 `use_cache` 指定的绝对或相对路径中。
            *   **用途**:
                1.  **断点续评**: 如果目录中存在之前的评测中间结果，程序会尝试读取并继续评测。
                2.  **强制指定目录**: 如果你只想指定输出目录而不关心续评，且该目录为空，也可以使用此参数来精确控制输出路径。
        *   `debug` (Optional, bool): 是否开启调试模式。
        *   `seed` (Optional, int): 随机种子 (默认 42)。
        *   `analysis_report` (Optional, bool): 是否开启 LLM 对评测结果的智能分析 (默认 False)。
        *   `judge_model_args` (Optional, Dict): 用于生成分析报告的 judge 模型配置 (需与 `analysis_report=True` 配合使用)。
            *   示例: `{'model': 'qwen-plus', 'api_url': '...', 'api_key': '...'}`。
    *   **响应结构 (Response Structure)**:
        所有数据集的返回结构**保持一致**，均遵循 `Report` 对象的 Schema。
        *   外层 `result` 字典以数据集名称为 Key (e.g., `gsm8k`, `arc`)。
        *   Value 为该数据集的详细评测报告，包含 `metrics` (指标列表)、`categories` (分类表现)、`subsets` (子集表现)。

        **完整响应示例**:
        ```json
        {
            "status": "success",
            "message": "Evaluation completed",
            "output_dir": "/path/to/work_dir/timestamp",
            "result": {
                "gsm8k": {
                    "name": "gsm8k_report",
                    "dataset_name": "gsm8k",
                    "model_name": "Qwen/Qwen2.5-0.5B-Instruct",
                    "score": 0.35,  // 该数据集的主指标得分
                    "metrics": [
                        {
                            "name": "AverageAccuracy",
                            "score": 0.35,
                            "num": 10,
                            "categories": [
                                {
                                    "name": ["default"],
                                    "score": 0.35,
                                    "num": 10,
                                    "subsets": [
                                        {
                                            "name": "main",
                                            "score": 0.35,
                                            "num": 10
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "analysis": "N/A" // 如果开启 analysis_report 则会有分析文本
                }
            }
        }
        ```

    *   **关于请求中断 (Interruption)**:
        *   由于接口是**同步阻塞**的，如果客户端在评测完成前断开连接（如超时或主动取消）：
            1.  **服务端任务不会停止**：评测任务会继续在服务端运行直到完成。
            2.  **结果丢失**：任务完成后，由于连接已断开，服务端无法将结果返回给客户端。
            3.  **结果找回**：你可以通过 `output_dir` (在启动日志或之前的成功响应中推测) 在服务端的文件系统中找到生成的报告文件 (`report.json`)，但无法通过 API 再次获取。
        *   **建议**: 对于耗时较长的评测任务，请确保客户端设置足够长的 `timeout`，或使用 `nohup` / `screen` 在服务端本地运行 CLI 命令，而非依赖 HTTP 接口。

*   **`POST /api/v1/perf`**: 提交性能压测任务
    *   **Body**: JSON 格式，字段与 `PerfArguments` 一致。
    *   **示例**:
        ```bash
        curl -X POST http://localhost:9000/api/v1/perf \
          -H "Content-Type: application/json" \
          -d '{
            "model": "qwen-plus",
            "url": "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
            "api_key": "your-api-key",
            "number": 10,
            "parallel": 2
          }'
        ```

*   **`GET /api/v1/eval/params`**: 获取评测参数说明
*   **`GET /api/v1/perf/params`**: 获取压测参数说明
*   **`GET /health`**: 健康检查
