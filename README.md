# Puppet Master

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
      pageOptions: { waitUntil: "networ kidle0" }, // Page Options
      pdfOptions: { // PDF OPTIONS
        format: "A4",
        printBackground: true,
      },
      pdfPath: "path to your pdf",
});

```
