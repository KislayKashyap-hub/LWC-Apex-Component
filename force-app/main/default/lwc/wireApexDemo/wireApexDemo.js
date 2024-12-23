import { LightningElement, api, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { getRecord } from 'lightning/uiRecordApi';

export default class WireApexDemo extends LightningElement {
    @api recordId;
    contacts;
    error;

    // Fetch Account Name
    @wire(getRecord, { recordId: '$recordId', fields: ['Account.Name'] }) 
    record;

    // Fetch Related Contacts
    @wire(getContacts, { accId: '$recordId' }) 
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    get name() {
        return this.record?.data?.fields?.Name?.value;
    }
}