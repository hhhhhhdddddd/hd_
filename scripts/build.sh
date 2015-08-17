#!/bin/bash

# Pour conserver l'indentation
# http://stackoverflow.com/questions/7314044/use-bash-to-read-line-by-line-and-keep-space
IFS=''

# "Build" et déploie HD_ dans les dossiers en argument en remplaçant les hd_.js existants.
cd ".."

buildDir='build/'
tempFileName="hdtemp"
tempFilePath="$buildDir$tempFileName"
srcDir="js/src/"
hdFileName='hd_.js'
buildFilePath="$buildDir$hdFileName"

echo "$0: building HD_..."

# Création du dossier de build s'il n'existe pas
mkdir -p $buildDir || exit 1

# Build... Juste une concaténation pour l'instant.
find ! -name $hdFileName -name "*.js" -exec cat {} \; > $tempFilePath
builtLib=$(cat $srcDir$hdFileName $tempFilePath)

timestamp="// build $(date +%Y%m%d_%H%M%S)"
echo $timestamp > $buildFilePath
echo $builtLib >> $buildFilePath

# Ménage
rm $tempFilePath