const TranslationConstants = {
	RETRY: "Retry",
	SHOW_MORE: "Show more",
	ERROR_ELEMENT_TITLE: "Error detected",
	PREVIOUS_PAGE: "Previous page",
	NEXT_PAGE: "Next page",
	OF: "of",
};

function getTranslation(strConstantName)
{
	return TranslationConstants[strConstantName] || strConstantName;
}

export function useTranslations()
{
	return { t: getTranslation };
}
