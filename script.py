import requests
from bs4 import BeautifulSoup

url = "https://leetcode.com/graphql"

query = """
query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    title
    content
    difficulty
    likes
    dislikes
    topicTags {
      name
    }
  }
}
"""

variables = {
    "titleSlug": "two-sum"
}

response = requests.post(
    url,
    json={
        "query": query,
        "variables": variables
    }
)

data = response.json()

question = data["data"]["question"]

print("TITLE:", question["title"])
print("DIFFICULTY:", question["difficulty"])
print("LIKES:", question["likes"])

print("\nTAGS:")
for tag in question["topicTags"]:
    print("-", tag["name"])

# content comes as HTML
html_content = question["content"]

# convert HTML to plain text
soup = BeautifulSoup(html_content, "html.parser")

print("\nPROBLEM STATEMENT:\n")
print(soup.get_text())