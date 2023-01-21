import json
import random
from faker import Faker

fake = Faker()
data = {}

for i in range(200000):
    data[fake.random_int()] = fake.random_elements(elements=(fake.name(), fake.address(), fake.text()), length=random.randint(1,3))

with open("file.json", "w") as outfile:
    json.dump(data, outfile)

