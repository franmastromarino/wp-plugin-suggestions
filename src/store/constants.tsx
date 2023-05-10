export const STORE_NAME: string = 'quadlayers/plugins';

interface State {
	wordpressPlugins: [];
	sitePlugins: [];
}

export const INITIAL_STATE: State = {
	wordpressPlugins: [],
	sitePlugins: [],
};
