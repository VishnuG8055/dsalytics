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

        // Filter for "Accepted" problems and extract difficulty
        const solvedData = data.stat_status_pairs
          .filter(pair => pair.status === 'ac')
          .map(pair => {
             const level = pair.difficulty.level;
             return {
                slug: pair.stat.question__title_slug,
                difficulty: level === 1 ? 'Easy' : (level === 2 ? 'Medium' : 'Hard'),
                problem_number: pair.stat.frontend_question_id
             }
          });

        const slugs = solvedData.map(p => p.slug);
        const difficulties = solvedData.map(p => p.difficulty);
        const problemNumbers = solvedData.map(p => p.problem_number);

        sendResponse({ success: true, count: slugs.length, slugs: slugs, difficulties: difficulties, problemNumbers: problemNumbers });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });

    // Return true to indicate we wish to send a response asynchronously
    return true;
  }
});
