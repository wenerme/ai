## wiki

Manage repository wiki pages

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			title,path,url,sha,author,updated,message
		 (default: "title,author,updated,sha")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### list, ls

List wiki pages of the repository

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			title,path,url,sha,author,updated,message
		 (default: "title,author,updated,sha")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### view

View a wiki page

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### revisions, history

List revisions of a wiki page

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			sha,message,author,date
		 (default: "sha,author,date,message")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### create, c

Create a wiki page

**--content, -c**="": wiki page content

**--login, -l**="": Use a different Gitea Login. Optional

**--message, -m**="": commit message for the wiki change

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--title, -t**="": wiki page title

### edit, e

Edit a wiki page

**--content, -c**="": wiki page content

**--login, -l**="": Use a different Gitea Login. Optional

**--message, -m**="": commit message for the wiki change

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--title, -t**="": wiki page title

### delete, rm

Delete a wiki page

**--confirm, -y**: confirm deletion without prompting

**--login, -l**="": Use a different Gitea Login. Optional

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional
