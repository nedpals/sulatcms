export default function testPlugin () {
  return require('../index').registerPlugin('test', {
    initialize(socket) {
      socket.plugged.printMsg("This is a test from a custom plugin")
    }
  })
}
