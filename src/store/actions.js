/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
/**
 * Internal dependencies
 */
import { apiFetch } from './helpers';

export const setWordPressPlugins = ( wordpressPlugins ) => {
	return {
		type: 'SET_WORDPRESS_PLUGINS',
		payload: wordpressPlugins,
	};
};

export const setSitePlugins = ( sitePlugins ) => {
	return {
		type: 'SET_SITE_PLUGINS',
		payload: sitePlugins,
	};
};

export const installWordPressPlugin =
	( slug ) =>
	async ( { registry, dispatch, select, resolveSelect } ) => {
		const sitePlugins = select.getSitePlugins();

		const response = await apiFetch( {
			method: 'POST',
			path: 'wp/v2/plugins',
			data: { slug, status: 'inactive' },
		} );

		/// check the response
		if ( ! response?.author ) {
			registry
				.dispatch( noticesStore )
				.createErrorNotice(
					sprintf( __( '%s: %s' ), 'Something', 'wrong' ),
					{
						type: 'snackbar',
					}
				);

			return {
				name: slug,
				status: 'install',
			};
		}

		const pluginInstalled = {
			name: response.plugin.split( '/' )[ 1 ],
			status: response.status,
			url: response._links.self[ 0 ].href,
		};

		sitePlugins.push( pluginInstalled );
		dispatch.setSitePlugins( sitePlugins );

		return pluginInstalled;
	};

export const activateSitePlugin =
	( slug ) =>
	async ( { registry, dispatch, select, resolveSelect } ) => {
		const sitePlugins = select.getSitePlugins();
		const plugin = sitePlugins.find( ( { name } ) => name == slug );

		if ( ! plugin?.url ) {
			return {
				name: slug,
				status: 'install',
			};
		}

		const { url } = plugin;

		const response = await apiFetch( {
			method: 'PUT',
			url,
			data: { status: 'active' },
		} );

		/// check the response

		const pluginInstalled = {
			name: response.plugin.split( '/' )[ 1 ],
			status: response.status,
			url: response._links.self[ 0 ].href,
		};

		dispatch.setSitePlugins( [
			...sitePlugins.map( ( f ) =>
				f.name == pluginInstalled.name ? pluginInstalled : f
			),
		] );

		return pluginInstalled;
	};

export const fetchSitePlugins = async () => {
	const response = await apiFetch( {
		method: 'GET',
		path: 'wp/v2/plugins',
	} );
	return response
		.filter( ( { author } ) => author == 'QuadLayers' )
		.map( ( data ) => ( {
			name: data.plugin.split( '/' )[ 0 ],
			status: data.status,
			url: data._links.self[ 0 ].href,
		} ) );
};

export const fetchWordPressPlugins = async () => {
	const URL_PLUGINS =
		'https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[author]=quadlayers';
	const response = await fetch( URL_PLUGINS );
	return response.json();
};
