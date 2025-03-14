import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://verbose-space-dollop-pjr6r4qgrj5j2rvgv-4000.app.github.dev/",
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "cors",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
