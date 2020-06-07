import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GoalsItemEditComponent } from '../../Components'

class GoalsItemEditContainer extends Component {
  state = {}

  componentDidMount () {
    const {
      id,
    } = this.props.routeParams

    fetch(`/api/goals/${id}`)
      .then((response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status)
            return
          }

          // Examine the text in the response
          response.json()
            .then((data) => {
              this.setState({ goal: data })
            })
        },
      )
      .catch((err) => {
        console.log('Fetch Error :-S', err)
      })
  }

  onSave = (goal) => {
    console.log('goal: ', goal) // eslint-disable-line

    fetch(
      `/api/goals/${goal._id}`,
      {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goal)
      })
      .then((response) => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status)
            return
          }

          // Examine the text in the response
          response.json()
            .then((data) => {
              console.log("data: ", data); // eslint-disable-line

              // this.setState({ goal: data })
            })
        },
      )
      .catch((err) => {
        console.log('Fetch Error :-S', err)
      })
  }

  render () {
    return (
      <div className="goal-item-container">
        {this.state.goal && (<GoalsItemEditComponent goal={this.state.goal} onSave={this.onSave} />)}
      </div>
    )
  }
}

GoalsItemEditContainer.propTypes = {
  routeParams: PropTypes.shape({
    id: PropTypes.string,
  }),
}

export {
  GoalsItemEditContainer,
}
