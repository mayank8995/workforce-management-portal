1. Authentication + RBAC
   Add:

Login
↓
Authentication
↓
User role
├── Admin
├── Manager
└── Viewer

Then enforce permissions at multiple levels:

Admin
✓ View employees
✓ Create employee
✓ Edit employee
✓ Delete employee
✓ Export
✓ Bulk actions

Manager
✓ View employees
✓ Edit
✓ Export
✗ Delete

Viewer
✓ View
✗ Edit
✗ Export

authentication vs authorization
route protection
permission model
frontend vs backend authorization
hiding UI vs actually preventing operations

---

INPROGRESS

1. Edit employee
