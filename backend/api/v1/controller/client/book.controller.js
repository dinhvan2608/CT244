const unidecode = require("unidecode");

const Book = require("../../../../models/book.model");
const Publisher = require("../../../../models/publisher.model");

module.exports.index = async (req, res) => {
  try {
    const books = await Book.find({
      status: "active",
      deleted: false,
    }).sort({ createdAt: "desc" });
    res.json({
      success: true,
      books: books,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy danh sách sách",
    });
  }
};

module.exports.detail = async (req, res) => {
  try {
    const existBook = await Book.findOne({
      slug: req.params.slugBook,
      status: "active",
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: 404,
        message: "Sách bạn cần không tồn tại",
      });
      return;
    }
    const publisher = await Publisher.findOne({
      publisherId: existBook.idPublisher,
      deleted: false,
    });
    console.log(publisher);
    res.json({
      success: true,
      book: existBook,
      publisher: publisher,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi lấy chi tiết sách",
    });
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    const existBook = await Book.findOne({
      slug: req.params.slugBook,
      status: "active",
      deleted: false,
    });
    if (!existBook) {
      res.json({
        success: false,
        message: "Book không tồn tại",
      });
      return;
    }
    await Book.updateOne(
      {
        slug: req.params.slugBook,
        status: "active",
        deleted: false,
      },
      { status: "inactive" }
    );
    res.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi cập nhật trạng thái sách",
    });
  }
};

module.exports.result = async (req, res) => {
  try {
    const keyword = req.query.keyword.toString();
    const content = unidecode(keyword);
    const slug = content.replace(/\s+/g, "-");
    const keywordRegex = new RegExp(keyword, "i");
    const slugRegex = new RegExp(slug, "i");
    const books = await Book.find({
      $or: [{ bookName: keywordRegex }, { slug: slugRegex }],
      status: "active",
      deleted: false,
    });
    if (books.length === 0) {
      res.json({
        success: false,
        message: "Không tìm thấy sách theo theo cầu!!!",
      });
      return;
    }
    res.json({
      success: true,
      books: books,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Lỗi tìm kiếm sách",
    });
  }
};
