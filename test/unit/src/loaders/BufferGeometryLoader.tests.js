/* global QUnit */

import { BufferAttribute } from '../../../../src/core/BufferAttribute.js';
import { BufferGeometry } from '../../../../src/core/BufferGeometry.js';
import { BufferGeometryLoader, takenBranches } from '../../../../src/loaders/BufferGeometryLoader.js';
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
			const attr = new BufferAttribute( new Float32Array( [ 7, 8, 9, 10, 11, 12 ] ), 2, true );
			attr.name = 'attribute';
			attr.setUsage( DynamicDrawUsage );
			attr.updateRange.offset = 1;
			attr.updateRange.count = 2;

			geometry.setAttribute( 'attr', attr );

			const geometry2 = loader.parse( geometry.toJSON() );

			assert.ok( geometry2.getAttribute( 'attr' ),
				'Serialized attribute can be deserialized under the same attribute key.' );

			assert.deepEqual(
				geometry.getAttribute( 'attr' ),
				geometry2.getAttribute( 'attr' ),
				'Serialized attribute can be deserialized correctly.'
			);

		} );

		QUnit.done( ( _ ) => {

			setTimeout( () => {

				// print out branch coverage stats
				console.log(
					'(BufferGeometryLoader) taken branches: ' + takenBranches.size,
					'(BufferGeometryLoader) taken percentage: ' + takenBranches.size / 41,
					takenBranches
				);

				console.log(
					'(BufferGeometryLoader) not taken branches: ',
					Array.from( Array( 41 ).keys() )
						.map( ( e ) => e + 1 )
						.filter( ( e ) => ! takenBranches.has( e ) )
				);

			}, 2000 );

		} );

	} );

} );
