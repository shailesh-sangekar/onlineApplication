export class Config {

    public static getRootURL(): string {
        /**PROD*/
        // const LogoURL = 'http://iw-sp2016:8007';
        const LogoURL = 'http://espld205:2233';
        return LogoURL;
    }
    public static GetURL(apiURL: string): string {
        /**PROD */
        // const baseURL = 'http://iw-sp2016:5555/';
        /**UAT */
        const baseURL = 'https://espld202:44310/';
        /**DEV */
        // const baseURL = 'https://localhost:44310/';
        return baseURL + apiURL;
    }
    public static GetMemberURL(apiURL: string): string {
        /**Membership PROD */
        // const baseURL = 'http://iw-sp2016:5556/';
        /**UAT */
        const baseURL = 'https://espld202:5006/';
        return baseURL + apiURL;
    }
    public static GetCaptchaKey(): string {
        /**Dev */
        const _captchaKey = '6LdZhmgUAAAAAJQRaQslsDukOQROpgYfFW-d7HVA';
        /**UAT */
        // const _captchaKey = '6Lfa8GgUAAAAAKdd6tU42DK4ujPPFmVCDfUxnAGa';
        return _captchaKey;
    }
}
