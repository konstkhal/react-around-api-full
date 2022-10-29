import accept from '../images/accept.png';
import decline from '../images/decline.png';

export default function InfoToolTip({
	isOpen,
	onClose,
	IsSuccess,
}) {
	return (
		<div
			className={`popup popup_type_tooltip ${
				isOpen ? 'popup_opened' : ''
			}`}
		>
			<div className='popup__window'>
				<button
					type='button'
					className='popup__close-button popup__close-button_tooltip'
					onClick={onClose}
				/>
				{IsSuccess === true ? (
					<div>
						<img
							className='popup__icon'
							src={accept}
							alt={
								IsSuccess === true
									? 'Registration succefull - Check sign in black color'
									: 'Registration failed - cross sign in red color'
							}
						/>
						<p className='popup__status-message'>
							Success! You have been registered.
						</p>
					</div>
				) : (
					<div>
						<img
							className='popup__icon'
							src={decline}
							alt={
								IsSuccess === false
									? 'Registration succefull - Check sign in black color'
									: 'Registration failed - Cross sign in red color'
							}
						/>
						<p className='popup__status-message'>
							Oops, something went wrong! Please try again.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
