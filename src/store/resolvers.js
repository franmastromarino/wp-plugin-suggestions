/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import * as actions from './actions';

export const getWordPressPlugins = async () => {
	const response = await actions.fetchWordPressPlugins();
	if ( ! response?.plugins ) {
		/// verificar
		return [];
	}
	return actions.setWordPressPlugins( response.plugins );
};

export const getSitePlugins = async () => {
	const response = await actions.fetchSitePlugins();
	return actions.setSitePlugins( response );
};
