module.exports = {
  roots: [ "<rootDir>" ],
  collectCoverage: true,
  coverageProvider: 'v8',
  setupFilesAfterEnv: [ "<rootDir>/jest-env-setup.ts" ],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/coverage/**"
  ],
  testPathIgnorePatterns: [ "<rootDir>/node_modules/", "<rootDir>/.next/" ],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [ "babel-jest" ]
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
        outputName: 'report.xml',
      },
    ],
  ],
  // preset: 'ts-jest',
}