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
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

import { __experimentalInputControl as InputControl } from "@wordpress/components";

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
	const [value, setValue] = useState("");

	const runApiFetch = (sku) => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(
			`https://wp01.murphymark.me/wp03/wp-json/bc/v3/catalog/variants?sku=${sku}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) =>
				setAttributes({
					variant_img_url: result.data[0].image_url,
					variant_sku: result.data[0].sku,
				})
			)
			.catch((error) => console.log("error", error));
	};

	runApiFetch(value);

	console.log(attributes.variant_img_url);

	return (
		<div {...useBlockProps()}>
			<InspectorControls key="setting" class="inspector">
				<div id="gutenpride-controls">
					<InputControl
						value={value}
						onChange={(nextValue) => setValue(nextValue)}
					/>
				</div>
			</InspectorControls>
			<img src={attributes.variant_img_url} />
		</div>
	);
}
