export class Config {

    public static getLogoURL(): string {
        const LogoURL = 'https://espld205:1234';
        return LogoURL;
    }
    public static GetURL(apiURL: string): string {
        /**UAT */
        const baseURL = 'https://espl202:44301';
        /**Prod */
        // let baseURL = 'http://espl202:5555';
        return baseURL + apiURL;
    }
}
