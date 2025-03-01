import json
from ..Environment import Environment

def fitness_function(environment : Environment, strategy):
    # Trọng số (có thể điều chỉnh để tối ưu thuật toán)
    with open("./resources/database/default_weight_fitness.json", "rb") as f:
        data = json.load(f)
        
    w_energy = data["w_energy"]
    w_food = data["w_food"]
    w_rain = data["w_rain"]
    w_pressure = data["w_pressure"]
    w_adverse = data["w_adverse"]
    w_fight = data["w_fight"]

    # Lấy thông tin từ môi trường
    temperature = environment.temperature
    humidity = environment.humidity
    rainfall = environment.rainfall
    atmos_pressure = environment.atmos_pressure
    wind_speed = environment.wind_speed
    ph = environment.ph

    # Lấy thông tin từ chiến lược
    food_sense = strategy[0]  # 0 → 1
    energy_level = strategy[1]  # 0 → 1
    should_fight = strategy[2]  # 0 → 1

    # Đánh giá mức độ khắc nghiệt của môi trường (0 → 1)
    adverse_score = (
        ((temperature - 25) / 25) ** 2 +  # Chuẩn hóa nhiệt độ
        ((humidity - 50) / 50) ** 2 +     # Chuẩn hóa độ ẩm
        (wind_speed / 50) ** 2 +          # Giả sử tốc độ gió tối đa là 50
        ((ph - 7) / 7) ** 2               # Chuẩn hóa độ pH
    ) / 4  # Trung bình để đưa về khoảng 0 → 1

    # Tính điểm fitness
    fitness = (
        w_energy * energy_level +
        w_fight * should_fight +
        w_food * food_sense - 
        w_rain * (rainfall / 50000) -  # Chuẩn hóa lượng mưa
        w_pressure * ((1000 - atmos_pressure) / 200) -  # Chuẩn hóa áp suất
        w_adverse * adverse_score
    )

    return fitness
