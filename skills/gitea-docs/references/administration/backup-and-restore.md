---
date: "2017-01-01T16:00:00+02:00"
slug: "backup-and-restore"
sidebar_position: 11
aliases:
  - /en-us/backup-and-restore
---

# Backup and Restore

Gitea currently has a `dump` command that will save the installation to a ZIP file. This
file can be unpacked and used to restore an instance.

## Backup Consistency

To ensure the consistency of the Gitea instance, it must be shutdown during backup.

Gitea consists of a database, files and git repositories, all of which change when it is used. For instance, when a migration is in progress, a transaction is created in the database while the git repository is being copied over. If the backup happens in the middle of the migration, the git repository may be incomplete although the database claims otherwise because it was dumped afterwards. The only way to avoid such race conditions is by stopping the Gitea instance during the backups.

## Backup Command (`dump`)

Switch to the user running Gitea: `su git`. Run `./gitea dump -c /path/to/app.ini` in the Gitea installation
directory. There should be some output similar to the following:

```log
2016/12/27 22:32:09 Creating tmp work dir: /tmp/gitea-dump-417443001
2016/12/27 22:32:09 Dumping local repositories.../home/git/repositories
2016/12/27 22:32:22 Dumping database...
2016/12/27 22:32:22 Packing dump files...
2016/12/27 22:32:34 Removing tmp work dir: /tmp/gitea-dump-417443001
2016/12/27 22:32:34 Finish dumping in file gitea-dump-1482906742.zip
```

Inside the `gitea-dump-1482906742.zip` file, will be the following:

- `app.ini` - Optional copy of configuration file if originally stored outside the default `custom/` directory
- `custom/` - All config or customization files in `custom/`.
- `data/` - Data directory (APP_DATA_PATH), except sessions if you are using file session. This directory includes `attachments`, `avatars`, `lfs`, `indexers`, SQLite file if you are using SQLite.
- `repos/` - Complete copy of the repository directory.
- `gitea-db.sql` - SQL dump of database
- `log/` - Various logs. They are not needed for a recovery or migration.

Intermediate backup files are created in a temporary directory specified either with the
`--tempdir` command-line parameter or the `TMPDIR` environment variable.

## Backup the database

The SQL dump created by `gitea dump` uses XORM and Gitea admins may prefer to use the native the MySQL and PostgreSQL dump tools instead. There are still open issues when using XORM for dumping the database that may cause problems when attempting to restore it.

```sh
# mysql
mysqldump -u$USER -p$PASS --database $DATABASE > gitea-db.sql
# postgres
pg_dump -U $USER $DATABASE > gitea-db.sql
```

### Using Docker (`dump`)

There are a few caveats for using the `dump` command with Docker.

The command has to be executed with the `RUN_USER = <OS_USERNAME>` specified in `gitea/conf/app.ini`; and, for the zipping of the backup folder to occur without permission error the command `docker exec` must be executed inside of the `--tempdir`.

Example:

```bash
docker exec -u <OS_USERNAME> -it -w <--tempdir> $(docker ps -qf 'name=^<NAME_OF_DOCKER_CONTAINER>$') bash -c '/usr/local/bin/gitea dump -c </path/to/app.ini>'
```

\*Note: `--tempdir` refers to the temporary directory of the docker environment used by Gitea; if you have not specified a custom `--tempdir`, then Gitea uses `/tmp` or the `TMPDIR` environment variable of the docker container. For `--tempdir` adjust your `docker exec` command options accordingly.

The result should be a file, stored in the `--tempdir` specified, along the lines of: `gitea-dump-1482906742.zip`

## Restore Command (`restore`)

There is currently no support for a recovery command. It is a manual process that mostly
involves moving files to their correct locations and restoring a database dump.

Example:

```sh
unzip gitea-dump-1610949662.zip
cd gitea-dump-1610949662
mv app.ini /etc/gitea/conf/app.ini
mv data/* /var/lib/gitea/data/
mv log/* /var/lib/gitea/log/
mv repos/* /var/lib/gitea/data/repositories/
chown -R gitea:gitea /etc/gitea/conf/app.ini /var/lib/gitea

# mysql
mysql --default-character-set=utf8mb4 -u$USER -p$PASS $DATABASE <gitea-db.sql
# sqlite3
sqlite3 $DATABASE_PATH <gitea-db.sql
# postgres
psql -U $USER -d $DATABASE < gitea-db.sql

service gitea restart
```

Repository Git Hooks should be regenerated if installation method is changed (eg. binary -> Docker), or if Gitea is installed to a different directory than the previous installation.

With Gitea running, and from the directory Gitea's binary is located, execute: `./gitea admin regenerate hooks`

This ensures that application and configuration file paths in repository Git Hooks are consistent and applicable to the current installation. If these paths are not updated, repository `push` actions will fail.

If you still have issues, consider running `./gitea doctor check` to inspect possible errors (or run with `--fix`).

### Using Docker (`restore`)

There is also no support for a recovery command in a Docker-based gitea instance. The restore process contains the same steps as described in the previous section but with different paths.

Example:

```sh
# open bash session in container
docker exec --user git -it 2a83b293548e bash
# unzip your backup file within the container
unzip gitea-dump-1610949662.zip
cd gitea-dump-1610949662
# restore the gitea data
mv data/* /data/gitea
# restore the repositories itself
mv repos/* /data/git/repositories/
# adjust file permissions
chown -R git:git /data
# Regenerate Git Hooks
/usr/local/bin/gitea -c '/data/gitea/conf/app.ini' admin regenerate hooks
```

The default user in the gitea container is `git` (1000:1000). Please replace `2a83b293548e` with your gitea container id or name.

### Using Docker-rootless (`restore`)

The restore workflow in Docker-rootless containers differs only in the directories to be used:

```sh
# open bash session in container
docker exec --user git -it 2a83b293548e bash
# unzip your backup file within the container
unzip gitea-dump-1610949662.zip
cd gitea-dump-1610949662
# restore the app.ini
mv data/conf/app.ini /etc/gitea/app.ini
# restore the gitea data
mv data/* /var/lib/gitea
# restore the repositories itself
mv repos/* /var/lib/gitea/git/repositories
# adjust file permissions
chown -R git:git /etc/gitea/app.ini /var/lib/gitea
# Regenerate Git Hooks
/usr/local/bin/gitea -c '/etc/gitea/app.ini' admin regenerate hooks
```

### Using `gitea dump` to convert database types

The `gitea dump` command can produce a SQL file that can be read by another database type, which is useful to convert the database to another in case you did not choose the correct one during the first installation.

Note that this conversion process is not well-tested, which is why it is recommended to choose the final database type during the first installation without attempting to change it afterwards.

Stop the Gitea server, then make sure you have a full backup of your original database.

Before attempting the conversion, ensure that the original database is clean. Run `gitea doctor check --all --fix` and `gitea doctor recreate-table` to address common issues.

Use the `--database` flag to get a Gitea dump with the SQL file in the target format, in this example PostgreSQL: `gitea dump --database postgres`, then extract the file `gitea-db.sql` from the generated ZIP file.

Create the PostgreSQL Gitea user and Gitea database. Then, import the SQL file as the Gitea user into the Gitea database, using commands such as:

```sh
sudo -u postgres psql -d gitea
gitea=# SET synchronous_commit TO off
gitea=# SET on_error_stop TO on
gitea=# \i gitea-db.sql
```

Disabling `synchronous_commit` makes PostgreSQL less resilient to crashes, but makes the import a lot faster. Since we already have a backup of the original database and we can check that the import completes successfully, it should be a good trade-off.

After the import is completed, set up Gitea to use PostgreSQL and start the Gitea server again. Good luck!
