Generic MySQL/MariaDB  backend
==============================

* Native: Yes
* Primary: Yes
* Secondary: Yes
* Producer: Yes
* Consumer: Yes
* Autosecondary: Yes
* DNS Update: Yes
* DNSSEC: Yes (set ``gmysql-dnssec``)
* Disabled data: Yes
* Comments: Yes
* Search: Yes
* Views: No
* API: Read-Write
* :ref:`Multiple instances <setting-launch>`: Yes
* Zone caching: Yes
* Module name: gmysql
* Launch name: ``gmysql``

.. warning::
  If using MySQL with 'slave' support enabled in PowerDNS you
  **must** run MySQL with a table engine that supports transactions. In
  practice, great results are achieved with the 'InnoDB' tables. PowerDNS
  will silently function with non-transaction aware MySQLs but at one
  point this is going to harm your database, for example when an incoming
  zone transfer fails.

.. warning::
  While it is possible to run the Generic MySQL/MariaDB backend on top of MySQL/MariaDB
  views, we have received several reports of this causing performance
  problems and memory leaks.  Please know that when reporting problems when
  running PowerDNS on top of a modified schema, our open source support
  offering requires you to reproduce your problem on an unmodified schema without
  views.

The default schema is included at the bottom of this page.
:ref:`migration-zone2sql` with the ``--gmysql`` flag also
assumes this layout is in place. For full migration notes, please see
:doc:`../migration`. This schema contains all elements needed
for master, slave and superslave operation.

When using the InnoDB storage engine, we suggest adding foreign key
constraints to the tables in order to automate deletion of records, key
material, and other information upon deletion of a domain from the
domains table. The following SQL does the job:

.. Expanded literalinclude: ../../modules/gmysqlbackend/enable-foreign-keys.mysql.sql

.. code-block:: SQL

  /*
  Using this SQL causes Mysql to create foreign keys on your database. This will
  make sure that no records, comments or keys exists for domains that you already
  removed. This is not enabled by default, because we're not sure what the
  consequences are from a performance point of view. If you do have feedback,
  please let us know how this affects your setup.

  Please note that it's not possible to apply this, before you cleaned up your
  database, as the foreign keys do not exist.
  */
  ALTER TABLE records ADD CONSTRAINT `records_domain_id_ibfk` FOREIGN KEY (`domain_id`) REFERENCES `domains` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
  ALTER TABLE comments ADD CONSTRAINT `comments_domain_id_ibfk` FOREIGN KEY (`domain_id`) REFERENCES `domains` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
  ALTER TABLE domainmetadata ADD CONSTRAINT `domainmetadata_domain_id_ibfk` FOREIGN KEY (`domain_id`) REFERENCES `domains` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
  ALTER TABLE cryptokeys ADD CONSTRAINT `cryptokeys_domain_id_ibfk` FOREIGN KEY (`domain_id`) REFERENCES `domains` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

.. warning::
  Please note, however, that setting up these foreign key constraints prevents
  the PowerDNS database from being usable with mysql group replication, if you
  are using multiple servers.

Using MySQL/MariaDB replication
-------------------------------

To support ``NATIVE`` domains, the ``binlog_format`` for the MySQL/MariaDB
replication **must** be set to ``MIXED`` or ``ROW`` to prevent
differences in data between replicated servers. See `"Setting
The Binary Log
Format" <https://dev.mysql.com/doc/refman/5.7/en/binary-log-setting.html>`__
and `"Binary Log Formats" <https://mariadb.com/kb/en/binary-log-formats/>`__
for more information.

Otherwise, you will probably see:

::

  Cannot execute statement: impossible to write to binary log since BINLOG_FORMAT = STATEMENT and at least one table uses a storage engine limited to row-based logging.
  InnoDB is limited to row-logging when transaction isolation level is READ COMMITTED or READ UNCOMMITTED.

Settings
--------

.. _setting-gmysql-host:

``gmysql-host``
^^^^^^^^^^^^^^^

Host (ip address) to connect to. Mutually exclusive with :ref:`setting-gmysql-socket`.

.. warning::
  When specified as a hostname, a chicken/egg situation might
  arise where the database is needed to resolve the IP address of the
  database. It is best to supply an IP address of the database here.

.. _setting-gmysql-port:

``gmysql-port``
^^^^^^^^^^^^^^^

The port to connect to on :ref:`setting-gmysql-host`. Default: 3306.

.. _setting-gmysql-socket:

``gmysql-socket``
^^^^^^^^^^^^^^^^^

Connect to the UNIX socket at this path. Mutually exclusive with :ref:`setting-gmysql-host`.

.. _setting-gmysql-dbname:

``gmysql-dbname``
^^^^^^^^^^^^^^^^^

Name of the database to connect to. Default: "powerdns".

.. _setting-gmysql-user:

``gmysql-user``
^^^^^^^^^^^^^^^

User to connect as. Default: "powerdns".

.. _setting-gmysql-group:

``gmysql-group``
^^^^^^^^^^^^^^^^

Group to connect as. Default: "client".

.. _setting-gmysql-password:

``gmysql-password``
^^^^^^^^^^^^^^^^^^^

The password for :ref:`setting-gmysql-user`.

.. _setting-gmysql-dnssec:

``gmysql-dnssec``
^^^^^^^^^^^^^^^^^

Enable DNSSEC processing for this backend. Default: no.

.. _setting-gmysql-innodb-read-committed:

``gmysql-innodb-read-committed``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use the InnoDB READ-COMMITTED transaction isolation level. Default: yes.

.. _setting-gmysql-ssl:

``gmysql-ssl``
^^^^^^^^^^^^^^^^^^

.. deprecated:: 5.0.0

Before 5.0.0: Send the CLIENT_SSL capability flag to the server. SSL support is announced by the server via CLIENT_SSL and is enabled if the client returns the same capability. Default: no.

5.0.0 and up: this option does nothing. Use ``gmysql-group`` and put your TLS settings in ``my.cnf``.

.. _setting-gmysql-timeout:

``gmysql-timeout``
^^^^^^^^^^^^^^^^^^

The timeout in seconds for each attempt to read from, or write to the
server. A value of 0 will disable the timeout. Default: 10

.. _setting-gmysql-thread-cleanup:

``gmysql-thread-cleanup``
^^^^^^^^^^^^^^^^^^^^^^^^^

Older versions (such as those shipped on RHEL 7) of the MySQL/MariaDB client libraries leak memory unless applications explicitly report the end of each thread to the library. Enabling ``gmysql-thread-cleanup`` tells PowerDNS to call ``mysql_thread_end()`` whenever a thread ends.

Only enable this if you are certain you need to. For more discussion, see https://github.com/PowerDNS/pdns/issues/6231.

Default Schema
--------------

This is the 4.7 schema.

.. Expanded literalinclude: ../../modules/gmysqlbackend/schema.mysql.sql

.. code-block:: sql

  CREATE TABLE domains (
    id                    INT AUTO_INCREMENT,
    name                  VARCHAR(255) NOT NULL,
    master                VARCHAR(128) DEFAULT NULL,
    last_check            INT DEFAULT NULL,
    type                  VARCHAR(8) NOT NULL,
    notified_serial       INT UNSIGNED DEFAULT NULL,
    account               VARCHAR(40) CHARACTER SET 'utf8' DEFAULT NULL,
    options               VARCHAR(64000) DEFAULT NULL,
    catalog               VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
  ) Engine=InnoDB CHARACTER SET 'latin1';

  CREATE UNIQUE INDEX name_index ON domains(name);
  CREATE INDEX catalog_idx ON domains(catalog);


  CREATE TABLE records (
    id                    BIGINT AUTO_INCREMENT,
    domain_id             INT DEFAULT NULL,
    name                  VARCHAR(255) DEFAULT NULL,
    type                  VARCHAR(10) DEFAULT NULL,
    content               VARCHAR(64000) DEFAULT NULL,
    ttl                   INT DEFAULT NULL,
    prio                  INT DEFAULT NULL,
    disabled              TINYINT(1) DEFAULT 0,
    ordername             VARCHAR(255) BINARY DEFAULT NULL,
    auth                  TINYINT(1) DEFAULT 1,
    PRIMARY KEY (id)
  ) Engine=InnoDB CHARACTER SET 'latin1';

  CREATE INDEX nametype_index ON records(name,type);
  CREATE INDEX domain_id ON records(domain_id);
  CREATE INDEX ordername ON records (ordername);


  CREATE TABLE supermasters (
    ip                    VARCHAR(64) NOT NULL,
    nameserver            VARCHAR(255) NOT NULL,
    account               VARCHAR(40) CHARACTER SET 'utf8' NOT NULL,
    PRIMARY KEY (ip, nameserver)
  ) Engine=InnoDB CHARACTER SET 'latin1';


  CREATE TABLE comments (
    id                    INT AUTO_INCREMENT,
    domain_id             INT NOT NULL,
    name                  VARCHAR(255) NOT NULL,
    type                  VARCHAR(10) NOT NULL,
    modified_at           INT NOT NULL,
    account               VARCHAR(40) CHARACTER SET 'utf8' DEFAULT NULL,
    comment               TEXT CHARACTER SET 'utf8' NOT NULL,
    PRIMARY KEY (id)
  ) Engine=InnoDB CHARACTER SET 'latin1';

  CREATE INDEX comments_name_type_idx ON comments (name, type);
  CREATE INDEX comments_order_idx ON comments (domain_id, modified_at);


  CREATE TABLE domainmetadata (
    id                    INT AUTO_INCREMENT,
    domain_id             INT NOT NULL,
    kind                  VARCHAR(32),
    content               TEXT,
    PRIMARY KEY (id)
  ) Engine=InnoDB CHARACTER SET 'latin1';

  CREATE INDEX domainmetadata_idx ON domainmetadata (domain_id, kind);


  CREATE TABLE cryptokeys (
    id                    INT AUTO_INCREMENT,
    domain_id             INT NOT NULL,
    flags                 INT NOT NULL,
    active                BOOL,
    published             BOOL DEFAULT 1,
    content               TEXT,
    PRIMARY KEY(id)
  ) Engine=InnoDB CHARACTER SET 'latin1';

  CREATE INDEX domainidindex ON cryptokeys(domain_id);


  CREATE TABLE tsigkeys (
    id                    INT AUTO_INCREMENT,
    name                  VARCHAR(255),
    algorithm             VARCHAR(50),
    secret                VARCHAR(255),
    PRIMARY KEY (id)
  ) Engine=InnoDB CHARACTER SET 'latin1';

  CREATE UNIQUE INDEX namealgoindex ON tsigkeys(name, algorithm);
