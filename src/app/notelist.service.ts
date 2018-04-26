import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { NoteList } from './notelist';
import { NoteItem } from './noteitem';

@Injectable()
export class NoteListService {

    private noteListsUrl = 'http://localhost:8080/lists';

    private jsonHeader = 'application/json;charset=UTF-8';
    private plainTextHeader = 'text/plain';

    constructor(private http: HttpClient) { }

    getNoteLists(): Observable<NoteList[]> {
        return this.http.get<NoteList[]>(this.noteListsUrl)
            .pipe(
                catchError(this.handleError('getNoteLists', []))
            );
    }

    updateItem(listid: number, noteItem: NoteItem): void {
        if (noteItem.id) {
            this.putItem(listid, noteItem);
        } else {
            this.postItem(listid, noteItem);
        }
    }

    private postItem(listid: number, noteItem: NoteItem): void {
        const url: string = this.noteListsUrl + '/' + listid + '/items';
        const body: string = JSON.stringify(noteItem);
        const options = {
            headers: new HttpHeaders({
            'content-type': this.jsonHeader
            })};

        // this.http.post(url, body, options).forEach(id => noteItem.id = <number> id);
        this.http.post(url, body, options).subscribe(id => noteItem.id = <number> id);
    }

    private putItem(listid: number, noteItem: NoteItem): void {
        const url: string = this.noteListsUrl + '/' + listid + '/items/' + noteItem.id;
        const body: string = JSON.stringify(noteItem);
        const options = {
            headers: new HttpHeaders({
            'content-type': this.jsonHeader
            })};

        this.http.put(url, body, options).forEach(x => x);
    }

    deleteItem(listid: number, noteItem: NoteItem): void {
        const url: string = this.noteListsUrl + '/' + listid + '/items/' + noteItem.id;

        this.http.delete(url).forEach(x => x);
    }

    updateList(noteList: NoteList): void {
        if (noteList.id) {
            this.putList(noteList);
        } else {
            this.postList(noteList);
        }
    }

    private putList(noteList: NoteList): void {
        const url: string = this.noteListsUrl + '/' + noteList.id;
        this.http.put(url, noteList.name, { responseType: 'text' }).forEach(x => x);
    }

    private postList(noteList: NoteList): void {
        const url: string = this.noteListsUrl;
        const body: string = JSON.stringify(noteList);
        const options = {
            headers: new HttpHeaders({
            'content-type': this.jsonHeader
            })};

        this.http.post(url, body, options).subscribe(id => noteList.id = <number> id);
    }

    deleteList(noteList: NoteList): void {
        const url: string = this.noteListsUrl + '/' + noteList.id;
        this.http.delete(url).forEach(x => x);
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
