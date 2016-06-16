const Status = require('./status')
const buildFailed = (b) => b.status === Status.BUILD_FAILED
const connectionFailed = (b) => b.status === Status.CONNECTION_FAILED

module.exports = (teamCity, blinkStick) => {
  return () => {
    return teamCity()
      .then((builds) => {
        if (builds.some(buildFailed)) {
          blinkStick(Status.BUILD_FAILED)
        } else if (builds.some(connectionFailed)) {
          blinkStick(Status.CONNECTION_FAILED)
        } else {
          blinkStick(Status.BUILD_OK)
        }
        return Promise.resolve()
      }, function (e) {
        return Promise.reject(e)
      })
  }
}
