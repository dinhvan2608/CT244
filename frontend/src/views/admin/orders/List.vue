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
        <h1>Danh sách tài khoản</h1>
        <div class="card mb-3">
          <div class="card-header">Danh sách</div>
          <div class="card-body">
            <table class="table table-hover table-sm text-center">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình Ảnh</th>
                  <th>Tên Sách</th>
                  <th>Người mua</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orders">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <img
                      v-bind:src="order.book.thumbnail"
                      v-bind:alt="order.book.bookName"
                      width="100px"
                    />
                  </td>
                  <td>{{ order.book.bookName }}</td>
                  <td>{{ order.user.fullName }}</td>

                  <td>
                    <router-link
                      :to="{
                        name: 'admin.orders.detail',
                        params: { id: order.order._id },
                      }"
                    >
                      <button class="btn btn-secondary mr-2">Detail</button>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderAdmin",
  data() {
    return {
      myAccount: {
        accountId: "",
      },
      orders: [],
    };
  },
  created() {
    const tokenAdmin = this.$cookies.get("tokenAdmin");
    if (!tokenAdmin) {
      this.$router.push({ name: "admin.login" });
    }
    this.getMyAccount(tokenAdmin);
    this.getAllOrder();
  },
  methods: {
    getAllOrder() {
      this.$request
        .get("http://localhost:5268/api/admin/orders/")
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
            console.log(this.orders);
          }
        });
    },
    getMyAccount(token) {
      console.log(token);
      let tokenMyAcc = {
        tokenAdmin: token,
      };
      this.$request
        .post("http://localhost:5268/api/admin/my-account", tokenMyAcc)
        .then((res) => {
          if (res.data.success) {
            this.myAccount = res.data.account;
            console.log(this.myAccount);
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
