export default {
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  setupFiles: ['./jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
