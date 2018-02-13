import React from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import PropTypes from 'prop-types'
import { addPlayer, deletePlayers, startGame } from '../actions'
import Messages from '../messages'

const AddPlayer = ({ players, onAddPlayer, onDeletePlayers, onStartGame }) => {
  const afterDeleteRow = (rowKeys) => {
    onDeletePlayers(rowKeys)
  }

  const afterInsertRow = (player) => {
    onAddPlayer(player.name)
  }

  return (<div>
    <BootstrapTable data={players} deleteRow={true} insertRow={true} defaultSorted={[{
      dataField: 'score',
      order: 'desc',
    },
    ]} selectRow={{
      mode: 'checkbox',
    }} options={{
      afterDeleteRow,
      afterInsertRow,
    }}>
      <TableHeaderColumn dataField='name' isKey={true}>Name</TableHeaderColumn>
      <TableHeaderColumn dataField='score' hiddenOnInsert={true}>Score</TableHeaderColumn>
    </BootstrapTable>
    <br/>
    <form action="#">
      <input
        className="btn btn-success"
        type="submit"
        onClick={() => onStartGame(players.length)}
        value={Messages['button.startGame']}
      />
    </form>
  </div>)
}

AddPlayer.propTypes = {
  players: PropTypes.array,
  onAddPlayer: PropTypes.func,
  onDeletePlayers: PropTypes.func,
  onStartGame: PropTypes.func,
}

const mapStateToProps = (state) => {
  return { players: state.app.players }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPlayer: (name) => {
      dispatch(addPlayer(name))
    },
    onDeletePlayers: (name) => {
      dispatch(deletePlayers(name))
    },
    onStartGame: (numberOfPlayers) => {
      dispatch(startGame(numberOfPlayers))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer)
