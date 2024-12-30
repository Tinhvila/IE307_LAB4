import json
import random

# Đọc dữ liệu từ file data.json
with open('data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Thêm trường isUpcomingEvent với giá trị True cho 5 sản phẩm ngẫu nhiên
products = data.get("products", [])
print(products)
random.shuffle(products)  # Xáo trộn danh sách sản phẩm
for i, product in enumerate(products):
    product["isUpcomingEvent"] = True if i % 5 == 0 and i != 0 else False
    # Xóa đi trường category và subCategory
    product.pop("category", None)
    product.pop("subCategory", None)

# Ghi lại dữ liệu vào file data.json
with open('data.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print("Đã cập nhật file data.json thành công.!!")
