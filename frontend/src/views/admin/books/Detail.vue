<template>
  <div class="book-list-admin">
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
        <h1 class="mb-4">Thông tin sách</h1>

        <div v-if="book.thumbnail">
          <img
            v-bind:src="book.thumbnail"
            v-bind:alt="book.bookName"
            width="200px"
            style="object-fit: contain"
          />
        </div>
        <div v-if="book.bookId" class="mt-4">
          <p>
            Mã sách: <b>{{ book.bookId }}</b>
          </p>
        </div>
        <div v-if="book.bookName">
          <p>
            Tên sách: <b>{{ book.bookName }}</b>
          </p>
        </div>
        <div v-if="book.author">
          <p>
            Tác giả: <b>{{ book.author }}</b>
          </p>
        </div>
        <div v-else>
          <p>Tác giả: <b>Cộng đồng</b></p>
        </div>
        <div v-if="book.rate" class="book-rate">
          <p>Số lượng:</p>
          <span class="box-rate">
            <div>
              <b>{{ book.rate }}</b>
            </div>
            <img
              src="../../../assets/efd76e1d41c00ad8ebb7287c66b559fd.png"
              alt="Star"
            />
          </span>
        </div>
        <div v-if="book.stock">
          <p>
            Số lượng: <b>{{ book.stock }}</b>
          </p>
        </div>
        <div v-if="book.price">
          <p>
            Giá sách: <b>{{ book.price }}</b>
          </p>
        </div>
        <div v-if="book.idPublisher">
          <p>
            Mã nhà xuất bản: <b>{{ book.idPublisher }}</b>
          </p>
        </div>
        <div v-else>
          <p>Mã nhà xuất bản: <b>Cộng đồng</b></p>
        </div>
        <div v-if="book.publicYear">
          <p>
            Năm xuất bản: <b>{{ book.publicYear }}</b>
          </p>
        </div>
        <div v-if="book.description" class="mb-2">
          <p class="mb-2">Mô tả sách:</p>
          <div v-html="book.description"></div>
        </div>
        <div v-if="book.status">
          <span>Trạng thái: </span>
          <span v-if="book.status === 'active'" class="badge badge-success"
            >Hoạt động</span
          >
          <span v-else class="badge badge-danger">Dừng hoạt động</span>
        </div>

        <div class="mt-4">
          <router-link
            :to="{
              name: 'admin.books.edit',
              params: { id: book._id },
            }"
          >
            <button class="btn btn-warning mr-3">Edit</button>
          </router-link>
          <button class="btn btn-danger" @click="onDelete(book._id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBook",
  data() {
    return {
      myAccount: {
        accountId: "",
      },
      book: {
        thumbnail: "",
        bookId: "",
        bookName: "",
        author: "",
        stock: "",
        price: "",
        idPublisher: "",
        publicYear: "",
        status: "",
        description: "",
      },
    };
  },
  created() {
    const tokenAdmin = this.$cookies.get("tokenAdmin");
    if (!tokenAdmin) {
      this.$router.push({ name: "admin.login" });
    }
    this.getMyAccount(tokenAdmin);
    this.getDetail(this.$route.params.id);
  },
  methods: {
    getDetail(idBook) {
      this.$request
        .get(`http://localhost:5268/api/admin/books/detail/${idBook}`)
        .then((res) => {
          if (res.data.success) {
            this.book = res.data.book;
          }
        });
    },
    onDelete(idBook) {
      this.$swal
        .fire({
          title: "Do you want to delete the book?",
          showCancelButton: true,
          confirmButtonText: "OK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$request
              .delete(`http://localhost:5268/api/admin/books/delete/${idBook}`)
              .then((res) => {
                if (res.data.success) {
                  this.$swal.fire("Saved!", "", "success");
                  this.$router.push({ name: "admin.books" });
                }
              });
          }
        });
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
