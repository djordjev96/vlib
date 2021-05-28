import React, {useState} from 'react';
import axios from '../api';

const LoginComponent = () => {
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        axios.post(
            '/users/login',
            {
                email,
                password,
            },
            {
                validateStatus: () => true,
            }
        )
        .then((res) => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                window.location.reload(false);
            }
            else if (res.status === 403) {
                setError('Greska!');
            } else if (res.status === 404) {
                setError('Korisnik ne postoji');
            }
        });
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>
                Email
                <input type="text" placeholder="Email" id="email" name="email" />
            </label>
            <label>
                Šifra
                <input type="password" placeholder="Šifra" id="password" name="password" />
            </label>
            <div>
                <button type="submit">Prijavi se</button>
            </div>
            {error}
        </form>
    );
};

export { LoginComponent as default };
