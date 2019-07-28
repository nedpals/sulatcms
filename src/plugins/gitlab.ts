import { Plugin, PluginEvents } from "../plugin";

function gitlabPlugin(options?): Plugin {
    let events: PluginEvents = {
        onInit: () => {
            console.log("Hello World!", options.repo);
        }
    };

    return { name: "gitlab", options, events };
}

export default gitlabPlugin;