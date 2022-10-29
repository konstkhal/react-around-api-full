/** @format */

export class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}
	_customFetch = async (url, headers) => {
		const response = await fetch(url, headers);
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response.statusText);
		}
	};

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

export const api = new Api({
	baseUrl: 'https://around.nomoreparties.co/v1/group-12',
	headers: {
		authorization: 'cfbd7707-a110-44ae-8aa8-630296f53c66',
		'Content-Type': 'application/json',
	},
});
