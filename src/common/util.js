/**
 * 动态引入文件夹下多个文件
 * @context {Context} Webpack Require Context
 * @normalize {Function} 把context的key转换为想要的格式,返回falsy值则表示忽略该文件
 * @return {Object} 包含多个文件的引用的对象
 */
export const requireAll = (
    context,
    normalize = v => v.replace(/\.\/([\w./]+)\.\w+$/, '$1').replace(/\//g, '.')
) => context
    .keys()
    .reduce((obj, key) => {
        const normalizedKey = normalize(key)
        return _.has(obj, normalizedKey) ? obj : _.set(obj, normalizedKey, context(key).default || context(key))
    }, {})

export default {
    requireAll
}