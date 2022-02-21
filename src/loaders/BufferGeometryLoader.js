import { Sphere } from '../math/Sphere.js';
import { Vector3 } from '../math/Vector3.js';
import { BufferAttribute } from '../core/BufferAttribute.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
import { FileLoader } from './FileLoader.js';
import { Loader } from './Loader.js';
import { InstancedBufferGeometry } from '../core/InstancedBufferGeometry.js';
import { InstancedBufferAttribute } from '../core/InstancedBufferAttribute.js';
import { InterleavedBufferAttribute } from '../core/InterleavedBufferAttribute.js';
import { InterleavedBuffer } from '../core/InterleavedBuffer.js';
import { getTypedArray } from '../utils.js';

export const takenBranches = new Set();

class BufferGeometryLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		const scope = this;

		const loader = new FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.setRequestHeader( scope.requestHeader );
		loader.setWithCredentials( scope.withCredentials );
		loader.load(
			url,
			function ( text ) {

				try {

					onLoad( scope.parse( JSON.parse( text ) ) );

				} catch ( e ) {

					if ( onError ) {

						onError( e );

					} else {

						console.error( e );

					}

					scope.manager.itemError( url );

				}

			},
			onProgress,
			onError
		);

	}

	parse( json ) {

		const interleavedBufferMap = {};
		const arrayBufferMap = {};

		function getInterleavedBuffer( json, uuid ) {

			if ( interleavedBufferMap[ uuid ] !== undefined )
				return interleavedBufferMap[ uuid ];

			const interleavedBuffers = json.interleavedBuffers;
			const interleavedBuffer = interleavedBuffers[ uuid ];

			const buffer = getArrayBuffer( json, interleavedBuffer.buffer );

			const array = getTypedArray( interleavedBuffer.type, buffer );
			const ib = new InterleavedBuffer( array, interleavedBuffer.stride );
			ib.uuid = interleavedBuffer.uuid;

			interleavedBufferMap[ uuid ] = ib;

			return ib;

		}

		function getArrayBuffer( json, uuid ) {

			if ( arrayBufferMap[ uuid ] !== undefined ) return arrayBufferMap[ uuid ];

			const arrayBuffers = json.arrayBuffers;
			const arrayBuffer = arrayBuffers[ uuid ];

			const ab = new Uint32Array( arrayBuffer ).buffer;

			arrayBufferMap[ uuid ] = ab;

			return ab;

		}

		let geometry;
		if ( json.isInstancedBufferGeometry ) {

			takenBranches.add( 1 );
			geometry = new InstancedBufferGeometry();

		} else {

			takenBranches.add( 2 );
			geometry = new BufferGeometry();

		}

		const index = json.data.index;

		if ( index !== undefined ) {

			takenBranches.add( 3 );
			const typedArray = getTypedArray( index.type, index.array );
			geometry.setIndex( new BufferAttribute( typedArray, 1 ) );

		} else {

			takenBranches.add( 4 );

		}

		const attributes = json.data.attributes;

		let enteredFor = false;
		for ( const key in attributes ) {

			takenBranches.add( 5 );
			enteredFor = true;
			const attribute = attributes[ key ];
			let bufferAttribute;

			if ( attribute.isInterleavedBufferAttribute ) {

				takenBranches.add( 6 );
				const interleavedBuffer = getInterleavedBuffer(
					json.data,
					attribute.data
				);
				bufferAttribute = new InterleavedBufferAttribute(
					interleavedBuffer,
					attribute.itemSize,
					attribute.offset,
					attribute.normalized
				);

			} else {

				takenBranches.add( 7 );
				const typedArray = getTypedArray( attribute.type, attribute.array );
				let bufferAttributeConstr;
				if ( attribute.isInstancedBufferAttribute ) {

					takenBranches.add( 8 );
					bufferAttributeConstr = InstancedBufferAttribute;

				} else {

					takenBranches.add( 9 );
					bufferAttributeConstr = BufferAttribute;

				}

				bufferAttribute = new bufferAttributeConstr(
					typedArray,
					attribute.itemSize,
					attribute.normalized
				);

			}

			if ( attribute.name !== undefined ) {

				takenBranches.add( 10 );
				bufferAttribute.name = attribute.name;

			} else {

				takenBranches.add( 11 );

			}

			if ( attribute.usage !== undefined ) {

				takenBranches.add( 12 );
				bufferAttribute.setUsage( attribute.usage );

			} else {

				takenBranches.add( 13 );

			}

			if ( attribute.updateRange !== undefined ) {

				takenBranches.add( 14 );
				bufferAttribute.updateRange.offset = attribute.updateRange.offset;
				bufferAttribute.updateRange.count = attribute.updateRange.count;

			} else {

				takenBranches.add( 15 );

			}

			geometry.setAttribute( key, bufferAttribute );

		}


		if ( ! enteredFor ) {

			takenBranches.add( 16 );

		}

		const morphAttributes = json.data.morphAttributes;

		if ( morphAttributes ) {

			takenBranches.add( 18 );

			let forEntered = false;
			for ( const key in morphAttributes ) {

				takenBranches.add( 19 );
				forEntered = true;
				const attributeArray = morphAttributes[ key ];

				const array = [];

				let forEntered2 = false;
				for ( let i = 0, il = attributeArray.length; i < il; i ++ ) {

					takenBranches.add( 20 );
					forEntered2 = true;
					const attribute = attributeArray[ i ];
					let bufferAttribute;

					if ( attribute.isInterleavedBufferAttribute ) {

						takenBranches.add( 21 );
						const interleavedBuffer = getInterleavedBuffer(
							json.data,
							attribute.data
						);
						bufferAttribute = new InterleavedBufferAttribute(
							interleavedBuffer,
							attribute.itemSize,
							attribute.offset,
							attribute.normalized
						);

					} else {

						takenBranches.add( 22 );
						const typedArray = getTypedArray( attribute.type, attribute.array );
						bufferAttribute = new BufferAttribute(
							typedArray,
							attribute.itemSize,
							attribute.normalized
						);

					}

					if ( attribute.name !== undefined ) {

						takenBranches.add( 23 );
						bufferAttribute.name = attribute.name;

					} else {

						takenBranches.add( 24 );

					}

					array.push( bufferAttribute );

				}

				if ( ! forEntered2 ) {

					takenBranches.add( 25 );

				}

				geometry.morphAttributes[ key ] = array;

			}

			if ( ! forEntered ) {

				takenBranches.add( 26 );

			}

		} else {

			takenBranches.add( 27 );

		}

		const morphTargetsRelative = json.data.morphTargetsRelative;

		if ( morphTargetsRelative ) {

			takenBranches.add( 28 );
			geometry.morphTargetsRelative = true;

		} else {

			takenBranches.add( 29 );

		}

		const groups = json.data.groups || json.data.drawcalls || json.data.offsets;

		if ( groups !== undefined ) {

			takenBranches.add( 30 );

			let forEntered = false;
			for ( let i = 0, n = groups.length; i !== n; ++ i ) {

				takenBranches.add( 31 );
				forEntered = true;
				const group = groups[ i ];

				geometry.addGroup( group.start, group.count, group.materialIndex );

			}

			if ( ! forEntered ) {

				takenBranches.add( 32 );

			}

		} else {

			takenBranches.add( 33 );

		}

		const boundingSphere = json.data.boundingSphere;

		if ( boundingSphere !== undefined ) {

			takenBranches.add( 34 );
			const center = new Vector3();

			if ( boundingSphere.center !== undefined ) {

				takenBranches.add( 35 );
				center.fromArray( boundingSphere.center );

			} else {

				takenBranches.add( 36 );

			}

			geometry.boundingSphere = new Sphere( center, boundingSphere.radius );

		} else {

			takenBranches.add( 37 );

		}

		if ( json.name ) {

			takenBranches.add( 38 );
			geometry.name = json.name;

		} else {

			takenBranches.add( 39 );

		}

		if ( json.userData ) {

			takenBranches.add( 40 );
			geometry.userData = json.userData;

		} else {

			takenBranches.add( 41 );

		}

		return geometry;

	}

}

export { BufferGeometryLoader };
