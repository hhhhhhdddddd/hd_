#!/bin/bash

# Copie vers plusieurs dossier
# "${@:2}"; on saute le premier argument qui est la source
for destinationDir in "${@:2}";
do
    echo "$0: copying $1 to $destinationDir"
    cp build/hd_.js $destinationDir
done