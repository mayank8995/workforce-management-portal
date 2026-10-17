import Toggle from '../Toggle/Toggle';
import RealtimeStatus from '../Realtime/RealtimeStatus';
import { ADMIN_PORTAL } from '../../utils/constants';
import { shell } from '../../theme/theme';

function Header() {
  return (
    <header className={shell.header}>
      <h1 className={shell.headerTitle}>{ADMIN_PORTAL}</h1>
      <div className="ml-auto md:ml-0 flex items-center gap-2">
        <RealtimeStatus />
        <Toggle />
      </div>
    </header>
  );
}

export default Header;
