import Controllers from "./class.controllers.js"
import TicketService from "../services/ticket.services.js"

const ticketService = new TicketService();

export default class TicketController extends Controllers {
    constructor() {
        super(ticketService);
    }

    async generateTicket (req,res,next) {
        try {
            const { _id} = req.user;
            const ticket = await ticketService.generateTicket(_id);
            if (!ticket) res.status(404).json({msg:'Ticket user not found'});
            res.status(200).json(ticket)
        } catch (error) {
            console.log(error);
        }
    }

}