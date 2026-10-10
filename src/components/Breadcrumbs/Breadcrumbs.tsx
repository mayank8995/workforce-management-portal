import { NavLink, useLocation } from 'react-router-dom';
import { StepBack } from 'lucide-react';
import React from 'react';
import { text } from '../../theme/theme';

function Breadcrumb() {
  const location = useLocation();
  return (
    <>
      {location.pathname.includes('/viewmore') && (
        <NavLink to={'/home/dashboard'}>
          <StepBack className={`h-5 w-5 xl:h-6 xl:w-6 ${text.primary}`} />
        </NavLink>
      )}
    </>
  );
}

export default React.memo(Breadcrumb);
