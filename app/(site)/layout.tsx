import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import React from 'react';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
