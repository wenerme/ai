# 可视化工具 (Visualization App)

EvalScope 提供了一个基于 Gradio 的可视化 WebUI，用于展示评测报告、对比模型表现以及进行深入分析。

## 1. 启动方式 (Launch)

### 1.1 命令行启动
使用 `evalscope app` 命令启动可视化服务。

```bash
# 默认启动 (监听 0.0.0.0:7860，读取 ./outputs 目录)
evalscope app

# 指定参数启动
evalscope app --server-port 8080 --outputs /path/to/results --lang zh
```

### 1.2 CLI 参数说明
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `--server-name` | str | `0.0.0.0` | 服务器监听地址 |
| `--server-port` | int | `None` (7860) | 服务器监听端口 |
| `--share` | bool | `False` | 是否创建 Gradio 公开分享链接 |
| `--debug` | bool | `False` | 是否开启调试模式 |
| `--lang` | str | `zh` | 界面语言 (`zh` / `en`) |
| `--outputs` | str | `./outputs` | 评测结果目录，应用会自动扫描该目录下的报告 |
| `--allowed-paths` | list | `['/']` | 允许访问的系统路径 |

## 2. 功能特性 (Features)

应用界面主要包含侧边栏 (Sidebar) 和主功能区，支持以下核心功能：

### 2.1 报告管理 (Report Management)
*   **自动扫描**: 启动时自动扫描 `--outputs` 目录下的评测结果文件夹。
*   **多选加载**: 支持同时选择加载多个评测报告进行对比。
*   **URL 参数加载 (高级)**: 支持通过 URL 参数 `?reports=folder1;folder2` 预加载指定的报告文件夹 (支持前缀匹配)。

### 2.2 单模型分析 (Single Model Analysis)
*   **报告展示**: 针对单个评测任务，展示详细的得分、指标统计。
*   **分类透视**: 查看模型在不同类别 (Categories) 和子集 (Subsets) 上的具体表现。
*   **配置查看**: 展示任务的配置参数 (Model Args, Generation Config 等)。

### 2.3 多模型对比 (Multi-Model Comparison)
*   **雷达图可视化**: 在同一张雷达图上展示多个模型在不同维度 (如 MMLU 各学科) 的得分对比。
*   **柱状图/表格**: 直观对比不同模型的总体得分和细项得分。
*   **Leaderboard 生成**: 根据加载的报告自动生成排行榜。

## 3. 界面预览 (UI Preview)

*(注：实际界面为响应式 Web 布局)*

*   **侧边栏**: 用于选择需要加载的评测报告。
*   **Single Model Tab**: 下拉选择已加载的某个报告，查看详情。
*   **Multi Model Tab**: 自动聚合所有已加载的报告，提供对比视图。

## 4. 相关代码文件 (Implementation Files)

*   `evalscope/app/app.py`: 应用主入口，负责环境设置和启动 Gradio 服务。
*   `evalscope/app/ui/app_ui.py`: 主 UI 布局定义，构建 Sidebar 和 Visualization 组件。
*   `evalscope/app/arguments.py`: CLI 参数定义 (`--server-port`, `--share` 等)。
*   `evalscope/cli/start_app.py`: `evalscope app` 命令行入口逻辑。
