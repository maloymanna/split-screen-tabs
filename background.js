// Handle extension button click
browser.action.onClicked.addListener(() => {
  browser.sidebarAction.open();
});