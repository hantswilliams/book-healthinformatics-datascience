---
sidebar_position: 11
---

# 1.11 Native Python File Handling for Importing Data

Native Python offers a versatile set of tools for extracting, processing, and manipulating raw health data, allowing you to address unique challenges often encountered in healthcare datasets.

## Reading and Writing Text Files

Python's built-in `open()` function enables you to read and write text files, making it valuable for scenarios where data is stored in simple text formats. Health data might be stored in custom text files or logs, and Python's native file handling makes it easy to access this information.

```python
# Reading data from a text file
with open('data.txt', 'r') as file:
    content = file.read()
    
# Writing data to a text file
with open('output.txt', 'w') as file:
    file.write('Hello, health informatics!')
```

## Processing CSV Files

Python's csv module provides functions for reading and writing CSV files, offering more control over the process. This module is valuable when dealing with complex CSV structures or when specific data transformations are required.

```python
import csv

# Reading and processing CSV file
with open('data.csv', 'r') as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        print(row)
        
# Writing data to a CSV file
with open('output.csv', 'w', newline='') as file:
    csv_writer = csv.writer(file)
    csv_writer.writerow(['Name', 'Age', 'Gender'])
    csv_writer.writerow(['Alice', 28, 'Female'])

```

## JSON Handling

Many health datasets are stored in JSON format due to its flexibility in representing structured data. Python's built-in json module allows you to work with JSON data, making it particularly useful for extracting information from APIs, data exports, and more.

```python
import json

# Reading JSON data from a file
with open('data.json', 'r') as file:
    data = json.load(file)

# Writing data to a JSON file
with open('output.json', 'w') as file:
    json.dump(data, file)

```

Python's native file handling capabilities, combined with modules like csv and json provide a solid foundation for working with health data in its raw form. This flexibility enables you to preprocess and extract valuable insights from diverse healthcare datasets.

