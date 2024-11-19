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
        <h1 class="mb-4" v-if="account._id">Cập nhật tài khoản</h1>
        <h1 class="mb-4" v-else>Thêm mới tài khoản</h1>
        <form @submit.prevent="save()">
          <div class="form-group">
            <label for="accountId"
              >Mã nhân viên <span style="color: red">*</span></label
            >
            <input
              v-if="account._id"
              readonly
              type="text"
              class="form-control"
              id="accountId"
              name="accountId"
              @blur="validate()"
              v-model="account.accountId"
              v-bind:class="{ 'is-invalid': errors.accountId }"
            />
            <input
              v-else
              type="text"
              class="form-control"
              id="accountId"
              name="accountId"
              @blur="validate()"
              v-model="account.accountId"
              v-bind:class="{ 'is-invalid': errors.accountId }"
            />
            <div class="invalid-feedback" v-if="errors.accountId">
              {{ errors.accountId }}
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
              v-model="account.fullName"
              @blur="validate()"
              v-bind:class="{ 'is-invalid': errors.fullName }"
            />
            <div class="invalid-feedback" v-if="errors.fullName">
              {{ errors.fullName }}
            </div>
          </div>
          <div class="form-group">
            <label for="position"
              >Chức vụ <span style="color: red">*</span></label
            >
            <input
              type="text"
              class="form-control"
              id="position"
              name="position"
              @blur="validate()"
              v-model="account.position"
              v-bind:class="{ 'is-invalid': errors.position }"
            />
            <div class="invalid-feedback" v-if="errors.position">
              {{ errors.position }}
            </div>
          </div>
          <div class="form-group">
            <label for="avatar"
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
            <div class="mt-2" v-if="account.avatar">
              <img
                v-bind:src="account.avatar"
                v-bind:alt="account.fullName"
                width="150px"
                style="object-fit: contain"
              />
            </div>
            <input
              type="text"
              class="form-control d-none"
              id="avatar"
              name="avatar"
              v-model="account.avatar"
            />
          </div>
          <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input
              type="text"
              class="form-control"
              id="address"
              name="address"
              @blur="validate()"
              v-model="account.address"
              v-bind:class="{ 'is-invalid': errors.address }"
            />
            <div class="invalid-feedback" v-if="errors.address">
              {{ errors.address }}
            </div>
          </div>
          <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              name="phone"
              @blur="validate()"
              v-model="account.phone"
              v-bind:class="{ 'is-invalid': errors.phone }"
            />
            <div class="invalid-feedback" v-if="errors.phone">
              {{ errors.phone }}
            </div>
          </div>
          <div class="form-group">
            <label for="password"
              >Mật khẩu <span style="color: red">*</span></label
            >
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              @blur="validate()"
              v-model="account.password"
              v-bind:class="{ 'is-invalid': errors.password }"
            />
            <div class="invalid-feedback" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>
          <div class="form-group">
            <input
              type="radio"
              id="active"
              value="active"
              v-model="account.status"
            />
            <label for="active" class="mr-4 ml-2">Hoạt động</label>
            <input
              type="radio"
              id="inactive"
              value="inactive"
              v-model="account.status"
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
  name: "CreateAccountAdmin",
  data() {
    return {
      myAccount: {
        accountId: "",
      },
      errors: {
        accountId: "",
        fullName: "",
        position: "",
        address: "",
        phone: "",
        password: "",
        status: "",
        message: "",
      },
      account: {
        accountId: "",
        fullName: "",
        position: "",
        avatar: "",
        address: "",
        phone: "",
        password: "",
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
        accountId: "",
        fullName: "",
        position: "",
        address: "",
        phone: "",
        password: "",
        status: "",
      };
      if (!this.account.accountId) {
        this.errors.accountId = "Account Id is required";
        isValid = false;
        return;
      }
      if (!this.account.fullName) {
        this.errors.fullName = "Name is required";
        isValid = false;
        return;
      }
      if (!this.account.position) {
        this.errors.position = "Position is required";
        isValid = false;
        return;
      }
      if (!this.account.password) {
        this.errors.password = "Password Id is required";
        isValid = false;
        return;
      }

      return isValid;
    },
    save() {
      if (this.validate()) {
        if (this.account._id) {
          this.$request
            .patch(
              `http://localhost:5268/api/admin/accounts/edit/${this.account._id}`,
              this.account
            )
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                this.$router.push({ name: "admin.accounts" });
              }
            });
          return;
        }
        this.$request
          .post("http://localhost:5268/api/admin/accounts/create", this.account)
          .then((res) => {
            if (res.data.success) {
              this.$router.push({ name: "admin.accounts" });
            } else {
              console.log(res.data);
              this.errors.message = res.data.message;
            }
          });
      }
    },
    onCancel() {
      this.account.accountId = "";
      this.account.fullName = "";
      this.account.position = "";
      this.account.address = "";
      this.account.phone = "";
      this.account.password = "";
    },
    getDetail(idAccount) {
      this.$request
        .get(`http://localhost:5268/api/admin/accounts/detail/${idAccount}`)
        .then((res) => {
          if (res.data.success) {
            this.account = res.data.account;
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
            this.errors.avatar = "";
            this.account.avatar = result.info.secure_url;
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
