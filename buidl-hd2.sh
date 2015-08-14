#!/bin/bash
tempFile="hdtemp"
hd_file='hd_.js'
hd_lib="../hd_.js"
hd_pt="hd_.pt.js"
hd_pt="hd_.pt.js"
hd_html_builder="hd_.pt.js"
find ! -name $hd_file -name "*.js" -exec cat {} \; > $tempFile
cat $hdFile $hd_pt > $hd_lib
rm $tempFile