document.addEventListener("DOMContentLoaded", () => {
  const tabsList = document.getElementById("tabs-list");
  const refreshLink = document.getElementById("refresh");

  // Function to update the list of tabs in the sidebar
  function updateTabsList() {
    browser.tabs.query({currentWindow: true}).then((tabs) => {
      // Clear the list except for the "Refresh" link
      while (tabsList.children.length > 0) {
        tabsList.removeChild(tabsList.lastChild);
      }

      // Add all open tabs (except the active one) to the list
      tabs.forEach(tab => {
        if (!tab.active) {
          let li = document.createElement("li");
          let a = document.createElement("a");
          a.href = "#";
          // Truncate title to 15 characters and append ellipsis if necessary
          const truncatedTitle = tab.title ? tab.title.slice(0, 15) + (tab.title.length > 15 ? "..." : "") : "Untitled";
          // Extract the hostname from the URL
          const url = new URL(tab.url);
          const hostname = url.hostname.replace(/^www\./, ""); // Remove "www." if present
          // Display the truncated title and hostname in parentheses
          a.textContent = `${truncatedTitle} (${hostname})`;
          a.title = tab.title || tab.url; // Show full title on hover
          a.onclick = () => {
            // Open the clicked tab in the sidebar without changing the active tab
            browser.tabs.update(tab.id, {active: false}).then(() => {
              // Update the sidebar's URL to the clicked tab's URL
              window.location.href = tab.url;
            });
          };
          li.appendChild(a);
          tabsList.appendChild(li);
        }
      });
    });
  }

  // Handle "Refresh" link click
  refreshLink.onclick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    updateTabsList(); // Refresh the list of tabs
  };

  // Initial update of the tabs list
  updateTabsList();
});