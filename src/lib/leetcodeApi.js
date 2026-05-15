/**
 * LeetCode API utilities to fetch problem descriptions
 */

export async function fetchProblemDescription(slug) {
  try {
    console.log('📥 Fetching problem:', slug)
    
    const query = `
      query getProblem($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          title
          titleSlug
          difficulty
          content
          exampleTestcases
          categoryTitle
          topicTags {
            name
            slug
          }
        }
      }
    `

    // Using Vite proxy to bypass CORS (dev server forwards to LeetCode)
    const response = await fetch('/api/leetcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { titleSlug: slug },
      })
    })

    console.log('📊 Response status:', response.status, response.statusText)
    
    if (!response.ok) {
      console.error('❌ API request failed:', response.status, response.statusText)
      const text = await response.text()
      console.error('Response body:', text)
      return null
    }

    const data = await response.json()
    console.log('📦 Response data:', data)

    if (data.errors) {
      console.error('❌ GraphQL Error:', JSON.stringify(data.errors, null, 2))
      return null
    }

    const question = data.data?.question
    if (!question) {
      console.warn('⚠️ No question data found for slug:', slug)
      console.log('📋 Available data:', data.data)
      return null
    }

    // Clean the content immediately
    if (question.content) {
      question.content = cleanHtmlContent(question.content)
      console.log('✅ Fetched problem:', question.title, 'Content length:', question.content.length)
    } else {
      console.warn('⚠️ No content in question:', question.title)
    }

    return question
  } catch (error) {
    console.error('❌ Error fetching problem description:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    })
    return null
  }
}

/**
 * Clean HTML content from LeetCode (removes HTML tags, preserves formatting)
 */
export function cleanHtmlContent(html) {
  if (!html) return ''
  
  let text = html
    // Add line breaks before removing tags for better formatting
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<\/div>/gi, '')
    .replace(/<\/blockquote>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/pre>/gi, '\n')
    .replace(/<strong>/gi, '')
    .replace(/<\/strong>/gi, '')
    .replace(/<em>/gi, '')
    .replace(/<\/em>/gi, '')
    .replace(/<b>/gi, '')
    .replace(/<\/b>/gi, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // HTML named entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    // HTML numeric entities (decimal)
    .replace(/&#39;/g, "'")
    .replace(/&#34;/g, '"')
    .replace(/&#38;/g, '&')
    .replace(/&#60;/g, '<')
    .replace(/&#62;/g, '>')
    .replace(/&#160;/g, ' ')
    // Decode other numeric entities
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(parseInt(dec, 10)))
    // Decode hex entities
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)))
    // Clean up whitespace
    .replace(/\n\n\n+/g, '\n\n') // Normalize to max 2 newlines
    .replace(/  +/g, ' ') // Multiple spaces to single
    .trim()
  
  return text
}

/**
 * Get topic tags from problem
 */
export function getTopicTags(question) {
  if (!question?.topicTags) return []
  return question.topicTags.map(tag => tag.name)
}
