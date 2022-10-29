/**
 * @format done by Prettier
 * @function PopupWithForm
 * @props:
 * title - form title property @variable
 * name - form name property @variable to be used inside className property
 * isOpen - state @variable about open / close PopupWithForm condition
 * buttonText - @variable containing button text. Defaulr value "Save"
 * onClose - handler @function closing all of popups on page
 * onSubmit - handler @function on submitting respective form
 * children - variable used to place all of a children elements for the respective form
 */

import React from 'react';

export default function PopupWithForm({
	title,
	name,
	isOpen,
	buttonText,
	onClose,
	onSubmit,
	children,
	isLoading,
}) {
	return (
		<div
			className={`popup popup_type_${name} ${
				isOpen ? 'popup_opened' : ''
			}`}
		>
			<div className='popup__window'>
				<button
					type='button'
					className={`popup__close-button popup__close-button_${name}`}
					aria-label='close'
					onClick={onClose}
				></button>
				<h2 className='popup__title'>{title}</h2>

				<form
					className={`form popup__container popup__container_${name}`}
					name={name}
					onSubmit={onSubmit}
				>
					{children}
					<button
						type='submit'
						className={`button form__submit-button form__submit-button_place_${name}`}
					>
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
}
