import React, { Suspense } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Route, Routes, useLocation } from 'react-router-dom';
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
              <Route path='/Cat-API-Test-Task/products' element={<CatsPage />} />
              <Route path='/Cat-API-Test-Task/products/:name' element={<CatDetailPage />} />
              <Route path="/Cat-API-Test-Task/create-product" element={<CreateProduct />} />
              <Route path='/Cat-API-Test-Task/' element={<CatsPage />} />
            </Routes>
          </Suspense>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default App;
