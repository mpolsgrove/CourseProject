const dummyCSS = "";

function listenForClicks() {
  document.addEventListener("click", (e) => {

    function search_page(tabs) {
      browser.tabs.insertCSS({code: dummyCSS}).then(() => {
        let search_query = document.getElementById("searchInput").value;
        browser.tabs.sendMessage(tabs[0].id, {
          command: "search",
          query: search_query 
        });
      });
   }

    function reportError(error) {
      console.error(`Could not search: ${error}`);
    }


  if (e.target.classList.contains("search")){
    browser.tabs.query({active:true, currentWindow:true})
      .then(search_page)
      .catch(reportError);
  }


    function reportError(error) {
      console.error(`Could not search ${error}`);
    }

  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute search content script: ${error.message}`);
}


browser.tabs.executeScript({file: "/content_scripts/index.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
