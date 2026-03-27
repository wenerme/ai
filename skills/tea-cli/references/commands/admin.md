## admin, a

Operations requiring admin access on the Gitea instance

### users, u

Manage registered users

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			id,login,full_name,email,avatar_url,language,is_admin,restricted,prohibit_login,location,website,description,visibility,activated,lastlogin_at,created_at
		 (default: "id,login,full_name,email,activated")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### list, ls

List Users

**--fields, -f**="": Comma-separated list of fields to print. Available values:
			id,login,full_name,email,avatar_url,language,is_admin,restricted,prohibit_login,location,website,description,visibility,activated,lastlogin_at,created_at
		 (default: "id,login,full_name,email,activated")

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional
