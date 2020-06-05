import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GoalsItemComponent } from '../../Components'

class GoalsItemContainer extends Component {
  state = {
    goal: {},
  }

  componentDidMount () {
    const {
      id
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

  render () {
    return (
      <div className="goal-item-container">
        <GoalsItemComponent goal={this.state.goal} />
      </div>
    )
  }
}

GoalsItemContainer.propTypes = {
  routeParams: PropTypes.shape({
    id: PropTypes.string,
  })
}

export {
  GoalsItemContainer,
}
