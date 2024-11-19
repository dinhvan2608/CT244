<template>
  <div class="create-account-admin">
    <div class="header">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-3">
            <div class="inner-logo text-left pl-3">
              <router-link to="/admin/dashboard">ADMIN</router-link>
            </div>
          </div>
          <div class="col-9">
            <div class="text-right">
              <router-link
                v-if="typeof myAccount._id !== 'undefined'"
                :to="{
                  name: 'admin.accounts.detail',
                  params: { id: myAccount._id },
                }"
              >
                <button class="btn btn-primary btn-sm mr-2">
                  {{ myAccount.accountId }}
                </button>
              </router-link>
              <button class="btn btn-danger btn-sm mr-2" @click="onLogout()">
                Đăng Xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="body">
      <div class="sider">
        <div class="inner-menu">
          <ul>
            <li>
              <router-link to="/admin/dashboard"
                ><i class="fa-solid fa-chart-pie" style="margin-right: 5px"></i>
                Tổng quan</router-link
              >
            </li>
            <li>
              <router-link to="/admin/books" style="color: #598cd9"
                ><i class="fa-solid fa-list-ul" style="margin-right: 5px"></i>
                Sách</router-link
              >
            </li>
            <li>
              <router-link to="/admin/publishers"
                ><i class="fa-solid fa-bookmark" style="margin-right: 5px"></i>
                Nhà xuất bản</router-link
              >
            </li>
            <li>
              <router-link to="/admin/accounts"
                ><i
                  class="fa-solid fa-users-gear"
                  style="margin-right: 5px"
                ></i>
                Tài khoản</router-link
              >
            </li>
            <li>
              <router-link to="/admin/users"
                ><i class="fa-solid fa-users" style="margin-right: 5px"></i>
                Người dùng</router-link
              >
            </li>
            <li>
              <router-link to="/admin/orders"
                ><i
                  class="fa-solid fa-basket-shopping"
                  style="margin-right: 5px"
                ></i>
                Sách đã bán</router-link
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="main">
        <h1 class="mb-4" v-if="book._id">Cập nhật sách</h1>
        <h1 class="mb-4" v-else>Thêm mới sách</h1>
        <form @submit.prevent="save()">
          <div class="form-group">
            <label for="bookId"
              >Mã sách <span style="color: red">*</span></label
            >
            <input
              v-if="book._id"
              readonly
              type="text"
              class="form-control"
              id="bookId"
              name="bookId"
              @blur="validate()"
              v-model="book.bookId"
              v-bind:class="{ 'is-invalid': errors.bookId }"
            />
            <input
              v-else
              type="text"
              class="form-control"
              id="bookId"
              name="bookId"
              @blur="validate()"
              v-model="book.bookId"
              v-bind:class="{ 'is-invalid': errors.bookId }"
            />
            <div class="invalid-feedback" v-if="errors.bookId">
              {{ errors.bookId }}
            </div>
          </div>
          <div class="form-group">
            <label for="bookName"
              >Tên sách <span style="color: red">*</span></label
            >
            <input
              type="text"
              class="form-control"
              id="bookName"
              name="bookName"
              v-model="book.bookName"
              @blur="validate()"
              v-bind:class="{ 'is-invalid': errors.bookName }"
            />
            <div class="invalid-feedback" v-if="errors.bookName">
              {{ errors.bookName }}
            </div>
          </div>
          <div class="form-group">
            <label for="author">Tác giả</label>
            <input
              type="text"
              class="form-control"
              id="author"
              name="author"
              v-model="book.author"
            />
          </div>
          <div class="form-group">
            <label for="stock">Số lượng</label>
            <input
              type="number"
              class="form-control"
              id="stock"
              name="stock"
              v-model="book.stock"
            />
          </div>
          <div class="form-group">
            <label for="thumbnail"
              >Hình ảnh <span style="color: red">*</span></label
            >
            <div>
              <div
                class="btn btn-primary pl-5 pr-5 pt-2 pb-2"
                @click="openUploadWidget()"
              >
                Tải Ảnh
              </div>
            </div>
            <div class="mt-2" v-if="book.thumbnail">
              <img
                v-bind:src="book.thumbnail"
                v-bind:alt="book.bookName"
                width="150px"
                style="object-fit: contain"
              />
            </div>
            <input
              type="text"
              class="form-control d-none"
              id="thumbnail"
              name="thumbnail"
              @blur="validate()"
              v-model="book.thumbnail"
              v-bind:class="{ 'is-invalid': errors.thumbnail }"
            />
            <div class="invalid-feedback" v-if="errors.thumbnail">
              {{ errors.thumbnail }}
            </div>
          </div>
          <div class="form-group">
            <label for="idPublisher">Mã nhà xuất bản</label>
            <select
              v-model="book.idPublisher"
              id="idPublisher"
              class="form-control"
            >
              <option disabled value="">Không thuộc NXB</option>
              <option
                v-for="publisher in publishers"
                v-bind:value="publisher.publisherId"
              >
                {{ publisher.fullName }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="publicYear">Năm xuất bản</label>
            <input
              type="number"
              class="form-control"
              id="publicYear"
              name="publicYear"
              v-model="book.publicYear"
            />
          </div>
          <div class="form-group">
            <label for="rate">Đánh giá</label>
            <input
              type="text"
              class="form-control"
              id="rate"
              name="rate"
              v-model="book.rate"
            />
          </div>
          <div class="form-group">
            <label for="price">Giá sách</label>
            <input
              type="text"
              class="form-control"
              id="price"
              name="price"
              v-model="book.price"
            />
          </div>
          <div class="form-group">
            <label for="description">Mô tả</label>
            <textarea
              class="form-control"
              rows="5"
              id="description"
              name="description"
              v-model="book.description"
            ></textarea>
          </div>
          <div class="form-group">
            <input
              type="radio"
              id="active"
              value="active"
              v-model="book.status"
            />
            <label for="active" class="mr-4 ml-2">Hoạt động</label>
            <input
              type="radio"
              id="inactive"
              value="inactive"
              v-model="book.status"
              selected="true"
            />
            <label for="inactive" class="ml-2">Dừng hoạt động</label>
            <div
              class="invalid-feedback"
              v-if="errors.message"
              style="display: block"
            >
              {{ errors.message }}
            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Save</button> &nbsp;
            <button type="reset" class="btn btn-danger" @click="onCancel()">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateBook",
  data() {
    return {
      myAccount: {
        accountId: "",
      },
      errors: {
        bookId: "",
        bookName: "",
        thumbnail: "",
        author: "",
        stock: "",
        rate: "",
        description: "",
        idPublisher: "",
        publicYear: "",
        status: "",
        message: "",
      },
      book: {
        bookId: "",
        bookName: "",
        thumbnail: "",
        author: "",
        stock: "",
        rate: "",
        price: "",
        description: "",
        idPublisher: "",
        publicYear: "",
        status: "active",
      },
      publishers: [],
    };
  },
  created() {
    const tokenAdmin = this.$cookies.get("tokenAdmin");
    if (!tokenAdmin) {
      this.$router.push({ name: "admin.login" });
    }
    this.getMyAccount(tokenAdmin);
    this.getAllPublisher();
    if (this.$route.params.id) {
      this.getDetail(this.$route.params.id);
    }
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        bookId: "",
        bookName: "",
        thumbnail: "",
        author: "",
        stock: "",
        rate: "",
        price: "",
        description: "",
        idPublisher: "",
        publicYear: "",
        status: "",
      };
      if (!this.book.bookId) {
        this.errors.bookId = "Book Id is required";
        isValid = false;
        return;
      }
      if (!this.book.bookName) {
        this.errors.bookName = "Name is required";
        isValid = false;
        return;
      }
      if (!this.book.thumbnail) {
        this.errors.thumbnail = "Thumbnail Id is required";
        isValid = false;
        return;
      }

      return isValid;
    },
    save() {
      if (this.validate()) {
        if (this.book._id) {
          this.$request
            .patch(
              `http://localhost:5268/api/admin/books/edit/${this.book._id}`,
              this.book
            )
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                this.$router.push({ name: "admin.books" });
              }
            });
          return;
        }
        this.$request
          .post("http://localhost:5268/api/admin/books/create", this.book)
          .then((res) => {
            if (res.data.success) {
              console.log(this.book);
              this.$router.push({ name: "admin.books" });
            } else {
              this.errors.message = res.data.message;
            }
          });
      }
    },
    onCancel() {
      this.account.bookId = "";
      this.account.bookName = "";
      this.account.thumbnail = "";
      this.account.author = "";
      this.account.stock = "";
      this.account.description = "";
      this.account.idPublisher = "";
      this.account.publicYear = "";
    },
    getDetail(idBook) {
      this.$request
        .get(`http://localhost:5268/api/admin/books/detail/${idBook}`)
        .then((res) => {
          if (res.data.success) {
            this.book = res.data.book;
          }
        });
    },
    getAllPublisher() {
      this.$request
        .get(`http://localhost:5268/api/admin/publishers/`)
        .then((res) => {
          if (res.data.success) {
            this.publishers = res.data.publishers;
          }
        });
    },
    async openUploadWidget() {
      const widget = await window.cloudinary.createUploadWidget(
        {
          cloud_name: "dyic01hpo",
          upload_preset: "upload-image-book",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            this.errors.thumbnail = "";
            this.book.thumbnail = result.info.secure_url;
          }
        }
      );
      widget.open();
    },
    getMyAccount(token) {
      let tokenMyAcc = {
        tokenAdmin: token,
      };
      this.$request
        .post("http://localhost:5268/api/admin/my-account", tokenMyAcc)
        .then((res) => {
          if (res.data.success) {
            this.myAccount = res.data.account;
          }
        });
    },
    onLogout() {
      this.$cookies.remove("tokenAdmin");
      this.$router.push({ name: "admin.login" });
    },
  },
};
</script>
