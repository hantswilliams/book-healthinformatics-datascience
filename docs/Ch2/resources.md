---
sidebar_position: 6
---

# Resources for Further Exploration

## Reading and Tutorials

- Dive deeper with [Pandas](https://pandas.pydata.org/)
- Understand [Polars](https://github.com/pola-rs/polars) for large datasets
- Scale your operations with [Dask](https://dask.org/) and [Modin](https://modin.readthedocs.io/en/latest/)
- Familiarize yourself with health data standards: [HL7](https://www.hl7.org/implement/standards/), [FHIR](https://www.hl7.org/fhir/), and [DICOM](https://www.dicomstandard.org/)
- Polars vs Dask - [Fighting on Parallel Computing](https://levelup.gitconnected.com/polars-vs-dask-fighting-on-parallel-computing-f2a17a100274)
- Padnas is not enough? [A Comprehensive Guide to Alternative Data Wrangling Solutions](https://towardsdatascience.com/pandas-is-not-enough-a-comprehensive-guide-to-alternative-data-wrangling-solutions-a4730ba8d0e4)


## Configuring Dask Cluster on Azure or GCP

1. Create a cloud account on either Azure or GCP 

2. Create Virtual Machines (Instances):

    - Log in to your cloud account console.
    - Navigate to the VM/Instance creation section:
    - Azure: Click on "Create a resource" and search for "Virtual machine."
    - GCP: Click on "VM instances" under the "Compute Engine" section.
    - Create multiple instances with appropriate resources (RAM, CPU), ensuring they are part of the same Virtual Network or Network.
3. Install Dask on Each Instance:
    - SSH into each instance:

    ```bash
    ssh username@instance_ip_address
    ```
    - Install Dask and any other necessary packages using your package manager:
    ```bash
    pip install dask
    ```
4. Start Dask Scheduler:
    - Choose one instance to be the Dask scheduler.
    - SSH into that instance and start the Dask scheduler using the following command:
    ```bash
    dask-scheduler
    ```

5. Start Dask Workers on Other Instances:
    - SSH into each of the other instances.
    - Start Dask workers using the following command, providing the scheduler's address (replace <scheduler_ip> with the actual scheduler's IP or hostname):
    ```bash
    dask-worker <scheduler_ip>:8786
    ```
6. Configure Dask Client in Python:
    - In your Python script, configure the Dask client to connect to the scheduler's address:
    ```python
    from dask.distributed import Client
    client = Client('<scheduler_ip>:8786')
    ```

Now, you have a Dask cluster set up on either Azure or GCP using virtual machines. You can use the configured Dask client to submit and manage distributed tasks across the cluster. Remember that setting up and managing a Dask cluster involves more configuration details, such as security settings, VM sizes, networking, and more. Both Azure and GCP provide documentation and tutorials on setting up VMs and clusters, which you should refer to for more specific instructions.


# Ray Configuration for the Cloud 

## Configuring Ray Cluster on Azure or GCP

1. Create Virtual Machines: Create virtual machines (VMs) on Azure or Compute Engine Instances if using GCP, that will serve as nodes in your Ray cluster. You can use Azure's Virtual Machines service for this.

2. **Install Ray** : SSH into each VM and install Ray using pip:

```bash
pip install ray
```

3. **Start Ray Head Node**: Choose one VM to be the head node. Start the Ray head node on that VM:
```bash
ray start --head
```

4. **Connect Workers**: On each of the other VMs, start Ray workers and connect them to the head node:
```bash
ray start --address=<IP address of head node>:6379
```

5. **Submit Jobs**: You can now submit parallel tasks to the Ray cluster, and they will be executed across the connected VMs.

For both Azure and GCP, you need to configure security groups or firewall rules to allow communication between the nodes. Ensure that the VMs/instances can communicate over the specified port (default is 6379) used by Ray.

Additionally, make sure to configure proper authentication and access control mechanisms to secure your cluster.

Ray provides a dashboard that allows you to monitor the performance of your cluster and tasks. You can access the dashboard by opening a web browser and navigating to the address specified when you start the Ray head node (e.g., `http://<head_node_ip>:8265`).

Remember that these are general steps, and the actual setup may vary based on the cloud provider's interface and features. Always refer to the official documentation of the cloud provider and Ray for detailed and up-to-date instructions.

Setting up a Ray cluster on Azure or GCP involves creating virtual machines/instances, installing Ray, connecting workers to the head node, and submitting tasks. Configuring security, authentication, and access control is crucial to ensure the cluster's security. Monitoring the cluster's performance through the Ray dashboard provides insights into task execution and resource usage.