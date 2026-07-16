# Unable to Install Stash Mac Helper

Some users may encounter repeated prompts to install the Helper. Stash requires administrative privileges to install a Helper, otherwise Stash will not be able to set up the system proxy.

> [!WARNING]
> Some antivirus or cleaning software may prevent Stash Helper from running
> properly. Please make sure you are not using such software to block or clean
> Stash Mac.

## macOS 13 Ventura

In macOS 13, Apple introduced new background permission management. Incorrect configuration of this setting may cause Stash Helper to not function properly.

- In Mac's "System Preferences" - "General" - "Login Items" - "Allow in Background", please make sure the switches for `Stash` or `Stash Networks Limited` are enabled.

## Troubleshooting Steps

If you are still unable to install Stash Helper after performing the above steps, please try the following troubleshooting steps:

1. Open Terminal.

2. Run the following command to remove the Helper (enter your system password and press Enter).

```sh
sudo rm -rf /Library/PrivilegedHelperTools/ws.stash.app.mac.daemon.helper
```

3. Run the following command to enable the Helper (enter your system password and press Enter).

```sh
sudo /bin/launchctl load -w /Library/LaunchDaemons/ws.stash.app.mac.daemon.helper.plist
```

If prompted with `service already loaded` or `Operation already in progress`, you can ignore it.

4. Restart your computer.

5. Open Stash and reinstall the Helper (enter your system password).

Your Stash Helper should now be fixed. If it still does not work properly, please contact info@stash.ws.
