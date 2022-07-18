import { useCallback, useState, useMemo } from "react";
import { Button } from "web/Components/Common/Inputs";

import { getErrorMessage } from "web/Logic";
import { useTranslations } from "web/Hooks";

const cssBreakWord = {
	width: "100%",
	overflowWrap: "break-word",
};

export default function ErrorElement({
	errrorTitle,
	error,
	handleRetry,
	maxLength = 340,
})
{
	const errorMessage = useMemo(() => {
		if (error instanceof Error)
		{
			return getErrorMessage(error);
		}

		return error;
	}, [error]);

	const { t } = useTranslations();
	const [showFullError, setShowFullError] = useState(false);
	const showMore = useCallback(() => setShowFullError(true), []);

	const errorTrimmed = useMemo(() => errorMessage.trim(), [errorMessage]);
	const errorTruncated = useMemo(() => errorTrimmed.substr(0, maxLength), [errorTrimmed, maxLength]);

	const showTruncatedError = errorTruncated.length < errorTrimmed.length && !showFullError;

	return (
		<div css={{ display: "flex" }}>
			<div css={cssBreakWord}>
				<div
					css={(theme) => ({
						color: "red",
						fontWeight: "bold",
						marginBottom: "0.5rem",
					})}
				>
					{errrorTitle || t("ERROR_ELEMENT_TITLE")}
				</div>

				<div css={cssBreakWord}>
					{!showTruncatedError && (
						<span css={cssBreakWord}>
							{errorTrimmed}
						</span>
					)}

					{!!showTruncatedError && (
						<>
							<span>{errorTruncated}...</span>

							<Button
								color="link"
								onClick={showMore}
							>
								{t("SHOW_MORE")}
							</Button>
						</>
					)}

					{!!handleRetry && (
						<Button
							variant="link"
							onClick={handleRetry}
						>
							{t("RETRY")}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
