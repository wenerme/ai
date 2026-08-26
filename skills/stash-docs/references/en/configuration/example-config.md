---
description: 'A complete Stash YAML configuration example, explaining each field section by section — a working starting point for writing your own.'
---

# Configuration Example

All configuration files in Stash use [YAML](https://yaml.org/) format. In the YAML format, indentation affects the entire structure of the configuration, and users can check whether the configuration meets the YAML format on [www.yamllint.com](http://www.yamllint.com/).

A Stash configuration consists of a single configuration file and several [override files](./override). The configuration file is required, while the override files are optional. Override files have a higher priority than configuration files, and fields in the override files will override fields in the configuration files. Users can create configurations that meet their own needs through a combination of configuration and override files.

Although the configuration files are required, each field in them has default values, and users only need to fill in the fields they want to change.

```yaml
# Configuration based on https://github.com/Hackl0us/SS-Rule-Snippet

# Rule mode: rule / global / direct
mode: rule

# Set the log level. The default is silent, which prints nothing to avoid memory overflow caused by excessive logs.
# Available levels: silent / info / warning / error / debug. Higher levels output more logs and are more useful for debugging. Enable them only when needed.
log-level: info

# HTTP engine
http:
  # Force the HTTP engine to process TCP connections
  # Captured connections can use advanced features such as rewrites and scripts
  force-http-engine:
    - '*:80'
    - '*:4480' # BiliBili CDN
    - '*:9102' # BiliBili CDN

  # CA certificate encoded in PKCS #12
  ca: ''
  # Certificate password
  ca-passphrase: ''
  # Domains with MitM enabled. Make sure the CA certificate above is trusted by the system.
  mitm:
    - g.cn
    - '*.google.cn'
    - weather-data.apple.com # Enabled only for port 443 by default
    - weather-data.apple.com:* # Use a wildcard to enable all ports
    - '*.weather-data.apple.com' # Wildcards can also be used in domains
    - '-exclude.weather-data.apple.com' # Use the - prefix to exclude domains

  # HTTP(S) rewrite, supporting header, 302, 307, reject, and other strategies
  url-rewrite:
    - ^http://g\.cn http://www.google.com header # Rewrite the request header domain
    - ^https?://www\.google\.cn https://www.google.com 302 # Return a 302 redirect response directly
    - ^https?://ad\.example - reject # Reject the request

  # Rewrite HTTP(S) requests with JavaScript scripts
  script:
    - match: https://weather-data.apple.com/v2/weather/[\w-]+/-?[0-9]+\.[0-9]+/-?[0-9]+\.[0-9]+\?
      name: weather-us-aqi # Reference the script in script-providers
      type: response # Script type: request / response
      require-body: true # Set to true if the request / response body is needed
      timeout: 10 # script timeout in second (optional)
      argument: '' # script argument (optional)
      debug: false # Development mode. Load the latest script from the provider before each execution.
      binary-mode: false # Get the body in binary mode
      max-size: 1048576 # 1MB

# Scheduled tasks
cron:
  # Run JavaScript scripts on a schedule
  script:
    - name: weather-us-aqi # Reference the script in script-providers
      cron: '* * * * *' # Cron expression. See https://crontab.guru/ for more details.
      timeout: 10 # script timeout in second (optional)
      argument: '' # script argument (optional)
      debug: false # Development mode. Load the latest script from the provider before each execution.

script-providers:
  weather-us-aqi:
    url: https://raw.githubusercontent.com/STASH-NETWORKS-LIMITED/stash-example/main/script/iOS15_Weather_AQI_Standard.js
    interval: 86400

script:
  shortcuts: # Write custom rules with Python expressions
    # 4483 and 9305 are BiliBili QUIC CDN ports
    quic: network == 'udp' and (dst_port == 443 or dst_port == 4483 or dst_port == 9305) # Can be referenced in rules

# Wildcard domains are supported, such as *.clash.dev and *.foo.*.example.com
# Domains without wildcards have higher priority than wildcard domains, such as foo.example.com > *.example.com > .example.com
# Note: +.foo.com is equivalent to .foo.com and foo.com
hosts:
  '*.clash.dev': 127.0.0.1
  '.dev': 127.0.0.1
  'alpha.clash.dev': '::1'

# DNS server configuration
dns:
  # Resolves other DNS server hostnames; except for system, the server address must use an IP
  default-nameserver:
    - 'https://1.1.1.1/dns-query#h3=true' # DNS over HTTP/3
    - system # Use iOS system DNS
  # DNS services over UDP / TCP / DoT / DoH / DoH3 / DoQ are supported, and specific connection ports can be specified.
  # All DNS requests are sent directly to the server without going through any proxy.
  # Stash replies to DNS requests with the first resolved record it receives.
  nameserver:
    # Configuring more than 2 DNS servers is not recommended because it increases system power consumption.
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query
    - quic://dns.adguard.com:853
    - doq://test.dns.nextdns.io:853
    - system # Use iOS system DNS

  # Skip certificate verification to work around some compatibility issues: https://help.nextdns.io/t/g9hdkjz
  skip-cert-verify: true

  # Use separate DNS servers for some domains
  nameserver-policy:
    'www.baidu.com': 114.114.114.114
    '+.internal.crop.com': system
    '*.example.com':
      - https://dns.alidns.com/dns-query
      - https://doh.pub/dns-query
    'geosite:cn':
      - 223.5.5.5
      - 119.29.29.29

  # Domains in the following list will not be resolved to fake IPs. Queries for these domains return their real IP addresses.
  fake-ip-filter:
    # from: https://github.com/Kr328/ClashForAndroid/blob/ffa559a57102ed8bc20eba41aa236a7764741bf9/core/src/main/golang/native/config/defaults.go#L10

    # Stun Services
    - '+.stun.*.*'
    - '+.stun.*.*.*'
    - '+.stun.*.*.*.*'
    - '+.stun.*.*.*.*.*'

    # Google Voices
    - 'lens.l.google.com'

    # Nintendo Switch
    - '*.n.n.srv.nintendo.net'

    # PlayStation
    - '+.stun.playstation.net'

    # XBox
    - 'xbox.*.*.microsoft.com'
    - '*.*.xboxlive.com'

    # Microsoft
    - '*.msftncsi.com'
    - '*.msftconnecttest.com'

    # Bilibili CDN
    - '*.mcdn.bilivideo.cn'

proxies:
  # shadowsocks
  # Supported encryption methods:
  #   aes-128-gcm aes-192-gcm aes-256-gcm
  #   aes-128-cfb aes-192-cfb aes-256-cfb
  #   aes-128-ctr aes-192-ctr aes-256-ctr
  #   rc4-md5 chacha20 chacha20-ietf xchacha20
  #   chacha20-ietf-poly1305 xchacha20-ietf-poly1305
  - name: 'ss1'
    type: ss
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    cipher: chacha20-ietf-poly1305
    password: 'password'

  - name: 'ss2'
    type: ss
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    cipher: AEAD_CHACHA20_POLY1305
    password: 'password'
    plugin: obfs
    plugin-opts:
      mode: tls # Obfuscation mode, either http or tls
      host: bing.com # Obfuscation host, must match the server configuration

  - name: 'ss3'
    type: ss
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    cipher: AEAD_CHACHA20_POLY1305
    password: 'password'
    plugin: v2ray-plugin
    plugin-opts:
      mode: websocket # QUIC is not currently supported
      tls: true # wss
      skip-cert-verify: true
      host: bing.com
      path: '/'
      headers:
        custom: value

  # vmess
  # Supported encryption methods: auto / aes-128-gcm / chacha20-poly1305 / none
  - name: 'vmess'
    type: vmess
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    uuid: d0529668-8835-11ec-a8a3-0242ac120002
    alterId: 32
    cipher: auto
    tls: true
    skip-cert-verify: true
    servername: example.com # Takes precedence over wss host
    network: ws
    ws-opts:
      path: /path
      headers:
        Host: v2ray.com
      max-early-data: 2048
      early-data-header-name: Sec-WebSocket-Protocol

  - name: 'vmess-h2'
    type: vmess
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    uuid: d0529668-8835-11ec-a8a3-0242ac120002
    alterId: 32
    cipher: auto
    network: h2
    tls: true
    h2-opts:
      host:
        - http.example.com
        - http-alt.example.com
      path: /

  # tailscale (automatic onboarding with auth-key)
  - name: 'ts-main'
    type: tailscale
    auth-key: TAILSCALE_AUTH_KEY_EXAMPLE
    hostname: ts-main
    control-url: https://controlplane.tailscale.com
    exit-node: exit-gateway.example.ts.net # optional, auto-selects an available exit node when omitted

  # tailscale (leave auth-key empty and complete first-time authentication from the Tailscale page)
  - name: 'ts-main-interactive'
    type: tailscale
    # When auth-key is omitted, open the Tailscale page from the node menu in Stash and finish login there
    hostname: ts-main-interactive
    control-url: https://controlplane.tailscale.com
    exit-node: exit-gateway.example.ts.net # optional, auto-selects an available exit node when omitted

  - name: 'vmess-http'
    type: vmess
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    uuid: d0529668-8835-11ec-a8a3-0242ac120002
    alterId: 32
    cipher: auto
    network: http
    http-opts:
      method: 'GET'
      path:
        - '/'
        - '/video'
      headers:
        Connection:
          - keep-alive

  - name: 'vmess-grpc'
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    type: vmess
    uuid: d0529668-8835-11ec-a8a3-0242ac120002
    alterId: 32
    cipher: auto
    network: grpc
    tls: true
    servername: example.com
    skip-cert-verify: true
    grpc-opts:
      grpc-service-name: 'example'

  # socks5
  - name: 'socks'
    type: socks5
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    username: username
    password: password
    tls: true
    skip-cert-verify: true

  # http
  - name: 'http'
    type: http
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    username: username
    password: password
    tls: true # https
    skip-cert-verify: true

  # snell
  - name: 'snell'
    type: snell
    server: server
    port: 44046
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    psk: yourpsk
    version: 5
    reuse: true
    obfs-opts:
      mode: http # or tls
      host: bing.com

  # Trojan
  - name: 'trojan'
    type: trojan
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    password: yourpsk
    sni: example.com # Server Name Indication, uses server value if empty
    alpn:
      - h2
      - http/1.1
    skip-cert-verify: true

  # hysteria https://github.com/HyNetwork/hysteria/wiki/%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95
  - name: 'hysteria'
    type: hysteria
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    up-speed: 100 # Upload bandwidth in Mbps
    down-speed: 100 # Download bandwidth in Mbps
    auth-str: your-password
    # auth: CREDENTIAL_EXAMPLE # bytes encoded in base64
    protocol: '' # udp / wechat-video
    obfs: '' # obfs password
    sni: example.com # Server Name Indication, uses server value if empty
    alpn:
      - hysteria
    skip-cert-verify: true

  # ShadowsocksR
  # Supported encryption methods: all stream ciphers supported by SS
  # Supported obfuscation methods:
  #   plain http_simple http_post
  #   random_head tls1.2_ticket_auth tls1.2_ticket_fastauth
  # Supported protocols:
  #   origin auth_sha1_v4 auth_aes128_md5
  #   auth_aes128_sha1 auth_chain_a auth_chain_b
  - name: 'ssr'
    type: ssr
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    cipher: chacha20-ietf
    password: 'password'
    obfs: tls1.2_ticket_auth
    protocol: auth_sha1_v4
    obfs-param: domain.tld
    protocol-param: '#'

  - name: 'vless'
    type: vless
    server: server
    port: 443
    benchmark-url: http://www.apple.com
    benchmark-timeout: 5
    uuid: d0529668-8835-11ec-a8a3-0242ac120002
    flow: xtls-rprx-direct
    skip-cert-verify: true
    network: h2
    tls: true
    ws-opts:
      path: /path
      headers:
        Host: v2ray.com
    grpc-opts:
      grpc-service-name: 'example'
    h2-opts:
      host:
        - http.example.com
        - http-alt.example.com
      path: /

proxy-groups:
  # Proxy forwarding chain. Do not include relay in proxies. UDP is not supported.
  # Traffic: clash <-> http <-> vmess <-> ss1 <-> ss2 <-> Internet
  - name: 'relay'
    type: relay
    icon: https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Direct.png
    proxies:
      - http
      - vmess
      - ss1
      - ss2

  # url-test automatically selects the server with the lowest latency
  - name: 'auto'
    type: url-test
    proxies:
      - ss1
      - ss2
      - vmess
    interval: 300

  # fallback tries to follow the server order written by the user and automatically selects an available server
  - name: 'fallback-auto'
    type: fallback
    proxies:
      - ss1
      - ss2
      - vmess
    interval: 300

  # load-balance can keep requests for the same eTLD on the same proxy route
  - name: 'load-balance'
    type: load-balance
    proxies:
      - ss1
      - ss2
      - vmess
    interval: 300

  # select allows users to manually choose a proxy server or group
  # You can also use the RESTful API to switch servers, which is recommended for GUI clients
  - name: Proxy
    type: select
    proxies:
      - ss1
      - ss2
      - vmess
      - auto

  # SSID-based strategy, useful for selecting specific proxies in special network environments
  - name: ssid-group
    type: select # The type must be select for compatibility with the original Clash configuration
    proxies:
      - ss1
      - ss2
      - DIRECT
    ssid-policy:
      # Automatically switch to ss1 on Wi-Fi with SSID office
      # Automatically switch to ss2 on Wi-Fi with SSID home
      # Automatically switch to ss3 on cellular data
      # Other SSIDs default to DIRECT
      office: ss1
      home: ss2
      cellular: ss3
      default: DIRECT

  - name: UseProvider
    type: select
    use:
      - provider1
    proxies:
      - Proxy
      - DIRECT

proxy-providers:
  provider1:
    url: https://raw.githubusercontent.com/STASH-NETWORKS-LIMITED/stash-example/main/config.yaml
    path: ./providers/provider1.yaml
    interval: 3600
    headers:
      Authorization: Bearer your-token
      Accept: application/yaml

rule-providers:
  proxy-domain:
    behavior: domain # Use domain rule sets for more efficient matching
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt
    path: ./rules/proxy-domain.yaml
    interval: 86400

  proxy-domain-text:
    behavior: domain-text # The text format is recommended
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/surge-rules@release/proxy.txt
    interval: 86400

  lan-cidr:
    behavior: ipcidr
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt
    interval: 86400

  ip-cidr-text:
    behavior: ipcidr-text
    url: https://cdn.jsdelivr.net/gh/17mon/china_ip_list@master/china_ip_list.txt
    interval: 86400

  apple-direct:
    behavior: classical # classical rule sets are not recommended
    url: 'https://cdn.jsdelivr.net/gh/Hackl0us/SS-Rule-Snippet@master/Rulesets/Clash/Basic/Apple-direct.yaml'
    interval: 3600

rules:
  - SCRIPT,quic,REJECT,no-track
  - RULE-SET,proxy-domain,Proxy
  - RULE-SET,apple-direct,DIRECT
  - RULE-SET,lan-cidr,DIRECT
  - RULE-SET,ip-cidr-text,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,Proxy
```
