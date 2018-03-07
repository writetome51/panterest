import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {Observer} from '../interfaces/Observer';

@Injectable()
export abstract class FirestoreDataService {

    private _dbCollection: AngularFirestoreCollection<object>;
    collectionName: string;
    private _db: AngularFirestoreDocument<object>;
    documentName: string;
    subscription: Subscription;


    constructor(private _firestore: AngularFirestore) {
    }


    setup(collectionName, documentName, defaultContent: object) {
        this.collectionName = collectionName;
        this.documentName = documentName;
        this._set_db(defaultContent);
    }


    update(newData: object) {
        this._db.update(newData);
    }


    getProperty(propertyName, observer: Observer): Subscription {
        return this._valueChanges((document) => {
            if (document[propertyName]) {
                observer(document[propertyName]);
            }
        });
    }


    getEntire(observer: Observer): Subscription {
        return this._valueChanges((document) => {
            observer(document);
        });
    }


    private _valueChanges(observer): Subscription {
        if (this._db) {
            return this._db.valueChanges().subscribe((document) => {
                if (document) {
                    observer(document);
                }
            });
        }
    }


    private _set_db(defaultContent: object) {
        this._dbCollection = this._firestore.collection(this.collectionName);

        if (this._dbCollection) {
            this._db = this._dbCollection.doc(this.documentName);

            this.subscription = this._db.valueChanges().subscribe((response) => {
                if (!response) { // Then _db doesn't exist...
                    this._createDefaultDB(defaultContent);
                }
            });
        }
    }


    private _createDefaultDB(content) {
        this._dbCollection.doc(this.documentName).set(content);
    }


}
