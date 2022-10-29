import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({
	isLoggedIn,
	redirectPath,
	children,
	...props
}) {
	return isLoggedIn ? (
		children
	) : (
		<Navigate
			{...props}
			to={redirectPath}
		/>
	);
}
