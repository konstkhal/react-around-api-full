/**
 * @format done by Prettier
 * React @component App.js
 *
 */

import React from 'react';
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
} from 'react-router-dom';
import { UserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
//import Card from './Card';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
/* import decline from '../images/decline.png';
import accept from '../images/accept.png'; */
//import UserDetails from './UserDetails';
import { auth } from '../utils/auth';
import Register from './Register';
import Login from './Login';

export default function App() {
	const [currentUser, setCurrentUser] = React.useState({}); //nameUser, avatarUser,aboutUser
	const [cards, setCards] = React.useState([]);
	const [
		isEditProfilePopupOpen,
		setIsEditProfilePopupOpen,
	] = React.useState(false);

	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] =
		React.useState(false);

	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		React.useState(false);

	const [
		isConfirmDeletePopupOpen,
		setIsConfirmDeletePopupOpen,
	] = React.useState(false);

	const [isInfoTooltipOpen, setIsInfoTooltipOpen] =
		React.useState(false);

	const [IsSuccess, setIsSuccess] = React.useState(true);

	/* 	const [isUserDetailsOpen, setIsUserDetailsOpen] =
		React.useState(false); */
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const navigate = useNavigate();

	const [selectedCard, setSelectedCard] =
		React.useState(null);

	const handleAddPlaceSubmit = ({ name, link }) => {
		setIsLoading(true);
		api
			.createCard({ name, link })
			.then((card) => {
				setCards([card, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};

	function handleCardLike(card, isLiked) {
		// Check one more time if this card was already liked
		// Send a request to the API and getting the updated card data

		api
			.handleLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((stateCards) =>
					stateCards.map((currentCard) =>
						currentCard._id === card._id
							? newCard
							: currentCard
					)
				);
			})
			.catch((err) => console.log(err));
	}

	function handleCardDelete(cardId) {
		api
			.deleteCard(cardId)
			.then(() => {
				setCards((cards) =>
					cards.filter(
						(cardLeft) => cardLeft._id !== cardId
					)
				);
			})
			.catch((err) => console.log(err));
	}

	const handleEditProfileClick = () =>
		setIsEditProfilePopupOpen(true);

	const handleAddPlaceClick = () =>
		setIsAddPlacePopupOpen(true);

	const handleEditAvatarClick = () =>
		setIsEditAvatarPopupOpen(true);

	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsConfirmDeletePopupOpen(false);
		setSelectedCard(null);
		setIsInfoTooltipOpen(false);
	};

	React.useEffect(() => {
		const getUserInfoFromAPI = () => {
			return api.init();
		};
		const getUserInfoFromToken = () => {
			const jwt = localStorage.getItem('jwt');
			if (jwt) return auth.validateToken(jwt);
		};

		Promise.allSettled([
			getUserInfoFromAPI(),
			getUserInfoFromToken(),
		])
			.then((values) => {
				const [cards, userFromAPI] = values[0].value; // handle API info
				const userFromToken = values[1].value
					? values[1].value.data
					: null; // handle localstorage data
				setCards(cards);
				setCurrentUser({
					...userFromToken,
					...userFromAPI,
				});
				if (userFromToken) {
					setIsLoggedIn(true);
					navigate('/');
				}
			})
			.catch((err) => console.log(err));
	}, [navigate]);

	const handleCardClick = (card) => {
		setSelectedCard(card);
	};

	const handleUpdateUser = ({ name, about }) => {
		setIsLoading(true);
		api
			.setUserInfo({ name, about })
			.then((user) => {
				setCurrentUser({ ...currentUser, ...user });
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};

	const handleUpdateAvatar = (url) => {
		setIsLoading(true);
		api
			.setAvatarLink(url)
			.then((user) => {
				setCurrentUser({ ...currentUser, ...user });
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};

	const handleNewUserSubmit = ({ email, password }) => {
		setIsLoading(true);
		auth
			.register({ email, password })
			.then((user) => {
				if (user.data._id) {
					setIsSuccess(true);

					/* 				setTimeout(() => {
						navigate('/signin');
						setIsInfoTooltipOpen(true);
					}, 3000); */
				} else {
					setIsSuccess(false);
				}
			})
			.catch((err) => {
				setIsSuccess(false);
				setIsInfoTooltipOpen(true);
			})
			.finally(() => {
				setIsLoading(false);
				//		setIsSuccess(true);
				setIsInfoTooltipOpen(true);
			});
	};

	const handleLogin = ({ email, password }) => {
		setIsLoading(true);
		auth
			.authenticate({ email, password })
			.then((user) => {
				localStorage.setItem('jwt', user.token);
				/* 				setIsInfoTooltipOpen(true); */
				setIsLoggedIn(true);
				setIsSuccess(true);
				setCurrentUser({ ...currentUser, email });
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		/* 		setIsUserDetailsOpen(false); */
		localStorage.removeItem('jwt');
	};
	return (
		<UserContext.Provider value={currentUser}>
			<div className='App page'>
				<InfoTooltip
					isOpen={isInfoTooltipOpen}
					onClose={closeAllPopups}
					IsSuccess={IsSuccess}
				/>

				<Header
					/* 					isDropDownOpen={isUserDetailsOpen} */
					handleLogout={handleLogout}
					isLoggedIn={isLoggedIn}
					email={currentUser.email}
				/>

				<Routes>
					<Route
						path='/signin'
						element={
							<Login
								isLoading={isLoading}
								onSubmit={handleLogin}
								isLoggedIn
								title='Log in'
							/>
						}
					/>
					<Route
						path='/signup'
						element={
							<Register
								onSubmit={handleNewUserSubmit}
								isLoading={isLoading}
								isLoggedIn
								title='Sign up'
							/>
						}
					/>
					<Route
						path='/'
						element={
							<ProtectedRoute
								redirectPath='/signin'
								isLoggedIn={isLoggedIn}
							>
								<Main
									onEditProfileClick={
										handleEditProfileClick
									}
									onAddPlaceClick={handleAddPlaceClick}
									onEditAvatarClick={handleEditAvatarClick}
									onCardClick={handleCardClick}
									cards={cards}
									onCardLike={handleCardLike}
									onCardDelete={handleCardDelete}
								/>
							</ProtectedRoute>
						}
					/>
					<Route
						path='*'
						element={<Navigate to='/' />}
					/>
				</Routes>

				<Footer />

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}
				/>

				<PopupWithForm
					title='Are you sure?'
					name='confirmDeleteCard'
					isLoading={isLoading}
					buttonText='Yes'
					isOpen={isConfirmDeletePopupOpen}
					onClose={closeAllPopups}
				/>

				<AddPlacePopup
					onAddPlaceSubmit={handleAddPlaceSubmit}
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					title='New place'
					name='namePlace'
					isLoading={isLoading}
				/>

				<EditAvatarPopup
					onUpdateAvatar={handleUpdateAvatar}
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					isLoading={isLoading}
				/>

				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
				/>
			</div>
		</UserContext.Provider>
	);
}
