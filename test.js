const assert = require("node:assert");
const test = require("node:test");
const { readFileSync } = require("node:fs");

const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fg = require("fast-glob");

const ajv = new Ajv();
addFormats(ajv, ["uri"]);

const schema = JSON.parse(readFileSync("schema.json"));
const validate = ajv.compile(schema);

const entries = fg.sync("tests/testsuite/tests/**/*.json");

for (const entry of entries) {
  test(`Validating JSON file: ${entry}`, (t) => {
    const json = JSON.parse(readFileSync(entry));
    
    assert.ok(validate(json));
  });
}
