module.exports = {
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        babel: true,
        tsConfig: 'tsconfig.test.json',
      },
    ],
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
  preset: 'ts-jest',
}