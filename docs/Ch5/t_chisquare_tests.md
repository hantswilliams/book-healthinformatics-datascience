---
sidebar_position: 6
---

# 5.6 T-tests and Chi-square Tests in Health Research

Both t-tests and chi-square tests are fundamental statistical tests widely employed in health research. While t-tests compare means, chi-square tests evaluate associations between categorical variables. Understanding the right context and assumptions for each is vital for their appropriate application.

## T-tests

T-tests assess whether the means of two groups are statistically different from each other.

### Applications 

**Comparing Treatment Efficacies:** A hospital wants to determine if a new pain-relief drug is more effective than the current standard medication. An independent samples t-test can compare the mean pain scores of patients on the new drug versus those on the standard medication.

**Pre and Post Treatment Comparisons:** A clinic is studying the impact of a new rehabilitation protocol on patients' mobility scores. A paired t-test can be used to compare patients' mobility scores before and after undergoing the rehabilitation.

**Evaluating New Medical Devices:** A healthcare technology company has developed a new type of thermometer. A one-sample t-test can be used to compare readings from the new thermometer against a known standard to validate its accuracy.


### Types
- **Independent Samples t-test**: Compares the means of two independent groups (e.g., treatment vs. control).
- **Paired Sample t-test**: Compares the means from the same group at different times (e.g., pre-treatment vs. post-treatment).
- **One Sample t-test**: Compares the mean of a single group against a known mean.

### Assumptions
- The data is continuous.
- The data follows a normal distribution (parametric test).
- Homogeneity of variance (equal variances) for an independent samples t-test.

### Interpretation

**T-statistic**: Represents how many standard deviations the sample mean is from the population mean, under the null hypothesis. A larger t-statistic indicates a larger difference between the groups.

**P-value**: Indicates the probability of observing a t-statistic as extreme as the one calculated (or more extreme) if the null hypothesis were true.
- **P < 0.05**: Often denotes that the difference in means between the two groups is statistically significant. The smaller the p-value, the stronger the evidence against the null hypothesis.
- **P ≥ 0.05**: Indicates that there's not enough statistical evidence to reject the null hypothesis.
Confidence Interval: Provides a range of values for the difference in means. If the CI includes zero, it suggests no significant difference. If it doesn't include zero, the difference is significant at the chosen level.

**Basic Example**: In a t-test comparing the efficacy of two drugs, a p-value of 0.02 suggests the difference in their efficacy is statistically significant at the 0.05 level. If the confidence interval for the difference in means is (0.5, 3.2), we can say we're 95% confident that Drug A is between 0.5 and 3.2 units more effective than Drug B.

### Full Python Example

Imagine a cardiology department at a major hospital is investigating two types of medications: CardioFix and HeartMend. Both are aimed at reducing systolic blood pressure in patients with hypertension. The primary research question is:

- "Is there a significant difference in the mean reduction of systolic blood pressure between patients who take CardioFix and those who take HeartMend over a 6-month period?"

For our demonstration, we'll generate synthetic patient data for both medications using the faker package.

```python
import pandas as pd
import numpy as np
from scipy import stats
from faker import Faker

# Set the seed for reproducibility
np.random.seed(42)
fake = Faker()

# Generate synthetic patient data
num_patients = 100

# Generate names
patient_names = [fake.name() for _ in range(num_patients)]

# Generate baseline systolic BP (130-180 mm Hg) and reductions (5-40 mm Hg) after 6 months on CardioFix
baseline_BP_CardioFix = np.random.randint(130, 180, num_patients // 2)
reduction_CardioFix = np.random.randint(5, 40, num_patients // 2)

# Generate baseline systolic BP and reductions after 6 months on HeartMend
baseline_BP_HeartMend = np.random.randint(130, 180, num_patients // 2)
reduction_HeartMend = np.random.randint(10, 45, num_patients // 2)

# Create a DataFrame
df_CardioFix = pd.DataFrame({
    'Patient': patient_names[:num_patients // 2],
    'Medication': 'CardioFix',
    'Baseline_BP': baseline_BP_CardioFix,
    'Reduction': reduction_CardioFix
})

df_HeartMend = pd.DataFrame({
    'Patient': patient_names[num_patients // 2:],
    'Medication': 'HeartMend',
    'Baseline_BP': baseline_BP_HeartMend,
    'Reduction': reduction_HeartMend
})

df = pd.concat([df_CardioFix, df_HeartMend], axis=0)

# Perform a t-test on the Reduction values for both groups
t_stat, p_value = stats.ttest_ind(df[df['Medication'] == 'CardioFix']['Reduction'], 
                                  df[df['Medication'] == 'HeartMend']['Reduction'])

# Calculate confidence intervals for mean reductions
confidence_level = 0.95
degrees_freedom = num_patients - 2

CI_CardioFix = stats.t.interval(confidence_level, degrees_freedom,
                                loc=df[df['Medication'] == 'CardioFix']['Reduction'].mean(),
                                scale=stats.sem(df[df['Medication'] == 'CardioFix']['Reduction']))

CI_HeartMend = stats.t.interval(confidence_level, degrees_freedom,
                                loc=df[df['Medication'] == 'HeartMend']['Reduction'].mean(),
                                scale=stats.sem(df[df['Medication'] == 'HeartMend']['Reduction']))

print(f"T-statistic: {t_stat}")
print(f"P-value: {p_value}")
print(f"Confidence Interval for CardioFix: {CI_CardioFix}")
print(f"Confidence Interval for HeartMend: {CI_HeartMend}")

```

```yaml
T-statistic: -2.581745823458808
P-value: 0.011310398881015994
```

T-statistic: −2.581745823458808
The negative sign of the t-statistic indicates that the mean reduction in systolic blood pressure for the group taking CardioFix is lower than for the group taking HeartMend.

P-value: 0.011310398881015994
The p-value is a measure of evidence against a null hypothesis. In this context, our null hypothesis was that there's no difference in the mean reduction of systolic blood pressure between the two medications.

Given that our p-value is approximately 0.0113, which is less than 0.05, there's sufficient evidence to reject the null hypothesis.

So our conclusion might be: There is a statistically significant difference in the mean reduction of systolic blood pressure between patients who take CardioFix and those who take HeartMend over a 6-month period. Specifically, HeartMend appears to be more effective in reducing systolic blood pressure than CardioFix given the negative t-statistic value. However, it's crucial to remember that "statistically significant" does not necessarily mean "clinically significant." The actual mean differences and their potential clinical implications should be considered in a real-world scenario. Always consult with clinical experts to understand the practical significance of such findings.



## Chi-square Tests

Chi-square tests assess whether there is a significant association between two categorical variables. They compare the observed frequencies in a contingency table with the expected frequencies under the assumption of independence between the variables. The result is a chi-square statistic, which is compared to a chi-square distribution to determine statistical significance.

### Applications 

Chi-square tests are widely used in healthcare and medical research:

- **Epidemiology**: Chi-square tests help analyze associations between exposure variables (e.g., smoking) and outcomes (e.g., disease occurrence).

- **Clinical Studies**: Researchers use chi-square tests to explore associations between treatment groups and outcomes.

- **Genetics**: Chi-square tests assess the significance of deviations from expected genotype frequencies in genetic studies.

### Types

There are different types of chi-square tests, including:

- **Chi-square Test for Independence**: Determines if two categorical variables are independent or if there is an association between them.

- **Chi-square Test for Goodness of Fit**: Compares observed and expected frequencies in a single categorical variable to assess how well the observed data fits the expected distribution.

### Assumptions
- The data is categorical.
- The observations are independent of each other.
- Each participant contributes to only one cell of the contingency table.
- For a valid chi-square result, 80% or more of the expected frequencies must be 5 or more.

### Interpretation

The chi-square statistic follows a chi-square distribution, and the p-value associated with it helps determine whether the observed association is statistically significant. If the p-value is below a chosen significance level (e.g., 0.05), it indicates a significant association between the variables.

**Chi-square Statistic (χ2)**: Represents the difference between the observed and expected frequencies. A larger χ2 indicates a stronger association between the categorical variables.

**P-value**: Indicates the probability of observing a χ2 statistic as extreme as the one calculated (or more extreme) if the variables were independent (null hypothesis).
- **P < 0.05**: Often denotes that there's a significant association between the categorical variables.
- **P ≥ 0.05**: Indicates that there's not enough statistical evidence to say the variables are associated.

**Cramer's V or Phi coefficient (for 2x2 tables)**: These can provide the strength of the association. Closer to 1 means a stronger association; closer to 0 indicates a weaker association.

### Full Python Example

A hospital is interested in understanding if there's an association between the type of treatment received (surgical vs. non-surgical) and patient satisfaction levels (satisfied vs. not satisfied).
- Research Question: "Is patient satisfaction independent of the treatment type received?"

For our demonstration, we'll generate synthetic patient data for both treatment types and satisfaction levels using the `faker` package.

```python

import pandas as pd
import numpy as np
from scipy import stats
from faker import Faker

# Set the seed for reproducibility
np.random.seed(42)
fake = Faker()

# Number of patients
num_patients = 200

# Generate synthetic patient data

# Assume out of 200 patients, 100 received surgical and 100 received non-surgical treatment
surgical_satisfied = np.random.binomial(1, 0.75, 100)  # 75% of surgical patients are satisfied
non_surgical_satisfied = np.random.binomial(1, 0.60, 100)  # 60% of non-surgical patients are satisfied

# Create a DataFrame
df = pd.DataFrame({
    'Treatment': ['surgical'] * 100 + ['non-surgical'] * 100,
    'Satisfaction': np.concatenate((surgical_satisfied, non_surgical_satisfied))
})

# Convert the satisfaction binary outcome to text
df['Satisfaction'] = df['Satisfaction'].apply(lambda x: 'satisfied' if x == 1 else 'not satisfied')

# Create a contingency table
contingency_table = pd.crosstab(df['Treatment'], df['Satisfaction'])

# Perform the chi-square test
chi2, p, _, _ = stats.chi2_contingency(contingency_table)

print(f"Chi-square value: {chi2}")
print(f"P-value: {p}")
print("\nContingency Table:")
print(contingency_table)

```

```yaml
Chi-square value: 5.834757834757834
P-value: 0.015712572311655574

Contingency Table:
Satisfaction  not satisfied  satisfied
Treatment                             
non-surgical             41         59
surgical                 24         76
```

P-value: In this case, the p-value is 0.0157, which is less than 0.05. Therefore, we can reject the null hypothesis and conclude that there is a statistically significant association between treatment type and patient satisfaction.

Contingency table:
```yaml
Satisfaction  not satisfied  satisfied
Treatment                             
non-surgical             41         59
surgical                 24         76
```

From the contingency table, we can see the distribution of satisfaction across the two treatment types:

- Out of the patients who received non-surgical treatment, 41 were not satisfied and 59 were satisfied.
- Out of the patients who underwent surgical treatment, 24 were not satisfied and 76 were satisfied.

The proportion of satisfied patients is higher in the surgical group  `76 / (76 + 24)` = **76%**, compared to the non-surgical group `59 / (59 + 41)` = **59%**. This difference in proportions is what's driving the significant chi-square result.

Based on the chi-square test result and the p-value, there is a statistically significant association between the type of treatment received (surgical vs. non-surgical) and patient satisfaction levels in this sample. Specifically, patients who underwent surgical treatment appear to have higher satisfaction levels compared to those who received non-surgical treatment.

However, it's crucial to remember that statistical significance doesn't always imply clinical or practical significance. While the chi-square test tells us there is an association, it doesn't provide information about the strength or direction of that association. Further studies, potentially with larger sample sizes or using different methods, would be beneficial in understanding the relationship better.

Also, any interpretation should be made cautiously, taking into account other factors that might influence patient satisfaction, and understanding that correlation doesn't necessarily imply causation.




---
This section provides an in-depth exploration of chi-square tests, including their types, applications, and interpretation in healthcare and medical research. It also offers a case study demonstrating how chi-square tests can be used to assess treatment outcomes and explore associations between categorical variables.




