import { __ } from '@wordpress/i18n';

export function Spinner() {
	return (
		<p>
			<span
				style={ { visibility: 'visible' } }
				className="spinner"
			></span>
			{ __( 'Loading…', 'wp-plugin-suggestions' ) }
		</p>
	);
}
