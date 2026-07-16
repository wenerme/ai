# Rule Types

By writing rules, you can specify different outbound methods for connections, such as forwarding through a specific proxy or interception. Rules can match connections based on IP, domain, process name, or a combination of multiple conditions.

For each connection, the system matches rules sequentially from top to bottom.

Rules can be divided into the following types (some IP types may trigger DNS resolution):

- Domain-based
- IP or Port-based
- Protocol-based
- Logical Rules
- Other Composite Types

> [!NOTE]
> To write rules for URLs, refer to the [HTTP Rewrite](/http-engine/rewrite)
> section.

> [!NOTE]
> You can add a `no-track` parameter at the end of a rule to hide connections
> matched by this rule. For example, `SCRIPT,quic,REJECT,no-track`. This can
> effectively prevent a flood of REJECT logs from cluttering the page.

> [!NOTE]
> Use the built-in proxies `REJECT` and `REJECT-DROP` to intercept connections.
> `REJECT` will immediately return an error, while `REJECT-DROP` will silently
> drop the connection to avoid a connection storm.

## DOMAIN

Exact match for a domain name, e.g., `DOMAIN,google.com` matches `google.com` but not `www.google.com`.

## DOMAIN-SUFFIX

Matches domain name suffix, e.g., `DOMAIN-SUFFIX,google.com` matches `google.com` and `www.google.com`.

## DOMAIN-KEYWORD

Keyword matches for domain names, e.g., `DOMAIN-KEYWORD,google` matches `google.com` and `google.jp`.

## DOMAIN-WILDCARD

Matches domain names using wildcards, supporting `*` and `?`, e.g., `DOMAIN-WILDCARD,*.google.com` matches `www.google.com` and `mail.google.com`.

Here `*` matches any number of characters, `?` matches one character.

## DOMAIN-REGEX

Matches domain names using regular expressions, e.g., `DOMAIN-REGEX,^.*\.google\.com$` matches `www.google.com` and `mail.google.com`.

## GEOIP

Matches country codes using MaxMind GeoIP, e.g., `GEOIP,CN`. You can add `no-resolve` to avoid triggering DNS resolution.

> [!NOTE]
> Stash allows users to replace the database conforming to MaxMind GeoIP format.
> Users can choose a more suitable MaxMind GeoIP database according to their own
> needs.

## IP-ASN

Matches using IP Autonomous System Number, e.g., `IP-ASN,714`. You can add `no-resolve` to avoid triggering DNS resolution.

## IP-CIDR / IP-CIDR6

Matches IP CIDR ranges, e.g., `IP-CIDR,192.168.1.0/24`. You can add `no-resolve` to avoid triggering DNS resolution.

## NETWORK

Matches network types, e.g., `tcp` matches TCP protocol, `udp` matches UDP protocol.

## PROTOCOL

PROTOCOL rules offer finer granularity than NETWORK rules. Supported protocols include:

- `TCP`
- `UDP`
- `HTTP`
- `TLS`
- `QUIC`
- `STUN`

## DST-PORT

Matches destination ports, e.g., `DST-PORT,80`.

## RULE-SET

When referencing a large number of rules, use the [Rule Set](/rules/rule-set).

## GEOSITE

[domain-list-community](https://github.com/v2fly/domain-list-community) is the domain list maintained by the v2fly community.

For example, `GEOSITE,twitter` matches the domains related to [Twitter](https://github.com/v2fly/domain-list-community/blob/master/data/twitter) company:

> [!WARNING]
> Domain-list-community data is not distributed with Stash. Stash will load
> domain data from github.com on first use as needed. Please ensure your current
> configuration can access github.com during the first use.

## PROCESS-NAME

Matches by process name, e.g., `PROCESS-NAME,Telegram`. Effective only for local processes.

`PROCESS-NAME` supports several matching modes:

- `PROCESS-NAME,Telegram` matches the executable file name.
- `PROCESS-NAME,Google*` matches the executable file name with `*` and `?`
  wildcards.
- `PROCESS-NAME,/usr/bin/ssh` matches the executable's full absolute path.
- `PROCESS-NAME,/Applications/ChatGPT.app/` matches executable paths by
  prefix, so it can cover all binaries inside the `ChatGPT.app` bundle.

The trailing slash in app bundle mode is required. Without it, a path starting
with `/` uses full-path exact matching.

> [!WARNING]
> Due to Network Extension limitations, Stash iOS/tvOS (including the iOS
> version running on Apple silicon devices) does not support PROCESS-NAME rules,
> and process-related rules in the configuration will be ignored.

## PROCESS-PATH

Matches by process path, e.g., `PROCESS-PATH,/Applications/Telegram.app/Contents/MacOS/Telegram`. Effective only for local processes.

> [!WARNING]
> Due to Network Extension limitations, Stash iOS/tvOS (including the iOS
> version running on Apple silicon devices) does not support PROCESS-PATH rules,
> and process-related rules in the configuration will be ignored.

## SCRIPT

Matches requests through a Python expression. The expression must return a Boolean value, and any expression execution errors will be ignored.

The expression can read the following variables:

```json
{
  "network": "string", // Can be tcp or udp
  "host": "string", // May be empty
  "dst_ip": "string", // May be empty
  "dst_port": "number",
  "src_ip": "string", // Effective only in gateway mode
  "src_port": "number" // Effective only in gateway mode
}
```

The expression can call the following functions:

```python
def resolve_ip(host: str) -> str:
    pass

def in_cidr(ip: str, cidr: str) -> bool:
    pass

def geoip(ip: str) -> str:
    pass

def ipasn(ip: str) -> int:
    pass

def match_provider(name: str) -> bool:
    pass

def match_geosite(name: str) -> bool:
    pass
```

For example, to intercept QUIC protocol requests, you can write:

```yaml
rules:
  - SCRIPT,quic,REJECT
  - SCRIPT,udp-cn,ProxyToCN

script:
  shortcuts: # Can be referenced in rules
    quic: network == 'udp' and dst_port == 443 # Matches QUIC protocol
    udp-cn: network == 'udp' and geoip(dst_ip if dst_ip != '' else resolve_ip(host)) == 'CN' # Matches UDP to CN
    instagram-quic: network == 'udp' and dst_port == 443 and match_geosite('instagram') # Matches Instagram's QUIC
```

## AND

When multiple rules need to be satisfied simultaneously, use the AND logical rule.

`AND,((#Rule1), (#Rule2), (#Rule3)...),PROXY`

> [!NOTE]
> In sub-rules, you can also add the `no-resolve` parameter to avoid triggering
> DNS resolution. For example: `AND,((IP-CIDR,192.168.1.110,no-resolve),
> (DOMAIN-SUFFIX,example.com), (DOMAIN-KEYWORD, xxx)), DIRECT`

## OR

When one of the rules needs to be satisfied, use the OR logical rule.

`OR,((#Rule1), (#Rule2), (#Rule3)...),PROXY`

## NOT

Negates a rule.

`NOT,((#Rule1)),PROXY`

> [!NOTE]
> Logical rules can be combined, for example:
> `AND,((NOT,((SRC-IP,192.168.1.110))),(DOMAIN,example.com)),DIRECT`

## USER-AGENT

Matches via User-Agent request header.

`USER-AGENT,AppleNews*,PROXY`

## URL-REGEX

Matches links using regular expressions.

`URL-REGEX,^https?:\/\/www\.amazon\.com\/(Amazon-Video|gp\/video)\/,PROXY`
