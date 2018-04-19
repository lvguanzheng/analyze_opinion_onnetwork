import { combineReducers } from 'redux'
import { requireAll } from 'common/util'

const reducers = requireAll(require.context('.', true, /^(.(?!index))+\.js$/))

const combineObjectToReducer = obj => {
    Object
        .entries(obj)
        .filter(([k, v]) => typeof v === 'object')
        .forEach(([k, v]) => {
            combineObjectToReducer(v)
            obj[k] = combineReducers(v)
        })
}
combineObjectToReducer(reducers)

export default reducers