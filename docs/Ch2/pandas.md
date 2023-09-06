---
sidebar_position: 1
---

# 2.1 Pandas for Processing and Cleaning Small to Medium Sized Data

At the heart of many health informatics projects lies Pandas, a robust library for data analysis. It facilitates data cleaning and preprocessing tasks, aiding in the handling of missing values, outliers, and inconsistencies, which enhances the overall reliability of the data. With features specifically designed for time-stamped medical information and vitals, Pandas is well-suited for uncovering trends and patterns in patient history through time series data analysis. Additionally, Pandas proves its effectiveness in merging datasets, whether it involves combining lab results with physician notes or integrating various forms of imaging data. The library's flexibility and functionality make it a powerful tool in the realm of health informatics.

Lastly, when working with health informatics data, the choice of data analysis tool should align with the dataset's size to ensure optimal processing and analysis. For small to medium-sized datasets where the data can comfortably fit into memory, Pandas is a reliable choice. Pandas is a versatile library suitable for managing small to medium-sized health informatics datasets. Typically, small datasets might encompass up to 100,000 records, and medium-sized datasets could extend to a few million records. Pandas efficiently handles data manipulation, exploration, and basic analysis on these scales. However, as data sizes increase beyond these thresholds, performance bottlenecks can arise due to Pandas' single-threaded processing and memory limitations.

## Understanding Your Data Frame First Through Meta Data

Before delving into complex analyses, creating pivot tables, or extracting meaningful insights, it's imperative to acquire a preliminary comprehension of your dataset's structure and attributes. 

Pandas offers a diverse set of functions designed to facilitate this initial exploration. By leveraging metadata-driven operations, you can efficiently inspect the underlying characteristics of your DataFrame, such as its shape, data types, and basic statistical summaries. This crucial step forms the foundation for subsequent data manipulation and analysis tasks, enabling you to make informed decisions and extract valuable insights from your healthcare dataset.

Lets first create a fake dataset to play with:

```python

import pandas as pd
from faker import Faker
import random
from tabulate import tabulate

# Initialize faker
fake = Faker()

# Number of records
num_patients = 100

# Generate data
data = {
    'PatientID': [i for i in range(1, num_patients + 1)],
    'Gender': [fake.random_element(elements=('Male', 'Female')) for _ in range(num_patients)],
    'Name': [fake.name() for _ in range(num_patients)],
    'Age': [fake.random_int(min=1, max=100) for _ in range(num_patients)],
    'Diseases': [fake.random_element(elements=('Diabetes', 'Hypertension', 'Asthma', 'None')) for _ in range(num_patients)],
    'AvgHR': [fake.random_int(min=60, max=100) for _ in range(num_patients)],
    'AvgBP': [f"{random.randint(90, 140)}/{random.randint(60, 90)}" for _ in range(num_patients)],
    'City': [fake.city() for _ in range(num_patients)],
    'State': [fake.state() for _ in range(num_patients)],
    'Zipcode': [fake.zipcode() for _ in range(num_patients)],
    'LastVisit': [fake.date_this_decade() for _ in range(num_patients)]
}

# Convert to DataFrame
data = pd.DataFrame(data)

print(tabulate(data.sample(5), headers='keys', tablefmt='grid'))

```

**Expected dataframe model:**

```text

+----+-------------+----------+--------------------+-------+--------------+---------+---------+------------------+------------+-----------+-------------+
|    |   PatientID | Gender   | Name               |   Age | Diseases     |   AvgHR | AvgBP   | City             | State      |   Zipcode | LastVisit   |
+====+=============+==========+====================+=======+==============+=========+=========+==================+============+===========+=============+
| 17 |          18 | Female   | Alyssa Murphy      |    13 | Diabetes     |      73 | 102/80  | Hendersonfurt    | Nevada     |     58192 | 2021-08-09  |
+----+-------------+----------+--------------------+-------+--------------+---------+---------+------------------+------------+-----------+-------------+
| 75 |          76 | Male     | Nicole Mitchell MD |     4 | Hypertension |      75 | 119/73  | Stevenstown      | New Jersey |     69483 | 2022-11-10  |
+----+-------------+----------+--------------------+-------+--------------+---------+---------+------------------+------------+-----------+-------------+
| 43 |          44 | Male     | Rebecca Johnson    |    59 | Hypertension |      94 | 117/73  | Morganville      | Georgia    |     06407 | 2020-06-23  |
+----+-------------+----------+--------------------+-------+--------------+---------+---------+------------------+------------+-----------+-------------+
| 88 |          89 | Male     | Richard Wade       |    39 | Asthma       |      90 | 119/75  | East Mallory     | Maryland   |     55890 | 2022-07-24  |
+----+-------------+----------+--------------------+-------+--------------+---------+---------+------------------+------------+-----------+-------------+
|  5 |           6 | Female   | Michael Gallegos   |     9 | Hypertension |     100 | 109/67  | Port Ericchester | Alaska     |     44422 | 2020-11-14  |
+----+-------------+----------+--------------------+-------+--------------+---------+---------+------------------+------------+-----------+-------------+
```

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

**Atomic Data:**
In the pursuit of understanding data quality and consistency, it's crucial to focus on the concept of "atomic data." Atomic data refers to the smallest, indivisible unit of data that retains its context and meaning. By identifying the atomic level of data within a dataset, you can ensure that each piece of information is consistent, accurate, and reliable. For example, in a patient dataset, the atomic data could include a patient's name, date of birth, and MRN. Recognizing atomic data aids in data standardization, quality assessment, and meaningful interpretation.

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
subset = data[['Name', 'City']]
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


Of course! Let's dive into `groupby` and pivot tables in pandas:

---

### Groupby and Pivot Tables in Pandas

Pandas provides powerful and flexible tools to aggregate and transform datasets. Two of the most commonly used functions for this purpose are `groupby` and pivot tables.

By leveraging `groupby` and pivot tables, you can reshape, transform, and aggregate your data in various ways to gain insights. It's particularly useful when dealing with large datasets where such summarizations can provide valuable perspectives on the underlying patterns in the data.

#### Groupby

The `groupby` method allows you to group rows of data together based on some column value and then apply a function such as `sum` or `mean` to each group, effectively aggregating the data.

Let's say we want to group patients based on their diagnosis and then find the average cholesterol level for each group.

**Basic Usage**:

```python
data.groupby('column_to_groupby').function_to_apply()
```

#### Pivot Tables

Pivot tables are used to summarize and aggregate data inside a dataframe. It's particularly useful when you want to transform data from a long format to a wide format.

If we want to see average blood pressure readings across different age groups for males and females, a pivot table would be a great choice.

**Basic Usage**:

```python
data.pivot_table(index='row_name', columns='column_name', values='values_column', aggfunc='function_to_apply')
```

#### Synthetic Dataset

Now lets create another synthetic dataset to illustrate these functions.

```python
import numpy as np
import pandas as pd
from faker import Faker

fake = Faker()
np.random.seed(42)

# Generate sample data
num_samples = 100

patients = [fake.name() for _ in range(num_samples)]
diagnoses = ['Diabetes', 'Hypertension', 'Cardiovascular Disease', 'Healthy']
diagnosis_data = [np.random.choice(diagnoses) for _ in range(num_samples)]
age_data = np.random.randint(20, 80, num_samples)
cholesterol_data = np.random.randint(150, 250, num_samples)  # in mg/dL
bp_data = np.random.randint(80, 160, num_samples)  # systolic blood pressure
genders = ['Male', 'Female']
gender_data = [np.random.choice(genders) for _ in range(num_samples)]

data = pd.DataFrame({
    'Patient Name': patients,
    'Diagnosis': diagnosis_data,
    'Age': age_data,
    'Cholesterol': cholesterol_data,
    'Blood Pressure': bp_data,
    'Gender': gender_data
})

print(data.head())

```

```text


+----+----------------+--------------+-------+---------------+------------------+----------+
|    | Patient Name   | Diagnosis    |   Age |   Cholesterol |   Blood Pressure | Gender   |
+====+================+==============+=======+===============+==================+==========+
| 17 | Veronica Love  | Healthy      |    35 |           155 |              139 | Male     |
+----+----------------+--------------+-------+---------------+------------------+----------+
| 75 | Jerry Pham     | Hypertension |    56 |           181 |              140 | Male     |
+----+----------------+--------------+-------+---------------+------------------+----------+
| 43 | William Reeves | Healthy      |    70 |           173 |              114 | Female   |
+----+----------------+--------------+-------+---------------+------------------+----------+
| 88 | Eric Bowers    | Healthy      |    34 |           165 |              103 | Female   |
+----+----------------+--------------+-------+---------------+------------------+----------+
|  5 | Jay Wise       | Healthy      |    55 |           185 |              112 | Female   |
+----+----------------+--------------+-------+---------------+------------------+----------+

```

#### Using `groupby`

Grouping by `Diagnosis` and finding the mean (average) of `Cholesterol`:

```python
grouped_data = data.groupby('Diagnosis').agg({
    'Cholesterol': 'mean'
})
print(grouped_data)

```

```text

                        Cholesterol
Diagnosis                          
Cardiovascular Disease   205.375000
Diabetes                 194.700000
Healthy                  194.133333
Hypertension             204.192308

```

The `.agg()` function in pandas is used to aggregate data using one or multiple operations over specified axes. It's quite versatile and can accept a wide range of functions or operations. Some common aggregation functions available to us are:

- **Basic Statistics**:
  - `'sum'`: Compute sum of group values.
  - `'mean'`: Compute mean of group values.
  - `'median'`: Compute median of group values.
  - `'std'`: Standard deviation of group values.
  - `'var'`: Compute variance of group values.
  - `'min'`: Compute minimum of group values.
  - `'max'`: Compute maximum of group values.
  
- **Count**:
  - `'count'`: Count non-NA/null values of group values.
  - `'nunique'`: Count number of distinct elements in group.
  
- **First and Last Items**:
  - `'first'`: Compute first of group values.
  - `'last'`: Compute last of group values.
  
- **Others**:
  - `'prod'`: Compute product of group values.
  - `'sem'`: Standard error of the mean of groups.

Beyond these basic functions, `.agg()` can also accept custom functions. For example:

```python
def range_func(x):
    return x.max() - x.min()

grouped_data = data.groupby('Diagnosis').agg({
    'Cholesterol': range_func
})
```

This custom function calculates the range of the `Cholesterol` values within each group.

For more advanced aggregation needs, `.agg()` can accept a dictionary where keys are columns, and values are lists of functions/operations to be applied to that column.

Furthermore, you can find the comprehensive list of aggregation methods and their details in the official [pandas documentation](https://pandas.pydata.org/pandas-docs/stable/user_guide/groupby.html#aggregation). 

Always refer to the official documentation for the most up-to-date and detailed information on available functions and methods.




#### Using Pivot Tables

Creating a pivot table that shows the average `Blood Pressure` for each age group, separated by `Gender`:

```python
data['Age Group'] = pd.cut(data['Age'], bins=[20, 40, 60, 80], labels=['20-40', '40-60', '60-80'])
pivot_data = data.pivot_table(index='Age Group', columns='Gender', values='Blood Pressure', aggfunc='mean')
print(pivot_data)

```

```

Gender         Female        Male
Age Group                        
20-40      118.500000  122.750000
40-60      116.105263  120.300000
60-80      112.166667  105.111111

```

We could also do average Cholesterol by Gender and Age Group. For this, let's assume we want to divide our patients into three age groups: "Young" (age < 30), "Middle-aged" (30 <= age < 50), and "Senior" (age >= 50). We will then compute the average cholesterol level for each combination of gender and age group.

To classify our patients into age groups, we can use the `pd.cut()` function:

```python
import pandas as pd
from faker import Faker
import numpy as np

# Define age bins
bins = [0, 30, 50, np.inf]
labels = ['Young', 'Middle-aged', 'Senior']

data['Age Group'] = pd.cut(data['Age'], bins=bins, labels=labels, right=False)

# Pivot table for average cholesterol by gender and age group
avg_cholesterol_pivot = data.pivot_table(values='Cholesterol', index='Gender', columns='Age Group', aggfunc='mean')
print(avg_cholesterol_pivot)
```

```text

Age Group       Young  Middle-aged      Senior
Gender                                        
Female     199.357143   200.529412  199.500000
Male       203.250000   197.375000  199.952381

```

Or, we could count how many male and female patients fall into each diagnosis category. This is a straightforward pivot table where we're counting occurrences:

```python
diagnosis_pivot = data.pivot_table(values='Age', index='Diagnosis', columns='Gender', aggfunc='count')
print(diagnosis_pivot)
```

```text

Gender                  Female  Male
Diagnosis                           
Cardiovascular Disease      14    10
Diabetes                    10    10
Healthy                     18    12
Hypertension                17     9

```

These pivot tables provide summarized views of the data based on specific groupings and metrics, allowing healthcare professionals to glean insights about different patient demographics and health metrics.




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

# Or if we want to fill missing values for all columns:
data.fillna(0, inplace=True)
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

Lets first create some outliers:

```python

import numpy as np
import pandas as pd
from faker import Faker

fake = Faker()

# Generate a sample dataset
num_records = 1000
data = pd.DataFrame({
    'Name': [fake.name() for _ in range(num_records)],
    'avgHeartRate': [fake.random_int(min=50, max=130) for _ in range(num_records)]
})

# Introduce some outliers
outliers_to_insert = 10  # for demonstration purposes
for _ in range(outliers_to_insert):
    data.at[fake.random_int(min=0, max=num_records-1), 'avgHeartRate'] = fake.random_int(min=200, max=250)  # these are our outliers
```

```text

	Name	avgHeartRate
0	Kellie Ray	80
1	Frederick Kim	61
2	Christopher Tran	73
3	Steven Clark	80
4	Deborah Willis	116
...	...	...
995	Gina West	77
996	Jessica Schwartz	116
997	Jeffrey Barnes	76
998	Jacqueline Peterson	99
999	Jennifer Harris	60

```

Now lets calculate the z-scores. The Z-score measures how many standard deviations an observation is away from the mean. If the Z-score is above a certain threshold (usually 2 or 3), the data point is considered an outlier.


```python

# Calculate the Z-score for a column
z_scores = np.abs((data['avgHeartRate'] - data['avgHeartRate'].mean()) / data['avgHeartRate'].std())

# Add Z-scores as a new column in the dataframe
data['Z_Scores'] = z_scores

# Define a threshold for outlier detection
threshold = 3

# Identify and treat outliers
outliers = data[z_scores > threshold]
data = data[z_scores <= threshold]

```

**Outliers**:

```text

                  Name  avgHeartRate  Z_Scores
250    Miranda Barnes           226  4.998898
340    Maurice Walter           215  4.589857
351     Bruce Carlson           226  4.998898
386      Aaron Malone           243  5.631054
458      Cynthia Pena           242  5.593868
578  Robert Alexander           213  4.515485
631    Austin Coleman           231  5.184826
655     Ronald Willis           208  4.329557
902        Adam Casey           228  5.073269
919   Patricia Santos           219  4.738599

```

By identifying and removing duplicates and outliers, you ensure that your analysis is based on reliable and accurate data, leading to more meaningful insights in healthcare research and decision-making.

---

Pandas' versatility and functionality make it an indispensable tool for cleaning, preprocessing, and analyzing health informatics data. By using its powerful functions, you can ensure the accuracy and reliability of your insights.

