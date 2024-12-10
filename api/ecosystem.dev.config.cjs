module.exports = {
    apps: [
        {
            name: "meteor-time-api",
            script: "./dist/src/index.js",
            instances: "4",
            watch: "dist",
        },
    ],
};
