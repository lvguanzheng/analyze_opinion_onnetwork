const defaults = {
    credentials: 'same-origin',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
}

const request = (url, params, method = 'POST') => {
    const opts = {
        ...defaults,
        method,
        body: params ? Object.entries(params).reduce((formdata, [k, v]) => (formdata.append(k, v), formdata), new FormData()) : null
    }

    return fetch(url, opts)
        .then(resp => resp.json())
        .then(({ flag, data, message }) => {
            if (flag === -1) {
                console.debug('GO TO LOGIN')
            } else if (flag !== 1) {
                throw message
            }
            return data
        }).catch(err => {
            alert(`Error: ${err.message || err}`)
            throw err
        })
}

export const post = request

export default {
    post
}