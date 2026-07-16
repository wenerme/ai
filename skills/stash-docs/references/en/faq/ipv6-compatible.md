# IPv6 Compatibility

In most cases, you do not need to manually enable IPv6. Stash will automatically select the best connection strategy based on the IPv4/IPv6 status returned by the iOS/macOS system. When both IPv4 and IPv6 are available, Stash will initiate TCP handshakes with both IPv4 and IPv6 simultaneously, and select the first successful handshake connection for subsequent data transmission.

In the case of proxy server support for IPv6, due to Stash's use of the Fake IP mechanism, it will generally forward domain names to the proxy server as much as possible rather than IP requests. The choice between IPv4 and IPv6 at this time depends on the proxy server.

Due to the existence of the Fake IP mechanism, in most cases, Stash Tunnel will accept the routing of Fake IP and Stash will reverse lookup the domain name from the Fake IP. **Stash Tunnel only enables IPv4 by default**. For most HTTP(S) requests, even if you enter an IPv6 address directly, the request will not pass through Stash Tunnel due to the presence of an HTTP proxy. Under the above two mechanisms, Stash defaults to supporting:

- Accessing servers that only support IPv6 through domain names
- Directly accessing websites that only support IPv6 through IP

For cases where direct access via IPv6 and through Stash Tunnel is required (such as SSH, FTP, etc.), you need to enable "Network Settings - Enable Tunnel IPv6 Routing". **Please note that enabling this feature in a network environment that does not support IPv6 may cause compatibility issues.**
