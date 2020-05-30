import React, { Component } from 'react'

class GoalsContainer extends Component {
  state = {
    goals: []
  }

  componentDidMount () {
    fetch('/api/goals')
      .then((response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +  response.status)
            return
          }

          // Examine the text in the response
          response.json().then((data) => {
            console.log(data)
            this.setState({ goals: data })
          })
        },
      )
      .catch((err) => {
        console.log('Fetch Error :-S', err)
      })
  }

  render () {
    return (
      <div className="goals-container">
        {JSON.stringify(this.state.goals)}
      </div>
    )
  }
}

export {
  GoalsContainer,
}
