#!/usr/bin/env bash

rm -rf ./org/apache/spark/deploy
scalac -classpath /Users/henridf/work/spark/assembly/target/scala-2.10/spark-assembly-1.6.0-SNAPSHOT-hadoop2.2.0.jar ./src/main/scala/NodeSparkSubmit.scala
