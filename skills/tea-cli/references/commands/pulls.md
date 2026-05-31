## pulls, pull, pr

Manage and checkout pull requests

**--comments**: Whether to display comments (will prompt if not provided & run interactively)

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			index,state,author,author-id,url,title,body,mergeable,base,base-commit,head,diff,patch,created,updated,deadline,assignees,milestone,labels,comments,ci
		 (default: "index,title,state,author,milestone,updated,labels")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--state**="": Filter by state (all|open|closed)

### list, ls

List pull requests of the repository

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			index,state,author,author-id,url,title,body,mergeable,base,base-commit,head,diff,patch,created,updated,deadline,assignees,milestone,labels,comments,ci
		 (default: "index,title,state,author,milestone,updated,labels")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--state**="": Filter by state (all|open|closed)

### checkout, co

Locally check out the given PR

**--branch, -b**: Create a local branch if it doesn't exist yet

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### clean

Deletes local & remote feature-branches for a closed pull request

**--ignore-sha**: Find the local branch by name instead of commit hash (less precise)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### create, c

Create a pull-request

**--agit**: Create an agit flow pull request

**--allow-maintainer-edits, --edits**: Enable maintainers to push to the base branch of created pull

**--assignees, -a**="": Comma-separated list of usernames to assign

**--base, -b**="": Branch name of the PR target (default is repos default branch)

**--deadline, -D**="": Deadline timestamp to assign

**--description, -d**="": 

**--draft**: Create as a draft (prepends "WIP: " to the title; Gitea treats WIP-prefixed PRs as drafts)

**--head**="": Branch name of the PR source (default is current one). To specify a different head repo, use <user>:<branch>

**--labels, -L**="": Comma-separated list of labels to assign

**--login, -l**="": Use a different Gitea Login. Optional

**--milestone, -m**="": Milestone to assign

**--referenced-version, -v**="": commit-hash or tag name to assign

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--title, -t**="": 

**--topic**="": Topic name for agit flow pull request

### close

Change state of one or more pull requests to 'closed'

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### reopen, open

Change state of one or more pull requests to 'open'

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### edit, e

Edit one or more pull requests

**--add-assignees, -a**="": Comma-separated list of usernames to assign

**--add-labels, -L**="": Comma-separated list of labels to assign. Takes precedence over --remove-labels

**--add-reviewers, -r**="": Comma-separated list of usernames to request review from

**--deadline, -D**="": Deadline timestamp to assign

**--description, -d**="": 

**--draft**: Mark as draft by prepending "WIP: " to the title (idempotent)

**--login, -l**="": Use a different Gitea Login. Optional

**--milestone, -m**="": Milestone to assign

**--ready**: Mark as ready for review by stripping any leading "WIP: " or "[WIP]" prefix

**--referenced-version, -v**="": commit-hash or tag name to assign

**--remote, -R**="": Discover Gitea login from remote. Optional

**--remove-labels**="": Comma-separated list of labels to remove

**--remove-reviewers**="": Comma-separated list of usernames to remove from reviewers

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--title, -t**="": 

### review

Interactively review a pull request

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### approve, lgtm, a

Approve a pull request

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### reject

Request changes to a pull request

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### merge, m

Merge a pull request

**--login, -l**="": Use a different Gitea Login. Optional

**--message, -m**="": Merge commit message

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--style, -s**="": Kind of merge to perform: merge, rebase, squash, rebase-merge (default: "merge")

**--title, -t**="": Merge commit title

### review-comments, rc

List review comments on a pull request

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			id,body,reviewer,path,line,resolver,created,updated,url
		 (default: "id,path,line,body,reviewer,resolver")

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### resolve

Resolve a review comment on a pull request

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### unresolve

Unresolve a review comment on a pull request

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional
