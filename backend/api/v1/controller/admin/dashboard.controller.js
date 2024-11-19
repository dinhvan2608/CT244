const Account = require("../../../../models/account.model");
const User = require("../../../../models/user.model");
const Book = require("../../../../models/book.model");
const Publisher = require("../../../../models/publisher.model");
const Order = require("../../../../models/order.model");

module.exports.information = async (req, res) => {
  try {
    const information = {
      book: {
        quantity: "",
        active: "",
        inactive: "",
        order: "",
      },
      publisher: {
        quantity: "",
        active: "",
        inactive: "",
      },
      admin: {
        quantity: "",
        active: "",
        inactive: "",
      },
      client: {
        quantity: "",
        active: "",
        inactive: "",
      },
    };
    let totalOrder = 0;

    const orders = await Order.find({
      deleted: false,
    });

    for (const order of orders) {
      totalOrder += order.quantity;
    }
    information.book.quantity = await Book.countDocuments({ deleted: false });
    information.book.active = await Book.countDocuments({
      deleted: false,
      status: "active",
    });
    information.book.inactive = await Book.countDocuments({
      deleted: false,
      status: "inactive",
    });
    information.book.order = totalOrder;

    information.publisher.quantity = await Publisher.countDocuments({
      deleted: false,
    });
    information.publisher.active = await Publisher.countDocuments({
      deleted: false,
      status: "active",
    });
    information.publisher.inactive = await Publisher.countDocuments({
      deleted: false,
      status: "inactive",
    });

    information.admin.quantity = await Account.countDocuments({
      deleted: false,
    });
    information.admin.active = await Account.countDocuments({
      deleted: false,
      status: "active",
    });
    information.admin.inactive = await Account.countDocuments({
      deleted: false,
      status: "inactive",
    });

    information.client.quantity = await User.countDocuments({ deleted: false });
    information.client.active = await User.countDocuments({
      deleted: false,
      status: "active",
    });
    information.client.inactive = await User.countDocuments({
      deleted: false,
      status: "inactive",
    });

    res.json({
      success: true,
      information: information,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy thông tin chung",
    });
  }
};
