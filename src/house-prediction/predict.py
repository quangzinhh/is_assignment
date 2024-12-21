import sys
import json
import joblib
import numpy as np

# Nhận dữ liệu đầu vào từ NestJS
input_data = json.loads(sys.argv[1])

# Load mô hình học máy đã lưu
model = joblib.load('linear_regression_model.pkl')

# Dự đoán giá nhà
input_array = np.array([input_data['features']])
predicted_price = model.predict(input_array)

# Trả kết quả dự đoán về NestJS
print(predicted_price[0])