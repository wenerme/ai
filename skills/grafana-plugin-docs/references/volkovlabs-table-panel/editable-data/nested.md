---
title: "Nested objects | Grafana Plugins documentation"
description: "Learn how to work with nested objects in the Business Table panel to handle complex hierarchical data structures."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Nested objects

> Note
>
> The nested objects feature is supported starting from Business Table 1.5.0.

This feature lets you add, edit, and delete rows associated with a table cell. This feature is sometimes called **Comments**.

Developed to meet specific sponsor requirements, this feature holds significant potential for the broader open-source community, even in its current form.

## Highlights

- Nested objects/comments can be stored in any data source —the same as the table or a completely different one.
- You can add, edit, and delete nested objects/comments.
- You configure access to each action separately, and it can follow Grafana roles or backend configuration.
- The card that displays nested objects/comments supports Markdown.

## Example requirements

I will explain the feature using the following example.

Picture a table visualization used to display orders. Each order is associated with numerous events, and it’s the responsibility of the system users to input each event via the dashboard.

In this system, events follow a specific sequence: a status change from received to shipped to delivered, each accompanied by user notes, the event date, and the name of the user who recorded it.

The system has two types of users:

- Operators can only add new events.
- Supervisors can add, modify, and delete events.

The following image shows the Business Table panel on the dashboard with two orders. The order from Nick R. went through five status changes and has five records in the **order status** column. The order from Mary C. has two records in the **Order status** column.

[](/media/docs/grafana/panels-visualizations/business-table/example-1.png)

To work with all statuses (all records associated with a specific row), click the **Show All Order Status** link (see the preceding image). This opens a pop-up window, as shown in the following image.

[](/media/docs/grafana/panels-visualizations/business-table/example-2.png)

Note that you can add or edit only two fields (title and description) in the current feature design.

[](/media/docs/grafana/panels-visualizations/business-table/edit.png)

## PostgreSQL database configuration

The following example uses two tables:

- `orders`: Contains all placed orders.
- `order_status`: Contains all statuses as they change over time. Following the terminology established earlier, this table contains the nested objects or comments.

SQL to create the `orders` table:

SQL [Copy code to clipboard] Copy

```sql
create table orders
(
    order_id integer,
    order_num text,
    customer_name text,
    ordered_item_name text,
    destination_country text
);
```

SQL to create the `order_status` table:

SQL [Copy code to clipboard] Copy

```sql
create table order_status
(
    order_status_id integer,
    order_id integer,
    date timestamp default now(),
    title text,
    description text,
    user_name text
);
```

Data example in these tables.

The `orders` table.

[](/media/docs/grafana/panels-visualizations/business-table/orders.png)

The `order_status` table.

[](/media/docs/grafana/panels-visualizations/business-table/order-status.png)

SQL to populate the `orders` and `order_status` tables:

SQL [Copy code to clipboard] Copy

```sql

insert into order_status(order_status_id, order_id, date, title, description, user_name) values
                        (1, 1, '2024-10-04 13:27:00.00', 'received', 'The order is in the system, but no funds transferred yet.', 'bob.r');
insert into order_status(order_status_id, order_id, date, title, description, user_name) values
                        (2, 1, '2024-10-05 15:01:00.00', 'received', 'Error on our side, proceed with the order.', 'rob.b');
insert into order_status(order_status_id, order_id, date, title, description, user_name) values
                        (3, 1, '2024-10-06 15:01:00.00', 'packed', 'The order is moved to the next step', 'bob.r');
insert into order_status(order_status_id, order_id, date, title, description, user_name) values
                        (4, 1, '2024-10-06 21:11:00.00', 'shipped', 'The payment has been received.', 'bob.r');
insert into order_status(order_status_id, order_id, date, title, description, user_name) values
                        (5, 1, '2024-10-16 11:40:00.00', 'delivered', 'All good.', 'bob.r');
insert into order_status(order_status_id, order_id, date, title, description, user_name) values
                        (6, 2, '2024-10-04 08:30:00.00', 'received', 'The ordered item is not in stock until next month.', 'bob.r');
insert into order_status(order_status_id, order_id, date,  title, description, user_name) values
                        (7, 2, '2024-10-05 09:15:00.00', 'refunded', 'Full refund has been placed.', 'bob.r');
insert into order_status(order_status_id, order_id, date, title, description, user_name) values
                        (8, 3, '2024-10-05 08:30:00.00', 'received', 'The ordered item is ready for packing.', 'bob.r');
insert into order_status(order_status_id, order_id, date, title, description, user_name) values
                        (9, 3, '2024-10-05 09:15:00.00', 'packed', 'All good', 'bob.r');
insert into order_status(order_status_id, order_id, date, title, description, user_name) values
                        (10, 3, '2024-10-05 23:15:00.00', 'shipped', 'All good', 'bob.r');
insert into order_status(order_status_id, order_id, date, title, description, user_name) values
                        (11, 3, '2024-10-15 23:15:00.00', 'delivered', 'All good', 'bob.r');
```

## Grafana configuration

Start with the data frame configuration. In this example, the query returns all orders and the column containing the list of unique order status identifiers.

The example uses Grafana’s **Convert field type** transformation to ensure the array of status identifiers can be processed correctly.

[](/media/docs/grafana/panels-visualizations/business-table/query.png)

SQL to return data frame for the Business Table panel:

SQL [Copy code to clipboard] Copy

```sql
select *,
array_to_json(array(
  select order_status_id
  from order_status os
  where os.order_id = oo.order_id
)) as order_status
from orders oo order by oo.order_id;
```

In the Business Table **Layout** options:

1. Add a column to display the nested objects/comments.
2. Set its type to **Nested Objects**.
3. Select the configured **Object** from the list.

[](/media/docs/grafana/panels-visualizations/business-table/layout.png)

In the **Nested objects** category:

01. Add a column to display nested objects/comments.
02. Select a type. Only the **Card** type exists for now.
03. Configure the query to fetch the nested objects/comments initially in the **Get options**.
04. Specify a data source where your nested objects/comments are kept.
05. Create a query. In this example, I use the SQL query with predefined `${payload.ids:csv}` as a combined list of identifiers.
06. Ensure that **Id Field** is populated with the column name containing the unique comment identifier.
07. Configure the comment card. See below for more details.
08. Set the nested objects/comments sorting: **Show first**, **None**, **Show latest**.
09. Specify how many nested objects/comments to show at once.
10. Configure the allowed actions and user privileges. See below for more details.

[](/media/docs/grafana/panels-visualizations/business-table/nested.png)

SQL from the **Get Options &gt; Query Editor** parameter:

SQL [Copy code to clipboard] Copy

```sql
SELECT * FROM order_status WHERE order_status_id IN (${payload.ids:csv});
```

## Comment Card

To configure a comment card, identify the data frame column names to display. Starting from release 1.5.0, you can specify four column names. You can enter only the top and bottom **title** and **description** when adding or editing objects. Fields in the middle can display information such as dates, and the user login of who made changes.

[](/media/docs/grafana/panels-visualizations/business-table/card.png)

## Actions and permissions

You can allow three actions on nested objects/comments. All three actions are available in the pop-up window after you click the **Show All** link.

[](/media/docs/grafana/panels-visualizations/business-table/actions.png)

To configure actions and access:

1. In **Nested objects** &gt;Column name &gt; **Operations**, set the **Add Options**, **Update Options**, or **Delete Options** switch to ON.
2. Select the **Check** parameter. You have three options:

   - **By Org User Role**: Specify which roles have access to this action. This is a multi-select drop-down with the following values: **Admin**, **Editor**, **Viewer**, **None**.
   - **Always Allowed**: Any user has access to this action.
   - **By Backend**: Specify a data frame column name with a boolean type. If the returned value is **true**, access is granted. If the returned value is **false**, access is denied.

[](/media/docs/grafana/panels-visualizations/business-table/action-config.png)

### SQL example

#### Add action

SQL [Copy code to clipboard] Copy

```sql
INSERT INTO order_status (order_status_id, order_id, title, description)
VALUES (nextval('seq_order_status'), ${payload.row.order_id}, ${payload.item.title:sqlstring}, ${payload.item.description:sqlstring})
```

#### Update action

SQL [Copy code to clipboard] Copy

```sql
UPDATE order_status
SET title = ${payload.item.title:sqlstring}, description = ${payload.item.description:sqlstring}
WHERE order_status_id = ${payload.item.order_status_id};
```

#### Delete action

SQL [Copy code to clipboard] Copy

```sql
DELETE FROM order_status
WHERE order_status_id = ${payload.item.order_status_id};
```

## Working with non-standard data sources

In some cases, certain data sources may not fully align with the standard behavior described above. This is due to differences in how various data sources handle query execution and configuration.

For example, when using `Trino`, some internal parameters — such as `refId` — are not automatically passed in the payload. As a result, queries may not execute correctly or may fail altogether unless additional configuration is provided.

To work around this limitation, you may need to manually modify the JSON configuration file and explicitly define missing parameters like `refId`. Alternatively, other custom integration strategies may be required depending on the data source.

This is not considered a bug.

When configuring nested data source options in the Business Table panel, it relies on Grafana’s built-in `getdata sourceSrv` from `@grafana/runtime` to resolve and interact with data sources. The same mechanism is used when editing or executing queries.

In the case of data sources like PostgreSQL, parameters such as refId are automatically included by the data source plugin itself. However, for data sources like Trino, manual configuration may be necessary, as these plugins may not inject such values by default.

Custom handling isn’t implemented for each data source. Instead, the request is delegated to `usedata sourceRequest`, which consumes the full request configuration using the standard Grafana runtime.
