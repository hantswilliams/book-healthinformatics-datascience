---
sidebar_position: 10
---

# 1.10 Intro to pandas for Importing Data

Pandas, a powerful Python data manipulation library, is an indispensable tool for working with health data due to its versatility and ease of use. Whether you're dealing with electronic health records (EHRs), medical imaging data, clinical trial results, or any other health-related dataset, pandas provides the tools to efficiently organize, analyze, and visualize the data.

One of pandas' strengths is its ability to handle a wide range of data formats commonly used in the healthcare domain. We will be discussing these formats further late. But for now, here is a little preview:

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

```bash
!pip uninstall pandas
!pip install pandas 2.0.3
```

## Built-in Functions and Common Usage:
Pandas comes with hundreds of built-in functions that facilitate data manipulation, analysis, and transformation. When you import pandas, it's common to use the alias `pd` to make it easier to reference functions:

```python
import pandas as pd
```

The pandas library is extensive, and it's impossible to know all its functionalities by heart. This is where the pandas documentation becomes invaluable. The documentation provides detailed explanations, examples, and usage patterns for each function and feature. Learning to navigate and utilize the documentation effectively is a key skill for mastering pandas or any other Python package.

Please spend a section now to see how the documentation is structured: 

### [STOP AND CLICK HERE: Please review the Pandas Documentation](https://pandas.pydata.org/docs/index.html) 

## Official Tutorial from *pandas*

Sometimes the best documentation and tutorials come from the author(s) of the package or code, while other times if can be from a blog or external 3rd party tutorial. 

![pandas documentation](../../static/img/ch1/pandas_documentation_official.png)

When it comes to pandas, they do an excellent job introducing new users to their key services. If you [visit here](https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html), you can see how the pandas team outlines some fo the key concepts with code examples of the data table representation, examples of specific actions or functions that can be applied to your data, combining various datasets, and much more 

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

## `pandas` versus `pd` ?
When you are looking at the official documentation and code examples, you may see that those examples spell out the pandas package fully `pandas.reads_sql()` as an example. 

But when we use `import pandas as pd`, we would then call the pandas functions such as `read_sql` by using `pd.read_sql` which is the equivalent to `pandas.read_sql()`. 

This is a great example of how customizable the code can be and its flexibility, but how it can also lead to confusion. So if you use `import pandas as pd`, be sure to use `pd`, versus if you just use `import pandas`, then just use `pandas` when calling pandas functions related to loading in a dataset or database.  

## Common Data Reading Methods in Pandas

Here are some commonly used methods in Pandas for reading different data formats, particularly relevant for health informatics:

1. **`pandas.read_csv`** or **`pd.read_csv`**: This method is commonly used to read comma-separated values (CSV) files, which are popular for storing tabular data. Many health-related datasets are available in CSV format.

2. **`pandas.read_excel`** or **`pd.read_excel`**: Useful for reading data from Microsoft Excel files. Health data might be stored in Excel format, and this method can help you extract data from these files.

3. **`pandas.read_json`** or **`pd.read_json`**: JSON (JavaScript Object Notation) is a common data format, especially in web-based applications. This method allows you to read JSON data into a Pandas DataFrame.

4. **`pandas.read_sql`** or **`pd.read_sql`**: When you're working with databases, this method enables you to execute SQL queries and fetch results directly into a DataFrame. Health informatics often involves querying databases for patient data.

5. **`pandas.read_hdf`** or **`pd.read_hdf`**: Hierarchical Data Format (HDF) is used for large and complex datasets. This method lets you read HDF files, which might contain extensive healthcare data.

6. **`pandas.read_parquet`** or **`pd.read_parquet`**: Parquet is a columnar storage format optimized for analytics. It's used for large-scale data processing, and health data analysis can benefit from its efficiency.

7. **`pandas.read_feather`** or **`pd.read_feather`**: Feather is another columnar storage format designed for speed and efficiency. It's often used for exchanging data between different programming languages.

8. **`pandas.read_pickle`** or **`pd.read_pickle`**: Pickle is a Python-specific serialization format. While generally not recommended for sharing data between different systems, it's sometimes useful for saving and loading Python objects.

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

#### Loading Data with Various Options

Pandas provides a variety of options to customize how you load CSV files. Here are a few common arguments you might use with read_csv():

- `nrows`: Load only a specific number of rows from the file.
- `skiprows`: Skip a specified number of rows at the beginning of the file.
- `usecols`: Specify which columns to load by providing a list of column names.
- `dtype`: Pre-define data types for columns to optimize memory usage and prevent data type inference.
- `skip_blank_lines`: Skip empty lines in the file.
- `encoding`: Specify the character encoding of the file.

Here's an example of using some of these options:

```python
import pandas as pd

# Load the first 100 rows of specific columns with predefined data types
data = pd.read_csv('data.csv', nrows=100, usecols=['Name', 'Age'], dtype={'Name': str, 'Age': int})
```

Or a more complex example that I commonly use when I want to quickly explore a potentially large dataset that might slow down my computer if I were to try and load it all (say a CSV file with 50 million rows), here is how I would just oad in a random sample of 1% of the rows from the file:

```python
import pandas as pd

# Load a random sample of 100 rows from a CSV file
data = pd.read_csv('data.csv', header=None, skiprows=lambda i: i > 0 and random.random() > 0.01)
```

In this example, the skiprows parameter is used along with a lambda function to skip rows with a probability of approximately 0.99, effectively loading only around 1% of the rows from the CSV file, versus in the other example we were just taking the first 100 rows which may look different then the last 100 rows. This is why we may want to randomly select across all of the rows, to get a more represenitive view of the what the data may look like. 

Pandas provides a flexible and efficient way to load and manipulate data from CSV files, making it an essential tool for health informatics data analysis.



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

#### Complex Example
Now, the JSON files will not also be clean, or may not always have a simple format that can be automatically parsed by the `read_json()` function with pandas. Lets take the below example, where we have some data coming from healthdata.gov, where their JSON files not only contain the data, but also a ton of meta data. 

The data origin is from the state of NY, and the data relates to [cardiac surgery and PCI by hospital](https://health.data.ny.gov/Health/Cardiac-Surgery-and-PCI-by-Hospital-Beginning-2011/2wey-wrtg). 

Lets take the data that we can find here from health.data.ny.gov, which looks like this:

```json
{
  "meta" : {
    "view" : {
      "id" : "2wey-wrtg",
      "name" : "Cardiac Surgery and PCI by Hospital: Beginning 2011",
      "assetType" : "chart",
      "attribution" : "New York State Department of Health",
      "attributionLink" : "http://www.health.ny.gov/health_care/consumer_information/cardiac_surgery/",
      "averageRating" : 0,
      "category" : "Health",
      "createdAt" : 1370594195,
      "description" : "This column chart presents the number of cardiac procedures performed by hospital.  It is important to note that Emergency PCI and Valve Surgery are reported only in 3-year increments.  Comparing procedures reported in 3-year increments to those reported in single year increments (e.g. CABG to Valve or Non-Emergency PCI to Emergency PCI) may lead to incorrect conclusions concerning procedural volume.\r\n\r\nFor more information check out:http://www.health.ny.gov/health_care/consumer_information/cardiac_surgery/.",
      "displayType" : "chart",
      "downloadCount" : 3435,
      "hideFromCatalog" : false,
      "hideFromDataJson" : false,
      "indexUpdatedAt" : 1561662734,
      "licenseId" : "PUBLIC_DOMAIN",
      "modifyingViewUid" : "jtip-2ccj",
      "newBackend" : true,
      "numberOfComments" : 0,
      "oid" : 28662755,
      "provenance" : "official",
      "publicationAppendEnabled" : false,
      "publicationDate" : 1499964309,
      "publicationGroup" : 868744,
      "publicationStage" : "published",
      "rowClass" : "",
      "rowsUpdatedAt" : 1685715512,
      "rowsUpdatedBy" : "a9xd-f5um",
      "tableId" : 15126304,
      "totalTimesRated" : 0,
      "viewCount" : 63499,
      "viewLastModified" : 1561662717,
      "viewType" : "tabular",
    }
  },
"data" : [ [ "row-598j-tsvy~cxmi", "00000000-0000-0000-F633-46B87DD60001", 0, 1426023384, null, 1426023384, null, "{ }", "1438", "Bellevue Hospital Ctr", "Manhattan", "NY Metro - NYC", "All PCI", "2011", "479", "10", "2.09", "1.21", "1.68", "0.80", "3.08", "Rate not different than Statewide Rate" ]
, [ "row-qfk3_mv8t.sc5f", "00000000-0000-0000-1CED-2AAB0D36C737", 0, 1426023384, null, 1426023384, null, "{ }", "1439", "Beth Israel Med Ctr", "Manhattan", "NY Metro - NYC", "All PCI", "2011", "1538", "13", "0.85", "0.78", "1.06", "0.56", "1.81", "Rate not different than Statewide Rate" ]
, [ "row-sat8.33jx-5jhx", "00000000-0000-0000-A48F-FDC7EA52547C", 0, 1426023384, null, 1426023384, null, "{ }", "1178", "Bronx-Lebanon-Cncourse", "Bronx", "NY Metro - NYC", "All PCI", "2011", "67", "2", "2.99", "1.48", "1.96", "0.22", "7.08", "Rate not different than Statewide Rate" ]
, [ "row-vb6t_aw9x.mdh8", "00000000-0000-0000-8F40-97AC444663CB", 0, 1426023384, null, 1426023384, null, "{ }", "1286", "Brookdale Hosp Med Ctr", "Kings", "NY Metro - NYC", "All PCI", "2011", "209", "3", "1.44", "1.35", "1.03", "0.21", "3.02", "Rate not different than Statewide Rate" ]
, [ "row-ucjk_79si~w6ci", "00000000-0000-0000-4822-1A4A2609880B", 0, 1426023384, null, 1426023384, null, "{ }", "1626", "Elmhurst Hospital Ctr", "Queens", "NY Metro - NYC", "All PCI", "2011", "448", "4", "0.89", "1.09", "0.79", "0.21", "2.04", "Rate not different than Statewide Rate" ]
, [ "row-tjin_7emu_m3dn", "00000000-0000-0000-8E12-BC2E5BD26AC7", 0, 1426023384, null, 1426023384, null, "{ }", "1005", "Glens Falls Hospital", "Capital District", "Capital District", "All PCI", "2011", "231", "1", "0.43", "0.68", "0.62", "0.01", "3.44", "Rate not different than Statewide Rate" ]
, [ "row-483k~6rxy-vwyb", "00000000-0000-0000-3FB1-39D5E6DCC2B6", 0, 1426023384, null, 1426023384, null, "{ }", "1629", "Jamaica Hosp Med Ctr", "Queens", "NY Metro - NYC", "All PCI", "2011", "220", "11", "5.00", "1.71", "2.84", "1.42", "5.08", "Rate significantly higher than Statewide Rate" ]
]
}

```

In this abbreviated part of the full json file, we can see that there is a `meta` section, which contains a bunch of meta data related to the dataset, while we also have a `data` section, which is where the actual data lives. 

So in order to parse and load this correctly into a dataframe, we first need to load the data, which we can use with a built in python package called `requests` which allows us to directly pull text from a website, and then use another built in python pacakge called json and the command `.json()` to then tell python that the data we are loading from requests is of the JSON type. This then converts the JSON into a dictionary. 

Finally, and then using our ` [ ] ` brackets for this converted JSON dictionary in python, and can keep only the `data` key and its value(s) - e.g., the raw data, and load that into a pandas df. 

```python
import json
import pandas as pd 
import requests

## Data URL 
data_url = 'https://health.data.ny.gov/api/views/2wey-wrtg/rows.json'

## Only keeping the part of the JSON that we require: the 'data' key 
json = requests.get(data_url).json()['data']

## Now we can convert it to a dataframe
df = pd.DataFrame(json)
```

**Which will look like:**

```text

0	1	2	3	4	5	6	7	8	9	...	12	13	14	15	16	17	18	19	20	21
0	row-598j-tsvy~cxmi	00000000-0000-0000-F633-46B87DD60001	0	1426023384	None	1426023384	None	{ }	1438	Bellevue Hospital Ctr	...	All PCI	2011	479	10	2.09	1.21	1.68	0.80	3.08	Rate not different than Statewide Rate
1	row-qfk3_mv8t.sc5f	00000000-0000-0000-1CED-2AAB0D36C737	0	1426023384	None	1426023384	None	{ }	1439	Beth Israel Med Ctr	...	All PCI	2011	1538	13	0.85	0.78	1.06	0.56	1.81	Rate not different than Statewide Rate
2	row-sat8.33jx-5jhx	00000000-0000-0000-A48F-FDC7EA52547C	0	1426023384	None	1426023384	None	{ }	1178	Bronx-Lebanon-Cncourse	...	All PCI	2011	67	2	2.99	1.48	1.96	0.22	7.08	Rate not different than Statewide Rate
3	row-vb6t_aw9x.mdh8	00000000-0000-0000-8F40-97AC444663CB	0	1426023384	None	1426023384	None	{ }	1286	Brookdale Hosp Med Ctr	...	All PCI	2011	209	3	1.44	1.35	1.03	0.21	3.02	Rate not different than Statewide Rate
4	row-ucjk_79si~w6ci	00000000-0000-0000-4822-1A4A2609880B	0	1426023384	None	1426023384	None	{ }	1626	Elmhurst Hospital Ctr	...	All PCI	2011	448	4	0.89	1.09	0.79	0.21	2.04	Rate not different than Statewide Rate
5	row-tjin_7emu_m3dn	00000000-0000-0000-8E12-BC2E5BD26AC7	0	1426023384	None	1426023384	None	{ }	1005	Glens Falls Hospital	...	All PCI	2011	231	1	0.43	0.68	0.62	0.01	3.44	Rate not different than Statewide Rate
6	row-483k~6rxy-vwyb	00000000-0000-0000-3FB1-39D5E6DCC2B6	0	1426023384	None	1426023384	None	{ }	1629	Jamaica Hosp Med Ctr	...	All PCI	2011	220	11	5.00	1.71	2.84	1.42	5.08	Rate significantly higher than Statewide Rate
7	row-iix9-chzt_3ty6	00000000-0000-0000-6C35-23BD0DDAD253	0	1426023384	None	1426023384	None	{ }	1450	Lenox Hill Hospital	...	All PCI	2011	1812	12	0.66	0.72	0.89	0.46	1.55	Rate not different than Statewide Rate
8	row-r6xe.6b8e~6did	00000000-0000-0000-39CE-9DDFAA9DCE97	0	1426023384	None	1426023384	None	{ }	1630	Long Island Jewish MC	...	All PCI	2011	1848	10	0.54	0.78	0.68	0.32	1.24	Rate not different than Statewide Rate
9	row-x5d3~rpwd~579s	00000000-0000-0000-BA66-A6074BD56C82	0	1426023384	None	1426023384	None	{ }	1304	Lutheran Medical Ctr	...	All PCI	2011	323	5	1.55	1.49	1.00	0.32	2.34	Rate not different than Statewide Rate
10 rows × 22 columns

```

We would then need to fix the columns, adding in their real names, but we have otherwise achieved what we set out to do.


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

