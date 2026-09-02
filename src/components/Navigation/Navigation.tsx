/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NAV_ITEMS, SIDE_BAR_ITEMS } from '../../utils/constants';
import { BarChart3, Home, LogOut, Settings, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { NavItems } from '../../types/types';
import { doLogout } from '../../api/admin-portal.api';
import { loadAnalyticsPage } from '../../router/router';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const context = useAuth();
  const navItems: NavItems[] = [
    {
      name: SIDE_BAR_ITEMS.DASHBOARD,
      path: NAV_ITEMS.DASHBOARD,
      show: context?.can('dashboard', 'read'),
    },
    {
      name: SIDE_BAR_ITEMS.EMPLOYEES,
      path: NAV_ITEMS.EMPLOYEES,
      show: context?.can('employee', 'read'),
    },
    {
      name: SIDE_BAR_ITEMS.ANALYTICS,
      path: NAV_ITEMS.ANALYTICS,
      show: context?.can('analytics', 'read'),
    },
    {
      name: SIDE_BAR_ITEMS.SETTINGS,
      path: NAV_ITEMS.SETTINGS,
      show: context?.can('settings', 'read'),
    },
    { name: SIDE_BAR_ITEMS.LOGOUT, path: NAV_ITEMS.LOGOUT, show: true },
  ];

  async function navigateToPage(
    isOpen: boolean,
    navItem?: NavItems,
    isMobile?: boolean
  ) {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(isOpen);
    }
    if (navItem && navItem.path === NAV_ITEMS.LOGOUT) {
      try {
        await doLogout();
        context?.logout();
      } catch (error) {
        console.error(error);
      }
    } else if (navItem && navItem.path === NAV_ITEMS.ANALYTICS) {
      navigate(`${navItem.path}`);
    } else {
      if (navItem) {
        navigate(`${navItem.path}`);
      }
    }
  }
  return (
    <>
      {/* Mobile Top Bar */}
      <div className="absolute top-0 right-0 md:hidden flex items-center justify-between p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="pl-2 text-xl text-slate-800 dark:text-slate-100 cursor-pointer"
        >
          ☰
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <button
          className="fixed inset-0 bg-black/50 z-10 lg:z-0 md:hidden"
          // className="fixed inset-0 bg-black/50 z-40 sm:z-0 md:hidden"
          onClick={() => navigateToPage(false)}
        />
      )}

      {/* Sidebar */}
      <div
        /*fixed top-0 left-0 z-50 sm:z-0 w-64  text-white*/
        className={`
          bg-linear-to-br from-slate-900 to-indigo-950
          fixed top-0 left-0 z-20 lg:z-0 w-64 text-white
          transform transition-transform duration-300 md:shrink-0 h-full md:h-auto overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex
          flex-col dark:bg-linear-to-br dark:from-slate-950  dark:to-slate-900
        `}
      >
        {/* Logo */}
        <div className="px-6 py-8 border-b border-slate-800">
          <h1 className="font-bold text-white text-sm md:text-xl">Workspace</h1>

          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Workforce Management
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-2 h-full overflow-y-auto">
          {navItems?.map((item) => (
            <React.Fragment key={item.name}>
              {item?.show ? (
                <button className={`w-full max-w-full text-xs md:text-sm`}>
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => navigateToPage(false, item)}
                    onMouseEnter={() => {
                      if (item.path === NAV_ITEMS.ANALYTICS) {
                        loadAnalyticsPage();
                      }
                    }}
                    onPointerDown={() => {
                      if (item.path === NAV_ITEMS.ANALYTICS) {
                        loadAnalyticsPage();
                      }
                    }}
                    className={({ isActive }) =>
                      `flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-slate-300
              hover:bg-slate-800
              hover:text-white
              transition-all
              ${
                isActive
                  ? 'bg-linear-to-r from-indigo-600 to-violet-500 rounded-xl text-white shadow-lg shadow-indigo-500/300'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
                    }
                  >
                    {/* { `${item.name}` === SIDE_BAR_ITEMS.DASHBOARD && <Home className="h-5 w-5"/>}
              { `${item.name}` === SIDE_BAR_ITEMS.EMPLOYEES && <Users className="h-5 w-5"/>}
              { `${item.name}` === SIDE_BAR_ITEMS.ANALYTICS && <BarChart3 className="h-5 w-5"/>}
              { `${item.name}` === SIDE_BAR_ITEMS.SETTINGS && <Settings className="h-5 w-5" />} */}
                    {item.name === SIDE_BAR_ITEMS.DASHBOARD && (
                      <>
                        <Home className="h-4 w-4 md:h-5 md:w-5" />
                        {item.name}
                      </>
                    )}
                    {item.name === SIDE_BAR_ITEMS.EMPLOYEES && (
                      <>
                        <Users className="h-4 w-4 md:h-5 md:w-5" />
                        {item.name}
                      </>
                    )}
                    {item.name === SIDE_BAR_ITEMS.ANALYTICS && (
                      <>
                        <BarChart3 className="h-4 w-4 md:h-5 md:w-5" />
                        {item.name}
                      </>
                    )}
                    {item.name === SIDE_BAR_ITEMS.SETTINGS && (
                      <>
                        <Settings className="h-4 w-4 md:h-5 md:w-5" />
                        {item.name}
                      </>
                    )}
                    {item.name === SIDE_BAR_ITEMS.LOGOUT && (
                      <>
                        <LogOut className="h-4 w-4 md:h-5 md:w-5" />
                        {item.name}
                      </>
                    )}
                  </NavLink>
                </button>
              ) : null}
            </React.Fragment>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto p-6 border-t border-slate-800">
          <p className="text-xs md:text-sm text-slate-500">
            © 2026 Admin Dashboard
          </p>
        </div>
      </div>
    </>
  );
}
export default React.memo(Navigation);
