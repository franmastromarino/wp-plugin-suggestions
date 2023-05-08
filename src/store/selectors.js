export const getWordPressPlugins = ( state ) => {
	return state.wordpressPlugins;
};

export const getSitePlugins = ( state, slug ) => {
	if ( !! slug ) {
		return state.sitePlugins.find( ( { name } ) => name == slug );
	}
	return state.sitePlugins;
};
