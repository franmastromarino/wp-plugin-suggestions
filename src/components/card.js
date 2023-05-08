/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { Spinner } from '../components/spinner';
import { getLastUpdate, LABELS, ImagePlaceholder } from '../helpers';
import styled from 'styled-components';

const PluginCard = ( {
	name = __( 'No name availabe', 'wp-plugin-suggestions' ),
	slug,
	icons,
	homepage = 'https://quadlayers.com',
	short_description = __(
		'No description availabe',
		'wp-plugin-suggestions'
	),
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
} ) => {
	const [ status, setStatus ] = useState( pluginStatus );
	const [ loading, setLoading ] = useState( false );

	useEffect( () => {
		setStatus( pluginStatus );
	}, [ pluginStatus ] );

	const installPlugin = async () => {
		if ( status === 'active' ) return;
		setLoading( true );
		if ( status == 'install' ) {
			const sitePluginsResponse = await installWordPressPlugin( slug );
			setStatus( sitePluginsResponse.status );
		} else {
			const sitePluginsResponse = await activateSitePlugin( slug );
			setStatus( sitePluginsResponse.status );
		}
		setLoading( false );
	};

	const Card = styled.div`
		width: calc( ( 100% / ${ columns } ) - 20px );
		@media ( max-width: 100rem ) {
			width: calc( ( 100% / 2 ) - 20px );
		}
		@media ( max-width: 48.9375rem ) {
			width: calc( ( 100% / 1 ) - 20px );
		}
	`;

	return (
		<Card className="plugin-card">
			<div className="plugin-card-top">
				<div className="name column-name">
					<img
						src={
							icons?.[ '1x' ] ||
							icons?.[ '2x' ] ||
							ImagePlaceholder
						}
						className="plugin-icon"
						alt={ name }
					/>
					{ ShowName && <h3>{ name }</h3> }
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
											installPlugin( slug );
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
									href={ homepage }
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
				{ ShowDescription && (
					<div className="desc column-description">
						<p>{ short_description }</p>
						<p className="authors">
							<cite>
								{ __( 'By', 'wp-plugin-suggestions' ) }{ ' ' }
								<a
									target="_blank"
									href="https://quadlayers.com"
									rel="noreferrer"
								>
									QuadLayers
								</a>
							</cite>
						</p>
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
								<div
									className="star star-full"
									aria-hidden="true"
								></div>
								<div
									className="star star-full"
									aria-hidden="true"
								></div>
								<div
									className="star star-full"
									aria-hidden="true"
								></div>
								<div
									className="star star-full"
									aria-hidden="true"
								></div>
								<div
									className="star star-full"
									aria-hidden="true"
								></div>
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
