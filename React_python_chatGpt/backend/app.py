from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Set OpenAI API key
openai.api_key = "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" #put your own OpenAI API key here

# Define API endpoint for chatbot
@app.route('/chatbot', methods=['POST'])
def chatbot():
    # Get input text from POST request
    input_text=request.json['obj']
    # input_text = (what is (input))
    print(input_text)
    # Call OpenAI's GPT-3 API to get response
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=input_text,
        max_tokens=1024,
        temperature=0.7,
    )

    # Extract response text from API response
    response_text = response.choices[0].text.strip()
    # print(response.choices[0].text.strip())
  
    # Return response text as JSON
    return jsonify({'response': response_text})
# print({'response'})
