import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      classes: [],
      classData: null
    }
  }

  componentDidMount() {
    axios.get("https://www.dnd5eapi.co/api/classes")
      .then(res => {
        this.setState({ isLoaded: true, classes: res.data.results });
      })
      .catch(err => this.setState({ error: err, isLoaded: true }));
  }

  getClassData(className) {
    axios.get(`https://www.dnd5eapi.co/api/classes/${className}`)
      .then(res => {
        this.setState({ isLoaded: true, classData: res.data.name });
      })
      .catch(err => this.setState({ error: err, isLoaded: true }));
  }

  render() {
    const { error, isLoaded, classes } = this.state;
    if (error) {
      return <div>Error: error.message</div>;
    } else if (!isLoaded) {
      return <div>Loading. . .</div>;
    } else {
      const navBar = <NavigationBar classes={classes} onClick={className => { this.getClassData(className) }}></NavigationBar>;
      if (this.state.classData) {
        return <div>{navBar}<br/>{this.state.classData}</div>;
      } else {
        return navBar;
      }

    }
  }
}

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: this.props.classes
    }
  }

  render() {
    return (<div className="navBar">
      {this.state.classes.map(c => <NavigationButton key={c.index} value={c.name} onClick={() => { this.props.onClick(c.index) }}></NavigationButton>)}
    </div>)
  }

}

class NavigationButton extends React.Component {
  render() {
    return <button className="navButton" onClick={() => this.props.onClick()}>{this.props.value}</button>;
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);