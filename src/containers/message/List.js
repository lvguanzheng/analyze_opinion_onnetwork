import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MESSAGE } from 'constant/actions'
import listStyle from './List.styl'

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.props.getMessages()
    }

    render() {
        const { list = {} } = this.props
        const { messages = {} } = list
        const { data = [] } = messages

        return (
            <div className={listStyle.container}>
                {data.map(msg => <span key={msg.id}>{msg.desc}</span>)}
            </div>
        )
    }
}

List.propTypes = {
    list: PropTypes.object.isRequired,
    getMessages: PropTypes.func.isRequired
}

export default connect(
    state => state.message,
    dispatch => ({
        getMessages: payload =>
            dispatch({ type: MESSAGE.GET_MESSAGES, payload })
    })
)(List)