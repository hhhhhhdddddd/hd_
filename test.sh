#!/bin/bash
hd=(
    "hd_.js"
)
panel=(
    "panel/panel.js"
    "panel/composite.js"
    "panel/leaf.js"
    "panel/field.js"
    "panel/horizontal.js"
    "panel/vertical.js"
)
dom=(
    "dom/htmlbuilder.js"
)

function testPrintArray(){
    for i in ${!1}
    do
        echo "$i"
    done
}

function catArrayToFile(){
    for i in ${!1}
    do
        cat "$i" >> $2
    done
}

dest="../toto.js"
testPrintArray panel[@]
catArrayToFile hd[@] $dest
catArrayToFile panel[@] $dest
catArrayToFile dom[@] $dest


#hdLib="../hd_.js"
#for i in ${!tab[@]}
#do
#    cat ${tab[i]}
#done
