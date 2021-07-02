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
	// RichText,
	// AlignmentToolbar,
	// ColorPalette,
	// InspectorControls,
	// BlockControls,
} from "@wordpress/block-editor";

import { withSelect } from "@wordpress/data";

// import { TextControl } from "@wordpress/components";

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
export default function Edit() {
	withSelect((select) => {
		return {
			posts: select("core").getEntityRecords("postType", "post"),
		};
	})(({ posts }) => {
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				{!posts && "Loading"}
				{posts && posts.length === 0 && "No Posts"}
				{posts && posts.length > 0 && (
					<a href={posts[0].link}>{posts[0].title.rendered}</a>
				)}
			</div>
		);
	});
}
