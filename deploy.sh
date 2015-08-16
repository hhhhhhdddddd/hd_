#!/bin/bash

# "Build" et déploie HD_ dans les dossiers en argument en remplaçant les hd_.js existants.
tempFile="hdtemp"
hdFile='hd_.js'
buildDir='build/'
buildFile=$buildDir$hdFile

echo "$0: deploying HD_"

# Création du dossier de build s'il n'existe pas
mkdir -p $buildDir || exit 1

# Build... Juste une concaténation pour l'instant.
find ! -name $hdFile -name "*.js" -exec cat {} \; > $tempFile
builtLib=$(cat $hdFile $tempFile)
echo $builtLib > $buildFile

# Déploiement
for destinationDir in "$@"
do
    destinationFile="$destinationDir$hdFile"
    echo "$0: deploying to: $destinationDir"
    cp $buildFile  $destinationDir
done

rm $tempFile