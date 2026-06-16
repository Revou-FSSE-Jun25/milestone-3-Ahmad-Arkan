export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest", // biar paham JSX & TSX
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // handle CSS modules
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
