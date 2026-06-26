CLI 3.3.0 起采用插件化架构，各云产品对应独立插件，支持即装即用而无需等待 CLI 版本更新。目前可通过CLI中心和命令行查询支持的云产品。

## 在CLI中心查询产品
[CLI中心](https://api.aliyun.com/api-tools/cli)展示所有支持的产品，支持按分类浏览和关键词搜索，可查看每个产品的API版本、命令列表、参数说明和调用示例。

## 在命令行中查询
在CLI中直接查询可用插件：

```bash
# 列出所有可用插件
aliyun plugin list-remote
# 按关键词搜索，前缀匹配
aliyun plugin search <关键词>
```

控制台输出可用插件列表：

```bash
Total plugins available: 320

Name                      Latest Version  Preview  Status         Local Version  Description
----                      --------------  -------  ------         -------------  -----------
aliyun-cli-bssopenapi     0.2.0           No       Installed      0.2.0          Aliyun CLI plugin for Alibaba Cloud Billing operations with multi-version API support.
aliyun-cli-ecs            0.2.0           No       Installed      0.1.0          Aliyun CLI plugin for Elastic Compute Service operations.
aliyun-cli-ess            0.2.0           No       Installed      0.1.0          Aliyun CLI plugin for Auto Scaling operations with multi-version API support.
aliyun-cli-fc             0.2.0           No       Installed      0.1.0          Aliyun CLI plugin for Function Compute 3.0 operations.
......
```

### 安装插件

找到目标插件后，安装对应插件：

```bash
aliyun plugin install --names <plugin-name>
```

安装完成后，通过 `aliyun <plugin-name> <sub-command>` 直接调用。关于插件的更新、卸载等管理操作，参见[快速安装云产品CLI插件](https://help.aliyun.com/document_detail/3024826.html)。

## 相关文档
* [什么是阿里云 CLI](https://help.aliyun.com/document_detail/110244.html)

* [快速安装云产品CLI插件](https://help.aliyun.com/document_detail/3024826.html)
