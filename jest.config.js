module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["server.js", "controllers/**/*.js", "middleware/**/*.js", "routes/**/*.js"],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transform JSX files using Babel
    },
    transformIgnorePatterns: [
      '/node_modules/',
      '\\.(css|sass|scss)$', // Ignore CSS, Sass, SCSS files
    ],
  };
  //"controllers/**/*.js", "middleware/**/*.js", "routes/**/*.js",