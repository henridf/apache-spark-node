
var java = require('./java');


function sparkConf(master, appName) {
    var SparkConf = java.import("org.apache.spark.SparkConf");
    var conf = new SparkConf();
    return conf;
}

function sqlContext(conf) {
    var SQLContext = java.import("org.apache.spark.sql.SQLContext");
    var SparkContext = java.import("org.apache.spark.SparkContext");

    // need to make idempotent? (like _ensure_initialized in pyspark/context.py)
    var sc = new SparkContext(conf);
    var sqlc = new SQLContext(sc);

    return sqlc;
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



function init(args, assembly_jar) {

    java.classpath.push(assembly_jar);
    spark_parseArgs(args);

    var conf = sparkConf();
    var sqlc = sqlContext(conf);

    return sqlc;
}

module.exports = {
    init: init
}
