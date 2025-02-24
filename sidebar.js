document.addEventListener("DOMContentLoaded", () => {
  const tabsList = document.getElementById("tabs-list");

  // Function to update the list of tabs in the sidebar
  function updateTabsList() {
    browser.tabs.query({ currentWindow: true }).then((tabs) => {
      // Clear the list
      tabsList.innerHTML = '';

      if (tabs.length === 0) {
        // Display a message if no tabs are open
        const li = document.createElement("li");
        li.textContent = "No tabs open";
        li.style.color = "gray";
        tabsList.appendChild(li);
      } else {
        // Add all open tabs (including the active one) to the list
        tabs.forEach(tab => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = "#";
          // Truncate title to 20 characters and append ellipsis if necessary
          const truncatedTitle = tab.title ? tab.title.slice(0, 20) + (tab.title.length > 20 ? "..." : "") : "Untitled";
          // Extract the hostname from the URL
          const url = new URL(tab.url);
          const hostname = url.hostname.replace(/^www\./, ""); // Remove "www." if present
          // Display the truncated title and hostname in parentheses
          a.innerHTML = `${truncatedTitle} <span class="url">(${hostname})</span>`;
          a.title = tab.title || tab.url; // Show full title on hover
          a.onclick = () => {
            // Open the clicked tab in the sidebar without changing the active tab
            browser.tabs.update(tab.id, { active: false }).then(() => {
              // Update the sidebar's URL to the clicked tab's URL
              window.location.href = tab.url;
            });
          };
          li.appendChild(a);
          tabsList.appendChild(li);
        });
      }
    });
  }

  // Listen for tab creation, updates, removal, and activation to dynamically update the list
  browser.tabs.onCreated.addListener(updateTabsList);
  browser.tabs.onUpdated.addListener(updateTabsList);
  browser.tabs.onRemoved.addListener(updateTabsList);
  browser.tabs.onActivated.addListener(updateTabsList);

  // Initial update of the tabs list
  updateTabsList();
});