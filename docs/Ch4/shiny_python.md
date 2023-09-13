---
sidebar_position: 6
---

# 4.6 Interactive Health Data Dashboards using Shiny for Python


This is inside a `app.py`, and you can run it with `shiny run app.py --reload`: 

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