---
sidebar_position: 4
---

# 5.4 P-value interpretation and Clinical vs Statistical Significance 

## P-values and Significance

P-values help us determine the likelihood of observing the results we obtained if there was no real effect or difference in the population. They play a crucial role in hypothesis testing, with smaller p-values suggesting stronger evidence against the null hypothesis.

## What is it?

"...The P value is defined as the probability under the assumption of no effect or no difference (null hypothesis), of obtaining a result equal to or more extreme than what was actually observed." 

**Let's consider a clinical example to illustrate this concept:**

- Suppose a pharmaceutical company conducts a clinical trial to compare the effectiveness of a new drug (Drug A) against an existing drug (Drug B) for treating a specific medical condition. The null hypothesis in this case would be that there is no difference in the effectiveness between the two drugs.

- If the clinical trial finds that patients treated with Drug A experienced, on average, a greater reduction in symptoms compared to those treated with Drug B, the P-value would assess the probability of obtaining such a result, or an even more extreme result, under the assumption that both drugs are equally effective (null hypothesis). 

- If the P-value is very low, say 0.01, it indicates that the observed difference in effectiveness is unlikely to have occurred purely by chance. This could suggest that there is a real difference in the treatments and that Drug A might indeed be more effective than Drug B for treating the condition. On the other hand, a high P-value, such as 0.8, would suggest that the observed difference is likely due to chance and that the null hypothesis (no difference) cannot be rejected.

---

The P stands for probability and measures how likely it is that any observed difference between groups is due to chance. Being a probability, P can take any value between 0 and 1. Values close to 0 indicate that the observed difference is unlikely to be due to chance, whereas a P value close to 1 suggests no difference between the groups other than due to chance. 

Thus, it is common in medical journals to see adjectives such as “highly significant” or “very significant” after quoting the P value depending on how close to zero the value is.

## Fallacies of the P-value

### The threshold value, P < 0.05 is arbitrary

- The widely used threshold of P < 0.05 to determine statistical significance can lead to a misconception that this value holds special significance. However, this threshold is somewhat arbitrary and does not inherently indicate the presence or absence of a meaningful effect. It merely serves as a common guideline for decision-making in hypothesis testing.

- To illustrate this, imagine a clinical trial evaluating a new medication's effectiveness in reducing blood pressure. If the trial results in a P-value of 0.049, just below the conventional threshold, it might be tempting to declare the treatment as effective. However, this decision should consider other factors like effect size, sample size, and clinical relevance. Just as a slightly larger P-value, say 0.051, might not indicate a lack of clinical efficacy, but rather the need for a more nuanced interpretation of the results.

### P values don’t show anything about the magnitude of effect

- P-values provide information about the likelihood of observing the data under the null hypothesis, but they do not convey information about the size or practical significance of the effect. A small P-value does not necessarily mean a large or clinically relevant effect.

- A study might find a statistically significant P-value for a new drug's effect on reducing pain intensity. However, without knowing the actual reduction in pain intensity (effect size), it's challenging to assess whether the observed statistical significance corresponds to a meaningful improvement in patients' quality of life.

### Chance Findings

Statistically significant (P < 0.05) findings are assumed to result from real treatment effects ignoring the fact that 1 in 20 comparisons of effects in which null hypothesis is true will result in significant finding (P < 0.05).

- The use of P-values can sometimes lead to the fallacy of assuming that a statistically significant result directly implies a real treatment effect. However, given the significance level of 0.05, it's expected that around 5% of studies will yield significant results purely by chance.

- Imagine that you are conducting a series of 100 studies, each evaluating a different nutritional supplement's effects on cognitive function. In one of these studies, you obtain a P-value of 0.03, which suggests statistical significance. The P-value of 0.03 means that, under the assumption of no real effect (null hypothesis), there is a 3% chance of observing data as extreme as what was actually collected.

- Now, image that you replicate the same study under identical conditions 100 times. Based on the P-value of 0.03 from the original study, we would expect that in about 3 out of those 100 replications (3% of the time), you would obtain results that are equally or even more extreme than what was observed in the original study, purely by chance. This means that there is a likelihood of around 3% that a study conducted under the same conditions would yield results below the significance threshold of 0.05, even if there is no real effect present. This highlights the concept of the significance level (often denoted as alpha, α), which is the probability of making a Type I error - i.e., wrongly concluding that there is an effect when there isn't one.

### Clinical importance or clinical significance

- Statistical significance does not necessarily equate to clinical importance. A small P-value may indicate that the data do not align well with the null hypothesis, but it doesn't guarantee that the observed effect is practically meaningful for patient care.

- Suppose a study reveals that a new surgical procedure significantly reduces operating time compared to the traditional method (P < 0.05). While this finding may be statistically significant, it's essential to consider whether the reduced operating time is substantial enough to impact patient outcomes, healthcare costs, or other clinical factors.


## What influences the P-value 

### Effect size

The effect size refers to the magnitude of the difference or relationship being studied. A larger effect size indicates a stronger and more meaningful relationship between variables. 

In statistical analysis, a larger effect size can lead to a lower P-value, making the results more likely to be statistically significant. 

For instance, consider a clinical trial evaluating the effectiveness of two drugs for pain relief. If Drug A reduces pain by 50% and Drug B reduces it by only 10%, the larger effect size of Drug A would likely result in a smaller P-value, indicating a stronger evidence of its effectiveness.

Here is some example code to demonstrate:

```python
from faker import Faker
import pandas as pd
import numpy as np
from scipy import stats

# Create a Faker instance
fake = Faker()

# Set random seed for reproducibility
np.random.seed(42)

# Generate data for the fake dataset
num_patients = 100
baseline_pain = np.random.randint(1, 11, size=num_patients)
final_pain_a = np.round(baseline_pain * 0.5 + np.random.normal(0, 1, size=num_patients), decimals=1)
final_pain_b = np.round(baseline_pain * 0.9 + np.random.normal(0, 4, size=num_patients), decimals=1)
drug_group = ['Drug A'] * num_patients + ['Drug B'] * num_patients
patient_id = [fake.uuid4() for _ in range(num_patients * 2)]

# Create a DataFrame
data = pd.DataFrame({
    'Patient_ID': patient_id,
    'Baseline_Pain': baseline_pain.tolist() * 2,
    'Final_Pain': np.concatenate((final_pain_a, final_pain_b)),
    'Drug_Group': drug_group
})

# Calculate and display effect sizes
effect_size_a = np.mean(baseline_pain - final_pain_a)
effect_size_b = np.mean(baseline_pain - final_pain_b)

print(f"Effect size for Drug A: {effect_size_a:.2f}")
print(f"Effect size for Drug B: {effect_size_b:.2f}")

# Perform paired samples t-tests
baseline_pain_a = data[data['Drug_Group'] == 'Drug A']['Baseline_Pain']
final_pain_a = data[data['Drug_Group'] == 'Drug A']['Final_Pain']

baseline_pain_b = data[data['Drug_Group'] == 'Drug B']['Baseline_Pain']
final_pain_b = data[data['Drug_Group'] == 'Drug B']['Final_Pain']

t_statistic_a, p_value_a = stats.ttest_rel(baseline_pain_a, final_pain_a)
t_statistic_b, p_value_b = stats.ttest_rel(baseline_pain_b, final_pain_b)

print(f"Paired Samples t-test for Drug A: t-statistic = {t_statistic_a:.2f}, p-value = {p_value_a:.4f}")
print(f"Paired Samples t-test for Drug B: t-statistic = {t_statistic_b:.2f}, p-value = {p_value_b:.4f}")
```

With the expected output:
```yaml
Effect size for Drug A: 2.93
Effect size for Drug B: 0.65
Paired Samples t-test for Drug A: t-statistic = 17.15, p-value = 0.0000
Paired Samples t-test for Drug B: t-statistic = 1.60, p-value = 0.1124
```


### Size of sample 

The size of the sample, often denoted as "n," plays a crucial role in determining the P-value. A larger sample size provides more information and precision to estimate the underlying population parameters. 

As the sample size increases, the variability of estimates decreases, making it easier to detect even small effects and resulting in lower P-values.

For instance, in a public health survey assessing smoking habits, surveying thousands of participants will likely yield a more accurate estimation of smoking prevalence and potentially lead to smaller P-values when testing associations with other variables.

```python
import numpy as np
import scipy.stats as stats

# Set random seed for reproducibility
np.random.seed(42)

# Generate two sets of data with different sample sizes
sample_size_small = 100
sample_size_large = 1500

data_small = np.random.normal(loc=10, scale=2, size=sample_size_small)
data_large = np.random.normal(loc=10, scale=2, size=sample_size_large)

# Calculate mean and standard deviation for each dataset
mean_small = np.mean(data_small)
std_small = np.std(data_small)

mean_large = np.mean(data_large)
std_large = np.std(data_large)

# Perform t-test to compare means
t_stat, p_value_small = stats.ttest_1samp(data_small, popmean=10)
t_stat, p_value_large = stats.ttest_1samp(data_large, popmean=10)

# Display results
print("Sample Size Small:", sample_size_small)
print("Mean Small:", mean_small)
print("Standard Deviation Small:", std_small)
print("P-value Small:", p_value_small)

print("\nSample Size Large:", sample_size_large)
print("Mean Large:", mean_large)
print("Standard Deviation Large:", std_large)
print("P-value Large:", p_value_large)
```

```yaml
Sample Size Small: 100
Mean Small: 9.792306965211813
Standard Deviation Small: 1.8072323532892591
P-value Small: 0.2556001762530366

Sample Size Large: 1500
Mean Large: 10.098725720856986
Standard Deviation Large: 1.9965252769527622
P-value Large: 0.05574595536298814
```

In this example, we generate two sets of normally distributed data, one with a small sample size (100) and the other with a large sample size (1000). We calculate the mean, standard deviation, and perform a one-sample t-test to compare the means of both datasets to a population mean of 10. 

You'll notice that the P-value for the larger sample size is smaller, indicating that the larger sample size provides more evidence to detect differences from the population mean. This aligns with the concept that larger sample sizes lead to more precise estimates and lower P-values.

### Spread of the data

The spread or variability of the data points within a sample also affects the P-value. When data points are tightly clustered around the mean, it becomes easier to detect differences or relationships, resulting in smaller P-values. 

Conversely, if the data points are widely dispersed, it may be more challenging to identify significant effects, leading to larger P-values. 

For example, in a study comparing cholesterol levels between a control group and a treatment group, if the cholesterol levels in the treatment group vary widely, the resulting P-value might be larger, indicating less certainty about the treatment's effect.

Here's an example to illustrate the influence of data spread on P-values using Python:

```python
import pandas as pd
import numpy as np
import scipy.stats as stats

# Set random seed for reproducibility
np.random.seed(42)

# Generate data for narrow spread (standard deviation of 1)
data_narrow_control = np.random.normal(loc=180, scale=1, size=50)
data_narrow_treatment = np.random.normal(loc=185, scale=1, size=50)

# Generate data for wide spread (standard deviation of 3)
data_wide_control = np.random.normal(loc=180, scale=3, size=50)
data_wide_treatment = np.random.normal(loc=185, scale=3, size=50)

# Create DataFrames
df_narrow = pd.DataFrame({'Cholesterol_Control': data_narrow_control, 'Cholesterol_Treatment': data_narrow_treatment})
df_wide = pd.DataFrame({'Cholesterol_Control': data_wide_control, 'Cholesterol_Treatment': data_wide_treatment})

# Perform t-test for narrow spread
t_stat_narrow, p_value_narrow = stats.ttest_ind(df_narrow['Cholesterol_Control'], df_narrow['Cholesterol_Treatment'])

# Perform t-test for wide spread
t_stat_wide, p_value_wide = stats.ttest_ind(df_wide['Cholesterol_Control'], df_wide['Cholesterol_Treatment'])

# Display results
print("Narrow Data - P-value:", p_value_narrow)
print("Wide Data - P-value:", p_value_wide)
```

```yaml
Narrow Data - P-value: 7.213204192658612e-50
Wide Data - P-value: 3.0221739272305965e-15
```

In this example, we create two DataFrames: df_narrow and df_wide, each representing narrow and wide data spreads for cholesterol levels in control and treatment groups. We then perform independent t-tests to compare the means of cholesterol levels between the control and treatment groups for both data spreads. You'll notice that the P-value for the wide data spread is likely larger than the P-value for the narrow data spread, illustrating how larger variability can lead to larger P-values.

Specifically:

- The P-value for the t-test comparing cholesterol levels between the control and treatment groups in the `narrow data`` spread is very close to zero (P-value: 7.21e-50). This extremely small P-value suggests strong evidence against the null hypothesis, indicating that the difference in means between the control and treatment groups is statistically significant. 
- The P-value for the t-test comparing cholesterol levels between the control and treatment groups in the `wide data`` spread is also very small, **but larger compared to the narrow data (P-value: 3.02e-15)**. While this P-value is still small, it indicates that the difference in means between the control and treatment groups is statistically significant even in the presence of wider variability. Despite the larger P-value compared to the narrow data, the wide data still provides strong evidence against the null hypothesis, suggesting a significant effect of the treatment on cholesterol levels.




## P-values with Confidence Intervals (CIs) Introduction

While P-values have been a cornerstone of statistical significance testing, they often fall short in providing a comprehensive understanding of a study's findings. P-values alone lack information about the magnitude of effects and the differences between study groups. This limitation has spurred the adoption of confidence intervals, which offer a more nuanced and informative perspective.

Confidence intervals (CIs) go beyond the binary "significant vs. non-significant" interpretation by providing researchers with a range of values that encompass the likely parameter estimates for a given sample. This range, often expressed as a range of percentages (e.g., 95% confidence interval), provides a level of uncertainty around the point estimate, giving a clearer sense of the potential variability of the underlying population parameter.

While confidence intervals offer valuable insights, they are not meant to replace P-values but rather complement them. The use of both confidence intervals and P-values can enhance the depth of statistical reporting, offering a more complete picture of the study's results and their implications. In the following sections, we will explore the concept of confidence intervals, their interpretation, and their significance in various statistical analyses.

We discuss CIs in the [next section](../../docs/Ch5/confidenceintervals.md). But for now, here is a quick example demonstrating CIs in python:

```python
import numpy as np
from scipy import stats

# Simulated data for pain reduction (hypothetical example)
mindfulness_group = np.array([3, 5, 6, 4, 2, 4, 5, 3, 4, 5])
control_group = np.array([6, 7, 8, 7, 6, 5, 6, 5, 7, 6])

# Perform a two-sample t-test
t_statistic, p_value = stats.ttest_ind(mindfulness_group, control_group)

# Calculate confidence intervals (95% confidence level)
confidence_interval_mindfulness = stats.t.interval(0.95, len(mindfulness_group)-1, loc=np.mean(mindfulness_group), scale=stats.sem(mindfulness_group))
confidence_interval_control = stats.t.interval(0.95, len(control_group)-1, loc=np.mean(control_group), scale=stats.sem(control_group))

# Print results
print("T-Test Results:")
print("T-Statistic:", t_statistic)
print("P-Value:", p_value)
print("\nConfidence Intervals (95%):")
print("Mindfulness Group:", confidence_interval_mindfulness)
print("Control Group:", confidence_interval_control)
```

```yaml
T-Test Results:
T-Statistic: -4.554432691659538
P-Value: 0.0002456871294272072

Confidence Intervals (95%):
Mindfulness Group: (3.2435611205998875, 4.956438879400112)
Control Group: (5.6213528511777024, 6.978647148822297)
```

**Interpreting our results**:

- T-Test Results:
  - T-Statistic: The calculated t-statistic is approximately -4.55. The t-statistic measures the difference between the means of the mindfulness group and the control group relative to the variability within the groups.
  - P-Value: The p-value is approximately 0.0002. This p-value represents the probability of observing the observed difference in means (or more extreme) under the assumption that there is no true difference between the groups. Since the p-value is very small (less than 0.05), it suggests strong evidence against the null hypothesis (no difference) and indicates that the difference in means is statistically significant.
- Confidence Intervals (95%):
  - Mindfulness Group: The confidence interval for the mean difference in the mindfulness group's pain reduction is between 3.24 and 4.96. This means that we are 95% confident that the true mean difference lies within this interval.
  - Control Group: The confidence interval for the mean difference in the control group's pain reduction is between 5.62 and 6.98. Similarly, we are 95% confident that the true mean difference falls within this interval.

--- 

Please read the following articles for further review and discussion on the p-value:
- [PubMed article](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6532382/) 
- [PubMed article](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4111019/)