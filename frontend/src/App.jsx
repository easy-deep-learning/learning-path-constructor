import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import {
  ProfileRoute,
  MainRoute,
} from './Routes'

import block from './classname'
import './App.module.css'

const b = block('app')

function App () {
  return (
    <Router>
      <div className={b()}>
        <header className={b('header')}>
          <Menu className={b('menu')}>
            <Menu.Item><Link to="/">Main</Link></Menu.Item>
            <Menu.Item><Link to="/profile">Profile</Link></Menu.Item>
          </Menu>
        </header>
        <main className={b('main')}>
          <Route exact path="/" component={MainRoute} />
          <Route path="/profile" component={ProfileRoute} />
        </main>
      </div>
    </Router>
  )
}

export default App
