'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { headerLinks } from '@/constants';
import { cn } from '@/lib/utils';

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className='md:justify-between flex flex-col md:items-center w-full items-start gap-5 md:flex-row'>
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.label}
            className={cn(
              'flex items-center justify-center p-medium-16 whitespace-nowrap',
              isActive && 'text-primary-500'
            )}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
