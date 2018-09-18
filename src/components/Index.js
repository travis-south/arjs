import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    answer: 34
  };

  asyncFunc = () => {
    return Promise.resolve(41514);
  };

  async componentDidMount() {
    this.setState({
      answer: await this.asyncFunc()
    });
  }

  render() {
    return (
      <h2>Hello Class Componentss -- {this.state.answer}</h2>
    );
  }
}
  

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
