#!/bin/bash

# Copie vers plusieurs dossiers
# NB. "${@:2}"; permet de sauter le premier argument qui est la source.
for destinationDir in "${@:2}";
do
    echo "$0: copying $1 to $destinationDir"
    cp $1 $destinationDir
done