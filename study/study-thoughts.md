a = log
b = compareVersions

-a = dev1
-b = dev2
+a = dev3
+b = dev4

p1: +a -b
p2: -a +b
p3: +b -a
p4: -b +a

p5: +a -b
p6: -a +b
p7: +b -a
p8: -b +a

REPOS:

1+5: dev3+dev2
2+6: dev1+dev4
3+7: dev4+dev1
4+8: dev2+dev3 