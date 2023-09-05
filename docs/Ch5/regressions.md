---
sidebar_position: 10
---

# 5.10 Preview to Regressions

Regressions offer a powerful way to understand how changes in one variable can influence the outcome of another. In the context of healthcare, regression analysis can be crucial for making informed decisions based on evidence from observational data.

While this section will present the mathematical underpinnings and formulas behind several regression models as a reference, it's crucial to recognize that in practice, professionals in health informatics often employ software tools such as Python, R, or SAS to perform these calculations. 
 
These tools abstract away the complexities of the math, allowing us to focus on understanding the results and making informed decisions. However, when uncertainties arise regarding the interpretations or application of these models, it's always beneficial to consult with biostatisticians or statisticians. Their expertise can provide clarity and ensure accurate, reliable analysis.

So to get into things, we will briefly introduce the types of regressions in this section, and then dive deep into each within the [next chapter](../../docs/Ch6/regression_intro) with more code examples and applications. 

## Linear Regression

### Definition
Linear regression models the relationship between two variables by fitting a linear equation to observed data. 

The simplest form of the regression equation with two variables is defined by:

$$
\text{Y} = \beta_0 + \beta_1X + \epsilon 
$$

Where:
- $( Y )$ is the dependent variable (the variable we are trying to predict),
- $( X )$ is the independent variable (the input),
- $\beta_0$ is the y-intercept,
- $\beta_1X$ is the slope of the line,
- $(\epsilon)$ is the error term (difference between observed and predicted values).

### Usage in Healthcare 
- To predict a patient's cholesterol level based on their weight.
- Evaluating the effect of drug dosage on symptom relief duration.

### Example Formula  

- Investigating the relationship between patient age and blood pressure.

$$
\text{Blood Pressure} = \beta_0 + \beta_1 \times \text{Age} 
$$

## Logistic Regression

### Definition

Logistic regression models the probability that the dependent variable belongs to a particular category. It's useful for binary outcomes (e.g., disease/no disease).

$$
 P(Y=1) = \frac{1}{1 + e^{-(\beta_0 + \beta_1X)}} 
$$

Where:
- $( P(Y=1) )$ is the probability of the class label $( Y )$ being "1",
- $( e )$ is the base of the natural logarithm (approximately equal to 2.71828).

### Usage in Healthcare 
- Predicting the probability of a patient developing diabetes based on age, diet, and physical activity.
- Estimating the likelihood of disease remission after a particular treatment.

### Example Formula  
- Predicting whether a patient will develop diabetes based on factors like age, weight, and family history.

$$
\ln\left(\frac{diabetes \space probability}{1-diabetes \space probability}\right) = \beta_0 + \beta_1 \times \text{Age}
$$

Where $( diabetes \space probability )$ is the probability of developing diabetes.


## Multivariate (Multiple) Linear Regression

### Definition 
When you have more than one independent variable, the process is called multivariate linear regression. This method is used when there are multiple predictors of the outcome.

$$
\text{Y} = \beta_0 + \beta_1X_1 + \beta_2X_2 + ... + \beta_nX_n + \epsilon 
$$

### Usage in Healthcare 
- Predicting a patient's blood pressure based on various factors like age, weight, salt intake, and genetic predisposition.
- Investigating how drug dosage and patient weight together influence blood glucose levels.

### Example Formula  

- Predicting patient life expectancy based on several features like age, diet, exercise frequency, and genetic factors.

$$
\text{Life Expectancy} = \beta_0 + \beta_1 \times \text{Diet Score} + \beta_2 \times \text{Exercise Frequency}
$$


## Cox Regression (Proportional Hazards Model)

### Definition
This is a type of survival regression. It models the time to a specified event, considering several predictors. 

The hazard function for the $( i )$ th individual in a Cox regression is:

$$
h(t|X_i) = h_0(t) \exp(\beta_1 X_{i1} + \beta_2 X_{i2} + ... + \beta_p X_{ip}) 
$$

Where:
- $( h(t|X_i) )$ is the hazard at time $( t )$ for individual $( i )$ with covariates $( X )$.
- $( h_0(t) )$ is the baseline hazard function, representing the hazard when all covariates are zero.
- $( \beta_1, \beta_2, ..., \beta_p )$ are the coefficients representing the change in hazard for a one-unit change in the corresponding covariate.
- $( X_{i1}, X_{i2}, ..., X_{ip} )$ are the covariate values for individual $( i )$.

### Usage in Healthcare 
- Analyzing how different treatments influence the time to relapse in cancer patients.
- Studying the time until a heart attack based on lifestyle factors.

### Example Formula  

- Identifying the most significant predictors of survival after a heart attack.
  - Age: Age of the patient at the time of the heart attack.
  - Treatment: Type of immediate treatment received post-heart attack. This could be categorized into a few types, such as "Medication," "Surgery," or "Lifestyle Changes."

$$
h(t|\text{Treatment, Age}) = h_0(t) \exp(\beta_1 \times \text{Treatment} + \beta_2 \times \text{Age}) 
$$

## Poisson Regression

### Definition

Used for modeling count data and understanding the effects of predictor variables on the outcome.

The Poisson regression model relates the natural log of the expected response to the predictors:

$$
\ln(E(Y_i)) = \beta_0 + \beta_1 X_{i1} + \beta_2 X_{i2} + ... + \beta_p X_{ip} 
$$

Where:
- $( E(Y_i) )$ is the expected count for the $(i)$ th observation.
- $( \beta_0 )$ is the intercept.
- $( \beta_1, \beta_2, ..., \beta_p )$ are the coefficients that describe the effect of the predictors.
- $( X_{i1}, X_{i2}, ..., X_{ip} )$ are the predictors for the $(i)$ th observation.

The response $( Y_i )$ is assumed to be Poisson distributed, and its mean $( E(Y_i) )$ is related to the predictors through the natural log function.

### Usage in Healthcare 
- Predicting the number of asthma attacks over a year based on exposure to pollutants.
- Estimating the number of flu cases in winter based on vaccination rates.

### Example Formula  

- Predicting the number of hospital admissions in a month based on weather patterns and air pollution levels.

$$
\ln(E(\text{Admissions})) = \beta_0 + \beta_1 \times \text{Air Pollution Level}
$$

Where $( E(\text{Admissions}) )$ is the expected number of hospital admissions.


---

Regressions form the backbone of many inferential statistical approaches in healthcare. They help in understanding how variables influence outcomes and are indispensable for evidence-based decision-making in clinical practice.

