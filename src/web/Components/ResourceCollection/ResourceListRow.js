import { Link } from "react-router-dom";

function IndexComponent({
	linkToProduct,
	hrefTo,
	index,
})
{
	if (linkToProduct) {
		return (
			<Link
				to={linkToProduct}
				data-testid="product-list-row__id"
				css={{
					textDecoration: "none !important",
					display: "inline-block",
					minWidth: "2rem",
				}}
			>
				#{index}
			</Link>
		);
	}

	if (hrefTo) {
		return <a
			target="_blank"
			href={hrefTo}
			rel="noreferrer"
			css={{
				textDecoration: "none !important",
				display: "inline-block",
				minWidth: "2rem",
			}}
		>#{index}</a>;
	}

	return (
		<span>
			#{index}
		</span>
	);
}


export default function ProductListRow({
	index = null,
	linkToProduct = null,
	hrefTo = null,
	content,
})
{
	return (
		<div
			css={{
				display: "flex",
				fontSize: "0.875rem",
			}}
		>
			{index !== null && (
				<div
					css={(theme) => ({
						color: theme.colors.primary,
						fontWeight: "bold",
						paddingRight: "0.625rem",
					})}
				>
					<IndexComponent
						linkToProduct = {linkToProduct}
						hrefTo = {hrefTo}
						index = {index}
					/>
				</div>
			)}

			<div css={{ width: "100%" }} >
				<div
					css={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<div css={{ flexGrow: 1 }} 	>
						{content}
					</div>
				</div>
			</div>
		</div>
	);
}
