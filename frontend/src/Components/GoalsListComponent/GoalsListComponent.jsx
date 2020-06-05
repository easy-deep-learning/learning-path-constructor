import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Link
} from 'react-router-dom'

import {
  Item,
} from 'semantic-ui-react'

import block from '../../classname'
import './GoalsListComponent.css'

const b = block('goals-list-component')

class GoalsListComponent extends Component {

  renderItemSkills(skills = []) {
    return (
      <ul className={b('skills-list')}>
        {skills.map(({ name = '', lessons = [], _id }) => {
          return (
            <li className={b('skills-item')} key={_id}>
              <h4>{name}</h4>
              <p>Содержит {lessons.length} уроков</p>
            </li>
          )
        })}
      </ul>
    )
  }

  renderItem ({ _id, name, description = 'some text', skills }) {
    return (
      <div className={b('item')} key={_id}>
        <Item>
          <Item.Image size='tiny' src='https://placeimg.com/640/480/any' />

          <Item.Content>
            <Item.Header><h2><Link to={`/goals/${_id}`}>{name}</Link></h2></Item.Header>
            <Item.Description>{description}</Item.Description>
            <Item.Meta>
              <h3>skills:</h3>
              {skills && this.renderItemSkills(skills)}
            </Item.Meta>
          </Item.Content>
        </Item>
      </div>
    )
  }

  render () {
    return (
      <div className={b()}>
        <Item.Group>
          {this.props.goals.map(goal => this.renderItem(goal))}
        </Item.Group>
      </div>
    )
  }
}

GoalsListComponent.propTypes = {
  goals: PropTypes.array,
}

GoalsListComponent.defaultProps = {
  goals: [],
}

export {
  GoalsListComponent,
}
