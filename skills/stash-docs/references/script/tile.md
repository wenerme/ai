# 面板 (Tile)

用户可以通过 JavaScript 脚本自定义 Stash 首页的 Tile 面板。

![](/stash-ip-tile.jpg)

## 配置格式

```yaml
tiles:
  - name: your-fancy-script
    interval: 600
    title: 'Awesome Tile'
    content: 'This is Super Cool'
    icon: 'theatermasks.circle.fill' # 或 https://stash.ws/amazing.png
    backgroundColor: '#663399'

script-providers:
  your-fancy-script:
    url: https://your-fancy-script.com/your-fancy-script.js
    interval: 86400
```

参数：

- `argument`: 可选，脚本执行时的参数，类型为 `string`。
- `title`: 可选，脚本第一次运行前的标题默认值。
- `content`: 可选，脚本第一次运行前的内容默认值。
- `icon`: 可选，脚本第一次运行前的图标默认值。图标支持 `SF Symbols` 或以 `http` 开头的远程图片。
- `backgroundColor`: 可选，脚本第一次运行前的背景颜色默认值。
- `url`: 可选，脚本第一次运行前的跳转 URL 。
- `collapsed`: 可选，将面板折叠进第三方服务的面板，不在首页显示。

以上部分字段可被 `$done(object)` 覆盖更新。

> [!WARNING]
> 更多关于 `SF Symbols` 详情请参考 [Apple
> Developer](https://developer.apple.com/sf-symbols/) 。

## 语法与接口

请参考 [JavaScript 脚本语法与接口](/http-engine/script#语法与接口) 。

例子

```javascript
$httpClient.get('https://api.my-ip.io/ip', function (error, response, data) {
  $done({
    title: '当前 IP 地址',
    content: data,
    backgroundColor: '#663399',
    icon: 'network',
  })
})
```

### `$done(value)`

> [!WARNING]
> 对于所有脚本，在结束时候必须调用 `$done(value)` 方法释放资源。

对于 Tile 类型的脚本，调用 `$done(object)` 可以更新 Tile 面板内容，`object` 可以包含下述字段：

- `title`: 可选，新的 Tile 标题。
- `content`: 可选，新的 Tile 内容。
- `icon`: 可选，新的 Tile 图标。
- `backgroundColor`: 可选，新的 Tile 背景颜色。
- `url`: 可选，新的跳转 URL 。

以上字段如为空则不更新。你可以直接调用 `$done({})` 不修改任何内容。

## Collapsed Tile

当 `collapsed` 设置为 `true` 时，脚本会被折叠进第三方服务的面板中。第三方服务的面板中显示的样式会与首页稍有不同，通常适用于指示当前网络环境对第三方服务的支持程度。

通过长按节点显示代理详情时，通过 `$httpClient` 发起的 HTTP 请求会通过该节点进行转发，因此可以通过 Collapsed Tile 来测试该节点对第三方服务的支持程度。
