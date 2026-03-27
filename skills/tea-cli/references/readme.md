#  *T E A*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Release](https://raster.shields.io/badge/dynamic/json.svg?label=release&url=https://gitea.com/api/v1/repos/gitea/tea/releases&query=$[0].tag_name)](https://gitea.com/gitea/tea/releases)
[![Join the chat at https://img.shields.io/discord/322538954119184384.svg](https://img.shields.io/discord/322538954119184384.svg)](https://discord.gg/Gitea)
[![Go Report Card](https://goreportcard.com/badge/code.gitea.io/tea)](https://goreportcard.com/report/code.gitea.io/tea) [![GoDoc](https://pkg.go.dev/badge/code.gitea.io/tea?status.svg)](https://godoc.org/code.gitea.io/tea)
![Tea Release Status](https://gitea.com/gitea/tea/actions/workflows/release-nightly.yml/badge.svg)

## The official CLI for Gitea

[demo gif]

```
NAME:
  tea - command line tool to interact with Gitea

USAGE:
  tea [global options] [command [command options]]

VERSION:
  Version: 0.10.1+15-g8876fe3  golang: 1.25.0  go-sdk: v0.21.0

DESCRIPTION:
  tea is a productivity helper for Gitea. It can be used to manage most entities on
  one or multiple Gitea instances & provides local helpers like 'tea pr checkout'.

  tea tries to make use of context provided by the repository in $PWD if available.
  tea works best in a upstream/fork workflow, when the local main branch tracks the
  upstream repo. tea assumes that local git state is published on the remote before
  doing operations with tea.    Configuration is persisted in $XDG_CONFIG_HOME/tea.

COMMANDS:
  help, h  Shows a list of commands or help for one command

  ENTITIES:
    issues, issue, i                  List, create and update issues
    pulls, pull, pr                   Manage and checkout pull requests
    labels, label                     Manage issue labels
    milestones, milestone, ms         List and create milestones
    releases, release, r              Manage releases
    times, time, t                    Operate on tracked times of a repository's issues & pulls
    organizations, organization, org  List, create, delete organizations
    repos, repo                       Show repository details
    branches, branch, b               Consult branches
    actions                           Manage repository actions (secrets, variables)
    comment, c                        Add a comment to an issue / pr
    webhooks, webhook                 Manage repository webhooks

  HELPERS:
    open, o                         Open something of the repository in web browser
    notifications, notification, n  Show notifications
    clone, C                        Clone a repository locally

  MISCELLANEOUS:
    whoami    Show current logged in user
    admin, a  Operations requiring admin access on the Gitea instance

  SETUP:
    logins, login  Log in to a Gitea server
    logout         Log out from a Gitea server

GLOBAL OPTIONS:
  --debug, --vvv  Enable debug mode (default: false)
  --help, -h      show help
  --version, -v   print the version

EXAMPLES
  tea login add                       # add a login once to get started

  tea pulls                           # list open pulls for the repo in $PWD
  tea pulls --repo $HOME/foo          # list open pulls for the repo in $HOME/foo
  tea pulls --remote upstream         # list open pulls for the repo pointed at by
                                      # your local "upstream" git remote
  # list open pulls for any gitea repo at the given login instance
  tea pulls --repo gitea/tea --login gitea.com

  tea milestone issues 0.7.0          # view open issues for milestone '0.7.0'
  tea issue 189                       # view contents of issue 189
  tea open 189                        # open web ui for issue 189
  tea open milestones                 # open web ui for milestones

  tea actions secrets list            # list all repository action secrets
  tea actions secrets create API_KEY  # create a new secret (will prompt for value)
  tea actions variables list          # list all repository action variables
  tea actions variables set API_URL https://api.example.com

  tea webhooks list                   # list repository webhooks
  tea webhooks list --org myorg       # list organization webhooks
  tea webhooks create https://example.com/hook --events push,pull_request

  # send gitea desktop notifications every 5 minutes (bash + libnotify)
  while :; do tea notifications --mine -o simple | xargs -i notify-send {}; sleep 300; done

ABOUT
  Written & maintained by The Gitea Authors.
  If you find a bug or want to contribute, we'll welcome you at https://gitea.com/gitea/tea.
  More info about Gitea itself on https://about.gitea.com.
```

- tea uses [code.gitea.io/sdk](https://code.gitea.io/sdk) and interacts with the Gitea API.

## Installation

There are different ways to get `tea`:

1. Install via your system package manager:
    - macOS via `brew` (official):
      ```sh
      brew install tea
      ```
    - arch linux ([tea](https://archlinux.org/packages/extra/x86_64/tea/), thirdparty)
    - alpine linux ([tea](https://pkgs.alpinelinux.org/packages?name=tea&branch=edge), thirdparty)
    - Windows via `MSYS2` ([tea](https://packages.msys2.org/base/mingw-w64-tea), thirdparty)

2. Use the prebuilt binaries from [dl.gitea.com](https://dl.gitea.com/tea/)

3. Install from source: [see *Compilation*](#compilation)

4. Docker: [Tea at docker hub](https://hub.docker.com/r/gitea/tea)

### Log in to Gitea from tea

Gitea can use many different authentication schemes, and not every authentication method will work with every Gitea deployment. When you are a Gitea instance administrator you can tweak your settings to fit your use case. For the method that is most likely to work with any Gitea deployment use the following steps:

1. Open your Gitea instance in a web browser

2. Log in to Gitea in your web browser. Any MFA, IDP, or whatever else should be available this way.

3. In your "user settings", generate an application token with at least **user read** permissions. If you want to do anything useful with the token add additional permissions/scopes.

4. Run `tea login add`, select **application token** authentication when asked for authentication type, and answer **yes** to the question if you have a token. Paste the generated token when asked for one.

You should now be logged in to your gitea instance from tea.

Since 0.10 Gitea supports the much simpler oauth workflow but oauth may not be available on all Gitea deployments, and gets much more complex when running tea on a remote system.

### Shell completion

If you installed from source or the package does not provide the completions with it you can add them yourself with `tea completion <shell>` command which is not visible in help. To generate the completions run one of the following commands depending on your shell.

```shell
# .bashrc
source <(tea completion bash)

# .zshrc
source <(tea completion zsh)

# fish
tea completion fish > ~/.config/fish/completions/tea.fish

# Powershell
Output the script to path/to/autocomplete/tea.ps1 an run it.
```

### Man Page

The hidden command `tea man` can be used to generate the `tea` man page.

```shell
# for bash or zsh
man <(tea man)

# for fish
man (tea man | psub)

# write man page to a file
tea man --out ./tea.man
```

## Compilation

Make sure you have a current Go version installed (1.26 or newer).

- To compile the source yourself with the recommended flags & tags:
  ```sh
  git clone https://gitea.com/gitea/tea.git # or: tea clone gitea.com/gitea/tea ;)
  cd tea
  make
  ```
  Note that GNU Make (gmake on OpenBSD) is required.
  If you want to install the compiled program you have to execute the following command:
  ```sh
  make install
  ```
  This installs the binary into the "bin" folder inside of your GOPATH folder (`go env GOPATH`). It is possible that this folder isn't in your PATH Environment Variable. 

- For a quick installation without `git` & `make`, set $version and exec:
  ```sh
  go install code.gitea.io/tea@${version}
  ```

## Contributing

Fork -> Patch -> Push -> Pull Request

- `make test` run testsuite
- `make vet`  run checks (check the order of imports; preventing failure on CI pipeline beforehand)
- ... (for other development tasks, check the `Makefile`)

**Please** read the [CONTRIBUTING](CONTRIBUTING.md) documentation, it will tell you about internal structures and concepts.

## License

This project is under the MIT License. See the [LICENSE](LICENSE) file for the
full license text.
