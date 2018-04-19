import { all } from 'redux-saga/effects'
import { requireAll } from 'common/util'

const sagas = requireAll(require.context('.', false, /^(.(?!index))+\.js$/))

export default function* () {
    yield all(_.flatten(_.values(sagas)))
}