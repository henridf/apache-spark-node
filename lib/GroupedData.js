"use strict";


class GroupedData {

    constructor(jvm_obj/*: SQLContext*/) {
        this.jvm_obj = jvm_obj;
    }

    /**
     * Compute aggregates by specifying a series of aggregate columns. Note that this function by
     * default retains the grouping columns in its output. To not retain grouping columns, set
     * `spark.sql.retainGroupColumns` to false.
     *
     * The available aggregate methods are defined in [[org.apache.spark.sql.functions]].
     *
     * {{{
     *   // Selects the age of the oldest employee and the aggregate expense for each department
     *
     *   // Scala:
     *   import org.apache.spark.sql.functions._
     *   df.groupBy("department").agg(max("age"), sum("expense"))
     *
     *   // Java:
     *   import static org.apache.spark.sql.functions.*;
     *   df.groupBy("department").agg(max("age"), sum("expense"));
     * }}}
     *
     * Note that before Spark 1.4, the default behavior is to NOT retain grouping columns. To change
     * to that behavior, set config variable `spark.sql.retainGroupColumns` to `false`.
     * {{{
     *   // Scala, 1.3.x:
     *   df.groupBy("department").agg($"department", max("age"), sum("expense"))
     *
     *   // Java, 1.3.x:
     *   df.groupBy("department").agg(col("department"), max("age"), sum("expense"));
     * }}}
     *
     * @since 1.3.0
     */
    agg(...expr /*: Column* */) /*: DataFrame*/ {
        return this.jvm_obj.agg(...expr);
    }

    /**
     * Count the number of rows for each group.
     * The resulting [[DataFrame]] will also contain the grouping columns.
     *
     * @since 1.3.0
     */
    count() /*: DataFrame */ {
        // run-time require is ugly workaround for issues with import cycle.
        var DataFrame = require("./DataFrame");
        return new DataFrame(this.jvm_obj.count());
    }

    /**
     * Compute the average value for each numeric columns for each group.
     * The resulting [[DataFrame]] will also contain the grouping columns.
     * When specified columns are given, only compute the average values for them.
     *
     * @since 1.3.0
     */
    avg(...colNames /*: String* */) /*: DataFrame*/ {
        return this.jvm_obj.mean(...colNames);
    }

    /**
     * Compute the max value for each numeric columns for each group.
     * The resulting [[DataFrame]] will also contain the grouping columns.
     * When specified columns are given, only compute the max values for them.
     *
     * @since 1.3.0
     */
    max(...colNames /*: String* */) /*: DataFrame*/ {
        return this.jvm_obj.max(...colNames);
    }

    /**
     * Compute the mean value for each numeric columns for each group. This is an alias for `avg`.
     * The resulting [[DataFrame]] will also contain the grouping columns.
     * When specified columns are given, only compute the mean values for them.
     *
     * @since 1.3.0
     */
    mean(...colNames /*: String* */) /*: DataFrame*/ {
        return this.jvm_obj.mean(...colNames);
    }

    /**
     * Compute the min value for each numeric column for each group.
     * The resulting [[DataFrame]] will also contain the grouping columns.
     * When specified columns are given, only compute the min values for them.
     *
     * @since 1.3.0
     */
    min(...colNames /*: String* */) /*: DataFrame*/ {
        return this.jvm_obj.min(...colNames);
    }

    /**
     * Compute the sum for each numeric columns for each group.
     * The resulting [[DataFrame]] will also contain the grouping columns.
     * When specified columns are given, only compute the sum for them.
     *
     * @since 1.3.0
     */
    sum(...colNames /*: String* */) /*: DataFrame*/ {
        return this.jvm_obj.sum(...colNames);
    }
}
module.exports = GroupedData;
