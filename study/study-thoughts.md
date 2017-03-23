a = log
b = compareVersions

-a = dev1
-b = dev2
+a = dev3
+b = dev4

  \item \textbf{T1:} Scenario 1 without annotation
  \item \textbf{T2:} Scenario 2 without annotation
  \item \textbf{T3:} Scenario 1 with annotation
  \item \textbf{T4:} Scenario 2 with annotation

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


P1: dev3+dev2
P2: dev3+dev2
P3: dev1+dev4
P4: dev1+dev4
P5: dev4+dev1
P6: dev4+dev1
P7: dev2+dev3
P8: dev2+dev3