/* eslint-disable no-param-reassign */
import { useCallback } from "react";
import { Button, TextInput } from "web/Components/Common/Inputs";
import { useTranslations } from "web/Hooks";


export default function ResourceCollectionNavigation({
	currentPage,
	setCurrentPage,

	nTotalPages,
	totalRows,
	dataPerPage,

	pageInputValue,
	setPageInputValue,
})
{
	const { t } = useTranslations();

	const isLastPage = currentPage >= nTotalPages;

	const goToNextPage = useCallback(() => setCurrentPage(currentPage + 1), [currentPage, setCurrentPage]);
	const goToPreviousPage = useCallback(() => setCurrentPage(currentPage - 1), [currentPage, setCurrentPage]);


	const onInputChange = useCallback(({ target }) => {
		if (totalRows && Number(target.value) > nTotalPages)
		{
			setPageInputValue(Math.max(1, Math.ceil(totalRows / dataPerPage[1].length)));
		}
		else if (target.value.length && Number(target.value) < 1)
		{
			setPageInputValue(1);
		}
		else
		{
			setPageInputValue(target.value);
		}
	}, [dataPerPage, nTotalPages, setPageInputValue, totalRows]);

	const onKeyUp = useCallback(({ key, target }) => {
		const nPage = Math.floor(Number(target.value));

		if (key === "Enter" && !Number.isNaN(nPage) && nPage !== currentPage)
		{
			if (!target.value.length)
			{
				target.value = currentPage;
			}
			else
			{
				setCurrentPage(nPage);
			}
		}
	}, [currentPage, setCurrentPage]);

	const onInputBlur = useCallback(({ target }) => {
		const nPage = Math.floor(Number(target.value));

		if (!Number.isNaN(nPage) && nPage !== currentPage)
		{
			if (!target.value.length)
			{
				target.value = currentPage;
			}
			else
			{
				setCurrentPage(nPage);
			}
		}
	}, [currentPage, setCurrentPage]);

	return (
		<div
			css={(theme) => ({
				alignItems: "center",
				display: "flex",
				justifyContent: "space-between",
				marginTop: "1.5rem",
				[theme.mediaQuery.normal.query]: {
					justifyContent: "center",
				},
			})}
		>
			<Button
				color="link"
				disabled={currentPage === 1}
				onClick={goToPreviousPage}
				css={{
					minWidth: "7rem",
					paddingLeft: 0,
					paddingRight: 0,
				}}
			>
				<span>{t("PREVIOUS_PAGE")}</span>
			</Button>

			<div
				css={(theme) => ({
					alignItems: "center",
					display: "flex",
					[theme.mediaQuery.normal.query]: {
						paddingLeft: "2rem",
						paddingRight: "2rem",
					},
				})}
			>
				<TextInput
					type="text-line"
					value={pageInputValue}
					css={{
						display: "inline !important",
						maxWidth: "2rem",
					}}
					onChange={onInputChange}
					onKeyUp={onKeyUp}
					onBlur={onInputBlur}
				/>

				{!!totalRows && dataPerPage[1].length > 0 && (
					<>
						<span
							css={{
								marginLeft: "0.5rem",
								marginRight: "0.5rem",
							}}
						>
							{t("OF")}
						</span>
						<span>{nTotalPages}</span>
					</>
				)}
			</div>

			<Button
				variant="link"
				disabled={isLastPage}
				onClick={goToNextPage}
				css={{
					minWidth: "7rem",
					paddingLeft: 0,
					paddingRight: 0,
				}}
			>
				<span>{t("NEXT_PAGE")}</span>
			</Button>
		</div>
	);
}
