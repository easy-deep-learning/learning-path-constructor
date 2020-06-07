import React from 'react'

import { GoalsItemEditContainer } from '../../Containers'

const GoalItemEditRoute = (props) => {
  return (
    <div className="goal-item-edit-route">
      <h3>Goal Item Edit Route</h3>
      <GoalsItemEditContainer routeParams={props.match.params} />
    </div>
  )
}

export default GoalItemEditRoute
