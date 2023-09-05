---
sidebar_position: 3
---

# 5.3 Statistical Test Selection 

Selecting the right statistical test is a crucial step in the data analysis process. It ensures that the conclusions drawn from the analysis are accurate, reliable, and meaningful. However, with the availability of tools like Python and R, it's easy to fall into the trap of running tests without considering whether they are appropriate for the data and research question at hand. This highlights the importance of understanding the types of data, the research objectives, and the assumptions underlying each test.

## Parametric vs Non-parametric 

When selecting a statistical test, one crucial distinction to consider is whether the test is parametric or non-parametric. This classification is based on the assumptions made about the underlying distribution of the data. Parametric tests assume that the data follows a specific distribution, typically the normal distribution, while non-parametric tests do not rely on distributional assumptions. Understanding the nature of your data and the assumptions of the chosen test is essential to ensure accurate and reliable results.

### Parametric Tests
Parametric tests are powerful and efficient when data meets the assumptions of the chosen distribution. These tests provide precise estimates of population parameters and often require less data to achieve a given level of statistical power. However, they are sensitive to violations of distributional assumptions.

#### Examples of Parametric Tests:

**Continuous Data:**
- Student's t-test: Compare means of two independent groups.
- Paired t-test: Compare means of two related groups (paired observations).
- Analysis of Variance (ANOVA): Compare means of three or more independent groups.
- Repeated Measures ANOVA: Compare means of three or more related groups (repeated measures).
- Linear Regression: Examine relationships between continuous predictor(s) and a continuous outcome.
- Multiple Regression: Examine relationships between multiple predictor variables and a continuous outcome.

**Categorical Data:**
- Chi-Square Test: Assess independence between two categorical variables.
- ANOVA (One-Way): Compare means of a continuous variable across different levels of a categorical variable.
- Two-Way ANOVA: Examine interactions between two categorical variables on a continuous outcome.

**Correlation:**
- Pearson Correlation: Measure the linear relationship between two continuous variables.
- Linear Regression: Examine relationships between continuous predictor(s) and a continuous outcome.

### Non-Parametric Tests
Non-parametric tests are robust to deviations from distributional assumptions and are suitable for data that may not follow a normal distribution. These tests are based on rank-order statistics and are ideal for ordinal or skewed data. While they provide a less detailed estimation of population parameters compared to parametric tests, they are a valuable option when assumptions are not met.

#### Examples of Non-Parametric Tests:

**Continuous Data:**
- Mann-Whitney U Test: Compare medians of two independent groups.
- Wilcoxon Signed-Rank Test: Compare medians of two related groups (paired observations).
- Kruskal-Wallis Test: Compare medians of three or more independent groups.
- Friedman Test: Compare medians of three or more related groups (repeated measures).

**Categorical Data:**
- Chi-Square Test: Assess independence between two categorical variables.
- Mann-Whitney U Test: Compare medians of two independent groups.

**Correlation:**
- Spearman Correlation: Measure the monotonic relationship between two continuous variables.
- Kendall's Tau: Measure the strength and direction of dependence between two ordinal variables.

## Decision Aids and Guidelines

There are several decision charts, flowcharts, and guidelines available that can help researchers choose the appropriate statistical test based on the characteristics of their data and research question. These decision aids take into account factors such as data types (categorical, continuous), number of groups, and the nature of the comparison (dependent, independent, paired, unpaired).

Consulting these guides can help researchers navigate the selection process and avoid common pitfalls like using a parametric test when data distribution assumptions are violated, or using a test that doesn't account for the specific study design. 

The below tables are re-created from a [peer-reviewed PubMed publication](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6639881/) that focuses on statistical test selection as a basic example:

### Parametric and their Alternative Nonparametric Methods

| Description                                   | Parametric Methods                                | Nonparametric Methods                            |
|-----------------------------------------------|---------------------------------------------------|-------------------------------------------------|
| Descriptive statistics                        | Mean, Standard deviation                         | Median, Interquartile range                     |
| Sample with population (or hypothetical value)| One sample t-test (n <30) and One sample Z-test (n ≥30) | One sample Wilcoxon signed rank test         |
| Two unpaired groups                           | Independent samples t-test (Unpaired samples t-test) | Mann Whitney U test/Wilcoxon rank sum test   |
| Two paired groups                             | Paired samples t-test                           | Related samples Wilcoxon signed-rank test     |
| Three or more unpaired groups                 | One-way ANOVA                                   | Kruskal-Wallis H test                         |
| Three or more paired groups                   | Repeated measures ANOVA                         | Friedman Test                                 |
| Degree of linear relationship between two variables | Pearson’s correlation coefficient          | Spearman rank correlation coefficient       |
| Predict one outcome variable by at least one independent variable | Linear regression model          | Nonlinear regression model/Log linear regression model on log normal data |

### Statistical Methods to Compare the Proportions

| Description                                                        | Statistical Methods                         | Data Type                      |
|--------------------------------------------------------------------|---------------------------------------------|--------------------------------|
| Test the association between two categorical variables (Independent groups) | Pearson Chi-square test/Fisher exact test | Variable has ≥2 categories    |
| Test the change in proportions between 2/3 groups (paired groups)  | McNemar test/Cochrane Q test             | Variable has 2 categories       |
| Comparisons between proportions                                    | Z test for proportions                    | Variable has 2 categories       |

### Semi-parametric and non-parametric methods 

| Description                                                      | Statistical methods                     | Data type |
|------------------------------------------------------------------|-----------------------------------------|-----------|
| To predict the outcome variable using independent variables      | Binary Logistic regression analysis    | Outcome variable (two categories), Independent variable (s): Categorical (≥2 categories) or Continuous variables or both |
| To predict the outcome variable using independent variables      | Multinomial Logistic regression analysis | Outcome variable (≥3 categories), Independent variable (s): Categorical (≥2 categories) or continuous variables or both |
| Area under Curve and cutoff values in the continuous variable    | Receiver operating characteristics (ROC) curve | Outcome variable (two categories), Test variable : Continuous |
| To predict the survival probability of the subjects for the given equal intervals | Life table analysis              | Outcome variable (two categories), Follow-up time : Continuous variable |
| To compare the survival time in ≥2 groups with P                 | Kaplan--Meier curve                     | Outcome variable (two categories), Follow-up time : Continuous variable, One categorical group variable |
| To assess the predictors those influencing the survival probability | Cox regression analysis           | Outcome variable (two categories), Follow-up time : Continuous variable, Independent variable(s): Categorical variable(s) (≥2 categories) or continuous variable(s) or both |
| To predict the diagnostic accuracy of the test variable as compared to gold standard method | Diagnostic accuracy (Sensitivity, Specificity etc.) | Both variables (gold standard method and test method) should be categorical (2 × 2 table) |
| Absolute Agreement between two diagnostic methods                | Unweighted and weighted Kappa statistics/Intra class correlation | Between two Nominal variables (unweighted Kappa), Two Ordinal variables (Weighted kappa), Two Continuous variables (Intraclass correlation) |




## Consulting a Statistician

However, even with these aids, the complexity of real-world data can make the selection process challenging. In such cases, seeking advice from a professional statistician can be invaluable. Statisticians have a deep understanding of the underlying theory and assumptions of different tests and can provide expert guidance on selecting the most appropriate test for a given research question. They can also help interpret the results correctly, taking into account potential limitations or biases.

---

In summary, selecting the right statistical test is a skill that requires a clear understanding of the research question, data characteristics, and assumptions underlying each test. While tools and decision aids are helpful, the involvement of a statistician can provide an extra layer of confidence in the analysis and its conclusions. It's a crucial step toward ensuring the validity and reliability of research findings in health informatics and beyond.
