import React, { useState } from "react";
import { useTranslations } from "web/Hooks";
import { Button } from "web/Components/Common/Inputs";
import { withTheme } from "@emotion/react";
import ResourceRenderOptions from "../ResourceRenderOptions";
import ArrayEntry from "./ArrayEntry";
import { _emptyProductFieldObject } from "../utils";

function ResourceFieldValueArray({
	productKey,
	value: valueProp,
	context = _emptyProductFieldObject,
	renderOptions = _emptyProductFieldObject,
	theme,
	indexableContextFields = null,
}) {
	const { t } = useTranslations();

	const [shouldBeExtendedAtMount] = useState(!renderOptions.showCollapsedForm);
	const [hasBeenExtended, setHasBeenExtended] = useState(false);

	let value = valueProp;

	if (indexableContextFields !== null && !Array.isArray(indexableContextFields))
	{
		console.error("[Internal] 'indexableContextFields' is expected to be an array!");
	}

	if (!Array.isArray(value) && renderOptions[ResourceRenderOptions.renderAsArray])
	{
		value = [value];
	}

	value = value.filter((valueEntry) => valueEntry !== null && valueEntry !== undefined);


	if (value && value.length === 1)
	{
		return (
			<ArrayEntry
				productKey={productKey}
				value={value[0]}
				context={context}
				theme={theme}
				renderOptions={renderOptions}
				index={0}
				indexableContextFields={indexableContextFields}
			/>
		);
	}

	if (shouldBeExtendedAtMount || hasBeenExtended)
	{
		if (!value.length)
		{
			return "N/A";
		}

		return (
			<span
				css={{
					display: "inline-block",
				}}
			>
				{value.map((valueEntry, index) => (
					<div
						key={index}
						css={{
							display: "list-item",
							listStylePosition: "inside",
							paddingLeft: "0.5rem",
						}}
					>
						<ArrayEntry
							productKey={productKey}
							value={valueEntry}
							context={context}
							theme={theme}
							renderOptions={renderOptions}
							index={index}
							indexableContextFields={indexableContextFields}
						/>
					</div>
				))}
			</span>
		);
	}


	return (
		<span
			css={{
				display: "inline-block",
			}}
		>
			<span>
				<ArrayEntry
					productKey={productKey}
					value={value[0]}
					context={context}
					theme={theme}
					renderOptions={renderOptions}
					index={0}
					indexableContextFields={indexableContextFields}
				/>
			</span>

			<Button
				color="link"
				onClick={() => setHasBeenExtended(true)}
				css={{
					border: 0,
					padding: 0,
					marginLeft: "0.5rem",
				}}
			>
				({t("AND_X_MORE", { count: value.length - 1 })}...)
			</Button>
		</span>
	);
}

export default withTheme(ResourceFieldValueArray);
