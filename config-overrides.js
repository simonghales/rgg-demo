const { override, addExternalBabelPlugin } = require('customize-cra');
const WorkerPlugin = require('worker-plugin');

const addWorker = config => {
    config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
    })
    config.plugins.push(new WorkerPlugin());
    return config;
}

module.exports = override(addWorker, addExternalBabelPlugin('@babel/plugin-proposal-optional-chaining'))