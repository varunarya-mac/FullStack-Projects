import React, { useState} from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: (data) => Router.push('/')
    })

    const submitValues = async(event) => {
        event.preventDefault();
        await doRequest();
    }

    return (
        <form onSubmit={submitValues}>
            <h1>Sign In</h1>
            <div className="form-group">
                <lable>Email:</lable>
                <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <lable>Password:</lable>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Sign In</button>
        </form>
    )
}