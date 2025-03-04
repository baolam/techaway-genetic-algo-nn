from core.Creature import Creature
from core.Environment import Environment
from core.ga.fitness import fitness_function
from core.ga.GeneticAlgorithm import GeneticAlgorithm

num_creatures = int(input("Hãy nhập số lượng cá thể: "))

creatures = [ Creature(str(_id + 1)) for _id in range(num_creatures) ]
environemt = Environment()

def interpret_creature(creature_id):
    idx = int(creature_id) - 1
    creature = creatures[idx]
    infor = creature.survive(environemt.input_params())
    fitness = fitness_function(environemt, infor)
    
    food_sense, energy_level, should_fight = infor
    print("-----------------------------------------")
    print(f"Cá thể mang ID: {creature_id}")
    print(f"Khả năng cảm nhận thức ăn: {food_sense * 100:.2f}%")
    print(f"Khả năng tiêu thụ năng lượng: {energy_level * 100:.2f}%")
    print(f"Ngưỡng tấn công khi gặp kẻ thù: {should_fight * 100:.2f}%")
    print(f"Điểm số thích nghi: {fitness}")
    print("-----------------------------------------")
    print()

def update_environment_infor():
    def get_infor(low, high, msg):
        if low is None:
            low = float('-inf')
        if high is None:
            high = float('inf')
        value = float(input("Nhập giá trị cho {}: ".format(msg)))
        while value < low or value > high:
            value = float(input("Giá trị nhập vào không hợp lệ. Vui lòng nhập lại... Giá trị là: "))
        return value

    temperature = get_infor(0, 100, "nhiệt độ")
    humidity = get_infor(0, 100, "độ ẩm")
    percen_foods = get_infor(0, 1, "mức độ thức ăn")
    rainfall = get_infor(0.5, None, "lượng mưa")
    atmos_pressure = get_infor(840, None, "áp suất khí quyển")
    wind_speed = get_infor(0, None, "tốc độ gió")
    ph = get_infor(0, 14, "pH")
    energy = get_infor(0, None, "năng lượng tối đa của môi trường")

    environemt.update_temperature(temperature)
    environemt.update_humidity(humidity)
    environemt.update_percentage_food(percen_foods)
    environemt.update_rainfall(rainfall)
    environemt.update_atmospheric_pressure(atmos_pressure)
    environemt.update_wind_speed(wind_speed)
    environemt.update_ph(ph)
    environemt.update_energy(energy)

def run_algorithm(num_generations, storage_folder, skip_storage : bool = True):
    fitnesses = []
    def on_fitness_infor(infor, generation):
        fitnesses.append(infor["best_fitness"])

    ga = GeneticAlgorithm(creatures, environemt)
    ga.run_through_generation(num_generations, storage_folder, show=True, skip_storage=skip_storage, on_callback_step=on_fitness_infor)
    return fitnesses


num_generations = int(input("Hãy nhập số lượng thế hệ: "))
update_environment_infor()

skip_storage = input("Cho phép tạo folder lưu trữ hay không? [Y/N]: ").upper()
while skip_storage != "Y" and skip_storage != "N":
    skip_storage = input("Lựa chọn không hợp lệ. Vui lòng nhập lại").upper()
if skip_storage == "Y":
    storage_folder = input("Hãy nhập tên thư mục lưu trữ: ")
    skip_storage = False
else:
    storage_folder = "haha"
    skip_storage = True

fitnesses = run_algorithm(num_generations, storage_folder=storage_folder, skip_storage=skip_storage)

print("Hiển thị biểu đồ thích nghi")
import matplotlib.pyplot as plt
plt.title("Biểu đồ hiển thị sự thay đổi của điểm thích nghi qua các thế hệ")
plt.xlabel("Thế hệ")
plt.ylabel("Điểm thích nghi")
plt.plot(fitnesses)
plt.show()
print()

while True:
    print("1. Tìm hiểu thông tin môi trường")
    print("2. Tìm hiểu thông tin sinh vật")
    print("3. Thoát")

    menu = int(input("Nhập mã lệnh: "))
    if menu == 1:
        print(f"Thông tin nhiệt độ: {environemt.temperature}")
        print(f"Thông tin độ ẩm: {environemt.humidity}")
        print(f"Thông tin mức độ thức ăn: {environemt.percen_foods}")
        print(f"Thông tin lượng mưa: {environemt.rainfall}")
        print(f"Thông tin áp suất khí quyển: {environemt.atmos_pressure}")
        print(f"Thông tin tốc độ gió: {environemt.wind_speed}")
        print(f"Thông tin pH: {environemt.ph}")
        print(f"Thông tin năng lượng tối đa: {environemt.energy}")
        print()
    elif menu == 2:
        creature_id = int(input("Nhập id của cá thể: "))
        while creature_id <= 0 or creature_id > num_creatures:
            creature_id = int(input("Nhập id của cá thể: "))
        interpret_creature(str(creature_id))
    elif menu == 3:
        break
    else:
        print("Lệnh không hợp lệ. Vui lòng nhập lại!")
