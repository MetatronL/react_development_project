export function getErrorMessage(error)
{
	if (!error)
	{
		return ""; // undefined, null, "", etc.
	}

	if (typeof error === "string")
	{
		return error;
	}

	if (error instanceof Error || typeof error.message !== "undefined")
	{
		return error.message || "";
	}

	if (error.response && error.response.body)
	{
		return error.response.body.message || "";
	}

	return "";
}
