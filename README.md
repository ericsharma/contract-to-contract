# TEALScript Project

## Documentation

For TEALScript documentation, go to https://tealscript.algo.xyz

## Usage

Demo Repository to demonstrate and Contract to Contract ASA trampoline with memory of the original (non smart contract) caller.

## Cons

The parent contract needs to be opted into the intended ASA for this to be done in a singular app call.

### Build and test

`npm run compile-generate-test`

### Run Tests

`npm run test` will execute the tests defined in [./\_\_test\_\_](./__test__)

### Lint

`npm run lint` will lint the contracts and tests with ESLint.
