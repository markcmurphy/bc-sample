/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	RichText,
	AlignmentToolbar,
	InspectorControls,
	BlockControls,
} from "@wordpress/block-editor";

import { TextControl, SelectControl } from "@wordpress/components";

import { useState } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const [productId, setProductId] = useState(137);

	const runApiFetch = (id) => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(
			`https://wp01.murphymark.me/wp03/wp-json/bc/v3/catalog/products/${id}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) =>
				setAttributes({
					product_description: result.data.description,
					product_title: result.data.name,
					product_id: result.data.id,
				})
			)
			.catch((error) => console.log("error", error));
	};

	runApiFetch(productId);

	function createMarkup() {
		return { __html: attributes.product_description };
	}

	return (
		<div {...useBlockProps()}>
			<InspectorControls key="setting" class="inspector">
				<div id="gutenpride-controls">
					<SelectControl
						label={__("Select some products:")}
						value={productId}
						onChange={(products) => setProductId(products)}
						options={[
							{ value: null, label: "Select a Product", disabled: true },
							{ value: "137", label: "Women's short sleeve t-shirt" },
							{ value: "139", label: "Bobblehead" },
							{ value: "120", label: "Fog Linen Chambray Towel" },
						]}
					/>
				</div>
			</InspectorControls>
			<h4 class="bc-single-product__section-title">
				{attributes.product_title}
			</h4>

			<section
				class="desc bc-single-product__description"
				dangerouslySetInnerHTML={createMarkup()}
			></section>
		</div>
	);
}
