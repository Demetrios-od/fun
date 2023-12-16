#!/bin/sh

# This script finds files with text, specified in the first parameter,
# and moves found files to subfolder with name in the second parameter.
# If output path does not exist, it will be created.

if !( [ -d $2 ] ) ; then
    mkdir $2
fi
for i in *.txt
    do
    if [ $(cat $i | grep $1 | wc -w) -gt 0 ] ; then
        mv $i $2/$i
    fi
    done

