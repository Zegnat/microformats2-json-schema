const { readFileSync } = require('fs')
const { sync } = require('fast-glob')
const test = require('ava')

const ajv = new (require('ajv'))()
require("ajv-formats")(ajv, ["uri"])
const validator = ajv.compile(JSON.parse(readFileSync('schema.json')))

function tester(t, json) {
  t.true(validator(JSON.parse(readFileSync(json))))
}

for (const json of sync('tests/testsuite/tests/**/*.json')) {
  test(`Validating ${ json }`, tester, json)
}
