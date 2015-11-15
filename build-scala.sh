#!/usr/bin/env bash

rm -rf ./org/apache/spark/deploy
scalac -classpath $ASSEMBLY_JAR ./src/main/scala/NodeSparkSubmit.scala
