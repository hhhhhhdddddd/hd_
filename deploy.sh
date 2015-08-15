#!/bin/bash
tempFile="hdtemp"
hdFile='hd_.js'
destinationDir=$1
destinationFile="$destinationDir/$hdFile"

echo "deploying to: $destinationFile"
find ! -name $hdFile -name "*.js" -exec cat {} \; > $tempFile
cat $hdFile $tempFile > $destinationFile
rm $tempFile