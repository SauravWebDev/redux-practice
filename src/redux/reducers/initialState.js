export default {
  problems: [],
  problemById: {},
  problemBySlug: {},
  constants: {
    difficulty: {},
    tag: {},
    language: {},
    variableType: {},
    codeTemplate: {},
  },
  apiCallsInProgress: {
    updateOrCreate: false,
    runOrSubmitCode: false,
    getAllProblems: false,
    tryCode: false,
    logIn: false,
    singup: false,
    logout: false,
    testCase: false,
  },
  testCases: {},
  userDetailsById: {},
  auth: {
    isAuthenticated: false,
    tokenExpired: false,
    userId: null,
  },
};
