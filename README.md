# fixture-jest-native

A small Node.js library that keeps application settings in SQLite through
`better-sqlite3`, a native module. When no prebuilt binary can be downloaded,
`npm ci` compiles it, so the install needs Python, make and a C++ compiler.

This is a BJIT test fixture for AMS. It is not a product.

    npm ci
    npx jest
