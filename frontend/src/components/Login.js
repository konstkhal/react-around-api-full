import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Login({
	isLoggedIn,
	isLoading,
	onSubmit,
	title,
}) {
	const [inputs, setInputs] = React.useState({});
	const [errorFields, setErrorFields] = React.useState({});
	const [isValid, setIsValid] = React.useState(false);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onSubmit({
			email: inputs.emailInput,
			password: inputs.passwordInput,
		});
	};

	const handleInput = (evt) => {
		setInputs({
			...inputs,
			[evt.target.name]: evt.target.value,
		});
		setErrorFields({
			...errorFields,
			[evt.target.name]: evt.target.validationMessage,
		});
	};

	useEffect(() => {
		const areInputsEmpty =
			!inputs.emailInput || !inputs.passwordInput;
		const formHasErrors = Boolean(
			errorFields.emailInput || errorFields.passwordInput
		);
		const isFormValid = !(areInputsEmpty || formHasErrors);
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
				name='signup'
				title={title}
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
					className='form__input form-page__input'
					name='passwordInput'
					required
					minLength='2'
					maxLength='200'
					placeholder='Password'
				/>
				<span
					className={`form-page__input-error ${
						isValid ? '' : 'form-page__input-error_active'
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
					{isLoading ? 'Logging you in...' : title}
				</button>
				<div className='form-page__text-info'>
					<Link
						to='/signup'
						className='form-page__link'
					>
						Not a member? Sign up here!
					</Link>
				</div>
			</form>
		</div>
	);
}
