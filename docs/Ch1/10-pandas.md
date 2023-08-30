---
sidebar_position: 10
---

# 1.10 Using pandas for health data aquisition

Pandas, a powerful Python data manipulation library, is an indispensable tool for working with health data due to its versatility and ease of use. Whether you're dealing with electronic health records (EHRs), medical imaging data, clinical trial results, or any other health-related dataset, pandas provides the tools to efficiently organize, analyze, and visualize the data.

One of pandas' strengths is its ability to handle a wide range of data formats commonly used in the healthcare domain. We will be discussing these formats further late. But for now:

- **HL7 (Health Level 7)**: HL7 is a standard for exchanging healthcare information. Using pandas, you can parse and transform HL7 messages to extract meaningful information about patients, diagnoses, treatments, and more.

- **FHIR (Fast Healthcare Interoperability Resources)**: FHIR is an emerging standard for exchanging healthcare information electronically. Pandas can help you import, process, and analyze FHIR resources, facilitating interoperability between different healthcare systems.

- **DICOM (Digital Imaging and Communications in Medicine)**: DICOM is the standard for storing and transmitting medical images. Pandas enables you to manage and analyze DICOM metadata, such as patient demographics, imaging modalities, and study details.

In addition, Pandas seamlessly integrates with various database systems commonly used in health data management:

- **SQLite**: SQLite is a self-contained, serverless database system often used for local data storage and lightweight applications. Pandas' `read_sql` function allows you to query and import data from SQLite databases directly into pandas DataFrames.

- **MySQL and PostgreSQL**: These relational database management systems (RDBMS) are widely used in healthcare for managing large datasets. Pandas' SQL support allows you to interact with MySQL and PostgreSQL databases, performing data manipulation, analysis, and visualization directly within pandas.

Beyond data import, pandas offers a rich toolkit for data cleaning, transformation, and analysis. You can use pandas to:

- Cleanse and preprocess raw health data to ensure consistency and accuracy.
- Filter and select relevant data subsets for specific analyses.
- Perform aggregation and statistical calculations to gain insights into patient populations, treatment outcomes, and disease trends.

## When to Use pandas:

- **Data Cleaning and Transformation**: Pandas provides intuitive methods for cleaning, transforming, and reshaping data. It's excellent for tasks like handling missing values, removing duplicates, and changing data formats.

- **Data Exploration and Analysis**: With its DataFrame and Series data structures, pandas makes it easy to explore and analyze data. You can perform operations like filtering, grouping, and aggregation efficiently.

- **Data Visualization**: Pandas can be integrated with data visualization libraries like Matplotlib and Seaborn to create informative visualizations directly from your data.

- **Small to Medium-Sized Datasets**: Pandas is ideal for datasets that can fit comfortably in memory. It's well-suited for tasks involving data manipulation and analysis on datasets of up to several gigabytes.

## When Not to Use pandas:

- **Big Data**: For very large datasets that exceed available memory, pandas might not be the best option due to memory limitations. In such cases, distributed computing frameworks like Apache Spark or Dask might be more suitable.

- **High-Performance Computing**: If you're dealing with complex calculations that require high-performance computing, specialized libraries like NumPy or using compiled languages like C/C++ might be more efficient.

## Installing pandas:

You can install pandas using pip, the Python package installer:

```bash
pip install pandas
```

Please keep in mind, that if you are using Google Colab it should already be installed by default, but if you need to uninstall or install a new version, you would do the following in a new code block as an example:

```
!pip uninstall pandas
!pip install pandas 2.0.3
```

## Built-in Functions and Common Usage:
Pandas comes with hundreds of built-in functions that facilitate data manipulation, analysis, and transformation. When you import pandas, it's common to use the alias `pd` to make it easier to reference functions:

```
import pandas as pd
```

The pandas library is extensive, and it's impossible to know all its functionalities by heart. This is where the pandas documentation becomes invaluable. The documentation provides detailed explanations, examples, and usage patterns for each function and feature. Learning to navigate and utilize the documentation effectively is a key skill for mastering pandas or any other Python package.

Please spend a section now to see how the documentation is structured: 

### [STOP AND CLICK HERE: Please review the Pandas Documentation](https://pandas.pydata.org/docs/index.html) 

## Loading in Data with Pandas

Pandas excels not only in data manipulation but also in data loading. It provides a variety of methods to load data from various file formats and data sources. Let's explore some common file formats and how to load them using pandas.

For a thorough review of how to load in pandas, please review the documentation, specifically the input and output section (i/o) found [here](https://pandas.pydata.org/docs/reference/io.html). To emphasize the volume and variety of of reading different file types, here are the options that we have: 

```python
pandas.read_pickle
pandas.DataFrame.to_pickle
pandas.read_table
pandas.read_csv
pandas.DataFrame.to_csv
pandas.read_fwf
pandas.read_clipboard
pandas.DataFrame.to_clipboard
pandas.read_excel
pandas.DataFrame.to_excel
pandas.ExcelFile
pandas.ExcelFile.book
pandas.ExcelFile.sheet_names
pandas.ExcelFile.parse
pandas.io.formats.style.Styler.to_excel
pandas.ExcelWriter
pandas.read_json
pandas.json_normalize
pandas.DataFrame.to_json
pandas.io.json.build_table_schema
pandas.read_html
pandas.DataFrame.to_html
pandas.io.formats.style.Styler.to_html
pandas.read_xml
pandas.DataFrame.to_xml
pandas.DataFrame.to_latex
pandas.io.formats.style.Styler.to_latex
pandas.read_hdf
pandas.HDFStore.put
pandas.HDFStore.append
pandas.HDFStore.get
pandas.HDFStore.select
pandas.HDFStore.info
pandas.HDFStore.keys
pandas.HDFStore.groups
pandas.HDFStore.walk
pandas.read_feather
pandas.DataFrame.to_feather
pandas.read_parquet
pandas.DataFrame.to_parquet
pandas.read_orc
pandas.DataFrame.to_orc
pandas.read_sas
pandas.read_spss
pandas.read_sql_table
pandas.read_sql_query
pandas.read_sql
pandas.DataFrame.to_sql
pandas.read_gbq
pandas.read_stata
pandas.DataFrame.to_stata
pandas.io.stata.StataReader.data_label
pandas.io.stata.StataReader.value_labels
pandas.io.stata.StataReader.variable_labels
pandas.io.stata.StataWriter.write_file
```

## Common Data Reading Methods in Pandas

Here are some commonly used methods in Pandas for reading different data formats, particularly relevant for health informatics:

1. **`pandas.read_csv`**: This method is commonly used to read comma-separated values (CSV) files, which are popular for storing tabular data. Many health-related datasets are available in CSV format.

2. **`pandas.read_excel`**: Useful for reading data from Microsoft Excel files. Health data might be stored in Excel format, and this method can help you extract data from these files.

3. **`pandas.read_json`**: JSON (JavaScript Object Notation) is a common data format, especially in web-based applications. This method allows you to read JSON data into a Pandas DataFrame.

4. **`pandas.read_sql`**: When you're working with databases, this method enables you to execute SQL queries and fetch results directly into a DataFrame. Health informatics often involves querying databases for patient data.

5. **`pandas.read_hdf`**: Hierarchical Data Format (HDF) is used for large and complex datasets. This method lets you read HDF files, which might contain extensive healthcare data.

6. **`pandas.read_parquet`**: Parquet is a columnar storage format optimized for analytics. It's used for large-scale data processing, and health data analysis can benefit from its efficiency.

7. **`pandas.read_feather`**: Feather is another columnar storage format designed for speed and efficiency. It's often used for exchanging data between different programming languages.

8. **`pandas.read_pickle`**: Pickle is a Python-specific serialization format. While generally not recommended for sharing data between different systems, it's sometimes useful for saving and loading Python objects.

These methods offer a glimpse into the diverse range of data formats you might encounter in health informatics. Being familiar with these methods allows you to efficiently load and work with data from various sources.


## Pandas Dataframes

Pandas DataFrames are at the heart of data manipulation in Pandas. When you use functions like `pd.read_csv()` or `pd.read_sql()`, you're loading the data into a special object known as a DataFrame (abbreviated as DF). A DataFrame is a two-dimensional labeled data structure, similar to a table in a relational database or an Excel spreadsheet.

DataFrames provide a convenient and efficient way to work with structured data. They allow you to perform various operations like filtering, grouping, sorting, and aggregation with ease. Each column in a DataFrame can have a different data type (integer, float, string, etc.), and the data is organized into rows and columns.

Here's a simple example of creating a DataFrame using a native python dictionary:

```python
import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [28, 35, 24],
    'Gender': ['Female', 'Male', 'Male']
}

df = pd.DataFrame(data)
```

If we were to then perform a print of the df, or called this new variable `df` directly, what we will see is something that looks like this:

```
>>> df
      Name  Age  Gender
0    Alice   28  Female
1      Bob   35    Male
2  Charlie   24    Male
```

This format should look familiar, it almost just looks like a native CSV or EXCEL file that you are more likely used to seeing. But with the power of pandas and python, we are able to do much more with the data then what we might be able to achive in a tool like Microsoft Excel alone. 

### Loading CSV Files

CSV (Comma-Separated Values) files are a popular way to store tabular data. Pandas provides the `read_csv()` function to load CSV files:

```python
import pandas as pd

# Load a CSV file
data = pd.read_csv('data.csv')
```

When loading files using read_csv() or any other file-loading function, the file path within the parentheses is crucial. It specifies the location of the file you want to load. In a local development environment, like your own computer, the file path typically refers to a file on your machine's file system. However, when working in a remote environment, like Google Colab, the file path should point to the location where the file can be accessed within that environment.

In Google Colab, you have a few options for loading data files:

1. Upload the File: You can manually upload the data file to your Google Colab session by using the file upload button in the notebook interface. After uploading, the file will be available in your current Colab environment, and you can use its filename as the file path in the code.

2. Use Web URLs: If the data file is web accessible, you can provide the URL directly to `read_csv()` without needing to upload the file. For example:

```python
# Load a CSV file from a web URL
data_url = 'https://example.com/data.csv'
data = pd.read_csv(data_url)
```

3. Mount Google Drive: You can also mount your Google Drive to your Colab environment and access files stored in your Google Drive. This is useful if you have data files stored in your Google Drive that you want to work with in Colab. Once your Drive is mounted, you can use the file path within the mounted Drive to access files.

```python
from google.colab import drive
drive.mount('/content/drive')

# Load a CSV file from Google Drive
data = pd.read_csv('/content/drive/My Drive/data.csv')
```

Keep in mind that when working in remote environments, file paths need to be adjusted to match the location of the data within that environment. By understanding how file paths work and leveraging the options available in Google Colab, you can effectively load data files for analysis using pandas.



### Loading Excel Files
Excel files (.xlsx) are widely used for data storage. Pandas offers the `read_excel()` function to load Excel files:

```python
# Load an Excel file
data = pd.read_excel('data.xlsx')
```

### Loading JSON Files
JSON (JavaScript Object Notation) files are used for structured data interchange. Use `read_json()` to load JSON files:
```python
# Load a JSON file
data = pd.read_json('data.json')
```

### Loading SQL Data
Pandas can interact with SQL databases using the `read_sql()` function. You need to provide a database connection and a SQL query:

```python
import sqlite3

# Establish a connection to the database
connection = sqlite3.connect('database.db')

# Load data from a SQL query
query = 'SELECT * FROM table_name'
data = pd.read_sql(query, connection)

```

### Loading Data from APIs
Pandas can also fetch data from APIs using functions like `read_json()` and `read_csv()` by providing the API endpoint:

```python
# Load data from a JSON API
api_url = 'https://api.example.com/data'
data = pd.read_json(api_url)
```

### Loading Data from Web URLs
Pandas supports loading data directly from web URLs:
```python
# Load data from a web URL
data_url = 'https://example.com/data.csv'
data = pd.read_csv(data_url)
```

Pandas' flexibility in loading various file formats makes it a versatile tool for handling different types of data sources. Whether you're working with local files, databases, APIs, or web URLs, pandas simplifies the process of loading data for analysis and manipulation.


## Conclusion

Pandas empowers health informaticists to efficiently manage, analyze, and visualize health data. Whether you're working with structured EHRs, unstructured clinical notes, or medical images, pandas provides the tools to navigate the complex landscape of health data analysis and make informed decisions that drive better patient care and medical research.

