# Report for assignment 3

This is a template for your report. You are free to modify it as needed.
It is not required to use markdown for your report either, but the report
has to be delivered in a standard, cross-platform format.

## Project

Name: Three.js

URL: https://github.com/mrdoob/three.js/

Three.js is an easy to use, lightweight, cross-browser, general purpose 3D library.

## Onboarding experience

Three.js was easy to build. The usages of the three.js project and it's internals are [well-documented online](https://threejs.org/docs/), but most (if not all) units of code in the repository lacks comments.

The three.js project was easily built in it's entirety without errors using the build command `npm run build`. All examples used for testing was also easily built using `npm run build-examples`. The project was built using rollup.

After installing extra dependencies in the `<PROJECT>/test` directory, the unit-tests can be ran. Running e2e tests with `npm run test-e2e` requires chrome or a similar browser, since e2e tests use puppeteer which is running a headless chromium browser instance.

## Complexity

1. What are your results for ten complex functions?
   - Did all methods (tools vs. manual count) get the same result?
   - Are the results clear?

First we counted the cyclomatic complexity of functions in Three.js using [lizard](https://github.com/terryyin/lizard). The tool produced these results:

```
LOC  CCN  Name
301  146  WebGLProgram@382-888@three.js/src/renderers/webgl/WebGLProgram.js
153  119  parse@54-295@three.js/src/loaders/MaterialLoader.js
137  110  convert@7-253@three.js/src/renderers/webgl/WebGLUtils.js
138  107  toJSON@161-385@three.js/src/materials/Material.js
170  88   setProgram@1432-1756@three.js/src/renderers/WebGLRenderer.js
164  69   parseObject@711-1061@three.js/src/loaders/ObjectLoader.js
168  59   uploadTexture@661-1004@three.js/src/renderers/webgl/WebGLTextures.js
118  57   getProgramCacheKeyBooleans@351-474@three.js/src/renderers/webgl/WebGLPrograms.js
120  44   toJSON@629-869@three.js/src/core/Object3D.js
148  40   addShape@67-685@three.js/src/geometries/ExtrudeGeometry.js
```

We decided to count the cyclomatic complexity of the bottom 2 functions by hand:

```
Adam:
CCN   Name
40    toJSON@629-869@three.js/src/core/Object3D.js
39    addShape@67-685@three.js/src/geometries/ExtrudeGeometry.js

Zino:
CCN   Name
40    toJSON@629-869@three.js/src/core/Object3D.js
37    addShape@67-685@three.js/src/geometries/ExtrudeGeometry.js
```

We did not get the exact same results, but we came quite close. We agreed on what to count and not to count. For instance, we count `if`s, and `else-if`s, as well as `for`, `while` and other control flow statements. We do not count inline function definitions, as we could not find enough information on whether these are useful to include, and their code is not executed as part of the run of the main function.

The results of the tool are quite similar, but we might have missed some branches that should actually be included, or the tool is including something it shouldn't. We were unsure about wether to add inline function definitions. Adding these would increase the CCN more than the current difference between our measurement and the measurements of the tool.

2. Are the functions just complex, or also long?

One of the functions (`addShape@67-685@three.js/src/geometries/ExtrudeGeometry.js`) is very long and also has a large CCN. Most of the complexity come from loops, which are manipulating vertecies in the shape.
The other function (`toJSON@629-869@three.js/src/core/Object3D.js`) generally has very small branches (many oneliners/ternary expressions) and is therefore not as long, while having a similar CCN.

3. What is the purpose of the functions? Is it related to the high CC?

The purpose of `toJSON@Object3D.js` is to convert a 3D object to JSON, which means that the function is testing all properties of the 3d-object and applying them to a json object, and so naturally this function has a large amount of if-statements and thus CCN for its LOC.

The purpose of `addShape@67-685@three.js/src/geometries/ExtrudeGeometry.js` is to create a data object for applying transformations. Most of the complexity of this function comes from iterating through these vertecies in order to create this data object.

4. Are exceptions taken into account in the given measurements?

No try-catch blocks were found in these functions, but they are supported by the JavaScript programming language. The documentation for the code complexity tool (lizard) is not very clear on whether try-except blocks are included in the CCN, although they probably should.

If we think of an exception as a possible branch, the ammuont of possible branches should scale linearly with the number of lines of code which are able to raise exceptions.

5. Is the documentation of the function clear about the different possible outcomes induced by different branches taken?

No, the functions are generally not very clear about the possible outcomes by different branches. Some more complex branches have explanations, while simpler branches are self-explanatory. Most branches of medium complexity remain undocumented, and it is not immediately clear what happens if any branch is or is not taken.

## Refactoring

Plan for refactoring complex code:

Estimated impact of refactoring (lower CC, but other drawbacks?).

Carried out refactoring (optional, P+):

git diff ...

## Coverage

### Tools

Document your experience in using a "new"/different coverage tool.

How well was the tool documented? Was it possible/easy/difficult to
integrate it with your build environment?

### Your own coverage tool

Show a patch (or link to a branch) that shows the instrumented code to
gather coverage measurements.

The patch is probably too long to be copied here, so please add
the git command that is used to obtain the patch instead:

git diff ...

What kinds of constructs does your tool support, and how accurate is
its output?

### Evaluation

1. How detailed is your coverage measurement?

2. What are the limitations of your own tool?

3. Are the results of your tool consistent with existing coverage tools?

## Coverage improvement

Show the comments that describe the requirements for the coverage.

Report of old coverage: [link]

Report of new coverage: [link]

Test cases added:

git diff ...

Number of test cases added: two per team member (P) or at least four (P+).

## Self-assessment: Way of working

Current state according to the Essence standard: ...

Was the self-assessment unanimous? Any doubts about certain items?

How have you improved so far?

Where is potential for improvement?

## Overall experience

What are your main take-aways from this project? What did you learn?

Is there something special you want to mention here?
