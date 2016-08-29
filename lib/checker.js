const Status = require('./status')
const buildFailed = (b) => b.status === Status.BUILD_FAILED
const connectionFailed = (b) => b.status === Status.CONNECTION_FAILED

module.exports = (teamCity, blinkStick) => {
  return () => {
    return teamCity()
      .then((sources) => {
        const worstSource = sources.reduce((p, s) => s.result.status > p.result.status ? s : p, { result: { status: Status.BUILD_OK } })

        if (buildFailed(worstSource.result)) {
          blinkStick(Status.BUILD_FAILED, worstSource.reportingColors)
        } else if (connectionFailed(worstSource.result)) {
          blinkStick(Status.CONNECTION_FAILED, worstSource.reportingColors)
        } else {
          blinkStick(Status.BUILD_OK, worstSource.reportingColors)
        }
        return Promise.resolve()
      }, function (e) {
        return Promise.reject(e)
      })
  }
}
