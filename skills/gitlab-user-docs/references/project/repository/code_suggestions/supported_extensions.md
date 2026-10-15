# Supported extensions and languages

Code Suggestions supports multiple editors and languages.

Code Suggestions is available in the following editor extensions and
for the following languages.

## Supported editor extensions

To use Code Suggestions, use one of these editor extensions:

| IDE                                                             | Extension |
|-----------------------------------------------------------------|-----------|
| Visual Studio Code (VS Code)                                    | [GitLab for VS Code](https://marketplace.visualstudio.com/items?itemName=GitLab.gitlab-workflow) |
| [GitLab Web IDE (VS Code in the Cloud)](../../web_ide/_index.md) | No configuration required. |
| Microsoft Visual Studio (2022 for Windows)                      | [Visual Studio GitLab extension](https://marketplace.visualstudio.com/items?itemName=GitLab.GitLabExtensionForVisualStudio) |
| JetBrains IDEs                                                  | [GitLab Duo Plugin for JetBrains](https://plugins.jetbrains.com/plugin/22325-gitlab-duo) |
| Neovim                                                          | [`gitlab.vim` plugin](https://gitlab.com/gitlab-org/editor-extensions/gitlab.vim) |
| Eclipse                                                          | [GitLab for Eclipse](../../../../editor_extensions/eclipse/setup.md) |

A [GitLab Language Server](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp) is used in VS Code, JetBrains IDEs, Visual Studio, Eclipse, and Neovim. The Language Server supports faster iteration across more platforms. You can also configure it to support Code Suggestions in IDEs where GitLab doesn't provide official support.

You can express interest in other IDE extension support [in this issue](https://gitlab.com/gitlab-org/editor-extensions/meta/-/issues/78).

## Supported languages by IDE

In VS Code and JetBrains IDEs, Code Suggestions works with all languages that the IDE supports,
except plain text.
For some languages, like Kotlin, Scala, or Terraform, you must install a third-party extension to
add support for the language to VS Code.
You can [turn off Code Suggestions for specific languages](#manage-languages-for-code-suggestions).

> [!note]
> Some languages are not supported in all JetBrains IDEs, or might require additional
> plugin support.

For Web IDE, Visual Studio, Neovim, and Eclipse, the following table lists the languages
Code Suggestions supports by default.
Code Suggestions also works with other languages, but you must [manually add support](#add-support-for-more-languages).

| Language                            | Web IDE     | Visual Studio 2022 for Windows | Neovim                   | Eclipse |
|-------------------------------------|-------------|--------------------------------|--------------------------|---------|
| C                                   | Yes | Yes                    | Yes              | Yes |
| C++                                 | Yes | Yes                    | Yes              | Yes |
| C#                                  | Yes | Yes                    | Yes              | Yes |
| CSS                                 | Yes | No                     | No               | No |
| Go                                  | Yes | Yes                    | Yes              | Yes |
| Google SQL                          | Yes | Yes                    | Yes              | No |
| HAML                                | Yes | Yes                    | Yes              | Yes |
| HTML                                | Yes | No                     | No               | No |
| Java                                | Yes | Yes                    | Yes              | Yes |
| JavaScript                          | Yes | Yes                    | Yes              | Yes |
| Kotlin                              | No  | Yes                    | Yes              | Yes |
| Markdown                            | Yes | No                     | No               | No |
| PHP                                 | Yes | Yes                    | Yes              | Yes |
| Python                              | Yes | Yes                    | Yes              | Yes |
| Ruby                                | Yes | Yes                    | Yes              | Yes |
| Rust                                | Yes | Yes                    | Yes              | Yes |
| Scala                               | No  | Yes                    | Yes              | Yes |
| Shell scripts (`bash` only)         | Yes | Yes                    | Yes              | Yes |
| Svelte                              | Yes | Yes                    | Yes              | Yes |
| Swift                               | Yes | Yes                    | Yes              | Yes |
| TypeScript (`.ts` and `.tsx` files) | Yes | Yes                    | Yes              | Yes |
| Terraform                           | No  | No                     | Yes[^requires-third-party] | Yes |
| Vue                                 | Yes | Yes                    | Yes              | Yes |

[^requires-third-party]: Neovim requires a third-party extension that provides the `terraform` file type.

## Support for Infrastructure-as-Code (IaC)

Code Suggestions works with infrastructure-as-code interfaces, including:

- Kubernetes Resource Model (KRM)
- Google Cloud CLI
- Terraform

## Manage languages for Code Suggestions

In VS Code and JetBrains IDEs, Code Suggestions is turned on by default for all languages
except plain text.
You can turn it off for specific languages.

### VS Code

- [Introduced](https://gitlab.com/gitlab-org/gitlab-vscode-extension/-/blob/main/CHANGELOG.md#4210-2024-07-16) in GitLab for VS Code 4.21.0
- Suggestions for all languages [turned on](https://gitlab.com/gitlab-org/gitlab-vscode-extension/-/releases/v6.92.0) by default in GitLab for VS Code 6.92.0 during the GitLab 19.5 release.

To turn Code Suggestions off or on for the language of the current file:

1. In VS Code, open a file in the language.
1. Open the Command Palette:
   - For macOS, press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>.
   - For Windows or Linux, press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>.
1. Select **GitLab: Toggle Code Suggestions for current language**.

You can also select the GitLab Duo icon in the status bar, and then select the option
to turn Code Suggestions off or on for the current language.

To turn off Code Suggestions for more than one language:

1. In VS Code, open the Settings editor:
   - For macOS, press <kbd>Command</kbd>+<kbd>,</kbd>.
   - For Windows or Linux, press <kbd>Control</kbd>+<kbd>,</kbd>.
1. Select **Extensions** > **GitLab** > **GitLab Duo**.
1. Under **GitLab › Duo Code Suggestions: Disabled Languages**, select **Add Item**.
1. Enter the [language identifier](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers),
   like `python` or `markdown`.
1. Select **OK**.

Your changes save automatically and take effect immediately.

When you turn off Code Suggestions for a language, the GitLab Duo icon changes to show that suggestions are not available
for this language.

If you turned off languages in the **Enabled Supported Languages** setting of an earlier version
of the extension, it adds them to **Disabled Languages** when you update.

### JetBrains IDEs

- Suggestions for all languages [turned on](https://gitlab.com/gitlab-org/editor-extensions/gitlab-jetbrains-plugin/-/releases/v3.49.0) by default in the GitLab Duo plugin for JetBrains IDEs 3.49.0 during the GitLab 19.5 release.
- Turning off any language in settings [introduced](https://gitlab.com/gitlab-org/editor-extensions/gitlab-jetbrains-plugin/-/releases/v3.50.0) in the GitLab Duo plugin for JetBrains IDEs 3.50.0 during the GitLab 19.6 release.

Prerequisites:

- For the status bar option, Code Suggestions is turned on and the GitLab Language Server
  is running.

To turn Code Suggestions off or on for the language of the current file:

1. In your JetBrains IDE, open a file in the language.
1. In the status bar, select the GitLab Duo icon.
1. Select **Disable Code Suggestions for** the language to turn it off, or
   **Enable Code Suggestions for** the language to turn it back on.

This option is not available for plain text files.

To turn Code Suggestions off or on for any language:

1. In your JetBrains IDE, go to **Settings** > **Tools** > **GitLab Duo**.
1. Under **Languages with Code Suggestions Disabled**:
   - To turn off a language, select **Add Language**, then select the language.
   - To turn a language back on, select **Remove** () next to it.
1. Select **Apply** or **OK**.

If you turned off languages in an earlier version of the plugin, they stay off when you update.
If you added languages to the **Additional languages** setting of an earlier version,
they are turned on when you update, even if you also turned them off.

## Add support for more languages

In VS Code and JetBrains IDEs, you do not need to add languages.
Code Suggestions works with all languages except plain text.

In other IDEs, if your desired language doesn't have Code Suggestions available by default,
you can add support for your language locally.
However, Code Suggestions might not function as expected.

### Eclipse

Prerequisites:

- You have installed and enabled the [GitLab for Eclipse plugin](../../../../editor_extensions/eclipse/_index.md).
- You have completed the [Eclipse setup](../../../../editor_extensions/eclipse/setup.md)
  instructions, and authorized the extension to access your GitLab account.

To do this:

1. In the Eclipse bottom toolbar, select the GitLab icon.
1. Select **Show Settings**.
1. Scroll down to the **Code Suggestions Enabled Languages** section.
1. In **Additional Languages**, add a comma-separated list of language identifiers. Don't
   add leading periods to the identifiers. For example, use `html`, `md`, and `powershell`.
