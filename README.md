apache-spark-node
=================

Node.js bindings for the Apache Spark DataFrame APIs.


Getting started
---------------

### Requirements

- Node: Developed with Node 0.12.7. Should work with later versions, but I haven't
  tested yet. Feedback from anyone trying out with other versions would be helpful.
- Java: Developed with Java 8. Should work with Java 7, but I haven't tested
  that yet. Feedback from anyone trying out with Java 7 would be helpful.
- Spark (known to work with 1.6). You'll need the Spark Assembly jar, which
  contains all of the Spark classes. If you don't have an existing
  installation, the easiest is to get the binaries from the
  [Spark downloads page](http://spark.apache.org/downloads.html) (choose
  "pre-built for Hadoop 2.6 and later"). Or you can download the Spark sources
  and build it yourself. More information
  [here](http://spark.apache.org/docs/latest/building-spark.html).


### Installing

`npm install apache-spark-node`


### Running

Set ASSEMBLY_JAR to the location of your assembly JAR and run `node-spark`:
```shell
ASSEMBLY_JAR=/path/to/spark-assembly-1.6.0-SNAPSHOT-hadoop2.2.0.jar bin/node-spark
```

Usage
-----

(Note: This section is a quick overview of the available APIs in node-spark;
it is not general introduction to Spark or to DataFrames.)

Start the node-spark shell (this assumes you've that you've `ASSEMBLY_JAR` as
an environment variable):

    $ ./bin/node-spark

A `sqlContext` global object is available in the shell. Its functions are used to create
DataFrames, register DataFrames as tables, execute SQL over tables, cache
tables, and read parquet files.


### Creating a DataFrame

Load a dataframe from a json file:

    $ var df = sqlContext.read().json("./data/people.json")

Print its contents to stdout:

    $ df.show()

```
+----+-------+
| age|   name|
+----+-------+
|null|Michael|
|  30|   Andy|
|  19| Justin|
+----+-------+
```

### DataFrame Operations

Print the dataframe's schema in a tree format:

    $ df.printSchema()

Select only the "name" column:

    $ df.select(df.col("name")).show()

or the shorter (equivalent) version:

    $ df.select("name").show()

Select everybody and increment age by 1:

    $ df.select(df.col("name"), df.col("age").plus(1)).show()

Select people older than 21:

    $ df.filter(df.col("age").gt(21)).show()

Count people by age:

    $ df.groupBy("age").count().show()


### Dataframe functions

A `sqlFunctions` global object is available in the shell. It contains a
variety of built-in functions for operating on dataframes.

For example, to find the minimum and average of "age" across all rows:

    $ var F = sqlFunctions;

    $ df.agg(F.min(df.col("age")), F.avg(df.col("age"))).show()

#### API documentation

For a complete list of the types of operations that can be performed on a
DataFrame refer to the API Documentation.

There currently is no node-specific version, but the node bindings are
very similar to their counterparts in the "officially" supported languages
(Java, Python, R, Scala), so consulting those is the best route for
now. The docs are linked below for convenience.

Note that Scala, Python, and R APIs support a DSL-like way of writing
expressions with dataframes. For example, the above example that selects
people older than 21 could be written `df.filter(df['age'] > 21).show()`. The
Java API, like the (current) JavaScript API, does not have such a feature, and
so is the most useful one to consult for that portion of the API.


##### API documentation links

DataFrame API:
- [Scala API](http://spark.apache.org/docs/latest/api/scala/index.html#org.apache.spark.sql.DataFrame)
- [Java API](http://spark.apache.org/docs/latest/api/java/org/apache/spark/sql/DataFrame.html)
- [Python API](http://spark.apache.org/docs/latest/api/python/pyspark.sql.html#pyspark.sql.DataFrame)
- [R API](http://spark.apache.org/docs/latest/api/R/index.html)


DataFrame Functions:
- [Scala API](http://spark.apache.org/docs/latest/api/scala/index.html#org.apache.spark.sql.functions$)
- [Java API](http://spark.apache.org/docs/latest/api/java/org/apache/spark/sql/functions.html)
- [Python API](http://spark.apache.org/docs/latest/api/python/pyspark.sql.html#module-pyspark.sql.functions)
- [R API](http://spark.apache.org/docs/latest/api/R/index.html)


### Running SQL Queries Programmatically

Register `people` as a table:

    $ people.registerTempTable("people")

Run a SQL query:

    $ var teens = sqlContext.sql("SELECT name FROM people WHERE age >= 13 AND age <= 19")
    $ teens.show()

## Misc notes

This was done under the self-imposed constraint of not making modifications to
the spark sources. This results in hacks like the `NodeSparkSubmit` Scala
class, which are workaround for the fact that we can't add explicit awareness
of this shell to SparkSubmit.



