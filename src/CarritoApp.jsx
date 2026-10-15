import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBarComponent } from './components/NavBarComponent';
import { ComprasPage } from './pages/ComprasPage';
import { CarritoPage } from './pages/CarritoPage';
import { ProductosProvider } from './context/ProductosProvider';
import { CarritoProvider } from './context/CarritoProvider';

export const CarritoApp = () => {
  return (
    <ProductosProvider>
      <CarritoProvider>
        <NavBarComponent />
        <div className="container-lg">
          <Routes>
            <Route path="/" element={<ComprasPage />}></Route>
            <Route path="/carrito" element={<CarritoPage />}></Route>
            <Route path="/*" element={<Navigate to="/" />}></Route>
          </Routes>
        </div>
      </CarritoProvider>
    </ProductosProvider>
  );
};
