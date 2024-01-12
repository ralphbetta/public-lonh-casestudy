const { Invoice } = require("../model/database");
const ResponseMessage = require("../config/response");
const AppService = require("../config/service");

class InvoiceController {

  static async create(data) {
    try {
      
      const invoiceInstance  = await Invoice.create(data);

      return {error: false, data: invoiceInstance};

    } catch (error) {

      return {error: true, data: {error: error.message}};

    }
  }


  static async invoices(req, res) {

    const { id } = req.userData;

    try {

      const invoiceInstances = await Invoice.findAll({where: {bidder_id: id}});

      return res.status(200).json({
        error: false,
        message: "Succesfull",
        data: invoiceInstances,
      });
    } catch (error) {
      res.status(500).json({ error: "server error", extra: error.message });
    }
  }


}

module.exports = InvoiceController;
