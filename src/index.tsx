import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

const root = createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                 <App />
            </BrowserRouter>
        </Provider>
    </StrictMode >
);
