# react-flux-test-approach

Sample repository of testing React and Flux (Reflux) with Karma,
`Mocha`, and Webpack.

The testing approach is:

1. bundle all tests into a single file
2. the single file is loaded by Karma
3. Karma runs that single file, containing all tests, in the browser under test.

## Installation
`npm install` 

## Usage

### Build

1. Clean

   `npm run clean`
   
2. Build

   `npm run build`

### Run Tests

`npm test`

### Filtering which tests to execute

1. Edit `tests.webpack.js`
2. Modify the following line with the proper regEx.

   examples:
     - var context = require.context('./build', true, `/MemberList-test\.js?$/`);
     - var context = require.context(`'./build/tests'`, true, `/-test\.js?$/`);
      
### Testing with a specific browser

#### karma.conf.js

Update the `browsers` config setting as needed, or you can specify which browser to test against
with the `--browsers` option using `karma` from the command line.

1. Default (PhantomJS)

   npm test
   
2. Chrome

   ./node_modules/.bin/karma start karma.conf.js --browsers Chrome
   
3. Firefox

   ./node_modules/.bin/karma start karma.conf.js --browsers Firefox
   
## History

## Credit
1. http://kentor.me

## License
