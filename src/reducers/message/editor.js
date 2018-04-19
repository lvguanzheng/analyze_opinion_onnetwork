import { MESSAGE } from 'constants/actions'

export default (state = {}, { type, ...mutation }) => {
    switch (type) {
    case MESSAGE.GET_MAIN_TYPES.SUCCEED:
        return {
            ...state,
            mainTypes: mutation
        }
    case MESSAGE.GET_DETAIL_TYPES.SUCCEED:
        return {
            ...state,
            detailTypes: mutation
        }
    case MESSAGE.TO_UPDATE_MESSAGE.SUCCEED:
        return {
            ...state,
            messageDetail: mutation
        }
    default:
        return {
            ...state
        }
    }
}