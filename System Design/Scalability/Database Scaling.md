
## Scale Vertically [[Vertical Scaling]]

Vertical scaling, also known as scaling up, involves upgrading the hardware of a single database server to handle increased load. This can include adding more CPU, memory, or storage to improve performance and capacity. While vertical scaling is straightforward and requires no changes to the application, it has limitations, such as hardware constraints and potential downtime during upgrades.

To enhance reliability and minimize downtime, it's recommended to add a standby database. A standby database is a replica of the primary database that remains synchronized and can take over in case of failure. This setup ensures [[high availability]] and avoid [[Single Point of Failure]].

