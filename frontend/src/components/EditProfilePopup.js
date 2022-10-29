/**
 * @format done by Prettier
 * @function EditProfilePopup
 * @props:
 * isOpen - state @variable about open / close EditProfilePopup condition
 * onClose - handler @function closing all of popups on page
 * onUpdateUser - handler @function on submitting respective form
 *
 */

import PopupWithForm from './PopupWithForm';
import React from 'react';
import { UserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
	isOpen,
	onClose,
	onUpdateUser,
	isLoading,
}) {
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');
	const currentUser = React.useContext(UserContext);

	/**
	 * Inside the EditProfilePopup add the name and description state variables
	 * and bind them to the input fields, making them manageable.
	 * Don't forget about the onChange() handlers.
	 *
	 * After loading the current user from the API
	 * their data will be used in managed components.
	 */

	React.useEffect(() => {
		setName(currentUser.name || '');
		setDescription(currentUser.about || '');
	}, [currentUser, isOpen]);

	const handleNameChange = (event) =>
		setName(event.target.value);

	const handleRoleChange = (event) =>
		setDescription(event.target.value);

	const handleSubmit = (event) => {
		event.preventDefault();
		onUpdateUser({ name, about: description });
	};

	return (
		<PopupWithForm
			isOpen={isOpen}
			onClose={onClose}
			title='Edit profile'
			name='editProfile'
			onSubmit={handleSubmit}
			buttonText={isLoading ? 'Saving...' : 'Save'}
		>
			<input
				id='name-input'
				onChange={handleNameChange}
				value={name}
				placeholder='Input name'
				type='text'
				className='form__input form__input_type_name'
				name='profilenameInput'
				minLength='2'
				maxLength='40'
				required
			/>
			<span
				id='name-input-error'
				className='form__input-error'
			/>
			<input
				id='role-input'
				onChange={handleRoleChange}
				value={description}
				type='text'
				className='form__input form__input_type_role'
				name='profileFormRoleInput'
				minLength='2'
				maxLength='200'
				placeholder='Input role'
				required
			/>
			<span
				id='role-input-error'
				className='form__input-error'
			/>
		</PopupWithForm>
	);
}
