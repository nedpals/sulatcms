const whitelister = require('purgecss-whitelister');

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:/]+/g) || [];
    }
}

module.exports = ({ env }) => ({
    plugins: [
        require("tailwindcss")("./tailwind.config.js"),
        ...(env !== 'development' ? [
            require("@fullhuman/postcss-purgecss")({
                content: ['./**/*.tsx'],
                whitelist: [
                    ...whitelister("node_modules/tailwindcss/dist/base.css")
                ],
                extractors: [
                    {
                        extractor: TailwindExtractor,
                        extensions: ['tsx']
                    }
                ]
            }),
            require('cssnano')({
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                }]
            })
        ] : [])
    ]
})