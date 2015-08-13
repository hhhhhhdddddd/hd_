#!/bin/bash
tempFile="hdtemp"
hdFile='hd_.js'
hdLib="../hd_.js"
find ! -name $hdFile -name "*.js" -exec cat {} \; > $tempFile
cat $hdFile $tempFile > $hdLib
rm $tempFile