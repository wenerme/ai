## logins, login

Log in to a Gitea server

### list, ls

List Gitea logins

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

### add

Add a Gitea login

**--client-id**="": OAuth client ID (for use with --oauth)

**--helper, -j**: Add helper

**--insecure, -i**: Disable TLS verification

**--name, -n**="": Login name

**--no-version-check, --nv**: Do not check version of Gitea instance

**--oauth, -o**: Use interactive OAuth2 flow for authentication

**--otp**="": OTP token for auth, if necessary

**--password, --pwd**="": Password for basic auth (will create token)

**--redirect-url**="": OAuth redirect URL (for use with --oauth)

**--scopes**="": Token scopes to add when creating a new token, separated by a comma

**--ssh-agent-key, -a**="": Use SSH public key or SSH fingerprint to login (needs a running ssh-agent with ssh key loaded)

**--ssh-agent-principal, -c**="": Use SSH certificate with specified principal to login (needs a running ssh-agent with certificate loaded)

**--ssh-key, -s**="": Path to a SSH key/certificate to use, overrides auto-discovery

**--token, -t**="": Access token. Can be obtained from Settings > Applications

**--url, -u**="": Server URL (default: "https://gitea.com")

**--user**="": User for basic auth (will create token)

### edit, e

Edit Gitea logins

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

### delete, rm

Remove a Gitea login

### default

Get or Set Default Login

**--output, -o**="": Output format. (simple, table, csv, tsv, yaml, json)

### oauth-refresh

Refresh an OAuth token
