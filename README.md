# Book: Health Informatics & Data Science

This book is built with [Docusaurus](https://v2.docusaurus.io)

## Getting started on new computer
- `pnpm run build` to build the book
- `pnpm run start` OR `pnpm run serve` to start the book locally

## Parts that need to be updated:

- [x] 1.10: Additional JSON examples of loading json data where the data (raw) is nested with a key:value pair and not at the top level 
- [ ] 2.1: More examples for extracting rows based on rules 
- [ ] 2.1: Give example output for z-score removal of outliers 
- [ ] 2.2: Add in time check example for POLARS versus PANDAS 


## Want to deploy/create your own?

Deploy your own Docusaurus documentation or ebook (based on markdown) project with Vercel now.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/docusaurus-2&template=docusaurus-2)

_My Live Example: https://book.datascience.appliedhealthinformatics.com/_

## Setting up Local Doc Search:
- General instructions: https://github.com/easyops-cn/docusaurus-search-local 
- Need to go into the config file an do as such:
```
  // Add the themes section with the search plugin
  themes: [
    // ... Your other themes.
    [
      "@easyops-cn/docusaurus-search-local",
      ({
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // language: ["en", "zh"],
      }),
    ],
  ],
```
