---
sidebar_position: 1
---

# 3.1 Handling Missing Values in Clinical Data

In the realm of healthcare data analysis, handling missing values is a critical step to ensure the accuracy and reliability of insights derived from the data. Clinical data often comes from various sources, such as electronic health records (EHRs), medical imaging, or patient surveys, and these sources may introduce missing data due to data entry errors, incomplete records, or technical issues. However, working with incomplete data can lead to biased results and inaccurate interpretations, emphasizing the need for robust strategies to handle missing values effectively.

Modern healthcare datasets can contain a wealth of information, but missing values can hinder our ability to extract meaningful insights. In this section, we will explore common approaches to handling missing values, ranging from removal and imputation to more advanced techniques. We'll delve into practical examples using Python and pandas, demonstrating how to detect and manage missing data efficiently.

## Missing Data 
Handling missing data is an important step in data preprocessing. Sometimes, missing data might not be immediately recognizable by pandas, especially when using different formats or custom representations for missing values. Let's take a look at examples of how pandas might not automatically recognize missing data and how we can handle such cases.

**Example 1: CSV File with Whitespace as Missing Data**

Suppose you have a CSV file with whitespace or blank cells representing missing data. When pandas reads the CSV file, it may not automatically recognize these as missing values:

```python
import pandas as pd

# Read CSV file with whitespace as missing data
csv_path = "data.csv"
df = pd.read_csv(csv_path)

print("Original DataFrame:")
print(df)

# Handling whitespace as missing data
df.replace(" ", pd.NA, inplace=True)

print("\nDataFrame with Missing Data Handled:")
print(df)
```

**Example 2: Custom Representation for Missing Data**

In some datasets, missing values might be represented using custom strings like "missing data" or "N/A". We need to explicitly tell pandas how to recognize and handle these custom representations:

```python
import pandas as pd

# Read CSV file with custom representation for missing data
csv_path = "data_custom.csv"
df = pd.read_csv(csv_path)

print("Original DataFrame:")
print(df)

# Handling custom representation for missing data
custom_missing_values = ["missing data", "N/A"]
df.replace(custom_missing_values, pd.NA, inplace=True)

print("\nDataFrame with Missing Data Handled:")
print(df)
```

In both examples, we use the `replace` function to convert non-standard representations of missing data into pandas' native representation (`pd.NA`). This ensures that pandas treats these values as missing and handles them appropriately during analysis.

It's important to review the data documentation or explore the data to identify any unconventional representations of missing data and handle them accordingly to ensure accurate analyses.

## Data Imputation
Data imputation is the process of filling in missing values in a dataset using various methods. When handling outliers, it's important to consider imputing missing values after addressing extreme values to ensure the imputed values are consistent with the distribution of the rest of the data.

## Why Data Imputation?
Missing data can impact the quality and reliability of analyses. Imputing missing values allows us to preserve the overall structure of the dataset and avoid biases that might occur from removing entire records with missing values.

## Imputation Approaches

1. Mean or Median Imputation: Replace missing values with the mean or median of the non-missing values in the same column. This is a simple method but might not be suitable for skewed distributions.

2. Regression Imputation: Use regression models to predict missing values based on other variables. This method takes relationships between variables into account.

3. K-Nearest Neighbors (KNN) Imputation: Impute missing values by considering the values of k-nearest neighbors in the dataset.

4. Multiple Imputation: Generate multiple imputed datasets and average the results to account for uncertainty in the imputation process.

## Python Examples

### Simple Mean Imputation 

In the below case study, we compute missing heart rate values using the mean of available heart rate measurements.

**Case Study:** In a cardiology clinic, a dataset contains patient information including age, sex, cholesterol levels, and heart rate readings. Some heart rate values are missing due to data entry issues.

**Objective**: To impute missing heart rate values using the mean of available heart rate measurements.

**Dataset**: Here's a simplified version of the dataset:

```python
import pandas as pd

data = {
    "Age": [45, 60, 35, 28, 50, 40, 55, 42, 38, 63],
    "Sex": ["Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female"],
    "Cholesterol": [200, 220, 180, 210, 240, 190, 230, 195, 205, 215],
    "Heart_Rate": [75, 80, None, 70, None, 85, 82, 78, None, 90],
}

df = pd.DataFrame(data)
```

**Code**: We'll use pandas to compute the mean of available heart rate measurements and then fill in the missing values with the computed mean.

```python
import pandas as pd

# Sample dataset with missing heart rate values
data = {
    "Age": [45, 60, 35, 28, 50, 40, 55, 42, 38, 63],
    "Sex": ["Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female"],
    "Cholesterol": [200, 220, 180, 210, 240, 190, 230, 195, 205, 215],
    "Heart_Rate": [75, 80, None, 70, None, 85, 82, 78, None, 90],
}

df = pd.DataFrame(data)

# Compute the mean heart rate (excluding missing values)
mean_heart_rate = df["Heart_Rate"].mean()

# Fill missing heart rate values with the computed mean
df["Heart_Rate"].fillna(mean_heart_rate, inplace=True)

print("Original DataFrame:")
print(data)

print("\nDataFrame with Imputed Heart Rate:")
print(df)
```

After running the code, you'll see the original DataFrame with missing heart rate values and the DataFrame with imputed heart rate values using the mean computation method. The missing heart rate values are filled in with the mean of available heart rate measurements, providing a more complete dataset for analysis.

### Multiple Imputation

Let's explore a clinical example involving multiple imputation for missing blood pressure values in a patient dataset.

**Case Study**: In a cardiology clinic, a dataset contains patient information including age, sex, cholesterol levels, and blood pressure readings. However, some blood pressure values are missing due to data collection issues.

**Objective**: To impute missing blood pressure values using the multiple imputation method.

**Dataset**: Here's a simplified version of the dataset:

```python
import pandas as pd

data = {
    "Age": [45, 60, 35, 28, 50, 40, 55, 42, 38, 63],
    "Sex": ["Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female"],
    "Cholesterol": [200, 220, 180, 210, 240, 190, 230, 195, 205, 215],
    "Systolic_BP": [120, 140, None, 130, 155, None, 145, None, 125, 150],
}

df = pd.DataFrame(data)
```

**Code**: To perform multiple imputation, we'll use the `IterativeImputer` class from scikit-learn. It estimates missing values based on relationships between variables using an iterative algorithm.

```python
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer
import pandas as pd

# Sample dataset with missing blood pressure values
data = {
    "Age": [45, 60, 35, 28, 50, 40, 55, 42, 38, 63],
    "Sex": ["Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female"],
    "Cholesterol": [200, 220, 180, 210, 240, 190, 230, 195, 205, 215],
    "Systolic_BP": [120, 140, None, 130, 155, None, 145, None, 125, 150],
}

df = pd.DataFrame(data)

# Create a copy of the dataset for imputation
imputation_df = df.copy()

# Drop the target column for imputation
imputation_df.drop(columns=["Systolic_BP"], inplace=True)

# Perform multiple imputation
imputer = IterativeImputer(max_iter=10, random_state=0)
imputed_data = imputer.fit_transform(imputation_df)

# Create a DataFrame with imputed values
imputed_df = pd.DataFrame(imputed_data, columns=imputation_df.columns)

# Combine imputed values with the original dataset
df_imputed = pd.concat([imputed_df, df["Systolic_BP"]], axis=1)

print("Original DataFrame:")
print(df)

print("\nDataFrame with Imputed Values:")
print(df_imputed)
```

After running the code, you'll see the original DataFrame with missing blood pressure values and the DataFrame with imputed values using the multiple imputation method. The missing blood pressure values are estimated based on relationships with other variables, leading to a more complete dataset for analysis.