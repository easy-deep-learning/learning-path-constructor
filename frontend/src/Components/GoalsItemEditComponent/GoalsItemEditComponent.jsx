import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Link,
} from 'react-router-dom'
import {
  Button,
  Form,
  TextArea,
} from 'semantic-ui-react'

import {
  DraftailEditor,
  BLOCK_TYPE,
  INLINE_STYLE,
} from 'draftail'

import 'draft-js/dist/Draft.css'
import 'draftail/dist/draftail.css'

import block from '../../classname'

const b = block('goal-item-edit-component')

class GoalsItemEditComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      goal: props.goal,
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSave({
      _id: this.props.goal._id,
      ...this.state.goal,
    })
  }

  onDescriptionChange = (description) => {
    this.setState({
      goal: {
        ...this.state.goal,
        description,
      },
    })
  }

  onChange = (event) => {
    this.setState({
      goal: {
        ...this.state.goal,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    })
  }

  render () {
    const {
      name,
      description,
    } = this.state.goal

    return (
      <div className={b()}>

        <div className={b('form')}>
          <Form onSubmit={this.onSubmit}>

            <Form.Field>
              <label>Название</label>
              <input
                placeholder="Название"
                name="name"
                value={name}
                onChange={this.onChange}
              />
            </Form.Field>

            <Form.Field>
              <label>Описание</label>
              <DraftailEditor
                rawContentState={description || {}}
                onSave={this.onDescriptionChange}
                blockTypes={[
                  { type: BLOCK_TYPE.HEADER_THREE },
                  { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
                ]}
                inlineStyles={[
                  { type: INLINE_STYLE.BOLD },
                  { type: INLINE_STYLE.ITALIC },
                ]}
              />
            </Form.Field>

            <div className={b('controls')}>
              <Button type="submit">Сохранить</Button>
              <Button type="button">
                <Link to={`/goals/${this.props.goal._id}`}>
                  отменить
                </Link>
              </Button>
            </div>
          </Form>
        </div>

      </div>
    )
  }
}

GoalsItemEditComponent.propTypes = {
  goal: PropTypes.shape({
    _id: PropTypes.string,
    __v: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    skills: PropTypes.array,
  }),
  onSave: PropTypes.func,
}

GoalsItemEditComponent.defaultProps = {
  goal: {},
}

export {
  GoalsItemEditComponent,
}
