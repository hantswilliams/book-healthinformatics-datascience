---
sidebar_position: 12
---

# 1.12 Important Python Concepts and Methods 

Before we move in, we need to discuss and introduce some common python methods that will be utilized in this book. 

## Functions (Named Functions)

Named functions, also known as user-defined functions or custom functions, are blocks of reusable code that perform a specific task. Unlike built-in functions, which are available in programming languages or libraries, named functions are created by the programmer to suit their specific needs. Here are some key points about named functions

**Key Components of a User-Defined (named) Function:**

1. **`def` Keyword:** The `def` keyword is used to define a function in Python. It is followed by the function's name and a pair of parentheses.

2. **Function Name:** The function name is a user-defined identifier that follows the `def` keyword. It should be descriptive and follow naming conventions (usually lowercase with words separated by underscores).

3. **Input Variables (Parameters):** Inside the parentheses, you can specify input variables, also known as parameters. These variables are placeholders for the values that will be passed to the function when it's called.

4. **Colon (`:`):** The colon marks the end of the function header and indicates the start of the function's code block.

5. **Function Body:** The function body contains the actual code that defines the behavior of the function. It can include any valid Python statements.

6. **`return` Statement:** Functions can optionally use the `return` statement to specify what value the function should yield as a result. If there's no `return` statement or it doesn't provide a value, the function returns `None` by default.

Here's an example of a user-defined function in healthcare that calculates the Body Mass Index (BMI) for a patient based on their weight in kilograms and height in meters:

```python
def calculate_bmi(weight_kg, height_m):
    """
    Calculate the Body Mass Index (BMI) for a patient.

    Args:
        weight_kg (float): Weight in kilograms.
        height_m (float): Height in meters.

    Returns:
        float: BMI value.
    """
    if height_m <= 0:
        raise ValueError("Height must be greater than zero.")
    
    bmi = weight_kg / (height_m ** 2)
    return bmi
```

In this function:

- `calculate_bmi` is the function name.
- `(weight_kg, height_m)` are the input variables (parameters).
- The function body contains code to calculate the BMI.
- The `return` statement provides the calculated BMI as the result.

Now, the comments included within the function, enclosed in triple double-quotes """, are known as docstrings, short for "documentation strings." Docstrings are a form of documentation that serve several important purposes:

1. Code Readability: Well-documented code is more readable and maintainable. Docstrings make it clear what the function's purpose is, which can help developers understand the code's logic without having to dive into the details of the implementation.

2. Auto-Generated Documentation: Many documentation tools and integrated development environments (IDEs) can automatically extract docstrings to generate documentation. This makes it easy to create documentation for your code without much additional effort.

3. Code Validation: Docstrings can be used to validate the correctness of your code. Some tools and linters can check if your docstrings match the function's signature and if the descriptions are clear and complete.

4. Interactive Help: In interactive Python environments like Jupyter Notebook or IPython, you can access docstrings by typing the function name followed by a ?. This provides instant help and documentation.

Finally, to run this function, we would call this function with patient data to calculate their BMI:

```python
patient_bmi = calculate_bmi(70.0, 1.75)
print("Patient's BMI:", patient_bmi)
```

## Lambda Functions (Nameless Functions)

In Python, a `lambda` function is a small, anonymous function defined using the lambda keyword. Lambda functions can have any number of arguments but can only have one expression. They are particularly useful when you need a simple function for a short period or in a specific context. Lambda functions are often used in conjunction with functions like `map()`, `filter()`, and `apply()`

If we were to write a **named** funciton, it would look something like this:

```python
import pandas as pd

# Create a sample DataFrame
data = {'Numbers': [1, 2, 3, 4, 5]}
df = pd.DataFrame(data)

# Using a standard named function to square a number, we have our DEF and two lines with a return 
def square(x):
    return x ** 2

# Using the named function to square each number
df['Squared_Numbers'] = df['Numbers'].apply(square)

print(df)

```

Versus, here's a simple example of a lambda function that calculates the square of a number:

```python

import pandas as pd

# Create a sample DataFrame
data = {'Numbers': [1, 2, 3, 4, 5]}
df = pd.DataFrame(data)

## Lambda is nameless, has one single line, no return, and we still designate a input with X or whatever
## character want to  
square = lambda x: x**2 

df['Squared_Numbers'] = df['Numbers'].apply(square)

print(df['Squared_Numbers'])  
```

## Apply Method 

Now in the above example, we see that we are using a method called `apply`. 

The `apply` method is a function in Pandas used to apply a given function to each element of a Pandas Series or DataFrame. It is a powerful tool for data manipulation and transformation. You can use it to apply custom functions, including lambda functions, to data within a DataFrame or Series, making it a valuable tool for data preprocessing and feature engineering. Lastly, you can use `apply` in various contexts, not just with Pandas. For example, it can be applied to lists, arrays, or any iterable to perform operations on each element.

Use cases: 

1. **Pandas DataFrames and Series**: In Pandas, apply is primarily used to apply a function along the axis of a DataFrame or Series. It can operate on both rows and columns.

2. **Function with Arguments**: apply is suitable when you need to apply a function that takes one or more arguments to each element in a DataFrame or Series. It's flexible for complex operations and custom functions.

3. **Element-Wise Operations**: It is often used for element-wise operations within a DataFrame or Series.

Now, let's say we have a Pandas DataFrame with a column of numbers, and we want to apply a function to each element in that column. We can use the apply method to achieve this:

```python
import pandas as pd

# Create a sample DataFrame
data = {'Numbers': [1, 2, 3, 4, 5]}
df = pd.DataFrame(data)

# Define a function to double a number
def double(x):
    return x * 2

# Use the apply method to apply the function to the 'Numbers' column
df['Doubled_Numbers'] = df['Numbers'].apply(double)

print(df)
```

Now, you may have noticed here that we **did not include a variable into the function** as we would normally do, if we were calling the function normally. 

When you use the `apply` method in Pandas, you typically don't need to explicitly provide an input argument to the function you're applying. This is because the apply method is designed to work on each element of a Series or DataFrame automatically.


## Map Method

The `map` function is a built-in Python function that's used to apply a given function to each item in an iterable (like a list, tuple, or Series) and return an iterable of the results. It's a concise and efficient way to transform data in a collection by applying the same operation to every element.

Use cases:

1. **Pandas Series**: map is primarily used with Pandas Series. It allows you to apply a function to each element of a Series.

2. **Element-Wise Transformation**: It's typically used for element-wise transformations of a Series, where each element is transformed independently based on the provided function.

3. **Dictionary Mapping**: map is especially useful when you want to map values in a Series to other values using a dictionary or a mapping function.

Let's consider a healthcare example where we have a dataset of patients, and we want to categorize their ages into age groups using the `map` function. We'll create a new column called `Age_Group` based on the following categories:

- Under 18
- 18-30
- 31-45
- 46-60
- Over 60

In the below example, we define a function `map_age_to_group` to categorize ages into groups and then uses the `map` function to apply it to the 'Age' column, creating a new 'Age_Group' column in the DataFrame. The result is a DataFrame with age groups assigned to each patient based on their age.

```python
import pandas as pd

# Sample healthcare dataset
data = {
    'Patient_ID': [1, 2, 3, 4, 5],
    'Age': [25, 19, 38, 52, 63]
}

df = pd.DataFrame(data)

# Define a function to map ages to age groups
def map_age_to_group(age):
    if age < 18:
        return 'Under 18'
    elif 18 <= age <= 30:
        return '18-30'
    elif 31 <= age <= 45:
        return '31-45'
    elif 46 <= age <= 60:
        return '46-60'
    else:
        return 'Over 60'

# Apply the map function to create the Age_Group column
df['Age_Group'] = df['Age'].map(map_age_to_group)

print(df)
```

Key Differences Between `map` and `apply`:

1. **Applicability:** `map` is typically used with simple, element-wise operations that don't require access to the entire DataFrame or Series. It's more suitable for straightforward tasks like applying a mathematical operation, changing the data type of each element, or mapping values to new values.

2. **Input:** `map` works directly on Series (or other iterables) and is used to apply a function to each element individually. In contrast, `apply` is primarily used with DataFrames and Series and allows you to apply functions that work on entire columns or rows, where you may need access to multiple elements at once.

3. **Output:** `map` returns a new iterable (e.g., a new Series) with the transformed values, leaving the original data unchanged. `apply` often modifies the original DataFrame or Series in place.

4. **Flexibility:** `apply` is more versatile because it can apply functions that take a Series or DataFrame as input. This enables more complex operations and aggregations.

In summary, `apply` is more flexible and suited for more complex operations and DataFrame-wide operations in Pandas. `map`, on the other hand, is commonly used with Pandas Series for simple element-wise transformations and dictionary-based mappings, but it can also be used with other iterables in Python


## Classes 

Classes are a fundamental concept in object-oriented programming (OOP). They allow you to define a blueprint for creating objects (instances) that share common attributes and behaviors. In Python, everything is an object, and classes provide a way to create custom objects with their own properties (attributes) and methods (functions).

Here's a basic example of defining a class and creating objects from it:

```python
class Patient:
    def __init__(self, name, age, diagnosis):
        self.name = name
        self.age = age
        self.diagnosis = diagnosis
        self.medical_history = []
    
    def add_medical_record(self, record):
        self.medical_history.append(record)
    
    def get_medical_history(self):
        return self.medical_history

# Creating patient objects
patient1 = Patient("Alice Smith", 35, "Hypertension")
patient2 = Patient("Bob Johnson", 50, "Diabetes")

# Adding medical records
patient1.add_medical_record("High blood pressure medication prescribed.")
patient2.add_medical_record("Started insulin therapy for diabetes.")

# Accessing patient information
print(f"{patient1.name} is {patient1.age} years old and has been diagnosed with {patient1.diagnosis}.")
print(f"{patient2.name} is {patient2.age} years old and has been diagnosed with {patient2.diagnosis}.")

# Accessing medical history
print(f"Medical history for {patient1.name}: {patient1.get_medical_history()}")
print(f"Medical history for {patient2.name}: {patient2.get_medical_history()}")
```

In this updated example:

- We define a `Patient` class with attributes such as `name`, `age`, `diagnosis`, and `medical_history`. The `medical_history` attribute is a list to store medical records.

- The class has methods like `add_medical_record` to add medical records and `get_medical_history` to retrieve the patient's medical history.

- We create two `Patient` objects (`patient1` and `patient2`) and add medical records to each.

- We access patient information and medical history.

This `Patient` class models a simplified representation of a patient's healthcare data, including personal information and medical records. It demonstrates how classes can be used to organize and manage healthcare-related data in Python.
