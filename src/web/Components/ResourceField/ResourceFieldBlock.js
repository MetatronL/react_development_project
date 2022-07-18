import React from "react";
import ResourceField from "./ResourceField";
import ResourceRenderOptions from "./ResourceRenderOptions";
import { _emptyProductFieldObject } from "./utils";


function renderField(field, {
	data,
	productFieldValueComponent = null,
	renderOptions,
})
{
	if (typeof field === "string")
	{
		if (field === ResourceRenderOptions.lineBreak)
		{
			return (<div css={{ marginBottom: "0.4rem" }} />);
		}

		return (
			<ResourceField
				key={field}
				productKey={field}
				value={data[field]}
				context={data}
				productFieldValueComponent={productFieldValueComponent}
				renderOptions = {renderOptions}
			/>
		);
	}

	if (typeof field === "function")
	{
		return field({ data });
	}

	const fieldComponentProps = {
		...field,
		productKey: field.productKey,
		value: field.value !== undefined ? field.value : data[field.productKey],
		label: field.label,
		inline: field.inline,
		display: field.display,
		indexableContextFields: field.indexableContextFields,

		context: field.context !== undefined ? field.context : data,
		renderOptions: field.renderOptions,
		productFieldValueComponent,
	};

	if (typeof field.render === "function")
	{
		return (
			<div key={field.productKey}>
				{field.render(fieldComponentProps)}
			</div>
		);
	}

	return (
		<ResourceField
			key={field.productKey}
			{...fieldComponentProps}
		/>
	);
}

export default function ResourceFieldBlock({
	data,
	fields = [],
	productFieldValueComponent = undefined,
	customCSS = _emptyProductFieldObject,
	renderOptions = undefined,
})
{
	const settings = {
		data,
		productFieldValueComponent,
		renderOptions,
	};

	const renderFieldWrapper = (field) => renderField(field, settings);

	return (
		<div css = {customCSS}>
			{fields.map(renderFieldWrapper)}
		</div>
	);
}
