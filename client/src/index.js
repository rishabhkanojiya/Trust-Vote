import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyle } from "./GlobalStyle";
import Toast from "./components/Toast";
import {
    LoginProvider,
    ShowPopupProvider,
    VoteProvider,
} from "./context/Provider";

ReactDOM.render(
    <ShowPopupProvider>
        <LoginProvider>
            <VoteProvider>
                <GlobalStyle />
                <App />
                <Toast />
            </VoteProvider>
        </LoginProvider>
    </ShowPopupProvider>,
    document.getElementById("root"),
);
