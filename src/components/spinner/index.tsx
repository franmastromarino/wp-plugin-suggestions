import { __ } from '@wordpress/i18n';
import React, { JSX } from 'react';

export const Spinner = (): JSX.Element => {
	return (
		<p>
			<span
				style={ { visibility: 'visible' } }
				className="spinner"
			></span>
			{ __( 'Loading…', 'wp-plugin-suggestions' ) }
		</p>
	);
};
