
Task:
 1. Clone 8 repos of [codestory-study-bootstrap](https://github.com/ataraxie/codestory-study-bootstrap)
    - Name each codestory-study-X
 2. Create pull requests in each repo


## Details
Dev1 branch -> Util.log w/o annotation (-a)
Dev3 branch -> Util.log w/ annotation (+a)
Dev2 branch -> Util.versionCompare w/o annotation (-b)
Dev4 branch -> Util.versionCompare w/ annotation (+b)

## Reviewing the pull request
@XXX Please review this pull request.
  1. What is the purpose of the method with the change?
  2. How did the method change?
  3. Why was this change made?

#if annotated
_Note: this diff contains a codestory that might be helpful._


## Debrief
 1. Please rank your experience reviewing the **first** pull request (pick one):
    - [ ] Very easy
    - [ ] Somewhat easy
    - [ ] Neutral
    - [ ] Somewhat challenging
    - [ ] Very challenging
 2. What factors influenced your experience reviewing the **first** pull request
    (choose all that apply):
    - [ ] Amount of code in the patch
    - [ ] Comments
    - [ ] Examining code outside of the patch
    - [ ] Patch description
    - [ ] External resources/websites, please specify: ________________________.
    - [ ] Other factors, please specify: __________________________________.
 3. If you could change one thing about the **first** pull request, it would be
    _________________________.








Two sets of questions:
 1. Questions about the code/diff
      - code flow
      - new variables
      - values changed
 2. Debrief questions about the experience as a whole (namely, which diff was easier to evaluate)


How did you feel reviewing the first pull request
 - very easy

 - very hard
What made it easy or hard: _______
If you could change any one thing about the code of the first PR, what would it be: _______



How did you feel reviewing the second pull request
 - very easy

 - very hard

What made it easy or hard: _______



- What does it do (maybe: what does the entire class do?)














Maven version compare:
http://stackoverflow.com/a/6640972/1105907


# TODO
[] Design Study
[] Tooling


# Design Questions
 - What should the results look like?
   - Should they be quantitative (e.g. measure the time it takes to do a task)
   - Qualitative: collect feedback from participant about the experience. (Reid preferred this method)
     - When/how should the participant report? At the end, or after each run? Should it be comparative?


---
Factors:
 - is code snippet/diff annotated?
 - what is the code snippet/diff?
 - What do the participants do?

Concerns
 - Learning bias: should a participant see the same diff where one is annotated vs not annotated?
   - No. Since evaluative, not comparative, the user will hopefully say more positive things
     about their experience with the annotated diffs. However, we should be sure that each participant
     gets the same number of annotated and unannotated diffs.
---





  - Give a brief description of what the method containing the change does
  - What was the change?
  - What was the developer's intention when writing this code?




Please
write down all your thoughts and, in particular, what you believe this code does.


- What does the code do?
- Why does the patch exist?
- Do you think this was mainly an improvement, bug fix or new feature?
- If it was a bug, what did the patch fix?










# Study Methodology
We will conduct a qualitative qualitative of our tool by having participants

Randomized complete block design

## Parameters
Number of participants: >= 4

## Treatments
A treatment refers to the code snippet that will be shown to participants in the
diff.


# Example
Assume we have 6 diffs, D1-D6, and 4 participants, P1-P4.

| Diff | Annotated  | Unannotated |
| ---- | ---------- | ----------- |
|   D1 | P1, P2     | P3, P4
|   D2 | P3, P4     | P1, P2
|   D3 | P1, P3, P4 | P2
|   D4 | P1, P2  P3 | P4
|   D5 | P2, P3, P4 | P1
|   D6 | P1, P2, P4 | P3





# Resources
[Online card sorting](http://www.optimalworkshop.com/pricing)
