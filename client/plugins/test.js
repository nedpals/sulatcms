import { registerPlugin } from "../cms";

export default function testPlugin () {
  return registerPlugin('test', {
    initialize(socket) {
      socket.plugged.printMsg("This is a test from a custom plugin")
    }
  })
}
