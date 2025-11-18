# TODO List for Account and Admin Login Issues

## Issues Identified
- Token verification in App.jsx removes token on failure, causing logout and redirect loops for admin users.
- Admin component checks user role but not token directly.
- Logout uses window.location.href causing full page reload.
- No automatic navigation to /admin after admin login.

## Tasks
- [ ] Modify App.jsx token verification to not remove token on failure, just skip setting user.
- [ ] Update Admin.jsx to check for token existence in addition to user role.
- [ ] Change logout in Account.jsx to use navigate instead of window.location.href.
- [ ] Add automatic navigation to /admin after successful admin login in Account.jsx.
- [ ] Test the changes to ensure no redirect loops and proper logout behavior.
