import React from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import PropTypes from 'prop-types'
import { addPlayer, deletePlayers, startGame } from '../actions'
import Messages from '../messages'
import ErrorMessageBox from './ErrorMessageBox'

const AddPlayer = ({ players, errorMessage, onAddPlayer, onDeletePlayers, onStartGame }) => {
  const afterDeleteRow = (rowKeys) => {
    onDeletePlayers(rowKeys)
  }

  const afterInsertRow = (player) => {
    onAddPlayer(player.name)
  }

  return (<div>
    <ErrorMessageBox errorMessage={errorMessage} />
    <BootstrapTable
      data={players}
      deleteRow={true}
      insertRow={true}
      selectRow={{ mode: 'checkbox' }}
      options={{ afterDeleteRow, afterInsertRow }}
    >
      <TableHeaderColumn dataField='name' isKey={true}>{Messages['addPlayersPage.nameColumn']}</TableHeaderColumn>
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
  errorMessage: PropTypes.string,
  onAddPlayer: PropTypes.func,
  onDeletePlayers: PropTypes.func,
  onStartGame: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    players: state.app.players,
    errorMessage: state.app.errorMessage,
  }
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
