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

#### create, add, new

Create a new user

**--admin**: Make the user an administrator

**--email, -e**="": Email address for the new user (required)

**--full-name**="": Full name for the new user

**--login, -l**="": Use a different Gitea Login. Optional

**--no-must-change-password**: Don't require the user to change password on first login (default: password change required)

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--password, -p**="": Password for the new user (will prompt if not provided)

**--password-file**="": Read password from file

**--password-stdin**: Read password from stdin

**--prohibit-login**: Prohibit the user from logging in

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--restricted**: Make the user restricted

**--username, -u**="": Username for the new user (required)

**--visibility**="": Visibility of the user profile (public, limited, private) (default: "public")

#### edit, update, e, u

Edit a user

**--active**: Activate the user

**--admin**: Make the user an administrator

**--allow-create-organization**: Allow the user to create organizations

**--allow-git-hook**: Allow the user to use git hooks

**--allow-import-local**: Allow the user to import local repositories

**--allow-login**: Allow the user to log in

**--description**="": User description

**--email, -e**="": Email address

**--full-name**="": Full name

**--inactive**: Deactivate the user

**--location**="": Location

**--login, -l**="": Use a different Gitea Login. Optional

**--max-repo-creation**="": Maximum number of repositories the user can create (-1 for unlimited) (default: 0)

**--no-admin**: Remove administrator status

**--no-allow-create-organization**: Disallow the user from creating organizations

**--no-allow-git-hook**: Disallow the user from using git hooks

**--no-allow-import-local**: Disallow the user from importing local repositories

**--no-must-change-password**: Don't require the user to change password on next login (default: password change required)

**--no-restricted**: Remove restricted status

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--password**="": New password (use empty value --password="" to trigger interactive prompt)

**--password-file**="": Read password from file

**--password-stdin**: Read password from stdin

**--prohibit-login**: Prohibit the user from logging in

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--restricted**: Make the user restricted

**--visibility**="": Visibility of the user profile (public, limited, private)

**--website**="": Website URL

#### delete, rm, remove

Delete a user

**--confirm, -y**: confirm deletion without prompting

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional
