# URL Schema

Stash 支持使用 URL Schema `stash://` 和 `clash://` 来控制 Stash， 包含的 URL **需要 Encode 。**

### link.stash.ws
除了上述的 URL Schema 之外，Stash 还支持使用 `https://link.stash.ws` 标准 URL 来控制，格式为 `https://link.stash.ws/command/url`，包含的 URL **不含 Schema 且无需 Encode 。**

以一键安装 BoxJS 为例，

原 URL：`https://raw.githubusercontent.com/chavyleung/scripts/master/box/rewrite/boxjs.rewrite.stash.stoverride`

一键安装 URL：`https://link.stash.ws/install-override/raw.githubusercontent.com/chavyleung/scripts/master/box/rewrite/boxjs.rewrite.stash.stoverride`

> [!NOTE]
> 默认的远程 URL Schema 为 HTTPS ，如需使用 HTTP ，请加上参数 `?scheme=http`。

> [!NOTE]
> 如远程 URL 无法访问，链接将返回 `404`。

## 导入配置文件

- `stash://install-config?url=${url-encoded}`
- `clash://install-config?url=${url-encoded}`
- `https://link.stash.ws/install-config/example.com/stash.yaml`

## 导入远程覆写

- `stash://install-override?url=${url-encoded}`
- `clash://install-override?url=${url-encoded}`
- `https://link.stash.ws/install-override/example.com/stash.stoverride`

## 导入图标集

- `stash://install-icon-set?url=${url-encoded}`
- `clash://install-icon-set?url=${url-encoded}`
- `https://link.stash.ws/install-icon-set/example.com/stash.json`

## 开关 Stash

### 开启 Stash
- `stash://start`
- `clash://start`
- `https://link.stash.ws/start`

### 关闭 Stash
- `stash://stop`
- `clash://stop`
- `https://link.stash.ws/stop`

### 切换开关
- `stash://toggle`
- `clash://toggle`
- `https://link.stash.ws/toggle`
