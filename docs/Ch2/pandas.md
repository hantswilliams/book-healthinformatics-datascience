---
sidebar_position: 1
---

# 2.1 Pandas for Processing and Cleaning Small to Medium Sized Data

At the heart of many health informatics projects lies Pandas, a robust library for data analysis. It facilitates data cleaning and preprocessing tasks, aiding in the handling of missing values, outliers, and inconsistencies, which enhances the overall reliability of the data. With features specifically designed for time-stamped medical information and vitals, Pandas is well-suited for uncovering trends and patterns in patient history through time series data analysis. Additionally, Pandas proves its effectiveness in merging datasets, whether it involves combining lab results with physician notes or integrating various forms of imaging data. The library's flexibility and functionality make it a powerful tool in the realm of health informatics.

Lastly, when working with health informatics data, the choice of data analysis tool should align with the dataset's size to ensure optimal processing and analysis. For small to medium-sized datasets where the data can comfortably fit into memory, Pandas is a reliable choice. Pandas is a versatile library suitable for managing small to medium-sized health informatics datasets. Typically, small datasets might encompass up to 100,000 records, and medium-sized datasets could extend to a few million records. Pandas efficiently handles data manipulation, exploration, and basic analysis on these scales. However, as data sizes increase beyond these thresholds, performance bottlenecks can arise due to Pandas' single-threaded processing and memory limitations.

## Understanding Your Data Frame First Through Meta Data

Before delving into complex analyses, creating pivot tables, or extracting meaningful insights, it's imperative to acquire a preliminary comprehension of your dataset's structure and attributes. 

Pandas offers a diverse set of functions designed to facilitate this initial exploration. By leveraging metadata-driven operations, you can efficiently inspect the underlying characteristics of your DataFrame, such as its shape, data types, and basic statistical summaries. This crucial step forms the foundation for subsequent data manipulation and analysis tasks, enabling you to make informed decisions and extract valuable insights from your healthcare dataset.

### Checking Size and Shape

To understand the size and shape of a loaded DataFrame, you can use the `.shape` attribute. This attribute returns a tuple representing the number of rows and columns in the DataFrame.

```python
# Check the size and shape of the DataFrame
print("Number of rows:", data.shape[0])
print("Number of columns:", data.shape[1])
```
## Row Uniqueness and Identifiers
In healthcare data, each row may represents a unique entity, such as a patient, medical visit, or treatment. It's essential to identify the unique identifier that distinguishes each entity. For instance, in a patient dataset, the Medical Record Number (MRN) could serve as the unique identifier. Knowing whether each row corresponds to a distinct entity or if there are duplicates helps prevent erroneous conclusions during analysis.

Understanding the consistency of representations across rows is critical. For healthcare data, consistency could mean ensuring that the same patient, medical condition, or hospital is consistently represented throughout the dataset. Inaccuracies or variations in these representations can lead to misleading analyses and erroneous decision-making.

Consider a dataset containing patient medical records. Each row may represent a patient visit to a hospital. The unique identifier might be the Visit ID. By confirming the uniqueness of each visit and verifying that patients, medical procedures, and diagnoses are consistently represented, you establish a solid foundation for meaningful analyses. 

Consider a dataframe called `patients_table`, where each row is a unique patient, and the columns represent different sociodemographic attributes associated with that patient. While in a `medicaitons_table`, each row is not a unique patient, but a unique combination of patient (identified by column `MRN`) + medication (identified by column `NDC`), so the same patient may be represented across many different rows within the dataframe. The same could also be true for a `encounters` table or dataframe, where it is the combination of a unique ID for patient, and a unique encounter ID, that makes a row 'unique'. 

In order to understand this, we can preview the data to get an understanding. 

### Previewing Data

A simple yet effective approach to understand the semantics of your DataFrame is to preview the data. Pandas offers methods like `.head()`, `.tail()`, and `.sample()` to display a subset of rows. This can help you visually assess the structure of the dataset, identify unique identifiers, and check for consistency.

```python
# Display the first 20 rows of the DataFrame
print(data.head(20))

# Display the last 5 rows of the DataFrame
print(data.tail(5))

# Display a random sample of 10 rows from the DataFrame
print(data.sample(10))
```

By previewing the data, you can quickly gauge the composition of your dataset and gain insights into what each row represents. This understanding is crucial for informed and accurate analyses.

Consider a dataset containing patient medical records. Each row represents a patient visit to a hospital. The unique identifier might be the Visit ID. By confirming the uniqueness of each visit and verifying that patients, medical procedures, and diagnoses are consistently represented, you establish a solid foundation for meaningful analyses. Incorrect interpretations could arise if duplicate visits or inconsistent data representations are not addressed.

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

Data cleaning and preprocessing serve as foundational pillars in ensuring the accuracy, reliability, and meaningfulness of your analyses. Effective data cleaning not only eradicates inconsistencies and inaccuracies but also paves the way for accurate interpretation and decision-making. Here are some essential tasks to consider when preparing your healthcare dataset:

**Column Names and Consistency:** Start by ensuring clear, descriptive, and standardized column names. Meaningful column names enhance clarity and understanding, making it easier for you and your team to collaborate effectively. Inconsistent or confusing column labels can lead to misunderstandings and hinder your analysis.

**Handling Special Characters:** Special characters and spaces within column names can lead to syntax errors and difficulties in code execution. Eliminate special characters and replace spaces with underscores to maintain compatibility across different analysis tools.

**Managing Null Values:** Null values or missing data are common in healthcare datasets. Understanding the nature of missingness and employing appropriate strategies, such as imputation or exclusion, is essential. Ignoring or mishandling missing values can lead to skewed results and inaccurate conclusions.

**Data Types and Conversion:** Ensure that data types are correctly assigned to each column. Incorrect data types can impede analysis and lead to unexpected errors. Convert data types as needed, ensuring consistency and accuracy throughout your analysis.

**Removing Duplicates:** Duplicate records can skew statistical calculations and distort patterns. Identify and remove duplicate rows based on appropriate criteria to prevent misleading results.

**Outlier Detection and Treatment:** Healthcare data can sometimes include outliers that affect statistical measures. Identifying outliers and deciding whether to retain, transform, or remove them depends on the context of your analysis and domain knowledge.

By addressing these fundamental data cleaning tasks, you establish a solid foundation for subsequent analyses and ensure that your conclusions are based on accurate, reliable, and trustworthy insights. Always approach data cleaning as an iterative process, continuously refining your approach as you gain deeper insights into your healthcare dataset.

### Removing White Space and Special Characters
Whitespace and special characters in column names or values can lead to errors in analysis. Pandas allows you to remove leading and trailing white space from column values using the `.str.strip()` method.

```python
# Remove leading and trailing white space from a column
data['Name'] = data['Name'].str.strip()
```

If you have a dataset with numerous columns, you can create a reusable function to remove special characters and white space. The built-in [re](https://docs.python.org/3/library/re.html) package enables you to find and manipulate characters within a string. The following example demonstrates how to use the clean_value function to remove special characters and white space from multiple columns:


```python
import pandas as pd
import re

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

Ensuring that columns have the correct data types is essential. You can check the data types of columns using the `.dtypes` attribute and convert columns to desired data types using the `.astype()` method.

**Checking Data Types**:
```python
# Check data types of columns
data_types = data.dtypes
print(data_types)
```

**Converting Data Types**:
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

### Removing Duplicates and Outlier Detection and Treatment

Ensuring the integrity of your data involves identifying and addressing duplicate entries and outliers. Duplicates can skew analyses and lead to inaccurate conclusions. Pandas provides functions to detect and remove duplicates:

```python
# Identify and remove duplicate rows
data.drop_duplicates(inplace=True)
```

Outliers are extreme data points that can distort statistical analyses. Detecting and addressing outliers is particularly crucial in healthcare, where data anomalies can impact patient outcomes and research results. You can use statistical methods, such as the Z-score, or domain knowledge to identify outliers. Alongside Pandas, the widely-used NumPy library provides powerful numerical and mathematical tools that can enhance the accuracy and effectiveness of outlier detection and analysis. We will explore more examples of NumPy's capabilities later. 

```python
import numpy as np

# Calculate the Z-score for a column
z_scores = np.abs((data['Value'] - data['Value'].mean()) / data['Value'].std())

# Define a threshold for outlier detection
threshold = 3

# Identify and treat outliers
outliers = data[z_scores > threshold]
data = data[z_scores <= threshold]
```

By identifying and removing duplicates and outliers, you ensure that your analysis is based on reliable and accurate data, leading to more meaningful insights in healthcare research and decision-making.

---

Pandas' versatility and functionality make it an indispensable tool for cleaning, preprocessing, and analyzing health informatics data. By using its powerful functions, you can ensure the accuracy and reliability of your insights.

