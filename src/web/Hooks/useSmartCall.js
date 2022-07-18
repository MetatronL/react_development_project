import { useMemo, useState } from "react";

async function callOptional(mxFunction, value)
{
	if (typeof mxFunction === "function") {
		return mxFunction(value);
	}

	return value;
}

export default function useSmartCall(onSubmitInternal, {
	loadingByDefault = false,

	callback: callbackProp = null,
	failMessage = null,

	throwError = false,
} = {})
{
	const [isLoading, setIsLoading] = useState(loadingByDefault);
	const [callError, setCallError] = useState(null);

	const runnableHandler = useMemo(() => {
		if (onSubmitInternal.name.length) {
			console.log(`Warning: The wrapped function has a name (${onSubmitInternal.name}). Did you forget to wrap the initial function with 'useCallback' ?`);
		}

		const wrappedCall = async (...rest) => {
			try {
				setIsLoading(true);
				setCallError(null);

				let results = await onSubmitInternal(...rest);

				results = await callOptional(callbackProp, results);

				return results;
			}
			catch (error) {
				console.error(error);
				setCallError(failMessage !== null ? failMessage : error);


				if (throwError) {
					throw error;
				}
			}
			finally {
				setIsLoading(false);
			}

			return null;
		};

		return wrappedCall;
	}, [callbackProp, failMessage, onSubmitInternal, throwError]);


	return [
		runnableHandler,
		isLoading,
		callError,
	];
}
