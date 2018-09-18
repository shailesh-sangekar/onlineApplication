export class Config {

    public static getRootURL(): string {
         // const LogoURL = 'https://ibltogether.sharepoint.com';
          const LogoURL = 'https://alphaportal.sharepoint.com/sites/ibl';
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
