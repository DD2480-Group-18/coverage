# Coverage

## Three.js

### Onboarding

Three.js was easy to build. The usages of the three.js project and it's internals are [well-documented online](https://threejs.org/docs/), but most (if not all) units of code in the repository lacks comments.

The three.js project was easily built in it's entirety without errors using the build command `npm run build`. All examples used for testing was also easily built using `npm run build-examples`. The project was built using rollup.

After installing extra dependencies in the `<PROJECT>/test` directory, the unit-tests can be ran. Running e2e tests with `npm run test-e2e` requires chrome or a similar browser, since e2e tests use puppeteer which is running a headless chromium browser instance.

## Complexity measurements

#### 10 most complex functions:

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

### Cyclomatic complexity of 2 functions (manually tested):

Since we are only a 2 people group, we are only manually testing the cyclomatic complexity of 2 large functions.

```

```

### Explanations

#### WebGLProgram constructor

According to the hosted documentation:

> Constructor for the GLSL program sent to vertex and fragment shaders, including default uniforms and attributes.

Most boilerplate code in this function is for supporting different version of GLSL, as well as error handling when interacting with WebGL shaders.

#### MaterialLoader.parse

According to the hosted documentation:

- MaterialLoader:

  > A loader for loading a Material in JSON format. This uses the FileLoader internally for loading files.

- parse():

  > Parse a JSON structure and create a new Material of the type json.type with parameters defined in the json object.

This function is responsible for creating a material. There is a linear correlation with the number of branches and the number of parameters in the material, which amount to slightly more than 100 branches. These include parameters for:

- Textures
- Maps (normal, alpha, specular, displacement, material-ness, etc.)
- Wireframe
- Offsets
- Uniforms
- Shaders
- etc.

There are a lot of parameters to consider. Luckily, there are no exceptions to consider here. The documentation is stating that the sole purpose of this function is to create a material object. The documentation does not state the outcomes of any branch, but it's fair to assume that the outcome of any branch defines the outcome of any material.

#### WebGLUtils.convert

## Coverage measurements and improvements

The Javascript standard for code coverage testing is [istanbul.js](https://istanbul.js.org/), we will integrate this tool with qunit, three.js's unit testing tool of choice.
