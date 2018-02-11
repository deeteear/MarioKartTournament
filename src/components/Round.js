import React from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import PropTypes from 'prop-types'
import { startRound, startKo } from '../actions'
import Maps from '../constants/maps'

const Round = ({ currentRound, onSubmitScore }) => {
  const createMatchTable = (matchData) => {
    const placements = [...Array(matchData.length).keys()].map(x => x + 1)

    const matchKey = matchData.map(player => player.name).join(',')
    return (<div key={matchKey}>
      <BootstrapTable data={matchData} cellEdit={{
        mode: 'click',
        blurToSave: true,
      }}>
        <TableHeaderColumn dataField='name' isKey={true}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='controller'>Controller</TableHeaderColumn>
        <TableHeaderColumn dataField='place' editable={{
          type: 'select',
          options: {
            values: placements,
          },
        }}>Platzierung</TableHeaderColumn>
      </BootstrapTable>
      <br/>
    </div>)
  }

  const matches = currentRound.matches.map((match) => createMatchTable(match))
  // TODO implement onSubmitScore
  return (<div>
    <h1>Aktuelle Karte: {Maps[currentRound.map]}</h1>
    <div>{matches}</div>
    <form action="#">
      <input className="btn btn-success" type="submit" onClick={onSubmitScore} value="SubmitScores"/>
      &nbsp;
    </form>
  </div>)
}

Round.propTypes = {
  currentRound: PropTypes.object,
  onSubmitScore: PropTypes.func,
}

const mapStateToProps = (state) => {
  return { currentRound: state.app.currentRound }
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

export default connect(mapStateToProps, mapDispatchToProps)(Round)
