<?php
/**
 * Plugin Name:       Bc Sample
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bc-sample
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 * 
 * 
 */



function bc_sample_render_callback( $attr, $content ) {

	$url = 'https://wp01.murphymark.me/wp03/wp-json/bc/v3/catalog/variants?sku='.$attr['variant_sku'];

	$request = wp_remote_get( $url );

	if( is_wp_error( $request ) ) {
		return false;
	}

	$body = wp_remote_retrieve_body( $request );

	$data = json_decode( $body );	

	// var_dump($data->data[0]->image_url);

		$str = '';
		$str = '<img src="';
		$str .= strval($data->data[0]->image_url);
		$str .= '"/>';

		return $str;


};

function create_block_bc_sample_block_init() {
	register_block_type_from_metadata( __DIR__, [
        'render_callback' => 'bc_sample_render_callback',
		'attributes' => [
		'message'=> [
			'type'=> 'string',
			'default'=> ''
		],
		'product_description'=> [
			'type'=> 'string',
			'default'=> 'heyooo'
		],		
		'product_id'=> [
			'type'=>'number'
		],
		'product_title'=> [
			'type'=> 'string',
			'default'=> ''
		],
		'variant_sku'=> [
			'type'=> 'string',
			'default'=> ''
		],
	]]);
	};

add_action( 'init', 'create_block_bc_sample_block_init' );
