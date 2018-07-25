export class RestOptions {
    /**
     * To get filter data from list
     * Ex. Status eq 'Approved'
     */
    public filter: string;
    /**
     * Add columns name to select response from SP
     * Ex. '*,Column1/Id,Column1/UNCode,Title'
     */
    public select: string;
    /**
     * Get result in sorted order specify order
     * Ex. Asc || Desc
     */
    public orderby: string;
    /**
     * In case of lookup and User field need to get data of other field
     * in that case user expand
     */
    public expand: string;
    /**
     * To get top records of resulted response
     * Ex. top=10 || top=25 etc
     */
    public top: string;
    /**
     * To skip no of records from top of resulted response
     */
    public skip: string;
}
