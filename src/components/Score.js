import React from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import PropTypes from 'prop-types'
import { startRound, startKo } from '../actions'

const Score = ({ players, onStartRound, onStartKO }) => {
  return (<div>
    <BootstrapTable data={players} options={ {
      defaultSortName: 'score',
      defaultSortOrder: 'desc',
    }}>
      <TableHeaderColumn dataField='name' isKey={true}>Name</TableHeaderColumn>
      <TableHeaderColumn dataField='score' dataSort={ true }>Score</TableHeaderColumn>
    </BootstrapTable>
    <br/>
    <form action="#">
      <input className="btn btn-success" type="submit" onClick={onStartRound} value="startRound"/>
      &nbsp;
      <input className="btn btn-warning" type="submit" onClick={onStartKO} value="startKO"/>
    </form>
  </div>)
}

Score.propTypes = {
  players: PropTypes.array,
  onStartRound: PropTypes.func,
  onStartKO: PropTypes.func,
}

const mapStateToProps = (state) => {
  return { players: state.app.players }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStartRound: () => {
      dispatch(startRound())
    },
    onStartKO: () => {
      dispatch(startKo())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score)
