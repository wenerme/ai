# Windows

The easiest way to use Codex on Windows is to use the [Codex app](https://developers.openai.com/codex/app/windows). You can also [set up the IDE extension](https://developers.openai.com/codex/ide) or [install the CLI](https://developers.openai.com/codex/cli) and run it from PowerShell.

<div class="mb-8">
  <CodexCallout
    href="/codex/app/windows"
    title="Use the Codex app on Windows"
    description="Work across projects, run parallel agent threads, and review results in one place with the native Windows app."
    iconSrc="/images/codex/codex-banner-icon.webp"
  />
</div>

When you run Codex natively on Windows, agent mode uses a [Windows sandbox](#windows-sandbox) to block filesystem writes outside the working folder and prevent network access without your explicit approval. [Learn more below](#windows-sandbox).

If you prefer to have Codex use [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) (WSL2), [read the instructions](#windows-subsystem-for-linux) below.

## Windows sandbox

Native Windows sandbox support includes two modes that you can configure in `config.toml`:

```toml
[windows]
sandbox = "unelevated" # or "elevated"
```

How `elevated` mode works:

- Uses a Restricted Token approach with filesystem ACLs to limit which files the sandbox can write to.
- Runs commands as a dedicated Windows Sandbox User.
- Limits network access by installing Windows Firewall rules.

### Sandbox permissions

Running Codex in full access mode means Codex is not limited to your project
  directory and might perform unintentional destructive actions that can lead to
  data loss. For safer automation, keep sandbox boundaries in place and use
  [rules](https://developers.openai.com/codex/rules) for specific exceptions, or set your [approval policy to
  never](https://developers.openai.com/codex/agent-approvals-security#run-without-approval-prompts) to have
  Codex attempt to solve problems without asking for escalated permissions,
  based on your [approval and security setup](https://developers.openai.com/codex/agent-approvals-security).

### Grant sandbox read access

When a command fails because the Windows sandbox can't read a directory, use:

```text
/sandbox-add-read-dir C:\absolute\directory\path
```

The path must be an existing absolute directory. After the command succeeds, later commands that run in the sandbox can read that directory during the current session.

## Windows Subsystem for Linux

### Launch VS Code from inside WSL

For step-by-step instructions, see the [official VS Code WSL tutorial](https://code.visualstudio.com/docs/remote/wsl-tutorial).

#### Prerequisites

- Windows with WSL installed. To install WSL, open PowerShell as an administrator, then run `wsl --install` (Ubuntu is a common choice).
- VS Code with the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) installed.

#### Open VS Code from a WSL terminal

```bash
# From your WSL shell
cd ~/code/your-project
code .
```

This opens a WSL remote window, installs the VS Code Server if needed, and ensures integrated terminals run in Linux.

#### Confirm you're connected to WSL

- Look for the green status bar that shows `WSL: <distro>`.
- Integrated terminals should display Linux paths (such as `/home/...`) instead of `C:\`.
- You can verify with:

  ```bash
  echo $WSL_DISTRO_NAME
  ```

  This prints your distribution name.

If you don't see "WSL: ..." in the status bar, press `Ctrl+Shift+P`, pick
  `WSL: Reopen Folder in WSL`, and keep your repository under `/home/...` (not
  `C:\`) for best performance.

### Use Codex CLI with WSL

Run these commands from an elevated PowerShell or Windows Terminal:

```powershell
# Install default Linux distribution (like Ubuntu)
wsl --install

# Start a shell inside Windows Subsystem for Linux
wsl
```

Then run these commands from your WSL shell:

```bash
# https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl
# Install Node.js in WSL (via nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# In a new tab or after exiting and running `wsl` again to install Node.js
nvm install 22

# Install and run Codex in WSL
npm i -g @openai/codex
codex
```

### Working on code inside WSL

- Working in Windows-mounted paths like <code>/mnt/c/...</code> can be slower than working in Windows-native paths. Keep your repositories under your Linux home directory (like <code>~/code/my-app</code>) for faster I/O and fewer symlink and permission issues:
  ```bash
  mkdir -p ~/code && cd ~/code
  git clone https://github.com/your/repo.git
  cd repo
  ```
- If you need Windows access to files, they're under <code>\\wsl$\Ubuntu\home\&lt;user&gt;</code> in Explorer.

## Troubleshooting and FAQ

#### Installed extension, but it's unresponsive

Your system may be missing C++ development tools, which some native dependencies require:

- Visual Studio Build Tools (C++ workload)
- Microsoft Visual C++ Redistributable (x64)
- With `winget`, run `winget install --id Microsoft.VisualStudio.2022.BuildTools -e`

Then fully restart VS Code after installation.

#### If it feels slow on large repositories

- Make sure you're not working under <code>/mnt/c</code>. Move the repository to WSL (for example, <code>~/code/...</code>).
- Increase memory and CPU for WSL if needed; update WSL to the latest version:
  ```powershell
  wsl --update
  wsl --shutdown
  ```

#### VS Code in WSL can't find `codex`

Verify the binary exists and is on PATH inside WSL:

```bash
which codex || echo "codex not found"
```

If the binary isn't found, install it by [following the instructions](#use-codex-cli-with-wsl) above.