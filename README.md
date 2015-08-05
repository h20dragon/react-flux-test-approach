# react-flux-test-approach

Sample repository of testing React and Flux (Reflux) with Karma,
`Mocha`, and Webpack.

## Installation
`npm install` 

## Usage

### Build
`npm run build`

### Run Tests

`npm test`


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
