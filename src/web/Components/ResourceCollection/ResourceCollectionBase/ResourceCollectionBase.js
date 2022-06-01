/* eslint-disable brace-style */
import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "web/Hooks";
import { Button, TextInput } from "web/Components/Common/Inputs";
import { ErrorElement, LoadingElement } from "web/Components/Common/PageElements";


import ResourceCollectionNavigation from "./ResourceCollectionNavigation";


const noop = () => {};


function BorderWrapper({ children })
{
	return (
		<>
			<hr css={{ marginTop: "2rem" }} />
			{children}
			<hr css={{ marginBottom: "2rem" }} />
		</>
	);
}

export default function ResourceCollectionBase({
	dataPerPage,
	isLoading = false,
	totalRows,
	dataFetchError = null,

	fetchData = noop,
	customTextForNoResult = null,
	rowsPerPage,
	renderRow,

	hideBorderTop = false,
	hideBorderBottom = false,
	hideNavigation = false,
	hideNoResultsScreen = false,
	hideInternalBorders = false,
}) {
	const [currentPage, setCurrentPage] = useState(1);

	const nTotalPages = useMemo(() => {
		return Math.max(1, Math.ceil(totalRows / rowsPerPage));
	}, [rowsPerPage, totalRows]);


	const { t } = useTranslations();
	const [pageInputValue, setPageInputValue] = useState(currentPage);


	useEffect(() => {
		setPageInputValue(currentPage);
	}, [currentPage]);


	if (dataFetchError)
	{
		return (
			<BorderWrapper>
				<ErrorElement error={dataFetchError} handleRetry={fetchData} />
			</BorderWrapper>
		);
	}

	if (isLoading)
	{
		return (
			<BorderWrapper>
				<LoadingElement />
			</BorderWrapper>
		);
	}

	if (!dataPerPage[currentPage] || !Array.isArray(dataPerPage[currentPage]) || dataPerPage[currentPage].length === 0)
	{
		if (hideNoResultsScreen)
		{
			return null;
		}

		return (
			<BorderWrapper>
				<div css={{ textAlign: "center" }}>
					{customTextForNoResult || t("SEARCH_WARNING_NO_RESULTS_FOUND")}
				</div>
			</BorderWrapper>
		);
	}

	return (
		<div>
			{dataPerPage[currentPage].length > 0 && (
				<div
					css={(theme) => ({
						borderTop: hideBorderTop ? "none" : `1px solid ${theme.separatorColor}`,
						borderBottom: hideBorderBottom ? "none" : `1px solid ${theme.separatorColor}`,
						paddingBottom: "1.125rem",
						paddingTop: "1.125rem",
					})}
				>
					{dataPerPage[currentPage].map((dataPerRow, index) => (
						<div key={index}>
							{index > 0 && !hideInternalBorders && (
								<hr
									css={{
										marginTop: "1.125rem",
										marginBottom: "1.125rem",
									}}
								/>
							)}

							{renderRow(dataPerRow)}
						</div>
					))}
				</div>
			)}

			{!hideNavigation && nTotalPages > 1 && (
				<ResourceCollectionNavigation
					currentPage = {currentPage}
					setCurrentPage = {setCurrentPage}

					nTotalPages = {nTotalPages}
					totalRows = {totalRows}
					dataPerPage = {dataPerPage}

					pageInputValue = {pageInputValue}
					setPageInputValue = {setPageInputValue}
				/>
			)}

		</div>
	);
}

