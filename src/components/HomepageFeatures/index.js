import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Data-Driven Decisions',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        The modern healthcare system relies heavily on data. Our course dives deep into the techniques and tools you need to transform raw health data into actionable insights.
      </>
    ),
  },
  {
    title: 'Empower with Technology',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Learn how technologies, including machine learning and NLP, can revolutionize healthcare systems. Enhance diagnostics, predict outcomes, and personalize patient care.
      </>
    ),
  },
  {
    title: 'Practical and Hands-on',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Every chapter in our guide comes with hands-on assignments and real-world examples. Gain practical experience while learning.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
