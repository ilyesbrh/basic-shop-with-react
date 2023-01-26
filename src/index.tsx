import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, redirect, Navigate } from "react-router-dom";
import './index.scss';
import Products from './app/Layout/Products/Products';
import Cart from './app/Layout/Cart/Cart';
import { store } from './store/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to="/products" replace />
      },
      {
        path: "Products",
        element: <Products />,
      },
      {
        path: "Cart",
        element: <Cart />,
      },
      {
        path: '*',
        element: <Navigate to="/products" replace />
      }
    ],
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider >
);

reportWebVitals();
