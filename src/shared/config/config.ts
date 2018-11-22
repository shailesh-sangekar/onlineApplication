export class Config {

    public static getLogoURL(): string {
        // const LogoURL = 'http://iw-sp2016:8007/';
        const LogoURL = 'http://gov-stg-app1:8007/';
        // const LogoURL = 'http://espld205:2233';
        return LogoURL;
    }
    public static GetURL(apiURL: string): string {
        /**UAT */
        // const baseURL = 'http://iw-sp2016:5555/';
        const baseURL = 'http://gov-stg-app1:5555/';
        // const baseURL = 'https://espl202:44301';
        // let baseURL = 'http://espl202:5555';
        return baseURL + apiURL;
    }
    public static GetRoot(): string {
        // const rootURL = 'http://iw-sp2016:8007/';
        const rootURL = 'http://gov-stg-app1:8007/';
        // const rootURL = 'http://espld205:2233';
        /**Prod */
        // const rootURL = '';
        return rootURL;
    }
}
