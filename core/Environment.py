import numpy as np

class Environment:
    """
    A class to represent an environment (consists of parameters)
    """

    def __init__(self):
        self.temperature = 0.2
        self.humidity = 0.5
        self.percen_foods = 0.25
        self.rainfall = 0.25
        self.atmos_pressure = 0.45
        self.wind_speed = 15
        self.ph = 7
        self.energy = 1000

    def input_params(self):
        x = np.array([
            self.temperature, self.humidity, self.percen_foods, self.rainfall, self.atmos_pressure,
            self.wind_speed, self.ph, self.energy
        ])
        return x

    def update_temperature(self, temp):
        if temp < 0:
            return "Nhiệt độ không thể âm!"
        if temp > 100:
            return "Nhiệt độ không quá 100!"
        self.temperature = temp
    
    def update_humidity(self, humidity):
        if humidity < 0:
            return "Độ ẩm không thể âm!"
        if humidity > 100:
            return "Độ ẩm không quá 100%"
        self.humidity = humidity
    
    def update_percentage_food(self, percen):
        if percen < 0:
            return "Tỷ lệ thức ăn không thể âm!"
        if percen > 1:
            return "Tỷ lệ thức ăn không quá 1"
        self.percen_foods = percen
    
    def update_rainfall(self, rainfall):
        if rainfall < 0.5:
            return "Lượng mưa dưới 0.5mm (giá trị nhỏ nhất)"
        # if rainfall > 26000:
        #     return "Lượng mưa trên 26000mm (giá trị lớn nhất)"
        self.rain = rainfall
    
    def update_wind_speed(self, wind_speed):
        if wind_speed < 0:
            return "Tốc độ gió không thể âm!"
        self.wind_speed = wind_speed

    def update_atmospheric_pressure(self, atmos):
        if atmos < 840:
            return "Áp suất không khí dưới 840 hPa (giá trị nhỏ nhất)"
        # if atmos > 1084.8:
        #     return "Áp suất không khí trên 1084.8 hPa (giá trị lớn nhất)"
        self.atmos_pressure = atmos

    def update_ph(self, ph):
        if ph < 0:
            return "Độ PH không thể âm!"
        if ph > 14:
            return "Độ PH không quá 14"
        self.ph = ph
    
    def update_energy(self, energy):
        if energy < 0:
            return "Năng lượng không thể âm!"
        self.energy = energy
    