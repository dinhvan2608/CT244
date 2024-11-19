const Order = require("../../../../models/order.model");
const User = require("../../../../models/user.model");
const Book = require("../../../../models/book.model");

module.exports.index = async (req, res) => {
  try {
    const orders = await Order.find({
      deleted: false,
    }).sort({ createdAt: "desc" });
    const listOrder = [];
    for (const order of orders) {
      const user = await User.findOne({
        userId: order.userId,
        deleted: false,
      });
      const book = await Book.findOne({
        bookId: order.bookId,
        deleted: false,
      });
      if (!user) {
        res.json({
          success: false,
          message: "User Id không hợp lệ",
        });
        return;
      }
      if (!book) {
        res.json({
          success: false,
          message: "Book Id không tồn tại",
        });
        return;
      }
      listOrder.push({
        order: order,
        user: user,
        book: book,
      });
    }
    res.json({
      success: true,
      orders: listOrder,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy danh sách mượn sách",
    });
  }
};

module.exports.detail = async (req, res) => {
  try {
    const existOrder = await Order.findOne({
      _id: req.params.idOrder,
      deleted: false,
    });
    if (!existOrder) {
      res.json({
        success: false,
        message: "Order Id không tồn tại",
      });
      return;
    }
    const user = await User.findOne({
      userId: existOrder.userId,
      status: "active",
      deleted: false,
    });
    const book = await Book.findOne({
      bookId: existOrder.bookId,
      deleted: false,
    });
    res.json({
      success: true,
      order: {
        order: existOrder,
        user: user,
        book: book,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lấy chi tiết sách mượn thất bại",
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const existOrder = await Order.findOne({
      userId: req.body.userId,
      bookId: req.body.bookId,
      deleted: false,
    });
    if (!existOrder) {
      res.json({
        success: false,
        message: "Sách mượn không tồn tại",
      });
      return;
    }
    if (req.body.giveQuantity) {
      req.body.giveQuantity = parseInt(req.body.giveQuantity);
    }
    if (req.body.giveQuantity === existOrder.quantity) {
      await Order.updateOne(
        {
          userId: req.body.userId,
          bookId: req.body.bookId,
          deleted: false,
        },
        {
          quantity: 0,
          returnQuantity: req.body.giveQuantity,
          returnDate: new Date(),
          deleted: true,
          deletedAt: new Date(),
        }
      );
      const existBook = await Book.findOne({
        bookId: req.body.bookId,
        deleted: false,
      });
      if (!existBook) {
        res.json({
          success: false,
          message: "Book Id không tồn tại",
        });
        return;
      }
      await Book.updateOne(
        {
          bookId: req.body.bookId,
          deleted: false,
        },
        {
          stock: existBook.stock + req.body.giveQuantity,
          status: "active",
        }
      );
      res.json({
        success: true,
      });
      return;
    }
    let currentGiveQuantity = req.body.giveQuantity;
    if (existOrder.returnQuantity) {
      currentGiveQuantity += existOrder.returnQuantity;
    }
    await Order.updateOne(
      {
        userId: req.body.userId,
        bookId: req.body.bookId,
        deleted: false,
      },
      {
        quantity: existOrder.quantity - req.body.giveQuantity,
        returnQuantity: currentGiveQuantity,
        returnDate: new Date(),
      }
    );
    const existBook = await Book.findOne({
      bookId: req.body.bookId,
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Book Id không tồn tại",
      });
      return;
    }
    await Book.updateOne(
      {
        bookId: req.body.bookId,
        deleted: false,
      },
      {
        stock: existBook.stock + req.body.giveQuantity,
        status: "active",
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi cập nhật số lượng sách mượn",
    });
  }
};
