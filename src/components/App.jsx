import React, { PureComponent } from 'react'
import compile from '../services/compile'
import '../styles/index.css'

class App extends PureComponent {
  state = {
    input: `
<div className="x" y={2} z={{ x: 1, y: 1 }}>
  <Comp y={3} />
  <Abc>def</Abc>
</div>
    `.trim(),
  }

  transform(input) {
    return eval(`
      ${compile(input)}
      JSON.stringify(render(), null, 2)
    `)
  }

  componentDidMount() {
    try {
      this.setState({ output: this.transform(this.state.input) })
    } catch (err) {
      console.error(err)
    }
  }

  handleInputChange = event => {
    const input = event.target.value
    this.setState({ input })
    if (input) {
      try {
        this.setState({ output: this.transform(input) })
      } catch (err) {
        console.error(err)
        this.setState({ output: '[Syntax error]' })
      }
    }
  }

  render() {
    return (
      <form className="row">
        <div className="cell">
          <textarea
            onChange={this.handleInputChange}
            value={this.state.input}
          />
        </div>
        <div className="cell">
          <textarea readOnly value={this.state.output} />
        </div>
      </form>
    )
  }
}

export default App
