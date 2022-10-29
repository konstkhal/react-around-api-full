/**
 * @format done by Prettier
 * @function Header returns Header element
 *
 *
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/Vector__header.svg';
import { UserContext } from '../contexts/CurrentUserContext';
/* import HeaderNav from './HeaderNav'; */

export default function Header({
	isLoggedIn,
	handleLogout,
}) {
	const currentUser = React.useContext(UserContext);
	const currentPath = useLocation().pathname;
	const linkTo =
		currentPath === '/signin' ? '/signup' : '/signin';
	const linkText =
		linkTo === '/signin' ? 'Log in' : 'Sign up';

	return (
		<header className='header'>
			<Link to='/'>
				<img
					src={logo}
					className='header__logo'
					alt='Logo around the us - Just text'
				/>
			</Link>

			{isLoggedIn ? (
				<div className='header__container'>
					<p className='header__email'>
						{currentUser.email}
					</p>
					<div
						className='header__text'
						onClick={handleLogout}
					>
						Log Out
					</div>
				</div>
			) : (
				<Link
					to={linkTo}
					className='header__link'
				>
					{linkText}
				</Link>
			)}
		</header>
	);
}
