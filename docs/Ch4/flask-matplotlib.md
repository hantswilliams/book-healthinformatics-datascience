---
sidebar_position: 8
---

# 4.8 Dashboards - Flask + Matplotlib

Flask is a micro web framework written in Python. It's minimalist and easy to get started with, making it a favorite among many developers when it comes to creating web applications. Matplotlib, on the other hand, is one of the most popular Python plotting libraries. Combining the two allows for the creation of dynamic web dashboards that display rich visualizations.

## Why Flask + Matplotlib? 

- **Flexibility:** Flask offers the flexibility to design your application's architecture, allowing for scalability and the addition of complex functionalities.
  
- **Integration:** Both Flask and Matplotlib are part of the Python ecosystem, ensuring seamless integration and data manipulation using libraries like Pandas and NumPy.
  
- **Customization:** While other tools offer out-of-the-box solutions, Flask provides the freedom to create a tailored dashboarding experience. This, combined with Matplotlib's plotting capabilities, can produce bespoke visualizations.

## Building a Basic Flask + Matplotlib App

Here's a simple illustration of how one might integrate Flask with Matplotlib:

```python
from flask import Flask, render_template, Response
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)

@app.route('/')
def index():
    img = io.BytesIO()

    plt.figure(figsize=(10,5))
    plt.plot([1,2,3,4,5], [1,4,9,16,25])
    plt.title("Sample Plot")
    plt.savefig(img, format='png')
    img.seek(0)

    plot_url = base64.b64encode(img.getvalue()).decode('utf8')
    
    return render_template('index.html', plot_url=plot_url)

if __name__ == '__main__':
    app.run(debug=True)
```

The refereced `index.html` which would be located in `./templates` folder might look like such: 

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flask + Matplotlib Dashboard</title>
    <!-- Optional: Add some CSS or link to external stylesheets here -->
</head>
<body>

    <div style="text-align:center; margin-top:50px;">
        <h2>Sample Plot</h2>
        <!-- Display the Matplotlib image using the encoded Base64 data -->
        <img src="data:image/png;base64,{{ plot_url }}" alt="Sample Plot">
    </div>

    <!-- Optional: Add some JavaScript or link to external scripts here -->

</body>
</html>

```

This index.html template uses Flask's Jinja templating system. The `{{ plot_url }}` placeholder in the img tag's src attribute gets replaced with the Base64-encoded image data passed from the Flask route. The result is a rendered Matplotlib plot within a web page.

In this example, a Matplotlib plot is created, saved to an in-memory binary stream, and then encoded to Base64. This encoded data can be embedded directly in an HTML template to display the plot.

## Considerations

- **Performance:** Heavy visualizations or constant reloading can make the application slower. It's essential to optimize both the Flask backend and the Matplotlib visualizations for production scenarios.
  
- **Styling:** To enhance the look and feel, integrating CSS frameworks like Bootstrap with Flask might be necessary.
  
- **Interactivity:** Matplotlib, by nature, is static. If you want interactive plots, consider integrating other libraries like Plotly or using JavaScript-based solutions.

---

Using Flask in tandem with Matplotlib offers a robust method for creating custom web dashboards. While there might be a steeper learning curve compared to some out-of-the-box solutions, the flexibility and customization capabilities can be invaluable, especially for unique project requirements.

