from asyncore import write
import json
import csv

labels = {
    "NAME": "Name",
    "place": "place_id",
    "state": "state_id",
    "DP02_0088E": "Total Population",
    "DP03_0062E": "Median Household Income",
    "DP03_0088E": "Per capita income",
    "DP05_0005PE": "Under 5yo %",
    "DP05_0019PE": "Under 18yo %",
    "DP05_0029PE": "Over 65yo %",
    "DP05_0003PE": "Female %",
    "DP05_0064PE": "White %",
    "DP05_0065PE": "Black or African American %",
    "DP05_0066PE": "American Indian and Alaska Native %",
    "DP05_0067PE": "Asian %",
    "DP05_0068PE": "Native Hawaiian and Other Pacific Islander %",
    "DP05_0035PE": "Two or more races %",
    "DP05_0071PE": "Hispanic or Latino %",
    "DP05_0077PE": "White alone, not Hispanic or Latino %",
    "DP02_0094PE": "Foreign born %",
    "DP04_0001E": "Total Housing Units",
    "DP04_0046E": "Owner-occupied Housing Units",
    "DP04_0089E": "Median value of owner-occupied housing units",
    "DP04_0101E": "Median selected monthly owner costs - with mortgage",
    "DP04_0109E": "Median selected monthly owner costs - without mortgage",
    "DP04_0134E": "Median gross rent",
    "DP02_0001E": "Total households",
    "DP02_0016E": "Persons per household",
    "DP02_0080PE": "Living in the same house 1 year ago %",
    "DP02_0114PE": "Language other than English spoken at home %",
    "DP02_0153PE": "Households with computer %",
    "DP02_0154PE": "Households with internet %",
    "DP02_0067PE": "High school graduate or higher %",
    "DP02_0068PE": "Bachelor's degree or higher %",
    "DP02_0076PE": "18-64yo with disability %",
    "DP03_0099PE": "Without health insurance %",
    "DP03_0002PE": "In labor force over 16yo %",
    "DP03_0011PE": "In labor force females over 16yo %",
    "DP03_0025E": "Mean travel time to work (minutes)",
    "DP03_0128PE": "People in poverty %"
}

with open("saved_data.json") as f:
    data = json.load(f)

list_of_dicts = []
for place in list(data.values())[1:]:
    list_of_dicts.append(place)

with open("census_data.csv", 'w', newline='') as file:
    # writes to a csv file using dictionary format
    writer = csv.DictWriter(file, fieldnames=list(labels.keys()), restval='')

    # writes header
    writer.writerow(labels)

    # adds all rows
    writer.writerows(list_of_dicts)
