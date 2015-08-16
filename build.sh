#!/bin/bash

# Pour conserver l'indentation
# http://stackoverflow.com/questions/7314044/use-bash-to-read-line-by-line-and-keep-space
IFS=''

# "Build" et déploie HD_ dans les dossiers en argument en remplaçant les hd_.js existants.
tempFile="hdtemp"
hdFile='hd_.js'
buildDir='build/'
buildFile=$buildDir$hdFile

echo "$0: building HD_..."

# Création du dossier de build s'il n'existe pas
mkdir -p $buildDir || exit 1

# Build... Juste une concaténation pour l'instant.
find ! -name $hdFile -name "*.js" -exec cat {} \; > $tempFile
builtLib=$(cat $hdFile $tempFile)
echo $builtLib > $buildFile

# Ménage
rm $tempFile