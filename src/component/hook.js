import React, { useReducer, useEffect } from 'react'

const initialState = {
    looding: true,
    error: '',
    post: {}
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'fetch_success':
            return {
                looding: false,
                error: '',
                post: action.data
            }
        case 'fetch_error':
            return {
                looding: false,
                error: 'Something Is Wrong ! :(',
                post: {}
            }
        default:
            return state;
    }
}

function Hook() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => res.json())
            .then(res => dispatch({ type: 'fetch_success', data: res }))
            .catch(err => dispatch({ type: 'fetch_error' }));
    }, [])

    return (
        <div>
            {state.looding ? 'looding' : state.post.title}
            {state.error ? state.error : null}
        </div>
    )
}

export default Hook