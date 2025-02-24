# split-screen-tabs
An extension to view 2 tabs side by side in a split-screen layout in Mozilla Firefox

## Split Screen
This Mozilla Firefox extension allows clicking the extension button to open a Sidebar.  
As Firefox does not support true panels with their own urls, the functionality is implemented using Mozilla-specific sidebar feature.  
- The `manifest.json` opens the `sidebar.html` with `sidebar_action()`.
- The `sidebar.html` shows the list of all open tabs, from which the user can select one to load in the sidebar.
- The sidebar is a duplicate view. Closing the original tab will not close the tab loaded in the sidebar.

## Notes
- Due to Firefox event behavior, if any inactive tab is closed, it would still show in the sidebar, till the focus doesn't change from the active tab.
- Firefox View cannot be used in the sidebar as it's not a real tab but a synthetic view.
  
## Attribution
<a href="https://www.flaticon.com/free-icons/split-screen" title="split-screen icons">Split-screen icons created by Freepik - Flaticon</a>
