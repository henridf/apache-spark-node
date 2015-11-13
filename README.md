# apache-spark-node
node.js bindings for Apache Spark

# Usage

## Requirements

- Node (known to work with 0.12.7)
- Java 8 (This _should_ work with Java 7, but I haven't tested that yet (any
  confirmation that it works is welcome).
- Spark (known to work with 1.6). You'll need the Spark Assembly jar, which
  contains all of the Spark classes. If you don't have an existing
  installation, the easiest is to get the binaries from the
  [Spark downloads page](http://spark.apache.org/downloads.html) (choose
  "pre-built for Hadoop 2.6 and later"). Or you can download the Spark sources
  and build it yourself. More information
  [here](http://spark.apache.org/docs/latest/building-spark.html).


## Installing

`npm install apache-spark-node`


## Running

```shell
ASSEMBLY_JAR=/path/to/spark-assembly-1.6.0-SNAPSHOT-hadoop2.2.0.jar bin/node-spark
```



# Misc notes

This is all quite hacky, partly because it is an initial "learner's
prototype". But also because it comes with the self-imposed constraint of not
making modifications to the spark sources. For example, we can't add explicit
awareness of this shell to SparkSubmit.


## RDDs
Not supported.

## UDFs
We don't support them (yet). Is there a way to?
