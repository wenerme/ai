# 策略组图标

为了区分不同的策略组，您可以为每个策略组指定一个图标。在配置文件的 `proxy-groups` 章节中，为策略组添加 `icon` 字段，并输入图片的 URL，支持 JPG 和 PNG 格式的图片。

![](/tutorial/proxy-group-icon-zh.png)

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
