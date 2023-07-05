/** @type {import('jest').Config} */
const config = {
    testPathIgnorePatterns: ['refs', 'node_modules', 'ref2'],
    testEnvironment: 'node',
};

module.exports = config;
