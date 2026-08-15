---
date: "2026-08-13T00:00:00+00:00"
---

# Running Gitea with SELinux

Distributions such as Fedora, RHEL, CentOS Stream, Rocky Linux and AlmaLinux
ship SELinux in enforcing mode. Packages from a distribution repository come
with a policy that fits them, but an installation
[from binary](from-binary.md) or [from source](from-source.md) puts the binary
and the data in paths the policy knows nothing about, so the labels have to be
set by hand. The same applies to any other distribution where SELinux is
enabled.

Do not turn SELinux off to work around the problems below. `setenforce 0` is
useful to confirm that a failure really comes from SELinux, but switch it back
on with `setenforce 1` afterwards.

## Binding to a port below 1024

Gitea should not run as root, and an unprivileged process may not bind to a
port below 1024. Granting the capability to the binary with
`setcap 'cap_net_bind_service=+ep' /usr/local/bin/gitea` is often suggested,
but it is the least robust option:

- file capabilities are stored in an extended attribute of the binary, so they
  are lost every time the binary is replaced, which happens on every upgrade.
- the SELinux policy has to allow the capability for the label of the binary,
  and a binary in a path such as `/opt` usually does not carry a label that
  allows it.

Let systemd grant the capability to the process instead. It works with SELinux
in enforcing mode and survives upgrades, the sample unit file has the two lines
commented out:

```ini title="/etc/systemd/system/gitea.service"
[Service]
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_BIND_SERVICE
```

Reload and restart the service afterwards:

```sh
sudo systemctl daemon-reload
sudo systemctl restart gitea
```

If the capability still does not reach the process, add `PrivateUsers=false` to
the unit: the sandboxing runs the service in a user namespace where the
capability does not apply to the host.

Two alternatives avoid the privileged port altogether, and are what most
installations end up doing:

- put a [reverse proxy](../administration/reverse-proxies.md) in front of Gitea
  and let it own ports `80` and `443`.
- redirect the port in the firewall, for example with
  `firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=3000`.

## Labelling the binary and the data directory

If Gitea starts but cannot read its own files, or fails in ways that are not
explained by the file permissions, the labels are usually wrong. The tools come
from the `policycoreutils-python-utils` package.

Label the binary as an executable and the data directory as application state:

```sh
sudo semanage fcontext -a -t bin_t '/usr/local/bin/gitea'
sudo restorecon -v /usr/local/bin/gitea

sudo semanage fcontext -a -t var_lib_t '/var/lib/gitea(/.*)?'
sudo restorecon -Rv /var/lib/gitea
```

`semanage fcontext` records the rule, `restorecon` applies it to the files that
are already there. Use the two together rather than `chcon`, whose labels are
reverted by the next relabel of the file system.

Adjust the paths if the installation does not follow
[installation from binary](from-binary.md); the configuration in `/etc/gitea`
is read with the label distributions give to `/etc`, so it normally needs
nothing.

## Finding out what was denied

SELinux denials are written to the audit log, not to the Gitea log, so a
failure often looks like a permission problem without any further explanation:

```sh
sudo ausearch -m AVC -c gitea --start recent
```

If a denial shows up that the rules above do not cover, turn it into a local
policy module. Read what it allows before installing it, `audit2allow` writes
down whatever was denied, including the things that were denied for a good
reason:

```sh
sudo ausearch -c gitea --raw | audit2allow -M gitea-local
cat gitea-local.te
sudo semodule -i gitea-local.pp
```

If the denials point at a path Gitea should not be using at all, fix the path
instead of allowing the access.
