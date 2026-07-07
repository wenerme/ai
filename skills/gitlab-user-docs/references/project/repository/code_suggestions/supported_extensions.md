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

A [GitLab Language Server](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp) is used in VS Code, Visual Studio, Eclipse, and Neovim. The Language Server supports faster iteration across more platforms. You can also configure it to support Code Suggestions in IDEs where GitLab doesn't provide official support.

You can express interest in other IDE extension support [in this issue](https://gitlab.com/gitlab-org/editor-extensions/meta/-/issues/78).

## Supported languages by IDE

The following table provides more information on the languages Code Suggestions supports by default, and the IDEs.

Code Suggestions also works with other languages, but you must [manually add support](#add-support-for-more-languages).

| Language                            | Web IDE     | VS Code                  | JetBrains IDEs | Visual Studio 2022 for Windows | Neovim                   | Eclipse |
|-------------------------------------|-------------|--------------------------|----------------|--------------------------------|--------------------------|---------|
| C                                   | Yes | Yes              | No     | Yes                    | Yes              | Yes |
| C++                                 | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| C#                                  | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| CSS                                 | Yes | No               | No     | No                     | No               | No |
| Go                                  | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| Google SQL                          | Yes | Yes              | Yes    | Yes                    | Yes              | No |
| HAML                                | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| HTML                                | Yes | No               | No     | No                     | No               | No |
| Java                                | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| JavaScript                          | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| Kotlin                              | No  | Yes <sup>1</sup> | Yes    | Yes                    | Yes              | Yes |
| Markdown                            | Yes | No               | No     | No                     | No               | No |
| PHP                                 | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| Python                              | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| Ruby                                | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| Rust                                | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| Scala                               | No  | Yes <sup>2</sup> | Yes    | Yes                    | Yes              | Yes |
| Shell scripts (`bash` only)         | Yes | No               | Yes    | Yes                    | Yes              | Yes |
| Svelte                              | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| Swift                               | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| TypeScript (`.ts` and `.tsx` files) | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |
| Terraform                           | No  | Yes <sup>3</sup> | Yes    | No                     | Yes <sup>4</sup> | Yes |
| Vue                                 | Yes | Yes              | Yes    | Yes                    | Yes              | Yes |

**Footnotes**:

1. VS Code requires a third-party extension that provides Kotlin support.
1. VS Code requires a third-party extension that provides Scala support.
1. VS Code requires a third-party extension that provides Terraform support.
1. Neovim requires a third-party extension that provides the `terraform` file type.

> [!note]
> Some languages are not supported in all JetBrains IDEs, or might require additional
> plugin support. Refer to the JetBrains documentation for specifics on your IDE.

## Support for Infrastructure-as-Code (IaC)

Code Suggestions works with infrastructure-as-code interfaces, including:

- Kubernetes Resource Model (KRM)
- Google Cloud CLI
- Terraform

## Manage languages for Code Suggestions

- [Introduced](https://gitlab.com/gitlab-org/gitlab-vscode-extension/-/blob/main/CHANGELOG.md#4210-2024-07-16) in GitLab for VS Code 4.21.0

You can customize your coding experience in VS Code by enabling or disabling Code Suggestions for specific supported languages.
You can do this by editing your `settings.json` file directly, or from the VS Code user interface:

1. In VS Code, open the Settings editor:
   - For macOS, press <kbd>Command</kbd>+<kbd>,</kbd>.
   - For Windows or Linux, press <kbd>Control</kbd>+<kbd>,</kbd>.
1. Select **Extensions** > **GitLab** > **GitLab Duo**.
1. Find the **GitLab › Duo Code Suggestions: Enabled Supported Languages** section.
1. Select the languages you want to suggest or generate code for.
1. Your changes save automatically and take effect immediately.

When you turn off Code Suggestions for a language, the GitLab Duo icon changes to show that suggestions are not available
for this language.

## Add support for more languages

If your desired language doesn't have Code Suggestions available by default,
you can add support for your language locally.
However, Code Suggestions might not function as expected.

### Visual Studio Code

Prerequisites:

- You have installed and enabled the
  [GitLab for VS Code extension](../../../../editor_extensions/visual_studio_code/_index.md).
- You have completed the [VS Code extension setup](https://gitlab.com/gitlab-org/gitlab-vscode-extension/#setup)
  instructions, and authorized the extension to access your GitLab account.

To do this:

1. Find your desired language in the list of
   [language identifiers](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocumentItem).
   You need the **Identifier** for your languages in a later step.
1. In VS Code, open the Settings editor:
   - For macOS, press <kbd>Command</kbd>+<kbd>,</kbd>.
   - For Windows or Linux, press <kbd>Control</kbd>+<kbd>,</kbd>.
1. Select **Extensions** > **GitLab** > **GitLab Duo**.
1. Under **GitLab › Duo Code Suggestions: Additional Languages**, select **Add Item**.
1. Enter the identifier for each language you want to support. Identifiers should be
   lowercase, like `html` or `powershell`. Don't add leading periods from file suffixes to each identifier.
1. Select **OK**.

### JetBrains IDEs

Prerequisites:

- You have installed and enabled the
  [GitLab Duo plugin for JetBrains IDEs](../../../../editor_extensions/jetbrains_ide/_index.md).
- You have completed the [Jetbrains extension setup](https://gitlab.com/gitlab-org/editor-extensions/gitlab-jetbrains-plugin#setup)
  instructions, and authorized the extension to access your GitLab account.

To do this:

1. Find your desired language in the list of
   [language identifiers](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocumentItem).
   You need the identifier for your languages in a later step.
1. In your IDE, in the top bar, select your IDE name, then select **Settings**.
1. In the left sidebar, select **Tools** > **GitLab Duo**.
1. Under **Code Suggestions Enabled Languages** > **Additional languages**, add the identifier for each language
   you want to support. Identifiers should be in lowercase, like `html`. Separate multiple identifiers with commas,
   like `html,powershell,latex`, and don't add leading periods to each identifier.
1. Select **OK**.

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
