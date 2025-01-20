/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',

  transform: {
    '^.+.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  reporters: ['default', ['jest-junit', { outputDirectory: './test-results', outputName: 'junit.xml' }]],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
}
