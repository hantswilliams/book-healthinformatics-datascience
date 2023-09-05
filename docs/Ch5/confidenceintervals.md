---
sidebar_position: 5
---

# 5.5 Confidence Intervals in Health Studies

Confidence intervals are essential tools in health studies for estimating the range of values within which a population parameter is likely to fall. Confidence intervals are widely used in health informatics to quantify the precision of our estimates. This section delves into the concept of confidence intervals, their interpretation, and their significance in healthcare and medical research.

## Understanding Confidence Intervals

A confidence interval provides a range of values within which we can reasonably expect the true population parameter to lie. It is calculated based on sample data and a chosen level of confidence, often denoted as (1 - α), where α represents the significance level. Common confidence levels include 90%, 95%, and 99%.

The formula for calculating a confidence interval depends on the type of data and the parameter being estimated (e.g., mean, proportion). For example, the confidence interval for a population mean is often calculated using the sample mean and standard error.

### When Population Standard Deviation is Known

If the population standard deviation, denoted as $\sigma$, is known, the formula to calculate the confidence interval for the population mean, denoted as $\mu$, with a given sample mean, denoted as $\bar{x}$, is given by:

$$
CI = \bar{x} \pm Z \left( \frac{\sigma}{\sqrt{n}} \right)
$$

Where:
- $\bar{x}$ is the sample mean.
- $\sigma$ is the population standard deviation.
- $n$ is the sample size.
- $Z$ is the Z-score which corresponds to the desired confidence level (e.g., 1.96 for a 95% confidence level).

### When Population Standard Deviation is Unknown

If the population standard deviation is not known and the sample size is large (typically \( n \geq 30 \)), we can use the sample standard deviation, denoted as \( s \), in place of \( \sigma \). However, when the sample size is smaller (typically \( n < 30 \)), it's more appropriate to use the t-distribution:

$$
CI = \bar{x} \pm t \left( \frac{s}{\sqrt{n}} \right)
$$

Where:
- $\bar{x}$ is the sample mean.
- $s$ is the sample standard deviation.
- $n$ is the sample size.
- $t$ is the t-score which corresponds to the desired confidence level and degrees of freedom (typically \( df = n-1 \)).

### Manual Calculation

In the below snippet, we first determine whether to use the z-distribution (for larger samples) or the t-distribution (for smaller samples). Then, we calculate the margin of error and finally determine the bounds of the confidence interval.

```python
import numpy as np
from scipy import stats

def confidence_interval(data, confidence=0.95):
    """
    Calculate the confidence interval for a given dataset and confidence level.

    Parameters:
    - data (list or numpy array): Sample data
    - confidence (float): Desired confidence level (e.g., 0.95 for 95%)

    Returns:
    - (float, float): Lower and upper bounds of the confidence interval
    """
    mean = np.mean(data)
    n = len(data)

    if n >= 30:
        z_score = stats.norm.ppf(1 - (1 - confidence) / 2)
        std_err = np.std(data, ddof=1) / np.sqrt(n)
        margin_of_error = z_score * std_err
    else:
        t_score = stats.t.ppf(1 - (1 - confidence) / 2, df=n-1)
        std_err = np.std(data, ddof=1) / np.sqrt(n)
        margin_of_error = t_score * std_err

    lower_bound = mean - margin_of_error
    upper_bound = mean + margin_of_error

    return lower_bound, upper_bound

# Example usage:
data_sample = [20, 24, 22, 19, 24, 25, 23, 21, 20, 24]
print(confidence_interval(data_sample, 0.95))
```

```yaml
(20.69945469487464, 23.70054530512536)
```

### Automatic Calculation with Python

The `stats` module from the `scipy` library is commonly used to calculate confidence intervals. Let's demonstrate this for the scenario when the population standard deviation is unknown (as it's the most common scenario in real-world analyses).

```python
import numpy as np
from scipy import stats

def automatic_confidence_interval(data, confidence=0.95):
    """
    Calculate the confidence interval for a given dataset using scipy.stats.

    Parameters:
    - data (list or numpy array): Sample data
    - confidence (float): Desired confidence level (e.g., 0.95 for 95%)

    Returns:
    - (float, float): Lower and upper bounds of the confidence interval
    """
    mean = np.mean(data)
    sem = stats.sem(data)  # Standard error of the mean
    n = len(data)
    interval = sem * stats.t.ppf((1 + confidence) / 2., n-1)
    return mean - interval, mean + interval

# Example usage:
data_sample = [20, 24, 22, 19, 24, 25, 23, 21, 20, 24]
lower_bound, upper_bound = automatic_confidence_interval(data_sample, 0.95)
print(f"95% Confidence Interval: ({lower_bound:.2f}, {upper_bound:.2f})")
```

Output:

```yaml
95% Confidence Interval: (20.70, 23.70)
```

By utilizing `stats.sem` for the standard error of the mean and `stats.t.ppf` for the t-score, this method can quickly and accurately determine the confidence interval for a given dataset and confidence level.

## Interpretation of Confidence Intervals

A 95% confidence interval means that if we were to draw multiple random samples from the same population and calculate a confidence interval for each sample, approximately 95% of those intervals would contain the true population parameter.

If a confidence interval includes a specific value (e.g., zero for a difference in means), it suggests that the observed effect is not statistically significant at the chosen level of confidence. On the other hand, if the interval does not include the value, it suggests that the effect is statistically significant.

### Wider vs. Narrower Intervals
The width of the confidence interval also offers insights:

1. Wider Intervals: Indicate greater uncertainty about the estimate. This might be due to a smaller sample size, greater variability in the data, or a lower chosen confidence level.

2. Narrower Intervals: Represent greater precision around the estimate. This is often observed with larger sample sizes, lower variability, or when a higher confidence level is chosen.

It's also worth noting that while 95% confidence intervals are common, choosing a different level (e.g., 90% or 99%) will affect the interval's width. A 90% confidence interval will be narrower (but riskier), while a 99% confidence interval will be wider (more conservative).

The choice between a wider and narrower confidence interval often depends on the specific objectives of the study and the trade-offs one is willing to make between precision and certainty. Here are some healthcare-related examples to illustrate this:

### Reasons for Choosing a Wider or Narrower Confidence Interval in Healthcare
**1. Safety Evaluations**
- Scenario: A pharmaceutical company is testing a new drug and wants to ensure that the side effects are minimal.
- Choice: A 99% confidence interval might be chosen.
- Rationale: By choosing a wider confidence interval (99%), the company increases the probability that the interval contains the true population parameter related to side effects. This conservative approach provides greater assurance regarding safety claims.

**2. Preliminary Studies**
- Scenario: A researcher is conducting an early-stage study on the benefits of a new dietary supplement in improving heart health.
- Choice: A 90% confidence interval might be used.
- Rationale: In the early stages of research, the primary goal might be to determine if there's a potential effect worth investigating further. A narrower interval like 90% gives a tighter range of estimates but comes with a higher risk of missing the true parameter. If preliminary findings are promising, more robust studies with wider intervals can be pursued later.

**3. Epidemiological Surveillance**
- Scenario: A public health department is monitoring the prevalence of a certain disease in a community.
- Choice: A 95% confidence interval is commonly chosen.
- Rationale: For ongoing surveillance, a balance between precision and confidence is often desired. A 95% confidence interval offers a middle ground. It's sufficiently precise for decision-making while still providing a reasonable level of certainty.

**4. Cost-effectiveness Analysis**
- Scenario: A health economist is assessing whether a new surgical procedure is more cost-effective than the standard procedure.
- Choice: The choice between a narrower (90%) or wider (99%) confidence interval depends on the consequences of decision errors.
- Rationale: If overestimating cost-effectiveness might lead to a costly mistake (e.g., adopting a procedure that isn't truly cost-effective), a wider interval might be chosen to be more conservative. However, if the main goal is to quickly introduce potential improvements to patient care, a narrower interval might be acceptable to act on stronger preliminary evidence.

## Application in Health Studies

Confidence intervals play a vital role in healthcare and medical research:

- **Clinical Trials**: Researchers use confidence intervals to estimate the range of potential treatment effects, aiding in determining the efficacy and safety of interventions.

- **Epidemiology**: Confidence intervals help estimate the prevalence of diseases or health conditions within a population based on sample data.

- **Public Health**: Health officials use confidence intervals to assess the accuracy of disease surveillance data and predict potential outbreaks.

- **Healthcare Quality**: Confidence intervals are employed to estimate patient outcomes and assess the quality of healthcare services.

## Case Study: Efficacy of New Anti-hypertensive Drug

### Introduction to Study
Hypertension, commonly known as high blood pressure, is a significant risk factor for cardiovascular diseases, which are the leading cause of death worldwide. Despite numerous anti-hypertensive medications on the market, there's an ongoing search for newer drugs with fewer side effects and higher efficacy. In this study, we evaluate the effectiveness of DrugX, a new anti-hypertensive, compared to a standard medication, DrugY.

### Hypotheses
- Null Hypothesis (H0): There is no difference in the blood pressure reduction between patients using DrugX and those using DrugY.
- Alternative Hypothesis (H1): There is a significant difference in the blood pressure reduction between the two drugs.

### The data

```python
import numpy as np
from faker import Faker
import scipy.stats as stats
import scipy.stats as stats

# Set random seed for reproducibility
np.random.seed(42)
fake = Faker()

# Sample size for each group
n = 50

# Generating fake patient data
patients = [{"id": fake.uuid4(), "name": fake.name(), "drug": "DrugX", "bp_reduction": np.random.normal(15, 5)} for _ in range(n)]
patients += [{"id": fake.uuid4(), "name": fake.name(), "drug": "DrugY", "bp_reduction": np.random.normal(12, 5)} for _ in range(n)]

# Convert to DataFrame
df = pd.DataFrame(patients)
```

Which should look like this:

```yaml
    id	                                    name	        drug	bp_reduction
0	1db23730-e44d-4241-9210-4652d2da37f0	Stephen Harper	DrugX	17.483571
1	2f14ebec-54cb-4700-ad9e-108e350622fc	Michael Moore	DrugX	14.308678
2	2880e663-ce7d-4f66-9ba8-a930dfdc850f	Alexandra King	DrugX	18.238443
3	6a57cf64-7bfb-41f3-9e7f-f66ff702f185	Scott Bradley	DrugX	22.615149
4	48926692-ea32-40b7-9edc-4c700a341f56	Michael Woods	DrugX	13.829233
5	5d69a38b-55da-4792-a008-e97d960607f3	Leslie SchroederDrugX	13.829315
6	598aa805-c706-4e8b-bb2e-35b9de212492	Daniel Shelton	DrugX	22.896064
7	cffc9645-faf1-4f1e-bbf9-badad91e6f95	Sherry Harris	DrugX	18.837174
8	4c4019a3-6f47-431d-9637-be7f98de5ef4	Kelsey Simmons	DrugX	12.652628
9	fec34ff0-a625-4a40-b146-258dc780f526	Jacob Holden	DrugX	17.712800
```

Here, `bp_reduction` is the amount (in mm Hg) the patient's blood pressure has been reduced since starting the medication.

### Analysis

Conducting a t-test:
Now, let's perform an independent t-test between the `bp_reduction` of the intervention (`DrugX`) and control (`DrugY`) groups.

```python
drugX_data = df[df["drug"] == "DrugX"]["bp_reduction"]
drugY_data = df[df["drug"] == "DrugY"]["bp_reduction"]

t_stat, p_value = stats.ttest_ind(drugX_data, drugY_data)

print('T-stat:', t_stat)
print('P-value:', p_value)
```

```yaml
T-stat: 1.9720931329734621
P-value: 0.051417628702718036
```

### Confidence Intervals 

Calculating Confidence Intervals: We'll use the stats module from scipy. In the below code, we have a function that will give us a mean, followed by two numbers that represent the lower and upper bounds of the confidence interval: 

```python
def mean_confidence_interval(data, confidence=0.95):
    a = 1.0 * np.array(data)
    n = len(a)
    m, se = np.mean(a), stats.sem(a)
    h = se * stats.t.ppf((1 + confidence) / 2., n-1)
    return m, m-h, m+h

ci_drugX = mean_confidence_interval(drugX_data)
ci_drugY = mean_confidence_interval(drugY_data)

print('Mean for Drug X: ', ci_drugX[:1])
print('CI for Drug X: ', ci_drugX[1:])
print('\n')
print('Mean for Drug Y:', ci_drugY[:1])
print('CI for Drug Y: ', ci_drugY[1:])
```

```yaml
Mean for Drug X:  (13.872630473719301,)
CI for Drug X:  (12.545901816033714, 15.199359131404888)


Mean for Drug Y: (12.088904352339762,)
CI for Drug Y:  (10.846502293359181, 13.331306411320343)
```

### Interpretation

**T-statistic:** The t-statistic value of 1.972 suggests that the difference between the means of DrugX and DrugY is 1.972 standard errors away from zero. The larger the t-value, the more evidence we have against our null hypothesis.

P-value: The p-value of 0.0514 is just slightly above the common alpha level of 0.05, which is typically used to determine statistical significance. This means that if there were no actual difference in the effects of DrugX and DrugY (i.e., the null hypothesis were true), we would observe a difference as extreme as the one in our sample or even more extreme about 5.14% of the time just by random chance.

**Means:**

The mean blood pressure reduction for Drug X is approximately 13.87 mm Hg.
The mean blood pressure reduction for Drug Y is approximately 12.09 mm Hg.

**Confidence Intervals:**

For DrugX, we are 95% confident that the true mean blood pressure reduction for the population lies between 12.55 mm Hg and 15.20 mm Hg.

For DrugY, we are 95% confident that the true mean blood pressure reduction for the population lies between 10.85 mm Hg and 13.33 mm Hg.

**Conclusion:**
The p-value is a borderline case, just slightly above 0.05. This means that the evidence against the null hypothesis is not quite strong enough at the 0.05 level to say that DrugX and DrugY have different effects. However, it's very close, so there's still some evidence of a difference.

The means and confidence intervals further reveal this story:

DrugX appears to have a higher mean blood pressure reduction compared to DrugY. The confidence intervals of the two drugs do overlap, but the upper limit of DrugY's interval is below the mean of DrugX, which suggests there could be a genuine difference, even though it's not statistically significant at the 0.05 level.

In practical terms, while DrugX does seem to have a slightly better average effect on blood pressure reduction, the difference might not be statistically significant but it may be clinical significant. Further research or larger sample sizes might be needed to draw a more definitive conclusion.

---

Confidence intervals provide researchers and healthcare professionals with a measure of uncertainty and help communicate the reliability of estimated population parameters. They are valuable tools for making informed decisions and drawing meaningful conclusions from health data.