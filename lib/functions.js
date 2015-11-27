"use strict";

var java = require("./java");
var F;

class Functions {

    /**
     * Returns a [[Column]] based on the given column name.
     *
     * @group normal_funcs
     * @since 1.3.0
     */
    static col(colName /*: String*/) /*: Column*/ {
        return F.col(colName);
    }

    /**
     * Returns a [[Column]] based on the given column name. Alias of [[col]].
     *
     * @group normal_funcs
     * @since 1.3.0
     */
    static column(colName /*: String*/) /*: Column*/ {
        return F.column(colName);
    }

    /**
     * Creates a [[Column]] of literal value.
     *
     * The passed in object is returned directly if it is already a [[Column]].
     * If the object is a Scala Symbol, it is converted into a [[Column]] also.
     * Otherwise, a new [[Column]] is created to represent the literal value.
     *
     * @group normal_funcs
     * @since 1.3.0
     */
    static lit(literal /*: Any* */) /*: Column*/ {
        return F.lit(literal);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Sort functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns a sort expression based on ascending order of the column.
     * {{{
     *   // Sort by dept in ascending order, and then age in descending order.
     *   df.sort(asc("dept"), desc("age"))
     * }}}
     *
     * @group sort_funcs
     * @since 1.3.0
     */
    static asc(columnName /*: String*/) /*: Column*/ {
        return F.asc(columnName);
    }

    /**
     * Returns a sort expression based on the descending order of the column.
     * {{{
     *   // Sort by dept in ascending order, and then age in descending order.
     *   df.sort(asc("dept"), desc("age"))
     * }}}
     *
     * @group sort_funcs
     * @since 1.3.0
     */
    static desc(columnName /*: String*/) /*: Column*/ {
        return F.desc(columnName);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Aggregate functions
    //////////////////////////////////////////////////////////////////////////////////////////////


    /**
     * Aggregate function: returns the approximate number of distinct items in a group.
     *
     * @group agg_funcs
     * @since 1.3.0
     */
    static approxCountDistinct(e /*: Column*/, rsd=null /*: Double*/) /*: Column*/ {
        if (rsd === null) {
            return F.approxCountDistinct(e, rsd);
        } else {
            return F.approxCountDistinct(e);
        }
    }

    /**
     * Aggregate function: returns a list of objects with duplicates.
     *
     * For now this is an alias for the collect_list Hive UDAF.
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static collect_list(e /*: Column*/) /*: Column*/ {
        return F.collect_list(e);
    }

    /**
     * Aggregate function: returns a set of objects with duplicate elements eliminated.
     *
     * For now this is an alias for the collect_set Hive UDAF.
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static collect_set(e /*: Column*/) /*: Column*/ {
        return F.collect_set(e);
    }

    /**
     * Aggregate function: returns the Pearson Correlation Coefficient for two columns.
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static corr(column1 /*: Column | String*/, column2 /*: Column | String*/) /*: Column*/ {
        return F.corr(column1, column2);
    }

    /**
     * Aggregate function: returns the number of items in a group.
     *
     * @group agg_funcs
     * @since 1.3.0
     */
    static count(col /*: String | Column */) /*: Column*/ {
        return F.count();
    }

    /**
     * Aggregate function: returns the number of distinct items in a group.
     *
     * @group agg_funcs
     * @since 1.3.0
     */
    /* @scala.annotation.varargs */
    static countDistinct(col /*: Column | String */, ...cols /*: Column* | String* */) /*: Column*/ {
        if (cols.length === 0) {
            return F.countDistinct(col);
        } else {
            return F.countDistinct(col, cols);
        }
    }

    /**
     * Aggregate function: returns the first value in a group.
     *
     * @group agg_funcs
     * @since 1.3.0
     */
    static first(col /*: String | Column */) /*: Column*/ {
        return F.first(col);
    }

    /**
     * Aggregate function: returns the kurtosis of the values in a group.
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static kurtosis(e /*: Column*/) /*: Column*/ {
        return F.kurtosis(e);
    }

    /**
     * Aggregate function: returns the last value in a group.
     *
     * @group agg_funcs
     * @since 1.3.0
     */
    static last(col /*: String | Column */) /*: Column*/ {
        return F.last(col);
    }

    /**
     * Aggregate function: returns the maximum value of the expression in a group.
     *
     * @group agg_funcs
     * @since 1.3.0
     */
    static max(col /*: Column | String */) /*: Column*/ {
        return F.max(col);
    }

    /**
     * Aggregate function: returns the average of the values in a group.
     * Alias for mean.
     *
     * @group agg_funcs
     * @since 1.4.0
     */
    static avg(col /*: Column | String */) /*: Column*/ {
        return F.avg(col);
    }

    /**
     * Aggregate function: returns the average of the values in a group.
     * Alias for avg.
     *
     * @group agg_funcs
     * @since 1.4.0
     */
    static mean(col /*: Column | String */) /*: Column*/ {
        return F.mean(col);
    }

    /**
     * Aggregate function: returns the minimum value of the expression in a group.
     *
     * @group agg_funcs
     * @since 1.3.0
     */
    static min(col /*: Column | String */) /*: Column*/ {
        return F.min(col);
    }

    /**
     * Aggregate function: returns the skewness of the values in a group.
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static skewness(e /*: Column*/) /*: Column*/ {
        return F.skewness(e);
    }

    /**
     * Aggregate function: alias for [[stddev_samp]].
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static stddev(col /*: Column*/) /*: Column*/ {
        return F.stddev(col);
    }

    /**
     * Aggregate function: returns the sample standard deviation of
     * the expression in a group.
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static stddev_samp(col /*: Column*/) /*: Column*/ {
        return F.stddev(col);
    }

    /**
     * Aggregate function: returns the population standard deviation of
     * the expression in a group.
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static stddev_pop(col /*: Column*/) /*: Column*/ {
        return F.stddev(col);
    }

    /**
     * Aggregate function: returns the sum of all values in the expression.
     *
     * @group agg_funcs
     * @since 1.3.0
     */
    static sum(col /*: Column | String */) /*: Column*/ {
        return F.sum(col);
    }

    /**
     * Aggregate function: returns the sum of distinct values in the expression.
     *
     * @group agg_funcs
     * @since 1.3.0
     */
    static sumDistinct(col /*: Column | String */) /*: Column*/ {
        return F.sumDistinct(col);
    }

    /**
     * Aggregate function: alias for [[var_samp]].
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static variance(col /*: Column*/) /*: Column*/ {
        return F.variance(col);
    }

    /**
     * Aggregate function: returns the unbiased variance of the values in a group.
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static var_samp(col /*: Column*/) /*: Column*/ {
        return F.var(col);
    }

    /**
     * Aggregate function: returns the population variance of the values in a group.
     *
     * @group agg_funcs
     * @since 1.6.0
     */
    static var_pop(col /*: Column*/) /*: Column*/ {
        return F.var(col);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Window functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Window function: returns the cumulative distribution of values within a window partition,
     * i.e. the fraction of rows that are below the current row.
     *
     * {{{
     *   N { }
     *   cumeDist(x) { }
     * }}}
     *
     *
     * This is equivalent to the CUME_DIST function in SQL.
     *
     * @group window_funcs
     * @since 1.4.0
     */
    static cumeDist() /*: Column*/ {
        return F.cumeDist();
    }

    /**
     * Window function: returns the rank of rows within a window partition, without any gaps.
     *
     * The difference between rank and denseRank is that denseRank leaves no gaps in ranking
     * sequence when there are ties. That is, if you were ranking a competition using denseRank
     * and had three people tie for second place, you would say that all three were in second
     * place and that the next person came in third.
     *
     * This is equivalent to the DENSE_RANK function in SQL.
     *
     * @group window_funcs
     * @since 1.4.0
     */
    static denseRank() /*: Column*/ {
        return F.denseRank();
    }

    /**
     * Window function: returns the value that is `offset` rows before the current
     * row, and `null` (or optional `defaultValue`, if provided) if there is less
     * than `offset` rows before the current row. For example, an `offset` of one
     * will return the previous row at any given point in the window partition.
     *
     * This is equivalent to the LAG function in SQL.
     *
     * @group window_funcs
     * @since 1.4.0
     */
    static lag(col /*: Column | String */, offset=null /*: Int*/, defaultValue=null /*: Any*/) /*: Column*/ {
        if (offset === null) {
            return F.lag(col);
        } else if (defaultValue == null) {
            return F.lag(col, offset);
        } else {
            return F.lag(col, offset, defaultValue);
        }
    }


    /**
     * Window function: returns the value that is `offset` rows after the current row, and
     * null (or optional `defaultValue`, if provided) if there is less than `offset` rows after the current row. For example,
     * an `offset` of one will return the next row at any given point in the window partition.
     *
     * This is equivalent to the LEAD function in SQL.
     *
     * @group window_funcs
     * @since 1.4.0
     */
    static lead(col /*: String*/, offset /*: Int*/, defaultValue /*: Any*/) /*: Column*/ {
        if (offset === null) {
            return F.lead(col);
        } else if (defaultValue == null) {
            return F.lead(col, offset);
        } else {
            return F.lead(col, offset, defaultValue);
        }
    }


    /**
     * Window function: returns the ntile group id (from 1 to `n` inclusive) in an ordered window
     * partition. Fow example, if `n` is 4, the first quarter of the rows will get value 1, the second
     * quarter will get 2, the third quarter will get 3, and the last quarter will get 4.
     *
     * This is equivalent to the NTILE function in SQL.
     *
     * @group window_funcs
     * @since 1.4.0
     */
    static ntile(n /*: Int*/) /*: Column*/ {
        return F.ntile(n);
    }

    /**
     * Window function: returns the relative rank (i.e. percentile) of rows within a window partition.
     *
     * This is computed by :
     * {{{
     *   (rank of row in its partition - 1) / (number of rows in the partition - 1)
     * }}}
     *
     * This is equivalent to the PERCENT_RANK function in SQL.
     *
     * @group window_funcs
     * @since 1.4.0
     */
    static percentRank() /*: Column*/ {
        return F.percentRank();
    }

    /**
     * Window function: returns the rank of rows within a window partition.
     *
     * The difference between rank and denseRank is that denseRank leaves no gaps in ranking
     * sequence when there are ties. That is, if you were ranking a competition using denseRank
     * and had three people tie for second place, you would say that all three were in second
     * place and that the next person came in third.
     *
     * This is equivalent to the RANK function in SQL.
     *
     * @group window_funcs
     * @since 1.4.0
     */
    static rank() /*: Column*/ {
        return F.rank();
    }

    /**
     * Window function: returns a sequential number starting at 1 within a window partition.
     *
     * This is equivalent to the ROW_NUMBER function in SQL.
     *
     * @group window_funcs
     * @since 1.4.0
     */
    static rowNumber() /*: Column*/ {
        return F.rowNumber();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Non-aggregate functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Computes the absolute value.
     *
     * @group normal_funcs
     * @since 1.3.0
     */
    static abs(col /*: Column*/) /*: Column*/ {
        return F.abs(col);
    }

    /**
     * Creates a new array column. The input columns must all have the same data type.
     *
     * @group normal_funcs
     * @since 1.4.0
     */
    // xxx this function currently can't take strings, because the corresponding Scala
    // function is lacking a @scala.annotation.varargs annotation
    /* @scala.annotation.varargs */
    static array(...cols /*: Column* */) /*: Column*/ {
        return F.array(...cols);
    }

    /**
     * Marks a DataFrame as small enough for use in broadcast joins.
     *
     * The following example marks the right DataFrame for broadcast hash join using `joinKey`.
     * {{{
     *   // left and right are DataFrames
     *   left.join(broadcast(right), "joinKey")
     * }}}
     *
     * @group normal_funcs
     * @since 1.5.0
     */
    static broadcast(df /*: DataFrame*/) /*: DataFrame*/ {
        return F.broadcast(df);
    }

    /**
     * Returns the first column that is not null, or null if all inputs are null.
     *
     * For example, `coalesce(a, b, c)` will return a if a is not null,
     * or b if a is null and b is not null, or c if both a and b are null but c is not null.
     *
     * @group normal_funcs
     * @since 1.3.0
     */
    /* @scala.annotation.varargs */
    static coalesce(e /*: Column* */) /*: Column*/ {
        return F.coalesce(e);
    }

    /**
     * Creates a string column for the file name of the current Spark task.
     *
     * @group normal_funcs
     */
    static inputFileName() /*: Column*/ {
        return F.inputFileName();
    }

    /**
     * Return true iff the column is NaN.
     *
     * @group normal_funcs
     * @since 1.5.0
     */
    static isNaN(col /*: Column*/) /*: Column*/ {
        return F.isNaN(col);
    }

    /**
     * A column expression that generates monotonically increasing 64-bit integers.
     *
     * The generated ID is guaranteed to be monotonically increasing and unique, but not consecutive.
     * The current implementation puts the partition ID in the upper 31 bits, and the record number
     * within each partition in the lower 33 bits. The assumption is that the data frame has
     * less than 1 billion partitions, and each partition has less than 8 billion records.
     *
     * As an example, consider a [[DataFrame]] with two partitions, each with 3 records.
     * This expression would return the following IDs /*:
     * 0, 1, 2, 8589934592 (1L << 33), 8589934593, 8589934594.
     *
     * @group normal_funcs
     * @since 1.4.0
     */
    static monotonicallyIncreasingId() /*: Column*/ {
        return F.monotonicallyIncreasingId();
    }

    /**
     * Returns col1 if it is not NaN, or col2 if col1 is NaN.
     *
     * Both inputs should be floating point columns (DoubleType or FloatType).
     *
     * @group normal_funcs
     * @since 1.5.0
     */
    static nanvl(col1 /*: Column*/, col2 /*: Column*/) /*: Column*/ {
        return F.nanvl(col1, col2);
    }

    /**
     * Unary minus, i.e. negate the expression.
     * {{{
     *   // Select the amount column and negates all values.
     *   // Scala /*:
     *   df.select( -df("amount") )
     *
     *   // Java /*:
     *   df.select( negate(df.col("amount")) );
     * }}}
     *
     * @group normal_funcs
     * @since 1.3.0
     */
    static negate(col /*: Column*/) /*: Column*/ {
        return F.negate(col);
    }

    /**
     * Inversion of boolean expression, i.e. NOT.
     * {{{
     *   // Scala: select rows that are not active (isActive === false)
     *   df.filter( !df("isActive") )
     *
     *   // Java:
     *   df.filter( not(df.col("isActive")) );
     * }}}
     *
     * @group normal_funcs
     * @since 1.3.0
     */
    static not(col /*: Column*/) /*: Column*/ {
        return F.not(col);
    }

    /**
     * Generate a random column with i.i.d. samples from U[0.0, 1.0].
     *
     * @group normal_funcs
     * @since 1.4.0
     */
    static rand(seed=null /*: Long*/) /*: Column*/ {
        if (seed === null) {
            return F.rand();
        } else {
            return F.rand(seed);
        }
    }

    /**
     * Generate a column with i.i.d. samples from the standard normal distribution.
     *
     * @group normal_funcs
     * @since 1.4.0
     */
    static randn(seed /*: Long*/) /*: Column*/ {
        if (seed === null) {
            return F.randn();
        } else {
            return F.randn(seed);
        }
    }

    /**
     * Partition ID of the Spark task.
     *
     * Note that this is indeterministic because it depends on data partitioning and task scheduling.
     *
     * @group normal_funcs
     * @since 1.4.0
     */
    static sparkPartitionId() /*: Column*/ {
        return F.sparkPartitionId();
    }

    /**
     * Computes the square root of the specified float value.
     *
     * @group math_funcs
     * @since 1.3.0
     */
    static sqrt(col /*: Column | String*/) /*: Column*/ {
        return F.sqrt(col);
    }

    /**
     * Creates a new struct column.
     * If the input column is a column in a [[DataFrame]], or a derived column expression
     * that is named (i.e. aliased), its name would be remained as the StructField's name,
     * otherwise, the newly generated StructField's name would be auto generated as col${index + 1},
     * i.e. col1, col2, col3, ...
     *
     * @group normal_funcs
     * @since 1.4.0
     */
    // xxx this function currently can't take strings, because the corresponding Scala
    // function is lacking a @scala.annotation.varargs annotation
    /* @scala.annotation.varargs */
    static struct(...cols /*: Column* */) /*: Column*/ {
        return F.struct(...cols);
    }


    /**
     * Evaluates a list of conditions and returns one of multiple possible result expressions.
     * If otherwise is not defined at the end, null is returned for unmatched conditions.
     *
     * {{{
     *   // Example: encoding gender string column into integer.
     *
     *   // Scala:
     *   people.select(when(people("gender") === "male", 0)
     *     .when(people("gender") === "female", 1)
     *     .otherwise(2))
     *
     *   // Java:
     *   people.select(when(col("gender").equalTo("male"), 0)
     *     .when(col("gender").equalTo("female"), 1)
     *     .otherwise(2))
     * }}}
     *
     * @group normal_funcs
     * @since 1.4.0
     */
    static when(condition /*: Column*/, value /*: Any*/) /*: Column*/ {
        return F.when(condition, value);
    }

    /**
     * Computes bitwise NOT.
     *
     * @group normal_funcs
     * @since 1.4.0
     */
    static bitwiseNOT(col /*: Column*/) /*: Column*/ {
        return F.bitwiseNOT(col);
    }

    /**
     * Parses the expression string into the column that it represents, similar to
     * DataFrame.selectExpr
     * {{{
     *   // get the number of words of each length
     *   df.groupBy(expr("length(word)")).count()
     * }}}
     *
     * @group normal_funcs
     */
    static expr(expr /*: String*/) /*: Column*/ {
        return F.expr(expr);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Math Functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Computes the cosine inverse of the given value; the returned angle is in the range
     * 0.0 through pi.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static acos(col /*: Column | String */) /*: Column*/ {
        return F.acos(col);
    }

    /**
     * Computes the sine inverse of the given value; the returned angle is in the range
     * -pi/2 through pi/2.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static asin(col /*: Column | String */) /*: Column*/ {
        return F.asin(col);
    }

    /**
     * Computes the tangent inverse of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static atan(col /*: Column | String */) /*: Column*/ {
        return F.atan(col);
    }

    /**
     * Returns the angle theta from the conversion of rectangular coordinates (x, y) to
     * polar coordinates (r, theta).
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static atan2(l /*: Column|String|Double */, r /*: Column|String|Double */) /*: Column*/ {
        return F.atan2(l, r);
    }

    /**
     * An expression that returns the string representation of the binary value of the given long
     * column. For example, bin("12") returns "1100".
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static bin(col /*: Column | String */) /*: Column*/ {
        return F.bin(col);
    }

    /**
     * Computes the cube-root of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static cbrt(col /*: Column | String */) /*: Column*/ {
        return F.cbrt(col);
    }

    /**
     * Computes the ceiling of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static ceil(col /*: Column | String */) /*: Column*/ {
        return F.ceil(col);
    }

    /**
     * Convert a number in a string column from one base to another.
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static conv(num /*: Column*/, fromBase /*: Int*/, toBase /*: Int*/) /*: Column*/ {
        return F.conv(num /*: Column*/, fromBase, toBase);
    }

    /**
     * Computes the cosine of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static cos(col /*: Column | String */) /*: Column*/ {
        return F.cos(col);
    }

    /**
     * Computes the hyperbolic cosine of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static cosh(col /*: Column | String */) /*: Column*/ {
        return F.cosh(col);
    }

    /**
     * Computes the exponential of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static exp(col /*: Column | String */) /*: Column*/ {
        return F.exp(col);
    }

    /**
     * Computes the exponential of the given value minus one.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static expm1(col /*: Column | String */) /*: Column*/ {
        return F.expm1(col);
    }

    /**
     * Computes the factorial of the given value.
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static factorial(col /*: Column*/) /*: Column*/ {
        return F.factorial(col);
    }

    /**
     * Computes the floor of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static floor(col /*: Column | String */) /*: Column*/ {
        return F.floor(col);
    }

    /**
     * Returns the greatest value of the list of values, skipping null values.
     * This function takes at least 2 parameters. It will return null iff all parameters are null.
     *
     * @group normal_funcs
     * @since 1.5.0
     */
    /* @scala.annotation.varargs */
    static greatest(...cols /*: Column*|String* */) /*: Column*/ {
        return F.greatest(...cols);
    }

    /**
     * Computes hex value of the given column.
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static hex(column /*: Column*/) /*: Column*/ {
        return F.hex(column);
    }

    /**
     * Inverse of hex. Interprets each pair of characters as a hexadecimal number
     * and converts to the byte representation of number.
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static unhex(column /*: Column*/) /*: Column*/ {
        return F.unhex(column);
    }

    /**
     * Computes `sqrt(a^2^ + b^2^)` without intermediate overflow or underflow.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static hypot(l /*: Column|String|Double */, r /*: Column|String|Double*/) /*: Column*/ {
        return F.hypot(l, r);
    }

    /**
     * Returns the least value of the list of values, skipping null values.
     * This function takes at least 2 parameters. It will return null iff all parameters are null.
     *
     * @group normal_funcs
     * @since 1.5.0
     */
    /* @scala.annotation.varargs */
    static least(...cols /*: (Column*|String*) */) /*: Column*/ {
        return F.least(...cols);
    }

    /**
     * Computes the natural logarithm of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static log(col /*: Column | String */, base=null /*: Double*/) /*: Column*/ {
        if (base === null) {
            return F.log(col);
        } else {
            return F.log(base, col);
        }
    }

    /**
     * Computes the logarithm of the given value in base 10.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static log10(col /*: Column | String */) /*: Column*/ {
        return F.log10(col);
    }

    /**
     * Computes the natural logarithm of the given value plus one.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static log1p(col /*: Column | String */) /*: Column*/ {
        return F.log1p(col);
    }

    /**
     * Computes the logarithm of the given column in base 2.
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static log2(col /*: Column | String */) /*: Column*/ {
        return F.log2(col);
    }

    /**
     * Returns the value of the first argument raised to the power of the second argument.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static pow(l /*: Column|Double|String*/, r /*: Column|Double|String*/) /*: Column*/ {
        return F.pow(l, r);
    }


    /**
     * Returns the positive value of dividend mod divisor.
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static pmod(dividend /*: Column*/, divisor /*: Column*/) /*: Column*/ {
        return F.pmod(dividend, divisor);
    }

    /**
     * Returns the double value that is closest in value to the argument and
     * is equal to a mathematical integer.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static rint(col /*: Column | String */) /*: Column*/ {
        return F.rint(col);
    }

    /**
     * Returns the value of the column `e` roundd to 0 decimal places.
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static round(col /*: Column*/, scale=0 /*: Int*/) /*: Column*/ {
        return F.round(col, scale);
    }

    /**
     * Shift the the given value numBits left. If the given value is a long value, this function
     * will return a long value else it will return an integer value.
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static shiftLeft(col /*: Column*/, numBits /*: Int*/) /*: Column*/ {
        return F.shiftLeft(col, numBits);
    }

    /**
     * Shift the the given value numBits right. If the given value is a long value, it will return
     * a long value else it will return an integer value.
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static shiftRight(col /*: Column*/, numBits /*: Int*/) /*: Column*/ {
        return F.shiftRight(col, numBits);
    }

    /**
     * Unsigned shift the the given value numBits right. If the given value is a long value,
     * it will return a long value else it will return an integer value.
     *
     * @group math_funcs
     * @since 1.5.0
     */
    static shiftRightUnsigned(col /*: Column*/, numBits /*: Int*/) /*: Column*/ {
        return F.shiftRightUnsigned(col, numBits);
    }

    /**
     * Computes the signum of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static signum(col /*: Column | String */) /*: Column*/ {
        return F.signum(col);
    }

    /**
     * Computes the sine of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static sin(col /*: Column | String */) /*: Column*/ {
        return F.sin(col);
    }

    /**
     * Computes the hyperbolic sine of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static sinh(col /*: Column | String */) /*: Column*/ {
        return F.sinh(col);
    }

    /**
     * Computes the tangent of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static tan(col /*: Column | String */) /*: Column*/ {
        return F.tan(col);
    }

    /**
     * Computes the hyperbolic tangent of the given value.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static tanh(col /*: Column | String */) /*: Column*/ {
        return F.tanh(col);
    }

    /**
     * Converts an angle measured in radians to an approximately equivalent angle measured in degrees.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static toDegrees(col /*: Column | String */) /*: Column*/ {
        return F.toDegrees(col);
    }

    /**
     * Converts an angle measured in degrees to an approximately equivalent angle measured in radians.
     *
     * @group math_funcs
     * @since 1.4.0
     */
    static toRadians(col /*: Column | String */) /*: Column*/ {
        return F.toRadians(col);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Misc functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Calculates the MD5 digest of a binary column and returns the value
     * as a 32 character hex string.
     *
     * @group misc_funcs
     * @since 1.5.0
     */
    static md5(col /*: Column*/) /*: Column*/ {
        return F.md5(col);
    }

    /**
     * Calculates the SHA-1 digest of a binary column and returns the value
     * as a 40 character hex string.
     *
     * @group misc_funcs
     * @since 1.5.0
     */
    static sha1(col /*: Column*/) /*: Column*/ {
        return F.sha1(col);
    }

    /**
     * Calculates the SHA-2 family of hash functions of a binary column and
     * returns the value as a hex string.
     *
     * @param e column to compute SHA-2 on.
     * @param numBits one of 224, 256, 384, or 512.
     *
     * @group misc_funcs
     * @since 1.5.0
     */
    static sha2(col /*: Column*/, numBits /*: Int*/) /*: Column*/ {
        return F.sha2(col, numBits);
    }

    /**
     * Calculates the cyclic redundancy check value  (CRC32) of a binary column and
     * returns the value as a bigint.
     *
     * @group misc_funcs
     * @since 1.5.0
     */
    static crc32(col /*: Column*/) /*: Column*/ {
        return F.crc32(col);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // String functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Computes the numeric value of the first character of the string column, and returns the
     * result as a int column.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static ascii(col /*: Column*/) /*: Column*/ {
        return F.ascii(col);
    }

    /**
     * Computes the BASE64 encoding of a binary column and returns it as a string column.
     * This is the reverse of unbase64.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static base64(col /*: Column*/) /*: Column*/ {
        return F.base64(col);
    }

    /**
     * Concatenates multiple input string columns together into a single string column.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    /* @scala.annotation.varargs */
    static concat(exprs /*: Column* */) /*: Column*/ {
        return F.concat(exprs);
    }

    /**
     * Concatenates multiple input string columns together into a single string column,
     * using the given separator.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    /* @scala.annotation.varargs */
    static concat_ws(sep /*: String*/, exprs /*: Column* */) /*: Column*/ {
        return F.concat_ws(sep, exprs);
    }

    /**
     * Computes the first argument into a string from a binary using the provided character set
     * (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16').
     * If either argument is null, the result will also be null.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static decode(value /*: Column*/, charset /*: String*/) /*: Column*/ {
        return F.decode(value, charset);
    }

    /**
     * Computes the first argument into a binary from a string using the provided character set
     * (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16').
     * If either argument is null, the result will also be null.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static encode(value /*: Column*/, charset /*: String*/) /*: Column*/ {
        return F.encode(value, charset);
    }

    /**
     * Formats numeric column x to a format like '#,###,###.##', rounded to d decimal places,
     * and returns the result as a string column.
     *
     * If d is 0, the result has no decimal point or fractional part.
     * If d < 0, the result will be null.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static format_number(x /*: Column*/, d /*: Int*/) /*: Column*/ {
        return F.format_number(x, d);
    }

    /**
     * Formats the arguments in printf-style and returns the result as a string column.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    /* @scala.annotation.varargs */
    static format_string(format /*: String*/, args /*: Column* */) /*: Column*/ {
        return F.format_string(format, args);
    }

    /**
     * Returns a new string column by converting the first letter of each word to uppercase.
     * Words are delimited by whitespace.
     *
     * For example, "hello world" will become "Hello World".
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static initcap(col /*: Column*/) /*: Column*/ {
        return F.initcap(col);
    }

    /**
     * Locate the position of the first occurrence of substr column in the given string.
     * Returns null if either of the arguments are null.
     *
     * NOTE: The position is not zero based, but 1 based index, returns 0 if substr
     * could not be found in str.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static instr(str /*: Column*/, substring /*: String*/) /*: Column*/ {
        return F.instr(str, substring);
    }

    /**
     * Computes the length of a given string or binary column.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static length(col /*: Column*/) /*: Column*/ {
        return F.length(col);
    }

    /**
     * Converts a string column to lower case.
     *
     * @group string_funcs
     * @since 1.3.0
     */
    static lower(col /*: Column*/) /*: Column*/ {
        return F.lower(col);
    }

    /**
     * Computes the Levenshtein distance of the two given string columns.
     * @group string_funcs
     * @since 1.5.0
     */
    static levenshtein(l /*: Column*/, r /*: Column*/) /*: Column*/ {
        return F.levenshtein(l, r);
    }

    /**
     * Locate the position of the first occurrence of substr in a string
     * column, (after optional position pos).
     *
     * NOTE: The position is not zero based, but 1 based index. returns 0 if substr
     * could not be found in str.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static locate(substr /*: String*/, str /*: Column*/, pos=null /*: Int*/) /*: Column*/ {
        if (pos === null) {
            return F.locate(substr /*: String*/, str);
        } else {
            return F.locate(substr /*: String*/, str, pos);
        }
    }

    /**
     * Left-pad the string column with
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static lpad(str /*: Column*/, len /*: Int*/, pad /*: String*/) /*: Column*/ {
        return F.lpad(str /*: Column*/, len, pad);
    }

    /**
     * Trim the spaces from left end for the specified string value.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static ltrim(col /*: Column*/) /*: Column*/ {
        return F.ltrim(col);
    }

    /**
     * Extract a specific(idx) group identified by a java regex, from the specified string column.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static regexp_extract(col /*: Column*/, exp /*: String*/, groupIdx /*: Int*/) /*: Column*/ {
        return F.regexp_extract(col, exp, groupIdx);
    }

    /**
     * Replace all substrings of the specified string value that match regexp with rep.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static regexp_replace(col /*: Column*/, pattern /*: String*/, replacement /*: String*/) /*: Column*/ {
        return F.regexp_replace(col, pattern, replacement);
    }

    /**
     * Decodes a BASE64 encoded string column and returns it as a binary column.
     * This is the reverse of base64.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static unbase64(col /*: Column*/) /*: Column*/ {
        return F.unbase64(col);
    }

    /**
     * Right-padded with pad to a length of len.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static rpad(str /*: Column*/, len /*: Int*/, pad /*: String*/) /*: Column*/ {
        return F.rpad(str /*: Column*/, len, pad);
    }

    /**
     * Repeats a string column n times, and returns it as a new string column.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static repeat(str /*: Column*/, n /*: Int*/) /*: Column*/ {
        return F.repeat(str, n);
    }

    /**
     * Reverses the string column and returns it as a new string column.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static reverse(str /*: Column*/) /*: Column*/ {
        return F.reverse(str);
    }

    /**
     * Trim the spaces from right end for the specified string value.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static rtrim(col /*: Column*/) /*: Column*/ {
        return F.rtrim(col);
    }

    /**
     * * Return the soundex code for the specified expression.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static soundex(col /*: Column*/) /*: Column*/ {
        return F.soundex(col);
    }

    /**
     * Splits str around pattern (pattern is a regular expression).
     * NOTE: pattern is a string represent the regular expression.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static split(str /*: Column*/, pattern /*: String*/) /*: Column*/ {
        return F.split(str, pattern);
    }

    /**
     * Substring starts at `pos` and is of length `len` when str is String type or
     * returns the slice of byte array that starts at `pos` in byte and is of length `len`
     * when str is Binary type
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static substring(str /*: Column*/, pos /*: Int*/, len /*: Int*/) /*: Column*/ {
        return F.substring(str /*: Column*/, pos, len);
    }

    /**
     * Returns the substring from string str before count occurrences of the delimiter delim.
     * If count is positive, everything the left of the final delimiter (counting from left) is
     * returned. If count is negative, every to the right of the final delimiter (counting from the
     * right) is returned. substring_index performs a case-sensitive match when searching for delim.
     *
     * @group string_funcs
     */
    static substring_index(str /*: Column*/, delim /*: String*/, count /*: Int*/) /*: Column*/ {
        return F.substring_index(str /*: Column*/, delim, count);
    }

    /**
     * Translate any character in the src by a character in replaceString.
     * The characters in replaceString is corresponding to the characters in matchingString.
     * The translate will happen when any character in the string matching with the character
     * in the matchingString.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static translate(src /*: Column*/, matchingString /*: String*/, replaceString /*: String*/) /*: Column*/ {
        return F.translate(src /*: Column*/, matchingString, replaceString);
    }

    /**
     * Trim the spaces from both ends for the specified string column.
     *
     * @group string_funcs
     * @since 1.5.0
     */
    static trim(col /*: Column*/) /*: Column*/ {
        return F.trim(col);
    }

    /**
     * Converts a string column to upper case.
     *
     * @group string_funcs
     * @since 1.3.0
     */
    static upper(col /*: Column*/) /*: Column*/ {
        return F.upper(col);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // DateTime functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns the date that is numMonths after startDate.
     *
     * @group datetime_funcs
     * @since 1.5.0
     */
    static add_months(startDate /*: Column*/, numMonths /*: Int*/) /*: Column*/ {
        return F.add_months(startDate, numMonths);
    }

    /**
     * Returns the current date as a date column.
     *
     * @group datetime_funcs
     * @since 1.5.0
     */
    static current_date() /*: Column*/ {
        return F.current_date();
    }

    /**
     * Returns the current timestamp as a timestamp column.
     *
     * @group datetime_funcs
     * @since 1.5.0
     */
    static current_timestamp() /*: Column*/ {
        return F.current_timestamp();
    }

    /**
     * Converts a date/timestamp/string to a value of string in the format specified by the date
     * format given by the second argument.
     *
     * A pattern could be for instance `dd.MM.yyyy` and could return a string like '18.03.1993'. All
     * pattern letters of [[java.text.SimpleDateFormat]] can be used.
     *
     * NOTE: Use when ever possible specialized functions like [[year]]. These benefit from a
     * specialized implementation.
     *
     * @group datetime_funcs
     * @since 1.5.0
     */
    static date_format(dateExpr /*: Column*/, format /*: String*/) /*: Column*/ {
        return F.date_format(dateExpr, format);
    }

    /**
     * Returns the date that is `days` days after `start`
     * @group datetime_funcs
     * @since 1.5.0
     */
    static date_add(start /*: Column*/, days /*: Int*/) /*: Column*/ {
        return F.date_add(start, days);
    }

    /**
     * Returns the date that is `days` days before `start`
     * @group datetime_funcs
     * @since 1.5.0
     */
    static date_sub(start /*: Column*/, days /*: Int*/) /*: Column*/ {
        return F.date_sub(start, days);
    }

    /**
     * Returns the number of days from `start` to `end`.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static datediff(end /*: Column*/, start /*: Column*/) /*: Column*/ {
        return F.datediff(end, start);
    }

    /**
     * Extracts the year as an integer from a given date/timestamp/string.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static year(col /*: Column*/) /*: Column*/ {
        return F.year(col);
    }

    /**
     * Extracts the quarter as an integer from a given date/timestamp/string.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static quarter(col /*: Column*/) /*: Column*/ {
        return F.quarter(col);
    }

    /**
     * Extracts the month as an integer from a given date/timestamp/string.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static month(col /*: Column*/) /*: Column*/ {
        return F.month(col);
    }

    /**
     * Extracts the day of the month as an integer from a given date/timestamp/string.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static dayofmonth(col /*: Column*/) /*: Column*/ {
        return F.dayofmonth(col);
    }

    /**
     * Extracts the day of the year as an integer from a given date/timestamp/string.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static dayofyear(col /*: Column*/) /*: Column*/ {
        return F.dayofyear(col);
    }

    /**
     * Extracts the hours as an integer from a given date/timestamp/string.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static hour(col /*: Column*/) /*: Column*/ {
        return F.hour(col);
    }

    /**
     * Given a date column, returns the last day of the month which the given date belongs to.
     * For example, input "2015-07-27" returns "2015-07-31" since July 31 is the last day of the
     * month in July 2015.
     *
     * @group datetime_funcs
     * @since 1.5.0
     */
    static last_day(col /*: Column*/) /*: Column*/ {
        return F.last_day(col);
    }

    /**
     * Extracts the minutes as an integer from a given date/timestamp/string.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static minute(col /*: Column*/) /*: Column*/ {
        return F.minute(col);
    }

    /*
     * Returns number of months between dates `date1` and `date2`.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static months_between(date1 /*: Column*/, date2 /*: Column*/) /*: Column*/ {
        return F.months_between(date1, date2);
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
     * @group datetime_funcs
     * @since 1.5.0
     */
    static next_day(date /*: Column*/, dayOfWeek /*: String*/) /*: Column*/ {
        return F.next_day(date, dayOfWeek);
    }

    /**
     * Extracts the seconds as an integer from a given date/timestamp/string.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static second(col /*: Column*/) /*: Column*/ {
        return F.second(col);
    }

    /**
     * Extracts the week number as an integer from a given date/timestamp/string.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static weekofyear(col /*: Column*/) /*: Column*/ {
        return F.weekofyear(col);
    }

    /**
     * Converts the number of seconds from unix epoch (1970-01-01 00:00:00 UTC) to a string
     * representing the timestamp of that moment in the current system time zone in the given
     * format (defaults to "yyyy-MM-dd HH:mm:ss").
     * @group datetime_funcs
     * @since 1.5.0
     */
    static from_unixtime(ut /*: Column*/, f=null /*: String*/) /*: Column*/ {
        if (f === null) {
            return F.from_unixtime(ut);
        } else {
            return F.from_unixtime(ut, f);
        }
    }

    /**
     * Returns a Unix timestamp in seconds.
     * If no arguments are passed, returns current time.
     * If col is passed, it is parsed with the given format (see [http://docs.oracle.com/javase/tutorial/i18n/format/simpleDateFormat.html]). The format defaults to (format yyyy-MM-dd HH:mm:ss).
     * @group datetime_funcs
     * @since 1.5.0
     */
    static unix_timestamp(s=null /*: Column*/, f=null /*: String*/) /*: Column*/ {
        if (s === null) {
            return F.unix_timestamp();
        } else if (f === null) {
            return F.unix_timestamp(s);
        } else {
            return F.unix_timestamp(s, f);
        }
    }

    /**
     * Converts the column into DateType.
     *
     * @group datetime_funcs
     * @since 1.5.0
     */
    static to_date(col /*: Column*/) /*: Column*/ {
        return F.to_date(col);
    }

    /**
     * Returns date truncated to the unit specified by the format.
     *
     * @param format: 'year', 'yyyy', 'yy' for truncate by year,
     *               or 'month', 'mon', 'mm' for truncate by month
     *
     * @group datetime_funcs
     * @since 1.5.0
     */
    static trunc(date /*: Column*/, format /*: String*/) /*: Column*/ {
        return F.trunc(date, format);
    }

    /**
     * Assumes given timestamp is UTC and converts to given timezone.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static from_utc_timestamp(ts /*: Column*/, tz /*: String*/) /*: Column*/ {
        return F.from_utc_timestamp(ts, tz);
    }

    /**
     * Assumes given timestamp is in given timezone and converts to UTC.
     * @group datetime_funcs
     * @since 1.5.0
     */
    static to_utc_timestamp(ts /*: Column*/, tz /*: String*/) /*: Column*/ {
        return F.to_utc_timestamp(ts, tz);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // Collection functions
    //////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns true if the array contain the value
     * @group collection_funcs
     * @since 1.5.0
     */
    static array_contains(column /*: Column*/, value /*: Any*/) /*: Column*/ {
        return F.array_contains(column, value);
    }

    /**
     * Creates a new row for each element in the given array or map column.
     *
     * @group collection_funcs
     * @since 1.3.0
     */
    static explode(col /*: Column*/) /*: Column*/ {
        return F.explode(col);
    }

    /**
     * Creates a new row for a json column according to the given field names.
     *
     * @group collection_funcs
     * @since 1.6.0
     */
    /* @scala.annotation.varargs */
    static json_tuple(json /*: Column*/, fields /*: String* */) /*: Column*/ {
        return F.json_tuple(json, fields);
    }

    /**
     * Returns length of array or map.
     *
     * @group collection_funcs
     * @since 1.5.0
     */
    static size(col /*: Column*/) /*: Column*/ {
        return F.size(col);
    }

    /**
     * Sorts the input array for the given column in ascending order,
     * according to the natural ordering of the array elements.
     *
     * @group collection_funcs
     * @since 1.5.0
     */
    static sort_array(col /*: Column*/, asc=true /*: Boolean*/) /*: Column*/ {
        return F.sort_array(col, asc);
    }
}

function functions() {
    if (F) return Functions;
    F = java.import("org.apache.spark.sql.functions");
    return Functions;
}

module.exports = functions;
