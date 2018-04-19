// import PropTypes from 'prop-types'
import transferStyle from './Transfer.styl'

class Transfer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={transferStyle.main}>
                transfer
            </div>
        )
    }
}

Transfer.propTypes = {}

export default Transfer