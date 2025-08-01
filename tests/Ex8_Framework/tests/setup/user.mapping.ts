const userSetupMapping = {
  standard_user: {
    fileName: 'normalUser.json',
    setupName: 'standard_user',
    needsUrlVerification: true
  },
  problem_user: {
    fileName: 'problemUser.json', 
    setupName: 'problem_user',
    needsUrlVerification: false
  },
  locked_out_user: {
    fileName: 'lockedOutUser.json', 
    setupName: 'locked_out_user',
    needsUrlVerification: false
  },
  performance_glitch_user: {
    fileName: 'performanceGlitchUser.json', 
    setupName: 'performance_glitch_user',
    needsUrlVerification: false
  }
}