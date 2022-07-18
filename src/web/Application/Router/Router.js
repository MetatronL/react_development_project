import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import { BookListRoute } from "./Routes";


const BasicText = ({ text }) => (<div>{text}</div>);

export default function Router({
	store,
	context,
})
{
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<BasicText text="home" />} />
				<Route
					exact
					path="/books"
					element={<BookListRoute />}
				/>
				<Route element={<BasicText text="404" />} />
			</Routes>
		</BrowserRouter>
	);
}
