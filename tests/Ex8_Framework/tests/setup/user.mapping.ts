export const userSetupMapping = {
  standard_user: {
    fileName: 'normalUser.json',
    needsUrlVerification: true
  },
  problem_user: {
    fileName: 'problemUser.json', 
    needsUrlVerification: false
  },
  locked_out_user: {
    fileName: 'lockedOutUser.json', 
    needsUrlVerification: false
  },
  performance_glitch_user: {
    fileName: 'performanceGlitchUser.json', 
    needsUrlVerification: false
  }
}
