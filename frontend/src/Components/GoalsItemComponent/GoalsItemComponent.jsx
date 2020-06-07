import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import {
  Button,
  Container,
  Header
} from 'semantic-ui-react'

import block from '../../classname'

const b = block('goal-item-component')

class GoalsItemComponent extends Component {
  render () {
    return (
      <div className={b()}>

        <div className={b('content')}>
          <Container>
            <Header as='h3'>{this.props.goal.name}</Header>
          </Container>
        </div>

        <div className={b('controls')}>
          <Button><Link to={`/goals/${this.props.goal._id}/edit`}>редактировать</Link></Button>
        </div>

      </div>
    )
  }
}

GoalsItemComponent.propTypes = {
  goal: PropTypes.shape({
    _id: PropTypes.string,
    __v: PropTypes.number,
    name: PropTypes.string,
    skills: PropTypes.array,
  }),
}

GoalsItemComponent.defaultProps = {
  goal: {},
}

export {
  GoalsItemComponent,
}
