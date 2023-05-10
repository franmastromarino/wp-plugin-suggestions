/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import * as actions from './actions';
import { WordPressPlugin, SitePlugin } from './types';

export const getWordPressPlugins = async (): Promise< {
	type: string;
	payload: WordPressPlugin[];
} > => {
	const response = await actions.fetchWordPressPlugins();
	if ( ! response?.plugins ) {
		// Verify
		return {
			type: 'SET_WORDPRESS_PLUGINS',
			payload: [],
		};
	}
	return actions.setWordPressPlugins( response.plugins );
};

export const getSitePlugins = async (): Promise< {
	type: string;
	payload: SitePlugin[];
} > => {
	const response = await actions.fetchSitePlugins();
	return actions.setSitePlugins( response );
};
