Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => "", // Mock CSS properties to prevent the error
  }),
});

module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Point to your setup file
};
