import FilterModal from '../components/FilterComponent/FilterModal';
import EmployeeForm from '../components/Form/EmployeeForm/EmployeeForm';
import EmployeeDetailModal from '../components/Overlay/DetailModal';
import SortModalComponent from '../components/SortModal/SortModalComponent';
import PromoteEmployeeForm from '../components/Form/PromoteEmployee/PromoteEmployeeForm';
import FileUpload from '../components/FileUpload/FileUpload';

export const MODAL_COMPONENTS = {
  FILTER: FilterModal,
  SORT_MODAL: SortModalComponent,
  EMP_DETAIL_MODAL: EmployeeDetailModal,
  EMP_FORM_MODAL: EmployeeForm,
  PROMOTE_MODAL: PromoteEmployeeForm,
  FILE_UPLOAD: FileUpload,
} as const;

export type ModalType = keyof typeof MODAL_COMPONENTS;
