type opts = {
    baseUrl: string;
    apiKey: string;
};
type puppeteerOpts = {
    launchOptions?: any;
    pageOptions?: any;
    pdfOptions?: any;
    otherPageFunctions?: any;
    pdfPath: string;
    content: string;
};
export declare class PuppetMaster {
    private readonly axios;
    constructor(opts: opts);
    pdf(opts: puppeteerOpts): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map