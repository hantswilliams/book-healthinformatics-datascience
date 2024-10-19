---
sidebar_position: 2
---

# 2.2 Polars for Large Data 

In this chapter we discuss Polars, which comes into play when dealing with large health informatics datasets that can span tens of millions to a few hundred million records. Its advanced parallel processing capabilities optimized for a single machine, combined with a columnar storage format, enable efficient operations on datasets that surpass traditional Pandas' capabilities. Polars makes the most of modern CPUs and memory architectures to provide seamless data processing and analysis within a single machine's memory.

As health datasets grow, Polars emerges as a strong contender to Pandas:
- **Features and Advantages**: Polars shines with large datasets, making it a fit choice for extensive health datasets.
- **Efficient Operations**: Genomics and longitudinal patient data manipulation becomes efficient and faster.

Polars is a Python library for data analysis that is similar to Pandas. However, Polars has some key differences that make it well-suited for health informatics applications.

### When to use: 

Polars is a great package to explore if your data is not soo large that it doesn't fit on your computer. Polars will take better advantage of your CPU/RAM with its data model, and supports multi-threated operations out of the box. 

But if your dataset is soo big that it can fit, or just barely fits on your personal computer, its time to move on to other solutions described in the [next section](/docs/Ch2/distributed-computation.md) like `ray` or `dask` which can be deployed across a cluster of machines. Polars does have the capability to perform distributed computation across many machines, with software like [fugue](https://fugue-tutorials.readthedocs.io/index.html), which may raise in popularity in the future.   

#### Example with SPARCS Data
- SPARCS data is a large dataset that contains information on patient discharges from hospitals in New York State. In the video below, we look at the difference in load times between Pandas and Polars for the SPARCS dataset.

<iframe width="560" height="315" src="https://www.youtube.com/embed/YoarGo3DNz4?si=MVPeIkjKzsstuKL2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Similarities to pandas

* Both Polars and Pandas are built on top of NumPy, so they can be used to work with tabular data.
* Both libraries provide a wide range of functions for data exploration, cleaning, and preprocessing.
* Both libraries can be used to create visualizations of data.

### Differences to pandas

* Polars is built on Rust, which is a high-performance programming language. This makes Polars faster than Pandas for many operations.
* Polars uses a different data model than Pandas. Polars' data model is based on tensors, which are more efficient for representing multidimensional data.
* Polars provides some unique features that are not available in Pandas. For example, Polars can be used to perform distributed data analysis.

**Health Informatics Applications**

Polars can be used for a variety of health informatics applications, including:

* **Data exploration:** Polars can be used to explore large datasets of health data. This can help researchers to identify patterns and trends in the data.
* **Data cleaning:** Polars can be used to clean and preprocess health data. This can help to ensure that the data is accurate and reliable.
* **Data analysis:** Polars can be used to analyze health data. This can help researchers to answer questions about the data, such as the risk factors for a particular disease or the effectiveness of a treatment.
* **Data visualization:** Polars can be used to visualize health data. This can help researchers to communicate their findings to others.

### What are Tensors?

Tensors are a generalization of scalars, vectors, and matrices and can be thought of as multi-dimensional arrays. In essence, tensors provide a consistent framework for organizing data in many dimensions, not just one (like a scalar), two (like a matrix), or three.

- **Scalar**: A 0-dimensional tensor. E.g., `5`
- **Vector**: A 1-dimensional tensor. E.g., `[1, 2, 3]`
- **Matrix**: A 2-dimensional tensor. E.g., 
    ```
    [[1, 2],
     [3, 4],
     [5, 6]]
    ```
- **3D Tensor**: Think of a cube where each cell represents a data point. This might be used to store RGB values for a set of images, with dimensions `[height, width, color_channels]`.

Tensors are fundamental in fields like deep learning, where they can be used to represent everything from data to the parameters and structure of the model itself. Libraries such as TensorFlow and PyTorch are named after the "tensor" due to its central role in deep learning operations.

### Tensors vs. Pandas DataFrames

At a high level, both tensors and Pandas DataFrames are used for data storage and manipulation. However, there are distinct differences:

1. **Dimensionality**:
    - **Tensors**: Can be of any dimension, from 0-dimensional (scalars) up to n-dimensional.
    - **Pandas DataFrames**: Essentially 2-dimensional tables. While you can have multi-indexing to simulate higher dimensions, the data structure itself is a 2D table.

2. **Data Homogeneity**:
    - **Tensors**: Must be homogenous; all elements are of the same type.
    - **Pandas DataFrames**: Can store heterogeneous data. Different columns can have different data types.

3. **Operations**:
    - **Tensors**: Primarily designed for mathematical operations. They're optimized for large-scale mathematical computations.
    - **Pandas DataFrames**: Designed for data wrangling, cleaning, and analysis. It provides a wide range of functionalities like groupby, merge, and pivot, which are not naturally present for tensors.

4. **Use Cases**:
    - **Tensors**: Mainly used in fields like deep learning and scientific computing where high-performance multi-dimensional mathematical operations are required.
    - **Pandas DataFrames**: Best suited for data analysis tasks where you need to manipulate, explore, visualize, or preprocess data.

5. **Flexibility**:
    - **Tensors**: Typically more rigid because of their strict homogeneity and dimensional structure.
    - **Pandas DataFrames**: Offer more flexibility for data manipulation and come with a rich set of built-in functions for data analysis.

6. **Underlying Language**:
    - **Tensors**: Many tensor libraries (like TensorFlow) have interfaces in Python but are optimized with low-level languages for performance.
    - **Pandas DataFrames**: Written in Python, with critical parts optimized using Cython for better performance.

#### Example: 3-Dimensional Tensor: Medical Imaging Stacks

For simplicity, let's assume each image slice in our CT scan is a 3x3 grayscale image, and we have 5 slices stacked together to form our 3D tensor.

``` python
import numpy as np

# Creating a 3D tensor for CT slices
# 3x3 for image dimensions and 5 slices
ct_slices = np.array([
    [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6], [0.7, 0.8, 0.9]],
    [[0.2, 0.3, 0.4], [0.5, 0.6, 0.7], [0.8, 0.9, 1.0]],
    [[0.3, 0.4, 0.5], [0.6, 0.7, 0.8], [0.9, 1.0, 1.1]],
    [[0.4, 0.5, 0.6], [0.7, 0.8, 0.9], [1.0, 1.1, 1.2]],
    [[0.5, 0.6, 0.7], [0.8, 0.9, 1.0], [1.1, 1.2, 1.3]],
])

print(ct_slices)
print(ct_slices.shape)  # Output: (5, 3, 3)
```
```text

[[[0.1 0.2 0.3]
  [0.4 0.5 0.6]
  [0.7 0.8 0.9]]

 [[0.2 0.3 0.4]
  [0.5 0.6 0.7]
  [0.8 0.9 1. ]]

 [[0.3 0.4 0.5]
  [0.6 0.7 0.8]
  [0.9 1.  1.1]]

 [[0.4 0.5 0.6]
  [0.7 0.8 0.9]
  [1.  1.1 1.2]]

 [[0.5 0.6 0.7]
  [0.8 0.9 1. ]
  [1.1 1.2 1.3]]]
(5, 3, 3)

```


#### Example: 4-Dimensional Tensor: Time-Series of Medical Imaging Stacks

Assuming that our patient gets an MRI scan every month for 3 months and each MRI scan is represented as the 3D tensor described above:

``` python
# Creating a 4D tensor for MRI scans over 3 months
# Each month has the 3D tensor we created above

mri_scans_over_months = np.array([ct_slices, ct_slices + 0.1, ct_slices + 0.2])

print(mri_scans_over_months)
print(mri_scans_over_months.shape)  # Output: (3, 5, 3, 3)
```

```text

[[[[0.1 0.2 0.3]
   [0.4 0.5 0.6]
   [0.7 0.8 0.9]]

  [[0.2 0.3 0.4]
   [0.5 0.6 0.7]
   [0.8 0.9 1. ]]

  [[0.3 0.4 0.5]
   [0.6 0.7 0.8]
   [0.9 1.  1.1]]

  [[0.4 0.5 0.6]
   [0.7 0.8 0.9]
   [1.  1.1 1.2]]

  [[0.5 0.6 0.7]
   [0.8 0.9 1. ]
   [1.1 1.2 1.3]]]


 [[[0.2 0.3 0.4]
   [0.5 0.6 0.7]
   [0.8 0.9 1. ]]

  [[0.3 0.4 0.5]
   [0.6 0.7 0.8]
   [0.9 1.  1.1]]

  [[0.4 0.5 0.6]
   [0.7 0.8 0.9]
   [1.  1.1 1.2]]

  [[0.5 0.6 0.7]
   [0.8 0.9 1. ]
   [1.1 1.2 1.3]]

  [[0.6 0.7 0.8]
   [0.9 1.  1.1]
   [1.2 1.3 1.4]]]


 [[[0.3 0.4 0.5]
   [0.6 0.7 0.8]
   [0.9 1.  1.1]]

  [[0.4 0.5 0.6]
   [0.7 0.8 0.9]
   [1.  1.1 1.2]]

  [[0.5 0.6 0.7]
   [0.8 0.9 1. ]
   [1.1 1.2 1.3]]

  [[0.6 0.7 0.8]
   [0.9 1.  1.1]
   [1.2 1.3 1.4]]

  [[0.7 0.8 0.9]
   [1.  1.1 1.2]
   [1.3 1.4 1.5]]]]
(3, 5, 3, 3)


```

Here, the first dimension is time (3 months), followed by the 3D representation of the MRI scan. The numbers in the fake tensors are arbitrary and don't represent any real or medical significance. They're just for representation. In real scenarios, these values would typically be pixel intensity values for medical images, scaled between 0 and 1 or 0 and 255.

## Official Documentation and Intro Tutorial 
To read the official documentaiton, please visit [Polars Documentation](https://pola-rs.github.io/polars-book/user-guide/)

## Installing
Just like any other package in python, use your package manager (pip, poetry) and perform:

```bash
pip install polars
```

## Loading Data 

Lets start with a basic example. The abbreviation that we will be using for polars with `p1`. Here is where we will begin:

```python
import polars as pl

# Load a dataset of patient records
df = pl.read_csv("patient_records.csv")

# Check the size and shape of the DataFrame
print("Number of rows:", df.shape[0])
print("Number of columns:", df.shape[1])

# Display the first 5 rows of the DataFrame
print(df.head())

# Display the last 5 rows of the DataFrame
print(df.tail())
```

The equivalent Polars functions for checking the size and shape of a DataFrame are `.shape` and `.nrows`. The `.shape` function returns a tuple of the number of rows and columns in the DataFrame, while the `.nrows`function returns the number of rows in the DataFrame.

The equivalent Polars functions for previewing the first few and last few rows of a polars DataFrame are the same as in pandas: `.head()` and `.tail()`. The `.head()` function returns the first n rows of the DataFrame, where n is the number of rows specified. The `.tail()` function returns the last n rows of the DataFrame, where n is the number of rows specified.

Here is the output of the Polars code:

```
Number of rows: 1000
Number of columns: 5

    Name  Age  Gender  Location  ZipCode
-------  ---  ------  --------  --------
John Doe  30   Male     New York    10001
Jane Doe  25   Female   Los Angeles  90001
```

As you can see, the Polars code is very similar to the Pandas code. The only difference is that the Polars functions have different names.

#### Describing the data

##### Frequency Counts for Categorical Data
Just like getting frequency counts in pandas, to get the frequency counts for a categorical column, you can use the .value_counts() method. This method returns a Series object that shows the number of times each category appears in the column.

```python
# Get the frequency counts for the Gender column
gender_counts = df['Gender'].value_counts()
print(gender_counts)
```

##### Descriptives for Numerical Data
Describing numerical values: To get descriptive statistics for numerical columns, you can use the .describe() method also just like pandas. This method returns a DataFrame that shows the mean, standard deviation, minimum, maximum, and quartiles for each column.

```python
# Describe the Age column
age_description = df['Age'].describe()
print(age_description)
```

##### Null Values

Assessing null values: To assess the number of null values in a column, you can use the .isnull() method. This method returns a Boolean Series object that indicates whether each value in the column is null.

```python
# Check for null values in the Age column
has_null_age = df['Age'].isnull()
print(has_null_age.sum())
```


### Working with Polars DataFrame and its other data structures

Just like pandas, there are a variety of different types of data structures (objects) that can be utilized. There are two primary ones in polars: a series and a dataframe. 

A series is a 1-dimensional data strucure, like a list: 

```python
import polars as pl

s = pl.Series("a", [1, 2, 3, 4, 5])
print(s)
```

While a dataframe is a 2-dimensional data structure, built upon series in a columnar format just like within pandas:

```python
import polars as pl

df = pl.DataFrame(
    {
        "integer": [1, 2, 3, 4, 5],
        "date": [
            datetime(2022, 1, 1),
            datetime(2022, 1, 2),
            datetime(2022, 1, 3),
            datetime(2022, 1, 4),
            datetime(2022, 1, 5),
        ],
        "float": [4.0, 5.0, 6.0, 7.0, 8.0],
    }
)
print(df)
```

Overall, the polars code (API) is very similar to the Pandas code. 

## Data Cleaning and Preprocessing

There is not much different between the steps that we might take to clean column names in polars. As an example, here is how we might break apart into three different steps the removal of white space, removing of special characters, and then lower-casing everything:

```python
# Remove all white space from the column names
df.columns = df.columns.str.strip()

# Replace all special characters with underscores
df.columns = df.columns.str.replace("[^\w_]", "_")

# Convert all characters to lowercase
df.columns = df.columns.str.lower()

print(df)
```

### Data types and conversion 

Getting the data types is identical to pandas. To get the data types of the columns in a DataFrame, you can use the `.dtypes()` method. This method returns a Series object that shows the data type of each column.

```python
# Get the data types of the columns
df.dtypes
```

**Converting data types**: To convert the data type of a column, you can use the `.astype()` method. This method takes a data type as an argument and returns a new Series object with the converted data type.

```python
# Convert the ZipCode column to a string type
df['ZipCode'] = df['ZipCode'].astype(str)

# Check the data types again
df.dtypes
```