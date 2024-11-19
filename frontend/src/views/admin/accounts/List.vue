<template>
  <div class="list-account-admin">
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
              <router-link to="/admin/accounts" style="color: #598cd9"
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
        <h1>Danh sách tài khoản</h1>
        <div class="card mb-3">
          <div class="card-header">Danh sách</div>
          <div class="card-body">
            <div class="row d-flex justify-content-end mr-5 mb-3">
              <router-link to="/admin/accounts/create">
                <button class="btn btn-outline-success mr-3">+ Thêm mới</button>
              </router-link>
            </div>
            <table class="table table-hover table-sm text-center">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã Nhân Viên</th>
                  <th>Họ Tên</th>
                  <th>Chức Vụ</th>
                  <th>Trạng Thái</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(account, index) in accounts">
                  <td>{{ index + 1 }}</td>
                  <td>{{ account.accountId }}</td>
                  <td>{{ account.fullName }}</td>
                  <td>{{ account.position }}</td>
                  <td>
                    <span
                      v-if="account.status === 'active'"
                      class="badge badge-success"
                      style="cursor: pointer"
                      @click="changeStatus(account.status, account._id)"
                      >Hoạt động</span
                    >
                    <span
                      v-else
                      class="badge badge-danger"
                      style="cursor: pointer"
                      @click="changeStatus(account.status, account._id)"
                      >Dừng hoạt động</span
                    >
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'admin.accounts.detail',
                        params: { id: account._id },
                      }"
                    >
                      <button class="btn btn-secondary mr-2">Detail</button>
                    </router-link>

                    <router-link
                      :to="{
                        name: 'admin.accounts.edit',
                        params: { id: account._id },
                      }"
                    >
                      <button class="btn btn-warning mr-2">Edit</button>
                    </router-link>
                    <button
                      class="btn btn-danger"
                      @click="onDelete(account._id)"
                    >
                      Delete
                    </button>
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
  name: "AccountList",
  data() {
    return {
      myAccount: {
        accountId: "",
      },
      accounts: [],
    };
  },
  created() {
    const tokenAdmin = this.$cookies.get("tokenAdmin");
    if (!tokenAdmin) {
      this.$router.push({ name: "admin.login" });
    }
    this.getMyAccount(tokenAdmin);
    this.getAll();
  },
  methods: {
    getAll() {
      this.$request
        .get("http://localhost:5268/api/admin/accounts")
        .then((res) => {
          if (res.data.success) {
            this.accounts = res.data.accounts;
          }
        });
    },
    onDelete(idAccount) {
      this.$swal
        .fire({
          title: "Do you want to delete the account?",
          showCancelButton: true,
          confirmButtonText: "OK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$request
              .delete(
                `http://localhost:5268/api/admin/accounts/delete/${idAccount}`
              )
              .then((res) => {
                if (res.data.success) {
                  this.getAll();
                  this.$swal.fire("Saved!", "", "success");
                }
              });
          }
        });
    },
    changeStatus(status, id) {
      this.$request
        .patch(
          `http://localhost:5268/api/admin/accounts/change-status/${status}/${id}`,
          {
            params: {
              status: status,
              idAccount: id,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            this.getAll();
            this.$router.push({ name: "admin.accounts" });
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
