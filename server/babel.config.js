module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-flow',
    '@babel/preset-react'
  ],
  sourceType: "unambiguous",
  parserOpts: { allowReturnOutsideFunction: true },
  plugins: [
    ["@babel/plugin-transform-runtime",
      {
        regenerator: true
      }
    ]
    /*
    "babel-plugin-transform-remove-strict-mode"
    ["babel-plugin-transform-not-strict",
      {
        regenerator: true,
        removeAll: true
      }
    ]
  */
  ]
}