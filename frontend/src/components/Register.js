import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Register({
	isLoggedIn,
	isLoading,
	onSubmit,
	title,
}) {
	const [inputs, setInputs] = React.useState({});
	const [errorFields, setErrorFields] = React.useState({});
	const [isValid, setIsValid] = React.useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit({
			email: inputs.emailInput,
			password: inputs.passwordInput,
		});
	};

	const handleInput = (event) => {
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		});
		setErrorFields({
			...errorFields,
			[event.target.name]: event.target.validationMessage,
		});
	};

	useEffect(() => {
		const areFieldsEmpty =
			!inputs.emailInput || !inputs.passwordInput;
		const formHasErrors = Boolean(
			errorFields.emailInput || errorFields.passwordInput
		);
		const isFormValid = !(areFieldsEmpty || formHasErrors);
		setIsValid(isFormValid);
	}, [inputs, errorFields]);

	useEffect(() => {
		setInputs({});
		setErrorFields({});
		setIsValid(false);
	}, [isLoggedIn]);

	return (
		<div className='form-page'>
			<h2 className='form-page__title'>${title}</h2>
			<form
				onSubmit={handleSubmit}
				className='form form-page__form'
				name='register'
			>
				<input
					onChange={handleInput}
					value={inputs.emailInput || ''}
					id='email-input'
					autoComplete='username'
					type='email'
					className='form__input form-page__input'
					name='emailInput'
					required
					minLength='2'
					maxLength='40'
					placeholder='Email'
				/>
				<span
					className={`form__input-error ${
						isValid ? '' : 'form__input-error_active'
					}`}
				>
					{errorFields.emailInput}
				</span>
				<input
					onChange={handleInput}
					value={inputs.passwordInput || ''}
					id='password-input'
					autoComplete='current-password'
					type='password'
					className='form__input  form-page__input'
					name='passwordInput'
					required
					minLength='2'
					maxLength='200'
					placeholder='Password'
				/>
				<span
					className={`form__input-error ${
						isValid ? '' : 'form__input-error_active'
					}`}
				>
					{errorFields.passwordInput}
				</span>
				<button
					disabled={!isValid}
					type='submit'
					className={`button form-page__submit-button ${
						!isValid ? 'button_disabled' : ''
					}`}
				>
					{isLoading ? 'Signing you up...' : title}
				</button>
				<div className='form-page__text-info'>
					<Link
						to='/signin'
						className='form-page__link'
					>
						Already a member? Log in here!
					</Link>
				</div>
			</form>
		</div>
	);
}
