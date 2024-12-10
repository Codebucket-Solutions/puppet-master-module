# Puppet Master
JS Module to access Puppet Master Server For PDF Generation

## Puppet Master Server
https://github.com/Codebucket-Solutions/puppet-master


## Install

```
npm install @codebucket/puppet-master
```

## Usage
```
const {PuppetMaster}  = require("@codebucket/puppet-master");

const puppetMaster = new PuppetMaster(
      {
        baseUrl: process.env.PUPPETMASTER_BASEURL,
        apiKey: process.env.PUPPETMASTER_APIKEY,
      }
);

await puppetMaster.pdf({
      content: allPages, //HTML STRING
      launchOptions: {   //Browser Launch Options
        args: ["--no-sandbox"],
      },
      pageOptions: { waitUntil: "networkidle0" }, // Page Options
      pdfOptions: { // PDF OPTIONS
        format: "A4",
        printBackground: true,
      },
      pdfPath: "path to your pdf",
});

```
