const fnReturnTrue = () => true;
const fnReturnIdentity = (mxParameter) => mxParameter;
const emptyStates = [null, undefined, ""];
const __noResponse__ = {
	response: null,
	preventDefault: false,
};

export default class ResourceFieldManager
{
	constructor({
		processLabel = fnReturnIdentity,
		shouldRenderFieldEvenIfEmpty = fnReturnTrue,
		explicitRenderers = null,
		dynamicRenderingLookup = null,
	})
	{
		this.processLabel = processLabel;
		this.shouldRenderFieldEvenIfEmpty = shouldRenderFieldEvenIfEmpty;
		this.dynamicRenderingLookup = dynamicRenderingLookup;

		console.assert(typeof explicitRenderers === "object", "The preloaded dictionary is not an object.");

		this.explicitRenderers = explicitRenderers;
		this.functionDictionary = {};
	}

	static isEmpty({ value })
	{
		return emptyStates.includes(value);
	}

	static getResponse(mxProvider, props)
	{
		switch (typeof mxProvider)
		{
			case "boolean":
				return mxProvider;
			case "function":
				return mxProvider(props);
			default:
				return false;
		}
	}


	static handleTheRenderer(mxFunctionRenderer, props)
	{
		if (typeof mxFunctionRenderer === "function")
		{
			return {
				response: mxFunctionRenderer(props),
				preventDefault: false,
			};
		}

		if (typeof mxFunctionRenderer === "object")
		{
			const {
				isEmpty = this.isEmpty,
				ignoreEmpty = false,
				preventDefault = false,
				assertContext = false,
				render,
			} = mxFunctionRenderer;

			const shouldIgnoreEmptyStates = ResourceFieldManager.getResponse(ignoreEmpty, props);
			const hasEmptyState = ResourceFieldManager.getResponse(isEmpty, props);

			if (assertContext)
			{
				const { context } = props;

				if (!context || typeof context === "undefined" || !Object.keys(context).length)
				{
					console.log({ props, mxFunctionRenderer });
					throw new Error("Missing context.");
				}
			}

			if (shouldIgnoreEmptyStates && hasEmptyState)
			{
				return {
					response: null,
					preventDefault,
				};
			}

			return {
				response: render(props),
				preventDefault,
			};
		}

		console.log("Unknown type...", { mxFunctionRenderer, props });
		return __noResponse__;
	}


	renderProductFieldValueInternal(props)
	{
		const { productKey } = props;
		let mxFunctionRenderer = null;

		if (typeof this.explicitRenderers[productKey] !== "undefined")
		{
			mxFunctionRenderer = this.explicitRenderers[productKey];
		}
		else if (typeof this.functionDictionary[productKey] !== "undefined")
		{
			mxFunctionRenderer = this.functionDictionary[productKey];
		}
		else if (this.dynamicRenderingLookup)
		{
			const fnProductFieldValueRenderer = this.dynamicRenderingLookup(props);

			if (typeof fnProductFieldValueRenderer !== "undefined")
			{
				this.functionDictionary[productKey] = fnProductFieldValueRenderer;
				mxFunctionRenderer = fnProductFieldValueRenderer;
			}
		}

		if (typeof mxFunctionRenderer !== "undefined")
		{
			return ResourceFieldManager.handleTheRenderer(mxFunctionRenderer, props);
		}

		return __noResponse__;
	}

	renderProductFieldValue(props, {
		ResourceRenderOptions,
	})
	{
		const { value, renderOptions, t } = props;

		try
		{
			if (renderOptions[ResourceRenderOptions.isLoading]) {
				return <span>{t("LOADING")}</span>;
			}

			if (renderOptions[ResourceRenderOptions.plainTextMode]) {
				if (typeof value === "boolean") {
					return <span>{JSON.stringify(value)}</span>;
				}

				return <span>{value}</span>;
			}

			const {
				response,
				preventDefault = false,
			} = this.renderProductFieldValueInternal(props);

			if (!response && response !== null)
			{
				window.Logger.logInternalError("Nullish, but not null value returned", response, props);
			}

			if (response === null)
			{
				if (renderOptions[ResourceRenderOptions.renderEvenIfEmpty] && emptyStates.includes(value))
				{
					// empty value with custom text
					return <span>{renderOptions[ResourceRenderOptions.customEmptyValue] || t("NA")}</span>;
				}

				if (!preventDefault)
				{
					if (typeof value === "boolean") {
						return <span>{JSON.stringify(value)}</span>;
					}

					return <span>{value}</span>;
				}
			}

			return response;
		}
		catch (error)
		{
			console.log("Failed to render the current field.");
			console.log({ props });
			console.error(error);

			const { theme } = props;

			return (
				<span css = {{ color: theme.colors.systemRed }}>
					{"Rendering error"}
				</span>
			);
		}
	}
}
