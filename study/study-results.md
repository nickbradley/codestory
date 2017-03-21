Code review questions:
 1. What is the purpose of the method with the change?
 2. How did the method change?
 3. Why was this change made?



# Dev1 (-a)
(i) I'm not really familiar with the Json framework, nor its serialization by Google but it seems to me that the method got changed so the type of the listobject isn't defined when compiled, it has an unknown type and you let the gson framework decide what to do with it during runtime.

---

(i) What is the purpose of the method with the change?

The purpose of log(f, r) appears to be to append a log record r (of type JsonLog) to a file f, though the method remains unfinished.

Since file f is expected to contain a JSON array of JsonLog objects, the method parses the entire output file solely to append the new record in memory, and only then does it re-serialize the list of records back to the output file. It performs this inefficient juggling presumably because blindly appending to the file would result in a JSON syntax error. Oof.

How did the method change?

The Gson library's fromJson method expects an instance of either a Class or Type object, which tells Gson the type of Java object it should parse the JSON data into. The original code used the Class overload -- the changed code uses the Type overload instead.

The new code also appears to allow Gson to choose the List implementation, rather than mandate ArrayList as the list implementation.

Why was this change made?

Presumably because the original version didn't compile. The original tried to parse the log file into an ArrayList<JsonLog>, which, as a concrete instantiation of a parameterized type, does not possess a class literal. The solution, as described in the Gson documentation, is to use the TokenType<...>(){}.getType() incantation instead.

The motivation for changing ArrayList to List is less clear to me: the List interface cannot be instantiated directly, so the Gson implementation must choose an implementation for the user, and it seems very likely from some googling that that implementation will be ArrayList anyway. This seems unlikely to make a practical difference in behavior or performance, but could have some benefit in terms of genericity.

Some references:

http://stackoverflow.com/questions/5813434/trouble-with-gson-serializing-an-arraylist-of-pojos
https://github.com/google/gson/blob/master/UserGuide.md#serializing-and-deserializing-generic-types


---

1. To log something
2. Replaced `ArrayList` with `TypeToken`
3. Not clear

---

1. I think that the method is trying to convert a json object into a gson object.
2. It changed through the usage of the TypedToken List and anonymous class
3. The method is really small, though I believe that it was changed to consider the usage of interfaces and generics. As far as I remember, there is an issue trying to get the type of  ArrayList<JsonLog>.class and the correct implementation would have to create an anonymous class.


# Dev3 (+a)
(i) The purpose is to convert a list of JSON objects into a list with a custom java type, JsonLog
The second parameter in the call to gson.fromJson was changed from ArrayList.class to new TypeToken(){}.getType()
The code did not compile

---

(i) The purpose of the method is to parse a JSON file to an ArrayList of the custom object JsonLog. In the original version, the parsing fails because of an unconventional definition of the target Java type.

The method changed in the definition of the target type which is necessary due to Java's type safety. The type itself as well as the generic of this type are now passed on to the Json parser Gson indirectly, by first instantiating a dummy TokenType with a generic of the target type and, second, by calling .getType() on this dummy object.

The change was made because java class objects cannot simply be passed on as parameters if they are modified by generics.

---

1. Loads the JSON string into a JsonLog object.
2. Changes the specification of the type of object into which we're loading the JSON string.
3. I guess the old line 19 caused a compiler error?

---

1. Log some data to a file
2. Changed in the way you pass the object to gson.fromJson
3. That one I do not know, this verbose syntax was quite unknown to me (`TypeToken<List<JsonLog>>(){}.getType()`)

# Dev2 (-b)
(i) What is the purpose of the method with the change?
It compares to versions of a string and returns the difference as an integer with 0 being equal versions
How did the method change?
A manual string comparison is replaced by a built-in method using maven artifacts.
Why was this change made?
Presumably to make the comparison more robust and the code easier to read?

---

(i) The purpose of the method appears to be to compare the versions of two Maven artefacts. According to Java conventions, the method returns an integer 1 iff version1 > version2, 0 iff version1 == version2, and -1 iff version1 < version2.

A custom solution to the problem of comparing two version strings has been replaced by a method from the maven package. In the new method, DefaultArtefactVersion objects are instantiated given the respective version strings. These strings can then be compared according to maven standards. The new line 30, however, does not appear to have any effect.

The change was made because bugs in custom solutions are usually more likely than bugs in big projects like maven. Also, referring the comparison to the official maven sources increases the chances of future compatibility should the format for maven version numbers ever change.

---

1. Checks whether the two versions are the same.
2. Instead of doing a character-by-character string comparison of the two versions, converts them to a DefaultArtifactVersion object, and then compares the objects.
3. Hard to tell without knowing how DefaultArtifactVersion works (I could look it up but I don't want to); my guess is that the previous version is not robust to differently formatted strings that represent the same version.

---

1. Compare versions described in two strings being passed to this given method.
2. It was abstracted by `DefaultArtifactVersion(v)`.
3. To hide details about the version format being used by this program, making it cleaner.

# Dev4 (+b)
(i) The Method compareTo compares the version numbers of the two version input strings.
It got changed from doing it yourself to let Maven compare both versions.
It probably got changed because it makes sense to use existing frameworks for things like this, instead of doing it by yourself

---

(i) What is the purpose of the method with the change?

The method compareVersions(a, b) determines the precedence of two version strings, a and b. Precedence is indicated by an integer return value: less-than-zero implies a < b, greater-than-zero implies a > b, and equal-to-zero implies a == b. The two version strings are compared almost lexicographically, except that if they have differing lengths, the shorter of the two version strings is padded with zeros for every extra version number component that the longer string has.

How did the method change?

The implementation was changed from a homebrew implementation to an off-the-shelf implementation using Maven. Instead of comparing the versions as strings, they are now parsed into properly typed objects implementing the Comparable<T> interface.

A side effect of the change is that the version string "1.11" is uselessly parsed into an object, version, for every method call. This is because the new implementation was based on example code which checked a single version string against a version interval (with a min and max). The programmer failed to remove this third variable while refactoring the code to compare only two versions. See cargo cult programming.

Why was this change made?

The most likely motivation for the change is that the programmer needed to implement a new feature or quirk to the version comparison logic that Maven already handles, such as comparing non-numerical version components (e.g. the "-rc1" in "1.10-rc1"), and didn't want to reinvent the wheel. The new implementation possesses a few other benefits:

It is shorter, which aids readability.
It uses types to express its intent rather than performing its task in terms of strings. This allows the type-checker to catch programming errors earlier, which aids maintainability.
The Maven implementation, while ugly, is likely more robust than any homebrew attempt could be, simply because it is used and maintained by a wider audience.
There are some disadvantages to the refactor, too:

The programmer left a useless version variable in the code.
The exact behavior of Maven's version comparison logic and the original logic may be subtly different, and requires testing.
At first glance, the Maven implementation looks like it may be less efficient than the original implementation. This may be a problem if the method is called often.

---

1. Comparing two version numbers to an hardcoded one
2. Started using `DefaultArtifactVersion` instead of doing the check manually
3. To conform to the standards

---

1. The purpose of the method is to compare two project's versions, e.g. arquillian-1.0.1 < arquillian-1.1
2. They removed the string/integer comparison and used a third party library (maven-artifcat) instead
3. I think that for the sake of simplicity and not reinventing the well. Also, the new change is way simpler to understand than the older one, though I would write a small test to check whether the old code had any issues or it was updated only for the sake of simplicity. One thing that I noted was that the marked question on stackoverflow was not the most simple one and CodeStory pointed other solutions.
