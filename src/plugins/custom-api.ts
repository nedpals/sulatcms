import { Plugin, PluginEvents, PluginAuth } from "../plugin";
import { request } from "mithril";

interface RestAPIPaths {
    index: string,
    read: string,
    delete: string,
    publish: string
}

interface PluginOptions {
    base_url: string,
    paths: RestAPIPaths,
    fields: { [name: string]: string }
}

function traverseData(field_name: string, obj: object) {
    // https://stackoverflow.com/a/6394168
    return field_name.split('.').reduce((o,i)=>o[i], obj);
}

function customAPIPlugin(options?: PluginOptions): Plugin {
    function mapFileObject(file) {
        return {
            title: traverseData(options.fields.title || 'title', file),
            content: traverseData(options.fields.summary || 'content', file),
            id: traverseData(options.fields.id || 'id', file),
            created_at: traverseData(options.fields.date_created || 'created_at', file),
            updated_at: traverseData(options.fields.date_created || 'updated_at', file)
        }
    }

    let events: PluginEvents = {
        buildIndex: ({ store }) => {
            request({
                url: options.base_url + options.paths.index,
            })
            .then((files: Array<{[n: string]: any}>) => {
                return files.map(mapFileObject);
            })
            .then(files => {
                store.setState({
                    files: [...store.state.files, ...files]
                });
            });
        },
        fetchFile: ({ params: { id }, cb }) => {
            // @ts-ignore
            request({
                method: 'GET',
                url: options.base_url + options.paths.read,
                params: { id }
            })
                .then(mapFileObject)
                .then(file => {
                    cb(file);
                })
                .catch(err => err);
        },
        removeFile: ({ params }) => {
            // @ts-ignore
            request({
                method: 'DELETE',
                url: options.base_url + options.paths.delete,
                params: {
                    id: params.id
                }
            }).then(file => {
                // return file
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
    return { name: "custom-api", events, options };
} 

export default customAPIPlugin;