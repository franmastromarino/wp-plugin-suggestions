/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
import reducer from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';
import * as resolvers from './resolvers';

interface StoreConfig {
	reducer: typeof reducer;
	actions: typeof actions;
	selectors: typeof selectors;
	resolvers: typeof resolvers;
}

export const storeConfig: StoreConfig = {
	reducer,
	actions,
	selectors,
	resolvers,
};

const store = createReduxStore< StoreConfig >( STORE_NAME, storeConfig );

register( store );
