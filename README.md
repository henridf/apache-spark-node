[![Build Status](https://travis-ci.org/henridf/apache-spark-node.svg?branch=master)](https://travis-ci.org/henridf/apache-spark-node) 
[![ghit.me](https://ghit.me/badge.svg?repo=henridf/apache-spark-node)](https://ghit.me/repo/henridf/apache-spark-node)

Apache Spark <=> Node.js
========================

Node.js bindings for Apache Spark.

**Table of Contents**

- [Status](#status)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Examples](#examples)
- [Misc notes](#misc-notes)


Status
------

This project is already usable in its present form, but it is still in early
stages and under development. APIs may change.

Notably not yet implemented are:

- support for user-defined functions
- jvm-side helpers to for functions/methods which cannot currently be called
  from node (for example because they take parameters types like `Seq`)



Getting started
---------------

### Requirements

- Linux or OS X (on Windows, there are currently problems building node add-ons)
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

#### From NPM

    $ npm install apache-spark-node

#### From source

Clone git repo, then:

    $ npm install
    $ npm run compile

### Running

Set ASSEMBLY_JAR to the location of your assembly JAR and run `spark-node` from the directory where you issued `npm install apache-spark-node`:
```shell
ASSEMBLY_JAR=/path/to/spark-assembly-1.6.0-SNAPSHOT-hadoop2.2.0.jar node_modules/apache-spark-node/bin/spark-node
```

### Docker

If you want to play with spark-node but don't want to download the
dependencies or build, you can run it in docker.

    $ docker run -it henridf/spark-node

This will take you to the normal `spark-node` shell. Optionally, you can map
host volumes to use files on your host system with `spark-node`. For example

    $ docker run -v /var/data:/data -it henridf/spark-node

will map the host's `/var/data` directory to `/data` within the Docker image. This means that you can use

    $ var df = sqlContext.read().json("/data/people.json")

to load a file at `/var/data/people.json` on the host system.



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

To see available command-line options, do `./bin/spark-node --help`.


### Creating a DataFrame

Load a dataframe from a json file:

    $ var df = sqlContext.read().json("./data/people.json")

Load a dataframe from a list of javascript objects:

    $ var df = sqlContext.createDataFrame([{"name":"Michael"}, {"name":"Andy", "age":30}, {"name":"Justin", "age": 19}])

Pretty-print dataframe contents to stdout:

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

collect the result (as an array of rows) and assign it to a javascript
variable:

    $ var res = df.select("name").collect()

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

    $ var lines = sqlContext.read().text("data/words.txt");

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



#### Running `spark-node` against a standalone cluster

When you run `bin/spark-node` without passing a `--master` argument, the
spark-node process runs a spark worker in the same process. To run the
spark-node shell against a cluser, use the `--master` argument. Here's an
example.

On a worker node, do the following:

    $ cd path/to/spark/distribution
    $ ./sbin/start-master.sh

Navigate to `http://hostname:8080` and get the Spark URL (top line), which
will be something like `spark://worker_hostname:7077`. Then start any number of
slaves on your cluster hosts by running `./sbin/start-slave.sh --master <spark_url>`.


Then on your client machine:

    $ cd path/to/apache-spark-node
    $ ./bin/spark-node --master <spark_url>


If you return to the master Web UI (`http://hostname:8080`), you should now
see an application with name "spark-node shell" under "Running
applications". Following that link gets you to the Web UI of the node-spark
shell itself.



Misc notes
----------

This was done under the self-imposed constraint of not making modifications to
the spark sources. This results in hacks like the `NodeSparkSubmit` Scala
class, which are workaround for the fact that we can't add explicit awareness
of this shell to SparkSubmit.



