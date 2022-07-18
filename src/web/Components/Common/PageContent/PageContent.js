function PageHeader()
{
	return (
		<div>
			<div>
				{"<<< go back"}
			</div>
		</div>
	);
}

export default function PageContent({
	children,
	title,
	description,
})
{
	return (
		<div
			css={{
				padding: "1rem",
			}}
		>
			<div
				css={{
					marginBottom: "0.5rem",
					fontSize: "2rem",
					fontWeight: "600",
					// paddingBottom: "0.5rem",
					minWidth: "10rem",
				}}
			>
				{title}
			</div>

			<div
				css={{
					marginBottom: "1rem",
					fontSize: "1.25rem",
					borderBottom: "1px solid #dbcdcd",
					paddingBottom: "1rem",
				}}
			>
				{description}
			</div>

			<div>
				{children}
			</div>
		</div>
	);
}
