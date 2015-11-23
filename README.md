apache-spark-node
=================

Node.js bindings for Apache Spark.



(2015-11-22) WORK IN PROGRESS
----------------------------

This project should already be usable in its present form, but it is still
very early on. Notably not yet implemented are:

- tests
- support for user-defined functions
- jvm-side helpers to for functions/methods which cannot currently be called
  from node (because they take parameters types like `Seq`)

APIs are still likely to change.


Getting started
---------------

### Requirements

- Node: Developed with Node 0.12.7. Should work with later versions, but I haven't
  tested yet. Feedback from anyone trying out with other versions would be helpful.
- Java 8
- Spark >= 1.5. You'll need the Spark Assembly jar, which
  contains all of the Spark classes. If you don't have an existing
  installation, the easiest is to get the binaries from the
  [Spark downloads page](http://spark.apache.org/downloads.html) (choose
  "pre-built for Hadoop 2.6 and later"). Or you can download the Spark sources
  and build it yourself. More information
  [here](http://spark.apache.org/docs/latest/building-spark.html).


### Installing

`npm install apache-spark-node`

### Running

Set ASSEMBLY_JAR to the location of your assembly JAR and run `spark-node` from the directory where you issued `npm install apache-spark-node`:
```shell
ASSEMBLY_JAR=/path/to/spark-assembly-1.6.0-SNAPSHOT-hadoop2.2.0.jar node_modules/apache-spark-node/bin/spark-node
```

Usage
-----

(Note: This section is a quick overview of the available APIs in spark-node;
it is not general introduction to Spark or to DataFrames.)

Start the spark-node shell (this assumes you've that you've `ASSEMBLY_JAR` as
an environment variable):

    $ ./bin/spark-node

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


### Running SQL Queries Programmatically

Register `df` as a table named `people`:

    $ df.registerTempTable("people")

Run a SQL query:

    $ var teens = sqlContext.sql("SELECT name FROM people WHERE age >= 13 AND age <= 19")
    $ teens.show()


Examples
--------

#### Word count (aka 'big data hello world')

Create dataframe from text file:

    $ var lines = sqlContext.read().format("text").load("data/words.txt");

(_Note: support for the "text" format was added in Spark 1.6_).


Split strings into arrays:

    $ var F = sqlFunctions;
    $ var splits = lines.select(F.split(lines.col("value"), " ").as("words"));

Explode the arrays into individual rows:

    $ var occurrences = splits.select(F.explode(splits.col("words")).as("word"));

We now have a dataframe with one row per word occurrence. So we group
and count occurrences of the same word and we're done:

    $ var counts = occurrences.groupBy("word").count()

    $ counts.where("count>10").sort(counts.col("count")).show()


Misc notes
----------

This was done under the self-imposed constraint of not making modifications to
the spark sources. This results in hacks like the `NodeSparkSubmit` Scala
class, which are workaround for the fact that we can't add explicit awareness
of this shell to SparkSubmit.



