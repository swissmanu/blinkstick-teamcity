const stick = require('blinkstick')
const Status = require('./status')

function massLedControl (led, method, numberOfLeds, color) {
  return new Promise(function (resolve) {
    var completed = 0
    for (var i = 0; i < numberOfLeds; i++) {
      led[method](color, { index: i }, function () {
        completed++

        if (completed >= numberOfLeds) {
          resolve(led)
        }
      })
    }
  })
}

module.exports = (config) => {
  const led = stick.findFirst()
  const setColor = (color) => massLedControl(led, 'setColor', config.blinkStick.numberOfLeds, color)
  const pulse = (color) => massLedControl(led, 'pulse', config.blinkStick.numberOfLeds, color)

  return (status, reportingColors) => {
    switch (status) {
      case Status.BUILD_OK:
        setColor(reportingColors.good)
        break
      case Status.BUILD_FAILED:
        pulse(reportingColors.bad)
        break
      default:
        setColor(reportingColors.noConnection)
        break
    }
  }
}
