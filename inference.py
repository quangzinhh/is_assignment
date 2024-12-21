# -*- coding: utf-8 -*-
import sys
import json
import joblib
import re
import unicodedata
import io
import underthesea
from underthesea import word_tokenize

# Ensure UTF-8 encoding for output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def custom_tokenizer(text):
    tokens = word_tokenize(text)
    return tokens


model = joblib.load('svm_model.pkl')
tfidf_vectorizer = joblib.load('tfidf_vectorizer.pkl')
scaler = joblib.load('scaler.pkl')

VIETNAMESE_STOPWORDS = set([
    "là", "của", "và", "có", "cho", "với", "lại", "được", "mà", "này",
    "nên", "thì", "làm", "ở", "ra", "vậy", "đây", "đó", "như", "để"])

# Text preprocessing
def clean_vietnamese_text(text):
    text = unicodedata.normalize('NFC', text)
    text = re.sub(r"<.*?>", "", text)  # Remove HTML tags
    text = re.sub(r"http\S+|www\.\S+", "", text)  # Remove links (http, https, www)
    text = re.sub(r"[^a-zA-Záàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ\s]", "", text)  # Remove special characters and numbers
    text = text.lower()  # Convert to lowercase
    # Remove stopwords
    words = text.split()
    words = [word for word in words if word not in VIETNAMESE_STOPWORDS]
    text = " ".join(words)
    text = re.sub(r'\s+', ' ', text).strip()  # Remove redundant whitespace

    return text

try:
    # Load models
    model = joblib.load('svm_model.pkl')
    tfidf_vectorizer = joblib.load('tfidf_vectorizer.pkl')
    scaler = joblib.load('scaler.pkl')

    # Get input data
    input_data = json.loads(sys.argv[1])
    new_content = input_data['content']

    # Normalize Unicode input
    new_content = unicodedata.normalize('NFC', new_content)

    # Preprocess the new content
    cleaned_content = clean_vietnamese_text(new_content)
    tokenized_content = word_tokenize(cleaned_content)

    # Transform using TF-IDF and scale
    new_content_tfidf = tfidf_vectorizer.transform([cleaned_content])
    new_content_normalized = scaler.transform(new_content_tfidf.toarray())

    # Predict the topic
    predicted_topic = model.predict(new_content_normalized)[0]

    # Print the predicted topic
    print(predicted_topic)

except Exception as e:
    print(f"Error: {str(e)}")
    sys.exit(1)
