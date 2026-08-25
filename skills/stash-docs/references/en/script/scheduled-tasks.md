---
description: "Stash runs JavaScript scheduled tasks in the background, which require the Network Extension to be connected."
---

# Scheduled Tasks

Stash can execute scheduled tasks in the background, currently only supporting JavaScript scripts. Scheduled tasks require Network Extension (VPN) to be connected.

## Script / Scheduled Script

Stash can execute JavaScript scripts in the background on a schedule to automate tasks. The results of the execution can be notified through system notifications or recorded in persistent storage.

Please refer to [JavaScript Scripts](/http-engine/script) for the syntax and interface of JavaScript scripts.

The execution time and interval of scheduled scripts are specified by cron expressions. Please refer to [here](https://crontab.guru/) for the syntax of cron expressions.

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
> You can reference the same script in multiple scenarios and determine the
> event source (such as HTTP rewriting or scheduled tasks) through environment
> variables.
