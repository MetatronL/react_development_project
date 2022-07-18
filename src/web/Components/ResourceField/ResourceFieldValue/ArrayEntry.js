import React from "react";
import ResourceRenderOptions from "../ResourceRenderOptions";
import ResourceFieldValue from "./ResourceFieldValue";
import ResourceFieldValueArray from "./ResourceFieldValueArray";


export default function ArrayEntry({
	index,
	productKey,
	value,
	context,
	theme,
	renderOptions,
	indexableContextFields: arrIndexableProperties = null,
})
{
	if (Array.isArray(value))
	{
		return (
			<ResourceFieldValueArray
				productKey={productKey}
				value={value}
				context={context}
				theme={theme}
				indexableContextFields={arrIndexableProperties}
				renderOptions={{
					...renderOptions,
					[ResourceRenderOptions.entryPositionInArray]: index,
				}}
			/>
		);
	}

	let customContext = context;

	if (Array.isArray(arrIndexableProperties) && arrIndexableProperties.length)
	{
		customContext = {
			...context,
			indexableContextFields: {},
		};

		for (const indexableContextEntry of arrIndexableProperties)
		{
			customContext.indexableContextFields[indexableContextEntry] = context[indexableContextEntry][index];
		}
	}

	return (
		<ResourceFieldValue
			productKey={productKey}
			value={value}
			context={customContext}
			theme={theme}
			renderOptions={{
				...renderOptions,
				[ResourceRenderOptions.entryPositionInArray]: index,
			}}
		/>
	);
}
