---
sidebar_position: 6
---

# 4.6 Dashboards - Shiny

Shiny has transformed the landscape of data visualization by offering tools to turn static plots into interactive web applications without the need for advanced web development skills.

## What is Shiny?

Shiny, an innovation by RStudio, was originally designed for the R ecosystem. It allows users to create interactive web applications directly from R. Given the increasing popularity of Python in data science, Shiny's principles have been ported to Python, making its robust framework accessible to a wider audience.

## Introduction to R and Comparison with Python

R is a language and environment designed for statistical computing and graphics. Originated in the world of academia, R has gained immense popularity among statisticians and data miners for its rich collection of statistical and graphical methods.

### Common Tasks and Their Syntax in Python vs. R:

1. **Loading Libraries:**
   - **Python:** `import pandas as pd`
   - **R:** `library(dplyr)`

2. **Reading a CSV File:**
   - **Python:** `data = pd.read_csv('filename.csv')`
   - **R:** `data <- read.csv('filename.csv')`

3. **Viewing the First Few Rows of a Dataframe:**
   - **Python:** `data.head()`
   - **R:** `head(data)`

4. **Selecting a Column from a Dataframe:**
   - **Python:** `data['column_name']`
   - **R:** `data$column_name`

5. **Filtering Data Based on Conditions:**
   - **Python:** `data[data['column_name'] > value]`
   - **R:** `data %>% filter(column_name > value)`

6. **Applying Functions to Columns:**
   - **Python:** `data['column_name'].apply(lambda x: function(x))`
   - **R:** `data %>% mutate(new_column = sapply(column_name, function))`

7. **Plotting Data:**
   - **Python:** Using libraries like `matplotlib` or `seaborn`.
   - **R:** Using `ggplot2`, which is part of the `tidyverse`.

### Key Packages:

While Python has libraries like Pandas, NumPy, Scikit-learn, Seaborn, and Matplotlib, R offers a myriad of packages for data manipulation, visualization, and modeling. Some of the widely-used R packages include:

- **dplyr:** For data manipulation.
- **ggplot2:** For data visualization.
- **tidyr:** For tidying up data.
- **stringr:** For string operations.
- **caret:** For machine learning.

### Why R?

- **Rich Ecosystem:** R has a comprehensive ecosystem for statistics, with a vast number of packages available for various statistical tests and models.
  
- **Integrated Development Environment (IDE):** RStudio, an IDE for R, provides a user-friendly interface, making it easier to write and run R scripts, visualize data, and manage packages.

- **Shiny:** A web application framework for R, allowing you to turn your R analyses into interactive web applications without needing HTML, CSS, or JavaScript knowledge.

While Python remains the go-to language for general-purpose programming and has robust data science libraries, R holds its ground in the domain of statistical computing and research. In many academic and research settings, R is the standard tool, especially for specialized statistical work or data visualization.

Understanding both languages can offer a competitive advantage in the field of data analysis and statistics, as it allows professionals to choose the best tool for a given task.


## Shiny for R

### Introduction

Shiny for R enables researchers and professionals to bring their data analyses to life. Through Shiny, complex R scripts can be transformed into responsive web applications that can be shared with a broader audience.

### Getting Started with Shiny for R

To begin with Shiny in R:

```R
install.packages("shiny")
library(shiny)
```

### Basic Structure

A Shiny app in R revolves around two main components:

1. **UI (User Interface)**: Defines the layout and appearance of the app.
2. **Server Function**: Contains the logic and reactive elements that respond to user inputs.

### Key Features

- **Reactivity**: At the heart of Shiny is reactivity. As users interact with a Shiny app, the outputs they see (plots, tables, etc.) are automatically updated in real-time.
  
- **Widgets**: These are interactive components that allow users to set values through sliders, buttons, dropdowns, and more.
  
- **Layouts**: Shiny apps can have complex layouts with multiple panels, tabs, and navigation bars, facilitating organized presentation of information.

### Deployment

RStudio provides a hosting platform, 'shinyapps.io', where users can deploy, manage, and share their Shiny applications with the world.

Here is a basic app that visualizes data from the CDC's 500 cities project: 

```r
# Install and load necessary packages
install.packages(c("shiny", "ggplot2", "dplyr"))
library(shiny)
library(ggplot2)
library(dplyr)

# Define the User Interface
ui <- fluidPage(
  titlePanel("CDC 500 Cities Data Visualization"),
  
  sidebarLayout(
    sidebarPanel(
      selectInput("city_name", "Choose a City:", choices = unique(data$CityName))
    ),
    
    mainPanel(
      plotOutput("city_plot")
    )
  )
)

# Define the Server Logic
server <- function(input, output) {
  output$city_plot <- renderPlot({
    
    # Sample data (Replace this with your actual data)
    data <- data.frame(
      CityName = c("New York", "Los Angeles", "Chicago", "Houston", "Phoenix"),
      Value = c(65, 70, 60, 58, 72)
    )
    
    avg_val <- mean(data$Value)
    
    # Plot
    plot_data <- ggplot(data, aes(x = CityName, y = Value, fill = CityName == input$city_name)) +
      geom_bar(stat = "identity") +
      geom_hline(yintercept = avg_val, color = "red", linetype = "dashed") +
      labs(title = "City Health Data", y = "Value", fill = "Selected City") +
      theme_minimal()
    
    print(plot_data)
  })
}

# Run the application
shinyApp(ui = ui, server = server)

```

## Shiny for Python

### Introduction

While Shiny is inherently an R-based framework, its principles and functionality have inspired Python adaptations. This allows Python users to create web applications that mirror the Shiny experience.

### Getting Started with Shiny for Python

Starting with Shiny in Python:

```python
pip install shiny
```

### Basic Structure

Shiny for Python mirrors the core concepts from its R counterpart:

1. **UI**: Establishes the visual layout and components of the application.
2. **Server Function**: Encapsulates the app's logic, handling input and producing outputs.

### Key Features

- **Pythonic Approach**: While the framework is inspired by Shiny for R, it adopts a Pythonic approach, making it intuitive for Python developers.
  
- **Decorators**: Advanced Python concepts, like decorators, are employed for defining outputs, which might be a new concept for some but adds to the efficiency and elegance of the code.
  
- **Integrated Visualization**: Libraries like Matplotlib and Seaborn can be integrated seamlessly, enabling rich visual outputs.

### Deployment

Just like the R version, Python Shiny apps can be deployed on various platforms. Popular choices include Heroku for cloud hosting and Docker for containerized deployment.

Here is a `app.py`, and you can run it with `shiny run app.py --reload`: 

```python

from shiny import ui, App
from shinywidgets import output_widget, render_widget
import plotly.express as px
import plotly.graph_objs as go

df = px.data.tips()

app_ui = ui.page_fluid(
    ui.div(
        ui.input_select(
            "x", label="Variable",
            choices=["total_bill", "tip", "size"]
        ),
        ui.input_select(
            "color", label="Color",
            choices=["smoker", "sex", "day", "time"]
        ),
        class_="d-flex gap-3"
    ),
    output_widget("my_widget")
)

def server(input, output, session):
    @output
    @render_widget
    def my_widget():
        fig = px.histogram(
            df, x=input.x(), color=input.color(),
            marginal="rug"
        )
        fig.layout.height = 275
        return fig

app = App(app_ui, server)

```

## Approaches in Using Shiny

- **Jupyter Notebooks**: For those familiar with Jupyter, it's a valuable tool for data exploration and visualization. Shiny apps can be integrated into Jupyter, combining the strengths of both.
  
- **Python and R Dashboards**: Beyond Shiny, there are other dashboarding tools available for both Python (like Streamlit) and R. However, Shiny's reactivity and flexibility make it a standout choice for many.
  
- **Web Frameworks**: For those wanting to go beyond, integrating Shiny apps within larger web frameworks like Flask or Django offers a pathway to building comprehensive web solutions.


## R Deployment: with shinyapps.io (DEV Environment)

Deploying your Shiny applications online makes them accessible to a broader audience. One of the most popular platforms to deploy Shiny apps is `shinyapps.io` provided by RStudio. However, it's crucial to understand the difference between a development environment and a production environment. 

### What is shinyapps.io?

`shinyapps.io` is a platform provided by RStudio that allows you to deploy Shiny web apps to the cloud. It's an easy way for those unfamiliar with web servers to share their Shiny apps with others. With just a few commands, you can have your app up and running on the web.

### Deploying to a Dev Environment

1. **Set Up**: Before deploying, you need to have the `rsconnect` package installed. Install it with:

   ```R
   install.packages("rsconnect")
   library(rsconnect)
   ```

2. **Authentication**: Connect to `shinyapps.io` with your credentials:

   ```R
   rsconnect::setAccountInfo(name="your_username", token="your_token", secret="your_secret")
   ```

3. **Deploy**: Deploying your app is as simple as:

   ```R
   rsconnect::deployApp("path_to_your_app_directory")
   ```

Your Shiny app should now be live on a unique URL on `shinyapps.io`.

---

## Python Deployment: with shinyapps.io (DEV Environment)

Deploying Python-based Shiny applications can be accomplished using `rsconnect-python`. Here are the steps to prepare, develop, and deploy your application on `shinyapps.io`.

### Pre-requisites
- A Python development environment (e.g., VS Code).
- `rsconnect-python` package installed.

To install `rsconnect-python` in your local Python environment, execute:

```bash
pip install rsconnect-python
```

For the bleeding-edge version, you can install directly from GitHub:

```bash
pip install git+https://github.com/rstudio/rsconnect-python.git
```

### Creating a shinyapps.io account
1. Navigate to [shinyapps.io](https://www.shinyapps.io/).
2. Click “Log In”. You have options to sign in with a Google account, GitHub account, or create a traditional username/password account.
3. Upon your first login, `shinyapps.io` will prompt an account setup. Note: The account name will be the domain name for all of your apps. There are specific naming conventions; refer to [RFC 952](https://tools.ietf.org/html/rfc952) for details.
4. Open your terminal and configure `rsconnect-python` to recognize your `shinyapps.io` account:

```bash
rsconnect add --account <ACCOUNT> --name <NAME> --token <TOKEN> --secret <SECRET>
```

For more details on developing Shiny applications with Python, refer to [Shiny Posit](https://shiny.posit.co/py/).

After crafting your application, deploy it to `shinyapps.io` using:

```bash
rsconnect deploy shiny /path/to/app --name <NAME> --title my-app
```

### Managing Python versions
Currently, `shinyapps.io` supports only Python 3.7.13, 3.8.13, and 3.9.13. If you deploy an application using a different Python version, `shinyapps.io` will try to run it on the nearest compatible version. If you encounter issues, consider switching to one of the supported Python versions.

### Limitations:
**Important**: One significant limitation to note with this deployment approach is the potential unavailability of certain Python packages on the `shinyapps.io` server. Currently, `shinyapps.io` does not process a `requirements.txt` file. If a required package is missing, you'll need to send a request manually to their support team via email to have it added.

---

## Important Deployment Considerations

- **Development vs. Production**: `shinyapps.io` is excellent for sharing apps in a development or testing phase. However, for apps going into production, especially those that will see heavy traffic or deal with sensitive data, consider more robust hosting solutions or RStudio Connect.

- **Data Sensitivity**: Do not use development environments like `shinyapps.io` for applications that deal with sensitive, confidential, or healthcare data. There are strict regulations governing the use of such data, and a development environment is not equipped to handle the stringent security and privacy requirements.

- **Custom Domains and Authentication**: For those who need custom domains, authentication, or other advanced features, RStudio offers RStudio Connect, a professional product for hosting Shiny apps, R Markdown reports, and more.

Remember, while `shinyapps.io` makes deployment straightforward, it's crucial to use it responsibly and understand its limitations. Ensure your apps are in line with best practices for data security and user privacy.

---

Shiny bridges the gap between data analysis and web application. Whether you're in the R or Python camp (or both!), mastering Shiny can elevate your data presentations, making your insights more accessible and interactive for your audience.








