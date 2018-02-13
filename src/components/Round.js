import React from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import PropTypes from 'prop-types'
import { submitScore } from '../actions'
import { getMapName } from '../functions/map'

const Round = ({ currentRound, onSubmitScore }) => {
  const createMatchTable = (matchData) => {
    const placements = [...Array(matchData.length).keys()].map(x => x + 1)

    const preventDuplicatePlacements = (row, cellName, cellValue) => {
      // TODO: trigger INVALID_SCORES (or similar) action
      return !matchData.map(player => player.place).includes(cellValue)
    }

    const matchKey = matchData.map(player => player.name).join(',')
    return (<div key={matchKey}>
      <BootstrapTable data={matchData} cellEdit={{
        mode: 'click',
        blurToSave: true,
        beforeSaveCell: preventDuplicatePlacements,
      }}>
        <TableHeaderColumn dataField='name' isKey={true}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='controller' editable={false}>Controller</TableHeaderColumn>
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

  return (<div>
    <h1>Aktuelle Karte: {getMapName(currentRound.map)}</h1>
    <div>{currentRound.matches.map((match) => createMatchTable(match))}</div>
    <form action="#">
      <input className="btn btn-success" type="submit" onClick={() => onSubmitScore(currentRound)} value="SubmitScores"/>
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
    onSubmitScore: (currentRound) => {
      dispatch(submitScore(currentRound))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Round)
