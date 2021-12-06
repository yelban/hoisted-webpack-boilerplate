module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        // debug: true,
        // The entry point for the corejs3 polyfill has not been found.
        modules: false,
        targets: {
          browsers: ['defaults', 'ie > 10'],
          // browsers: ['defaults', 'not IE 11'],
        },
        // useBuiltIns: 'entry',
        // useBuiltIns: 'usage',
        // corejs: '3',
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
  ],
};
