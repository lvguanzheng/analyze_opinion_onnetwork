import style from './HeaderMenu.styl'

export default props => (
    <div className={style.menu}>
        {props.children}
    </div>
)