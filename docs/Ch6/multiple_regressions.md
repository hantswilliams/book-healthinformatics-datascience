---
sidebar_position: 3
---

# 6.3 Multiple Regression 

## Introduction to Multiple Regression

Multiple Regression is an extension of simple linear regression that involves modeling the relationship between a dependent variable and two or more independent variables. 

Specifically in healthcare, outcomes are rarely influenced by a single factor. For instance, the incidence rate of an infection like MRSA in a hospital can be influenced by factors like the nurse-to-patient ratio, the cleanliness of the facility, the rate of handwashing compliance, and even external factors like the season of the year or local community infection rates.

By using multiple regression, we can:

1. Estimate the simultaneous effect of multiple predictors.
2. Control for potential confounding variables.
3. Understand complex relationships between variables.

## Case Study: Efficacy of a New Nurse Protocol on MRSA Infections

Let's simulate data for this scenario using the faker Python package.

Before building a model, the first step is always gathering the relevant data. In the context of our example, this would involve collecting data on nurse protocol compliance, handwashing compliance, nurse-to-patient ratios, and the number of MRSA infections.

This script first simulates data for 1,000 patients with varying levels of nurse protocol compliance, handwashing compliance, and nurse-to-patient ratios. 


```python

import pandas as pd
import numpy as np
from faker import Faker
from sklearn.linear_model import LinearRegression
import statsmodels.api as sm
import matplotlib.pyplot as plt

# Instantiate Faker
fake = Faker()

# Simulating Data
np.random.seed(42)  # for reproducibility

# Number of patients
n = 1000

# Variables
nurse_protocol_compliance = np.random.rand(n)  # This is our new protocol's compliance rate (0 to 1)
handwashing_compliance = np.random.rand(n)  # Rate of handwashing compliance (0 to 1)
nurse_to_patient_ratio = np.random.randint(1, 6, n)  # Ratio of nurses to patients

# Simulate MRSA infections (Our dependent variable)
# Let's assume the true model is -50*nurse_protocol_compliance - 30*handwashing_compliance + 5*nurse_to_patient_ratio + noise
noise = np.random.normal(0, 5, n)
mrsa_infections = -50*nurse_protocol_compliance - 30*handwashing_compliance + 5*nurse_to_patient_ratio + noise

data = pd.DataFrame({
    'Nurse_Protocol_Compliance': nurse_protocol_compliance,
    'Handwashing_Compliance': handwashing_compliance,
    'Nurse_to_Patient_Ratio': nurse_to_patient_ratio,
    'MRSA_Infections': mrsa_infections
})

print(data)

```

### Data Preporation 

This involves checking for missing values, outliers, and possibly transforming variables to better fit model assumptions (e.g., normalization or log transformations).

### Assumptions check 
Before running a multiple regression, there are several assumptions we must check. 

As you go through the below assumptions, remember that while these tests and visuals help to understand whether the assumptions are met, no real-world data will perfectly meet all assumptions. 

It's important to understand the extent of any violations and the implications for your specific analysis.

#### 1. Linearity
The relationship between the independent variables and the dependent variable should be linear. You can visualize this with scatterplots.

```python
import matplotlib.pyplot as plt

# Scatterplots
plt.figure(figsize=(20, 5))

plt.subplot(1, 3, 1)
plt.scatter(data['Nurse_Protocol_Compliance'], data['MRSA_Infections'])
plt.title('Nurse Protocol vs. MRSA Infections')

plt.subplot(1, 3, 2)
plt.scatter(data['Handwashing_Compliance'], data['MRSA_Infections'])
plt.title('Handwashing Compliance vs. MRSA Infections')

plt.subplot(1, 3, 3)
plt.scatter(data['Nurse_to_Patient_Ratio'], data['MRSA_Infections'])
plt.title('Nurse-to-Patient Ratio vs. MRSA Infections')

plt.tight_layout()
plt.show()
```

#### 2. Independence of Residuals
Durbin-Watson's test is used to check this assumption. Values between 1.5 and 2.5 are generally considered acceptable.

*Please note, this is ONLY RUN once you have generated your model*

```python
from statsmodels.stats.stattools import durbin_watson

dw_result = durbin_watson(model.resid)
print(f"Durbin-Watson Statistic: {dw_result}")
```

#### 3. Homoscedasticity
The residuals should have constant variance at every level of the independent variables. This can be visualized using a residuals vs. fitted values plot.

*Please note, this is ONLY RUN once you have generated your model*

```python
plt.scatter(model.predict(), model.resid)
plt.xlabel('Fitted values')
plt.ylabel('Residuals')
plt.title('Residuals vs. Fitted Values')
plt.show()
```

For a more formal test, you can use the Breusch-Pagan test from `statsmodels`:

```python
from statsmodels.stats.diagnostic import het_breuschpagan

bp_test = het_breuschpagan(model.resid, model.model.exog)
labels = ['LM Statistic', 'LM-Test p-value', 'F-Statistic', 'F-Test p-value']
print(dict(zip(labels, bp_test)))
```

#### 4. No Multicollinearity
Variance Inflation Factor (VIF) is used to detect multicollinearity. A rule of thumb is that if VIF > 10, then multicollinearity is high.

```python
from statsmodels.stats.outliers_influence import variance_inflation_factor

vif_data = pd.DataFrame()
vif_data['Variable'] = X.columns
vif_data['VIF'] = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]
print(vif_data)

```

#### 5. Normality of Residuals
The residuals should be approximately normally distributed. This can be checked visually using a QQ plot.

```python
sm.qqplot(model.resid, line='45', fit=True)
plt.title('QQ Plot')
plt.show()
```

For a more formal test, you can use the Shapiro-Wilk test (though it's sensitive to large samples):

```python
from scipy.stats import shapiro

stat, p = shapiro(model.resid)
print(f"Shapiro-Wilk Statistic: {stat}, p-value: {p}")
```

### Building the Multiple Regression Model

Using libraries such as `statsmodels` or `scikit-learn `in Python, you can build the regression model. The primary task is to fit the model to your data and then retrieve the coefficients (or parameters) for each predictor.

Using `scikit-learn` makes it convenient to build, predict, and evaluate linear regression models. However, for in-depth statistical insights and diagnostics, `statsmodels` is a very valuable tool. Ideally, you'll become comfortable using both, choosing the best tool for the specific task at hand.

```

# Using statsmodels
import statsmodels.api as sm

X = data[['Nurse_Protocol_Compliance', 'Handwashing_Compliance', 'Nurse_to_Patient_Ratio']]
X = sm.add_constant(X)  # Adds a constant column for the intercept
y = data['MRSA_Infections']

model = sm.OLS(y, X).fit()

```

Or here using `scikit-learn`:

```python

from sklearn.linear_model import LinearRegression

# Extracting predictor variables and target variable
X = data[['Nurse_Protocol_Compliance', 'Handwashing_Compliance', 'Nurse_to_Patient_Ratio']]
y = data['MRSA_Infections']

# Building the model
lin_reg = LinearRegression()
lin_reg.fit(X, y)

# Getting the coefficients and intercept
print("Intercept:", lin_reg.intercept_)
print("Coefficients:", list(zip(X.columns, lin_reg.coef_)))


```

### Model Evaluation:
Once the model is constructed, it's vital to evaluate its performance.

- **R-squared:** Represents the proportion of the variance for the dependent variable that's explained by independent variables in the regression model. A value close to 1 suggests our model explains a large proportion of the variance, whereas a value close to 0 indicates the opposite.

- **Adjusted R-squared**: Accounts for the number of predictors in the model. Especially useful when comparing models with a different number of predictors.

- **P-values**: For each coefficient, a p-value tests the null hypothesis that the coefficient is equal to zero (no effect). A low p-value (typically ≤ 0.05) indicates that you can reject the null hypothesis and conclude the predictor does have an effect on the outcome.


If using `scikit-learn`: 

```python

r2_score = lin_reg.score(X, y)
print(f"R-squared: {r2_score}")


```


### Model Interpretation

Interpret the sign and magnitude of the coefficients. For continuous predictors, the coefficient represents the change in the dependent variable for a one-unit change in the predictor, holding all other predictors constant. For categorical variables, it's the difference in the mean outcome between categories.


### Predicting with Scikit-learn

Once the model is trained, you can use it to make predictions:

```python

# Predict MRSA infections for new data
new_data = pd.DataFrame({
    'Nurse_Protocol_Compliance': [0.9, 0.8],
    'Handwashing_Compliance': [0.8, 0.7],
    'Nurse_to_Patient_Ratio': [2, 3]
})

predictions = lin_reg.predict(new_data)
print("Predicted MRSA Infections:", predictions)


```



### Visualization and Prediction

We visualize the model's predictions and actual outcomes using scatter plots and regression lines. This visual assessment helps us evaluate how well the model fits the data.

### Clinical Insights

By analyzing the multiple regression model, we gain insights into which factors significantly contribute to the drug's efficacy. We can identify which predictors have the strongest influence on the outcome and adjust treatment strategies accordingly.

### Drawing Conclusions

Multiple regression provides a powerful tool for analyzing the impact of multiple variables in clinical trials. By applying this technique to the drug efficacy case study, we showcase how it helps researchers understand the combined effects of various factors on the treatment's outcome.

Multiple regression is particularly valuable when studying complex health scenarios where multiple variables interact to influence outcomes. It enables researchers to account for confounding variables and identify key factors that contribute to clinical trial results.

