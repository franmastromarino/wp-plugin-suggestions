/**
 * WordPress dependencies
 */
//@ts-ignore
import React from 'react';
//@ts-ignore
import { __, sprintf } from '@wordpress/i18n';
//@ts-ignore
import wpApiFetch from '@wordpress/api-fetch';

/**
 * Handle the response from the apiFetch
 *
 * @param {*} args
 * @returns response or error
 */

interface ApiResponse {
	code?: string;
	message?: string;
	[ key: string ]: unknown;
}

export async function apiFetch( args: any ): Promise< any > {
	return await wpApiFetch( args )
		.then( ( response: ApiResponse ) => {
			if ( !! response.code ) {
				throw new Error(
					`${ response.code }: ${ response?.message || 'Unknown' }`
				);
			}
			return response;
		} )
		.catch( ( error: unknown ) => {
			throw new Error( JSON.stringify( error ) );
		} );
}

export const LABELS: {
	install: string;
	inactive: string;
	active: string;
	[ key: string ]: any;
} = {
	install: __( 'Install', 'wp-plugin-suggestions' ),
	inactive: __( 'Active', 'wp-plugin-suggestions' ),
	active: __( 'Active', 'wp-plugin-suggestions' ),
};

export function getLastUpdate( last_updated: string ): string {
	const lastDate = new Date( last_updated.split( ' ' )[ 0 ] );
	const currentDate = new Date();

	const timeDifference = currentDate.getTime() - lastDate.getTime();
	const daysDifference = Math.floor(
		timeDifference / ( 1000 * 60 * 60 * 24 )
	);

	const lastUpdate = parseInt( daysDifference.toString() );

	if ( lastUpdate === 0 ) {
		return __( 'Today', 'wp-plugin-suggestions' );
	}

	if ( lastUpdate > 30 ) {
		return sprintf(
			__( '%s Months Ago', 'wp-plugin-suggestions' ),
			parseInt( Math.floor( lastUpdate / 30 ).toString() )
		);
	}

	return sprintf( __( '%s Days Ago', 'wp-plugin-suggestions' ), lastUpdate );
}

export const getWordPressDirectoryURL = ( slug: string ): string => {
	return `https://wordpress.org/plugin/${ slug }`;
};

export const ImagePlaceholder =
	'data:image/jpeg;base64,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';

export const WordpressIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10s10-4.49 10-10S17.51 2 12 2zM3.01 12c0-1.3.28-2.54.78-3.66l4.29 11.75c-3-1.46-5.07-4.53-5.07-8.09zM12 20.99c-.88 0-1.73-.13-2.54-.37l2.7-7.84l2.76 7.57c.02.04.04.09.06.12c-.93.34-1.93.52-2.98.52zm1.24-13.21c.54-.03 1.03-.09 1.03-.09c.48-.06.43-.77-.06-.74c0 0-1.46.11-2.4.11c-.88 0-2.37-.11-2.37-.11c-.48-.02-.54.72-.05.75c0 0 .46.06.94.09l1.4 3.84l-1.97 5.9l-3.27-9.75c.54-.02 1.03-.08 1.03-.08c.48-.06.43-.77-.06-.74c0 0-1.46.11-2.4.11c-.17 0-.37 0-.58-.01C6.1 4.62 8.86 3.01 12 3.01c2.34 0 4.47.89 6.07 2.36c-.04 0-.08-.01-.12-.01c-.88 0-1.51.77-1.51 1.6c0 .74.43 1.37.88 2.11c.34.6.74 1.37.74 2.48c0 .77-.3 1.66-.68 2.91l-.9 3l-3.24-9.68zm6.65-.09a8.988 8.988 0 0 1-3.37 12.08l2.75-7.94c.51-1.28.68-2.31.68-3.22c0-.33-.02-.64-.06-.92z"
		/>
	</svg>
);

export const getStars = (
	percentage: number
): {
	fullStars: number;
	halfStars: number;
	emptyStars: number;
} => {
	const fullStars = Math.floor( percentage / 20 );
	const halfStars = percentage % 20 >= 10 ? 1 : 0;
	const emptyStars = 5 - fullStars - halfStars;

	return {
		fullStars,
		halfStars,
		emptyStars,
	};
};
