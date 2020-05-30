import React, { Component } from 'react'

class ProfileContainer extends Component {
  state = {}

  componentDidMount() {
    fetch('/api/')
  }

  render() {
    return (
      <div className="profile-container">
        {}
      </div>
    )
  }
}
