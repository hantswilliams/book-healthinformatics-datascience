---
sidebar_position: 7
---
# 4.7 Dashboards - Streamlit

Streamlit is an open-source Python library that allows data scientists and developers to create interactive, web-based applications with ease. Built with a focus on machine learning and data analysis, Streamlit offers an intuitive way to turn data scripts into shareable web applications without requiring extensive web development skills.

## Why Streamlit?

- **Simplicity:** You can create a web application with just a few lines of Python code. No need to juggle between different files or learn HTML, CSS, or JavaScript.
  
- **Interactivity:** Widgets like sliders, buttons, and input boxes allow users to interact with the data and visualizations.
  
- **Data Integration:** Streamlit supports a variety of data sources and integrates seamlessly with popular data science libraries like Pandas, NumPy, and Matplotlib.
  
- **Live Reloading:** As you edit your Streamlit script, the application automatically updates, offering a quick feedback loop during development.
  
- **Deployment and Sharing:** With platforms like Streamlit sharing, deploying your app to the world becomes a cakewalk.

## Building a Basic Streamlit App

### Installation 

1. Install Streamlit:
   ```bash
   pip install streamlit
   ```

2. Run your app: 
    ```bash
    streamlit run your_app_script.py
    ```

### Examples

A basic Streamlit application might look something like this:

```python
import streamlit as st
import pandas as pd
import numpy as np

# Title of the App
st.title('My First Streamlit App')

# Add a widget (e.g., a slider)
number = st.slider("Select a number", 1, 100, 50)

st.write(f"You selected the number {number}")

# Load and display some data
data = pd.DataFrame({
  'numbers': np.random.randn(100),
})

st.line_chart(data)
```

To run a Streamlit app, you would save your script (e.g., `app.py`) and then run `streamlit run app.py` in your terminal.

Here is a more advanced example, that has some capabilities highlighted such as 'data caching' to enable for quicker reloads:

```python

import streamlit as st
import pandas as pd
import numpy as np

st.title('Uber pickups in NYC')

DATE_COLUMN = 'date/time'
DATA_URL = ('https://s3-us-west-2.amazonaws.com/'
            'streamlit-demo-data/uber-raw-data-sep14.csv.gz')

@st.cache_data
def load_data(nrows):
    data = pd.read_csv(DATA_URL, nrows=nrows)
    lowercase = lambda x: str(x).lower()
    data.rename(lowercase, axis='columns', inplace=True)
    data[DATE_COLUMN] = pd.to_datetime(data[DATE_COLUMN])
    return data

data_load_state = st.text('Loading data...')
data = load_data(10000)
data_load_state.text("Done! (using st.cache_data)")

if st.checkbox('Show raw data'):
    st.subheader('Raw data')
    st.write(data)

st.subheader('Number of pickups by hour')
hist_values = np.histogram(data[DATE_COLUMN].dt.hour, bins=24, range=(0,24))[0]
st.bar_chart(hist_values)

# Some number in the range 0-23
hour_to_filter = st.slider('hour', 0, 23, 17)
filtered_data = data[data[DATE_COLUMN].dt.hour == hour_to_filter]

st.subheader('Map of all pickups at %s:00' % hour_to_filter)
st.map(filtered_data)

```

## Integrating with Other Libraries

One of the strengths of Streamlit is its integration with other libraries. For instance, if you've created a visualization with Matplotlib, Seaborn, or Plotly, you can easily display it in a Streamlit app. Similarly, machine learning models trained with libraries like Scikit-learn or TensorFlow can be integrated and showcased within your Streamlit application.

## Limitations and Considerations

While Streamlit offers a fast and intuitive way to build data applications, it's essential to note a few limitations:

- **State Management:** Managing state (like remembering user inputs across interactions) can be tricky. There are workarounds, but it's not as straightforward as some other frameworks.
  
- **Custom Styling:** While Streamlit provides a clean and modern look out of the box, extensive custom styling requires more effort.

---

Streamlit bridges the gap between data analysis and web application, providing an efficient and elegant way to share insights, models, and visualizations with a broader audience. As with any tool, it's essential to understand its strengths and limitations to determine if it's the right fit for your project.

