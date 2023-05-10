/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/check-param-names */
/* eslint-disable jsdoc/require-param-type */
/**
 * Exteral dependencies
 */
import styled from 'styled-components';
import React, { JSX } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import PluginCard from './card';
import { Spinner } from './spinner';
import { useSitePlugins, useWordPressPlugins } from '../store/helpers';
import '../store';

export * from '../store';

/**
 *  Returns a list of suggested plugins for WordPress created by Quadlayers.
 *
 * @param {string}  [columns="3"]            - The number of columns to display in the list. Defaults to 3.
 * @param {boolean} [showName=true]          - Whether to display the name of the plugin. Defaults to true.
 * @param {boolean} [showLinks=true]         - Whether to display links to the plugin. Defaults to true.
 * @param {boolean} [showDescription=true]   - Whether to display the description of the plugin. Defaults to true.
 * @param {boolean} [showCardFooter=true]    - Whether to display the card footer of the plugin. Defaults to true.
 * @param {boolean} [showUpdated=true]       - Whether to display the updated version of the plugin. Defaults to true.
 * @param {boolean} [showDownloaded=true]    - Whether to display the downloaded version of the plugin. Defaults to true.
 * @param {boolean} [showCompatibility=true] - Whether to display the compatibility version of the plugin. Defaults to true.
 */

const List = ( props: JSX.IntrinsicAttributes ): JSX.Element => {
	const {
		wordpressPlugins,
		isResolvingWordPressPlugins,
		installWordPressPlugin,
	} = useWordPressPlugins();
	const { isResolvingSitePlugins, sitePlugins, activateSitePlugin } =
		useSitePlugins();

	if ( isResolvingWordPressPlugins || isResolvingSitePlugins ) {
		return <Spinner />;
	}

	const Wrapper = styled.div`
		position: relative;
		max-width: 1200px;
		display: flex;
		flex-wrap: wrap;
	`;

	return (
		<Wrapper className="wrap">
			{ wordpressPlugins.map( ( data: any ) => {
				const pluginStatus =
					sitePlugins.find( ( name: string ) => name === data.slug )
						?.status || 'install';
				return (
					<PluginCard
						key={ data.slug }
						{ ...data }
						{ ...props }
						installWordPressPlugin={ installWordPressPlugin }
						pluginStatus={ pluginStatus }
						activateSitePlugin={ activateSitePlugin }
					/>
				);
			} ) }
		</Wrapper>
	);
};

export default List;
