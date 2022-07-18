export const arrExptyStates = [null, undefined, ""];

export function isEmptyState(entry)
{
	return arrExptyStates.includes(entry);
}

export function isNotEmptyState(entry)
{
	return !arrExptyStates.includes(entry);
}

export const _emptyProductFieldObject = {};
