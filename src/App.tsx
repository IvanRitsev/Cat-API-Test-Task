import React, { Suspense } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
// import CatsPage from './pages/CatsPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
// import CatDetailPage from './pages/CatDetailPage';
// import CreateProduct from './pages/CreateCat';
import '../src/dist/styles.css';
import IconSvgSelector from './assets/icons/IconSvgSelector';

const CatsPage = React.lazy(() => import('./pages/CatsPage'));
const CatDetailPage = React.lazy(() => import('./pages/CatDetailPage'));
const CreateProduct = React.lazy(() => import('./pages/CreateCat'));

const App: React.FC = () => {
  const location = useLocation();
  return (
    <>
       <SwitchTransition>
        <CSSTransition key={location.pathname} classNames='fade' timeout={300} unmountOnExit>
          <Suspense fallback={<div className='loading'><IconSvgSelector id='loading-spinner'/></div>}>
            <Routes location={location}>
              <Route path='/products' element={<CatsPage />} />
              <Route path='/products/:name' element={<CatDetailPage />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path='/' element={<CatsPage />} />
            </Routes>
          </Suspense>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default App;
