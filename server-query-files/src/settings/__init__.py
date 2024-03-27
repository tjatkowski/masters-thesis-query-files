import json

filepath = 'local_storage/index_settings.json'


def load_data():
    """Helper function to load data from the JSON file, creating the file if it doesn't exist."""
    try:
        with open(filepath, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        with open(filepath, 'w') as file:  # Create the file if it doesn't exist
            json.dump([], file)  # Initialize the file with an empty list
        return []


def save_data(data):
    """Helper function to save data to the JSON file."""
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)


def create_settings(index_id, new_settings):
    """Creates a new settings in the list inside the JSON file."""
    data = load_data()
    for i, obj in enumerate(data):
        if obj['index_id'] == index_id:
            data[i] = {**new_settings, 'index_id': index_id}
            save_data(data)
            return True
    data.append({**new_settings, 'index_id': index_id})
    save_data(data)
    return True


def update_settings(index_id, updated_values):
    """Updates a settings identified by index_id with provided values."""
    data = load_data()
    for obj in data:
        if obj['index_id'] == index_id:
            obj.update(updated_values)
            save_data(data)
            return True
    return False


def read_settings(index_id):
    """Returns the settings identified by index_id from the list."""
    data = load_data()
    for obj in data:
        if obj['index_id'] == index_id:
            return obj
    return f"Error: Object with index_id {index_id} does not exist."


def delete_settings(index_id):
    """Removes a settings identified by index_id from the list."""
    data = load_data()
    initial_length = len(data)
    data = [obj for obj in data if obj['index_id'] != index_id]
    if len(data) < initial_length:
        save_data(data)
        return True
    else:
        return False
