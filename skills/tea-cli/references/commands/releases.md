## releases, release, r

Manage releases

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### list, ls

List Releases

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### create, c

Create a release

**--asset, -a**="": Path to file attachment. Can be specified multiple times

**--draft, -d**: Is a draft

**--login, -l**="": Use a different Gitea Login. Optional

**--note, -n**="": Release notes

**--note-file, -f**="": Release notes file name. If set, --note is ignored.

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--prerelease, -p**: Is a pre-release

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--tag**="": Tag name. If the tag does not exist yet, it will be created by Gitea

**--target**="": Target branch name or commit hash. Defaults to the default branch of the repo

**--title, -t**="": Release title

### delete, rm

Delete one or more releases

**--confirm, -y**: Confirm deletion (required)

**--delete-tag**: Also delete the git tag for this release

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

### edit, e

Edit one or more releases

**--draft, -d**="": Mark as Draft [True/false]

**--login, -l**="": Use a different Gitea Login. Optional

**--note, -n**="": Change Notes

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--prerelease, -p**="": Mark as Pre-Release [True/false]

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

**--tag**="": Change Tag

**--target**="": Change Target

**--title, -t**="": Change Title

### assets, asset, a

Manage release assets

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### list, ls

List Release Attachments

**--limit, --lm**="": specify limit of items per page (default: 30)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--page, -p**="": specify page (default: 1)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### create, c

Create one or more release attachments

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional

#### delete, rm

Delete one or more release attachments

**--confirm, -y**: Confirm deletion (required)

**--login, -l**="": Use a different Gitea Login. Optional

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional
