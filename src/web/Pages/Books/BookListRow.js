import { ResourceField } from "web/Components/ResourceField";
import { Row } from "web/StyledComponents";

export default function BookListRow({ data })
{
	// return (
	// 	<ResourceField
	// 		productKey="book_id"
	// 		value={data.book_id}
	// 		label='Book ID'
	// 	/>
	// );

	return (
		<Row.Container>
			<Row.Section>
				<Row.Line>
					<Row.ElementGroup>
						<Row.Element>
							<ResourceField
								productKey="book_id"
								value={data.book_id}
								label='Book ID'
							/>
						</Row.Element>
					</Row.ElementGroup>
				</Row.Line>
			</Row.Section>

			<Row.Section>
				<Row.Line>
					<Row.ElementGroup>
						<Row.Element>
							<ResourceField
								productKey="book_title"
								value={data.book_title}
								label='Title'
							/>
						</Row.Element>
					</Row.ElementGroup>
				</Row.Line>
			</Row.Section>

			<Row.Section>
				<Row.Line>
					<Row.ElementGroup>
						<Row.Element>
							<ResourceField
								productKey="book_pages"
								value={data.book_pages}
								label='Pages'
							/>
						</Row.Element>
					</Row.ElementGroup>
				</Row.Line>
			</Row.Section>

			<Row.Section>
				<Row.Line>
					<Row.ElementGroup>
						<Row.Element>
							<ResourceField
								productKey="book_genres"
								value={data.book_genres}
								label='Genre'
							/>
						</Row.Element>
					</Row.ElementGroup>
				</Row.Line>
			</Row.Section>

			<Row.Section>
				<Row.Line>
					<Row.ElementGroup>
						<Row.Element>
							<ResourceField
								productKey="author_id"
								value={data.author_id}
								label='Author Id'
							/>
						</Row.Element>
					</Row.ElementGroup>
				</Row.Line>
			</Row.Section>
		</Row.Container>
	);
}
