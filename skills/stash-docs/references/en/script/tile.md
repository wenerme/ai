---
description: "Customise the Tile panel on the Stash home screen with JavaScript to surface the information you care about."
---

# Panel (Tile)

Users can customize the Stash homepage Tile panel through JavaScript scripts.

![](/stash-ip-tile.jpg)

## Configuration Format

```yaml
tiles:
  - name: your-fancy-script
    interval: 600
    title: 'Awesome Tile'
    content: 'This is Super Cool'
    icon: 'theatermasks.circle.fill' # or https://stash.ws/amazing.png
    backgroundColor: '#663399'

script-providers:
  your-fancy-script:
    url: https://your-fancy-script.com/your-fancy-script.js
    interval: 86400
```

Parameters:

- `argument`: Optional, the parameter for script execution, of type `string`.
- `title`: Optional, default title before the script runs for the first time.
- `content`: Optional, default content before the script runs for the first time.
- `icon`: Optional, default icon before the script runs for the first time. The icon supports `SF Symbols` or a remote image starting with `http`.
- `backgroundColor`: Optional, default background color before the script runs for the first time.
- `url`: Optional, default redirect URL before the script runs for the first time.
- `collapsed`: Optional, collapses the panel into a third-party service panel, not shown on the homepage.

The above fields can be overridden and updated by `$done(object)`.

> [!WARNING]
> For more details on `SF Symbols`, please refer to [Apple
> Developer](https://developer.apple.com/sf-symbols/).

## Syntax and Interface

Please refer to [JavaScript Script Syntax and Interface](/http-engine/script#syntax-and-interface).

Example

```javascript
$httpClient.get('https://api.my-ip.io/ip', function (error, response, data) {
  $done({
    title: 'Current IP Address',
    content: data,
    backgroundColor: '#663399',
    icon: 'network',
  })
})
```

### `$done(value)`

> [!WARNING]
> For all scripts, the method `$done(value)` must be called at the end to
> release resources.

For Tile type scripts, calling `$done(object)` can update the Tile panel content. `object` can include the following fields:

- `title`: Optional, new Tile title.
- `content`: Optional, new Tile content.
- `icon`: Optional, new Tile icon.
- `backgroundColor`: Optional, new Tile background color.
- `url`: Optional, new redirect URL.

If these fields are empty, they will not be updated. You can directly call `$done({})` to not modify any content.

## Collapsed Tile

When `collapsed` is set to `true`, the script will be collapsed into a third-party service's panel. The display style in the third-party service's panel will differ slightly from the homepage, usually indicating the current network environment's support for third-party services.

When long-pressing a node to display proxy details, HTTP requests initiated through `$httpClient` will be forwarded through that node. Thus, you can use a Collapsed Tile to test a node’s support for third-party services.
