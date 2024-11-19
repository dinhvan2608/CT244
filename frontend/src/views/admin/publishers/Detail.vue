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
              <router-link to="/admin/publishers" style="color: #598cd9"
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
        <h1 class="mb-4">Thông tin Nhà xuất bản</h1>

        <div v-if="publisher.publisherId">
          <p>
            Mã nhà xuất bản: <b>{{ publisher.publisherId }}</b>
          </p>
        </div>
        <div v-if="publisher.fullName">
          <p>
            Họ và tên: <b>{{ publisher.fullName }}</b>
          </p>
        </div>
        <div v-if="publisher.address">
          <p>
            Địa chỉ: <b>{{ publisher.address }}</b>
          </p>
        </div>
        <div v-if="publisher.status">
          <span>Trạng thái: </span>
          <span v-if="publisher.status === 'active'" class="badge badge-success"
            >Hoạt động</span
          >
          <span v-else class="badge badge-danger">Dừng hoạt động</span>
        </div>
        <div class="mt-4">
          <router-link
            :to="{
              name: 'admin.publishers.edit',
              params: { id: publisher._id },
            }"
          >
            <button class="btn btn-warning mr-3">Edit</button>
          </router-link>
          <button class="btn btn-danger" @click="onDelete(publisher._id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardAdmin",
  data() {
    return {
      myAccount: {
        accountId: "",
      },
      publisher: {
        publisherId: "",
        fullName: "",
        address: "",
        status: "",
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
    getDetail(idPublisher) {
      this.$request
        .get(`http://localhost:5268/api/admin/publishers/detail/${idPublisher}`)
        .then((res) => {
          if (res.data.success) {
            this.publisher = res.data.publisher;
          }
        });
    },
    onDelete(idPublisher) {
      this.$swal
        .fire({
          title: "Do you want to delete the publisher?",
          showCancelButton: true,
          confirmButtonText: "OK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$request
              .delete(
                `http://localhost:5268/api/admin/publishers/delete/${idPublisher}`
              )
              .then((res) => {
                if (res.data.success) {
                  this.$swal.fire("Saved!", "", "success");
                  this.$router.push({ name: "admin.publishers" });
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
