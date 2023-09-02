---
sidebar_position: 2
---

# 6.2 Simple Linear Regression for Health Variables

## Introduction to Simple Linear Regression

Simple Linear Regression is a statistical method used to model the relationship between two variables: one independent variable (predictor) and one dependent variable (response). In a health context, it helps us understand how changes in the independent variable impact the dependent variable.

## Case Study: BMI and Blood Pressure

Let's consider a case study where we want to investigate the relationship between Body Mass Index (BMI) and blood pressure. We hypothesize that higher BMI may lead to higher blood pressure levels. Our goal is to build a simple linear regression model to quantify this relationship.

## Gathering Data

We collect data from a sample of individuals, recording their BMI and corresponding blood pressure measurements. This dataset serves as the basis for our analysis.

## Building the Regression Model

Using Python's `scikit-learn` library, we build a simple linear regression model to predict blood pressure based on BMI. The model fits a line that best represents the relationship between these two variables. The slope of the line indicates the change in blood pressure associated with a unit change in BMI.

## Interpreting the Results

We analyze the model's coefficients and statistics, including the intercept, slope, and R-squared value. The intercept represents the predicted blood pressure when BMI is zero, which may not have practical significance. The slope quantifies the change in blood pressure for each unit change in BMI.

## Visualization

We create scatter plots with the regression line overlaid to visually depict the relationship between BMI and blood pressure. This visualization helps us understand how closely the data points align with the regression line.

## Drawing Conclusions

With the regression analysis and visualization in hand, we draw conclusions about the relationship between BMI and blood pressure. The R-squared value tells us how well the model fits the data. A higher R-squared indicates a stronger fit, suggesting that BMI is a good predictor of blood pressure in our dataset.

Simple linear regression provides a foundational framework for understanding relationships between variables in health data. By applying this technique to the BMI and blood pressure case study, we demonstrate how it can help us quantify and interpret the impact of one variable on another in a healthcare context.
