/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { combineReducers } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { INITIAL_STATE } from './constants';

export function wordpressPlugins(
	state = INITIAL_STATE.wordpressPlugins,
	action
) {
	switch ( action.type ) {
		case 'SET_WORDPRESS_PLUGINS':
			return action.payload;
	}
	return state;
}

export function sitePlugins( state = INITIAL_STATE.sitePlugins, action ) {
	switch ( action.type ) {
		case 'SET_SITE_PLUGINS':
			return action.payload;
	}
	return state;
}

export default combineReducers( {
	wordpressPlugins,
	sitePlugins,
} );
