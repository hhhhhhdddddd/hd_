#!/bin/bash

# Build et déploie hd_ dans les dossiers en argument en remplaçant les hd_.js existant
tempFile="hdtemp"
hdFile='hd_.js'
destinationFile="$destinationDir$hdFile"

echo "deploying to: $destinationFile"
find ! -name $hdFile -name "*.js" -exec cat {} \; > $tempFile

for destinationDir in "$@"
do
    destinationFile="$destinationDir$hdFile"
    echo "$0: deploying to: $destinationFile"
    cat $hdFile $tempFile > $destinationFile
done

rm $tempFile