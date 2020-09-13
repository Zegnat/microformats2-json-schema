const { sync } = require('fast-glob')
const test = require('ava')
const Ajv = require('ajv')

const ajv = new Ajv()
const validator = ajv.compile(JSON.parse(require('fs').readFileSync('schema.json')))

function tester(t, json) {
  t.true(validator(JSON.parse(require('fs').readFileSync(json))))
}

for (const json of sync('tests/testsuite/tests/**/*.json')) {
  test(`Validating ${ json }`, tester, json)
}
