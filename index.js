const config = require('./config.json')
const teamCity = require('./lib/teamCity')
const blinkstick = require('./lib/blinkstick')
const checker = require('./lib/checker')

function runner (config) {
  const configuredChecker = checker(
    teamCity(config),
    blinkstick(config)
  )
  const run = () => {
    setTimeout(() => {
      configuredChecker().then(run)
    }, config.server.pollInterval)
  }

  configuredChecker().then(run)
}
runner(config)
