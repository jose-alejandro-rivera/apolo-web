
module.exports = {
    roots: ['<rootDir>/unitTest'],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,js,jsx}'],
    coverageReporters: ["html", "lcov"]
};
