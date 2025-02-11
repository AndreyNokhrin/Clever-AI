import openai

# Replace with your actual OpenAI API key
openai.api_key = "YOUR_API_KEY_HERE"

def generate_insight(prompt: str) -> str:
    """
    Generate an AI-driven insight using OpenAI's GPT.
    """
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        temperature=0.7,
        n=1,
    )
    return response.choices[0].text.strip()

if __name__ == "__main__":
    prompt = "Analyze the latest trends in real estate data for AI applications."
    insight = generate_insight(prompt)
    print("Generated Insight:\n", insight)
