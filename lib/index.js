"use strict";

var java = require("./java");
var sqlContext_ = require("./sqlContext");
var functions = require("./functions");

function sparkConf() {
    var SparkConf = java.import("org.apache.spark.SparkConf");
    var conf = new SparkConf();
    return conf;
}

function spark_parseArgs(args) {
    var jArgs = java.newArray("java.lang.String", args);
    var NodeSparkSubmit = java.import("org.apache.spark.deploy.NodeSparkSubmit");
    NodeSparkSubmit.apply(jArgs);
}

var sc;

function sparkContext(args, assembly_jar) {
    if (sc) return sc;

    java.classpath.push(assembly_jar);
    spark_parseArgs(args);

    var SparkContext = java.import("org.apache.spark.SparkContext");

    var conf = sparkConf();
    sc = new SparkContext(conf);

    // don't do INFO logging by default (should eventually expose this via
    // some API)
    var logger = java.import("org.apache.log4j.Logger");
    var level = java.import("org.apache.log4j.Level");
    logger.getRootLogger().setLevel(level.WARN);

    return sc;
}

var jsc;

function javaSparkContext(args, assembly_jar) {
    if (jsc) return jsc;

    var sc = sparkContext(args, assembly_jar);

    var fromSparkContext = java.import("org.apache.spark.api.java.JavaSparkContext").fromSparkContext;

    jsc = fromSparkContext(sc);
    return jsc;
}


/**
 * Returns a {@link SQLContext} object.
 * @param args
 * @param assembly_jar
 */
function sqlContext(args, assembly_jar) {

    var sc = sparkContext(args, assembly_jar);
    var jsc = javaSparkContext(args, assembly_jar);

    return sqlContext_(sc, jsc);
}


/**
 * Returns the {@link Functions} class on which all functions are defined as static methods.
 */
var sqlFunctions = functions;


module.exports = {
    sparkContext: sparkContext,
    sqlContext: sqlContext,
    sqlFunctions: sqlFunctions
};
