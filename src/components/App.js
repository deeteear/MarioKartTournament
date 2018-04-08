import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Pages from '../constants/pages'
import AddPlayer from './AddPlayer'
import Score from './Score'
import Round from './Round'
import Header from './Header'

const App = ({ currentPage }) => {
  let content
  switch (currentPage) {
    case Pages.FINAL_ROUND:{
      content = (<div>IMPLEMENT ME!</div>)
      break
    }
    case Pages.ROUND:{
      content = (<Round/>)
      break
    }
    case Pages.SCORE:{
      content = (<Score/>)
      break
    }
    case Pages.ADD_PLAYER:{
      content = (<AddPlayer/>)
      break
    }
    default:{
      content = (<AddPlayer/>)
      break
    }
  }

  return (
    <div>
      <Header />
      {content}
    </div>
  )
}

App.propTypes = {
  currentPage: PropTypes.string,
}

const mapStateToProps = (state) => {
  return { currentPage: state.app.currentPage }
}

export default connect(mapStateToProps)(App)
