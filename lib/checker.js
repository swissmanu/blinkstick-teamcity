const Status = require('./status')
const buildFailed = (b) => b.status === Status.BUILD_FAILED

module.exports = (teamCity, blinkStick) => {
  return () => {
    return teamCity()
      .then((builds) => {
        if (builds.some(buildFailed)) {
          blinkStick(Status.BUILD_FAILED)
        } else {
          blinkStick(Status.BUILD_OK)
        }
        return Promise.resolve()
      }, function (e) {
        console.log('Failed :(', e)
        return Promise.reject()
      })
  }
}
