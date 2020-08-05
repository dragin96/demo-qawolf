module.exports = {
  config: "node_modules/qawolf/js-jest.config.json",
  rootDir: "test",
  testTimeout: 60000,
  useTypeScript: false,
  setupFilesAfterEnv: ["expect-playwright", "jest-allure/dist/setup"]
};
