import { transform } from '@babel/standalone'
import babelPresetReact from 'babel-preset-react'
import uniq from 'lodash.uniq'
import omit from 'lodash.omit'

const compile = source => {
  const componentNames = uniq(
    (source.match(/<([A-Z][A-Za-z0-9]+)/g) || []).map(tag => tag.substr(1))
  )

  return transform(
    `
    ${componentNames.map(name => `const ${name} = '${name}'`).join('\n')}

    const React = {
      createElement: function (component, props) {
        const childrenArguments = Array.prototype.slice.call(arguments).slice(2)
        let children
        if (childrenArguments.length === 0) {
          children = undefined
        } else if (childrenArguments.length === 1) {
          children = childrenArguments[0]
        } else {
          children = childrenArguments
        }
   
        return Object.assign(
          { component: component },
          props,
          { children }
        )
      },
    }

    const render = () => (
      ${source}
    )
    `,
    {
      presets: [omit(babelPresetReact, 'env')],
    }
  ).code
}

export default compile
