---
sidebar_position: 5
---

# 1.5 Data Acquisition in Healthcare

Diverse data sources in healthcare often come with diverse challenges:

## Acquiring and Integrating Health Data

The process of acquiring health data involves gathering, organizing, and integrating data from various sources to create a comprehensive view of patient health and medical history. Different avenues exist for data acquisition:

- **Electronic Health Records (EHRs)**: Hospitals and healthcare systems store patient records electronically, providing a wealth of clinical information. However, data integration may require dealing with disparate systems and formats.

- **Health Insurance Payers**: Health insurance companies like Blue Cross Blue Shield (BCBS), UnitedHealth Group, and Aetna possess valuable claims data that can provide insights into patient treatments, costs, and utilization.

- **Vendor Data**: Numerous vendors offer curated health datasets for purchase, covering topics such as disease prevalence, pharmaceutical sales, and more. Examples include IQVIA, Optum, and IBM Watson Health.

- **Publicly Available Data**: Government agencies like the Centers for Medicare & Medicaid Services (CMS) and healthdata.gov provide datasets for public use. These datasets, often de-identified, cover topics like hospital performance, Medicare billing, and population health.

- **Clinical Trials Data**: Data from clinical trials can offer insights into drug efficacy, treatment outcomes, and adverse events. Organizations like ClinicalTrials.gov provide access to this data.

- **Wearable Devices and IoT**: With the rise of wearable health devices and Internet of Things (IoT) sensors, real-time data from patients' daily lives can be integrated into healthcare analytics.

## Challenges and Nuances of Health Data Formats

Health data comes in various formats, each with its own complexities:

- **Structured Data**: Structured data, like that found in EHRs, is organized and stored in predefined tables and fields. Integrating such data requires dealing with data normalization, missing values, and data consistency.

- **Unstructured Data**: Clinical notes, radiology images, and other narratives fall under unstructured data. Extracting meaningful information from these sources requires natural language processing (NLP) and image analysis techniques.

- **HL7 and FHIR Standards**: Health Level Seven (HL7) and Fast Healthcare Interoperability Resources (FHIR) standards aim to standardize health data exchange. However, different versions and implementations can still present challenges in integration.

- **Privacy and Security Considerations**: As health data is sensitive, strict privacy regulations like HIPAA must be adhered to during data acquisition and integration.

## Extracting Value from Acquired Data

The process of acquiring health data is just the beginning. Extracting meaningful insights requires diligent data cleaning, integration, and transformation. Advanced analytical techniques, including machine learning and AI, play a crucial role in turning raw data into actionable insights that drive improvements in patient care, medical research, and healthcare operations.

## Open Source Dataset Examples

For easy access and convenience, we have compiled all the links to these healthcare datasets and resources in a [GitHub repository](https://github.com/hantswilliams/healthcare-data). You can visit the repository to explore and discover more about each dataset and resource.

Feel free to explore these datasets, resources, and tools to enhance your understanding of healthcare data and develop innovative solutions in the field of health informatics.

### Federal data sets and resources

<iframe src="https://docs.google.com/spreadsheets/d/17v3pvChW1CktD_U4mz-9w_EulAmC43-c6LlsEz9iGNE/edit?usp=sharing" width="100%" height="600" frameborder="0"></iframe>


### Unique Open Source Datasets

- [Gun Violence Archive](https://www.gunviolencearchive.org/): Analyze comprehensive data related to gun violence incidents, including location, date, victims, and more.
- [Social Capital](https://socialcapital.org): Explore datasets related to social determinants of health, offering valuable insights into the impact of social factors on population health outcomes.
- [NY SDoH Resources](https://journals.sagepub.com/doi/full/10.1177/00469580231152318): A curated list of resources and data specific to social determinants of health in New York.
- [All of Us (NIH)](https://databrowser.researchallofus.org/): Gain access to diverse datasets encompassing genetics, patient-reported outcomes, environmental factors, social determinants of health, and more.
- [MIMIC](https://physionet.org/content/mimiciii-demo/1.4/): A dataset offering ICU-like data, ideal for research and analysis in critical care settings.
- [CMS Open Payments](https://www.cms.gov/OpenPayments/Data/Dataset-Downloads): Explore the financial relationships between healthcare providers and manufacturers in the United States.
- [CMS Medicare Claims PUF](https://www.cms.gov/Research-Statistics-Data-and-Systems/Downloadable-Public-Use-Files/BSAPUFS): Publicly available Medicare claims data that provides insights into healthcare utilization, costs, and more.
- [MTSamples](https://www.mtsamples.com/): A collection of text samples for natural language processing (NLP) tasks in healthcare, including medical transcription examples.

### Non-traditional to enrich datasets: 
- [National Address Database](https://www.transportation.gov/gis/national-address-database)


### Other Healthcare Examples:
- [CMS Medicare Physician and Other Practitioner](https://data.cms.gov/provider-summary-by-type-of-service/medicare-physician-other-practitioners)
- [CMS - Medicare - Hospital Operating Costs, Expenditures](https://data.cms.gov/provider-compliance/cost-report/hospital-provider-cost-report/)
  - "...The Hospital Provider Cost Report dataset provides select measures from the hospital annual cost report. This data includes provider information such as facility characteristics, utilization data, cost and charges by cost center (in total and for Medicare), Medicare settlement data, and financial statement data organized by CMS Certification Number."
- [Human Mortality Database](https://www.mortality.org/Data/ZippedDataFiles)
- [CMS Data Portal](https://data.cms.gov/provider-data/?redirect=true)
- [HCUP Supplmental Files and Researcher Tools](https://hcup-us.ahrq.gov/tools_software.jsp)
- [1000 Genomes Project](https://registry.opendata.aws/1000-genomes/)
- [WONDER CDC Query Tool](https://wonder.cdc.gov/)
- [WHO Data Portal](https://www.who.int/data/collections)
- [DASH: Child Health and Development Cohort](https://dash.nichd.nih.gov/study/8)
- [NCI: SEER](https://seer.cancer.gov/data-software/datasets.html)
- [US: Big Cities: Health Data](https://bigcitieshealthdata.org/)

### Aggregation Sites
- [More SDoH and other Health Related Datasets by the University of Pittsburg](https://hsls.libguides.com/health-data-sources/data-sets)


Feel free to explore these datasets and leverage them for research, analysis, and building your skillset. These open source datasets will serve as valuable resources to enhance your understanding of healthcare data and develop innovative solutions in the field of health informatics. Happy exploring!

*Note: It's always important to review the terms of use and data licensing agreements associated with each dataset before use.*
