# Modify the memory limit of the iOS system for jailbroken devices

Jetsam is responsible for monitoring memory and performing OOM kills in iOS. In the default system configuration, different types of processes have different memory limits. In iOS 14 and earlier systems, the memory limit for Network Extension is 15 MB; while in iOS 15 and later, the memory limit for Network Extension has been increased to 50 MB.

For jailbroken users, it is possible to modify this value to allow Network Extension to use more memory. This configuration file is located at `/System/Library/LaunchDaemons/com.apple.jetsamproperties.{Model}.plist`.

After opening any file, search for the key `com.apple.networkextension.packet-tunnel` to find the limit for Network Extension. It is recommended to modify it to any value between 50 and 100. Both `ActiveHardMemoryLimit` and `InactiveHardMemoryLimit` need to be modified.

```xml
<key>com.apple.networkextension.packet-tunnel</key>
<dict>
    <key>ActiveHardMemoryLimit</key>
    <integer>50</integer>
    <key>InactiveHardMemoryLimit</key>
    <integer>50</integer>
    <key>JetsamPriority</key>
    <integer>14</integer>
</dict>
```

- Make sure to back up your data before proceeding.
- Different models of phones may have different configurations, and there may be multiple similar files. If you are unsure about the matching Model for your device, you can try modifying all relevant files.
- After making the modifications, you need to restart the iOS system for the changes to take effect.

You can find more information at the [github.com/eycorsican/jetsamproperties](https://github.com/eycorsican/jetsamproperties) project.
