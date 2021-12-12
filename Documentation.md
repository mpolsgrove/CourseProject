Indexed Search Documentation

Code function

This is a firefox browser extension intended to allow a user to search over each sentence in a page and highlight the 5 sentences that are determined to be the most relevant to the search query with the BM25 algorithm. 
If a page has fewer than five sentences, all sentences will be highlighted. 

Implementation details

The code for this extension is split into a few files. The popup directory contains the html and css for the extension's popup, as well as the code to manage user interaction with the popup. The bulk of the code is under
the content scripts directory in index.js. This code takes a query string and retrieves all text on the page. It then splits the text into sentences, which serve as the documents for the BM25 algorithm. All documents are then
scored based on their relevance to the query. The top five documents are marked as relevant. Then the page is updated with the relevant sentences highlighted.

Usage details

This extension can be installed in firefox by loading it using the debug tools. After downloading the search page directory from this repository, open firefox. Select More Tools from options, then Remote Debugging. 
Under This Firefox, there is a button to load a temporary add-on. Through this dialogue, navigate to the search page directory and select the manifest.json file. This will load the extension into Firefox, which can then be
used by selecting the index search button in the extensions bar. From there a popup allows the user to search the page. More detail can be found at: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension.

Team distribution

As I was the only member of this team, all of the work was perfomed by me.
