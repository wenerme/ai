---
title: "What is profiling? | Grafana Plugins documentation"
description: "Discover the types of profiling and how to apply each profiling method."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# What is profiling?

Profiling is a technique used in software development to measure and analyze the runtime behavior of a program. By profiling a program, developers can identify which parts of the program consume the most resources, such as CPU time, memory, or I/O operations. You can use this information to optimize the program, making it run faster or use fewer resources.

Pyroscope can be used for both traditional and continuous profiling.

## Traditional profiling (non-continuous)

Traditional profiling, often referred to as **sample-based** or **instrumentation-based** profiling, has its roots in the early days of computing. Back then, the primary challenge was understanding how a program utilized the limited computational resources available.

With sample-based profiling, the profiler interrupts the program at regular intervals, capturing the program’s state each time. By analyzing these snapshots, developers can deduce the frequency at which parts of the code execute.

With instrumentation-based profiling, developers insert additional code into the program that records information about its execution. This approach provides detailed insights but can alter the program’s behavior due to the added code overhead.

### Benefits

Traditional profiling provides:

- **Precision**: Offers a deep dive into specific sections of the code.
- **Control**: Developers can initiate profiling sessions at their discretion, allowing for targeted optimization efforts.
- **Detailed reports**: Provides granular data about program execution, making it easier to pinpoint bottlenecks.

## Continuous profiling

As software systems grew in complexity and scale, the limitations of traditional profiling became evident. Issues could arise in production that weren’t apparent during limited profiling sessions in the development or staging environments.

This led to the development of continuous profiling, a method where the profiling data is continuously collected in the background with minimal overhead. By doing so, developers gain a more comprehensive view of a program’s behavior over time, helping to identify sporadic or long-term performance issues.

### Benefits

Continuous profiling provides:

- **Consistent monitoring**: Unlike traditional methods that offer snapshots, continuous profiling maintains an uninterrupted view, exposing both immediate and long-term performance issues.
- **Proactive bottleneck detection**: By consistently capturing data, performance bottlenecks are identified and addressed before they escalate, reducing system downtime and ensuring smoother operations.
- **Broad performance landscape**: Provides insights across various platforms, from varied technology stacks to different operating systems, ensuring comprehensive coverage.
- **Bridging the Dev-Prod gap**: Continuous profiling excels in highlighting differences between development and production:

  - **Hardware discrepancies**: Unearths issues stemming from differences in machine specifications.
  - **Software inconsistencies**: Sheds light on variations in software components that might affect performance.
  - **Real-world workload challenges**: Highlights potential pitfalls when real user interactions and loads don’t align with development simulations.
- **Economical advantages**:

  - **Resource optimization**: Continual monitoring ensures resources aren’t wasted, leading to cost savings.
  - **Rapid problem resolution**: Faster troubleshooting means reduced time and monetary investment in issue rectification, letting developers channel their efforts into productive endeavors.
- **Non-intrusive operation**: Specifically designed to work quietly in the background, continuous profiling doesn’t compromise the performance of live environments.
- **Real-time response**: It equips teams with the ability to act instantly, addressing issues as they arise rather than post-occurrence, which is crucial for maintaining high system availability.

## Choose between traditional and continuous profiling

In many modern development workflows, both methods are useful.

Expand table

|               | **Traditional profiling**                                        | **Continuous profiling**                                                                                                 |
|---------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| When to use   | During development or testing phases                             | In production environments or during extended performance tests.                                                         |
| Advantages    | Offers detailed insights that can target specific parts of code. | Provides a continuous view of system performance, often with minimal overhead, making it suitable for live environments. |
| Disadvantages | Higher overhead provides only a snapshot in time.                | It might be less detailed than traditional profiling due to the need to minimize impact on the running system.           |
