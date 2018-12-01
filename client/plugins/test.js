import { registerPlugin } from "../modules/pluginSystem";

export default function testPlugin () {
  return registerPlugin('test', {
    initialize(state) {
      state.name = "Ned"
      console.log("Hello! " + state.name)
    },
    home: {
      initialize(page) {
        console.log('Triggered in homepage!')
      }
    }
  })
}
