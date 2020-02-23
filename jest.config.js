module.exports = {
    testURL: 'http://localhost/',
    testMatch: [
        '**/test/**/?(*[-.])(spec|test).js?(x)',
    ],
    setupFiles: [
        './test/support/enzyme.js',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
    ],
    coverageDirectory: 'test/reports',
};
