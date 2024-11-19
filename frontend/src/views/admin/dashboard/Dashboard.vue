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
              <router-link to="/admin/dashboard" style="color: #598cd9"
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
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="card mb-3">
                <div class="card-header"><b>Thông tin tài khoản</b></div>
                <div class="card-body">
                  <div class="inner-id mb-3">
                    Mã nhân viên: <b>{{ myAccount.accountId }}</b>
                  </div>
                  <div class="inner-name mb-3">
                    Họ tên: <b>{{ myAccount.fullName }}</b>
                  </div>
                  <div class="inner-phone mb-3">
                    Số điện thoại: <b>{{ myAccount.phone }}</b>
                  </div>
                  <div class="inner-address mb-3">
                    Địa chỉ: <b>{{ myAccount.address }}</b>
                  </div>
                  <div class="inner-id">
                    Chức vụ: <b>{{ myAccount.position }}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 mb-3">
              <div class="card mb-3 card-1">
                <div class="card-header"><b>Sách</b></div>
                <div class="card-body">
                  <div class="inner-quantity mb-3">
                    Đầu sách: <b>{{ information.book.quantity }}</b>
                  </div>
                  <div class="inner-active mb-3">
                    Hoạt động: <b>{{ information.book.active }}</b>
                  </div>
                  <div class="inner-inactive mb-3">
                    Dừng hoạt động: <b>{{ information.book.inactive }}</b>
                  </div>
                  <div class="inner-order">
                    Đã bán: <b>{{ information.book.order }}</b>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="card mb-3 card-2">
                <div class="card-header"><b>Nhà xuất bản</b></div>
                <div class="card-body">
                  <div class="inner-quantity mb-3">
                    Số lượng: <b>{{ information.publisher.quantity }}</b>
                  </div>
                  <div class="inner-active mb-3">
                    Hoạt động: <b>{{ information.publisher.active }}</b>
                  </div>
                  <div class="inner-inactive">
                    Dừng hoạt động: <b>{{ information.publisher.inactive }}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="card mb-3">
                <div class="card-header"><b>Tài khoản quản trị</b></div>
                <div class="card-body">
                  <div class="inner-quantity mb-3">
                    Số lượng: <b>{{ information.admin.quantity }}</b>
                  </div>
                  <div class="inner-active mb-3">
                    Hoạt động: <b>{{ information.admin.active }}</b>
                  </div>
                  <div class="inner-inactive">
                    Dừng hoạt động: <b>{{ information.admin.inactive }}</b>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="card mb-3">
                <div class="card-header"><b>Tài khoản khách hàng</b></div>
                <div class="card-body">
                  <div class="inner-quantity mb-3">
                    Số lượng: <b>{{ information.client.quantity }}</b>
                  </div>
                  <div class="inner-active mb-3">
                    Hoạt động: <b>{{ information.client.active }}</b>
                  </div>
                  <div class="inner-inactive">
                    Dừng hoạt động: <b>{{ information.client.inactive }}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-1,
.card-2 {
  max-height: 250px;
  height: 100%;
}
</style>

<script>
import moment from "moment";
export default {
  name: "OrderAdmin",
  data() {
    return {
      information: {
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
      },
      myAccount: {
        accountId: "",
        fullName: "",
        phone: "",
        address: "",
        position: "",
      },
    };
  },
  created() {
    const tokenAdmin = this.$cookies.get("tokenAdmin");
    if (!tokenAdmin) {
      this.$router.push({ name: "admin.login" });
    }
    this.getMyAccount(tokenAdmin);
    this.getInformation();
  },
  methods: {
    getInformation() {
      this.$request
        .get("http://localhost:5268/api/admin/dashboard")
        .then((res) => {
          if (res.data.success) {
            this.information = res.data.information;
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
