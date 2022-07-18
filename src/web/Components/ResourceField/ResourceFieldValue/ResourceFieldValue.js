import React from "react";
import { useTranslations } from "web/Hooks";
import { useTheme } from "@emotion/react";
import ResourceRenderOptions from "../ResourceRenderOptions";
import { _emptyProductFieldObject } from "../utils";


function ProductFieldValueInternal(props)
{
	const { productFieldManager } = window;

	const theme = useTheme();
	const { t, i18n } = useTranslations();

	const extendedProps = {
		...props,
		theme,
		t,
		i18n,
	};

	return productFieldManager.renderProductFieldValue(extendedProps, {
		ResourceRenderOptions,
	});
}


export default function ResourceFieldValue({
	productKey,
	value,
	context = _emptyProductFieldObject,
	renderOptions = _emptyProductFieldObject,
	theme,
}) {
	return <ProductFieldValueInternal productKey={productKey} value={value} theme={theme} context={context} renderOptions={renderOptions} />;
}

