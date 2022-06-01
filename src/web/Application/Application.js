import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@emotion/react";

import Router from "./Router";
import { LightTheme } from "web/Themes";

export default function Application({
    store,
    context,
})
{
	const [theme, setTheme] = useState(LightTheme);


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