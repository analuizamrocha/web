module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            chrome: '95',
            firefox: '95',
            safari: '15',
            edge: '95'
          },
          exclude: [
            // Exclude polyfills for modern features
            'transform-async-to-generator',
            'transform-classes',
            'transform-arrow-functions',
            'transform-block-scoping',
            'transform-spread',
            'transform-destructuring',
            'transform-for-of',
            'transform-object-assign',
            'transform-object-rest-spread'
          ]
        }
      }
    ]
  ]
};