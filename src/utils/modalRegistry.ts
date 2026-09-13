import FilterModal from '../components/FilterComponent/FilterModal';
import EmployeeForm from '../components/Form/EmployeeForm/EmployeeForm';
import EmployeeDetailModal from '../components/Overlay/DetailModal';
import SortModalComponent from '../components/SortModal/SortModalComponent';

export const MODAL_COMPONENTS = {
  FILTER: FilterModal,
  SORT_MODAL: SortModalComponent,
  EMP_DETAIL_MODAL: EmployeeDetailModal,
  EMP_FORM_MODAL: EmployeeForm,
} as const;

export type ModalType = keyof typeof MODAL_COMPONENTS;
