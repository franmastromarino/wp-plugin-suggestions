/**
 * WordPress dependencies
 */
//@ts-ignore
import { __ } from '@wordpress/i18n';
//@ts-ignore
import { combineReducers } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { INITIAL_STATE } from './constants';
import { WordPressPlugin, SitePlugin } from './types';

interface WordPressPluginAction {
	type: 'SET_WORDPRESS_PLUGINS';
	payload: WordPressPlugin[];
}

interface SitePluginAction {
	type: 'SET_SITE_PLUGINS';
	payload: SitePlugin[];
}

export function wordpressPlugins(
	state: WordPressPlugin[] = INITIAL_STATE.wordpressPlugins,
	action: WordPressPluginAction
): WordPressPlugin[] {
	switch ( action.type ) {
		case 'SET_WORDPRESS_PLUGINS':
			return action.payload as WordPressPlugin[];
	}
	return state;
}

export function sitePlugins(
	state: SitePlugin[] = INITIAL_STATE.sitePlugins,
	action: SitePluginAction
): SitePlugin[] {
	switch ( action.type ) {
		case 'SET_SITE_PLUGINS':
			return action.payload as SitePlugin[];
	}
	return state;
}

export default combineReducers( {
	wordpressPlugins,
	sitePlugins,
} );
