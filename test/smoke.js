var expect = require("chai").expect;
var path = require("path");

var spark = require("..");

var DataFrame = require("../js/DataFrame");


describe("Smoke test", function() {
    var sqlContext;

    this.timeout(10000);

    it("create sqlContext", function(done) {
        var args = ["--class", "org.apache.spark.repl.Main",
                    "shark-shell"];

        sqlContext = spark(args, process.env.ASSEMBLY_JAR).sqlContext;
        done();
    });

    it("sqlContext.read().json() returns DataFrame", function(done) {
        var df = sqlContext.read().json(path.join(__dirname, "..", "data/people.json"));
        expect(df).to.be.an.instanceof(DataFrame);
        done();
    });

    it("sqlContext.read().collect() returns array of Rows with correct values", function(done) {
        sqlContext.read().json("./data/people.json").collect(function(err, rows) {
            rows.forEach(function (row) { expect(row).to.be.an.instanceof(Object);});
            expect(rows).to.deep.equal([[null, "Michael"], [30, "Andy"], [19, "Justin"]]);
            done();
        });
    });

    it("sqlContext.read().collectSync() returns array of Rows with correct values", function(done) {
        var rows = sqlContext.read().json("./data/people.json").collectSync();

        rows.forEach(function (row) { expect(row).to.be.an.instanceof(Object);});

        expect(rows).to.deep.equal([[null, "Michael"], [30, "Andy"], [19, "Justin"]]);

        done();
    });


    describe("Readme steps", function() {
        var df, sqlContext;

        it("create sqlContext", function(done) {
            sqlContext = spark([], process.env.ASSEMBLY_JAR).sqlContext;
            done();
        });

        it("var df = sqlContext.read().json(\"data/people.json\");", function(done) {
            df = sqlContext.read().json(path.join(__dirname, "..", "data/people.json"));
            expect(df).to.be.an.instanceof(DataFrame);
            done();
        });

        it("var df = sqlContext.createDataFrame([{\"name\":\"Michael\"}, {\"name\":\"Andy\", \"age\":30}, {\"name\":\"Justin\", \"age\": 19}])", function(done) {
            df = sqlContext.createDataFrame([{"name":"Michael"}, {"name":"Andy", "age":30}, {"name":"Justin", "age": 19}]);
            expect(df).to.be.an.instanceof(DataFrame);
            done();
        });

        it("df.show()", function(done) {
            var output = df.jvm_obj.showString(20, true).split("\n");
            /*
             +----+-------+
             | age|   name|
             +----+-------+
             |null|Michael|
             |  30|   Andy|
             |  19| Justin|
             +----+-------+
             */
            expect(output[1]).to.match(/.*age.*name.*/);
            expect(output[3]).to.match(/.*null.*Michael.*/);
            expect(output[4]).to.match(/.*30.*Andy.*/);
            expect(output[5]).to.match(/.*19.*Justin.*/);
            done();
        });

        it("df.printSchema()", function(done) {
            var output = df.jvm_obj.schema().treeString().split("\n");
            /*
             root
             |-- age: long (nullable = true)
             |-- name: string (nullable = true)
             */
            expect(output[1]).to.match(/.*age: long \(nullable = true\)/);
            expect(output[2]).to.match(/.*name: string \(nullable = true\)/);
            done();
        });

        it("df.select(df.col(\"name\")).show()", function(done) {
            var output = df.select(df.col("name")).jvm_obj.showString(20, true).split("\n");
            /*
             +-------+
             |   name|
             +-------+
             |Michael|
             |   Andy|
             | Justin|
             +-------+
             */
            expect(output[3]).to.equal("|Michael|");
            done();
        });

        it("df.select(\"name\").show()", function(done) {
            var output = df.select("name").jvm_obj.showString(20, true).split("\n");
            expect(output[5]).to.equal("| Justin|");
            done();
        });

        it("var res = df.select(\"name\").collectSync()", function(done) {
            var res = df.select("name").collectSync();
            expect(res).to.deep.equal([["Michael"], ["Andy"], ["Justin"]]);
            done();
        });

        it("df.select(df.col(\"name\"), df.col(\"age\").plus(1)).show()", function(done) {
            var output = df.select(df.col("name"), df.col("age").plus(1)).jvm_obj.showString(20, true).split("\n");
            /*
             +-------+---------+
             |   name|(age + 1)|
             +-------+---------+
             |Michael|     null|
             |   Andy|       31|
             | Justin|       20|
             +-------+---------+
             */

            expect(output[3]).to.match(/.*Michael.*null.*/);
            expect(output[5]).to.match(/.*Justin.*20.*/);
            done();
        });

        it("df.filter(df.col(\"age\").gt(21)).show()", function(done) {
            var output = df.filter(df.col("age").gt(21)).jvm_obj.showString(20, true).split("\n");
            /*
             +---+----+
             |age|name|
             +---+----+
             | 30|Andy|
             +---+----+
             */

            expect(output[3]).to.match(/.*30.*Andy.*/);
            done();
        });

        it("df.groupBy(\"age\").count().show()", function(done) {
            var output = df.groupBy("age").count().jvm_obj.showString(20, true).split("\n");
            /*
             +----+-----+
             | age|count|
             +----+-----+
             |null|    1|
             |  19|    1|
             |  30|    1|
             +----+-----+
             */

            expect(output[3]).to.match(/.*null.*1.*/);
            expect(output[4]).to.match(/.*19.*1.*/);
            expect(output[5]).to.match(/.*30.*1.*/);
            done();
        });

        it("df.agg(F.min(df.col(\"age\")), F.avg(df.col(\"age\"))).show()", function(done) {
            var F = spark([], process.env.ASSEMBLY_JAR).sqlFunctions;

            var output = df.agg(F.min(df.col("age")), F.avg(df.col("age"))).jvm_obj.showString(20, true).split("\n");
            /*
             +--------+--------+
             |min(age)|avg(age)|
             +--------+--------+
             |      19|    24.5|
             +--------+--------+
             */

            expect(output[1]).to.match(/.*min\(age\).*avg\(age\).*/);
            expect(output[3]).to.match(/.*19.*24\.5.*/);
            done();
        });

        it("sqlContext.sql(\"SELECT name FROM people WHERE age >= 13 AND age <= 19\")", function(done) {
            df.registerTempTable("people");
            var output = sqlContext.sql("SELECT name FROM people WHERE age >= 13 AND age <= 19").jvm_obj.showString(20, true).split("\n");
            /*
             +------+
             |  name|
             +------+
             |Justin|
             +------+
             */
            expect(output[1]).to.match(/.*name.*/);
            expect(output[3]).to.match(/.*Justin.*/);
            done();
        });
    });

    describe("Readme example: word count", function() {


        it("check counts ", function(done) {

            var sqlContext = spark([], process.env.ASSEMBLY_JAR).sqlContext;
            var lines = sqlContext.read().text(path.join(__dirname, "..", "data/words.txt"));
            var F = spark([], process.env.ASSEMBLY_JAR).sqlFunctions;
            var splits = lines.select(F.split(lines.col("value"), " ").as("words"));
            var occurrences = splits.select(F.explode(splits.col("words")).as("word"));
            var counts = occurrences.groupBy("word").count();
            var output = counts.where("count>10").sort(counts.col("count")).jvm_obj.showString(20, true).split("\n");
            /*
             +-----+-----+
             | word|count|
             +-----+-----+
             |   is|   13|
             |   in|   14|
             |   of|   14|
             |   to|   16|
             |  the|   20|
             |    a|   21|
             |  and|   24|
             |Spark|   27|
             +-----+-----+
             */
            expect(output[3]).to.match(/.*is.*13.*/);
            expect(output[10]).to.match(/.*Spark.*27.*/);
            done();
        });
    });

});

