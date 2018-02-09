import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Pages from '../constants/pages'
import AddPlayer from './AddPlayer'
import Score from './Score'
import Round from './Round'

const App = ({ currentPage }) => {
  switch (currentPage) {
    case Pages.KO_ROUND:
      return (<div/>)
    case Pages.ROUND:
      return (<Round/>)
    case Pages.SCORE:
      return (<Score/>)
    case Pages.ADD_PLAYER:
      return (<AddPlayer/>)
    default:
      return (<AddPlayer/>)
  }
}

App.propTypes = {
  currentPage: PropTypes.string,
}

const mapStateToProps = (state) => {
  return { currentPage: state.app.currentPage }
}

export default connect(mapStateToProps)(App)
