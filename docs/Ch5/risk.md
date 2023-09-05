---
sidebar_position: 8
---

# 5.8 Relative Risk and Odds Ratio and Related Terms

## Intro

In the realm of healthcare and epidemiology, understanding the relative chances of an event occurring between different groups is crucial. Two of the most significant metrics that provide insight into these probabilities are the **Relative Risk (RR)** and the **Odds Ratio (OR)**.

**Relative Risk** quantifies the probability of an event occurring in the treatment or exposed group as compared to a control or unexposed group. It is a direct measure of the magnitude of difference between the risk in two distinct groups. When RR is equal to 1, it implies no difference in risk. If it's greater than 1, the event is more likely to occur in the first group, and if it's less than 1, the event is less likely.

**Odds Ratio**, on the other hand, compares the odds of an event between two groups. Unlike RR which compares probabilities, OR compares the odds. In many situations, especially in case-control studies where direct computation of probability is tricky, OR becomes an invaluable tool. An OR greater than 1 indicates increased odds of the event in the first group compared to the second, and vice versa.

In healthcare, these measures are paramount. Consider a clinical trial examining the efficacy of a new drug. Relative Risk could give insights into how effective the new treatment is in reducing disease occurrence compared to a placebo. Similarly, in studies focusing on risk factors, Odds Ratios can indicate how much more likely a particular event (like a disease or symptom) is to happen in people with the risk factor versus without.

**These metrics don't stand alone;** they are integral to many of the inferential statistical analyses we've delved into. For instance, when analyzing the results of randomized control trials or observational studies, RR and OR can provide effect sizes that, when coupled with p-values, can offer both clinical and statistical significance. They serve as bridges, linking raw data to actionable insights, enabling healthcare professionals to make informed decisions on treatment strategies, intervention policies, and patient care.

## Relative Risk (RR)

Relative risk, also known as the risk ratio, is a measure used to determine the strength of the association between an exposure (often a treatment or intervention) and an outcome (often a disease or condition).

$$
RR = \frac{\text{Incidence in exposed group}}{\text{Incidence in unexposed group}} 
$$

**Interpretation**:

- RR = 1: No association between exposure and outcome.
- RR > 1: Increased risk of the outcome in the exposed group compared to the unexposed group.
- RR < 1: Decreased risk of the outcome in the exposed group compared to the unexposed group.

Certainly! Let's explore a clinical scenario and then compute the Relative Risk.

---

### Vaccine Clinical Scenario

Evaluating a New Vaccine

**Background:** A new vaccine has been developed to prevent a particular viral illness. Clinical trials are conducted to determine its efficacy. Two groups were studied: one received the vaccine (Vaccinated group) and the other received a placebo (Control group). 

The primary outcome is the development of the viral illness over a 12-month period. The results after 12 months are as follows:

|                    | Developed Illness | Did Not Develop Illness | Total  |
|--------------------|-------------------|-------------------------|--------|
| **Vaccinated**     | 10                | 990                     | 1000   |
| **Control (Placebo)**| 50               | 950                     | 1000   |

From the data, let's calculate the Relative Risk:

**Step 1:** Calculate the risk (probability) for each group:

$$
\text{Risk in Vaccinated Group} = \frac{\text{Number who developed illness in Vaccinated group}}{\text{Total in Vaccinated group}} 
$$
  
$$ 
\text{Risk in Vaccinated Group} = \frac{10}{1000} = 0.01 \text{ or 1 percent}
$$

---

$$
\text{Risk in Control group} = \frac{\text{Number who developed illness in Control group}}{\text{Total in Control group}} 
$$
  
$$
\text{Risk in Control} = \frac{50}{1000} = 0.05 \text{ or 5 percent}
$$

**Step 2:** Calculate the Relative Risk:

$$
RR = \frac{\text{Risk in Vaccinated}}{\text{Risk in Control}} 
$$

$$
RR = \frac{0.01}{0.05} 
$$

$$
RR = 0.2
$$

---

**Interpretation:** The Relative Risk (RR) of 0.2 indicates that those who received the vaccine had only 20% of the risk of developing the viral illness compared to those who received the placebo. In other words, the vaccine reduced the risk of getting the viral illness by 80% over a 12-month period compared to the placebo.

This demonstrates the potential efficacy of the vaccine in preventing the viral illness. Further statistical tests would be needed to confirm the significance of these findings, but the RR provides a clear and direct measure of the magnitude of effect the vaccine has on preventing the illness.

## Odds ratio 
Is a measure that quantifies how strongly the presence or absence of property A is associated with the presence or absence of property B in a given population.

Certainly! Here's the Odds Ratio formula in KaTeX format:

$$
OR = \frac{\frac{a}{b}}{\frac{c}{d}} = \frac{a \times d}{b \times c}
$$


Using a 2x2 table:

```text

	        Disease-Yes	  Disease-No
Exposure-Yes	  a	        b
Exposure-No	      c	        d

```

**Interpretation:**
- OR = 1: No association between exposure and outcome.
- OR > 1: Exposure is associated with higher odds of the outcome.
- OR < 1: Exposure is associated with lower odds of the outcome.


Certainly! Let's dive into a clinical scenario to illustrate the concept of the Odds Ratio.

---

### Heart Disease Clinical Scenario

Evaluating the Effectiveness of a New Drug for Heart Disease

**Background:** A new drug has been developed to reduce the risk of heart attacks in patients with a history of heart disease. Researchers want to determine its effectiveness. Two groups are studied: one group received the new drug (Treatment group) and the other group received the standard treatment (Control group). 

The primary outcome is the occurrence of a heart attack over a 2-year period. Here are the results after 2 years:

|                         | Had a Heart Attack | Did Not Have a Heart Attack | Total  |
|-------------------------|--------------------|-----------------------------|--------|
| **Treatment (New Drug)**| 30                 | 970                         | 1000   |
| **Control (Standard Treatment)** | 80              | 920                         | 1000   |

From the data, let's calculate the Odds Ratio:

**Step 1: Calculate the odds for each group:**

$$
\text{Odds in Treatment group }= \frac{\text{Number who had a heart attack in Treatment group}}{\text{Number who did NOT have a heart attack in Treatment group}}
$$

$$
\text{Odds in Treatment} = \frac{30}{970} = 0.0309
$$

$$
\text{Odds in Control group} = \frac{\text{Number who had a heart attack in Control group}}{\text{Number who did NOT have a heart attack in Control group}}
$$

$$
\text{Odds in Control} = \frac{80}{920} = 0.0870
$$

**Step 2: Calculate the Odds Ratio (OR):**

$$
\text{OR} = \frac{\text{Odds in Treatment}}{\text{Odds in Control}} 
$$

$$
\text{OR} = \frac{0.0309}{0.0870} 
$$

$$
\text{OR} \approx 0.355 
$$

---

**Interpretation:** 
An Odds Ratio (OR) of 0.355 indicates that the odds of having a heart attack for patients who received the new drug are approximately 35.5% of the odds for those who received the standard treatment. In other words, the new drug seems to reduce the odds of having a heart attack by around 64.5% compared to the standard treatment.

It's important to note that while the OR provides insight into the strength and direction of the effect of the new drug, it doesn't directly tell us about the difference in risk or probability between the two groups. An OR is particularly useful when the outcome event is rare. In our case, since heart attacks in a population with a history of heart disease may not be considered "rare", researchers would likely also consider other measures like the Relative Risk. However, the OR gives a measure of the strength of association between the treatment and the outcome.




## Attribution Risk

Attributable risk represents the difference in risk between the exposed group and the unexposed group. It tells us how many cases of the disease could be avoided if the exposure were eliminated.

`AR` **=** `Incidence in exposed group` **−** `Incidence in unexposed group`

### Clinical Scenario Continued from OR

Attribution risk (often termed "attributable risk" or "risk difference") provides information about the absolute difference in risk between two groups. It's the difference between the incidence rate of the disease in the exposed (or treatment) group and the incidence rate of the disease in the non-exposed (or control) group.

Given our heart disease drug example, we can calculate the attributable risk to determine how many heart attacks per 1,000 patients are prevented by the new drug as compared to the standard treatment.

First, let's calculate the risk (or probability) of having a heart attack for both groups:

1. **Risk in Treatment group (New Drug)**
$$
\text{Risk in Treatment} = \frac{\text{Number who had a heart attack in Treatment group}}{\text{Total in Treatment group}}
$$

$$
\text{Risk in Treatment} = \frac{30}{1000} = 0.03 
$$

2. **Risk in Control group (Standard Treatment)**
$$
\text{Risk in Control} = \frac{\text{Number who had a heart attack in Control group}}{\text{Total in Control group}} 
$$

$$
\text{Risk in Control} = \frac{80}{1000} = 0.08 
$$

3. **Now, we can calculate the Attributable Risk:**

$$
\text{Attributable Risk} = \text{Risk in Control} - \text{Risk in Treatment} 
$$

$$
\text{Attributable Risk} = 0.08 - 0.03 
$$

$$
\text{Attributable Risk} = 0.05 
$$

*Interpretation:* The Attributable Risk of 0.05 (or 5% when expressed as a percentage) indicates that the use of the new drug reduces the risk of having a heart attack by 5% over a 2-year period compared to using the standard treatment. 

In terms of absolute numbers, this means that for **every 1,000 patients treated with the new drug instead of the standard treatment, 50 fewer patients will have a heart attack over a 2-year period**. This provides a concrete, easily understandable metric for clinicians and patients to gauge the potential benefit of the new drug in a real-world setting.

