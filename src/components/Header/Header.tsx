import Toggle from '../Toggle/Toggle';
import { ADMIN_PORTAL } from '../../utils/constants';

function Header() {
  return (
    <header className="h-14 min-h-14 flex items-center sm:justify-start md:justify-between gap-3 pl-4 pr-14 md:px-5 bg-white border-b border-slate-200 dark:bg-slate-950 dark:border-slate-800">
      <h1 className="font-semibold tracking-tight text-slate-800 dark:text-slate-100 text-base md:text-xl truncate">
        {ADMIN_PORTAL}
      </h1>
      {/* <div className="shrink-0"> */}
      <Toggle />
      {/* </div> */}
    </header>
  );
}

export default Header;
