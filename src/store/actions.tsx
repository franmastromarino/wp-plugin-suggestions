/**
 * WordPress dependencies
 */
//@ts-ignore
import { __, sprintf } from '@wordpress/i18n';
//@ts-ignore
import { store as noticesStore } from '@wordpress/notices';
import { WordPressPlugin, SitePlugin } from './types';

/**
 * Internal dependencies
 */
import { apiFetch } from './helpers';

export const setWordPressPlugins = ( wordpressPlugins: WordPressPlugin[] ) => {
	return {
		type: 'SET_WORDPRESS_PLUGINS',
		payload: wordpressPlugins,
	};
};

export const setSitePlugins = ( sitePlugins: SitePlugin[] ) => {
	return {
		type: 'SET_SITE_PLUGINS',
		payload: sitePlugins,
	};
};

export const installWordPressPlugin =
	( slug: string ) =>
	async ( {
		registry,
		dispatch,
		select,
	}: {
		registry: any;
		dispatch: any;
		select: any;
	} ) => {
		const sitePlugins = select.getSitePlugins();

		const response = await apiFetch( {
			method: 'POST',
			path: 'wp/v2/plugins',
			data: { slug, status: 'inactive' },
		} );

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

		const pluginInstalled: SitePlugin = {
			name: response.plugin.split( '/' )[ 1 ],
			status: response.status,
			url: response._links.self[ 0 ].href,
		};

		sitePlugins.push( pluginInstalled );
		dispatch.setSitePlugins( sitePlugins );

		return pluginInstalled;
	};

export const activateSitePlugin =
	( slug: string ) =>
	async ( {
		registry,
		dispatch,
		select,
	}: {
		registry: any;
		dispatch: any;
		select: any;
	} ) => {
		const sitePlugins = select.getSitePlugins();
		const plugin = sitePlugins.find(
			( currentPlugin: any ) => currentPlugin.name === slug
		);

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

		const pluginInstalled: SitePlugin = {
			name: response.plugin.split( '/' )[ 1 ],
			status: response.status,
			url: response._links.self[ 0 ].href,
		};

		dispatch.setSitePlugins(
			sitePlugins.map( ( f: { name: string } ) =>
				f.name == pluginInstalled.name ? pluginInstalled : f
			)
		);

		return pluginInstalled;
	};

export const fetchSitePlugins = async (): Promise< SitePlugin[] > => {
	const response = await apiFetch( {
		method: 'GET',
		path: 'wp/v2/plugins',
	} );
	return response.map( ( data: any ) => ( {
		name: data.plugin.split( '/' )[ 0 ],
		status: data.status,
		url: data._links.self[ 0 ].href,
	} ) );
};

export const fetchWordPressPlugins = async (
	author: string
): Promise< WordPressPlugin[] > => {
	const URL_PLUGINS = `https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[author]=${ author }`;
	const response = await fetch( URL_PLUGINS );
	return ( await response.json() ) as WordPressPlugin[];
};
