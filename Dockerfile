FROM java:openjdk-8u66-jdk
MAINTAINER tobilg <fb.tools.github@gmail.com>

# packages
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv E56151BF && \
    echo "deb http://repos.mesosphere.io/debian jessie main" | tee /etc/apt/sources.list.d/mesosphere.list && \
    echo "deb http://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list && \
    apt-get update && \
    apt-get install --no-install-recommends -y --force-yes mesos=0.25.0-0.2.70.debian81 \
    wget \
    python \
    make \
    gcc \
    build-essential \
    g++

# Overall ENV vars
ENV APP_BASE_PATH /app
ENV SPARK_VERSION 1.6.3
ENV MESOS_BUILD_VERSION 0.25.0-0.2.70

# Install Node.js 5.x
ENV NODE_VERSION v5.1.0
RUN wget --no-check-certificate https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-linux-x64.tar.gz && \
    tar -C /usr/local --strip-components 1 -xzf node-$NODE_VERSION-linux-x64.tar.gz && \
    rm node-$NODE_VERSION-linux-x64.tar.gz

# Spark ENV vars
ENV SPARK_VERSION_STRING spark-$SPARK_VERSION-bin-hadoop2.6
ENV SPARK_DOWNLOAD_URL http://d3kbcqa49mib13.cloudfront.net/$SPARK_VERSION_STRING.tgz

# Download and unzip Spark
RUN wget $SPARK_DOWNLOAD_URL && \
    mkdir -p /usr/local/spark && \
    tar xvf $SPARK_VERSION_STRING.tgz -C /tmp && \
    cp -rf /tmp/$SPARK_VERSION_STRING/* /usr/local/spark/ && \
    rm -rf -- /tmp/$SPARK_VERSION_STRING && \
    rm spark-$SPARK_VERSION-bin-hadoop2.6.tgz

# Set SPARK_HOME
ENV SPARK_HOME /usr/local/spark

# Set ASSEMBLY_JAR
ENV ASSEMBLY_JAR $SPARK_HOME/lib/spark-assembly-$SPARK_VERSION-hadoop2.6.0.jar

# Set native Mesos library path
ENV MESOS_NATIVE_JAVA_LIBRARY /usr/local/lib/libmesos.so

# Create folder for app
RUN mkdir -p $APP_BASE_PATH

# Add files
ADD . $APP_BASE_PATH

# Set working directory
WORKDIR $APP_BASE_PATH

# Setup of the configurator
RUN chmod +x index.js && \
    chmod +x $APP_BASE_PATH/bin/spark-node && \
    npm install -g node-gyp && \
    npm install && \
    npm run compile

CMD ["node", "/app/bin/spark-node"]
