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
//@ts-ignore
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PluginCard from './card';
import { Spinner } from './spinner';
import { useSitePlugins, useWordPressPlugins } from '../store/helpers';
import '../store';
import { WordpressIcon } from '../helpers';

export * from '../store';

type Url = string;
interface ListProps {
	authorName: string;
	columns?: string;
	placeholder?: Url;
	authorWebsite?: Url;
	showName?: boolean;
	showLinks?: boolean;
	showDescription?: boolean;
	showCardFooter?: boolean;
	showUpdated?: boolean;
	showDownloaded?: boolean;
	showCompatibility?: boolean;
}

const Wrapper = styled.div`
	position: relative;
	max-width: 1200px;
	display: flex;
	flex-wrap: wrap;
	margin: 25px 40px 0px 20px;
`;

const MessageBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.25em;
	& svg {
		width: 50px;
		height: 50px;
	}
	h3 {
		margin: 1em 0 !important;
	}
`;

/**
 *  Returns a list of plugins using the WordPress API.
 *
 * @param {string}  authorName               - The query for requesting a list of plugins for WordPress, by default return a list of popular plugins.
 * @param {string}  [columns="3"]            - The number of columns to display in the list. Defaults to 3.
 * @param {boolean} [showName=true]          - Whether to display the name of the plugin. Defaults to true.
 * @param {boolean} [showLinks=true]         - Whether to display links to the plugin. Defaults to true.
 * @param {boolean} [showDescription=true]   - Whether to display the description of the plugin. Defaults to true.
 * @param {boolean} [showCardFooter=true]    - Whether to display the card footer of the plugin. Defaults to true.
 * @param {boolean} [showUpdated=true]       - Whether to display the updated version of the plugin. Defaults to true.
 * @param {boolean} [showDownloaded=true]    - Whether to display the downloaded version of the plugin. Defaults to true.
 * @param {boolean} [showCompatibility=true] - Whether to display the compatibility version of the plugin. Defaults to true.
 */

const List = ( props: ListProps ): JSX.Element => {
	const authorName = props.authorName || '';

	const {
		wordpressPlugins,
		isResolvingWordPressPlugins,
		installWordPressPlugin,
	} = useWordPressPlugins( authorName );

	const { isResolvingSitePlugins, sitePlugins, activateSitePlugin } =
		useSitePlugins();

	if ( isResolvingWordPressPlugins || isResolvingSitePlugins ) {
		return <Spinner />;
	}

	return wordpressPlugins.length !== 0 ? (
		<Wrapper className="wrap">
			{ wordpressPlugins.map( ( plugin: any ) => {
				const pluginStatus =
					sitePlugins.find(
						( localPlugin: any ) => localPlugin.name === plugin.slug
					)?.status || 'install';
				return (
					<PluginCard
						key={ plugin.slug }
						{ ...plugin }
						{ ...props }
						installWordPressPlugin={ installWordPressPlugin }
						pluginStatus={ pluginStatus }
						activateSitePlugin={ activateSitePlugin }
					/>
				);
			} ) }
		</Wrapper>
	) : (
		<div style={ { maxWidth: '1200px' } }>
			<MessageBox>
				{ WordpressIcon }
				<h3>Plugins not found</h3>
			</MessageBox>
		</div>
	);
};

export default List;
