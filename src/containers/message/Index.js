import style from './Index.styl'

class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { view: { Links, Routes } } = this.props
        return (
            <div className={style.container}>
                <Links />
                <Routes />
            </div>
        )
    }
}

export default Message