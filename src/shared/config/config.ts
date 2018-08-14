export class Config {

    public static getRootURL(): string {
        const LogoURL = 'http://espld205:2233';
        return LogoURL;
    }
    public static GetURL(apiURL: string): string {
        /**UAT */
        // const baseURL = 'https://espld202:44310/';
        const baseURL = 'https://localhost:44300/';
        /**Prod */
        // let baseURL = 'http://espld202:5556';
        return baseURL + apiURL;
    }
    public static GetMemberURL(apiURL: string): string {
        /**UAT */
        const baseURL = 'https://espld202:5006/';
        /**Prod */
        // let baseURL = 'http://espld202:5556';
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
