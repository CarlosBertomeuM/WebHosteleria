import Model from './Model.js';

export default class MenuDiaService extends Model {
    constructor() {
        super('menu-dia');
    }

    // Método extra para borrar todos los menús
    async deleteAll() {
        const response = await fetch(`${this.urlAPI}/delete-all`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return true;
    }
}