export default class Controllers {
    constructor(service) {
        this.service = service;
    }

    async getAll(req,res,next) {
        try {
            const items = await this.service.getAll();
            res.status(200).json({items})
        } catch (error) {
            next(error.message);
        }
    }

    async getById(req,res,next) {
        try {
            
            const {idCart} = req.params;
            const item = await this.service.getById(idCart);
    
            if(!item) res.status(404).json({msg:'Service Item not found'})
            else res.status(200).json({item})
        } catch (error) {
            next(error.message);
        }
    }

    async create(req,res,next) {
        try {
            const newItem = await this.service.create(req.body);
            if (!newItem) res.status(404).json({msg:'Service Item create error'})
            else res.status(200).json({newItem})
        } catch (error) {
            next(error.message);
        }
    }

    async update(req,res,next) {
        try {
            const {idCart} = req.params;
            const item = await this.service.getById(idCart);
            if (!item) res.status(404).json({msg:'Service Item update not found'})
            else {
                const itemUpdate = await this.service.update(id, req.body);
                res.status(200).json({itemUpdate})
            }
        } catch (error) {
            next(error.message);
        }
    }

    async delete(req,res,next) {
        try {
            const {id} = req.params;
            const item = await this.service.getById(id);
            if (!item) res.status(404).json({msg:'Service Item delete not found'})
            else {
                const itemDel = await this.service.delete(id);
                res.status(200).json({itemDel})
            }
            
        } catch (error) {
            next(error.message);
        }
    }
}