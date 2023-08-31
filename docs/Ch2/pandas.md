---
sidebar_position: 1
---

# 2.1 Pandas in Health Informatics

At the heart of many health informatics projects lies Pandas, a robust library for data analysis:
- **Cleaning and Preprocessing Patient Data**: Pandas aids in tackling missing values, outliers, and inconsistencies, ensuring data's reliability.
- **Time Series Data Analysis**: With time-stamped medical results and vitals, Pandas offers tools to uncover trends and patterns in patient history.
- **Merging Datasets**: Whether it's combining lab results with doctor notes or integrating imaging data, Pandas is up to the task.

In this section, awe are going to focus on building our skillset of how to understand the size of the dataset, the number of columns and rows, generating basic descriptive statistics and frequency counts for the appropriate numerical and categorical values, and then some basic cleaning (or known as pre-processing) of the data. 

## Exploring and Understanding Data

Before diving into in-depth analysis, it's crucial to gain a preliminary understanding of the dataset you're working with. Pandas provides a range of functions to help you achieve this.

### Checking Size and Shape

To understand the size and shape of a loaded DataFrame, you can use the `.shape` attribute. This attribute returns a tuple representing the number of rows and columns in the DataFrame.

```python
# Check the size and shape of the DataFrame
print("Number of rows:", data.shape[0])
print("Number of columns:", data.shape[1])
```

### Previewing Data
Pandas' `.head()` and `.tail()` functions allow you to quickly preview the first few or last few rows of the DataFrame, respectively. This is especially useful to get an initial glimpse of the data's structure.

```python
# Display the first 5 rows of the DataFrame
print(data.head())

# Display the last 5 rows of the DataFrame
print(data.tail())
```

### Working with Pandas Columns

Pandas DataFrames have a powerful structure that allows you to access and manipulate data efficiently. Understanding how to work with columns is essential for performing data analysis tasks.

#### DataFrame Indexing: Rows and Columns

A Pandas DataFrame is essentially a two-dimensional table with rows and columns. Each row represents a record, while each column represents a variable or attribute. You can think of it as a spreadsheet or a database table.

#### Accessing Data using Brackets

To access data within a DataFrame, you can use square brackets `[ ]`. You can use brackets to extract specific columns or rows from the DataFrame.

##### Extracting Columns

To extract a specific column from the DataFrame, use the column name enclosed in single or double quotes within square brackets. You can see in the example below, we are first creating a new dataframe called `ages`, which contains only a single column, the column Age from our original dataframe. In the second part, we are creating another new dataframe called `subset` which contains two columns our from original dataframe: Name and Location. 

```python
# Extract the 'Age' column
ages = data['Age']

# Extract multiple columns
subset = data[['Name', 'Location']]
```

Now if you are asking, but how do I know what columns I have? Here are two you can use to find out the names of the columns that are available to you, please remember that you should replace `data` with whatever you have selected as the name of your dataframe, like perhaps `df` if you are going off the standard acronym commonly utilized: 


```python
# Will provide you a list of the columns 
list(data)

# Will give you the names of the columns in a special pandas object, which you can think of as a specialized list 
data.columns
```

##### Extracting Rows
You can also use brackets to filter rows based on conditions.

```python
# Extract rows where Age is greater than 25
filtered_data = data[data['Age'] > 25]
```

### Frequency Counts

Understanding the distribution of values in categorical columns is essential. Pandas' `.value_counts()` function provides a quick way to obtain frequency counts for a specific column.

```python
# Get frequency counts for a categorical column
print(data['Gender'].value_counts())
```

### Descriptive Statistics
Pandas' `.describe()` function generates descriptive statistics for numerical columns. This includes information about the mean, standard deviation, minimum, maximum, and quartiles.

```python
# Generate descriptive statistics for numerical columns
print(data.describe())
```

## Data Cleaning and Preprocessing

Data cleaning and preprocessing are critical steps to ensure the quality and reliability of your analysis. Let's explore some common tasks involved in this process:

### Removing White Space and Special Characters
Whitespace and special characters in column names or values can lead to errors in analysis. Pandas allows you to remove leading and trailing white space from column values using the `.str.strip()` method.

```python
# Remove leading and trailing white space from a column
data['Name'] = data['Name'].str.strip()
```

Now, if you are dealing with a dataset that has potentially hundreds of columns, it is not efficient to go column by column. In this case, we could write a function, and then apply that function to each column name that exists in the dataset. To remove all special characters and white space, which we want to remove because if we want to later send this data to database my MySQL which doesn't allow for special characters or white space in column names, we should deal those issues here. 

There is a built-in python package called [re](https://docs.python.org/3/library/re.html) that enables us to write special syntax that allows us to find and then manipulate characters within a string. 

Below is a example where we have a function that you can re-use to your own data: 

```python
import pandas as pd
import re

# Sample DataFrame with special characters and white space
data = pd.DataFrame({
    'Name': [' John ', 'Alice #', ' Bob !'],
    'Age': [25, 30, 28],
    'Location': ['New York', 'Los Angeles', 'San Francisco !']
})

# Function to remove white space and special characters from a value
def clean_value(value):
    cleaned_value = re.sub(r'\s+|[^a-zA-Z0-9]', '', value)
    return cleaned_value

# Apply the clean_value function to all columns
for column in data.columns:
    data[column] = data[column].apply(clean_value)

print(data)
```


### Handling Missing Values
Missing values are a common issue in real-world datasets. Pandas provides methods like `.isnull()` and `.dropna()` to identify and handle missing values. Additionally, you can use the `.fillna()` method to fill missing values with a specified value.

```python
# Check for missing values in a column
print(data['Age'].isnull().sum())

# Drop rows with any missing values
data.dropna(inplace=True)

# Fill missing values in a column with a specific value
data['Weight'].fillna(0, inplace=True)
```

### Ensuring Data Types
Ensuring that columns have the correct data types is essential. 

#### Checking Data Types

To check the data types of columns in a Pandas DataFrame, you can use the `.dtypes` attribute. This attribute returns a Pandas Series that displays the data type of each column.

```python
# Check data types of columns
data_types = data.dtypes
print(data_types)
```

The output will show the data type of each column, allowing you to quickly verify whether the data types match your expectations.

#### Converting Data Types

Use the `.astype()` method to convert columns to desired data types, and the `.apply()` function to convert columns with specific transformations.

```python
# Convert a column to a specific data type
data['Height'] = data['Height'].astype(float)

# Convert a column using a custom function
def convert_to_percentage(value):
    return value * 100

data['SuccessRate'] = data['SuccessRate'].apply(convert_to_percentage)
```

### Handling Categorical Data
Categorical columns, such as zip codes, should be treated as strings to avoid unintentional numerical operations. Use the `.astype(str)` method to ensure these columns are treated as strings.

```python
# Convert a categorical column to string
data['ZipCode'] = data['ZipCode'].astype(str)
```

Pandas' versatility and functionality make it an indispensable tool for cleaning, preprocessing, and analyzing health informatics data. By using its powerful functions, you can ensure the accuracy and reliability of your insights.

