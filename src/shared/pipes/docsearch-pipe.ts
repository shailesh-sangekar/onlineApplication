import { Pipe, PipeTransform } from '@angular/core';

export class DocModel {
    public category: any;
    public list = new ListClass();
}
export class ListClass {
    public Title: any;
    public category: any;
}

@Pipe({ name: 'DocSearchPipe' })
export class DocumentSearchPipe implements PipeTransform {
    transform(value: any[], stringToSearh: string): any[] {
        return stringToSearh ? value.filter(doc =>
            (
                doc.category.search(new RegExp(stringToSearh, 'i')) !== -1 ||
                doc.Title.search(new RegExp(stringToSearh, 'i')) !== -1
            )
        ) : value;
    }
}

