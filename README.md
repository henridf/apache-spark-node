# apache-spark-node
node.js bindings for Apache Spark

Tested on OS X 10.11 xxx clarify java version ?



# Misc notes

This is all quite hacky, partly because it is an initial "learner's
prototype". But also because it comes with the self-imposed constraint of not
making modifications to the spark sources. For example, we can't add explicit
awareness of this shell to SparkSubmit.


## RDDs
Not supported.

## UDFs
We don't support them (yet). Is there a way to?
