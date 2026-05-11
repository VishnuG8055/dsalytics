import requests
import json

username = "GV2023000810"   # change username here

url = "https://leetcode.com/graphql"

query = """
query userProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      ranking
      reputation
      realName
      aboutMe
      userAvatar
      countryName
      school
      company
      skillTags
    }

    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }

    languageProblemCount {
      languageName
      problemsSolved
    }

    tagProblemCounts {
      advanced {
        tagName
        problemsSolved
      }
      intermediate {
        tagName
        problemsSolved
      }
      fundamental {
        tagName
        problemsSolved
      }
    }
  }

  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
  }

  recentSubmissionList(username: $username) {
    title
    titleSlug
    timestamp
    statusDisplay
    lang
  }
}
"""

variables = {
    "username": username
}

response = requests.post(
    url,
    json={
        "query": query,
        "variables": variables
    }
)

data = response.json()

# pretty print full response
print(json.dumps(data, indent=4))