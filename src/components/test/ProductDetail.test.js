/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductDetail from "../ProductDetail";
import { Provider } from 'react-redux';
import { http, HttpResponse, delay } from "msw";
import { setupServer } from 'msw/node';
import { MemoryRouter, Routes, Route } from "react-router-dom";
// import Router from 'react-router';
import { store } from "../../store/store"
import "@testing-library/jest-dom";


const server = setupServer(http.get('/products/1', async () => {
    await delay(150)
    return HttpResponse.json({
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    })
}))

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("Login Component testing", () => {

    test("Product back button is in the document", async () => {
        const id = 1;
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/products/${id}`]}>
                    <Routes>
                        <Route path="/products/:id" element={<ProductDetail />}></Route>
                    </Routes>
                    {/* <ProductDetail /> */}
                </MemoryRouter>
            </Provider>,
        );

        await waitFor(() => {
            const usernameInput = screen.getByText("Back to Products List");
            expect(usernameInput).toBeInTheDocument();
        })
    })
})