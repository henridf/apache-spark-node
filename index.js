"use strict";

var fs = require("fs");
var path = require("path");

var spark = require("./js");
var functions = require("./js/functions");

module.exports = function (args) {

    var args =
        // fake presence of a main class so that SparkSubmitArguments doesn't
        // bail. (It won't be run)
        ["--class", "org.apache.spark.repl.Main",
            "--name", "spark-node shell"]
            .concat(args)
            .concat(["spark-shell"]);

    var assembly_jar = process.env.ASSEMBLY_JAR;

    if (typeof assembly_jar != "string" || !fs.statSync(path.join(assembly_jar)).isFile()) {
        console.error("Error: ASSEMBLY_JAR environment variable does not contain valid path");
        process.exit(1);
    }

    return {
        // don't expose sparkcontext until/if we support RDD's
        // sparkContext: spark.sparkContext(args, assembly_jar),
        sqlContext: spark.sqlContext(args, assembly_jar),
        sqlFunctions: functions()
    };
};
