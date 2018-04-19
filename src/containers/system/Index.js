import style from './Index.styl'

const System = props => {
    const { view: { Links, Routes } } = props
    return (
        <div className={style.container}>
            <Links />
            <Routes />
        </div>
    )
}

export default System