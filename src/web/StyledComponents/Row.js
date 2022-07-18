const _rowContainerCSS = {
	display: "flex",
	justifyContent: "space-between",
	marginRight: "1rem",
};

export function Container({ children })
{
	return (<div css={_rowContainerCSS}> {children} </div>);
}

const _sectionCSS = {};

export function Section({ children })
{
	return (<div css={_sectionCSS}> {children} </div>);
}

const _lineCSS = {};

export function Line({ children })
{
	return (<div css={_lineCSS}> {children} </div>);
}

const _elementGroupCSS = {};

export function ElementGroup({ children })
{
	return (<div css={_elementGroupCSS}> {children} </div>);
}

const _elementCSS = {};

export function Element({ children })
{
	return (<div css={_elementCSS}> {children} </div>);
}

