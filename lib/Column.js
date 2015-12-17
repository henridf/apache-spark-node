/**
 * A column that will be computed based on the data in a {@link DataFrame}.
 *
 * A new column is constructed based on the input columns present in a dataframe:
 *
 * @example
 *   df("columnName")            // On a specific DataFrame.
 *   col("columnName")           // A generic column no yet associcated with a DataFrame.
 *   col("columnName.field")     // Extracting a struct field
 *   col("`a.column.with.dots`") // Escape `.` in column names.
 *
 * @example <caption> Columns can also be constructed using {@link sqlFunctions}:
 *   sqlFunctions.expr("a + 1")  // A column that is constructed from a parsed SQL Expression.
 *   sqlFunctions.lit("abc")     // A column that produces a literal (constant) value.
 *
 * @since 1.3.0
 */
class Column {

    constructor(jvm_obj) {
        this.jvm_obj = jvm_obj;
    }

    /**
     * Equality test.
     * @example
     *   df.filter( col("colA").equalTo(col("colB")) );
     *
     * @param other
     * @since 1.3.0
     */
    equalTo(other /*: Any*/) /*: Column*/ {
        return new Column(this.jvm_obj.equalTo(other));
    }

    /**
     * Greater than.
     *
     * @example
     *   people.select(people("age").gt(21));
     *
     * @param other
     * @since 1.3.0
     */
    gt(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.gt(other));
    }

    /**
     * Less than.
     *
     * @example
     *   people.select( people("age").lt(21) );
     *
     * @param other
     * @since 1.3.0
     */
    lt(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.lt(other));
    }

    /**
     * Less than or equal to.
     *
     * @example
     *   people.select( people("age").leq(21) );
     *
     * @param other
     * @since 1.3.0
     */
    leq(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.leq(other));
    }

    /**
     * Greater than or equal to an expression.
     *
     * @example
     *   people.select( people("age").geq(21) )
     *
     * @param other
     * @since 1.3.0
     */
    geq(other /*: Any */) /*: Column  */{
        return new Column(this.jvm_obj.geq(other));
    }

    /**
     * Equality test that is safe for null values.
     *
     * @param other
     * @since 1.3.0
     */
    eqNullSafe(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.eqNullSafe(other));
    }

    /**
     * Evaluates a list of conditions and returns one of multiple possible result expressions.
     * If otherwise is not defined at the end, null is returned for unmatched conditions.
     *
     * @example
     *   // Example: encoding gender string column into integer.
     *
     *   people.select(when(col("gender").equalTo("male"), 0)
     *     .when(col("gender").equalTo("female"), 1)
     *     .otherwise(2))
     *
     * @param value
     * @since 1.4.0
     */
    otherwise(value /*: Any */) /*: Column  */{
        return new Column(this.jvm_obj.otherwise(value));
    }

    /**
     * True if the current column is between the lower bound and upper bound, inclusive.
     *
     * @param lowerBound
     * @param upperBound
     * @since 1.4.0
     */
    between(lowerBound /*: Any */, upperBound /*: Any*/) /*: Column  */{
        return new Column(this.jvm_obj.between(lowerBound, upperBound));
    }

    /**
     * True if the current expression is NaN.
     *
     * @since 1.5.0
     */
    isNaN()/*: Column*/ {
        return new Column(this.jvm_obj.isNaN());
    }



    /**
     * True if the current expression is null.
     *
     * @since 1.3.0
     */
    isNull()/*: Column*/ {
        return new Column(this.jvm_obj.isNull());
    }

    /**
     * True if the current expression is NOT null.
     *
     * @since 1.3.0
     */
    isNotNull() /*: Column*/ {
        return new Column(this.jvm_obj.isNotNull());
    }

    /**
     * Boolean OR.
     *
     * @example
     *   people.filter( people("inSchool").or(people("isEmployed")) );
     *
     * @param other
     * @since 1.3.0
     */
    or(other /*: Column */) /*: Column  */ {
        return new Column(this.jvm_obj.or(other));
    }

    /**
     * Boolean AND.
     *
     * @example
     *   people.select( people("inSchool").and(people("isEmployed")) );
     *
     * @param other
     * @since 1.3.0
     */
    and(other /*: Column */) /*: Column  */ {
        return new Column(this.jvm_obj.and(other));
    }

    /**
     * Sum of this expression and another expression.
     * @example
     *
     * @param other
     *   people.select( people("height").plus(people("weight")) );
     *
     * @since 1.3.0
     */
    plus(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.plus(other));
    }

    /**
     * Subtraction. Subtract the other expression from this expression.
     *
     * @example
     *   people.select( people("height").minus(people("weight")) );
     *
     * @param other
     * @since 1.3.0
     */
    minus(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.minus(other));
    }

    /**
     * Multiplication of this expression and another expression.
     *
     * @example
     *   people.select( people("height").multiply(people("weight")) );
     *
     * @param other
     * @since 1.3.0
     */
    multiply(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.multiply(other));
    }

    /**
     * Division this expression by another expression.
     * @example
     *
     *   people.select( people("height").divide(people("weight")) );
     *
     * @param other
     * @since 1.3.0
     */
    divide(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.divide(other));
    }

    /**
     * Modulo (a.k.a. remainder) expression.
     *
     * @param other
     * @since 1.3.0
     */
    mod(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.mod(other));
    }

    /**
     * A boolean expression that is evaluated to true if the value of this expression is contained
     * by the evaluated values of the arguments.
     *
     * @param list
     * @since 1.5.0
     */
    isin(...list /*: Any* */) /*: Column  */ {
        return new Column(this.jvm_obj.isin(...list));
    }

    /**
     * SQL like expression.
     *
     * @param literal
     * @since 1.3.0
     */
    like(literal /*: String */) /*: Column  */ {
        return new Column(this.jvm_obj.like(literal));
    }

    /**
     * SQL RLIKE expression (LIKE with Regex).
     *
     * @param literal
     * @since 1.3.0
     */
    rlike(literal /*: String */) /*: Column  */ {
        return new Column(this.jvm_obj.rlike(literal));
    }

    /**
     * An expression that gets an item at position `ordinal` out of an array,
     * or gets a value by key `key` in a {@link MapType}.
     *
     * @param key
     * @since 1.3.0
     */
    getItem(key /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.getItem(key));
    }

    /**
     * An expression that gets a field by name in a {@link StructType}.
     *
     * @param fieldName
     * @since 1.3.0
     */
    getField(fieldName /*: String */) /*: Column  */ {
        return new Column(this.jvm_obj.getField(fieldName));
    }

    /**
     * An expression that returns a substring.
     * @param startPos starting position (Column or Number).
     * @param len length of the substring (Column or Number).
     *
     * @since 1.3.0
     */
    substr(startPos /*: Column | Int */, len /*: Column | Int*/) /*: Column  */ {
        return new Column(this.jvm_obj.substr(startPos, len));
    }

    /**
     * Contains the other element.
     *
     * @param other
     * @since 1.3.0
     */
    contains(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.contains(other));
    }

    /**
     * String starts with.
     *
     * @param other (Column or String).
     * @since 1.3.0
     */
    startsWith(other /*: Column */) /*: Column  */ {
        return new Column(this.jvm_obj.startsWith(other));
    }

    /**
     * String ends with.
     *
     * @param other (Column or String).
     * @since 1.3.0
     */
    endsWith(other /*: Column */) /*: Column  */ {
        return new Column(this.jvm_obj.endsWith(other));
    }

    /**
     * Gives the column an alias. Same as `as`.
     * @example
     *   // Renames colA to colB in select output.
     *   df.select(col("colA").alias("colB"))
     *
     * @param alias
     * @since 1.4.0
     */
    alias(alias /*: String */) /*: Column  */ {
        return new Column(this.jvm_obj.alias(alias));
    }

    /**
     * Gives the column an alias. Same as `alias`.
     * @example
     *
     * @param alias
     * @since 1.4.0
     */
    as(alias /*: String */) /*: Column  */ {
        return new Column(this.jvm_obj.as(alias));
    }

    /**
     * Casts the column to a different data type, using the canonical string representation
     * of the type. The supported types are: `string`, `boolean`, `byte`, `short`, `int`, `long`,
     * `float`, `double`, `decimal`, `date`, `timestamp`.
     * @example
     *   // Casts colA to integer.
     *   df.select(df("colA").cast("int"))
     *
     * @param to
     * @since 1.3.0
     */
    cast(to /*: String */) /*: Column  */ {
        return new Column(this.jvm_obj.cast(to));
    }

    /**
     * Returns an ordering used in sorting.
     *
     * @example
     *   df.sort(df.col("age").desc());
     * @since 1.3.0
     */
    desc() /*: Column*/ {
        return new Column(this.jvm_obj.desc());
    }

    /**
     * Returns an ordering used in sorting.
     *
     * @example
     *   df.sort(df.col("age").asc());
     *
     * @since 1.3.0
     */
    asc() /*: Column*/ {
        return new Column(this.jvm_obj.asc());
    }

    /**
     * Prints the expression to the console for debugging purpose.
     *
     * @param extended
     * @since 1.3.0
     */
    explain(extended /*: Boolean */) /*: Unit  */ {
        return new Column(this.jvm_obj.explain(extended));
    }

    /**
     * Compute bitwise OR of this expression with another expression.
     *
     * @example
     *   df.select(col("colA").bitwiseOR(col("colB")));
     * @param other
     * @since 1.4.0
     */
    bitwiseOR(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.bitwiseOR(other));
    }

    /**
     * Compute bitwise AND of this expression with another expression.
     *
     * @example
     *   df.select(col("colA").bitwiseAND(col("colB")));
     * @param other
     * @since 1.4.0
     */
    bitwiseAND(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.bitwiseAND(other));
    }

    /**
     * Compute bitwise XOR of this expression with another expression.
     *
     * @example
     *   df.select(col("colA").bitwiseXOR(col("colB")));
     *
     * @param other
     * @since 1.4.0
     */
    bitwiseXOR(other /*: Any */) /*: Column  */ {
        return new Column(this.jvm_obj.bitwiseXOR(other));
    }
}

module.exports = Column;
