const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^bson$': '<rootDir>/node_modules/bson/lib/bson.cjs',
  },
  testPathIgnorePatterns: ['<rootDir>/tests/e2e/'],
  transformIgnorePatterns: ['/node_modules/(?!(bson)/)'],
  maxWorkers: 1,
}

module.exports = createJestConfig(customJestConfig)
