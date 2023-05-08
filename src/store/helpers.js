/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
/**
 * Wordpress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import wpApiFetch from '@wordpress/api-fetch';

/**
 * Handle the response from the apiFetch
 *
 * @param {*} args
 * @returns response or error
 */
export async function apiFetch( args ) {
	return await wpApiFetch( args )
		.then( ( response ) => {
			if ( !! response.code ) {
				throw new Error(
					`${ response.code }: ${ response?.message || 'Unknown' }`
				);
			}
			return response;
		} )
		.catch( ( error ) => {
			throw new Error( JSON.stringify( error ) );
		} );
}

export function useWordPressPlugins() {
	const { installWordPressPlugin } = useDispatch( STORE_NAME );

	const {
		wordpressPlugins,
		isResolvingWordPressPlugins,
		hasResolvedWordPressPlugins,
	} = useSelect( ( select ) => {
		const { isResolving, hasFinishedResolution, getWordPressPlugins } =
			select( STORE_NAME );

		return {
			wordpressPlugins: getWordPressPlugins(),
			isResolvingWordPressPlugins: isResolving( 'getWordPressPlugins' ),
			hasResolvedWordPressPlugins: hasFinishedResolution(
				'getWordPressPlugins'
			),
		};
	}, [] );

	return {
		wordpressPlugins,
		isResolvingWordPressPlugins,
		hasResolvedWordPressPlugins,
		hasWordPressPlugins: !! (
			hasResolvedWordPressPlugins && wordpressPlugins?.length
		),
		installWordPressPlugin,
	};
}

export function useSitePlugins() {
	const { activateSitePlugin } = useDispatch( STORE_NAME );

	const { sitePlugins, isResolvingSitePlugins, hasResolvedSitePlugins } =
		useSelect( ( select ) => {
			const { isResolving, hasFinishedResolution, getSitePlugins } =
				select( STORE_NAME );

			return {
				isResolvingSitePlugins: isResolving( 'getSitePlugins' ),
				hasResolvedSitePlugins:
					hasFinishedResolution( 'getSitePlugins' ),
				sitePlugins: getSitePlugins(),
			};
		}, [] );

	return {
		sitePlugins,
		isResolvingSitePlugins,
		hasResolvedSitePlugins,
		hasSitePlugins: !! ( hasResolvedSitePlugins && sitePlugins?.length ),
		activateSitePlugin,
	};
}
