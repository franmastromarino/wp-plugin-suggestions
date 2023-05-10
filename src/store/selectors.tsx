import { WordPressPlugin, SitePlugin } from './types';

export const getWordPressPlugins = ( state: {
	wordpressPlugins: WordPressPlugin[];
} ): WordPressPlugin[] => {
	return state.wordpressPlugins;
};

export const getSitePlugins = (
	state: { sitePlugins: SitePlugin[] },
	slug: string
): SitePlugin | SitePlugin[] | undefined => {
	if ( !! slug ) {
		return state.sitePlugins.find( ( { name } ) => name === slug );
	}
	return state.sitePlugins;
};
