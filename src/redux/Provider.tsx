'use client'
import React from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import { ReactNode } from 'react';

function Providers({children}: {children: React.ReactNode}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default Providers