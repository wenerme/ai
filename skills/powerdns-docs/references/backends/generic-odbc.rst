Generic ODBC Backend
====================

* Native: Yes
* Primary: Yes
* Secondary: Yes
* Producer: Yes
* Consumer: Yes
* Autosecondary: Yes
* DNS Update: Yes
* DNSSEC: Yes
* Disabled data: Yes
* Comments: Yes
* Search: Yes
* Views: No
* API: Read-Write
* :ref:`Multiple instances <setting-launch>`: Yes
* Zone caching: Yes
* Module name: godbc
* Launch name: ``godbc``

The Generic ODBC Backend (godbc) is a child of the Generic SQL (gsql)
backend, similar to the gmysql and gpgsql backends. It uses
`UnixODBC <https://www.unixodbc.org/>`__ and installed drivers to connect
to the databases supported by said drivers.

.. warning::
  When there is a more specific generic sql backend (like
  gmysql or gsqlite3), it is highly recommended to use that backend
  instead!

Enabling the backend
--------------------

When building PowerDNS yourself, append ``godbc`` to ``--with-modules``
or ``--with-dynmodules``. It is expected that most pre-built packages
contain this backend or be separately installable.

Configuration Parameters
------------------------

This section only details the configuration of PowerDNS for use with
ODBC. For ODBC related configuration, please see UnixODBC
website/documentation and the documentation for the driver you intend to
use.

.. _setting-godbc-datasource:

``godbc-datasource``
^^^^^^^^^^^^^^^^^^^^

-  String
-  Default: PowerDNS

The datasource (DSN) to use. This must be configured in the ``odbc.ini``
file, usually found in ``/etc/``, but this depends your local setup.

.. _setting-godbc-username:

``godbc-username``
^^^^^^^^^^^^^^^^^^

-  String
-  Default: powerdns

The user to connect to the datasource.

.. _setting-godbc-password:

``godbc-password``
^^^^^^^^^^^^^^^^^^

-  String
-  Default is empty

The password to connect with the datasource.

Connecting to Microsoft SQL Server
----------------------------------

.. note::
  In order to connect to Microsoft SQL Server, you will need at
  least version 3.2.0 of UnixODBC. FreeDTS has been tested with versions
  0.91 and 0.95.

Install the `FreeTDS <https://www.freetds.org/>`__ driver for UnixODBC,
either by compiling or getting it from our distribution's repository and
configure your ``/etc/odbcinst.ini`` with the driver, e.g.:

.. code-block:: ini

    [FreeTDS]
    Description=v0.95.8 with protocol v7.1
    Driver=/usr/local/lib/libtdsodbc.so
    UsageCount=1

And add the datasource to your ``/etc/odbc.ini``, e.g:

.. code-block:: ini

    [pdns1]
    Driver=FreeTDS
    Trace=No
    Server=server.example.net
    Port=1433
    Database=pdns-1
    TDS_Version=7.1

(For our tests, we add ``ClientCharset=UTF-8`` as well. YMMV.)

You can now test the connection with ``isql pdns1 USERNAME PASSWORD``.

Loading the schema into the database
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For convenience, a schema for MS SQL Server has been created: (Note:
This schema can also be found in the PowerDNS source as
``modules/godbcbackend/schema.mssql.sql``).

This is the schema for 4.3.
The `4.2 schema <https://github.com/PowerDNS/pdns/blob/rel/auth-4.2.x/modules/godbcbackend/schema.mssql.sql>`_ and `the 4.1 schema <https://github.com/PowerDNS/pdns/blob/rel/auth-4.1.x/modules/godbcbackend/schema.mssql.sql>`_ is available on GitHub.

.. Expanded literalinclude: ../../modules/godbcbackend/schema.mssql.sql

.. code-block:: SQL

  CREATE TABLE domains (
    id                    INT IDENTITY,
    name                  VARCHAR(255) NOT NULL,
    master                VARCHAR(128) DEFAULT NULL,
    last_check            INT DEFAULT NULL,
    type                  VARCHAR(8) NOT NULL,
    notified_serial       INT DEFAULT NULL,
    account               VARCHAR(40) DEFAULT NULL,
    options               VARCHAR(MAX) DEFAULT NULL,
    catalog               VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
  );

  CREATE UNIQUE INDEX name_index ON domains(name);
  CREATE INDEX catalog_idx ON domains(catalog);


  CREATE TABLE records (
    id                    INT IDENTITY,
    domain_id             INT DEFAULT NULL,
    name                  VARCHAR(255) DEFAULT NULL,
    type                  VARCHAR(10) DEFAULT NULL,
    content               VARCHAR(MAX) DEFAULT NULL,
    ttl                   INT DEFAULT NULL,
    prio                  INT DEFAULT NULL,
    disabled              BIT DEFAULT 0,
    ordername             VARBINARY(255) DEFAULT NULL,
    auth                  BIT DEFAULT 1,
    PRIMARY KEY (id)
  );

  CREATE INDEX nametype_index ON records(name,type);
  CREATE INDEX domain_id ON records(domain_id);
  CREATE INDEX recordorder ON records (domain_id, ordername);


  CREATE TABLE supermasters (
    ip                    VARCHAR(64) NOT NULL,
    nameserver            VARCHAR(255) NOT NULL,
    account               VARCHAR(40) NOT NULL,
    PRIMARY KEY (ip, nameserver)
  );


  CREATE TABLE comments (
    id                    INT IDENTITY,
    domain_id             INT NOT NULL,
    name                  VARCHAR(255) NOT NULL,
    type                  VARCHAR(10) NOT NULL,
    modified_at           INT NOT NULL,
    account               VARCHAR(40) NOT NULL,
    comment               VARCHAR(MAX) NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE INDEX comments_domain_id_idx ON comments (domain_id);
  CREATE INDEX comments_name_type_idx ON comments (name, type);
  CREATE INDEX comments_order_idx ON comments (domain_id, modified_at);


  CREATE TABLE domainmetadata (
    id                    INT IDENTITY,
    domain_id             INT NOT NULL,
    kind                  VARCHAR(32),
    content               VARCHAR(MAX),
    PRIMARY KEY (id)
  );

  CREATE INDEX domainmetadata_idx ON domainmetadata (domain_id, kind);

  CREATE TABLE cryptokeys (
    id                    INT IDENTITY,
    domain_id             INT NOT NULL,
    flags                 INT NOT NULL,
    active                BIT,
    published             BIT DEFAULT 1,
    content               VARCHAR(MAX),
    PRIMARY KEY(id)
  );

  CREATE INDEX domainidindex ON cryptokeys(domain_id);


  CREATE TABLE tsigkeys (
    id                    INT IDENTITY,
    name                  VARCHAR(255),
    algorithm             VARCHAR(50),
    secret                VARCHAR(255),
    PRIMARY KEY (id)
  );

  CREATE UNIQUE INDEX namealgoindex ON tsigkeys(name, algorithm);

Load this into the database as follows:

.. code-block:: bash

  cat schema.mssql.sql | tr '\n' ' ' | isql pdns1 USERNAME PASSWORD -b.

Loading records into the database
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Loading records is the same as with any SQL backend, just add them using
SQL-queries. Should you want to use :ref:`zone2sql <migration-zone2sql>`,
use the ``--sqlite`` option for correctly formatted SQL.

Configuring PowerDNS
^^^^^^^^^^^^^^^^^^^^

Add the options required to your ``pdns.conf``:

.. code-block:: ini

    launch=godbc
    godbc-datasource=pdns1
    godbc-username=USERNAME
    godbc-password=PASSWORD

Now restart PowerDNS and you're done. Just don't forget to add zones and
records to the database.

Possible issues
^^^^^^^^^^^^^^^

It might be that you need to compile FreeTDS with the
``--tds-version=7.1`` to connect to SQL Server.

When connecting to a database hosted with Microsoft Azure, FreeTDS must
be compiled with OpenSSL, use the ``--with-openssl`` configure flag.
