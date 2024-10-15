import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import util from "util";
import stream from "stream";
import fs from "fs";

const pipeline = util.promisify(stream.pipeline);


type opts = {
    baseUrl: string;
    apiKey: string;
}

type puppeteerOpts = {
    launchOptions ?: any;
    pageOptions ?: any;
    pdfOptions ?: any;
    otherPageFunctions ?: any;
    pdfPath : string;
    content: string;
}

export class PuppetMaster {
    private readonly axios: Axios;

    constructor(opts: opts) {
        this.axios = axios.create({
            baseURL: opts.baseUrl,
            headers: {
                "x-api-key": opts.apiKey
            }
        });
    }

    async pdf(opts: puppeteerOpts) {
        try {
            const request =  await this.axios.post("/pdf", {task:opts}, {
                    responseType: "stream"
            });
            await pipeline(request.data, fs.createWriteStream(opts.pdfPath));
        } catch (err) {
            if (err instanceof AxiosError) {
                err.response?.data.setEncoding('utf8')

                function streamToString (stream:any): Promise<string> {
                    const chunks: any[] = [];
                    return new Promise((resolve, reject) => {
                        stream.on('data', (chunk:any) => chunks.push(Buffer.from(chunk)));
                        stream.on('error', (err:any) => reject(err));
                        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
                    })
                }

                const streamString = await streamToString(err.response?.data);

                let data = JSON.parse(streamString);

                console.log(data);
                throw new Error(data.message);
            }
            throw err;
        }
    }
}