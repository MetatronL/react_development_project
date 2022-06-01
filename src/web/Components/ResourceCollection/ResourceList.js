import ResourceCollectionBase from "./ResourceCollectionBase";

function ProductList(props)
{
	return (
		<ResourceCollectionBase
			type="list"
			{...props}
		/>
	);
}

export default ProductList;
