"use strict";

class Row {
    constructor (jvm_obj) {
        this.jvm_obj = jvm_obj;
    }

    /**
     * Returns the value at position i. If the value is null, null is returned. The following
     * is a mapping between Spark SQL types and return types:
     *
     * {{{
     *   BooleanType -> java.lang.Boolean
     *   ByteType -> java.lang.Byte
     *   ShortType -> java.lang.Short
     *   IntegerType -> java.lang.Integer
     *   FloatType -> java.lang.Float
     *   DoubleType -> java.lang.Double
     *   StringType -> String
     *   DecimalType -> java.math.BigDecimal
     *
     *   DateType -> java.sql.Date
     *   TimestampType -> java.sql.Timestamp
     *
     *   BinaryType -> byte array
     *   ArrayType -> scala.collection.Seq (use getList for java.util.List)
     *   MapType -> scala.collection.Map (use getJavaMap for java.util.Map)
     *   StructType -> org.apache.spark.sql.Row (or Product)
     * }}}
     */
    get(i /*: Int*/ ) /*: Any*/ {
        return this.jvm_obj.get(i);
    }

    /** Checks whether the value at position i is null. */
    isNullAt(i /*: Int */) /*: Boolean*/{
        return this.jvm_obj.isNullAt(i);
    }

    /**
     * Returns the index of a given field name.
     *
     * @throws UnsupportedOperationException when schema is not defined.
     * @throws IllegalArgumentException when fieldName do not exist.
     */
    fieldIndex(name /*: String*/) /*: Int */ {
        return this.jvm_obj.fieldIndex(name);
    }

    /** Returns true if there are any NULL values in this row. */
    anyNull() /*: Boolean*/ {
        return this.jvm_obj.anyNull();
    }

    values() /*: Array[java.lang.Object]*/ {
        function rec(values) {
            return values.map(v => {
                if (v === null || typeof v === "string" || typeof v === "number") {
                    return v;
                }
                if (typeof v === "object") {
                    switch (v.constructor.name) {
                        case "Number":
                            // java longs are returned as NumberObjects;
                            // transform them back to plain old Numbers.  for
                            // some reason `v instanceof Number` is false, so
                            // use constructor.name
                            return Number(v);
                        case "nodeJava_scala_collection_mutable_WrappedArray_ofRef":
                            return rec(v.array());
                        case "nodeJava_org_apache_spark_sql_catalyst_expressions_GenericRowWithSchema":
                            return rec(v.values());
                        default:
                            throw new Error(`Row.values: unknown value constructor ${v.constructor.name}`);
                    }
                }
                throw new Error(`Row.values: unknown value type ${typeof v}`);
            })
        }
        return rec(this.jvm_obj.values());
    }
}

module.exports = Row;
