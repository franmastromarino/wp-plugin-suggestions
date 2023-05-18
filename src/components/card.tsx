/**
 * External dependencies
 */
//@ts-ignore
import { __, sprintf } from '@wordpress/i18n';
import styled from 'styled-components';
import React, { JSX } from 'react';
/**
 * WordPress dependencies
 */
//@ts-ignore
import { useState, useEffect } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { Spinner } from '../components/spinner';
import { getLastUpdate, LABELS, ImagePlaceholder, getStars } from '../helpers';

type Url = string;

interface Icons {
	default: Url;
	'1x': Url;
	'2x'?: Url;
}
interface PluginCardProps {
	author: string;
	author_profile: Url;
	name?: string;
	slug?: string;
	placeholder?: Url;
	icons?: Icons;
	homepage?: Url;
	short_description?: string;
	rating?: number;
	num_ratings?: number;
	active_installs?: number;
	pluginStatus?: string;
	installWordPressPlugin: ( slug: string ) => Promise< any >; // Update the return type based on the actual return type of the function
	activateSitePlugin: ( slug: string ) => Promise< any >; // Update the return type based on the actual return type of the function
	tested: string;
	last_updated: string;
	ShowName?: boolean;
	ShowLinks?: boolean;
	ShowDescription?: boolean;
	ShowCardFooter?: boolean;
	ShowRating?: boolean;
	ShowUpdated?: boolean;
	ShowDownloaded?: boolean;
	ShowCompatibility?: boolean;
	columns?: number;
}

interface PluginCardStyle {
	columns?: number;
}

const Card = styled.div< PluginCardStyle >`
	width: calc( ( 100% / ${ ( props ) => props.columns } ) - 20px );
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media ( min-width: 100rem ) {
		img {
			position: ${ ( props ) =>
				props.columns === 3 ? 'initial' : 'absolute' } !important;
		}

		div.column-name {
			margin: ${ ( props ) =>
				props.columns === 3 ? '0px' : '148px' } !important;
		}
	}
	@media ( max-width: 100rem ) {
		width: calc( ( 100% / 2 ) - 20px );
	}
	@media ( max-width: 48.9375rem ) {
		width: calc( ( 100% / 1 ) - 20px );
	}
	h3 {
		margin: 0 12px 12px 0;
	}
	img {
		width: 128px;
	}
`;

const PluginCard = ( {
	author,
	author_profile,
	name = __( 'No name availabe', 'wp-plugin-suggestions' ),
	slug = '',
	placeholder = ImagePlaceholder,
	icons,
	homepage,
	short_description = __(
		'No description availabe',
		'wp-plugin-suggestions'
	),
	rating = 0,
	num_ratings = 0,
	active_installs = 0,
	pluginStatus = 'install',
	installWordPressPlugin,
	activateSitePlugin,
	tested,
	last_updated,
	ShowName = true,
	ShowLinks = true,
	ShowDescription = true,
	ShowCardFooter = true,
	ShowRating = true,
	ShowUpdated = true,
	ShowDownloaded = true,
	ShowCompatibility = true,
	columns = 3,
}: PluginCardProps ): JSX.Element => {
	const [ status, setStatus ] = useState( pluginStatus );
	const [ loading, setLoading ] = useState( false );
	const { fullStars, halfStars, emptyStars } = getStars( rating );
	const authorWithoutAnchor: string = author.replace( /<\/?a[^>]*>/g, '' );
	useEffect( () => {
		setStatus( pluginStatus );
	}, [ pluginStatus ] );
	const installPlugin = async () => {
		if ( status === 'active' ) return;
		setLoading( true );
		if ( status === 'install' ) {
			const sitePluginsResponse = await installWordPressPlugin( slug );
			setStatus( sitePluginsResponse.status );
		} else {
			const sitePluginsResponse = await activateSitePlugin( slug );
			setStatus( sitePluginsResponse.status );
		}
		setLoading( false );
	};

	return (
		<Card className="plugin-card" columns={ 3 }>
			<div className="plugin-card-top">
				<div className="name column-name">
					<img
						src={
							( icons?.default ||
								icons?.[ '1x' ] ||
								icons?.[ '2x' ] ) ??
							placeholder
						}
						className="plugin-icon"
						alt={ name }
					/>
					{ ShowName && <h3>{ name }</h3> }

					{ ShowDescription && (
						<div>
							<p>{ short_description }</p>
							<p className="authors">
								<cite>
									{ __( 'By', 'wp-plugin-suggestions' ) }{ ' ' }
									<a
										target="_blank"
										href={ homepage || author_profile }
										rel="noreferrer"
									>
										{ authorWithoutAnchor }
									</a>
								</cite>
							</p>
						</div>
					) }
				</div>
				{ ShowLinks && (
					<div className="action-links">
						<ul className="plugin-action-buttons">
							<li>
								{ loading ? (
									<Spinner />
								) : (
									<button
										disabled={ status === 'active' }
										className="button button-primary"
										onClick={ ( e ) => {
											e.preventDefault();
											installPlugin();
										} }
										aria-label={ sprintf(
											__(
												'Install %s',
												'wp-plugin-suggestions'
											),
											name
										) }
									>
										{ LABELS[ status ] }
									</button>
								) }
							</li>
							<li>
								<a
									href={ `https://wordpress.org/plugins/${ slug }` }
									aria-label={ sprintf(
										__(
											'More info %s',
											'wp-plugin-suggestions'
										),
										name
									) }
									target="_blank"
									rel="noreferrer"
								>
									{ __(
										'More Details',
										'wp-plugin-suggestions'
									) }
								</a>
							</li>
						</ul>
					</div>
				) }
			</div>
			{ ShowCardFooter && (
				<div className="plugin-card-bottom">
					{ ShowRating && (
						<div className="vers column-rating">
							<div className="star-rating">
								<span className="screen-reader-text">
									{ sprintf(
										__(
											'5.0 rating based on %s ratings',
											'wp-plugin-suggestions'
										),
										num_ratings
									) }
								</span>
								{ Array.from(
									{ length: fullStars },
									( _, index ) => (
										<div
											key={ `full_star_${ index }` }
											className="star star-full"
											aria-hidden="true"
										></div>
									)
								) }
								{ Array.from(
									{ length: halfStars },
									( _, index ) => (
										<div
											key={ `half_star_${ index }` }
											className="star star-half"
											aria-hidden="true"
										></div>
									)
								) }
								{ Array.from(
									{ length: emptyStars },
									( _, index ) => (
										<div
											key={ `empty_star_${ index }` }
											className="star star-empty"
											aria-hidden="true"
										></div>
									)
								) }
							</div>
							<span className="num-ratings" aria-hidden="true">
								({ num_ratings })
							</span>
						</div>
					) }
					{ ShowUpdated && (
						<div className="column-updated">
							<strong>
								{ sprintf(
									__(
										'Last Updated: %s',
										'wp-plugin-suggestions'
									),
									getLastUpdate( last_updated )
								) }
							</strong>
						</div>
					) }
					{ ShowDownloaded && (
						<div className="column-downloaded">
							{ active_installs.toLocaleString( 'ARG' ) }+{ ' ' }
							{ __(
								'Active Installations',
								'wp-plugin-suggestions'
							) }
						</div>
					) }
					{ ShowCompatibility && (
						<div className="column-compatibility">
							<span className="compatibility-compatible">
								<strong>
									{ __(
										'Compatible',
										'wp-plugin-suggestions'
									) }
								</strong>
								{ sprintf(
									__(
										' with the version %s',
										'wp-plugin-suggestions'
									),
									tested
								) }
							</span>
						</div>
					) }
				</div>
			) }
		</Card>
	);
};

export default PluginCard;
