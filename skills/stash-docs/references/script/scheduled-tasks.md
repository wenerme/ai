---
description: "Stash 可在后台执行 JavaScript 定时任务，需要 Network Extension 处于已连接状态。"
---

# 定时任务

Stash 可以在后台执行定时任务，目前仅支持执行 JavaScript 脚本，定时任务需要依赖 Network Extension（VPN） 在已连接状态。

## Script / 定时脚本

Stash 可以在后台定时执行 JavaScript 脚本，以实现自动化的任务，执行的结果可通过系统通知或记录到持久化存储。

JavaScript 脚本的语法和接口请参考 [JavaScript 脚本](/http-engine/script)。

定时脚本通过 cron 表达式指定执行时间、间隔，cron 表达式的语法请参考[这里](https://crontab.guru/)。

```yaml
cron:
  script:
    - name: your-script-name
      cron: '*/5 * * * *' # at every 5th minute
      argument: '{ "key": true }' # optional
      timeout: 10 # optional

    - name: your-script-name
      cron: '0 20 * * *' # at 20:00
      argument: '{ "key": false }' # optional
      timeout: 15 # optional

script-providers:
  your-script-name:
    url: https://example.com/your-script.js
    interval: 86400
```

> [!NOTE]
> 你可以在多个场景引用同一个脚本，并通过环境变量判断事件来源（如 HTTP
> 改写、定时任务）。
