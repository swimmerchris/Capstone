/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductDetail from "../ProductDetail";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store/store"
import "@testing-library/jest-dom";


describe("Login Component testing", () => {

    test("Login Form is in the document", async () => {

        render(<Provider store={store}> <BrowserRouter><ProductDetail /></BrowserRouter> </Provider>);

        await waitFor(() => {

            const usernameInput = screen.getByText("Back to Products List");
            expect(usernameInput).toBeInTheDocument();
        })
    })
})