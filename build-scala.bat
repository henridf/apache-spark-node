@echo off

if exist "%~dp0org\apache\spark\deploy" del %~dp0\org\apache\scala\deploy
scalac -classpath %ASSEMBLY_JAR% %~dp0src\main\scala\NodeSparkSubmit.scala
