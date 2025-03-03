# Minh hoạ cho Techaway với chủ đề thuật toán di truyền phối hợp với Neural Network về tìm kiếm chiến lược sinh tồn cho sinh vật trong môi trường thay đổi

## Tác giả: Nguyễn Đức Bảo Lâm

## Phát biểu chủ đề:

Ứng dụng thuật toán di truyền để tối ưu mạng Neural Network vào xác định cá thể mang thông tin tồn tại tốt nhất
trong môi trường biến động

## Phân tích yếu tố:

- **Môi trường thay đổi**: Mô hình hóa môi trường với các biến số thay đổi như là: Nhiệt độ, độ ẩm, ánh sáng, lượng mưa, áp suất khí quyển, tốc độ gió, năng lượng, độ Ph
- **Thông tin mã hoá ở sinh vật**: là một chiến lược sinh tồn ẩn được thể hiện qua mức độ năng lượng, cảm nhận thức ăn, chống lại kẻ thù.

## Về cài đặt thuật toán di truyền:

- **File cấu hình thuật toán** : "resources\database\default_genetic_algorithm_infor.json"
  Trong file lưu trữ thông tin về tỉ lệ đột biến, tỉ lệ phát sinh lai ghép, tỉ lệ loại bỏ cá thể, ngưỡng xác định loại bỏ là ngẫu nhiên hay theo fitness.

- **File cấu hình hàm fitness**: "resources\database\default_weight_fitness.json"
  Trong file lưu trữ trọng số của các thông tin môi trường như: năng lượng, thức ăn, chiến đấu, mưa, áp suất, trở ngại

- **Về mạng Neural Network**:
  File thông tin "core\NeuralNetwork.py"

  Mạng Neural Network được sử dụng như một chiến lược sinh tồn và có thể coi như một cá thể. Mạng này có kiến trúc gồm ba tầng : tầng đầu vào, một tầng ẩn và tầng đầu ra, được sử dụng để đưa ra đáp ứng với môi trường.

  Về mặt tham số:
  input_dim = 8
  output_dim = 3
  hidden_size = 4
  activation_hidden = tanh
  activation_output = sigmoid

  Về mặt công thức triển khai:
  W1 (input_dim, hidden_size)
  W2 (hidden_size, output_dim)
  X (size, input_dim)
  output = sigmoid(tanh(X \* W1.T) \* W2.T)

- **Về cá thể**: Thông tin di truyền là một vector có kích thước input*dim * hidden*size + hidden_size * output_dim

- **Về phương pháp lai**: Là phương pháp lai ghép đoạn giữa hai cá thể được xem như là parent, kết quả cho ra một cá thể con chứa đoạn gen của cả 2

- **Về phương pháp đột biến**: Là phương pháp đột biến điểm, thay đổi giá trị bằng một giá trị ngẫu nhiên trong khoảng (-1, 1)

## Thực thi ví dụ

- Chỉ muốn chạy thuật toán cơ bản: python run_algorithm_local.py
