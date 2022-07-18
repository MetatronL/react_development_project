/* eslint-disable dot-notation */
/* eslint-disable camelcase */
import { useState, useMemo, memo } from "react";
import { useTranslations } from "web/Hooks";

import { Label, Button } from "web/Components/Common/Inputs";

import flattenDeep from "lodash/flattenDeep";
import ResourceRenderOptions from "./ResourceRenderOptions";
import { isNotEmptyState, _emptyProductFieldObject } from "./utils";

import { ResourceFieldValue, ResourceFieldValueArray } from "./ResourceFieldValue";

const StyleRaw = {
	LABEL_CLASS: "resourceFieldLabel",
	VALUE_CLASS: "resourceFieldValue",
};

const Style = {
	LABEL_CLASS: `.${StyleRaw.LABEL_CLASS}`,
	VALUE_CLASS: `.${StyleRaw.VALUE_CLASS}`,
};

const ShowMoreValue = ({ value, t, maxTextLength }) => {
	const [showFullValue, setShowFullValue] = useState(false);
	const valueTruncated = useMemo(() => value.substr(0, maxTextLength), [maxTextLength, value]);
	const showTruncatedValue = valueTruncated.length < value.length;

	if (!showTruncatedValue) {
		return <span>{value}</span>;
	}

	return <>
		<div>{showFullValue ? value : `${valueTruncated}...`}</div>
		<Button
			debugLabel="showMoreDetailsButton"
			onClick={() => setShowFullValue(!showFullValue)}
			css={{
				padding: 0,
				boxShadow: "none !important",
			}}
			variant="link"
		>
			{showFullValue ? t("SHOW_LESS") : t("SHOW_MORE")}
		</Button>
	</>;
};


function ResourceField({
	productKey,
	value,
	label: labelProp,
	context = _emptyProductFieldObject,
	renderOptions = _emptyProductFieldObject,
	styleOptions = _emptyProductFieldObject,
	inline = false,
	productFieldValueComponent = undefined,
	display = undefined,
	indexableContextFields = null,
})
{
	const { t, i18n } = useTranslations();
	const { productFieldManager } = window;

	if (
		!renderOptions[ResourceRenderOptions.renderEvenIfEmpty]
		&& !productFieldManager.shouldRenderFieldEvenIfEmpty(productKey)
		&& flattenDeep([value]).filter(isNotEmptyState).length === 0
	)
	{
		return null;
	}

	if (
		renderOptions[ResourceRenderOptions.allowedValues]
		&& !renderOptions[ResourceRenderOptions.allowedValues].includes(value)
	)
	{
		return null;
	}

	const productFieldValueProps = {
		productKey,
		value,
		context,
		renderOptions,
		t,
		i18n,
		indexableContextFields,
	};

	const label = productFieldManager.processLabel(labelProp, productFieldValueProps);

	let innerComponent;


	if (productFieldValueComponent)
	{
		innerComponent = productFieldValueComponent.render(productFieldValueProps);
	}
	else if (Array.isArray(value) && !renderOptions[ResourceRenderOptions.dontRenderAsMultipleEntities])
	{
		innerComponent = <ResourceFieldValueArray {...productFieldValueProps} />;
	}
	else if (renderOptions[ResourceRenderOptions.renderAsArray])
	{
		innerComponent = <ResourceFieldValueArray {...productFieldValueProps} />;
	}
	else
	{
		innerComponent = <ResourceFieldValue {...productFieldValueProps} />;
	}


	if (renderOptions[ResourceRenderOptions.maxTextLength]) {
		return <ShowMoreValue {...{ value, t }} maxTextLength={renderOptions[ResourceRenderOptions.maxTextLength]} />;
	}


	return (
		<div
			css={{
				display: inline ? "inline" : display,
				fontSize: "0.85rem",
				// marginBottom: "0.25rem",
				alignItems: "center",
				flexFlow: "wrap",
				...styleOptions,
			}}
			data-productkey={productKey}
		>
			{label !== null && (
				<Label
					css={(theme) => ({
						color: theme.fontColor,
						display: "inline",
						marginBottom: "0",
						marginRight: "0.4rem",
						verticalAlign: "top",
						fontWeight: "unset",
						fontSize: "0.85rem",
						minWidth: "unset !important",
					})}
					className={StyleRaw.LABEL_CLASS}
				>
					{`${label}:`}
				</Label>
			)}
			<span
				css={(theme) => ({
					color: renderOptions[ResourceRenderOptions.textColor] ? theme.colors[renderOptions[ResourceRenderOptions.textColor]] : theme.fontColorStrong,
					fontSize: "0.85rem",
					fontWeight: !renderOptions[ResourceRenderOptions.boldStyleForFieldValue] ? "unset" : (renderOptions[ResourceRenderOptions.boldStyleSize] || 500),
				})}
				className={StyleRaw.VALUE_CLASS}
			>
				{innerComponent}
			</span>
		</div>
	);
}

const ProductFieldMemoized = memo(ResourceField);
ProductFieldMemoized.Style = Style;

export default ProductFieldMemoized;
