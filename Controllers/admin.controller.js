const User = require("../Models/user.model");
const Product = require("../Models/product.model");
const Bill = require("../Models/bill.model");
const Course = require("../Models/course.model");
const Class = require("../Models/class.model");
module.exports = {
    //user management
    LoadAllUser: async (req, res, pageNum) => {
            res.render('./Admin/client-management', {
                layout: 'admin',
                page: 'Quản lý khách hàng',
                client: 'active',
                totalpages: result.totalPages,
                prev: result.prevPage,
                now: result.page,
                next: result.nextPage,
                list: result.docs,
                User: req.user,
            });
        }
};

