## issues, issue, i

List, create and update issues

**--assignee, -a**="": 

**--author, -A**="": 

**--comments**: Whether to display comments (will prompt if not provided & run interactively)

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			index,state,kind,author,author-id,url,title,body,created,updated,deadline,assignees,milestone,labels,comments,owner,repo
		 (default: "index,title,state,author,milestone,labels,owner,repo")

**--from, -F**="": Filter by activity after this date

**--keyword, -k**="": Filter by search string

**--kind, -K**="": Whether to return `issues`, `pulls`, or `all` (you can use this to apply advanced search filters to PRs)

**--labels, -L**="": Comma-separated list of labels to match issues against.
			
		

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--mentions, -M**="": 

**--milestones, -m**="": Comma-separated list of milestones to match issues against.
			
		

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--owner, --org**="": 

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--state**="": Filter by state (all|open|closed)

**--until, -u**="": Filter by activity before this date

### list, ls

List issues of the repository

**--assignee, -a**="": 

**--author, -A**="": 

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			index,state,kind,author,author-id,url,title,body,created,updated,deadline,assignees,milestone,labels,comments,owner,repo
		 (default: "index,title,state,author,milestone,labels,owner,repo")

**--from, -F**="": Filter by activity after this date

**--keyword, -k**="": Filter by search string

**--kind, -K**="": Whether to return `issues`, `pulls`, or `all` (you can use this to apply advanced search filters to PRs)

**--labels, -L**="": Comma-separated list of labels to match issues against.
			
		

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--mentions, -M**="": 

**--milestones, -m**="": Comma-separated list of milestones to match issues against.
			
		

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--owner, --org**="": 

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--state**="": Filter by state (all|open|closed)

**--until, -u**="": Filter by activity before this date

### create, c

Create an issue on repository

**--assignees, -a**="": Comma-separated list of usernames to assign

**--deadline, -D**="": Deadline timestamp to assign

**--description, -d**="": 

**--labels, -L**="": Comma-separated list of labels to assign

**--login, -l**="": Use a different Gitea Login. Optional

**--milestone, -m**="": Milestone to assign

**--referenced-version, -v**="": commit-hash or tag name to assign

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--title, -t**="": 

### edit, e

Edit one or more issues

**--add-assignees, -a**="": Comma-separated list of usernames to assign

**--add-labels, -L**="": Comma-separated list of labels to assign. Takes precedence over --remove-labels

**--deadline, -D**="": Deadline timestamp to assign

**--description, -d**="": 

**--login, -l**="": Use a different Gitea Login. Optional

**--milestone, -m**="": Milestone to assign

**--referenced-version, -v**="": commit-hash or tag name to assign

**--remote, -R**="": Discover Gitea login from remote. Optional

**--remove-labels**="": Comma-separated list of labels to remove

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--title, -t**="": 

### reopen, open

Change state of one or more issues to 'open'

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### close

Change state of one ore more issues to 'closed'

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional
