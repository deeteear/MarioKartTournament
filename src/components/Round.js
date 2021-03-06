import React from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import PropTypes from 'prop-types'
import ErrorMessageBox from './ErrorMessageBox'
import { submitScore } from '../actions'
import { getMapName } from '../functions/map'
import Messages from '../messages'

const Round = ({ currentRound, errorMessage, onSubmitScore }) => {
  const createMatchTable = (matchData) => {
    const placements = [...Array(matchData.length).keys()].map(x => x + 1)

    const preventDuplicatePlacements = (row, cellName, cellValue) => {
      return !matchData.map(player => player.place).includes(cellValue)
    }

    const matchKey = matchData.map(player => player.name).join(',')
    return (<div key={matchKey}>
      <BootstrapTable data={matchData} cellEdit={{
        mode: 'click',
        blurToSave: true,
        beforeSaveCell: preventDuplicatePlacements,
      }}>
        <TableHeaderColumn dataField='name' isKey={true}>{Messages['roundPage.nameColumn']}</TableHeaderColumn>
        <TableHeaderColumn dataField='controller' editable={false}>{Messages['roundPage.controllerColumn']}</TableHeaderColumn>
        <TableHeaderColumn dataField='place' editable={{
          type: 'select',
          options: {
            values: placements,
          },
        }}>{Messages['roundPage.placementColumn']}</TableHeaderColumn>
      </BootstrapTable>
      <br/>
    </div>)
  }

  return (<div>
    <h1>{Messages['roundPage.currentMap']}: {getMapName(currentRound.map)}</h1>
    <ErrorMessageBox errorMessage={errorMessage} />
    <div>{currentRound.matches.map((match) => createMatchTable(match))}</div>
    <form action="#">
      <input
        className="btn btn-success"
        type="submit"
        onClick={() => onSubmitScore(currentRound)}
        value={Messages['button.submitScore']}
      />
      &nbsp;
    </form>
  </div>)
}

Round.propTypes = {
  currentRound: PropTypes.object,
  onSubmitScore: PropTypes.func,
  errorMessage: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    currentRound: state.app.currentRound,
    errorMessage: state.app.errorMessage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitScore: (currentRound) => {
      dispatch(submitScore(currentRound))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Round)
