import { BrowserRouter, Routes,  Route,  Link } from "react-router-dom";


const BasicText = ({ text }) => (<div>{text}</div>) ;


import { BookListRoute } from "./Routes";

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