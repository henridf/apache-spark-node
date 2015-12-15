"use strict";


/**
 * A set of methods for aggregations on a {@link DataFrame}, created by {@link DataFrame#groupBy}.
 *
 * The main method is {@link GroupedData#agg}. This class also contains some
 * first order statistics (such as mean or sum) for convenience.
 *
 * @since 1.3.0
 */
class GroupedData {

    /**
     * **Note:** Do not use directly (see above).
     */
    constructor(jvm_obj/*: SQLContext*/) {
        this.jvm_obj = jvm_obj;
    }

    /**
     * Compute aggregates by specifying a series of aggregate columns. Note that this function by
     * default retains the grouping columns in its output. To not retain grouping columns, set
     * `spark.sql.retainGroupColumns` to false.
     *
     * The available aggregate functions are defined in {@link Functions}.
     *
     * @example
     * // Select the age of the oldest employee and the aggregate expense for each department
     * df.groupBy("department").agg(F.max("age"), F.sum("expense"));
     *
     * @param [expr=[]] list of columns to group by.
     *
     * @since 1.3.0
     */
    agg(...expr /*: Column* */) /*: DataFrame*/ {
        return this.jvm_obj.agg(...expr);
    }

    /**
     * Count the number of rows for each group.
     * The resulting {@link DataFrame} will also contain the grouping columns.
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
     * The resulting {@link DataFrame} will also contain the grouping columns.
     * When specified columns are given, only compute the average values for them.
     *
     * @param [colNames=[]] list of columns to compute mean over.
     * @since 1.3.0
     */
    avg(...colNames /*: String* */) /*: DataFrame*/ {
        return this.jvm_obj.mean(...colNames);
    }

    /**
     * Compute the max value for each numeric columns for each group.
     * The resulting {@link DataFrame} will also contain the grouping columns.
     * When specified columns are given, only compute the max values for them.
     *
     * @param [colNames=[]] list of columns to compute max over.
     * @since 1.3.0
     */
    max(...colNames /*: String* */) /*: DataFrame*/ {
        return this.jvm_obj.max(...colNames);
    }

    /**
     * Alias for {@link GroupedData#avg}.
     *
     * @param [colNames=[]] list of columns to compute mean over.
     *
     * @since 1.3.0
     */
    mean(...colNames /*: String* */) /*: DataFrame*/ {
        return this.jvm_obj.mean(...colNames);
    }

    /**
     * Compute the min value for each numeric column for each group.
     * The resulting {@link DataFrame} will also contain the grouping columns.
     * When specified columns are given, only compute the min values for them.
     *
     * @param [colNames=[]] list of columns to compute min over.
     *
     * @since 1.3.0
     */
    min(...colNames /*: String* */) /*: DataFrame*/ {
        return this.jvm_obj.min(...colNames);
    }

    /**
     * Compute the sum for each numeric columns for each group.
     * The resulting {@link DataFrame} will also contain the grouping columns.
     * When specified columns are given, only compute the sum for them.
     *
     * @param [colNames=[]] list of columns to compute sum over.
     *
     * @since 1.3.0
     */
    sum(...colNames /*: String* */) /*: DataFrame*/ {
        return this.jvm_obj.sum(...colNames);
    }
}
module.exports = GroupedData;
