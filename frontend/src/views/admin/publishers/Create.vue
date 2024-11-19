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
        <h1 class="mb-4" v-if="publisher._id">Cập nhật Nhà xuất bản</h1>
        <h1 class="mb-4" v-else>Thêm mới Nhà xuất bản</h1>
        <form @submit.prevent="save()">
          <div class="form-group">
            <label for="publisherId"
              >Mã nhà xuất bản <span style="color: red">*</span></label
            >
            <input
              v-if="publisher._id"
              readonly
              type="text"
              class="form-control"
              id="publisherId"
              name="publisherId"
              @blur="validate()"
              v-model="publisher.publisherId"
              v-bind:class="{ 'is-invalid': errors.publisherId }"
            />
            <input
              v-else
              type="text"
              class="form-control"
              id="publisherId"
              name="publisherId"
              @blur="validate()"
              v-model="publisher.publisherId"
              v-bind:class="{ 'is-invalid': errors.publisherId }"
            />
            <div class="invalid-feedback" v-if="errors.publisherId">
              {{ errors.publisherId }}
            </div>
          </div>
          <div class="form-group">
            <label for="fullName"
              >Họ và tên <span style="color: red">*</span></label
            >
            <input
              type="text"
              class="form-control"
              id="fullName"
              name="fullName"
              v-model="publisher.fullName"
              @blur="validate()"
              v-bind:class="{ 'is-invalid': errors.fullName }"
            />
            <div class="invalid-feedback" v-if="errors.fullName">
              {{ errors.fullName }}
            </div>
          </div>
          <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input
              type="text"
              class="form-control"
              id="address"
              name="address"
              v-model="publisher.address"
            />
          </div>
          <div class="form-group">
            <input
              type="radio"
              id="active"
              value="active"
              v-model="publisher.status"
            />
            <label for="active" class="mr-4 ml-2">Hoạt động</label>
            <input
              type="radio"
              id="inactive"
              value="inactive"
              v-model="publisher.status"
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
  name: "CreatePublisher",
  data() {
    return {
      myAccount: {
        accountId: "",
      },
      errors: {
        publisherId: "",
        fullName: "",
        address: "",
        status: "",
        message: "",
      },
      publisher: {
        publisherId: "",
        fullName: "",
        address: "",
        status: "active",
      },
    };
  },
  created() {
    const tokenAdmin = this.$cookies.get("tokenAdmin");
    if (!tokenAdmin) {
      this.$router.push({ name: "admin.login" });
    }
    this.getMyAccount(tokenAdmin);
    if (this.$route.params.id) {
      this.getDetail(this.$route.params.id);
    }
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        publisherId: "",
        fullName: "",
        address: "",
        status: "",
        message: "",
      };
      if (!this.publisher.publisherId) {
        this.errors.publisherId = "Publisher Id is required";
        isValid = false;
        return;
      }
      if (!this.publisher.fullName) {
        this.errors.fullName = "Name is required";
        isValid = false;
        return;
      }

      return isValid;
    },
    save() {
      if (this.validate()) {
        if (this.publisher._id) {
          this.$request
            .patch(
              `http://localhost:5268/api/admin/publishers/edit/${this.publisher._id}`,
              this.publisher
            )
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                this.$router.push({ name: "admin.publishers" });
              }
            });
          return;
        }
        this.$request
          .post(
            "http://localhost:5268/api/admin/publishers/create",
            this.publisher
          )
          .then((res) => {
            if (res.data.success) {
              this.$router.push({ name: "admin.publishers" });
            } else {
              console.log(res.data);
              this.errors.message = res.data.message;
            }
          });
      }
    },
    onCancel() {
      this.account.publisherId = "";
      this.account.fullName = "";
      this.account.address = "";
    },
    getDetail(idPublisher) {
      this.$request
        .get(`http://localhost:5268/api/admin/publishers/detail/${idPublisher}`)
        .then((res) => {
          if (res.data.success) {
            this.publisher = res.data.publisher;
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
