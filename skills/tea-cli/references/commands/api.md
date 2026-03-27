## api

Make an authenticated API request

**--Field, -F**="": Add a typed field to the request body (key=value, @file, or @- for stdin)

**--data, -d**="": Raw JSON request body (use @file to read from file, @- for stdin)

**--field, -f**="": Add a string field to the request body (key=value)

**--header, -H**="": Add a custom header (key:value)

**--include, -i**: Include HTTP status and response headers in output (written to stderr)

**--login, -l**="": Use a different Gitea Login. Optional

**--method, -X**="": HTTP method (GET, POST, PUT, PATCH, DELETE) (default: "GET")

**--output, -o**="": Write response body to file instead of stdout (use '-' for stdout)

**--remote, -R**="": Discover Gitea login from remote. Optional

**--repo, -r**="": Override local repository path or gitea repository slug to interact with. Optional
