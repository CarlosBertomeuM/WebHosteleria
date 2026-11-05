import API_URL from './api.js';

export default class Model {
    constructor(table) {
        this.urlAPI = `${API_URL}/${table}`;
    }

    async getAll() {
        const response = await fetch(this.urlAPI);
        return response.json();
    }

    async getById(id) {
        const response = await fetch(`${this.urlAPI}/${id}`);
        return response.json();
    }

    async insert(item) {
        const response = await fetch(this.urlAPI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return response.json();
    }

    async update(id, item) {
        console.log("Anem a actualitzar...")
        const response = await fetch(`${this.urlAPI}/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
            
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return response.json();
    }

    async delete(id) {
        const response = await fetch(`${this.urlAPI}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return true;
    }
}