module.exports = {
    "env": {
        "node": true,
    },
    "extends": "airbnb-base",
    "rules": {
        "indent": ["error", 4],
        "class-methods-use-this": ["warn"],
        "camelcase": ["error"],
        "max-len": 0,
        "brace-style": ["error", "stroustrup"],
        "no-console": ["error", { "allow": ["warn", "error"] }],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "prefer-const": ["error", {"destructuring": "all"}],
        "no-await-in-loop": ["warn"],
        "no-restricted-syntax": 0,
        "prefer-destructuring": ["warn", { "AssignmentExpression": { "array": false, "object": false } }],
        "radix": ["error", "as-needed"],
        "no-underscore-dangle": 0,
        "import/order": 0,
        "linebreak-style": 0,
        "object-curly-newline": ["error", { "multiline": true }],
        "class-methods-use-this": ["error", { "exceptMethods": ["onMsg"] }],
        "no-unused-vars": ["error", { "varsIgnorePattern": "logger" }],
        "no-fallthrough": ["error", { "commentPattern": "falls[\\s\\w]*through" }],
    }
};