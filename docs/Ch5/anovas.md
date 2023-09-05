---
sidebar_position: 7
---

# 5.7 ANOVAs with Healthcare Data

The Analysis of Variance (ANOVA) is a statistical test used to determine whether there are any statistically significant differences between the means of three or more independent groups. In the context of healthcare, it might be used, for instance, to compare the mean blood pressure levels of patients across three different treatment regimens.

While a t-test is used to compare the means between two groups, ANOVA is used when dealing with three or more groups. ANOVA essentially analyzes the variance within and between groups to determine if the means of some or all groups are different.

## Assumptions
Before conducting an ANOVA, several assumptions should be met:

- Independence of Observations: The observations in each group should be independent of one another.
- Normality: The data for each group should be approximately normally distributed.
- Homogeneity of Variances: The variances of the groups should be equal.

Violation of these assumptions `may` require adjustments or alternative non-parametric tests.

### Independence of Observations 

This described in the previous chapter, this mainly relies on study design rather than something we can directly test using statistics. To ensure the independence of observations:
- Randomly assign subjects to groups.
- If collecting observational data, ensure the method of data collection doesn’t introduce bias.

Though statistical tests cannot strictly test for independence, visual methods like scatter plots can be used to see patterns, but this is often used for independence between variables, not within samples.

```python
import matplotlib.pyplot as plt

def plot_scatter(df, x, y):
    plt.scatter(df[x], df[y])
    plt.xlabel(x)
    plt.ylabel(y)
    plt.title(f"Scatter Plot of {x} vs {y}")
    plt.show()
```

### Normality

We can use the Shapiro-Wilk test to check for normality. The null hypothesis of this test is that the data is normally distributed. If the p-value is less than the chosen alpha level, then the null hypothesis is rejected and there is evidence that the data is not normal.

```python
import scipy.stats as stats

def test_normality(data, alpha=0.05):
    stat, p = stats.shapiro(data)
    if p > alpha:
        return True  # Data seems to be normally distributed
    else:
        return False  # Data may not be normally distributed
```

### Homogenity 

Levene’s test can be used to check the assumption of equal variances between groups. 

A significant result indicates that the groups have unequal variances.

```python
def test_homogeneity(*args):
    stat, p = stats.levene(*args)
    if p > 0.05:
        return True  # Variances seem to be equal
    else:
        return False  # Variances seem to be unequal
```

Using these functions with a DataFrame:

If you have a DataFrame (df) and you'd like to test for normality for a specific column or test for homogeneity of variances for different groups, you'd do something like:

```python
import pandas as pd

# Sample DataFrame
data = {
    'GroupA': [10, 20, 30, 40, 50],
    'GroupB': [15, 25, 35, 45, 55],
    'GroupC': [12, 22, 32, 42, 52]
}
df = pd.DataFrame(data)

# Test for normality in GroupA
print(test_normality(df['GroupA']))

# Test for homogeneity of variances between GroupA and GroupB
print(test_homogeneity(df['GroupA'], df['GroupB']))
```


## Interpretation
The results of an ANOVA test will provide an F-statistic and a p-value. The F-statistic represents the ratio of the variance between the group means to the variance within the groups. A large F-statistic implies that the group means are different.

The p-value, similar to other tests, will determine the significance of the results. If the p-value is less than a predetermined significance level (typically 0.05), the null hypothesis that all group means are equal is rejected.

## Post-hoc Analyses
If the ANOVA shows a significant difference between groups, a post-hoc test can be conducted to determine which groups are different from each other. Common post-hoc tests in healthcare include the Tukey-Kramer method and the Bonferroni correction.

## Applications in Healthcare
ANOVA is versatile and has a broad range of applications in healthcare, including:

- Drug Efficacy: Comparing the mean outcomes of patients treated with different drugs or doses.
- Therapeutic Techniques: Evaluating the effectiveness of different therapeutic techniques.
- Genetic Variations: Investigating the effects of different genetic variations on a particular health outcome.
- Equipment Comparison: Assessing the performance of different medical devices or equipment.

## Limitations
Like all statistical tests, ANOVA has its limitations:

- Sensitive to Outliers: Extreme values can significantly impact the F-statistic.
- Assumption Dependencies: If assumptions are not met, the results can be misleading.
- No Directionality: ANOVA can tell you that there is a difference but not which group is higher or lower.

## Python Packages 

When it comes to performing ANOVAs in Python, several packages are available, each with its strengths and functionalities. 

Each of these packages below offers unique features and functionalities, so the choice depends on the specific requirements of your analysis and your personal preference. For simple ANOVAs, scipy is often sufficient, but for more detailed analyses or specific needs, packages like statsmodels or pingouin might be more appropriate.

Here are some of the popular ones:

### statsmodels:

Provides classes and functions for the estimation of many different statistical models, tests, and data exploration.

Specifically, the `ols` function from `statsmodels.formula.api` can be used to create a linear model, which is then passed to the `anova_lm` function from `statsmodels.stats.anova` to perform the ANOVA.

```python
import statsmodels.api as sm
from statsmodels.formula.api import ols
from statsmodels.stats.anova import anova_lm

model = ols('DependentVar ~ C(IndependentVar)', data=dataframe).fit()
anova_table = anova_lm(model, typ=2)
print(anova_table)
```

### scipy

`scipy.stats` provides the `f_oneway` function to conduct a one-way ANOVA, which is a simple and straightforward method to quickly check for statistical differences between group means.

```python
from scipy.stats import f_oneway

f_val, p_val = f_oneway(group1, group2, group3)
```

### pingouin

A newer statistical package in Python that offers a more user-friendly and less verbose approach compared to `statsmodels`. It also provides more detailed outputs.

The `anova` function from `pingouin` can be used to perform ANOVA tests.

```python
import pingouin as pg

aov = pg.anova(data=dataframe, dv='DependentVar', between='IndependentVar', detailed=True)
print(aov)
```

### pyvttbl

Allows for the computation of multifactor ANOVA and offers a more programmatic approach.

### bioinfokit

Offers various biostatistics and bioinformatics functions, including ANOVA testing.

### researchpy

Simplifies many of the statistical processes with a straightforward interface and provides easy-to-read outputs. The library is especially helpful when paired with `statsmodels`.

```python
import researchpy as rp

summary, results = rp.anova(data=dataframe, dv='DependentVar', between='IndependentVar')
```


## Types of ANOVAs 

### One-way ANOVA
This is the simplest form of ANOVA that deals with a single independent variable. It's used to test the differences between two or more groups' means when there's just one independent variable.

Example: Comparing the mean recovery times of patients across three different surgical techniques.

#### Python Example:  
Lets compare the mean recovery times (in days) of patients across three different surgical techniques: Technique A, Technique B, and Technique C.

Hypotheses for the ANOVA Example:

**Null Hypothesis** ($H_0$):
The mean recovery times for all three surgical techniques are equal. Mathematically, this is represented as:

$\mu_{A} = \mu_{B} = \mu_{C}$

Where:
- $\mu_{A}$ is the population mean recovery time for Technique A
- $\mu_{B}$ is the population mean recovery time for Technique B
- $\mu_{C}$ is the population mean recovery time for Technique C

**Alternative Hypothesis** ($H_a$ or $H_1$):
The mean recovery time for at least one surgical technique is different from the others. This can be expressed as:

$\mu_{A} \neq \mu_{B}$ **or** $\mu_{A} \neq \mu_{C}$ **or** $\mu_{B} \neq \mu_{C}$ 


In essence, the null hypothesis asserts that there's no difference in recovery times among the techniques. In contrast, the alternative hypothesis suggests that there's a significant difference in recovery times for at least one pair of techniques.



```python
import pandas as pd
import numpy as np
from faker import Faker
import scipy.stats as stats
import statsmodels.api as sm
from statsmodels.formula.api import ols
from statsmodels.stats.anova import anova_lm

# Setting up the Faker instance
fake = Faker()

# Generate sample data
np.random.seed(42)  # for reproducibility

num_samples = 30  # number of samples per group
techniques = ['Technique A', 'Technique B', 'Technique C']

# Simulating recovery times for each surgical technique with random normal distribution
data = {
    'Patient': [fake.name() for _ in range(num_samples * len(techniques))],
    'Technique': np.repeat(techniques, num_samples),
    'Recovery_time': np.concatenate([
        np.random.normal(30, 5, num_samples),  # Technique A
        np.random.normal(28, 6, num_samples),  # Technique B
        np.random.normal(32, 7, num_samples)   # Technique C
    ])
}

df = pd.DataFrame(data)

# Testing assumptions

def test_normality(data, alpha=0.05):
    stat, p = stats.shapiro(data)
    if p > alpha:
        return True  # Data seems to be normally distributed
    else:
        return False  # Data may not be normally distributed

def test_homogeneity(*args):
    stat, p = stats.levene(*args)
    if p > 0.05:
        return True  # Variances seem to be equal
    else:
        return False  # Variances seem to be unequal


# 1. Independence: Assumed based on data generation (no statistical test)
# 2. Normality
grouped_data = [df['Recovery_time'][df['Technique'] == technique] for technique in techniques]
for index, group in enumerate(grouped_data):
    is_normal = test_normality(group)
    print(f"Data for {techniques[index]} is {'normally' if is_normal else 'not normally'} distributed.")

# 3. Homogeneity of variances
is_homogeneous = test_homogeneity(*grouped_data)
print(f"Variances are {'homogeneous' if is_homogeneous else 'not homogeneous'}.")

# Performing one-way ANOVA
model = ols('Recovery_time ~ C(Technique)', data=df).fit()
anova_table = anova_lm(model, typ=2)
print(anova_table)

```

```yaml
Data for Technique A is normally distributed.
Data for Technique B is normally distributed.
Data for Technique C is normally distributed.
Variances are homogeneous.
                   sum_sq    df         F    PR(>F)
C(Technique)   355.822882   2.0  5.354584  0.006411
Residual      2890.662681  87.0       NaN       NaN
```

**Interpretation:**

- Normality Tests: Each of the surgical techniques' recovery time data is normally distributed. This implies that the assumption of normality for a one-way ANOVA is satisfied.
- Homogeneity of Variances Test: The variances of recovery times across the three surgical techniques are approximately equal. This indicates that the homogeneity of variances assumption for a one-way ANOVA is met.
- One-Way Anova Results:
  - F: The computed F-statistic value is 5.354584. This value is a measure of how much the means of each group vary from the overall group mean. A larger F value indicates that at least one of the group means is different from the others.
  - PR(>F): The p-value associated with the F-statistic is 0.006411.
  - Since the p-value (0.006411) is less than the common alpha level of 0.05, we reject the null hypothesis. This means that there are statistically significant differences in mean recovery times across the three surgical techniques. However, the ANOVA test doesn't specify which groups are different from each other. To determine that, a post-hoc test (like Tukey's HSD) would be necessary.

The Tukey's HSD (Honest Significant Difference) test is a post-hoc test used specifically after a significant one-way ANOVA to determine which groups are different from one another. Here's how you can do it using the same data from the  example:

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd

# Conduct Tukey's HSD test
posthoc = pairwise_tukeyhsd(df['Recovery_time'], df['Technique'], alpha=0.05)

print(posthoc)
```

The pairwise_tukeyhsd function will compare every pair of groups (in this case, surgical techniques) to determine which pairs have significantly different means. The function will then return a summary table showing the mean difference between each pair of groups, the confidence interval of that difference, and whether or not the difference is statistically significant.

```text
     Multiple Comparison of Means - Tukey HSD, FWER=0.05     
=============================================================
   group1      group2   meandiff p-adj   lower  upper  reject
-------------------------------------------------------------
Technique A Technique B  -1.7862 0.4563 -5.3351 1.7626  False
Technique A Technique C   3.0309 0.1096 -0.5179 6.5798  False
Technique B Technique C   4.8172 0.0048  1.2683  8.366   True
-------------------------------------------------------------
```

Based on the tukey test results:
- **Technique A vs Technique B**: The mean difference is -1.7862, which means Technique A has a recovery time that's approximately 1.7862 units shorter than Technique B. However, the adjusted p-value of 0.4563 is greater than 0.05, indicating that this difference is not statistically significant.
- **Technique A vs Technique C**: The mean difference is 3.0309, meaning Technique C's recovery time is approximately 3.0309 units longer than Technique A. However, with an adjusted p-value of 0.1096 (greater than 0.05), this difference is not deemed statistically significant.
- **Technique B vs Technique C**: The mean difference is 4.8172, which suggests that Technique C has a recovery time that's about 4.8172 units longer than Technique B. This time, the adjusted p-value is 0.0048, which is less than 0.05, indicating a statistically significant difference between these two techniques.





### Two-way ANOVA
Two-way ANOVA is an extension of one-way ANOVA that examines the influence of two different categorical independent variables on one continuous dependent variable. It not only looks at the main effects of each of the independent variables but also if there's an interaction between them.

**Main Effect**
The main effect is about understanding the individual effects of each of the two independent variables on the dependent variable. It can be visualized as the difference in means between different levels of each factor, with all other factors held constant.

For instance, if we're studying the effects of two factors—drug type and dosage—on patient recovery time, the main effects would describe:
- The difference in recovery times between different drug types, disregarding dosages.
- The difference in recovery times between different dosages, disregarding drug types.

**Interaction Effect**
The interaction effect is essentially about whether the effect of one of your independent variables on the dependent variable is different depending on the level of the other independent variable.

In our drug type and dosage example, an interaction effect would signify that the effect of drug type on recovery time differs depending on the dosage (and vice versa). If there's a significant interaction effect, it suggests that the effect of one factor depends on the level of the other factor.

Example: Investigating the effect of medication type and dosage on patient recovery time.

#### Python Example: Two-way ANOVA
*Research Question*: Suppose a hospital wants to understand the combined effects of drug type (Drug A, Drug B, and Drug C) and dosage level (Low, Medium, High) on patient recovery time. The research question would aim to understand both the individual effects of drug type and dosage, as well as their combined effects on recovery time.

*Assumptions:*
- Independence: The observations are independent of one another.
- Normality: The dependent variable (recovery time) should be approximately normally distributed for each combination of the groups of the two independent variables.
- Homogeneity of Variance: Variances are equal across all groups formed by the combinations of the levels of the two independent variables.

The code:

```python
import numpy as np
import pandas as pd
import statsmodels.api as sm
from statsmodels.formula.api import ols
from scipy.stats import shapiro, levene

# Simulating data using faker
np.random.seed(0)
n = 30  # number of patients per group
drug_types = ['Drug A', 'Drug B', 'Drug C']
dosages = ['Low', 'Medium', 'High']
data = {
    'Drug': np.repeat(drug_types, n*len(dosages)),
    'Dosage': np.tile(np.repeat(dosages, n), len(drug_types)),
    'Recovery_Time': np.random.normal(50, 10, n*len(dosages)*len(drug_types))
}

df = pd.DataFrame(data)

# Checking normality
for drug in drug_types:
    for dosage in dosages:
        _, p = shapiro(df['Recovery_Time'][(df['Drug'] == drug) & (df['Dosage'] == dosage)])
        if p < 0.05:
            print(f"Data for {drug} at {dosage} dosage is not normally distributed.")
        else:
            print(f"Data for {drug} at {dosage} dosage is normally distributed.")

# Checking homogeneity of variance
_, p = levene(*[df['Recovery_Time'][(df['Drug'] == drug) & (df['Dosage'] == dosage)] for drug in drug_types for dosage in dosages])
if p < 0.05:
    print("Variances are not homogeneous.")
else:
    print("Variances are homogeneous.")

# Two-way ANOVA
model = ols('Recovery_Time ~ Drug + Dosage + Drug:Dosage', data=df).fit()
anova_table = sm.stats.anova_lm(model, typ=2)
print(anova_table)
```

Our preliminary results:

```yaml

Data for Drug A at Low dosage is normally distributed.
Data for Drug A at Medium dosage is normally distributed.
Data for Drug A at High dosage is normally distributed.
Data for Drug B at Low dosage is normally distributed.
Data for Drug B at Medium dosage is normally distributed.
Data for Drug B at High dosage is normally distributed.
Data for Drug C at Low dosage is normally distributed.
Data for Drug C at Medium dosage is normally distributed.
Data for Drug C at High dosage is normally distributed.

Variances are homogeneous.

                   sum_sq     df         F    PR(>F)
Drug           522.541265    2.0  2.828606  0.060908
Dosage        1053.904420    2.0  5.704967  0.003758
Drug:Dosage    464.986695    4.0  1.258527  0.286763
Residual     24107.857388  261.0       NaN       NaN

```

Now lets interpret our preliminary results. 

**Assumption Checks:**
1. Normality: All groups, separated by drug type and dosage, have data that is normally distributed. This is inferred from the statement that data for each drug at each dosage level is normally distributed.
2. Homogeneity of Variance: The variances across all groups are equal, meeting the assumption of homoscedasticity.

**ANOVA Results:**

*Drug Effect (Main Effect of Drug Type):*  
  - F-value: = 2.828606
  - P-value: = 0.060908
  - The p-value associated with the effect of drug type is 0.060908, which is just above the common significance level of 0.05. This means that while there's some indication of a difference in recovery times across drug types, it's not statistically significant at the 5% level. However, given its proximity to 0.05, further investigation might be warranted, especially if the research context permits a higher alpha level.

*Dosage Effect (Main Effect of Dosage):*
  - F-value: 5.704967
  - P-value: 0.003758
  - The p-value for the effect of dosage is 0.003758, which is significantly less than 0.05. This indicates that there's a statistically significant difference in recovery times at different dosage levels, regardless of the type of drug administered.

*Interaction Effect (Drug:Dosage):*
  - F-value: 1.258527
  - P-value: 0.286763
  - The interaction term has a p-value of 0.286763, which is greater than 0.05. This suggests that there's no significant interaction between drug type and dosage in their effects on recovery time. In other words, the effect of drug type on recovery time does not vary depending on the dosage, and vice versa.

**From this preliminary analysis, we can conclude that:**
- The type of drug, by itself, does not significantly affect the recovery time, but there's some indication that it might be of interest (p-value close to 0.05).
- Dosage level does significantly influence recovery time.
- The effect of drug type on recovery time is consistent across dosage levels, and the effect of dosage on recovery time is consistent across drug types, as there is no significant interaction effect.

Now lets conduct our post-hoc test for dosage level, since that is significantly different statistically, while we do not need to do anything else for the main effect of drug effect (p = .06) or the interaction (p = .286):

```python
import statsmodels.stats.multicomp as multi

post_hoc = multi.MultiComparison(df['Recovery_Time'], df['Dosage'])
tukey_result = post_hoc.tukeyhsd()
print(tukey_result)
```

With the following results:

```text
Multiple Comparison of Means - Tukey HSD, FWER=0.05 
====================================================
group1 group2 meandiff p-adj   lower   upper  reject
----------------------------------------------------
  High    Low   4.5266 0.0055  1.1204  7.9328   True
  High Medium    0.781 0.8515 -2.6252  4.1872  False
   Low Medium  -3.7457 0.0271 -7.1518 -0.3395   True
----------------------------------------------------
```

Our post-hoc interpretation:

**High vs. Low Dosage:**
- Mean Difference: The mean recovery time for patients on a High dosage is 4.5266 units more than those on a Low dosage.
- P-value: With a p-value of 0.0055, which is less than the typical alpha level of 0.05, we have evidence to reject the null hypothesis for this pair.
- Confidence Interval: We are 95% confident that the true difference in means between High and Low dosages lies between 1.1204 and 7.9328.
- Conclusion: The difference in recovery time between the High and Low dosages is statistically significant.

**High vs. Medium Dosage:**
- Mean Difference: The mean recovery time for patients on a High dosage is 0.781 units more than those on a Medium dosage.
- P-value: The p-value of 0.8515 is greater than 0.05, suggesting we do not have enough evidence to reject the null hypothesis for this pair.
- Confidence Interval: The 95% confidence interval ranges from -2.6252 to 4.1872, which includes 0.
- Conclusion: There's no significant difference in recovery time between the High and Medium dosages.

**Low vs. Medium Dosage:**
- Mean Difference: The mean recovery time for patients on a Low dosage is 3.7457 units more than those on a Medium dosage.
- P-value: With a p-value of 0.0271 (which is less than 0.05), we have evidence to reject the null hypothesis for this pair.
- Confidence Interval: We are 95% confident that the true difference in means between Low and Medium dosages lies between -7.1518 and -0.3395.
- Conclusion: The difference in recovery time between the Low and Medium dosages is statistically significant.

Overall:
- Patients on a *High* dosage have a significantly different recovery time compared to those on both *Low* and *Medium* dosages. However, the difference is significant in opposite directions for the two comparisons.
- The *Low* and *Medium* dosages also differ significantly from each other in terms of their effect on recovery time.

This information can be of immense value to healthcare professionals in determining optimal dosage levels for patients to aid in their recovery. However, as always, clinical judgment should integrate these findings with other clinical and patient-specific factors.

### Repeated Measures ANOVA
A Repeated Measures ANOVA (or within-subjects ANOVA) is an extension of the regular ANOVA but is used when the same subjects are used for each treatment (such as in a longitudinal study). This allows for analyzing the differences in means under different conditions or over different time periods for the same group of subjects.

**Key points of RM-ANOVA:**

1. Within-Subjects Design: 
    - In a repeated measures ANOVA, each participant is exposed to every level of the independent variable. For example, if studying the effect of a drug over three time points (before treatment, mid-treatment, after treatment), each participant would have measurements taken at all three time points.
2. Advantages:
    - Control of Individual Differences: One of the main benefits is that by using the same subjects across conditions, we control for individual variability. This often leads to increased statistical power.
    - Fewer Participants Required: Because each participant serves as their own control, fewer participants might be needed compared to between-subjects designs
3. Assumptions:
    - Similar to a regular ANOVA, the assumptions of normality and sphericity (equivalent to homogeneity of variances in one-way ANOVA) need to be met.
    - Sphericity: This is the condition where the variances of the differences between all possible pairs of within-subject conditions (levels) are equal. Violation of this assumption can increase the likelihood of Type I errors. If sphericity is violated, there are corrections (like Greenhouse-Geisser or Huynh-Feldt) that can be applied.
4. Main Effect and Interaction:
    - Just like in Two-way ANOVA, we can look at the main effects and interactions. 
    - However, in repeated measures, we're often most interested in the main effect of time or condition (or whatever the repeated measure is) and any interaction between time and the other within-subjects factor(s).
5. Considerations:
    - Carryover Effects: Since the same subjects are used across conditions, there's potential for carryover effects from one condition to the next. Counterbalancing or randomizing the order of conditions can help manage this.
    - Missing Data: In longitudinal studies, participants might drop out or miss some sessions. Handling missing data appropriately is crucial.

*Common Applications in Healthcare:*

Repeated Measures ANOVA is frequently used in healthcare, especially in studies that assess changes over time or under different conditions. Examples include:
- Assessing the progression of a disease over multiple time points.
- Evaluating the effects of a long-term rehabilitation program.
- Testing the effects of different doses of a drug taken by the same subjects.
- Monitoring physiological responses to different environmental conditions in the same set of patients.

#### Python Example 

*Research Problem*: A group of researchers in a rehabilitation center are keen to understand the effectiveness of a new physical therapy regimen for patients recovering from knee surgeries. They measure the range of motion (ROM) in the knee joint of each patient at three time points: immediately after surgery, 3 months post-surgery, and 6 months post-surgery. The objective is to determine if there's a significant difference in the ROM at these three time points.

*Hypothesis*:
- Null Hypothesis: There is no significant difference in the mean ROM of the knee joint at the three time points.
- Alternative Hypothesis: There is a significant difference in the mean ROM of the knee joint at at least two time points.

Let's generate some synthetic data for this experiment using Python:

```python
import pandas as pd
import numpy as np
from scipy.stats import f_oneway, shapiro, levene
from statsmodels.stats.anova import AnovaRM
from faker import Faker

fake = Faker()

# Number of patients
n_patients = 30

# Generate patient IDs
patients = [fake.unique.random_number(digits=5) for _ in range(n_patients)]

# Generate ROM measurements
# Assume ROM improves over time with some random variance
post_surgery = np.random.normal(40, 5, n_patients)
three_months = post_surgery + np.random.normal(10, 3, n_patients)
six_months = three_months + np.random.normal(10, 3, n_patients)

df = pd.DataFrame({
    'PatientID': patients,
    'PostSurgery': post_surgery,
    'ThreeMonths': three_months,
    'SixMonths': six_months
})

print(df)
print('\n')

# Assumption checks:
# Normality Tests
print("Normality Tests (Shapiro-Wilk) Results: \n")
print("Post-Surgery:", shapiro(df['PostSurgery']))
print("Three Months:", shapiro(df['ThreeMonths']))
print("Six Months:", shapiro(df['SixMonths']))

# Sphericity is usually checked using Mauchly's test. In Python, this can be challenging, 
# but when you use statsmodels to run the repeated measures ANOVA, you can apply corrections 
# if sphericity is assumed to be violated.

# Repeated Measures ANOVA
# The data needs to be in long format for statsmodels
df_long = pd.melt(df, id_vars=['PatientID'], value_vars=['PostSurgery', 'ThreeMonths', 'SixMonths'], 
                  var_name='Time', value_name='ROM')

# Run the repeated measures ANOVA
aovrm = AnovaRM(df_long, 'ROM', 'PatientID', within=['Time'])
res = aovrm.fit()

print("\n")
print("\n")
print("ANOVA results: \n")
print(res)

```

```text
Normality Tests (Shapiro-Wilk) Results: 

Post-Surgery: ShapiroResult(statistic=0.9347498416900635, pvalue=0.06573594361543655)
Three Months: ShapiroResult(statistic=0.975456178188324, pvalue=0.6961718797683716)
Six Months: ShapiroResult(statistic=0.9386237263679504, pvalue=0.08352136611938477)

ANOVA results: 

               Anova
===================================
     F Value  Num DF  Den DF Pr > F
-----------------------------------
Time 578.2021 2.0000 58.0000 0.0000
===================================
```

**Preliminary Result interpretation**: 
1. Normality Tests (Shapiro-Wilk): The Shapiro-Wilk test is used to assess the normality of the data.
    - Post-Surgery: The test statistic is 0.9347 with a p-value of 0.0657. Since the p-value is greater than 0.05, we fail to reject the null hypothesis of the test, suggesting that the ROM values for the Post-Surgery time point follow a normal distribution.
    - Three Months: The test statistic is 0.9754 with a p-value of 0.6962. The p-value is well above 0.05, indicating that the ROM values for the Three Months time point also follow a normal distribution.
    - Six Months: The test statistic is 0.9386 with a p-value of 0.0835. Once again, since the p-value is greater than 0.05, we conclude that the ROM values for the Six Months time point are normally distributed.

The results of the Shapiro-Wilk tests for all three time points suggest that the assumption of normality is met for the repeated measures ANOVA.

2. ANOVA results: The F-value in a repeated measures ANOVA tells us if the means between the time points are significantly different.
    - Time: The F-value is 578.2021 with an associated p-value of 0.0000. Since this p-value is less than our significance level (0.05), we reject the null hypothesis, suggesting there is a statistically significant difference in the mean ROM across the three time points.

Based on the results of the repeated measures ANOVA, there's strong evidence to suggest that there is a significant change in the range of motion (ROM) across the three time points. This indicates that the rehabilitation process post-surgery leads to significant improvement in knee joint mobility over time. Given the significant main effect for time, lets now conduct post-hoc tests to pinpoint where the differences lie among the three measurements.

**When conducting post-hoc tests for a repeated measures ANOVA, a commonly used approach is the Bonferroni adjustment. This adjustment helps control the family-wise error rate due to multiple comparisons.**

The `multipletests` function from `statsmodels` is a way to control the family-wise error rate by adjusting p-values from multiple comparisons. The method '`holm`' is a step-down method that uses Bonferroni adjustments.

Here's our plan:
- We will compute pairwise t-tests between our groups (time points).
- Extract p-values from these tests.
- Apply the multipletests function with the 'holm' method to adjust these p-values.
- Determine which pairwise comparisons are significant based on the adjusted p-values.

```python
import statsmodels.api as sm
from statsmodels.stats.multitest import multipletests

df.columns

# Step 1: Pairwise t-tests
timepoints = ['PostSurgery', 'ThreeMonths', 'SixMonths']
pvals = []

for i, t1 in enumerate(timepoints):
    for j, t2 in enumerate(timepoints):
        if i < j:  # To ensure we don't compare with itself or do redundant comparisons
            t_stat, p_val, _ = sm.stats.ttest_ind(df[t1], df[t2])
            pvals.append(p_val)
            print(f"T-test between {t1} and {t2}: p-value = {p_val:.4f}")

print('P-vals: ', pvals)

# Step 2: Adjust p-values
reject, pvals_corrected, _, _ = multipletests(pvals, alpha=0.05, method='holm')

# Step 3: Display adjusted results
for i, (t1, t2) in enumerate([(timepoints[i], timepoints[j]) for i in range(len(timepoints)) for j in range(len(timepoints)) if i < j]):
    print(f"Adjusted p-value for comparison between {t1} and {t2}: {pvals_corrected[i]:.4f}")
    print(f"Is the difference significant at alpha=0.05? {'Yes' if reject[i] else 'No'}")

```

```text

T-test between PostSurgery and ThreeMonths: p-value = 0.0000
T-test between PostSurgery and SixMonths: p-value = 0.0000
T-test between ThreeMonths and SixMonths: p-value = 0.0000

P-vals:  [5.045095443486492e-11, 3.1003227961491756e-22, 8.599752181993715e-10]

Adjusted p-value for comparison between PostSurgery and ThreeMonths: 0.0000
Is the difference significant at alpha=0.05? Yes

Adjusted p-value for comparison between PostSurgery and SixMonths: 0.0000
Is the difference significant at alpha=0.05? Yes

Adjusted p-value for comparison between ThreeMonths and SixMonths: 0.0000
Is the difference significant at alpha=0.05? Yes

```

**Overall interpretation**:

All three comparisons were statistically significant, even after correcting for multiple comparisons using the Holm-Bonferroni method. This suggests that the patients' ROM continued to significantly change/improve over the six months following surgery. This is expected in a recovery process, especially if there are concerted rehabilitation efforts in place.

In clinical or practical terms, this would imply the importance of continuous rehabilitation and therapy, especially in the first six months post-surgery, as significant improvements or changes are observed over this period.


### Multivariate Analysis of Variance (MANOVA)
MANOVA is an extension of ANOVA that allows for the analysis of multiple dependent variables simultaneously, adjusting for the intercorrelations among them. While ANOVA assesses the difference between groups for a single dependent variable, MANOVA tests for differences in two or more vectors of means.

**Key Concepts:**
- Multiple Dependent Variables: In contrast to ANOVA, which deals with one dependent variable, MANOVA deals with two or more dependent variables.
- Intercorrelations: MANOVA considers the intercorrelation between dependent variables. This makes it especially useful when those correlations are present.
- Main Effect: Similar to ANOVA, MANOVA tests for the main effect of the independent variable(s) on the combination of dependent variables.
- Interaction Effect: If there's more than one independent variable, MANOVA can also test for interaction effects.
- Pillai's Trace, Wilks' Lambda, Hotelling's Trace, and Roy's Largest Root: These are various test statistics used in MANOVA. Wilks' Lambda is the most commonly used, but depending on the data and the hypotheses, other statistics might be preferred.

**Assumptions:**
- Independence of Observations: The observations in each group should be independent of one another.
- Multivariate Normality: The combined dependent variables should be multivariate normally distributed for each group of the independent variable.
- Homogeneity of Covariance Matrices: The covariance matrices of the dependent variables should be the same for each group of the independent variable. This assumption can be tested using Box's M test.

#### Python Example

We'll be using the MANOVA class from the statsmodels package.

**Scenario**: A healthcare research facility conducts a study where 100 patients are divided into three groups. Each group receives a different type of therapy: Physical Therapy, Occupational Therapy, and Combination Therapy. The goal is to investigate if the therapies have a differential effect on two dependent outcomes: pain level (measured on a scale of 1-10) and mobility score (measured on a scale of 1-100, with 100 being the best mobility).

Let's generate some fake data and then conduct a MANOVA test. After running the below code, you'll get an output with the MANOVA test statistics, including Wilks' Lambda and Pillai's Trace, among others. Based on these statistics and their associated p-values, you can determine if there's a statistically significant difference in the combination of pain level and mobility score across the three types of therapy.



```python
import pandas as pd
import numpy as np
from statsmodels.multivariate.manova import MANOVA
from faker import Faker

fake = Faker()

# Create the data
np.random.seed(42)
n = 100
therapy_types = ["Physical", "Occupational", "Combination"]

therapy = np.random.choice(therapy_types, n)
pain_level = np.where(therapy == "Physical", np.random.normal(5, 1.5, n),
             np.where(therapy == "Occupational", np.random.normal(6, 1.2, n),
             np.random.normal(5.5, 1.3, n)))
mobility_score = np.where(therapy == "Physical", np.random.normal(70, 10, n),
                 np.where(therapy == "Occupational", np.random.normal(65, 8, n),
                 np.random.normal(68, 9, n)))

df = pd.DataFrame({
    "Therapy": therapy,
    "PainLevel": pain_level,
    "MobilityScore": mobility_score
})

# Perform MANOVA
maov = MANOVA.from_formula('PainLevel + MobilityScore ~ Therapy', data=df)
result = maov.mv_test()
print(result)
```

```text

===============================================================
                                                               
---------------------------------------------------------------
       Intercept         Value  Num DF  Den DF  F Value  Pr > F
---------------------------------------------------------------
          Wilks' lambda  0.0406 2.0000 96.0000 1134.9903 0.0000
         Pillai's trace  0.9594 2.0000 96.0000 1134.9903 0.0000
 Hotelling-Lawley trace 23.6456 2.0000 96.0000 1134.9903 0.0000
    Roy's greatest root 23.6456 2.0000 96.0000 1134.9903 0.0000
---------------------------------------------------------------

---------------------------------------------------------------
          Therapy         Value  Num DF  Den DF  F Value Pr > F
---------------------------------------------------------------
            Wilks' lambda 0.8360 4.0000 192.0000  4.4965 0.0017
           Pillai's trace 0.1644 4.0000 194.0000  4.3447 0.0022
   Hotelling-Lawley trace 0.1956 4.0000 114.1681  4.6779 0.0016
      Roy's greatest root 0.1927 2.0000  97.0000  9.3457 0.0002
===============================================================

```

**Interpretation of Intercept**: The intercept tests whether the multivariate means of the dependent variables are zero. This is typically not of primary interest in most studies but is more of a mathematical test. The extremely low p-values across all the test statistics indicate that the intercept is significantly different from zero, which is expected.

**Interpretation of Therapy**: The primary test of interest for the MANOVA is based on the therapy types. This will inform us if there are significant multivariate effects of the therapy types on pain level and mobility score combined.
- Wilks' Lambda: Value is 0.8360. The associated p-value is 0.0017, which is less than 0.05. This is significant, indicating that there are overall differences among the therapy groups when considering both dependent variables combined.
- Pillai's Trace: Value is 0.1644 with a p-value of 0.0022 (significant).
- Hotelling-Lawley Trace: Value is 0.1956 with a p-value of 0.0016 (significant).
- Roy's Greatest Root: Value is 0.1927 with a p-value of 0.0002 (significant).

All these tests converge on the same result, which suggests a strong evidence against the null hypothesis. The therapy types have a significant multivariate effect on pain level and mobility score combined.

Given that the overall MANOVA is significant, the logical next step would be to conduct separate univariate ANOVAs for each dependent variable (pain level and mobility score) to see which one(s) are driving the differences among the therapy groups. This helps break down the combined effect to understand which outcome measure(s) are significantly different among the therapy types.

Before moving on to the next step, we might report the findings up to this point with the following:

*"We conducted a multivariate analysis of variance (MANOVA) to determine the effects of different therapy types on patients' pain level and mobility score. The results indicated a significant multivariate main effect for therapy type, Wilks' Lambda = 0.8360, F(4, 192) = 4.4965, p = 0.0017. Follow-up univariate ANOVAs were conducted to probe the nature of the differences among the groups."*

Given that our MANOVA was significant for the therapy types, we'll conduct separate ANOVAs for each dependent variable (pain level and mobility score) to understand which specific outcome is significantly affected by the therapy types.

```python
import statsmodels.api as sm
from statsmodels.formula.api import ols

# Univariate ANOVA for Pain Level
pain_model = ols('PainLevel ~ Therapy', data=df).fit()
pain_anova_table = sm.stats.anova_lm(pain_model, typ=2)

# Univariate ANOVA for Mobility Score
mobility_model = ols('MobilityScore ~ Therapy', data=df).fit()
mobility_anova_table = sm.stats.anova_lm(mobility_model, typ=2)

print("ANOVA for Pain Level:\n", pain_anova_table)
print("\nANOVA for Mobility Score:\n", mobility_anova_table)
```

```text

ANOVA for Pain Level:
               sum_sq    df         F    PR(>F)
Therapy    20.600985   2.0  4.988742  0.008665
Residual  200.280510  97.0       NaN       NaN

ANOVA for Mobility Score:
                sum_sq    df         F    PR(>F)
Therapy    923.172528   2.0  5.175477  0.007317
Residual  8651.158021  97.0       NaN       NaN

```

In our next part of the results:

**Source of Variation: Therapy**
- F-Statistic (F): 4.988742 - This measures how much the means of each therapy type differ from the overall mean. The larger the F-statistic, the more likely the means are different.
- P-value (p): 0.008665 - Given that the p-value is less than the typical significance level of 0.05, we would reject the null hypothesis and conclude that there are significant differences in pain levels across the therapy types.

**Source of Variation: Mobility Score**
- F-Statistic (F): 5.175477 - As with the pain level, this measures the differences in the mean mobility scores across the therapy types.
- P-value (p): 0.007317 - This p-value is also less than 0.05, suggesting that there are significant differences in mobility scores across the therapy types.

Both pain level and mobility score seem to be significantly influenced by the type of therapy. Given that the p-values for both outcomes are less than 0.05, it suggests that at least two therapy types produce different outcomes for pain and mobility.

The next and final step would be to perform post-hoc tests (like Tukey's HSD) to determine which specific therapy types are different from each other in terms of both pain level and mobility score.

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd

# For Pain Level
posthoc_pain = pairwise_tukeyhsd(endog=df['PainLevel'], groups=df['Therapy'], alpha=0.05)
print("Tukey HSD test for Pain Level:\n", posthoc_pain)

# For Mobility Score
posthoc_mobility = pairwise_tukeyhsd(endog=df['MobilityScore'], groups=df['Therapy'], alpha=0.05)
print("\nTukey HSD test for Mobility Score:\n", posthoc_mobility)
```

```text

Tukey HSD test for Pain Level:
       Multiple Comparison of Means - Tukey HSD, FWER=0.05      
===============================================================
   group1       group2    meandiff p-adj   lower  upper  reject
---------------------------------------------------------------
 Combination Occupational   0.7067 0.1159 -0.1313 1.5448  False
 Combination     Physical  -0.3656 0.5679  -1.221 0.4899  False
Occupational     Physical  -1.0723 0.0072 -1.8966 -0.248   True
---------------------------------------------------------------

Tukey HSD test for Mobility Score:
        Multiple Comparison of Means - Tukey HSD, FWER=0.05       
=================================================================
   group1       group2    meandiff p-adj   lower    upper  reject
-----------------------------------------------------------------
 Combination Occupational  -5.8991 0.0328 -11.4068 -0.3913   True
 Combination     Physical   0.7721 0.9428  -4.8502  6.3945  False
Occupational     Physical   6.6712 0.0116   1.2539 12.0885   True
-----------------------------------------------------------------


```

**Tukey HSD for Pain Level:**

1. Combination vs. Occupational Therapy:**
    - Mean Difference: There's a difference in means of 0.7067 pain units between the Combination therapy and the Occupational therapy, with the Combination therapy showing higher pain scores on average.
    - p-value: The p-value for this comparison is 0.1159, which is greater than the 0.05 significance threshold. Therefore, we do not reject the null hypothesis.
    - Conclusion: There's no statistically significant difference in pain levels between patients undergoing Combination therapy and those undergoing Occupational therapy.

2. Combination vs. Physical Therapy:
    - Mean Difference: The difference in means between the Combination therapy and the Physical therapy is -0.3656 pain units, with the Physical therapy showing slightly higher pain scores on average.
    - p-value: The p-value is 0.5679, which is greater than 0.05.
    - Conclusion: There's no statistically significant difference in pain levels between patients undergoing Combination therapy and those undergoing Physical therapy.
    Occupational vs. Physical Therapy:

3. Mean Difference: 
    - The difference in means is -1.0723 pain units, with the Occupational therapy showing higher pain scores on average than Physical therapy.
    - p-value: The p-value is 0.0072, which is less than 0.05.
    - Conclusion: There's a statistically significant difference in pain levels between patients undergoing Occupational therapy and those undergoing Physical therapy, with the latter showing reduced pain.

**Tukey HSD for Mobility Score:**

1. Combination vs. Occupational Therapy:
    - Mean Difference: The difference in means is -5.8991 mobility units, indicating that the Combination therapy resulted in higher mobility scores (better outcomes) on average.
    - p-value: The p-value is 0.0328, which is less than 0.05.
    - Conclusion: There's a statistically significant difference in mobility scores between patients undergoing Combination therapy and those undergoing Occupational therapy, with Combination therapy leading to better outcomes.

2. Combination vs. Physical Therapy:
    - Mean Difference: The difference in means is 0.7721 mobility units, with the Combination therapy showing slightly better outcomes.
    - p-value: The p-value is 0.9428, which is greater than 0.05.
    - Conclusion: There's no statistically significant difference in mobility scores between patients undergoing Combination therapy and those undergoing Physical therapy.

3. Occupational vs. Physical Therapy:
    - Mean Difference: The difference in means is 6.6712 mobility units, with Physical therapy resulting in higher mobility scores on average.
    - p-value: The p-value is 0.0116, which is less than 0.05.
    - Conclusion: There's a statistically significant difference in mobility scores between patients undergoing Occupational therapy and those undergoing Physical therapy, with Physical therapy leading to better outcomes.

In summary, the post-hoc analysis suggests that while the Physical therapy leads to significant reductions in pain compared to Occupational therapy, Combination therapy and Physical therapy have no significant difference in pain reduction. For mobility scores, both Combination therapy and Physical therapy lead to better outcomes compared to Occupational therapy.



## Parametric vs. Non-parametric ANOVAs

### Parametric ANOVA
Parametric tests make certain assumptions about the data's distribution. For ANOVA, the assumptions are:

- Independence of observations
- Normally distributed residuals
- Homogeneity of variances
- If these assumptions are met, then the standard (parametric) versions of ANOVA can be used that are described above.

### Non-parametric ANOVA
When the assumptions of parametric ANOVA are not met, non-parametric versions can be applied. Non-parametric tests do not assume any specific distribution for the variables. Some common non-parametric alternatives to ANOVA include 1: Kruskal-Wallis test, and 2: Friedman test 

#### Kruskal-Wallis H Test
This test is used when you have two or more independent samples and your data doesn't meet the assumptions necessary for a standard ANOVA. You'll use this test to determine if there's a statistically significant difference between the medians of the groups.

```python
import scipy.stats as stats

# Sample data
group1 = [sample_data]
group2 = [sample_data]
group3 = [sample_data]
# ... and so on for each group

# Kruskal-Wallis H Test
h_stat, p_val = stats.kruskal(group1, group2, group3)
print(f"H-statistic: {h_stat}")
print(f"P-value: {p_val}")

if p_val < 0.05:
    print("There is a statistically significant difference between the groups.")
else:
    print("There is no statistically significant difference between the groups.")
```

#### Friedman Test:

This test is used for repeated measures data in a non-parametric setting (i.e., the data isn't normally distributed). It compares three or more paired groups.

```python
# Sample data
timepoint1 = [sample_data]
timepoint2 = [sample_data]
timepoint3 = [sample_data]
# ... and so on for each timepoint or group

# Friedman Test
chi2_stat, p_val = stats.friedmanchisquare(timepoint1, timepoint2, timepoint3)
print(f"Chi2-statistic: {chi2_stat}")
print(f"P-value: {p_val}")

if p_val < 0.05:
    print("There is a statistically significant difference between the timepoints or groups.")
else:
    print("There is no statistically significant difference between the timepoints or groups.")
```

For both these codes:

- Replace [sample_data] with your actual data.
- You can add or remove groups/timepoints as necessary. The functions can handle any number of sample groups as arguments.

Lastly, remember, the p-value threshold (often set at 0.05) is just a convention. In some contexts, especially with multiple comparisons, corrections might be necessary, or a different threshold might be used.

---



