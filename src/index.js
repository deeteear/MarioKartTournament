import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducer'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css'


const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>,
document.getElementById('root'))
