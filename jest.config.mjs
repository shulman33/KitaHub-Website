// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   moduleNameMapper: {
//     // Map '@/*' to '<rootDir>/src/*'
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
//   testPathIgnorePatterns: ["/node_modules/", "/.next/"],
// };
// jest.config.mjs
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
