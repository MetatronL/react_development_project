import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@emotion/react";

import Router from "./Router";

export default function Application({
    store,
    context,
})
{
	const [theme, setTheme] = useState({});


    return (
		<ThemeProvider theme={theme}>
            <div>
                <Helmet>
                    <title>
                        {"Demo - react Application"}
                    </title>
                </Helmet>

                <Router
                    store={store}
                    theme={theme}
                    context={context}
                />
            </div>
		</ThemeProvider>
	);
}