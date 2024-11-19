<template>
  <div class="dashboard-admin">
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
              <router-link to="/admin/books"
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
              <router-link to="/admin/orders" style="color: #598cd9"
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
        <div class="container">
          <div class="row">
            <div class="col-6">
              <div class="card mb-3 card-1">
                <div class="card-header">Thông tin sách</div>
                <div class="card-body">
                  <div class="inner-thumbnail text-center">
                    <img
                      v-bind:src="order.book.thumbnail"
                      v-bind:alt="order.book.bookName"
                      width="60%"
                      style="object-fit: contain; max-height: 300px"
                    />
                  </div>
                  <div class="inner-content">
                    <div class="inner-title">
                      <h3>{{ order.book.bookName }}</h3>
                    </div>
                    <div class="inner-id margin-bottom-10">
                      Mã sách: <b>{{ order.book.bookId }}</b>
                    </div>
                    <div class="inner-author">
                      Tác giả: <b>{{ order.book.author }}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="card mb-3 card-2">
                <div class="card-header">Thông tin người mượn</div>
                <div class="card-body">
                  <div class="inner-thumbnail text-center">
                    <img
                      v-bind:src="order.user.avatar"
                      v-bind:alt="order.user.fullName"
                      width="60%"
                      style="object-fit: contain; max-height: 300px"
                    />
                  </div>
                  <div class="inner-content">
                    <div class="inner-title">
                      <h3>{{ order.user.fullName }}</h3>
                    </div>
                    <div class="inner-id margin-bottom-10">
                      Mã người mua: <b>{{ order.user.userId }}</b>
                    </div>
                    <div class="inner-phone margin-bottom-10">
                      Số điện thoại: <b>{{ order.user.phone }}</b>
                    </div>
                    <div class="inner-address">
                      Địa chỉ: <b>{{ order.user.address }}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="card mb-3 card-3">
                <div class="card-header">Thông tin mua sách</div>
                <div class="card-body">
                  <div class="inner-content">
                    <div class="inner-borrow-date margin-bottom-10">
                      Ngày mua: <b>{{ formatDate(order.order.borrowDate) }}</b>
                    </div>
                    <div
                      v-if="order.order.returnDate"
                      class="inner-return-date margin-bottom-10"
                    >
                      Ngày trả: <b>{{ formatDate(order.order.returnDate) }}</b>
                    </div>
                    <div class="inner-quantity">
                      Số lượng mua:
                      <span>{{ order.order.quantity }}</span>
                    </div>
                    <div
                      v-if="order.order.returnQuantity"
                      class="inner-give-quantity mt-2"
                    >
                      Số lượng đã trả:
                      <span class="bg-warning">{{
                        order.order.returnQuantity
                      }}</span>
                    </div>
                    <div class="mt-2">
                      Đơn giá:
                      <span
                        ><b style="color: red">${{ order.book.price }}</b></span
                      >
                    </div>
                    <div class="mt-2">
                      Thành Tiền:
                      <span
                        ><b style="color: red"
                          >${{ order.order.quantity * order.book.price }}</b
                        ></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="col-6">
              <div class="card mb-3 card-4">
                <div class="card-header">Thông tin trả sách</div>
                <div class="card-body">
                  <form
                    @submit.prevent="
                      giveBook(order.user.userId, order.book.bookId)
                    "
                  >
                    <div class="form-group inner-content mt-2">
                      <label for="giveQuantity"
                        >Số lượng sách mà khách hàng đã trả</label
                      >
                      <input
                        type="number"
                        id="giveQuantity"
                        name="giveQuantity"
                        placeholder="Số lượng đã trả..."
                        class="form-control margin-bottom-10"
                        min="1"
                        v-model="giveOrder.giveQuantity"
                        v-bind:max="order.order.quantity"
                      />
                      <button
                        type="submit"
                        class="btn btn-warning btn-block"
                        style="color: #fff; font-weight: 600"
                      >
                        Xác nhận
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  font-size: 20px;
  font-weight: 600;
}
.card-body {
  padding: 0;
}

.inner-content {
  padding: 10px 20px;
}

.inner-thumbnail {
  border-bottom: 1px solid #ccc;
}

.inner-title {
  margin-top: 10px;
}

.margin-bottom-10 {
  margin-bottom: 10px;
}

.inner-quantity span,
.inner-give-quantity span {
  color: #fff;
  background: green;
  font-weight: 600;
  display: inline-block;
  padding: 3px 6px;
  border-radius: 8px;
}

.card-1,
.card-2 {
  max-height: 550px;
  height: 100%;
}

.card-3,
.card-4 {
  margin-top: 30px;
  max-height: 220px;
  height: 100%;
}
</style>

<script>
import moment from "moment";
export default {
  name: "OrderAdmin",
  data() {
    return {
      myAccount: {
        accountId: "",
      },
      order: {
        order: {
          quantity: "",
          createdAt: "",
          updatedAt: "",
          returnDate: "",
          returnQuantity: "",
        },
        user: {
          userId: "",
          fullName: "",
          avatar: "",
          address: "",
          phone: "",
        },
        book: {
          bookId: "",
          bookName: "",
          thumbnail: "",
          author: "",
          price: "",
        },
      },
      giveOrder: {
        giveQuantity: "1",
      },
    };
  },
  created() {
    const tokenAdmin = this.$cookies.get("tokenAdmin");
    if (!tokenAdmin) {
      this.$router.push({ name: "admin.login" });
    }
    this.getMyAccount(tokenAdmin);
    this.getOrder(this.$route.params.id);
  },
  methods: {
    giveBook(userId, bookId) {
      this.$request
        .patch(`http://localhost:5268/api/admin/orders/update`, {
          userId: userId,
          bookId: bookId,
          giveQuantity: this.giveOrder.giveQuantity,
        })
        .then((res) => {
          if (res.data.success) {
            this.getOrder(this.$route.params.id);
            this.giveOrder.giveQuantity = "1";
            this.$swal.fire("Đã trả sách!", "", "success");
          }
        });
    },
    getOrder(idOrder) {
      this.$request
        .get(`http://localhost:5268/api/admin/orders/detail/${idOrder}`)
        .then((res) => {
          if (res.data.success) {
            this.order = res.data.order;
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
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("h:mm A, DD/MM/YYYY");
      }
    },
  },
};
</script>
