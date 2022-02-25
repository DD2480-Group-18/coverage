/* global QUnit */

import { BufferAttribute } from '../../../../src/core/BufferAttribute.js';
import { BufferGeometry } from '../../../../src/core/BufferGeometry.js';
import {
	BufferGeometryLoader,
} from '../../../../src/loaders/BufferGeometryLoader.js';
import { DynamicDrawUsage } from '../../../../src/constants.js';

export default QUnit.module( 'Loaders', () => {

	QUnit.module( 'BufferGeometryLoader', () => {

		// INSTANCING
		QUnit.todo( 'Instancing', ( assert ) => {

			assert.ok( false, 'everything\'s gonna be alright' );

		} );

		// PUBLIC STUFF
		QUnit.todo( 'load', ( assert ) => {

			assert.ok( false, 'everything\'s gonna be alright' );

		} );

		QUnit.todo( 'parse', ( assert ) => {

			assert.ok( false, 'everything\'s gonna be alright' );

		} );

		QUnit.test( 'parser - attributes - circlable', ( assert ) => {

			const loader = new BufferGeometryLoader();
			const geometry = new BufferGeometry();
			const attr = new BufferAttribute(
				new Float32Array( [ 7, 8, 9, 10, 11, 12 ] ),
				2,
				true
			);
			attr.name = 'attribute';
			attr.setUsage( DynamicDrawUsage );
			attr.updateRange.offset = 1;
			attr.updateRange.count = 2;

			geometry.setAttribute( 'attr', attr );

			const geometry2 = loader.parse( geometry.toJSON() );

			assert.ok(
				geometry2.getAttribute( 'attr' ),
				'Serialized attribute can be deserialized under the same attribute key.'
			);

			assert.deepEqual(
				geometry.getAttribute( 'attr' ),
				geometry2.getAttribute( 'attr' ),
				'Serialized attribute can be deserialized correctly.'
			);

		} );

		// added test #1 (additionally takes branches 16, 18, 26 in parse@BufferGeometryLoader.js)
		QUnit.test( 'parser for geometry with morphAttributes', ( assert ) => {

			const loader = new BufferGeometryLoader();
			const geometry = new BufferGeometry();

			// set additional json properties
			var m = new Map();
			m.set( '1', [] );
			m.set( '2', [] );
			var geoJSON = geometry.toJSON();
			geoJSON.data.morphAttributes = m;

			const geometry2 = loader.parse( geoJSON );
			assert.ok(
				geometry2.morphAttributes,
				'Serialized attribute can be deserialized under the same attribute key.'
			);

		} );

		// added test #2 (additionally takes branches 30, 32 in parse@BufferGeometryLoader.js)
		QUnit.test( 'parser for geometry with groups', ( assert ) => {

			const loader = new BufferGeometryLoader();
			const geometry = new BufferGeometry();

			// set additional json properties
			var geoJSON = geometry.toJSON();
			geoJSON.data.groups = [];

			const geometry2 = loader.parse( geoJSON );
			assert.ok(
				geometry2.groups,
				'Serialized attribute can be deserialized under the same attribute key.'
			);

		} );

		// added test #3 (additionally takes branches 38, 40 in parse@BufferGeometryLoader.js)
		QUnit.test( 'parser for geometry with name and user data', ( assert ) => {

			const loader = new BufferGeometryLoader();
			const geometry = new BufferGeometry();

			// set additional json properties
			var geoJSON = geometry.toJSON();
			geoJSON.name = 'Zino';
			geoJSON.userData = { age: 24, cool: 9001 };

			const geometry2 = loader.parse( geoJSON );
			assert.ok(
				geometry2.name,
				'Serialized attribute can be deserialized under the same attribute key.'
			);
			assert.ok(
				geometry2.userData,
				'Serialized attribute can be deserialized under the same attribute key.'
			);

		} );

		// added test #4 (additionally takes branch 28 in parse@BufferGeometryLoader.js)
		QUnit.test( 'parser for geometry with morphTargetsRelative', ( assert ) => {

			const loader = new BufferGeometryLoader();
			const geometry = new BufferGeometry();

			// set additional json properties
			var geoJSON = geometry.toJSON();
			geoJSON.data.morphTargetsRelative = true;

			const geometry2 = loader.parse( geoJSON );
			assert.ok(
				geometry2.morphTargetsRelative,
				'Serialized attribute can be deserialized under the same attribute key.'
			);

		} );

	} );

} );
