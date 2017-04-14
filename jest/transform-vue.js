const templateRegex = /<template>([\s\S]*)<\/template>/gm
const scriptRegex   = /<script>([\s\S]*)<\/script>/gm
const babelJest     = require('babel-jest')

module.exports = {
  process (src, filepath, config, transformOptions) {
    templateRegex.lastIndex = scriptRegex.lastIndex = 0

    let template = templateRegex.exec(src)
    let content = `${
        babelJest.process(
          scriptRegex.exec(src)[1],
          `${filepath}.__transform__.js`, // Adding a fake .js extension to activate babel-jest.
          config,
          transformOptions
        )
      }
    `

    if (template) {
      content += `exports.default['template']=\`${template[1]}\``
    }

    return content
  },
}
