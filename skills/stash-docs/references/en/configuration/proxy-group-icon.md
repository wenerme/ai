---
description: "Give each proxy group an icon by adding an icon field under proxy-groups in your configuration, pointing at a JPG or PNG image URL."
---

# Proxy Group Icon

To distinguish different proxy groups, you can specify an icon for each group. Add an `icon` field to the proxy group in the `proxy-groups` section of the configuration file and enter the URL of the image. JPG and PNG formats are supported.

![](/tutorial/proxy-group-icon-en.png)

```yaml {3}
- name: 'auto'
  type: url-test
  icon: https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Direct.png
  proxies:
    - ss1
    - ss2
    - vmess
  interval: 300
```
