import json
from tkinter import Variable

def save_data():

    # reads the text of the API response
    with open("response.txt") as f:
        text = f.read()
        new_data = json.loads(text)

    # opens the saved data dictionary
    with open("saved_data.json") as f:
        saved_data = json.load(f)

    # gets list of variable names from data
    variables = new_data[0]

    # checks that "place" is that last variable (checks that the API request had the right geography level)
    if variables[-1] != "place":
        return "no place"

    # gets the variables already saved
    old_variables = saved_data["variables"]
    
    # finds what variables are new
    new_variables = []
    for i in range(len(variables)):
        variable = variables[i]

        if variable not in old_variables:
            new_variables.append(i)
    
    # adds every row of data to the dictionary
    for row in new_data[1:]:
        # gets the place from the row
        place = row[-1]

        # adds an entry if the place in new
        if place not in saved_data:
            saved_data[place] = {}

            # adds all availble variables to the new place
            for i in range(len(variables)):
                saved_data[place][variables[i]] = row[i]

        # if the place is already saved it only adds new values        
        else:
            for i in new_variables:
                saved_data[place][variables[i]] = row[i]

    # saves updated dictionary
    with open("saved_data.json", 'w') as f:
        json.dump(saved_data, f)

    return "success"

print(save_data())
