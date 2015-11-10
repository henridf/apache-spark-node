package org.apache.spark.deploy

import java.io.File
import java.net.URL

import scala.collection.JavaConverters._
import scala.language.implicitConversions

import org.apache.spark.deploy.rest._
import org.apache.spark.util.{ChildFirstURLClassLoader, MutableURLClassLoader, Utils}

/**
 * Thin wrapper over SparkSubmit that doesn't actually start a main class.
 */
object NodeSparkSubmit {
  def apply(args: Array[String]): Unit = {
    val appArgs = new SparkSubmitArguments(args)

    if (appArgs.verbose) {
      SparkSubmit.printStream.println(appArgs);
    }
    appArgs.action match {
      case SparkSubmitAction.SUBMIT => submit(appArgs)
      case SparkSubmitAction.KILL => kill(appArgs)
      case SparkSubmitAction.REQUEST_STATUS => requestStatus(appArgs)
    }
  }

  /**
   *  Copied verbatim from SparkSubmit.scala (can't be called from here due to
   *  private scope).
   */
  private def kill(args: SparkSubmitArguments): Unit = {
    new RestSubmissionClient(args.master)
      .killSubmission(args.submissionToKill)
  }

  /**
   *  Copied verbatim from SparkSubmit.scala (can't be called from here due to
   *  private scope).
   */
  private def requestStatus(args: SparkSubmitArguments): Unit = {
    new RestSubmissionClient(args.master)
      .requestSubmissionStatus(args.submissionToRequestStatusFor)
  }

  /**
   *  Copied verbatim from SparkSubmit.scala (can't be called from here due to
   *  private scope).
   */
  private def addJarToClasspath(localJar: String, loader: MutableURLClassLoader) {
    val uri = Utils.resolveURI(localJar)
    uri.getScheme match {
      case "file" | "local" =>
        val file = new File(uri.getPath)
        if (file.exists()) {
          loader.addURL(file.toURI.toURL)
        } else {
          SparkSubmit.printWarning(s"Local jar $file does not exist, skipping.")
        }
      case _ =>
        SparkSubmit.printWarning(s"Skip remote jar $uri.")
    }
  }


  private def submit(args: SparkSubmitArguments): Unit = {
    val (childArgs, childClasspath, sysProps, childMainClass) = SparkSubmit.prepareSubmitEnvironment(args)
    // scalastyle:off println
    if (args.verbose) {
      SparkSubmit.printStream.println(s"Main class:\n$childMainClass")
      SparkSubmit.printStream.println(s"Arguments:\n${childArgs.mkString("\n")}")
      SparkSubmit.printStream.println(s"System properties:\n${sysProps.mkString("\n")}")
      SparkSubmit.printStream.println(s"Classpath elements:\n${childClasspath.mkString("\n")}")
      SparkSubmit.printStream.println("\n")
    }
    // scalastyle:on println

    val loader =
      if (sysProps.getOrElse("spark.driver.userClassPathFirst", "false").toBoolean) {
        new ChildFirstURLClassLoader(new Array[URL](0),
          Thread.currentThread.getContextClassLoader)
      } else {
        new MutableURLClassLoader(new Array[URL](0),
          Thread.currentThread.getContextClassLoader)
      }
    Thread.currentThread.setContextClassLoader(loader)

    for (jar <- childClasspath) {
      addJarToClasspath(jar, loader)
    }

    for ((key, value) <- sysProps) {
      System.setProperty(key, value)
    }
  }
}
