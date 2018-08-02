export class Config {

    public static getLogoURL(): string {
        const LogoURL = 'https://espld205:1234';
        return LogoURL;
    }
    public static GetURL(apiURL: string): string {
        /**UAT */
        // const baseURL = 'https://espld202:44301';
        /**Prod */
        let baseURL = 'http://espld202:5556';
        return baseURL + apiURL;
    }
}
