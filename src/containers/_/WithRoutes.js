import style from './WithRoutes.styl'

export default props => (
    <div className={style.container}>
        <div className={style.aside}>
            {props.links}
        </div>
        <div className={style.main}>
            <h1> - placeholder container - </h1>
            {props.routes}
        </div>
    </div>
)