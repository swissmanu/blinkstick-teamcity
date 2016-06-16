module.exports = (config) => {
  return (status) => {
    console.log('BlinkStick: Show Status ' + status)
  }
}

// var blinkstick = require('blinkstick')
// var led = blinkstick.findFirst()
// led.blink('random', function () {
//   led.pulse('random', function () {
//     led.setColor('red', function () {
//     })
//   })
// })
