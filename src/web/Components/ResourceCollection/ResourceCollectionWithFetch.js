import { useState, useEffect } from "react";
import ResourceList from "./ResourceList";

function splitInChunks(arrRowList, size)
{
	const chunks = {};
	let chunkIndex = 1;

	for (let index = 0; index < arrRowList.length; index += size)
	{
		chunks[chunkIndex] = arrRowList.slice(index, index + size);
		chunkIndex += 1;
	}

	return chunks;
}

function splitDataIntoPages({
	data: dataProp,
	rowsPerPage,
	callback,
})
{
	const arrData = Object.values(dataProp);

	if (arrData && arrData.length)
	{
		if (arrData.length <= rowsPerPage)
		{
			callback({ 1: arrData });
		}
		else
		{
			callback(splitInChunks(arrData, rowsPerPage));
		}
	}
	else
	{
		callback({ 1: [] });
	}
}

export default function ProductCollectionWithFetch({
	fetchData: fetchDataProp,
	data,

	rowsPerPage = 10,
	...rest
})
{
	const [dataPerPage, setDataPerPage] = useState({ 1: null });
	const [fetchData] = useState(() => fetchDataProp);

	useEffect(() => splitDataIntoPages({
		data,
		rowsPerPage,
		callback: setDataPerPage,
	}), [data, rowsPerPage]);


	const productCollectionProps = {
		dataPerPage,
		totalRows: data ? data.length : 0,
		fetchData,
		rowsPerPage,
		...rest,
	};

	return <ResourceList {...productCollectionProps} />;
}
