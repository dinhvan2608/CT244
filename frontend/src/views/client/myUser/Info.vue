<template>
  <div class="list-book-client flex-wrapper">
    <header class="header" style="background-color: #a6cafc">
      <div class="container">
        <div class="inner-head">
          <div class="inner-box">
            <router-link to="/">
              <div class="inner-logo">
                <img src="../../../assets/books.png" alt="Logo" />
                <span>BloomBook</span>
              </div>
            </router-link>
            <ul class="inner-menu">
              <router-link to="/">
                <li style="color: #0f1b4c">Home</li>
              </router-link>
              <router-link to="/books">
                <li style="color: #fff">Books</li>
              </router-link>
            </ul>
          </div>
          <form class="form-mini" @submit.prevent="search()">
            <div class="form-group d-flex mb-0">
              <input
                type="text"
                id="keyword"
                name="keyword"
                class="form-control"
                placeholder="Nhập từ khóa..."
                v-model="keyword"
              />
              <button type="submit" class="btn btn-primary btn-search">
                Tìm
              </button>
            </div>
          </form>
          <!-- <div v-if="myUser.userId">
            <div class="inner-info" @click="showUser()">
              <button
                v-if="myUser.avatar"
                class="title-name"
                style="padding: 0"
              >
                <img
                  v-bind:src="myUser.avatar"
                  v-bind:alt="myUser.fullName"
                  width="40px"
                  height="40px"
                  style="
                    object-fit: cover;
                    object-position: center;
                    border-radius: 50%;
                  "
                />
              </button>
              <button v-else class="title-name" :style="myStyle">
                {{ myUser.charName }}
              </button>
              <div class="box-info" :style="show">
                <div class="info" @click="myInfo()">
                  <i class="fa-regular fa-user"></i> Thông tin cá nhân
                </div>
                <div class="borrow" @click="borrowBook()">
                  <i class="fa-solid fa-book mr-2"></i> Sách đã mượn
                </div>
                <div class="log" @click="logout()">
                  <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                </div>
              </div>
            </div>
          </div> -->
          <div class="acc" v-if="myUser.userId">
            <div
              class="acc-item text-center title-name"
              v-if="myUser.avatar"
              style="padding: 0"
              @click="myInfo()"
            >
              <img
                v-bind:src="myUser.avatar"
                v-bind:alt="myUser.fullName"
                width="40px"
                height="40px"
                style="
                  object-fit: cover;
                  object-position: center;
                  border-radius: 50%;
                "
              />
            </div>
            <div v-else class="acc-item text-center" @click="myInfo()">
              <i class="fa-regular fa-user mr-2" style="padding-left: 10px"></i>
            </div>
            <div class="acc-item text-center" @click="borrowBook()">
              <i class="fa-solid fa-book"></i>
            </div>
            <div class="acc-item text-center" @click="logout()">
              <i
                class="fa-solid fa-right-from-bracket mr-2"
                style="padding-left: 10px"
              ></i>
            </div>
          </div>
          <div v-else class="inner-auth">
            <router-link to="/auth/login">
              <div class="sign-in">Sign in</div>
            </router-link>
            <router-link to="/auth/register">
              <div class="sign-up">Sign up</div>
            </router-link>
          </div>
          <div class="inner-info">
            <div @click="showUser()" style="z-index: 999">
              <i
                class="fa-solid fa-bars bars"
                style="
                  display: none;
                  cursor: pointer;
                  font-size: 25px;
                  color: #fff;
                "
              ></i>
            </div>
            <div class="box-info" :style="show">
              <div v-if="myUser.userId">
                <div class="info">
                  <form
                    @submit.prevent="search()"
                    class="form-group d-flex mb-0"
                  >
                    <input
                      type="text"
                      id="keyword"
                      name="keyword"
                      class="form-control"
                      placeholder="Nhập từ khóa..."
                      v-model="keyword"
                    />
                    <button type="submit" class="btn btn-primary btn-search">
                      Tìm
                    </button>
                  </form>
                </div>
                <div class="info">
                  <router-link to="/books">
                    <i
                      class="fa-solid fa-book mr-2"
                      style="color: #5a6473; text-decoration: none !important"
                    ></i>
                    <span style="color: #5a6473">Sách</span>
                  </router-link>
                </div>
                <div class="info" @click="myInfo()">
                  <i class="fa-solid fa-user"></i> Thông tin cá nhân
                </div>
                <div class="borrow" @click="borrowBook()">
                  <i class="fa-solid fa-cart-shopping mr-2"></i> Sách đã mua
                </div>
                <div class="log" @click="logout()">
                  <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                </div>
              </div>
              <div v-else>
                <router-link to="/books">
                  <div class="log">Books</div>
                </router-link>
                <hr />
                <router-link to="/auth/login">
                  <div class="log">Sign in</div>
                </router-link>
                <hr />
                <router-link to="/auth/register">
                  <div class="log">Sign up</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div>
      <div class="container my-5">
        <div class="row justify-content-center">
          <div class="col-8">
            <h1 class="text-center">Thông tin cá nhân</h1>
            <form @submit.prevent="update()">
              <div class="form-group">
                <label for="avatar">Avatar </label>
                <div class="mt-2 mb-2" v-if="myUser.avatar">
                  <img
                    v-bind:src="myUser.avatar"
                    v-bind:alt="myUser.fullName"
                    width="150px"
                    style="object-fit: contain"
                  />
                </div>
                <div>
                  <div
                    class="btn btn-secondary pl-5 pr-5 pt-2 pb-2"
                    @click="openUploadWidget()"
                  >
                    Tải Ảnh
                  </div>
                  <div
                    v-if="myUser.avatar"
                    class="btn btn-warning pl-5 pr-5 pt-2 pb-2"
                    style="margin-left: 10px"
                    @click="clearAvatar()"
                  >
                    Xóa Ảnh
                  </div>
                </div>

                <input
                  type="text"
                  class="form-control d-none"
                  id="avatar"
                  name="avatar"
                  v-model="myUser.avatar"
                />
              </div>
              <div class="form-group">
                <label for="userId"
                  >Mã người dùng <span style="color: red">*</span>
                </label>
                <input
                  readonly
                  type="text"
                  class="form-control"
                  id="userId"
                  name="userId"
                  @blur="validate()"
                  v-model="myUser.userId"
                  v-bind:class="{ 'is-invalid': errors.userId }"
                />
                <div class="invalid-feedback" v-if="errors.userId">
                  {{ errors.userId }}
                </div>
              </div>
              <div class="form-group">
                <label for="fullName"
                  >Họ và tên <span style="color: red">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="fullName"
                  name="fullName"
                  @blur="validate()"
                  v-model="myUser.fullName"
                  v-bind:class="{ 'is-invalid': errors.fullName }"
                />
                <div class="invalid-feedback" v-if="errors.fullName">
                  {{ errors.fullName }}
                </div>
              </div>
              <div class="form-group">
                <label for="phone"
                  >Số điện thoại <span style="color: red">*</span>
                </label>
                <input
                  type="phone"
                  class="form-control"
                  id="phone"
                  name="phone"
                  @blur="validate()"
                  v-model="myUser.phone"
                  v-bind:class="{ 'is-invalid': errors.phone }"
                />
                <div class="invalid-feedback" v-if="errors.phone">
                  {{ errors.phone }}
                </div>
              </div>
              <div class="form-group">
                <label for="address"
                  >Địa chỉ <span style="color: red">*</span>
                </label>
                <input
                  type="address"
                  class="form-control"
                  id="address"
                  name="address"
                  @blur="validate()"
                  v-model="myUser.address"
                  v-bind:class="{ 'is-invalid': errors.address }"
                />
                <div class="invalid-feedback" v-if="errors.address">
                  {{ errors.address }}
                </div>
              </div>

              <div class="form-group">
                <label for="birthYear">Năm sinh</label>
                <input
                  type="number"
                  class="form-control"
                  id="birthYear"
                  name="birthYear"
                  v-model="myUser.birthYear"
                />
              </div>
              <div class="form-group">
                <label for="sex">Giới tính</label>
                <select v-model="myUser.sex" id="sex" class="form-control">
                  <option value="">Không cung cấp</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">Cập nhật</button>

                <div
                  class="btn btn-danger ml-2"
                  @click="changePassword(myUser.tokenUser)"
                >
                  Đổi mật khẩu
                </div>
                <div class="btn btn-warning ml-2" @click="deleteUser()">
                  Xóa tài khoản
                </div>
                <div
                  class="invalid-feedback"
                  v-if="errors.message"
                  style="display: block"
                >
                  {{ errors.message }}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">Copyright 2024 by Nhom39</footer>
  </div>
</template>

<style scoped>
.flex-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}

.acc,
.login-acc {
  float: left;
  margin-right: 40px;
  display: flex;
  font-size: 20px;
  text-align: center;
}

.acc-btn {
  margin-left: 10px;
}

.acc-btn a {
  color: white;
  text-decoration: none;
}

.acc-item {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  text-align: center;
  margin-left: 10px;
}

.acc-item:hover {
  background-color: #d5f5f5;
  cursor: pointer;
}

.acc-item i {
  text-align: center;
  margin: auto;
  margin-top: 10px;
  color: black;
}
@media screen and (min-width: 805px) {
  .inner-info {
    display: none;
  }
}

@media screen and (max-width: 991px) {
  .inner-head .inner-menu li {
    position: relative;
    left: -220%;
  }

  .inner-head .form-mini div.form-group {
    position: relative;
    left: -40%;
  }

  .inner-head .form-mini input.form-control {
    width: 120px;
  }

  .inner-head .acc {
    position: relative;
    right: 10%;
  }
}
@media screen and (max-width: 800px) {
  .header .inner-menu {
    display: none;
  }
  .header form {
    display: none;
  }
  .header .acc {
    display: none;
  }
  .header .inner-auth {
    display: none;
  }
  .header .bars {
    display: inline-block !important;
  }
  .section-one .inner-image img {
    width: 90%;
    height: auto;
    margin-left: 30px;
  }
}

.inner-head .inner-info .box-info {
  padding: 10px 10px 10px 10px;
  width: 200px;
  position: absolute;
  left: calc(-580% - 32px);
  top: calc(100% + 20px);
  background-color: #eee;
}
</style>

<script>
export default {
  name: "InfoUser",
  data() {
    return {
      myStyle: {
        backgroundColor: "",
      },
      show: {
        display: "none",
      },
      errors: {
        userId: "",
        fullName: "",
        avatar: "",
        birthYear: "",
        sex: "",
        address: "",
        phone: "",
        password: "",
        status: "",
        message: "",
      },
      myUser: {
        userId: "",
        fullName: "",
        avatar: "",
        birthYear: "",
        sex: "",
        address: "",
        phone: "",
        password: "",
        charName: "",
        bgc: "",
        status: "",
      },
      keyword: "",
    };
  },
  created() {
    const tokenUser = this.$cookies.get("tokenUser");
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (tokenUser) {
      this.getMyUser(tokenUser);
      this.myStyle.backgroundColor = "#" + randomColor;
    }
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        userId: "",
        fullName: "",
        password: "",
        phone: "",
        address: "",
        message: "",
      };
      if (!this.myUser.userId) {
        this.errors.userId = "User Id is required";
        isValid = false;
        return;
      }
      if (!this.myUser.fullName) {
        this.errors.fullName = "Name is required";
        isValid = false;
        return;
      }
      if (!this.myUser.phone) {
        this.errors.phone = "Phone is required";
        isValid = false;
        return;
      } else if (
        this.myUser.phone.length === 10 ||
        this.myUser.phone.length === 11
      ) {
      } else {
        this.errors.phone = "Phone is required length to 10 or 11";
        isValid = false;
        return;
      }

      if (!this.myUser.address) {
        this.errors.address = "Address is required";
        isValid = false;
        return;
      }
      return isValid;
    },
    update() {
      if (this.validate()) {
        if (this.myUser.userId) {
          this.$request
            .patch("http://localhost:5268/api/my-user/update", this.myUser)
            .then((res) => {
              this.getMyUser();
              this.$swal.fire("Saved!", "", "success");
            });
        }
      }
    },
    search() {
      if (this.keyword) {
        this.$router.push({
          name: "books.result.search",
          query: { keyword: this.keyword },
        });
      }
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
            this.myUser.avatar = result.info.secure_url;
          }
        }
      );
      widget.open();
    },
    clearAvatar() {
      this.myUser.avatar = "";
    },
    changePassword(tokenUser) {
      this.$router.push({
        name: "user.change.password",
        params: { token: tokenUser },
      });
    },
    deleteUser() {
      if (this.validate()) {
        if (this.myUser.userId) {
          this.$swal
            .fire({
              title: "Do you want to delete the account?",
              showCancelButton: true,
              confirmButtonText: "OK",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.myUser.status = "inactive";
                this.$request
                  .patch(
                    "http://localhost:5268/api/my-user/update",
                    this.myUser
                  )
                  .then((res) => {
                    this.$swal.fire("Saved!", "", "success");
                    this.$router.push({ name: "user.home" });
                  });
              }
            });
        }
      }
    },
    getMyUser(tokenUser) {
      this.$request
        .get(`http://localhost:5268/api/my-user/${tokenUser}`)
        .then((res) => {
          if (res.data.success) {
            this.myUser = res.data.user;
            const arrName = res.data.user.fullName.split(" ");
            const name = arrName[arrName.length - 1];

            this.myUser.charName = name[0].toUpperCase();
          }
        });
    },
    showUser() {
      if (this.show.display === "none") {
        this.show.display = "block";
      } else {
        this.show.display = "none";
      }
    },
    myInfo() {
      this.$router.push({ name: "user.info" });
    },
    borrowBook() {
      this.$router.push({ name: "books.order" });
    },
    logout() {
      this.$cookies.remove("tokenUser");
      this.$router.push({ name: "user.login" });
    },
  },
};
</script>
