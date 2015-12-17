"use strict";

var java = require("./java");
var Column = require("./Column");
var helpers = require("./helpers");
var F;

/**
 * Functions for manipulating {@link DataFrame}s.
 */
class Functions {

    /**
     * **Note:** Do not use directly. Access via {@link sqlFunctions}.
     */
    constructor() { }

    /**
     * Returns the {@link Column} with the given column name.
     *
     * @param colName
     * @since 1.3.0
     */
    static col(colName /*: String*/) /*: Column*/ {
        return F.col(colName);
    }

    /**
     * Returns a {@link Column} based on the given column name. Alias of {@link Functions.col}.
     *
     * @param colName
     * @since 1.3.0
     */
    static column(colName /*: String*/) /*: Column*/ {
        return new Column(F.column(colName));
    }

    /**
     * Creates a {@link Column} of literal value.
     *
     * The passed in object is returned directly if it is already a {@link Column}.
     * Otherwise, a new {@link Column} is created to represent the literal value.
     *
     * @param literal
     * @since 1.3.0
     */
    static lit(literal /*: Any* */) /*: Column*/ {
        return new Column(F.lit(literal));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Sort functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns a sort expression based on ascending order of the column.
     * @example
     *   // Sort by dept in ascending order, and then age in descending order.
     *   df.sort(F.asc("dept"), F.desc("age"));
     *
     * @param colName
     * @since 1.3.0
     */
    static asc(colName /*: String*/) /*: Column*/ {
        return new Column(F.asc(colName));
    }

    /**
     * Returns a sort expression based on the descending order of the column.
     * @example
     *   // Sort by dept in ascending order, and then age in descending order.
     *   df.sort(F.asc("dept"), F.desc("age"));
     *
     * @param colName
     * @since 1.3.0
     */
    static desc(colName /*: String*/) /*: Column*/ {
        return new Column(F.desc(colName));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Aggregate functions
    //////////////////////////////////////////////////////////////////////////////////////////////


    /**
     * **Aggregate function.** Returns the approximate number of distinct items in
     * a group.
     *
     * @param col
     * @since 1.3.0
     */
    static approxCountDistinct(col /*: Column*/, rsd=null /*: Double*/) /*: Column*/ {
        if (rsd === null) {
            return new Column(F.approxCountDistinct(col.jvm_obj, rsd));
        } else {
            return new Column(F.approxCountDistinct(col.jvm_obj));
        }
    }

    /**
     * **Aggregate function.** Returns an array of objects with duplicates.
     *
     * For now this is an alias for the `collect_list` Hive UDAF.
     *
     * @param col
     * @since 1.6.0
     */
    static collect_list(col /*: Column*/) /*: Column*/ {
        return new Column(F.collect_list(col.jvm_obj));
    }

    /**
     * **Aggregate function.** Returns a set of objects with duplicate elements eliminated.
     *
     * For now this is an alias for the `collect_set` Hive UDAF.
     *
     * @param col
     * @since 1.6.0
     */
    static collect_set(col /*: Column*/) /*: Column*/ {
        return new Column(F.collect_set(col.jvm_obj));
    }

    /**
     * **Aggregate function.** Returns the Pearson Correlation Coefficient for two columns.
     *
     * @param col1
     * @param col2
     * @since 1.6.0
     */
    static corr(col1 /*: Column | String*/, col2 /*: Column | String*/) /*: Column*/ {
        col1 = helpers.jobj_from_maybe_string(col1);
        col2 = helpers.jobj_from_maybe_string(col2);
        return new Column(F.corr(col1, col2));
    }

    /**
     * **Aggregate function.** Returns the number of items in a group.
     *
     * @param col
     * @since 1.3.0
     */
    static count(col /*: String | Column */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.count(col));
    }

    /**
     * **Aggregate function.** Returns the number of distinct items in a group.
     *
     * @param col
     * @param cols
     * @since 1.3.0
     */
    static countDistinct(col /*: Column | String */, ...cols /*: Column* | String* */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        if (cols.length === 0) {
            return new Column(F.countDistinct(col));
        } else {
            return new Column(F.countDistinct(col, cols));
        }
    }

    /**
     * **Aggregate function.** Returns the first value in a group.
     *
     * @param col
     * @since 1.3.0
     */
    static first(col /*: String | Column */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.first(col));
    }

    /**
     * **Aggregate function.** Returns the kurtosis of the values in a group.
     *
     * @param col
     * @since 1.6.0
     */
    static kurtosis(col /*: Column*/) /*: Column*/ {
        return new Column(F.kurtosis(col.jvm_obj));
    }

    /**
     * **Aggregate function.** Returns the last value in a group.
     *
     * @param col
     * @since 1.3.0
     */
    static last(col /*: String | Column */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.last(col));
    }

    /**
     * **Aggregate function.** Returns the maximum value of the expression in a group.
     *
     * @param col
     * @since 1.3.0
     */
    static max(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.max(col));
    }

    /**
     * **Aggregate function.** Returns the average of the values in a group.
     * Alias for {@link Functions.mean}.
     *
     * @param col
     * @since 1.4.0
     */
    static avg(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.avg(col));
    }

    /**
     * **Aggregate function.** Returns the average of the values in a group.
     * Alias for {@link Functions.avg}.
     *
     * @param col
     * @since 1.4.0
     */
    static mean(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.mean(col));
    }

    /**
     * **Aggregate function.** Returns the minimum value of the expression in a group.
     *
     * @param col
     * @since 1.3.0
     */
    static min(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.min(col));
    }

    /**
     * **Aggregate function.** Returns the skewness of the values in a group.
     *
     * @param col
     * @since 1.6.0
     */
    static skewness(col /*: Column*/) /*: Column*/ {
        return new Column(F.skewness(col.jvm_obj));
    }

    /**
     * **Aggregate function.** Alias for {@link Functions.stddev_samp}.
     *
     * @param col
     * @since 1.6.0
     */
    static stddev(col /*: Column*/) /*: Column*/ {
        return new Column(F.stddev(col.jvm_obj));
    }

    /**
     * **Aggregate function.** Returns the sample standard deviation of
     * the expression in a group.
     *
     * @param col
     * @since 1.6.0
     */
    static stddev_samp(col /*: Column*/) /*: Column*/ {
        return new Column(F.stddev(col.jvm_obj));
    }

    /**
     * **Aggregate function.** Returns the population standard deviation of
     * the expression in a group.
     *
     * @param col
     * @since 1.6.0
     */
    static stddev_pop(col /*: Column*/) /*: Column*/ {
        return new Column(F.stddev(col.jvm_obj));
    }

    /**
     * **Aggregate function.** Returns the sum of all values in the expression.
     *
     * @param col
     * @since 1.3.0
     */
    static sum(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.sum(col));
    }

    /**
     * **Aggregate function.** Returns the sum of distinct values in the expression.
     *
     * @param col
     * @since 1.3.0
     */
    static sumDistinct(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.sumDistinct(col));
    }

    /**
     * **Aggregate function.** Alias for {@link Functions.var_samp}.
     *
     * @param col
     * @since 1.6.0
     */
    static variance(col /*: Column*/) /*: Column*/ {
        return new Column(F.variance(col.jvm_obj));
    }

    /**
     * **Aggregate function.** Returns the unbiased variance of the values in a group.
     *
     * @param col
     * @since 1.6.0
     */
    static var_samp(col /*: Column*/) /*: Column*/ {
        return new Column(F.var(col.jvm_obj));
    }

    /**
     * **Aggregate function.** Returns the population variance of the values in a group.
     *
     * @param col
     * @since 1.6.0
     */
    static var_pop(col /*: Column*/) /*: Column*/ {
        return new Column(F.var(col.jvm_obj));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Window functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * **Window function.** Returns the cumulative distribution of values within a window partition,
     * i.e. the fraction of rows that are below the current row.
     *
     * This is equivalent to the CUME_DIST function in SQL.
     *
     * @since 1.4.0
     */
    static cumeDist() /*: Column*/ {
        return new Column(F.cumeDist());
    }

    /**
     * **Window function.** Returns the rank of rows within a window partition, without any gaps.
     *
     * The difference between rank and denseRank is that denseRank leaves no gaps in ranking
     * sequence when there are ties. That is, if you were ranking a competition using denseRank
     * and had three people tie for second place, you would say that all three were in second
     * place and that the next person came in third.
     *
     * This is equivalent to the DENSE_RANK function in SQL.
     *
     * @since 1.4.0
     */
    static denseRank() /*: Column*/ {
        return new Column(F.denseRank());
    }

    /**
     * **Window function.** Returns the value that is `offset` rows before the
     * current row, and `null` (or optional `defaultValue`, if provided) if
     * there is less than `offset` rows before the current row. For example,
     * an `offset` of one will return the previous row at any given point in
     * the window partition.
     *
     * This is equivalent to the LAG function in SQL.
     *
     * @param col
     * @param offset
     * @param [defaultValue=null]
     * @since 1.4.0
     */
    static lag(col /*: Column | String */, offset /*: Int*/, defaultValue=null /*: Any*/) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        if (defaultValue == null) {
            return new Column(F.lag(col, offset));
        } else {
            return new Column(F.lag(col, offset, defaultValue));
        }
    }


    /**
     * **Window function.** Returns the value that is `offset` rows after the
     * current row, and null (or optional `defaultValue`, if provided) if
     * there is less than `offset` rows after the current row. For example, an
     * `offset` of one will return the next row at any given point in the
     * window partition.
     *
     * This is equivalent to the LEAD function in SQL.
     *
     * @param col
     * @param offset
     * @param [defaultValue=null]
     * @since 1.4.0
     */
    static lead(col /*: String*/, offset /*: Int*/, defaultValue=null /*: Any*/) /*: Column*/ {
        if (defaultValue == null) {
            return new Column(F.lead(col.jvm_obj, offset));
        } else {
            return new Column(F.lead(col.jvm_obj, offset, defaultValue));
        }
    }


    /**
     * **Window function.** Returns the ntile group id (from 1 to `n` inclusive) in an ordered window
     * partition. Fow example, if `n` is 4, the first quarter of the rows will get value 1, the second
     * quarter will get 2, the third quarter will get 3, and the last quarter will get 4.
     *
     * This is equivalent to the NTILE function in SQL.
     *
     * @param n
     * @since 1.4.0
     */
    static ntile(n /*: Int*/) /*: Column*/ {
        return new Column(F.ntile(n));
    }

    /**
     * **Window function.** Returns the relative rank (i.e. percentile) of rows within a window partition.
     *
     * This is computed by :
     *   (rank of row in its partition - 1) / (number of rows in the partition - 1)
     *
     * This is equivalent to the PERCENT_RANK function in SQL.
     *
     * @since 1.4.0
     */
    static percentRank() /*: Column*/ {
        return new Column(F.percentRank());
    }

    /**
     * **Window function.** Returns the rank of rows within a window partition.
     *
     * The difference between rank and denseRank is that denseRank leaves no gaps in ranking
     * sequence when there are ties. That is, if you were ranking a competition using denseRank
     * and had three people tie for second place, you would say that all three were in second
     * place and that the next person came in third.
     *
     * This is equivalent to the RANK function in SQL.
     *
     * @since 1.4.0
     */
    static rank() /*: Column*/ {
        return new Column(F.rank());
    }

    /**
     * **Window function.** Returns a sequential number starting at 1 within a window partition.
     *
     * This is equivalent to the ROW_NUMBER function in SQL.
     *
     * @since 1.4.0
     */
    static rowNumber() /*: Column*/ {
        return new Column(F.rowNumber());
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Non-aggregate functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Computes the absolute value of the given column.
     *
     * @param col
     * @since 1.3.0
     */
    static abs(col /*: Column*/) /*: Column*/ {
        return new Column(F.abs(col.jvm_obj));
    }

    /**
     * Creates a new array column. The input columns must all have the same data type.
     *
     * @param cols
     * @since 1.4.0
     */
    // xxx this function currently can't take strings, because the corresponding Scala
    // function is lacking a @scala.annotation.varargs annotation
    // https://issues.apache.org/jira/browse/SPARK-11897
    static array(...cols /*: Column* */) /*: Column*/ {
        return new Column(F.array(...cols));
    }

    /**
     * Marks a DataFrame as small enough for use in broadcast joins.
     *
     * The following example marks the right DataFrame for broadcast hash join using `joinKey`.
     * @example
     *   // left and right are DataFrames
     *   left.join(F.broadcast(right), "joinKey");
     *
     * @param dataframe
     * @since 1.5.0
     */
    static broadcast(df /*: DataFrame*/) /*: DataFrame*/ {
        return new Column(F.broadcast(df));
    }

    /**
     * Returns the first column that is not null, or null if all inputs are null.
     *
     * For example, `coalesce(a, b, c)` will return a if a is not null,
     * or b if a is null and b is not null, or c if both a and b are null but c is not null.
     *
     * @param cols
     * @since 1.3.0
     */
    static coalesce(...cols /*: Column* */) /*: Column*/ {
        return new Column(F.coalesce(...cols));
    }

    /**
     * Creates a string column for the file name of the current Spark task.
     *
     */
    static inputFileName() /*: Column*/ {
        return new Column(F.inputFileName());
    }

    /**
     * Return true iff the column is NaN.
     *
     * @param col
     * @since 1.5.0
     */
    static isNaN(col /*: Column*/) /*: Column*/ {
        return new Column(F.isNaN(col.jvm_obj));
    }

    /**
     * A column expression that generates monotonically increasing 64-bit integers.
     *
     * The generated ID is guaranteed to be monotonically increasing and unique, but not consecutive.
     * The current implementation puts the partition ID in the upper 31 bits, and the record number
     * within each partition in the lower 33 bits. The assumption is that the data frame has
     * less than 1 billion partitions, and each partition has less than 8 billion records.
     *
     * As an example, consider a {@link DataFrame} with two partitions, each with 3 records.
     * This expression would return the following IDs /*:
     * 0, 1, 2, 8589934592 (1L << 33), 8589934593, 8589934594.
     *
     * @since 1.4.0
     */
    static monotonicallyIncreasingId() /*: Column*/ {
        return new Column(F.monotonicallyIncreasingId());
    }

    /**
     * Returns col1 if it is not NaN, or col2 if col1 is NaN.
     *
     * Both inputs should be floating point columns (DoubleType or FloatType).
     *
     * @param col1
     * @param col2
     * @since 1.5.0
     */
    static nanvl(col1 /*: Column*/, col2 /*: Column*/) /*: Column*/ {
        return new Column(F.nanvl(col1, col2));
    }

    /**
     * Unary minus, i.e. negate the expression.
     * @example
     *   // Select the amount column and negates all values.
     *   df.select(F.negate(df.col("amount")));
     *
     * @param col
     * @since 1.3.0
     */
    static negate(col /*: Column*/) /*: Column*/ {
        return new Column(F.negate(col.jvm_obj));
    }

    /**
     * Inversion of boolean expression, i.e. NOT.
     * @example
     *   df.filter(F.not(df.col("isActive")));
     *
     * @param col
     * @since 1.3.0
     */
    static not(col /*: Column*/) /*: Column*/ {
        return new Column(F.not(col.jvm_obj));
    }

    /**
     * Generate a random column with i.i.d. samples from U[0.0, 1.0].
     *
     * @param [seed]
     * @since 1.4.0
     */
    static rand(seed=null /*: Long*/) /*: Column*/ {
        if (seed === null) {
            return new Column(F.rand());
        } else {
            return new Column(F.rand(seed));
        }
    }

    /**
     * Generate a column with i.i.d. samples from the standard normal
     * distribution.
     *
     * @param [seed]
     * @since 1.4.0
     */
    static randn(seed=null /*: Long*/) /*: Column*/ {
        if (seed === null) {
            return new Column(F.randn());
        } else {
            return new Column(F.randn(seed));
        }
    }

    /**
     * Partition ID of the Spark task.
     *
     * Note that this is indeterministic because it depends on data
     * partitioning and task scheduling.
     *
     * @since 1.4.0
     */
    static sparkPartitionId() /*: Column*/ {
        return new Column(F.sparkPartitionId());
    }

    /**
     * Computes the square root of the specified float Colum.
     *
     * @param col
     * @since 1.3.0
     */
    static sqrt(col /*: Column | String*/) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.sqrt(col));
    }

    /**
     * Creates a new struct column.
     * If the input column is a column in a {@link DataFrame}, or a derived column expression
     * that is named (i.e. aliased), its name is the StructField's name,
     * otherwise, the newly generated StructField's name is auto generated as col${index + 1},
     * i.e. col1, col2, col3, ...
     *
     * @param cols
     * @since 1.4.0
     */
    // xxx this function currently can't take strings, because the corresponding Scala
    // function is lacking a @scala.annotation.varargs annotation
    // https://issues.apache.org/jira/browse/SPARK-11897
    static struct(...cols /*: Column* */) /*: Column*/ {
        return new Column(F.struct(...cols));
    }


    /**
     * Evaluates an array of conditions and returns one of multiple possible result expressions.
     * If otherwise is not defined at the end, null is returned for unmatched conditions.
     *
     * @example
     *   // Example: encoding gender string column into integer.
     *
     *   people.select(F.when(col("gender").equalTo("male"), 0))
     *     .when(col("gender").equalTo("female"), 1)
     *     .otherwise(2));
     *
     * @param condition Column.
     * @since 1.4.0
     */
    static when(condition /*: Column*/, value /*: Any*/) /*: Column*/ {
        return new Column(F.when(condition, value));
    }

    /**
     * Computes bitwise NOT.
     *
     * @param col
     * @since 1.4.0
     */
    static bitwiseNOT(col /*: Column*/) /*: Column*/ {
        return new Column(F.bitwiseNOT(col.jvm_obj));
    }

    /**
     * Parses the expression string into the column that it represents, similar to
     * DataFrame.selectExpr
     * @example
     *   // get the number of words of each length
     *   df.groupBy(F.expr("length(word)")).count();
     * @param expr Expression string.
     */
    static expr(expr /*: String*/) /*: Column*/ {
        return new Column(F.expr(expr));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Math Functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Computes the cosine inverse of the given column; the returned angle is in the range
     * 0.0 through pi.
     *
     * @param col
     * @since 1.4.0
     */
    static acos(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.acos(col));
    }

    /**
     * Computes the sine inverse of the given column; the returned angle is in the range
     * -pi/2 through pi/2.
     *
     * @param col
     * @since 1.4.0
     */
    static asin(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.asin(col));
    }

    /**
     * Computes the tangent inverse of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static atan(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.atan(col));
    }

    /**
     * Returns the angle theta from the conversion of rectangular coordinates
     * (x, y) to polar coordinates (r, theta). At least one param must be a
     * {@link Column}, the second one can be either a Number or a Column.
     *
     * @param l
     * @param r
     * @since 1.4.0
     */
    static atan2(l /*: Column|String|Double */, r /*: Column|String|Double */) /*: Column*/ {
        l = l.jvm_obj || l;
        r = r.jvm_obj || r;
        return new Column(F.atan2(l, r));
    }

    /**
     * An expression that returns the string representation of the binary value of the given long
     * column. For example, bin("12") returns "1100".
     *
     * @param col
     * @since 1.5.0
     */
    static bin(col /*: Column | String */) /*: Column*/ {
        return new Column(F.bin(col));
    }

    /**
     * Computes the cubic root of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static cbrt(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.cbrt(col));
    }

    /**
     * Computes the ceiling of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static ceil(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.ceil(col));
    }

    /**
     * Convert a number in a string column from one base to another.
     *
     * @param col
     * @param fromBase
     * @param toBase
     * @since 1.5.0
     */
    static conv(col /*: Column*/, fromBase /*: Int*/, toBase /*: Int*/) /*: Column*/ {
        return new Column(F.conv(col.jvm_obj /*: Column*/, fromBase, toBase));
    }

    /**
     * Computes the cosine of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static cos(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.cos(col));
    }

    /**
     * Computes the hyperbolic cosine of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static cosh(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.cosh(col));
    }

    /**
     * Computes the exponential of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static exp(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.exp(col));
    }

    /**
     * Computes the exponential of the given column minus one.
     *
     * @param col
     * @since 1.4.0
     */
    static expm1(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.expm1(col));
    }

    /**
     * Computes the factorial of the given column.
     *
     * @param col
     * @since 1.5.0
     */
    static factorial(col /*: Column*/) /*: Column*/ {
        return new Column(F.factorial(col.jvm_obj));
    }

    /**
     * Computes the floor of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static floor(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.floor(col));
    }

    /**
     * Returns the greatest value of the array of values, skipping null values.
     * This function takes at least 2 parameters. It will return null iff all parameters are null.
     *
     * @param cols
     * @since 1.5.0
     */
    static greatest(...cols /*: Column*|String* */) /*: Column*/ {
        return new Column(F.greatest(...cols));
    }

    /**
     * Computes hex value of the given column.
     *
     * @param col
     * @since 1.5.0
     */
    static hex(col /*: Column*/) /*: Column*/ {
        return new Column(F.hex(col));
    }

    /**
     * Inverse of hex. Interprets each pair of characters as a hexadecimal number
     * and converts to the byte representation of number.
     *
     * @param col
     * @since 1.5.0
     */
    static unhex(col /*: Column*/) /*: Column*/ {
        return new Column(F.unhex(col.jvm_obj));
    }

    /**
     * Computes `sqrt(a^2 + b^2)` without intermediate overflow or underflow.
     *
     * @since 1.4.0
     */
    static hypot(l /*: Column|String|Double */, r /*: Column|String|Double*/) /*: Column*/ {
        l = l.jvm_obj || l;
        r = r.jvm_obj || r;
        return new Column(F.hypot(l, r));
    }

    /**
     * Returns the least value of the array of values, skipping null values.
     * This function takes at least 2 parameters. It will return null iff all parameters are null.
     *
     * @param cols
     * @since 1.5.0
     */
    static least(...cols /*: (Column*|String*) */) /*: Column*/ {
        return new Column(F.least(...cols));
    }

    /**
     * Computes the logarithm of the given column.
     *
     * @param col
     * @param [base=Math.E]
     * @since 1.4.0
     */
    static log(col /*: Column | String */, base=null /*: Double*/) /*: Column*/ {
        if (base === null) {
            return new Column(F.log(col));
        } else {
            return new Column(F.log(base, col));
        }
    }

    /**
     * Computes the logarithm of the given column in base 10.
     *
     * @param col
     * @since 1.4.0
     */
    static log10(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.log10(col));
    }

    /**
     * Computes the natural logarithm of the given column plus one.
     *
     * @param col
     * @since 1.4.0
     */
    static log1p(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.log1p(col));
    }

    /**
     * Computes the logarithm of the given column in base 2.
     *
     * @param col
     * @since 1.5.0
     */
    static log2(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.log2(col));
    }

    /**
     * Returns the value of the first argument raised to the power of the second argument.
     *
     * @param col
     * @since 1.4.0
     */
    static pow(l /*: Column|Double|String*/, r /*: Column|Double|String*/) /*: Column*/ {
        l = l.jvm_obj || l;
        r = r.jvm_obj || r;
        return new Column(F.pow(l, r));
    }


    /**
     * Returns the positive value of dividend mod divisor.
     *
     * @param dividend Column.
     * @param divisor Column.
     * @since 1.5.0
     */
    static pmod(dividend /*: Column*/, divisor /*: Column*/) /*: Column*/ {
        return new Column(F.pmod(dividend, divisor));
    }

    /**
     * Returns the double value that is closest in value to the argument and
     * is equal to a mathematical integer.
     *
     * @param col
     * @since 1.4.0
     */
    static rint(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.rint(col));
    }

    /**
     * Returns the value of the column rounded to 0 decimal places.
     *
     * @param col
     * @param [scale=0]
     * @since 1.5.0
     */
    static round(col /*: Column*/, scale=0 /*: Int*/) /*: Column*/ {
        return new Column(F.round(col.jvm_obj, scale));
    }

    /**
     * Shift the given column numBits left.
     *
     * @param col
     * @param numBits
     * @since 1.5.0
     */
    static shiftLeft(col /*: Column*/, numBits /*: Int*/) /*: Column*/ {
        return new Column(F.shiftLeft(col.jvm_obj, numBits));
    }

    /**
     * Shift the the given column numBits right.
     *
     * @param col
     * @param numBits
     * @since 1.5.0
     */
    static shiftRight(col /*: Column*/, numBits /*: Int*/) /*: Column*/ {
        return new Column(F.shiftRight(col.jvm_obj, numBits));
    }

    /**
     * Unsigned shift the the given column numBits right.
     *
     * @param col
     * @param numBits
     * @since 1.5.0
     */
    static shiftRightUnsigned(col /*: Column*/, numBits /*: Int*/) /*: Column*/ {
        return new Column(F.shiftRightUnsigned(col.jvm_obj, numBits));
    }

    /**
     * Computes the signum of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static signum(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.signum(col));
    }

    /**
     * Computes the sine of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static sin(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.sin(col));
    }

    /**
     * Computes the hyperbolic sine of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static sinh(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.sinh(col));
    }

    /**
     * Computes the tangent of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static tan(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.tan(col));
    }

    /**
     * Computes the hyperbolic tangent of the given column.
     *
     * @param col
     * @since 1.4.0
     */
    static tanh(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.tanh(col));
    }

    /**
     * Converts an angle measured in radians to an approximately equivalent angle measured in degrees.
     *
     * @param col
     * @since 1.4.0
     */
    static toDegrees(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.toDegrees(col));
    }

    /**
     * Converts an angle measured in degrees to an approximately equivalent angle measured in radians.
     *
     * @param col
     * @since 1.4.0
     */
    static toRadians(col /*: Column | String */) /*: Column*/ {
        col = helpers.jobj_from_maybe_string(col);
        return new Column(F.toRadians(col));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Misc functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Calculates the MD5 digest of a binary column and returns the value
     * as a 32 character hex string.
     *
     * @param col
     * @since 1.5.0
     */
    static md5(col /*: Column*/) /*: Column*/ {
        return new Column(F.md5(col.jvm_obj));
    }

    /**
     * Calculates the SHA-1 digest of a binary column and returns the value
     * as a 40 character hex string.
     *
     * @param col
     * @since 1.5.0
     */
    static sha1(col /*: Column*/) /*: Column*/ {
        return new Column(F.sha1(col.jvm_obj));
    }

    /**
     * Calculates the SHA-2 family of hash functions of a binary column and
     * returns the value as a hex string.
     *
     * @param col Column to compute SHA-2 on.
     * @param numBits One of 224, 256, 384, or 512.
     *
     * @since 1.5.0
     */
    static sha2(col /*: Column*/, numBits /*: Int*/) /*: Column*/ {
        return new Column(F.sha2(col.jvm_obj, numBits));
    }

    /**
     * Calculates the cyclic redundancy check value  (CRC32) of a binary column and
     * returns the value as a Number.
     *
     * @param col
     * @since 1.5.0
     */
    static crc32(col /*: Column*/) /*: Column*/ {
        return new Column(F.crc32(col.jvm_obj));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // String functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Computes the numeric value of the first character of the string column, and returns the
     * result as a int column.
     *
     * @param col
     * @since 1.5.0
     */
    static ascii(col /*: Column*/) /*: Column*/ {
        return new Column(F.ascii(col.jvm_obj));
    }

    /**
     * Computes the BASE64 encoding of a binary column and returns it as a string column.
     * This is the reverse of unbase64.
     *
     * @param col
     * @since 1.5.0
     */
    static base64(col /*: Column*/) /*: Column*/ {
        return new Column(F.base64(col.jvm_obj));
    }

    /**
     * Concatenates multiple input string columns together into a single string column.
     *
     * @param cols
     * @since 1.5.0
     */
    static concat(...cols /*: Column* */) /*: Column*/ {
        return new Column(F.concat(cols));
    }

    /**
     * Concatenates multiple input string columns together into a single string column,
     * using the given separator.
     *
     * @param sep Separator.
     * @param cols Columns.
     * @since 1.5.0
     */
    static concat_ws(sep /*: String*/, ...cols /*: Column* */) /*: Column*/ {
        return new Column(F.concat_ws(sep, ...cols));
    }

    /**
     * Converts the column argument into a string from a binary using the provided character set
     * (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16').
     * If either argument is null, the result will also be null.
     *
     * @param col
     * @param charset
     * @since 1.5.0
     */
    static decode(col /*: Column*/, charset /*: String*/) /*: Column*/ {
        return new Column(F.decode(col.jvm_obj, charset));
    }

    /**
     * Computes the first argument into a binary from a string using the provided character set
     * (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16').
     * If either argument is null, the result will also be null.
     *
     * @param col
     * @param charset
     * @since 1.5.0
     */
    static encode(col /*: Column*/, charset /*: String*/) /*: Column*/ {
        return new Column(F.encode(col.jvm_obj, charset));
    }

    /**
     * Formats numeric column x to a format like '#,###,###.##', rounded to d decimal places,
     * and returns the result as a string column.
     *
     * If d is 0, the result has no decimal point or fractional part.
     * If d < 0, the result will be null.
     *
     * @param col
     * @param d
     * @since 1.5.0
     */
    static format_number(col /*: Column*/, d /*: Int*/) /*: Column*/ {
        return new Column(F.format_number(col.jvm_obj, d));
    }

    /**
     * Formats the arguments in printf-style and returns the result as a string column.
     *
     * @param format Format string.
     * @param args Columns containing format arguments.
     * @since 1.5.0
     */
    static format_string(format /*: String*/, ...args /*: Column* */) /*: Column*/ {
        return new Column(F.format_string(format, ...args));
    }

    /**
     * Returns a new string column by converting the first letter of each word to uppercase.
     * Words are delimited by whitespace.
     *
     * For example, "hello world" will become "Hello World".
     *
     * @param col
     * @since 1.5.0
     */
    static initcap(col /*: Column*/) /*: Column*/ {
        return new Column(F.initcap(col.jvm_obj));
    }

    /**
     * Locate the position of the first occurrence of substring in the given
     * column.  Returns null if either of the arguments are null.
     *
     * NOTE: The position is not zero based, but 1 based index. Returns 0 if
     * substring could not be found in column.
     *
     * @param col
     * @param subsring
     * @since 1.5.0
     */
    static instr(col /*: Column*/, substring /*: String*/) /*: Column*/ {
        return new Column(F.instr(col.jvm_obj, substring));
    }

    /**
     * Computes the length of a given string or binary column.
     *
     * @param col
     * @since 1.5.0
     */
    static length(col /*: Column*/) /*: Column*/ {
        return new Column(F.length(col.jvm_obj));
    }

    /**
     * Converts a string column to lower case.
     *
     * @param col
     * @since 1.3.0
     */
    static lower(col /*: Column*/) /*: Column*/ {
        return new Column(F.lower(col.jvm_obj));
    }

    /**
     * Computes the Levenshtein distance of the two given string columns.
     * @param l
     * @param r
     * @since 1.5.0
     */
    static levenshtein(l /*: Column*/, r /*: Column*/) /*: Column*/ {
        return new Column(F.levenshtein(l, r));
    }

    /**
     * Locate the position of the first occurrence of substr in a string
     * column (after optional position pos).
     *
     * NOTE: The position is not zero based, but 1 based index. returns 0 if substr
     * could not be found in str.
     *
     * @param substring
     * @param column
     * @param [position=null]
     * @since 1.5.0
     */
    static locate(substring /*: String*/, column /*: Column*/, position=null /*: Int*/) /*: Column*/ {
        if (position === null) {
            return new Column(F.locate(substring /*: String*/, column));
        } else {
            return new Column(F.locate(substring /*: String*/, column, position));
        }
    }

    /**
     * Left-pad the string column with the contents of 'pad', to a max length
     * of 'len'.
     *
     * @param col
     * @param len
     * @param pad
     * @since 1.5.0
     */
    static lpad(col /*: Column*/, len /*: Int*/, pad /*: String*/) /*: Column*/ {
        return new Column(F.lpad(col.jvm_obj /*: Column*/, len, pad));
    }

    /**
     * Trim the spaces from left end for the specified string column.
     *
     * @param col
     * @since 1.5.0
     */
    static ltrim(col /*: Column*/) /*: Column*/ {
        return new Column(F.ltrim(col.jvm_obj));
    }

    /**
     * Extract a specific group identified by a java regex, from the specified string column.
     *
     * @param col
     * @param regex
     * @param groupIdx Group index.
     * @since 1.5.0
     */
    static regexp_extract(col /*: Column*/, regex /*: String*/, groupIdx /*: Int*/) /*: Column*/ {
        return new Column(F.regexp_extract(col.jvm_obj, regex, groupIdx));
    }

    /**
     * Replace all substrings of the specified string value that match regexp with rep.
     *
     * @param col
     * @param re
     * @param replacement Replacement string.
     * @since 1.5.0
     */
    static regexp_replace(col /*: Column*/, regex /*: String*/, replacement /*: String*/) /*: Column*/ {
        return new Column(F.regexp_replace(col.jvm_obj, regex, replacement));
    }

    /**
     * Decodes a BASE64 encoded string column and returns it as a binary column.
     * This is the reverse of base64.
     *
     * @param col
     * @since 1.5.0
     */
    static unbase64(col /*: Column*/) /*: Column*/ {
        return new Column(F.unbase64(col.jvm_obj));
    }

    /**
     * Right-pad the string column with the contents of 'pad', to a max length
     * of 'len'.
     *
     * @param col
     * @param len
     * @param pad
     * @since 1.5.0
     */
    static rpad(col /*: Column*/, len /*: Int*/, pad /*: String*/) /*: Column*/ {
        return new Column(F.rpad(col.jvm_obj /*: Column*/, len, pad));
    }

    /**
     * Repeats a string column n times, and returns it as a new string column.
     *
     * @param col
     * @param n
     * @since 1.5.0
     */
    static repeat(col /*: Column*/, n /*: Int*/) /*: Column*/ {
        return new Column(F.repeat(col.jvm_obj, n));
    }

    /**
     * Reverses the string column and returns it as a new string column.
     *
     * @param col
     * @since 1.5.0
     */
    static reverse(col /*: Column*/) /*: Column*/ {
        return new Column(F.reverse(col.jvm_obj));
    }

    /**
     * Trim the spaces from right end for the specified string column.
     *
     * @param col
     * @since 1.5.0
     */
    static rtrim(col /*: Column*/) /*: Column*/ {
        return new Column(F.rtrim(col.jvm_obj));
    }

    /**
     * * Return the soundex code for the specified expression.
     *
     * @param col
     * @since 1.5.0
     */
    static soundex(col /*: Column*/) /*: Column*/ {
        return new Column(F.soundex(col.jvm_obj));
    }

    /**
     * Splits str around regular expression `re` (which is a java regular expression).
     *
     * @param col
     * @param regex
     * @since 1.5.0
     */
    static split(col /*: Column*/, regex /*: String*/) /*: Column*/ {
        return new Column(F.split(col.jvm_obj, regex));
    }

    /**
     * Substring starts at `pos` and is of length `len` when str is String type or
     * returns the slice of byte array that starts at `pos` in byte and is of length `len`
     * when str is Binary type
     *
     * @param col
     * @param pos
     * @param len
     * @since 1.5.0
     */
    static substring(col /*: Column*/, pos /*: Int*/, len /*: Int*/) /*: Column*/ {
        return new Column(F.substring(col.jvm_obj /*: Column*/, pos, len));
    }

    /**
     * Returns the substring from string str before count occurrences of the delimiter delim.
     * If count is positive, everything the left of the final delimiter (counting from left) is
     * returned. If count is negative, every to the right of the final delimiter (counting from the
     * right) is returned. substring_index performs a case-sensitive match when searching for delim.
     *
     * @param col
     * @param delim
     * @param count
     */
    static substring_index(col /*: Column*/, delim /*: String*/, count /*: Int*/) /*: Column*/ {
        return new Column(F.substring_index(col.jvm_obj /*: Column*/, delim, count));
    }

    /**
     * Translate any character in the src by a character in replaceString.
     * The characters in replaceString is corresponding to the characters in matchingString.
     * The translate will happen when any character in the string matching with the character
     * in the matchingString.
     *
     * @param col
     * @param matchingString
     * @param replaceString
     * @since 1.5.0
     */
    static translate(col /*: Column*/, matchingString /*: String*/, replaceString /*: String*/) /*: Column*/ {
        return new Column(F.translate(col.jvm_obj /*: Column*/, matchingString, replaceString));
    }

    /**
     * Trim the spaces from both ends for the specified string column.
     *
     * @param col
     * @since 1.5.0
     */
    static trim(col /*: Column*/) /*: Column*/ {
        return new Column(F.trim(col.jvm_obj));
    }

    /**
     * Converts a string column to upper case.
     *
     * @param col
     * @since 1.3.0
     */
    static upper(col /*: Column*/) /*: Column*/ {
        return new Column(F.upper(col.jvm_obj));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // DateTime functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns the date that is `numMonths` after the date in the given column `col`.
     *
     * @param col
     * @param numMonths
     * @since 1.5.0
     */
    static add_months(col /*: Column*/, numMonths /*: Int*/) /*: Column*/ {
        return new Column(F.add_months(col.jvm_obj, numMonths));
    }

    /**
     * Returns the current date as a date column.
     *
     * @since 1.5.0
     */
    static current_date() /*: Column*/ {
        return new Column(F.current_date());
    }

    /**
     * Returns the current timestamp as a timestamp column.
     *
     * @since 1.5.0
     */
    static current_timestamp() /*: Column*/ {
        return new Column(F.current_timestamp());
    }

    /**
     * Converts a date/timestamp/string to a value of string in the format specified by the date
     * format given by the second argument.
     *
     * A pattern could be for instance `dd.MM.yyyy` and could return a string like '18.03.1993'. All
     * pattern letters of {@link java.text.SimpleDateFormat} can be used.
     *
     * NOTE: Use when ever possible specialized functions like {@link Functions.year}. These benefit from a
     * specialized implementation.
     *
     * @param col
     * @param format
     * @since 1.5.0
     */
    static date_format(col /*: Column*/, format /*: String*/) /*: Column*/ {
        return new Column(F.date_format(col.jvm_obj, format));
    }

    /**
     * Returns the date that is `days` days after the date in the given column `col`.
     * @param col
     * @param days
     * @since 1.5.0
     */
    static date_add(col /*: Column*/, days /*: Int*/) /*: Column*/ {
        return new Column(F.date_add(col.jvm_obj, days));
    }

    /**
     * Returns the date that is `days` days before the date in the given column `col`.
     * @param col
     * @param days
     * @since 1.5.0
     */
    static date_sub(col /*: Column*/, days /*: Int*/) /*: Column*/ {
        return new Column(F.date_sub(col.jvm_obj, days));
    }

    /**
     * Returns the number of days from `startCol` to `endCol`.
     * @param startCol
     * @param endCol
     * @since 1.5.0
     */
    static datediff(endCol /*: Column*/, startCol /*: Column*/) /*: Column*/ {
        return new Column(F.datediff(endCol, startCol));
    }

    /**
     * Extracts the year as an integer from a given date/timestamp/string.
     * @param col
     * @since 1.5.0
     */
    static year(col /*: Column*/) /*: Column*/ {
        return new Column(F.year(col.jvm_obj));
    }

    /**
     * Extracts the quarter as an integer from a given date/timestamp/string.
     * @param col
     * @since 1.5.0
     */
    static quarter(col /*: Column*/) /*: Column*/ {
        return new Column(F.quarter(col.jvm_obj));
    }

    /**
     * Extracts the month as an integer from a given date/timestamp/string.
     * @param col
     * @since 1.5.0
     */
    static month(col /*: Column*/) /*: Column*/ {
        return new Column(F.month(col.jvm_obj));
    }

    /**
     * Extracts the day of the month as an integer from a given date/timestamp/string.
     * @param col
     * @since 1.5.0
     */
    static dayofmonth(col /*: Column*/) /*: Column*/ {
        return new Column(F.dayofmonth(col.jvm_obj));
    }

    /**
     * Extracts the day of the year as an integer from a given date/timestamp/string.
     * @param col
     * @since 1.5.0
     */
    static dayofyear(col /*: Column*/) /*: Column*/ {
        return new Column(F.dayofyear(col.jvm_obj));
    }

    /**
     * Extracts the hours as an integer from a given date/timestamp/string.
     * @param col
     * @since 1.5.0
     */
    static hour(col /*: Column*/) /*: Column*/ {
        return new Column(F.hour(col.jvm_obj));
    }

    /**
     * Given a date column, returns the last day of the month which the given date belongs to.
     * For example, input "2015-07-27" returns "2015-07-31" since July 31 is the last day of the
     * month in July 2015.
     *
     * @param col
     * @since 1.5.0
     */
    static last_day(col /*: Column*/) /*: Column*/ {
        return new Column(F.last_day(col.jvm_obj));
    }

    /**
     * Extracts the minutes as an integer from a given date/timestamp/string.
     *
     * @param col
     * @since 1.5.0
     */
    static minute(col /*: Column*/) /*: Column*/ {
        return new Column(F.minute(col.jvm_obj));
    }

    /**
     * Returns number of months between dates in col1 and `col2`.
     *
     * @param col1
     * @param col2
     * @since 1.5.0
     */
    static months_between(col1 /*: Column*/, col2 /*: Column*/) /*: Column*/ {
        return new Column(F.months_between(col1, col2));
    }

    /**
     * Given a date column, returns the first date which is later than the value of the date column
     * that is on the specified day of the week.
     *
     * For example, `next_day('2015-07-27', "Sunday")` returns 2015-08-02 because that is the first
     * Sunday after 2015-07-27.
     *
     * Day of the week parameter is case insensitive, and accepts:
     * "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun".
     *
     * @param col
     * @param dayOfWeek
     * @since 1.5.0
     */
    static next_day(col /*: Column*/, dayOfWeek /*: String*/) /*: Column*/ {
        return new Column(F.next_day(col.jvm_obj, dayOfWeek));
    }

    /**
     * Extracts the seconds as an integer from a given date/timestamp/string column.
     * @param col
     * @since 1.5.0
     */
    static second(col /*: Column*/) /*: Column*/ {
        return new Column(F.second(col.jvm_obj));
    }

    /**
     * Extracts the week number as an integer from a given date/timestamp/string column.
     * @param col
     * @since 1.5.0
     */
    static weekofyear(col /*: Column*/) /*: Column*/ {
        return new Column(F.weekofyear(col.jvm_obj));
    }

    /**
     * Converts the number of seconds from unix epoch (1970-01-01 00:00:00 UTC) to a string
     * representing the timestamp of that moment in the current system time zone in the given
     * format (defaults to "yyyy-MM-dd HH:mm:ss").
     * @param col
     * @param [format=null]
     * @since 1.5.0
     */
    static from_unixtime(col /*: Column*/, format=null /*: String*/) /*: Column*/ {
        if (format === null) {
            return new Column(F.from_unixtime(col.jvm_obj));
        } else {
            return new Column(F.from_unixtime(col.jvm_obj, format));
        }
    }

    /**
     * Returns a Unix timestamp in seconds.
     * If no arguments are passed, returns current time.
     *
     * If col is passed, it is parsed with the given format (see
     * [http://docs.oracle.com/javase/tutorial/i18n/format/simpleDateFormat.html]). The
     * format defaults to (format yyyy-MM-dd HH:mm:ss).
     * @param [col=null]
     * @param [format=null]
     * @since 1.5.0
     */
    static unix_timestamp(col=null /*: Column*/, format=null /*: String*/) /*: Column*/ {
        if (col === null) {
            return new Column(F.unix_timestamp());
        } else if (format === null) {
            return new Column(F.unix_timestamp(col.jvm_obj));
        } else {
            return new Column(F.unix_timestamp(col.jvm_obj, format));
        }
    }

    /**
     * Converts the column into DateType.
     *
     * @param col
     * @since 1.5.0
     */
    static to_date(col /*: Column*/) /*: Column*/ {
        return new Column(F.to_date(col.jvm_obj));
    }

    /**
     * Returns date truncated to the unit specified by the format.
     *
     * @param col
     * @param format: 'year', 'yyyy', 'yy' for truncate by year,
     *               or 'month', 'mon', 'mm' for truncate by month
     *
     * @since 1.5.0
     */
    static trunc(col /*: Column*/, format /*: String*/) /*: Column*/ {
        return new Column(F.trunc(col.jvm_obj, format));
    }

    /**
     * Assumes given timestamp column is UTC and converts to given timezone.
     * @param col
     * @param tz
     * @since 1.5.0
     */
    static from_utc_timestamp(col /*: Column*/, tz /*: String*/) /*: Column*/ {
        return new Column(F.from_utc_timestamp(col.jvm_obj, tz));
    }

    /**
     * Assumes given timestamp column is in given timezone and converts to UTC.
     * @param col
     * @param tz
     * @since 1.5.0
     */
    static to_utc_timestamp(col /*: Column*/, tz /*: String*/) /*: Column*/ {
        return new Column(F.to_utc_timestamp(col.jvm_obj, tz));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Collection functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns true if the array contains the value.
     * @param col
     * @param value
     * @since 1.5.0
     */
    static array_contains(col /*: Column*/, value /*: Any*/) /*: Column*/ {
        return new Column(F.array_contains(col.jvm_obj, value));
    }

    /**
     * Creates a new row for each element in the given array or map column.
     *
     * @param col
     * @since 1.3.0
     */
    static explode(col /*: Column*/) /*: Column*/ {
        return new Column(F.explode(col.jvm_obj));
    }

    /**
     * Creates a new row for a json column according to the given field names.
     *
     * @param col
     * @param fields
     * @since 1.6.0
     */
    static json_tuple(col /*: Column*/, ...fields /*: String* */) /*: Column*/ {
        return new Column(F.json_tuple(col.jvm_obj, ...fields));
    }

    /**
     * Returns length of array or map.
     *
     * @param col
     * @since 1.5.0
     */
    static size(col /*: Column*/) /*: Column*/ {
        return new Column(F.size(col.jvm_obj));
    }

    /**
     * Sorts the input array for the given column in ascending order,
     * according to the natural ordering of the array elements.
     *
     * @param col
     * @param [asc=true]
     * @since 1.5.0
     */
    static sort_array(col /*: Column*/, asc=true /*: Boolean*/) /*: Column*/ {
        return new Column(F.sort_array(col.jvm_obj, asc));
    }
}

function functions() {
    if (F) return Functions;
    F = java.import("org.apache.spark.sql.functions");
    return Functions;
}

module.exports = functions;
