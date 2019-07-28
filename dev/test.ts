import * as Sulat from "../src/app";
import NetlifyIdentityLogin from "../src/plugins//netlify-identity";
import CustomAPIPlugin from "../src/plugins/rest-api";
import GitlabPlugin from "../src/plugins/gitlab";

Sulat.initialize({
    el: document.getElementById('sulat'),
    auth: "netlify",
    plugins: [
        NetlifyIdentityLogin(),
        GitlabPlugin({ repo: "gitlab-hq/gitlab-ce" }),
        CustomAPIPlugin({
            base_url: 'http://localhost:8262',
            fields: {
                title: 'data.title',
                date_created: 'data.date',
                date_updated: 'data.updated',
                summary: 'content',
                id: 'filename'
            },
            paths: {
                index: '/',
                read: '/file/:id',
                delete: '/file/:id',
                publish: '/file/:id'
            }
        })
    ]
});