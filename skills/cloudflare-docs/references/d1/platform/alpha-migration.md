---
title: Alpha database migration guide
description: Migrate D1 alpha databases to the production-ready storage backend.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/d1/platform/alpha-migration.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Alpha database migration guide

Warning

D1 alpha databases stopped accepting live SQL queries on August 22, 2024.

D1's open beta launched in October 2023, and newly created databases use a different underlying architecture that is significantly more reliable and performant, with increased database sizes, improved query throughput, and reduced latency.

This guide will instruct you to recreate alpha D1 databases on our production-ready system.

## Prerequisites

1. You have the [wrangler command-line tool](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed
2. You are using `wrangler` version `3.33.0` or later (released March 2024) as earlier versions do not have the [\--remote flag](https://developers.cloudflare.com/d1/platform/release-notes/#2024-03-12) required as part of this guide
3. An 'alpha' D1 database. All databases created before July 27th, 2023 ([release notes](https://developers.cloudflare.com/d1/platform/release-notes/#2024-03-12)) use the alpha storage backend, which is no longer supported and was not recommended for production.

## 1\. Verify that a database is alpha

Terminal window

```

npx wrangler d1 info <database_name>


```

If the database is alpha, the output of the command will include `version` set to `alpha`:

```

...

│ version           │ alpha                                 │

...


```

## 2\. Create a manual backup

Terminal window

```

npx wrangler d1 backup create <alpha_database_name>


```

## 3\. Download the manual backup

The command below will download the manual backup of the alpha database as `.sqlite3` file:

Terminal window

```

npx wrangler d1 backup download <alpha_database_name> <backup_id> # See available backups with wrangler d1 backup list <database_name>


```

## 4\. Convert the manual backup into SQL statements

The command below will convert the manual backup of the alpha database from the downloaded `.sqlite3` file into SQL statements which can then be imported into the new database:

Terminal window

```

sqlite3 db_dump.sqlite3 .dump > db.sql


```

Once you have run the above command, you will need to edit the output SQL file to be compatible with D1:

1. Remove `BEGIN TRANSACTION` and `COMMIT;` from the file.
2. Remove the following table creation statement:  
```  
CREATE TABLE _cf_KV (  
   key TEXT PRIMARY KEY,  
   value BLOB  
) WITHOUT ROWID;  
```

## 5\. Create a new D1 database

All new D1 databases use the updated architecture by default.

Run the following command to create a new database:

Terminal window

```

npx wrangler d1 create <new_database_name>


```

## 6\. Run SQL statements against the new D1 database

Terminal window

```

npx wrangler d1 execute <new_database_name> --remote --file=./db.sql


```

## 7\. Delete your alpha database

To delete your previous alpha database, run:

Terminal window

```

npx wrangler d1 delete <alpha_database_name>


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/platform/alpha-migration/","name":"Alpha database migration guide"}}]}
```
