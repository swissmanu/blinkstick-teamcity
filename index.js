const config = require('./config.json')
const teamCity = require('./lib/teamCity')
const blinkstick = require('./lib/blinkStick')
const checker = require('./lib/checker')

function runner (config) {
  const configuredChecker = checker(teamCity(config), blinkstick(config))
  const run = () => {
    setTimeout(() => {
      check().then(run)
    }, config.server.pollInterval)
  }
  const check = () => {
    return configuredChecker()
      .catch((e) => {
        console.log('Error:', e)
      })
  }

  check().then(run)
}
runner(config)
