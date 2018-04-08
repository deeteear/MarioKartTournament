import React from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import PropTypes from 'prop-types'
import { startRound, startFinalRound } from '../actions'
import Messages from '../messages'

const Score = ({ players, onStartRound, onStartFinalRound }) => {
  return (<div>
    <BootstrapTable data={players} options={ {
      defaultSortName: 'score',
      defaultSortOrder: 'desc',
    }}>
      <TableHeaderColumn dataField='name' isKey={true}>{Messages['scorePage.nameColumn']}</TableHeaderColumn>
      <TableHeaderColumn dataField='score' dataSort={ true }>{Messages['scorePage.scoreColumn']}</TableHeaderColumn>
    </BootstrapTable>
    <br/>
    <form action="#">
      <input className="btn btn-success" type="submit" onClick={onStartRound} value={Messages['button.startRound']}/>
      &nbsp;
      <input className="btn btn-warning" type="submit" onClick={onStartFinalRound} value={Messages['button.startFinalRound']}/>
    </form>
  </div>)
}

Score.propTypes = {
  players: PropTypes.array,
  onStartRound: PropTypes.func,
  onStartFinalRound: PropTypes.func,
}

const mapStateToProps = (state) => {
  return { players: state.app.players }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStartRound: () => {
      dispatch(startRound())
    },
    onStartFinalRound: () => {
      dispatch(startFinalRound())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score)
