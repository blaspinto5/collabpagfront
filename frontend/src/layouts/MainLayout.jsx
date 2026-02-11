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
      <main className="flex-1 px-6 md:px-10 lg:px-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
