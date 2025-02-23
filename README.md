# split-screen-tabs
Mozilla Firefox extension to view 2 tabs side by side in a split-screen layout

# Split Screen
This Mozilla Firefox extension allows clicking the extension button to open a Sidebar.  
As Firefox does not support true panels with their own urls, the functionality is implemented using Mozilla-specific sidebar feature.  

- The `manifest.json` opens the `sidebar.html` with `sidebar_action()`.
- The `sidebar.html` shows the list of open tabs, except the active tab, from which the user can select one to load in the sidebar.
- The sidebar is a duplicate view. Closing the original tab will not close the tab loaded in the sidebar.

# Nice to have
Remove the need for manual refresh in the sidebar, and update the `sidebar.html` dynamically.  
