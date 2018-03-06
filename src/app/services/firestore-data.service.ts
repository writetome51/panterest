import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {GoogleAuthService} from './google-auth.service';
import {Subscription} from 'rxjs/Subscription';
import {UserStore} from '../interfaces/UserStore';
import {Observer} from '../interfaces/Observer';

@Injectable()
export class FirestoreDataService {

    dbCollection: AngularFirestoreCollection<object>;
    db: AngularFirestoreDocument<object>;
    collectionName: string;
    documentName: string;


    constructor(private firestore: AngularFirestore) {
    }


    setup(collectionName, documentName, defaultContent: object) {
        this.collectionName = collectionName;
        this.documentName = documentName;
        this._set_db(defaultContent);
    }


    update(newData: object) {
        this.db.update(newData);
    }


    getProperty(propertyName, observer: Observer): Subscription {
        return this.db.valueChanges().subscribe((document) => {
            if (document[propertyName]){
                observer(document[propertyName]);
            }
        });
    }


    getEntire(observer: Observer): Subscription{
        return this.db.valueChanges().subscribe((document) => {
            if (document){
                observer(document);
            }
        });
    }


    private _set_db(defaultContent: object) {
        this.dbCollection = this.firestore.collection(this.collectionName);

        if (this.dbCollection) {
            this.db = this.dbCollection.doc(this.documentName);

            this.db.valueChanges().subscribe((response) => {
                if ( ! response) { // Then db doesn't exist...
                    this._createDefaultDB(defaultContent);
                }
            });
        }
    }


    private _createDefaultDB(content) {
        this.dbCollection.doc(this.documentName).set(content);
    }


}
