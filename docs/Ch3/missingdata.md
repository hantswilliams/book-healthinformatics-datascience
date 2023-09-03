---
sidebar_position: 1
---

# 3.1 Handling Missing Values in Clinical Data

In the realm of healthcare data analysis, handling missing values is a critical step to ensure the accuracy and reliability of insights derived from the data. Clinical data often comes from various sources, such as electronic health records (EHRs), medical imaging, or patient surveys, and these sources may introduce missing data due to data entry errors, incomplete records, or technical issues. However, working with incomplete data can lead to biased results and inaccurate interpretations, emphasizing the need for robust strategies to handle missing values effectively.

Modern healthcare datasets can contain a wealth of information, but missing values can hinder our ability to extract meaningful insights. In this section, we will explore common approaches to handling missing values, ranging from removal and imputation to more advanced techniques. We'll delve into practical examples using Python and pandas, demonstrating how to detect and manage missing data efficiently.

## Missing Data 
Handling missing data is an important step in data preprocessing. Sometimes, missing data might not be immediately recognizable by pandas, especially when using different formats or custom representations for missing values. Let's take a look at examples of how pandas might not automatically recognize missing data and how we can handle such cases.

**Example 1: CSV File with Whitespace as Missing Data**

Suppose you have a CSV file with whitespace or blank cells representing missing data. Heres how we can use python to create a small fake dataframe with missing values:

```python
import pandas as pd

# Create a DataFrame with whitespace as missing data
data = {
    "Patient_ID": [101, 102, 103, 104],
    "Age": [28, " ", 45, 32],
    "Gender": ["Male", "Female", " ", "Female"],
    "Blood_Pressure": ["120/80", " ", "140/90", " "]
}

df = pd.DataFrame(data)

# Save the DataFrame to a CSV file
csv_path = "data.csv"
df.to_csv(csv_path, index=False)

print("CSV file created successfully.")
```

Now, when we use pandas reads the CSV file, it may not automatically recognize these as missing values:

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

In some datasets, missing values might be represented using custom strings like "missing data" or "N/A". 

Lets first create the fake csv file with these new ways of capturing 'missing':

```python
import pandas as pd

# Create a DataFrame with custom representation for missing data
data = {
    "Patient_ID": [101, 102, 103, 104],
    "Age": [28, "missing data", 45, "N/A"],
    "Gender": ["Male", "Female", "missing data", "Female"],
    "Blood_Pressure": ["120/80", "N/A", "140/90", "missing data"]
}

df = pd.DataFrame(data)

# Save the DataFrame to a CSV file
csv_path = "data_custom.csv"
df.to_csv(csv_path, index=False)

print("CSV file with custom missing data created successfully.")
```

Now that we have that, lets load it and explicitly tell pandas how to recognize and handle these custom representations:

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

1. **Mean or Median Imputation:** Replace missing values with the mean or median of the non-missing values in the same column. This is a simple method but might not be suitable for skewed distributions.

    - When to Use: Mean or median imputation is simple and quick, making it suitable when you have a small amount of missing data and want a straightforward approach. It can be useful when the missing data mechanism is random and not dependent on other variables.
    - Complexity: Low complexity. It involves calculating the mean or median and replacing missing values.
    - Concerns: This method assumes that the distribution of the variable is similar for both missing and non-missing values. It can distort the variable's distribution and underestimate the variance, leading to biased estimates if the data is not missing at random or if the distribution is skewed.

2. **Regression Imputation:** Use regression models to predict missing values based on other variables. This method takes relationships between variables into account.

    - When to Use: Regression imputation is appropriate when there is a clear relationship between the missing variable and other variables in the dataset. It takes into account these relationships to make imputations.
    - Complexity: Moderate complexity. It requires building regression models to predict missing values based on other variables.
    - Concerns: This method assumes that the relationship between the missing variable and the predictor variables is linear and consistent across observations. Overfitting might occur if the model is too complex, and the method might not work well if the relationships are not well-defined.

3. **K-Nearest Neighbors (KNN) Imputation:** Impute missing values by considering the values of k-nearest neighbors in the dataset.

    - When to Use: KNN imputation can be used when the data points are related, and similar observations are expected to have similar values. It's particularly useful when variables have local correlations.
    - Complexity: Moderate complexity. It involves calculating distances between observations and finding the k-nearest neighbors.
    - Concerns: The effectiveness of KNN imputation depends on the choice of k (number of neighbors) and the distance metric used. It can be sensitive to the scale of variables and might not work well if the dataset lacks clear patterns.

4. **Multiple Imputation:** Generate multiple imputed datasets and average the results to account for uncertainty in the imputation process.

    - When to Use: Multiple imputation is a robust approach suitable for cases with moderate to high amounts of missing data and when missingness is not completely at random.
    - Complexity: Higher complexity. It involves creating multiple imputed datasets and averaging the results.
    - Concerns: Multiple imputation addresses the uncertainty of imputation by generating several imputed datasets. However, it can be computationally intensive and requires careful consideration of the imputation model, number of imputations, and methods for combining results.

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
# Compute the mean heart rate (excluding missing values)
mean_heart_rate = df["Heart_Rate"].mean()

# Fill missing heart rate values with the computed mean
df["Heart_Rate"].fillna(mean_heart_rate, inplace=True)

print("Original DataFrame:")
print(data)

print("\nDataFrame with Imputed Heart Rate:")
print(df)
```

```yaml
Original DataFrame:
{'Age': [45, 60, 35, 28, 50, 40, 55, 42, 38, 63], 'Sex': ['Male', 'Female', 'Male', 'Female', 'Male', 'Female', 'Male', 'Female', 'Male', 'Female'], 'Cholesterol': [200, 220, 180, 210, 240, 190, 230, 195, 205, 215], 'Heart_Rate': [75, 80, None, 70, None, 85, 82, 78, None, 90]}

DataFrame with Imputed Heart Rate:
   Age     Sex  Cholesterol  Heart_Rate
0   45    Male          200        75.0
1   60  Female          220        80.0
2   35    Male          180        80.0
3   28  Female          210        70.0
4   50    Male          240        80.0
5   40  Female          190        85.0
6   55    Male          230        82.0
7   42  Female          195        78.0
8   38    Male          205        80.0
9   63  Female          215        90.0
```


After running the code, you'll see the original DataFrame with missing heart rate values and the DataFrame with imputed heart rate values using the mean computation method. The missing heart rate values are filled in with the mean of available heart rate measurements, providing a more complete dataset for analysis.

### Multiple Imputation

Let's explore a clinical example involving multiple imputation for missing medical costs data in a patient dataset.

The objective of this case study is to demonstrate how to handle missing data in a healthcare dataset. We will focus on imputing missing values in the `Age` and `Annual_Medical_Costs` columns using the iterative imputation technique. The dataset contains information about patients' gender, age, and annual medical costs. Missing values in the `Age` and `Annual_Medical_Costs` columns will be imputed using the relationships within the dataset. This example aims to showcase how imputation can help retain valuable information for analysis while addressing the issue of missing data in healthcare-related variables.

```python
import pandas as pd
import numpy as np
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer

# Create a sample dataset with missing values
data = {
    "Gender": ["Male", "Female", "Male", "Female", "Male"],
    "Age": [25, None, 30, 40, None],
    "Annual_Medical_Costs": [5000, 6000, None, 7500, None]
}

df = pd.DataFrame(data)
```

**Code**: To perform multiple imputation, we'll use the `IterativeImputer` class from scikit-learn. It estimates missing values based on relationships between variables using an iterative algorithm.

```python
# Perform multiple imputation
imputer = IterativeImputer(max_iter=10, random_state=0)
imputed_data = imputer.fit_transform(df[["Age", "Annual_Medical_Costs"]])

# Create a DataFrame with imputed values
imputed_df = pd.DataFrame(imputed_data, columns=["Age", "Annual_Medical_Costs"])

# Combine imputed values with the original dataset
df_imputed = pd.concat([df[["Gender"]], imputed_df], axis=1)

print("Original DataFrame:")
print(df)

print("\nDataFrame with Imputed Values:")
print(df_imputed)

```

*Example output*:

```yaml
Original DataFrame:
   Gender   Age  Annual_Medical_Costs
0    Male  25.0                5000.0
1  Female   NaN                6000.0
2    Male  30.0                   NaN
3  Female  40.0                7500.0
4    Male   NaN                   NaN

DataFrame with Imputed Values:
   Gender        Age  Annual_Medical_Costs
0    Male  25.000000           5000.000000
1  Female  30.990213           6000.000000
2    Male  30.000000           5833.905899
3  Female  40.000000           7500.000000
4    Male  31.497553           6083.476475
```