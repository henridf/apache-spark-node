
var java = require('./java');


function sparkConf(master, appName) {
    var SparkConf = java.import("org.apache.spark.SparkConf");
    var conf = new SparkConf();
    return conf;
}

function spark_parseArgs(args) {

    args =
        // fake presence of a main class so that SparkSubmitArguments doesn't
        // bail. (It won't be run)
        ['--class', 'org.apache.spark.repl.Main']
        .concat(args)
        .concat(['spark-shell']);

    var jArgs = java.newArray("java.lang.String", args);
    var NodeSparkSubmit = java.import("org.apache.spark.deploy.NodeSparkSubmit");
    NodeSparkSubmit.apply(jArgs);

}

var sqlc;


function sqlContext(args, assembly_jar) {
    if (sqlc) return sqlc;

    java.classpath.push(assembly_jar);
    spark_parseArgs(args);

    var SQLContext = java.import("org.apache.spark.sql.SQLContext");
    var SparkContext = java.import("org.apache.spark.SparkContext");

    var conf = sparkConf();
    var sc = new SparkContext(conf);

    // don't do INFO logging by default (should eventually expose this via
    // some API)
    var logger = java.import('org.apache.log4j.Logger');
    var level = java.import('org.apache.log4j.Level');
    logger.getRootLogger().setLevel(level.WARN);

    sqlc = new SQLContext(sc);

    return sqlc;
}

function sqlFunctions() {
    return java.import('org.apache.spark.sql.functions')
}

module.exports = {
    sqlContext: sqlContext,
    sqlFunctions: sqlFunctions
}
