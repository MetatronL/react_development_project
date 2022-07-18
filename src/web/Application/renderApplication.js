import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

import { Provider, ReactReduxContext } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import ResourceFieldManager from "web/Components/ResourceField/ResourceFieldManager";
import { ExplicitRenderers, DynamicRenderers } from "web/Renderers/ResourceField";
import { createReduxBindings } from "./Redux";

import Application from "./Application";


export default function renderApplication()
{
	const rootElement = document.getElementById("root");
	const root = createRoot(rootElement);

	const { store } = createReduxBindings();

	window.productFieldManager = new ResourceFieldManager({
		explicitRenderers: ExplicitRenderers,
		dynamicRenderingLookup: DynamicRenderers,
	});


	root.render(
		(
			<Provider store={store} context={ReactReduxContext}>
				<HelmetProvider>
					<Suspense fallback={<div />}>
						<Application
							store = {store}
							context={ReactReduxContext}
						/>
					</Suspense>
				</HelmetProvider>
			</Provider>
		),
	);
}
