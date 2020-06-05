import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Item,
  Button
} from 'semantic-ui-react'

import block from '../../classname'

const b = block('goal-item-component')

class GoalsItemComponent extends Component {

  state = {}

  setEditState() {
    this.setState({
      editMode: true
    })
  }

  render () {
    return (
      <div className={b()}>
        {JSON.stringify(this.props.goal)}
      </div>
    )
  }
}

GoalsItemComponent.propTypes = {
  goal: PropTypes.object,
}

GoalsItemComponent.defaultProps = {
  goal: {},
}

export {
  GoalsItemComponent,
}
