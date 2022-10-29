import { Api } from './api';

class Auth extends Api {
	register = (user) => {
		return this._customFetch(`${this._baseUrl}/signup`, {
			headers: this._headers,
			method: 'POST',
			body: JSON.stringify({
				password: user.password,
				email: user.email,
			}),
		});
	};

	authenticate = (user) => {
		return this._customFetch(`${this._baseUrl}/signin`, {
			headers: this._headers,
			method: 'POST',
			body: JSON.stringify({
				password: user.password,
				email: user.email,
			}),
		});
	};

	validateToken = (token) => {
		this._headers = {
			...this._headers,
			Authorization: `Bearer ${token}`,
		};
		return this._customFetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
			method: 'GET',
		});
	};
}

export const auth = new Auth({
	baseUrl: 'https://register.nomoreparties.co',
	headers: { 'Content-Type': 'application/json' },
});
