// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "FETCH_LEETCODE_HISTORY") {
    
    // We fetch from LeetCode API. Since this runs in the context of leetcode.com, 
    // it automatically includes the user's session cookies!
    fetch('https://leetcode.com/api/problems/all/')
      .then(response => {
        if (!response.ok) throw new Error('Not logged into LeetCode or API failed.');
        return response.json();
      })
      .then(data => {
        if (!data || !data.stat_status_pairs) {
          throw new Error('Invalid data format from LeetCode.');
        }

        // Filter for "Accepted" problems
        const solvedSlugs = data.stat_status_pairs
          .filter(pair => pair.status === 'ac')
          .map(pair => pair.stat.question__title_slug);

        sendResponse({ success: true, count: solvedSlugs.length, slugs: solvedSlugs });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });

    // Return true to indicate we wish to send a response asynchronously
    return true;
  }
});
