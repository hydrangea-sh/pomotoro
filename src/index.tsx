import { Route, Router } from "@solidjs/router";
/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import Home from "./pages/Home";

const root = document.getElementById("root");
if (root) {
	render(
		() => (
			<Router>
				<Route path="*" component={Home} />
			</Router>
		),
		root,
	);
} else {
	console.error("Root element not found");
}
