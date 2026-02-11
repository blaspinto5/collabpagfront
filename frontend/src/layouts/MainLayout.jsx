/**
 * Main Layout
 * Clean, centered layout structure
 */

import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components';

const MainLayout = () => {
  return (
    <div className="app-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
