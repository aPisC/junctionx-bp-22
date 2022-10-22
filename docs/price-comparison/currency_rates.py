import json
import requests

url = "https://api.sandbox.transferwise.tech/v1/rates"
headers = {"Authorization": "Bearer 2070d7e8-778e-4727-a7e3-ceab6b9ac8fa"}

response = requests.get(url, headers=headers)

with open("docs/price-comparison/rates.json", "w") as outfile:
    json.dump(response.json(), outfile)

print(response.status_code)