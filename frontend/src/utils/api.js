/** @format */

export class Api {
	constructor({ baseUrl, headers, jwt }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
		this._token = jwt;
	}
	_customFetch = async (url, headers) => {
		const response = await fetch(url, headers);
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response.statusText);
		}
	};
	//
	setToken = (token) => (this._token = token);

	init = () =>
		Promise.all([
			this._getInitialCards(),
			this._getUserInfo(),
		]);

	_getInitialCards() {
		return this._customFetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
		});
	}
	_getUserInfo() {
		return this._customFetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
		});
	}

	setAvatarLink(data) {
		return this._customFetch(
			`${this._baseUrl}/users/me/avatar`,
			{
				headers: this._headers,
				method: 'PATCH',
				body: JSON.stringify({ avatar: data }),
			}
		);
	}

	setUserInfo(data) {
		return this._customFetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	createCard(data) {
		return this._customFetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	deleteCard(cardId) {
		return this._customFetch(
			`${this._baseUrl}/cards/${cardId}`,
			{
				headers: this._headers,
				method: 'DELETE',
			}
		);
	}

	handleLikeCardStatus(cardId, isLiked) {
		return this._customFetch(
			`${this._baseUrl}/cards/likes/${cardId}`,
			{
				headers: this._headers,
				method: isLiked ? 'DELETE' : 'PUT',
			}
		);
	}
}

const jwt = localStorage.getItem('jwt');

export const api = new Api({
	baseUrl: 'http://localhost:3000',
	headers: {
		authorization: `Bearer ${jwt}`,
		'Content-Type': 'application/json',
	},
});
