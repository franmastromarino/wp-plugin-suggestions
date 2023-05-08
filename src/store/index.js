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

export const storeConfig = {
	reducer,
	actions,
	selectors,
	resolvers,
};

const store = createReduxStore( STORE_NAME, storeConfig );

register( store );
