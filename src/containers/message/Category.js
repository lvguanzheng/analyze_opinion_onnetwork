import { connect } from 'react-redux'

class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    render() {
        return <div>Category</div>
    }
}

export default connect(state => state.message, dispatch => ({}))(Category)