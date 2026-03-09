# 注册机制 (Registry Mechanism)

EvalScope 使用一套去中心化的动态注册机制来管理数据集 (Benchmarks)、模型 API (Model APIs) 和 评估指标 (Metrics)。

## 核心组件 (Core Components)

注册逻辑主要定义在 `evalscope/api/registry.py` 中。

### 1. Benchmark Registry
*   **存储**: `BENCHMARK_REGISTRY` (Dict)
*   **装饰器**: `@register_benchmark`
*   **获取函数**: `get_benchmark(name, config)`

### 2. 动态加载 (Dynamic Loading)
EvalScope 在启动时会自动扫描并加载所有支持的数据集适配器。这一过程发生在 `evalscope/benchmarks/__init__.py` 中。

*   **扫描范围**: `evalscope/benchmarks` 目录下的所有 `*_adapter.py` 文件。
*   **加载方式**: 使用 `glob` 递归查找文件，并使用 `importlib.import_module` 动态导入模块。
*   **触发注册**: 导入模块时，模块内的 `@register_benchmark` 装饰器会自动执行，将对应的 `BenchmarkMeta` 和 `DataAdapter` 注册到 `BENCHMARK_REGISTRY` 中。

### 3. 数据集查找流程 (Lookup Flow)

当用户在配置中指定 `datasets=['gsm8k']` 时：

1.  **Run Task**: `evalscope/run.py` 接收配置。
2.  **Initialize Evaluator**: `run_task` 遍历数据集列表。
3.  **Get Benchmark**: 调用 `get_benchmark('gsm8k', task_config)`。
    *   该函数从 `BENCHMARK_REGISTRY` 中查找键为 `'gsm8k'` 的项。
    *   如果找到，返回对应的 `DataAdapter` 实例 (e.g., `GSM8KAdapter`)。
    *   如果未找到，抛出 `ValueError`。
4.  **Instantiate Adapter**: 使用 `task_config` 初始化适配器，开始执行评测。

## 代码示例 (Code Example)

**Registry Definition (`evalscope/api/registry.py`)**:
```python
BENCHMARK_REGISTRY = {}

def register_benchmark(metadata):
    def register_wrapper(data_adapter):
        BENCHMARK_REGISTRY[metadata.name] = metadata
        metadata.data_adapter = data_adapter
        return data_adapter
    return register_wrapper
```

**Adapter Implementation (`evalscope/benchmarks/gsm8k/gsm8k_adapter.py`)**:
```python
@register_benchmark(BenchmarkMeta(name='gsm8k', ...))
class GSM8KAdapter(DefaultDataAdapter):
    ...
```

**Auto-Discovery (`evalscope/benchmarks/__init__.py`)**:
```python
files = glob.glob(os.path.join(os.path.dirname(__file__), '*', '**', '*_adapter.py'), recursive=True)
for file_path in files:
    importlib.import_module(module_path) # Triggers @register_benchmark
```
