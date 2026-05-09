const SUPABASE_URL = 'https://bkzclnojnbiaqtkkjcwb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJremNsbm9qbmJpYXF0a2tqY3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNzQ0NjgsImV4cCI6MjA5Mzg1MDQ2OH0.x3gdNk0RXVMWrXUK1F_SuJ-PGhDRH6olDSoEP-Tmboc';

document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.getElementById('syncToken');
  const syncBtn = document.getElementById('syncBtn');
  const statusDiv = document.getElementById('status');

  // Load saved token on startup
  chrome.storage.local.get(['dsalytics_sync_token'], (result) => {
    if (result.dsalytics_sync_token) {
      tokenInput.value = result.dsalytics_sync_token;
    }
  });

  // Save token whenever it changes
  tokenInput.addEventListener('input', (e) => {
    chrome.storage.local.set({ dsalytics_sync_token: e.target.value.trim() });
  });

  function setStatus(msg, type) {
    statusDiv.textContent = msg;
    statusDiv.className = `status ${type}`;
  }

  syncBtn.addEventListener('click', async () => {
    const token = tokenInput.value.trim();
    if (!token) {
      setStatus('Please enter your Sync Token first.', 'error');
      return;
    }

    setStatus('Checking active tab...', 'info');
    syncBtn.disabled = true;

    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.url.includes('leetcode.com')) {
      setStatus('Error: Please open leetcode.com first!', 'error');
      syncBtn.disabled = false;
      return;
    }

    setStatus('Extracting data from LeetCode...', 'info');

    // Send message to content script
    chrome.tabs.sendMessage(tab.id, { action: "FETCH_LEETCODE_HISTORY" }, async (response) => {
      // If the content script isn't injected yet (e.g. they just installed the extension and didn't refresh leetcode)
      if (chrome.runtime.lastError || !response) {
        setStatus('Please refresh the LeetCode page and try again.', 'error');
        syncBtn.disabled = false;
        return;
      }

      if (!response.success) {
        setStatus(`LeetCode Error: ${response.error}`, 'error');
        syncBtn.disabled = false;
        return;
      }

      const { count, slugs, difficulties, problemNumbers } = response;
      if (count === 0) {
        setStatus('No solved problems found on this account.', 'info');
        syncBtn.disabled = false;
        return;
      }

      setStatus(`Found ${count} solved problems. Saving to DSAlytics...`, 'info');

      // Send to Supabase RPC
      try {
        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/bulk_sync_leetcode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          },
          body: JSON.stringify({
            p_sync_token: token,
            p_title_slugs: slugs,
            p_difficulties: difficulties,
            p_problem_numbers: problemNumbers
          })
        });

        if (!dbRes.ok) {
          const errData = await dbRes.json();
          throw new Error(errData.message || 'Database error');
        }

        setStatus(`Successfully synced ${count} problems!`, 'success');
      } catch (err) {
        setStatus(`Sync Failed: ${err.message}`, 'error');
      } finally {
        syncBtn.disabled = false;
      }
    });
  });
});
