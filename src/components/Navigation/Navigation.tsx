/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NAV_ITEMS, SIDE_BAR_ITEMS } from '../../utils/constants';
import { BarChart3, Home, LogOut, Menu, Settings, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { NavItems } from '../../types/types';
import { doLogout } from '../../api/admin-portal.api';
import { loadAnalyticsPage } from '../../router/router';
import { cx, shell, sidebar } from '../../theme/theme';

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

  const NAV_ICONS = {
    [SIDE_BAR_ITEMS.DASHBOARD]: Home,
    [SIDE_BAR_ITEMS.EMPLOYEES]: Users,
    [SIDE_BAR_ITEMS.ANALYTICS]: BarChart3,
    [SIDE_BAR_ITEMS.SETTINGS]: Settings,
    [SIDE_BAR_ITEMS.LOGOUT]: LogOut,
  };

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
      <div className="absolute top-0 right-0 h-14 md:hidden flex items-center px-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={shell.headerButton}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <button
          className={sidebar.overlay}
          onClick={() => navigateToPage(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cx(
          sidebar.container,
          'fixed top-0 left-0 z-20 lg:z-0 w-60',
          'transform transition-transform duration-300 md:shrink-0 h-full md:h-auto overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:static md:flex flex-col'
        )}
      >
        {/* Logo */}
        <div className={`px-5 py-5 border-b ${sidebar.section}`}>
          <h1 className={sidebar.brandTitle}>Workspace</h1>
          <p className={sidebar.brandSubtitle}>Workforce Management</p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-3 space-y-1 h-full overflow-y-auto">
          {navItems?.map((item) => {
            const Icon = NAV_ICONS[item.name];
            return (
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
                        cx(
                          sidebar.link,
                          isActive ? sidebar.linkActive : sidebar.linkIdle
                        )
                      }
                    >
                      {Icon && (
                        <Icon className="h-4 w-4 md:h-4.5 md:w-4.5 shrink-0" />
                      )}
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  </button>
                ) : null}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`mt-auto px-5 py-4 border-t ${sidebar.section}`}>
          <p className={sidebar.footerText}>© 2026 Admin Dashboard</p>
        </div>
      </div>
    </>
  );
}
export default React.memo(Navigation);
