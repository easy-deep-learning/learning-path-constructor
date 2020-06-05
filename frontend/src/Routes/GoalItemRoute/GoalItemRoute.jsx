import React from 'react'

import { GoalsItemContainer } from '../../Containers'

const GoalItemRoute = (props) => {
  return <div className="goal-item-route">
    <h3>GoalItemRoute</h3>
    <GoalsItemContainer routeParams={props.match.params} />
  </div>
}

export default GoalItemRoute
