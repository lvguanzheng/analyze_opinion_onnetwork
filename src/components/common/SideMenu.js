import style from './SideMenu.styl'

const prependGroup = (group, child) => ([
    <div className={style.group} key={group}>{group}</div>,
    child
])

export default props => {
    let lastGroup = null
    const items = _.chain(props.children)
        .map(child => {
            let item = [child]
            const group = _.get(child, 'props.meta.group', '其他')

            if (group !== lastGroup) {
                item = prependGroup(group, child)
                lastGroup = group
            }
            return item
        })
        .flatten()
        .value()
    return (
        <div className={style.menu}>
            {items}
        </div>
    )
}