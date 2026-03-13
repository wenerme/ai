---
date: "2017-04-15T14:56:00+02:00"
slug: "customizing-gitea"
sidebar_position: 100
aliases:
  - /en-us/customizing-gitea
---

# Customizing Gitea

Customizing Gitea is typically done using the `CustomPath` folder - by default this is
the `custom` folder from the working directory (WorkPath), but may be different if your [installation](../installation/from-binary.md) has
set this differently. This is the central place to override configuration settings,
templates, etc. You can check the `CustomPath` using `gitea help`. You can also find
the path on the _Configuration_ tab in the _Site Administration_ page. You can override
the `CustomPath` by setting either the `GITEA_CUSTOM` environment variable or by
using the `--custom-path` option on the `gitea` binary. (The option will override the
environment variable.)

If Gitea is deployed from binary, all default paths will be relative to the Gitea
binary. If installed from a distribution, these paths will likely be modified to
the Linux Filesystem Standard. Gitea will attempt to create required folders, including
`custom/`. Distributions may provide a symlink for `custom` using `/etc/gitea/`.

Application settings can be found in file `CustomConf` which is by default,
`$GITEA_CUSTOM/conf/app.ini` but may be different if your [installation](../installation/from-binary.md) has set this differently.
Again `gitea help` will allow you review this variable and you can override it using the
`--config` option on the `gitea` binary.

- [Quick Cheat Sheet](../administration/config-cheat-sheet.md)
- [Complete List](https://github.com/go-gitea/gitea/blob/main/custom/conf/app.example.ini)

If the `CustomPath` folder can't be found despite checking `gitea help`, check the `GITEA_CUSTOM`
environment variable; this can be used to override the default path to something else.
`GITEA_CUSTOM` might, for example, be set by an init script. You can check whether the value
is set under the "Configuration" tab on the site administration page.

- [List of Environment Variables](../administration/environment-variables.md)

:::note
Gitea must perform a full restart to see configuration changes.
:::

## Serving custom public files

To make Gitea serve custom public files (like pages and images), use the folder
`$GITEA_CUSTOM/public/` as the webroot. Symbolic links will be followed.
At the moment, only the following files are served:

- `public/robots.txt`
- files in the `public/.well-known/` folder
- files in the `public/assets/` folder

For example, a file `image.png` stored in `$GITEA_CUSTOM/public/assets/`, can be accessed with
the url `http://gitea.domain.tld/assets/image.png`.

## Changing the logo

To build a custom logo and/or favicon clone the Gitea source repository, replace `assets/logo.svg` and/or `assets/favicon.svg` and run
`make generate-images`. `assets/favicon.svg` is used for the favicon only. This will update below output files which you can then place in `$GITEA_CUSTOM/public/assets/img` on your server:

- `public/assets/img/logo.svg` - Used for site icon, app icon
- `public/assets/img/logo.png` - Used for Open Graph
- `public/assets/img/avatar_default.png` - Used as the default avatar image
- `public/assets/img/apple-touch-icon.png` - Used on iOS devices for bookmarks
- `public/assets/img/favicon.svg` - Used for favicon
- `public/assets/img/favicon.png` - Used as fallback for browsers that don't support SVG favicons

In case the source image is not in vector format, you can attempt to convert a raster image using tools like [this](https://www.aconvert.com/image/png-to-svg/).

## Customizing Gitea pages and resources

Gitea's executable contains all the resources required to run: templates, images, style-sheets
and translations. Any of them can be overridden by placing a replacement in a matching path
inside the `custom` directory. For example, to replace the default `.gitignore` provided
for C++ repositories, we want to replace `options/gitignore/C++`. To do this, a replacement
must be placed in `$GITEA_CUSTOM/options/gitignore/C++` (see about the location of the `CustomPath`
directory at the top of this document).

Every single page of Gitea can be changed. Dynamic content is generated using [go templates](https://pkg.go.dev/html/template),
which can be modified by placing replacements below the `$GITEA_CUSTOM/templates` directory.

To obtain any embedded file (including templates), the [`gitea embedded` tool](../administration/cmd-embedded.md) can be used. Alternatively, they can be found in the [`templates`](https://github.com/go-gitea/gitea/tree/main/templates) directory of Gitea source (Note: the example link is from the `main` branch. Make sure to use templates compatible with the release you are using).

Be aware that any statement contained inside `{{` and `}}` are Gitea's template syntax and
shouldn't be touched without fully understanding these components.

### Customizing startpage / homepage

Copy [`home.tmpl`](https://github.com/go-gitea/gitea/blob/main/templates/home.tmpl) for your version of Gitea from `templates` to `$GITEA_CUSTOM/templates`.
Edit as you wish.
Dont forget to restart your Gitea to apply the changes.

### Adding links and tabs

If all you want is to add extra links to the top navigation bar or footer, or extra tabs to the repository view, you can put them in `extra_links.tmpl` (links added to the navbar), `extra_links_footer.tmpl` (links added to the left side of footer), and `extra_tabs.tmpl` inside your `$GITEA_CUSTOM/templates/custom/` directory.

For instance, let's say you are in Germany and must add the famously legally-required "Impressum"/about page, listing who is responsible for the site's content:
just place it under your "$GITEA_CUSTOM/public/assets/" directory (for instance `$GITEA_CUSTOM/public/assets/impressum.html`) and put a link to it in either `$GITEA_CUSTOM/templates/custom/extra_links.tmpl` or `$GITEA_CUSTOM/templates/custom/extra_links_footer.tmpl`.

To match the current style, the link should have the class name "item", and you can use `{{AppSubUrl}}` to get the base URL:
`<a class="item" href="{{AppSubUrl}}/assets/impressum.html">Impressum</a>`

For more information, see [Adding Legal Pages](../administration/adding-legal-pages.md).

You can add new tabs in the same way, putting them in `extra_tabs.tmpl`.
The exact HTML needed to match the style of other tabs is in the file
`templates/repo/header.tmpl`
([source in GitHub](https://github.com/go-gitea/gitea/blob/main/templates/repo/header.tmpl))

### Other additions to the page

Apart from `extra_links.tmpl` and `extra_tabs.tmpl`, there are other useful templates you can put in your `$GITEA_CUSTOM/templates/custom/` directory:

- `header.tmpl`, just before the end of the `<head>` tag where you can add custom CSS files for instance.
- `body_outer_pre.tmpl`, right after the start of `<body>`.
- `body_inner_pre.tmpl`, before the top navigation bar, but already inside the main container `<div class="full height">`.
- `body_inner_post.tmpl`, before the end of the main container.
- `body_outer_post.tmpl`, before the bottom `<footer>` element.
- `footer.tmpl`, right before the end of the `<body>` tag, a good place for additional JavaScript.

### Using Gitea variables

It's possible to use various Gitea variables in your custom templates.

First, _temporarily_ enable development mode: in your `app.ini` change from `RUN_MODE = prod` to `RUN_MODE = dev`. Then add `{{ $ | DumpVar }}` to any of your templates, restart Gitea and refresh that page; that will dump all available variables.

Find the data that you need, and use the corresponding variable; for example, if you need the name of the repository then you'd use `{{.Repository.Name}}`.

If you need to transform that data somehow, and aren't familiar with Go, an easy workaround is to add the data to the DOM and add a small JavaScript script block to manipulate the data.

### Example: PlantUML

You can add [PlantUML](https://plantuml.com/) support to Gitea's markdown by using a PlantUML server.
The data is encoded and sent to the PlantUML server which generates the picture. There is an online
demo server at http://www.plantuml.com/plantuml, but if you (or your users) have sensitive data you
can set up your own [PlantUML server](https://plantuml.com/server) instead. To set up PlantUML rendering,
copy JavaScript files from https://gitea.com/davidsvantesson/plantuml-code-highlight and put them in your
`$GITEA_CUSTOM/public/assets/` folder. Then add the following to `custom/footer.tmpl`:

```html
<script>
  $(async () => {
    if (!$('.language-plantuml').length) return;
    await Promise.all([
      $.getScript('https://your-gitea-server.com/assets/deflate.js'),
      $.getScript('https://your-gitea-server.com/assets/encode.js'),
      $.getScript('https://your-gitea-server.com/assets/plantuml_codeblock_parse.js'),
    ]);
    // Replace call with address to your plantuml server
    parsePlantumlCodeBlocks("https://www.plantuml.com/plantuml");
  });
</script>
```

You can then add blocks like the following to your markdown:

```plantuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: Another authentication Response
```

The script will detect tags with `class="language-plantuml"`, but you can change this by providing a second argument to `parsePlantumlCodeBlocks`.

### Example: CAD Files Preview using Online 3D Viewer

You can implement CAD file preview inside your Gitea instance. This implemenation uses [`Online 3D Viewer`](https://github.com/kovacsv/Online3DViewer).

Supports following 3D file formats:
'3dm', '3ds', '3mf', 'amf', 'bim', 'brep', 'dae', 'fbx', 'fcstd', 'glb',
'gltf', 'ifc', 'igs', 'iges', 'stp', 'step', 'stl', 'obj', 'off', 'ply', 'wrl'
(Only v2 for .gltf files)

#### Part 1: Add template

In $GITEA_CUSTOM we need to add our template.
This template needs to be saved in "$GITEA_CUSTOM/templates/custom/".
Here create file "footer.tmpl" and add following text into it:

```
nano $GITEA_CUSTOM/templates/custom/footer.tmpl
```

```html
<script>
    function onPageChange() {
      // Supported 3D file types
      const fileTypes = ['3dm', '3ds', '3mf', 'amf', 'bim', 'brep', 'dae', 'fbx', 'fcstd', 'glb', 'gltf', 'ifc', 'igs', 'iges', 'stp', 'step', 'stl', 'obj', 'off', 'ply', 'wrl'];
  
      // Select matching link
      const links = Array.from(document.querySelectorAll('a.ui.mini.basic.button'));
      const link3D = links.find(link => {
        const href = link.href.toLowerCase();
        return href.includes('/raw/') && fileTypes.some(ext => href.endsWith(`.${ext}`));
      });
  
	if (link3D) {
	  const existingScript = document.querySelector('script[src="/assets/o3dv/o3dv.min.js"]');

	  const initializeViewer = () => {
		const fileUrl = link3D.getAttribute('href');

                const fileView = document.querySelector('.file-view');

		if (!fileView) return;

		// Remove only the old viewer container if it exists
		const oldView3D = document.getElementById('view-3d');
		if (oldView3D) {
		  oldView3D.remove();  // safely remove old viewer container div
		} else {
		  // No #view-3d, so remove all children inside .file-view
		  while (fileView.firstChild) {
		    fileView.removeChild(fileView.firstChild);
		  }
		}

		// Create a new container for the viewer
		const newView3D = document.createElement('div');
		  newView3D.id = 'view-3d';
		  newView3D.style.padding = '0';
		  newView3D.style.margin = '0';
		  newView3D.style.flexGrow = '1';
		  newView3D.style.minHeight = '0';
		  newView3D.style.width = '100%';
		
		const header = document.querySelector('header');
		const headerHeight = header ? header.offsetHeight : 0;

		newView3D.style.height = `calc(100vh - ${headerHeight}px)`;		

		// Append the new container inside fileView
		fileView.appendChild(newView3D);

		const parentDiv = document.getElementById('view-3d');
		if (parentDiv) {
		  const viewer = new OV.EmbeddedViewer(parentDiv, {
			backgroundColor: new OV.RGBAColor(59, 68, 76, 0),
			defaultColor: new OV.RGBColor(200, 200, 200),
			edgeSettings: new OV.EdgeSettings(false, new OV.RGBColor(0, 0, 0), 1),
			environmentSettings: new OV.EnvironmentSettings([
			  '/assets/o3dv/envmaps/fishermans_bastion/negx.jpg',
			  '/assets/o3dv/envmaps/fishermans_bastion/posx.jpg',
			  '/assets/o3dv/envmaps/fishermans_bastion/posy.jpg',
			  '/assets/o3dv/envmaps/fishermans_bastion/negy.jpg',
			  '/assets/o3dv/envmaps/fishermans_bastion/posz.jpg',
			  '/assets/o3dv/envmaps/fishermans_bastion/negz.jpg'
			], false)
		  });

		  viewer.LoadModelFromUrlList([fileUrl]);
		}
	  };

	  if (typeof OV === 'undefined') {
		if (!existingScript) {
		  const script = document.createElement('script');
		  script.onload = initializeViewer;
		  script.src = '/assets/o3dv/o3dv.min.js';
		  document.head.appendChild(script);
		} else {
		  // Script is loading but OV not yet ready — wait for it
		  existingScript.addEventListener('load', initializeViewer);
		}
	  } else {
		// OV already loaded
		initializeViewer();
	  }
	}
    };

    // Run when the page is fully loaded
    document.addEventListener('DOMContentLoaded', onPageChange); 

    const targetSelector = 'a.ui.mini.basic.button[href*="/raw/"]';
    let lastHref = null;
    let timeoutId = null;

    const checkAndRun = () => {
      const rawLink = document.querySelector(targetSelector);
      if (!rawLink) return;

      const currentHref = rawLink.getAttribute('href');
      if (currentHref !== lastHref) {
        lastHref = currentHref;

        const fileName = currentHref.split('/').pop();
        console.log('New Raw file link detected after delay:', fileName);
        
        onPageChange();
      }
    };

    const observer = new MutationObserver(() => {
      // Delay execution by 300ms after last mutation
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkAndRun, 300);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
</script>
```

#### Part 2: Add public files

Now we need to download latest version of O3DV. Go to "$GITEA_CUSTOM/public/assets/".
Create folder using (and cd into it):

```
mkdir o3dv
cd o3dv
```

Copy latest release zip link from [`GitHub`](https://github.com/kovacsv/Online3DViewer/releases) (v0.18.0 as of now).
Here use e.g. wget or curl to download the file:

```
wget https://github.com/kovacsv/Online3DViewer/releases/download/0.18.0/o3dv.zip
```

or

```
curl -L -O https://github.com/kovacsv/Online3DViewer/releases/download/0.18.0/o3dv.zip
```

Use e.g. unzip to unzip the archive:
```
unzip o3dv.zip
```

#### Part 3: Folder permissions

Now the last thing. Change permissions on the public folder:
```
chown -R git:git $GITEA_CUSTOM/public
```

Now we have everything ready! Restart your gitea instance to apply these changes and test it in your browser.

Sanity check. You should end-up with a folder structure similar to this:

```
$GITEA_CUSTOM/templates
-- custom
    `-- footer.tmpl

$GITEA_CUSTOM/public/assets/
-- o3dv
   |-- o3dv.zip
   |-- o3dv.license.md
   |-- o3dv.min.js
   |-- envmaps
    \...
```

## Customizing Gitea mails

The `$GITEA_CUSTOM/templates/mail` folder allows changing the body of every mail of Gitea.
Templates to override can be found in the
[`templates/mail`](https://github.com/go-gitea/gitea/tree/main/templates/mail)
directory of Gitea source.
Override by making a copy of the file under `$GITEA_CUSTOM/templates/mail` using a
full path structure matching source.

Any statement contained inside `{{` and `}}` are Gitea's template
syntax and shouldn't be touched without fully understanding these components.

## Adding Analytics to Gitea

Google Analytics, Matomo (previously Piwik), and other analytics services can be added to Gitea. To add the tracking code, refer to the `Other additions to the page` section of this document, and add the JavaScript to the `$GITEA_CUSTOM/templates/custom/header.tmpl` file.

## Customizing gitignores, labels, licenses, locales, and readmes

Place custom files in corresponding sub-folder under `custom/options`.

:::note
The files should not have a file extension, e.g. `Labels` rather than `Labels.txt`
:::

### gitignores

To add custom .gitignore, add a file with existing [.gitignore rules](https://git-scm.com/docs/gitignore) in it to `$GITEA_CUSTOM/options/gitignore`

## Customizing the git configuration

Starting with Gitea 1.20, you can customize the git configuration via the `git.config` section.

### Enabling signed git pushes

[Signed pushes](https://git-scm.com/docs/git-push#Documentation/git-push.txt---signedtruefalseif-asked) allow clients to cryptographically sign the push operation itself (not just individual commits). To enable signed pushes, add the following to `app.ini`:

```ini
[git.config]
receive.certNonceSeed = <randomstring>
```

`certNonceSeed` should be set to a random string and be kept secret. It is used to generate anti-replay nonces. Gitea already sets `receive.advertisePushOptions = true` by default, so no additional configuration is needed. Note that Gitea does not read `/etc/gitconfig`, so this option must be set via `app.ini` as shown above.

On the client side, pushes can be signed via `git push --signed` or enabled permanently using `git config --global push.gpgSign if-asked`.

### Labels

Starting with Gitea 1.19, you can add a file that follows the [YAML label format](https://github.com/go-gitea/gitea/blob/main/options/label/Advanced.yaml) to `$GITEA_CUSTOM/options/label`:

```yaml
labels:
  - name: "foo/bar"  # name of the label that will appear in the dropdown
    exclusive: true # whether to use the exclusive namespace for scoped labels. scoped delimiter is /
    color: aabbcc # hex colour coding
    description: Some label # long description of label intent
 ```

The [legacy file format](https://github.com/go-gitea/gitea/blob/main/options/label/Default) can still be used following the format below, however we strongly recommend using the newer YAML format instead.

`#hex-color label name ; label description`

For more information, see the [labels documentation](../usage/issues-prs/labels.md).

### Licenses

To add a custom license, add a file with the license text to `$GITEA_CUSTOM/options/license`

### Locales

Locales are managed via our [Crowdin](https://crowdin.com/project/gitea).
You can override a locale by placing an altered locale file in `$GITEA_CUSTOM/options/locale`.
Gitea's default locale files can be found in the [`options/locale`](https://github.com/go-gitea/gitea/tree/main/options/locale) source folder and these should be used as examples for your changes.

To add a completely new locale, as well as placing the file in the above location, you will need to add the new lang and name to the `[i18n]` section in your `app.ini`. Keep in mind that Gitea will use those settings as **overrides**, so if you want to keep the other languages as well you will need to copy/paste the default values and add your own to them.

```ini title="app.ini"
[i18n]
LANGS = en-US,foo-BAR
NAMES = English,FooBar
```

The first locale will be used as the default if user browser's language doesn't match any locale in the list.

Locales may change between versions, so keeping track of your customized locales is highly encouraged.

### Readmes

To add a custom Readme, add a markdown formatted file (without an `.md` extension) to `$GITEA_CUSTOM/options/readme`

:::note
Readme templates support **variable expansion**.
currently there are `{Name}` (name of repository), `{Description}`, `{CloneURL.SSH}`, `{CloneURL.HTTPS}` and `{OwnerName}`
:::

### Reactions

To change reaction emoji's you can set allowed reactions at app.ini

```ini title="app.ini"
[ui]
REACTIONS = +1, -1, laugh, confused, heart, hooray, eyes
```

A full list of supported emoji's is at [emoji list](https://gitea.com/gitea/gitea.com/issues/8)

## Customizing the look of Gitea

The built-in themes are `gitea-light`, `gitea-dark`, and `gitea-auto` (which automatically adapts to OS settings).

The default theme can be changed via `DEFAULT_THEME` in the [ui](../administration/config-cheat-sheet.md#ui-ui) section of `app.ini`.

Gitea also has support for user themes, which means every user can select which theme should be used.
The list of themes a user can choose from can be configured with the `THEMES` value in the [ui](../administration/config-cheat-sheet.md#ui-ui) section of `app.ini`.

To make a custom theme available to all users:

1. Add a CSS file to `$GITEA_CUSTOM/public/assets/css/theme-<theme-name>.css`.
  The value of `$GITEA_CUSTOM` of your instance can be queried by calling `gitea help` and looking up the value of "CustomPath".
2. Add `<theme-name>` to the comma-separated list of setting `THEMES` in `app.ini`, or leave `THEMES` empty to allow all themes.

A custom theme file named `theme-my-theme.css` will be displayed as `my-theme` on the user's theme selection page.
It could add theme meta information into the custom theme CSS file to provide more information about the theme.
If a custom theme is a dark theme, please set the global css variable `--is-dark-theme: true` in the `:root` block.
This allows Gitea to adjust the Monaco code editor's theme accordingly.
An "auto" theme could be implemented by using "theme-gitea-auto.css" as a reference.

```css
gitea-theme-meta-info {
  --theme-display-name: "My Awesome Theme"; /* this theme will be display as "My Awesome Theme" on the UI */
}
:root {
  --is-dark-theme: true; /* if it is a dark theme */
  --color-primary: #112233;
  /* more custom theme variables ... */
}
```

Community themes are listed in [gitea/awesome-gitea#themes](https://gitea.com/gitea/awesome-gitea#themes).

The default theme sources can be found [here](https://github.com/go-gitea/gitea/blob/main/web_src/css/themes).

## Customizing fonts

Fonts can be customized using CSS variables:

```css
:root {
  --fonts-proportional: /* custom proportional fonts */ !important;
  --fonts-monospace: /* custom monospace fonts */ !important;
  --fonts-emoji: /* custom emoji fonts */ !important;
}
```
