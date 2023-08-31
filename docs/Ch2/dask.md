---
sidebar_position: 3
---

# 2.3 Dask, Ray, and Modin in Health Informatics

As previously discussed, POLARS is the next step up in the chain for dealing with big data, but still all on your own location machine.

Once you have a dataset that potentially exceeds the size of your own machine, its now time to look at other solutions that can handle distributed computing. 

For those gargantuan health datasets, Dask, Ray, and Modin come to the rescue:
- **Scaling Pandas**: These libraries enhance Pandas' capabilities, allowing it to handle large-scale health data smoothly.
- **Parallel Processing**: Accelerate computations, be it for genomic sequences or analyzing vast patient cohorts.
- **Use Cases**: Discover when and why to pivot to Dask or Modin from traditional Pandas operations.

[Dask](https://github.com/dask/dask), [Ray](https://github.com/ray-project/ray) and [Modin](https://github.com/modin-project/modin) are libraries that can be used to parallelize and distribute data processing tasks. This makes them well-suited for working with large datasets.

Lets first start with the two that are dataframe specific, Dask and Modin: 

**Dask** is a low-level scheduler and a high-level partial Pandas replacement, geared toward running code on compute clusters.

**Ray** is also a low-level framework for parallelizing Python code across processors or clusters.

**Modin** is a newer library that is designed to be a user-friendly, drop-in replacement for Pandas, that is powered by either Dask or Ray underneath the hood. You can think of Modin as a layer that sits on top of either of these pieces of software, to attempt to simplify how we work with Dask or Ray. 
  - For production environments with big data, I have landed on Modin with Ray as a backend. By installing these, I see significant benefit by changing just a single line (`import pandas as pd` to `import modin.pandas as pd`); and unlike the other tools, Modin aims to reach full compatibility with Pandas.

In addition to these tools, there exist `spark` or `pyspark`, and other tools like `celery` or `airflow` to taking care of long running (or short running) computation tasks or batch jobs. 

---

## Dask 

A Dask DataFrame is a large parallel DataFrame composed of many smaller pandas DataFrames, split along the index. 

These pandas DataFrames may live on disk for larger-than-memory computing on a single machine, or on many different machines in a cluster. One Dask DataFrame operation triggers many operations on the constituent pandas DataFrames.

### Common Uses 

Dask DataFrame is used in situations where pandas is commonly needed, usually when pandas fails due to data size or computation speed:

- Manipulating large datasets, even when those datasets don’t fit in memory
- Accelerating long computations by using many cores
- Distributed computing on large datasets with standard pandas operations like groupby, join, and time series computations

### When to NOT use Dask:

- If your dataset fits comfortably into RAM on your laptop, then you may be better off just using pandas. There may be simpler ways to improve performance than through parallelism
- If your dataset doesn’t fit neatly into the pandas tabular model, then you might find more use in dask.bag or dask.array
- If you need functions that are not implemented in Dask DataFrame, then you might want to look at dask.delayed which offers more flexibility
- If you need a proper database with all that databases offer you might prefer something like Postgres



### Design
Dask DataFrames coordinate many pandas DataFrames/Series arranged along the index. A Dask DataFrame is partitioned row-wise, grouping rows by index value for efficiency. These pandas objects may live on disk or on other machines.

![Data Frame with Dask vs Pandas](../../static/img/ch2/dask-dataframe.svg)

### Installation and Operations

Just like pandas, it is as simple as a `pip install ...` command. You can use pip to install everything required for most common uses of Dask, which also install dependencies, like NumPy and pandas, that are necessary for different workloads. This is often the right choice for Dask users:

```bash
pip install "dask[complete]"  
```

#### Dask DF versus Pandas DF 

In dask, like pandas and polars, there are a couple of different object (collection) types that we have access to. 

**Dataframes** (dask Dataframes) exist just like in polars and pandas which represent 2-dimensional data stuctures, and are called the same thing. But in addition, we also have dask **Arrays** and **Bags**. 

- [Arrays](https://docs.dask.org/en/stable/array.html) are 1-dimensional data objects that contain data of all the same type (e.g., all numbers, all characters) and are typically used within machine learning models. 

- [Bags](https://docs.dask.org/en/stable/bag.html) are not per-say a mechanisms of storing data, but represent a collection (e.g., bag) of generic python operations that we execute with: `groupby`, `map`, or `filter` to modify/change a dataframe or array. 

##### With Dask: `.compute()`

Because the dask.DataFrame application programming interface (API) is a subset of the pd.DataFrame API, it should be familiar to pandas users. There are some slight alterations due to the parallel nature of Dask. 

The primary difference, is with all Dask collections, you trigger computation by calling the `.compute() `method. Everything that you may run/execute - the lines above - will not actually be run by Dask until the `.compute()` is called. This is similar to what we will see in future packages, such as with sending commands to a sqlite database using **sqlite3** and their `.commit()` method to push changes to a db. 

```python
import dask.dataframe as dd
df = dd.read_csv('2014-*.csv')
df.head()

df2 = df[df.y == 'a'].x + 1
df2.compute()
```

Before we run `df2.compute()`, the compute in the line before is not executed. 

##### With Pandas
```python
import pandas as pd
df = pd.read_csv('2014-1.csv')
df.head()

df2 = df[df.y == 'a'].x + 1
df2
```

Versus in pandas, once we run execute `df2 = df[df.y == 'a'].x + 1`, the changes/calculation automatically happens.


## Modin

Very similar to dask, Modin sits on top of and works along side pandas and its dataframes. 

The mainters of the project describe it as a 'drop-in replacement' to pandas that allows for paralel processing across all of your computers cores instantly.

In pandas, you are only able to use one core at a time when you are doing computation of any kind. With Modin, you are able to use all of the CPU cores on your machine. Even in read_csv, we see large gains by efficiently distributing the work across your entire machine.


### Official Quickstart Guide

Please visit [their website](https://modin.readthedocs.io/en/latest/getting_started/quickstart.html) for their 10-minute tutorial if you are interested. 

### Installation 

Simple as:

```python
pip install "modin[all]"
```

And then instead of importing pandas as pd, you can replace it with the following, keeping the same abbreviation, but getting some of the speed increases that we may require with largest datasets:

```python
# import pandas as pd
import modin.pandas as pd
```

### Simple Exercises 

Modin does an excellent job with providing example code in jupyter notebook enviroments. I recommend that you visit their tutorial on running modin locally (it ties into and utilizes `dask` - it sits on top of task, abstracting parts of it away - trying to make it simpler). They have the following notebooks for introducing their code, and increases in speed:

- Exercise: [Getting started](https://github.com/modin-project/modin/blob/master/examples/tutorial/jupyter/execution/pandas_on_dask/local/exercise_1.ipynb)
- Exercise: [Speed Improvements](https://github.com/modin-project/modin/blob/master/examples/tutorial/jupyter/execution/pandas_on_dask/local/exercise_2.ipynb)


### Advanced Exercises 

In addition, modin provides working examples of how to use modin with ray. In their tutorial, they utilize the AWS cloud, and provide code for setting up a cluster of machines (8 in total; 1 commander and 7 workers) which will total 768 CPUs - this is alot! Keep in mind that your local computer, may have somewhere between 8 to 32 CPUs. 

- Exercise: [Setting up AWS cluster for Modin](https://github.com/modin-project/modin/blob/master/examples/tutorial/jupyter/execution/pandas_on_ray/cluster/exercise_5.ipynb)
  - I recommend that you do not perform this exercise, unless you are ok with spending a few dollars - 
- Exercise: [Executing commands on the AWS cluster](https://github.com/modin-project/modin/blob/master/examples/tutorial/jupyter/execution/pandas_on_ray/cluster/exercise_6.ipynb)



---

## Conclusions

### Dask vs Modin 

Dask (the higher-level Dataframe) acknowledges the limitations of the Pandas API, and while it partially emulates this for familiarity, it doesn’t aim for full Pandas compatibility. If you have complicated existing Pandas code, it’s unlikely that you can simply switch out Pandas for Dask.Dataframe and have everything work as expected. By contrast, this is exactly the goal Modin is working toward: 100% coverage of Pandas. Modin can run on top of Dask but was originally built to work with Ray, and that integration remains more mature.

[og link](https://www.datarevenue.com/en-blog/pandas-vs-dask-vs-vaex-vs-modin-vs-rapids-vs-ray)

### Dask vs Ray 

Dask (as a lower-level scheduler) and Ray overlap quite a bit in their goal of making it easier to execute Python code in parallel across clusters of machines. Dask focuses more on the data science world, providing higher-level APIs that in turn provide partial replacements for Pandas, NumPy, and scikit-learn, in addition to a low-level scheduling and cluster management framework. The creators of Dask and Ray discuss how the libraries compare in this GitHub thread, and they conclude that the scheduling strategy is one of the key differentiators. Dask uses a centralized scheduler to share work across multiple cores, while Ray uses distributed bottom-up scheduling.

[og link](https://www.datarevenue.com/en-blog/pandas-vs-dask-vs-vaex-vs-modin-vs-rapids-vs-ray)
