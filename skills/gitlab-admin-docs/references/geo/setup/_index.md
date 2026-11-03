# Setting up Geo

- Tier: Premium, Ultimate
- Offering: GitLab Self-Managed

Set up Geo to replicate a GitLab site to one or more secondary sites for
disaster recovery and to bring data closer to distributed teams. Geo works on
almost any supported GitLab architecture, but most deployments fit one of a few
common shapes. To get started quickly, find the scenario that matches your
deployment and follow the guide for it.

## Prerequisites

Before you set up Geo, confirm the following:

- Two (or more) independently working GitLab sites:
  - One GitLab site serves as the Geo primary site. Use the [GitLab reference architectures documentation](../../reference_architectures/_index.md) to set this up. You can use different reference architecture sizes for each Geo site. If you already have a working GitLab instance that is in-use, it can be used as a primary site.
  - The second GitLab site serves as the Geo secondary site. Use the [GitLab reference architectures documentation](../../reference_architectures/_index.md) to set this up. It's a good idea to sign in and test it. However, be aware that all of the data on the secondary are lost as part of the process of replicating from the primary site.

    > [!note]
    > Geo supports multiple secondaries. You can follow the same steps and make any changes accordingly.

- Administrator access for both sites. Many configuration tasks require root access to the sites and access to the **Admin** area in the GitLab UI.
- Ensure the primary site has a [GitLab Premium or Ultimate](https://about.gitlab.com/pricing/) subscription to unlock Geo. You only need one license for all the sites.
- Confirm the [requirements for running Geo](../_index.md#requirements-for-running-geo) are met by all sites. For example, sites must use the same GitLab version, and sites must be able to communicate with each other over certain ports.
- Confirm the primary and secondary site storage configurations match. If the primary Geo site uses object storage, the secondary Geo site must use it too. For more information, see [Geo with Object storage](../replication/object_storage.md).
- Ensure clocks are synchronized between the primary site and the secondary site. Synchronized clocks are required for Geo to function correctly. For example, if the clock drift between the primary and secondary sites exceeds 1 minute, replication fails.

## Choose your setup path

The following table lists the recommended guide for common deployments:

| Your deployment | Recommended guide |
| --- | --- |
| Single-node sites ([20 RPS / 1,000 user reference architecture](../../reference_architectures/1k_users.md)), Linux package or Docker, database managed by GitLab | [Set up Geo for two single-node sites](two_single_node_sites.md) |
| Single-node sites with external PostgreSQL (for example, Amazon RDS, Azure Database, or Google Cloud SQL) | [Set up Geo for two single-node sites (with external PostgreSQL services)](two_single_node_external_services.md) |
| Cloud-native hybrid with a single-node database | [Configure the GitLab chart with GitLab Geo](https://docs.gitlab.com/charts/advanced/geo/) |
| Cloud-native hybrid with an external highly available Patroni database | [Set up cloud-native hybrid sites with a Patroni database](#set-up-cloud-native-hybrid-sites-with-a-patroni-database) |

Cloud-native hybrid means you run GitLab in Kubernetes with the GitLab chart, but keep stateful components, such as PostgreSQL, outside the cluster.

If your deployment does not fit any of these rows, such as multi-node Linux package sites, see
[Other configurations](#other-configurations).

After you complete the guide that matches your deployment, you might need
[additional configuration](#additional-configuration) for LDAP, object storage,
and the container registry, depending on how you use GitLab.

## Set up cloud-native hybrid sites with a Patroni database

If your PostgreSQL databases run on a [Patroni](../../postgresql/replication_and_failover.md#patroni) cluster
outside Kubernetes, complete these steps in order:

1. Set up the databases with [Multi-node database replication](database.md#multi-node-database-replication)
   for the Patroni primary cluster, standby cluster, internal load balancer, and PgBouncer.
   On the secondary site, also [configure the Geo tracking database](../replication/multiple_servers.md#step-2-configure-the-geo-tracking-database-on-the-geo-secondary-site).
1. Deploy the chart with the [GitLab chart Geo guide](https://docs.gitlab.com/charts/advanced/geo/) for the application layer only.
   Skip its database steps.
   On each site, point `global.psql.host` at that site's PgBouncer endpoint,
   or at the load balancer in front of your PgBouncer nodes.
   Do not point it at individual database nodes.
   On the secondary site, point `global.geo.psql.host` at the tracking database endpoint.

On the Patroni database nodes, use `patroni_role`. Do not use the
`geo_primary_role` or `geo_secondary_role` convenience roles, which are intended
only for single-node sites.

The Linux package does not support a highly available Geo tracking database.
For high availability, use an external PostgreSQL service or a Patroni cluster that the Linux package does not manage.
For more information, see [configuring Patroni cluster for the tracking PostgreSQL database](database.md#configuring-patroni-cluster-for-the-tracking-postgresql-database).

## Other configurations

Use these configurations if your deployment does not match a row in the table.

### Multi-node Linux package sites

If one or more of your sites uses the [40 RPS / 2,000 user reference architecture](../../reference_architectures/2k_users.md) or larger, see [Set up Geo for multiple nodes](../replication/multiple_servers.md).

### Build a path from the general steps

If no guide matches your deployment, you can assemble a path from the
individual building blocks:

1. Set up the database replication based on your choice of PostgreSQL instances (`primary (read-write) <-> secondary (read-only)` topology):
   - [Using Linux package PostgreSQL instances](database.md).
   - [Using external PostgreSQL instances](external_database.md)
1. [Configure GitLab](../replication/configuration.md) to set the primary and secondary sites.
1. Follow the [Using a Geo Site](../replication/usage.md) guide.

## Additional configuration

Depending on how you use GitLab, the following configuration might be required:

- If the primary site uses object storage, [configure object storage replication](../replication/object_storage.md) for the secondary sites.
- If you use LDAP, [configure a secondary LDAP server](../../auth/ldap/_index.md) for the secondary sites.
  For more information, see [LDAP with Geo](../replication/single_sign_on.md#ldap).
- If you use the container registry, [configure the container registry for replication](../replication/container_registry.md) on the primary and secondary sites.
- To speed up troubleshooting, [configure correlation ID propagation](../replication/troubleshooting/common.md#tracing-requests-across-geo-sites).

You should [configure unified URLs](../secondary_proxy/_index.md#set-up-a-unified-url-for-geo-sites) to use a single, unified URL for all Geo sites.

## Geo and self-compiled installations

Geo is not supported when you use a [self-compiled GitLab installation](../../../install/self_compiled/_index.md).

## Post-installation documentation

After installing GitLab on the secondary sites and performing the initial configuration, see the [following documentation for post-installation information](../_index.md#post-installation-documentation).
