import { render } from 'react-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { APP } from 'constant/actions'
import App from 'container/App'
import reducers from './reducers'
import sagas from './sagas'


const sagaMiddleware = createSagaMiddleware()
const enhancer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(applyMiddleware(sagaMiddleware))

const store = createStore(
    combineReducers(reducers),
    {},
    enhancer
)
const _dispatch = store.dispatch
store.dispatch = action => _dispatch({ ...action, type: `${action.type}` })

sagaMiddleware.run(sagas)

const bootstrap = () => render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
)

store.dispatch({
    type: APP.FETCH_USER,
    callback: bootstrap
})