# Code Intelligence

Code Intelligence gives Linear controlled access to your connected GitHub repositories, so teams can ask questions about how the product actually works without leaving Linear.

> [!NOTE]
> **Pricing**
> Code Intelligence is available in beta for Business and Enterprise plans, and is free to use during the beta period.

![Codebase analysis through Code Intelligence](https://webassets.linear.app/images/ornj730p/production/a39eab368c6ab67c6b90eab4419d2741c1712d00-2150x1826.png?q=95&auto=format&dpr=2)

Once enabled, your code becomes shared product context inside Linear. Linear can analyze relevant repositories and return grounded answers with links to the files, commits, or pull requests behind them.

This helps Product write sharper specs, Support and Sales answer technical questions with more confidence, and Engineering investigate bugs, regressions, and unfamiliar parts of the system faster.

Ask Linear:

> How does the authentication system work?

> Who wrote the payment processing logic?

> When was the search feature added?

Because this requires deeper analysis of your codebase, responses may take longer than replies based only on workspace data.

### Setup

To set up Code Intelligence, a Linear workspace owner or admin should:

1. **Connect the GitHub integration**: If not already enabled, install the [GitHub integration](https://linear.app/docs/github#enable-the-github-integration) for your workspace, with code access enabled to allow Linear to read your repositories.
2. **Enable Code Intelligence**: To configure Code Intelligence, go to [_Settings_ > _AI & Agents_ > _Code Intelligence_](https://linear.app/settings/ai/code-intelligence).

![Enable Code Intelligence](https://webassets.linear.app/images/ornj730p/production/0046d64cedff691ac551c19cbdddc5e4a5eeb4ff-1386x540.png?q=95&auto=format&dpr=2)

Once enabled, teams can use Code Intelligence to understand implementation details, find where functionality lives, identify architectural patterns, trace when something was added, see who contributed to specific parts of the codebase, and assess what constraints or dependencies might affect a plan or customer request.

Code Intelligence is not available to guest users. Only members, admins, and workspace owners can use Code Intelligence.

### Repository access

By default, Code Intelligence only searches repositories that are:

* connected through your GitHub integration, and
* accessible to the member

Workspace admins or owners can also choose which repositories are available for Code Intelligence. This lets you expose only the repositories you want Linear Agent to analyze, rather than making all connected repositories available.

Repository access is permission-aware by default. If someone can't access a repository in GitHub, Code Intelligence won't use it for them.

### Extending access to all members

Admins can enable _Extend access to all members_ to let anyone in the workspace use Code Intelligence, even if they don't have direct GitHub access. Once enabled, admins can scope that access to all repositories or only selected repositories.

This makes technical product context available to teams like Support, Sales, and Product without requiring direct repository access or pulling an engineer in for every question.

![Extend Code Intelligence access to all members](https://webassets.linear.app/images/ornj730p/production/d17061cfdb86cf8b4b16ce1d1635cee6b7a6a53d-1194x454.png?q=95&auto=format&dpr=2)

### Agent guidance

You can provide [Linear Agent guidance](https://linear.app/docs/linear-agent#guidance) to shape how this analysis works in your workspace.

This is useful for specifying repository conventions, architectural context, or preferences for how Linear should interpret and explain your codebase when answering code-related questions.
