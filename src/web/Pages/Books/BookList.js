import { Page, PageContent } from "web/Components/Common";
import { ResourceCollectionWithFetch, ResourceListRow } from "web/Components/ResourceCollection";

import { Middleware } from "web/Middleware";
import { useSmartCall } from "web/Hooks";
import { useCallback, useEffect, useState } from "react";
import BookListRow from "./BookListRow";

export default function BookList()
{
	const [bookList, setBookList] = useState([]);

	const fetchInternal = useCallback(async () => {
		const response = await Middleware.fetchBooks();
		setBookList(response);
	}, []);

	const [fetchData, isLoading, error] = useSmartCall(fetchInternal);

	useEffect(() => { fetchData(); }, []);

	console.log({ bookList });

	return (
		<Page>
			<PageContent
				title="Books"
				description="A book is a medium for recording information in the form of writing or images, typically composed of many pages bound together and protected by a cover."
			>
				<ResourceCollectionWithFetch
					fetchData = {fetchData}
					isLoading = {isLoading}

					data = {bookList}

					dataFetchError = {error}
					rowsPerPage = {2}
					renderRow={(context) => (
						<ResourceListRow
							index={context.book_id}
							content={(
								<BookListRow data={context} />
							)}
						/>
					)}
				/>
			</PageContent>
		</Page>
	);
}
