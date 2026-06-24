---
{
    "title": "Operating System Checks",
    "language": "en",
    "description": "Before deploying Doris, check and configure the operating system environment according to the checklist."
}
---

Before deploying Doris, complete the following operating system checks and configurations:

| Check item | Purpose |
|--------|------|
| Disable swap partition | Avoid kernel policies that affect performance |
| Disable Transparent Huge Pages (THP) | Prevent memory fragmentation and performance fluctuations |
| Increase virtual memory areas | Avoid running out of file handles |
| Disable CPU power-saving mode | Ensure stable performance under high load |
| Reset on network connection overflow | Avoid hanging connections under high concurrency |
| Open ports / disable firewall | Ensure communication between components |
| Increase the number of file handles | Support a large number of table data files |
| Install NTP service | Ensure metadata time accuracy < 5000ms |

## Disable Swap Partition

Disabling swap prevents the kernel from moving data to the swap partition, which would affect Doris performance.

**Temporary disable** (reverts after reboot):

```bash
swapoff -a
```

**Permanent disable**: comment out the swap line in `/etc/fstab` and reboot to take effect.

```bash
# /etc/fstab
# <file system>        <dir>         <type>    <options>             <dump> <pass>
tmpfs                  /tmp          tmpfs     nodev,nosuid          0      0
/dev/sda1              /             ext4      defaults,noatime      0      1
# /dev/sda2              none          swap      defaults              0      0
/dev/sda3              /home         ext4      defaults,noatime      0      2
```

## Disable Transparent Huge Pages

Disabling THP (Transparent Huge Pages) reduces memory fragmentation and ensures that Doris uses memory stably.

**Temporary disable**:

```bash
echo madvise > /sys/kernel/mm/transparent_hugepage/enabled
echo madvise > /sys/kernel/mm/transparent_hugepage/defrag
```

**Permanent disable**:

```bash
cat >> /etc/rc.d/rc.local << EOF
   echo madvise > /sys/kernel/mm/transparent_hugepage/enabled
   echo madvise > /sys/kernel/mm/transparent_hugepage/defrag
EOF
chmod +x /etc/rc.d/rc.local
```

## Increase Virtual Memory Areas

Increasing the VMA (virtual memory areas) prevents Doris from failing with `mmap` / `Cannot allocate memory` errors when the per-process VMA limit is exceeded.

```bash
cat >> /etc/sysctl.conf << EOF
vm.max_map_count = 2000000
EOF

sysctl -p
```

## Disable CPU Power-Saving Mode

Disabling power-saving mode ensures stable CPU frequency under high load. If the CPU does not support Scaling Governor, you can skip this step.

```bash
echo 'performance' | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

## Reset on Network Connection Overflow

Enabling `tcp_abort_on_overflow` immediately aborts connections when overflow occurs, avoiding long-hanging connections under high load.

```bash
cat >> /etc/sysctl.conf << EOF
net.ipv4.tcp_abort_on_overflow=1
EOF

sysctl -p
```

## Open Ports

If a port is unreachable, troubleshoot the firewall:

```bash
sudo systemctl stop firewalld.service
sudo systemctl disable firewalld.service
```

Or open the corresponding ports based on the Doris port configuration.

## Increase File Handle Limits

Doris relies on a large number of files to manage table data, so the file handle limit needs to be raised.

```bash
vi /etc/security/limits.conf
* soft nofile 1000000
* hard nofile 1000000
```

The session must be restarted after the change takes effect.

## Install NTP Service

Ensure that the clocks of all machines in the cluster are synchronized. The metadata time accuracy must be < 5000ms.

```bash
sudo systemctl start ntpd.service
sudo systemctl enable ntpd.service
```
