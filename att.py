#!/usr/bin/python
from __future__ import division
import sys
import math

def calc(s,lmap,pw):
    p1 = s.find('+')
    p2 = s.find('-')
    if p1 == -1:
        if p2 == -1:
            s1 = s
            nm = 0
        else:
            s1 = s[:p2]
            nm = int(s[p2+1:])
        np = 0
    else:
        if p2 == -1:
            s1 = s[:p1]
            np = int(s[p1+1:])
            nm = 0
        else:
            if p1 < p2:
                s1 = s[:p1]
                np = int(s[p1+1:p2])
                nm = int(s[p2+1:])
            else:
                s1 = s[:p2]
                nm = int(s[p2+1:p1])
                np = int(s[p1+1:])
    # processing s1 (marks)
    sm = 0
    cnt = 0
    for x in s1:
        if x in 'ABCDEXFN.':
            sm += lmap[x]
            cnt += 1
    return sm/cnt + (np-nm)*pw

# main program
lm = 'ABCDEXF'
if sys.argv[1] == '-n':   # NUMERIC MODE
    lmap = {'A': 100,
            'B': 85,
            'C': 80,
            'D': 70,
            'E': 60,
            'X': 40,
            'F': 0,
            'N': 0,
            '.': 40}
    lmapd = {'A': [90, 100],
             'B': [82, 89],
             'C': [74, 81],
             'D': [64, 73],
             'E': [60, 63],
             'X': [35, 59],
             'F': [0, 34]}
    mark = int(math.ceil(calc(sys.argv[2].upper(),lmap,5)))
    if mark > 100:
        print('Result: 100 (A)')
    elif mark < 0:
        print('Result: 0 (F)')
    else:
        for x in lm:
            if lmapd[x][0] <= mark <= lmapd[x][1]:
                print('Result: '+str(mark)+' ('+x+')')
                break
elif sys.argv[1] == '-l':   # LETTER MODE
    lmap = {'A': 6,
            'B': 5,
            'C': 4,
            'D': 3,
            'E': 2,
            'X': 1,
            'F': 0,
            'N': 0,
            '.': 1}
    mark = calc(sys.argv[2].upper(),lmap,1/3)
    if mark > 6:
        print('Result: A')
    elif mark < 0:
        print('Result: F')
    else:
        if mark-math.trunc(mark) < 0.35:
            mark = math.trunc(mark)
        else:
            mark = math.trunc(math.ceil(mark))
        for x in lm:
            if lmap[x] == mark:
                print('Result: '+x)
                break
else:
    print("Invalid calculation mode. Use '-l' for letters or '-n' for numbers.")
