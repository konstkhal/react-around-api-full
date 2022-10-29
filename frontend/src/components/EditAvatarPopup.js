/** @format */
import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function EditAvatarPopup({
	isOpen,
	onClose,
	onUpdateAvatar,
	isLoading,
}) {
	const imageInput = React.useRef();

	const handleSubmit = (event) => {
		event.preventDefault();
		onUpdateAvatar(imageInput.current.value);
	};

	React.useEffect(() => {
		imageInput.current.value = '';
	}, [isOpen, imageInput]);

	return (
		<PopupWithForm
			onSubmit={handleSubmit}
			title='Change Profile Picture'
			name='avatarChange'
			isOpen={isOpen}
			onClose={onClose}
			buttonText={isLoading ? 'Saving...' : 'Save'}
		>
			<input
				ref={imageInput}
				id='url-avatar'
				type='url'
				className='form__input form__input_type_avatar-link'
				placeholder='Image link'
				name='name'
				required
				minLength='1'
			/>
			<span
				id='url-avatar-error'
				className='form__input-error'
			/>
		</PopupWithForm>
	);
}
