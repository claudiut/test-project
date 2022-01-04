import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Checkout from 'src/app/pages/Checkout'
import Products from 'src/app/pages/Products'
import routes from 'src/app/router/routes'

export default function Router() {
    return (
        <Routes>
            <Route path={routes.products} element={<Products />} />
            <Route path={routes.checkout} element={<Checkout />} />
            <Route path="*" element={<Navigate to={routes.products} />} />
        </Routes>
    )
}
